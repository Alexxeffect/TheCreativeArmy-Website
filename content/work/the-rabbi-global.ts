import type { CaseStudy } from "@/content/types";

/**
 * The Rabbi Global (TRG) case study.
 * Source: Figma "TRG Casestudy" (node 568:236).
 *
 * Motion pieces (looping muted videos in /public/videos/trg, encoded from the
 * source files in Clients/Adewole Timothy/TRG Branding/Casestudy): the sting
 * (after the header), the names loop, the Mission 100k billboard and the
 * "connecting" split, placed where Figma has them. The billboard source is
 * 2480 × 2158; it is centre-cropped to 16:9 to match Figma's frame.
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
      type: "wide",
      ratio: "1415 / 796",
      tile: {
        kind: "video",
        src: "/videos/trg/sting.mp4",
        poster: "/videos/trg/sting.jpg",
        alt: "Animated TRG logo sting: the wordmark builds, a ring of faces circles it, and it resolves into the atom mark",
      },
    },
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
      type: "wide",
      ratio: "1422 / 800",
      tile: {
        kind: "video",
        src: "/videos/trg/names-loop.mp4",
        poster: "/videos/trg/names-loop.jpg",
        alt: "“Connecting [name] to purpose” with a scrolling list of names, on deep maroon",
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
      ratio: "1421 / 799",
      tile: {
        kind: "video",
        src: "/videos/trg/mission-billboard.mp4",
        poster: "/videos/trg/mission-billboard.jpg",
        alt: "A billboard on a building counting up to “Mission 100,000”, over a map of the world",
      },
    },
    {
      type: "wide",
      ratio: "1422 / 800",
      tile: {
        kind: "video",
        src: "/videos/trg/connecting-split.mp4",
        poster: "/videos/trg/connecting-split.jpg",
        alt: "“Connecting” and “to purpose” split around a portrait, with the TRG atom mark below",
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
