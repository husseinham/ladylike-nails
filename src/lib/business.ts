// Single source of truth. Add optional details only after owner approval.
export type Service = {
  id: string;
  name: string;
  shortDescription: string;
  duration: string;
  price: string;
  category: string;
  active: boolean;
};

export const business = {
  brandName: "Ladylike Nails",
  legalName: "Ladylike Nails Kojic Slavica",
  displayName: "LADYLIKE",
  monogram: "LN",
  wordmarkLine: "NAILS · STANS",
  ownerName: "Slavica Kojic",
  businessType: "Nagelstudio",
  street: "Stansstaderstrasse 20",
  postalCode: "6370",
  city: "Stans",
  canton: "Nidwalden",
  cantonCode: "NW",
  country: "Schweiz",
  countryCode: "CH",
  phoneDisplay: "078 935 63 15",
  phoneInternational: "+41789356315",
  phoneHref: "tel:+41789356315",
  email: null as string | null,
  openingHours: null as string | null,
  bookingUrl: null as string | null,
  whatsappUrl: null as string | null,
  instagramUrl: null as string | null,
  facebookUrl: null as string | null,
  websiteUrl: null as string | null,
  services: [] as Service[],
  prices: [] as Array<{ label: string; value: string }>,
  reviews: [] as Array<{ author: string; text: string; rating: number }>,
} as const;

export const publicSiteUrl =
  (import.meta.env.PUBLIC_SITE_URL as string | undefined)?.replace(/\/$/, "") ?? null;

export const contactFormEndpoint =
  (import.meta.env.CONTACT_FORM_ENDPOINT as string | undefined) ?? null;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${business.brandName}, ${business.street}, ${business.postalCode} ${business.city}, ${business.country}`,
)}`;

export const navItems = [
  { num: "01", label: "Studio", href: "#studio" },
  { num: "02", label: "Inspiration", href: "#inspiration" },
  { num: "03", label: "Nail Mood", href: "#nail-mood" },
  { num: "04", label: "Über uns", href: "#ueber-uns" },
  { num: "05", label: "Kontakt", href: "#kontakt" },
];
