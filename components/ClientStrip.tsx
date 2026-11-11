import Image from "next/image";
import Container from "@/components/Container";
import { clientLogos, site } from "@/content/site";

/**
 * "We know who you are": the studio's pitch to the founder, then a row of
 * logos from past clients. On desktop the text is indented to line up with the
 * offer section below it (about 27% in, as in Figma).
 */
export default function ClientStrip() {
  return (
    <section className="pb-[clamp(24px,2vw,30px)] pt-[clamp(80px,14.4vw,217px)]">
      <Container>
        <div className="lg:ml-[25.3%]">
          <h2 className="font-display text-h2 uppercase">{site.clients.heading}</h2>
          <p className="mt-[clamp(16px,2vw,30px)] max-w-[942px] text-sh1">{site.clients.body}</p>
          <p className="mt-[clamp(12px,1.4vw,21px)] text-sh1">{site.clients.lead}</p>

          <ul className="mt-[clamp(20px,2vw,30px)] flex max-w-[950px] flex-wrap items-center justify-between gap-x-6 gap-y-6">
            {clientLogos.map((logo) => (
              <li key={logo.src} className="flex items-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={400}
                  height={400}
                  // Height scales with the viewport (Figma px at 1512 wide);
                  // width follows automatically so the logo never distorts.
                  style={{
                    height: `clamp(${Math.round(logo.height * 0.45)}px, ${(logo.height / 15.12).toFixed(2)}vw, ${logo.height}px)`,
                    width: "auto",
                    filter: "invert" in logo && logo.invert ? "brightness(0)" : undefined,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
