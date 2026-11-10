"use client";

import { STROLLER_SUMMARIES } from "../../data/dataset";

// The path helpers moved to ./paths so server components can use them, and
// comparePath to ../compare/links because it needs the published page list.
// Both stay re-exported here so existing call sites import from one place.
export { VS, searchStrollers, strollerSlug, namedComparePath } from "./paths";
export { comparePath } from "../compare/links";
export type { StrollerSummary } from "./paths";

/**
 * The stroller list.
 *
 * Used to be a fetch, and took the prerendered list as a seed. The list is now
 * baked into the bundle, so there is nothing to wait for and nothing to pass
 * in — this is a constant wearing a hook's clothes, kept so the search
 * components do not all have to change.
 */
export const useStrollers = () => ({ strollers: STROLLER_SUMMARIES });
