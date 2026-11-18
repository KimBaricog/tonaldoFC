import { useCallback, useEffect, useRef, useState } from 'react'

// Scroll-snap slider helper: tracks how many slides fit, the current page, and prev/next scrolling.
// The number of slides per view comes from the CSS variable --pv on the track (set per screen size in coaches.css).
export default function useSlider(count) {
  const ref = useRef(null)
  const [perView, setPerView] = useState(3)
  const [page, setPage] = useState(0)

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    const pv = Math.max(1, parseInt(getComputedStyle(el).getPropertyValue('--pv'), 10) || 1)
    setPerView(pv)
    const slide = el.firstElementChild
    if (!slide) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const step = (slide.offsetWidth + gap) * pv
    setPage(Math.min(Math.round(el.scrollLeft / step), Math.max(0, Math.ceil(count / pv) - 1)))
  }, [count])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const goTo = (p) => {
    const el = ref.current
    const slide = el?.firstElementChild
    if (!slide) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollTo({ left: p * (slide.offsetWidth + gap) * perView, behavior: 'smooth' })
  }

  const pages = Math.ceil(count / perView)
  return { ref, perView, page, pages, measure, goTo, canSlide: count > perView }
}
