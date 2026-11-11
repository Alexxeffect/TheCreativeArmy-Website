# TheCreativeArmy: website

Next.js 14 (App Router) + React 18 + TypeScript + Tailwind 3. Same stack as the personal portfolio site.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages are static)
```

## Where things live

| What | Where |
|---|---|
| **All landing-page copy**, links, projects, client logos | `content/site.ts` |
| **Case study pages** (copy + images + videos) | `content/work/*.ts`, registered in `content/work/index.ts` |
| Design tokens (colours, type sizes, radii) | `tailwind.config.ts`: the only place sizes/colours are defined |
| Fonts | Adobe Fonts kit `urt4kvy`, linked in `app/layout.tsx` (`redaction`, `neue-haas-grotesk-display`) |
| Sections / components | `components/` |
| Images, videos | `public/images/`, `public/videos/` |

To add a case study: create `content/work/<slug>.ts`, add it to `content/work/index.ts`, and set `hasCaseStudy: true` on its project in `content/site.ts`.

## Open items

Search the code for `⚠` to find every decision that is still open (each has a note explaining it).

Source of truth for visuals: Figma file `vplGpXryr03nUorh71YKmb` ("Branding"), page "Website".
