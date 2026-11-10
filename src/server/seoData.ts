/**
 * Server-only reader for the build-time payload cache.
 *
 * scripts/fetch-seo-data.mjs writes .cache/seo-data.json before `next build`.
 * Reading it here rather than fetching per page means one prefetch feeds every
 * prerendered route, and a cold backend cannot turn into blank HTML.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import type { StrollersFeatures } from "../types/StrollersFeatures";
import type { StrollerSummary } from "../features/strollers/paths";

type SeoData = {
  fetchedAt: string;
  source: string;
  strollers: StrollerSummary[];
  comparisons: Record<string, StrollersFeatures[]>;
};

let cached: SeoData | null = null;

const load = (): SeoData => {
  if (cached) return cached;

  const file = path.join(process.cwd(), ".cache", "seo-data.json");
  try {
    cached = JSON.parse(readFileSync(file, "utf8")) as SeoData;
  } catch {
    throw new Error(
      `Missing or unreadable ${file}. Run \`npm run fetch-seo-data\` before building.`
    );
  }
  return cached;
};

export const getStrollers = () => load().strollers;

/** The cached payload for a curated slug; undefined for anything else. */
export const getComparison = (slug: string): StrollersFeatures[] | undefined =>
  load().comparisons[slug];
