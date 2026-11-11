/**
 * Shared shapes for site content. Think of these as the "forms" that the
 * content files fill in — TypeScript will warn if something is missing.
 */

/**
 * Figma often shows a big image cropped inside a smaller frame. A Crop says
 * where the image sits inside its tile, as percentages of the tile
 * (copied from Figma: width/height/left/top). Without a crop, the image simply
 * fills the tile.
 */
export type Crop = { w: number; h: number; left: number; top: number };

/**
 * One tile. Used both in the landing-page work grid and inside case studies.
 *  - image:   a photo/mockup (optionally cropped, optionally on a coloured panel)
 *  - logo:    a white logo centred on a coloured tile
 *  - graphic: like logo, but a wider composed graphic
 *  - video:   a looping muted clip
 */
export type Tile =
  | {
      kind: "image";
      src: string;
      alt: string;
      /** CSS object-position, e.g. "bottom". Ignored when `crop` is set. */
      position?: string;
      crop?: Crop;
      /** Panel colour behind a cropped image (CSS colour). */
      panel?: string;
    }
  | { kind: "logo"; src: string; alt: string; bg: "trg"; width: string; ratio: string }
  | { kind: "graphic"; src: string; alt: string; bg: "trg"; width: string; ratio: string }
  | { kind: "video"; src: string; poster: string; alt: string };

export type Project = {
  slug: string;
  client: string;
  summary: string;
  services: string;
  /** Which tile is the wide one: left, or right (TRG's row is mirrored). */
  wideTile: "left" | "right";
  tiles: [Tile, Tile, Tile];
  /** ⚠ Hydrowells has no case study yet, so it has no "View Project" button. */
  hasCaseStudy: boolean;
};

/** A case study page is a header followed by a list of blocks, top to bottom. */
export type Block =
  /** One tile, full width. `ratio` is width / height, e.g. "1408 / 792". */
  | { type: "wide"; tile: Tile; ratio: string }
  /** Two tiles side by side (each 701 × 884 in Figma). */
  | { type: "pair"; left: Tile; right: Tile }
  /** Big heading on the left, paragraphs on the right. */
  | { type: "section"; heading: string; body: string[] }
  /** An image centred on the page with a paragraph under it. */
  | { type: "centered"; tile: Tile; ratio: string; width: string; body: string[] };

export type CaseStudy = {
  slug: string;
  /** Big headline, e.g. "This land is now ours". */
  title: string;
  client: string;
  services: string[];
  intro: string[];
  /** Page background: white, or Figma's light grey (#F2F2F2). */
  background: "paper" | "surface";
  /** Shown at the very top, above the header. */
  hero: Block;
  blocks: Block[];
  meta: { title: string; description: string };
};
