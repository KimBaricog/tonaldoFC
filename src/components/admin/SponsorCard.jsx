import { useEffect, useRef, useState } from 'react'
import { updateSponsor, deleteSponsor } from '../../services/sponsorAdminService'
import { initials } from '../../utils/initials'

export default function SponsorCard({ sponsor, index, total, onMove, onChanged }) {
  const fileRef = useRef(null)
  const [name, setName] = useState(sponsor.name)
  const [tier, setTier] = useState(sponsor.tier)
  const [website, setWebsite] = useState(sponsor.website)
  const [blurb, setBlurb] = useState(sponsor.blurb)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const dirty = name.trim() !== sponsor.name || tier !== sponsor.tier || website.trim() !== sponsor.website || blurb.trim() !== sponsor.blurb || file !== null

  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview])

  const choose = (e) => {
    const f = e.target.files[0]
    e.target.value = ''
    if (f && f.type.startsWith('image/')) { setFile(f); setPreview(URL.createObjectURL(f)) }
  }
  const run = async (action) => {
    setBusy(true); setError('')
    try { await action(); await onChanged() } catch (err) { setError(err.message?.includes('website') ? err.message : 'Something went wrong. Please try again.') }
    setBusy(false)
  }
  const save = () => run(async () => { await updateSponsor(sponsor, { name: name.trim(), tier, website, blurb: blurb.trim(), file }); setFile(null); setPreview(null) })
  const remove = () => window.confirm(`Remove ${sponsor.name} from the website? This cannot be undone.`) && run(() => deleteSponsor(sponsor))

  const shown = preview || sponsor.logo
  return (
    <div className="adm-coach">
      <button type="button" className="adm-avatar logo" onClick={() => fileRef.current.click()} aria-label={`Change logo for ${sponsor.name}`}>
        {shown ? <img src={shown} alt="" /> : <span>{initials(name)}</span>}
        <small>{shown ? 'Change logo' : 'Add logo'}</small>
      </button>
      <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" hidden onChange={choose} />
      <div className="adm-fields">
        <input value={name} maxLength={80} onChange={(e) => setName(e.target.value)} placeholder="Sponsor name" aria-label="Name" />
        <select value={tier} onChange={(e) => setTier(e.target.value)} aria-label="Sponsor level">
          <option value="partner">Partner (logo wall)</option>
          <option value="principal">Principal partner (large featured card)</option>
        </select>
        <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website (optional)" aria-label="Website" />
        <input value={blurb} maxLength={160} onChange={(e) => setBlurb(e.target.value)} placeholder="Short description" aria-label="Description" />
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
