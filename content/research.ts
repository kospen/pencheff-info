import type { ResearchProgramme, ResearchQuestion } from "@/lib/types";

/**
 * Research — all research activity, not only the PhD.
 * Programmes share one page template (/research/[programme]).
 */

export const researchOverview = {
  /** DRAFT — to be written by Kostadin Penchev. */
  intro:
    "Doctoral studies in economics at Trakia University, begun in March 2025, build on a professional background in finance, organisational management and European project development.",
  introPlaceholder: false,
  approach: [] as string[],
  collaborations: [] as { name: string; note?: string; url?: string }[],
};

/**
 * Research areas — shown on /research §02. Fixed editorial content
 * (not tied to the theme-tag taxonomy in content/taxonomy.ts, which is
 * used separately to tag publications, projects and activity).
 */
export const researchAreas: { label: string; description: string }[] = [
  { label: "Digital Economy & Transformation", description: "Economic effects of digitalisation and business transformation." },
  { label: "Agricultural Economics & Entrepreneurship", description: "Economic decision-making, entrepreneurship and competitiveness in agriculture." },
  { label: "Economics of Technology Adoption", description: "Investment decisions, costs, returns and economic value of technology adoption." },
  { label: "Innovation & Investment", description: "Innovation, investment, financing and enterprise development." },
  { label: "Regional & EU Economic Development", description: "Regional transformation, European programmes and development policy." },
  { label: "Digital Agriculture & AI", description: "Economic applications and implications of digital and AI technologies in agriculture." },
];

/** Open research questions beyond a single programme. */
export const researchQuestions: (ResearchQuestion & { placeholder?: boolean })[] = [
  { id: "Q1", question: "[Open research question — to be written]", placeholder: true },
  { id: "Q2", question: "[Open research question — to be written]", placeholder: true },
  { id: "Q3", question: "[Open research question — to be written]", placeholder: true },
];

const inDevelopment = undefined;

export const phd: ResearchProgramme = {
  slug: "phd",
  href: "/research/phd",
  type: "doctoral",
  status: "active",
  featured: true,
  title:
    "Digital Transformation of Agricultural Entrepreneurship in Bulgaria: Opportunities and Challenges",
  titleLocal: {
    lang: "bg",
    text: "Дигитална трансформация на аграрното предприемачество в България – възможности и предизвикателства",
  },
  summary:
    "Doctoral research on the digital transformation of agricultural entrepreneurship in Bulgaria.",
  institution: "Trakia University",
  faculty: "Faculty of Economics",
  department: "Department of Industrial Business and Entrepreneurship",
  supervisor: "Assoc. Prof. Konstantin Stoyanov",
  themes: [
    "digital-transformation",
    "agricultural-entrepreneurship",
    "economics-of-digitalisation",
    "technology-adoption",
  ],
  period: { start: "2025-03", end: null },
  lastUpdated: "2026-09-16",
  meta: [
    { label: "University", value: "Trakia University" },
    { label: "Faculty", value: "Faculty of Economics" },
    { label: "Department", value: "Industrial Business and Entrepreneurship" },
    { label: "Supervisor", value: "Assoc. Prof. Konstantin Stoyanov" },
    { label: "Started", value: "March 2025" },
    { label: "Expected completion", value: inDevelopment },
  ],
  /**
   * Sections without `body` render as "In development — to be published".
   * Add paragraphs as the dissertation progresses.
   */
  sections: [
    { id: "context", number: "01", title: "Research context" },
    { id: "problem", number: "02", title: "Research problem" },
    {
      id: "object-subject",
      number: "03",
      title: "Object and scope",
    },
    { id: "aim", number: "04", title: "Research aim" },
    { id: "questions", number: "05", title: "Research questions" },
    { id: "framework", number: "06", title: "Conceptual framework" },
    { id: "methodology", number: "07", title: "Methodology" },
  ],
  questions: [],
  /**
   * Stage statuses — "completed" | "in-progress" | "planned". No percentages.
   * Update as the dissertation progresses.
   */
  milestones: [
    { id: "literature-review", label: "Literature review", status: "completed" },
    { id: "theoretical-framework", label: "Theoretical framework", status: "completed" },
    { id: "research-design", label: "Research design", status: "in-progress" },
    { id: "empirical-study", label: "Empirical study", status: "planned" },
    { id: "analysis", label: "Analysis", status: "planned" },
    { id: "results", label: "Results", status: "planned" },
    { id: "dissertation", label: "Dissertation", status: "planned" },
  ],
  notes: [],
};

/** All research programmes. Future programmes are added here. */
export const programmes: ResearchProgramme[] = [phd];
