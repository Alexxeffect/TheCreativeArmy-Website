import { site } from "@/content/site";

/**
 * The orange footer. It is orange for a full window height and fixed behind the
 * page (see FooterReveal), which only uncovers the bottom 60% of it as you
 * reach the end (the 60svh in page.tsx); the rest stays hidden so there is
 * never a gap between the page and the footer. The giant studio wordmark sits
 * at the bottom, sized to run the full width between the page margins,
 * whatever the window size: the font size is the footer's inner width (100cqw,
 * margins already taken off) divided by the wordmark's width in "ems" (10.1
 * for TheCreativeArmy in Redaction, measured in the browser). If the studio
 * name changes, so must that number.
 * (Figma shows nothing else here: no copyright line, no socials.)
 */
export default function Footer() {
  return (
    <footer className="flex h-svh items-end bg-brand [container-type:inline-size] px-gutter pb-[clamp(12px,1.9vw,29px)]">
      <p className="w-full whitespace-nowrap text-center font-display text-[calc(100cqw/10.1)] uppercase leading-[1.1] text-paper">
        {site.name}
      </p>
    </footer>
  );
}
