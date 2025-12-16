import { Typography } from "@mui/material";

import {
  Section,
  SectionContent,
  SectionHeading,
  CardsGrid,
  CardButton,
  CardBody,
  CardTitle,
} from "./PopularSearchCards.styled";

export type PopularSearchCard = {
  id: string;
  title: string;
  query: string;
};

type Props = {
  items?: PopularSearchCard[];
  onSelectSearch?: (query: string) => void;
};

const POPULAR_SEARCHES: PopularSearchCard[] = [
  {
    id: "yoyo2-aer",
    title: "Yoyo2 vs Aer Plus",
    query: "babyzen yoyo2 vs joovy aer plus",
  },
  {
    id: "vista-fox",
    title: "Vista V2 vs Fox 5",
    query: "uppababy vista v2 vs bugaboo fox 5",
  },
  {
    id: "cruz-pipa",
    title: "Cruz V2 vs Nuna Mixx",
    query: "uppababy cruz v2 vs nuna mixx",
  },
  {
    id: "double-mini",
    title: "Donkey 5 vs Vista Twin",
    query: "bugaboo donkey 5 vs uppababy vista twin",
  },
  {
    id: "joggers",
    title: "Urban Glide vs Alterrain",
    query: "thule urban glide vs bob alterrain",
  },
  {
    id: "budget",
    title: "Mockingbird vs Pivot Xpand",
    query: "mockingbird vs evenflo pivot xpand",
  },
];

export const PopularSearchCards: React.FC<Props> = ({
  items = POPULAR_SEARCHES,
  onSelectSearch,
}) => {
  return (
    <Section aria-labelledby="popular-searches-heading">
      <SectionContent>
        <SectionHeading>
          <Typography
            id="popular-searches-heading"
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 500,
              letterSpacing: -0.3,
              mb: 1,
            }}
          >
            Popular searches
          </Typography>

          <Typography
            variant="body2"
            sx={{ opacity: 0.65, maxWidth: 420, mx: "auto" }}
          >
            Quick comparisons parents search most.
          </Typography>
        </SectionHeading>

        <CardsGrid>
          {items.map((card) => (
            <CardButton
              key={card.id}
              onClick={() => onSelectSearch?.(card.query)}
              disabled={!onSelectSearch}
              focusRipple
            >
              <CardBody>
                <CardTitle variant="subtitle1" component="h3">
                  {card.title}
                </CardTitle>
              </CardBody>
            </CardButton>
          ))}
        </CardsGrid>
      </SectionContent>
    </Section>
  );
};
