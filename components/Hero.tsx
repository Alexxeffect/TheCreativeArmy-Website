import Container from "@/components/Container";
import { site } from "@/content/site";

/** Top of the landing page: the big headline and the one-line studio intro. */
export default function Hero() {
  return (
    <section className="pb-[clamp(56px,11.5vw,174px)] pt-[clamp(40px,8.3vw,125px)]">
      <Container>
        <h1 className="max-w-[91.5%] font-display text-h1 uppercase max-md:max-w-full">
          {site.hero.headline}
        </h1>
        <p className="mt-[clamp(20px,3.1vw,47px)] max-w-[821px] text-b1">{site.hero.subhead}</p>
      </Container>
    </section>
  );
}
