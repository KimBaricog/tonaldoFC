import { img } from "../utils/img";

// Placeholder gallery items. Once the admin page exists, these come from the database instead
// (see services/galleryService.js). Each item: { id, src, alt, caption, category }
export const GALLERY_IMAGES = [
  {
    id: 1,
    src: img("train.jpg"),
    alt: "Tonaldo FC players training",
    caption: "Squad training session",
    category: "Training",
  },
  {
    id: 2,
    src: img("hero.jpg"),
    alt: "Coach with a young player",
    caption: "1-on-1 coaching",
    category: "Training",
  },
  {
    id: 3,
    src: img("p1.jpg"),
    alt: "Junior player",
    caption: "Juniors in action",
    category: "Players",
  },
  {
    id: 4,
    src: img("p2.jpg"),
    alt: "Youth player",
    caption: "Youth development",
    category: "Players",
  },
  {
    id: 5,
    src: img("p3.jpg"),
    alt: "Teen player",
    caption: "Elite teens",
    category: "Players",
  },
  {
    id: 6,
    src: img("p4.jpg"),
    alt: "Academy players",
    caption: "Match-day energy",
    category: "Players",
  },
  {
    id: 7,
    src: img("c1.jpg"),
    alt: "Head coach",
    caption: "Head coach",
    category: "Coaches",
  },
  {
    id: 8,
    src: img("c2.jpg"),
    alt: "Youth coach",
    caption: "Youth coach",
    category: "Coaches",
  },
  {
    id: 9,
    src: img("c3.jpg"),
    alt: "Goalkeeping coach",
    caption: "Goalkeeping coach",
    category: "Coaches",
  },
];
