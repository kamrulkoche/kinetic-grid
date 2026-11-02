import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "Terms | Kinetic Grid" };

export default function Terms() {
  return (
    <InfoPage
      eyebrow="Legal / Terms"
      title="Terms"
      intro="The short version: Kinetic Grid is a design concept. Nothing here is an offer of energy services."
    >
      <section>
        <h2>Concept only</h2>
        <p className="mt-2">Figures, systems and locations on this site are illustrative and should not be relied on as technical or commercial information.</p>
      </section>
      <section>
        <h2>Content</h2>
        <p className="mt-2">Imagery on this site was generated for the concept. Please don&apos;t reuse it to suggest a real product or service.</p>
      </section>
    </InfoPage>
  );
}
