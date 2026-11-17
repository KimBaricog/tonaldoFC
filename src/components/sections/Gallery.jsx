import { useMemo, useRef, useState } from "react";
import SectionHead from "../ui/SectionHead";
import Lightbox from "../ui/Lightbox";
import useGallery from "../../hooks/useGallery";
import "./style/gallery.css";

const INITIAL_COUNT = 5; // photos shown before the "Show all" button (change this number to show more or fewer)

export default function Gallery() {
  const sectionRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const { images, loading, error } = useGallery();
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null); // index of the open photo in `visible`

  const categories = useMemo(
    () => ["All", ...new Set(images.map((i) => i.category))],
    [images],
  );
  const visible =
    category === "All" ? images : images.filter((i) => i.category === category);

  const shown = expanded ? visible : visible.slice(0, INITIAL_COUNT);
  const hiddenCount = visible.length - INITIAL_COUNT;

  const pick = (c) => {
    setCategory(c);
    setExpanded(false);
    setActive(null);
  };
  const toggle = () => {
    if (expanded) {
      setExpanded(false);
      // jump back to the top of the gallery so the visitor isn't left at the bottom of a shorter page
      requestAnimationFrame(() =>
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      );
    } else {
      setExpanded(true);
    }
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
        <div className="gallery">
          {Array.from({ length: 6 }, (_, i) => (
            <div className="g-item skel" key={i} />
          ))}
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
        <div className="gallery">
          {shown.map((p, i) => (
            <button
              key={p.id}
              className={`g-item${category === "All" && i === 0 ? " feat" : ""}${i >= INITIAL_COUNT ? " more" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`View photo: ${p.caption}`}
            >
              <img src={p.src} alt={p.alt} loading="lazy" />
              <span className="g-cap">
                <b>{p.category}</b>
                {p.caption}
              </span>
            </button>
          ))}
        </div>
      )}

      {!loading && !error && visible.length > INITIAL_COUNT && (
        <div className="g-more">
          <span>
            Showing {shown.length} of {visible.length} photos
          </span>
          <button className="btn dk" aria-expanded={expanded} onClick={toggle}>
            {expanded
              ? "Show less ↑"
              : `Show all photos (${hiddenCount} more) ↓`}
          </button>
        </div>
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
