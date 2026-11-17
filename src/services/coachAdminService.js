import { supabase, GALLERY_BUCKET } from '../lib/supabase'
import { compressImage } from '../utils/compressImage'

// Coach photos are stored in the same public bucket as the gallery, under the coaches/ folder
async function uploadCoachPhoto(file) {
  const blob = await compressImage(file, 1200, 0.85)
  const path = `coaches/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`
  const { error } = await supabase.storage.from(GALLERY_BUCKET).upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000' })
  if (error) throw error
  return path
}
const removeFile = (path) => (path ? supabase.storage.from(GALLERY_BUCKET).remove([path]) : null)

export async function createCoach({ name, role, file, order }) {
  const photo_path = file ? await uploadCoachPhoto(file) : null
  const { error } = await supabase.from('coaches').insert({ name, role, photo_path, sort_order: order })
  if (error) { await removeFile(photo_path); throw error }
}

export async function updateCoach(coach, { name, role, file }) {
  const patch = { name, role }
  let newPath = null
  if (file) { newPath = await uploadCoachPhoto(file); patch.photo_path = newPath }
  const { error } = await supabase.from('coaches').update(patch).eq('id', coach.id)
  if (error) { await removeFile(newPath); throw error }
  if (newPath) await removeFile(coach.path) // replaced photo: delete the old file
}

export async function deleteCoach(coach) {
  const { error } = await supabase.from('coaches').delete().eq('id', coach.id)
  if (error) throw error
  await removeFile(coach.path)
}

// `list` is the full coaches array in the desired order; only changed positions are saved
export async function reorderCoaches(list) {
  const changed = list.map((c, i) => ({ c, i })).filter(({ c, i }) => c.order !== i)
  const results = await Promise.all(changed.map(({ c, i }) => supabase.from('coaches').update({ sort_order: i }).eq('id', c.id)))
  const failed = results.find((r) => r.error)
  if (failed) throw failed.error
}
