import SectionHead from '../ui/SectionHead'
import { useContent, edit } from '../../context/ContentContext'

export default function Steps() {
  const c = useContent('steps')
  return (
    <section className="sec">
      <SectionHead kick={c.kick} title={c.title} path="steps" />
      <div className="steps">
        {c.items.map((s, i) => (
          <div className="step" key={i}>
            <div className="n">{i + 1}</div>
            <h3 {...edit(`steps.items.${i}.title`)}>{s.title}</h3>
            <p {...edit(`steps.items.${i}.text`)}>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
