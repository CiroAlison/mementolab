import type { MetadataRoute } from "next";
import { site, nav } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = nav.map((item) => ({
    url: `${site.url}${item.href === "/" ? "" : item.href}`,
    lastModified: now,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
  entries.push({
    url: `${site.url}/privacy`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.2,
  });
  return entries;
}
