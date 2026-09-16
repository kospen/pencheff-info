import Link from "next/link";
import { Container, ExternalIcon, NumberedSection, PageHeader } from "@/components/editorial/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Entrepreneurship",
  path: "/entrepreneurship",
  description: "Entrepreneurship — CREATIVE DESTRUCTION VCC, co-founded by Kostadin Penchev and Ivan Zdravkov.",
});

const overview = [
  "CREATIVE DESTRUCTION VCC is a Bulgarian variable capital company established as a platform for developing and transforming ideas at the intersection of economics, technology and entrepreneurship.",
  "The company focuses on digital transformation, artificial intelligence, software development, business and economic analysis, research and innovation, and consulting related to European and national programmes.",
  "Its approach combines economic thinking with technological development, with an emphasis on turning emerging technologies and innovative ideas into practical and economically viable solutions for businesses and organisations.",
  "CREATIVE DESTRUCTION VCC also provides a framework for collaboration between business, research and technology, supporting the development of new concepts, digital products and innovation-driven initiatives.",
];

const founders = [
  {
    name: "Kostadin Penchev",
    role: "Co-founder",
    detail: "Economics · Research · European Projects · Digital Transformation",
  },
  {
    name: "Ivan Zdravkov",
    role: "Co-founder",
    website: "https://zdravkov.info/",
    websiteLabel: "zdravkov.info",
  },
];

export default function EntrepreneurshipPage() {
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <>
      <PageHeader eyebrow="Entrepreneurship" title="CREATIVE DESTRUCTION VCC" intro="Co-founded by Kostadin Penchev and Ivan Zdravkov." />
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 xl:px-16">
        <NumberedSection number={num()} title="About the company">
          <div className="prose-editorial max-w-[42rem] text-lg leading-relaxed md:text-xl">
            {overview.map((p, i) => (
              <p key={i} className={i > 0 ? "mt-5" : ""}>
                {p}
              </p>
            ))}
          </div>
        </NumberedSection>

        <NumberedSection number={num()} title="Founders">
          <ul className="grid gap-10 border-t border-line pt-8 sm:grid-cols-2">
            {founders.map((f) => (
              <li key={f.name}>
                <p className="font-serif text-2xl leading-snug">{f.name}</p>
                <p className="label mt-2 text-slate">{f.role}</p>
                {f.detail && <p className="mt-3 text-[0.9375rem] text-slate">{f.detail}</p>}
                {f.website && (
                  <a href={f.website} target="_blank" rel="noopener" className="text-link mt-3 inline-flex items-center gap-1.5 text-[0.9375rem]">
                    {f.websiteLabel} <ExternalIcon />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </NumberedSection>
      </div>
      <Container className="pb-16 md:pb-20">
        <p className="border-t border-navy pt-8 text-sm text-slate">
          For research, projects and financial management of European programmes, see{" "}
          <Link href="/about" className="text-link">
            About
          </Link>{" "}
          and{" "}
          <Link href="/projects" className="text-link">
            Projects
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
