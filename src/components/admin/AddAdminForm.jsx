import { useState } from 'react'
import { addAdmin } from '../../services/adminUsersService'
import { generatePassword } from '../../utils/generatePassword'

export default function AddAdminForm({ onAdded }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [created, setCreated] = useState(null) // { email, password, existed }
  const [copied, setCopied] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true); setError(''); setCreated(null)
    try {
      const result = await addAdmin(email.trim(), password)
      setCreated({ email: email.trim().toLowerCase(), password, existed: result.existed })
      setEmail(''); setPassword(''); setShow(false)
      await onAdded()
    } catch (err) {
      setError(err.message)
    }
    setBusy(false)
  }
  const copy = async (text) => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* ignore */ }
  }

  return (
    <form className="adm-card" onSubmit={submit}>
      <h2>Add a new admin</h2>
      <p className="adm-muted adm-hint">Creates a login for them. Send them the email and password, and they can change the password after signing in.</p>
      <div className="adm-stack">
        <input type="email" required placeholder="Their email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="adm-pw">
          <input type={show ? 'text' : 'password'} required minLength={8} placeholder="Temporary password (8+ characters)" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="button" onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
          <button type="button" onClick={() => { setPassword(generatePassword()); setShow(true) }}>Generate</button>
        </div>
        <button className="btn" disabled={busy}>{busy ? 'Adding…' : 'Add admin'}</button>
      </div>
      {error && <small className="adm-err">{error}</small>}
      {created && (
        <div className="adm-created">
          <strong>{created.email} is now an admin.</strong>
          {created.existed
            ? <p>They already had an account, so their existing password still works.</p>
            : <>
                <p>Send them these login details. The password can't be shown again after you leave this page.</p>
                <code>Email: {created.email}{'\n'}Password: {created.password}{'\n'}Sign in at: {window.location.origin}/admin</code>
                <button type="button" className="btn sm" onClick={() => copy(`Email: ${created.email}\nPassword: ${created.password}\nSign in at: ${window.location.origin}/admin`)}>{copied ? 'Copied ✓' : 'Copy details'}</button>
              </>}
        </div>
      )}
    </form>
  )
}
