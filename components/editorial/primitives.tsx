import Link from "next/link";
import type { ReactNode } from "react";

/* --------------------------------------------------------------- layout */

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-6 md:px-10 xl:px-16 ${className}`}>{children}</div>;
}

/* ------------------------------------------------------------ typography */

/** Mono label with a short cyan line in front. */
export function Eyebrow({ children, className = "", as: Tag = "p" }: { children: ReactNode; className?: string; as?: "p" | "span" | "div" }) {
  return (
    <Tag className={`label flex items-center gap-3 md:gap-4 ${className}`}>
      <span aria-hidden className="h-px w-7 shrink-0 bg-cyan md:w-14" />
      <span>{children}</span>
    </Tag>
  );
}

/** Mono label with a cyan dot in front. */
export function DotLabel({ children, className = "", hollow = false }: { children: ReactNode; className?: string; hollow?: boolean }) {
  return (
    <p className={`label flex items-center gap-2.5 ${className}`}>
      <Dot hollow={hollow} />
      <span>{children}</span>
    </p>
  );
}

export function Dot({ hollow = false, dashed = false }: { hollow?: boolean; dashed?: boolean }) {
  const base = "inline-block size-1.5 shrink-0 rounded-full";
  if (dashed) return <span aria-hidden className={`${base} border border-dashed border-slate`} />;
  return <span aria-hidden className={`${base} ${hollow ? "border border-cyan" : "bg-cyan"}`} />;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  id,
  as: Tag = "h2",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  id?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Tag id={id} className="mt-4 font-serif text-[2.375rem] leading-[1.05] font-normal tracking-[-0.02em] md:mt-5 md:text-[3.25rem]">
          {title}
        </Tag>
        {intro && <div className="mt-4 max-w-2xl text-base leading-relaxed text-slate md:mt-5 md:text-lg">{intro}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Page header used by all inner pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[22%] bg-mist lg:block" />
      <Container className="relative py-14 md:py-20 lg:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-serif text-[2.75rem] leading-[1] font-medium tracking-[-0.03em] md:text-[4.25rem] lg:text-[5.25rem]">
          {title}
        </h1>
        {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-slate md:mt-8 md:text-xl">{intro}</div>}
        {children}
      </Container>
    </header>
  );
}

/** Numbered section inside a page ("§ 01  Title"). */
export function NumberedSection({
  number,
  title,
  id,
  children,
  aside,
}: {
  number: string;
  title: string;
  id?: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section aria-labelledby={id ? `${id}-title` : undefined} id={id} className="border-t border-line py-12 md:py-16">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <p className="label flex items-center gap-3">
            <span className="text-navy">§ {number}</span>
            <span aria-hidden className="h-px w-7 bg-cyan" />
          </p>
          <h2 id={id ? `${id}-title` : undefined} className="mt-3 font-serif text-[1.75rem] leading-tight font-normal md:text-[2rem]">
            {title}
          </h2>
          {aside && <div className="mt-4 text-sm text-slate">{aside}</div>}
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- links */

export function ArrowIcon({ className = "", tone = "deep" }: { className?: string; tone?: "deep" | "slate" | "current" }) {
  const stroke = tone === "deep" ? "var(--color-cyan-deep)" : tone === "slate" ? "var(--color-slate)" : "currentColor";
  return (
    <svg aria-hidden width="22" height="10" viewBox="0 0 22 10" fill="none" stroke={stroke} strokeWidth="1.3" className={`shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${className}`}>
      <path d="M0 5h20M16 1l4 4-4 4" />
    </svg>
  );
}

export function ExternalIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.2" className={`inline-block shrink-0 ${className}`}>
      <path d="M3 1h7v7M10 1 1 10" />
    </svg>
  );
}

/** Editorial CTA: mono uppercase label + arrow + underline. */
export function CtaLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" }) {
  const primary = variant === "primary";
  return (
    <Link
      href={href}
      className={`group relative inline-flex min-h-11 items-center gap-3.5 pb-2 font-mono text-[0.8125rem] font-medium tracking-[0.14em] uppercase ${primary ? "text-link hover:text-navy" : "text-slate hover:text-navy"}`}
    >
      <span>{children}</span>
      <ArrowIcon tone={primary ? "deep" : "slate"} />
      <span aria-hidden className={`absolute right-0 bottom-0 left-0 origin-left transition-transform duration-300 ${primary ? "h-0.5 bg-cyan" : "h-px bg-line group-hover:bg-cyan"}`} />
    </Link>
  );
}

/** Small mono "ALL PROJECTS →" style link. */
export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex min-h-11 items-center gap-3 font-mono text-[0.8125rem] tracking-[0.12em] text-link uppercase hover:text-navy">
      <span>{children}</span>
      <ArrowIcon />
    </Link>
  );
}

/* ------------------------------------------------------------- metadata */

export function MetaList({ items, columns = 2 }: { items: { label: string; value?: ReactNode }[]; columns?: 1 | 2 | 3 }) {
  const shown = items.filter((i) => i.value !== undefined && i.value !== null && i.value !== "");
  if (!shown.length) return null;
  const cols = columns === 3 ? "md:grid-cols-3" : columns === 2 ? "md:grid-cols-2" : "";
  return (
    <dl className={`grid grid-cols-1 gap-x-10 border-y border-line py-5 ${cols}`}>
      {shown.map((i) => (
        <div key={i.label} className="grid grid-cols-[8.5rem_1fr] gap-4 py-2 sm:grid-cols-[10rem_1fr]">
          <dt className="label pt-0.5">{i.label}</dt>
          <dd className="text-[0.9375rem] leading-snug">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export type Tone = "active" | "open" | "pending" | "done" | "archived";

export function StatusMark({ label, tone }: { label: string; tone: Tone }) {
  return (
    <span className={`label inline-flex items-center gap-2 whitespace-nowrap ${tone === "active" ? "text-link" : "text-slate"}`}>
      {tone === "active" && <Dot />}
      {tone === "open" && <Dot hollow />}
      {tone === "pending" && <Dot dashed />}
      {(tone === "done" || tone === "archived") && <span aria-hidden className="inline-block w-1.5" />}
      <span className={tone === "archived" ? "line-through decoration-line" : ""}>{label}</span>
    </span>
  );
}

/** Visible marker for development placeholders. */
export function PlaceholderTag({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center border border-dashed border-slate/60 px-1.5 py-0.5 font-mono text-[0.625rem] tracking-[0.12em] text-slate uppercase ${className}`}>
      Placeholder
    </span>
  );
}

export function InDevelopment({ children = "In development — to be published." }: { children?: ReactNode }) {
  return (
    <p className="flex items-center gap-3 border-l border-dashed border-slate/50 pl-4 text-[0.9375rem] text-slate italic">
      {children}
    </p>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="border border-dashed border-line-mist bg-card px-6 py-10 text-center md:py-14">
      <p className="font-serif text-2xl">{title}</p>
      {children && <div className="mx-auto mt-3 max-w-md text-[0.9375rem] text-slate">{children}</div>}
    </div>
  );
}

export function TagList({ items }: { items: { label: string; href?: string }[] }) {
  if (!items.length) return null;
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1">
      {items.map((t) =>
        t.href ? (
          <li key={t.label}>
            <Link href={t.href} className="label text-link hover:text-navy">
              {t.label}
            </Link>
          </li>
        ) : (
          <li key={t.label} className="label">
            {t.label}
          </li>
        ),
      )}
    </ul>
  );
}
