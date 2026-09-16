/** Monoline 24px icons, stroke 1.25, cyan by default. Decorative only. */
type Name = "research" | "projects" | "technology" | "entrepreneurship" | "publications";

const paths: Record<Name, React.ReactNode> = {
  research: (
    <path d="M3 5.5h7.5A1.5 1.5 0 0 1 12 7v12.5M21 5.5h-7.5A1.5 1.5 0 0 0 12 7M3 5.5v12h7.5A1.5 1.5 0 0 1 12 19M21 5.5v12h-7.5A1.5 1.5 0 0 0 12 19" />
  ),
  publications: (
    <>
      <path d="M6.5 3.5h7l4 4v13h-11z" />
      <path d="M13.5 3.5v4h4" />
      <path d="M9.5 12h5M9.5 15.5h5M9.5 9h2.5" />
    </>
  ),
  projects: (
    <>
      <rect x="3.5" y="3.5" width="11" height="11" />
      <rect x="9.5" y="9.5" width="11" height="11" />
    </>
  ),
  technology: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" />
      <path d="M10 6.5V3M14 6.5V3M10 21v-3.5M14 21v-3.5M6.5 10H3M6.5 14H3M21 10h-3.5M21 14h-3.5" />
    </>
  ),
  entrepreneurship: (
    <>
      <path d="M3 19h18" />
      <path d="m4 16 5-5 4 3 7-8" />
      <circle cx="20" cy="6" r="1.5" />
    </>
  ),
};

export function AreaIcon({ name, className = "" }: { name: string; className?: string }) {
  const p = paths[name as Name];
  if (!p) return null;
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="1.25" className={className}>
      {p}
    </svg>
  );
}
