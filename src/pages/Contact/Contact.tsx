import {
  SectionHeading,
  TextPage,
  TextSection,
} from "../../components/TextPage";

const SECTIONS: readonly TextSection[] = [
  { id: "email", label: "Email us" },
  { id: "response", label: "Response times" },
];

export const Contact = () => (
  <TextPage
    eyebrow="Contact"
    title={
      <>
        We'd love to hear <em>from you.</em>
      </>
    }
    lede="Have a question, suggestion, or found incorrect data?"
    sections={SECTIONS}
  >
    <SectionHeading id="email">Email us</SectionHeading>
    <p>
      Email us at{" "}
      <a href="mailto:hello@strollercompare.com">hello@strollercompare.com</a>.
    </p>

    <SectionHeading id="response">Response times</SectionHeading>
    <p>We aim to respond within 48 hours.</p>
  </TextPage>
);
