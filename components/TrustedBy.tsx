import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import LogoMarquee from "@/components/LogoMarquee";
import { site } from "@/content/site";

/**
 * "Trusted by": the client logos, in black on white, in the endless slowly
 * scrolling strip (<LogoMarquee>, the same one as the earlier version of the
 * page). The heading sits in the page margins; the strip runs edge to edge.
 */
export default function TrustedBy() {
  return (
    <section className="pb-[clamp(56px,12.2vw,184px)] pt-[clamp(56px,9.5vw,144px)] [@media(scripting:none)]:bg-paper [@media(scripting:none)]:text-ink">
      <Container>
        <h2 className="font-display text-h3 uppercase">{site.why.trustedBy}</h2>
      </Container>
      <div className="mt-[clamp(20px,3vw,45px)]">
        <FadeIn>
          <LogoMarquee />
        </FadeIn>
      </div>
    </section>
  );
}
