// Turns the opening-hours rows ("Monday – Friday" / "9:00am – 9:00pm") into a schedule the "Open now" badge can use,
// so the badge always matches the hours shown on the site. Returns null if any row can't be understood (the badge is then hidden).
const DAY = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 }

function days(label) {
  const found = [...label.toLowerCase().matchAll(/\b(sun|mon|tue|wed|thu|fri|sat)[a-z]*/g)].map((m) => DAY[m[1]])
  if (!found.length) return null
  if (found.length === 1) return [found[0]]
  const out = []
  for (let d = found[0]; out.length < 8; d = (d + 1) % 7) { out.push(d); if (d === found[1]) break }
  return out
}

function times(text) {
  const m = [...text.matchAll(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/gi)]
  if (m.length < 2) return null
  const hour = ([, h, min, ap]) => (Number(h) % 12) + (ap.toLowerCase() === 'pm' ? 12 : 0) + Number(min || 0) / 60
  const [open, close] = [hour(m[0]), hour(m[1])]
  return close > open ? [open, close] : null
}

export function buildSchedule(rows = []) {
  const schedule = {}
  for (const { day, time } of rows) {
    const d = days(day || '')
    const t = times(time || '')
    if (!d || !t) return null
    d.forEach((i) => { schedule[i] = t })
  }
  return Object.keys(schedule).length ? schedule : null
}
