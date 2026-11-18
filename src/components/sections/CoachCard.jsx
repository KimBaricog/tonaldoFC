import { initials } from '../../utils/initials'

const LONG = 110 // details longer than this get a "Read more" link

export default function CoachCard({ coach, onOpen }) {
  const long = coach.details.length > LONG
  return (
    <article className="coach coach-slide">
      <div className="ph">
        {coach.src ? <img src={coach.src} alt={coach.name} loading="lazy" /> : <span className="ph-initials">{initials(coach.name)}</span>}
      </div>
      <div className="bd">
        <h3>{coach.name}</h3>
        <p className="role">{coach.role}</p>
        {coach.details && <p className="details">{coach.details}</p>}
        {long && <button className="more" onClick={() => onOpen(coach)}>Read more →</button>}
      </div>
    </article>
  )
}
