# TheCreativeArmy — Website v1 Build Plan

> Hand-off brief for Claude Code. Read this whole file before writing code.
> **Goal: a live, credible studio site at thecreativearmy.com by tomorrow (Wed, Nov 11, 2026).**
> Rule 1: Anything not decided in this file → stop and ask Alex. Do not guess.
> Rule 2: Anything repeated (twice or more) becomes a system: a token, a component, or a content type.

---

## 1. Context (why this site exists)

TheCreativeArmy LLC is a brand studio led by Alexander Akande (founder & creative director).

- **Positioning:** a studio for *challengers* — founders whose ideas are ready before their brand is. We close the gap between how good the idea is and how it looks, so they belong in rooms with bigger competitors.
  - "Challenger" is an internal word. **Do not use it in on-page copy.**
- **Primary audience:** prospective clients — early-stage founders and ambitious small businesses. (Not mentorship applicants, not employers. The mentorship program is *not* in the nav for v1.)
- **Core offer (working):** Brand identity system — **$5,000, 3 weeks** — applied to the client's key launch touchpoints so they can go to market looking like they belong.
- **Reference for the marketing structure:** https://www.primary.studio — the landing page is built around the offer, with the work as proof.
- **Voice:** the site speaks as "we" (the studio). Testimonials may name Alex — the Studio/About section must say the studio is led by Alexander Akande so this reads naturally. Never imply a team that doesn't exist (no "our team of designers").

---

## 2. Scope for tomorrow (v1) vs later

### v1 — must ship tomorrow
- **One landing page** (`/`) with the sections in §5.
- **Case study pages** (`/work/[slug]`) — *only if case study content is ready* (see Decision D3). Otherwise the work section on the home page carries the projects, and case study pages ship in v1.1.
- **Contact:** a "Book a call" button (Cal.com / Calendly link) + a `mailto:` fallback. **No form backend in v1** — that's v1.1.
- Responsive (mobile → desktop), accessible basics, SEO metadata, social share image, favicon, 404.
- Deployed on Vercel, domain connected.

### v1.1 — next week
- Contact form (Next.js server action + Resend + honeypot + rate limit).
- Full case study pages (if not in v1).
- Motion polish, analytics review, Lighthouse tuning.

### Out of scope
- CMS dashboard, logins, client portal, mentorship pages, blog, payments.

---

## 3. Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js (App Router) + React + TypeScript** | Alex's personal site is React; stay in React. |
| Styling | **⚠️ Decision D5** — Tailwind CSS *or* CSS Modules | Match Alex's personal site if possible. Default to Tailwind if no answer. |
| Content | **MDX / TS data files in the repo** | `content/work/*.mdx` for case studies; `content/site.ts` for home copy. No CMS. |
| Images | `next/image`, AVIF/WebP | Source images in `public/work/<slug>/`. |
| Fonts | `next/font/local` (self-hosted) | See licensing Decision D4. |
| Hosting | **Vercel** | Preview deploys on every push. |
| Analytics | Vercel Analytics | One line; can swap for Plausible later. |
| Booking | Cal.com or Calendly embed/link | Decision D6. |

---

## 4. Design system (from Figma + Alex's type spec)

Source of truth: Figma file `vplGpXryr03nUorh71YKmb` ("Branding"), node `659:925`.
URL: https://www.figma.com/design/vplGpXryr03nUorh71YKmb/Branding?node-id=659-925
**⚠️ Decision D1:** the Figma connector could not access this file. Before starting, Alex must either share the file with the Figma account connected to Claude Code, or export the frames as PNGs into `/design-reference/`.

### 4.1 Type scale (Alex's spec)

| Token | Font | Desktop size | Usage |
|---|---|---|---|
| `h1` | Redaction | 110px | Hero headline only |
| `h2` | Redaction | 70px | Section headlines |
| `sh1` | Neue Haas Grotesk | 35px | Subheadings / hero subhead |
| `b1` | Neue Haas Grotesk | 30px | Lead body |
| `b2` | Neue Haas Grotesk Bold | 30px | Lead body emphasis |
| `b3` | Neue Haas Grotesk | 20px | Body |
| `b4` | Neue Haas Grotesk Bold | 20px | Body emphasis / labels / buttons |

Implement as **one typography system**: CSS custom properties + a single `<Text variant="h1|h2|sh1|b1|b2|b3|b4">` component (or Tailwind utilities `text-h1` … `text-b4`). No ad-hoc font sizes anywhere in the codebase.

**Gaps in the spec — surface to Alex, but use these defaults so work isn't blocked:**

| Gap | Default to use until Alex decides |
|---|---|
| **No mobile sizes.** A 110px H1 won't fit a 375px screen. | Fluid `clamp()` per token. Proposed: h1 `clamp(48px, 9vw, 110px)`, h2 `clamp(36px, 6vw, 70px)`, sh1 `clamp(22px, 3vw, 35px)`, b1/b2 `clamp(20px, 2.4vw, 30px)`, b3/b4 `clamp(16px, 1.4vw, 20px)`. |
| **No line heights.** | Display (h1, h2): 1.0–1.05. sh1: 1.2. Body: 1.4. |
| **No letter-spacing.** | h1/h2: −0.02em. Body: 0. |
| **B1 (30px) is large for running text.** | Use b1 for lead paragraphs only; long text uses b3. |
| **No small/caption size** (footer, legal, image captions). | Add `b5`: Neue Haas Grotesk 16px (14px mobile). Flag to Alex. |
| **Two Neue Haas cuts?** (Display vs Text) | Ask. Default: Display for sh1 and above, Text for b1–b4 if available. |

### 4.2 Other tokens — read from Figma, don't invent them
Pull exact values from Figma variables/styles. If Figma has none, list what you found and ask:
- **Color:** background, foreground, accent, muted, border. (⚠️ Not in the spec yet.)
- **Spacing scale:** suggested 4/8-based scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160).
- **Grid:** columns, gutter, margins per breakpoint (suggested 4 / 8 / 12 columns).
- **Breakpoints:** suggested `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`. Max content width from Figma.
- **Radii, borders, shadows:** whatever Figma uses, as tokens.

All tokens live in **one file** (`styles/tokens.css` or `tailwind.config.ts`) and are referenced everywhere.

---

## 5. Landing page — section order

Section structure follows the Primary-style "offer-first, work as proof" model. **Final copy comes from Alex (Decision D2).** Placeholders in `[brackets]` should be marked clearly in the code so they're easy to find.

1. **Nav** — Logo · Work · Studio · **Book a call** (primary button).
2. **Hero**
   - H1 (working pick): **"The ideas defining tomorrow should look like it today."**
   - SH1 subhead: "Brand identity systems for founders whose ideas are ready before their brand is. Three weeks, from first call to launch-ready."
   - Primary CTA: Book a call. Secondary: See the work.
   - Visual: work carousel/strip directly under the headline (Primary-style), each image tied to an outcome caption.
3. **Selected work** — 3 case study cards: TRG, Hydrowells(?), + one more (Decision D3). Card = image, client, one-line "didn't look the part → now belongs" outcome, link.
4. **The offer** — name, what's included, timeline, price ($5,000 — Decision D7: show it or "starting at"?), what the client gets to *do* on day 22 (launch touchpoints).
5. **How it works** — 3–4 steps over 3 weeks (e.g., Discover → Define → Design → Deliver). Copy from Alex.
6. **Testimonial** — Hydrowells pull quote (**only after client approval — Decision D8**):
   > "They listen deeply, offer insightful advice, and explain every design direction with clarity and purpose. I'm not easily satisfied, yet they brought to life exactly what I had envisioned."
   > — [Name], [Title], Hydrowells
7. **Why us vs the alternatives** — comparison (cheap logo shops / big agencies / TheCreativeArmy). Copy from Alex.
8. **Studio** — short about + "TheCreativeArmy is led by Alexander Akande, founder & creative director."
9. **FAQ** — e.g., What's included? What do you need from me? What if I don't like it? Do you build websites? Payment terms?
10. **Final CTA** — repeat the headline idea + Book a call.
11. **Footer** — email, socials, © TheCreativeArmy LLC. (Don't publish a personal address.)

### Components (build once, reuse)
`Container` · `Section` (spacing + optional heading) · `Text` (type tokens) · `Button` (primary/secondary/link) · `Nav` · `Footer` · `WorkCard` · `WorkStrip/Carousel` · `OfferCard` · `Steps` · `Testimonial` · `ComparisonTable` · `FAQ` (accessible accordion, `<details>`) · `CTASection`.

---

## 6. File structure

```
/app
  layout.tsx           # fonts, metadata, analytics, nav/footer
  page.tsx             # landing page — composes sections from content/site.ts
  work/[slug]/page.tsx # case study template (v1 if content ready)
  not-found.tsx
  opengraph-image.tsx  # or static /public/og.png
/components            # one file per component listed in §5
/content
  site.ts              # all home-page copy in one typed object
  work/*.mdx           # case studies (frontmatter: title, client, summary, cover, order)
/styles
  globals.css
  tokens.css           # (or tailwind.config.ts) — single source of tokens
/public
  fonts/  work/<slug>/  og.png  favicon
/design-reference      # Figma exports if the connector can't reach the file
```

**All copy lives in `/content`, never hardcoded in components.** That's the "CMS" for v1.

---

## 7. Build order (today → tomorrow)

| # | Step | Done when |
|---|---|---|
| 0 | Resolve blockers D1 (Figma access), D4 (fonts), D5 (styling) | Claude Code can see the design; font files are in `/public/fonts` |
| 1 | Scaffold Next.js + TS + styling choice; push to GitHub; connect Vercel | Preview URL loads |
| 2 | Tokens: type scale (§4.1), colors/spacing/grid from Figma | Single tokens file, a `/styleguide` dev page shows every token |
| 3 | Layout primitives: Container, Section, Text, Button, Nav, Footer | Styleguide page shows them |
| 4 | Home sections 1–11 with placeholder copy from `content/site.ts` | Matches Figma at desktop |
| 5 | Responsive pass at 375 / 768 / 1024 / 1440 | No overflow, readable type at every width |
| 6 | Drop in real copy + images from Alex | No `[placeholder]` left in the UI |
| 7 | Case study template + MDX (if D3 content is ready) | `/work/<slug>` renders all 3 |
| 8 | Metadata, OG image, favicon, 404, analytics | Share link previews correctly |
| 9 | QA checklist (§8) | All checked |
| 10 | Point thecreativearmy.com DNS at Vercel; production deploy | Live on the domain with HTTPS |

Remove the `/styleguide` route (or leave it unlinked/`noindex`) before launch.

---

## 8. Launch QA checklist

- [ ] Every CTA goes somewhere real (booking link, mailto)
- [ ] No placeholder copy or lorem ipsum anywhere
- [ ] Testimonial approved by client in writing
- [ ] Images optimized; hero loads fast on mobile (LCP < 2.5s target)
- [ ] Keyboard navigation works; visible focus states; alt text on all images
- [ ] Colour contrast passes WCAG AA
- [ ] `prefers-reduced-motion` respected for any carousel/motion
- [ ] Title, description, OG image on every page
- [ ] Favicon + apple-touch icon
- [ ] Fonts licensed for web, self-hosted
- [ ] Tested on real iPhone + desktop Chrome/Safari
- [ ] 404 page works
- [ ] Domain + `www` redirect + HTTPS

---

## 9. Open decisions — ask Alex before assuming

| # | Decision | Blocking? | Default if no answer |
|---|---|---|---|
| **D1** | **Figma access** — share file `vplGpXryr03nUorh71YKmb` with the connected Figma account, or export frames to `/design-reference/` | **Yes** | — |
| **D2** | Final copy: hero headline, offer, steps, comparison, FAQ, studio blurb | Yes for launch | Working headline in §5; clearly marked placeholders |
| **D3** | The 3 case studies: TRG + which two (Hydrowells?), and is the content (images + write-up) ready? | Partly | Home-page work cards only; case study pages in v1.1 |
| **D4** | Font licensing: Neue Haas Grotesk is a commercial typeface — does Alex have a web license (or Adobe Fonts)? Confirm Redaction's license covers web use. | **Yes** | Temporary fallback: Redaction (if licensed) + a free grotesk (e.g., Inter) swapped in via one token |
| **D5** | Styling: Tailwind or CSS Modules (match personal site)? | Yes (at scaffold) | Tailwind |
| **D6** | Booking tool: Cal.com or Calendly — and the link | Yes for launch | `mailto:` CTA until provided |
| **D7** | Show the price on the page ($5,000 / "starting at $5,000") or not? | No | "Starting at $5,000" |
| **D8** | Hydrowells testimonial approved? Client name + title for attribution | Yes for that section | Hide the testimonial section until approved |
| **D9** | Color palette (not in the type spec) | Yes | Read from Figma |
| **D10** | Mobile type sizes, line heights, tracking (see §4.1 gaps) | No | Use the defaults in §4.1 |
| **D11** | Logo files (SVG) and favicon | Yes | Text wordmark until provided |
| **D12** | Domain/DNS access for thecreativearmy.com (who's the registrar?) | Yes for go-live | Ship on the `*.vercel.app` URL first |
| **D13** | Contact email to publish | Yes | — |
| **D14** | Socials to link in the footer | No | Omit |

---

## 10. Notes for Claude Code

- Work in small commits; push often so Alex gets preview URLs to react to.
- Build tokens and primitives **before** sections. If you're about to write a one-off style, stop: it's either a token or a component.
- If the Figma MCP is available, use it to pull variables, styles and exact spacing; don't eyeball values.
- When Figma and this plan disagree, **Figma wins on visuals, this plan wins on structure and scope** — and flag the conflict to Alex.
- Keep the home page fully static (no client-side data fetching). Only interactive bits (carousel, FAQ accordion, mobile nav) should be client components.
- Accessibility and performance are part of "done," not polish.
