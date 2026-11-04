import styled from "@emotion/styled";
import { color, layout, radius } from "../../styles/tokens";

// A label column plus one track per stroller. The gap tightens as columns are
// added so a third stroller costs width from the gutters, not the values.
// Never fewer than two stroller tracks: a lone stroller should occupy the slot
// it will keep once a rival joins, not stretch across the whole page.
const columns = (count: number) =>
  `minmax(${count > 2 ? 64 : 80}px, 0.7fr) repeat(${Math.max(
    count,
    2
  )}, minmax(0, 1.5fr))`;

const gap = (count: number) =>
  count > 2 ? "clamp(10px, 2vw, 28px)" : "clamp(12px, 3vw, 40px)";

export type Columns = { $count: number };

export const CompareSection = styled.section`
  padding: clamp(40px, 5vw, 72px) ${layout.pagePadding} clamp(56px, 6vw, 96px);
  background: ${color.surface};
  border-top: 1px solid ${color.dividerSoft};
`;

export const CompareHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

export const HeaderCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Eyebrow = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${color.accent};
`;

export const Verdict = styled.h2`
  font-weight: 800;
  font-size: clamp(36px, 4.4vw, 68px);
  line-height: 1;
  letter-spacing: -0.045em;
  margin: 0;
  max-width: 20ch;
  text-wrap: balance;

  em {
    font-style: italic;
    color: ${color.accent};
  }
`;

export const Controls = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const DiffButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: 1.5px solid ${color.ink};
  border-radius: ${radius.pill};
  padding: 12px 20px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: ${color.ink};
  cursor: pointer;

  &:hover {
    border-color: ${color.accent};
    color: ${color.accent};
  }
`;

export const DiffDot = styled.span<{ $on: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1.5px solid currentColor;
  background: ${({ $on }) => ($on ? color.accent : "transparent")};
`;

export const SwapButton = styled.button`
  background: ${color.ink};
  color: #fff;
  border: 0;
  border-radius: ${radius.pill};
  padding: 12px 22px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${color.accent};
  }
`;

export const TopGrid = styled.div<Columns>`
  display: grid;
  grid-template-columns: ${({ $count }) => columns($count)};
  gap: ${({ $count }) => gap($count)};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;

export const ImageSlot = styled.div`
  aspect-ratio: 4 / 3;
  border-radius: ${radius.image};
  background: repeating-linear-gradient(
    135deg,
    #f1ede7 0 10px,
    #f6f3ee 10px 20px
  );
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    padding: 16px;
    box-sizing: border-box;
  }
`;

// The name picker and its remove button share one line, so dropping a column
// is reachable from the column itself rather than from a list up in the header.
export const NameRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 8px;
  min-width: 0;

  /* A phone column is barely wide enough for the name alone, so the button
     stops competing with it for the line and drops underneath. */
  @media (max-width: 767px) {
    flex-direction: column;
    gap: 6px;
  }
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 44px;
  border: 0;
  border-radius: ${radius.select};
  background: ${color.bg};
  color: ${color.tertiary};
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    background: ${color.accentTint};
    color: ${color.accent};
  }

  @media (max-width: 767px) {
    width: 100%;
    height: 30px;
  }
`;

export const StrollerSelect = styled.select<Columns>`
  appearance: none;
  -webkit-appearance: none;
  background: ${color.bg};
  border: 0;
  border-radius: ${radius.select};
  padding: 16px 18px;
  font: inherit;
  font-size: clamp(16px, 1.6vw, 22px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${color.ink};
  cursor: pointer;
  flex: 1;
  min-width: 0;
  outline: none;

  /* A select can't wrap, so a third column on a phone has to buy legibility
     with type size — otherwise two Bugaboos both read as "Bugab". */
  @media (max-width: 767px) {
    padding: ${({ $count }) => ($count > 2 ? "12px 10px" : "16px 18px")};
    font-size: ${({ $count }) => ($count > 2 ? "12px" : "16px")};
    letter-spacing: -0.01em;
  }
`;

// Slides in once the real name row scrolls out of view, so the columns stay
// identifiable through the long spec list. Fixed rather than sticky: it has to
// outlive CompareSection and carry into the full-specs section below.
export const StickyNames = styled.div<{ $shown: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background: ${color.surface};
  border-bottom: 1px solid ${color.dividerStrong};
  padding: 12px ${layout.pagePadding};
  transform: translateY(${({ $shown }) => ($shown ? "0" : "-100%")});
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const StickyGrid = styled.div<Columns>`
  display: grid;
  grid-template-columns: ${({ $count }) => columns($count)};
  gap: ${({ $count }) => gap($count)};
  align-items: center;

  /* Below the table breakpoint the label column and thumbnails cost more room
     than they earn — the names need the full width to stay readable. */
  @media (max-width: 767px) {
    grid-template-columns: ${({ $count }) => `repeat(${$count}, 1fr)`};
    gap: 12px;
  }
`;

export const StickyLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${color.tertiary};

  @media (max-width: 767px) {
    display: none;
  }
`;

export const StickyStroller = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;

  img {
    width: 34px;
    height: 34px;
    object-fit: contain;
    border-radius: 8px;
    background: ${color.bg};
    flex-shrink: 0;
  }

  @media (max-width: 767px) {
    gap: 8px;

    img {
      width: 26px;
      height: 26px;
    }
  }
`;

export const StickyName = styled.span`
  font-size: clamp(14px, 1.3vw, 17px);
  font-weight: 700;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Sentinel = styled.div`
  height: 1px;
`;

export const Rows = styled.div`
  margin-top: 32px;
`;

export const Row = styled.div<Columns>`
  display: grid;
  grid-template-columns: ${({ $count }) => columns($count)};
  gap: ${({ $count }) => gap($count)};
  padding: 22px 0;
  border-top: 1px solid ${color.divider};
  align-items: center;
`;

export const RowLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${color.secondary};
`;

export const Cell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`;

export const ValueLine = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Value = styled.span<Columns & { $losing: boolean }>`
  font-size: clamp(18px, 2vw, 28px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: ${({ $losing }) => ($losing ? color.losing : color.ink)};

  /* Three columns on a phone leave ~108px per value — display sizing just
     forces wraps, so step the numbers down to a readable table size. */
  @media (max-width: 767px) {
    font-size: ${({ $count }) => ($count > 2 ? "15px" : "18px")};
    letter-spacing: ${({ $count }) => ($count > 2 ? "-0.01em" : "-0.03em")};
  }
`;

export const BetterPill = styled.span<Columns>`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: ${color.accentTint};
  color: ${color.accent};
  padding: 4px 10px;
  border-radius: ${radius.pill};
  white-space: nowrap;

  @media (max-width: 767px) {
    font-size: ${({ $count }) => ($count > 2 ? "9px" : "11px")};
    padding: ${({ $count }) => ($count > 2 ? "3px 7px" : "4px 10px")};
    letter-spacing: 0.04em;
  }
`;

export const BarTrack = styled.div`
  height: 4px;
  background: ${color.barTrack};
  border-radius: 2px;
  overflow: hidden;
`;

export const BarFill = styled.div<{ $width: string; $winning: boolean }>`
  height: 100%;
  width: ${({ $width }) => $width};
  background: ${({ $winning }) => ($winning ? color.accent : color.barNeutral)};
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
`;

export const EmptyState = styled.p`
  border-top: 1px solid ${color.divider};
  padding: 28px 0;
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  font-style: italic;
  color: ${color.secondary};
`;

export const Footnote = styled.p`
  border-top: 1px solid ${color.divider};
  padding-top: 18px;
  margin: 0;
  font-size: 13px;
  color: ${color.tertiary};
`;

export const StatusBlock = styled.div`
  padding: clamp(40px, 6vw, 96px) ${layout.pagePadding};
  font-size: 17px;
  color: ${color.secondary};
`;
