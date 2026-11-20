import { supabase } from "../lib/supabase";
import { publicUrl } from "./galleryService";
import { SPONSORS } from "../data/sponsors";

// Only http(s) links are allowed, so a bad value can never become a "javascript:" link
const safeUrl = (url) => (/^https?:\/\//i.test(url || "") ? url : "");

export const toSponsor = (row) => ({
  id: row.id,
  tier: row.tier === "principal" ? "principal" : "partner",
  name: row.name,
  blurb: row.blurb || "",
  website: safeUrl(row.website),
  logo: row.logo_path ? publicUrl(row.logo_path) : "",
  path: row.logo_path,
  order: row.sort_order,
});

// Public sponsors list, in the order set on the admin page.
// Falls back to the placeholder sponsors in data/sponsors.js when Supabase isn't configured.
export async function fetchSponsors() {
  if (!supabase) return SPONSORS;
  const { data, error } = await supabase
    .from("sponsors")
    .select("*")
    .order("sort_order")
    .order("created_at");
  if (error) throw error;
  return data.map(toSponsor);
}
