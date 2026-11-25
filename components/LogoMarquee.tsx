import Image from "next/image";
import { clientLogos } from "@/content/site";

/**
 * An endless, slowly scrolling strip of client logos, edge to edge (Figma).
 *
 * How it works (no JavaScript needed):
 *  - The visible window is the full page width and clips anything outside it,
 *    so logos slide in at one end and out at the other.
 *  - The logos are listed TWICE side by side and the whole strip slides left
 *    by exactly one list's width, then jumps back. Because the second copy
 *    looks identical to the first, the jump is invisible: it loops forever.
 *  - Each list is at LEAST as wide as the screen (`min-w-[100vw]`, logos spread
 *    evenly), so the same logo is never on screen twice at once. The logos are
 *    sized up (1.5× their Figma size at 1512 wide, then growing with the
 *    screen, no maximum) so that they fill the width on their own.
 *  - Hovering pauses it. If the visitor's device asks for reduced motion, it
 *    doesn't animate: the logos just sit in a row they can scroll by hand.
 */
/** Logos are drawn this much larger than their Figma height, so one list can
 *  span the whole screen by itself. */
const SCALE = 1.5;

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      // The second copy is decoration: hide it from screen readers, and from
      // people who've asked for reduced motion (they get one static set).
      aria-hidden={hidden || undefined}
      className={`flex min-w-[100vw] shrink-0 items-center justify-between pr-[max(32px,6.3vw)] ${
        hidden ? "motion-reduce:hidden" : ""
      }`}
    >
      {clientLogos.map((logo) => (
        <li key={logo.src} className="flex shrink-0 items-center">
          <Image
            src={logo.src}
            alt={hidden ? "" : logo.alt}
            width={400}
            height={400}
            // Black by default; white while the page is orange (globals.css).
            // A logo whose file is white is first turned black.
            className={
              "invert" in logo && logo.invert
                ? "logo-mark logo-mark-from-white"
                : "logo-mark"
            }
            // Height scales with the viewport (Figma px at 1512 wide); width
            // follows so a logo never distorts.
            style={{
              height: `max(${Math.round(logo.height * 0.45 * SCALE)}px, ${((logo.height * SCALE) / 15.12).toFixed(2)}vw)`,
              width: "auto",
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default function LogoMarquee() {
  return (
    <div className="w-full overflow-hidden motion-reduce:overflow-x-auto">
      {/* A list is now about 1.5× as wide as before, so the duration is too,
          to keep the same slow speed. */}
      <div className="flex w-max animate-marquee [animation-duration:48s] hover:[animation-play-state:paused] motion-reduce:animate-none">
        <LogoSet />
        <LogoSet hidden />
      </div>
    </div>
  );
}
