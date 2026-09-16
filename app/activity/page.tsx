import { Container, EmptyState, PageHeader } from "@/components/editorial/primitives";
import { ActivityList } from "@/components/timeline/ActivityList";
import { JsonLd } from "@/components/layout/JsonLd";
import { getActivity } from "@/lib/content";
import { eventJsonLd, pageMetadata } from "@/lib/seo";

const intro =
  "Conferences and scientific forums, academic mobility, doctoral schools and research training, and university and professional activity.";

export const metadata = pageMetadata({
  title: "Activity",
  path: "/activity",
  description: `Activity of Kostadin Penchev: ${intro.charAt(0).toLowerCase()}${intro.slice(1)}`,
});

export default function ActivityPage() {
  const items = getActivity();
  const ld = eventJsonLd(items);
  return (
    <>
      <PageHeader eyebrow="Activity" title="Activity" intro={intro} />
      <Container className="pt-10 md:pt-14">
        {items.length ? <ActivityList items={items} /> : <EmptyState title="Activity will be listed here." />}
      </Container>
      {ld.length > 0 && <JsonLd data={ld} />}
    </>
  );
}
