import { labelFor, projectCategories, projectStatuses } from "@/content/taxonomy";
import type { PartialDate, Period, Project } from "@/lib/types";

/* Pure helpers — safe to use in client components (no content imports). */

/* ----------------------------------------------------------------- dates */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** True when the value is a real date rather than a "[YYYY]" placeholder. */
export function isRealDate(value?: PartialDate | null): value is PartialDate {
  return !!value && /^\d{4}(-\d{2}){0,2}$/.test(value);
}

export function formatDate(value?: PartialDate | null, precision: "year" | "month" | "day" = "day"): string {
  if (!value) return "";
  if (!isRealDate(value)) return value;
  const [y, m, d] = value.split("-");
  if (precision === "year" || !m) return y;
  if (precision === "month" || !d) return `${MONTHS[Number(m) - 1]} ${y}`;
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}

/**
 * Date or date range: "27 Oct 2025", "4–6 Jun 2026", "30 May – 2 Jun 2026",
 * "28 Dec 2025 – 2 Jan 2026". Placeholders and unknown dates → "".
 */
export function formatDateRange(period?: Period): string {
  const s = period?.start;
  if (!isRealDate(s)) return "";
  const e = period?.end;
  if (!isRealDate(e) || e === s) return formatDate(s);
  const [sy, sm, sd] = s.split("-");
  const [ey, em, ed] = e.split("-");
  if (!sd || !ed) return `${formatDate(s)} – ${formatDate(e)}`;
  if (sy === ey && sm === em) return `${Number(sd)}–${Number(ed)} ${MONTHS[Number(sm) - 1]} ${sy}`;
  if (sy === ey) return `${Number(sd)} ${MONTHS[Number(sm) - 1]} – ${Number(ed)} ${MONTHS[Number(em) - 1]} ${ey}`;
  return `${formatDate(s)} – ${formatDate(e)}`;
}

export function yearOf(value?: PartialDate | null): string | undefined {
  if (!value) return undefined;
  return isRealDate(value) ? value.slice(0, 4) : value;
}

/** "2024 — 2026", "2025 —" (ongoing), "2024" (single year). */
export function formatPeriod(period?: Period): string {
  if (!period) return "";
  const s = yearOf(period.start);
  const e = period.end === null ? null : yearOf(period.end);
  if (!s && !e) return period.end === null ? "Ongoing" : "";
  if (e === null) return `${s ?? ""} —`;
  if (!e || e === s) return s ?? "";
  if (!s) return e;
  return `${s}–${e}`;
}

/** Sort key: later first. Unknown dates sort last. */
export function dateKey(value?: PartialDate | null): string {
  return isRealDate(value) ? value : "0000";
}

export function isoDate(value?: PartialDate | null): string | undefined {
  return isRealDate(value) ? value : undefined;
}

export function projectCategoryLabel(id: string) {
  return labelFor(projectCategories, id);
}

export function projectStatus(id: string) {
  return projectStatuses[id] ?? { label: labelFor({}, id), tone: "done" as const };
}

export interface ProjectGroup {
  id: string;
  label: string;
  items: Project[];
}

/**
 * Normalises a project's funding-programme string into its broad programme
 * group for display/grouping — e.g. any "Horizon Europe …" variant (such as
 * "Horizon Europe — WIDERA / EIC Pre-Accelerator") groups under plain
 * "Horizon Europe". Falls back to the raw programme string, or "Other".
 */
export function programmeGroup(programme?: string): string {
  if (!programme) return "Other";
  if (programme.startsWith("Horizon Europe")) return "Horizon Europe";
  return programme;
}

/** Fixed display order for programme groups on /projects. */
const PROGRAMME_ORDER = ["Horizon Europe", "Interreg Europe", "Erasmus+", "LIFE", "Europe for Citizens"];

/**
 * Groups projects by funding programme (Horizon Europe, Interreg Europe,
 * Erasmus+, LIFE, Europe for Citizens, …) in a fixed, curated order. This is
 * a professional project archive, not a live status board: grouping by the
 * project's own status would wrongly suggest Kostadin Penchev's current
 * personal involvement, so status is intentionally not used here.
 */
export function groupProjects(list: Project[]): ProjectGroup[] {
  const byGroup = new Map<string, Project[]>();
  for (const p of list) {
    const g = programmeGroup(p.programme);
    byGroup.set(g, [...(byGroup.get(g) ?? []), p]);
  }
  const groups: ProjectGroup[] = [];
  for (const label of PROGRAMME_ORDER) {
    const items = byGroup.get(label);
    if (items?.length) {
      groups.push({ id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-"), label, items });
      byGroup.delete(label);
    }
  }
  // Any programme not in the curated order (should not normally occur).
  [...byGroup.entries()].forEach(([label, items]) => {
    groups.push({ id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-"), label, items });
  });
  return groups;
}

