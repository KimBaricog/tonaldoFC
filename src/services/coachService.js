import { supabase } from '../lib/supabase'
import { publicUrl } from './galleryService'
import { COACHES_PLACEHOLDER } from '../data/coaches'

// Turns a database row into the shape the coach components use
export const toCoach = (row) => ({
  id: row.id,
  name: row.name,
  role: row.role || '',
  src: row.photo_path ? publicUrl(row.photo_path) : null,
  path: row.photo_path,
  order: row.sort_order,
})

// Public coaches list, in the order set on the admin page
export async function fetchCoaches() {
  if (!supabase) return COACHES_PLACEHOLDER
  const { data, error } = await supabase.from('coaches').select('*').order('sort_order').order('created_at')
  if (error) throw error
  return data.map(toCoach)
}
