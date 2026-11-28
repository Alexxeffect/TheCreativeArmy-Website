import { site } from "@/content/site";

/**
 * Top of the landing page, on the red-to-black fade: the big headline and the
 * one-line studio intro on the right. Both fade in (opacity only), as if they
 * were surfacing from inside the gradient.
 * The wordmark above them is the nav (see <Nav variant="hero">).
 *
 * The hero is exactly one screen tall (100svh, taller only if its content
 * needs it), so "Our work" starts right at the fold. The fade runs down into
 * black over that height.
 *
 * Entry, in order (times in ms from page load; each text fade is 3200 long
 * with a slow start; the headline and subhead also float up from below as they
 * fade, 80px and 32px, see `.hero-gradient` and `.hero-wait` in globals.css):
 *   0     the red starts rising from the bottom edge (gradient takes 4600)
 *   2000  the wordmark fades in (set in <Nav>)
 *   2400  the headline fades in
 *   3400  the subhead fades in
 * To change the order or pace, change these numbers.
 */
const HEADLINE_DELAY = 2400;
const SUBHEAD_DELAY = 3400;

export default function Hero() {
  return (
    <section className="hero-gradient min-h-[100svh] pb-[clamp(24px,4vw,60px)] pt-[clamp(80px,45.1vw,194px)] text-paper md:pt-[clamp(80px,12.04vw,182px)]">
      {/* Left margin 63px as in Figma (56px on the phone frame); the right
          margin is small on purpose: the longest line ("Big ideas deserve")
          is nearly the full width at 141px, and a page scrollbar would
          otherwise push "deserve" down. */}
      <div className="mx-auto w-full max-w-page pl-[clamp(20px,13vw,56px)] pr-5 md:pl-[clamp(20px,4.17vw,63px)]">
        {/* Each inner list is one line on tablet/desktop; on phones every
            piece is a line of its own (see content/site.ts). */}
        <h1
          className="hero-wait hero-lift font-display text-hero-phone uppercase md:text-hero"
          style={
            {
              "--hero-delay": `${HEADLINE_DELAY}ms`,
              "--hero-rise": "80px",
            } as React.CSSProperties
          }
        >
          {site.hero.headline.map((line, i) => (
            <span key={i} className="block">
              {line.map((piece, j) => (
                <span key={piece} className="block md:inline">
                  {j > 0 ? " " : ""}
                  {piece}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p
          className="hero-wait hero-lift ml-[clamp(0px,29.5vw,127px)] mt-1.5 max-w-[clamp(0px,45.6vw,196px)] text-intro-sm md:ml-[65.4%] md:mt-[clamp(16px,1.1vw,17px)] md:max-w-[435px] md:text-quote"
          style={
            {
              "--hero-delay": `${SUBHEAD_DELAY}ms`,
              "--hero-rise": "32px",
            } as React.CSSProperties
          }
        >
          {site.hero.subhead}
        </p>
      </div>
    </section>
  );
}
