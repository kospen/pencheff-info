# Vercel deployment — PENCHEFF.INFO

> **Status:** prepared, **not deployed**. No DNS change has been made and `pencheff.info` is not connected. Do these steps only after explicit approval.

## 1. Prerequisites

- A Vercel account (Hobby is enough for a personal site).
- A Git repository (GitHub, GitLab or Bitbucket) containing this project folder at its root.
- Access to the Cloudflare account that holds the `pencheff.info` zone.
- Node.js ≥ 20.9 locally (only needed to build or test before pushing).

## 2. Repository and build assumptions

| Item | Value |
|---|---|
| Framework | Next.js 16 (App Router), detected automatically |
| Root directory | repository root (the folder with `package.json`) |
| Install command | `npm install` (default) |
| Build command | `npm run build` (= `next build`) |
| Output | `.next` (default — do not override) |
| Node.js version | 20.x or 22.x (Project Settings → General) |
| Runtime | All pages are statically generated. No database, no server that must stay running, no runtime file writes. |
| Images | `next/image` with Vercel Image Optimization (AVIF/WebP). Source files in `public/photo/`. |

Before pushing: `npm run lint` and `npm run build` both pass locally.

Do **not** commit `node_modules/`, `.next/` or `.vercel/` (already in `.gitignore`).

The original photos in `photo/` are not used at runtime. Keep them out of the repository or in a separate folder if the repository will be public (they are ~16 MB).

## 3. Import into Vercel

1. Push the project to the Git repository.
2. Vercel dashboard → **Add New… → Project** → import the repository.
3. Framework preset: **Next.js** (auto). Leave build and output settings at their defaults.
4. Environment variables: add `NEXT_PUBLIC_SITE_URL` only if needed (see §6).
5. **Deploy.** Every push creates a Preview deployment. Pushes to the production branch create Production deployments.
6. Review the `*.vercel.app` URL: all routes, mobile layout, images, `/sitemap.xml`, `/robots.txt`.

Preview deployments are served with `robots.txt → Disallow: /` (based on `VERCEL_ENV`), so they are not indexed.

## 4. Build command

```bash
npm run build
```

## 5. What to expect from the build

- ~35 statically generated routes, including `/`, `/research`, `/research/phd`, `/projects`, `/projects/[slug]`, `/publications`, `/activity`, `/entrepreneurship`, `/entrepreneurship/[slug]`, `/about`, `/contact`, `/themes`, `/themes/[slug]`, `/timeline`
- plus `/sitemap.xml`, `/robots.txt`, `/icon.svg`, `/apple-icon.png`, `/opengraph-image`.
- Adding a project, venture or publication adds its page on the next build automatically.

## 6. Environment variables

None are required.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical origin for metadata, sitemap and Open Graph. Default: `https://pencheff.info`. |
| `VERCEL_ENV` | Set by Vercel | Used by `robots.txt` to block indexing of preview deployments. |

## 7. Before connecting the domain

1. Replace the placeholder content (see `IMPLEMENTATION_REPORT.md` → Remaining content).
2. Set `showPlaceholders: false` in `content/site.ts`. This removes the preview banner and all placeholder entries.
3. Rebuild and review the Preview deployment.

## 8. Connecting `pencheff.info` (when approved)

In Vercel: **Project → Settings → Domains → Add** `pencheff.info`. Accept the suggestion to also add `www.pencheff.info`, and choose the redirect direction (recommended: `www.pencheff.info` → `pencheff.info`, 308).

Vercel then shows the exact DNS values for this project on the domain card. **Use those values**, not values copied from elsewhere. Typically:

| Type | Name | Value | Notes |
|---|---|---|---|
| A | `@` | value shown on the domain card (commonly `76.76.21.21`) | apex |
| CNAME | `www` | project-specific value shown on the domain card (e.g. `xxxx.vercel-dns-0xx.com`) | subdomain |

Keep Cloudflare as the DNS provider (no nameserver change is needed). Changing only these two records does not affect e-mail (MX) or other records.

## 9. Cloudflare DNS considerations

- **Proxy status:** create both records as **DNS only (grey cloud)**. Vercel already provides a CDN and TLS; Cloudflare's proxy can block Vercel's domain verification and certificate issuance.
- If the proxy is enabled later: Cloudflare SSL/TLS mode must be **Full (strict)** or at least **Full** — **never Flexible** (causes redirect loops). Expect cache and TLS to be handled twice.
- **Remove conflicting records** for `@` and `www` (old A, AAAA or CNAME records, parking pages).
- **CAA:** if the zone has CAA records, add one that allows Let's Encrypt: `0 issue "letsencrypt.org"`. Otherwise Vercel cannot issue the certificate.
- **Redirect rules / Page rules** in Cloudflare that touch `pencheff.info` should be disabled; let Vercel handle `www` ↔ apex.
- Leave **MX, SPF, DKIM, DMARC** and verification TXT records unchanged.
- Propagation is usually minutes; the Vercel domain card turns to "Valid Configuration" when done. The certificate is issued automatically.

## 10. After go-live

- Open `https://pencheff.info`, `https://www.pencheff.info` (should redirect), `/sitemap.xml`, `/robots.txt`.
- Submit the sitemap in Google Search Console (verify the domain with a TXT record in Cloudflare).
- Check a shared link preview (LinkedIn Post Inspector) for the Open Graph image.

Sources: [Vercel — Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain) · [Vercel KB — A records and CAA](https://vercel.com/kb/guide/a-record-and-caa-with-vercel) · [Vercel — Troubleshooting domains](https://vercel.com/docs/domains/troubleshooting)
