/**
 * Slug ↔ id translation, with no React in it.
 *
 * Split out of useStrollers.ts so the compare route's server component can
 * resolve a slug at build time; the hook next door stays client-only.
 */

export type StrollerSummary = {
  strollerId: number;
  modelName: string;
  brand: string;
  imagePath: string;
  tagline?: string;
  alternativeModelNames?: string[];
};

export const searchStrollers = (
  strollers: StrollerSummary[],
  query: string
): StrollerSummary[] => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return strollers.slice(0, 5);

  return strollers.filter((s) =>
    [s.modelName, s.brand, ...(s.alternativeModelNames ?? [])]
      .join(" ")
      .toLowerCase()
      .includes(trimmed)
  );
};

/** Separates one stroller from the next in a /compare/ path. */
export const VS = "-vs-";

/**
 * "Joolz Aer+" → "joolz-aer-plus".
 *
 * Deliberately produces the same spelling as the hand-written slugs in
 * src/config/comparisons.ts, so a curated link and a generated one are the same
 * URL rather than two URLs serving one page.
 */
export const strollerSlug = (modelName: string) =>
  modelName
    .toLowerCase()
    .replace(/\+/g, "-plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** /compare/babyzen-yoyo-2-vs-joolz-aer — the spelling a page is published at. */
export const namedComparePath = (
  strollers: StrollerSummary[],
  ...ids: number[]
) => {
  const byId = new Map(strollers.map((s) => [s.strollerId, s.modelName]));
  const parts = ids.map((id) => {
    const modelName = byId.get(id);
    return modelName ? strollerSlug(modelName) : String(id);
  });
  return `/compare/${parts.join(VS)}`;
};

/**
 * Where a link to a selection should point.
 *
 * A selection matching a published page gets that page's own URL. Anything else
 * gets /compare?ids=… — one page serving every ad-hoc combination, since a
 * query string needs no file of its own. That is what lets the whole site be
 * static: only published pages exist as paths, and nothing else 404s.
 *
 * `publishedSlugs` maps a sorted id list to its slug. Order-insensitive on
 * purpose, so picking the same two strollers the other way round lands on the
 * published page rather than a second URL showing the same thing.
 */
export const comparePathIn = (
  publishedSlugs: Map<string, string>,
  ...ids: number[]
) => {
  const published = publishedSlugs.get(idKey(ids));
  if (published) return `/compare/${published}`;
  if (ids.length === 0) return "/";
  return `/compare?ids=${ids.join(",")}`;
};

/** Order-insensitive key for a set of ids. */
export const idKey = (ids: number[]) => [...ids].sort((a, b) => a - b).join(",");
