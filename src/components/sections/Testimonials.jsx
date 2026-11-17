import SectionHead from '../ui/SectionHead'
import { QUOTES } from '../../data/content'

export default function Testimonials() {
  return (
    <section className="sec">
      <SectionHead kick="Testimonials" title="What families say" />
      <div className="grid g3">
        {QUOTES.map(([initial, who, detail, quote]) => (
          <div className="t" key={initial}>
            <div className="stars">★★★★★</div>
            <p>“{quote}”</p>
            <div className="who"><div className="av">{initial}</div><div>{who}<small>{detail}</small></div></div>
          </div>
        ))}
      </div>
    </section>
  )
}
