import { supabase, createIsolatedClient } from '../lib/supabase'

// Calls the "admin-users" Edge Function (supabase/functions/admin-users/index.ts)
async function call(body) {
  const { data, error } = await supabase.functions.invoke('admin-users', { body })
  if (error) {
    let message = 'Something went wrong. Please try again.'
    try { const j = await error.context.json(); if (j?.error) message = j.error } catch { /* keep the default message */ }
    throw new Error(message)
  }
  if (data?.error) throw new Error(data.error)
  return data
}

export const listAdmins = async () => (await call({ action: 'list' })).admins
export const addAdmin = (email, password) => call({ action: 'create', email, password })
export const removeAdmin = (email) => call({ action: 'remove', email })

// Changes the signed-in admin's own password. The current password is checked first.
export async function changeOwnPassword(email, currentPassword, newPassword) {
  const { error: checkError } = await createIsolatedClient().auth.signInWithPassword({ email, password: currentPassword })
  if (checkError) throw new Error('Your current password is incorrect.')
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw new Error(error.message)
}
