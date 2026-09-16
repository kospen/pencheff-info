import { Container, Eyebrow, ExternalIcon, InDevelopment } from "@/components/editorial/primitives";
import { CopyButton } from "@/components/editorial/CopyButton";
import { profileLabels, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  path: "/contact",
  description: "Contact Kostadin Penchev for research collaboration, European projects and academic exchange.",
});

export default function ContactPage() {
  const profiles = (Object.keys(site.profiles) as (keyof typeof site.profiles)[]).filter((k) => site.profiles[k]);
  return (
    <section>
      <Container className="grid gap-16 py-16 md:grid-cols-12 md:gap-10 md:py-24 lg:py-32">
        <div className="md:col-span-7">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-6 font-serif text-[2.75rem] leading-[1] font-medium tracking-[-0.03em] md:text-[4.25rem] lg:text-[5.25rem]">Let&rsquo;s connect.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate md:text-xl">
            For research collaboration, European projects, academic exchange and professional enquiries.
          </p>

          <div className="mt-16 border-t border-navy md:mt-24">
            <div className="grid gap-3 border-b border-line py-8 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <p className="label">E-mail</p>
              {site.contact.email ? (
                <div className="flex flex-wrap items-center gap-4">
                  <a href={`mailto:${site.contact.email}`} className="text-link font-serif text-[1.3125rem] [overflow-wrap:anywhere] sm:text-2xl md:text-3xl">
                    {site.contact.email}
                  </a>
                  <CopyButton value={site.contact.email} />
                </div>
              ) : (
                <InDevelopment>A public e-mail address will be added.</InDevelopment>
              )}
            </div>
            <div className="grid gap-3 border-b border-line py-8 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <p className="label">Profiles</p>
              {profiles.length ? (
                <ul className="flex flex-col gap-1">
                  {profiles.map((k) => (
                    <li key={k}>
                      <a href={site.profiles[k]} target="_blank" rel="me noopener" className="group inline-flex min-h-11 items-center gap-2 font-serif text-xl hover:text-link">
                        {profileLabels[k]} <ExternalIcon className="text-slate" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <InDevelopment>ORCID, Google Scholar, ResearchGate, LinkedIn and GitHub will be listed once confirmed.</InDevelopment>
              )}
            </div>
            {site.location && (
              <div className="grid gap-3 border-b border-line py-8 sm:grid-cols-[10rem_1fr] sm:items-baseline">
                <p className="label">Based in</p>
                <p className="text-lg">{site.location}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right column intentionally left open — a quiet editorial counterweight, not a space to fill. */}
        <div aria-hidden className="hidden md:col-span-4 md:col-start-9 md:block">
          <span className="ml-auto block h-40 w-px bg-cyan/40" />
        </div>
      </Container>
    </section>
  );
}
