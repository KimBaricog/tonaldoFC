import { supabase, GALLERY_BUCKET } from '../lib/supabase'
import { GALLERY_IMAGES } from '../data/gallery'

export const publicUrl = (path) => supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path).data.publicUrl

// Turns a database row into the shape the Gallery components use
export const toImage = (row) => ({
  id: row.id,
  src: publicUrl(row.image_path),
  alt: row.alt || row.caption || 'Tonaldo FC photo',
  caption: row.caption || '',
  category: row.category || 'General',
  path: row.image_path,
})

// Public gallery: newest photos first. Falls back to the placeholder photos
// in data/gallery.js when Supabase isn't configured (e.g. before setup).
export async function fetchGalleryImages() {
  if (!supabase) return GALLERY_IMAGES
  const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data.map(toImage)
}
