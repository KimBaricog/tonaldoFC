import { useContent, edit } from '../../context/ContentContext'
import { img } from '../../utils/img'

export default function Hero() {
  const h = useContent('hero')
  return (
    <section className="hero" id="top">
      <div className="stripes" />
      <div className="hero-copy">
        <div className="tag" {...edit('hero.tag')}><i />{h.tag}</div>
        <h1>
          <span {...edit('hero.line1')}>{h.line1}</span><br />
          <span {...edit('hero.line2')}>{h.line2}</span><br />
          <span {...edit('hero.line3')}>{h.line3}</span>
        </h1>
        <p {...edit('hero.text')}>{h.text}</p>
        <div className="row">
          <a href="#contact" className="btn" {...edit('hero.primaryButton')}>{h.primaryButton}</a>
          <a href="#about" className="btn ghost" {...edit('hero.secondaryButton')}>{h.secondaryButton}</a>
        </div>
      </div>
      <div className="hero-photo">
        <img src={img('hero.jpg')} alt="Coach with a young Tonaldo FC player" />
        <div className="float f1"><span className="ic">★</span><div><span {...edit('hero.badge1Title')}>{h.badge1Title}</span><em {...edit('hero.badge1Text')}>{h.badge1Text}</em></div></div>
        <div className="float f2"><span className="ic">7</span><div><span {...edit('hero.badge2Title')}>{h.badge2Title}</span><em {...edit('hero.badge2Text')}>{h.badge2Text}</em></div></div>
      </div>
    </section>
  )
}
