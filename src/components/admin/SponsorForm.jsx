import { useEffect, useRef, useState } from 'react'
import { createSponsor } from '../../services/sponsorAdminService'
import { initials } from '../../utils/initials'

export default function SponsorForm({ nextOrder, onAdded }) {
  const fileRef = useRef(null)
  const [name, setName] = useState('')
  const [tier, setTier] = useState('partner')
  const [website, setWebsite] = useState('')
  const [blurb, setBlurb] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview])

  const choose = (e) => {
    const f = e.target.files[0]
    e.target.value = ''
    if (!f) return
    if (!f.type.startsWith('image/')) return setMessage({ type: 'err', text: 'Please choose an image file (PNG, JPG, SVG or WebP).' })
    setMessage(null)
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMessage(null)
    try {
      await createSponsor({ name: name.trim(), tier, website, blurb: blurb.trim(), file, order: nextOrder })
      setName(''); setTier('partner'); setWebsite(''); setBlurb(''); setFile(null); setPreview(null)
      setMessage({ type: 'ok', text: 'Sponsor added. They now appear on the website.' })
      await onAdded()
    } catch (err) {
      setMessage({ type: 'err', text: err.message?.includes('website') ? err.message : 'Could not add the sponsor. Please try again.' })
    }
    setBusy(false)
  }

  return (
    <form className="adm-card" onSubmit={submit}>
      <h2>Add a sponsor</h2>
      <div className="adm-coach-form">
        <button type="button" className="adm-avatar logo" onClick={() => fileRef.current.click()} aria-label="Choose logo">
          {preview ? <img src={preview} alt="" /> : <span>{name ? initials(name) : '+'}</span>}
          <small>{preview ? 'Change logo' : 'Add logo'}</small>
        </button>
        <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" hidden onChange={choose} />
        <div className="adm-fields">
          <input required maxLength={80} placeholder="Sponsor name" value={name} onChange={(e) => setName(e.target.value)} />
          <select value={tier} onChange={(e) => setTier(e.target.value)} aria-label="Sponsor level">
            <option value="partner">Partner (logo wall)</option>
            <option value="principal">Principal partner (large featured card)</option>
          </select>
          <input placeholder="Website (optional, e.g. example.com)" value={website} onChange={(e) => setWebsite(e.target.value)} />
          <input maxLength={160} placeholder="Short description (shown on the principal partner card)" value={blurb} onChange={(e) => setBlurb(e.target.value)} />
          <button className="btn" disabled={busy || !name.trim()}>{busy ? 'Adding…' : 'Add sponsor'}</button>
        </div>
      </div>
      <p className="adm-muted adm-hint">Tip: a logo on a transparent or white background looks best. Without a logo, the name is shown as text.</p>
      {message && <small className={message.type === 'ok' ? 'adm-ok' : 'adm-err'}>{message.text}</small>}
    </form>
  )
}
