import { useContent, edit } from '../../context/ContentContext'

export default function Stats() {
  const { items } = useContent('stats')
  return (
    <section className="stats">
      {items.map((s, i) => <div key={i}><strong {...edit(`stats.items.${i}.value`)}>{s.value}</strong><span {...edit(`stats.items.${i}.label`)}>{s.label}</span></div>)}
    </section>
  )
}
