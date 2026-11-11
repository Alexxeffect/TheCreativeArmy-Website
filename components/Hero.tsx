import Container from "@/components/Container";
import CyclingHeadline from "@/components/CyclingHeadline";
import { site } from "@/content/site";

/** Top of the landing page: the cycling headline and the one-line studio intro. */
export default function Hero() {
  return (
    <section className="pb-[clamp(56px,11.5vw,174px)] pt-[clamp(40px,8.3vw,125px)]">
      <Container>
        {/* max-w is in em (relative to the 110px headline): 10.01em keeps the
            line break after "DESERVE", as in Figma's 1302px box at 130px. */}
        <CyclingHeadline
          messages={[...site.hero.headlines]}
          className="max-w-[10.01em] font-display text-h1 uppercase max-md:max-w-none"
          lineHeight={1.2}
          holdMs={6000}
        />
        <p className="mt-[clamp(20px,3.1vw,47px)] max-w-[975px] text-b1">{site.hero.subhead}</p>
      </Container>
    </section>
  );
}
