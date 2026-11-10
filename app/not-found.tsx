import type { Metadata } from "next";
import { NotFound } from "../src/views/NotFound";

// Noindex rather than left to chance: static export serves this file for any
// unmatched path, and there is no useful page behind the status code.
export const metadata: Metadata = {
  title: "Page not found — Compare strollers",
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return <NotFound />;
}
