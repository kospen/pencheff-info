import { Container, CtaLink, Eyebrow } from "@/components/editorial/primitives";

export default function NotFound() {
  return (
    <Container className="py-24 md:py-36">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-6 font-serif text-[3rem] leading-none font-medium tracking-[-0.03em] md:text-[5rem]">Page not found</h1>
      <p className="mt-6 max-w-lg text-lg text-slate">The page may have moved. The archive is organised by research, projects, publications and activity.</p>
      <div className="mt-10">
        <CtaLink href="/">Back to the homepage</CtaLink>
      </div>
    </Container>
  );
}
