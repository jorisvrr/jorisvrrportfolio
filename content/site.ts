/**
 * SITE IDENTITY
 *
 * The facts every page and every piece of metadata shares: who, where, and
 * how to reach me. What the site SAYS lives in content/portfolio.ts and
 * content/contact.ts; this file is only what is true regardless of wording.
 */

export const SITE = {
  name: "Joris van Rijn",
  domain: "jorisvrr.com",
  /** The host that actually serves: the apex 308s to this one, so this is
   *  what canonical URLs, the sitemap and outbound links point at. */
  origin: "https://www.jorisvrr.com",
  location: "The Netherlands",
  locality: "Leiderdorp",
  email: "jorisvrr@gmail.com",
  /** No specialisation is named anywhere: HBO-ICT, at this school, is all. */
  education: { programme: "HBO-ICT", school: "The Hague University of Applied Sciences" },
} as const;

/** The direct line, shown on /contact. */
export const CONTACT_DETAILS = {
  phone: { value: "0638032065", href: "tel:+31638032065" },
} as const;

/**
 * External channels. LinkedIn and Instagram are the ones the site links to
 * and the ones structured data names. YouTube is still UNVERIFIED: assumed
 * from the handle, so nothing links to it until it is confirmed.
 */
export const SOCIALS = [
  { id: "instagram", label: "Instagram", handle: "@jorisvrr", href: "https://www.instagram.com/jorisvrr" },
  { id: "youtube", label: "YouTube", handle: "@jorisvrr", href: "https://www.youtube.com/@jorisvrr" },
  { id: "linkedin", label: "LinkedIn", handle: "in/jorisvnrijn", href: "https://www.linkedin.com/in/jorisvnrijn/" },
] as const;
