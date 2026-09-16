/**
 * Central site configuration.
 *
 * Only verified information belongs here. Empty strings are not rendered.
 */

export const site = {
  name: "Kostadin Penchev",
  wordmark: { primary: "PENCHEFF.", accent: "INFO" },
  domain: "pencheff.info",
  /** Canonical origin. Override with NEXT_PUBLIC_SITE_URL for previews. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pencheff.info",
  locale: "en",

  /**
   * Development scaffolding. While true, placeholder entries (marked in the
   * content files) are rendered with a visible "Placeholder" tag.
   * Set to false before the public launch.
   */
  showPlaceholders: false,

  eyebrow: "Ideas / Research / Technology / Impact",

  /** DRAFT wording (from the approved hero reference) — to be confirmed. */
  positioning: "Research, technology and entrepreneurship for a more sustainable future.",
  /** DRAFT wording (from the approved hero reference) — to be confirmed. */
  introduction:
    "Working at the intersection of digital transformation, artificial intelligence and agricultural entrepreneurship.",

  /**
   * Hero editorial elements (desktop). DRAFT — confirm or change.
   * Set `quote` to "" to hide it.
   */
  hero: {
    quote: "Innovation in agriculture today creates stronger communities tomorrow.",
    tagsTop: ["People", "Ideas", "Sustainable futures"],
    tagsBottom: ["Bulgaria", "Europe", "Beyond"],
    motto: ["Knowledge", "Innovation", "Impact"],
  },

  /** Used for <meta name="description"> and social previews. */
  description:
    "Kostadin Penchev — research, projects, technology and entrepreneurship in digital transformation, artificial intelligence and agricultural entrepreneurship.",

  currentRole: {
    title: "PhD Candidate",
    organisation: "Trakia University",
    unit: "Faculty of Economics",
  },

  /** Leave empty until confirmed. */
  location: "Stara Zagora, Bulgaria",

  contact: {
    /** Public e-mail address. */
    email: "kostadin.penchev@trakia-uni.bg",
  },

  /**
   * Academic and professional profiles. Only non-empty URLs are shown.
   * Do not add a URL that has not been confirmed.
   */
  profiles: {
    orcid: "",
    googleScholar: "",
    researchGate: "https://www.researchgate.net/profile/Kostadin-Penchev",
    linkedIn: "https://www.linkedin.com/in/kostadin-penchev-54aba21b",
    github: "",
  },

  /** CV as a PDF under /public (e.g. "/files/cv.pdf"). Empty = hidden. */
  cv: "",
} as const;

export const profileLabels: Record<keyof typeof site.profiles, string> = {
  orcid: "ORCID",
  googleScholar: "Google Scholar",
  researchGate: "ResearchGate",
  linkedIn: "LinkedIn",
  github: "GitHub",
};
