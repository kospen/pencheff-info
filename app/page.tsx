import Link from "next/link";
import { Hero, LatestUpdateStrip } from "@/components/home/Hero";
import { currentFocus } from "@/content/current-focus";
import { CoreAreas } from "@/components/home/CoreAreas";
import { Container, Eyebrow, MoreLink, SectionHeading, CtaLink } from "@/components/editorial/primitives";
import { PublicationRow } from "@/components/publications/PublicationList";
import { ActivityList } from "@/components/timeline/ActivityList";
import { StageTimeline } from "@/components/research/StageTimeline";
import { Reveal } from "@/components/media/Reveal";
import { phd, researchAreas } from "@/content/research";
import { site, profileLabels } from "@/content/site";
import { getSelectedActivity, getPublications } from "@/lib/content";
import { StatusMark } from "@/components/editorial/primitives";

export default function HomePage() {
  const publications = getPublications();
  const featuredPubs = (publications.filter((p) => p.featured).length ? publications.filter((p) => p.featured) : publications).slice(0, 2);
  const activity = getSelectedActivity(3);
  const profiles = (Object.keys(site.profiles) as (keyof typeof site.profiles)[]).filter((k) => site.profiles[k]);

  return (
    <>
      <Hero />
      <CoreAreas />
      <LatestUpdateStrip
        date={currentFocus.updated}
        dateLabel={new Date(`${currentFocus.updated}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}
        text={currentFocus.latest}
      />

      {/* Research */}
      <section aria-labelledby="research-title" className="pt-20 md:pt-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>Research</Eyebrow>
                <h2 id="research-title" className="mt-5 font-serif text-[2.375rem] leading-[1.05] tracking-[-0.02em] md:text-[3.25rem]">
                  Research
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate md:text-lg">
                  My research focuses on the economic dimensions of digital transformation, agricultural entrepreneurship, technology adoption and investment decisions.
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate md:text-lg">
                  Since March 2025, I have been pursuing doctoral studies in economics at Trakia University, Faculty of Economics.
                </p>
                <div className="mt-6">
                  <MoreLink href="/research">All research</MoreLink>
                </div>
              </Reveal>
              <p className="label mt-10 border-t border-line pt-6">Research Focus</p>
              <ul>
                {researchAreas.map((a, i) => (
                  <li key={a.label} className="border-b border-line">
                    <span className="flex min-h-12 items-baseline gap-4 py-2.5">
                      <span className="font-mono text-xs text-slate">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-serif text-lg">{a.label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* PhD preview — the visual signature of the research section */}
            <Reveal className="lg:col-span-8">
              <article className="relative border border-line bg-card p-6 md:p-10 lg:p-12">
                <span aria-hidden className="absolute top-0 left-0 h-0.5 w-24 bg-cyan" />
                <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="label text-navy!">PhD Research</span>
                  <StatusMark label="In progress" tone="active" />
                </p>
                <h3 className="mt-6 font-serif text-[1.75rem] leading-[1.12] tracking-[-0.015em] md:text-[2.5rem]">
                  <Link href="/research/phd" className="hover:text-link">
                    {phd.title}
                  </Link>
                </h3>
                <div className="mt-4 flex flex-col gap-0.5 text-[0.9375rem] text-slate">
                  <p>
                    {phd.institution} · {phd.faculty}
                  </p>
                  {phd.department && <p>{phd.department}</p>}
                  {phd.supervisor && <p>Scientific Supervisor · {phd.supervisor}</p>}
                </div>
                <div className="mt-10 border-t border-line pt-8">
                  <StageTimeline milestones={phd.milestones ?? []} compact />
                </div>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Publications & talks */}
      {(featuredPubs.length > 0 || activity.length > 0) && (
      <section aria-labelledby="pubs-title" className="pt-20 md:pt-28">
        <Container>
          <Reveal>
            <SectionHeading id="pubs-title" eyebrow="Outputs" title="Publications & talks" />
          </Reveal>
          <div className="mt-10 grid gap-12 md:mt-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="label border-b border-navy pb-3">Publications</p>
              {featuredPubs.length === 0 && <p className="py-5 text-[0.9375rem] text-slate italic">Publications are in preparation.</p>}
              <ul>
                {featuredPubs.map((p) => (
                  <PublicationRow key={p.slug} p={p} />
                ))}
              </ul>
              <div className="mt-4">
                <MoreLink href="/publications">All publications</MoreLink>
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="label border-b border-navy pb-3">Recent activity</p>
              {activity.length === 0 && <p className="py-5 text-[0.9375rem] text-slate italic">Conferences and presentations will be listed here.</p>}
              <ActivityList items={activity} compact />
              <div className="mt-4">
                <MoreLink href="/activity">View all activity</MoreLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
      )}

      {/* Entrepreneurship */}
      <section aria-labelledby="tech-title" className="pt-20 md:pt-28">
        <Container>
          <Reveal>
            <SectionHeading id="tech-title" eyebrow="Entrepreneurship" title="CREATIVE DESTRUCTION VCC" intro="Co-founded with Ivan Zdravkov." />
          </Reveal>
          <div className="mt-10 max-w-2xl md:mt-12">
            <p className="text-base leading-relaxed text-slate md:text-lg">
              A Bulgarian variable capital company focused on digital transformation, artificial intelligence, software, research and innovation, and the development of economically viable technology-driven solutions.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate md:text-lg">
              My work in CREATIVE DESTRUCTION VCC connects entrepreneurship with my broader interests in economics, digital transformation and innovation.
            </p>
            <div className="mt-6">
              <MoreLink href="/entrepreneurship">Learn more</MoreLink>
            </div>
          </div>
        </Container>
      </section>

      {/* About & contact */}
      <section aria-labelledby="about-title" className="pt-20 md:pt-28">
        <Container>
          <div className="grid gap-10 border-t border-navy pt-10 md:grid-cols-12 md:gap-16 md:pt-14">
            <div className="md:col-span-7">
              <Eyebrow>About</Eyebrow>
              <h2 id="about-title" className="mt-5 font-serif text-[2rem] leading-tight tracking-[-0.015em] md:text-[2.75rem]">
                Economist, researcher and project professional.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate md:text-lg">
                My work brings together economics, research and practical experience in European projects, with a particular focus on digital transformation, agricultural entrepreneurship, investment and innovation.
              </p>
              <div className="mt-6">
                <CtaLink href="/about">About Kostadin</CtaLink>
              </div>
            </div>
            <div className="md:col-span-5">
              <p className="label">Contact</p>
              <p className="mt-3 font-serif text-xl">Get in touch</p>
              {site.contact.email ? (
                <a href={`mailto:${site.contact.email}`} className="text-link mt-3 inline-block font-serif text-2xl">
                  {site.contact.email}
                </a>
              ) : (
                <p className="mt-3 text-[0.9375rem] text-slate">
                  For research collaboration and projects — see the{" "}
                  <Link href="/contact" className="text-link">
                    contact page
                  </Link>
                  .
                </p>
              )}
              {profiles.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {profiles.map((k) => (
                    <li key={k}>
                      <a href={site.profiles[k]} target="_blank" rel="me noopener" className="text-link text-sm">
                        {profileLabels[k]}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
