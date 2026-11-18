// All site content lives here. Edit text, prices, hours and photos in this file.

export const EMAIL = "tonaldofc@gmail.com";
export const PHONE = "+61 0410 889 446";
export const ADDRESS = "44 Wallangarra Blvd, Harkness · Melton, VIC 3337";

export const NAV_LINKS = [
  ["Home", "#top"],
  ["About Us", "#about"],
  ["Programs", "#programs"],
  ["Gallery", "#gallery"],
  ["Contact Us", "#contact"],
];

export const INFO_ITEMS = [
  ["⌖", "Location", ADDRESS],
  ["✆", "Contact", `${PHONE}\n${EMAIL}`],
  ["◷", "Hours", "Mon–Fri 9am–9pm\nSat 9am–12pm · Sun 9am–6pm"],
];

export const FEATURES = [
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

export const PILLARS = [
  "Technical skills",
  "Game intelligence",
  "Speed and agility",
  "Confidence and performance",
];

export const PROGRAMS = [
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

export const STEPS = [
  ["Enquire", "Tell us the player's age and goals."],
  ["Book", "Choose a day and time that suits."],
  ["Train", "Join a coached session at your level."],
  ["Progress", "Get feedback and a clear next step."],
];

export const STATS = [
  ["7", "Days a week"],
  ["5–17", "Youth ages"],
  ["18+", "Adult sessions"],
  ["1", "Community club"],
];

export const HOURS = [
  ["Monday – Friday", "9:00am – 9:00pm"],
  ["Saturday", "9:00am – 12:00pm"],
  ["Sunday", "9:00am – 6:00pm"],
];

export const COACHES = [
  { name: "Head coach", photo: "c1.jpg", badges: ["Academy lead", "All ages"] },
  { name: "Youth coach", photo: "c2.jpg", badges: ["Ages 9–13", "Technique"] },
  {
    name: "Goalkeeping coach",
    photo: "c3.jpg",
    badges: ["Goalkeepers", "All ages"],
  },
];

// [initial, who, detail, quote] (placeholders: replace with real testimonials)
export const QUOTES = [
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

export const FAQS = [
  ["What ages do you coach?", "Players aged 5 to 17, and adults."],

  [
    "What should players bring?",
    "Football boots, shin pads, a full water bottle, and comfortable training kit. Bring a jacket in cold or wet weather and sunscreen in summer.",
  ],
  [
    "How do I book?",
    "Send an enquiry with the form or call us, and we will reply with available times.",
  ],
];

export const AGE_GROUPS = ["5–8", "9–13", "14–17", "Adult"];
