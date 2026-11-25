import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Testimonials from "@/components/Testimonials";
import ToneShift from "@/components/ToneShift";
import TrustedBy from "@/components/TrustedBy";
import WhyUs from "@/components/WhyUs";
import WorkSection from "@/components/WorkSection";

/**
 * The landing page. It only arranges sections; all the words live in
 * content/site.ts and each section is its own component.
 * Order follows the Figma frame "Updated landing page" (917:1861):
 * red-to-black hero, black work section that fades to white as "why us" +
 * logos arrive (see ToneShift), then the
 * red-to-black fade again behind testimonials and the closing call to action.
 *
 * The footer is revealed from behind the page as you reach the bottom (see
 * FooterReveal): the page sits in front of it with solid backgrounds.
 *
 * Not used by this design but still in the codebase: ClientStrip ("We know who
 * you are" scroll sequence + logo carousel), Offer, ViewportTint.
 */
export default function Home() {
  return (
    <>
      <Nav variant="hero" />
      <main className="relative z-10">
        <Hero />
        {/* Black while you're in the work section, then the whole screen fades
            to white just before "Why work with us?" scrolls into view (at =
            1.1: when its heading is 10% of a window height below the bottom
            edge). No hard line. */}
        <ToneShift flipAt="#why-heading" at={1.1}>
          <WorkSection />
          <WhyUs />
          <TrustedBy />
        </ToneShift>
        <div className="bg-fade text-paper">
          <Testimonials />
          <FinalCTA />
        </div>
      </main>
      <FooterReveal revealHeight="60svh">
        <Footer />
      </FooterReveal>
    </>
  );
}
