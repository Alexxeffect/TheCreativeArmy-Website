import LineReveal from "@/components/LineReveal";
import FadeIn from "@/components/FadeIn";
import LogoMarquee from "@/components/LogoMarquee";
import WordRise from "@/components/WordRise";
import { site } from "@/content/site";

/**
 * "We know who you are", in four beats as you scroll:
 *  1. the heading, alone, filling a whole screen (its words rise into place
 *     as it scrolls into view, like the hero headline);
 *  2. the paragraph, written in line by line: it starts rising into view as
 *     soon as the heading reaches the top margin, then pins in the window;
 *  3. "We've done it for others like you" (the last step of that reveal);
 *  4. the logos of past clients, fading in and scrolling edge to edge.
 *
 * Empty space below the logos: the gap between the last logo and the "Our
 * offer" text is 42.5% of the window height (it was 85%, halved). That is this
 * section's bottom space plus the offer section's own empty top padding, so
 * bottom space = 42.5% of the window height minus that padding. The page turns
 * orange the moment the offer text appears at the bottom of the window, so
 * with this gap the logos are then about 57% of the way down the window.
 * A larger number means more empty space between the two sections.
 */
export default function ClientStrip() {
  return (
    <section className="pb-[max(24px,calc(42.5svh_-_var(--offer-pad-top)))]">
      <LineReveal
        intro={
          <WordRise
            text={site.clients.heading}
            className="justify-center text-center font-display text-h1 uppercase"
          />
        }
        text={site.clients.body}
        className="text-sh1"
      >
        <h3 className="max-w-[10.3em] font-display text-h2 uppercase">
          {site.clients.lead}
        </h3>
      </LineReveal>

      <div className="mt-[clamp(24px,2.6vw,40px)]">
        <FadeIn>
          <LogoMarquee />
        </FadeIn>
      </div>
    </section>
  );
}
