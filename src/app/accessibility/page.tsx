import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "Accessibility | Kinetic Grid" };

export default function Accessibility() {
  return (
    <InfoPage
      eyebrow="Legal / Accessibility"
      title="Accessibility"
      intro="Motion is the heart of this concept, but it should never be a barrier."
    >
      <section>
        <h2>Reduced motion</h2>
        <p className="mt-2">
          If your system asks for reduced motion, the scroll-driven zoom and blur effects are turned off and content simply fades in.
        </p>
      </section>
      <section>
        <h2>Keyboard & screen readers</h2>
        <p className="mt-2">
          Every control is reachable by keyboard, dialogs trap focus and close with Escape, and decorative imagery is hidden from assistive technology.
        </p>
      </section>
      <section>
        <h2>Contrast</h2>
        <p className="mt-2">Text sits on darkened scrims over imagery to keep contrast readable throughout the hero sequence.</p>
      </section>
    </InfoPage>
  );
}
