"use client";

import { useCallback, useEffect, useState } from "react";
import { AccordionsData } from "../../../types/AccordionData";
import { StrollersFeatures } from "../../../types/StrollersFeatures";
import { API_BASE_URL } from "../../../config/api";

/**
 * Comparison payload for the selected ids.
 *
 * `initialData` is the prerendered route's build-time payload. When it already
 * covers the requested ids the fetch below never runs, so a curated comparison
 * costs no request at all; uncurated slugs fall through and fetch as before.
 */
export const useStrollerComparison = (
  strollersIdsToCompare: number[],
  initialData?: StrollersFeatures[]
) => {
  const [strollerData, setStrollerData] = useState<StrollersFeatures[]>(
    initialData ?? []
  );
  const [accordionData, setAccordionData] = useState<AccordionsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = API_BASE_URL;

  const fetchStrollersData = useCallback(async (selectedIds: number[]) => {
    if (selectedIds.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/api/strollers/comparison-data?ids=${selectedIds.join(
          ","
        )}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status" ${response.status}`)
      }

      const data: StrollersFeatures[] = await response.json();
      setStrollerData(data);
    } catch (error) {
      console.error("Error fetching stroller data:", error);
      setError("Failed to fetch stroller data")
    } finally {
      setLoading(false)
    }
  }, [apiUrl]);

  const modifyStrollersDataForAccordions = useCallback(
    (ids: number[]) => {
      const filteredData = ids
        .map((id) =>
          strollerData.find((stroller) => stroller.strollerId === id)
        )
        .filter((stroller) => stroller && stroller.groups);

      const accordionsData: AccordionsData[] = [];
      const accordionGroupKeys: string[] = [];

      strollerData.forEach((stroller, index) => {
        if (!stroller || !stroller.groups) return;
        stroller!.groups.forEach((group) => {
          if (index === 0 || !accordionGroupKeys.includes(group.group.key)) {
            accordionsData.push(group.group);
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
    },
    [strollerData]
  );

  useEffect(() => {
    // Whatever is already in state — seeded from the server, or fetched for a
    // previous selection — may already answer this one. Removing a column, for
    // instance, needs no new request.
    const covered =
      strollersIdsToCompare.length > 0 &&
      strollersIdsToCompare.every((id) =>
        strollerData.some((stroller) => stroller.strollerId === id)
      );
    if (covered) return;

    fetchStrollersData(strollersIdsToCompare);
  }, [fetchStrollersData, strollersIdsToCompare, strollerData]);

  useEffect(() => {
    if (strollerData.length > 0) {
      const accordionData = modifyStrollersDataForAccordions(
        strollersIdsToCompare
      );
      setAccordionData(accordionData);
    }
  }, [modifyStrollersDataForAccordions, strollerData, strollersIdsToCompare]);

  return {
    strollerData,
    accordionData,
    loading,
    error,
  };
};
