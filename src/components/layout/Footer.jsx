import { EMAIL, PHONE, NAV_LINKS } from '../../data/content'
import { img } from '../../utils/img'

export default function Footer() {
  return (
    <footer>
      <div className="fg">
        <div>
          <div className="brand"><img src={img('crest.png')} alt="" /><div>TONALDO FC</div></div>
          <p>Inspiring excellence in football through elite coaching and community-focused academy programs. Ages 5–17 and Adults.</p>
        </div>
        <div><h5>Explore</h5><ul>{NAV_LINKS.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul></div>
        <div><h5>Legal</h5><ul><li>Terms of Service</li><li>Privacy Policy</li><li>Login</li></ul></div>
        <div><h5>Contact</h5><p>Kurunjang, Melton VIC 3337<br />{EMAIL}<br />{PHONE}</p></div>
      </div>
      <div className="fb">
        <span>© {new Date().getFullYear()} TONALDO FC. All rights reserved.</span>
        <span>Mon–Fri 9am–9pm · Sat 9am–12pm · Sun 9am–6pm</span>
      </div>
    </footer>
  )
}
