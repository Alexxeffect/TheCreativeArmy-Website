import Container from "@/components/Container";
import WorkProject from "@/components/WorkProject";
import { projects, site } from "@/content/site";

/** "Our work": every project in content/site.ts, stacked, tiles then info row. */
export default function WorkSection() {
  return (
    <section id="work" className="scroll-mt-8">
      <Container>
        <h2 className="font-display text-h2 uppercase">{site.work.heading}</h2>
        <div className="mt-[clamp(24px,3.4vw,52px)] flex flex-col gap-[clamp(40px,5vw,75px)]">
          {projects.map((project) => (
            <WorkProject key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
