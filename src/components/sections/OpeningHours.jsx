import { useContent, edit } from '../../context/ContentContext'

export default function OpeningHours() {
  const c = useContent('hours')
  return (
    <section className="sec two">
      <div>
        <div className="kick" {...edit('hours.kick')}>{c.kick}</div>
        <h2 className="h2" {...edit('hours.title')}>{c.title}</h2>
        <p className="lead" {...edit('hours.text')}>{c.text}</p>
        <a href="#contact" className="btn dk" {...edit('hours.button')}>{c.button}</a>
      </div>
      <div className="tbl">
        <div className="th" {...edit('hours.tableTitle')}>{c.tableTitle}</div>
        {c.items.map((h, i) => <div className="r" key={i}><span {...edit(`hours.items.${i}.day`)}>{h.day}</span><span {...edit(`hours.items.${i}.time`)}>{h.time}</span></div>)}
      </div>
    </section>
  )
}
