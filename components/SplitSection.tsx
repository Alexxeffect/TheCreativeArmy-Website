import type { ReactNode } from "react";
import Container from "@/components/Container";

/**
 * The site's "heading left, text right" system (Figma's "Change by Design"
 * pattern): a big Redaction heading beside paragraphs, with a blank line
 * between the paragraphs. On phones it stacks.
 *
 * Two layouts:
 *  - "half" (default): two equal halves across the page. Used by the case
 *    study sections ("The Logo", "The Wordmark", …), as in Figma.
 *  - "centered": the portfolio site's margins. The heading and a 500px text
 *    column sit together as ONE row centred on the page, with a gap that
 *    shrinks with the screen (140px at 1440 → 40px floor), so the left and
 *    right margins are equal and generous. Stacks at 834px and below.
 *
 * `textClass` picks the text size token (e.g. "text-b3" or "text-b1").
 * `uppercase` is on for the landing page headings, off for case study headings.
 * A "\n" in `heading` becomes a line break.
 * `below` is extra content (like the logo carousel) placed under the row,
 * lined up with the heading's left edge (centered layout only).
 */
export default function SplitSection({
  heading,
  body,
  textClass = "text-b1",
  uppercase = false,
  narrowHeading = false,
  layout = "half",
  below,
}: {
  heading: string;
  body: string[];
  textClass?: string;
  uppercase?: boolean;
  /** Wrap the heading at ~7em so long titles break into short lines. */
  narrowHeading?: boolean;
  layout?: "half" | "centered";
  below?: ReactNode;
}) {
  const headingLines = heading.split("\n");
  const headingContent = headingLines.map((line, i) => (
    <span key={line}>
      {i > 0 && <br />}
      {line}
    </span>
  ));
  const headingBase = `font-display text-h2 ${uppercase ? "uppercase" : ""}`;
  const paragraphs = body.map((p) => <p key={p}>{p}</p>);

  if (layout === "centered") {
    return (
      <Container>
        {/* w-fit + mx-auto centres the whole block (row + anything under it) */}
        <div className="mx-auto w-fit max-w-full">
          <div className="flex flex-col gap-[clamp(32px,4vw,56px)] min-[835px]:flex-row min-[835px]:items-start min-[835px]:justify-center min-[835px]:gap-[clamp(40px,9.72vw,140px)]">
            <h2 className={`${headingBase} min-[835px]:shrink-0`}>{headingContent}</h2>
            <div
              className={`space-y-[1.2em] ${textClass} min-[835px]:min-w-0 min-[835px]:flex-[0_1_500px]`}
            >
              {paragraphs}
            </div>
          </div>
          {below ? <div className="mt-[clamp(28px,3.4vw,52px)]">{below}</div> : null}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid gap-6 md:grid-cols-2 md:gap-[clamp(8px,1.3vw,20px)]">
        <h2 className={`${headingBase} ${narrowHeading ? "max-w-[7em]" : ""}`}>
          {headingContent}
        </h2>
        <div className={`space-y-[1.2em] ${textClass}`}>{paragraphs}</div>
      </div>
    </Container>
  );
}
