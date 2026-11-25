import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * /robots.txt: tells search engines they may visit everything, and where the
 * sitemap is.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
