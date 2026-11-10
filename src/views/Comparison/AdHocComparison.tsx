"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MAX_STROLLERS } from "../../components/CompareSearch";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { STROLLER_SUMMARIES } from "../../data/dataset";
import type { StrollersFeatures } from "../../types/StrollersFeatures";
import { ComparisonView } from "./ComparisonView";
import { StatusBlock } from "./Comparison.styled";

/**
 * Any selection that is not a published page: /compare?ids=1,2.
 *
 * The ids come from the query string rather than the path so that one static
 * file answers every combination. Nothing here is prerendered — on a static
 * export `useSearchParams` is empty during the build and fills in on the
 * client, which is why the Suspense fallback below exists.
 *
 * The specs are loaded with a dynamic import so the ~400KB of them is a chunk
 * this page fetches rather than weight on every other page. It replaces the API
 * call this page used to make, so it is not a new round trip.
 */
const Selection = () => {
  const params = useSearchParams();
  const raw = params.get("ids") ?? "";

  // Memoised because ComparisonView writes it into context on change; a fresh
  // array every render would write on every render.
  const ids = useMemo(
    () =>
      [
        ...new Set(
          raw
            .split(",")
            .map((part) => Number(part.trim()))
            .filter((id) => Number.isInteger(id) && id > 0)
        ),
      ].slice(0, MAX_STROLLERS),
    [raw]
  );

  const [data, setData] = useState<StrollersFeatures[] | null>(null);

  useEffect(() => {
    let active = true;
    import("../../data/specs").then(({ strollersByIds }) => {
      if (active) setData(strollersByIds(ids));
    });
    return () => {
      active = false;
    };
  }, [ids]);

  if (!data) {
    return (
      <>
        <SiteHeader />
        <StatusBlock>Loading comparison…</StatusBlock>
        <SiteFooter ctaLabel="Popular comparisons →" ctaTo="/#popular" />
      </>
    );
  }

  return (
    <ComparisonView ids={ids} strollers={STROLLER_SUMMARIES} data={data} />
  );
};

export const AdHocComparison = () => (
  <Suspense
    fallback={
      <>
        <SiteHeader />
        <StatusBlock>Loading comparison…</StatusBlock>
        <SiteFooter ctaLabel="Popular comparisons →" ctaTo="/#popular" />
      </>
    }
  >
    <Selection />
  </Suspense>
);
