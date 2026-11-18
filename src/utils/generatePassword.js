// Random 14-character password without look-alike characters (no 0/O, 1/l/I)
export function generatePassword(length = 14) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'
  const bytes = crypto.getRandomValues(new Uint32Array(length))
  return Array.from(bytes, (b) => chars[b % chars.length]).join('')
}
