"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Item = {
  quote: string;
  name: string;
  company: string;
  avatar?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    fileColor: "black" | "white";
  };
};

/** How long each testimonial stays up before the next one fades in on its own. */
const AUTO_ADVANCE_MS = 15_000;

/** A previous / next arrow: a Google Material arrow with no circle around it. */
function Arrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  /** No testimonial in that direction: the arrow greys out and does nothing. */
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={
        direction === "prev" ? "Previous testimonial" : "Next testimonial"
      }
      // The ::after makes the clickable area bigger for fingers.
      className="relative flex size-[30px] shrink-0 items-center justify-center text-paper transition-opacity duration-300 after:absolute after:-inset-2 after:content-[''] enabled:hover:opacity-60 disabled:cursor-default disabled:opacity-35"
    >
      {/* Google's Material Icons "arrow_back" / "arrow_forward" (Apache 2.0),
          cropped to the arrow itself so it fills the 30px button. */}
      <svg
        viewBox="3 3 18 18"
        className="size-[30px]"
        fill="currentColor"
        aria-hidden
      >
        <path
          d={
            direction === "prev"
              ? "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
              : "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
          }
        />
      </svg>
    </button>
  );
}

/**
 * One testimonial at a time: the quote in big type, who said it underneath,
 * and under that a row with a dot per testimonial on the left (filled = the one
 * showing) and the previous / next arrows on the right. The row is as wide as
 * the quote, so the dots line up with its left edge and the arrows with its
 * right edge. Clicking a dot or an arrow fades to that testimonial.
 *
 * It also moves on by itself every AUTO_ADVANCE_MS, and shows the countdown as
 * a ring that draws itself around the filled dot. Any change, automatic or
 * clicked, restarts it. It holds still (and the ring with it) while the pointer
 * is over the block or a keyboard user has focus in it, and while the block is
 * off screen. For visitors who have asked for reduced motion there is no ring
 * and no automatic change.
 *
 * All the quotes sit in the same grid cell, stacked, so the block is always as
 * tall as the longest quote and nothing below it jumps when you switch. The
 * ones not showing are invisible and skipped by screen readers.
 *
 * If a client has a logo (`avatar`) it shows in white beside the name.
 */
export default function TestimonialCarousel({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const many = items.length > 1;
  // The arrows stop at the ends (the one that can't go anywhere is greyed out).
  // Only the automatic advance wraps round from the last back to the first.
  const step = (by: number) =>
    setActive((a) => Math.min(Math.max(a + by, 0), items.length - 1));

  // Know whether the block is on screen, so it doesn't move on while nobody
  // can see it (a visitor who scrolls down to it starts on the first one).
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const watcher = new IntersectionObserver(([entry]) =>
      setOnScreen(entry.isIntersecting),
    );
    watcher.observe(el);
    return () => watcher.disconnect();
  }, []);

  const paused = hovered || focused || !onScreen;

  // The clock is the ring's own animation (see `.dot-ring` in globals.css):
  // it takes AUTO_ADVANCE_MS to draw, and when it finishes the browser fires an
  // `animationend` event, which lands here. Using the animation as the clock
  // means the ring and the switch can never drift apart. The ring is re-created
  // for each testimonial (`key={active}`), so every change, automatic or
  // clicked, restarts the countdown, and when it is paused the animation just
  // holds and carries on from the same spot.
  const next = () => setActive((a) => (a + 1) % items.length);

  return (
    <div
      ref={root}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Only keyboard focus pauses it: a tap or click leaves focus on the
      // button, which would otherwise stop the timer for good.
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={() => setFocused(false)}
    >
      <div className="mx-auto max-w-[940px]">
        <div className="grid">
          {items.map((t, i) => (
            <figure
              key={t.quote}
              aria-hidden={i !== active}
              className={`col-start-1 row-start-1 transition-opacity duration-500 ${
                i === active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <blockquote className="text-quote-lg">{t.quote}</blockquote>
              <figcaption className="mt-[clamp(20px,2.4vw,36px)] flex min-h-[55px] items-center gap-4 text-quote">
                {t.avatar ? (
                  <Image
                    src={t.avatar.src}
                    alt={t.avatar.alt}
                    width={t.avatar.width}
                    height={t.avatar.height}
                    // All logos are 55px tall; width follows so none distorts.
                    className={`h-[55px] w-auto shrink-0 ${
                      t.avatar.fileColor === "black"
                        ? "[filter:brightness(0)_invert(1)]"
                        : ""
                    }`}
                  />
                ) : null}
                <span>
                  <span className="block font-medium">{t.name}</span>
                  <span className="block">{t.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {many ? (
          <div className="mt-[clamp(24px,3vw,45px)] flex items-center justify-between">
            <div
              className="flex gap-1.5"
              role="group"
              aria-label="Choose a testimonial"
            >
              {items.map((t, i) => (
                <button
                  key={t.quote}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show testimonial from ${t.name}`}
                  aria-current={i === active}
                  // The visible dot is 16px (11px in Figma);
                  // the ::after makes the clickable area bigger for fingers.
                  className={`relative size-[16px] rounded-full border border-paper after:absolute after:-inset-3 after:content-[''] ${
                    i === active ? "bg-paper" : "bg-transparent"
                  }`}
                >
                  {/* The countdown ring: 3px clear of the dot, 1.5px thick,
                      a faint full circle with the bright arc drawing over it
                      clockwise from the top. */}
                  {i === active ? (
                    <svg
                      key={active}
                      aria-hidden
                      viewBox="0 0 25 25"
                      className="dot-ring-wrap pointer-events-none absolute -inset-[5.5px] size-[25px] -rotate-90"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle
                        cx="12.5"
                        cy="12.5"
                        r="11.75"
                        className="opacity-25"
                      />
                      <circle
                        cx="12.5"
                        cy="12.5"
                        r="11.75"
                        pathLength={100}
                        className="dot-ring"
                        data-paused={paused}
                        style={
                          {
                            "--dot-ms": `${AUTO_ADVANCE_MS}ms`,
                          } as React.CSSProperties
                        }
                        onAnimationEnd={next}
                      />
                    </svg>
                  ) : null}
                </button>
              ))}
            </div>
            {/* The arrow's drawing sits ~2px inside its 30px button; the
                negative margin puts the drawing, not the button, on the edge. */}
            <div className="-mr-0.5 flex gap-[7px]">
              <Arrow
                direction="prev"
                onClick={() => step(-1)}
                disabled={active === 0}
              />
              <Arrow
                direction="next"
                onClick={() => step(1)}
                disabled={active === items.length - 1}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
