import Link from "next/link";
import { CtaLink, InDevelopment, NumberedSection, PageHeader, PlaceholderTag, StatusMark } from "@/components/editorial/primitives";
import { StageTimeline } from "@/components/research/StageTimeline";
import { researchAreas, researchOverview } from "@/content/research";
import { site } from "@/content/site";
import { getProgrammes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Research",
  path: "/research",
  description: "Research by Kostadin Penchev — current and completed research programmes and research areas.",
});

export default function ResearchPage() {
  const programmes = getProgrammes();
  const current = programmes.filter((p) => p.status === "active" || p.status === "planned");
  const completed = programmes.filter((p) => p.status === "completed" || p.status === "archived");

  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Research"
        intro={
          <>
            {researchOverview.intro}
            {researchOverview.introPlaceholder && site.showPlaceholders && <PlaceholderTag className="ml-2 align-middle" />}
          </>
        }
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 xl:px-16">
        <NumberedSection number={num()} title="Current research" id="current">
          {current.length ? (
            <ul className="flex flex-col gap-6">
              {current.map((p) => (
                <li key={p.slug} className="relative border border-line bg-card p-6 md:p-10">
                  <span aria-hidden className="absolute top-0 left-0 h-0.5 w-24 bg-cyan" />
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="label text-navy!">{p.type === "doctoral" ? "PhD Research" : "Research programme"}</span>
                    <StatusMark label={p.status === "active" ? "In progress" : "Planned"} tone={p.status === "active" ? "active" : "open"} />
                  </p>
                  <h3 className="mt-5 font-serif text-[1.75rem] leading-tight md:text-[2.25rem]">
                    <Link href={p.href} className="hover:text-link">
                      {p.title}
                    </Link>
                  </h3>
                  {p.institution && (
                    <div className="mt-3 flex flex-col gap-0.5 text-[0.9375rem] text-slate">
                      <p>
                        {p.institution}
                        {p.faculty ? ` · ${p.faculty}` : ""}
                      </p>
                      {p.department && <p>{p.department}</p>}
                      {p.supervisor && <p>Scientific Supervisor · {p.supervisor}</p>}
                    </div>
                  )}
                  {p.milestones?.length ? (
                    <div className="mt-8 border-t border-line pt-8">
                      <StageTimeline milestones={p.milestones} compact />
                    </div>
                  ) : null}
                  <div className="mt-8">
                    <CtaLink href={p.href}>Open {p.type === "doctoral" ? "PhD research" : "programme"}</CtaLink>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <InDevelopment>No current research programmes are listed yet.</InDevelopment>
          )}
        </NumberedSection>

        <NumberedSection number={num()} title="Research areas" id="areas">
          <ul className="grid gap-x-12 border-t border-line md:grid-cols-2">
            {researchAreas.map((a, i) => (
              <li key={a.label} className="border-b border-line">
                <div className="flex min-h-16 items-baseline gap-5 py-4">
                  <span className="font-mono text-xs text-slate">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">
                    <span className="block font-serif text-[1.375rem] leading-snug md:text-2xl">{a.label}</span>
                    <span className="mt-1 block text-sm text-slate">{a.description}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </NumberedSection>

        {completed.length > 0 && (
          <NumberedSection number={num()} title="Completed research" id="completed">
            <ul className="border-t border-line">
              {completed.map((p) => (
                <li key={p.slug} className="border-b border-line py-5">
                  <Link href={p.href} className="font-serif text-2xl hover:text-link">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </NumberedSection>
        )}
      </div>
    </>
  );
}
