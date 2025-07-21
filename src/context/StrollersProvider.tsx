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
    if (
      setStrollersIdsToCompare.length === 0 ||
      !strollersIdsToCompare.includes(newStrollerId)
    ) {
      const copyStrollersIds = [...strollersIdsToCompare];
      copyStrollersIds.push(newStrollerId);

      return setStrollersIdsToCompare(copyStrollersIds);
    }
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
