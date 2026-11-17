import { useEffect, useRef, useState } from 'react'
import { updateCoach, deleteCoach } from '../../services/coachAdminService'
import { initials } from '../../utils/initials'

export default function CoachCard({ coach, index, total, onMove, onChanged }) {
  const fileRef = useRef(null)
  const [name, setName] = useState(coach.name)
  const [role, setRole] = useState(coach.role)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const dirty = name.trim() !== coach.name || role.trim() !== coach.role || file !== null

  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview])

  const choose = (e) => {
    const f = e.target.files[0]
    e.target.value = ''
    if (f && f.type.startsWith('image/')) { setFile(f); setPreview(URL.createObjectURL(f)) }
  }
  const run = async (action) => {
    setBusy(true); setError('')
    try { await action(); await onChanged() } catch { setError('Something went wrong. Please try again.') }
    setBusy(false)
  }
  const save = () => run(async () => { await updateCoach(coach, { name: name.trim(), role: role.trim(), file }); setFile(null); setPreview(null) })
  const remove = () => window.confirm(`Remove ${coach.name} from the website? This cannot be undone.`) && run(() => deleteCoach(coach))

  const shown = preview || coach.src
  return (
    <div className="adm-coach">
      <button type="button" className="adm-avatar" onClick={() => fileRef.current.click()} aria-label={`Change photo for ${coach.name}`}>
        {shown ? <img src={shown} alt="" /> : <span>{initials(name)}</span>}
        <small>{shown ? 'Change photo' : 'Add photo'}</small>
      </button>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={choose} />
      <div className="adm-fields">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" aria-label="Name" />
        <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" aria-label="Role" />
        <div className="adm-actions">
          <button className="btn sm" onClick={save} disabled={!dirty || busy || !name.trim()}>{busy ? 'Working…' : 'Save'}</button>
          <span className="adm-move">
            <button aria-label="Move up" onClick={() => onMove(index, -1)} disabled={busy || index === 0}>▲</button>
            <button aria-label="Move down" onClick={() => onMove(index, 1)} disabled={busy || index === total - 1}>▼</button>
          </span>
          <button className="adm-del" onClick={remove} disabled={busy}>Delete</button>
        </div>
        {error && <small className="adm-err">{error}</small>}
      </div>
    </div>
  )
}
