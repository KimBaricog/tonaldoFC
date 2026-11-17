import { useEffect } from 'react'

export default function Lightbox({ images, index, onClose, onChange }) {
  const total = images.length
  const current = images[index]
  const go = (step) => onChange((index + step + total) % total)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  })

  if (!current) return null
  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}>
      <button className="lb-close" aria-label="Close" onClick={onClose}>✕</button>
      {total > 1 && <button className="lb-nav prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1) }}>‹</button>}
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={current.src} alt={current.alt} />
        <figcaption><span>{current.caption}</span><em>{index + 1} / {total}</em></figcaption>
      </figure>
      {total > 1 && <button className="lb-nav next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1) }}>›</button>}
    </div>
  )
}
