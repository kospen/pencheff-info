import { Marked } from "marked";

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/**
 * External links in note bodies (e.g. "Further reading", or a discreet
 * mention of an outside project) open in a new tab with the standard
 * security attributes. Internal (relative) links stay in the same tab.
 * This is the only customization — everything else uses marked's default
 * rendering.
 */
const noteMarked = new Marked({ gfm: true, breaks: false }).use({
  renderer: {
    link({ href, title, tokens }) {
      // Render the link's inner tokens (not the raw `.text`) so nested
      // formatting — e.g. [**Bold Label**](url) — still renders as bold.
      const inner = this.parser.parseInline(tokens);
      const external = /^https?:\/\//i.test(href);
      const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
      const externalAttrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${escapeAttr(href)}"${titleAttr}${externalAttrs}>${inner}</a>`;
    },
  },
});

/**
 * Shared raw-HTML renderer for note Markdown, used by both NoteBody (the
 * article body) and NoteLead (the short intro under the title) so the two
 * never fall out of sync on link/formatting behaviour. Content is Kostadin
 * Penchev's own, authored directly in content/notes/*.mdx — not
 * user-submitted — so converting straight to HTML is safe; no sanitizer
 * dependency needed.
 */
export function renderNoteMarkdown(markdown: string): string {
  return noteMarked.parse(markdown, { async: false }) as string;
}

/**
 * Renders a note's Markdown body. Styling comes entirely from the existing
 * `.prose-editorial` rules in app/globals.css (design tokens only, see the
 * comment there) — this component adds no styles of its own.
 */
export function NoteBody({ markdown }: { markdown: string }) {
  const html = renderNoteMarkdown(markdown);
  return (
    <div
      className="prose-editorial text-base leading-relaxed text-navy/90 md:text-lg"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Short intro/lead paragraph shown directly under the title on an
 * individual Note page, before the image and the main body (see
 * app/notes/[slug]/page.tsx and splitNoteLead in lib/notes.ts). Serif type
 * sets it visually apart from the sans-serif article body; inline
 * formatting (bold, links) uses the same renderer as NoteBody, styled by
 * the `.note-lead` rules in app/globals.css (existing tokens only).
 *
 * Deliberately restrained sizing/weight (not a giant bold statement) and no
 * built-in max-width — the caller controls width to match the article
 * header's column layout.
 */
export function NoteLead({ markdown, className = "" }: { markdown: string; className?: string }) {
  const html = renderNoteMarkdown(markdown);
  return (
    <div
      className={`note-lead font-serif text-[1.125rem] leading-snug text-navy md:text-[1.375rem] ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
