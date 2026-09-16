import type { Metadata } from "next";
import { site } from "@/content/site";
import type { ActivityEntry, Publication } from "@/lib/types";
import { isoDate } from "@/lib/content";

/** Per-page metadata with canonical URL and social tags. */
export function pageMetadata({ title, description, path }: { title: string; description?: string; path: string }): Metadata {
  const desc = description ?? site.description;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: { title: `${title} — ${site.name}`, description: desc, url: path, siteName: site.domain, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} — ${site.name}`, description: desc },
  };
}

export function personJsonLd() {
  const sameAs = Object.values(site.profiles).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    image: `${site.url}/photo/portrait-hero.jpg`,
    jobTitle: site.currentRole.title,
    affiliation: { "@type": "CollegeOrUniversity", name: site.currentRole.organisation },
    ...(site.contact.email ? { email: `mailto:${site.contact.email}` } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function scholarlyArticleJsonLd(list: Publication[]) {
  return list
    .filter((p) => !p.placeholder && p.status === "published")
    .map((p) => ({
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      headline: p.title,
      author: p.authors.map((name) => ({ "@type": "Person", name })),
      ...(p.year ? { datePublished: String(p.year) } : {}),
      ...(p.venue ? { isPartOf: { "@type": "Periodical", name: p.venue } } : {}),
      ...(p.doi ? { sameAs: `https://doi.org/${p.doi}` } : p.url ? { url: p.url } : {}),
      ...(p.abstract ? { abstract: p.abstract } : {}),
    }));
}

export function eventJsonLd(list: ActivityEntry[]) {
  return list
    .filter((a) => !a.placeholder && isoDate(a.period?.start))
    .map((a) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: a.title,
      startDate: isoDate(a.period?.start),
      ...(isoDate(a.period?.end) ? { endDate: isoDate(a.period?.end) } : {}),
      ...(a.location ? { location: { "@type": "Place", name: a.location } } : {}),
      ...(a.organiser ? { organizer: { "@type": "Organization", name: a.organiser } } : {}),
      ...(a.roles?.includes("presenter") ? { performer: { "@type": "Person", name: site.name } } : {}),
    }));
}
