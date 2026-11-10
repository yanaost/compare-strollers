import type { Metadata } from "next";
import { About } from "../../src/views/About";

export const metadata: Metadata = { title: "About — Compare strollers" };

export default function AboutPage() {
  return <About />;
}
