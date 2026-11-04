import styled from "@emotion/styled";
import { color, layout, radius } from "../../styles/tokens";

// Same track definition as the comparison table above it, so the label column
// and the stroller columns line up across the two sections.
const columns = (count: number) =>
  `minmax(${count > 2 ? 64 : 80}px, 0.7fr) repeat(${Math.max(
    count,
    2
  )}, minmax(0, 1.5fr))`;

const gap = (count: number) =>
  count > 2 ? "clamp(10px, 2vw, 28px)" : "clamp(12px, 3vw, 40px)";

export const SpecsSection = styled.section`
  padding: ${layout.sectionPadding} ${layout.pagePadding};
  background: ${color.bg};
`;

export const SpecsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

export const SpecsCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SpecsEyebrow = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${color.accent};
`;

export const SpecsHeading = styled.h2`
  font-weight: 800;
  font-size: clamp(28px, 3vw, 44px);
  line-height: 1.05;
  letter-spacing: -0.04em;
  margin: 0;
`;

export const SpecsNote = styled.p`
  font-size: 15px;
  color: ${color.secondary};
  margin: 0;
`;

export const ExpandAllButton = styled.button`
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

export const GroupCard = styled.div`
  background: ${color.surface};
  border-radius: ${radius.card};
  margin-bottom: 14px;
  overflow: hidden;
`;

export const GroupHeader = styled.button`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 16px;
  width: 100%;
  background: transparent;
  border: 0;
  padding: 24px clamp(20px, 2.5vw, 32px);
  font: inherit;
  text-align: left;
  cursor: pointer;
  color: ${color.ink};

  &:hover {
    color: ${color.accent};
  }
`;

export const GroupTitle = styled.span`
  font-size: clamp(17px, 1.6vw, 21px);
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const GroupMeta = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  font-weight: 600;
  color: ${color.tertiary};
`;

export const Chevron = styled.span<{ $open: boolean }>`
  display: inline-flex;
  transition: transform 0.25s ease;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
`;

export const GroupBody = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);

  > div {
    overflow: hidden;
  }
`;

export const GroupRows = styled.div`
  padding: 0 clamp(20px, 2.5vw, 32px) 10px;
`;

export const SpecRow = styled.div<{ $count: number }>`
  display: grid;
  grid-template-columns: ${({ $count }) => columns($count)};
  gap: ${({ $count }) => gap($count)};
  padding: 18px 0;
  border-top: 1px solid ${color.divider};
  align-items: baseline;
`;

export const SpecLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${color.secondary};
`;

export const SpecsEmpty = styled.p`
  background: ${color.surface};
  border-radius: ${radius.card};
  padding: clamp(28px, 4vw, 48px) clamp(20px, 2.5vw, 32px);
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  font-style: italic;
  color: ${color.secondary};
`;

export const SpecValue = styled.span<{ $muted: boolean }>`
  font-size: clamp(14px, 1.2vw, 16px);
  font-weight: 600;
  line-height: 1.45;
  color: ${({ $muted }) => ($muted ? color.tertiaryLight : color.ink)};
  min-width: 0;
  overflow-wrap: anywhere;
`;
