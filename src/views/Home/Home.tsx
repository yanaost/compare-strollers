"use client";

import { Heart, Scale, Shield, Star } from "lucide-react";
import { HeroSearch } from "../../components/HeroSearch";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { COMPARISONS } from "../../config/comparisons";
import { useStrollers } from "../../features/strollers/useStrollers";
import {
  Card,
  CardGrid,
  CardNote,
  CardTag,
  CardTitle,
  Eyebrow,
  Hero,
  HeroCopy,
  HeroFade,
  HeroImage,
  HeroImageSlot,
  HeroSubtitle,
  HeroTitle,
  HowHeading,
  HowSection,
  MoreArrow,
  MoreCard,
  MoreComparisons,
  MoreGrid,
  MoreLabel,
  MoreTitle,
  PopularHeader,
  PopularHeading,
  PopularNote,
  PopularSection,
  Step,
  StepBody,
  StepNote,
  StepNumber,
  StepTitle,
  Steps,
  TrustBand,
  TrustItem,
  TrustNote,
  TrustTitle,
} from "./Home.styled";

const TRUST_POINTS = [
  { Icon: Scale, title: "Side-by-side comparison", note: "See what really matters." },
  { Icon: Star, title: "Real parent insights", note: "Based on everyday life." },
  { Icon: Shield, title: "Trusted information", note: "No sales pressure. Just facts." },
  { Icon: Heart, title: "A smoother decision", note: "More confidence. Less stress." },
];

const STEPS = [
  { n: "1", title: "Search or browse", note: "Find strollers that fit your life." },
  { n: "2", title: "Compare", note: "See key specs, wins and trade-offs." },
  { n: "3", title: "Choose", note: "Pick the best one for your family." },
];

const FEATURED = [
  {
    slug: "babyzen-yoyo-2-vs-bugaboo-butterfly",
    tag: "Travel",
    note: "The ultra-compact fold-off. Overhead bin or bust.",
  },
  {
    slug: "bugaboo-dragonfly-vs-bugaboo-fox-5",
    tag: "Full-size",
    note: "Two flagships, one hallway. Which one earns the space?",
  },
  {
    slug: "bugaboo-butterfly-vs-cybex-libelle-2",
    tag: "Everyday",
    note: "Mid-price, big comfort. Where the value lives.",
  },
  {
    slug: "bugaboo-fox-5-vs-cybex-e-priam-2022",
    tag: "Premium",
    note: "Suspension, materials and electric assist.",
  },
];

const splitTitle = (title: string) => {
  const [aName, bName] = title.split(" vs ");
  return { aName, bName };
};

const featuredCards = FEATURED.map((featured) => {
  const comparison = COMPARISONS.find((c) => c.slug === featured.slug)!;
  return { ...featured, ...splitTitle(comparison.title) };
});

// Whatever the four above did not cover. Derived from the config rather than
// listed by hand, so a comparison added to it always reaches the home page.
const moreCards = COMPARISONS.filter(
  (comparison) => !FEATURED.some((f) => f.slug === comparison.slug)
).map((comparison) => ({ ...comparison, ...splitTitle(comparison.title) }));

export const Home = () => {
  const { strollers } = useStrollers();

  return (
    <>
      <SiteHeader />

      <Hero>
        <HeroCopy>
          <Eyebrow>Real strollers. Real parents. Real comparisons.</Eyebrow>
          <HeroTitle>
            Find the perfect stroller for your <em>next chapter</em>
          </HeroTitle>
          <HeroSubtitle>
            Compare features, see real-world differences and choose with confidence.
          </HeroSubtitle>
          <HeroSearch strollers={strollers} />
        </HeroCopy>
        <HeroImageSlot>
          <HeroImage
            src="/images/hero.jpg"
            alt="Parent pushing a dark olive pram past a terracotta wall"
          />
          <HeroFade />
        </HeroImageSlot>
      </Hero>

      <TrustBand>
        {TRUST_POINTS.map(({ Icon, title, note }) => (
          <TrustItem key={title}>
            <Icon size={28} strokeWidth={1.5} aria-hidden />
            <TrustTitle>{title}</TrustTitle>
            <TrustNote>{note}</TrustNote>
          </TrustItem>
        ))}
      </TrustBand>

      <HowSection id="how">
        <HowHeading>How it works</HowHeading>
        <Steps>
          {STEPS.map((step) => (
            <Step key={step.n}>
              <StepNumber>{step.n}</StepNumber>
              <StepBody>
                <StepTitle>{step.title}</StepTitle>
                <StepNote>{step.note}</StepNote>
              </StepBody>
            </Step>
          ))}
        </Steps>
      </HowSection>

      <PopularSection id="popular">
        <PopularHeader>
          <PopularHeading>Popular comparisons</PopularHeading>
          <PopularNote>What parents are weighing up right now</PopularNote>
        </PopularHeader>
        <CardGrid>
          {featuredCards.map((card) => (
            <Card key={card.slug} href={`/compare/${card.slug}`}>
              <CardTag>{card.tag}</CardTag>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <CardTitle>
                  {card.aName} <em>vs</em> {card.bName}
                </CardTitle>
                <CardNote>{card.note}</CardNote>
              </div>
            </Card>
          ))}
        </CardGrid>

        <MoreComparisons>
          <MoreLabel>More comparisons</MoreLabel>
          <MoreGrid>
            {moreCards.map((card) => (
              <MoreCard key={card.slug} href={`/compare/${card.slug}`}>
                <MoreTitle>
                  {card.aName} <em>vs</em> {card.bName}
                </MoreTitle>
                <MoreArrow data-arrow aria-hidden>
                  →
                </MoreArrow>
              </MoreCard>
            ))}
          </MoreGrid>
        </MoreComparisons>
      </PopularSection>

      <SiteFooter ctaLabel="Start comparing →" ctaTo="/compare/babyzen-yoyo-2-vs-bugaboo-butterfly" />
    </>
  );
};
