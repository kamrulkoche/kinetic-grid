import { CtaBand } from "@/components/cta/CtaBand";
import { Hero } from "@/components/hero/Hero";
import { Outputs } from "@/components/outputs/Outputs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SystemCards } from "@/components/systems/SystemCards";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Outputs />
        <SystemCards />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
