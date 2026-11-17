import { useEffect, useRef, useState } from 'react'
import { uploadPhoto } from '../../services/adminService'

const SUGGESTED = ['Training', 'Players', 'Coaches', 'Matches', 'Events']
const MAX_FILES = 20

export default function UploadForm({ categories, onUploaded }) {
  const inputRef = useRef(null)
  const [items, setItems] = useState([]) // { id, file, preview, caption }
  const [category, setCategory] = useState('Training')
  const [drag, setDrag] = useState(false)
  const [progress, setProgress] = useState(null) // { done, total }
  const [message, setMessage] = useState(null) // { type: 'ok' | 'err', text }

  useEffect(() => () => items.forEach((i) => URL.revokeObjectURL(i.preview)), []) // eslint-disable-line react-hooks/exhaustive-deps

  const addFiles = (fileList) => {
    const images = [...fileList].filter((f) => f.type.startsWith('image/'))
    const next = images.slice(0, MAX_FILES - items.length).map((file) => ({ id: crypto.randomUUID(), file, preview: URL.createObjectURL(file), caption: '' }))
    setItems((prev) => [...prev, ...next])
    setMessage(images.length < fileList.length ? { type: 'err', text: 'Only image files can be uploaded.' } : null)
  }
  const setCaption = (id, caption) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, caption } : i)))
  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  const submit = async (e) => {
    e.preventDefault()
    if (!items.length) return
    const cat = category.trim() || 'General'
    setMessage(null)
    setProgress({ done: 0, total: items.length })
    const failed = []
    for (const item of items) {
      try {
        await uploadPhoto({ file: item.file, caption: item.caption.trim(), category: cat })
        URL.revokeObjectURL(item.preview)
      } catch {
        failed.push(item)
      }
      setProgress((p) => ({ ...p, done: p.done + 1 }))
    }
    setItems(failed)
    setProgress(null)
    setMessage(failed.length
      ? { type: 'err', text: `${failed.length} photo(s) failed to upload and were kept in the list. Try again.` }
      : { type: 'ok', text: 'Upload complete. The photos are now on the website.' })
    onUploaded()
  }

  const busy = progress !== null
  return (
    <form className="adm-card" onSubmit={submit}>
      <h2>Upload photos</h2>
      <div
        className={`adm-drop${drag ? ' drag' : ''}`}
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files) }}
      >
        <strong>Click to choose photos</strong> or drag them here
        <small>Up to {MAX_FILES} at a time. Large photos are resized automatically.</small>
        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = '' }} />
      </div>

      {items.length > 0 && (
        <>
          <label className="adm-label">Category for these photos
            <input list="adm-cats" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Training" />
            <datalist id="adm-cats">{[...new Set([...categories, ...SUGGESTED])].map((c) => <option key={c} value={c} />)}</datalist>
          </label>
          <ul className="adm-queue">
            {items.map((i) => (
              <li key={i.id}>
                <img src={i.preview} alt="" />
                <input placeholder="Caption (optional)" value={i.caption} onChange={(e) => setCaption(i.id, e.target.value)} disabled={busy} />
                <button type="button" className="adm-x" aria-label="Remove" onClick={() => remove(i.id)} disabled={busy}>✕</button>
              </li>
            ))}
          </ul>
          <button className="btn" disabled={busy}>{busy ? `Uploading ${progress.done} of ${progress.total}…` : `Upload ${items.length} photo${items.length > 1 ? 's' : ''}`}</button>
        </>
      )}
      {message && <small className={message.type === 'ok' ? 'adm-ok' : 'adm-err'}>{message.text}</small>}
    </form>
  )
}
