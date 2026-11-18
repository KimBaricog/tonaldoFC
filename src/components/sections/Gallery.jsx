import { useEffect, useMemo, useRef, useState } from "react";
import SectionHead from "../ui/SectionHead";
import Lightbox from "../ui/Lightbox";
import useGallery from "../../hooks/useGallery";
import useSlider from "../../hooks/useSlider";
import useAutoplay from "../../hooks/useAutoplay";
import useInView from "../../hooks/useinView";
import "./style/gallery.css";

const AUTO_SLIDE_MS = 2000; // time between automatic slides
const MAX_DOTS = 8; // more pages than this: show "3 / 12" instead of dots

export default function Gallery() {
  const { images, loading, error } = useGallery();
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null); // index of the open photo in `visible`
  const [playing, setPlaying] = useState(true); // the visitor's play/pause button
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const touchTimer = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  const categories = useMemo(
    () => ["All", ...new Set(images.map((i) => i.category))],
    [images],
  );
  const visible =
    category === "All" ? images : images.filter((i) => i.category === category);
  const { ref, page, pages, measure, goTo, canSlide } = useSlider(
    visible.length,
  );

  // start from the first photo whenever the filter or the list changes
  useEffect(() => {
    ref.current?.scrollTo({ left: 0 });
    measure();
  }, [category, visible.length, loading, measure, ref]);
  useEffect(() => () => clearTimeout(touchTimer.current), []);

  // slide automatically, but not while the visitor hovers, focuses, touches, has a photo open, or scrolled away
  const paused =
    !playing || hovered || focused || touching || active !== null || !inView;
  useAutoplay({
    enabled: canSlide,
    paused,
    page,
    pages,
    goTo,
    delay: AUTO_SLIDE_MS,
  });

  const pick = (c) => {
    setCategory(c);
    setActive(null);
  };
  const onTouchStart = () => {
    clearTimeout(touchTimer.current);
    setTouching(true);
  };
  const onTouchEnd = () => {
    touchTimer.current = setTimeout(() => setTouching(false), 6000);
  };

  return (
    <section className="sec" id="gallery" ref={sectionRef}>
      <SectionHead
        kick="Gallery"
        title="See the academy in action"
        text="Training sessions, players and coaches from around Tonaldo FC."
      />

      {categories.length > 2 && (
        <div className="chips" role="tablist">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={c === category}
              className={c === category ? "chip on" : "chip"}
              onClick={() => pick(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="g-slider">
          <div className="g-track">
            {Array.from({ length: 3 }, (_, i) => (
              <div className="g-item g-slide skel" key={i} />
            ))}
          </div>
        </div>
      )}
      {error && (
        <p className="g-msg">
          Sorry, the photos couldn't be loaded. Please try again later.
        </p>
      )}
      {!loading && !error && visible.length === 0 && (
        <p className="g-msg">Photos coming soon.</p>
      )}

      {!loading && !error && visible.length > 0 && (
        <>
          <div
            className="g-slider"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {canSlide && (
              <button
                className="sl-btn prev"
                aria-label="Previous photos"
                onClick={() => goTo(page <= 0 ? pages - 1 : page - 1)}
              >
                ‹
              </button>
            )}
            <div
              className={`g-track${canSlide ? "" : " few"}`}
              ref={ref}
              onScroll={measure}
              tabIndex={0}
              aria-label="Gallery photos"
            >
              {visible.map((p, i) => (
                <button
                  key={p.id}
                  className="g-item g-slide"
                  onClick={() => setActive(i)}
                  aria-label={`View photo: ${p.caption || p.alt}`}
                >
                  <img src={p.src} alt={p.alt} loading="lazy" />
                  <span className="g-cap">
                    <b>{p.category}</b>
                    {p.caption}
                  </span>
                </button>
              ))}
            </div>
            {canSlide && (
              <button
                className="sl-btn next"
                aria-label="Next photos"
                onClick={() => goTo(page >= pages - 1 ? 0 : page + 1)}
              >
                ›
              </button>
            )}
          </div>

          {canSlide && (
            <div className="g-controls">
              <button
                className="g-play"
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                onClick={() => setPlaying(!playing)}
              >
                {playing ? "❚❚" : "▶"}
              </button>
              {pages <= MAX_DOTS ? (
                <div
                  className="sl-dots"
                  role="tablist"
                  aria-label="Choose photos page"
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
              ) : (
                <span className="g-count">
                  {page + 1} / {pages}
                </span>
              )}
            </div>
          )}
        </>
      )}

      {active !== null && (
        <Lightbox
          images={visible}
          index={active}
          onClose={() => setActive(null)}
          onChange={setActive}
        />
      )}
    </section>
  );
}
