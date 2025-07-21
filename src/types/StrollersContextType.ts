export type StrollersContextType = {
    strollersIdsToCompare: number [];
    handleAddStrollerIdToCompare: (id: number) => void,
    handleDeleteStrollerIdFromCompare: (id: number) => void
};
