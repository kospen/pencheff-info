import type { Theme } from "@/lib/types";

/**
 * Extensible vocabularies. Adding a new category, type or theme is a
 * one-line change here; filters and labels update automatically.
 */

export const projectCategories: Record<string, string> = {
  research: "Research",
  "eu-projects": "EU Project",
  "digital-transformation": "Digital Transformation",
  "artificial-intelligence": "Artificial Intelligence",
  agritech: "AgriTech",
  entrepreneurship: "Entrepreneurship",
  software: "Software / Technology",
  other: "Other",
};

export const projectStatuses: Record<string, { label: string; tone: "active" | "open" | "pending" | "done" | "archived" }> = {
  active: { label: "Active", tone: "active" },
  "in-development": { label: "In development", tone: "open" },
  proposal: { label: "Proposal", tone: "pending" },
  completed: { label: "Completed", tone: "done" },
  archived: { label: "Archived", tone: "archived" },
};

export const ventureTypes: Record<string, string> = {
  company: "Company",
  product: "Product",
  initiative: "Initiative",
  experiment: "Experiment",
  collaboration: "Collaboration",
};

export const ventureStatuses: Record<string, { label: string; tone: "active" | "open" | "pending" | "done" | "archived" }> = {
  active: { label: "Active", tone: "active" },
  live: { label: "Live", tone: "active" },
  beta: { label: "Beta", tone: "open" },
  "in-development": { label: "In development", tone: "open" },
  exploring: { label: "Exploring", tone: "open" },
  completed: { label: "Completed", tone: "done" },
  concluded: { label: "Concluded", tone: "done" },
  closed: { label: "Closed", tone: "archived" },
  exited: { label: "Exited", tone: "done" },
  discontinued: { label: "Discontinued", tone: "archived" },
};

export const publicationTypes: Record<string, string> = {
  "journal-article": "Journal Article",
  "conference-paper": "Conference Paper",
  "book-chapter": "Book Chapter",
  "working-paper": "Working Paper",
  "research-report": "Research Report",
};

export const publicationStatuses: Record<string, string> = {
  published: "Published",
  accepted: "Accepted",
  "under-review": "Under review",
  "in-preparation": "In preparation",
  presented: "Presented",
};

export const activityTypes: Record<string, string> = {
  conference: "Conference",
  forum: "Scientific forum",
  presentation: "Presentation",
  "doctoral-school": "Doctoral school",
  training: "Research training",
  workshop: "Workshop",
  panel: "Panel",
  "academic-visit": "Academic visit",
  "erasmus-mobility": "Erasmus mobility",
  "academic-activity": "Academic activity",
  "professional-event": "Professional event",
};

/** Roles in an activity. Participation is never presented as a presentation. */
export const activityRoles: Record<string, string> = {
  presenter: "Presenter",
  "co-author": "Co-author",
  participant: "Participant",
  "university-representative": "University representative",
  "academic-support": "Organisation / academic support",
  organiser: "Organiser",
};

/** Sections on /activity, in display order. Each type belongs to one section. */
export const activitySections: { id: string; label: string; types: string[] }[] = [
  { id: "conferences", label: "Conferences & scientific forums", types: ["conference", "forum", "presentation", "panel"] },
  { id: "mobility", label: "Academic mobility", types: ["erasmus-mobility", "academic-visit"] },
  { id: "doctoral-training", label: "Doctoral school & research training", types: ["doctoral-school", "training", "workshop"] },
  { id: "university-professional", label: "University & professional activity", types: ["professional-event", "academic-activity"] },
];

export const themeGroups: Record<string, string> = {
  technology: "Technology",
  domain: "Domain",
  policy: "Policy",
};

/**
 * Themes connect Research, Projects, Ventures and Outputs.
 * `definition` should be written by the site owner; empty = not shown.
 */
export const themes: Theme[] = [
  { id: "digital-transformation", label: "Digital Transformation", group: "technology", researchArea: true },
  { id: "artificial-intelligence", label: "Artificial Intelligence", group: "technology", researchArea: true },
  { id: "agritech", label: "AgriTech", group: "technology", researchArea: true },
  { id: "software", label: "Software", group: "technology" },
  { id: "digital-products", label: "Digital Products", group: "technology" },
  { id: "innovation", label: "Innovation", group: "technology", researchArea: true },
  { id: "agricultural-entrepreneurship", label: "Agricultural Entrepreneurship", group: "domain", researchArea: true },
  { id: "economics-of-digitalisation", label: "Economics of Digitalisation", group: "domain", researchArea: true },
  { id: "technology-adoption", label: "Technology Adoption", group: "domain", researchArea: true },
  { id: "eu-digital-policy", label: "EU Digital Policy", group: "policy", researchArea: true },
  { id: "regional-development", label: "Regional Development", group: "policy" },
  { id: "just-transition", label: "Just Transition", group: "policy" },
  { id: "sustainability", label: "Sustainability & Circular Economy", group: "domain" },
  { id: "skills-development", label: "Skills & Human Capital", group: "domain" },
  { id: "civic-participation", label: "Civic Participation & Democracy", group: "policy" },
  { id: "social-inclusion", label: "Social Inclusion", group: "domain" },
];

export function labelFor(map: Record<string, string>, id: string): string {
  return map[id] ?? id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
