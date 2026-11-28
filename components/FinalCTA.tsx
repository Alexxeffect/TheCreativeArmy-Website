import Button from "@/components/Button";
import Container from "@/components/Container";
import { site } from "@/content/site";

/**
 * Closing call to action, on the red fade (it runs on from the testimonials
 * and ends in black, which is where the footer takes over): the headline, a
 * two-line sub-line and one orange "Reach out" button (an email link).
 * The old "or schedule a call" line is not in this design; its words are still
 * in content/site.ts (`cta`) for when a booking link exists.
 */
export default function FinalCTA() {
  const { cta, nav } = site;

  return (
    // The bottom padding is the gap down to the footer (158px in Figma).
    <section id="contact" className="pb-[clamp(64px,10.4vw,158px)]">
      <Container className="text-center">
        <h2 className="font-display text-cta uppercase">{cta.headline}</h2>

        {/* 18em wide: breaks after "need", as in Figma. */}
        <p className="mx-auto mt-[clamp(8px,0.86vw,13px)] max-w-[18em] text-b4">
          {cta.subhead}
        </p>

        <div className="mt-[clamp(20px,2vw,31px)]">
          <Button href="/contact" variant="brand" size="sm">
            {nav.cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}
