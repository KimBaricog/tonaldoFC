import { useEffect, useState } from "react";
import SectionHead from "../ui/SectionHead";
import { ADDRESS, EMAIL, PHONE, HOURS } from "../../data/content";
import { getOpenStatus } from "../../utils/openStatus";
import "./style/map.css";

export default function MapBlock() {
  const [status, setStatus] = useState(getOpenStatus);
  useEffect(() => {
    const timer = setInterval(() => setStatus(getOpenStatus()), 60000);
    return () => clearInterval(timer);
  }, []);

  const query = encodeURIComponent(`${ADDRESS.replace("·", ",")}, Australia`);
  const embedUrl = `https://www.google.com/maps?q=${query}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <section className="sec" id="find-us">
      <SectionHead
        kick="Find us"
        title="Visit the academy"
        text="Come and train with us at our Melton base."
      />
      <div className="map-wrap">
        <aside className="map-card">
          <div className="kick gold">Tonaldo FC</div>
          <h3>Football Academy</h3>
          <span className={`map-status ${status.open ? "on" : "off"}`}>
            <i />
            {status.text}
          </span>

          <ul className="map-info">
            <li>
              <span className="mi">⌖</span>
              <span>{ADDRESS}</span>
            </li>
            <li>
              <span className="mi">✆</span>
              <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}>{PHONE}</a>
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
            <a
              className="btn ghost"
              href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
            >
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
            title="Map showing the Tonaldo FC location"
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
