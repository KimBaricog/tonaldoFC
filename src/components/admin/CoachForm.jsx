import { useEffect, useRef, useState } from 'react'
import { createCoach } from '../../services/coachAdminService'
import { initials } from '../../utils/initials'

export default function CoachForm({ nextOrder, onAdded }) {
  const fileRef = useRef(null)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview])

  const choose = (e) => {
    const f = e.target.files[0]
    e.target.value = ''
    if (!f) return
    if (!f.type.startsWith('image/')) return setMessage({ type: 'err', text: 'Please choose an image file.' })
    setMessage(null)
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMessage(null)
    try {
      await createCoach({ name: name.trim(), role: role.trim(), file, order: nextOrder })
      setName(''); setRole(''); setFile(null); setPreview(null)
      setMessage({ type: 'ok', text: 'Coach added. They now appear on the website.' })
      await onAdded()
    } catch {
      setMessage({ type: 'err', text: 'Could not add the coach. Please try again.' })
    }
    setBusy(false)
  }

  return (
    <form className="adm-card" onSubmit={submit}>
      <h2>Add a coach</h2>
      <div className="adm-coach-form">
        <button type="button" className="adm-avatar" onClick={() => fileRef.current.click()} aria-label="Choose photo">
          {preview ? <img src={preview} alt="" /> : <span>{name ? initials(name) : '+'}</span>}
          <small>{preview ? 'Change photo' : 'Add photo'}</small>
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={choose} />
        <div className="adm-fields">
          <input required placeholder="Name (e.g. Alex Silva)" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Role (e.g. Head coach)" value={role} onChange={(e) => setRole(e.target.value)} />
          <button className="btn" disabled={busy || !name.trim()}>{busy ? 'Adding…' : 'Add coach'}</button>
        </div>
      </div>
      {message && <small className={message.type === 'ok' ? 'adm-ok' : 'adm-err'}>{message.text}</small>}
    </form>
  )
}
