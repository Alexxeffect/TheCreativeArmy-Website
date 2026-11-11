import Button from "@/components/Button";
import { site } from "@/content/site";

/**
 * "Our offer": the full-width orange band with the price, the list of what's
 * included, and a Learn More button.
 *
 * The band runs edge to edge, and the divider lines between list rows run all
 * the way to the right edge of the screen (as in Figma), so this section
 * doesn't use <Container> — it handles its own left margin.
 */
export default function Offer() {
  const { offer } = site;

  return (
    <section className="bg-brand pb-[clamp(40px,7.1vw,108px)] pt-[clamp(56px,12vw,182px)] text-paper">
      <div className="mx-auto max-w-page pl-gutter lg:grid lg:grid-cols-[25.3fr_74.7fr]">
        {/* Small label, top-left */}
        <p className="text-b1 uppercase max-lg:mb-6 lg:pt-3">{offer.label}</p>

        <div>
          {/* Padding lives on this wrapper (not the h2) so the headline gets the full 984px. */}
          <div className="pr-gutter lg:ml-[0.8%]">
            <h2 className="max-w-[984px] font-display text-h2 uppercase">{offer.headline}</h2>
          </div>

          <h3 className="mt-[clamp(20px,2.5vw,38px)] text-b1 font-bold uppercase">
            {offer.includesHeading}
          </h3>

          {/* Rows are separated by thin white lines that run off the right edge. */}
          <ul className="mt-[clamp(8px,0.7vw,10px)]">
            {offer.includes.map((item, i) => (
              <li
                key={item}
                // Desktop rows are 60px (line-height 2 as in Figma); on phones,
                // rows can wrap, so use normal line-height + padding instead.
                className={`pl-1 text-b1 max-lg:py-3 lg:leading-[2] ${
                  i < offer.includes.length - 1 ? "border-b border-paper" : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-[clamp(16px,1.2vw,18px)]">
            <Button href={offer.ctaHref} variant="light" size="sm">
              {offer.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
