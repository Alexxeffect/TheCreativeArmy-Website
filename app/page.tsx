import ClientStrip from "@/components/ClientStrip";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Offer from "@/components/Offer";
import Testimonials from "@/components/Testimonials";
import WorkSection from "@/components/WorkSection";

/**
 * The landing page. It only arranges sections; all the words live in
 * content/site.ts and each section is its own component.
 * Order follows the Figma frame "Landing Page V3".
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WorkSection />
        <ClientStrip />
        <Offer />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
