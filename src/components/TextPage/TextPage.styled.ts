"use client";

import styled from "@emotion/styled";
import { color, layout, radius } from "../../styles/tokens";

export const Intro = styled.section`
  padding: clamp(48px, 7vw, 112px) ${layout.pagePadding} clamp(40px, 5vw, 72px);
  border-bottom: 1px solid ${color.dividerStrong};
`;

export const IntroCopy = styled.div`
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Eyebrow = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${color.accent};
`;

export const Title = styled.h1`
  font-weight: 800;
  font-size: clamp(44px, 6.4vw, 104px);
  line-height: 0.98;
  letter-spacing: -0.045em;
  margin: 0;
  text-wrap: balance;

  em {
    font-style: italic;
  }
`;

export const Lede = styled.p`
  font-size: clamp(18px, 1.6vw, 22px);
  line-height: 1.5;
  color: ${color.bodyMuted};
  margin: 0;
  max-width: 40ch;
  text-wrap: pretty;
`;

// The article claims two of the auto-fit tracks, so the page reads as a narrow
// contents rail beside a wide column of prose.
export const Body = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: clamp(32px, 5vw, 96px);
  padding: ${layout.sectionPadding} ${layout.pagePadding};
  align-items: start;

  /* Below three tracks the span would conjure an implicit column and push the
     prose off-screen, so the two parts simply stack. */
  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

export const Toc = styled.nav`
  position: sticky;
  top: 32px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 240px;

  @media (max-width: 1023px) {
    position: static;
    max-width: none;
  }
`;

export const TocLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${color.tertiary};
  margin-bottom: 12px;
`;

export const TocLink = styled.a<{ $active: boolean }>`
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  padding: 8px 0 8px 14px;
  border-left: 1.5px solid
    ${({ $active }) => ($active ? color.ink : color.dividerStrong)};
  color: ${({ $active }) => ($active ? color.ink : color.secondary)};
  transition: color 0.2s ease, border-color 0.2s ease;
`;

export const Article = styled.article`
  grid-column: span 2;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: 18px;
  line-height: 1.7;
  color: #2a2c2e;

  @media (max-width: 1023px) {
    grid-column: auto;
  }

  p {
    margin: 0;
    text-wrap: pretty;
  }

  a {
    color: ${color.accent};
    font-weight: 600;
    border-bottom: 1.5px solid #e7c3b4;
  }
`;

export const SectionHeading = styled.h2`
  font-weight: 800;
  font-size: clamp(28px, 2.6vw, 40px);
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: ${color.ink};
  margin: 0;

  /* Clears the sticky contents rail when an anchor jumps here. */
  scroll-margin-top: 32px;

  /* The first heading opens the article, the rest break from the text above. */
  & + * {
    margin-top: 0;
  }

  &:not(:first-of-type) {
    margin-top: 24px;
  }
`;

export const Figure = styled.figure`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FigureSlot = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: ${radius.image};
  overflow: hidden;
  background: repeating-linear-gradient(
    135deg,
    #eae5dd 0 10px,
    #f0ece5 10px 20px
  );

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const Caption = styled.figcaption`
  font-size: 14px;
  color: ${color.tertiary};
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ListItem = styled.li`
  display: flex;
  gap: 16px;

  b {
    font-weight: 700;
    color: ${color.ink};
  }
`;

export const Bullet = styled.span`
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${color.accent};
  margin-top: 12px;
`;

export const Quote = styled.blockquote`
  margin: 24px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    font-weight: 700;
    font-style: italic;
    font-size: clamp(24px, 2.4vw, 34px);
    line-height: 1.25;
    letter-spacing: -0.03em;
    color: ${color.ink};
    text-wrap: balance;
  }
`;

export const Attribution = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${color.secondary};
`;
