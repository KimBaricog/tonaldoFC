import SectionHead from '../ui/SectionHead'
import { FEATURES } from '../../data/content'

export default function Features() {
  return (
    <section className="sec" id="about">
      <SectionHead kick="Why Tonaldo FC" title="Excellence in football development" text="Premium training, elite coaching and global standards for ambitious players, in an environment where every member belongs." />
      <div className="grid g3">
        {FEATURES.map((f) => (
          <div className="card" key={f.title}>
            <div className="ic lg">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
