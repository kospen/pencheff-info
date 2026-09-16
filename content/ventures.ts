import type { Venture } from "@/lib/types";

/**
 * ENTREPRENEURSHIP — companies, products, initiatives, experiments,
 * collaborations. Documented as part of the professional record,
 * not as a sales page.
 *
 * PLACEHOLDERS below: replace with confirmed names, roles, periods and links.
 */
export const ventures: Venture[] = [
  {
    slug: "placeholder-company-a",
    placeholder: true,
    featured: true,
    type: "company",
    status: "active",
    title: "[Company name]",
    roles: ["[Role — to confirm]"],
    period: { start: "[YYYY]", end: null },
    summary: "[One sentence: what the company does.]",
    themes: ["software", "artificial-intelligence"],
  },
  {
    slug: "placeholder-company-b",
    placeholder: true,
    featured: true,
    type: "company",
    status: "active",
    title: "[Company name]",
    roles: ["[Role — to confirm]"],
    period: { start: "[YYYY]", end: null },
    summary: "[One sentence: what the company does.]",
    themes: ["software", "digital-products"],
  },
  {
    slug: "placeholder-initiative",
    placeholder: true,
    type: "experiment",
    status: "exploring",
    title: "[Initiative or experiment]",
    roles: ["[Role]"],
    period: { start: "[YYYY]" },
    summary: "[One sentence.]",
    themes: ["innovation"],
  },
];
