/**
 * The comparison pages, now rows in the `comparison` table rather than a list
 * here. Adding a page is a DB row plus a rebuild; it no longer needs a code
 * change, and the slug is stored rather than derived so renaming a model cannot
 * move a page that is already indexed.
 *
 * Kept at this path, and still exporting COMPARISONS with an `ids` field, so
 * the call sites did not all have to change.
 */
import { COMPARISON_PAGES } from "../data/dataset";

export const COMPARISONS = COMPARISON_PAGES.map(
  ({ slug, title, strollerIds, isNew }) => ({
    slug,
    title,
    ids: strollerIds,
    isNew,
  })
);
