"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * A headline that swaps between several messages with a word-by-word vertical
 * flip. Ported from the personal portfolio site's CyclingHeadline.
 *
 * How it works:
 *  - Every word sits in its own box that hides anything outside it. To change
 *    messages, the current words slide UP and out (one after another, a few
 *    milliseconds apart), then the next message's words start below and slide
 *    UP into place.
 *  - The box is always as tall as the TALLEST message, so whatever sits below
 *    the headline never moves while the text changes.
 *  - Optional `shrinkToFit`: instead, THE FIRST MESSAGE SETS THE SIZE. The box
 *    is exactly as tall as the first message, and a longer message gets a
 *    smaller font automatically (the largest size at which it still fits that
 *    height). Every message then leaves the same gap below it.
 *  - Visitors who've asked their device to reduce motion see the first message
 *    and it never changes.
 *
 * Why it's a "client component": it needs timers, the browser's motion setting
 * and real text measurements, which only exist in the browser. (The first
 * message is still sent as real HTML, so search engines and slow connections
 * see it.)
 *
 * The headline's look (font, size, case, max width) comes from `className`.
 */

type Phase = "idle" | "exiting" | "entering";

/** Marks an exact line break inside a message's word list. */
const BREAK = "\n";

type Props = {
  /** The messages to cycle through, as plain text. The first sets the size.
   *  Put "\n" in a message for an exact line break (used from 768px up). */
  messages: string[];
  /** Tailwind classes for the text itself (font, size, case, width…). */
  className?: string;
  /** Line height in em. Match the size token's line height (h1 = 1.2). */
  lineHeight?: number;
  /** How long each message stays before flipping. */
  holdMs?: number;
  /** How long one word takes to flip. */
  flipMs?: number;
  /** Delay between one word starting to flip and the next. */
  staggerMs?: number;
  /** When true, longer messages shrink to fit the FIRST message's height.
   *  When false (default), every message keeps full size and the box is as
   *  tall as the tallest one. */
  shrinkToFit?: boolean;
  /** Space between words (the font's natural space; Redaction's is 0.25em). */
  wordGap?: string;
  /** Which HTML tag to use. A page headline is "h1". */
  as?: "h1" | "h2" | "p";
};

export default function CyclingHeadline({
  messages,
  className = "",
  lineHeight = 1.2,
  holdMs = 6000,
  flipMs = 450,
  staggerMs = 35,
  shrinkToFit = false,
  wordGap = "0.25em",
  as: Tag = "h1",
}: Props) {
  // Each message becomes a list of words, with BREAK markers wherever the
  // content has a "\n" (an exact line break the editor asked for).
  const words = messages.map((m) =>
    m.split("\n").flatMap((line, i) => (i === 0 ? line.split(" ") : [BREAK, ...line.split(" ")])),
  );
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [minHeight, setMinHeight] = useState<number>();
  // One font-size multiplier per message (1 = full size, 0.7 = 70%).
  const [scales, setScales] = useState<number[]>(() => messages.map(() => 1));
  const [reduceMotion, setReduceMotion] = useState(false);
  const measureRef = useRef<HTMLDivElement>(null);

  // Respect the "reduce motion" device setting.
  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Work out (a) the box height = the first message's height, and (b) for each
  // longer message, the biggest font size that still fits in that height.
  // Done by trying sizes on a hidden copy of every message (binary search).
  useLayoutEffect(() => {
    const measure = measureRef.current;
    if (!measure) return;
    let lastWidth = -1;

    const recompute = () => {
      const kids = Array.from(measure.children) as HTMLElement[];
      kids.forEach((k) => (k.style.fontSize = "1em"));
      const heights = kids.map((k) => k.offsetHeight);

      // Default: full size everywhere, box = tallest message.
      if (!shrinkToFit) {
        setMinHeight(Math.max(...heights));
        setScales((prev) => (prev.every((v) => v === 1) ? prev : kids.map(() => 1)));
        return;
      }

      const base = heights[0];
      const next = kids.map((kid, i) => {
        if (i === 0) return 1;
        kid.style.fontSize = "1em";
        if (kid.offsetHeight <= base) return 1;
        let lo = 0.2;
        let hi = 1;
        for (let n = 0; n < 14; n++) {
          const mid = (lo + hi) / 2;
          kid.style.fontSize = `${mid}em`;
          if (kid.offsetHeight <= base) lo = mid;
          else hi = mid;
        }
        kid.style.fontSize = "1em";
        return Math.floor(lo * 1000) / 1000;
      });

      setMinHeight(base);
      setScales((prev) => (prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next));
    };

    const onResize = () => {
      const w = measure.getBoundingClientRect().width;
      if (w === lastWidth) return; // only the width changes how text wraps
      lastWidth = w;
      recompute();
    };

    onResize();
    const observer = new ResizeObserver(onResize);
    observer.observe(measure);

    // Text measures differently once the real fonts have loaded: redo it then.
    const redo = () => {
      lastWidth = -1;
      onResize();
    };
    document.fonts.ready.then(redo);
    document.fonts.addEventListener("loadingdone", redo);

    return () => {
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", redo);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.join("|"), shrinkToFit]);

  // Hold on the current message → flip words out → swap to the next message
  // → flip words in → hold again.
  useEffect(() => {
    if (reduceMotion || phase !== "idle") return;
    const t = setTimeout(() => setPhase("exiting"), holdMs);
    return () => clearTimeout(t);
  }, [phase, holdMs, reduceMotion]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const exitDuration = flipMs + words[index].filter((w) => w !== BREAK).length * staggerMs;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % words.length);
      setPhase("entering");
    }, exitDuration);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, index, flipMs, staggerMs]);

  // "entering" paints the new words already shifted below (no transition),
  // then the next frame turns the transition on and moves them to rest.
  useEffect(() => {
    if (phase !== "entering") return;
    const raf = requestAnimationFrame(() => setPhase("idle"));
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const renderWords = (wordList: string[], animated: boolean) => {
    let n = -1; // counts real words (not breaks) so the stagger has no gaps
    return wordList.map((word, k) => {
      if (word === BREAK) {
        // A full-width, zero-height item: forces the next word onto a new line.
        // Only from 768px up; on phones the text wraps naturally instead, so
        // the font can stay as large as the box allows.
        return <span key={k} aria-hidden className="hidden h-0 basis-full min-[768px]:block" />;
      }
      n += 1;
      const i = n;
      const translate = !animated
        ? "translateY(0)"
        : phase === "exiting"
          ? "translateY(-110%)"
          : phase === "entering"
            ? "translateY(110%)"
            : "translateY(0)";
      const opacity = !animated ? 1 : phase === "idle" ? 1 : 0;
      const transition =
        animated && phase !== "entering"
          ? `transform ${flipMs}ms cubic-bezier(0.65, 0, 0.35, 1) ${i * staggerMs}ms, opacity ${flipMs}ms ease ${i * staggerMs}ms`
          : "none";

      return (
        <span
          key={k}
          style={{
            display: "inline-block",
            overflow: animated ? "hidden" : "visible",
            height: `${lineHeight}em`,
            lineHeight: `${lineHeight}em`,
            verticalAlign: "top",
          }}
        >
          <span
            style={{
              display: "inline-block",
              lineHeight: `${lineHeight}em`,
              transform: translate,
              opacity,
              transition,
            }}
          >
            {word}
          </span>
        </span>
      );
    });
  };

  // A flex "gap" (not a margin on each word) so the last word on a line has no
  // trailing space: lines wrap exactly where normal text would.
  const rowClass = "m-0 flex flex-wrap";
  const rowStyle = { lineHeight, columnGap: wordGap };

  return (
    // The wrapper carries the font + width from `className`; each row inside
    // scales itself with em, so the scale is relative to the wrapper's size.
    <div className={`relative ${className}`} style={{ minHeight }}>
      {/* aria-label gives screen readers the headline as normal words (the
          visual words are separate boxes). */}
      <Tag
        className={rowClass}
        style={{ ...rowStyle, fontSize: `${scales[index] ?? 1}em` }}
        aria-label={messages[index].replace(/\n/g, " ")}
      >
        {renderWords(words[index], true)}
      </Tag>

      {/* Hidden measurer: every message, stacked, at the same width as the
          visible headline. Font sizes here are set by the code above while it
          measures, never by React. */}
      <div
        ref={measureRef}
        aria-hidden
        // overflow-hidden: an over-wide word in this invisible copy must not
        // create sideways scrolling on narrow screens.
        className="pointer-events-none invisible absolute inset-x-0 top-0 -z-10 overflow-hidden"
      >
        {words.map((msg, mi) => (
          <div key={mi} className={rowClass} style={rowStyle}>
            {renderWords(msg, false)}
          </div>
        ))}
      </div>
    </div>
  );
}
