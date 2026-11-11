import type { CaseStudy } from "@/content/types";
import { seedsOfTheSoil } from "@/content/work/seeds-of-the-soil";
import { theRabbiGlobal } from "@/content/work/the-rabbi-global";

/** Every case study that has a page. Add a new one here to publish it. */
export const caseStudies: CaseStudy[] = [theRabbiGlobal, seedsOfTheSoil];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
