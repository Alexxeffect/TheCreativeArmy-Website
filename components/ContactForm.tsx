"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { site } from "@/content/site";

/**
 * The /contact form, in two steps on the same page:
 *  1. A short form about the visitor and their company.
 *  2. Cal.com's calendar (the "Discovery meeting"), with their name, email and
 *     everything they wrote already filled in, so the booking Cal sends us has
 *     all of it. Nothing is stored on this site: Cal keeps the booking.
 * "Edit my answers" goes back to step 1 with the answers still there.
 *
 * The text is in content/site.ts (`contactPage`); the calendar address is
 * `contact.bookingUrl`.
 */

const NAMESPACE = "discovery";
// "https://cal.com/someone/discovery" -> "someone/discovery"
const calLink = new URL(site.contact.bookingUrl).pathname.slice(1);

type Answers = Record<string, string>;

// Underlined single-line fields and boxed text areas, white on the black page.
const lineField =
  "contact-field block w-full border-0 border-b border-paper/30 bg-transparent py-4 text-b3 text-paper outline-none transition-colors placeholder:text-paper/50 focus:border-paper";
const boxField =
  "contact-field mt-4 block w-full resize-y rounded-none border border-paper/30 bg-transparent p-4 text-b3 text-paper outline-none transition-colors placeholder:text-paper/50 focus:border-paper";
const question = "block text-b3";

export default function ContactForm() {
  const c = site.contactPage;
  const [answers, setAnswers] = useState<Answers | null>(null);

  // Tell Cal's embed to match the page: dark, with the studio's orange, on pure
  // black (its default dark is a lighter grey).
  useEffect(() => {
    getCalApi({ namespace: NAMESPACE }).then((cal) => {
      cal("ui", {
        theme: "dark",
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": "#FF5100" },
          dark: {
            "cal-brand": "#FF5100",
            "cal-bg": "#000000",
            "cal-bg-muted": "#000000",
            "cal-bg-subtle": "#000000",
          },
        },
      });
    });
  }, []);

  if (answers) {
    // Everything except name and email goes into the booking's "notes".
    const notes = [
      `Title/Role: ${answers.role}`,
      `Company: ${answers.company}`,
      `Website: ${answers.website}`,
      `About the company: ${answers.about}`,
      `Closest brands/websites: ${answers.references}`,
      answers.notes ? `Additional notes: ${answers.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    return (
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="text-b3">{c.pickTime}</p>
          <button
            type="button"
            onClick={() => setAnswers(null)}
            className="text-b3 text-paper/60 underline underline-offset-4 transition-colors hover:text-paper"
          >
            {c.edit}
          </button>
        </div>
        {/* Wider than the form column (and centred on the page), so Cal can lay
            out details | calendar | times side by side instead of stacking. */}
        <div className="relative left-1/2 mt-6 w-[min(1000px,100vw-2*theme(spacing.gutter))] -translate-x-1/2">
          <Cal
            namespace={NAMESPACE}
            calLink={calLink}
            style={{ width: "100%", overflow: "scroll" }}
            config={{
              layout: "month_view",
              theme: "dark",
              name: answers.name,
              email: answers.email,
              notes,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setAnswers(
          Object.fromEntries(
            Array.from(data.entries()).map(([k, v]) => [k, String(v).trim()]),
          ),
        );
      }}
    >
      <p className={question}>{c.intro}</p>

      <div className="mt-2">
        <input
          name="name"
          required
          autoComplete="name"
          placeholder={c.fields.name}
          aria-label={c.fields.name}
          defaultValue=""
          className={lineField}
        />
        <input
          name="role"
          required
          autoComplete="organization-title"
          placeholder={c.fields.role}
          aria-label={c.fields.role}
          className={lineField}
        />
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={c.fields.email}
          aria-label={c.fields.email}
          className={lineField}
        />
        <input
          name="company"
          required
          autoComplete="organization"
          placeholder={c.fields.company}
          aria-label={c.fields.company}
          className={lineField}
        />
        <input
          name="website"
          required
          inputMode="url"
          autoComplete="url"
          placeholder={c.fields.website}
          aria-label={c.fields.website}
          className={lineField}
        />
      </div>

      <label className="mt-[clamp(32px,3.2vw,48px)] block">
        <span className={question}>{c.about.label}</span>
        <textarea
          name="about"
          required
          rows={3}
          placeholder={c.about.placeholder}
          className={boxField}
        />
      </label>

      <label className="mt-[clamp(24px,2.6vw,40px)] block">
        <span className={question}>{c.references.label}</span>
        <textarea
          name="references"
          required
          rows={3}
          placeholder={c.references.placeholder}
          className={boxField}
        />
      </label>

      <label className="mt-[clamp(24px,2.6vw,40px)] block">
        <span className={question}>{c.notes.label}</span>
        <textarea
          name="notes"
          rows={3}
          placeholder={c.notes.placeholder}
          className={boxField}
        />
      </label>

      {/* White, 5px corners, and the gradient that rises on hover: the same
          "light" button as View Project on the black work section. */}
      <div className="mt-[clamp(32px,3.6vw,56px)]">
        <Button type="submit" variant="light" size="form">
          {c.submit}
        </Button>
      </div>
    </form>
  );
}
