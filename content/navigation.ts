export interface NavItem {
  label: string;
  href: string;
}

/** Primary navigation. Order here = order on the site. */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Publications", href: "/publications" },
  { label: "Projects", href: "/projects" },
  { label: "Activity", href: "/activity" },
  { label: "Notes & Insights", href: "/notes" },
  { label: "Entrepreneurship", href: "/entrepreneurship" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Secondary views that cut across all areas (footer). */
export const secondaryNav: NavItem[] = [
  { label: "PhD Research", href: "/research/phd" },
];

/** The four core areas shown after the homepage hero. */
export const coreAreas = [
  {
    number: "01",
    title: "Research",
    description: "Current research, doctoral studies in economics, research interests and academic work.",
    href: "/research",
    icon: "research",
  },
  {
    number: "02",
    title: "Publications",
    description: "Scientific publications, conference papers and research outputs.",
    href: "/publications",
    icon: "publications",
  },
  {
    number: "03",
    title: "Projects",
    description: "Professional experience across European, research and innovation projects.",
    href: "/projects",
    icon: "projects",
  },
  {
    number: "04",
    title: "Entrepreneurship",
    description: "Companies, products and entrepreneurial initiatives developed alongside research.",
    href: "/entrepreneurship",
    icon: "entrepreneurship",
  },
] as const;
