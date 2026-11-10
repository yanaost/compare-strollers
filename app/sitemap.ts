import type { MetadataRoute } from "next";
import { SITE } from "../src/config/site";
import { COMPARISONS } from "../src/config/comparisons";

// Static export writes this to a file at build time rather than serving it
// from a route handler; Next wants that said out loud.
export const dynamic = "force-static";

/**
 * The published pages, which under static export is every page that exists as
 * a file. Ad-hoc selections live at /compare?ids=… and are noindex, so listing
 * them would ask for crawl budget the site then declines to spend.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // No trailing slash, to match the canonical the home page emits —
    // metadataBase resolves "/" to the bare origin.
    { url: SITE, lastModified: now, priority: 1 },
    { url: `${SITE}/about`, lastModified: now, priority: 0.5 },
    { url: `${SITE}/contact`, lastModified: now, priority: 0.5 },
    ...COMPARISONS.map(({ slug }) => ({
      url: `${SITE}/compare/${slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
