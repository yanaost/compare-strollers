import { useEffect, useState } from "react";

export type StrollerSummary = {
  strollerId: number;
  modelName: string;
  brand: string;
  imagePath: string;
  alternativeModelNames?: string[];
};

const apiUrl = import.meta.env.VITE_BASE_URL;

export const useStrollers = () => {
  const [strollers, setStrollers] = useState<StrollerSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/strollers/test-all`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data: StrollerSummary[] = await response.json();
        if (active) setStrollers(data);
      } catch (error) {
        console.error("Failed to load strollers:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  return { strollers, loading };
};

export const searchStrollers = (
  strollers: StrollerSummary[],
  query: string
): StrollerSummary[] => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return strollers.slice(0, 5);

  return strollers.filter((s) =>
    [s.modelName, s.brand, ...(s.alternativeModelNames ?? [])]
      .join(" ")
      .toLowerCase()
      .includes(trimmed)
  );
};

// Two ids or three — the Comparison route scrapes the digits back out.
export const comparePath = (...ids: number[]) => `/compare/${ids.join("-vs-")}`;
