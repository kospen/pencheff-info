import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow, InDevelopment, StatusMark } from "@/components/editorial/primitives";
import { RelatedList } from "@/components/editorial/Sections";
import { StageTimeline } from "@/components/research/StageTimeline";
import { formatDate, getProgrammes, relatedTo } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import type { EntryRef } from "@/lib/types";

type Params = { programme: string };

export function generateStaticParams() {
  return getProgrammes().map((p) => ({ programme: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { programme } = await params;
  const p = getProgrammes().find((x) => x.slug === programme);
  if (!p) return {};
  return pageMetadata({
    title: p.type === "doctoral" ? "PhD Research" : p.title,
    path: p.href,
    description: `${p.title}. ${p.summary ?? ""}`.trim(),
  });
}

const statusText = { planned: "Planned", active: "In progress", completed: "Completed", archived: "Archived" } as const;

export default async function ProgrammePage({ params }: { params: Promise<Params> }) {
  const { programme } = await params;
  const p = getProgrammes().find((x) => x.slug === programme);
  if (!p) notFound();

  const ref = `research/${p.slug}` as EntryRef;
  const related = relatedTo(ref, p.related);
  const outputs = related.filter((r) => r.ref.startsWith("publications/") || r.ref.startsWith("activity/"));
  const relatedWork = related.filter((r) => r.ref.startsWith("projects/") || r.ref.startsWith("ventures/"));
  const latest = [...(p.notes ?? [])].sort((a, b) => b.date.localeCompare(a.date))[0];

  // Document outline: authored sections + generated ones.
  const docSections = (p.sections ?? []).map((s) => ({ ...s, kind: "text" as const }));
  const generated = [
    { id: "progress", title: "Research progress", ready: !!p.milestones?.some((m) => m.status !== "unconfirmed") },
    { id: "outputs", title: "Research outputs", ready: outputs.some((o) => !o.placeholder) },
    { id: "related", title: "Related projects", ready: relatedWork.some((o) => !o.placeholder) },
    { id: "latest", title: "Latest update", ready: !!latest },
  ];
  const outline = [
    ...docSections.map((s) => ({ id: s.id, number: s.number, title: s.title, ready: !!(s.body?.length || s.items?.length || s.pairs?.length || (s.id === "questions" && p.questions?.length)) })),
    ...generated.map((g, i) => ({ id: g.id, number: String(docSections.length + i + 1).padStart(2, "0"), title: g.title, ready: g.ready })),
  ];
  const numberOf = (id: string) => outline.find((o) => o.id === id)?.number ?? "";

  const isPhd = p.type === "doctoral";

  return (
    <article>
      {/* Document header */}
      <header className="relative overflow-hidden border-b border-line">
        <span aria-hidden className="absolute inset-y-0 right-0 hidden w-[22%] bg-mist lg:block" />
        <Container className="relative py-14 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Eyebrow>
              <Link href="/research" className="hover:text-navy">
                Research
              </Link>{" "}
              / {isPhd ? "PhD Research" : "Programme"}
            </Eyebrow>
            {p.lastUpdated && (
              <p className="label">
                Last updated <time dateTime={p.lastUpdated}>{formatDate(p.lastUpdated)}</time>
              </p>
            )}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <StatusMark label={statusText[p.status]} tone={p.status === "active" ? "active" : "done"} />
          </div>
          <h1 className="mt-4 max-w-5xl font-serif text-[2.25rem] leading-[1.06] font-medium tracking-[-0.025em] md:text-[3.5rem] lg:text-[4.25rem]">
            {p.title}
          </h1>
          {p.titleLocal && (
            <p lang={p.titleLocal.lang} className="mt-6 max-w-4xl font-serif text-xl leading-snug text-slate italic md:text-2xl">
              „{p.titleLocal.text}“
            </p>
          )}

          <dl className="mt-10 grid max-w-5xl grid-cols-1 border-y border-line py-4 sm:grid-cols-2 lg:grid-cols-3">
            {(p.meta ?? []).map((m) => (
              <div key={m.label} className="flex flex-col gap-0.5 py-2.5 sm:pr-8">
                <dt className="label">{m.label}</dt>
                <dd className={`text-[0.9375rem] ${m.value ? "" : "text-slate italic"}`}>{m.value ?? "To be added"}</dd>
              </div>
            ))}
          </dl>

        </Container>
      </header>

      <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
        {/* Contents */}
        <nav aria-label="Contents" className="lg:col-span-3">
          <div className="lg:sticky lg:top-8">
            <p className="label">Contents</p>
            <ol className="mt-4 border-t border-line">
              {outline.map((o) => (
                <li key={o.id} className="border-b border-line">
                  <a href={`#${o.id}`} className="group flex min-h-11 items-center gap-3 py-1.5 text-[0.9375rem] hover:text-link">
                    <span className="w-6 font-mono text-xs text-slate">{o.number}</span>
                    <span className="flex-1">{o.title}</span>
                    <span
                      aria-label={o.ready ? "Written" : "In development"}
                      className={`size-1.5 rounded-full ${o.ready ? "bg-cyan" : "border border-dashed border-slate"}`}
                    />
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-4 flex items-center gap-2 text-xs text-slate">
              <span className="size-1.5 rounded-full bg-cyan" /> written
              <span className="ml-3 size-1.5 rounded-full border border-dashed border-slate" /> in development
            </p>
          </div>
        </nav>

        {/* Document body */}
        <div className="lg:col-span-9">
          {docSections.map((s) => (
            <DocBlock key={s.id} id={s.id} number={s.number} title={s.title}>
              {s.id === "questions" && p.questions?.length ? (
                <ol className="flex flex-col gap-6">
                  {p.questions.map((q) => (
                    <li key={q.id} className="grid grid-cols-[3.5rem_1fr] gap-4">
                      <span className="pt-1 font-mono text-sm text-link">{q.id}</span>
                      <div>
                        <p className="font-serif text-2xl leading-snug">{q.question}</p>
                        {q.sub?.length ? (
                          <ol className="mt-3 flex flex-col gap-1.5 text-slate">
                            {q.sub.map((sq, i) => (
                              <li key={i}>
                                <span className="mr-2 font-mono text-xs">
                                  {q.id}.{i + 1}
                                </span>
                                {sq}
                              </li>
                            ))}
                          </ol>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              ) : s.body?.length || s.items?.length || s.pairs?.length ? (
                <div className="prose-editorial max-w-[68ch] text-[1.0625rem] leading-relaxed">
                  {s.body?.map((para, i) => <p key={i}>{para}</p>)}
                  {s.pairs?.length ? (
                    <dl className="mt-4 grid gap-6 md:grid-cols-2">
                      {s.pairs.map((pair) => (
                        <div key={pair.label} className="border-t border-cyan pt-3">
                          <dt className="label">{pair.label}</dt>
                          <dd className="mt-2">{pair.text}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  {s.items?.length ? (
                    <ul className="mt-3 flex flex-col gap-2">
                      {s.items.map((it, i) => (
                        <li key={i} className="flex gap-3">
                          <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-cyan" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : (
                <InDevelopment />
              )}
            </DocBlock>
          ))}

          <DocBlock id="progress" number={numberOf("progress")} title="Research progress">
            {p.milestones?.length ? <StageTimeline milestones={p.milestones} /> : <InDevelopment />}
          </DocBlock>

          <DocBlock id="outputs" number={numberOf("outputs")} title="Research outputs">
            {outputs.length ? <RelatedList items={outputs} /> : <InDevelopment>Publications, conference papers, presentations and datasets will appear here.</InDevelopment>}
          </DocBlock>

          <DocBlock id="related" number={numberOf("related")} title="Related projects">
            {relatedWork.length ? <RelatedList items={relatedWork} /> : <InDevelopment>Related projects will appear here.</InDevelopment>}
          </DocBlock>

          <DocBlock id="latest" number={numberOf("latest")} title="Latest update">
            {latest ? (
              <div className="border-l-2 border-cyan pl-5">
                <p className="label">
                  <time dateTime={latest.date}>{formatDate(latest.date)}</time> · {latest.type.replace("-", " ")}
                </p>
                <p className="mt-2 font-serif text-2xl">{latest.title}</p>
                {latest.summary && <p className="mt-2 text-slate">{latest.summary}</p>}
              </div>
            ) : (
              <InDevelopment>Research notes and updates will be published here.</InDevelopment>
            )}
          </DocBlock>

        </div>
      </Container>
    </article>
  );
}

function DocBlock({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-8 border-t border-line pt-8 pb-12 md:pb-14">
      <p className="label flex items-center gap-3">
        <span className="text-navy">{number}</span>
        <span aria-hidden className="h-px w-7 bg-cyan" />
      </p>
      <h2 id={`${id}-title`} className="mt-3 mb-6 font-serif text-[1.875rem] leading-tight tracking-[-0.01em] md:text-[2.25rem]">
        {title}
      </h2>
      {children}
    </section>
  );
}
