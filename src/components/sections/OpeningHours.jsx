import { HOURS } from '../../data/content'

export default function OpeningHours() {
  return (
    <section className="sec two">
      <div>
        <div className="kick">Training times</div>
        <h2 className="h2">Open every day of the week</h2>
        <p className="lead">Book a session any day at our Melton base. Weekday evenings suit school and work schedules.</p>
        <a href="#contact" className="btn dk">Check availability</a>
      </div>
      <div className="tbl">
        <div className="th">Opening hours</div>
        {HOURS.map(([day, time]) => <div className="r" key={day}>{day}<span>{time}</span></div>)}
      </div>
    </section>
  )
}
