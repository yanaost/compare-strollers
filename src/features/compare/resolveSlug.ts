import { COMPARISONS } from "../../config/comparisons";
import { VS, type StrollerSummary, strollerSlug } from "../strollers/paths";

const comparisonsBySlug = new Map(COMPARISONS.map((c) => [c.slug, c.ids]));

/** True when the slug is one of the curated, prerendered comparisons. */
export const isCuratedSlug = (slug: string) => comparisonsBySlug.has(slug);

const isId = (part: string) => /^\d+$/.test(part);

/**
 * Resolves a /compare/ path to stroller ids, newest spelling first:
 *
 *   1. a curated slug from the config, which survives a model being renamed;
 *   2. model-name slugs, resolved one part at a time;
 *   3. bare ids, for links made before names were used.
 *
 * Resolving part by part is what makes 2 and 3 safe together: a part is an id
 * only when it is nothing but digits, so "cybex-libelle-2" is read as a name
 * rather than scraped for the 2 it ends with.
 */
export const parseComparisonIds = (
  raw: string | undefined,
  strollers: StrollerSummary[]
): number[] => {
  if (!raw) return [];

  const curated = comparisonsBySlug.get(raw);
  if (curated) return [...curated];

  const idBySlug = new Map(
    strollers.map((s) => [strollerSlug(s.modelName), s.strollerId])
  );

  const ids = raw
    .split(VS)
    .map((part) => idBySlug.get(part) ?? (isId(part) ? Number(part) : undefined))
    .filter((id): id is number => id !== undefined && id > 0);

  if (ids.length > 0) return ids;

  // A link from before the separator settled — digits and dashes, nothing else.
  // Names always carry letters, so this cannot swallow one.
  if (/^[\d-]+$/.test(raw)) {
    return (raw.match(/\d+/g) ?? []).map(Number).filter((id) => id > 0);
  }

  return [];
};
