/**
 * The live origin, in one place.
 *
 * Absolute URLs appear in robots.txt, the sitemap and the JSON-LD, and those
 * three disagreeing is the kind of thing nothing fails loudly on — a sitemap
 * on one origin and canonicals on another is just quietly ignored.
 */
export const SITE = "https://comparestrollers.com";

/** `/images/foo.jpg` → `https://comparestrollers.com/images/foo.jpg` */
export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE}${path.startsWith("/") ? "" : "/"}${path}`;
