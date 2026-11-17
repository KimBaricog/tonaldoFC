import { img } from '../utils/img'

// Placeholder coaches, shown only while Supabase isn't configured.
// Once connected, coaches come from the database and are managed on the /admin page.
export const COACHES_PLACEHOLDER = [
  { id: 'p1', name: 'Coach name', role: 'Head coach', src: img('c1.jpg'), path: null },
  { id: 'p2', name: 'Coach name', role: 'Youth coach', src: img('c2.jpg'), path: null },
  { id: 'p3', name: 'Coach name', role: 'Goalkeeping coach', src: img('c3.jpg'), path: null },
]
