import Image from "next/image";
import LoopVideo from "@/components/LoopVideo";
import type { Tile } from "@/content/types";

/**
 * One rounded tile. Used in the landing-page work grid AND inside case studies.
 * The parent decides the tile's size; this just fills it.
 *
 *  - image:   mockup/photo covering the tile. If a `crop` is given (copied from
 *             Figma), the image is placed/zoomed inside the tile exactly like the
 *             design. `panel` paints a colour behind it.
 *  - logo:    a white logo centred on a coloured tile
 *  - graphic: like logo, but a wider composed graphic
 *  - video:   muted looping clip
 */
export default function WorkTile({
  tile,
  sizes,
  priority = false,
}: {
  tile: Tile;
  sizes: string;
  /** Load immediately (use for the first image on a page: it helps page speed). */
  priority?: boolean;
}) {
  const base = "relative h-full w-full overflow-hidden rounded-card bg-placeholder";

  if (tile.kind === "image") {
    if (tile.crop) {
      const { w, h, left, top } = tile.crop;
      return (
        <div className={base} style={tile.panel ? { backgroundColor: tile.panel } : undefined}>
          <div
            className="absolute"
            style={{ width: `${w}%`, height: `${h}%`, left: `${left}%`, top: `${top}%` }}
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover"
            />
          </div>
        </div>
      );
    }
    return (
      <div className={base}>
        <Image
          src={tile.src}
          alt={tile.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: tile.position ?? "center" }}
        />
      </div>
    );
  }

  if (tile.kind === "video") {
    return (
      <div className={base}>
        <LoopVideo
          src={tile.src}
          poster={tile.poster}
          label={tile.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  // logo + graphic: centred on a solid colour tile
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-card bg-trg">
      <div className="relative" style={{ width: tile.width, aspectRatio: tile.ratio }}>
        <Image src={tile.src} alt={tile.alt} fill sizes={sizes} className="object-contain" />
      </div>
    </div>
  );
}
