"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import { groupProjects, programmeGroup, yearOf } from "@/lib/format";
import { EmptyState } from "@/components/editorial/primitives";
import { ProjectCard, ProjectIndexHeader, ProjectRow } from "./ProjectRow";

type Option = { id: string; label: string };

interface Props {
  projects: Project[];
  themes: Option[];
  programmes?: Option[];
  roles?: Option[];
}

const ALL = "all";

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: Option[]; onChange: (v: string) => void }) {
  const id = `filter-${label.toLowerCase()}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 min-w-0 appearance-none border border-line bg-card bg-[length:10px] bg-[right_0.9rem_center] bg-no-repeat py-2 pr-9 pl-3 text-[0.9375rem] text-navy hover:border-slate focus-visible:border-cyan-deep"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6' fill='none' stroke='%23526674' stroke-width='1.3'%3E%3Cpath d='M1 1l4 4 4-4'/%3E%3C/svg%3E\")",
        }}
      >
        <option value={ALL}>All</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ProjectArchive({ projects, themes, programmes = [], roles = [] }: Props) {
  const [theme, setTheme] = useState(ALL);
  const [programme, setProgramme] = useState(ALL);
  const [role, setRole] = useState(ALL);
  const [year, setYear] = useState(ALL);
  const [view, setView] = useState<"index" | "grid">("index");

  // Read initial filters from the URL (shareable links), then keep it in sync.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect -- one-time hydration from the URL */
    if (q.get("theme")) setTheme(q.get("theme")!);
    if (q.get("programme")) setProgramme(q.get("programme")!);
    if (q.get("role")) setRole(q.get("role")!);
    if (q.get("year")) setYear(q.get("year")!);
    if (q.get("view") === "grid") setView("grid");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    const q = new URLSearchParams();
    if (theme !== ALL) q.set("theme", theme);
    if (programme !== ALL) q.set("programme", programme);
    if (role !== ALL) q.set("role", role);
    if (year !== ALL) q.set("year", year);
    if (view !== "index") q.set("view", view);
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [theme, programme, role, year, view]);

  const years = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      const s = yearOf(p.period?.start);
      if (s && /^\d{4}$/.test(s)) set.add(s);
      const e = yearOf(p.period?.end);
      if (e && /^\d{4}$/.test(e)) set.add(e);
    });
    return [...set].sort((a, b) => b.localeCompare(a)).map((y) => ({ id: y, label: y }));
  }, [projects]);

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        if (theme !== ALL && !p.themes?.includes(theme)) return false;
        if (programme !== ALL && programmeGroup(p.programme) !== programme) return false;
        if (role !== ALL && !p.roles?.includes(role)) return false;
        if (year !== ALL) {
          const s = Number(yearOf(p.period?.start));
          const e = p.period?.end === null ? 9999 : Number(yearOf(p.period?.end) ?? s);
          const y = Number(year);
          if (!(s <= y && y <= e)) return false;
        }
        return true;
      }),
    [projects, theme, programme, role, year],
  );

  const groups = groupProjects(filtered);
  const active = [theme, programme, role, year].filter((v) => v !== ALL).length;

  if (projects.length === 0) {
    return <EmptyState title="Projects are being added to the archive.">Current and past projects will appear here with period, role and focus.</EmptyState>;
  }

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:w-[48rem]">
          {programmes.length > 0 && <FilterSelect label="Programme" value={programme} options={programmes} onChange={setProgramme} />}
          <FilterSelect label="Theme" value={theme} options={themes} onChange={setTheme} />
          <FilterSelect label="Year" value={year} options={years} onChange={setYear} />
          {roles.length > 0 && <FilterSelect label="Role" value={role} options={roles} onChange={setRole} />}
        </div>
        <div className="flex items-center justify-between gap-6">
          <p className="label" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            {active > 0 && (
              <button
                type="button"
                className="ml-4 min-h-11 text-link underline decoration-line underline-offset-4 hover:text-navy"
                onClick={() => {
                  setTheme(ALL);
                  setProgramme(ALL);
                  setRole(ALL);
                  setYear(ALL);
                }}
              >
                Clear filters
              </button>
            )}
          </p>
          <div role="group" aria-label="View" className="flex border border-line">
            {(["index", "grid"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={`min-h-11 px-4 font-mono text-xs tracking-[0.12em] uppercase ${view === v ? "bg-navy text-ivory" : "text-slate hover:text-navy"}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="mt-10">
          <EmptyState title="No projects match these filters.">Try a different combination or clear the filters.</EmptyState>
        </div>
      ) : (
        groups.map((g) => (
          <section key={g.id} aria-labelledby={`group-${g.id}`} className="mt-12 md:mt-16">
            <h2 id={`group-${g.id}`} className="sticky top-0 z-10 flex items-center gap-4 bg-ivory/95 py-3 font-mono text-sm tracking-[0.14em] text-navy uppercase">
              <span aria-hidden className="h-px w-7 bg-cyan" />
              {g.label}
              <span className="text-slate">({g.items.length})</span>
            </h2>
            {view === "index" ? (
              <>
                <div className="mt-4">
                  <ProjectIndexHeader />
                </div>
                <ul>
                  {g.items.map((p) => (
                    <ProjectRow key={p.slug} project={p} />
                  ))}
                </ul>
              </>
            ) : (
              <ul className="mt-4 grid gap-x-10 md:grid-cols-2">
                {g.items.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </ul>
            )}
          </section>
        ))
      )}
    </div>
  );
}
