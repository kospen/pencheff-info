import type { Role } from "@/lib/types";

/**
 * ABOUT — keep it concise. The full CV is a PDF (site.cv).
 */
export const about = {
  portrait: {
    src: "/photo/portrait-about.jpg",
    width: 1122,
    height: 1402,
    alt: "Black-and-white portrait of Kostadin Penchev, seated, in a dark jacket and white shirt.",
  },
  /** Short biography — paragraphs. */
  biography: [
    "Kostadin Penchev is based in Stara Zagora, Bulgaria. His professional experience spans financial risk analysis, organisational management, European project development and economic research. Since March 2025, he has been pursuing doctoral studies in economics at Trakia University.",
    "He began his career in financial risk analysis and capital adequacy oversight at Zagora Finacorp. He then spent nearly nine years in administrative management in the education sector, working across budgets, payroll, resource allocation and organisational planning.",
    "Between 2019 and July 2024, he worked at the Stara Zagora Regional Economic Development Agency. His work developed from international programme and project preparation to financial management, reporting and coordination across European projects.",
    "During this period, he was involved in projects supported by Interreg Europe, Horizon Europe, LIFE and Erasmus+, covering regional economic development, innovation, SME competitiveness, the transition of coal-intensive regions, sustainability, skills development and digitalisation.",
    "His current academic work focuses on the economic dimensions of digital transformation, with particular attention to agricultural economics and entrepreneurship, technology adoption, investment decisions and the economic value created by digital technologies.",
    "His doctoral research examines the digital transformation of agricultural entrepreneurship in Bulgaria, connecting economic theory with the practical decisions faced by agricultural enterprises when adopting new technologies.",
    "Alongside his academic work, he continues to develop technology, innovation and entrepreneurial initiatives. His recent work includes deep-tech and artificial intelligence concepts, European research and innovation proposals, and projects exploring how digital technologies can create measurable economic value for enterprises.",
    "In 2026, the PDGA deep-tech AI proposal submitted by CREATIVE DESTRUCTION VCC under the Horizon Europe WIDERA / EIC Pre-Accelerator received a Horizon Europe Seal of Excellence.",
    "Across research, European projects and entrepreneurship, his work is centred on a common question: how technological change can be translated into economically viable investment, stronger enterprises and sustainable regional development.",
  ],
  biographyPlaceholderFrom: 9,
  academicBackground: [
    { period: "Mar 2025 —", text: "Doctoral studies in Economics — Trakia University, Stara Zagora" },
    { period: "Oct 2016 — Oct 2017", text: "Pedagogical Qualification — Trakia University, Stara Zagora" },
    { period: "Mar 2008 — May 2009", text: "Master’s Degree in Financial Management — Dimitar A. Tsenov Academy of Economics, Svishtov" },
    { period: "Feb — May 2006", text: "Financial Analyst qualification — Institute for Postgraduate Qualification at UNWE, Sofia" },
    { period: "Aug 2004 — Jan 2008", text: "Master’s Degree in Marketing — Dimitar A. Tsenov Academy of Economics, Svishtov" },
    { period: "Aug 1999 — Aug 2004", text: "Bachelor’s Degree in Accounting and Control — Dimitar A. Tsenov Academy of Economics, Svishtov" },
  ] as { period: string; text: string; placeholder?: boolean }[],
  professionalBackground: [
    {
      period: "Oct 2020 — Jul 2024",
      text: "Financial Manager — Stara Zagora Regional Economic Development Agency. Project budgeting, expenditure monitoring, financial reporting, audit support and coordination with funding bodies and partners.",
    },
    {
      period: "Jan 2019 — Oct 2020",
      text: "International Programs and Projects Expert — Stara Zagora Regional Economic Development Agency. Funding opportunities, grant proposals, project planning, partner engagement and monitoring.",
    },
    {
      period: "Mar 2010 — Jan 2019",
      text: "Deputy Director of Administrative Affairs — Second Primary School, Stara Zagora. Administrative operations, budgeting, payroll and resource planning.",
    },
    {
      period: "Jan 2008 — Sep 2009",
      text: "Risk Analyst — Zagora Finacorp, Stara Zagora. Financial risk analysis and capital adequacy oversight in securities and financial markets.",
    },
  ] as { period: string; text: string; placeholder?: boolean }[],
  selectedExperience: [
    {
      text: "Financial management of European projects supported by Interreg Europe, Erasmus, Horizon Europe and LIFE+.",
      href: "/projects",
    },
    { text: "Consortium-level financial management for DeCarb, alongside organisation-level financial responsibilities on other European projects." },
    { text: "International project development, grant preparation and cooperation with partners from different national and institutional backgrounds." },
    { text: "Administrative and financial management in education, including budgeting, payroll and operational planning." },
  ] as { text: string; href?: string }[],
};

/** Roles feed About → Current Roles and the professional timeline. */
export const roles: Role[] = [
  {
    slug: "phd-researcher-trakia",
    kind: "academic",
    current: true,
    title: "PhD Candidate",
    organisation: "Trakia University",
    period: { start: "2025-03", end: null },
    related: ["research/phd"],
  },
  {
    slug: "reda-financial-manager",
    kind: "professional",
    title: "Financial Manager",
    organisation: "Stara Zagora Regional Economic Development Agency",
    period: { start: "2020-10", end: "2024-07" },
  },
  {
    slug: "reda-projects-expert",
    kind: "professional",
    title: "International Programs and Projects Expert",
    organisation: "Stara Zagora Regional Economic Development Agency",
    period: { start: "2019-01", end: "2020-10" },
  },
  {
    slug: "school-deputy-director",
    kind: "professional",
    title: "Deputy Director of Administrative Affairs",
    organisation: "Second Primary School, Stara Zagora",
    period: { start: "2010-03", end: "2019-01" },
  },
  {
    slug: "zagora-risk-analyst",
    kind: "professional",
    title: "Risk Analyst",
    organisation: "Zagora Finacorp",
    period: { start: "2008-01", end: "2009-09" },
  },
  {
    slug: "masters-financial-management",
    kind: "academic",
    title: "Master’s Degree in Financial Management",
    organisation: "Dimitar A. Tsenov Academy of Economics",
    period: { start: "2008-03", end: "2009-05" },
  },
  {
    slug: "masters-marketing",
    kind: "academic",
    title: "Master’s Degree in Marketing",
    organisation: "Dimitar A. Tsenov Academy of Economics",
    period: { start: "2004-08", end: "2008-01" },
  },
  {
    slug: "bachelors-accounting",
    kind: "academic",
    title: "Bachelor’s Degree in Accounting and Control",
    organisation: "Dimitar A. Tsenov Academy of Economics",
    period: { start: "1999-08", end: "2004-08" },
  },
  {
    slug: "financial-analyst-qualification",
    kind: "academic",
    title: "Financial Analyst qualification",
    organisation: "Institute for Postgraduate Qualification at UNWE",
    period: { start: "2006-02", end: "2006-05" },
  },
  {
    slug: "pedagogical-qualification",
    kind: "academic",
    title: "Pedagogical Qualification",
    organisation: "Trakia University",
    period: { start: "2016-10", end: "2017-10" },
  },
];
