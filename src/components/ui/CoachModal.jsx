import { useEffect } from 'react'
import { initials } from '../../utils/initials'

export default function CoachModal({ coach, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])

  return (
    <div className="cm" role="dialog" aria-modal="true" aria-label={`About ${coach.name}`} onClick={onClose}>
      <div className="cm-box" onClick={(e) => e.stopPropagation()}>
        <button className="cm-close" aria-label="Close" onClick={onClose}>✕</button>
        <div className="cm-photo">{coach.src ? <img src={coach.src} alt={coach.name} /> : <span className="ph-initials">{initials(coach.name)}</span>}</div>
        <div className="cm-body">
          <div className="kick">{coach.role}</div>
          <h3>{coach.name}</h3>
          <p>{coach.details}</p>
        </div>
      </div>
    </div>
  )
}
