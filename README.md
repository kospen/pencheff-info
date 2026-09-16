# PENCHEFF.INFO

Personal professional website and long-term archive of **Kostadin Penchev** — research, projects, technology and entrepreneurship.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · static generation · Vercel-ready.

## Run

```bash
npm install
npm run dev       # http://localhost:3000
npm run lint
npm run build     # production build
npm run start     # serve the production build
```

Node.js 20.9 or newer.

## Editing content

All content lives in `content/` — no page code needs to change.

| File | What it holds |
|---|---|
| `content/site.ts` | Name, positioning, current role, e-mail, profiles, CV, `showPlaceholders` |
| `content/current-focus.ts` | “Now” — Researching · Building · Working on · Exploring · Collaborating |
| `content/navigation.ts` | Main and footer navigation, the four core areas |
| `content/taxonomy.ts` | Categories, statuses, types and themes (extensible) |
| `content/research.ts` | Research overview, open questions, research programmes (PhD) |
| `content/projects.ts` | Project archive (`/projects`, `/projects/[slug]`) |
| `content/ventures.ts` | Companies, products, initiatives (`/entrepreneurship`) |
| `content/publications.ts` | Publications (`/publications`) |
| `content/activity.ts` | Conferences, talks, mobility (`/activity`) |
| `content/about.ts` | Biography, background, roles, About portrait |

Rules:

- Only verified information. Empty fields are not rendered.
- Link entries with `related: ["projects/slug", "research/phd", …]` — links appear on both sides automatically.
- Tag entries with `themes: [...]` — they appear on `/themes/[id]`.
- Entries marked `placeholder: true` are scaffolding. Before launch, replace them and set `showPlaceholders: false` in `content/site.ts`.
- Images go in `public/photo/` (or `public/media/`) and are served through `next/image`.

## Structure

```
app/            routes (pages, sitemap, robots, icons, OG image)
components/     layout · editorial · home · projects · publications · research · timeline · media
content/        all site content (typed)
lib/            types, content access, formatting, SEO helpers
public/photo/   portraits used on the site
```

Design source of truth: `PENCHEFF_INFO_DESIGN_CONCEPT.md` (section 21, Cyan Editorial).
See `VERCEL_DEPLOYMENT.md` and `IMPLEMENTATION_REPORT.md`.
