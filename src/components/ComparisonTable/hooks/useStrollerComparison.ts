import { useCallback, useEffect, useState } from "react";
import { AccordionsData } from "../../../types/AccordionData";
import { StrollersFeatures } from "../../../types/StrollersFeatures";

export const useStrollerComparison = (strollersIdsToCompare: number[]) => {
  const [strollerData, setStrollerData] = useState<StrollersFeatures[]>([]);
  const [accordionData, setAccordionData] = useState<AccordionsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;

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
  }, []);

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
    fetchStrollersData(strollersIdsToCompare);
  }, [fetchStrollersData, strollersIdsToCompare]);

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
