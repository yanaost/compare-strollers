import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { AppBarSearch } from "../../components/AppBarSearch";
import { ComparisonTable } from "../../components/ComparisonTable";
import { PopularSearchCards } from "../../components/PopularSearchesCards";
import { COMPARISONS } from "../../config/comparisons";
import { strollersContext } from "../../context/context";
import { Footer } from "../../components/Footer";

const comparisonsBySlug = new Map(
  COMPARISONS.map((c) => [c.slug, c.ids])
);

const parseComparisonIds = (raw: string | undefined): number[] => {
  if (!raw) return [];
  const knownIds = comparisonsBySlug.get(raw);
  if (knownIds) return knownIds;
  const matches = raw.match(/\d+/g);
  if (!matches) return [];
  return matches.map(Number).filter((id) => Number.isFinite(id) && id > 0);
};

export const Comparison = () => {
  const { slug } = useParams();
  const { strollersIdsToCompare, setStrollersIdsToCompare } =
    useContext(strollersContext);

  const parsedIds = useMemo(() => {
    const ids = parseComparisonIds(slug);
    return ids.length >= 2 ? ids.slice(0, 3) : ids;
  }, [slug]);

  useEffect(() => {
    setStrollersIdsToCompare(parsedIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedIds]);

  return (
    <>
      <AppBarSearch />
      <Box component="main" sx={{ overflowX: "scroll" }}>
        {strollersIdsToCompare.length > 0 ? (
          <Box sx={{ overflowX: "auto" }}>
            <ComparisonTable />
          </Box>
        ) : (
          <Box sx={{ px: 3, py: 6 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              No comparison selected yet
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Pick a popular comparison below or search above to get started.
            </Typography>
          </Box>
        )}
        <PopularSearchCards />
        <Footer />
      </Box>
    </>
  );
};
