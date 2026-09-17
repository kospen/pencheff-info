import Image from "next/image";
import Link from "next/link";
import type { Note } from "@/lib/types";
import { formatDate } from "@/lib/content";
import { ArrowIcon, PlaceholderTag } from "@/components/editorial/primitives";

/**
 * Compact editorial note row — small image + article information, in the
 * same visual language as the site's index rows (border-b divider, serif
 * heading, mono meta labels — see ProjectRow). Reused on /notes for every
 * note file under content/notes/*.mdx, so publishing another note needs no
 * new markup, and rows stay easy to scan even with many notes.
 */
export function NoteCard({ note }: { note: Note }) {
  const date = formatDate(note.date);
  const meta = [date, note.readTime].filter(Boolean).join(" · ");
  return (
    <li className="border-b border-line">
      <Link
        href={`/notes/${note.slug}`}
        className="group flex flex-col gap-4 py-6 transition-colors hover:bg-card sm:flex-row sm:items-center sm:gap-7 md:py-7"
      >
        {note.image && (
          <span className="relative block h-40 w-full shrink-0 overflow-hidden sm:h-60 sm:w-[30%] sm:max-w-[15rem]">
            <Image
              src={note.image}
              alt={note.imageAlt ?? ""}
              fill
              sizes="(min-width: 640px) 30vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </span>
        )}
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="flex flex-wrap items-center gap-x-2">
            <span className="label">{note.category}</span>
            {meta && (
              <>
                <span aria-hidden className="text-line">
                  /
                </span>
                <span className="font-mono text-xs tracking-[0.04em] text-slate">{meta}</span>
              </>
            )}
            {note.placeholder && <PlaceholderTag />}
          </span>
          <span className="mt-2 font-serif text-xl leading-snug group-hover:text-link md:text-2xl">{note.title}</span>
          {note.excerpt && (
            <span className="mt-2 line-clamp-2 max-w-2xl text-[0.9375rem] leading-relaxed text-slate">{note.excerpt}</span>
          )}
          <span className="mt-3 inline-flex w-fit items-center gap-3 font-mono text-[0.8125rem] font-medium tracking-[0.14em] text-link uppercase group-hover:text-navy">
            Read note
            <ArrowIcon tone="deep" />
          </span>
        </span>
      </Link>
    </li>
  );
}
