/**
 * THE PORTFOLIO, AS CONTENT.
 *
 * One file for everything the page says, so changing the site is a content
 * edit rather than a code edit. The rules that held for the previous site
 * hold here: nothing is claimed that is not true, and anything unconfirmed is
 * absent rather than guessed. Where a section has no material yet, it says so
 * in the interface instead of being filled in.
 *
 * Sources: content/site.ts (name, contact, socials — unchanged since the
 * previous site), content/projects.ts (the Goodreads case study, built from
 * that project's own repository), and the positioning brief of 2026-11-17:
 * a student of HBO-ICT with interests well beyond it, never a founder, a
 * specialist or a job title.
 */

import { SITE, SOCIALS } from "@/content/site";

export const IDENTITY = {
  name: SITE.name,
  first: "Joris",
  last: "van Rijn",
  /** what the site is about, in a few words */
  discipline: "Technology, design & business",
  /** what I am, plainly: a student, of one thing, without a specialisation */
  role: "HBO-ICT student",
  school: "The Hague University of Applied Sciences",
  location: "Leiderdorp / NL",
  /** the hero's bottom-right system status */
  status: "Open to new projects",
  email: SITE.email,
  domain: SITE.domain,
} as const;

/**
 * The lines that run across the hero. They are the hero — not a heading
 * inside it — so there are five of them and they divide the whole height
 * between them, running in alternating directions at different speeds.
 *
 * What the work spans, from building it to what it is for.
 */
export const HERO_LINES = [
  { text: "SOFTWARE DEVELOPMENT", dir: 1 },
  { text: "WEB DESIGN & DEVELOPMENT", dir: -1 },
  { text: "VISUAL DESIGN", dir: 1 },
  { text: "BRANDING & CREATIVE DIRECTION", dir: -1 },
  { text: "BUSINESS × TECHNOLOGY", dir: 1 },
] as const;

export const ABOUT = {
  label: "(01)",
  heading: "About",
  lead: "Technology is what I study. What interests me is wider: how things work, how they look, and how an idea becomes something real.",
  body: [
    "I study HBO-ICT at The Hague University of Applied Sciences, where Java is the language I'm learning most deliberately. Visual design and film came first, and they still shape how I work. Photography, branding and fashion interest me for the same reason: they decide how something is seen before anyone uses it.",
    "I learn by doing: start, find out what I don't know yet, make it better. It's also why entrepreneurship appeals to me. It asks for the idea, the thing itself and whether anyone needs it, all at once.",
  ],
  /** What I actually work with. Metadata, not a skills résumé: no bars, no
   *  percentages, no years, and nothing I am only curious about. */
  stack: [
    "Java", "Spring Boot", "TypeScript", "React", "Next.js", "SQL / PostgreSQL",
    "Supabase", "Git / GitHub", "Docker", "UI / UX", "Visual design",
  ],
} as const;

/**
 * The chapter marker for the work. It is small, it stays pinned in the middle
 * of the screen, and the projects move past it — so it is a label on a
 * sequence rather than a headline above a list.
 */
export const WORK_INTRO = {
  marker: "Selected work",
} as const;

/**
 * FEATURED WORK — exactly two, in this order.
 *
 * MODUS leads because it is the larger piece of work; nothing else marks it
 * out, because the first position is the whole of the hierarchy here.
 *
 * `caseStudy` points at a real page only when one exists. BEBO has none, and
 * its link goes to the domain rather than claiming otherwise: the site in the
 * picture is built, but bebobetonboren.nl still serves the holding page
 * ("Onze website is in ontwikkeling", checked 2026-10-04).
 *
 * `media.live` is a URL that may be embedded over the still. It is an
 * enhancement and never a requirement: the still is what the composition is
 * built on, and components/site/WorkLive decides whether running the real
 * thing on top of it is worth the cost.
 */
export const FEATURED = [
  {
    /** `kind` is not shown: it is what the link is called for a screen
     *  reader, which needs more than a name and an image. */
    kind: "Product / Development",
    title: ["MODUS"],
    slug: "modus",
    summary:
      "A business improvement platform built on one idea: the visible problem is rarely the real one. The site explains how it finds the friction, fixes what matters and keeps going, and carries a working demo of the product.",
    media: {
      src: "/work/modus-home",
      w: 1680,
      h: 958,
      alt: "withmodus.co: the homepage, with the network of a business resolving behind the opening line",
      caption: "withmodus.co, the live homepage",
      /**
       * The still above is the floor, and this runs on top of it where it is
       * worth doing. The site sets no X-Frame-Options and no CSP
       * frame-ancestors, so it embeds; www is named directly so the frame
       * does not start on a redirect.
       *
       * `?embed=1` is a request, not a requirement. Framed, MODUS has no
       * stored consent, so its privacy dialog opens over the homepage every
       * time somebody scrolls past this. MODUS ignores the parameter today
       * and nothing breaks; the day it answers it by holding that dialog
       * back when framed, this picks it up with no change here.
       */
      live: "https://www.withmodus.co/?embed=1",
    },
    action: { label: "Read the case study", href: "/work/modus", external: false },
    caseStudy: "/work/modus",
  },
  {
    kind: "Client / Development",
    title: ["BEBO", "Betonboren"],
    slug: "bebo",
    summary:
      "A website for a concrete drilling and sawing company: a traditional trade, given a clearer and more professional presence, and a proper way to handle the work that comes in.",
    media: {
      src: "/work/bebo-site",
      w: 1680,
      h: 958,
      /** The site itself, built. bebobetonboren.nl still serves the holding
       *  page today (checked 2026-10-04), so neither of these says "live". */
      alt: "BEBO betonboren & zagen: the site, built around a single line about drilling to the millimetre",
      caption: "The BEBO site as built. The domain still carries the holding page.",
    },
    action: { label: "Visit bebobetonboren.nl", href: "https://www.bebobetonboren.nl/", external: true },
    /** no case study yet, and none is implied */
    caseStudy: null as string | null,
  },
] as const;

/**
 * SKILLS & INTERESTS — four areas, each with two honest lists.
 *
 * `keywords` is what I actually do or use. `exploring` is what I am curious
 * about and working towards, and the interface labels it as exactly that, so
 * an interest is never read as a skill.
 */
export const FOCUS = {
  label: "(02)",
  heading: "Skills & interests",
  hint: "click me",
  exploringLabel: "Exploring",
  items: [
    {
      id: "technology",
      title: "Technology",
      line: "What I study, and what I practise most. Java first, then the web around it: interfaces, APIs and the data underneath.",
      keywords: ["Java", "Spring Boot", "TypeScript", "React / Next.js", "SQL"],
      exploring: [] as string[],
    },
    {
      id: "design",
      title: "Design",
      line: "How something looks is part of how it works. Interfaces, layout, type, and the details nobody notices until they are wrong.",
      keywords: ["UI / UX", "Visual design", "Prototyping"],
      exploring: ["Digital experiences"],
    },
    {
      id: "creative",
      title: "Creative work",
      line: "Film taught me to look before deciding what to make. Photography and creative direction are where that habit goes now.",
      keywords: ["Film", "Visual storytelling"],
      exploring: ["Photography", "Creative direction", "Fashion"],
    },
    {
      id: "business",
      title: "Business",
      line: "Why something should exist, who it is for, and whether it holds up outside my own head.",
      keywords: ["Independent projects", "Client work"],
      exploring: ["Entrepreneurship", "Branding"],
    },
  ],
} as const;

export const CONTACT = {
  label: "(03)",
  heading: ["Have an idea", "worth talking about?"],
  body: "Interesting projects, creative collaborations, a role, or simply a good conversation. If it's worth talking about, I'd like to hear it.",
  cta: { label: "Get in touch", href: "/contact" },
} as const;

/** Channels. LinkedIn is the one that matters here; Instagram carries over
 *  from the previous site. */
export const LINKS = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "LinkedIn", value: "in/jorisvnrijn", href: "https://www.linkedin.com/in/jorisvnrijn/" },
  { label: "Instagram", value: "@jorisvrr", href: SOCIALS.find((s) => s.id === "instagram")!.href },
] as const;

export const FOOTER = {
  lines: ["Let's", "make", "something."],
  year: "2026",
} as const;

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;
