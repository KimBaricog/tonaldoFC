// Open/closed badge for the map card, using Melbourne time.
// Keep SCHEDULE in sync with HOURS in data/content.js (index 0 = Sunday, hours in 24h time).
const SCHEDULE = {
  0: [9, 18],
  1: [9, 21],
  2: [9, 21],
  3: [9, 21],
  4: [9, 21],
  5: [9, 21],
  6: [9, 12],
};
const TIME_ZONE = "Australia/Melbourne";
const SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hourLabel = (h) =>
  h === 12 ? "12pm" : h > 12 ? `${h - 12}pm` : `${h}am`;

export function getOpenStatus(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const get = (type) => parts.find((p) => p.type === type).value;
  const day = SHORT.indexOf(get("weekday"));
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  const [open, close] = SCHEDULE[day];

  if (minutes >= open * 60 && minutes < close * 60)
    return { open: true, text: `Open now · closes ${hourLabel(close)}` };
  if (minutes < open * 60)
    return { open: false, text: `Closed · opens today at ${hourLabel(open)}` };
  // the club is open every day, so after closing the next opening is always tomorrow
  return {
    open: false,
    text: `Closed · opens tomorrow at ${hourLabel(SCHEDULE[(day + 1) % 7][0])}`,
  };
}
