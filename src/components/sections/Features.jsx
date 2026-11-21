import SectionHead from '../ui/SectionHead'
import { useContent, edit } from '../../context/ContentContext'

export default function Features() {
  const c = useContent('features')
  return (
    <section className="sec" id="about">
      <SectionHead kick={c.kick} title={c.title} text={c.text} path="features" />
      <div className="grid g3">
        {c.items.map((f, i) => (
          <div className="card" key={i}>
            <div className="ic lg">{f.icon}</div>
            <h3 {...edit(`features.items.${i}.title`)}>{f.title}</h3>
            <p {...edit(`features.items.${i}.text`)}>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
