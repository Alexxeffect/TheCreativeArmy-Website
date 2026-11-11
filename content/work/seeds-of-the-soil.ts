import type { CaseStudy } from "@/content/types";

/**
 * Seeds of the Soil case study.
 * Source: Figma "SOS Casestudy" (node 477:37). Copy is transcribed from the
 * design, with four small typo fixes (⚠ Alex: please confirm):
 *   "unconvered" → "uncovered"      "has lead to" → "has led to"
 *   "allowed us achieve" → "allowed us to achieve"
 *   "inspires ." → "inspires."
 *
 * `crop` values are percentages copied from Figma so images sit in their tiles
 * exactly like the design.
 */
export const seedsOfTheSoil: CaseStudy = {
  slug: "seeds-of-the-soil",
  title: "This land is now ours",
  client: "Seeds of the Soil",
  services: ["Logo design", "Brand Identity Design", "Brand Guidelines"],
  background: "paper",
  meta: {
    // ⚠ Not in Figma: draft wording built from the page copy.
    title: "Seeds of the Soil: case study | TheCreativeArmy",
    description:
      "Logo, brand identity and brand guidelines for an organization re-educating the African man on his heritage.",
  },
  intro: [
    "Let’s face it. Many Africans are undereducated about their history and heritage. This has led to a gap in self awareness and understanding of their potential. As a result, they often live below their full capacity, leading to ongoing struggles in politics, business and overall well-being.",
    "Seeds of the Soil (SOS) is an organization that was created to re-educate the African man through the creation of content that educates, entertains and inspires.",
  ],

  hero: {
    type: "wide",
    ratio: "1415 / 796",
    tile: {
      kind: "video",
      src: "/videos/sos/3d-logo.mp4",
      poster: "/videos/sos/3d-logo.jpg",
      alt: "Rotating 3D render of the Seeds of the Soil symbol",
    },
  },

  blocks: [
    {
      type: "wide",
      ratio: "1408 / 792",
      tile: {
        kind: "video",
        src: "/videos/sos/logo-process.mp4",
        poster: "/videos/sos/logo-process.jpg",
        alt: "Animation of the Seeds of the Soil logo taking shape",
      },
    },

    {
      type: "section",
      heading: "The Logo",
      body: [
        "In a series of discovery meetings with the SOS team, we uncovered an insight that served as a foundation for the logo system. Long before western civilization, a group called the ‘Ekoi’ in Africa developed a system of ideographic writings called “Nsibidi”",
      ],
    },
    {
      type: "centered",
      ratio: "568 / 680",
      width: "568px",
      tile: {
        kind: "image",
        src: "/images/work/sos/logo-sheet.webp",
        alt: "Sheet of Nsibidi ideographic symbols alongside early Seeds of the Soil logo sketches",
      },
      body: [
        "We used this as a launching point for creating the SOS symbol. The representation, in particular, for ‘this land is now ours,’ a subtle nod to the fact that SOS was helping the African man reclaim his heritage, was of particular influence on the SOS symbol.",
      ],
    },

    {
      type: "pair",
      left: {
        kind: "video",
        src: "/videos/sos/logo-animation.mp4",
        poster: "/videos/sos/logo-animation.jpg",
        alt: "Seeds of the Soil logo animation",
      },
      right: {
        kind: "image",
        src: "/images/work/sos/tote-wearing-1.webp",
        alt: "Person wearing a tote bag with the Seeds of the Soil symbol",
        crop: { w: 157.45, h: 203.34, left: -36.86, top: -45.27 },
      },
    },
    {
      type: "pair",
      left: {
        kind: "image",
        src: "/images/work/sos/tshirt.webp",
        alt: "T-shirt with the Seeds of the Soil symbol",
        crop: { w: 133.52, h: 158.82, left: -21.68, top: -40.72 },
      },
      right: {
        kind: "image",
        src: "/images/work/sos/brown-bg.webp",
        alt: "Seeds of the Soil symbol embossed on a stone medallion",
        panel: "#FFFBE9",
        crop: { w: 88.45, h: 70.14, left: 5.28, top: 12.1 },
      },
    },
    {
      type: "pair",
      left: {
        kind: "image",
        src: "/images/work/sos/phone.webp",
        alt: "Phone showing the Seeds of the Soil app icon",
        crop: { w: 208.96, h: 100, left: -67.66, top: 0 },
      },
      right: {
        kind: "image",
        src: "/images/work/sos/portfolio-18.webp",
        alt: "Seeds of the Soil brand collateral",
      },
    },

    {
      type: "section",
      heading: "The Wordmark",
      body: [
        "After the symbol was done, we dove into the wordmark. We had two goals with the word mark:",
        "For it to ‘feel’ African and give off elements of culture without looking cliché.",
        "For it to have a compact lockup that could shrink and scale, since the brand name was a mouthful.",
        "The wordmark was inspired by the ‘Makalo Typeface’. which was a typeface that had a great balance between past culture and forward thinking. From there, we worked on multiple lockup variations until we came to two that felt good enough (because perfection is a myth). One was a stacked lockup to work in the tiny spaces, and the other was a horizontal lockup, to be used where the stacked lockup just won’t do it",
      ],
    },
    {
      type: "pair",
      left: {
        kind: "image",
        src: "/images/work/sos/business-card.webp",
        alt: "Seeds of the Soil business cards",
        crop: { w: 195.59, h: 126.89, left: -47.39, top: -21.06 },
      },
      right: {
        kind: "video",
        src: "/videos/sos/layout-animation.mp4",
        poster: "/videos/sos/layout-animation.jpg",
        alt: "Seeds of the Soil poster layout animation",
      },
    },
    {
      type: "wide",
      ratio: "1422 / 951",
      tile: {
        kind: "image",
        src: "/images/work/sos/tote-wide.webp",
        alt: "Canvas tote bags printed with the Seeds of the Soil wordmark",
        crop: { w: 100.14, h: 112.3, left: -0.14, top: -7.42 },
      },
    },
    {
      type: "pair",
      left: {
        kind: "image",
        src: "/images/work/sos/tote-wearing-4.webp",
        alt: "Person wearing a Seeds of the Soil tote bag",
      },
      right: {
        kind: "image",
        src: "/images/work/sos/portfolio-3.webp",
        alt: "Seeds of the Soil brand collateral",
      },
    },

    {
      type: "section",
      heading: "Typography & Layout",
      body: [
        "For the typeface, we thought we already had a good direction with Makalo, so we stuck with that for the header typeface. We also needed a body typeface that paired well with Makalo and fit with the brand. For that, we went with Alegreya, a humanist sans-serif typeface.",
        "For our layout, we wanted something dynamic that could flex, but was also consistent enough that the SOS internal team could replicate without much difficulty. We built a grid system that allowed us to achieve just that",
      ],
    },
    {
      type: "wide",
      ratio: "1422 / 801.66",
      tile: {
        kind: "image",
        src: "/images/work/sos/typeface-page.webp",
        alt: "Brand guidelines page showing the Makalo typeface",
      },
    },
    {
      type: "pair",
      left: {
        kind: "image",
        src: "/images/work/sos/poster.webp",
        alt: "Seeds of the Soil poster mockup",
        crop: { w: 237.23, h: 282.15, left: -65.48, top: -105.54 },
      },
      right: {
        kind: "video",
        src: "/videos/sos/typography.mp4",
        poster: "/videos/sos/typography.jpg",
        alt: "Seeds of the Soil typography animation",
      },
    },
    {
      type: "wide",
      ratio: "1422 / 932",
      tile: {
        kind: "image",
        src: "/images/work/sos/vertical-posters.webp",
        alt: "Seeds of the Soil vertical posters in an outdoor setting",
        crop: { w: 100, h: 114.43, left: 0, top: -14.38 },
      },
    },

    {
      type: "section",
      heading: "Color",
      body: [
        "The color palette was inspired by nature with a mix of African culture. By using earth tones, greens and reds, we create a color system that tie into the overall brand identity, and is broad enough for visual exploration.",
      ],
    },
    {
      type: "wide",
      ratio: "1413.33 / 795",
      tile: {
        kind: "image",
        src: "/images/work/sos/color-page.webp",
        alt: "Brand guidelines page showing the full Seeds of the Soil color palette",
      },
    },

    {
      type: "section",
      heading: "Brand Guidelines",
      body: [
        "Lastly, we designed a set of brand guidelines to help the SOS team to keep brand consistency, while allowing them room to flex and scale. Consistency, not conformity.",
      ],
    },
    {
      type: "wide",
      ratio: "1413 / 794.8",
      tile: {
        kind: "video",
        src: "/videos/sos/brand-guidelines.mp4",
        poster: "/videos/sos/brand-guidelines.jpg",
        alt: "Animated walkthrough of the Seeds of the Soil brand guidelines",
      },
    },
  ],
};
