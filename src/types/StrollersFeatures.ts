export type StrollersFeatures = {
    id: number,
    modelName: string,
    alternativeModelNames?: string[]
    brand: string,
    basics : {
        type: BasicsType[],
        strollerWeight: number,
        unfoldedDimensions: {height: number, width: number, length: number},
        foldedDimensions: {height: number, width: number, length: number},
        chassisMaterial: string,
        countryOfOrigin: string
    }
};

type BasicsType = 'Pushchair (seat and chassis only)'| '2in1 stroller system'|'3in1 stroller system';
