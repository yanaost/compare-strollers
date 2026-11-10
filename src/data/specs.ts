/**
 * Full specs for every stroller — around 400KB of JSON.
 *
 * Import this from a server component (it is then build-time only and costs the
 * browser nothing) or behind a dynamic import. Importing it from a module that
 * carries "use client" puts the whole dataset in that page's bundle.
 *
 * A published comparison page takes the server route: the page reads the two or
 * three strollers it needs and passes them down as props. /compare?ids=… cannot
 * know its selection at build time, so it loads this lazily instead.
 */
import type { StrollersFeatures } from "../types/StrollersFeatures";
import specs from "./specs.json";

const byId = specs as unknown as Record<string, StrollersFeatures>;

/**
 * Full records for a selection, in the order asked for.
 *
 * Silently skips ids that do not exist — a stale link should drop the column it
 * cannot fill, not blank the page.
 */
export const strollersByIds = (ids: number[]): StrollersFeatures[] =>
  ids
    .map((id) => byId[String(id)])
    .filter((stroller): stroller is StrollersFeatures => Boolean(stroller));
