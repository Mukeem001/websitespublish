export const SECTION_TYPES = [
  "navbar",
  "hero",
  "about",
  "services",
  "features",
  "gallery",
  "products",
  "pricing",
  "team",
  "testimonials",
  "faq",
  "blog",
  "contact",
  "map",
  "footer"
] as const;

export type SectionType =
  typeof SECTION_TYPES[number];