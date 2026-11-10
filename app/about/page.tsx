import type { Metadata } from "next";
import { About } from "../../src/views/About";

export const metadata: Metadata = {
  title: "About — Compare strollers",
  description:
    "Why CompareStrollers exists, where the specs come from, and how we decide which stroller comes out ahead. No affiliate links, no paid placements.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <About />;
}
