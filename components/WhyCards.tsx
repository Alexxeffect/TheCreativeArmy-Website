"use client";

import Image from "next/image";
import { useState, type CSSProperties, type ReactNode } from "react";

/**
 * The three "Why work with us?" cards: one is open (wide, orange, with a
 * picture and some words) and the other two are narrow strips of artwork.
 * Clicking a strip opens it and closes the one that was open.
 *
 * Opening happens in three steps, closing in the reverse order: the card opens
 * to its full width with the picture full bleed, then the picture's container
 * compresses to make room, then the words appear. The timings and the
 * choreography live in app/globals.css (search for "why-card"); this file only
 * keeps track of which card is open (`data-open`).
 *
 * Phone: the cards stack. The open one is full width with its picture and
 * words; the others are short strips of artwork you can tap.
 *
 * `open.visual` is the picture. It is positioned in the card's own coordinates
 * using the CSS numbers `--ww` / `--wh` (the picture window's size) and
 * `--ox` / `--oy` (where the window starts), so it stays put while the
 * container around it opens and closes.
 */
export type WhyCard = {
  id: string;
  /** Which part of the picture a closed card shows on desktop. Default: the middle. */
  crop?: "right";
  /** The strip shown while the card is closed. */
  art: { src: string; alt: string };
  /** What the card shows when open. Leave out for a card that can't open. */
  open?: { title: string; body: string; visual: ReactNode };
};

// Gap between cards, and the widths a card has when open / closed. The widths
// are fractions of the row: 821/1385 and 282/1385 (Figma: 821 + 282 + 282 +
// 2 gaps). `cqw` = 1% of the row's width, so these don't depend on the window.
const rowVars = {
  "--card-gap": "clamp(8px, 1.3vw, 20px)",
  "--open-w": "calc((100cqw - 2 * var(--card-gap)) * 0.59278)",
  "--closed-w": "calc((100cqw - 2 * var(--card-gap)) * 0.20361)",
} as CSSProperties;

export default function WhyCards({ cards }: { cards: WhyCard[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="[container-type:inline-size]">
      <ul
        style={rowVars}
        className="why-row flex flex-col gap-[var(--card-gap)] md:h-[max(48.5vw,560px)] md:flex-row"
      >
        {cards.map((card, i) => {
          const isOpen = i === active && !!card.open;
          const canOpen = !!card.open && !isOpen;
          return (
            <li
              key={card.id}
              className="why-card"
              data-open={isOpen}
              data-crop={card.crop}
            >
              {/* The closed strip. */}
              <div aria-hidden className="why-strip">
                <Image
                  src={card.art.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 20vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* The open face: the picture, then the words. */}
              {card.open && (
                <div className="why-face text-paper" aria-hidden={!isOpen}>
                  <div className="why-art">{card.open.visual}</div>
                  <div className="why-text">
                    <h3 className="whitespace-pre-line text-h3 font-medium uppercase leading-[0.987]">
                      {card.open.title}
                    </h3>
                    <p className="mt-[clamp(10px,1.1vw,17px)] max-w-[24.3em] text-copy">
                      {card.open.body}
                    </p>
                  </div>
                </div>
              )}

              {/* A closed card that can open: the whole strip is the button. */}
              {canOpen && (
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={false}
                  aria-label={`Open: ${card.open!.title.replace("\n", " ")}`}
                  className="absolute inset-0 z-10 cursor-pointer transition-colors duration-300 hover:bg-white/10"
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
