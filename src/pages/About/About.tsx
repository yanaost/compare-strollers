import {
  Attribution,
  Bullet,
  Caption,
  Figure,
  FigureSlot,
  List,
  ListItem,
  Quote,
  SectionHeading,
  TextPage,
  TextSection,
} from "../../components/TextPage";

const SECTIONS: readonly TextSection[] = [
  { id: "story", label: "Our story" },
  { id: "how", label: "How we compare" },
  { id: "contact", label: "Contact" },
];

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

export const About = () => (
  <TextPage
    eyebrow="About us"
    title={
      <>
        We compare strollers so you can <em>get back to living.</em>
      </>
    }
    lede="CompareStrollers started with two tired parents and too many browser tabs. Today it helps families choose with clear, honest, side-by-side facts."
    sections={SECTIONS}
  >
    <SectionHeading id="story">Our story</SectionHeading>
    <p>
      CompareStrollers began the way these things usually do — with a
      spreadsheet. Our first child was on the way, and every brand's site
      claimed the lightest frame, the smallest fold, the smoothest ride. None of
      them put their numbers next to anyone else's.
    </p>
    <p>
      So we built the page we wanted to read. Pick two strollers, or three, and
      every spec we hold lines up in the same rows — with a plain note on which
      one comes out ahead.
    </p>

    <Figure>
      <FigureSlot>
        <img
          src="/images/hero.jpg"
          alt="A parent pushing a stroller along a pavement"
        />
      </FigureSlot>
      <Caption>
        Where it starts: one pavement, one stroller, and a decision you'd rather
        only make once.
      </Caption>
    </Figure>

    <SectionHeading id="how">How we compare</SectionHeading>
    <p>
      Every stroller is measured against the same set of specs, taken from
      manufacturer listings and official retailers, so the columns stay honest.
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
        “The best stroller isn't the most expensive one. It's the one that fits
        your life.”
      </p>
      <Attribution>— Founders, CompareStrollers</Attribution>
    </Quote>

    <SectionHeading id="contact">Contact</SectionHeading>
    <p>
      Spotted a wrong spec, or want a stroller added? Write to{" "}
      <a href="mailto:hello@strollercompare.com">hello@strollercompare.com</a> —
      we read every message and aim to reply within 48 hours.
    </p>
  </TextPage>
);
