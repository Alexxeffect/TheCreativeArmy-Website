import Container from "@/components/Container";
import CyclingHeadline from "@/components/CyclingHeadline";
import { site } from "@/content/site";

/** Top of the landing page: the cycling headline and the one-line studio intro. */
export default function Hero() {
  return (
    <section className="pb-[clamp(56px,11.5vw,174px)] pt-[clamp(40px,8.3vw,125px)]">
      <Container>
        {/* Every message is full size; line breaks are set in the content (so
            the rag is exact), and the box is as tall as the tallest message. */}
        <CyclingHeadline
          messages={[...site.hero.headlines]}
          className="font-display text-h1 uppercase"
          lineHeight={1.2}
          holdMs={6000}
        />
        <p className="mt-[clamp(20px,3.1vw,47px)] max-w-[27em] text-b1">{site.hero.subhead}</p>
      </Container>
    </section>
  );
}
