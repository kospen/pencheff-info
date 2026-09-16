import { Container, EmptyState, PageHeader } from "@/components/editorial/primitives";
import { PublicationList } from "@/components/publications/PublicationList";
import { JsonLd } from "@/components/layout/JsonLd";
import { publicationTypes } from "@/content/taxonomy";
import { getPublications, publicationTypeLabel } from "@/lib/content";
import { pageMetadata, scholarlyArticleJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Publications",
  path: "/publications",
  description: "Publications by Kostadin Penchev — journal articles, conference papers, book chapters, working papers and research reports.",
});

export default function PublicationsPage() {
  const items = getPublications();
  const counts = Object.keys(publicationTypes)
    .map((id) => ({ id, n: items.filter((p) => p.type === id).length }))
    .filter((c) => c.n > 0);
  const ld = scholarlyArticleJsonLd(items);
  return (
    <>
      <PageHeader eyebrow="Publications" title="Publications" intro="Journal articles, conference papers, book chapters, working papers and research reports.">
        {counts.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
            {counts.map((c) => (
              <li key={c.id} className="label">
                <span className="text-navy">{c.n}</span> {publicationTypeLabel(c.id)}{c.n > 1 ? "s" : ""}
              </li>
            ))}
          </ul>
        )}
      </PageHeader>
      <Container className="pt-12 md:pt-16">
        {items.length ? (
          <PublicationList items={items} />
        ) : (
          <EmptyState title="Publications are in preparation.">Work in progress is documented in Research.</EmptyState>
        )}
      </Container>
      {ld.length > 0 && <JsonLd data={ld} />}
    </>
  );
}
