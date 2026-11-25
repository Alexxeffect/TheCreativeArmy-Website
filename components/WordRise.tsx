"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A heading whose words rise into place one after another, the same motion as
 * the hero's <CyclingHeadline> (each word sits in its own box that hides
 * anything outside it; the word slides UP from below that box, a few
 * milliseconds after the word before it). It plays once, when the heading
 * scrolls into view.
 *
 * Why it's a "client component": it needs to know when the heading is on
 * screen and what the visitor's motion setting is, which only the browser
 * knows. The words are still sent as real HTML, so the heading is readable
 * before (or without) JavaScript, and visitors who've asked their device to
 * reduce motion simply see it.
 *
 * The heading's look (font, size, case, alignment) comes from `className`.
 * A "\n" in `text` is an exact line break.
 */

type Phase = "static" | "hidden" | "shown";

const BREAK = "\n";

export default function WordRise({
  text,
  className = "",
  lineHeight = 1.2,
  flipMs = 450,
  staggerMs = 35,
  delayMs = 0,
  wordGap = "0.25em",
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  /** Line height in em. Match the size token's line height (h1 = 1.2). */
  lineHeight?: number;
  /** How long one word takes to rise. */
  flipMs?: number;
  /** Delay between one word starting to rise and the next. */
  staggerMs?: number;
  /** Extra wait before the first word starts (for something that has to play first). */
  delayMs?: number;
  /** Space between words (Redaction's natural space is 0.25em). */
  wordGap?: string;
  as?: "h1" | "h2" | "p";
}) {
  // "static" = what the server sends (everything visible). In the browser it
  // becomes "hidden" (words parked below their boxes), then "shown" (they rise).
  const [phase, setPhase] = useState<Phase>("static");
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    setPhase("hidden");
    // Start once the heading has risen a little way into the window.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const lines = text
    .split("\n")
    .flatMap((line, i) =>
      i === 0 ? line.split(" ") : [BREAK, ...line.split(" ")],
    );
  let n = -1; // counts real words (not breaks) so the stagger has no gaps

  return (
    <Tag
      ref={ref as React.Ref<HTMLHeadingElement>}
      // The visual words are separate boxes; this gives screen readers the
      // heading as normal words.
      aria-label={text.replace(/\n/g, " ")}
      className={`m-0 flex flex-wrap ${className}`}
      style={{ lineHeight, columnGap: wordGap }}
    >
      {lines.map((word, k) => {
        if (word === BREAK) {
          // A full-width, zero-height item: forces the next word onto a new line.
          return <span key={k} aria-hidden className="h-0 basis-full" />;
        }
        n += 1;
        const hidden = phase === "hidden";
        return (
          <span
            key={k}
            aria-hidden
            style={{
              display: "inline-block",
              overflow: phase === "static" ? "visible" : "hidden",
              height: `${lineHeight}em`,
              lineHeight: `${lineHeight}em`,
              verticalAlign: "top",
            }}
          >
            <span
              style={{
                display: "inline-block",
                lineHeight: `${lineHeight}em`,
                transform: hidden ? "translateY(110%)" : "translateY(0)",
                opacity: hidden ? 0 : 1,
                transition: hidden
                  ? "none"
                  : `transform ${flipMs}ms cubic-bezier(0.65, 0, 0.35, 1) ${delayMs + n * staggerMs}ms, opacity ${flipMs}ms ease ${delayMs + n * staggerMs}ms`,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
