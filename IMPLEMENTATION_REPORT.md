# PENCHEFF.INFO — Implementation report

Date: 16 September 2026 · Status: **built, verified locally, not deployed** (no DNS change, domain not connected).

Design source of truth: `PENCHEFF_INFO_DESIGN_CONCEPT.md` v0.3 — section 21 *Approved Visual System — Cyan Editorial* and the v0.2 *Editorial Professional Archive* architecture.

---

## 1. What was implemented

- A complete Next.js 16 (App Router, TypeScript) website with Tailwind CSS v4 and Motion, statically generated and Vercel-ready.
- The Cyan Editorial visual system: warm ivory, deep navy, cyan as a signature accent; Source Serif 4 / IBM Plex Sans / IBM Plex Mono; editorial grid, thin rules, `§` / `01` numbering, mono metadata, restrained geometry.
- A typed content layer that is separate from presentation, with relationships between entries and an extensible taxonomy.
- All routes requested in the brief, plus `/themes` (Technology & Digital Transformation as a cross-cutting system, per design v0.2) and `/timeline`.
- Real photographs from `photo/` (curated crops, see §6).
- SEO: metadata templates, canonical URLs, Open Graph/Twitter, generated OG image, sitemap, robots, icons, JSON-LD.
- Accessibility work, responsive layouts, reduced-motion support.
- No factual content was invented. Missing information is either left empty (and not rendered) or shown as clearly marked placeholders.

## 2. Routes

| Route | Page | Notes |
|---|---|---|
| `/` | Homepage | Hero → Core areas → Current focus → Selected work → Research (+ PhD preview) → Technology & Entrepreneurship → Publications & talks → Timeline → About & Contact |
| `/research` | All research | Current research · Research areas · Research questions · Research projects · Research outputs · Collaborations · Completed research |
| `/research/phd` | PhD research (digital monograph) | Generated from `/research/[programme]`; metadata header, BG title, sticky contents, sections 01–07, progress (stages), outputs, related projects, latest update, citation |
| `/projects` | Project archive | Groups: Current · In the pipeline · by year. Filters: status, category, theme, year. Index/Grid views. Filters are kept in the URL. |
| `/projects/[slug]` | Project page | 11 optional sections; only present fields render; numbering adapts |
| `/publications` | Academic catalogue | Grouped by year; type + status; authors (owner highlighted); DOI/URL/PDF only if present; expandable abstract |
| `/activity` | Chronological journal | Grouped by year; type, role, event, location; optional photo |
| `/entrepreneurship` | Ventures | Companies · Products · Initiatives · Experiments · Collaborations |
| `/entrepreneurship/[slug]` | Venture page | Optional sections, products, related work |
| `/about` | Short biography, current roles, academic and professional background, research interests, selected experience |
| `/contact` | E-mail and profiles (only when configured) |
| `/themes`, `/themes/[slug]` | Technology & Themes | Each theme collects research, projects, ventures, publications and activity automatically |
| `/timeline` | Professional timeline | All dated work in one chronological record |
| `/sitemap.xml`, `/robots.txt`, `/icon.svg`, `/apple-icon.png`, `/opengraph-image` | Generated |
| 404 | Custom not-found page |
| Redirects | `/ventures` → `/entrepreneurship`, `/phd` → `/research/phd` |

## 3. Content architecture

```
content/
  site.ts             name, positioning (draft), current role, e-mail, profiles, CV, showPlaceholders
  navigation.ts       main nav, footer nav, four core areas
  current-focus.ts    Researching · Building · Working on · Exploring · Collaborating
  taxonomy.ts         project categories & statuses, venture types & statuses,
                      publication types & statuses, activity types, themes
  research.ts         research overview, open questions, programmes (PhD)
  projects.ts         project archive
  ventures.ts         entrepreneurship
  publications.ts     publications (+ owner name variants)
  activity.ts         activity
  about.ts            biography, background, roles, About portrait
lib/
  types.ts            content model (BaseEntry + Project, Venture, Publication, ActivityEntry,
                      Role, ResearchProgramme, Milestone, Theme, …)
  content.ts          access, visibility, relationships (relatedTo / resolveRef), timeline
  format.ts           dates, periods, grouping (safe for client components)
  seo.ts              page metadata, Person / ScholarlyArticle / Event JSON-LD
```

Key properties:

- **Adding a project / publication / activity / venture** = one object in the relevant file. The list, detail page, sitemap, theme pages and timeline update on the next build.
- **Relationships:** `related: ["research/phd", "projects/slug", …]` works in both directions (a publication pointing to a project appears on the project page).
- **Taxonomy:** a new category, status, type or theme is one line in `taxonomy.ts`.
- **Research programmes:** the PhD is the first programme; future programmes use the same template at `/research/[slug]`. After the defence, change `status` to `completed` — it moves to *Completed research* and stays as an archive.
- **Stages** are status-based (`completed` · `in-progress` · `planned` · `unconfirmed`). No percentages.
- **Placeholders:** entries with `placeholder: true` render only while `site.showPlaceholders` is `true`, always with a visible *Placeholder* tag, and are excluded from the sitemap and set to `noindex`. With `showPlaceholders: false`, all empty sections degrade to neutral "will be added" states (verified).
- **Bilingual readiness:** the site is English-only (design decision v0.1). All text lives in `content/`, so a later `content/bg/` layer is possible without changing components. Bulgarian text is marked with `lang="bg"`; fonts include Cyrillic. No Bulgarian translations were invented.

## 4. Components

| Family | Components |
|---|---|
| `layout/` | `SiteHeader` (desktop nav + accessible mobile menu), `SiteFooter`, `Wordmark`, `JsonLd` |
| `editorial/` | `primitives` (Container, Eyebrow, DotLabel, SectionHeading, PageHeader, NumberedSection, CtaLink, MoreLink, MetaList, StatusMark, PlaceholderTag, InDevelopment, EmptyState, TagList, icons), `Sections` (EntrySections, RelatedList), `icons` (area icons), `CopyButton` |
| `home/` | `Hero`, `CoreAreas`, `CurrentFocus` (reusable) |
| `projects/` | `ProjectRow` (index row, compact row, card), `ProjectArchive` (filters, grouping, views) |
| `publications/` | `PublicationList`, `PublicationRow` |
| `research/` | `StageTimeline` (horizontal on desktop, vertical on mobile) |
| `timeline/` | `Timeline` (professional timeline), `ActivityList` (full + compact) |
| `media/` | `Portrait` (4:5 frame + geometry, `next/image`), `Reveal` (CSS scroll-driven reveal), `DrawLine` (Motion) |

Server Components by default. Client Components only where needed: `SiteHeader`, `ProjectArchive`, `CopyButton`, `DrawLine`.

## 5. Visual system as implemented

| Token | Value | Use |
|---|---|---|
| ivory | `#F8F7F2` | background |
| mist | `#EEF7F7` | secondary background, Current Focus, footer |
| pastel | `#DCEFF0` | geometry behind portraits |
| soft | `#B9E2E5` | cropped circle, timeline rules |
| navy | `#10283B` | text |
| slate | `#526674` | secondary text |
| cyan | `#13AFC4` | lines, dots, markers, active nav, wordmark "INFO" |
| cyan-deep | `#087F94` | arrows, icons, focus ring |
| link | `#0A6F81` | link and status **text** (5.4:1) — see §8 |
| line / line-mist | `#D6E1E1` / `#C9DCDD` | rules |
| card | `#FCFBF7` | cards, hover rows |

- Fonts are self-hosted from `@fontsource` packages (Latin, Latin-ext and Cyrillic subsets, only the weights in use: Serif variable; Sans 400/500 + italic 400; Mono 400/500). No request to Google at runtime or build time.
- CTAs are editorial (mono label + arrow + cyan underline). No pill buttons, no shadows, radius 0–2 px.
- Motion: CSS scroll-driven fade/rise (no JS, content visible where unsupported), a one-time line draw on the research stages (Motion), expanding link underlines, a 180 ms mobile-menu fade. All disabled with `prefers-reduced-motion`. No parallax, scroll-jacking or page transitions.

## 6. Photos used

The `photo/` folder contained 8 files. They were inspected individually. Originals were **not modified**; derived crops were saved to `public/photo/`.

| Source file in `photo/` | Content | Used? | Output | Where |
|---|---|---|---|---|
| `ChatGPT Image Sep 16, 2026, 12_44_42 PM.png` | 2×2 portrait collage | **Yes** — top-right panel, crop 562×702 | `public/photo/portrait-hero.jpg` | Person JSON-LD image (no longer in the hero) |
| `ChatGPT Image Sep 16, 2026, 12_45_20 PM.png` | 2×2 portrait collage | **Yes** — bottom-right panel (navy jacket, white shirt, light background), crop 557×696 | `public/photo/portrait-contact.jpg` | Contact page |
| `ChatGPT Image Sep 16, 2026, 12_49_09 PM.png` | Single black-and-white portrait, 1122×1402 | **Yes** — full image | `public/photo/portrait-about.jpg` | About page |
| `ChatGPT Image Sep 16, 2026, 01_07_35 PM.png` | Portrait collage (identical to `12_55_54 PM`) | **Yes (update)** — large panel (hand on chin), crop 670×867, background removed, colour and black-and-white cut-outs | `portrait-hero-color.png`, `portrait-hero-bw.png` (kept, **no longer used**) | Earlier hero versions — too close-up |
| `ChatGPT Image Sep 16, 2026, 12_55_54 PM.png` | Portrait collage | Not used — duplicate of `01_07_35 PM` | — | — |
| `ChatGPT Image Sep 16, 2026, 12_50_17 PM.png` | Outfit variations with text labels | No — contains overlaid text | — | — |
| `ChatGPT Image Sep 16, 2026, 12_51_30 PM.png` | Website mock-up (reference) | **No — shows a different person** | — | — |
| `ChatGPT Image Sep 16, 2026, 12_56_42 PM.png` | Poster with the colour portrait (navy jacket, white shirt) | **Yes (update)** — person only: crop (150,190)–(1122,1370), cyan circle line removed by inpainting, background, books and laptop removed, bottom faded | `public/photo/portrait-hero-half.png` | Homepage hero (current) |
| `ChatGPT Image Sep 16, 2026, 02_09_16 PM.png` | Hero reference (update) | **Yes** — farmland landscape cropped from the right side (486×605); overlaid text, lines and circle removed by inpainting | `public/photo/hero-landscape.jpg` | Homepage hero background (right side; behind the portrait on mobile) |

Photo QA:

- Three different portraits across three pages; no portrait is repeated.
- Faces are not cropped aggressively; 4:5 frames with `object-position` near the top.
- Hero portrait: 380×475 on 1440 px (≈ 26 % of the composition), 336 px at 1024 px, 280 px at 768 px, ≈ 65 % of the width on a 390 px phone. Portrait appears after the name and positioning on mobile.
- Delivered through `next/image` (AVIF/WebP, responsive `sizes`, fixed aspect ratio → no layout shift; hero has `priority`).
- **Note:** the file names indicate these images were generated with ChatGPT. Please confirm they are an accurate likeness you are happy to publish. The source panels are 557–562 px wide, so the hero is slightly upscaled on high-density (2×) screens; a higher-resolution original would look sharper.
- No agricultural landscape was used in the hero. No stock or generated substitute images were added.

## 7. Responsive behaviour (verified in a real browser)

Checked with Chromium at **390, 768, 1024, 1440 and 1600 px**: no horizontal scrolling on any page.

| Element | Mobile | Tablet | Desktop |
|---|---|---|---|
| Navigation | Wordmark + MENU → full-screen numbered menu | same as mobile (<1024 px) | inline nav with cyan line-dot-line active marker |
| Hero | name → positioning → portrait → intro → CTAs → Currently | text + portrait (2 columns) | text · portrait · editorial column (3 columns) |
| Core areas | stacked rows | 2×2 grid | 4 columns with vertical rules |
| Project archive | two-line rows (title; status · period · category · role), filters 2×2 | 5-column index | 5-column index |
| Publications | year above group | year column | year column |
| Research stages | vertical list | vertical list | horizontal line with markers |
| Timeline | vertical | year column + vertical rule | same |

## 8. Accessibility

- Semantic landmarks (`header`, `nav` with labels, `main`, `footer`, `aside`), one `h1` per page, ordered headings, `aria-labelledby` on sections.
- Skip link; visible focus ring (`2px #087F94`, offset 3 px) on all interactive elements.
- Mobile menu: `aria-expanded`/`aria-controls`, dialog with `aria-modal`, focus moved into the menu, focus trap, Escape closes and returns focus, body scroll lock, closes on navigation (all tested).
- Touch targets ≥ 44 px for menu, CTAs, filters, links in lists.
- Status is never conveyed by colour alone (text label + marker shape).
- Alt text on every photo; decorative geometry and icons are `aria-hidden`.
- `prefers-reduced-motion` respected.
- **Automated check (axe-core, WCAG 2.2 AA + best practices) on all 15 routes: no violations except one** — the cyan "INFO" in the wordmark (`#13AFC4`, 2.5:1). This is intentional: it is the approved logotype, and logotypes are exempt from WCAG text-contrast requirements. All other cyan *text* uses `#0A6F81` (5.4:1) instead of the approved `#087F94` (4.4:1, just below AA for body-size text). `#087F94` is still used for arrows, icons, the focus ring and large elements.
- Archived status uses secondary text colour with a strike-through instead of the low-contrast `#8A9AA4`.

## 9. SEO

- `metadataBase` = `https://pencheff.info` (override via `NEXT_PUBLIC_SITE_URL`), title template `%s — Kostadin Penchev`, per-page descriptions and canonical URLs.
- Open Graph + Twitter card on every page; generated 1200×630 OG image.
- `sitemap.xml` (static routes, programmes, non-placeholder projects and ventures, themes); `robots.txt` blocks indexing on Vercel preview deployments.
- JSON-LD: `Person` (name, URL, image, job title, affiliation Trakia University; `sameAs` only from configured profiles), `ScholarlyArticle` only for real published items, `Event` only for real dated activity. Placeholders never enter structured data.
- Placeholder detail pages are `noindex`.

## 10. Remaining placeholders

Visible while `showPlaceholders: true` (a preview banner is shown at the top of every page):

- Hero positioning and short introduction (`content/site.ts`) — **draft wording**.
- Research intro (`content/research.ts`) — draft; research questions Q1–Q3.
- PhD: sections 01–07 show "In development"; supervisor, start date, expected completion; stage statuses ("to be confirmed").
- Current focus: Building, Working on, Exploring, Collaborating.
- Projects: 4 layout placeholders (active, in development, proposal, completed).
- Entrepreneurship: 2 companies + 1 experiment.
- Publications: 2; Activity: 2.
- About: second biography paragraph, academic degree(s), professional background, a second current role.

## 11. Content needed from you

1. Confirm or rewrite the hero positioning and the short introduction.
2. Official English name of the department (the site uses "Industrial Business and Entrepreneurship"; earlier notes mention "…in the Agricultural Sector").
3. PhD: supervisor, start date, expected completion, status of each stage, and any text for sections 01–07 you want public.
4. Projects (past and current): title, period, your role, status, category — plus details for the important ones.
5. Companies / products / initiatives: names, your role, period, status, website.
6. Publications: full references (only verified DOI/URL/PDF).
7. Conferences, presentations, mobility: title, event, date, place, role.
8. Public e-mail address and profile URLs (ORCID, Google Scholar, ResearchGate, LinkedIn, GitHub).
9. Academic and professional background for About; CV PDF if you want it linked.
10. Confirmation that the three portraits may be published (and higher-resolution originals, if available).
11. Short definitions for the research themes (optional).

When the content is in place: set `showPlaceholders: false` in `content/site.ts`.

## 12. Known limitations

- Homepage section order follows the approved prototype (core areas directly after the hero, then Current Focus), which differs slightly from the order suggested in the implementation brief.
- The OG image uses the default sans-serif of `next/og` (the self-hosted serif is WOFF2-only, which the OG renderer does not accept).
- Portrait source resolution is modest (see §6).
- Research notes are modelled (`notes` in a programme; used for *Latest update*) but there is no separate `/research/notes` page yet — add it once notes exist.
- No CMS, no contact form (by design for V1). Content is edited in `content/*.ts`.
- Dark mode is not implemented (not in the approved scope).
- The site was verified with Chromium only (plus automated accessibility checks); manual checks in Safari/Firefox are recommended before launch.

## 13. Build result

```
npm run lint      ✔ no errors, no warnings
npx tsc --noEmit  ✔
npm run build     ✔ Next.js 16.3.5 (Turbopack) — compiled successfully,
                    35/35 static pages generated
npm run start     ✔ all 14 routes return 200, unknown route returns 404,
                    no console errors, image optimisation serves AVIF
```

Also verified with `showPlaceholders: false`: build succeeds (28 pages) and all empty sections degrade gracefully.

## 14. Update — hero revision (16 Sep 2026)

- The hero follows the new reference: large black-and-white cut-out portrait that fades into the background, pale cyan diagonal field and vertical bar, italic quote and tag lists on the right (desktop ≥1280 px), cropped circle.
- Hero copy, quote and tag lists are taken from the reference as **draft** (`content/site.ts → eyebrow, positioning, introduction, hero`).
- New "Latest update" strip under the core areas (`content/current-focus.ts → latest`), with the motto Knowledge → Innovation → Impact.
- Core-area icons now sit in pale cyan circles; primary CTA text is cyan.
- Layout matches the reference 1:1 on desktop: text left, black-and-white portrait centre, colour farmland landscape right with the quote, tag lists and a thin white circle over it. On mobile/tablet the portrait sits in front of the landscape below the text.
- The landscape comes from the (AI-generated) reference image and is low-resolution (486×605). A real, larger photo of farmland would improve sharpness — replace `public/photo/hero-landscape.jpg`.
- Not taken from the reference: the EN/BG switch (the site is English-only) and the search icon (no search yet).
- Portrait processing: background removed with an open-source segmentation model (rembg / u2net_human_seg), grayscale, slight contrast boost. The original file is unchanged.
- Follow-up: the hero portrait is now in **colour** (same real photo, `portrait-hero-color.png`), kept as a large close-up as in the reference — head near the top of the hero, shoulders and hand cropped by the bottom edge. The side fades were reduced so the jacket and elbow stay solid. Alt/screen-reader text updated. Original photo files unchanged.
- Follow-up 2: the close-up was too tight. The hero now uses the colour photo with the navy jacket and white shirt (`12_56_42 PM`) in its natural half-length framing — smaller head, shoulders, hand and shirt visible, no extra zoom. Desktop portrait 34rem tall (37.5rem at ≥1440 px), bottom-anchored, soft bottom fade.

## 15. Update — Activity content and text review (16 Sep 2026)

**Activity (source: project doc `claude/ACTIVITY_SOURCE.md`)**
- 12 real entries replace the placeholders; the Erasmus placeholder was removed. Missing data is left out, never guessed; entries without a verified date are grouped under "Undated".
- The activity model now has: `typeDetail`, `level` (featured / standard / archive), `roles[]` (participant, presenter, co-author, university representative, organisation / academic support), `organiser`, `description`, `presentationTitle`, `coAuthors`, `links`, `documents`, `media`.
- On `/activity`: filters (All · Conferences · Presentations · Doctoral school · Training · Academic activity · Professional events), with a shareable `?type=` URL. Entries are grouped by year. The featured entry (Bucharest 2026) is shown as a highlighted panel with the paper title, authors and organiser. Archive entries use a smaller style.
- Homepage: up to 3 selected entries (featured first; archive and undated entries are never shown) and a "View all activity" link. Timeline: dated, non-archive entries only, shown with their date range and roles.
- Publications: "Critical Analysis of the Effectiveness of European Digital Innovation Hubs (EDIHs) in the Agri-Food Sector" (K. Penchev, K. Stoyanov) has the new status **Presented**. It has no proceedings, DOI or pages, and is cross-linked to the conference and PhD Research.
- Still to verify: dates, locations and organisers of the undated entries; the paper title for "30 Years of Trakia University"; the organisers of the doctoral schools and training; the institution for the Macroeconomics examination.

**Text corrections**
- Hero introduction: "agricultural development" → "agricultural entrepreneurship" (text only).
- "PhD Researcher" → "PhD Candidate" (site, About, roles).
- References to EU projects / programmes were removed (none confirmed).
- One name for /themes: "Technology & AI" (core-area card, footer, page title).
- "Building and technology" → "Ventures and technology"; "Read the research" → "PhD research overview"; "Object & Subject" → "Object and scope".
- Sentence case for the PhD section titles and stage names. Unconfirmed stages now read "To be confirmed", which removes the repeated "Status" for screen readers.
- Citation: "Penchev, K. (in progress). *Title* [Doctoral dissertation]. Trakia University."
- Latest-update strip: the Bucharest paper (June 2026).
- Footer: while no profiles are listed, the column shows "Contact / Get in touch →".

**Contact**
- The portrait was removed. The page now uses the farmland landscape image, decorative (`alt=""`), in the same 4:5 frame.
- Public e-mail: kostadin.penchev@trakia-uni.bg (Contact page with a copy button, footer, homepage, Person JSON-LD).

**Still open (content owner):** exact department name, official Bulgarian dissertation title, the "speaking" wording on Contact, the hero quote (own motto or unquoted), the research-interest list.

## 16. Update — owner decisions (16 Sep 2026)

- **Activity**: the filters were removed. The page now has editorial sections in this order: Conferences & scientific forums · Academic mobility · Doctoral school & research training · University & professional activity. Within a section: newest first, undated entries after.
- The "30 Years of Trakia University" conference is dated May 2025 and sits with the Bucharest conference.
- No examinations are listed; the Macroeconomics entry was removed.
- An upcoming Erasmus mobility entry was added (details to be added).
- All entries are shown, including those without dates.
- **Publications** (source: ResearchGate profile, 16 Sep 2026): the placeholders were replaced with two published journal articles, each linked to its ResearchGate page:
  1. "Critical Analysis of the Effectiveness of European Digital Innovation Hubs (EDIHs) in the Agri-Food Sector". K. Penchev, K. Stoyanov. *Scientific Papers Series Management, Economic Engineering in Agriculture and Rural Development*, August 2026.
  2. "Digital Transformation in Agricultural Entrepreneurship in Bulgaria: A Literature Review and Directions for Future Research". K. Penchev. *Trakia Journal of Sciences*, October 2025.
  - Volume, issue, pages, DOI and abstracts are not added: the article pages returned HTTP 429 and could not be verified.
- The ResearchGate profile was added to Profiles (footer, Contact).
- **PhD**: Supervisor: Assoc. Prof. Konstantin Stoyanov. The "Cite this research" block and the homepage "PhD research overview" CTA were removed.
- **Texts**:
  - The EU wording on Projects was restored.
  - "speaking" was removed from Contact and the homepage.
  - The hero quote has no quotation marks.
  - One name, "Technology & AI", is used for /themes (page, breadcrumb, footer, Current focus link). The theme group is now "Technology".
  - Latest update: "Presented a paper at Agriculture for Life – Life for Agriculture, Bucharest (June 2026)."
  - Department: "Department of Industrial Business and Entrepreneurship". Role: PhD Candidate.


## 17. Restore — local changes overwritten (16 Sep 2026)

In parallel, the local copy had changed (new hero photo, About content, site settings). The previous delivery overwrote some of those files. They were restored from the local production build (`.next`, built before the overwrite):
- Hero: `portrait-hero-natural-retouched.png` with its layout (no white circle, right-edge fade only, saturate 0.85 / contrast 0.96). The quote has no quotation marks (owner's request).
- About: biography, academic background, professional background, selected experience, roles. The current role is shown as "PhD Candidate".
- Research: intro text, PhD start March 2025. Site: `showPlaceholders: false`, location Stara Zagora, LinkedIn profile.
- Homepage order: Research → Publications & talks → Ventures and technology → Timeline.
- Deliveries now check each file's modification time on the device first, so newer local edits are not overwritten.

## 18. Update — Research areas content and About colour/text (16 Sep 2026)

**Research (`/research` §02 "Research areas")**
- Replaced the taxonomy-driven list (`themes.filter(t => t.researchArea)`, with per-theme entry counts) with a fixed editorial list of 6 areas, framed around economics as the primary field (`content/research.ts → researchAreas`):
  1. Digital Economy & Transformation — economic effects of digitalisation and business transformation.
  2. Agricultural Economics & Entrepreneurship — economic decision-making, entrepreneurship and competitiveness in agriculture.
  3. Economics of Technology Adoption — investment decisions, costs, returns and economic value of technology adoption.
  4. Innovation & Investment — innovation, investment, financing and enterprise development.
  5. Regional & EU Economic Development — regional transformation, European programmes and development policy.
  6. Digital Agriculture & AI — economic applications and implications of digital and AI technologies in agriculture.
- The "N entries" counters were removed from this section.
- The visual layout (two-column list, numbering, borders, type sizes) is unchanged — content and data source only.
- `content/taxonomy.ts`'s `themes` array (and the `researchArea` flags on Artificial Intelligence, AgriTech, Technology Adoption, EU Digital Policy, etc.) was left untouched: those still work as tags for Publications/Projects/Activity and still feed the About "Research interests" list and the homepage theme previews.

**About — paragraph colour fix**
- Fixed `app/about/page.tsx`: the biography paragraphs used `i > 0 ? "text-slate" : ""` as a fallback, which greyed out every paragraph after the first regardless of placeholder status. Now only paragraphs at or past `biographyPlaceholderFrom` get `text-slate`; all real paragraphs share the same dark colour as paragraph 1. No heading, font or layout change.

**About — biography expanded**
- `content/about.ts → biography` expanded from 3 to 9 paragraphs with the owner-supplied text (verbatim, no added facts): base in Stara Zagora; career start in financial risk analysis at Zagora Finacorp; ~9 years in education administration; Stara Zagora Regional Economic Development Agency (2019 – Jul 2024); European projects (Interreg Europe, Horizon Europe, LIFE, Erasmus+) covering regional development, innovation, SME competitiveness, coal-region transition, sustainability, skills development, digitalisation; current academic focus on the economics of digital transformation; doctoral research description; entrepreneurial/deep-tech/AI activity; the 2026 Horizon Europe Seal of Excellence for the PDGA deep-tech AI proposal (submitted by CREATIVE DESTRUCTION under WIDERA / EIC Pre-Accelerator); closing paragraph on the unifying theme of the work.
- `biographyPlaceholderFrom` updated from 3 to 9 (no placeholder paragraphs remain).

**Verification**
- `tsc --noEmit`, `eslint`, `next build` (28/28 static pages) and `next start` all passed with no errors.
- Screenshots of `/about` and `/research` confirm: uniform dark paragraph colour throughout the About biography, correct new text, and the Research areas section showing the 6 new entries with no count badges, same layout as before.
- Both files committed to the device with the mtime-guard workflow (stage → diff-check → commit with `expectedMtimeMs` → re-stage → byte-compare); no drift was found, and all four files (`app/about/page.tsx`, `content/about.ts`, `app/research/page.tsx`, `content/research.ts`) verified byte-identical on the device after commit.

## 19. Update — Projects section populated (16 Sep 2026)

**Source:** `claude/PENCHEFF_INFO_PROJECTS.md` (project content database supplied by the owner).

- Replaced the 4 demonstration placeholders in `content/projects.ts` with 10 real entries: 9 European-programme projects (DeCarb, GPP4Growth, INNOGROW, PLASTECO, SMEOrigin, Act45 — Interreg Europe/Erasmus+, all as "Financial Manager of Consortium/Company" during the 2019–Jul 2024 REDA period; COALition, DUST — Horizon Europe, grant IDs 101087022/101094869; SITRANS — LIFE, Nov 2022–Apr 2025) and PDGA (Horizon Europe WIDERA/EIC Pre-Accelerator; deep-tech AI proposal by CREATIVE DESTRUCTION; Seal of Excellence 2026, score 13.50/15 — worded exactly as the source requires: EIC Pre-Accelerator, never "EIC Accelerator"; Seal of Excellence never implied as funding).
- **Not published:** ReSSKILL is included in the file with `published: false` and a comment explaining the unresolved discrepancy (CV: Erasmus/REDA; external source: LIFE/CINEA starting Dec 2024, after the REDA role ended). It will not render until the owner confirms the project, programme, role and organisation, per the source doc's explicit instruction.
- Featured (per the source's "Selected/Featured Project Candidates"): COALition, DUST, SMEOrigin, INNOGROW, PDGA.
- Personal roles kept exactly as the CV states them ("Financial Manager of Consortium" / "Financial Manager of Company"); no role was upgraded to coordinator/manager/researcher. Dates, partners, budgets and results not present in the source were left out rather than invented; where CORDIS/official sources gave a period (COALition, DUST, SITRANS, PDGA) it was used with a verification note in "My role" for the two whose current status the source flagged as unconfirmed (COALition, DUST).
- Added 4 new cross-cutting theme tags to `content/taxonomy.ts` (`regional-development`, `just-transition`, `sustainability`, `skills-development`) to tag these projects accurately — none are marked `researchArea`, so the Research page's §02 "Research areas" (section 18 above) is unaffected.
- `/projects`: added a **Programme** filter (Interreg Europe / Horizon Europe / Erasmus+ / LIFE / Horizon Europe — WIDERA…) alongside the existing Status/Category/Theme/Year filters, matching the source's suggested filter set. The grid-view card now shows the programme (falling back to category when absent), closer to the source's suggested card template.
- Project detail pages (`/projects/[slug]`) already supported Programme, Grant, Organisation, Partners, Location, My role, Results and External links without any template change — only content was added.
- Verification: `tsc --noEmit`, `eslint`, `next build` (42/42 static pages, up from 28 — 10 new project detail pages) and `next start` all passed with no errors. Screenshots of `/projects` (index and grid view), `/projects/pdga`, `/projects/coalition` and the homepage confirm correct rendering, correct filtering options and no unintended change elsewhere.
- All five changed files (`content/projects.ts`, `content/taxonomy.ts`, `app/projects/page.tsx`, `components/projects/ProjectArchive.tsx`, `components/projects/ProjectRow.tsx`) committed to the device with the mtime-guard workflow; no drift found, all verified byte-identical after commit.
- **Still to verify** (per the source's "Next verification pass"): exact official titles/periods for DeCarb, GPP4Growth, INNOGROW, PLASTECO, SMEOrigin, Act45; current status of COALition and DUST; and the ReSSKILL discrepancy above.

## 21. Update — Homepage restructuring (16 Sep 2026, homepage only)

- **Core areas** (`content/navigation.ts → coreAreas`, `components/editorial/icons.tsx`): now 01 Research, 02 Publications, 03 Projects, 04 Entrepreneurship, each with the owner's new one-line description. "Technology & AI" was removed as a top-level area; a new `publications` icon was added (the `technology` icon stays defined but unused, harmless). Technology/AI/digital-transformation content still lives inside Research, Projects and Entrepreneurship — nothing about them was deleted, only their standalone homepage card.
- **Selected work removed**: the homepage "Projects — Selected work" table (`ProjectIndexHeader`/`ProjectRow` of featured projects) was removed entirely from `app/page.tsx`, since Projects now has its own core area and its own page. No underlying project data was touched.
- **Research section** (homepage only — `content/research.ts`'s `researchOverview.intro` used by `/research` was left untouched): the left column now shows the owner's two new paragraphs (economic-dimensions framing + "Since March 2025…") and a "Research Focus" list of the same 6 economics-focused areas as `/research` (`content/research.ts → researchAreas`), replacing the old `themes.filter(researchArea)` list (Digital Transformation, Artificial Intelligence, AgriTech, Innovation, etc.).
- **PhD progress** (`content/research.ts → phd.milestones`, shared data also used on `/research` and `/research/phd`): statuses updated from all-`unconfirmed` to Literature review = completed, Theoretical framework = completed, Research design = in-progress, Empirical study/Analysis/Results/Dissertation = planned. `components/research/StageTimeline.tsx`: the "planned" label now reads "Upcoming" instead of "Planned". Since no milestone is `unconfirmed` any more, "TO BE CONFIRMED" and the "Stage statuses will be published once confirmed." fallback note no longer render anywhere this data is used — this is a genuine progress update, not a homepage-only cosmetic change, since the milestones are the one shared source of truth for the PhD's stage.
- **Timeline section removed** from the homepage (`app/page.tsx`) — the "Work across time" section and its `Timeline`/`getTimeline` usage. The `/timeline` page and its underlying activity/project date data are untouched.
- Nothing else on the homepage changed: colours, typography, spacing, the Hero, Current focus, Publications & talks, Ventures and technology, and About & contact sections are all as before.
- **Files changed:** `app/page.tsx`, `content/navigation.ts`, `content/research.ts`, `components/editorial/icons.tsx`, `components/research/StageTimeline.tsx`.
- Verification: `tsc --noEmit`, `eslint`, `next build` (46/46 pages) and `next start` passed with no errors. Screenshots at 1440px and 390px confirm correct rendering — note: this session's QA screenshot script (`shot.mjs`) was updated to call `page.emulateMedia({ reducedMotion: 'reduce' })`, because the site's scroll-driven `.reveal` fade-in (`animation-timeline: view()`, `app/globals.css`) was rendering below-the-fold Reveal-wrapped content invisible in a resettled full-page screenshot — a testing artifact only (real visitors scrolling the page trigger it normally), not a site bug; the CSS's own documented reduced-motion fallback is what's now used for QA captures.
- Both files committed to the device with the mtime-guard workflow; no drift found, all five verified byte-identical after commit.

## 20. Correction — RES-SKILL vs ReSSKILL, and eUnited added (16 Sep 2026)

- The owner flagged that the previous unpublished entry (section 19) conflated two different projects. Removed it entirely and replaced it with the correct one:
  - **RES-SKILL** (Erasmus+, `content/projects.ts` slug `res-skill`) — reskilling coal-industry workers for the renewable energy sector, run through the Stara Zagora Regional Economic Development Agency (2019–2024), role "Financial Manager". Source: `https://former.szeda.eu/bg/res-skill.html`.
  - This is **not** the same as "ReSSKILL — Renewable Energy System Integration and Digitalization Upskilling Initiative for Sustainable Buildings", a separate LIFE/CINEA project (2024–2027) that is still correctly excluded from the site. A code comment in `content/projects.ts` now spells out the distinction so it isn't reintroduced by mistake.
- Added a new project: **eUnited — Citizens' Forums for United Europe** (`slug: eunited`), Europe for Citizens programme, Strand 2 (Democratic engagement and civic participation), role "Financial Manager" at the Stara Zagora Regional Economic Development Agency. Source: `https://former.szeda.eu/en/europe-for-citizens-en.html`.
- Added 2 new theme tags to `content/taxonomy.ts` for eUnited: `civic-participation` (Civic Participation & Democracy) and `social-inclusion` (Social Inclusion); reused the existing `sustainability` tag for its climate/environment dimension.
- The Programme filter on `/projects` is data-driven, so **Europe for Citizens** now appears automatically alongside Interreg Europe / Horizon Europe / Erasmus+ / LIFE — no code change was needed there.
- Project archive is now **12 projects**: DeCarb, GPP4Growth, INNOGROW, PLASTECO, SMEOrigin, Act45, RES-SKILL, eUnited, COALition, DUST, SITRANS, PDGA.
- Verification: `tsc --noEmit`, `eslint`, `next build` (46/46 static pages, up from 42) and `next start` all passed with no errors. Screenshots of `/projects` (12 projects listed, correct grouping) and the new `/projects/res-skill` and `/projects/eunited` detail pages confirm correct rendering.
- `content/projects.ts` and `content/taxonomy.ts` committed to the device with the mtime-guard workflow; no drift found, both verified byte-identical after commit.

## 22. Update — Projects page rework: programme-based archive, no status framing (16 Sep 2026)

- **Why:** the owner does not currently work on several projects that remain administratively "Active" (e.g. COALition). Showing project-level status (Active/Completed/Proposal) or grouping by it wrongly implied his *current* personal involvement. The page now answers "what has he worked on, under which programme, in what role and theme" — not "what is active right now".
- **Grouping changed from status/year to funding programme**, in a fixed order: Horizon Europe → Interreg Europe → Erasmus+ → LIFE → Europe for Citizens. New `programmeGroup()` helper in `lib/format.ts` normalises any "Horizon Europe …" variant (e.g. PDGA's "Horizon Europe — WIDERA / EIC Pre-Accelerator") into the "Horizon Europe" group; `groupProjects()` was rewritten to group by it instead of by status. `projectStatus()` and `projectCategoryLabel()` were left untouched and still export correctly — they remain in use by `/timeline` (`getTimeline()`) and by the breadcrumb category label on project detail pages.
- **Status removed from the page and its rows**: the CURRENT / IN THE PIPELINE / UNDATED / COMPLETED group labels, the ACTIVE/COMPLETED/PROPOSAL badges, and the STATUS filter are all gone from `/projects` and from `/projects/[slug]`. The underlying `status` field on every project entry (`content/projects.ts`) and the `ProjectStatus` type were **not deleted** — `lib/types.ts` now documents why (`status` is the project's own administrative status, kept for `/timeline`, intentionally not surfaced here).
- **New "Focus" column** replaces "Status" (table header now Period · Project · Programme · Role · Focus). Added a `focus?: string` field to `Project` (`lib/types.ts`) and populated it on all 12 entries with the owner's exact wording (Just Transition, Just Transition / Citizen Participation, Deep-tech AI, Energy Transition, Green Public Procurement, Rural SMEs & Innovation, Circular Economy, SMEs & Geographical Indications, Skills Development, Reskilling & Renewable Energy, European Citizenship & Civic Participation) — no new facts invented.
- **PDGA** now reads as ordinary Horizon Europe project experience: no "in the pipeline"/"proposal" framing anywhere. Added `achievement?: string` to the `Project` type, set to `"Horizon Europe Seal of Excellence 2026"` only on PDGA, shown as a "Achievement" line on its detail page (via `MetaList`, which auto-hides on every other project since the field is empty there) — worded as an achievement, never as funding received.
- **Period**: falls back to "—" instead of a missing/"UNDATED" grouping when a project has no recorded dates (`ProjectRow`/`ProjectCard`: `formatPeriod(project.period) || "—"`). No start/end year was invented for any project.
- **Filters simplified**: removed Status and Category; kept Programme (now the grouped values above), Theme and Year; added a new Role filter (data-driven from the distinct `roles` already on each project — no new taxonomy needed). INDEX/GRID toggle unchanged.
- **Role wording preserved exactly** as recorded per project (e.g. "Financial Manager of Consortium" vs "Financial Manager of Company" vs plain "Financial Manager") — nothing was unified to a single generic label.
- **Files changed:** `lib/types.ts`, `content/projects.ts`, `lib/format.ts`, `app/projects/page.tsx`, `components/projects/ProjectArchive.tsx`, `components/projects/ProjectRow.tsx` (non-compact row/card only — the `compact` variant used by `/themes/[slug]` was left untouched), `app/projects/[slug]/page.tsx`.
- Verification: `tsc --noEmit`, `eslint`, `next build` (46/46 pages) and `next start` all passed with no errors. Screenshots of `/projects` (index, grid) and `/projects/pdga`, `/projects/coalition` at 1440px and 390px confirm: correct programme grouping and order, no status badges anywhere, Focus column/labels correct, PDGA shows Achievement without implying funding, no horizontal overflow.
- All 9 changed files committed to the device with the mtime-guard workflow; no drift found, all verified byte-identical after commit.

## 23. Update — Homepage About/Contact copy, PhD academic detail, Current focus removed (16 Sep 2026, homepage + /research)

- **About & Contact section (homepage only):** replaced the closing tagline "Research, projects and ventures — one body of work." with the owner's preferred copy — heading "Economist, researcher and project professional." plus a new lead paragraph, keeping the existing "About Kostadin" CTA. The Contact column now leads with "Get in touch" above the e-mail address; the LinkedIn/ResearchGate links (data-driven from `content/site.ts`) are unchanged.
- **PhD academic detail added** in two places, using data (`department`, `supervisor`) that already existed on `content/research.ts`'s `phd` entry but was not yet rendered: under "Trakia University · Faculty of Economics" now also shows "Department of Industrial Business and Entrepreneurship" and "Scientific Supervisor · Assoc. Prof. Konstantin Stoyanov", as three compact lines (not a separate section) — on the `/research` page's "Current research" card (`app/research/page.tsx`) and on the homepage PhD preview card (`app/page.tsx`). The dissertation title and the progress/milestone timeline were left exactly as they were.
- **"Current focus" section removed from the homepage** (`app/page.tsx`): the "NOW / Current focus / …" block between the Latest-update strip and the Research section is gone, since its content duplicated the Research/PhD section further down the page. The `CurrentFocus` component (`components/home/CurrentFocus.tsx`) and its data (`content/current-focus.ts`) were **not deleted** — only the homepage's render call was removed — so nothing is lost if it's needed elsewhere later. Removing the wrapper's `mt-20 md:mt-28` spacer let the Research section's own top padding (`pt-20 md:pt-28`, the same rhythm used between every other homepage section) take over, so the transition from the update strip straight into Research reads cleanly with no gap or collision.
- **Files changed:** `app/page.tsx`, `app/research/page.tsx`.
- Verification: `tsc --noEmit`, `eslint`, `next build` (46/46 pages) and `next start` passed with no errors. Screenshots at 1440px and 390px confirm the new About/Contact copy, the three-line PhD academic detail on both pages, and a clean transition where Current focus used to sit.
- Both files committed to the device with the mtime-guard workflow; no drift found, verified byte-identical after commit.

## 24. Update — Entrepreneurship page rewritten around Creative Destruction (16 Sep 2026, /entrepreneurship only)

- **Why:** the previous `/entrepreneurship` page rendered `content/ventures.ts`, which holds only development placeholders ("[Company name]"). The owner asked for the real page to introduce Creative Destruction — the company he co-founded with Ivan Zdravkov — as part of his professional profile, explicitly **without** describing the company's specific projects, proposals, products or current work (so PDGA, any AI product, proposals, clients and partners are not mentioned here), and without turning it into a corporate sales page.
- `app/entrepreneurship/page.tsx` was rewritten as a self-contained editorial page (no longer driven by `content/ventures.ts`, which is untouched and unused by this page now): "About the company" with the owner's four paragraphs verbatim, and a "Founders" section with two entries — Kostadin Penchev (Co-founder; "Economics · Research · European Projects · Digital Transformation") and Ivan Zdravkov (Co-founder; an external link to `https://zdravkov.info/`). A closing line points to `/about` and `/projects` for the research/European-projects side of the record.
- Visual style reuses the site's existing `PageHeader`/`NumberedSection` primitives (the same pattern as `/about`) — no new components, no new colours or spacing scale.
- `content/ventures.ts`, the `/entrepreneurship/[slug]` detail-page route and the homepage's "Ventures and technology" section were **not touched** — they still show the same placeholder venture entries as before; this change is scoped to the `/entrepreneurship` index page only, as requested.
- **File changed:** `app/entrepreneurship/page.tsx`.
- Verification: `tsc --noEmit`, `eslint`, `next build` (46/46 pages) and `next start` passed with no errors. Screenshots at 1440px and 390px confirm the new content renders correctly, the zdravkov.info link is external and clickable, and nothing about PDGA, products, proposals, clients or partners appears anywhere on the page.
- File committed to the device with the mtime-guard workflow; no drift found, verified byte-identical after commit.

## 25. Update — Contact page redesigned as minimal typographic layout (16 Sep 2026, /contact only)

- **Why:** the owner disliked the page's decorative landscape photo (reused from the homepage hero) and wanted a cleaner, more minimal, academic-style contact page instead of anything reading as a corporate contact page.
- `app/contact/page.tsx`: removed the landscape `Portrait` image entirely (not replaced with any other photo). Heading changed from "Get in touch" to "Let's connect."; intro copy changed to "For research collaboration, European projects, academic exchange and professional enquiries." The E-mail (with the existing Copy button), Profiles (ResearchGate/LinkedIn, still sourced from `content/site.ts`, still with the external-link arrow) and Based-in rows are unchanged in function, just given more vertical whitespace. The right column is intentionally left empty other than one very quiet 1px cyan vertical line for visual balance on desktop (hidden on mobile) — no stock photography, no contact form, no colour cards, no gradients, no decorative or social icons were added.
- **File changed:** `app/contact/page.tsx`.
- Verification: `tsc --noEmit`, `eslint`, `next build` (46/46 pages) and `next start` passed with no errors. Screenshots at 1440px and 390px confirm the photo is gone, the new copy is in place, Copy and the two external profile links still work, and the page reads as a quiet academic/professional contact page rather than a corporate one.
- File committed to the device with the mtime-guard workflow; no drift found, verified byte-identical after commit.

## 26. Update — Homepage "Ventures and technology" section now shows Creative Destruction (16 Sep 2026, homepage only)

- **Why:** the section previously rendered `content/ventures.ts` (placeholder-only), so it showed the dev placeholder line "Companies, products and initiatives will be listed here." — an empty, unfinished-looking section on an otherwise real page.
- `app/page.tsx`: the section eyebrow/title changed from "Technology & Entrepreneurship" / "Ventures and technology" to eyebrow "Entrepreneurship" / title "Creative Destruction" (using `SectionHeading`'s `intro` prop for "Co-founded with Ivan Zdravkov." — the same pattern already used elsewhere on the site). The "Ventures" sub-label and the placeholder-driven ventures list were removed; the left column now carries the owner's two paragraphs about Creative Destruction, and a "Learn more →" link to `/entrepreneurship`. As instructed, no specific Creative Destruction project, proposal or product is named here (no PDGA, no AI products).
- The right-hand "Technology themes" column was left exactly as it was — not part of this request.
- `getVentures`/`ventureTypeLabel`/`formatPeriod`/`ventureStatus`/`PlaceholderTag` are no longer imported in `app/page.tsx` (they were only used by the removed ventures list); `content/ventures.ts` itself is untouched and still feeds `/entrepreneurship/[slug]`'s placeholder detail pages.
- **File changed:** `app/page.tsx`.
- Verification: `tsc --noEmit`, `eslint`, `next build` (46/46 pages) and `next start` passed with no errors. Screenshots at 1440px and 390px confirm "Creative Destruction" now reads as the section's clear focal point, the placeholder line is gone, and "Learn more" links to `/entrepreneurship`.
- File committed to the device with the mtime-guard workflow; no drift found, verified byte-identical after commit.

## 27. Update — company name changed to "CREATIVE DESTRUCTION VCC" everywhere (16 Sep 2026)

- Every occurrence of the company name across the live site was changed from "Creative Destruction" to "CREATIVE DESTRUCTION VCC" (VCC = variable capital company, matching the existing "Bulgarian variable capital company" description): the homepage's Entrepreneurship section heading and its "My work in …" sentence (`app/page.tsx`); the `/entrepreneurship` page's `<title>` meta description, both body paragraphs and the page's own H1 (`app/entrepreneurship/page.tsx`); the About page's biography sentence about the PDGA Seal of Excellence (`content/about.ts`); and PDGA's "Organisation" field, which now shows on its project detail page (`content/projects.ts`).
- **Files changed:** `app/page.tsx`, `app/entrepreneurship/page.tsx`, `content/about.ts`, `content/projects.ts`.
- Verification: `tsc --noEmit`, `eslint`, `next build` (46/46 pages) and `next start` passed with no errors. Screenshots of the homepage, `/entrepreneurship` (desktop + mobile), `/about` and `/projects/pdga` confirm "CREATIVE DESTRUCTION VCC" renders correctly and consistently everywhere the name appears, with no other content changed.
- All four files committed to the device with the mtime-guard workflow; no drift found, verified byte-identical after commit.

## 28. Update — Information-architecture cleanup: Themes, Timeline, PDGA/DUST unpublished, External Links removed (16 Sep 2026)

- **Why:** the site was creating improper automatic connections between Kostadin Penchev's academic research/PhD, his professional Project Archive and CREATIVE DESTRUCTION VCC's own entrepreneurial work, purely because they shared themes (AI, digital transformation, innovation, AgriTech). The owner's explicit instruction: *"Моите научни изследвания, дисертацията и проектите, по които съм работил професионално, НЕ са проекти на CREATIVE DESTRUCTION."* This pass removes those automatic connections and the standalone Themes/Timeline aggregation systems, without any redesign — layout, typography, colours and spacing are unchanged everywhere.

**Homepage — Creative Destruction section (`app/page.tsx`):** the right-hand "Technology themes" column (theme list, entry counters, "All themes" link) was removed entirely. The section now contains only the company paragraphs and a single "Learn more →" link to `/entrepreneurship` — nothing here auto-links Research, PhD, Publications or the Project Archive to CREATIVE DESTRUCTION.

**Themes system removed from the public site:** deleted `app/themes/page.tsx` and `app/themes/[slug]/page.tsx` (and the now-empty `app/themes/` directory) — the "Technology & AI" page and its per-theme aggregation pages no longer exist as routes. In `lib/content.ts`, removed the now-unused aggregation functions `getTheme`, `themeLabel`, `entriesForTheme`, `themeCount`, and the dead `case "themes":` branch inside `resolveRef` (confirmed via grep that no content entry's `related` array ever pointed at a `themes/…` reference, so this was already dead code). The **data model itself is untouched**: `content/taxonomy.ts`'s `themes`/`themeGroups` and every entry's own `themes?: string[]` tagging field remain, since themes are still used for internal structuring (e.g. the Projects-page theme filter, About's "Research interests" list) — they simply no longer have a public aggregation page.

**"Technology & AI" removed from navigation and internal links:** `content/navigation.ts`'s `secondaryNav` no longer has the "Technology & AI" (→ `/themes`) entry (only "PhD Research" remains). `app/research/[programme]/page.tsx` no longer renders the PhD page's theme-tag list that linked each theme to `/themes/[slug]` (with the now-unused `themeLabel` import removed). `app/projects/[slug]/page.tsx` and `app/entrepreneurship/[slug]/page.tsx` no longer render their theme-tag lists linking to `/themes/[slug]` either (the shared `TagList` primitive in `components/editorial/primitives.tsx` was left in place, unused, since it's a small reusable component — only its two call sites were removed). `app/about/page.tsx`'s "Research interests" list keeps the same theme labels but they are now plain text instead of links to `/themes/[slug]`. `content/current-focus.ts`'s placeholder "Exploring" item no longer points at `/themes` (currently invisible in production either way, since `site.showPlaceholders` is `false`).

**PDGA and DUST unpublished from the Project Archive:** both entries in `content/projects.ts` were given `published: false` with an explanatory comment — the established `isVisible`/`getProjects()` mechanism used elsewhere on this site to keep data in the repository without showing it publicly. All other fields (including PDGA's `related: ["research/phd"]` and both projects' `links` data) were left completely untouched — nothing was deleted, only unpublished. This single flag was sufficient, with no other code change, to also correctly remove PDGA from the PhD research page's "Related projects" section, since that section is generated by scanning the same already-filtered `getProjects()` list — confirming there is no longer any bidirectional Research ↔ PDGA cross-link. The Projects page's project count is computed live from `getProjects().length` (`components/projects/ProjectArchive.tsx`), so it updated automatically from 12 to **10** with no manual count to fix.

**"External links" removed from individual project pages:** `app/projects/[slug]/page.tsx`'s `sections` array no longer includes the `{ key: "links", title: "External links", … }` entry, so no project detail page (DeCarb, GPP4Growth, INNOGROW, PLASTECO, SMEOrigin, Act45, RES-SKILL, eUnited, COALition, SITRANS, and the now-unpublished PDGA/DUST) shows an External Links section or any of its links (e.g. "Project archive (former SZEDA site)", "Interreg Europe", CORDIS, EIC pages). The main description, programme, role, period, focus, achievement and every other field are unchanged. `content/projects.ts`'s `links` data on every project was **not deleted** — only its rendering on this one page. Venture/entrepreneurship detail pages (`app/entrepreneurship/[slug]/page.tsx`) were explicitly out of scope for this change and still show their own "Links" section, since the instruction targeted individual *project* pages only.

**Timeline removed** (requested mid-task, same pass): deleted `app/timeline/page.tsx` and its sole rendering component `components/timeline/Timeline.tsx`; removed `lib/content.ts`'s `getTimeline()` (confirmed used only by the deleted page) and `lib/types.ts`'s `TimelineItem` interface. Removed the "Timeline" (→ `/timeline`) entry from `content/navigation.ts`'s `secondaryNav` and from the About page's "Explore" link grid (`app/about/page.tsx`). Removed `/themes` and `/timeline` (and the per-theme sitemap entries) from `app/sitemap.ts`. **Not touched:** `components/research/StageTimeline.tsx` — the PhD milestone-progress visualisation used on `/research`, `/research/phd` and the homepage PhD card — a coincidentally similarly-named but entirely unrelated feature; and `components/timeline/ActivityList.tsx`/`ActivityArchive.tsx`, which live in the same folder by naming convention only and power the (unrelated, still-public) `/activity` page. No underlying education/professional/project/publication/activity data was deleted — it all remains organised within Research, Publications, Projects, Activity, Entrepreneurship and About, exactly as instructed.

- **Files changed:** `content/projects.ts`, `lib/content.ts`, `lib/types.ts`, `content/navigation.ts`, `content/current-focus.ts`, `app/sitemap.ts`, `app/about/page.tsx`, `app/research/[programme]/page.tsx`, `app/projects/[slug]/page.tsx`, `app/entrepreneurship/[slug]/page.tsx`, `app/page.tsx`.
- **Files deleted:** `app/themes/page.tsx`, `app/themes/[slug]/page.tsx`, `app/timeline/page.tsx`, `components/timeline/Timeline.tsx`.
- **QA grep sweep** across the whole codebase (excluding `node_modules`) for `/themes`, `Technology & AI`, `ALL THEMES`, `External links`, `PDGA`, `DUST`, `entries`, `/timeline`, `Timeline`, `Work across time` confirmed no remaining public references: all surviving hits are either the unrelated `StageTimeline` component/`components/timeline/ActivityList` import, the generic English word "entries" in code comments or `Map.entries()`, or the legitimate data-layer mentions of PDGA/DUST in `content/projects.ts` (now unpublished, with explanatory comments) and the pre-existing, out-of-scope PDGA sentence in `content/about.ts`'s biography.
- Verification: `tsc --noEmit`, `eslint .` and `next build` all passed with no errors (26 routes generated, down from 46 — the per-theme and per-unpublished-project static pages are gone) and `next start` served the site correctly. Screenshots at 1440px confirmed: the homepage Creative Destruction section shows only company text + "Learn more" (no themes column); `/projects` shows "10 PROJECTS" (not 12); `/projects/gpp4growth` ends cleanly at "My role" → "All projects" with no External Links section; the footer's secondary nav shows only "PhD Research".
- The 11 changed files and (separately) the 4 deleted files were committed/removed per the device mtime-guard workflow — the 11 edits were staged, diffed and committed with `expectedMtimeMs` guards and all landed with no rejections; the 4 deletions could not be applied on the device this session because `device_bash` reported "Workspace unavailable" (a transient local-environment failure) — see the note to the owner in this session for the exact folders/file to remove manually (`app/themes/`, `app/timeline/`, `components/timeline/Timeline.tsx`) until that tool is available again.
