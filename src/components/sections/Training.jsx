import { useContent, edit } from '../../context/ContentContext'
import { img } from '../../utils/img'

export default function Training() {
  const c = useContent('training')
  return (
    <section className="dark">
      <div>
        <div className="kick gold" {...edit('training.kick')}>{c.kick}</div>
        <h2 {...edit('training.title')}>{c.title}</h2>
        <p {...edit('training.text')}>{c.text}</p>
        <ul className="chk">{c.pillars.map((p, i) => <li key={i} {...edit(`training.pillars.${i}`)}><i>✓</i>{p}</li>)}</ul>
        <a href="#contact" className="btn" {...edit('training.button')}>{c.button}</a>
      </div>
      <img className="photo" src={img('train.jpg')} alt="Tonaldo FC players training" />
    </section>
  )
}
