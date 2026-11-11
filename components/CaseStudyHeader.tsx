import Container from "@/components/Container";
import type { CaseStudy } from "@/content/types";

/**
 * The block under a case study's opening image: Client + Services on the left,
 * the big title and the project intro on the right (as in Figma).
 */
export default function CaseStudyHeader({ study }: { study: CaseStudy }) {
  return (
    <Container>
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-0">
        <dl className="space-y-6">
          <div>
            <dt className="font-display text-sh1">Client</dt>
            <dd className="mt-3 text-quote">{study.client}</dd>
          </div>
          <div>
            <dt className="font-display text-sh1">Services</dt>
            <dd className="mt-3 text-quote">
              {study.services.map((s) => (
                <span key={s} className="block">
                  {s}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <div>
          <h1 className="font-display text-h2">{study.title}</h1>
          <div className="mt-[clamp(16px,1.6vw,24px)] max-w-[821px] space-y-[1.2em] text-b1 lg:ml-[0.5%]">
            {study.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
