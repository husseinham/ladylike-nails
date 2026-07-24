// DEMO INSPIRATION – NOT VERIFIED CLIENT WORK.
// Replace with approved Ladylike Nails photography before launch.
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import mSoft from "@/assets/mood-natural.jpg";
import mClassic from "@/assets/mood-classic.jpg";
import mColour from "@/assets/mood-colour.jpg";
import mBold from "@/assets/mood-statement.jpg";

export type MoodKey = "soft" | "classic" | "colour" | "bold";

export const moods = [
  {
    key: "soft",
    num: "01",
    title: "SOFT",
    description: "Sanfte Farben und zurückhaltende Details.",
    image: mSoft,
    swatches: ["#F6F1EC", "#E4CDD2", "#D7C4BA", "#B77A88"],
  },
  {
    key: "classic",
    num: "02",
    title: "CLASSIC",
    description: "Zeitlos, klar und elegant.",
    image: mClassic,
    swatches: ["#F6F1EC", "#CFA8A4", "#A89B94", "#76384A"],
  },
  {
    key: "colour",
    num: "03",
    title: "COLOUR",
    description: "Ein Farbton passend zu deiner Stimmung.",
    image: mColour,
    swatches: ["#B77A88", "#76384A", "#A94B54", "#E4CDD2"],
  },
  {
    key: "bold",
    num: "04",
    title: "BOLD",
    description: "Ein ausdrucksstarker Look mit Persönlichkeit.",
    image: mBold,
    swatches: ["#241D20", "#76384A", "#B77A88", "#F6F1EC"],
  },
] satisfies Array<{
  key: MoodKey;
  num: string;
  title: string;
  description: string;
  image: string;
  swatches: string[];
}>;

export type GalleryItem = {
  id: string;
  image: string;
  mood: MoodKey;
  span: "tall" | "square" | "wide";
  alt: string;
};

export const gallery: GalleryItem[] = [
  {
    id: "look-01",
    image: g1,
    mood: "soft",
    span: "tall",
    alt: "Inspiration für einen sanften Nagellook",
  },
  {
    id: "look-02",
    image: g2,
    mood: "classic",
    span: "square",
    alt: "Inspiration für einen klassischen Nagellook",
  },
  {
    id: "look-03",
    image: g3,
    mood: "classic",
    span: "wide",
    alt: "Rosige Nagellook-Inspiration im warmen Licht",
  },
  {
    id: "look-04",
    image: g4,
    mood: "colour",
    span: "tall",
    alt: "Farbige Nagellook-Inspiration in tiefem Rot",
  },
  {
    id: "look-05",
    image: g5,
    mood: "bold",
    span: "square",
    alt: "Ausdrucksstarke Nagellook-Inspiration",
  },
  {
    id: "look-06",
    image: g6,
    mood: "soft",
    span: "tall",
    alt: "Nagellook-Inspiration in warmem Taupe",
  },
];

export const colourEdit = [
  { name: "Soft Blush", hex: "#E4CDD2" },
  { name: "Milky Nude", hex: "#E8DDD4" },
  { name: "Deep Berry", hex: "#76384A" },
  { name: "Warm Taupe", hex: "#A89B94" },
  { name: "Classic Red", hex: "#9E303D" },
];
