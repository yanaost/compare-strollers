import type { Metadata } from "next";
import { Home } from "../src/views/Home";

// Set here rather than inherited from the layout: the layout's title is the
// fallback for routes that do not care, and the home page is not one of them.
export const metadata: Metadata = {
  title: "Compare strollers side by side — specs, weight and fold size",
  description:
    "Put two or three strollers next to each other and read the same specs for each: weight, fold size, max child weight, basket load and recline.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <Home />;
}
