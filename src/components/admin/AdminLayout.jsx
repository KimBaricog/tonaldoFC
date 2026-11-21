import { useEffect, useState } from 'react'
import Icon from './Icon'
import { img } from '../../utils/img'

const NAV = [
  { group: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard', icon: 'grid' }] },
  { group: 'Website content', items: [
    { id: 'content', label: 'Site content', icon: 'edit' },
    { id: 'gallery', label: 'Gallery', icon: 'image' },
    { id: 'coaches', label: 'Coaches', icon: 'users' },
    { id: 'sponsors', label: 'Sponsors', icon: 'award' },
  ] },
  { group: 'Settings', items: [{ id: 'admins', label: 'Admins & account', icon: 'shield' }] },
]

const TITLES = {
  dashboard: ['Dashboard', 'A quick look at your website content'],
  content: ['Site content', 'Edit the text of your website and see it live'],
  gallery: ['Gallery', 'Upload and manage the photos on your website'],
  coaches: ['Coaches', 'Add coaches, their photos and details'],
  sponsors: ['Sponsors', 'Manage your sponsors and their logos'],
  admins: ['Admins & account', 'Who can sign in, and your password'],
}

export default function AdminLayout({ tab, email, onSignOut, children }) {
  const [open, setOpen] = useState(false) // mobile menu
  const [title, subtitle] = TITLES[tab]

  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [tab])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="adm">
      <aside className={`adm-side${open ? ' open' : ''}`} aria-label="Admin menu">
        <a href="#dashboard" className="adm-logo">
          <img src={img('crest.png')} alt="" />
          <span>TONALDO FC<small>ADMIN</small></span>
        </a>

        <nav className="adm-nav">
          {NAV.map((g) => (
            <div key={g.group}>
              <div className="adm-nav-label">{g.group}</div>
              {g.items.map((i) => (
                <a key={i.id} href={`#${i.id}`} className={tab === i.id ? 'on' : ''} aria-current={tab === i.id ? 'page' : undefined}>
                  <Icon name={i.icon} /><span>{i.label}</span>
                </a>
              ))}
            </div>
          ))}
        </nav>

        <div className="adm-side-foot">
          <a href="/" target="_blank" rel="noreferrer" className="adm-viewsite"><Icon name="external" size={16} /> View website</a>
          <div className="adm-user">
            <span className="adm-avatar-sm">{email[0].toUpperCase()}</span>
            <div><strong title={email}>{email}</strong><small>Administrator</small></div>
            <button onClick={onSignOut} aria-label="Sign out" title="Sign out"><Icon name="logout" size={18} /></button>
          </div>
        </div>
      </aside>
      {open && <div className="adm-scrim" onClick={() => setOpen(false)} />}

      <div className="adm-body">
        <header className="adm-top">
          <button className="adm-burger" aria-label="Open menu" onClick={() => setOpen(true)}><Icon name="menu" /></button>
          <div className="adm-title"><h1>{title}</h1><p>{subtitle}</p></div>
          <a href="/" target="_blank" rel="noreferrer" className="adm-top-link"><Icon name="external" size={16} /> View website</a>
        </header>
        <main className={`adm-page${tab === 'content' ? ' wide' : ''}`}>{children}</main>
      </div>
    </div>
  )
}
