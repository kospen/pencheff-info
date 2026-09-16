import Link from "next/link";
import { currentFocus } from "@/content/current-focus";
import { site } from "@/content/site";
import { formatDate } from "@/lib/content";
import { Container, DotLabel, PlaceholderTag } from "@/components/editorial/primitives";

/** Reusable "Now" section. Data: content/current-focus.ts */
export function CurrentFocus({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const items = currentFocus.items.filter((i) => !i.placeholder || site.showPlaceholders);
  if (!items.length) return null;
  const Heading = headingLevel;
  return (
    <section aria-labelledby="now-title" className="bg-mist">
      <Container className="grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <DotLabel>Now</DotLabel>
          <Heading id="now-title" className="mt-4 font-serif text-[2.375rem] leading-[1.05] font-normal tracking-[-0.02em] md:mt-5 md:text-[3.25rem]">
            Current focus
          </Heading>
          <p className="mt-4 max-w-sm text-base text-slate md:mt-5">
            What is happening now across research, projects, technology and ventures.
          </p>
          <p className="label mt-6">
            Updated <time dateTime={currentFocus.updated}>{formatDate(currentFocus.updated)}</time>
          </p>
        </div>
        <ul className="border-t border-line-mist lg:col-span-8">
          {items.map((item) => (
            <li
              key={item.label}
              className="grid gap-2 border-b border-line-mist py-5 md:grid-cols-[11rem_minmax(0,1fr)_auto] md:items-baseline md:gap-6 md:py-6"
            >
              <span className="label text-link!">{item.label}</span>
              <span className={`font-serif text-xl leading-snug md:text-2xl ${item.placeholder ? "text-slate" : ""}`}>
                {item.text}
                {item.placeholder && <PlaceholderTag className="ml-3 align-middle" />}
              </span>
              {item.href && item.linkLabel ? (
                <Link href={item.href} className="text-link inline-flex min-h-11 items-center text-sm md:justify-self-end">
                  {item.linkLabel} →
                </Link>
              ) : (
                <span />
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
