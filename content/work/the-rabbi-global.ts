import type { CaseStudy } from "@/content/types";

/**
 * The Rabbi Global (TRG) case study.
 * Source: Figma "TRG Casestudy" (node 568:236).
 *
 * ⚠ MISSING MOTION PIECES. Figma shows four animated blocks that exist only as
 * empty frames (no video files were found on this computer). When the files are
 * supplied, add them at these spots, as `wide` video blocks:
 *   1. After the header:               "TRG_sting_full_v16"                 (1415 × 796)
 *   2. After the logo + t-shirt pair:  "trg_names_loop_final"               (1422 × 800)
 *   3. After "Taking the World":       "TRG_Mission100k_billboard_motion"   (1421 × 799)
 *   4. After #3:                       "TRG_connecting_split_v9"            (1422 × 800)
 *
 * ⚠ The palette image shows "#FF000" and "#FFFFF" (a digit short). The text is
 * baked into the image from Figma; fix in Figma and re-export.
 */
export const theRabbiGlobal: CaseStudy = {
  slug: "the-rabbi-global",
  title: "Connecting people to purpose",
  client: "The Rabbi Global",
  services: ["Brand Strategy", "Brand Identity Design", "Messaging"],
  background: "surface",
  meta: {
    // ⚠ Not in Figma: draft wording built from the page copy.
    title: "The Rabbi Global: case study | TheCreativeArmy",
    description:
      "Brand strategy, identity design and messaging for a faith-based social impact organization connecting people to purpose.",
  },
  intro: [
    "The Rabbi Global is a faith-based social impact organization that operates with the sole aim of connecting people to their purposes. They do this through outreaches, free events, mentorship, and content. They needed an identity that could position them as a serious player in their market and rally their org internally behind a common goal.",
  ],

  hero: {
    type: "wide",
    ratio: "1408 / 792",
    tile: {
      kind: "image",
      src: "/images/work/trg/hero.webp",
      alt: "The Rabbi Global lockup and atom mark, with the line “Connecting people to purpose” beside a reaching hand",
    },
  },

  blocks: [
    {
      type: "pair",
      left: {
        kind: "logo",
        src: "/images/home/trg-atom-white.png",
        alt: "The Rabbi Global logo mark",
        bg: "trg",
        width: "75%",
        ratio: "1041 / 1088",
      },
      right: {
        kind: "image",
        src: "/images/home/trg-tshirt.png",
        alt: "T-shirt printed with The Rabbi Global emblem",
        position: "bottom",
      },
    },
    {
      type: "pair",
      left: {
        kind: "image",
        src: "/images/work/trg/photo-1.webp",
        alt: "The Rabbi Global brand photography",
      },
      right: {
        kind: "image",
        src: "/images/work/trg/photo-2.webp",
        alt: "The Rabbi Global brand photography",
      },
    },
    {
      type: "wide",
      ratio: "1421 / 842",
      tile: {
        kind: "image",
        src: "/images/work/trg/world.webp",
        alt: "“We are taking the world by storm”, with The Rabbi Global mark as the O in WORLD",
      },
    },
    {
      type: "wide",
      ratio: "1421 / 843",
      tile: {
        kind: "image",
        src: "/images/work/trg/palette.webp",
        alt: "The Rabbi Global color palette: red, white and deep maroon, with the atom mark",
      },
    },
    {
      type: "wide",
      ratio: "1421 / 800",
      tile: {
        kind: "image",
        src: "/images/work/trg/thankyou.webp",
        alt: "“Thank you” in white on red with a large outline of the atom mark",
      },
    },
  ],
};
