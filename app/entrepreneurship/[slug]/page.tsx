import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow, ExternalIcon, MetaList, MoreLink, PlaceholderTag, StatusMark } from "@/components/editorial/primitives";
import { EntrySections, RelatedList } from "@/components/editorial/Sections";
import { formatPeriod, getVenture, getVentures, relatedTo, ventureStatus, ventureTypeLabel } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import type { EntryRef } from "@/lib/types";

type Params = { slug: string };

export function generateStaticParams() {
  return getVentures().map((v) => ({ slug: v.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const v = getVenture(slug);
  if (!v) return {};
  return {
    ...pageMetadata({ title: v.title, path: `/entrepreneurship/${v.slug}`, description: v.summary }),
    ...(v.placeholder ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function VenturePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const v = getVenture(slug);
  if (!v) notFound();
  const s = ventureStatus(v.status);
  const parent = v.parent ? getVenture(v.parent) : undefined;
  const products = getVentures().filter((x) => x.parent === v.slug);
  const related = relatedTo(`ventures/${v.slug}` as EntryRef, v.related);

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <span aria-hidden className="absolute inset-y-0 right-0 hidden w-[22%] bg-mist lg:block" />
        <Container className="relative py-12 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Eyebrow>
              <Link href="/entrepreneurship" className="hover:text-navy">
                Entrepreneurship
              </Link>{" "}
              / {ventureTypeLabel(v.type)}
            </Eyebrow>
            <StatusMark label={s.label} tone={s.tone} />
          </div>
          {v.placeholder && <PlaceholderTag className="mt-8" />}
          <h1 className="mt-6 max-w-5xl font-serif text-[2.5rem] leading-[1.04] font-medium tracking-[-0.025em] md:text-[4rem]">{v.title}</h1>
          {v.summary && <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate md:text-xl">{v.summary}</p>}
          <div className="mt-10 max-w-5xl">
            <MetaList
              items={[
                { label: "Type", value: ventureTypeLabel(v.type) },
                { label: "Role", value: v.roles?.join(", ") },
                { label: "Period", value: formatPeriod(v.period) },
                { label: "Status", value: s.label },
                {
                  label: "Part of",
                  value: parent ? (
                    <Link className="text-link" href={`/entrepreneurship/${parent.slug}`}>
                      {parent.title}
                    </Link>
                  ) : undefined,
                },
                {
                  label: "Website",
                  value: v.website ? (
                    <a className="text-link inline-flex items-center gap-1.5" href={v.website} target="_blank" rel="noopener">
                      {v.website.replace(/^https?:\/\//, "")} <ExternalIcon />
                    </a>
                  ) : undefined,
                },
              ]}
            />
          </div>
        </Container>
      </header>
      <Container>
        <EntrySections
          sections={[
            { key: "overview", title: "Overview", section: v.overview },
            { key: "problem", title: "Problem", section: v.problem },
            { key: "work", title: "What we built", section: v.work },
            { key: "my-role", title: "My role", section: v.myRole },
            { key: "results", title: "Results", section: v.results },
            { key: "research-connection", title: "Research connection", section: v.researchConnection },
            {
              key: "products",
              title: "Products",
              custom: products.length ? (
                <RelatedList items={products.map((p) => ({ ref: `ventures/${p.slug}` as EntryRef, kindLabel: "Product", title: p.title, href: `/entrepreneurship/${p.slug}`, placeholder: p.placeholder }))} />
              ) : undefined,
            },
            { key: "related", title: "Related work", custom: related.length ? <RelatedList items={related} /> : undefined },
            {
              key: "links",
              title: "Links",
              custom: v.links?.length ? (
                <ul className="flex flex-col gap-2">
                  {v.links.map((l) => (
                    <li key={l.url}>
                      <a href={l.url} target="_blank" rel="noopener" className="text-link inline-flex min-h-11 items-center gap-2">
                        {l.label} <ExternalIcon />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : undefined,
            },
          ]}
        />
        <div className="mt-6 border-t border-navy pt-8">
          <MoreLink href="/entrepreneurship">All ventures</MoreLink>
        </div>
      </Container>
    </article>
  );
}
