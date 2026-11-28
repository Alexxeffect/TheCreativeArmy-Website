import Link from "next/link";
import Button from "@/components/Button";
import { site } from "@/content/site";

/**
 * Top bar.
 *
 * - default: wordmark on the left, "Reach out" on the right. Sits in normal
 *   page flow at the top (not fixed), as Figma shows it. Case-study pages also
 *   show a "WORK" link in the middle (`showWork`).
 * - "hero": the landing page's version: just the blackletter wordmark, white
 *   and centred, laid over the top of the hero gradient (no button: the page
 *   ends with its own "Reach out").
 */
export default function Nav({
  showWork = false,
  variant = "default",
  fade = true,
}: {
  showWork?: boolean;
  variant?: "default" | "hero";
  /** hero variant only: fade the wordmark in after 2s (the landing page's
   *  entry); false shows it straight away (other pages on black). */
  fade?: boolean;
}) {
  if (variant === "hero") {
    // "TheCreative" + "A" + "rmy": the A is in a different font (CS Aither).
    const [, before, capital, after] = site.name.match(/^(.*)(A)(rmy)$/) ?? [
      "",
      site.name,
      "",
      "",
    ];
    return (
      <header className="absolute inset-x-0 top-0 z-20 flex justify-center pt-5">
        <Link
          href="/"
          // Fades in 2s after load, once the red is well on its way up.
          className={`${fade ? "hero-wait " : ""}font-fraktur text-mark text-paper`}
          style={
            fade
              ? ({ "--hero-delay": "2000ms" } as React.CSSProperties)
              : undefined
          }
          aria-label={`${site.name} home`}
        >
          {before}
          <span className="font-aither">{capital}</span>
          {after}
        </Link>
      </header>
    );
  }

  return (
    <header className="relative z-10 flex items-center justify-between px-gutter pt-[clamp(12px,1.35vw,20px)]">
      <Link
        href="/"
        className="font-display text-wordmark-nav uppercase text-brand"
        aria-label={`${site.name} home`}
      >
        {site.name}
      </Link>

      {showWork && (
        <Link
          href="/#work"
          className="absolute left-1/2 -translate-x-1/2 font-display text-btn uppercase text-ink"
        >
          {site.nav.workLabel}
        </Link>
      )}

      <Button href="/contact" variant="brand" size="sm">
        {site.nav.cta}
      </Button>
    </header>
  );
}
