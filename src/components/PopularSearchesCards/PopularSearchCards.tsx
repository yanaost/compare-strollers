import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { COMPARISONS } from "../../config/comparisons";
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
  slug: string;
};

type Props = {
  items?: PopularSearchCard[];
  onSelectSearch?: (query: string) => void;
};

const POPULAR_SEARCHES: PopularSearchCard[] = COMPARISONS.map((c) => ({
  id: c.slug,
  title: c.title,
  slug: c.slug,
}));

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
              component={Link}
              to={`/compare/${card.slug}`}
              onClick={() => onSelectSearch?.(card.title)}
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
