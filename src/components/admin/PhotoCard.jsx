import { useState } from 'react'
import { updatePhoto, deletePhoto } from '../../services/adminService'

export default function PhotoCard({ photo, categories, onChanged }) {
  const [caption, setCaption] = useState(photo.caption)
  const [category, setCategory] = useState(photo.category)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const dirty = caption !== photo.caption || category !== photo.category

  const run = async (action) => {
    setBusy(true)
    setError('')
    try { await action(); await onChanged() } catch { setError('Something went wrong. Please try again.'); setBusy(false) }
  }
  const save = () => run(() => updatePhoto(photo.id, { caption: caption.trim(), category: category.trim() || 'General' }))
  const remove = () => window.confirm('Delete this photo from the website? This cannot be undone.') && run(() => deletePhoto(photo))

  return (
    <div className="adm-photo">
      <img src={photo.src} alt={photo.alt} loading="lazy" />
      <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption" aria-label="Caption" />
      <input list="adm-cats-edit" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" aria-label="Category" />
      <datalist id="adm-cats-edit">{categories.map((c) => <option key={c} value={c} />)}</datalist>
      <div className="adm-actions">
        <button className="btn sm" onClick={save} disabled={!dirty || busy}>{busy ? 'Working…' : 'Save'}</button>
        <button className="adm-del" onClick={remove} disabled={busy}>Delete</button>
      </div>
      {error && <small className="adm-err">{error}</small>}
    </div>
  )
}
