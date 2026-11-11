import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyBlock, CaseStudyBody } from "@/components/CaseStudyBlocks";
import CaseStudyHeader from "@/components/CaseStudyHeader";
import Nav from "@/components/Nav";
import { caseStudies, getCaseStudy } from "@/content/work";

/**
 * One page per case study: /work/seeds-of-the-soil, /work/the-rabbi-global, …
 *
 * "Static" on purpose: Next.js builds these pages ahead of time from the content
 * files (generateStaticParams), so they load instantly and need no server.
 */
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  return { title: study.meta.title, description: study.meta.description };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  return (
    <div className={study.background === "surface" ? "bg-surface" : "bg-paper"}>
      <Nav showWork />
      <main className="pb-[clamp(64px,8vw,120px)]">
        <div className="mt-[clamp(24px,5vw,75px)]">
          <CaseStudyBlock block={study.hero} priority />
        </div>
        <div className="mt-[clamp(48px,7vw,100px)]">
          <CaseStudyHeader study={study} />
        </div>
        <CaseStudyBody blocks={study.blocks} />
      </main>
    </div>
  );
}
