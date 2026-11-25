import type { ReactNode } from "react";

/**
 * Makes the footer a "reveal": instead of sitting under the page like the
 * last section, it stays fixed to the bottom of the window, behind everything,
 * and the page scrolls up off it to uncover it.
 *
 * How: the footer is `fixed` to the window at the back, a full window tall and
 * orange all the way up, so there is never a gap (or a thin white line) between
 * it and the page in front of it. The page (which must have solid backgrounds
 * and sit in front, see `<main>` in app/page.tsx) hides it until you scroll to
 * the end. An empty spacer after the page sets how much of the footer is
 * uncovered: `revealHeight`, e.g. "60svh" for the bottom 60% of the window.
 */
export default function FooterReveal({
  children,
  revealHeight,
}: {
  children: ReactNode;
  /** A CSS length: how tall the visible part of the footer is. */
  revealHeight: string;
}) {
  return (
    <>
      <div aria-hidden style={{ height: revealHeight }} />
      <div className="fixed inset-x-0 bottom-0 z-0">{children}</div>
    </>
  );
}
