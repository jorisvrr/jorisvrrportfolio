import type { Metadata, Viewport } from "next";
import { SITE } from "@/content/site";
import { display, mono, sans } from "./fonts";
import "./globals.css";

// Icons come from the file conventions in app/: favicon.ico, icon.png and
// apple-icon.png, all cut from the supplied logo. The social preview is
// public/og-image.jpg: the hero itself, at 1200 x 630.
const TITLE = "Joris van Rijn · Technology, design & creative work";
const DESCRIPTION =
  "Joris van Rijn: HBO-ICT student working across technology, design and business. Web development, Java, digital design, photography and creative projects.";
const SHORT =
  "Technology, design and business: web development, Java, digital design, photography and creative projects.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),

  title: {
    default: TITLE,
    template: "%s · Joris van Rijn",
  },

  description: DESCRIPTION,

  keywords: [
    "Joris van Rijn",
    "Joris van Rijn portfolio",
    "technology and design",
    "web development",
    "digital design",
    "photography",
    "creative projects",
    "Java",
    "HBO-ICT",
  ],

  authors: [{ name: SITE.name, url: SITE.origin }],
  creator: SITE.name,
  publisher: SITE.name,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE.name,
    title: TITLE,
    description: SHORT,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Joris van Rijn: technology, design, photography and business, set in large type",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SHORT,
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/**
 * Structured data: the site and the person it belongs to, said once and
 * only with what the page itself says. A student, of HBO-ICT, at one school;
 * no job title, no specialisation, no employer. `knowsAbout` lists what the
 * work on the site demonstrates, not everything I am curious about.
 */
const PERSON_ID = `${SITE.origin}/#person`;
const STRUCTURED = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.origin}/#website`,
      url: SITE.origin,
      name: SITE.name,
      description: SHORT,
      inLanguage: "en",
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE.name,
      url: SITE.origin,
      email: `mailto:${SITE.email}`,
      image: `${SITE.origin}/portrait-820.webp`,
      description:
        "HBO-ICT student at The Hague University of Applied Sciences, working across technology, design and business.",
      affiliation: { "@type": "CollegeOrUniversity", name: SITE.education.school },
      address: { "@type": "PostalAddress", addressLocality: SITE.locality, addressCountry: "NL" },
      knowsAbout: ["Java", "Web development", "Digital design", "Visual design", "User interface design"],
      sameAs: [
        "https://www.linkedin.com/in/jorisvnrijn/",
        "https://www.instagram.com/jorisvrr",
      ],
    },
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f1ed" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a09" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>
        {/* Nothing here that is not already on the page. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(STRUCTURED),
          }}
        />
        <a className="skip-link" href="#about">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
