# How to publish a Note

Every file in this folder is one **Notes & Insights** article. No React,
TypeScript, route or navigation file needs to change to add one.

## 1. Add a content file

Create `content/notes/your-slug.mdx` with YAML frontmatter, a blank line,
then the article body in plain Markdown:

```mdx
---
title: "Your Title Here"
slug: "your-slug"
date: "2026-10-01"
category: "Digital Agriculture"
excerpt: "One or two sentences shown on the /notes card."
image: "/notes/your-slug.jpg"
imageAlt: "Describe the image for accessibility and SEO."
readTime: "3 min read"
published: true
---

Your first paragraph.

Your second paragraph.

## An optional heading

More text, a [link](https://example.com), **bold**, _italic_.

- A bullet point
- Another bullet point

1. A numbered step
2. Another step

> An optional blockquote.
```

### Frontmatter fields

| Field       | Required | Notes                                                              |
| ----------- | -------- | ------------------------------------------------------------------- |
| `title`     | yes      | Article title.                                                      |
| `date`      | yes      | ISO date, `YYYY-MM-DD`. Notes are sorted newest first.               |
| `category`  | yes      | Short label shown on the card and article page.                     |
| `excerpt`   | yes      | One or two sentences shown on the `/notes` card.                    |
| `slug`      | no       | Defaults to the filename (without `.mdx`). Sets the `/notes/<slug>` route. |
| `image`     | no       | Path under `/public`, e.g. `/notes/your-slug.jpg`.                   |
| `imageAlt`  | no*      | *Required whenever `image` is set — accessibility + SEO.            |
| `readTime`  | no       | e.g. `"3 min read"`. Omitted if not set.                             |
| `published` | no       | Defaults to `true`. Set to `false` to keep a **draft** in the repo — see below. |

## 2. Add an image

Put the image file under `public/notes/` (e.g. `public/notes/your-slug.jpg`)
and reference it from `image` in the frontmatter above.

- On the `/notes` **listing** card, the image is cropped into a small,
  fixed-size box (compact, text-first design).
- On the **individual article page**, the image is shown in full as a
  landscape editorial visual — never cropped. Author it at roughly a
  **8:5 landscape ratio (e.g. ~1600×1000px)** so it matches the space the
  article template reserves for it; a different ratio still displays
  correctly (no cropping), just with more or less visible height.

## 3. Run the site

```
npm run dev
```

The note appears automatically on `/notes` (sorted by date) and at
`/notes/<slug>` — nothing else needs to change.

## Drafts

Set `published: false` to keep a note in the repository without publishing
it: it will not appear on `/notes` and its route will not be generated (visiting
it 404s). Flip it back to `true` (or remove the field) when you're ready to
publish.

## Supported Markdown

Paragraphs, `##`/`###` headings, **bold**, _italic_, links, bullet lists,
numbered lists, and `> blockquotes`. Styling comes from the site's existing
design tokens (see the `.prose-editorial` rules in `app/globals.css`) — no
extra formatting is needed in the Markdown itself.

### The lead paragraph

The **first paragraph** of the article body is automatically shown as a
short, visually distinct lead directly under the title (before the image) —
this is why the example above opens with "Your first paragraph." on its own.
No extra frontmatter field is needed; just make sure the article's first
paragraph works well as a short, one-paragraph intro. If the body starts
with a heading instead of a paragraph, this lead treatment is skipped
automatically.

## How it works (for reference)

- `lib/notes.ts` reads every `.mdx` file in this folder and parses its
  frontmatter with `gray-matter`. Its `splitNoteLead()` splits the body into
  the lead paragraph and the rest, for the article page template.
- `lib/content.ts`'s `getNotes()` / `getNote(slug)` sort and filter that list
  (same `published`/`placeholder` visibility rules as the rest of the site).
- `app/notes/page.tsx` lists every visible note via `NoteCard`.
- `app/notes/[slug]/page.tsx` renders one note's title, lead, image and
  Markdown body — via `NoteLead` and `NoteBody` (using `marked`) — in the
  same structure for every article.

No CMS, database, or external storage is involved — everything lives in this
git-tracked folder.
