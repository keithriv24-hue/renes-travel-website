# René’s Travel Agency website

The website for **René’s Travel Agency, LLC** (René Howell): renestravelagency.com. The LLC was formed in New Jersey in 2014 and now operates from Delaware.

It uses the Haul Yeah Moving site (`keithriv24-hue/haul-yeah-website`) as its pattern. The Haul Yeah repo was only used as a reference and was not changed. The design merges homepage concepts A (editorial magazine) and C (René’s personal voice), with cobalt blue as the one accent color.

## Commands

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build → dist/ (every page prerendered to static HTML)
npm run preview   # serve dist/ locally
```

Node 22 (Vite 8 needs Node 20.19+ or 22.12+; the site is built and tested on 22).

## Deploying (Cloudflare Pages, same as Haul Yeah)

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variable | `NODE_VERSION=22` |
| Project | `renes-travel-website` → https://renes-travel-website.pages.dev |

The build writes `dist/_redirects`. That file sends René’s old 2016 links (`/history.php`, `/royal.php` and so on) to the new pages with 301 redirects, so existing links and Google rankings carry over. Cloudflare Pages serves `dist/404.html` for any unknown URL.

## Where things live

| What | File |
| --- | --- |
| Business info, contact details, integrations, testimonials, forms, FAQs, photo slots | `src/data/siteConfig.js` |
| Trip pages (`/trips/<slug>/`) | `src/data/trips.js` |
| Partner pages (`/partners/<slug>/`) | `src/data/partners.js` |
| Page titles, descriptions, structured data, sitemap, redirects | `src/lib/routes.js` |
| Design system (colors, type, components) | `src/index.css` |
| Prerender + sitemap + redirects build step | `scripts/prerender.mjs` |

**Adding a trip or a partner:** add one object to `trips.js` or `partners.js`. That object creates the page, its links, its sitemap entry and its structured data. Unlike Haul Yeah, there is no sitemap to edit by hand, because the sitemap is generated at build time.

## Turning things on

Each integration stays off until its value is filled in. With an empty value nothing loads and no requests fire.

| Feature | Set in `siteConfig.js` | Notes |
| --- | --- | --- |
| Tally trip form | `tally.formId` | **On** (`44eg4k`). Every “Plan my trip” button opens the Tally popup; `/plan-my-trip/` shows it inline. Set it to `""` to fall back to René’s old JotForm. See `docs/TALLY_FORM_SETUP.md`. |
| Google Analytics 4 | `analytics.measurementId` | Events: `quote_start`, `generate_lead`, `phone_click`, `sms_click`, `email_click`, `page_view`. |
| Meta Pixel | `analytics.metaPixelId` | Events: InitiateCheckout, Lead (on `/thank-you/`), Contact. Every event carries an eventID for a future Conversions API setup. |
| Google reviews | `reviews.enabled`, `trustindexWidgetId`, `googleReviewLink` | While reviews are off, René’s own testimonials show instead. |
| Photos | `images.<slot>.src` | Each slot shows a sized placeholder with its brief until a photo is added. Put files in `public/images/`. |
| Town | `business.town` | Added to the structured data when set. |

## Before launch

See `docs/LAUNCH_CHECKLIST.md`. The short version:

1. Copy the old site’s `/pdf` folder into `public/pdf/`. The paths are unchanged, but the files were not in the upload.
2. Add the photos, especially René’s portrait and a real group photo.
3. Have René approve the items in `docs/LAUNCH_CHECKLIST.md`.
4. Decide whether René should also get the Tally submission emails (see `docs/TALLY_FORM_SETUP.md`).

## What came over from Haul Yeah

- One config file holds all the business info, and the trip and partner pages are built from data files.
- The form flow: popup on every button, inline embed on the plan page, Meta attribution hidden fields, and a fallback link if the script is blocked.
- A `/thank-you/` conversion page that fires the Lead event, kept out of search results and the sitemap.
- The analytics event layer, plus tracking on every tel:, sms: and mailto: click.
- The Trustindex Google reviews widget, with a fallback when it is switched off.
- Per-page titles, descriptions and canonicals; structured data (TravelAgency, Service, FAQPage, BreadcrumbList); a robots.txt that allows AI search crawlers.
- A sticky mobile Call / Text / Plan my trip bar, FAQ answers kept in the page for SEO, and a 404 page.

## What is different from Haul Yeah, and why

- **Vite instead of Create React App.** CRA is deprecated. Vite builds faster and is maintained.
- **Prerendering without a headless browser.** Pages are rendered with React’s server renderer. That means no Puppeteer download, and it works on any CI. Head tags come from one route table, so there are no duplicate titles. That was a real bug on Haul Yeah.
- **Self-hosted fonts** through @fontsource. There are no calls to Google Fonts, which is faster and better for privacy.
- **No shadcn/ui, lucide or backend.** The site doesn’t need them, and the bundle stays small.
