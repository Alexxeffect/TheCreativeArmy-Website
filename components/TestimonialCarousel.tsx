"use client";

import Image from "next/image";
import { useState } from "react";

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

/** A previous / next arrow: a bold arrow with no circle around it. */
function Arrow({
  direction,
  onClick,
  className = "",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        direction === "prev" ? "Previous testimonial" : "Next testimonial"
      }
      className={`flex size-10 shrink-0 items-center justify-center text-paper after:absolute after:-inset-2 after:content-[''] transition-opacity duration-300 hover:opacity-60 ${className}`}
    >
      <svg
        viewBox="3 3 18 18"
        className={`size-10 ${direction === "prev" ? "-scale-x-100" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 12h16M14 6l6 6-6 6" />
      </svg>
    </button>
  );
}

/**
 * One testimonial at a time: the quote in big type, who said it underneath, and a dot per testimonial under that
 * (filled = the one showing). Clicking a dot fades to that one.
 *
 * Arrows (previous / next, wrapping round) tell visitors there is more to click
 * through. On wide windows they sit at the page margins, either side of the quote; on narrower ones
 * there isn't room beside it, so they go either side of the dots.
 *
 * All the quotes sit in the same grid cell, stacked, so the block is always as
 * tall as the longest quote and nothing below it jumps when you switch. The
 * ones not showing are invisible and skipped by screen readers.
 *
 * If a client has a logo (`avatar`) it shows in white beside the name.
 */
export default function TestimonialCarousel({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const many = items.length > 1;
  const step = (by: number) =>
    setActive((a) => (a + by + items.length) % items.length);

  return (
    <div>
      <div className="relative">
        <div className="mx-auto grid max-w-[940px]">
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
          <>
            <Arrow
              direction="prev"
              onClick={() => step(-1)}
              className="absolute left-0 top-1/2 hidden -translate-y-1/2 xl:flex"
            />
            <Arrow
              direction="next"
              onClick={() => step(1)}
              className="absolute right-0 top-1/2 hidden -translate-y-1/2 xl:flex"
            />
          </>
        ) : null}
      </div>

      {many ? (
        <div className="mt-[clamp(24px,3vw,45px)] flex items-center justify-center gap-4">
          <Arrow
            direction="prev"
            onClick={() => step(-1)}
            className="relative xl:hidden"
          />
          <div
            className="flex justify-center gap-[3px]"
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
                // The visible dot is 11px (as in Figma); the ::after makes the
                // clickable area bigger for fingers.
                className={`relative size-[11px] rounded-full border border-paper after:absolute after:-inset-3 after:content-[''] ${
                  i === active ? "bg-paper" : "bg-transparent"
                }`}
              />
            ))}
          </div>
          <Arrow
            direction="next"
            onClick={() => step(1)}
            className="relative xl:hidden"
          />
        </div>
      ) : null}
    </div>
  );
}
