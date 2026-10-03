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
 * that project's own repository), and the rebuild brief of 2026-09-29 for the
 * positioning and the study programme.
 */

import { SITE, SOCIALS } from "@/content/site";

export const IDENTITY = {
  name: SITE.name,
  first: "Joris",
  last: "van Rijn",
  /** what the site is about, in five words */
  discipline: "Software Engineering × Automations",
  location: "Leiderdorp / NL",
  /** the hero's bottom-right system status */
  status: "Open for work",
  email: SITE.email,
  domain: SITE.domain,
} as const;

/**
 * The lines that run across the hero. They are the hero — not a heading
 * inside it — so there are five of them and they divide the whole height
 * between them, running in alternating directions at different speeds.
 */
export const HERO_LINES = [
  { text: "SOFTWARE ENGINEER", dir: 1 },
  { text: "FULL-STACK DEVELOPER", dir: -1 },
  { text: "AUTOMATIONS", dir: 1 },
  { text: "PRODUCT DEVELOPMENT", dir: -1 },
  { text: "BUSINESS × TECHNOLOGY", dir: 1 },
] as const;

export const ABOUT = {
  label: "(01)",
  heading: "About",
  lead: "I build digital products and software at the intersection of technology, business and design.",
  body: [
    "I study HBO-ICT, on the software engineering track. What interests me is the system behind a product: the interfaces, the APIs, the data, the processes, and the way people actually end up using it.",
    "My background is in visual design and filmmaking, which is where I learned to communicate an idea. It gives me a different way into development: I care how something is built, but also why it exists, what it costs the business, and how the finished thing feels to use.",
  ],
  /** Metadata, not a skills résumé: no bars, no percentages, no years. */
  stack: [
    "Java", "React", "Next.js", "TypeScript", "SQL", "Supabase",
    "APIs", "Git / GitHub", "Docker", "UI / UX", "Data", "Process optimization",
  ],
} as const;

/**
 * The chapter marker for the work. It is small, it stays pinned in the middle
 * of the screen, and the projects move past it — so it is a label on a
 * sequence rather than a headline above a list.
 */
export const WORK_INTRO = {
  marker: "Selected work",
  note: "One client, one my own",
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
      "A business software and automation platform built around finding friction: mapping how a company actually works, fixing what is slowing it down, and connecting the tools behind it.",
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
      "A digital platform for a concrete drilling and sawing company, taking a traditional service business and giving it a clearer, more professional presence and a way of handling the work that comes in.",
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
 * WHAT I WORK WITH — categories, each with the things inside it. The keywords
 * are what I actually work with as a student, not a claim of expertise.
 */
export const FOCUS = {
  label: "(02)",
  heading: "What I work with",
  hint: "click me",
  items: [
    { id: "software", title: "Software", line: "Where most of my time goes: writing it, breaking it, reading other people's.", keywords: ["Java", "React", "Next.js", "APIs", "Full-stack"] },
    { id: "automations", title: "Automations", line: "The repetitive parts of a process handled by something that does not get bored.", keywords: ["Workflows", "Integrations", "APIs", "Process optimization"] },
    { id: "products", title: "Digital products", line: "Something a person opens and gets somewhere with. The rest is scaffolding.", keywords: ["Web applications", "Interfaces", "Prototypes", "Product thinking"] },
    { id: "data", title: "Data", line: "The shape of the thing underneath. Get it wrong and everything above it bends.", keywords: ["SQL", "PostgreSQL", "Supabase", "Data modelling"] },
    { id: "interfaces", title: "Interfaces", line: "Where the system meets somebody who did not build it.", keywords: ["User flows", "Interaction", "Design systems", "Prototyping"] },
    { id: "business", title: "Business × technology", line: "What it is for, what it costs, and whether it was worth building.", keywords: ["Business analysis", "Process optimization", "Stakeholders"] },
  ],
} as const;

export const CONTACT = {
  label: "(03)",
  heading: ["Have a project", "or an opportunity?"],
  body: "I'm open for work: software, automations, digital products. The things people actually end up using, built by people who care how they are built.",
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
  lines: ["Let's", "build", "something."],
  year: "2026",
} as const;

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;
