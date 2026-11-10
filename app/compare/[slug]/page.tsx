import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparisonView } from "../../../src/views/Comparison";
import { COMPARISON_PAGES, STROLLER_SUMMARIES } from "../../../src/data/dataset";
// Server component, so this never reaches the browser — the two or three
// strollers this page needs go down as props instead.
import { strollersByIds } from "../../../src/data/specs";
import {
  comparisonDescription,
  comparisonTitle,
} from "../../../src/features/compare/metadata";

/**
 * One page per row in the `comparison` table, and nothing else.
 *
 * These are the only /compare/ paths that exist as files. Any other selection
 * lives at /compare?ids=… — a query string needs no file of its own, which is
 * what lets the whole site ship as static HTML with no server behind it.
 * Publishing a new comparison is a DB row and a rebuild.
 */
export const generateStaticParams = async () =>
  COMPARISON_PAGES.map(({ slug }) => ({ slug }));

/** Static export: these params are the complete list. */
export const dynamicParams = false;

const pageFor = (slug: string) =>
  COMPARISON_PAGES.find((comparison) => comparison.slug === slug);

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const page = pageFor(slug);
  if (!page) return {};

  // Same records the page body renders, so the verdict in the description is
  // the verdict on the page rather than a second opinion.
  const strollers = strollersByIds(page.strollerIds);

  return {
    title: comparisonTitle(strollers.map((s) => s.modelName)),
    description: comparisonDescription(strollers),
    alternates: { canonical: `/compare/${slug}` },
  };
};

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pageFor(slug);
  if (!page) notFound();

  return (
    <ComparisonView
      ids={page.strollerIds}
      strollers={STROLLER_SUMMARIES}
      data={strollersByIds(page.strollerIds)}
    />
  );
}
