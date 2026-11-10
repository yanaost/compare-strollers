/**
 * Build-time prefetch for the prerendered pages.
 *
 * Fetches once per build: the stroller list, plus one comparison payload per
 * curated slug. Writes .cache/seo-data.json, which the compare route reads at
 * build time instead of each page calling the API itself.
 *
 * Defaults to the deployed API on purpose. Do NOT point this at a local
 * backend: per CLAUDE.md its seeder destroys and truncates every table on boot.
 *
 * On failure it keeps the previous cache and exits 0, so a cold or down Render
 * instance cannot make the build emit blank pages. With no cache at all it
 * exits 1 rather than letting that happen silently — which is the case on
 * Render, since .cache is gitignored and every build starts from a clean
 * checkout. That is why the retries below exist: the API is a free-tier Render
 * instance that spins down after idling, and the first request has to both wake
 * it and wait out a cold boot.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const BASE =
  process.env.SEO_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://compare-strollers-backend.onrender.com";

const OUT_DIR = ".cache";
const OUT = `${OUT_DIR}/seo-data.json`;
const TIMEOUT_MS = 60_000;
/** Backoff between attempts. A spun-down Render instance takes ~50s to wake. */
const RETRY_DELAYS_MS = [5_000, 15_000, 30_000, 30_000];

/** Reads slug → ids straight out of the config module, which is TS. */
const readComparisons = async () => {
  const source = await readFile("src/config/comparisons.ts", "utf8");
  const entries = [
    ...source.matchAll(
      /slug:\s*"([^"]+)"\s*,\s*title:\s*"([^"]+)"\s*,\s*ids:\s*\[([0-9,\s]+)\]/g
    ),
  ].map(([, slug, title, ids]) => ({
    slug,
    title,
    ids: ids.split(",").map((n) => Number(n.trim())),
  }));

  if (entries.length === 0) {
    throw new Error(
      "Parsed 0 comparisons from src/config/comparisons.ts — the literal's shape changed."
    );
  }
  return entries;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getJson = async (path) => {
  for (let attempt = 0; ; attempt += 1) {
    try {
      const response = await fetch(`${BASE}${path}`, {
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      // 5xx from a waking instance is worth another go; 4xx means the request
      // itself is wrong and retrying just burns build minutes.
      if (!response.ok) {
        const error = new Error(`${path} → HTTP ${response.status}`);
        error.retryable = response.status >= 500;
        throw error;
      }
      return await response.json();
    } catch (error) {
      const retryable = error.retryable ?? true; // timeouts and DNS/socket errors
      const delay = RETRY_DELAYS_MS[attempt];
      if (!retryable || delay === undefined) throw error;
      console.warn(
        `  … ${error.message} — retrying in ${delay / 1000}s (attempt ${attempt + 2}/${RETRY_DELAYS_MS.length + 1})`
      );
      await sleep(delay);
    }
  }
};

const keepPreviousCache = (reason) => {
  if (existsSync(OUT)) {
    console.warn(`⚠ ${reason}\n  Keeping the existing ${OUT}.`);
    process.exit(0);
  }
  console.error(`✖ ${reason}\n  No cache to fall back to — refusing to build blank pages.`);
  process.exit(1);
};

const main = async () => {
  const comparisons = await readComparisons();
  console.log(`Fetching from ${BASE} — 1 stroller list + ${comparisons.length} comparisons`);

  const strollers = await getJson("/api/strollers/test-all");
  if (!Array.isArray(strollers) || strollers.length === 0) {
    throw new Error("Stroller list came back empty");
  }

  const payloads = {};
  for (const { slug, ids } of comparisons) {
    payloads[slug] = await getJson(
      `/api/strollers/comparison-data?ids=${ids.join(",")}`
    );
  }

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(
    OUT,
    JSON.stringify(
      { fetchedAt: new Date().toISOString(), source: BASE, strollers, comparisons: payloads },
      null,
      2
    )
  );
  console.log(`✔ ${OUT} — ${strollers.length} strollers, ${Object.keys(payloads).length} comparisons`);
};

main().catch((error) => keepPreviousCache(error.message));
