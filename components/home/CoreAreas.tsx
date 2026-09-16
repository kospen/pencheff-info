import Link from "next/link";
import { coreAreas } from "@/content/navigation";
import { ArrowIcon, Container } from "@/components/editorial/primitives";
import { AreaIcon } from "@/components/editorial/icons";

/** Four editorial entry points — thin rules, no cards. */
export function CoreAreas() {
  return (
    <section aria-label="Core areas">
      <Container>
        <ul className="grid border-b border-line sm:grid-cols-2 xl:grid-cols-4">
          {coreAreas.map((a, i) => (
            <li
              key={a.href}
              className={`border-line ${i > 0 ? "border-t sm:border-t-0" : ""} ${i % 2 === 0 ? "sm:border-r" : ""} ${i >= 2 ? "sm:border-t xl:border-t-0" : ""} ${i === 1 ? "xl:border-r" : ""} ${i === 3 ? "xl:border-r-0" : ""}`}
            >
              <Link
                href={a.href}
                className={`group flex h-full flex-col py-7 transition-colors hover:bg-card md:py-9 ${i % 2 === 0 ? "sm:pr-8" : "sm:pl-8"} ${i === 0 ? "xl:pr-8" : ""} ${i === 1 ? "xl:pr-8 xl:pl-8" : ""} ${i === 2 ? "xl:pr-8 xl:pl-8" : ""} ${i === 3 ? "xl:pl-8" : ""}`}
              >
                <span className="flex items-center gap-8">
                  <span className="flex flex-col gap-2 font-mono text-[0.8125rem] text-navy">
                    {a.number}
                    <span aria-hidden className="h-px w-10 bg-line transition-all duration-300 group-hover:w-14 group-hover:bg-cyan" />
                  </span>
                  <span aria-hidden className="grid size-14 place-items-center rounded-full bg-mist">
                    <AreaIcon name={a.icon} className="[&]:stroke-cyan-deep" />
                  </span>
                </span>
                <span className="mt-6 font-serif text-[1.75rem] leading-tight tracking-[-0.01em] md:mt-7 md:text-[2rem]">{a.title}</span>
                <span className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-slate">{a.description}</span>
                <span className="mt-auto pt-6">
                  <ArrowIcon />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
