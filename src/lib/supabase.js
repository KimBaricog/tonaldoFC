import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// null when the env variables are missing: the public site then shows the placeholder gallery
export const supabase = url && key ? createClient(url, key) : null
export const GALLERY_BUCKET = 'gallery'
