import { useState } from 'react'
import { signIn } from '../../services/adminService'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await signIn(email.trim(), password)
    } catch {
      setError('Incorrect email or password.')
      setBusy(false)
    }
  }

  return (
    <form className="adm-card adm-login" onSubmit={submit}>
      <h1>Admin sign in</h1>
      <p>Sign in to manage the gallery photos.</p>
      <input type="email" required placeholder="Email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" required placeholder="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <small className="adm-err">{error}</small>}
      <button className="btn wide" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
    </form>
  )
}
