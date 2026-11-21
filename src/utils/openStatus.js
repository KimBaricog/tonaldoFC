// Open/closed badge for the map card, using Melbourne time.
// `schedule` comes from buildSchedule(): { 0: [openHour, closeHour], ... } (0 = Sunday, 24h time, days not listed are closed).
const TIME_ZONE = "Australia/Melbourne";
const SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function label(hours) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m
    ? `${h12}:${String(m).padStart(2, "0")}${suffix}`
    : `${h12}${suffix}`;
}

export function getOpenStatus(schedule, now = new Date()) {
  // The badge is a nice extra: if anything about it is wrong it must never break the page, so it just hides.
  try {
    return computeStatus(schedule, now);
  } catch {
    return null;
  }
}

function computeStatus(schedule, now) {
  if (!schedule || typeof schedule !== "object" || schedule instanceof Date)
    return null;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const get = (type) => parts.find((p) => p.type === type).value;
  const day = SHORT.indexOf(get("weekday"));
  const hours = (Number(get("hour")) % 24) + Number(get("minute")) / 60;
  const today = schedule[day];

  if (today && hours >= today[0] && hours < today[1])
    return { open: true, text: `Open now · closes ${label(today[1])}` };
  if (today && hours < today[0])
    return { open: false, text: `Closed · opens today at ${label(today[0])}` };
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (schedule[d])
      return {
        open: false,
        text: `Closed · opens ${i === 1 ? "tomorrow" : LONG[d]} at ${label(schedule[d][0])}`,
      };
  }
  return null;
}
