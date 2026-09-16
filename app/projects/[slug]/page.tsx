import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow, MetaList, MoreLink, PlaceholderTag } from "@/components/editorial/primitives";
import { EntrySections, RelatedList } from "@/components/editorial/Sections";
import { formatPeriod, getProject, getProjects, projectCategoryLabel, relatedTo } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import type { EntryRef } from "@/lib/types";

type Params = { slug: string };

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    ...pageMetadata({ title: p.title, path: `/projects/${p.slug}`, description: p.summary }),
    ...(p.placeholder ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = relatedTo(`projects/${project.slug}` as EntryRef, project.related);
  const publications = related.filter((r) => r.ref.startsWith("publications/"));
  const others = related.filter((r) => !r.ref.startsWith("publications/"));

  const all = getProjects();
  const index = all.findIndex((p) => p.slug === project.slug);
  const next = all[index + 1];

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <span aria-hidden className="absolute inset-y-0 right-0 hidden w-[22%] bg-mist lg:block" />
        <Container className="relative py-12 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Eyebrow>
              <Link href="/projects" className="hover:text-navy">
                Projects
              </Link>{" "}
              / {projectCategoryLabel(project.category)}
            </Eyebrow>
          </div>
          {project.placeholder && <PlaceholderTag className="mt-8" />}
          <h1 className="mt-6 max-w-5xl font-serif text-[2.5rem] leading-[1.04] font-medium tracking-[-0.025em] md:text-[4rem]">{project.title}</h1>
          {project.summary && <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate md:text-xl">{project.summary}</p>}
          <div className="mt-10 max-w-5xl">
            <MetaList
              items={[
                { label: "Period", value: formatPeriod(project.period) },
                { label: "Role", value: project.roles?.join(", ") },
                { label: "Organisation", value: project.organisation },
                { label: "Programme", value: project.programme },
                { label: "Focus", value: project.focus },
                { label: "Grant", value: project.grantId },
                { label: "Partners", value: project.partners?.join(", ") },
                { label: "Location", value: project.location },
                { label: "Achievement", value: project.achievement },
              ]}
            />
          </div>
        </Container>
      </header>

      <Container>
        <EntrySections
          sections={[
            { key: "overview", title: "Overview", section: project.overview },
            { key: "context", title: "Context", section: project.context },
            { key: "objectives", title: "Objectives", section: project.objectives },
            { key: "my-role", title: "My role", section: project.myRole },
            { key: "work", title: "What we did", section: project.work },
            { key: "results", title: "Results", section: project.results },
            { key: "research-connection", title: "Research connection", section: project.researchConnection },
            {
              key: "outputs",
              title: "Outputs",
              section: project.outputs,
              custom: others.length ? <RelatedList items={others} /> : undefined,
            },
            { key: "publications", title: "Publications", custom: publications.length ? <RelatedList items={publications} /> : undefined },
            {
              key: "media",
              title: "Media",
              custom: project.media?.length ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {project.media.map((m) => (
                    <figure key={m.src}>
                      <Image src={m.src} alt={m.alt} width={m.width} height={m.height} sizes="(min-width: 1024px) 30rem, (min-width: 640px) 45vw, 100vw" className="aspect-[3/2] w-full border border-line object-cover" />
                      {(m.caption || m.credit) && (
                        <figcaption className="mt-2 text-xs text-slate">
                          {m.caption}
                          {m.credit ? ` · ${m.credit}` : ""}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              ) : undefined,
            },
          ]}
        />

        <nav aria-label="More projects" className="mt-6 flex flex-col gap-4 border-t border-navy pt-8 sm:flex-row sm:items-center sm:justify-between">
          <MoreLink href="/projects">All projects</MoreLink>
          {next && (
            <Link href={`/projects/${next.slug}`} className="group text-right">
              <span className="label block">Next project</span>
              <span className="font-serif text-xl group-hover:text-link">{next.title} →</span>
            </Link>
          )}
        </nav>
      </Container>
    </article>
  );
}
