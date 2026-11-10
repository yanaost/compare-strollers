import type { Metadata } from "next";
import { Contact } from "../../src/views/Contact";

export const metadata: Metadata = {
  title: "Contact — Compare strollers",
  description:
    "Spotted a wrong spec, or want a stroller added to the comparisons? Write to us — we read every message and aim to reply within 48 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
