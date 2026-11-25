import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import WorkTile from "@/components/WorkTile";
import { site } from "@/content/site";
import type { Project } from "@/content/types";

/**
 * One project on the landing page: a row of three image tiles, then a line
 * with the client name + summary, the services, and a "View Project" button.
 *
 * Desktop (Figma): three tiles side by side — one wide (701px) and two narrow
 * (341px). The wide one is on the left for most projects, on the right for TRG.
 * Phone: the wide tile goes on top full width, the two narrow ones sit under it.
 */
export default function WorkProject({ project }: { project: Project }) {
  const { client, summary, services, tiles, wideTile, hasCaseStudy, slug } =
    project;

  const wideIndex = wideTile === "left" ? 0 : 2;
  const columns =
    wideTile === "left"
      ? "md:grid-cols-[701fr_341fr_341fr]"
      : "md:grid-cols-[341fr_341fr_701fr]";

  return (
    <article>
      {/* The whole project (tiles and info row together) floats up and fades
          in as it scrolls into view. */}
      <FadeIn rise={60} durationMs={1400}>
        <div
          className={`grid grid-cols-2 gap-[clamp(8px,1.3vw,20px)] ${columns}`}
        >
          {tiles.map((tile, i) => {
            const isWide = i === wideIndex;
            return (
              <div
                key={tile.alt}
                className={
                  isWide
                    ? "col-span-2 aspect-[701/487] max-md:order-first md:col-span-1 md:aspect-auto"
                    : "aspect-[341/487]"
                }
              >
                <WorkTile
                  tile={tile}
                  sizes={
                    isWide
                      ? "(min-width: 768px) 46vw, 100vw"
                      : "(min-width: 768px) 23vw, 50vw"
                  }
                />
              </div>
            );
          })}
        </div>

        {/* Figma gap between tiles and info row: 41px on SOS + Hydrowells (20px on TRG; 41 used for all). */}
        <div className="mt-[clamp(12px,2.7vw,41px)]">
          <div className="grid items-center gap-4 md:grid-cols-[40%_1fr_auto]">
            <div>
              <h3 className="font-bold">{client}</h3>
              <p className="max-w-[23em]">{summary}</p>
            </div>
            <p>{services}</p>
            {/* White button on the black work section. ⚠ Hydrowells has no case
            study yet, so its button shows (as in Figma) but is inactive. */}
            <Button
              href={hasCaseStudy ? `/work/${slug}` : undefined}
              variant="light"
              size="md"
              className="w-fit"
            >
              {site.work.viewProject}
              <span className="sr-only">: {client}</span>
            </Button>
          </div>
        </div>
      </FadeIn>
    </article>
  );
}
