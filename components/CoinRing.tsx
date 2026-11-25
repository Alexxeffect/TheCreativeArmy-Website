import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * The ring of eight gradient coins from the "Why work with us?" cards, rebuilt
 * from Figma (each coin is its own SVG, tilted and flipped as in the design).
 * It is drawn at the design's proportions (920 x 1030) and fills whatever
 * width you give it via `style`/`className`, so it scales with the card.
 *
 * Each number below is that coin's box inside the 920 x 1030 frame, as a
 * percentage: where it sits (left, top), how big its box is (w, h), how big the
 * coin inside that box is (iw, ih) and how far it is turned (rot, degrees).
 */
const COINS = [
  { n: 5, left: "46.848%", top: "57.476%", w: "47.208%", h: "44.253%", iw: "82.304%", ih: "63.017%", rot: 57.5 },
  { n: 6, left: "21.413%", top: "59.223%", w: "42.536%", h: "44.538%", iw: "99.072%", ih: "56.984%", rot: 112.82 },
  { n: 7, left: "1.848%", top: "42.039%", w: "45.803%", h: "38.721%", iw: "79.236%", ih: "65.234%", rot: 147.5 },
  { n: 8, left: "-4.130%", top: "17.670%", w: "48.089%", h: "39.832%", iw: "81.769%", ih: "62.266%", rot: -147.35 },
  { n: 1, left: "13.370%", top: "0%", w: "44.801%", h: "42.574%", iw: "85.184%", ih: "60.438%", rot: -122.5 },
  { n: 2, left: "45.326%", top: "2.816%", w: "36.125%", h: "37.807%", iw: "102.336%", ih: "68.056%", rot: -77.5 },
  { n: 3, left: "61.304%", top: "18.738%", w: "43.216%", h: "35.493%", iw: "82.664%", ih: "61.295%", rot: -32.5 },
  { n: 4, left: "66.196%", top: "43.786%", w: "42.971%", h: "32.108%", iw: "87.744%", ih: "79.175%", rot: 12.5 },
];

export default function CoinRing({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={className}
      style={{ ...style, aspectRatio: "920 / 1030" }}
    >
      {COINS.map((c) => (
        <div
          key={c.n}
          className="absolute flex items-center justify-center"
          style={{ left: c.left, top: c.top, width: c.w, height: c.h }}
        >
          <div
            className="relative flex-none"
            style={{
              width: c.iw,
              height: c.ih,
              transform: `rotate(${c.rot}deg) scaleY(-1)`,
            }}
          >
            <Image
              src={`/images/why/coin-${c.n}.svg`}
              alt=""
              fill
              sizes="30vw"
              className="object-fill"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
