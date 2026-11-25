"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades its content in the first time it scrolls into view, and (if `rise` is
 * set) lets it float up from below as it does, the same feel as the landing
 * hero's entry.
 *
 * Why it's a "client component": it needs to know when it's on screen, which
 * only the browser knows. The content is still sent as real HTML and is fully
 * visible before JavaScript runs (and for visitors who've asked their device to
 * reduce motion).
 *
 * `durationMs` how long the fade takes.
 * `rise`       px it starts below its final spot (0 = fade only).
 * `delayMs`    wait this long after it scrolls into view before starting
 *              (use it to stagger two things that appear together).
 */
type Phase = "static" | "hidden" | "shown";

export default function FadeIn({
  children,
  durationMs = 900,
  rise = 0,
  delayMs = 0,
}: {
  children: ReactNode;
  durationMs?: number;
  rise?: number;
  delayMs?: number;
}) {
  const [phase, setPhase] = useState<Phase>("static");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    setPhase("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: phase === "hidden" ? 0 : 1,
        transform:
          phase === "hidden" && rise ? `translateY(${rise}px)` : "none",
        transition:
          phase === "shown"
            ? `opacity ${durationMs}ms cubic-bezier(0.5, 0, 0.3, 1) ${delayMs}ms, transform ${durationMs}ms cubic-bezier(0.25, 0.6, 0.2, 1) ${delayMs}ms`
            : "none",
      }}
    >
      {children}
    </div>
  );
}
