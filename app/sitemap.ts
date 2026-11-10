import type { MetadataRoute } from "next";
import { COMPARISONS } from "../src/config/comparisons";

const SITE = "https://comparestrollers.com";

/**
 * Only the prerendered pages. Uncurated comparisons are noindex, so listing
 * them here would ask for crawl budget the site then declines to spend.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${SITE}/`, lastModified: now, priority: 1 },
    { url: `${SITE}/about`, lastModified: now, priority: 0.5 },
    { url: `${SITE}/contact`, lastModified: now, priority: 0.5 },
    ...COMPARISONS.map(({ slug }) => ({
      url: `${SITE}/compare/${slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
