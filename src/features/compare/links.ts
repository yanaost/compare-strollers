/**
 * Link building, with the published page list already applied.
 *
 * Kept apart from paths.ts so that module stays data-free and testable; this is
 * the one that knows which comparisons exist.
 */
import { COMPARISON_PAGES } from "../../data/dataset";
import {
  comparePathIn,
  idKey,
  type StrollerSummary,
} from "../strollers/paths";

const publishedSlugs = new Map(
  COMPARISON_PAGES.map(({ strollerIds, slug }) => [idKey(strollerIds), slug])
);

/** The slug this selection is published at, if it is published at all. */
export const publishedSlugFor = (ids: number[]) => publishedSlugs.get(idKey(ids));

/**
 * Published page if there is one, otherwise /compare?ids=…
 *
 * Still takes the stroller list it no longer needs, so the call sites did not
 * all have to change when slugs stopped being derived from model names.
 */
export const comparePath = (_strollers: StrollerSummary[], ...ids: number[]) =>
  comparePathIn(publishedSlugs, ...ids);
