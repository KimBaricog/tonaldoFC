import { STATS } from '../../data/content'

export default function Stats() {
  return (
    <section className="stats">
      {STATS.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
    </section>
  )
}
