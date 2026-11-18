import { useEffect, useRef } from "react";

// Moves a slider to the next page every `delay` ms, and back to the first page after the last one.
// Does nothing while `paused`, in background tabs, or if the visitor's device asks for reduced motion.
export default function useAutoplay({
  enabled,
  paused,
  page,
  pages,
  goTo,
  delay = 4000,
}) {
  const latest = useRef({ page, pages, goTo });
  latest.current = { page, pages, goTo };

  useEffect(() => {
    if (!enabled || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      const { page, pages, goTo } = latest.current;
      goTo(page >= pages - 1 ? 0 : page + 1);
    }, delay);
    return () => clearInterval(id);
  }, [enabled, paused, page, delay]); // `page` is a dependency so a manual change restarts the timer
}
