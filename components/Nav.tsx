import Link from "next/link";
import Button from "@/components/Button";
import { site } from "@/content/site";

/**
 * Top bar: wordmark on the left, "Reach out" on the right.
 * Figma's case-study pages also show a "WORK" link in the middle; `showWork`
 * turns that on (the landing page in Figma doesn't have it).
 *
 * Sits in normal page flow at the top (not fixed) — that's how Figma shows it.
 */
export default function Nav({ showWork = false }: { showWork?: boolean }) {
  return (
    <header className="relative z-10 flex items-center justify-between px-gutter pt-[clamp(20px,3vw,45px)]">
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

      <Button href={`mailto:${site.contact.email}`} variant="brand" size="sm">
        {site.nav.cta}
      </Button>
    </header>
  );
}
