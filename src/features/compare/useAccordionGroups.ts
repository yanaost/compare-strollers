"use client";

import { useMemo } from "react";
import { AccordionsData } from "../../types/AccordionData";
import { StrollersFeatures } from "../../types/StrollersFeatures";

/**
 * Re-pivots the dataset's grouped shape into the accordion shape SpecGroups
 * renders, where each row carries a positional `values[]` aligned to the
 * selected column order.
 *
 * Was useStrollerComparison, and was a fetch. The data is now baked into the
 * bundle and handed in, so this is a pure transform — it moved here when the
 * legacy ComparisonTable it used to live under was deleted. The padding below
 * is what keeps columns aligned when one stroller lists a feature another
 * does not.
 */
export const useAccordionGroups = (
  strollersIdsToCompare: number[],
  strollerData: StrollersFeatures[]
) => {
  const accordionData = useMemo<AccordionsData[]>(() => {
    const filteredData = strollersIdsToCompare
      .map((id) => strollerData.find((stroller) => stroller.strollerId === id))
      .filter((stroller) => stroller && stroller.groups);

    const accordionsData: AccordionsData[] = [];
    const accordionGroupKeys: string[] = [];

    strollerData.forEach((stroller, index) => {
      if (!stroller || !stroller.groups) return;
      stroller.groups.forEach((group) => {
        if (index === 0 || !accordionGroupKeys.includes(group.group.key)) {
          accordionsData.push({ ...group.group });
          accordionGroupKeys.push(group.group.key);
        }
      });
    });

    accordionsData.forEach((accordionGroup) => {
      accordionGroup.rows = [];

      filteredData.forEach((stroller, strollerIndex) => {
        const currentStrollerGroup = stroller!.groups.find(
          (strollerGroup) => strollerGroup.group.key === accordionGroup.key
        );

        currentStrollerGroup?.fields.forEach((field) => {
          const existingRow = accordionGroup.rows!.find(
            (row) => row.key === field.key
          );

          if (existingRow) {
            if (existingRow.values.length < strollerIndex) {
              const missingValuesArray = new Array(
                strollerIndex - existingRow.values.length
              ).fill("");
              existingRow.values.push(...missingValuesArray);
            }

            existingRow.values.push(field.value);
          } else {
            const valuesArray = new Array(strollerIndex).fill("");
            valuesArray.push(field.value);

            accordionGroup.rows!.push({
              title: field.title,
              key: field.key,
              values: valuesArray,
            });
          }
        });
      });
    });

    return accordionsData;
  }, [strollerData, strollersIdsToCompare]);

  return accordionData;
};
