import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Note } from "@/lib/types";

/**
 * NOTES & INSIGHTS — filesystem-backed content, no CMS/database.
 *
 * Every file in content/notes/*.mdx is one note: YAML frontmatter (title,
 * date, category, excerpt, image, imageAlt, readTime, published) followed
 * by the article body in plain Markdown. See content/notes/README.md for
 * the full field list and a copy-paste example.
 *
 * To publish a new note: add a .mdx file here and an image under
 * public/notes/, then run `npm run dev` (or `npm run build`). No React or
 * TypeScript file needs to change — getNotes() in lib/content.ts reads this
 * directory on every call, sorts by date and applies the same
 * published/placeholder visibility rules as the rest of the site.
 */

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

interface NoteFrontmatter {
  title: string;
  slug?: string;
  date: string;
  category: string;
  excerpt: string;
  image?: string;
  imageAlt?: string;
  readTime?: string;
  published?: boolean;
  placeholder?: boolean;
  featured?: boolean;
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/i, "");
}

function readNoteFile(filename: string): Note {
  const filePath = path.join(NOTES_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<NoteFrontmatter>;

  if (!fm.title || !fm.date || !fm.category || !fm.excerpt) {
    throw new Error(
      `content/notes/${filename} is missing a required frontmatter field ` +
        "(title, date, category and excerpt are all required — see content/notes/README.md).",
    );
  }

  return {
    slug: fm.slug ?? slugFromFilename(filename),
    title: fm.title,
    date: fm.date,
    category: fm.category,
    excerpt: fm.excerpt,
    readTime: fm.readTime,
    image: fm.image,
    imageAlt: fm.imageAlt,
    published: fm.published ?? true,
    placeholder: fm.placeholder,
    featured: fm.featured,
    content: content.trim(),
  };
}

/**
 * Every note file under content/notes/, unfiltered and unsorted — visibility
 * (published/placeholder) and ordering are applied by getNotes() in
 * lib/content.ts, same as every other content type on the site.
 */
export function getNoteEntries(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((f) => /\.mdx$/i.test(f)) // .mdx only — README.md and similar files are ignored
    .map(readNoteFile);
}

/**
 * Splits a note's Markdown body into a short lead (the first
 * blank-line-delimited block) and the remaining body — used by the
 * individual Note page template to show a short intro directly under the
 * title, before the image (see app/notes/[slug]/page.tsx). Every note gets
 * this automatically from its own first paragraph; no extra frontmatter
 * field is needed.
 *
 * If the first block is a heading (starts with `#`), there is no lead —
 * the whole body is returned as `rest` and rendered as-is, unchanged.
 */
export function splitNoteLead(content: string): { lead: string | null; rest: string } {
  const trimmed = content.trim();
  const boundary = trimmed.match(/\r?\n[ \t]*\r?\n/);
  if (!boundary || boundary.index === undefined) {
    return { lead: null, rest: trimmed };
  }

  const first = trimmed.slice(0, boundary.index).trim();
  if (/^#{1,6}\s/.test(first)) {
    return { lead: null, rest: trimmed };
  }

  const rest = trimmed.slice(boundary.index + boundary[0].length).trim();
  return { lead: first, rest };
}
