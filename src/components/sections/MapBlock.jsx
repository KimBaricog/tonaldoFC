import { useEffect, useMemo, useState } from "react";
import SectionHead from "../ui/SectionHead";
import { useContent, edit } from "../../context/ContentContext";
import { fill } from "../../lib/contentUtils";
import { buildSchedule } from "../../utils/schedule";
import { getOpenStatus } from "../../utils/openStatus";
import "./style/map.css";

export default function MapBlock() {
  const c = useContent("locations");
  const hours = useContent("hours");
  const { email, phone } = useContent("site");
  const locations = c.items;
  const [activeId, setActiveId] = useState(null);

  // "Open now" badge, built from the same opening hours that are shown on the site (hidden if they can't be understood)
  const schedule = useMemo(() => buildSchedule(hours.items), [hours.items]);
  const [status, setStatus] = useState(() => getOpenStatus(schedule));
  useEffect(() => {
    const update = () => setStatus(getOpenStatus(schedule));
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, [schedule]);

  if (locations.length === 0) return null; // no locations: hide the section

  const index = Math.max(
    0,
    locations.findIndex((l) => l.id === activeId),
  );
  const loc = locations[index];
  const query = encodeURIComponent(loc.address || loc.mapQuery || loc.name);
  const zoom = loc.address ? 16 : 14;
  const embedUrl = `https://www.google.com/maps?q=${query}&z=${zoom}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  const tel = `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <section className="sec" id="find-us">
      <SectionHead
        kick={c.kick}
        title={c.title}
        text={fill(c.text, { count: locations.length })}
        path="locations"
      />

      <div className="chips loc-chips" role="tablist" aria-label="Locations">
        {locations.map((l, i) => (
          <button
            key={l.id || i}
            role="tab"
            aria-selected={i === index}
            className={i === index ? "chip on" : "chip"}
            onClick={() => setActiveId(l.id)}
            {...edit(`locations.items.${i}.name`)}
          >
            {l.name}
          </button>
        ))}
      </div>

      <div className="map-wrap">
        <aside className="map-card">
          <div className="kick gold" {...edit(`locations.items.${index}.note`)}>
            {loc.note || "Tonaldo FC"}
          </div>
          <h3 {...edit(`locations.items.${index}.name`)}>{loc.name}</h3>
          {status && (
            <span className={`map-status ${status.open ? "on" : "off"}`}>
              <i />
              {status.text}
            </span>
          )}

          <ul className="map-info">
            <li>
              <span className="mi">⌖</span>
              <span
                {...edit(
                  loc.address
                    ? `locations.items.${index}.address`
                    : "locations.noAddressText",
                )}
              >
                {loc.address || c.noAddressText}
              </span>
            </li>
            <li>
              <span className="mi">✆</span>
              <a href={tel} {...edit("site.phone")}>
                {phone}
              </a>
            </li>
            <li>
              <span className="mi">✉</span>
              <a href={`mailto:${email}`} {...edit("site.email")}>
                {email}
              </a>
            </li>
          </ul>

          <div className="map-hours">
            {hours.items.map((h, i) => (
              <div key={i}>
                <span {...edit(`hours.items.${i}.day`)}>{h.day}</span>
                <b {...edit(`hours.items.${i}.time`)}>{h.time}</b>
              </div>
            ))}
          </div>

          <div className="row">
            <a
              className="btn"
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              {...edit("locations.directionsButton")}
            >
              {c.directionsButton}
            </a>
            <a
              className="btn ghost"
              href={tel}
              {...edit("locations.callButton")}
            >
              {c.callButton}
            </a>
          </div>
        </aside>

        <div className="map-view">
          {/* decorative backdrop: visible while the real map loads (or if it is blocked) */}
          <div className="map-fallback" aria-hidden="true">
            <div className="map-pulse" />
          </div>
          <iframe
            key={loc.id || index}
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
