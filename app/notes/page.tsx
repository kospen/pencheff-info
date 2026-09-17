import { Container, EmptyState, PageHeader } from "@/components/editorial/primitives";
import { NoteCard } from "@/components/notes/NoteCard";
import { getNotes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const intro = "Research, technology and ideas in progress.";

export const metadata = {
  ...pageMetadata({
    title: "Notes & Insights",
    path: "/notes",
    description: `Notes & Insights by Kostadin Penchev: ${intro.charAt(0).toLowerCase()}${intro.slice(1)}`,
  }),
  // DESIGN PROTOTYPE — keep out of search results until the section is approved.
  robots: { index: false, follow: true },
};

export default function NotesPage() {
  const notes = getNotes();
  return (
    <>
      <PageHeader eyebrow="Notes & Insights" title="Notes & Insights" intro={intro} />
      <Container className="pt-10 pb-20 md:pt-14 md:pb-28">
        {notes.length ? (
          <ul className="border-t border-line">
            {notes.map((note) => (
              <NoteCard key={note.slug} note={note} />
            ))}
          </ul>
        ) : (
          <EmptyState title="Notes will be published here." />
        )}
      </Container>
    </>
  );
}
