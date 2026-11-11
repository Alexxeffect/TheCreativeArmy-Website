/**
 * ALL SITE COPY LIVES HERE.
 *
 * Components never contain hardcoded text — they read from this file. To change
 * a headline, a project description or a link, edit it here.
 *
 * Source: Figma file "Branding", landing page frame 659:925 (copy transcribed
 * from the design; obvious double-spaces removed).
 *
 * Anything marked ⚠ is not decided yet. Search for "⚠" to find them all.
 */

import type { Project } from "@/content/types";

export const site = {
  name: "TheCreativeArmy",

  meta: {
    // ⚠ Not in Figma. Draft wording built from the hero copy; Alex to confirm.
    title: "TheCreativeArmy: brand design studio",
    description:
      "A brand design studio working with founders whose ideas are ready before their brands are.",
  },

  contact: {
    // Email is from the Figma design (final CTA button).
    email: "hello@thecreativearmy.com",
    // ⚠ Booking link intentionally blank for now (Alex: "we'll build that after").
    // While empty, the "Schedule a call" button renders but is inactive.
    bookingUrl: "",
  },

  nav: {
    cta: "Reach out",
    workLabel: "Work",
  },

  hero: {
    headline: "Big ideas deserve to look the part",
    // ⚠ Figma copy uses the word "challenger". BUILD_PLAN.md says not to use it
    // on-page. Kept as designed until Alex decides.
    subhead:
      "We are a brand design studio building challenger brands. We work with founders whose ideas are ready before their brands are.",
  },

  work: {
    heading: "Our work",
    viewProject: "View Project",
  },

  clients: {
    heading: "We know who you are",
    body: "You’re ambitious, strong-willed and maybe a bit delusional (we are too). You have a great idea that you really believe in, but it doesn’t look like it just yet. You want to change that. Well that’s why we’re here.",
    lead: "We’ve done it for others like you",
  },

  offer: {
    label: "Our offer",
    // ⚠ Price shown as "just $5,000" in Figma (plan question D7 is answered by the design).
    headline: "Go from zero to serious brand in three weeks, for just $5,000",
    includesHeading: "What you get",
    includes: [
      "Strategy Workshop - Uncovering the big idea, Positioning",
      "Brand Identity System - Logo, Color system, typography",
      "Brand Guidelines",
      "Relevant brand-in-use mockups",
      "2 pieces of collateral",
      "Messaging",
    ],
    cta: "Learn More",
    // ⚠ "Learn More" has no destination in Figma. Inactive until Alex says where it goes.
    ctaHref: "",
  },

  testimonials: {
    heading: "What clients say",
    // ⚠ Figma shows 3 cards but cards 2 and 3 are identical. Only the 2 distinct
    // quotes are used here until Alex confirms which to show.
    items: [
      {
        quote:
          "He listens deeply, offers insightful advice, and explains every design direction with clarity and purpose… I’m not easily satisfied, yet he managed to bring to life exactly what I had envisioned.",
        name: "Victoria Olatunde",
        company: "Hydrowells",
      },
      {
        quote:
          "Working with Alex of TheCreativeArmy has been one of the most rewarding creative experiences. After in-depth conversations and a thorough study of our brand strategy, he delivered an identity for Hydrowells that truly reflects the heart of the brand… I’m not easily satisfied, yet he managed to bring to life exactly what I had envisioned.",
        name: "Victoria Olatunde",
        company: "Hydrowells",
      },
    ],
  },

  cta: {
    // Two lines, as in Figma (hard break before "Let's collaborate").
    headline: [
      "The next generation of builders need brands that can carry their vision.",
      "Let’s collaborate",
    ],
    emailLabel: "Reach out with all project enquiries to:",
    bookingLabel: "Or schedule a call here:",
    bookingButton: "Schedule a call",
  },
} as const;

/* ------------------------------------------------------------------------ */
/* Work: the projects shown on the landing page                             */
/* ------------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    slug: "the-rabbi-global",
    client: "The Rabbi Global",
    summary:
      "Building the strategy and identity system for a faith-based social impact organization",
    services: "Strategy, Logo Design, Brand Identity Design",
    wideTile: "right",
    hasCaseStudy: true,
    tiles: [
      {
        kind: "logo",
        src: "/images/home/trg-atom-white.png",
        alt: "The Rabbi Global logo mark",
        bg: "trg",
        width: "75%",
        ratio: "1041 / 1088",
      },
      {
        kind: "image",
        src: "/images/home/trg-tshirt.png",
        alt: "T-shirt printed with The Rabbi Global emblem",
        position: "bottom",
      },
      {
        kind: "graphic",
        src: "/images/home/trg-taking-the-world.png",
        alt: "“We are taking the world by storm”, with The Rabbi Global mark as the O in WORLD",
        bg: "trg",
        width: "84%",
        ratio: "995 / 496",
      },
    ],
  },
  {
    slug: "seeds-of-the-soil",
    client: "Seeds of the Soil",
    summary:
      "Giving a voice to an activism brand re-educating the African man on his heritage",
    services: "Logo Design, Brand Identity Design",
    wideTile: "left",
    hasCaseStudy: true,
    tiles: [
      {
        kind: "image",
        src: "/images/home/sos-bento.png",
        alt: "Seeds of the Soil posters, phone screen and brand guidelines page",
      },
      {
        kind: "image",
        src: "/images/home/sos-business-card.png",
        alt: "Seeds of the Soil business cards on grassland",
      },
      {
        kind: "video",
        src: "/videos/sos/typography.mp4",
        poster: "/videos/sos/typography.jpg",
        alt: "Seeds of the Soil typography animation",
      },
    ],
  },
  {
    slug: "hydrowells",
    client: "Hydrowells",
    summary:
      "Designing logo and packaging for a bottle water brand looking to disrupt the Nigerian water ecosystem",
    services: "Logo Design, Brand Identity Design, Packaging",
    wideTile: "left",
    hasCaseStudy: false,
    tiles: [
      {
        kind: "image",
        src: "/images/home/hydrowells-business-card.png",
        alt: "Hydrowells business cards",
      },
      {
        kind: "image",
        src: "/images/home/hydrowells-fabric.png",
        alt: "Hydrowells logo on fabric",
      },
      {
        kind: "image",
        src: "/images/home/hydrowells-billboard.png",
        alt: "Hydrowells billboard mockup",
      },
    ],
  },
];

/* ------------------------------------------------------------------------ */
/* Clients: the logo strip under "We know who you are"                       */
/* ------------------------------------------------------------------------ */

export const clientLogos = [
  // height = px at Figma desktop width (1512). Scales down fluidly.
  { src: "/images/home/trg-atom-white.png", alt: "The Rabbi Global", height: 82, invert: true },
  { src: "/images/logos/sos-icon.png", alt: "Seeds of the Soil symbol", height: 80 },
  { src: "/images/logos/reeda.png", alt: "Reeda", height: 50 },
  { src: "/images/logos/hydrowells.png", alt: "Hydrowells", height: 80 },
  { src: "/images/logos/sos-wordmark.png", alt: "Seeds of the Soil", height: 80 },
  // ⚠ Client unknown: Figma layer is just "Group 11". Alt text is generic until Alex names it.
  // ⚠ The last logo is labelled "BN" in Figma; full client name to be confirmed.
  { src: "/images/logos/client-compass.svg", alt: "Client logo", height: 93 },
  { src: "/images/logos/bn-icon.png", alt: "BN logo", height: 82 },
] as const;
