import SectionHead from '../ui/SectionHead'
import { useContent, edit } from '../../context/ContentContext'
import { img } from '../../utils/img'

export default function Programs() {
  const c = useContent('programs')
  return (
    <section className="sec" id="programs">
      <SectionHead kick={c.kick} title={c.title} text={c.text} path="programs" />
      <div className="grid g4">
        {c.items.map((p, i) => {
          const photo = p.photo ? `url(${img(p.photo)})` : 'linear-gradient(135deg,#2a2a2a,#0a0a0a)'
          return (
            <article className="prog" key={i}>
              <div className="top" style={{ backgroundImage: `linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.8)),${photo}` }}>
                <b {...edit(`programs.items.${i}.tag`)}>{p.tag}</b><span {...edit(`programs.items.${i}.age`)}>{p.age}</span>
              </div>
              <div className="bd">
                <h3 {...edit(`programs.items.${i}.name`)}>{p.name}</h3>
                <p {...edit(`programs.items.${i}.text`)}>{p.text}</p>
                <ul>{p.pts.map((x, j) => <li key={j} {...edit(`programs.items.${i}.pts.${j}`)}>{x}</li>)}</ul>
                <a href="#contact" className="lnk" {...edit('programs.linkText')}>{c.linkText}</a>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
