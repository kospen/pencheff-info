import Link from "next/link";
import type { Project } from "@/lib/types";
import { formatPeriod, projectCategoryLabel, projectStatus } from "@/lib/format";
import { ArrowIcon, PlaceholderTag, StatusMark } from "@/components/editorial/primitives";

export const projectGridCols =
  "md:grid-cols-[9rem_minmax(0,1fr)_11rem_10rem_9.5rem] lg:grid-cols-[10rem_minmax(0,1fr)_13rem_12rem_10rem]";

export function ProjectIndexHeader() {
  return (
    <div aria-hidden className={`label hidden gap-4 border-b border-navy pb-3 md:grid ${projectGridCols}`}>
      <span>Period</span>
      <span>Project</span>
      <span>Programme</span>
      <span>Role</span>
      <span className="text-right">Focus</span>
    </div>
  );
}

/** Editorial index row. Collapses to two lines on mobile. */
export function ProjectRow({ project, compact = false }: { project: Project; compact?: boolean }) {
  const status = projectStatus(project.status);
  const period = formatPeriod(project.period) || "—";
  const role = project.roles?.join(", ");
  if (compact) {
    return (
      <li className="border-b border-line">
        <Link href={`/projects/${project.slug}`} className="group flex flex-col gap-2 py-5 transition-colors hover:bg-card">
          <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <span className="flex flex-wrap items-baseline gap-3">
              <span className="font-serif text-[1.375rem] leading-snug group-hover:text-link">{project.title}</span>
              {project.placeholder && <PlaceholderTag />}
            </span>
            <StatusMark label={status.label} tone={status.tone} />
          </span>
          <span className="font-mono text-xs tracking-[0.04em] text-slate">
            {[formatPeriod(project.period), projectCategoryLabel(project.category), role].filter(Boolean).join(" · ")}
          </span>
        </Link>
      </li>
    );
  }
  return (
    <li className="border-b border-line">
      <Link
        href={`/projects/${project.slug}`}
        className={`group grid grid-cols-1 gap-2 py-5 transition-colors hover:bg-card md:items-baseline md:gap-4 md:py-6 ${projectGridCols}`}
      >
        <span className="hidden font-mono text-[0.8125rem] text-slate md:block">{period}</span>
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-serif text-[1.375rem] leading-snug group-hover:text-link md:text-[1.625rem]">{project.title}</span>
          {project.placeholder && <PlaceholderTag />}
        </span>
        {/* Mobile meta line */}
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.04em] text-slate md:hidden">
          {[period, project.programme, role, project.focus].filter(Boolean).map((v) => (
            <span key={v}>· {v}</span>
          ))}
        </span>
        <span className="label hidden md:block">{project.programme ?? projectCategoryLabel(project.category)}</span>
        <span className="hidden text-[0.9375rem] text-slate md:block">{role}</span>
        <span className="hidden items-center justify-end gap-3 md:flex">
          {project.focus && <span className="label text-right text-slate">{project.focus}</span>}
          <ArrowIcon className="opacity-0 transition-opacity group-hover:opacity-100" />
        </span>
      </Link>
    </li>
  );
}

/** Editorial card (grid view). No image by default. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <li className="border-t border-line">
      <Link href={`/projects/${project.slug}`} className="group flex h-full flex-col py-6 transition-colors hover:bg-card md:pr-6">
        <span className="flex items-center justify-between gap-4">
          <span className="label">{project.programme ?? projectCategoryLabel(project.category)}</span>
          {project.focus && <span className="label text-slate">{project.focus}</span>}
        </span>
        <span className="mt-5 font-serif text-2xl leading-snug group-hover:text-link">{project.title}</span>
        {project.summary && <span className="mt-3 line-clamp-2 text-[0.9375rem] text-slate">{project.summary}</span>}
        <span className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-line pt-4 font-mono text-xs tracking-[0.06em] text-slate">
          <span>{formatPeriod(project.period) || "—"}</span>
          {project.roles?.length ? <span>{project.roles.join(", ")}</span> : null}
          {project.placeholder && <PlaceholderTag />}
          <ArrowIcon className="ml-auto" />
        </span>
      </Link>
    </li>
  );
}
