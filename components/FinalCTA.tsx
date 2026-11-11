import Button from "@/components/Button";
import Container from "@/components/Container";
import { site } from "@/content/site";

/** Closing call to action: a big headline, the email button, the booking button. */
export default function FinalCTA() {
  const { cta, contact } = site;

  return (
    <section id="contact" className="pb-[clamp(64px,16.8vw,254px)]">
      <Container className="text-center">
        <h2 className="mx-auto max-w-[1223px] font-display text-cta uppercase">
          {cta.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="mt-[clamp(24px,4vw,60px)] text-quote">{cta.emailLabel}</p>
        <div className="mt-[clamp(4px,0.5vw,8px)]">
          <Button href={`mailto:${contact.email}`} variant="brand" size="xl">
            {contact.email}
          </Button>
        </div>

        <p className="mt-[clamp(28px,3.7vw,56px)] text-quote">{cta.bookingLabel}</p>
        <div className="mt-[clamp(4px,0.5vw,8px)]">
          {/* ⚠ Booking link is blank for now, so this button is inactive. */}
          <Button href={contact.bookingUrl} variant="outline" size="lg">
            {cta.bookingButton}
          </Button>
        </div>
      </Container>
    </section>
  );
}
