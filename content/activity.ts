import type { ActivityEntry } from "@/lib/types";

/**
 * ACTIVITY — conferences, scientific forums, doctoral schools, research training,
 * university and professional events. Source: claude/ACTIVITY_SOURCE.md.
 *
 * Rules
 * - Only verified information. Missing fields are left out, never guessed.
 * - Entries without an exact date stay undated (`period` omitted) until verified.
 * - `period.start` = first day ("2026-06-04"); `period.end` = last day of multi-day events.
 * - Keep roles distinct: participant ≠ presenter ≠ co-author ≠ university representative.
 * - Attendance is never presented as a qualification or certification.
 * - `level`: featured | standard | archive (archive = full archive only).
 * - No examinations or teaching duties are listed.
 *
 * Still to verify: dates, locations and organisers of the undated entries,
 * the exact dates and paper title for "30 Years of Trakia University",
 * the details of the upcoming Erasmus mobility.
 */
export const activity: ActivityEntry[] = [
  /* ------------------------------------------------ conferences & forums */
  {
    slug: "agriculture-for-life-2026",
    level: "featured",
    featured: true,
    type: "conference",
    typeDetail: "International Scientific Conference",
    title: "International Conference “Agriculture for Life – Life for Agriculture” 2026",
    roles: ["presenter", "co-author"],
    period: { start: "2026-06-04", end: "2026-06-06" },
    location: "Bucharest, Romania",
    organiser: "University of Agronomic Sciences and Veterinary Medicine of Bucharest",
    presentationTitle:
      "Critical Analysis of the Effectiveness of European Digital Innovation Hubs (EDIHs) in the Agri-Food Sector",
    coAuthors: ["Assoc. Prof. Konstantin Stoyanov"],
    themes: ["digital-transformation", "agricultural-entrepreneurship", "eu-digital-policy"],
    related: ["publications/edih-agri-food-2026", "research/phd"],
  },
  {
    slug: "trakia-university-30-years",
    level: "standard",
    type: "conference",
    typeDetail: "Scientific Conference with International Participation",
    title: "“30 Years of Trakia University – Opportunities, Challenges, Successes!”",
    roles: ["presenter"],
    period: { start: "2025-05" },
    description: "Participation with a scientific paper.",
    // TO VERIFY: exact dates, location, paper title.
  },
  {
    slug: "cooperatives-in-bulgaria-forum",
    level: "standard",
    type: "forum",
    typeDetail: "Scientific-Practical Forum",
    title: "“Cooperatives in Bulgaria Today and Tomorrow: Challenges and New Horizons”",
    roles: ["participant"],
    description:
      "A forum on the current development, challenges and future perspectives of cooperatives in Bulgaria.",
    // TO VERIFY: date, location, organiser.
  },

  /* ------------------------------------------------------ academic mobility */
  {
    slug: "erasmus-mobility-upcoming",
    level: "standard",
    upcoming: true,
    type: "erasmus-mobility",
    title: "Erasmus mobility",
    description: "Details will be added.",
    // TO ADD: host institution, city, country, dates, role.
  },

  /* -------------------------------------- doctoral school & research training */
  {
    slug: "mdpi-doctoral-school-academic-publishing",
    level: "standard",
    type: "doctoral-school",
    title: "MDPI Doctoral School — Academic Publishing",
    roles: ["participant"],
    period: { start: "2025-06-03", end: "2025-06-04" },
    description: "Doctoral training focused on academic publishing.",
    // TO VERIFY: organiser / institution.
  },
  {
    slug: "doctoral-school-presentation",
    level: "standard",
    type: "doctoral-school",
    title: "Doctoral School — Methods of Presentation and Self-Presentation",
    roles: ["participant"],
    period: { start: "2025-06-19", end: "2025-06-20" },
    description: "Training in methods and techniques for academic presentation and self-presentation.",
    // TO VERIFY: organiser / institution.
  },
  {
    slug: "doctoral-school-scientific-databases",
    level: "standard",
    type: "doctoral-school",
    title: "Doctoral School — Scientific Databases in Support of University Research",
    roles: ["participant"],
    period: { start: "2025-10-27" },
    description:
      "Training in the use of scientific databases in support of the research work of university lecturers and researchers.",
    // TO VERIFY: organiser / institution.
  },
  {
    slug: "training-scientific-writing",
    level: "standard",
    type: "training",
    title: "Scientific Writing, PhD Structure, and Qualitative and Quantitative Research",
    roles: ["participant"],
    description:
      "Training covering scientific writing, the structure of a PhD, and qualitative and quantitative research.",
    // TO VERIFY: date, organiser / institution.
  },
  {
    slug: "training-quantitative-methods",
    level: "standard",
    type: "training",
    title: "Quantitative Tools and Methods for Data Analysis in Scientific Research",
    roles: ["participant"],
    description: "Training in quantitative research tools and methods for data analysis in scientific research.",
    // TO VERIFY: date, organiser / institution.
  },
  {
    slug: "training-publication-advice",
    level: "standard",
    type: "training",
    typeDetail: "Academic publishing training",
    title: "Advice to Authors for Successful Publication of Scientific Research",
    roles: ["participant"],
    description: "Practical guidance for authors preparing scientific research for publication.",
    // TO VERIFY: date, organiser / institution.
  },
  {
    slug: "seminar-strikeplagiarism",
    level: "standard",
    type: "training",
    typeDetail: "Seminar",
    title: "StrikePlagiarism — Practical Guidelines and New System Functions",
    roles: ["participant"],
    description:
      "Seminar “Practical Guidelines for Working with StrikePlagiarism Software and Presentation of the New Functions of the System”, on the practical use of StrikePlagiarism and its new functionality.",
    // TO VERIFY: date, organiser / institution.
  },

  /* ------------------------------------ university & professional activity */
  {
    slug: "workin-stara-zagora",
    level: "standard",
    type: "professional-event",
    typeDetail: "University / professional event",
    title: "WorkIn Stara Zagora",
    roles: ["university-representative"],
    location: "Stara Zagora, Bulgaria",
    description: "Participated in WorkIn Stara Zagora as a representative of Trakia University.",
    // TO VERIFY: date.
  },
];
