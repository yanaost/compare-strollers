"use client";

import { X } from "lucide-react";
import type { StrollersFeatures } from "../../types/StrollersFeatures";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CompareSearch, MAX_STROLLERS } from "../../components/CompareSearch";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { SpecGroups } from "../../components/SpecGroups";
import { useStrollerComparison } from "../../components/ComparisonTable/hooks/useStrollerComparison";
import { parseComparisonIds } from "../../features/compare/resolveSlug";
import { compare, toSpecs } from "../../features/compare/specs";
import {
  StrollerSummary,
  comparePath,
  useStrollers,
} from "../../features/strollers/useStrollers";
import { strollersContext } from "../../context/context";
import {
  BarFill,
  BarTrack,
  BetterPill,
  Cell,
  Column,
  CompareHeader,
  CompareSection,
  Controls,
  DiffButton,
  DiffDot,
  EmptyState,
  Eyebrow,
  Footnote,
  HeaderCopy,
  ImageSlot,
  NameRow,
  RemoveButton,
  Row,
  RowLabel,
  Rows,
  Sentinel,
  StatusBlock,
  StickyGrid,
  StickyLabel,
  StickyName,
  StickyNames,
  StickyStroller,
  StrollerName,
  SwapButton,
  TopGrid,
  Value,
  ValueLine,
  Verdict,
  NameBlock,
  Tagline,
} from "./Comparison.styled";

// Dropping the last column leaves nothing to compare, so it falls back to the
// home page and its search.
const removeAt = (
  strollers: StrollerSummary[],
  ids: number[],
  index: number
) => {
  const next = ids.filter((_, i) => i !== index);
  return next.length === 0 ? "/" : comparePath(strollers, ...next);
};

type ComparisonViewProps = {
  slug: string;
  /** Prerendered routes pass these down; uncurated slugs fetch client-side. */
  initialStrollers?: StrollerSummary[];
  initialData?: StrollersFeatures[];
};

export const ComparisonView = ({
  slug,
  initialStrollers,
  initialData,
}: ComparisonViewProps) => {
  const router = useRouter();
  const { setStrollersIdsToCompare } = useContext(strollersContext);
  const { strollers, loading: strollersLoading } = useStrollers(initialStrollers);
  const [differencesOnly, setDifferencesOnly] = useState(false);

  const ids = useMemo(
    () => parseComparisonIds(slug, strollers).slice(0, MAX_STROLLERS),
    [slug, strollers]
  );

  useEffect(() => {
    setStrollersIdsToCompare(ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  // One page, one address: an id path quietly becomes the name path once the
  // names are known. Replaces rather than pushes, so Back still leaves.
  const canonical = comparePath(strollers, ...ids);

  useEffect(() => {
    if (strollersLoading || ids.length === 0) return;
    if (canonical !== `/compare/${slug}`) router.replace(canonical);
  }, [canonical, slug, ids.length, strollersLoading, router]);

  const { strollerData, accordionData, loading, error } =
    useStrollerComparison(ids, initialData);

  // strollerData comes back in database order, so index by id rather than
  // position — the URL order is the column order.
  const selected = useMemo(
    () =>
      ids
        .map((id) => strollerData.find((s) => s.strollerId === id))
        .filter((s): s is NonNullable<typeof s> => Boolean(s)),
    [ids, strollerData]
  );

  const complete = selected.length === ids.length;

  const comparison = useMemo(
    () => (complete ? compare(selected.map(toSpecs)) : null),
    [complete, selected]
  );

  // The sentinel sits directly below the name row; once it leaves the top of
  // the viewport the floating bar takes over.
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [namesStuck, setNamesStuck] = useState(false);
  const ready = !loading && !!comparison;

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) =>
        setNamesStuck(
          !entry.isIntersecting && entry.boundingClientRect.top < 0
        ),
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ready]);

  const search = <CompareSearch ids={ids} strollers={strollers} />;

  // One stroller has nothing to rank against, so the ranking controls would
  // only ever hide every row.
  const rankable = selected.length > 1;

  // The search travels with every state, so an empty or failed page is still
  // somewhere you can pick strollers from.
  const header = <SiteHeader>{search}</SiteHeader>;

  if (ids.length === 0) {
    return (
      <>
        {header}
        <StatusBlock>
          {/* A name path cannot be resolved until the names arrive, so a shared
              link must not accuse the visitor of picking nothing meanwhile. */}
          {strollersLoading
            ? "Loading comparison…"
            : "No strollers selected yet. Search above, or pick a popular comparison from the home page."}
        </StatusBlock>
        <SiteFooter ctaLabel="Popular comparisons →" ctaTo="/#popular" />
      </>
    );
  }

  if (error) {
    return (
      <>
        {header}
        <StatusBlock>Could not load this comparison. {error}</StatusBlock>
        <SiteFooter ctaLabel="Popular comparisons →" ctaTo="/#popular" />
      </>
    );
  }

  if (loading || !comparison) {
    return (
      <>
        {header}
        <StatusBlock>Loading comparison…</StatusBlock>
        <SiteFooter ctaLabel="Popular comparisons →" ctaTo="/#popular" />
      </>
    );
  }

  const showDifferencesOnly = differencesOnly && rankable;

  const visibleRows = showDifferencesOnly
    ? comparison.rows.filter((row) => !row.identical)
    : comparison.rows;

  return (
    <>
      {header}

      <StickyNames $shown={namesStuck} aria-hidden={!namesStuck}>
        <StickyGrid $count={selected.length}>
          <StickyLabel>Comparing</StickyLabel>
          {selected.map((stroller) => (
            <StickyStroller key={stroller.strollerId}>
              <img src={stroller.imagePath} alt="" />
              <StickyName>{stroller.modelName}</StickyName>
            </StickyStroller>
          ))}
        </StickyGrid>
      </StickyNames>

      <CompareSection>
        <CompareHeader>
          <HeaderCopy>
            <Eyebrow>Side by side</Eyebrow>
            <Verdict>
              {comparison.verdictLead} <em>{comparison.verdictTail}</em>
            </Verdict>
          </HeaderCopy>
          {rankable && (
            <Controls>
              <DiffButton onClick={() => setDifferencesOnly((on) => !on)}>
                <DiffDot $on={differencesOnly} />
                Differences only
              </DiffButton>
              <SwapButton
                onClick={() => router.push(comparePath(strollers, ...[...ids].reverse()))}
              >
                {ids.length > 2 ? "Reverse ⇄" : "Swap ⇄"}
              </SwapButton>
            </Controls>
          )}
        </CompareHeader>

        <TopGrid $count={selected.length}>
          <span />
          {selected.map((stroller, index) => (
            <Column key={stroller.strollerId}>
              <ImageSlot>
                <img src={stroller.imagePath} alt={`${stroller.modelName} stroller`} />
              </ImageSlot>
              <NameRow>
                <NameBlock>
                  <StrollerName $count={selected.length}>
                    {stroller.modelName}
                  </StrollerName>
                  {stroller.tagline && <Tagline>{stroller.tagline}</Tagline>}
                </NameBlock>
                <RemoveButton
                  onClick={() => router.push(removeAt(strollers, ids, index))}
                  aria-label={`Remove ${stroller.modelName} from the comparison`}
                >
                  <X size={18} strokeWidth={2.5} aria-hidden />
                </RemoveButton>
              </NameRow>
            </Column>
          ))}
        </TopGrid>

        <Sentinel ref={sentinelRef} />

        <Rows>
          {visibleRows.map((row) => (
            <Row key={row.label} $count={selected.length}>
              <RowLabel>{row.label}</RowLabel>
              {row.cells.map((cell, index) => (
                <Cell key={index}>
                  <ValueLine>
                    <Value $count={selected.length} $losing={cell.losing}>
                      {cell.text}
                    </Value>
                    {cell.wins && (
                      <BetterPill $count={selected.length}>Better</BetterPill>
                    )}
                  </ValueLine>
                  {row.hasBar && (
                    <BarTrack>
                      <BarFill $width={cell.percent} $winning={cell.wins} />
                    </BarTrack>
                  )}
                </Cell>
              ))}
            </Row>
          ))}
          {visibleRows.length === 0 && (
            <EmptyState>Identical on paper. Go push them both.</EmptyState>
          )}
          <Footnote>
            Specs are manufacturer-listed and approximate.
          </Footnote>
        </Rows>
      </CompareSection>

      <SpecGroups
        groups={accordionData}
        columnCount={selected.length}
        differencesOnly={showDifferencesOnly}
      />

      <SiteFooter ctaLabel="Popular comparisons →" ctaTo="/#popular" />
    </>
  );
};
