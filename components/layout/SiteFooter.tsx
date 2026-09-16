import Link from "next/link";
import { mainNav, secondaryNav } from "@/content/navigation";
import { profileLabels, site } from "@/content/site";
import { ExternalIcon } from "@/components/editorial/primitives";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  const profiles = (Object.keys(site.profiles) as (keyof typeof site.profiles)[]).filter((k) => site.profiles[k]);
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-mist md:mt-32">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 py-14 md:grid-cols-12 md:px-10 md:py-20 xl:px-16">
        <div className="md:col-span-5">
          <Wordmark className="text-2xl" />
          <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-slate">{site.name} — {site.positioning}</p>
          {site.contact.email && (
            <p className="mt-6">
              <a className="text-link" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </p>
          )}
        </div>

        <nav aria-label="Footer" className="md:col-span-4">
          <p className="label">Sections</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6">
            {[...mainNav.filter((n) => n.href !== "/"), ...secondaryNav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex min-h-10 items-center text-[0.9375rem] text-navy hover:text-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="label">{profiles.length ? "Profiles" : "Contact"}</p>
          {profiles.length ? (
            <ul className="mt-4">
              {profiles.map((k) => (
                <li key={k}>
                  <a href={site.profiles[k]} rel="me noopener" target="_blank" className="inline-flex min-h-10 items-center gap-2 text-[0.9375rem] hover:text-link">
                    {profileLabels[k]} <ExternalIcon className="text-slate" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-[0.9375rem] text-slate">
              <Link href="/contact" className="text-link">
                Get in touch →
              </Link>
            </p>
          )}
        </div>
      </div>
      <div className="border-t border-line-mist">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 px-6 py-6 font-mono text-[0.6875rem] tracking-[0.12em] text-slate uppercase sm:flex-row sm:justify-between md:px-10 xl:px-16">
          <span>
            © {year} {site.name}
          </span>
          <span>{site.domain}</span>
        </div>
      </div>
    </footer>
  );
}
