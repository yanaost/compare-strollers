import { useContext, useEffect } from "react";
import { strollersContext } from "../../context/context";
import { AppBarSearch } from "../../components/AppBarSearch";
import { Box } from "@mui/material";
import { ComparisonTable } from "../../components/ComparisonTable";
import { PopularSearchCards } from "../../components/PopularSearchesCards";
import { FooterPreview } from "../../components/Footer";

export const Home = () => {
  const { strollersIdsToCompare, setStrollersIdsToCompare } =
    useContext(strollersContext);

  useEffect(() => {
    setStrollersIdsToCompare([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <AppBarSearch />
      <Box component="main" sx={{ overflowX: "scroll" }}>
        {strollersIdsToCompare.length > 0 && (
          <Box sx={{ overflowX: "auto" }}>
            <ComparisonTable />
          </Box>
        )}
        <PopularSearchCards />
        <FooterPreview />
      </Box>
    </>
  );
};
