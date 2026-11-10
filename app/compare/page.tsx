import type { Metadata } from "next";
import { AdHocComparison } from "../../src/views/Comparison/AdHocComparison";

/**
 * Every comparison that is not a published page: /compare?ids=1,2.
 *
 * One file covers all of them because the selection is in the query string,
 * which static hosting ignores when resolving a path. The picker on a published
 * page links here as soon as the selection stops matching a published one, so
 * swapping a stroller never lands on a 404.
 *
 * Not indexed: these are combinations a visitor built, not pages the site
 * publishes, and there are hundreds of them saying much the same thing.
 */
export const metadata: Metadata = {
  title: "Compare strollers side by side",
  robots: { index: false, follow: true },
};

export default function AdHocComparisonPage() {
  return <AdHocComparison />;
}
