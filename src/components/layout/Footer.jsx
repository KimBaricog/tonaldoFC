import { useContent, edit } from '../../context/ContentContext'
import { img } from '../../utils/img'

export default function Footer() {
  const site = useContent('site')
  const nav = useContent('nav')
  const hours = useContent('hours')
  return (
    <footer>
      <div className="fg">
        <div>
          <div className="brand"><img src={img('crest.png')} alt="" /><div>TONALDO FC</div></div>
          <p {...edit('site.footerAbout')}>{site.footerAbout}</p>
        </div>
        <div><h5>Explore</h5><ul>{nav.items.map((item, i) => <li key={i}><a href={item.href}>{item.label}</a></li>)}</ul></div>
        <div><h5>Legal</h5><ul><li>Terms of Service</li><li>Privacy Policy</li><li>Login</li></ul></div>
        <div>
          <h5>Contact</h5>
          <p>
            <span {...edit('site.footerAddress')}>{site.footerAddress}</span><br />
            <span {...edit('site.email')}>{site.email}</span><br />
            <span {...edit('site.phone')}>{site.phone}</span>
          </p>
        </div>
      </div>
      <div className="fb">
        <span>© {new Date().getFullYear()} TONALDO FC. All rights reserved.</span>
        <span {...edit('hours.items')}>{hours.items.map((h) => `${h.day} ${h.time}`).join(' · ')}</span>
      </div>
    </footer>
  )
}
