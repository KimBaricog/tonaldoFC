import { useEffect, useState } from "react";
import SectionHead from "../ui/SectionHead";
import { EMAIL, PHONE, HOURS } from "../../data/content";
import { LOCATIONS } from "../../data/locations";
import { getOpenStatus } from "../../utils/openStatus";
import "./style/map.css";

export default function MapBlock() {
  const [status, setStatus] = useState(getOpenStatus);
  const [activeId, setActiveId] = useState(LOCATIONS[0].id);
  useEffect(() => {
    const timer = setInterval(() => setStatus(getOpenStatus()), 60000);
    return () => clearInterval(timer);
  }, []);

  const loc = LOCATIONS.find((l) => l.id === activeId) ?? LOCATIONS[0];
  const query = encodeURIComponent(loc.address || loc.mapQuery);
  const zoom = loc.address ? 16 : 14;
  const embedUrl = `https://www.google.com/maps?q=${query}&z=${zoom}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  const tel = `tel:${PHONE.replace(/[^+\d]/g, "")}`;

  return (
    <section className="sec" id="find-us">
      <SectionHead
        kick="Find us"
        title="Train near you"
        text={`Tonaldo FC runs sessions across ${LOCATIONS.length} locations. Pick yours to see it on the map.`}
      />

      <div className="chips loc-chips" role="tablist" aria-label="Locations">
        {LOCATIONS.map((l) => (
          <button
            key={l.id}
            role="tab"
            aria-selected={l.id === loc.id}
            className={l.id === loc.id ? "chip on" : "chip"}
            onClick={() => setActiveId(l.id)}
          >
            {l.name}
          </button>
        ))}
      </div>

      <div className="map-wrap">
        <aside className="map-card">
          <div className="kick gold">{loc.note || "Tonaldo FC"}</div>
          <h3>{loc.name}</h3>
          <span className={`map-status ${status.open ? "on" : "off"}`}>
            <i />
            {status.text}
          </span>

          <ul className="map-info">
            <li>
              <span className="mi">⌖</span>
              <span>
                {loc.address ||
                  "Contact us for the exact training venue and session times."}
              </span>
            </li>
            <li>
              <span className="mi">✆</span>
              <a href={tel}>{PHONE}</a>
            </li>
            <li>
              <span className="mi">✉</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
          </ul>

          <div className="map-hours">
            {HOURS.map(([day, time]) => (
              <div key={day}>
                <span>{day}</span>
                <b>{time}</b>
              </div>
            ))}
          </div>

          <div className="row">
            <a
              className="btn"
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Get directions
            </a>
            <a className="btn ghost" href={tel}>
              Call us
            </a>
          </div>
        </aside>

        <div className="map-view">
          {/* decorative backdrop: visible while the real map loads (or if it is blocked) */}
          <div className="map-fallback" aria-hidden="true">
            <div className="map-pulse" />
          </div>
          <iframe
            key={loc.id}
            title={`Map of Tonaldo FC ${loc.name}`}
            src={embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
