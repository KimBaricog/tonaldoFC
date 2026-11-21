// The built-in ("pre-built") text of the whole website.
// The site shows this whenever edited content isn't available (no connection, database error, a section never edited),
// so the website always has text. Edited content from the admin "Site content" page is layered on top of this.
import { EMAIL, PHONE, NAV_LINKS, INFO_ITEMS, FEATURES, PILLARS, PROGRAMS, STEPS, STATS, HOURS, QUOTES, FAQS, AGE_GROUPS } from './content'
import { LOCATIONS } from './locations'

export const DEFAULT_CONTENT = {
  site: {
    phone: PHONE,
    email: EMAIL,
    topbar: 'Open 7 days · Melton, Victoria',
    footerAbout: 'Inspiring excellence in football through elite coaching and community-focused academy programs. Ages 5–17 and Adults.',
    footerAddress: 'Kurunjang, Melton VIC 3337',
  },
  nav: { items: NAV_LINKS.map(([label, href]) => ({ label, href })) },
  hero: {
    tag: 'Now enrolling · Ages 5–17 and Adults',
    line1: 'Train.', line2: 'Develop.', line3: 'Achieve.',
    text: 'Elite coaching and innovative, community-focused academy programs that build confident, skilled footballers in Melton.',
    primaryButton: 'Book a session', secondaryButton: 'Meet the academy',
    badge1Title: 'Elite coaching', badge1Text: 'International standards',
    badge2Title: 'Open every day', badge2Text: 'Mon – Sun, Melton VIC',
  },
  info: { items: INFO_ITEMS.map(([icon, title, text]) => ({ icon, title, text })) },
  features: {
    kick: 'Why Tonaldo FC', title: 'Excellence in football development',
    text: 'Premium training, elite coaching and global standards for ambitious players, in an environment where every member belongs.',
    items: FEATURES,
  },
  training: {
    kick: '1-on-1 football training', title: 'The total football development experience.',
    text: 'Every session combines technical drills, tactical understanding and match play, guided by coaches who track progress and set clear next steps.',
    pillars: PILLARS, button: 'Enquire now',
  },
  programs: {
    kick: 'Programs', title: 'A pathway for every age and level',
    text: 'From a first touch of the ball to adult sessions, find the group that fits.',
    linkText: 'Enquire →', items: PROGRAMS,
  },
  steps: { kick: 'Getting started', title: 'Four steps to your first session', items: STEPS.map(([title, text]) => ({ title, text })) },
  stats: { items: STATS.map(([value, label]) => ({ value, label })) },
  hours: {
    kick: 'Training times', title: 'Open every day of the week',
    text: 'Book a session any day at our Melton base. Weekday evenings suit school and work schedules.',
    button: 'Check availability', tableTitle: 'Opening hours',
    items: HOURS.map(([day, time]) => ({ day, time })),
  },
  coaches: { kick: 'Our coaches', title: 'Learn from people who love the game', text: 'Meet the coaches who train and inspire our players.' },
  gallery: { kick: 'Gallery', title: 'See the academy in action', text: 'Training sessions, players and coaches from around Tonaldo FC.' },
  locations: {
    kick: 'Find us', title: 'Train near you',
    text: 'Tonaldo FC runs sessions across {count} locations. Pick yours to see it on the map.',
    noAddressText: 'Contact us for the exact training venue and session times.',
    directionsButton: 'Get directions', callButton: 'Call us',
    items: LOCATIONS,
  },
  testimonials: {
    kick: 'Testimonials', title: 'What families say',
    items: QUOTES.map(([initial, who, detail, quote]) => ({ initial, who, detail, quote })),
  },
  sponsors: {
    kick: 'Our partners', title: 'Proudly supported by',
    text: 'The businesses and people who back Tonaldo FC and help our players grow.',
    ctaTitle: 'Become a sponsor',
    ctaText: 'Back local football and put your business in front of our players, families and community.',
    ctaButton: 'Get in touch',
  },
  cta: {
    title: 'Pursue greatness. Become a football star.',
    text: 'Experience professional training, international coaching and an inclusive path to football excellence.',
    button: 'For bookings',
  },
  faq: { kick: 'FAQ', title: 'Common questions', items: FAQS.map(([question, answer]) => ({ question, answer })) },
  contact: { title: 'Book a session', text: "We'll reply with available times.", button: 'Send enquiry', ageGroups: AGE_GROUPS },
}
