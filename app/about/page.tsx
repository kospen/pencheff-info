import Link from "next/link";
import { Container, CtaLink, Eyebrow, InDevelopment, NumberedSection, PlaceholderTag } from "@/components/editorial/primitives";
import { Portrait } from "@/components/media/Portrait";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { themes } from "@/content/taxonomy";
import { formatPeriod, getRoles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  path: "/about",
  description: "About Kostadin Penchev — biography, academic and professional background, research interests and current roles.",
});

function Chronology({ items }: { items: { period: string; text: string; placeholder?: boolean }[] }) {
  const shown = items.filter((i) => !i.placeholder || site.showPlaceholders);
  if (!shown.length) return <InDevelopment />;
  return (
    <ol className="border-t border-line">
      {shown.map((i) => (
        <li key={i.text} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4 md:grid-cols-[9rem_1fr]">
          <span className="font-mono text-sm text-slate">{i.period}</span>
          <span className={`text-[1.0625rem] ${i.placeholder ? "text-slate" : ""}`}>
            {i.text} {i.placeholder && <PlaceholderTag className="ml-2 align-middle" />}
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function AboutPage() {
  const roles = getRoles().filter((r) => r.current);
  const bio = about.biography.filter((_, i) => site.showPlaceholders || i < about.biographyPlaceholderFrom);
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <span aria-hidden className="absolute inset-y-0 right-0 hidden w-[22%] bg-mist lg:block" />
        <Container className="relative grid gap-12 py-14 md:grid-cols-12 md:py-20 lg:py-24">
          <div className="md:col-span-7 lg:col-span-7">
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-6 font-serif text-[2.75rem] leading-[1] font-medium tracking-[-0.03em] md:text-[4.25rem] lg:text-[5.25rem]">
              Kostadin Penchev
            </h1>
            <div className="prose-editorial mt-8 max-w-[38rem] text-lg leading-relaxed md:text-xl">
              {bio.map((p, i) => (
                <p key={i} className={i >= about.biographyPlaceholderFrom ? "text-slate" : ""}>
                  {p}
                  {i >= about.biographyPlaceholderFrom && <PlaceholderTag className="ml-2 align-middle" />}
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-start gap-2 sm:flex-row sm:gap-10">
              <CtaLink href="/projects">See the work</CtaLink>
              <CtaLink href="/contact" variant="secondary">
                Contact
              </CtaLink>
            </div>
          </div>
          <div className="w-[82%] max-w-[22rem] pl-6 md:col-span-5 md:w-full md:justify-self-end md:pl-0 lg:col-span-4 lg:col-start-9">
            <Portrait
              src={about.portrait.src}
              alt={about.portrait.alt}
              width={about.portrait.width}
              height={about.portrait.height}
              sizes="(min-width: 1024px) 352px, (min-width: 768px) 38vw, 82vw"
              objectPosition="50% 20%"
              priority
            />
          </div>
        </Container>
      </header>

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 xl:px-16">
        <NumberedSection number={num()} title="Current roles">
          {roles.length ? (
            <ul className="border-t border-line">
              {roles.map((r) => (
                <li key={r.slug} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4">
                  <span className="flex flex-wrap items-baseline gap-3">
                    <span className={`font-serif text-2xl ${r.placeholder ? "text-slate" : ""}`}>{r.title}</span>
                    {r.organisation && <span className="text-slate">{r.organisation}</span>}
                    {r.placeholder && <PlaceholderTag />}
                  </span>
                  <span className="font-mono text-xs text-slate">{formatPeriod(r.period)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <InDevelopment />
          )}
        </NumberedSection>

        <NumberedSection number={num()} title="Academic background">
          <Chronology items={about.academicBackground} />
        </NumberedSection>

        <NumberedSection number={num()} title="Professional background">
          <Chronology items={about.professionalBackground} />
        </NumberedSection>

        <NumberedSection number={num()} title="Research interests">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {themes
              .filter((t) => t.researchArea)
              .map((t) => (
                <li key={t.id}>
                  <span className="font-serif text-xl">{t.label}</span>
                </li>
              ))}
          </ul>
          <p className="mt-6">
            <Link href="/research" className="text-link">
              Research →
            </Link>
          </p>
        </NumberedSection>

        <NumberedSection number={num()} title="Selected experience">
          {about.selectedExperience.length ? (
            <ul className="border-t border-line">
              {about.selectedExperience.map((e) => (
                <li key={e.text} className="border-b border-line py-4 text-[1.0625rem]">
                  {e.href ? (
                    <Link href={e.href} className="hover:text-link">
                      {e.text} →
                    </Link>
                  ) : (
                    e.text
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <InDevelopment>Selected experience will be added.</InDevelopment>
          )}
        </NumberedSection>

        <NumberedSection number={num()} title="Languages & digital skills">
          <p className="text-lg leading-relaxed text-slate">Bulgarian is my mother tongue. My English proficiency is C1 in listening and reading, and B2 in writing and spoken communication.</p>
          <p className="mt-4 text-lg leading-relaxed text-slate">My digital skills include Microsoft 365 tools for documents, spreadsheets, presentations and collaboration, alongside training in Python programming basics and cybersecurity.</p>
        </NumberedSection>

        <nav aria-label="Explore" className="grid gap-4 border-t border-navy py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/research", label: "Research" },
            { href: "/projects", label: "Projects" },
            { href: "/publications", label: "Publications" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="group flex min-h-14 items-center justify-between border-b border-line font-serif text-2xl hover:text-link">
              {l.label} <span className="text-cyan-deep transition-transform group-hover:translate-x-1">→</span>
            </Link>
          ))}
          {site.cv && (
            <a href={site.cv} className="text-link font-mono text-sm uppercase">
              CV (PDF) ↓
            </a>
          )}
        </nav>
      </div>
    </>
  );
}
