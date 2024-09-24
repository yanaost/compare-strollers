import { StrollersFeatures } from "../types/StrollersFeatures";

export const allStrollers: StrollersFeatures[] = [
    {
        id: 12,
        modelName: 'Dragonfly',
        alternativeModelNames: [],
        brand: 'Bugaboo',
        imagePath: "../../public/hubPlus.png",
        basics: {
            type: ['Pushchair (seat and chassis only)', '2in1 stroller system', '3in1 stroller system'],
            strollerWeight: 11.5,
            unfoldedDimensions: {
                height: 106,
                width: 53,
                length: 85,
            },
            foldedDimensions: {
                height: 66,
                width: 53,
                length: 34
            },
            chassisMaterial: 'aluminum',
            countryOfOrigin: 'Netherlands',
        }
    },
    {
        id: 14,
        modelName: 'Yoyo2',
        alternativeModelNames: [],
        brand: 'Babyzen',
        imagePath: "../../public/hubPlus.png",
        basics: {
            type: ['Pushchair (seat and chassis only)'],
            strollerWeight: 6.2,
            unfoldedDimensions: {
                height: 106,
                width: 44,
                length: 86,
            },
            foldedDimensions: {
                height: 52,
                width: 44,
                length: 18
            },
            chassisMaterial: 'aluminum',
            countryOfOrigin: 'france',
        }
    },
    {
        id: 15,
        modelName: 'Aer+',
        alternativeModelNames: [],
        brand: 'Joolz',
        imagePath: "../../public/hubPlus.png",
        basics: {
            type: ['Pushchair (seat and chassis only)'],
            strollerWeight: 6,
            unfoldedDimensions: {
                height: 105.5,
                width: 45,
                length: 83,
            },
            foldedDimensions: {
                height: 55,
                width: 45,
                length: 21.5
            },
            chassisMaterial: 'aluminum',
            countryOfOrigin: 'Netherlands',
        }
    },
    {
        id: 17,
        modelName: 'Hub+',
        alternativeModelNames: [],
        brand: 'Joolz',
        imagePath: "../../public/hubPlus.png",
        groups: [
            {   
                group: {key: "basics", title: " the basics"},
                fields: [{key, title, value}, {}],
                type: ['Pushchair (seat and chassis only)', '2in1 stroller system', '3in1 stroller system'],
                strollerWeight: 11.5,
                unfoldedDimensions: {
                    height: 106,
                    width: 53,
                    length: 85,
                },
                foldedDimensions: {
                    height: 66,
                    width: 53,
                    length: 34
                },
                chassisMaterial: 'aluminum',
                countryOfOrigin: 'netherlands',
            }

        ],
    },
];
