import { useState } from "react";

const EMAIL = "tonaldofc@gmail.com";
const PHONE = "+61-0410889446";
const ADDRESS = "44 Wallangara Bvd, Harkness VIC 3337, Australia";
const img = (n) => `/images/${n}`;

const FEATURES = [
  {
    icon: "⚽",
    title: "World-class training",
    text: "Advanced techniques and elite facilities tailored for ambitious players who want to move up a level.",
  },
  {
    icon: "★",
    title: "Elite coaching staff",
    text: "Learn from experienced, passionate coaches dedicated to nurturing the next generation of football stars.",
  },
  {
    icon: "⚑",
    title: "Community and teamwork",
    text: "Thrive in an inclusive environment rooted in discipline, respect and support for every member.",
  },
];
const PILLARS = [
  "Technical skills",
  "Game intelligence",
  "Speed and agility",
  "Confidence and performance",
];
const PROGRAMS = [
  {
    age: "5–8",
    tag: "Foundation",
    name: "Juniors",
    text: "Fun, ball-first sessions that build confidence.",
    pts: ["Basic ball skills", "Games-based learning", "Small groups"],
    photo: "p1.jpg",
  },
  {
    age: "9–13",
    tag: "Development",
    name: "Youth",
    text: "Technique, positioning and teamwork.",
    pts: ["Technical drills", "Tactical basics", "Match play"],
    photo: "p2.jpg",
  },
  {
    age: "14–17",
    tag: "Performance",
    name: "Elite teens",
    text: "High-intensity training for the next level.",
    pts: ["Advanced tactics", "Strength and fitness", "Progress reviews"],
    photo: "p3.jpg",
  },
  {
    age: "18+",
    tag: "Open",
    name: "Adults",
    text: "Coached sessions to sharpen your game.",
    pts: ["Skills sessions", "Fitness and fun", "Flexible times"],
    photo: "p4.jpg",
  },
];
const STEPS = [
  ["Enquire", "Tell us the player's age and goals."],
  ["Book", "Choose a day and time that suits."],
  ["Train", "Join a coached session at your level."],
  ["Progress", "Get feedback and a clear next step."],
];
const STATS = [
  ["7", "Days a week"],
  ["5–17", "Youth ages"],
  ["18+", "Adult sessions"],
  ["1", "Community club"],
];
const HOURS = [
  ["Monday – Friday", "9:00am – 9:00pm"],
  ["Saturday", "9:00am – 12:00pm"],
  ["Sunday", "9:00am – 6:00pm"],
];
const COACHES = [
  { name: "Head coach", photo: "c1.jpg", badges: ["Academy lead", "All ages"] },
  { name: "Youth coach", photo: "c2.jpg", badges: ["Ages 9–13", "Technique"] },
  {
    name: "Goalkeeping coach",
    photo: "c3.jpg",
    badges: ["Goalkeepers", "All ages"],
  },
];
const QUOTES = [
  [
    "P",
    "Parent",
    "Melton",
    "Placeholder: a parent quote about their child's confidence and progress.",
  ],
  [
    "J",
    "Player",
    "Age 14",
    "Placeholder: a player quote about the coaching and team spirit.",
  ],
  [
    "A",
    "Adult player",
    "Melton",
    "Placeholder: an adult player quote about the sessions and community.",
  ],
];
const FAQS = [
  ["What ages do you coach?", "Players aged 5 to 17, and adults."],
  ["Can we try a session first?", "Placeholder answer about trial sessions."],
  [
    "What should players bring?",
    "Placeholder answer about kit, boots and water.",
  ],
  [
    "How do I book?",
    "Send an enquiry with the form or call us, and we will reply with available times.",
  ],
];
const LINKS = [
  ["Home", "#top"],
  ["About Us", "#about"],
  ["Programs", "#programs"],
  ["Contact Us", "#contact"],
];

const Head = ({ kick, title, text }) => (
  <div className="head">
    <div className="kick">{kick}</div>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>
);

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav-wrap">
      <div className="util">
        <div>
          <span>
            <b>Call</b> {PHONE}
          </span>
          <span>
            <b>Email</b> {EMAIL}
          </span>
        </div>
        <div>
          <span>Open 7 days · Melton, Victoria</span>
        </div>
      </div>
      <nav className="nav">
        <a href="#top" className="brand">
          <img src={img("crest.png")} alt="Tonaldo FC crest" />
          <div>
            TONALDO FC<small>FOOTBALL ACADEMY</small>
          </div>
        </a>
        <ul className={open ? "open" : ""}>
          {LINKS.map(([l, h]) => (
            <li key={l}>
              <a href={h} onClick={() => setOpen(false)}>
                {l}
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

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="stripes" />
      <div className="hero-copy">
        <div className="tag">
          <i />
          Now enrolling · Ages 5–17 and Adults
        </div>
        <h1>
          Train.
          <br />
          Develop.
          <br />
          Achieve.
        </h1>
        <p>
          Elite coaching and innovative, community-focused academy programs that
          build confident, skilled footballers in Melton.
        </p>
        <div className="row">
          <a href="#contact" className="btn">
            Book a session
          </a>
          <a href="#about" className="btn ghost">
            Meet the academy
          </a>
        </div>
      </div>
      <div className="hero-photo">
        <img src={img("hero.jpg")} alt="Coach with a young Tonaldo FC player" />
        <div className="float f1">
          <span className="ic">★</span>
          <div>
            Elite coaching<em>International standards</em>
          </div>
        </div>
        <div className="float f2">
          <span className="ic">7</span>
          <div>
            Open every day<em>Mon – Sun, Melton VIC</em>
          </div>
        </div>
      </div>
    </section>
  );
}

const Info = () => (
  <div className="info">
    {[
      ["⌖", "Location", ADDRESS],
      ["✆", "Contact", `${PHONE}\n${EMAIL}`],
      ["◷", "Hours", "Mon–Fri 9am–9pm\nSat 9am–12pm · Sun 9am–6pm"],
    ].map(([i, h, p]) => (
      <div key={h}>
        <span className="ic dk">{i}</span>
        <span>
          <h4>{h}</h4>
          <p>{p}</p>
        </span>
      </div>
    ))}
  </div>
);

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;
const EMPTY = { name: "", email: "", phone: "", age: "", msg: "", hp: "" };

function Enquiry() {
  const [f, setF] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | mail | error
  const [copied, setCopied] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (f.hp) return; // spam trap: real visitors never see or fill this field
    if (!FORM_ENDPOINT) {
      // No form service configured: fall back to the visitor's email app
      const body = `Name: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone}\nAge group: ${f.age}\n\n${f.msg}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Session enquiry")}&body=${encodeURIComponent(body)}`;
      setStatus("mail");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: f.name,
          email: f.email,
          phone: f.phone,
          age_group: f.age,
          message: f.msg,
          _subject: "New session enquiry",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setF(EMPTY);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="form">
      {status === "sent" ? (
        <div className="thanks">
          <div className="ic lg">✓</div>
          <h2>Enquiry sent</h2>
          <p>Thank you! We'll reply with available times as soon as we can.</p>
          <button className="btn dk" onClick={() => setStatus("idle")}>
            Send another enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <h2>Book a session</h2>
          <p className="sub">We'll reply with available times.</p>
          <input
            required
            placeholder="Parent or player name"
            value={f.name}
            onChange={set("name")}
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={f.email}
            onChange={set("email")}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={f.phone}
            onChange={set("phone")}
          />
          <select value={f.age} onChange={set("age")}>
            <option value="">Player age group</option>
            <option>5–8</option>
            <option>9–13</option>
            <option>14–17</option>
            <option>Adult</option>
          </select>
          <textarea
            rows="4"
            placeholder="Tell us about your goals"
            value={f.msg}
            onChange={set("msg")}
          />
          <input
            className="hp"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
            placeholder="Leave this empty"
            value={f.hp}
            onChange={set("hp")}
          />
          <button
            className="btn wide"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send enquiry"}
          </button>
          {status === "mail" && (
            <small className="ok">
              Opening your email app. If nothing opens, copy our email below and
              send us your details.
            </small>
          )}
          {status === "error" && (
            <small className="err">
              Sorry, that didn't send. Please email {EMAIL} or call {PHONE}.
            </small>
          )}
        </form>
      )}
      <div className="alt">
        <span>Prefer to email or call?</span>
        <div>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <button type="button" onClick={copyEmail}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <div>
          <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}>{PHONE}</a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [faq, setFaq] = useState(0);
  return (
    <>
      <Nav />
      <Hero />
      <Info />

      <section className="sec" id="about">
        <Head
          kick="Why Tonaldo FC"
          title="Excellence in football development"
          text="Premium training, elite coaching and global standards for ambitious players, in an environment where every member belongs."
        />
        <div className="grid g3">
          {FEATURES.map((f) => (
            <div className="card" key={f.title}>
              <div className="ic lg">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dark">
        <div>
          <div className="kick gold">1-on-1 football training</div>
          <h2>The total football development experience.</h2>
          <p>
            Every session combines technical drills, tactical understanding and
            match play, guided by coaches who track progress and set clear next
            steps.
          </p>
          <ul className="chk">
            {PILLARS.map((p) => (
              <li key={p}>
                <i>✓</i>
                {p}
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn">
            Enquire now
          </a>
        </div>
        <img
          className="photo"
          src={img("train.jpg")}
          alt="Tonaldo FC players training"
        />
      </section>

      <section className="sec" id="programs">
        <Head
          kick="Programs"
          title="A pathway for every age and level"
          text="From a first touch of the ball to adult sessions, find the group that fits."
        />
        <div className="grid g4">
          {PROGRAMS.map((p) => (
            <article className="prog" key={p.name}>
              <div
                className="top"
                style={{
                  backgroundImage: `linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.8)),url(${img(p.photo)})`,
                }}
              >
                <b>{p.tag}</b>
                <span>{p.age}</span>
              </div>
              <div className="bd">
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <ul>
                  {p.pts.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <a href="#contact" className="lnk">
                  Enquire →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sec">
        <Head kick="Getting started" title="Four steps to your first session" />
        <div className="steps">
          {STEPS.map(([t, d], i) => (
            <div className="step" key={t}>
              <div className="n">{i + 1}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="stats">
        {STATS.map(([n, l]) => (
          <div key={l}>
            <strong>{n}</strong>
            <span>{l}</span>
          </div>
        ))}
      </section>

      <section className="sec two">
        <div>
          <div className="kick">Training times</div>
          <h2 className="h2">Open every day of the week</h2>
          <p className="lead">
            Book a session any day at our Melton base. Weekday evenings suit
            school and work schedules.
          </p>
          <a href="#contact" className="btn dk">
            Check availability
          </a>
        </div>
        <div className="tbl">
          <div className="th">Opening hours</div>
          {HOURS.map(([d, t]) => (
            <div className="r" key={d}>
              {d}
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <Head
          kick="Our coaches"
          title="Learn from people who love the game"
          text="Placeholder profiles: replace with real names, photos and qualifications."
        />
        <div className="grid g3">
          {COACHES.map((c) => (
            <div className="coach" key={c.name}>
              <div className="ph">
                <img src={img(c.photo)} alt={c.name} />
              </div>
              <div className="bd">
                <h3>{c.name}</h3>
                <p>Name and qualification</p>
                {c.badges.map((b) => (
                  <span className="badge" key={b}>
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <Head kick="Testimonials" title="What families say" />
        <div className="grid g3">
          {QUOTES.map(([a, w, s, q]) => (
            <div className="t" key={a}>
              <div className="stars">★★★★★</div>
              <p>“{q}”</p>
              <div className="who">
                <div className="av">{a}</div>
                <div>
                  {w}
                  <small>{s}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div>
          <h2>Pursue greatness. Become a football star.</h2>
          <p>
            Experience professional training, international coaching and an
            inclusive path to football excellence.
          </p>
        </div>
        <a href="#contact" className="btn big">
          For bookings
        </a>
      </section>

      <section className="faqform" id="contact">
        <div>
          <div className="kick">FAQ</div>
          <h2 className="h2">Common questions</h2>
          {FAQS.map(([q, a], i) => (
            <div className="q" key={q}>
              <h3 onClick={() => setFaq(faq === i ? -1 : i)}>
                {q}
                <span>{faq === i ? "–" : "+"}</span>
              </h3>
              {faq === i && <p>{a}</p>}
            </div>
          ))}
        </div>
        <Enquiry />
      </section>

      <div className="map">
        <div className="pin" />
        <div className="lab">{ADDRESS}</div>
        <a
          className="btn dir"
          target="_blank"
          rel="noreferrer"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
        >
          Get directions
        </a>
      </div>

      <footer>
        <div className="fg">
          <div>
            <div className="brand">
              <img src={img("crest.png")} alt="" />
              <div>TONALDO FC</div>
            </div>
            <p>
              Inspiring excellence in football through elite coaching and
              community-focused academy programs. Ages 5–17 and Adults.
            </p>
          </div>
          <div>
            <h5>Explore</h5>
            <ul>
              {LINKS.map(([l, h]) => (
                <li key={l}>
                  <a href={h}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Legal</h5>
            <ul>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Login</li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <p>
              Kurunjang, Melton VIC 3337
              <br />
              {EMAIL}
              <br />
              {PHONE}
            </p>
          </div>
        </div>
        <div className="fb">
          <span>
            © {new Date().getFullYear()} TONALDO FC. All rights reserved.
          </span>
          <span>Mon–Fri 9am–9pm · Sat 9am–12pm · Sun 9am–6pm</span>
        </div>
      </footer>
    </>
  );
}
