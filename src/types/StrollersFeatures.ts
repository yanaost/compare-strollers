export type StrollersFeatures = {
    id: number,
    modelName: string,
    alternativeModelNames?: string[]
    brand: string,
    imagePath: string,
    groups?: {
        group: {key: string, title: string},
        fields: 
            {key: string, title: string, value: string} [], 
    } []
};
