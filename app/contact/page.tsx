import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Nav from "@/components/Nav";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.contactPage.title} | ${site.name}`,
  description: "Tell us a little about your company, then pick a time for an intro call.",
};

/**
 * /contact: "Book an intro call". A big headline, a short form and then the
 * calendar (see <ContactForm>), all on black. The email address underneath is
 * for people who would rather write.
 */
export default function ContactPage() {
  return (
    <div className="min-h-svh bg-ink text-paper">
      <Nav variant="hero" fade={false} />
      <main className="mx-auto w-full max-w-[760px] px-gutter pb-[clamp(64px,8vw,120px)] pt-[clamp(110px,12vw,180px)]">
        {/* One line on tablet/desktop, running past the form's right edge. */}
        <h1 className="font-display text-h2 uppercase md:whitespace-nowrap">
          {site.contactPage.title}
        </h1>

        <p className="mt-[clamp(12px,1.2vw,18px)] text-b3 text-muted">
          {site.contactPage.priceNote}
        </p>

        <div className="mt-[clamp(32px,4vw,60px)]">
          <ContactForm />
        </div>

        <p className="mt-[clamp(48px,6vw,90px)] text-center text-b3">
          {site.contactPage.emailPrompt}
          <a
            href={`mailto:${site.contact.email}`}
            className="mt-1 block font-medium transition-opacity duration-200 hover:opacity-85"
          >
            {site.contact.email}
          </a>
        </p>
      </main>
    </div>
  );
}
