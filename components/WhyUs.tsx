import Image from "next/image";
import CoinRing from "@/components/CoinRing";
import Container from "@/components/Container";
import WhyCards, { type WhyCard } from "@/components/WhyCards";
import { site } from "@/content/site";

/**
 * "Why work with us?" on white (the page fades to white as it arrives): three
 * cards in a row, one open at a time (see <WhyCards>). The artwork was
 * exported from Figma.
 */
export default function WhyUs() {
  const { why } = site;

  /*
   * The pictures inside the open cards. Each is laid out in "picture window"
   * terms (copied from Figma, where the window is 779 x 395): --ww and --wh are
   * the window's size, --ox and --oy where it starts. The cards clip the
   * artwork to the window (or open it up to full bleed), so the artwork itself
   * never moves or scales while the card opens and closes. Each one also
   * extends past the window so it can fill the whole card.
   */
  const halftone = (
    <Image
      src="/images/why/ascii-people-framed.png"
      alt="Two people in a doorway, drawn as an orange halftone"
      fill
      sizes="(min-width: 768px) 54vw, 100vw"
      className="object-cover [object-position:50%_30%] md:[object-position:50%_45%]"
    />
  );

  const rings = (
    <>
      <div className="absolute inset-0 bg-wine" />
      <div
        className="absolute"
        style={{
          left: "calc(var(--ox) + var(--ww) * -0.0512)",
          top: "calc(var(--oy) + var(--wh) * 0.1209)",
          width: "calc(var(--ww) * 1.1166)",
          height: "calc(var(--ww) * 1.1166)",
        }}
      >
        <Image
          src="/images/why/rings.svg"
          alt=""
          fill
          sizes="(min-width: 768px) 54vw, 100vw"
          className="object-contain"
        />
      </div>
    </>
  );

  const coins = (
    <>
      <div className="absolute inset-0 bg-wine" />
      <CoinRing
        className="absolute"
        style={{
          left: "calc(var(--ox) + var(--ww) * -0.08985)",
          top: "calc(var(--oy) + var(--wh) * -0.162)",
          width: "calc(var(--ww) * 1.181)",
        }}
      />
    </>
  );

  const cards: WhyCard[] = [
    {
      id: "we-get-you",
      art: { src: "/images/why/ascii-people-framed.png", alt: "" },
      open: { ...why.cards[0], visual: halftone },
    },
    {
      id: "take-you-there",
      art: { src: "/images/why/rings-card.png", alt: "" },
      open: { ...why.cards[1], visual: rings },
    },
    {
      id: "coins",
      crop: "right",
      art: { src: "/images/why/coins-card.png", alt: "" },
      open: { ...why.cards[2], visual: coins },
    },
  ];

  // No background on the section: the page fades from black to white behind it
  // (see <ToneShift>). Without JavaScript it gets white itself.
  return (
    <section className="pt-[clamp(48px,6.15vw,93px)] [@media(scripting:none)]:bg-paper [@media(scripting:none)]:text-ink">
      <Container>
        <h2
          id="why-heading"
          className="text-center font-display text-h2 uppercase text-brand"
        >
          {why.heading}
        </h2>

        <div className="mt-[clamp(24px,2.8vw,42px)]">
          <WhyCards cards={cards} />
        </div>
      </Container>
    </section>
  );
}
