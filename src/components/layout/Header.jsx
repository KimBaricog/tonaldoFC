import { useState } from "react";
import { EMAIL, PHONE, NAV_LINKS } from "../../data/content";
import { img } from "../../utils/img";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav-wrap">
      <nav className="nav">
        <a href="#top" className="brand">
          <img src={img("crest.png")} alt="Tonaldo FC crest" />
          <div>
            TONALDO FC<small>FOOTBALL ACADEMY</small>
          </div>
        </a>
        <ul className={open ? "open" : ""}>
          {NAV_LINKS.map(([label, href]) => (
            <li key={label}>
              <a href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn nav-cta">
          For Bookings
        </a>
        <button
          className="burger"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <i />
        </button>
      </nav>
    </header>
  );
}
