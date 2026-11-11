import type { Config } from "tailwindcss";

/**
 * DESIGN TOKENS — the single source of truth for the site's look.
 *
 * Every value here was read from the Figma file "Branding" (landing page frame
 * 659:925). Components use these names (e.g. `text-h1`, `bg-brand`) and never
 * hardcode a size or colour. To change the look site-wide, change it here.
 *
 * Type sizes are fluid: `clamp(min, vw, max)`. The max is the Figma desktop
 * size; the vw value is max ÷ 1512 (the Figma frame width) so it scales
 * smoothly; the min is a mobile floor.
 *   ⚠ Figma has no mobile frames, so the mins are proposed defaults.
 */
const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#FF5100", // orange: nav wordmark, buttons, offer + testimonial panels, footer
        ink: "#000000", // text on white
        paper: "#FFFFFF", // page background
        trg: "#FF0000", // TRG's red; used for the "Learn More" label + TRG card backdrops
        muted: "#C7C7C7", // secondary text on orange (testimonial role)
        placeholder: "#D9D9D9", // empty image slots + avatar circles
        surface: "#F2F2F2", // case study page background (TRG)
      },
      fontFamily: {
        // Adobe Fonts kit urt4kvy (loaded in app/layout.tsx)
        display: ["redaction", "serif"], // headlines + wordmark
        sans: ["neue-haas-grotesk-text", "sans-serif"], // everything else (Text cut, same as the portfolio site)
      },
      fontSize: {
        // Redaction (headlines). All uppercase at call sites.
        h1: ["clamp(48px, 8.6vw, 130px)", { lineHeight: "1.2" }], // hero only
        h2: ["clamp(36px, 4.63vw, 70px)", { lineHeight: "1.2" }], // section headlines
        cta: ["clamp(32px, 4.96vw, 75px)", { lineHeight: "1.2" }], // 75px: closing call-to-action headline
        wordmark: ["clamp(24px, 8.7vw, 132px)", { lineHeight: "1.2" }], // giant footer wordmark
        "wordmark-nav": ["clamp(18px, 1.65vw, 25px)", { lineHeight: "1.2" }], // nav wordmark
        // Neue Haas Grotesk Text (everything else)
        sh1: ["clamp(22px, 2.31vw, 35px)", { lineHeight: "1.2" }], // 35px
        b1: ["clamp(20px, 1.98vw, 30px)", { lineHeight: "1.2" }], // 30px  (b2 = same, bold)
        quote: ["clamp(18px, 1.65vw, 25px)", { lineHeight: "1.2" }], // 25px: testimonials, CTA labels
        btn: ["clamp(16px, 1.39vw, 21px)", { lineHeight: "1.2" }], // 21px: small buttons
        b3: ["clamp(16px, 1.32vw, 20px)", { lineHeight: "1.2" }], // 20px: body, labels, project rows
      },
      borderRadius: {
        card: "15px", // work image tiles
        panel: "10px", // testimonial cards
        btn: "5px", // buttons
      },
      spacing: {
        // Page side margin: Figma uses 45px on a 1512 frame.
        gutter: "clamp(20px, 3vw, 45px)",
      },
      keyframes: {
        // Logo carousel: slide left by exactly one copy of the logo list.
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      maxWidth: {
        page: "1512px", // Figma frame width
      },
    },
  },
  plugins: [],
};
export default config;
