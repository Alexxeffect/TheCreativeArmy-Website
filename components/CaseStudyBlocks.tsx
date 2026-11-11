import Container from "@/components/Container";
import WorkTile from "@/components/WorkTile";
import type { Block } from "@/content/types";

/**
 * Draws one block of a case study. A case study is just a list of blocks
 * (see content/types.ts), so adding a new project means filling in a list, not
 * writing new layout code.
 *
 * Spacing between blocks is handled by <CaseStudyBody> below.
 */

const PAIR_SIZES = "(min-width: 768px) 50vw, 100vw";
const WIDE_SIZES = "100vw";

/** Paragraphs separated by a blank line, as in the Figma text blocks. */
function Paragraphs({ body }: { body: string[] }) {
  return (
    <div className="space-y-[1.2em] text-b1">
      {body.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

export function CaseStudyBlock({ block, priority = false }: { block: Block; priority?: boolean }) {
  switch (block.type) {
    case "wide":
      return (
        <Container>
          <div style={{ aspectRatio: block.ratio }}>
            <WorkTile tile={block.tile} sizes={WIDE_SIZES} priority={priority} />
          </div>
        </Container>
      );

    case "pair":
      return (
        <Container>
          <div className="grid gap-[clamp(8px,1.3vw,20px)] md:grid-cols-2">
            <div className="aspect-[701/884]">
              <WorkTile tile={block.left} sizes={PAIR_SIZES} />
            </div>
            <div className="aspect-[701/884]">
              <WorkTile tile={block.right} sizes={PAIR_SIZES} />
            </div>
          </div>
        </Container>
      );

    case "section":
      return (
        <Container>
          <div className="grid gap-6 md:grid-cols-2 md:gap-[clamp(8px,1.3vw,20px)]">
            <h2 className="max-w-[7em] font-display text-h2">{block.heading}</h2>
            <Paragraphs body={block.body} />
          </div>
        </Container>
      );

    case "centered":
      return (
        <Container>
          <div className="mx-auto max-w-[701px]">
            <div className="mx-auto" style={{ width: "100%", maxWidth: block.width, aspectRatio: block.ratio }}>
              <WorkTile tile={block.tile} sizes="(min-width: 768px) 40vw, 100vw" />
            </div>
            <div className="mt-[clamp(24px,3.4vw,52px)]">
              <Paragraphs body={block.body} />
            </div>
          </div>
        </Container>
      );
  }
}

/**
 * All blocks in order, with the page rhythm from Figma: media blocks sit 20px
 * apart; text sections get generous space above and below.
 */
export function CaseStudyBody({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((block, i) => {
        const prev = blocks[i - 1];
        const isText = block.type === "section" || block.type === "centered";
        const prevIsText = prev && (prev.type === "section" || prev.type === "centered");

        let spacing = "mt-[clamp(8px,1.3vw,20px)]"; // media after media
        if (i === 0) spacing = "mt-[clamp(48px,7vw,100px)]";
        else if (isText && prev?.type !== "section") spacing = "mt-[clamp(64px,7.3vw,110px)]";
        else if (block.type === "centered") spacing = "mt-[clamp(32px,4.6vw,70px)]";
        else if (prevIsText) spacing = "mt-[clamp(40px,5.3vw,80px)]";

        return (
          <div key={i} className={spacing}>
            <CaseStudyBlock block={block} />
          </div>
        );
      })}
    </div>
  );
}
