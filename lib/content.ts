import { site } from "@/content/site";
import { projects as allProjects } from "@/content/projects";
import { ventures as allVentures } from "@/content/ventures";
import { publications as allPublications } from "@/content/publications";
import { activity as allActivity } from "@/content/activity";
import { programmes as allProgrammes } from "@/content/research";
import { roles as allRoles } from "@/content/about";
import {
  activityRoles,
  activitySections,
  activityTypes,
  labelFor,
  publicationTypes,
  ventureTypes,
  ventureStatuses,
} from "@/content/taxonomy";
import {
  dateKey,
  isRealDate,
} from "@/lib/format";
export * from "@/lib/format";
import type {
  ActivityEntry,
  BaseEntry,
  EntryRef,
  Project,
  Publication,
  ResearchProgramme,
  Venture,
} from "@/lib/types";

/* ------------------------------------------------------------ visibility */

export function isVisible(entry: { placeholder?: boolean; published?: boolean }): boolean {
  if (entry.published === false) return false;
  if (entry.placeholder && !site.showPlaceholders) return false;
  return true;
}

const visible = <T extends BaseEntry>(list: T[]) => list.filter(isVisible);

/* -------------------------------------------------------------- projects */

export function getProjects(): Project[] {
  return visible(allProjects).sort((a, b) => dateKey(b.period?.start).localeCompare(dateKey(a.period?.start)));
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

/* -------------------------------------------------------------- ventures */

export function getVentures(): Venture[] {
  return visible(allVentures).sort((a, b) => dateKey(b.period?.start).localeCompare(dateKey(a.period?.start)));
}

export function getVenture(slug: string) {
  return getVentures().find((v) => v.slug === slug);
}

export const ventureTypeLabel = (id: string) => labelFor(ventureTypes, id);
export const ventureStatus = (id: string) =>
  ventureStatuses[id] ?? { label: labelFor({}, id), tone: "done" as const };

/* ---------------------------------------------------------- publications */

export function getPublications(): Publication[] {
  return visible(allPublications).sort((a, b) => (b.year ?? 9999) - (a.year ?? 9999));
}

export function groupPublicationsByYear(list: Publication[]) {
  const map = new Map<string, Publication[]>();
  for (const p of list) {
    const key = p.year ? String(p.year) : p.status === "published" ? "Undated" : "Forthcoming";
    map.set(key, [...(map.get(key) ?? []), p]);
  }
  return [...map.entries()].sort(([a], [b]) => {
    const rank = (k: string) => (k === "Forthcoming" ? "9999" : k === "Undated" ? "0000" : k);
    return rank(b).localeCompare(rank(a));
  });
}

export const publicationTypeLabel = (id: string) => labelFor(publicationTypes, id);

/* -------------------------------------------------------------- activity */

/** Newest first; undated entries last, in source order. */
export function getActivity(): ActivityEntry[] {
  return visible(allActivity).sort((a, b) => dateKey(b.period?.start).localeCompare(dateKey(a.period?.start)));
}

/**
 * A short selection for the homepage and overview pages:
 * featured first, then presentations, then the most recent entries. Never archive, upcoming or undated entries.
 */
export function getSelectedActivity(limit = 3, filter: (a: ActivityEntry) => boolean = () => true): ActivityEntry[] {
  const dated = getActivity().filter((a) => isRealDate(a.period?.start) && a.level !== "archive" && !a.upcoming && filter(a));
  const rank = (a: ActivityEntry) => (a.level === "featured" ? 0 : a.roles?.includes("presenter") ? 1 : 2);
  return [...dated].sort((a, b) => rank(a) - rank(b)).slice(0, limit);
}

export const activityTypeLabel = (id: string) => labelFor(activityTypes, id);
export const activityDisplayType = (a: ActivityEntry) => a.typeDetail ?? activityTypeLabel(a.type);
export const activityRoleLabel = (id: string) => activityRoles[id] ?? labelFor({}, id);
export const activityRolesText = (a: ActivityEntry) => (a.roles ?? []).map(activityRoleLabel).join(" · ");

/** Section id of an entry (see activitySections). */
export function activitySectionId(a: ActivityEntry): string {
  return activitySections.find((sec) => sec.types.includes(a.type))?.id ?? activitySections[activitySections.length - 1].id;
}

/* ------------------------------------------------------------- research */

export function getProgrammes(): ResearchProgramme[] {
  return visible(allProgrammes);
}

export function getRoles() {
  return visible(allRoles);
}

/* -------------------------------------------------------- relationships */

export interface ResolvedRef {
  ref: EntryRef;
  kindLabel: string;
  title: string;
  href: string;
  placeholder?: boolean;
}

export function resolveRef(ref: EntryRef): ResolvedRef | undefined {
  const [collection, ...rest] = ref.split("/");
  const slug = rest.join("/");
  switch (collection) {
    case "projects": {
      const p = getProject(slug);
      return p && { ref, kindLabel: "Project", title: p.title, href: `/projects/${p.slug}`, placeholder: p.placeholder };
    }
    case "ventures": {
      const v = getVenture(slug);
      return v && { ref, kindLabel: ventureTypeLabel(v.type), title: v.title, href: `/entrepreneurship/${v.slug}`, placeholder: v.placeholder };
    }
    case "research": {
      const r = getProgrammes().find((x) => x.slug === slug);
      return r && { ref, kindLabel: "Research", title: r.slug === "phd" ? "PhD Research" : r.title, href: r.href };
    }
    case "publications": {
      const p = getPublications().find((x) => x.slug === slug);
      return p && { ref, kindLabel: publicationTypeLabel(p.type), title: p.title, href: `/publications#${p.slug}`, placeholder: p.placeholder };
    }
    case "activity": {
      const a = getActivity().find((x) => x.slug === slug);
      return a && { ref, kindLabel: activityDisplayType(a), title: a.title, href: `/activity#${a.slug}`, placeholder: a.placeholder };
    }
    default:
      return undefined;
  }
}

/** Everything that points at `ref`, plus everything `ref` points at. */
export function relatedTo(ref: EntryRef, own: EntryRef[] = []): ResolvedRef[] {
  const found = new Map<string, ResolvedRef>();
  const add = (r?: ResolvedRef) => r && r.ref !== ref && found.set(r.ref, r);
  own.forEach((r) => add(resolveRef(r)));
  const scan = (collection: string, list: BaseEntry[]) =>
    list.forEach((e) => {
      if (e.related?.includes(ref)) add(resolveRef(`${collection}/${e.slug}` as EntryRef));
    });
  scan("projects", getProjects());
  scan("ventures", getVentures());
  scan("publications", getPublications());
  scan("activity", getActivity());
  scan("research", getProgrammes());
  return [...found.values()];
}
