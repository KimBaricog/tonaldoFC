import SectionHead from '../ui/SectionHead'
import { PROGRAMS } from '../../data/content'
import { img } from '../../utils/img'

export default function Programs() {
  return (
    <section className="sec" id="programs">
      <SectionHead kick="Programs" title="A pathway for every age and level" text="From a first touch of the ball to adult sessions, find the group that fits." />
      <div className="grid g4">
        {PROGRAMS.map((p) => (
          <article className="prog" key={p.name}>
            <div className="top" style={{ backgroundImage: `linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.8)),url(${img(p.photo)})` }}>
              <b>{p.tag}</b><span>{p.age}</span>
            </div>
            <div className="bd">
              <h3>{p.name}</h3>
              <p>{p.text}</p>
              <ul>{p.pts.map((x) => <li key={x}>{x}</li>)}</ul>
              <a href="#contact" className="lnk">Enquire →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
