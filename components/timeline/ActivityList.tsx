import Link from "next/link";
import type { ActivityEntry } from "@/lib/types";
import {
  activityDisplayType,
  activitySectionId,
  activityRolesText,
  formatDateRange,
  isoDate,
  resolveRef,
} from "@/lib/content";
import { PlaceholderTag } from "@/components/editorial/primitives";
import type { ActivityRecord } from "./activity-record";
import { ActivityArchive } from "./ActivityArchive";

/** Prepare an entry for display. Only fields with verified content are passed on. */
export function toActivityRecord(a: ActivityEntry): ActivityRecord {
  const start = a.period?.start;
  return {
    slug: a.slug,
    title: a.title,
    typeText: activityDisplayType(a),
    rolesText: activityRolesText(a),
    isPresenter: !!a.roles?.includes("presenter"),
    dateText: formatDateRange(a.period),
    dateTime: isoDate(start),
    level: a.level ?? "standard",
    location: a.location,
    organiser: a.organiser,
    description: a.description,
    presentationTitle: a.presentationTitle,
    coAuthors: a.coAuthors,
    links: a.links,
    documents: a.documents,
    media: a.media,
    related: (a.related ?? [])
      .map(resolveRef)
      .filter((r) => r !== undefined)
      .map((r) => ({ ref: r.ref, href: r.href, title: r.title, kindLabel: r.kindLabel })),
    section: activitySectionId(a),
    upcoming: a.upcoming,
    placeholder: a.placeholder,
  };
}

function CompactItem({ a }: { a: ActivityEntry }) {
  const date = formatDateRange(a.period);
  const roles = activityRolesText(a);
  return (
    <li className="border-b border-line py-5">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {date && (
          <>
            <time dateTime={isoDate(a.period?.start)} className="font-mono text-xs text-navy">
              {date}
            </time>
            <span aria-hidden className="text-line">
              /
            </span>
          </>
        )}
        <span className="label">{activityDisplayType(a)}</span>
        {a.placeholder && <PlaceholderTag />}
      </p>
      <h3 className="mt-2 font-serif text-xl leading-snug">
        <Link href={`/activity#${a.slug}`} className="hover:text-link">
          {a.title}
        </Link>
      </h3>
      {a.presentationTitle && <p className="mt-1.5 font-serif text-[0.9375rem] leading-snug text-navy/80 italic">“{a.presentationTitle}”</p>}
      <p className="mt-1.5 text-sm text-slate">{[roles, a.location].filter(Boolean).join(" · ")}</p>
    </li>
  );
}

/**
 * Activity — compact list (homepage, research, themes) or the full,
 * filterable chronological archive (/activity).
 */
export function ActivityList({ items, compact = false }: { items: ActivityEntry[]; compact?: boolean }) {
  if (compact) {
    return (
      <ol>
        {items.map((a) => (
          <CompactItem key={a.slug} a={a} />
        ))}
      </ol>
    );
  }
  return <ActivityArchive records={items.map(toActivityRecord)} />;
}
