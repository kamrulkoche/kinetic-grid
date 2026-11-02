import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "Privacy | Kinetic Grid" };

export default function Privacy() {
  return (
    <InfoPage
      eyebrow="Legal / Privacy"
      title="Privacy"
      intro="Kinetic Grid is a fictional energy concept. This page explains, plainly, what this site does with the little information it touches."
    >
      <section>
        <h2>What we collect</h2>
        <p className="mt-2">
          Only what you type into the update and contact forms. Those submissions are validated and acknowledged, but this concept build does not store them.
        </p>
      </section>
      <section>
        <h2>Cookies & tracking</h2>
        <p className="mt-2">The site sets no tracking cookies and loads no analytics or advertising scripts.</p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p className="mt-2">Because nothing is retained, there is nothing to delete. If that changes, this page will say so first.</p>
      </section>
    </InfoPage>
  );
}
