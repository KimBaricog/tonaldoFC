import { supabase, GALLERY_BUCKET } from '../lib/supabase'
import { compressImage } from '../utils/compressImage'

export const signIn = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}
export const signOut = () => supabase.auth.signOut()
export const getSession = async () => (await supabase.auth.getSession()).data.session
export const onAuthChange = (callback) => {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session))
  return () => data.subscription.unsubscribe()
}

// True only if the signed-in user's email is listed in the `admins` table (see supabase/schema.sql)
export const checkIsAdmin = async () => {
  const { data, error } = await supabase.rpc('is_admin')
  if (error) throw error
  return data === true
}

export async function uploadPhoto({ file, caption, category }) {
  const blob = await compressImage(file)
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`
  const { error: uploadError } = await supabase.storage.from(GALLERY_BUCKET).upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000' })
  if (uploadError) throw uploadError
  const { error: insertError } = await supabase.from('gallery').insert({ image_path: path, caption, alt: caption, category })
  if (insertError) {
    await supabase.storage.from(GALLERY_BUCKET).remove([path]) // don't leave an orphaned file behind
    throw insertError
  }
}

export async function updatePhoto(id, { caption, category }) {
  const { error } = await supabase.from('gallery').update({ caption, alt: caption, category }).eq('id', id)
  if (error) throw error
}

export async function deletePhoto(photo) {
  const { error: rowError } = await supabase.from('gallery').delete().eq('id', photo.id)
  if (rowError) throw rowError
  await supabase.storage.from(GALLERY_BUCKET).remove([photo.path])
}
