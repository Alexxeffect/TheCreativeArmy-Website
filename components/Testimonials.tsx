import Container from "@/components/Container";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { site } from "@/content/site";

/**
 * "What clients say", on the red fade: the heading, then one big quote at a
 * time with a dot for each testimonial underneath (see TestimonialCarousel).
 * The background is the fade shared with the closing call to action, which
 * the page wraps around both. The heading sits 20px higher than the plain
 * spacing would put it; the quote stays where it was.
 */
export default function Testimonials() {
  const { testimonials } = site;

  return (
    <section className="pb-[clamp(72px,29.7vw,449px)] pt-[clamp(44px,calc(14.9vw-20px),205px)]">
      <Container>
        <h2
          id="testimonials-heading"
          className="text-center font-display text-h2 uppercase"
        >
          {testimonials.heading}
        </h2>
      </Container>

      <Container className="mt-[clamp(44px,calc(3.4vw+20px),71px)]">
        <TestimonialCarousel items={[...testimonials.items]} />
      </Container>
    </section>
  );
}
