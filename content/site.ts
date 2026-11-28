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

  // The address the site lives at (thecreativearmy.com redirects to this www
  // version in Vercel). Used by the sitemap and robots.txt.
  url: "https://www.thecreativearmy.com",

  meta: {
    // ⚠ Not in Figma. Draft wording built from the hero copy; Alex to confirm.
    title: "TheCreativeArmy: brand design studio",
    description:
      "A brand design studio working with founders whose ideas are ready before their brands are.",
  },

  contact: {
    // Email is from the Figma design (final CTA button).
    email: "hello@thecreativearmy.com",
    // The Cal.com event the /contact page books into ("Discovery meeting", 30m,
    // Google Meet).
    bookingUrl: "https://cal.com/thecreativearmy-vknyyn/discovery",
  },

  // The /contact page: a short form (Primary-style), then Cal.com's calendar
  // with the answers filled in.
  contactPage: {
    title: "Book an intro call",
    priceNote: "Identity projects typically start at $5,000.",
    intro: "First, a little about yourself.",
    fields: {
      name: "Name",
      role: "Title/Role",
      email: "Email",
      company: "Company Name",
      website: "Company Website",
    },
    about: {
      label: "Tell us about your company in 2-3 sentences.",
      placeholder: "Start typing here…",
    },
    references: {
      label: "What brands or websites feel closest to the look you want?",
      placeholder: "Drop any website, Figma, or Pinterest links",
    },
    notes: {
      label: "Additional notes",
      placeholder: "Please share anything that will help prepare for our meeting.",
    },
    submit: "Book my call",
    pickTime: "Now pick a time that suits you.",
    edit: "Edit my answers",
    emailPrompt: "Prefer to email? Tell us about your project.",
  },

  nav: {
    cta: "Reach out",
    workLabel: "Work",
  },

  hero: {
    // Each inner list is one line on tablet/desktop; on phones every piece
    // gets a line of its own (4 lines, as in the Figma phone frame):
    //   desktop: BIG IDEAS DESERVE / TO LOOK THE PART
    //   phone:   BIG IDEAS / DESERVE / TO LOOK / THE PART
    headline: [
      ["Big ideas", "deserve"],
      ["to look", "the part"],
    ],
    subhead:
      "We are a brand design studio working with founders whose ideas have scaled faster than their brands.",
    // The earlier cycling headlines. Not used by the current design; kept so
    // <CyclingHeadline> can be brought back.
    headlines: [
      // "\n" = exact line break (tablet/desktop; phones wrap naturally).
      // This gives the rag:
      //   EMPOWERING THE / VOICES OF THE IDEAS / DEFINING TOMORROW
      "Empowering the\nvoices of the ideas\ndefining tomorrow",
      "Big ideas deserve\nto look the part",
    ],
  },

  work: {
    eyebrow: "Our work",
    heading: "Brands built from zero",
    viewProject: "View Project",
    servicesLabel: "Services - ", // goes in front of each project's services
  },

  // "Why work with us?" (white block under the work section) and the logo row.
  why: {
    heading: "Why work with us?",
    // Three cards in a row; clicking a closed one opens it and closes the one
    // that was open. "\n" = exact line break, as in Figma.
    cards: [
      {
        title: "We get you, cause\nwe’re like you.",
        // Same wording as the old "We know who you are" paragraph (see `clients`).
        body: "You’re ambitious, strong-willed and maybe a bit delusional (we are too). You have a great idea that you really believe in, but it doesn’t look like it just yet. You want to change that. Well that’s why we’re here.",
      },
      {
        title: "We can take you where\nyou need to go.",
        body: "We’ve done it for others like you, multiple times. We have a solid process, that guarantees consistent outcomes.",
      },
      {
        title: "Not much to lose, so\nmuch to gain",
        body: "If we’re not confident that we can help you, we won’t work with you. We’d rather refer you to someone else",
      },
    ],
    trustedBy: "Trusted by",
  },

  clients: {
    heading: "We know who\nyou are", // "\n" = line break
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
    // `avatar` = the client's logo, shown in white beside the name. Give the
    // image's real width/height, and `fileColor` = the colour the file is drawn
    // in ("black" files are turned white, "white" files are used as they are).
    items: [
      {
        quote:
          "Working with Alex of TheCreativeArmy has been one of the most rewarding creative experiences. After in-depth conversations and a thorough study of our brand strategy, he delivered an identity for Hydrowells that truly reflects the heart of the brand… I’m not easily satisfied, yet he managed to bring to life exactly what I had envisioned.",
        name: "Victoria Olatunde",
        company: "Hydrowells",
        avatar: {
          src: "/images/logos/hydrowells.png",
          alt: "Hydrowells logo",
          width: 158,
          height: 300,
          fileColor: "black",
        },
      },
      {
        // Shortened from Adewole's longer note (his words, trimmed).
        quote:
          "Alexander co-creates with you. He sees what you see, from the very place you are standing, then takes your ideas and produces something beautiful with them… He’s keen on the details, adds the extra juice and walks you through the thought behind it. He’s my Picasso!",
        name: "Adewole Timothy",
        company: "Founder, TRG",
        avatar: {
          src: "/images/home/trg-atom-white.png",
          alt: "TRG logo",
          width: 1041,
          height: 1088,
          fileColor: "white",
        },
      },
    ],
  },

  cta: {
    headline: "Partner with us",
    subhead:
      "The next generation of builders need brands that can carry their vision",
    // Not shown in the current design (kept for when a booking link exists):
    emailLabel: "Reach out with all project enquiries to:",
    bookingLabel: "Or schedule a call here:",
    bookingButton: "Schedule a call",
  },

  footer: {
    contactLabel: "Contact",
    // Icons are the Figma ones (public/images/footer). `size` is the icon's
    // width in px on desktop (they shrink on phones). ⚠ No profile links yet:
    // while `href` is empty the icon shows but is not clickable.
    socials: [
      { label: "X", src: "/images/footer/x.png", size: 46, href: "" },
      {
        label: "Instagram",
        src: "/images/footer/instagram.png",
        size: 44,
        href: "https://www.instagram.com/thecreativearmy_/",
      },
      {
        label: "LinkedIn",
        src: "/images/footer/linkedin.png",
        size: 46,
        href: "",
      },
    ],
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
        // Crops copied from the Figma frame "Updated landing page" (917:1861).
        crop: { w: 112.4, h: 101.2, left: -7.56, top: -1.23 },
      },
      {
        kind: "image",
        src: "/images/home/hydrowells-fabric.png",
        alt: "Hydrowells logo on fabric",
        crop: { w: 235.19, h: 108.21, left: -91.5, top: -4.11 },
      },
      {
        kind: "image",
        src: "/images/home/hydrowells-billboard.png",
        alt: "Hydrowells billboard mockup",
        crop: { w: 281.5, h: 131.4, left: -90.76, top: -3.08 },
      },
    ],
  },
];

/* ------------------------------------------------------------------------ */
/* Clients: the logo strip under "We know who you are"                       */
/* ------------------------------------------------------------------------ */

export const clientLogos = [
  // height = px at Figma desktop width (1512). Scales down fluidly.
  {
    src: "/images/home/trg-atom-white.png",
    alt: "The Rabbi Global",
    height: 82,
    invert: true,
  },
  {
    src: "/images/logos/sos-icon.png",
    alt: "Seeds of the Soil symbol",
    height: 80,
  },
  { src: "/images/logos/reeda.png", alt: "Reeda", height: 50 },
  { src: "/images/logos/hydrowells.png", alt: "Hydrowells", height: 80 },
  {
    src: "/images/logos/sos-wordmark.png",
    alt: "Seeds of the Soil",
    height: 80,
  },
  // ⚠ Client unknown: Figma layer is just "Group 11". Alt text is generic until Alex names it.
  // ⚠ The last logo is labelled "BN" in Figma; full client name to be confirmed.
  { src: "/images/logos/client-compass.svg", alt: "Client logo", height: 93 },
  { src: "/images/logos/bn-icon.png", alt: "BN logo", height: 82 },
] as const;
