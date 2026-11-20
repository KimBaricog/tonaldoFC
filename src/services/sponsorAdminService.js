import { supabase, GALLERY_BUCKET } from '../lib/supabase'
import { compressLogo } from '../utils/compressLogo'

// Logos are stored in the same public bucket as the gallery, under the sponsors/ folder
async function uploadLogo(file) {
  const blob = await compressLogo(file)
  const path = `sponsors/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`
  const { error } = await supabase.storage.from(GALLERY_BUCKET).upload(path, blob, { contentType: 'image/png', cacheControl: '31536000' })
  if (error) throw error
  return path
}
const removeFile = (path) => (path ? supabase.storage.from(GALLERY_BUCKET).remove([path]) : null)

// "example.com" -> "https://example.com". Anything that isn't http(s) is rejected.
export function normalizeUrl(value) {
  const v = (value || '').trim()
  if (!v) return ''
  let url
  try { url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(v) ? v : `https://${v}`) } catch { throw new Error('That website address is not valid.') }
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('The website must start with http:// or https://')
  return url.toString()
}

export async function createSponsor({ name, tier, website, blurb, file, order }) {
  const cleanUrl = normalizeUrl(website) // check first, so we never upload a logo for a sponsor that then fails
  const logo_path = file ? await uploadLogo(file) : null
  const { error } = await supabase.from('sponsors').insert({ name, tier, website: cleanUrl, blurb, logo_path, sort_order: order })
  if (error) { await removeFile(logo_path); throw error }
}

export async function updateSponsor(sponsor, { name, tier, website, blurb, file }) {
  const patch = { name, tier, website: normalizeUrl(website), blurb }
  let newPath = null
  if (file) { newPath = await uploadLogo(file); patch.logo_path = newPath }
  const { error } = await supabase.from('sponsors').update(patch).eq('id', sponsor.id)
  if (error) { await removeFile(newPath); throw error }
  if (newPath) await removeFile(sponsor.path) // replaced logo: delete the old file
}

export async function deleteSponsor(sponsor) {
  const { error } = await supabase.from('sponsors').delete().eq('id', sponsor.id)
  if (error) throw error
  await removeFile(sponsor.path)
}

// `list` is the full sponsors array in the desired order; only changed positions are saved
export async function reorderSponsors(list) {
  const changed = list.map((s, i) => ({ s, i })).filter(({ s, i }) => s.order !== i)
  const results = await Promise.all(changed.map(({ s, i }) => supabase.from('sponsors').update({ sort_order: i }).eq('id', s.id)))
  const failed = results.find((r) => r.error)
  if (failed) throw failed.error
}
