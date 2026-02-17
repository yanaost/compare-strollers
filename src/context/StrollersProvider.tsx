import { useState } from "react";
import { StrollersContextType } from "../types/StrollersContextType";
import { strollersContext } from "./context";

export const StrollersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [strollersIdsToCompare, setStrollersIdsToCompare] = useState<number[]>(
    []
  );

  const normalizeIds = (ids: number[]) => {
    return Array.from(new Set(ids)).filter((id) => id > 0).slice(0, 3);
  };

  const handleAddStrollerIdToCompare = (newStrollerId: number) => {
    setStrollersIdsToCompare((currentIds) => {
      return normalizeIds([...currentIds, newStrollerId]);
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

  const handleSetStrollersIdsToCompare = (ids: number[]) => {
    setStrollersIdsToCompare(normalizeIds(ids));
  };

  const value: StrollersContextType = {
    strollersIdsToCompare,
    handleAddStrollerIdToCompare,
    handleDeleteStrollerIdFromCompare,
    setStrollersIdsToCompare: handleSetStrollersIdsToCompare,
  };

  return (
    <strollersContext.Provider value={value}>
      {children}
    </strollersContext.Provider>
  );
};
