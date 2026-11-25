"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A wrapper whose background (and default text colour) fades from black to
 * white as you scroll, instead of one section ending in a hard line and the
 * next one starting.
 *
 * Everything inside takes its colours from this wrapper, so the sections
 * inside need no background of their own. It starts black (the work section is
 * on it), and when the element matching `flipAt` (the "Why work with us?"
 * heading) has risen above `at` x the window height (1.1 = just before it
 * comes into view), the whole screen fades to white. Scroll back up and it
 * fades back to black.
 *
 * Why it's a "client component": it has to watch the scroll position. The
 * server sends it black, which is right for the work section; without
 * JavaScript the sections after it give themselves a white background (see
 * the `scripting: none` classes on them), so everything stays readable.
 *
 * The fade takes `durationMs`. With "reduce motion" on it is instant.
 */
export default function ToneShift({
  children,
  flipAt,
  at = 0.4,
  durationMs = 700,
}: {
  children: ReactNode;
  /** CSS selector of the element that, once it has risen far enough, turns the page white. */
  flipAt: string;
  /** How far up the window that element must be: 0 = its top edge, 1 = the bottom edge, more than 1 = still below the window. */
  at?: number;
  durationMs?: number;
}) {
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const frame = useRef(0);

  useEffect(() => {
    const update = () => {
      frame.current = 0;
      const el = document.querySelector(flipAt);
      if (!el) return;
      const light = el.getBoundingClientRect().top < window.innerHeight * at;
      setTone(light ? "light" : "dark");
    };
    const onScroll = () => {
      if (!frame.current) frame.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [flipAt, at]);

  return (
    <div
      data-tone={tone}
      style={{ transitionDuration: `${durationMs}ms` }}
      className="bg-ink text-paper transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] data-[tone=light]:bg-paper data-[tone=light]:text-ink motion-reduce:transition-none"
    >
      {children}
    </div>
  );
}
