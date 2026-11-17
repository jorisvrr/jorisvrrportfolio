import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PROJECTS, PROJECT_BY_SLUG, hasCaseStudy } from "@/content/projects";
import { CaseRoute } from "@/components/case/CaseRoute";

/**
 * /work/[slug] — a real route per project, not a component swapped behind a
 * fixed URL. Opening a case study from inside the environment moves the URL
 * here without a reload; arriving at it directly renders the same case study
 * with a shortened arrival.
 *
 * A project whose case study does not exist yet does not get an empty page
 * pretending otherwise: it returns to the Work index, where its real state
 * (in preparation, or coming soon) is on screen.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECT_BY_SLUG[slug];
  if (!p || !hasCaseStudy(p)) return { title: "Work", robots: { index: false, follow: true } };

  // Only what the project actually says about itself.
  const title = p.seo?.title ?? `${p.title}, case study`;
  const description = p.seo?.description ?? p.context?.[0] ?? `${p.type}${p.role?.length ? ` · ${p.role.join(" / ")}` : ""}`;
  // A preview is a real JPEG made for it (public/work/*-og.jpg), or the site's
  // own. Never the project's source still: those are encoded to WebP and the
  // .jpg path does not exist in public/, and never a generated stand-in.
  const image = p.openGraph?.image ?? "/og-image.jpg";
  const ogTitle = p.openGraph?.title ?? title;
  const ogDescription = p.openGraph?.description ?? description;

  return {
    title,
    description,
    ...(p.seo?.keywords ? { keywords: p.seo.keywords } : {}),
    alternates: { canonical: `/work/${p.slug}` },
    // Development case studies exist to test the sections, not to be indexed.
    robots: p.devOnly ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      siteName: "Joris van Rijn",
      locale: "en_US",
      title: ogTitle,
      description: ogDescription,
      url: `/work/${p.slug}`,
      images: [{ url: image, alt: `${p.title}: ${p.subtitle ?? p.type}` }],
    },
    // its own card, not the home page's inherited one
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECT_BY_SLUG[slug];
  if (!p) notFound();
  if (!hasCaseStudy(p)) redirect("/");
  return <CaseRoute slug={slug} />;
}
