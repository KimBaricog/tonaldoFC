import { useState } from 'react'
import { removeAdmin } from '../../services/adminUsersService'

const fmt = (iso) => (iso ? new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : null)

export default function AdminList({ admins, loading, error, onChanged }) {
  const [busy, setBusy] = useState(null)
  const [message, setMessage] = useState('')

  const remove = async (a) => {
    if (!window.confirm(`Remove ${a.email} as an admin? Their account will be deleted and they will no longer be able to sign in.`)) return
    setBusy(a.email); setMessage('')
    try { await removeAdmin(a.email); await onChanged() } catch (err) { setMessage(err.message) }
    setBusy(null)
  }

  return (
    <section className="adm-card">
      <h2>Admin accounts {!loading && !error && <span className="adm-count">{admins.length}</span>}</h2>
      {loading && <p className="adm-muted">Loading…</p>}
      {error && <small className="adm-err">{error}</small>}
      {message && <small className="adm-err">{message}</small>}
      <ul className="adm-people">
        {admins.map((a) => (
          <li key={a.email}>
            <span className="adm-initial">{a.email[0].toUpperCase()}</span>
            <div>
              <strong>{a.email} {a.isYou && <em className="adm-you">You</em>}</strong>
              <small>
                {a.hasAccount ? (a.lastSignInAt ? `Last signed in ${fmt(a.lastSignInAt)}` : 'Has not signed in yet') : 'No login account yet'}
                {a.createdAt && ` · Added ${fmt(a.createdAt)}`}
              </small>
            </div>
            {!a.isYou && <button className="adm-del" disabled={busy === a.email} onClick={() => remove(a)}>{busy === a.email ? 'Removing…' : 'Remove'}</button>}
          </li>
        ))}
      </ul>
    </section>
  )
}
