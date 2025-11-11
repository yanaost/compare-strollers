import { useState } from "react";
import { StrollersContextType } from "../types/StrollersContextType";
import { strollersContext } from "./context";

export const StrollersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [strollersIdsToCompare, setStrollersIdsToCompare] = useState<number[]>(
    []
  );

  const handleAddStrollerIdToCompare = (newStrollerId: number) => {
    setStrollersIdsToCompare((currentIds) => {
      if (currentIds.length >= 3 || currentIds.includes(newStrollerId)) {
        return currentIds;
      }

      return [...currentIds, newStrollerId];
    });
  };

  const handleDeleteStrollerIdFromCompare = (strollerId: number) => {
    const copyStrollersIds = [...strollersIdsToCompare];
    const indexToDelete = copyStrollersIds.indexOf(strollerId);

    if (indexToDelete !== -1) {
      copyStrollersIds.splice(indexToDelete, 1);
    }

    setStrollersIdsToCompare(copyStrollersIds);
  };

  const value: StrollersContextType = {
    strollersIdsToCompare,
    handleAddStrollerIdToCompare,
    handleDeleteStrollerIdFromCompare,
  };

  return (
    <strollersContext.Provider value={value}>
      {children}
    </strollersContext.Provider>
  );
};
