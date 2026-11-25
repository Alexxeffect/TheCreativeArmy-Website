"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Container from "@/components/Container";

/**
 * A screen-filling heading followed by a paragraph that writes itself onto the
 * screen, one line at a time, as the visitor scrolls. The reveal STARTS when
 * the heading has scrolled up to the top margin (so there's no empty screen
 * between the two: the paragraph is already rising into view, line by line,
 * while the heading leaves). It then pins in the middle of the window; when the
 * last step is done it lets go and scrolls away.
 *
 *  - `intro`     the heading, centred in a screen of its own (its first
 *                element is what's measured for the "top margin" moment).
 *  - `text`      the paragraph.
 *  - `className` its type size (e.g. "text-sh1").
 *  - `children`  something that appears AFTER the last line, as one final
 *                step (here: "We've done it for others like you").
 *
 * How it works: the words are rendered normally, then in the browser we group
 * them into the lines they actually wrapped onto (this changes with screen
 * width, so it's re-measured on resize) and fade + lift each line in turn,
 * driven by how far the visitor has scrolled through the tall wrapper.
 *
 * Without JavaScript, or with "reduce motion" on, nothing is hidden or
 * pinned: it's just a normal paragraph.
 *
 * Tuning: `SCROLL_LENGTH` (the wrapper height) is how long the paragraph stays
 * pinned. `END` is how far through the whole scroll the last step finishes
 * (the rest is a short hold).
 */
const SCROLL_LENGTH = "h-[150svh]";
const END = 0.85;

const clamp = (n: number) => Math.min(1, Math.max(0, n));

function setProgress(els: HTMLElement[], v: number) {
  for (const el of els) {
    el.style.opacity = String(v);
    el.style.transform = `translateY(${((1 - v) * 0.45).toFixed(3)}em)`;
  }
}

export default function LineReveal({
  intro,
  text,
  className = "",
  children,
}: {
  intro: ReactNode;
  text: string;
  className?: string;
  children?: ReactNode;
}) {
  const introBox = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const paragraph = useRef<HTMLParagraphElement>(null);
  const tail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trackEl = track.current;
    const heading = introBox.current?.firstElementChild;
    const p = paragraph.current;
    const tailEl = tail.current;
    if (!trackEl || !heading || !p || !tailEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = Array.from(p.querySelectorAll<HTMLElement>("[data-word]"));
    let lines: HTMLElement[][] = [];
    let frame = 0;

    // Group the words by the line they landed on.
    const measure = () => {
      lines = [];
      let top = -1;
      for (const w of words) {
        if (top < 0 || Math.abs(w.offsetTop - top) > 2) {
          lines.push([]);
          top = w.offsetTop;
        }
        lines[lines.length - 1].push(w);
      }
    };

    const apply = () => {
      frame = 0;
      // Scroll position where the heading's top reaches the top margin (the
      // page gutter), and where the pinned part ends.
      const margin = Math.min(45, Math.max(20, window.innerWidth * 0.03));
      const startY =
        heading.getBoundingClientRect().top + window.scrollY - margin;
      const endY =
        trackEl.getBoundingClientRect().top +
        window.scrollY +
        trackEl.offsetHeight -
        window.innerHeight;
      const scrolled =
        endY > startY ? clamp((window.scrollY - startY) / (endY - startY)) : 1;
      const steps = lines.length + 1; // every line, then the tail
      const t = clamp(scrolled / END) * steps;
      lines.forEach((line, i) => setProgress(line, clamp(t - i)));
      setProgress([tailEl], clamp(t - lines.length));
    };

    const refresh = () => {
      measure();
      apply();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    refresh();
    window.addEventListener("scroll", onScroll, { passive: true });
    const resize = new ResizeObserver(refresh);
    resize.observe(p);
    window.addEventListener("resize", refresh);
    // Fonts arriving can re-wrap the lines.
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", refresh);
      resize.disconnect();
      if (frame) cancelAnimationFrame(frame);
      for (const el of [...words, tailEl]) {
        el.style.removeProperty("opacity");
        el.style.removeProperty("transform");
      }
    };
  }, []);

  return (
    <>
      <div
        ref={introBox}
        className="flex min-h-[100svh] items-center justify-center px-gutter"
      >
        {intro}
      </div>
      <div ref={track} className={`${SCROLL_LENGTH} motion-reduce:h-auto`}>
        <div className="sticky top-0 flex min-h-[100svh] items-center motion-reduce:static motion-reduce:min-h-0 motion-reduce:py-[clamp(56px,11vw,170px)]">
          <Container>
            {/* One column (740px at 1512 wide, as in Figma): the paragraph and
              the line after it share its left edge. */}
            <div className="mx-auto w-full max-w-[740px] min-[835px]:max-w-[min(48.94vw,740px)]">
              <p ref={paragraph} className={className}>
                {text.split(" ").map((word, i) => (
                  <span key={i}>
                    <span data-word className="inline-block">
                      {word}
                    </span>{" "}
                  </span>
                ))}
              </p>
              <div ref={tail} className="mt-[clamp(40px,11.2vw,170px)]">
                {children}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
