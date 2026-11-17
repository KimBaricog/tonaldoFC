import SectionHead from '../ui/SectionHead'
import { STEPS } from '../../data/content'

export default function Steps() {
  return (
    <section className="sec">
      <SectionHead kick="Getting started" title="Four steps to your first session" />
      <div className="steps">
        {STEPS.map(([title, text], i) => (
          <div className="step" key={title}><div className="n">{i + 1}</div><h3>{title}</h3><p>{text}</p></div>
        ))}
      </div>
    </section>
  )
}
