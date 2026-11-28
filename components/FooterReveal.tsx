import type { ReactNode } from "react";

/**
 * Makes the footer a "reveal": instead of sitting under the page like the
 * last section, it stays fixed to the bottom of the window, behind everything,
 * and the page scrolls up off it to uncover it.
 *
 * How: the footer is `fixed` to the window at the back, exactly as tall as the
 * empty spacer after the page (`revealHeight`). The page (which must have solid
 * backgrounds and sit in front, see `<main>` in app/page.tsx) hides it until
 * you scroll to the end, then the spacer lets all of it show. The fixed box is
 * 70px taller than the spacer and tucks that much under the page, so rounding
 * (or a scroll bounce) can never leave a thin white line between the two.
 */
export default function FooterReveal({
  children,
  revealHeight,
}: {
  children: ReactNode;
  /** A CSS length: how tall the footer is (and so how much is uncovered). */
  revealHeight: string;
}) {
  return (
    <>
      <div aria-hidden style={{ height: revealHeight }} />
      <div
        className="fixed inset-x-0 bottom-0 z-0 bg-footer pt-[70px]"
        style={{ height: `calc(${revealHeight} + 70px)` }}
      >
        {children}
      </div>
    </>
  );
}
