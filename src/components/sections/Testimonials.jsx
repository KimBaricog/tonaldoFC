import SectionHead from '../ui/SectionHead'
import { useContent, edit } from '../../context/ContentContext'

export default function Testimonials() {
  const c = useContent('testimonials')
  return (
    <section className="sec">
      <SectionHead kick={c.kick} title={c.title} path="testimonials" />
      <div className="grid g3">
        {c.items.map((q, i) => (
          <div className="t" key={i}>
            <div className="stars">★★★★★</div>
            <p {...edit(`testimonials.items.${i}.quote`)}>“{q.quote}”</p>
            <div className="who">
              <div className="av">{(q.initial || q.who || '?')[0]}</div>
              <div><span {...edit(`testimonials.items.${i}.who`)}>{q.who}</span><small {...edit(`testimonials.items.${i}.detail`)}>{q.detail}</small></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
