import { useContent, edit } from '../../context/ContentContext'

export default function CallToAction() {
  const c = useContent('cta')
  return (
    <section className="cta">
      <div>
        <h2 {...edit('cta.title')}>{c.title}</h2>
        <p {...edit('cta.text')}>{c.text}</p>
      </div>
      <a href="#contact" className="btn big" {...edit('cta.button')}>{c.button}</a>
    </section>
  )
}
