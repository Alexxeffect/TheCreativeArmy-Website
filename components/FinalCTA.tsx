import Button from "@/components/Button";
import Container from "@/components/Container";
import { site } from "@/content/site";

/**
 * Closing call to action, on the red fade (it runs on from the testimonials):
 * the big headline and one orange "Reach out" button (an email link).
 * The old "or schedule a call" line is not in this design; its words are still
 * in content/site.ts (`cta`) for when a booking link exists.
 */
export default function FinalCTA() {
  const { cta, contact, nav } = site;

  return (
    <section id="contact" className="pb-[clamp(96px,31.3vw,473px)]">
      <Container className="text-center">
        <h2 className="mx-auto max-w-[1165px] font-display text-cta uppercase">
          {cta.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="mt-[clamp(24px,3.4vw,51px)]">
          <Button href={`mailto:${contact.email}`} variant="brand" size="sm">
            {nav.cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}
