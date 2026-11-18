// Supabase Edge Function: manage admin accounts from the /admin page.
// Deploy:  supabase functions deploy admin-users
// It uses the service-role key (available inside Edge Functions only, NEVER in the browser)
// and only lets people already listed in the `admins` table call it.
import { createClient } from 'npm:@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

// Works with both the legacy service_role key and the newer "secret" API keys
function serviceKey(): string {
  const legacy = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (legacy) return legacy
  try { return JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') ?? '{}').default } catch { return '' }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  try {
    const admin = createClient(Deno.env.get('SUPABASE_URL')!, serviceKey(), {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    // 1) Who is calling? Verify their login token, then check they are in the admins table.
    const token = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '')
    const { data: caller, error: callerError } = await admin.auth.getUser(token)
    const myEmail = caller?.user?.email?.toLowerCase()
    if (callerError || !myEmail) return json({ error: 'Please sign in again.' }, 401)

    const { data: adminRows, error: adminsError } = await admin.from('admins').select('email')
    if (adminsError) return json({ error: 'Could not read the admin list.' }, 500)
    const admins = (adminRows ?? []).map((r: { email: string }) => r.email.toLowerCase())
    if (!admins.includes(myEmail)) return json({ error: 'You are not allowed to do this.' }, 403)

    const body = await req.json().catch(() => ({}))
    const email = String(body.email ?? '').trim().toLowerCase()

    // Small project: one page of up to 1000 users is plenty
    const findUser = async (e: string) => {
      const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 })
      return data?.users?.find((u: { email?: string }) => u.email?.toLowerCase() === e)
    }

    // 2) Actions
    if (body.action === 'list') {
      const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 })
      const users = new Map((data?.users ?? []).map((u: { email?: string }) => [u.email?.toLowerCase(), u]))
      return json({
        admins: admins.sort().map((e: string) => {
          const u = users.get(e) as { created_at?: string; last_sign_in_at?: string } | undefined
          return { email: e, hasAccount: !!u, createdAt: u?.created_at ?? null, lastSignInAt: u?.last_sign_in_at ?? null, isYou: e === myEmail }
        }),
      })
    }

    if (body.action === 'create') {
      const password = String(body.password ?? '')
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: 'Enter a valid email address.' }, 400)
      if (password.length < 8) return json({ error: 'The password must be at least 8 characters.' }, 400)
      const { error: createError } = await admin.auth.admin.createUser({ email, password, email_confirm: true })
      const existed = !!createError && /already|registered|exists/i.test(createError.message)
      if (createError && !existed) return json({ error: createError.message }, 400)
      if (!admins.includes(email)) { // (emails are compared in lower case so "Kim@x.com" and "kim@x.com" never become two admins)
        const { error: insertError } = await admin.from('admins').insert({ email })
        if (insertError) return json({ error: 'Could not save the new admin.' }, 500)
      }
      return json({ ok: true, existed }) // an existing account keeps its current password
    }

    if (body.action === 'remove') {
      if (!admins.includes(email)) return json({ error: 'That person is not an admin.' }, 404)
      if (email === myEmail) return json({ error: "You can't remove your own admin access." }, 400)
      if (admins.length <= 1) return json({ error: 'There must always be at least one admin.' }, 400)
      // delete using the email exactly as stored (it may have been typed with capitals in the SQL)
      const stored = (adminRows ?? []).find((r: { email: string }) => r.email.toLowerCase() === email)!.email
      const { error: deleteRowError } = await admin.from('admins').delete().eq('email', stored)
      if (deleteRowError) return json({ error: 'Could not remove the admin.' }, 500)
      const user = await findUser(email)
      if (user) await admin.auth.admin.deleteUser(user.id)
      return json({ ok: true })
    }

    return json({ error: 'Unknown action.' }, 400)
  } catch {
    return json({ error: 'Something went wrong.' }, 500)
  }
})
