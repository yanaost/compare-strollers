import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ComparisonView } from "../../../src/views/Comparison";
import { COMPARISONS } from "../../../src/config/comparisons";
import {
  isCuratedSlug,
  parseComparisonIds,
} from "../../../src/features/compare/resolveSlug";
import { comparePath } from "../../../src/features/strollers/paths";
import { getComparison, getStrollers } from "../../../src/server/seoData";

const MAX_STROLLERS = 3;

/**
 * The curated comparisons are the only prerendered ones. Everything else —
 * reversed order, three-stroller paths, any other pair — still resolves, but
 * renders on demand and stays out of the index. Growing the prerendered set is
 * a matter of adding to COMPARISONS; nothing here changes.
 */
export const generateStaticParams = async () =>
  COMPARISONS.map(({ slug }) => ({ slug }));

/** Keeps uncurated slugs working rather than 404ing them. */
export const dynamicParams = true;

/**
 * The curated slug covering the same strollers, in any order.
 *
 * A reversed path resolves to the same ids, so it is its own canonical by the
 * name-order rule and cannot simply be redirected. Pointing its canonical at
 * the curated page consolidates the signal instead of only suppressing it.
 */
const curatedEquivalent = (ids: number[]) => {
  if (ids.length === 0) return undefined;
  const wanted = [...ids].sort().join(",");
  return COMPARISONS.find(
    ({ ids: curated }) => [...curated].sort().join(",") === wanted
  )?.slug;
};

const resolve = (slug: string) => {
  const strollers = getStrollers();
  const ids = parseComparisonIds(slug, strollers).slice(0, MAX_STROLLERS);
  const selected = ids
    .map((id) => strollers.find((s) => s.strollerId === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return { strollers, ids, selected, canonical: comparePath(strollers, ...ids) };
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const { ids, selected } = resolve(slug);
  const curated = isCuratedSlug(slug);

  if (selected.length === 0) {
    return { title: "Compare strollers side by side", robots: { index: false } };
  }

  const names = selected.map((s) => s.modelName).join(" vs ");
  const canonicalSlug = curated ? slug : (curatedEquivalent(ids) ?? slug);

  return {
    title: `${names} — compared side by side`,
    description: `${names}: weight, folded size, max child weight, recline and fold compared row by row on manufacturer-listed specs.`,
    alternates: { canonical: `/compare/${canonicalSlug}` },
    // Only the curated set asks to be indexed. The rest would be hundreds of
    // near-duplicate pages splitting the same signal.
    robots: curated ? undefined : { index: false, follow: true },
  };
};

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { strollers, ids, canonical } = resolve(slug);

  // One page, one address. The client used to do this after the stroller list
  // arrived; doing it here means a crawler is never served the duplicate.
  if (ids.length > 0 && canonical !== `/compare/${slug}`) {
    redirect(canonical);
  }

  return (
    <ComparisonView
      slug={slug}
      initialStrollers={strollers}
      initialData={getComparison(slug)}
    />
  );
}
