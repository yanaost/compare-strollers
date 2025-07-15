export type StrollersFeatures = {
    strollerId: number,
    modelName: string,
    alternativeModelNames?: string[]
    brand: string,
    modelDescription: string,
    imagePath: string,
    groups: {
        group: {key: string, title: string},
        fields: 
            {key: string, title: string, value: string} [], 
    } []
};
