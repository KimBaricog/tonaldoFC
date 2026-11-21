import { useState } from 'react'
import { useContent, edit } from '../../context/ContentContext'
import { img } from '../../utils/img'

export default function Header() {
  const [open, setOpen] = useState(false)
  const site = useContent('site')
  const nav = useContent('nav')
  return (
    <header className="nav-wrap">
      <div className="util">
        <div>
          <span {...edit('site.phone')}><b>Call</b> {site.phone}</span>
          <span {...edit('site.email')}><b>Email</b> {site.email}</span>
        </div>
        <div><span {...edit('site.topbar')}>{site.topbar}</span></div>
      </div>
      <nav className="nav">
        <a href="#top" className="brand">
          <img src={img('crest.png')} alt="Tonaldo FC crest" />
          <div>TONALDO FC<small>FOOTBALL ACADEMY</small></div>
        </a>
        <ul className={open ? 'open' : ''}>
          {nav.items.map((item, i) => (
            <li key={i}><a href={item.href} onClick={() => setOpen(false)} {...edit(`nav.items.${i}.label`)}>{item.label}</a></li>
          ))}
        </ul>
        <a href="#contact" className="btn nav-cta">{useContent('cta').button}</a>
        <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}><i /></button>
      </nav>
    </header>
  )
}
