"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Makes the WHOLE SCREEN change colour as a section arrives, instead of the
 * section being a coloured bar that scrolls in over white.
 *
 * How it works: the page stays its normal colour until the wrapped section's
 * CONTENT begins to enter the bottom of the window (the section's own empty
 * padding at the top doesn't count). At that moment the page background fades
 * to the section's colour (a short CSS fade, see `html[data-tint]` in
 * app/globals.css). The page fades back to normal as soon as the element named
 * by `endBefore` (the next heading) appears at the bottom of the window, or,
 * without one, when the content has scrolled off the top. This component only
 * flips the switch.
 *
 * The wrapped section must NOT have a background of its own: the page colour
 * is the only orange there is. (app/globals.css gives it one when JavaScript
 * is off, so its text stays readable.)
 *
 * Why it's a "client component": it needs to listen to scrolling, which only
 * happens in the browser.
 *
 * `enter`  where the content's top must reach before the switch, as a fraction
 *          of the screen height from the top. 1 = the instant the content
 *          appears at the bottom of the window; 0.85 = once it has risen a
 *          little further up.
 * `endBefore` a CSS selector for the element that ends the tint: the moment
 *          its top enters the window (at the `enter` line) the page fades back.
 * `exit`   used only when there is no `endBefore`: where the content's bottom
 *          must reach before the page fades back. 0 = once the content has
 *          scrolled completely off the top.
 */
export default function ViewportTint({
  children,
  enter = 1,
  exit = 0,
  endBefore,
}: {
  children: ReactNode;
  enter?: number;
  exit?: number;
  endBefore?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Measure from where the CONTENT starts and ends (the section's edges
      // minus its empty top and bottom padding), not from the bare edges.
      const section = el.firstElementChild;
      const style = section ? getComputedStyle(section) : null;
      const contentTop = rect.top + (style ? parseFloat(style.paddingTop) : 0);
      const contentBottom =
        rect.bottom - (style ? parseFloat(style.paddingBottom) : 0);
      const endEl = endBefore ? document.querySelector(endBefore) : null;
      const ended = endEl
        ? endEl.getBoundingClientRect().top < vh * enter
        : contentBottom <= vh * exit;
      if (contentTop < vh * enter && !ended) {
        root.dataset.tint = "brand";
      } else {
        delete root.dataset.tint;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      // Leaving the page (e.g. opening a case study) must not leave it orange.
      delete root.dataset.tint;
    };
  }, [enter, exit, endBefore]);

  return <div ref={ref}>{children}</div>;
}
