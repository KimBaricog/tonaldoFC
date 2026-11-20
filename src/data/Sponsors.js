import { img } from "../utils/img";

// Sponsors shown in the "Proudly supported by" section. Placeholder list: replace with the club's real sponsors.
//  - tier:    'principal' (large featured card) or 'partner' (logo wall)
//  - logo:    path to the logo image, e.g. img('sponsors/raw-global.png') with the file in public/images/sponsors/.
//             Leave '' to show the name as a text logo.
//  - website: optional link. Leave '' for no link.
//  - blurb:   short line, only shown for the principal tier.
// With 2 or more partners the logo wall scrolls automatically (it pauses on hover).
export const SPONSORS = [
  {
    id: "raw-global",
    tier: "principal",
    name: "RAW Global",
    blurb: "International Freight Services",
    logo: "",
    website: "",
  },
  {
    id: "partner-1",
    tier: "partner",
    name: "Partner name",
    logo: "",
    website: "",
  },
  {
    id: "partner-2",
    tier: "partner",
    name: "Partner name",
    logo: "",
    website: "",
  },
  {
    id: "partner-3",
    tier: "partner",
    name: "Partner name",
    logo: "",
    website: "",
  },
  {
    id: "partner-4",
    tier: "partner",
    name: "Partner name",
    logo: "",
    website: "",
  },
];
