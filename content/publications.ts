import type { Publication } from "@/lib/types";

/**
 * PUBLICATIONS — one object per item. Source: ResearchGate profile
 * (https://www.researchgate.net/profile/Kostadin-Penchev), checked 16 Sep 2026.
 *
 * Never add a DOI, volume, issue, pages, URL or PDF that has not been verified.
 * The site owner's name is highlighted automatically in author lists.
 */
export const publications: Publication[] = [
  {
    slug: "edih-agri-food-2026",
    featured: true,
    title:
      "Critical Analysis of the Effectiveness of European Digital Innovation Hubs (EDIHs) in the Agri-Food Sector",
    authors: ["K. Penchev", "K. Stoyanov"],
    type: "journal-article",
    status: "published",
    year: 2026,
    // August 2026. Presented at "Agriculture for Life – Life for Agriculture", Bucharest, June 2026.
    venue: "Scientific Papers Series Management, Economic Engineering in Agriculture and Rural Development",
    // TO VERIFY: volume, issue, pages, DOI.
    url: "https://www.researchgate.net/publication/412748336_CRITICAL_ANALYSIS_OF_THE_EFFECTIVENESS_OF_EUROPEAN_DIGITAL_INNOVATION_HUBS_EDIHS_IN_THE_AGRI-FOOD_SECTOR",
    themes: ["digital-transformation", "agricultural-entrepreneurship", "eu-digital-policy"],
    related: ["activity/agriculture-for-life-2026", "research/phd"],
  },
  {
    slug: "digital-transformation-agricultural-entrepreneurship-review-2025",
    featured: true,
    title:
      "Digital Transformation in Agricultural Entrepreneurship in Bulgaria: A Literature Review and Directions for Future Research",
    authors: ["K. Penchev"],
    type: "journal-article",
    status: "published",
    year: 2025,
    // October 2025.
    venue: "Trakia Journal of Sciences",
    // TO VERIFY: volume, issue, pages, DOI.
    url: "https://www.researchgate.net/publication/397378823_DIGITAL_TRANSFORMATION_IN_AGRICULTURAL_ENTREPRENEURSHIP_IN_BULGARIA_A_LITERATURE_REVIEW_AND_DIRECTIONS_FOR_FUTURE_RESEARCH",
    themes: ["digital-transformation", "agricultural-entrepreneurship"],
    related: ["research/phd"],
  },
];

/** Name variants that identify the site owner in author lists. */
export const ownerAuthorNames = ["K. Penchev", "Kostadin Penchev", "Penchev, K."];
