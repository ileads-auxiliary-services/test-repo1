# iLeads — AI-Powered BPM & Customer Experience Website

A premium, enterprise-grade marketing website for **iLeads** (iLeads Auxiliary Services Pvt. Ltd.),
repositioning the company from a "Call Center / BPO" into an **AI-Powered Business Process
Management and Customer Experience Transformation Partner**.

Built to win large enterprise and government contracts — clean, fast, accessible, and SEO-optimized.

---

## ✨ Tech stack

| Layer        | Choice                                            |
| ------------ | ------------------------------------------------- |
| Framework    | **Next.js 15** (App Router)                       |
| Language     | **TypeScript** (strict)                           |
| Styling      | **Tailwind CSS 3.4** (custom navy/electric theme) |
| Animation    | **Framer Motion** (scroll reveals, counters)      |
| Icons        | **lucide-react**                                  |
| Fonts        | **Sora** (display) + **Inter** (body)             |
| Output       | **Static export** (`output: "export"`)            |

The site is a fully static export — it can be hosted on **any** static host (S3 + CloudFront,
Netlify, Cloudflare Pages, GitHub Pages, Nginx, etc.) with no Node server required.

---

## 🚀 Getting started

```bash
npm install        # install dependencies
npm run dev        # local dev server → http://localhost:3000
npm run build      # production build + static export → ./out
```

The exported, deployable site is generated in **`/out`**.

---

## 📦 Deployment

Because this is a static export, deployment is just "upload the `out/` folder".

### Option A — Any static host / CDN
```bash
npm run build
# upload the contents of ./out to your bucket / host
```

### Option B — Netlify
- Build command: `npm run build`
- Publish directory: `out`

### Option C — Cloudflare Pages
- Build command: `npm run build`
- Output directory: `out`

### Option D — Vercel
Vercel auto-detects Next.js. The `output: "export"` config still applies; set the output to `out`
or remove the export flag to use Vercel's native Next.js hosting (enables Image Optimization).

> **Note:** `next.config.mjs` uses `trailingSlash: true` so every route is emitted as
> `folder/index.html`, which works on plain static hosts without rewrite rules.

---

## 🗺️ Site architecture

```
/                         Home — hero, stats, services, industries, AI/tech,
                          why-us, case studies, security, leadership, CTA
/about                    Story, mission, vision, values, timeline, leadership,
                          infrastructure, locations, certifications
/services                 Services hub (7 service families)
/services/[slug]          Customer Support · Sales & Revenue Ops · Collections ·
                          Verification · Back Office · Data Services · AI & Automation
/industries               Industries hub (9 sectors)
/industries/[slug]        BFSI · Fintech · Healthcare · E-commerce · Government ·
                          Telecom · SaaS · Education · Technology
/case-studies             Case studies hub
/case-studies/[slug]      Challenge → Solution → Outcome → Metrics
/careers                  Culture, benefits, employee stories, apply
/contact                  Lead form (inquiry routing), locations, map
/sitemap.xml  /robots.txt Generated automatically
```

### Folder structure
```
src/
├── app/                  Routes (App Router) + layout, sitemap, robots, 404
├── components/
│   ├── layout/           Header (mega-menu) + Footer
│   ├── sections/         Composable page sections (Hero, Stats, CTA, etc.)
│   └── ui/               Primitives (Reveal, Counter, PageHero, Logo, JsonLd…)
├── data/                 ⭐ Single source of truth (see below)
│   ├── company.ts        Company facts, stats, leadership, locations, certs, timeline
│   ├── services.ts       Service definitions + sub-capabilities + SEO
│   ├── industries.ts     Industry definitions + challenges/solutions + SEO
│   ├── caseStudies.ts    Case studies
│   └── nav.ts            Navigation + footer config
└── lib/
    ├── seo.ts            Metadata + JSON-LD schema builders
    └── utils.ts          cn() class helper
```

**To update content**, edit the files in `src/data/` — pages are generated from them.

---

## 🔍 SEO implementation

- Per-page **meta titles, descriptions, keywords** via the Metadata API
- **Open Graph** + **Twitter** cards (`/public/og.svg`)
- **Canonical URLs** and `metadataBase`
- **JSON-LD structured data**: `Organization`, `WebSite`, `Service`, `BreadcrumbList`
- Auto-generated **`sitemap.xml`** and **`robots.txt`**
- Targeted keywords baked into copy: *BPO Company India, Customer Support Outsourcing,
  Business Process Management Services, AI Powered Contact Center, Back Office Outsourcing,
  Lead Generation Services, Verification Services, Collections Services,* etc.

---

## ♿ Accessibility & performance

- Semantic landmarks, skip-to-content link, focus-visible rings
- `prefers-reduced-motion` respected across all animations
- Keyboard-navigable mega-menu and mobile nav
- Self-hosted Google Fonts via `next/font` (no layout shift)
- Static HTML + code-split JS (~105 kB shared first-load)

---

## 🎨 Design system

- **Palette:** deep navy (`ink`) foundation + **electric blue** accent (drawn from the
  Concentrix / Salesforce / Stripe enterprise direction)
- **Type:** Sora for large display headings, Inter for body
- Reusable tokens for buttons (`.btn-primary`, `.btn-outline`, `.btn-ghost-light`),
  cards (`.card-surface`), eyebrows, and gradient text in `globals.css`

---

## 📝 Content & data sources

Company facts (services, certifications, locations, founding year, leadership, recognition) were
sourced from **ileads.co.in** and public business records, then rewritten in enterprise marketing
language. Items to **confirm before go-live** are flagged with `TODO` comments in
`src/data/company.ts`:

- **Phone number(s)** — placeholder; confirm against the live contact page
- **Email addresses** — assumed `@ileads.co.in` convention (info/sales/careers)
- **Case-study metrics** — illustrative; replace with client-approved figures
- **Office addresses** — verify the full current list (Hyderabad/Punjab specifics)

### Wiring up the contact form
`src/components/sections/ContactForm.tsx` currently uses a **mailto fallback** (works with no
backend). To capture leads into a CRM, replace the `handleSubmit` body with a `fetch()` POST to
Formspree, HubSpot, or a serverless function.

---

## 📄 License

© iLeads Auxiliary Services Pvt. Ltd. All rights reserved.
