import { useEffect, useState } from "react";
import { SiteFooter } from "../SiteFooter";
import { SiteHeader } from "../SiteHeader";
import {
  Article,
  Body,
  Eyebrow,
  Intro,
  IntroCopy,
  Lede,
  Title,
  Toc,
  TocLabel,
  TocLink,
} from "./TextPage.styled";

export type TextSection = {
  /** Must match the id on the matching heading in the article body. */
  id: string;
  label: string;
};

// The heading nearest the top of the viewport owns the contents rail. Reading
// position rather than intersection, so a long section keeps its link lit all
// the way through.
const activeSection = (sections: readonly TextSection[]) => {
  const threshold = 120;

  // The last section is often short, with the footer below it, so its heading
  // may never climb past the threshold — reaching the end of the page is what
  // counts as arriving there. A page too short to scroll is already at its own
  // bottom, though, and must not light its last link on arrival.
  const height = document.documentElement.scrollHeight;
  const scrollable = height > window.innerHeight + 2;
  const remaining = height - window.scrollY - window.innerHeight;
  if (scrollable && remaining <= 2) return sections[sections.length - 1].id;

  let current = sections[0].id;

  for (const section of sections) {
    const node = document.getElementById(section.id);
    if (node && node.getBoundingClientRect().top <= threshold) {
      current = section.id;
    }
  }

  return current;
};

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  /** Contents rail entries, in the order they appear in the article. */
  sections: readonly TextSection[];
  /** The article body — headings carrying the section ids, and prose. */
  children: React.ReactNode;
};

// The handoff's text-page template: intro band, sticky contents rail, and one
// column of prose. Shared by every editorial page so they stay in step.
export const TextPage: React.FC<Props> = ({
  eyebrow,
  title,
  lede,
  sections,
  children,
}) => {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const onScroll = () => setActive(activeSection(sections));
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <>
      <SiteHeader />

      <Intro>
        <IntroCopy>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title>{title}</Title>
          <Lede>{lede}</Lede>
        </IntroCopy>
      </Intro>

      <Body>
        <Toc aria-label="On this page">
          <TocLabel>On this page</TocLabel>
          {sections.map((section) => (
            <TocLink
              key={section.id}
              href={`#${section.id}`}
              $active={active === section.id}
              aria-current={active === section.id ? "true" : undefined}
            >
              {section.label}
            </TocLink>
          ))}
        </Toc>

        <Article>{children}</Article>
      </Body>

      <SiteFooter ctaLabel="Start comparing →" ctaTo="/" />
    </>
  );
};
