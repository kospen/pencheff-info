import type { Publication } from "@/lib/types";
import { groupPublicationsByYear, publicationTypeLabel } from "@/lib/content";
import { publicationStatuses } from "@/content/taxonomy";
import { ownerAuthorNames } from "@/content/publications";
import { ExternalIcon, PlaceholderTag } from "@/components/editorial/primitives";

function Authors({ authors }: { authors: string[] }) {
  return (
    <>
      {authors.map((a, i) => (
        <span key={`${a}-${i}`}>
          {ownerAuthorNames.includes(a) ? <span className="font-medium text-navy">{a}</span> : a}
          {i < authors.length - 1 ? ", " : ""}
        </span>
      ))}
    </>
  );
}

export function PublicationRow({ p }: { p: Publication }) {
  const statusLabel = publicationStatuses[p.status] ?? p.status;
  const citationBits = [p.venue, p.volume && `${p.volume}${p.issue ? `(${p.issue})` : ""}`, p.pages].filter(Boolean);
  return (
    <li id={p.slug} className="scroll-mt-24 border-b border-line py-6 md:py-7">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="label">{publicationTypeLabel(p.type)}</span>
        <span aria-hidden className="text-line">/</span>
        <span className={`label ${p.status === "published" ? "text-link" : ""}`}>{statusLabel}</span>
        {p.placeholder && <PlaceholderTag />}
      </div>
      <h3 className="mt-3 max-w-4xl font-serif text-[1.375rem] leading-snug md:text-[1.625rem]">{p.title}</h3>
      <p className="mt-2 text-[0.9375rem] text-slate">
        <Authors authors={p.authors} />
      </p>
      {citationBits.length > 0 && <p className="mt-1 text-[0.9375rem] text-slate italic">{citationBits.join(", ")}</p>}

      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
        {p.doi && (
          <a href={`https://doi.org/${p.doi}`} className="text-link inline-flex min-h-11 items-center gap-1.5 font-mono text-xs tracking-[0.08em]" target="_blank" rel="noopener">
            DOI {p.doi} <ExternalIcon />
          </a>
        )}
        {!p.doi && p.url && (
          <a href={p.url} className="text-link inline-flex min-h-11 items-center gap-1.5 font-mono text-xs tracking-[0.1em] uppercase" target="_blank" rel="noopener">
            {p.url.includes("researchgate.net") ? "ResearchGate" : "Read"} <ExternalIcon />
          </a>
        )}
        {p.pdf && (
          <a href={p.pdf} className="text-link inline-flex min-h-11 items-center gap-1.5 font-mono text-xs tracking-[0.1em] uppercase">
            PDF ↓
          </a>
        )}
      </div>

      {p.abstract && (
        <details className="group mt-2 max-w-3xl">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 font-mono text-xs tracking-[0.1em] text-link uppercase hover:text-navy [&::-webkit-details-marker]:hidden">
            Abstract
            <svg aria-hidden width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.3" className="transition-transform group-open:rotate-180">
              <path d="M1 1l4 4 4-4" />
            </svg>
          </summary>
          <p className="mt-2 border-l border-cyan pl-4 text-[0.9375rem] leading-relaxed text-slate">{p.abstract}</p>
        </details>
      )}
    </li>
  );
}

export function PublicationList({ items }: { items: Publication[] }) {
  const groups = groupPublicationsByYear(items);
  return (
    <div>
      {groups.map(([year, list]) => (
        <section key={year} aria-labelledby={`pub-${year}`} className="grid gap-2 border-t border-navy pt-6 md:grid-cols-12 md:gap-10">
          <h2 id={`pub-${year}`} className={`font-mono text-navy md:col-span-2 ${/^\d{4}$/.test(year) ? "text-3xl md:text-4xl" : "text-lg tracking-[0.08em] uppercase md:pt-2"}`}>
            {year}
          </h2>
          <ul className="md:col-span-10">
            {list.map((p) => (
              <PublicationRow key={p.slug} p={p} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
