/**
 * THE CONTACT PAGE.
 *
 * Its own file because it is its own route, and because everything here is
 * said once, in one place, the same way the rest of the site keeps its copy.
 *
 * Nothing on this page is invented. The fields are the things the rest of
 * the site shows I actually do or care about, and the channels are the real
 * ones from `content/site.ts`. There are no clients, no services, no
 * response times and no availability promised anywhere: this is a person's
 * portfolio, not an agency, and the page says only what is true of it.
 */

import { CONTACT_DETAILS, SITE, SOCIALS } from "@/content/site";

const phone = CONTACT_DETAILS.phone;

export const REACH = {
  label: "(04)",
  heading: ["Get in", "touch"],

  /** Said plainly, in the first person, claiming nothing. */
  lead: "A project, an idea you want to test, a creative collaboration, a role, or a conversation that might go somewhere. Write it here and it comes straight to me.",

  /** What someone can reasonably write to me about: the same ground the rest
   *  of the site covers, and nothing it does not. */
  fields: {
    label: "What to write about",
    items: [
      { id: "web", title: "Web development", line: "Sites and applications, built properly: the interface, and what runs behind it." },
      { id: "design", title: "Design", line: "Interfaces and visual identity, where how something looks is part of how it works." },
      { id: "creative", title: "Creative projects", line: "Photography, film, or something that does not fit a category yet." },
      { id: "ideas", title: "Ideas", line: "Something you are starting and want to think through with someone who will ask questions." },
      { id: "connect", title: "Opportunities", line: "A role, a collaboration, or simply a connection worth making." },
    ],
  },

  /** Reassurance, not a process diagram. Three lines, and no promise about
   *  when: I am a student, and I am not going to invent a response time. */
  expect: {
    label: "What to expect",
    steps: ["You send it", "I read it", "We talk"],
    note: "There is no team behind this. Whatever you write arrives with me.",
  },

  form: {
    label: "The message",
    fields: {
      name: { label: "Your name", placeholder: "" },
      email: { label: "Email", placeholder: "" },
      org: { label: "Company or project", placeholder: "Optional" },
      looking: { label: "What are you looking for?" },
      message: { label: "Message", placeholder: "Tell me a little about it." },
    },
    /** The reason for writing, which becomes the subject line. */
    options: [
      "Web development",
      "Design",
      "Creative project",
      "An idea",
      "Collaboration",
      "Opportunity",
      "Something else",
    ],
    send: "Send message",
    /** Truthful about what actually happens: the page has no server, so it
     *  hands the message to the visitor's own mail client. Saying "sent"
     *  would be a lie about a thing they can see for themselves. */
    sending: "Opening your mail app",
    sent: {
      heading: "It is ready to send",
      body: "Your mail app should have opened with the message in it. Send it and it reaches me. If nothing opened, the address is right here.",
      again: "Write another",
    },
    errors: {
      name: "I need something to call you.",
      email: "This needs to be an address I can reply to.",
      message: "Tell me a little about it, even one line.",
    },
  },

  direct: {
    label: "Or reach me directly",
    items: [
      { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
      { label: "Phone", value: phone.value, href: phone.href! },
      { label: "LinkedIn", value: "in/jorisvnrijn", href: SOCIALS.find((s) => s.id === "linkedin")!.href },
      { label: "Instagram", value: "@jorisvrr", href: SOCIALS.find((s) => s.id === "instagram")!.href },
    ],
  },

  /** The one nudge on the page: the form is below the introduction, and
   *  nothing else on screen says so. */
  cue: "Scroll down",

  /** The way back, since this page is off the one page everything else is on. */
  back: "Index",
} as const;
