import { useState } from "react";
import SectionHead from "../ui/SectionHead";
import useSponsors from "../../hooks/useSponsors";
import { EMAIL } from "../../data/content";
import "./style/sponsors.css";

const Logo = ({ sponsor }) =>
  sponsor.logo ? (
    <img src={sponsor.logo} alt={sponsor.name} loading="lazy" />
  ) : (
    <span className="sp-word">{sponsor.name}</span>
  );

// A link when the sponsor has a website, a plain box otherwise. `hidden` marks the repeated copy used by the scrolling wall.
function Box({ sponsor, className, hidden, children }) {
  if (sponsor.website) {
    return (
      <a
        className={className}
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label={`${sponsor.name} (opens in a new tab)`}
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <div className={className} aria-hidden={hidden || undefined}>
      {children}
    </div>
  );
}

const MIN_CARDS = 10; // each half of the loop has at least this many cards so it always fills a wide screen
const SECONDS_PER_CARD = 3.2; // lower = faster

export default function Sponsors() {
  const { sponsors, loading, error } = useSponsors();
  const [playing, setPlaying] = useState(true);
  if (loading || error || sponsors.length === 0) return null; // nothing to show yet: hide the whole section

  const principal = sponsors.filter((s) => s.tier === "principal");
  const partners = sponsors.filter((s) => s.tier !== "principal");
  const scrolling = partners.length >= 2; // a single logo just sits in the middle
  // Repeat the logos until one half of the loop is wide enough, then use two halves so the loop has no gap
  const half = scrolling
    ? Array.from(
        { length: Math.ceil(MIN_CARDS / partners.length) },
        () => partners,
      ).flat()
    : partners;
  const wall = scrolling ? [...half, ...half] : partners;

  return (
    <section className="sec" id="sponsors">
      <SectionHead
        kick="Our partners"
        title="Proudly supported by"
        text="The businesses and people who back Tonaldo FC and help our players grow."
      />

      {principal.length > 0 && (
        <div className="sp-principal">
          {principal.map((s) => (
            <Box key={s.id} sponsor={s} className="sp-feature">
              <div className="sp-logo">
                <Logo sponsor={s} />
              </div>
              <div className="sp-text">
                <span className="sp-badge">Principal partner</span>
                <h3>{s.name}</h3>
                {s.blurb && <p>{s.blurb}</p>}
                {s.website && <span className="sp-visit">Visit website →</span>}
              </div>
            </Box>
          ))}
        </div>
      )}

      {partners.length > 0 && (
        <div
          className={`sp-wall${scrolling ? " marquee" : ""}${playing ? "" : " paused"}`}
          aria-label="Supporting partners"
        >
          <div
            className="sp-row"
            style={
              scrolling
                ? { "--spin": `${half.length * SECONDS_PER_CARD}s` }
                : undefined
            }
          >
            {wall.map((s, i) => (
              <Box
                key={`${s.id}-${i}`}
                sponsor={s}
                className="sp-card"
                hidden={scrolling && i >= partners.length}
              >
                <Logo sponsor={s} />
              </Box>
            ))}
          </div>
          {/*      {scrolling && (
            <button
              className="sp-ctrl"
              aria-label={playing ? "Pause scrolling" : "Resume scrolling"}
              onClick={() => setPlaying(!playing)}
            >
              {playing ? "❚❚" : "▶"}
            </button>
          )} */}
        </div>
      )}

      <div className="sp-cta">
        <div>
          <h3>Become a sponsor</h3>
          <p>
            Back local football and put your business in front of our players,
            families and community.
          </p>
        </div>
        <a
          className="btn"
          href={`mailto:${EMAIL}?subject=${encodeURIComponent("Sponsorship enquiry")}`}
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
