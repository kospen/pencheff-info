import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { Container, CtaLink, Eyebrow } from "@/components/editorial/primitives";

/**
 * Homepage hero — layout follows the approved reference:
 * text left · colour cut-out portrait (natural, retouched) centre · farmland landscape right
 * with an italic quote and tag lists over it.
 */

const mask = (value: string): CSSProperties => ({
  maskImage: value,
  WebkitMaskImage: value,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
});

// Portrait: soft right edge only.
const portraitMask = mask("linear-gradient(to right, #000 0%, #000 88%, transparent 100%)");

// Landscape: pale sky at the top, soft left edge behind the portrait.
const landscapeMask = mask(
  "linear-gradient(to bottom, transparent 0%, #000 34%), linear-gradient(to right, transparent 0%, #000 14%)",
);

function TagList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`font-mono text-[0.75rem] leading-[1.9] tracking-[0.2em] uppercase ${className}`}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export function Hero() {
  const { hero } = site;
  return (
    <section aria-labelledby="hero-name" className="relative overflow-hidden xl:h-[40rem]">
      {/* ================================================= desktop layers (≥1280) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
        {/* pale diagonal field from the top */}
        <span className="absolute -top-16 left-[calc(max(0px,(100%-90rem)/2)+min(53%,47.7rem))] h-[80%] w-[24%] -skew-x-[22deg] bg-mist" />
        {/* landscape */}
        <div className="absolute inset-y-0 right-0 left-[calc(max(0px,(100%-90rem)/2)+min(51%,45.9rem))]" style={landscapeMask}>
          <Image
            src="/photo/hero-landscape.jpg"
            alt=""
            fill
            sizes="49vw"
            className="object-cover object-[50%_60%]"
          />
        </div>
        {/* vertical pale bar behind the head */}
        <span className="absolute top-2 left-[calc(max(0px,(100%-90rem)/2)+min(59%,53.1rem))] h-[27%] w-[6.2%] bg-soft/55" />
        {/* bottom-left wedge */}
        <span className="absolute bottom-0 left-0 h-24 w-20 bg-pastel/80 [clip-path:polygon(0_0,100%_100%,0_100%)]" />
        {/* portrait */}
        <div className="absolute -bottom-28 left-[calc(max(0px,(100%-90rem)/2)+29rem)] h-[43rem] w-[35.5rem] min-[90rem]:-bottom-32 min-[90rem]:left-[calc(max(0px,(100%-90rem)/2)+30rem)] min-[90rem]:h-[46rem] min-[90rem]:w-[38rem]">
          <Image
            src="/photo/portrait-hero-natural-retouched.png"
            alt=""
            fill
            sizes="(min-width: 1440px) 608px, 568px"
            className="object-contain object-bottom saturate-[0.85] contrast-[0.96]"
            style={portraitMask}
          />
        </div>
      </div>

      <Container className="relative h-full">
        {/* ================================================= text */}
        <div className="relative z-10 pt-10 pb-4 md:pt-14 xl:max-w-[26rem] xl:pt-[3.25rem] xl:pb-0 min-[90rem]:max-w-[31rem]">
          <Eyebrow>{site.eyebrow}</Eyebrow>
          <h1
            id="hero-name"
            className="mt-7 font-serif text-[clamp(3.75rem,7.6vw,7.25rem)] leading-[0.92] font-medium tracking-[-0.035em] md:mt-10"
          >
            Kostadin
            <br />
            Penchev
          </h1>
          <p className="mt-6 max-w-[27rem] font-serif text-[clamp(1.625rem,2.4vw,2.25rem)] leading-[1.14] tracking-[-0.01em] md:mt-7">
            {site.positioning}
          </p>
          <p className="mt-5 max-w-[26rem] text-[1.0625rem] leading-relaxed text-navy/80">{site.introduction}</p>
          <div className="mt-8 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-12 md:mt-10">
            <CtaLink href="/about" variant="secondary">
              About me
            </CtaLink>
          </div>
        </div>

        {/* ================================================= desktop editorial notes */}
        <aside aria-label="Editorial notes" className="absolute inset-y-0 right-16 z-10 hidden w-[17rem] xl:block">
          {hero.quote && (
            <figure className="absolute top-12 left-0">
              <span aria-hidden className="block h-0.5 w-12 bg-cyan" />
              <blockquote className="mt-6 font-serif text-[1.5rem] leading-[1.22] text-navy italic">{hero.quote}</blockquote>
            </figure>
          )}
          <div className="absolute top-[15.5rem] left-0 border-l border-cyan py-2 pl-6 text-navy">
            <TagList items={hero.tagsTop} />
          </div>
          <div className="absolute right-0 bottom-9 w-[7rem] text-white [text-shadow:0_1px_6px_rgba(16,40,59,0.45)]">
            <span aria-hidden className="block h-px w-full bg-white/80" />
            <TagList items={hero.tagsBottom} className="mt-4" />
          </div>
        </aside>

        {/* ================================================= mobile / tablet image */}
        <div className="relative -mx-6 mt-6 h-[28rem] overflow-hidden sm:h-[32rem] md:-mx-10 md:h-[38rem] xl:hidden">
          <div className="absolute inset-0" style={mask("linear-gradient(to bottom, transparent 0%, #000 30%)")}>
            <Image src="/photo/hero-landscape.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_65%]" />
          </div>
          <div className="absolute -bottom-20 left-1/2 h-[calc(100%+5rem)] w-[calc(100%+4rem)] max-w-[35rem] -translate-x-1/2">
            <Image
              src="/photo/portrait-hero-natural-retouched.png"
              alt="Portrait of Kostadin Penchev in a navy jacket and white shirt, resting his chin on his hand."
              fill
              sizes="(min-width: 640px) 480px, 100vw"
              className="object-contain object-bottom saturate-[0.85] contrast-[0.96]"
              style={portraitMask}
            />
          </div>
        </div>

        {/* accessible description of the desktop portrait */}
        <p className="sr-only">Portrait of Kostadin Penchev in a navy jacket and white shirt, resting his chin on his hand, in front of a farmland landscape.</p>
      </Container>
    </section>
  );
}

/** Thin strip under the core areas: latest update + motto. */
export function LatestUpdateStrip({ date, dateLabel, text }: { date: string; dateLabel: string; text: string }) {
  return (
    <Container>
      <div className="flex flex-col gap-4 border-b border-line py-6 md:flex-row md:items-center md:justify-between">
        <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="label">Latest update</span>
          <span aria-hidden className="size-2 rounded-full bg-cyan" />
          <time dateTime={date} className="text-[0.9375rem] text-navy">
            {dateLabel}
          </time>
          <span aria-hidden className="hidden h-6 w-px bg-line sm:block" />
          <span className="text-[0.9375rem] text-navy/80">{text}</span>
        </p>
        <p className="label hidden items-center gap-4 lg:flex">
          <span aria-hidden className="h-px w-12 bg-cyan" />
          {site.hero.motto.map((m, i) => (
            <span key={m} className="flex items-center gap-4 text-navy">
              {m}
              {i < site.hero.motto.length - 1 && <span aria-hidden className="text-cyan-deep">→</span>}
            </span>
          ))}
        </p>
      </div>
    </Container>
  );
}
