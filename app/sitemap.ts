import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { caseStudies } from "@/content/work";

/**
 * /sitemap.xml: a list of every page, for search engines.
 * Built from the content files, so a new case study appears here automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((study) => ({
      url: `${site.url}/work/${study.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
