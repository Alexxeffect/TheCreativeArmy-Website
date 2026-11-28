import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import WorkProject from "@/components/WorkProject";
import { projects, site } from "@/content/site";

/**
 * "Our work", on black (the colour comes from the <ToneShift> wrapper in
 * app/page.tsx, which later fades to white, so this section has none of its own): a small label, the headline, then every project in
 * content/site.ts stacked (tiles, then an info row). A project without a case
 * study yet (Hydrowells) still shows, with an inactive "View Project" button.
 */
export default function WorkSection() {
  return (
    <section
      id="work"
      className="scroll-mt-8 pb-[clamp(64px,20.9vw,316px)] pt-[clamp(32px,3vw,45px)]"
    >
      <Container>
        {/* Label + headline float up and fade in as they scroll into view. */}
        <FadeIn rise={40} durationMs={1400}>
          <p className="text-intro-sm uppercase md:text-quote">{site.work.eyebrow}</p>
          <h2 className="mt-[clamp(12px,2.2vw,33px)] max-w-[7.6em] font-display text-h2 uppercase leading-[0.987]">
            {site.work.heading}
          </h2>
        </FadeIn>
        <div className="mt-[clamp(32px,6.35vw,96px)] flex flex-col gap-[clamp(40px,5vw,75px)]">
          {projects.map((project) => (
            <WorkProject key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
