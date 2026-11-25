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
    <section className="hero-gradient min-h-[100svh] pb-[clamp(24px,4vw,60px)] pt-[clamp(80px,12.04vw,182px)] text-paper">
      {/* Left margin 63px as in Figma; the right margin is small on purpose:
          the longest line ("Big ideas deserve") is nearly the full width at
          141px, and a page scrollbar would otherwise push "deserve" down. */}
      <div className="mx-auto w-full max-w-page pl-[clamp(20px,4.17vw,63px)] pr-5">
        {/* "\n" in the copy is an exact line break. */}
        <h1
          className="hero-wait hero-lift whitespace-pre-line font-display text-hero uppercase"
          style={
            {
              "--hero-delay": `${HEADLINE_DELAY}ms`,
              "--hero-rise": "80px",
            } as React.CSSProperties
          }
        >
          {site.hero.headline}
        </h1>
        <p
          className="hero-wait hero-lift mt-[clamp(16px,1.1vw,17px)] text-quote md:ml-[65.4%] md:max-w-[435px]"
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
