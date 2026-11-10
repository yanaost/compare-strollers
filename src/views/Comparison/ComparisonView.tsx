"use client";

import { X } from "lucide-react";
import type { StrollersFeatures } from "../../types/StrollersFeatures";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CompareSearch } from "../../components/CompareSearch";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { SpecGroups } from "../../components/SpecGroups";
import { useAccordionGroups } from "../../features/compare/useAccordionGroups";
import { compare, toSpecs } from "../../features/compare/specs";
import {
  StrollerSummary,
  comparePath,
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
  /** Column order, left to right. */
  ids: number[];
  strollers: StrollerSummary[];
  /** Full records for `ids`. Resolved by the caller — nothing is fetched. */
  data: StrollersFeatures[];
};

export const ComparisonView = ({ ids, strollers, data }: ComparisonViewProps) => {
  const router = useRouter();
  const { setStrollersIdsToCompare } = useContext(strollersContext);
  const [differencesOnly, setDifferencesOnly] = useState(false);

  // Column order is local state, not part of the URL. A published comparison
  // has one canonical path and links.ts keys it on a *sorted* id list, so a
  // reversed selection resolves to the same slug — pushing it would navigate
  // nowhere. The button only ever reverses, so a flag is the whole state and
  // the order itself stays derived from the ids prop.
  const [reversed, setReversed] = useState(false);

  // Moving to a different selection drops the reversal rather than carrying it
  // over. Adjusted during render, so the stale order is never painted.
  const idsKey = ids.join(",");
  const [selectionKey, setSelectionKey] = useState(idsKey);
  if (selectionKey !== idsKey) {
    setSelectionKey(idsKey);
    setReversed(false);
  }

  const order = useMemo(
    () => (reversed ? [...ids].reverse() : ids),
    [ids, reversed]
  );

  useEffect(() => {
    setStrollersIdsToCompare(order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const accordionData = useAccordionGroups(order, data);

  // Column order is independent of the dataset's order, so index by id rather
  // than by position.
  const selected = useMemo(
    () =>
      order
        .map((id) => data.find((s) => s.strollerId === id))
        .filter((s): s is NonNullable<typeof s> => Boolean(s)),
    [order, data]
  );

  const complete = selected.length === order.length;

  const comparison = useMemo(
    () => (complete ? compare(selected.map(toSpecs)) : null),
    [complete, selected]
  );

  // The sentinel sits directly below the name row; once it leaves the top of
  // the viewport the floating bar takes over.
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [namesStuck, setNamesStuck] = useState(false);
  const ready = !!comparison;

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

  const search = <CompareSearch ids={order} strollers={strollers} />;

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
          No strollers selected yet. Search above, or pick a popular comparison
          from the home page.
        </StatusBlock>
        <SiteFooter ctaLabel="Popular comparisons →" ctaTo="/#popular" />
      </>
    );
  }

  // Reachable from /compare?ids=… with an id that no longer exists.
  if (!comparison) {
    return (
      <>
        {header}
        <StatusBlock>
          That comparison is not available. Search above to pick strollers.
        </StatusBlock>
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
              <SwapButton onClick={() => setReversed((on) => !on)}>
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
                  onClick={() => router.push(removeAt(strollers, order, index))}
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
