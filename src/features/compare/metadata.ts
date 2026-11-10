/**
 * Title and description for a comparison page.
 *
 * Server-only by nature rather than by rule: it runs inside
 * generateMetadata, where the full spec records are already loaded, so the
 * verdict costs nothing extra to compute. Kept out of the page file because
 * the length budgets below are fiddly enough to want their own home.
 */
import { compare, toSpecs, type StrollerSpecs } from "./specs";
import type { StrollersFeatures } from "../../types/StrollersFeatures";

/** Google truncates a title around here; the suffix is what gives way. */
const TITLE_BUDGET = 60;

/** And a description around here. */
const DESCRIPTION_BUDGET = 160;

const SUFFIXES = [" — compared side by side", " — specs compared", ""];

/** "A vs B", which is the string people actually search for. */
const versus = (names: string[]) => names.join(" vs ");

/** "A and B" / "A, B and C" */
const andList = (names: string[]) =>
  names.length < 2
    ? (names[0] ?? "")
    : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

/**
 * The longest suffix that still fits the budget.
 *
 * Seven of the published pairs are long enough to lose it entirely ("Bugaboo
 * Butterfly vs Bugaboo Butterfly 2 Plus" is 45 characters before any suffix).
 * Dropping it is the right trade: a truncated title ending mid-word reads
 * worse than a bare pairing, and the pairing is the part that matters.
 */
export const comparisonTitle = (names: string[]) => {
  const head = versus(names);
  const suffix =
    SUFFIXES.find((candidate) => head.length + candidate.length <= TITLE_BUDGET) ??
    "";
  return `${head}${suffix}`;
};

/**
 * Verdict first, spec list second.
 *
 * The verdict is the only part that differs between pages, so it goes where a
 * truncating SERP will still show it — and it is what makes all 24
 * descriptions distinct instead of one template with the names swapped.
 * `compare` phrases its own edge cases in words ("Too close to call.",
 * "Evenly matched, 3 to 3."), so there is no missing-data case to handle here.
 *
 * The spec sentence is appended only if it fits. Today the longest result is
 * 153 characters, but model names grow and a description is not worth going
 * over budget for.
 */
export const comparisonDescription = (strollers: StrollersFeatures[]) => {
  const specs: StrollerSpecs[] = strollers.map(toSpecs);
  const { verdictLead, verdictTail } = compare(specs);

  const verdict = `${verdictLead} ${verdictTail}`;
  const names = specs.map((s) => s.modelName);
  const detail = `Compare ${andList(names)} on weight, fold size, capacity and recline.`;

  const full = `${verdict} ${detail}`;
  return full.length <= DESCRIPTION_BUDGET ? full : verdict;
};
