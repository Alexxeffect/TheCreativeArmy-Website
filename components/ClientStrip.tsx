import LogoMarquee from "@/components/LogoMarquee";
import SplitSection from "@/components/SplitSection";
import { site } from "@/content/site";

/**
 * "We know who you are": the studio's pitch to the founder (heading + text as
 * one centred row, same margins as the portfolio site's "Change by Design"),
 * then a scrolling row of logos from past clients lined up with the heading.
 */
export default function ClientStrip() {
  return (
    <section className="pb-[clamp(24px,2vw,30px)] pt-[clamp(80px,14.4vw,217px)]">
      <SplitSection
        layout="centered"
        heading={site.clients.heading}
        body={[site.clients.body, site.clients.lead]}
        textClass="text-copy"
        uppercase
        below={<LogoMarquee />}
      />
    </section>
  );
}
