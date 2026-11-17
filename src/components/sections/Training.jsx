import { PILLARS } from '../../data/content'
import { img } from '../../utils/img'

export default function Training() {
  return (
    <section className="dark">
      <div>
        <div className="kick gold">1-on-1 football training</div>
        <h2>The total football development experience.</h2>
        <p>Every session combines technical drills, tactical understanding and match play, guided by coaches who track progress and set clear next steps.</p>
        <ul className="chk">{PILLARS.map((p) => <li key={p}><i>✓</i>{p}</li>)}</ul>
        <a href="#contact" className="btn">Enquire now</a>
      </div>
      <img className="photo" src={img('train.jpg')} alt="Tonaldo FC players training" />
    </section>
  )
}
