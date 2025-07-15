import { useState } from "react";
import { AppBarSearch } from "../../components/AppBarSearch";
import { Box } from "@mui/material";
import { ComparisonTable } from "../../components/ComparisonTable";

export const Home = () => {
  const [strollersIdsToCompare, setStrollersIdsToCompare] = useState<number[]>(
    []
  );

  const addNewStrollerId = (newStrollerId: number) => {
    if (
      setStrollersIdsToCompare.length === 0 ||
      !strollersIdsToCompare.includes(newStrollerId)
    ) {
      const copyStrollersIds = [...strollersIdsToCompare];
      copyStrollersIds.push(newStrollerId);

      return setStrollersIdsToCompare(copyStrollersIds);
    }
  };

  const deleteStrollerIdFromCompare = (strollerId: number) => {
    const copyStrollersIds = [...strollersIdsToCompare];
    const indexToDelete = copyStrollersIds.indexOf(strollerId);

    if (indexToDelete !== -1) {
      copyStrollersIds.splice(indexToDelete, 1);
    }

    setStrollersIdsToCompare(copyStrollersIds);
  };

  return (
    <>
      <AppBarSearch handleAddStrollerIdToCompare={addNewStrollerId} />
      <Box component="main" sx={{ overflowX: "scroll" }}>
        {strollersIdsToCompare.length > 0 && (
          <ComparisonTable
            strollersIdsToCompare={strollersIdsToCompare}
            handleDeleteStrollerIdFromCompare={deleteStrollerIdFromCompare}
          />
        )}
      </Box>
    </>
  );
};
