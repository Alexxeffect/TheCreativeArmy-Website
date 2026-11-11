import Container from "@/components/Container";
import { site } from "@/content/site";

/**
 * "What clients say": orange quote cards in a row. If there are more cards than
 * fit, the row scrolls sideways (snapping card by card) — in the Figma design
 * the third card runs off the screen edge to hint at exactly this.
 *
 * The avatar circles are grey placeholders (no client photos exist yet).
 */
export default function Testimonials() {
  const { testimonials } = site;

  return (
    <section className="pb-[clamp(72px,16.6vw,252px)] pt-[clamp(64px,11.2vw,170px)]">
      <Container>
        <h2 className="font-display text-h2 uppercase">{testimonials.heading}</h2>
      </Container>

      <Container className="mt-[clamp(24px,4vw,60px)]">
        <ul className="-mx-gutter flex snap-x snap-mandatory gap-4 overflow-x-auto px-gutter pb-2">
          {testimonials.items.map((t) => (
            <li
              key={t.quote}
              className="min-h-[clamp(300px,28.3vw,428px)] w-[min(575px,86vw)] shrink-0 snap-start rounded-panel bg-brand p-[clamp(20px,3.4vw,52px)] text-paper"
            >
              <figure>
                <figcaption className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="size-12 shrink-0 rounded-full bg-placeholder"
                  />
                  <span>
                    <span className="block">{t.name}</span>
                    <span className="block text-muted">{t.company}</span>
                  </span>
                </figcaption>
                <blockquote className="mt-[clamp(20px,2.7vw,42px)] text-quote">
                  {t.quote}
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
