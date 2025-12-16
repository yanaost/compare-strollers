import { useContext } from "react";
import { strollersContext } from "../../context/context";
import { AppBarSearch } from "../../components/AppBarSearch";
import { Box } from "@mui/material";
import { ComparisonTable } from "../../components/ComparisonTable";
import { PopularSearchCards } from "../../components/PopularSearchesCards";

export const Home = () => {
  const { strollersIdsToCompare } = useContext(strollersContext);
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
      </Box>
    </>
  );
};
