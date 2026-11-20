import { useEffect, useState } from 'react'
import Icon from './Icon'
import { fetchGalleryImages } from '../../services/galleryService'
import { fetchCoaches } from '../../services/coachService'
import { fetchSponsors } from '../../services/sponsorService'
import { listAdmins } from '../../services/adminUsersService'
import { initials } from '../../utils/initials'

export default function DashboardHome() {
  const [data, setData] = useState(null) // null while loading; a list is null if it couldn't be loaded

  useEffect(() => {
    let active = true
    Promise.allSettled([fetchGalleryImages(), fetchCoaches(), fetchSponsors(), listAdmins()]).then(([g, c, s, a]) => {
      if (active) setData({ photos: g.value ?? null, coaches: c.value ?? null, sponsors: s.value ?? null, admins: a.value ?? null })
    })
    return () => { active = false }
  }, [])

  const count = (list) => (data === null ? '…' : list ? list.length : '–')
  const STATS = [
    { id: 'gallery', label: 'Gallery photos', icon: 'image', value: count(data?.photos), tone: 'tone-gold' },
    { id: 'coaches', label: 'Coaches', icon: 'users', value: count(data?.coaches), tone: 'tone-ink' },
    { id: 'sponsors', label: 'Sponsors', icon: 'award', value: count(data?.sponsors), tone: 'tone-gold' },
    { id: 'admins', label: 'Admin accounts', icon: 'shield', value: count(data?.admins), tone: 'tone-ink' },
  ]

  return (
    <>
      <section className="adm-stats">
        {STATS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="adm-stat">
            <span className={`adm-stat-ic ${s.tone}`}><Icon name={s.icon} size={22} /></span>
            <div><strong>{s.value}</strong><span>{s.label}</span></div>
            <Icon name="arrow" size={18} />
          </a>
        ))}
      </section>

      <section className="adm-card">
        <h2>Quick actions</h2>
        <div className="adm-quick">
          <a href="#gallery" className="adm-qa"><Icon name="upload" /><span><strong>Upload photos</strong>Add new pictures to the gallery</span></a>
          <a href="#coaches" className="adm-qa"><Icon name="plus" /><span><strong>Add a coach</strong>Photo, name, role and details</span></a>
          <a href="#sponsors" className="adm-qa"><Icon name="plus" /><span><strong>Add a sponsor</strong>Upload a logo and link</span></a>
        </div>
      </section>

      <div className="adm-two">
        <section className="adm-card">
          <div className="adm-card-head"><h2>Latest photos</h2><a href="#gallery" className="adm-textlink">Manage gallery →</a></div>
          {data === null && <p className="adm-muted">Loading…</p>}
          {data && !data.photos && <small className="adm-err">Couldn't load the photos.</small>}
          {data?.photos?.length === 0 && <p className="adm-muted">No photos yet.</p>}
          <div className="adm-thumbs">
            {data?.photos?.slice(0, 8).map((p) => <img key={p.id} src={p.src} alt={p.alt} loading="lazy" />)}
          </div>
        </section>

        <div className="adm-stack-col">
          <section className="adm-card">
            <div className="adm-card-head"><h2>Coaches</h2><a href="#coaches" className="adm-textlink">Manage →</a></div>
            {data?.coaches?.length === 0 && <p className="adm-muted">No coaches yet.</p>}
            <ul className="adm-mini">
              {data?.coaches?.slice(0, 4).map((c) => (
                <li key={c.id}>
                  {c.src ? <img src={c.src} alt="" /> : <span className="adm-mini-ph">{initials(c.name)}</span>}
                  <div><strong>{c.name}</strong><small>{c.role || 'No role set'}</small></div>
                </li>
              ))}
            </ul>
          </section>
          <section className="adm-card">
            <div className="adm-card-head"><h2>Sponsors</h2><a href="#sponsors" className="adm-textlink">Manage →</a></div>
            {data?.sponsors?.length === 0 && <p className="adm-muted">No sponsors yet.</p>}
            <ul className="adm-mini">
              {data?.sponsors?.slice(0, 4).map((s) => (
                <li key={s.id}>
                  {s.logo ? <img className="logo" src={s.logo} alt="" /> : <span className="adm-mini-ph">{initials(s.name)}</span>}
                  <div><strong>{s.name}</strong><small>{s.tier === 'principal' ? 'Principal partner' : 'Partner'}</small></div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}
