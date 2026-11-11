import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Every button on the site, in one place.
 *
 * Why one component: the Figma design uses the same button in several sizes and
 * colours. Keeping them here means a change (say, rounder corners) happens once.
 *
 * Variants (all from the Figma design):
 *  - "brand"   orange fill, white text      (nav "Reach out", email CTA)
 *  - "outline" orange outline, black text   ("Schedule a call")
 *  - "dark"    black fill, white text       ("View Project")
 *  - "light"   white fill, red text         ("Learn More" on the orange panel)
 *
 * Sizes: "sm" is the nav/offer size, "md" the project-row size, "lg" and "xl"
 * the big final-CTA sizes (xl is the taller one).
 *
 * If `href` is empty the button still shows (so the layout matches the design)
 * but is inactive. That's how "Schedule a call" works until a booking link exists.
 */

type Variant = "brand" | "outline" | "dark" | "light";
type Size = "sm" | "md" | "lg" | "xl";

const variantClass: Record<Variant, string> = {
  brand: "bg-brand text-paper",
  outline: "border-[1.5px] border-brand text-ink",
  dark: "bg-ink text-paper",
  light: "bg-paper text-trg",
};

const sizeClass: Record<Size, string> = {
  sm: "text-btn px-[clamp(20px,3.05vw,46px)] py-3 rounded-btn",
  md: "text-b3 px-[30px] py-[14px] rounded-[3px]",
  // Both "lg" buttons are the big final-CTA text size. Figma gives the filled
  // email button more vertical padding (21.5px) than the outlined one (12px).
  lg: "text-b1 px-[clamp(24px,3.05vw,46px)] py-[clamp(8px,0.8vw,12px)] rounded-btn",
  xl: "text-b1 px-[clamp(24px,3.05vw,46px)] py-[clamp(12px,1.42vw,21.5px)] rounded-btn",
};

type Props = {
  href?: string;
  variant: Variant;
  size: Size;
  children: ReactNode;
  className?: string;
};

export default function Button({ href, variant, size, children, className = "" }: Props) {
  const classes = `inline-flex items-center justify-center whitespace-nowrap transition-opacity hover:opacity-85 ${variantClass[variant]} ${sizeClass[size]} ${className}`;

  if (!href) {
    // Inactive: no destination yet. aria-disabled tells screen readers.
    return (
      <span role="link" aria-disabled="true" className={`${classes} cursor-default hover:opacity-100`}>
        {children}
      </span>
    );
  }

  // Pages inside the site use Next's <Link> (fast client-side navigation);
  // mailto: and external links use a plain <a>.
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
