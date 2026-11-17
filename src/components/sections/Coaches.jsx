import SectionHead from "../ui/SectionHead";
import useCoaches from "../../hooks/useCoaches";
import { initials } from "../../utils/initials";
import "./style/coaches.css";

export default function Coaches() {
  const { coaches, loading, error } = useCoaches();
  // Nothing to show (no coaches added yet, or they couldn't load): hide the whole section
  if (!loading && (error || coaches.length === 0)) return null;

  return (
    <section className="sec" id="coaches">
      <SectionHead
        kick="Our coaches"
        title="Learn from people who love the game"
        text="Meet the coaches who train and inspire our players."
      />
      <div className="coach-list">
        {loading
          ? Array.from({ length: 3 }, (_, i) => (
              <div className="coach skel-card" key={i}>
                <div className="ph skel" />
              </div>
            ))
          : coaches.map((c) => (
              <div className="coach" key={c.id}>
                <div className="ph">
                  {c.src ? (
                    <img src={c.src} alt={c.name} loading="lazy" />
                  ) : (
                    <span className="ph-initials">{initials(c.name)}</span>
                  )}
                </div>
                <div className="bd">
                  <h3>{c.name}</h3>
                  <p>{c.role}</p>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
