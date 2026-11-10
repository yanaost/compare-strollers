"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/api";
import type { StrollerSummary } from "./paths";

// The path helpers moved to ./paths so server components can use them. Kept
// re-exported here so existing call sites import from one place as before.
export { VS, comparePath, searchStrollers, strollerSlug } from "./paths";
export type { StrollerSummary } from "./paths";

const apiUrl = API_BASE_URL;

/**
 * The stroller list, fetched in the browser.
 *
 * Prerendered routes pass the list down from the server instead — see
 * `initial`, which makes this a no-op rather than a second request.
 */
export const useStrollers = (initial?: StrollerSummary[]) => {
  const [strollers, setStrollers] = useState<StrollerSummary[]>(initial ?? []);
  const [loading, setLoading] = useState(!initial);

  useEffect(() => {
    if (initial) return;

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
  }, [initial]);

  return { strollers, loading };
};
