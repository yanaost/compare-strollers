import type { Metadata } from "next";
import { Contact } from "../../src/views/Contact";

export const metadata: Metadata = { title: "Contact — Compare strollers" };

export default function ContactPage() {
  return <Contact />;
}
