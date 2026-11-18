import { img } from '../utils/img'

// Placeholder coaches, shown only while Supabase isn't configured.
// Once connected, coaches come from the database and are managed on the /admin page.
export const COACHES_PLACEHOLDER = [
  { id: 'p1', name: 'Coach name', role: 'Head coach', details: 'Placeholder: a short bio about this coach, their experience, qualifications and coaching style.', src: img('c1.jpg'), path: null },
  { id: 'p2', name: 'Coach name', role: 'Youth coach', details: 'Placeholder: a short bio about this coach and the age groups they work with.', src: img('c2.jpg'), path: null },
  { id: 'p3', name: 'Coach name', role: 'Goalkeeping coach', details: 'Placeholder: a short bio about this coach and their goalkeeping experience.', src: img('c3.jpg'), path: null },
]
