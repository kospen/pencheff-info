import type { FocusItem } from "@/lib/types";

/**
 * Current Focus — what is happening now.
 * Update `updated` whenever the list changes.
 * Items marked `placeholder: true` are shown only while site.showPlaceholders is true.
 */
export const currentFocus: { updated: string; latest: string; items: FocusItem[] } = {
  updated: "2026-09-16",
  /** One line shown in the "Latest update" strip under the hero. DRAFT. */
  latest: "Presented a paper at Agriculture for Life – Life for Agriculture, Bucharest (June 2026).",
  items: [
    {
      label: "Researching",
      text: "Digital transformation of agricultural entrepreneurship in Bulgaria",
      href: "/research/phd",
      linkLabel: "PhD Research",
    },
    {
      label: "Building",
      text: "[Product or company — one line]",
      href: "/entrepreneurship",
      linkLabel: "Entrepreneurship",
      placeholder: true,
    },
    {
      label: "Working on",
      text: "[Project — one line]",
      href: "/projects",
      linkLabel: "Projects",
      placeholder: true,
    },
    {
      label: "Exploring",
      text: "[Topic — one line]",
      placeholder: true,
    },
    {
      label: "Collaborating",
      text: "[Partner or initiative — one line]",
      placeholder: true,
    },
  ],
};
