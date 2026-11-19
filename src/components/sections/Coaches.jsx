import { useEffect, useState } from "react";
import SectionHead from "../ui/SectionHead";
import CoachModal from "../ui/CoachModal";
import CoachCard from "./CoachCard";
import useCoaches from "../../hooks/useCoaches";
import useSlider from "../../hooks/useSlider";
import "./style/coaches.css";

export default function Coaches() {
  const { coaches, loading, error } = useCoaches();
  const [open, setOpen] = useState(null); // coach shown in the "Read more" window
  const { ref, page, pages, measure, goTo, canSlide } = useSlider(
    coaches.length,
  );

  useEffect(() => {
    measure();
  }, [coaches.length, loading, measure]);

  // Nothing to show (no coaches added yet, or they couldn't load): hide the whole section
  if (!loading && (error || coaches.length === 0)) return null;

  return (
    <section className="sec" id="coaches">
      <SectionHead
        kick="Our coaches"
        title="Learn from Our Certified and Experience Coaches"
      />

      <div className="slider">
        {canSlide && (
          <button
            className="sl-btn prev"
            aria-label="Previous coaches"
            onClick={() => goTo(Math.max(0, page - 1))}
            disabled={page === 0}
          >
            ‹
          </button>
        )}
        <div
          className={`coach-track${canSlide ? "" : " few"}`}
          ref={ref}
          onScroll={measure}
          tabIndex={0}
          aria-label="Coaches"
        >
          {loading
            ? Array.from({ length: 3 }, (_, i) => (
                <div className="coach coach-slide skel-card" key={i}>
                  <div className="ph skel" />
                </div>
              ))
            : coaches.map((c) => (
                <CoachCard key={c.id} coach={c} onOpen={setOpen} />
              ))}
        </div>
        {canSlide && (
          <button
            className="sl-btn next"
            aria-label="Next coaches"
            onClick={() => goTo(Math.min(pages - 1, page + 1))}
            disabled={page >= pages - 1}
          >
            ›
          </button>
        )}
      </div>

      {canSlide && (
        <div
          className="sl-dots"
          role="tablist"
          aria-label="Choose coaches page"
        >
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === page}
              aria-label={`Page ${i + 1}`}
              className={i === page ? "on" : ""}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}

      {open && <CoachModal coach={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
