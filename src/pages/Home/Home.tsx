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
    const indextoDelete = copyStrollersIds.indexOf(strollerId);

    if (indextoDelete !== -1) {
      copyStrollersIds.splice(indextoDelete);
    }

    setStrollersIdsToCompare(copyStrollersIds);
  };

  return (
    <>
      <AppBarSearch handleAddStrollerIdToCompare={addNewStrollerId} />
      <Box component="main">
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
