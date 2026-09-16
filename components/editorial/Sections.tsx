import Link from "next/link";
import type { ProjectSection } from "@/lib/types";
import type { ResolvedRef } from "@/lib/content";
import { PlaceholderTag } from "./primitives";

/** Renders an ordered list of optional sections; empty ones are skipped and numbering adapts. */
export function EntrySections({ sections }: { sections: { key: string; title: string; section?: ProjectSection; custom?: React.ReactNode }[] }) {
  const present = sections.filter((s) => s.custom || s.section?.body?.length || s.section?.items?.length);
  if (!present.length) return null;
  return (
    <div>
      {present.map((s, i) => {
        const n = String(i + 1).padStart(2, "0");
        const id = s.key;
        return (
          <section key={s.key} id={id} aria-labelledby={`${id}-title`} className="grid scroll-mt-24 gap-4 border-t border-line first:border-t-0 py-10 md:grid-cols-12 md:gap-10 md:py-12">
            <div className="md:col-span-4">
              <p className="label flex items-center gap-3">
                <span className="text-navy">{n}</span>
                <span aria-hidden className="h-px w-7 bg-cyan" />
              </p>
              <h2 id={`${id}-title`} className="mt-3 font-serif text-2xl leading-tight md:text-[1.75rem]">
                {s.section?.heading ?? s.title}
              </h2>
            </div>
            <div className="prose-editorial max-w-[68ch] text-[1.0625rem] leading-relaxed md:col-span-8">
              {s.custom}
              {s.section?.body?.map((p, k) => <p key={k}>{p}</p>)}
              {s.section?.items?.length ? (
                <ul className="mt-2 flex flex-col gap-2">
                  {s.section.items.map((it, k) => (
                    <li key={k} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-cyan" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function RelatedList({ items }: { items: ResolvedRef[] }) {
  if (!items.length) return null;
  return (
    <ul className="border-t border-line">
      {items.map((r) => (
        <li key={r.ref} className="border-b border-line">
          <Link href={r.href} className="group flex min-h-14 flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
            <span className="flex items-baseline gap-4">
              <span className="label w-28 shrink-0">{r.kindLabel}</span>
              <span className="font-serif text-lg group-hover:text-link">{r.title}</span>
              {r.placeholder && <PlaceholderTag />}
            </span>
            <span aria-hidden className="text-cyan-deep">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
