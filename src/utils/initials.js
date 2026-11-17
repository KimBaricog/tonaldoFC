// "Kim Baricog" -> "KB" (used when a coach has no photo yet)
export const initials = (name = '') =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() || '').join('') || '?'
