import { supabase } from '../lib/supabase'

// Edited content, one row per section: { hero: {...}, faq: {...} }. Sections never edited have no row.
export async function fetchStoredContent() {
  if (!supabase) return {}
  const { data, error } = await supabase.from('site_content').select('key,value')
  if (error) throw error
  return Object.fromEntries(data.map((row) => [row.key, row.value]))
}

// changes: { sectionKey: value | null }. A null value deletes the row, so that section goes back to the built-in text.
export async function saveSections(changes) {
  const results = await Promise.all(Object.entries(changes).map(([key, value]) =>
    value === null
      ? supabase.from('site_content').delete().eq('key', key)
      : supabase.from('site_content').upsert({ key, value, updated_at: new Date().toISOString() })))
  const failed = results.find((r) => r.error)
  if (failed) throw failed.error
}
