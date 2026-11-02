import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "Contact | Kinetic Grid" };

export default function Contact() {
  return (
    <InfoPage
      eyebrow="Get in touch"
      title="Contact"
      intro="Questions about the concept, a location you'd like to see on the grid, or just want to talk motion? Send a note."
    >
      <ContactForm />
    </InfoPage>
  );
}
