import { img } from '../../utils/img'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="stripes" />
      <div className="hero-copy">
        <div className="tag"><i />Now enrolling · Ages 5–17 and Adults</div>
        <h1>Train.<br />Develop.<br />Achieve.</h1>
        <p>Elite coaching and innovative, community-focused academy programs that build confident, skilled footballers in Melton.</p>
        <div className="row">
          <a href="#contact" className="btn">Book a session</a>
          <a href="#about" className="btn ghost">Meet the academy</a>
        </div>
      </div>
      <div className="hero-photo">
        <img src={img('hero.jpg')} alt="Coach with a young Tonaldo FC player" />
        <div className="float f1"><span className="ic">★</span><div>Elite coaching<em>International standards</em></div></div>
        <div className="float f2"><span className="ic">7</span><div>Open every day<em>Mon – Sun, Melton VIC</em></div></div>
      </div>
    </section>
  )
}
