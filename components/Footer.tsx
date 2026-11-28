import Image from "next/image";
import { site } from "@/content/site";

/**
 * The black footer (#030101, nearly the colour the red fade above it ends in,
 * so there is no visible edge): a contact block on the left (label + email),
 * the social icons on the right, and the giant studio wordmark along the
 * bottom.
 *
 * It fills the box <FooterReveal> gives it (the page scrolls up off it to
 * uncover it). The wordmark is sized to run the full width between the page
 * margins, whatever the window size: the font size is the footer's inner width
 * (100cqw, margins already taken off) divided by the wordmark's width in "ems"
 * (10.1 for TheCreativeArmy in Redaction, measured in the browser). If the
 * studio name changes, so must that number.
 */
export default function Footer() {
  const { contactLabel, socials } = site.footer;

  return (
    <footer className="flex h-full flex-col justify-between bg-footer px-gutter pb-[clamp(12px,1.9vw,29px)] text-paper [container-type:inline-size]">
      <div className="flex items-start justify-between">
        <div className="text-b4">
          <p className="uppercase">{contactLabel}</p>
          <a
            href={`mailto:${site.contact.email}`}
            className="mt-[0.4em] block transition-opacity duration-200 hover:opacity-85"
          >
            {site.contact.email}
          </a>
        </div>

        {/* Icons sit 13px below the top of the contact block (Figma). */}
        <ul className="mt-[13px] flex items-center gap-[clamp(8px,1.26vw,19px)]">
          {socials.map((s) => {
            const icon = (
              <Image
                src={s.src}
                alt={s.href ? s.label : ""}
                width={100}
                height={100}
                // 46px on desktop; shrinks to 28px (the 44px one in proportion).
                style={{ width: `clamp(${s.size * 0.6}px, ${s.size / 15.12}vw, ${s.size}px)` }}
                className="h-auto"
              />
            );
            return (
              <li key={s.label}>
                {s.href ? (
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="block transition-opacity duration-200 hover:opacity-85"
                  >
                    {icon}
                  </a>
                ) : (
                  icon
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <p className="w-full whitespace-nowrap text-center font-display text-[calc(100cqw/10.1)] uppercase leading-[1.1]">
        {site.name}
      </p>
    </footer>
  );
}
