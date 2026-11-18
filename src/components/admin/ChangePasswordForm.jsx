import { useState } from 'react'
import { changeOwnPassword } from '../../services/adminUsersService'

export default function ChangePasswordForm({ email }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setMessage(null)
    if (next.length < 8) return setMessage({ type: 'err', text: 'The new password must be at least 8 characters.' })
    if (next !== confirm) return setMessage({ type: 'err', text: "The new passwords don't match." })
    if (next === current) return setMessage({ type: 'err', text: 'Choose a password different from your current one.' })
    setBusy(true)
    try {
      await changeOwnPassword(email, current, next)
      setCurrent(''); setNext(''); setConfirm('')
      setMessage({ type: 'ok', text: 'Password changed. Use the new one next time you sign in.' })
    } catch (err) {
      setMessage({ type: 'err', text: err.message })
    }
    setBusy(false)
  }

  return (
    <form className="adm-card" onSubmit={submit}>
      <h2>Change my password</h2>
      <p className="adm-muted adm-hint">Signed in as <strong>{email}</strong></p>
      <div className="adm-stack">
        <input type="password" required placeholder="Current password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} />
        <input type="password" required placeholder="New password (8+ characters)" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} />
        <input type="password" required placeholder="Confirm new password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <button className="btn" disabled={busy}>{busy ? 'Saving…' : 'Change password'}</button>
      </div>
      {message && <small className={message.type === 'ok' ? 'adm-ok' : 'adm-err'}>{message.text}</small>}
    </form>
  )
}
