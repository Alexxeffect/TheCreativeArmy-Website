import Container from "@/components/Container";

/**
 * The case studies' "heading left, text right" system (Figma's "Change by
 * Design" pattern): a big Redaction heading beside paragraphs, with a blank
 * line between the paragraphs. Two equal halves across the page; on phones it
 * stacks.
 *
 * `narrowHeading` wraps the heading at ~7em so long titles break into short
 * lines. A "\n" in `heading` becomes a line break.
 */
export default function SplitSection({
  heading,
  body,
  narrowHeading = false,
}: {
  heading: string;
  body: string[];
  /** Wrap the heading at ~7em so long titles break into short lines. */
  narrowHeading?: boolean;
}) {
  const headingLines = heading.split("\n");
  const headingContent = headingLines.map((line, i) => (
    <span key={line}>
      {i > 0 && <br />}
      {line}
    </span>
  ));

  return (
    <Container>
      <div className="grid gap-6 md:grid-cols-2 md:gap-[clamp(8px,1.3vw,20px)]">
        <h2
          className={`font-display text-h2 ${narrowHeading ? "max-w-[7em]" : ""}`}
        >
          {headingContent}
        </h2>
        <div className="space-y-[1.2em] text-b3">
          {body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </Container>
  );
}
