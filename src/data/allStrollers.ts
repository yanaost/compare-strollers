import { StrollersFeatures } from "../types/StrollersFeatures";

export const allStrollers: StrollersFeatures[] = [
    {
        id: 12,
        modelName: 'Dragonfly',
        alternativeModelNames: [],
        brand: 'Bugaboo',
        imagePath: "../../public/hubPlus.png",
        groups: [
            {   
                group: {key: "basics", title: "basics"},
                fields: [
                    {key: "type", title: "type", value: 'Pushchair (seat and chassis only), 2in1 stroller system, 3in1 stroller system'}, 
                    {key: "strollerWeight", title: "stroller weight", value: "7.9 kg"},
                    {key: "unfoldedDimensions", title: "unfolded dimensions", value: "106 cm x 52 cm x 104 cm"},
                    {key: "foldedDimensions", title: "folded dimensions", value: "90 cm x 52 cm x 36 cm"},
                    {key: "chassisMaterial", title: "chassis material", value: "Aluminum"},
                    {key: "countryOfOrigin", title: "country of origin", value: "Netherlands"}
                ],
            },
            {
                group: {key: "seatUnit", title: "seat unit"},
                fields: [
                    {key: "maximumWeightSapacitySeat ", title: "Maximum weight capacity - seat load", value: "22 kg" },
                    {key: "recommendedAgeRange", title: "Recommended age range (best to use with a child of)", value: "0-36 months" },
                    {key: "reversibleSeatUnit", title: "Reversible seat unit", value: "Yes" },
                    {key: "easyReleaseMemoryButtons", title: "Easy-release memory button(s) on the seat or the carrycot", value: "Yes" },
                    {key: "lShapedBucketTypeSeatUnit", title: "L-shaped, bucket-type seat unit", value: "Yes" },
                    {key: "recliningBackrest", title: "Reclining backrest", value: "Yes, 3 positions" },
                    {key: "fullReclineBackrest", title: "Full-recline backrest (a bigger-than-a-150-degree-angle to a lie-flat)", value: "Yes" },
                    {key: "backrestReclineType", title: "Backrest recline type", value: "Rear-located recline mechanism (e.g., lever-operated)" },
                    {key: "oneHandBackrestReclineSystem", title: "One-hand backrest recline system", value: "Yes" },
                    {key: "extendableBackrest", title: "Extendable backrest", value: "No" },
                    {key: "legrestPositioning", title: "Legrest positioning", value: "Yes, 3 positions" },
                    {key: "extendableLegRest", title: "Extendable leg rest", value: "No" },
                    {key: "wipeCleanLayerOnTheLegRest", title: "Wipe-clean layer on the leg rest", value: "No" },
                    {key: "footrest", title: "Footrest", value: "Yes" },
                    // {key: "backrestHeight", title: "Backrest height", value: "43 cm" },
                    // {key: "widthDepthOfTheSittingSurface", title: "Width and depth of the sitting surface", value: "31 x 30 cm" },
                    // {key: "totalLengthOfTheSeatUnit", title: "Total length of the seat unit", value: "73 cm" },
                    {key: "higherSeatInitPosition", title: "A higher seat unit's position on the chassis", value: "No" },
                    {key: "heightAdjustableSeat", title: "Height-adjustable seat", value: "No" },
                    {key: "seatUnitProperAttachmentIndicator", title: "Seat unit's proper attachment indicator", value: "No" },
                    {key: "2in1ConvertibleCarrycotSeatUnit", title: "2in1 convertible carrycot/seat unit (pramette travel system)", value: "No" },
                    {key: "fabricsRemovableForCleaning", title: "Fabrics removable for cleaning", value: "Yes" },
                    {key: "seatFabricsCleaning", title: "Seat fabrics cleaning", value: "Machine washable" },
                    {key: "safetyHarnessType", title: "Safety harness type", value: "5-point" },
                    {key: "harnessPadding", title: "Harness padding", value: "Yes" },
                    {key: "heightAdjustableHarnessBelts", title: "Height-adjustable harness belts", value: "Yes" },
                    {key: "ventilationIntegratedIntoTheSeat", title: "Ventilation integrated into the seat", value: "No" },
                    {key: "secondSeatCanBeAttached", title: "Second seat can be attached (single-to-double convertibility)", value: "No" },
                ]
            }
        ],
    },
    {
        id: 14,
        modelName: 'Yoyo2',
        alternativeModelNames: [],
        brand: 'Babyzen',
        imagePath: "../../public/hubPlus.png",
        groups: [
            {   
                group: {key: "basics", title: "basics"},
                fields: [
                    {key: "type", title: "type", value: 'Pushchair (seat and chassis only)'}, 
                    {key: "strollerWeight", title: "stroller weight", value: "6.2 kg"},
                    {key: "unfoldedDimensions", title: "unfolded dimensions", value: "106 cm x 44 cm x 86 cm"},
                    {key: "foldedDimensions", title: "folded dimensions", value: "52 cm x 44 cm x 18 cm"},
                    {key: "chassisMaterial", title: "chassis material", value: "Aluminum"},
                    {key: "countryOfOrigin", title: "country of origin", value: "France"}
                ],
            },
            {
                group: {key: "seatUnit", title: "seat unit"},
                fields: [
                    {key: "maximumWeightSapacitySeat ", title: "Maximum weight capacity - seat load", value: "22 kg" },
                    {key: "recommendedAgeRange", title: "Recommended age range (best to use with a child of)", value: "0-36 months" },
                    {key: "reversibleSeatUnit", title: "Reversible seat unit", value: "No" },
                    // {key: "easyReleaseMemoryButtons", title: "Easy-release memory button(s) on the seat or the carrycot", value: "" },
                    {key: "lShapedBucketTypeSeatUnit", title: "L-shaped, bucket-type seat unit", value: "No" },
                    {key: "recliningBackrest", title: "Reclining backrest", value: "Yes, infinite recline" },
                    {key: "fullReclineBackrest", title: "Full-recline backrest (a bigger-than-a-150-degree-angle to a lie-flat)", value: "No" },
                    {key: "backrestReclineType", title: "Backrest recline type", value: "Strap-operated" },
                    {key: "oneHandBackrestReclineSystem", title: "One-hand backrest recline system", value: "No" },
                    {key: "extendableBackrest", title: "Extendable backrest", value: "No" },
                    {key: "legrestPositioning", title: "Legrest positioning", value: "No" },
                    {key: "extendableLegRest", title: "Extendable leg rest", value: "No" },
                    // {key: "wipeCleanLayerOnTheLegRest", title: "Wipe-clean layer on the leg rest", value: "" },
                    {key: "footrest", title: "Footrest", value: "Yes" },
                    {key: "backrestHeight", title: "Backrest height", value: "43 cm" },
                    {key: "widthDepthOfTheSittingSurface", title: "Width and depth of the sitting surface", value: "31 x 30 cm" },
                    {key: "totalLengthOfTheSeatUnit", title: "Total length of the seat unit", value: "73 cm" },
                    {key: "higherSeatInitPosition", title: "A higher seat unit's position on the chassis", value: "No" },
                    {key: "heightAdjustableSeat", title: "Height-adjustable seat", value: "No" },
                    {key: "seatUnitProperAttachmentIndicator", title: "Seat unit's proper attachment indicator", value: "No" },
                    {key: "2in1ConvertibleCarrycotSeatUnit", title: "2in1 convertible carrycot/seat unit (pramette travel system)", value: "No" },
                    {key: "fabricsRemovableForCleaning", title: "Fabrics removable for cleaning", value: "Yes" },
                    {key: "seatFabricsCleaning", title: "Seat fabrics cleaning", value: "Machine washable" },
                    {key: "safetyHarnessType", title: "Safety harness type", value: "5-point" },
                    {key: "harnessPadding", title: "Harness padding", value: "Yes" },
                    {key: "heightAdjustableHarnessBelts", title: "Height-adjustable harness belts", value: "Yes" },
                    {key: "ventilationIntegratedIntoTheSeat", title: "Ventilation integrated into the seat", value: "Yes" },
                    {key: "secondSeatCanBeAttached", title: "Second seat can be attached (single-to-double convertibility)", value: "No" },
                ]
            }
        ],
    },
    {
        id: 15,
        modelName: 'Aer+',
        alternativeModelNames: [],
        brand: 'Joolz',
        imagePath: "../../public/hubPlus.png",
        groups: [
            {   
                group: {key: "basics", title: "basics"},
                fields: [
                    {key: "type", title: "type", value: 'Pushchair (seat and chassis only)'}, 
                    {key: "strollerWeight", title: "stroller weight", value: "6.4 kg"},
                    {key: "unfoldedDimensions", title: "unfolded dimensions", value: "105.5 cm x 45 cm x 83 cm"},
                    {key: "foldedDimensions", title: "folded dimensions", value: "53.5 cm x 45 cm x 21.5 cm"},
                    {key: "chassisMaterial", title: "chassis material", value: "Aluminum"},
                    {key: "countryOfOrigin", title: "country of origin", value: "Netherlands"}
                ],
            },
            {
                group: {key: "seatUnit", title: "seat unit"},
                fields: [
                    {key: "maximumWeightSapacitySeat ", title: "Maximum weight capacity - seat load", value: "22 kg" },
                    {key: "recommendedAgeRange", title: "Recommended age range (best to use with a child of)", value: "4-42 months" },
                    {key: "reversibleSeatUnit", title: "Reversible seat unit", value: "No" },
                    // {key: "easyReleaseMemoryButtons", title: "Easy-release memory button(s) on the seat or the carrycot", value: "" },
                    {key: "lShapedBucketTypeSeatUnit", title: "L-shaped, bucket-type seat unit", value: "No" },
                    {key: "recliningBackrest", title: "Reclining backrest", value: "Yes, infinite recline" },
                    {key: "fullReclineBackrest", title: "Full-recline backrest (a bigger-than-a-150-degree-angle to a lie-flat)", value: "No" },
                    {key: "backrestReclineType", title: "Backrest recline type", value: "Zipper, Strap-operated" },
                    {key: "oneHandBackrestReclineSystem", title: "One-hand backrest recline system", value: "No" },
                    {key: "extendableBackrest", title: "Extendable backrest", value: "No" },
                    {key: "legrestPositioning", title: "Legrest positioning", value: "No" },
                    {key: "extendableLegRest", title: "Extendable leg rest", value: "No" },
                    // {key: "wipeCleanLayerOnTheLegRest", title: "Wipe-clean layer on the leg rest", value: "" },
                    {key: "footrest", title: "Footrest", value: "Yes" },
                    {key: "backrestHeight", title: "Backrest height", value: "54.5 cm" },
                    {key: "widthDepthOfTheSittingSurface", title: "Width and depth of the sitting surface", value: "38 x 25.5 cm" },
                    {key: "totalLengthOfTheSeatUnit", title: "Total length of the seat unit", value: "80.5 cm" },
                    {key: "higherSeatInitPosition", title: "A higher seat unit's position on the chassis", value: "No" },
                    {key: "heightAdjustableSeat", title: "Height-adjustable seat", value: "No" },
                    {key: "seatUnitProperAttachmentIndicator", title: "Seat unit's proper attachment indicator", value: "No" },
                    {key: "2in1ConvertibleCarrycotSeatUnit", title: "2in1 convertible carrycot/seat unit (pramette travel system)", value: "No" },
                    {key: "fabricsRemovableForCleaning", title: "Fabrics removable for cleaning", value: "Yes" },
                    {key: "seatFabricsCleaning", title: "Seat fabrics cleaning", value: "Wipe-clean only" },
                    {key: "safetyHarnessType", title: "Safety harness type", value: "5-point" },
                    {key: "harnessPadding", title: "Harness padding", value: "Yes" },
                    {key: "heightAdjustableHarnessBelts", title: "Height-adjustable harness belts", value: "Yes" },
                    {key: "ventilationIntegratedIntoTheSeat", title: "Ventilation integrated into the seat", value: "No" },
                    {key: "secondSeatCanBeAttached", title: "Second seat can be attached (single-to-double convertibility)", value: "No" },
                ]
            }
        ],
    },
    {
        id: 17,
        modelName: 'Hub+',
        alternativeModelNames: [],
        brand: 'Joolz',
        imagePath: "../../public/hubPlus.png",
        groups: [
            {   
                group: {key: "basics", title: "basics"},
                fields: [
                    {key: "type", title: "type", value: 'Pushchair (seat and chassis only), 2in1 stroller system, 3in1 stroller system'}, 
                    {key: "strollerWeight", title: "stroller weight", value: "11.5 kg"},
                    {key: "unfoldedDimensions", title: "unfolded dimensions", value: "106 cm x 53 cm x 85 cm"},
                    {key: "foldedDimensions", title: "folded dimensions", value: "66 cm x 53 cm x 34 cm"},
                    {key: "chassisMaterial", title: "chassis material", value: "Aluminum"},
                    {key: "countryOfOrigin", title: "country of origin", value: "Netherlands"}
                ],
            },
            {
                group: {key: "seatUnit", title: "seat unit"},
                fields: [
                    {key: "maximumWeightSapacitySeat ", title: "Maximum weight capacity - seat load", value: "20 kg" },
                    {key: "recommendedAgeRange", title: "Recommended age range (best to use with a child of)", value: "0-36 months" },
                    {key: "reversibleSeatUnit", title: "Reversible seat unit", value: "Yes" },
                    {key: "easyReleaseMemoryButtons", title: "Easy-release memory button(s) on the seat or the carrycot", value: "No" },
                    {key: "lShapedBucketTypeSeatUnit", title: "L-shaped, bucket-type seat unit", value: "No" },
                    {key: "recliningBackrest", title: "Reclining backrest", value: "Yes, 3 positions" },
                    {key: "fullReclineBackrest", title: "Full-recline backrest (a bigger-than-a-150-degree-angle to a lie-flat)", value: "Yes" },
                    {key: "backrestReclineType", title: "Backrest recline type", value: "Rear-located recline mechanism (e.g., lever-operated)" },
                    {key: "oneHandBackrestReclineSystem", title: "One-hand backrest recline system", value: "Yes" },
                    {key: "extendableBackrest", title: "Extendable backrest", value: "No" },
                    {key: "legrestPositioning", title: "Legrest positioning", value: "Yes, 3 positions" },
                    {key: "extendableLegRest", title: "Extendable leg rest", value: "No" },
                    {key: "wipeCleanLayerOnTheLegRest", title: "Wipe-clean layer on the leg rest", value: "No" },
                    {key: "footrest", title: "Footrest", value: "Yes" },
                    {key: "backrestHeight", title: "Backrest height", value: "52 cm" },
                    {key: "widthDepthOfTheSittingSurface", title: "Width and depth of the sitting surface", value: "30 x 23.5 cm" },
                    {key: "totalLengthOfTheSeatUnit", title: "Total length of the seat unit", value: "94 cm" },
                    {key: "higherSeatInitPosition", title: "A higher seat unit's position on the chassis", value: "No" },
                    {key: "heightAdjustableSeat", title: "Height-adjustable seat", value: "No" },
                    {key: "seatUnitProperAttachmentIndicator", title: "Seat unit's proper attachment indicator", value: "No" },
                    {key: "2in1ConvertibleCarrycotSeatUnit", title: "2in1 convertible carrycot/seat unit (pramette travel system)", value: "Yes" },
                    {key: "fabricsRemovableForCleaning", title: "Fabrics removable for cleaning", value: "Yes" },
                    {key: "seatFabricsCleaning", title: "Seat fabrics cleaning", value: "Machine washable" },
                    {key: "safetyHarnessType", title: "Safety harness type", value: "5-point" },
                    {key: "harnessPadding", title: "Harness padding", value: "Yes" },
                    {key: "heightAdjustableHarnessBelts", title: "Height-adjustable harness belts", value: "Yes" },
                    {key: "ventilationIntegratedIntoTheSeat", title: "Ventilation integrated into the seat", value: "No" },
                    {key: "secondSeatCanBeAttached", title: "Second seat can be attached (single-to-double convertibility)", value: "No" },
                ]
            },
            { group : {key: "canopyHood", title: "Canopy (hood)"},
            fields: [
                {key: "seatUnitEquippedWithACanopyHood", title: "Seat unit equipped with a canopy/hood", value: "Yes"},
                {key: "extendableCanopyHood", title: "Extendable canopy/hood", value: "Yes"}
            ]
        }
        ],
    },
];
