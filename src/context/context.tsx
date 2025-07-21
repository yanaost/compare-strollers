import { createContext } from "react";
import { StrollersContextType } from "../types/StrollersContextType";

export const strollersContext = createContext<StrollersContextType>({
  strollersIdsToCompare: [],
  handleAddStrollerIdToCompare: () => "",
  handleDeleteStrollerIdFromCompare: () => "",
});
