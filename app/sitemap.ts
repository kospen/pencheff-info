import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getProgrammes, getProjects, getVentures } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();
  const staticRoutes = ["", "/research", "/projects", "/publications", "/activity", "/entrepreneurship", "/about", "/contact"];
  return [
    ...staticRoutes.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...getProgrammes().map((p) => ({ url: `${base}${p.href}`, lastModified: now, priority: 0.8 })),
    ...getProjects()
      .filter((p) => !p.placeholder)
      .map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: now, priority: 0.6 })),
    ...getVentures()
      .filter((v) => !v.placeholder)
      .map((v) => ({ url: `${base}/entrepreneurship/${v.slug}`, lastModified: now, priority: 0.5 })),
  ];
}
