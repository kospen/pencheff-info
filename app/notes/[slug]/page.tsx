import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow, MoreLink, PlaceholderTag } from "@/components/editorial/primitives";
import { NoteBody, NoteLead } from "@/components/notes/NoteBody";
import { formatDate, getNote, getNotes } from "@/lib/content";
import { splitNoteLead } from "@/lib/notes";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    ...pageMetadata({ title: note.title, path: `/notes/${note.slug}`, description: note.excerpt }),
    // DESIGN PROTOTYPE — keep out of search results until the section is approved.
    robots: { index: false, follow: true },
  };
}

/**
 * Individual Note layout — shared by every article under content/notes/.
 * A single compact editorial header (metadata + title + lead in a left
 * column, the landscape image in a right column at md+; one stacked column
 * on mobile: metadata -> title -> lead -> image), then a thin divider and
 * the article body. Editing this file changes every current and future
 * note at once; no per-article layout overrides live here or anywhere
 * else.
 *
 * The header and body share one inner `max-w-[1300px]` column (narrower
 * than the site's default 1440px Container, only for this template) so the
 * body's reading column lines up with the header's left column instead of
 * being independently centered.
 *
 * The lead is simply the first paragraph of the note's own Markdown body
 * (see splitNoteLead in lib/notes.ts) — no extra frontmatter field. The
 * image renders at its authored aspect ratio via next/image with explicit
 * width/height, never `fill` + `object-cover`, so a landscape source
 * always displays as landscape — never cropped to portrait.
 */
export default async function NotePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const all = getNotes();
  const index = all.findIndex((n) => n.slug === note.slug);
  const next = all[index + 1];
  const date = formatDate(note.date);
  const { lead, rest } = splitNoteLead(note.content);

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <span aria-hidden className="absolute inset-y-0 right-0 hidden w-[22%] bg-mist lg:block" />
        <Container className="relative py-8 md:py-10">
          <div className="mx-auto max-w-[1300px] md:grid md:grid-cols-[1.4fr_1fr] md:items-start md:gap-10 lg:gap-14">
            <div>
              <Eyebrow>
                <Link href="/notes" className="hover:text-navy">
                  Notes &amp; Insights
                </Link>{" "}
                / {note.category}
              </Eyebrow>
              <p className="label mt-2 text-slate">{[date, note.readTime].filter(Boolean).join(" · ")}</p>
              {note.placeholder && <PlaceholderTag className="mt-3" />}
              <h1 className="mt-3 font-serif text-[clamp(2.375rem,4vw,3.25rem)] leading-[1.08] font-medium tracking-[-0.02em]">
                {note.title}
              </h1>
              {lead && <NoteLead markdown={lead} className="mt-3 max-w-[600px]" />}
            </div>

            {note.image && (
              <figure className="mt-6 md:mt-0">
                <span className="block max-w-[560px] overflow-hidden bg-frame md:ml-auto">
                  <Image
                    src={note.image}
                    alt={note.imageAlt ?? ""}
                    width={1600}
                    height={1000}
                    sizes="(min-width: 768px) 560px, 100vw"
                    priority
                    className="h-auto w-full"
                  />
                </span>
              </figure>
            )}
          </div>
        </Container>
      </header>

      <Container className="py-8 md:py-10">
        <div className="mx-auto max-w-[1300px]">
          <div className="max-w-[760px]">
            <NoteBody markdown={rest} />
          </div>

          <nav
            aria-label="More notes"
            className="mt-14 flex max-w-[760px] flex-col gap-4 border-t border-navy pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <MoreLink href="/notes">All notes</MoreLink>
            {next && (
              <Link href={`/notes/${next.slug}`} className="group text-right">
                <span className="label block">Next note</span>
                <span className="font-serif text-xl group-hover:text-link">{next.title} →</span>
              </Link>
            )}
          </nav>
        </div>
      </Container>
    </article>
  );
}
