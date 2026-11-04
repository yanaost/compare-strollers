import { useEffect, useState } from "react";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import {
  Article,
  Attribution,
  Body,
  Bullet,
  Caption,
  Eyebrow,
  Figure,
  FigureSlot,
  Intro,
  IntroCopy,
  Lede,
  List,
  ListItem,
  Quote,
  SectionHeading,
  Title,
  Toc,
  TocLabel,
  TocLink,
} from "./About.styled";

const SECTIONS = [
  { id: "story", label: "Our story" },
  { id: "how", label: "How we compare" },
  { id: "contact", label: "Contact" },
] as const;

const PRINCIPLES = [
  {
    lead: "Same specs, every time.",
    body: "Weight, fold size, capacity, recline and the rest — always in the same rows, always side by side.",
  },
  {
    lead: "Clear winners.",
    body: "Where one stroller is better on paper, we say so. Where they tie, we say that too.",
  },
  {
    lead: "No sponsored rankings.",
    body: "No affiliate links and no paid placements. Nothing moves up the page for money.",
  },
  {
    lead: "Kept up to date.",
    body: "New models and mid-cycle revisions are added as they launch.",
  },
];

// The heading nearest the top of the viewport owns the contents rail. Reading
// position rather than intersection, so a long section keeps its link lit all
// the way through.
const activeSection = () => {
  const threshold = 120;

  // The last section is short and the footer sits below it, so its heading
  // never climbs past the threshold — reaching the end of the page is what
  // counts as arriving there.
  const remaining =
    document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
  if (remaining <= 2) return SECTIONS[SECTIONS.length - 1].id;

  let current: string = SECTIONS[0].id;

  for (const section of SECTIONS) {
    const node = document.getElementById(section.id);
    if (node && node.getBoundingClientRect().top <= threshold) {
      current = section.id;
    }
  }

  return current;
};

export const About = () => {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const onScroll = () => setActive(activeSection());
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <SiteHeader />

      <Intro>
        <IntroCopy>
          <Eyebrow>About us</Eyebrow>
          <Title>
            We compare strollers so you can <em>get back to living.</em>
          </Title>
          <Lede>
            CompareStrollers started with two tired parents and too many browser
            tabs. Today it helps families choose with clear, honest,
            side-by-side facts.
          </Lede>
        </IntroCopy>
      </Intro>

      <Body>
        <Toc aria-label="On this page">
          <TocLabel>On this page</TocLabel>
          {SECTIONS.map((section) => (
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

        <Article>
          <SectionHeading id="story">Our story</SectionHeading>
          <p>
            CompareStrollers began the way these things usually do — with a
            spreadsheet. Our first child was on the way, and every brand's site
            claimed the lightest frame, the smallest fold, the smoothest ride.
            None of them put their numbers next to anyone else's.
          </p>
          <p>
            So we built the page we wanted to read. Pick two strollers, or
            three, and every spec we hold lines up in the same rows — with a
            plain note on which one comes out ahead.
          </p>

          <Figure>
            <FigureSlot>
              <img
                src="/images/hero.jpg"
                alt="A parent pushing a stroller along a pavement"
              />
            </FigureSlot>
            <Caption>
              Where it starts: one pavement, one stroller, and a decision you'd
              rather only make once.
            </Caption>
          </Figure>

          <SectionHeading id="how">How we compare</SectionHeading>
          <p>
            Every stroller is measured against the same set of specs, taken from
            manufacturer listings and official retailers, so the columns stay
            honest.
          </p>
          <List>
            {PRINCIPLES.map((principle) => (
              <ListItem key={principle.lead}>
                <Bullet aria-hidden />
                <span>
                  <b>{principle.lead}</b> {principle.body}
                </span>
              </ListItem>
            ))}
          </List>

          <Quote>
            <p>
              “The best stroller isn't the most expensive one. It's the one that
              fits your life.”
            </p>
            <Attribution>— Founders, CompareStrollers</Attribution>
          </Quote>

          <SectionHeading id="contact">Contact</SectionHeading>
          <p>
            Spotted a wrong spec, or want a stroller added? Write to{" "}
            <a href="mailto:hello@strollercompare.com">
              hello@strollercompare.com
            </a>{" "}
            — we read every message and aim to reply within 48 hours.
          </p>
        </Article>
      </Body>

      <SiteFooter ctaLabel="Start comparing →" ctaTo="/" />
    </>
  );
};
