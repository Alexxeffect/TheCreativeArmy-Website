import Image from "next/image";
import { clientLogos } from "@/content/site";

/**
 * An endless, slowly scrolling strip of client logos.
 *
 * How it works (no JavaScript needed):
 *  - The visible window is as wide as the old static logo row (about 950px on
 *    desktop) and clips anything outside it — so logos slide in at one end and
 *    out at the other.
 *  - The logos are listed TWICE side by side and the whole strip slides left by
 *    exactly one list's width, then jumps back. Because the second copy looks
 *    identical to the first, the jump is invisible: it loops forever.
 *  - Hovering pauses it. If the visitor's device asks for reduced motion, it
 *    doesn't animate: the logos just sit in a row they can scroll by hand.
 */
function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      // The second copy is decoration: hide it from screen readers, and from
      // people who've asked for reduced motion (they get one static set).
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-[clamp(32px,4.2vw,64px)] pr-[clamp(32px,4.2vw,64px)] ${
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
            // Height scales with the viewport (Figma px at 1512 wide); width
            // follows so a logo never distorts.
            style={{
              height: `clamp(${Math.round(logo.height * 0.45)}px, ${(logo.height / 15.12).toFixed(2)}vw, ${logo.height}px)`,
              width: "auto",
              filter: "invert" in logo && logo.invert ? "brightness(0)" : undefined,
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default function LogoMarquee() {
  return (
    <div className="w-full max-w-[950px] overflow-hidden motion-reduce:overflow-x-auto">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        <LogoSet />
        <LogoSet hidden />
      </div>
    </div>
  );
}
