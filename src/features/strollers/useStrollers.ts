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

/** Separates one stroller from the next in a /compare/ path. */
export const VS = "-vs-";

/**
 * "Joolz Aer+" → "joolz-aer-plus".
 *
 * Deliberately produces the same spelling as the hand-written slugs in
 * src/config/comparisons.ts, so a curated link and a generated one are the same
 * URL rather than two URLs serving one page.
 */
export const strollerSlug = (modelName: string) =>
  modelName
    .toLowerCase()
    .replace(/\+/g, "-plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Two strollers or three, as names: /compare/babyzen-yoyo-2-vs-joolz-aer.
 *
 * Falls back to the id for a stroller the list does not know about, which the
 * route resolves part by part — so a half-known path still works.
 */
export const comparePath = (
  strollers: StrollerSummary[],
  ...ids: number[]
) => {
  const byId = new Map(strollers.map((s) => [s.strollerId, s.modelName]));
  const parts = ids.map((id) => {
    const modelName = byId.get(id);
    return modelName ? strollerSlug(modelName) : String(id);
  });
  return `/compare/${parts.join(VS)}`;
};
