import Image from "next/image";
import Link from "next/link";
import { activitySections } from "@/content/taxonomy";
import { ExternalIcon, PlaceholderTag } from "@/components/editorial/primitives";
import type { ActivityRecord } from "./activity-record";


function Meta({ r }: { r: ActivityRecord }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {r.upcoming && <span className="label text-link">Upcoming</span>}
      <span className="label">{r.typeText}</span>
      {r.rolesText && (
        <>
          <span aria-hidden className="text-line">
            /
          </span>
          <span className={`label ${r.isPresenter ? "text-link" : ""}`}>{r.rolesText}</span>
        </>
      )}
      {r.placeholder && <PlaceholderTag />}
    </p>
  );
}

function Links({ r }: { r: ActivityRecord }) {
  const external = [...(r.links ?? []), ...(r.documents ?? [])];
  if (!external.length && !r.related.length) return null;
  return (
    <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
      {external.map((l) => (
        <a key={l.url} href={l.url} target="_blank" rel="noopener" className="text-link inline-flex items-center gap-1.5">
          {l.label} <ExternalIcon />
        </a>
      ))}
      {r.related.map((x) => (
        <Link key={x.ref} href={x.href} className="text-link">
          {x.kindLabel === "Research" ? x.title : `${x.kindLabel}: ${x.title.length > 60 ? `${x.title.slice(0, 57)}…` : x.title}`} →
        </Link>
      ))}
    </p>
  );
}

function Record({ r }: { r: ActivityRecord }) {
  const featured = r.level === "featured";
  const archive = r.level === "archive";
  const media = r.media?.[0];
  const date = r.dateText ? (
    <time dateTime={r.dateTime} className="font-mono text-sm text-navy">
      {r.dateText}
    </time>
  ) : null;

  return (
    <li id={r.slug} className={`grid scroll-mt-24 gap-3 border-b border-line md:grid-cols-12 md:gap-8 ${archive ? "py-4" : "py-7"}`}>
      <p className={`md:col-span-2 md:pt-0.5 ${date ? "" : "hidden md:block"}`}>{date}</p>

      <div className={`md:col-span-7 ${featured ? "relative border-l-2 border-cyan bg-card py-6 pr-5 pl-6 md:py-8 md:pr-8 md:pl-8" : ""}`}>
        <Meta r={r} />
        <h3
          className={`mt-2 font-serif leading-snug ${
            featured ? "text-[1.625rem] tracking-[-0.01em] md:text-[2rem] md:leading-[1.15]" : archive ? "text-lg text-navy/85" : "text-[1.375rem] md:text-2xl"
          }`}
        >
          {r.title}
        </h3>

        {r.presentationTitle && (
          <div className={featured ? "mt-5 border-t border-line pt-5" : "mt-3"}>
            <p className="label">{r.isPresenter ? "Paper presented" : "Paper"}</p>
            <p className={`mt-1.5 font-serif leading-snug italic ${featured ? "text-xl md:text-[1.375rem]" : "text-lg"}`}>“{r.presentationTitle}”</p>
            {r.coAuthors ? (
              <p className="mt-2 text-[0.9375rem] text-slate">
                <span className="label mr-2">Authors</span>
                {["Kostadin Penchev", ...r.coAuthors].join(", ")}
              </p>
            ) : null}
          </div>
        )}

        {r.description && <p className={`mt-2 max-w-2xl leading-relaxed text-slate ${archive ? "text-sm" : "text-[0.9375rem]"}`}>{r.description}</p>}
        {r.organiser && (
          <p className={`text-[0.9375rem] text-slate ${featured ? "mt-4" : "mt-2"}`}>
            <span className="label mr-2">Organiser</span>
            {r.organiser}
          </p>
        )}
        <Links r={r} />
      </div>

      <p className={`text-slate md:col-span-3 md:text-right ${archive ? "text-sm" : "text-[0.9375rem]"}`}>{r.location}</p>

      {media && (
        <figure className="md:col-span-7 md:col-start-3 md:max-w-md">
          <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(min-width: 768px) 28rem, 100vw" className="aspect-[3/2] w-full object-cover" />
          {media.caption && (
            <figcaption className="mt-2 text-xs text-slate">
              {media.caption}
              {media.credit ? ` · ${media.credit}` : ""}
            </figcaption>
          )}
        </figure>
      )}
    </li>
  );
}

/** Activity record in editorial sections; within a section newest first, undated last. */
export function ActivityArchive({ records }: { records: ActivityRecord[] }) {
  const sections = activitySections
    .map((sec) => ({ ...sec, items: records.filter((r) => r.section === sec.id) }))
    .filter((sec) => sec.items.length > 0);

  return (
    <div className="flex flex-col gap-16">
      {sections.map((sec) => (
        <section key={sec.id} id={sec.id} aria-labelledby={`${sec.id}-title`} className="scroll-mt-24">
          <h2 id={`${sec.id}-title`} className="border-b border-navy pb-4 font-serif text-[1.875rem] leading-tight tracking-[-0.01em] md:text-[2.5rem]">
            {sec.label}
          </h2>
          <ol>
            {sec.items.map((r) => (
              <Record key={r.slug} r={r} />
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
