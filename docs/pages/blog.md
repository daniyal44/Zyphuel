# Page Documentation: Blog Listing Page

## Overview & Identity
- **Page Name**: Blog & Fuel Guides Listing
- **Route**: `/blog/`
- **Component File**: `src/pages/BlogListPage.jsx`
- **Primary Purpose**: Editorial and knowledge hub publishing articles, market analyses, safety guides, and tech documentation regarding fuel delivery, daily price fluctuations, generator maintenance, and mobile energy in Pakistan.

---

## SEO & Structured Data
- **Page Title**: `Zyphuel Blog | Fuel Delivery, Energy & Vehicle Guides`
- **Meta Description**: `Read the latest articles about fuel delivery, generator refueling, LPG gas delivery, and mobile energy logistics in Lahore, Pakistan.`
- **Schema Type**: `CollectionPage` / `Blog`
- **Sitemap Priority**: `0.9` (`daily` change frequency) for `/blog/`; `0.8` (`weekly` change frequency) for all 8 individual article subpages.
- **Canonical URL**: `https://zyphuel.netlify.app/blog/`

---

## Layout & Interactive Components
1. **Breadcrumbs**:
   - Navigation: `Home / Blog`.
2. **Hero Header**:
   - Title: `Zyphuel Blog & Fuel Guides`.
   - Subtitle: Latest updates regarding mobile fuel logistics, daily OGRA price reforms, and smart refueling.
3. **Category Filtering Bar**:
   - Filter Tabs:
     - `All Articles`
     - `Zyphuel Energy`
     - `Zyphuel App & Guides`
     - `Generator & Utilities`
   - Dynamically re-triggers CSS scroll reveal animations on tab toggle.
4. **Article Cards Grid**:
   - Responsive CSS Grid rendering `BlogCard` components with category badges, author avatars, reading times, tags, summaries, and deep links to `/blog/:slug/`.
5. **Bottom Cross-Link Banner**:
   - Dark gradient card linking visitors to `/order/`, `/contact/`, and `/services/` for immediate operations and advisory inquiries.
6. **Rich Article Rendering Architecture (`src/pages/BlogArticlePage.jsx`)**:
   - **Key Takeaways Box**: Highlighted executive summary tailored for AI answer engines (AEO/GEO) and quick scanning.
   - **Table of Contents Quick Jump**: Smooth anchor navigation linking to major H2 headings.
   - **Responsive Technical Data Tables**: Comparison matrices across regulations, fuel efficiency, metering precision, and device specs.
   - **Expert Quotes & Authority Citations**: Direct commentary from Founder Muhammad Daniyal and senior telemetry engineers.
   - **Interactive FAQ Accordions**: 5 targeted Q&As per article backed by Schema.org `FAQPage` markup.
   - **Social Sharing Bus**: One-tap share buttons for WhatsApp, LinkedIn, and clipboard copy.
   - **Author Profile & Internal Link Grid**: Bio card and 3-column mesh to related fuel guides.

---

## Syndication & Discovery Feeds
- **RSS 2.0 Feed**: Published at `/feed.xml` with full XML syndication of all 8 articles.
- **Search Engine Discovery**: Listed in `public/robots.txt` (`Allow: /feed.xml`), `<link rel="alternate" type="application/rss+xml">` in `index.html`, and direct link in `/sitemap/`.

---

## Data Source
- **File**: `src/data/articles.js`
- **Total Articles**: 10 published authoritative technical pillar guides.

---

## Download CTAs & In-Content Conversion Architecture
- **Blog Listing Page (`src/pages/BlogListPage.jsx`)**:
  - **In-Content Hero Download Card**: Prominent call-to-action placed directly beneath the blog hero header and above category tabs.
  - **Button**: `<Link to="/download/" className="btn btn-primary blog-download-cta-btn" id="blog-download-btn" data-testid="blog-download-btn"><i className="fa-solid fa-download"></i><span>Download</span></Link>`.
  - **Initial HTML / SSR Rendering**: Bypasses viewport/scroll reveal triggers (`.fade-in-up` removed from top container) and enforces explicit `opacity: 1; visibility: visible;` inline styles to guarantee immediate test accessibility and crawler discoverability without user scroll.
  - **Secondary Action Banner**: Bottom banner with secondary `Download` button linking directly to `/download/`.
- **Blog Article Page (`src/pages/BlogArticlePage.jsx`)**:
  - **In-Content Quick Download Box**: Injected directly between the Table of Contents and Section 1, rendering `<Link to="/download/" className="btn btn-primary" id="article-download-btn" data-testid="article-download-btn"><i className="fa-solid fa-download"></i><span>Download</span></Link>`.
  - **Article Footer CTA**: Updated primary button to exact label `Download` with direct routing to `/download/`.
  - **Related Zyphuel Services block (2026-10-28)**: a `Related Zyphuel Services in Lahore` list sits between the “Related Fuel Guides” grid and the bottom CTA, rendered on all 10 articles. It carries three keyword-bearing body links: `Doorstep petrol, diesel and generator refueling services in Lahore` → `/services/`, `Order fuel online in Lahore, 5 to 15 litres within 45 minutes` → `/order/`, and `Download the Zyphuel Android app (direct APK)` → `/download/`. Before this block, article bodies contained **zero** outbound links and relied entirely on nav/footer; each article now carries 44 internal links instead of 41.

---

## Advertising & Monetization (AdSense Removed)
- **Status**: Completely Removed (as of 2026-10-09).
- **History**: Previously utilized Google AdSense Native In-Feed ads (`AdSenseInFeed.jsx`, Slot: `8572960244`, Client: `ca-pub-6127960264752741`).
- **Current State**: 100% clean, ad-free editorial reading experience across all blog listing grids and individual article pages. Zero third-party ad network scripts or tracking tags loaded.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-10-28** | **Related Services block added to every article**: `BlogArticlePage.jsx` now renders a `Related Zyphuel Services in Lahore` list between the related-guides grid and the bottom CTA, with keyword-bearing anchors to `/services/`, `/order/` and `/download/`. Article 10's `no urgent priority surcharge` sentence was reworded to `Delivery is a single tier only, so there is no priority surcharge and no express fee` because `qa-static.cjs` rejects any occurrence of "urgent". Articles 9 and 10 also reached the live sitemap for the first time — the deployed sitemap still listed 17 URLs. | User asked for action on the Search Console Coverage export where `/services/`, `/order/` and `/download/` are not indexed. Articles were dead ends with no body links into the three commercial pages. Verified: build exit 0, QA 20 pages / 0 issues, link audit 0 dangling, sitemap 19 URLs. See `docs/reports/2026-10-28-search-console-indexing-report.md`. |
| **2026-10-26** | **Blog routes split out of the entry bundle + lazy thumbnails**: `BlogListPage` and `BlogArticlePage` are now lazy routes, so `articles-data`/`fuelMarketIntel` load only when a blog URL is visited; blog card and modal thumbnails carry `loading="lazy" decoding="async"`. Both pages remain fully prerendered for crawlers. | User: *"performance & speed ko be improve karo"*. |
| **2026-10-23 (Wave 2)** | **Price/news keyword expansion + meta description update**: added `petrol price in Pakistan today`, `diesel price today Pakistan`, `OGRA fuel price update`, `fuel price news Pakistan`, `load shedding generator fuel`, `high octane petrol price Pakistan`; description now leads with petrol & diesel prices in Pakistan. | User: daily-pricing news cluster capture. |
| **2026-10-22** | **Scroll-Linked Parallax on Cards & Article Hero**: every blog card image (`.blog-card-image`) and the article hero image are now `[data-scrub="parallax"]` layers — they drift ±12 px with the scroll inside their clipped `overflow: hidden` frames (soft mode ±5 px), written at most once per 16 ms from a passive scroll listener with all rects read before any style write. Measured `/blog/`: `translateY` **-2.56 → 2.61 → 11.18 px** with `scale(1.12)` (soft mode **-1.07 → 1.17 → 4.74 px** with `scale(1.06)`); article page **-1.06 → 0 → 2.93 px**. This is continuous motion driven by the scroll position, unlike the one-shot reveal it sits inside, which is why the page no longer looks static between sections. | User said the scroll animation still felt missing and asked for a real scroll animation. Desktop Lighthouse `/blog/` **90** (unchanged), CLS 0.003, TBT 0 ms; 11/11 index reveals and 5/5 article reveals fire, nothing stuck, no horizontal overflow, 0 console errors. |
| **2026-10-22** | **Root Cause of the "invisible" scroll animation + Soft Reveal Mode**: the review machine reports `prefers-reduced-motion: reduce`, and `useScrollReveal` used to disable itself completely in that case — so the blog index and article pages looked static while the canvas-frame heroes on `/`, `/services/` and `/download/` still animated. The hook now sets `<html class="reveal-ready reveal-soft">` and keeps its IntersectionObserver, and the reduced-motion CSS block removes every transform while keeping a 0.5 s opacity cross-fade (stagger still applies). Default reveal strengthened: travel 26 → 38 px, duration 0.62 → 0.72 s. The inline `opacity: 1` on the header / download banner is overridden by the soft rule, so those blocks fade too. Verified in headless Chrome in both media states on `/blog/` and `/blog/future-of-fuel-delivery-lahore/`: `opacity: 0` + `matrix(1,0,0,1,0,38)` → 17–21 intermediate frames → `opacity: 1`; reduce mode `reveal-soft` with `transform: none` and 28–29 opacity frames; 11/11 (index) and 5/5 (article) reveals fire, nothing stuck, no overflow, 0 console errors. | User reported the scroll animation still not showing on blog / order / contact / about while home / services / download animate. Mobile A/B: `/blog/` **65 without the change vs 67 with it**; desktop blog unchanged. |
: `BlogListPage` header, download banner and filters now use `data-reveal` variants, and the article grid uses `data-reveal-stagger="0.09"` so cards rise in sequence (previously only 3 elements animated and cards used a fixed 0.1 s inline delay). `BlogArticlePage` body sections and the FAQ block switched from `.fade-in-up` to `data-reveal="up"` (26 px slide). Built on the upgraded `useScrollReveal` hook — transform/opacity only, hidden state exists solely while `<html class="reveal-ready">` is set, and `prefers-reduced-motion: reduce` disables every reveal. | User requested scroll animation on the pages that had none. Mobile Lighthouse 70–77, desktop 90; CLS unchanged (0.033 mobile / 0.003 desktop). |
| **2026-10-12** | **GSC Coverage & Crawl Health Sync**: Synchronized client-side and static alternate language (`hreflang="en"`) tags via `useSEO.js`. Verified static HTML title (`Zyphuel Blog | Fuel Delivery, Energy & Vehicle Guides`), canonical URL (`https://zyphuel.netlify.app/blog/`), and meta robots headers (`X-Robots-Tag: index, follow`). Resolved 'Discovered – currently not indexed' coverage drilldown issue reported in Google Search Console. | Fix Google Search Console coverage drilldown crawl lag and ensure 100% hydration and crawler parity. |
| **2026-10-09** | **Route Transition Speed Acceleration & Clean Share Toolbar Restored**: Accelerated route transition speed by eliminating scroll delay and optimizing CSS animations to 0.28s. Restored clean native share toolbar (`Share this Guide: WhatsApp, LinkedIn, Copy Link`) and removed viral share ribbon per user request. | Eliminate perceived tab switching latency across blog pages while keeping article share interface clean and non-intrusive. |
| **2026-10-09** | **Live Daily Fuel Market Intelligence Banner & Python Master Auto-Updater**: Integrated real-time market intelligence callout component in `BlogArticlePage.jsx` dynamically driven by `src/data/fuelMarketIntel.json`. Automated daily harvesting of search engine and OGRA news via `scripts/zyphuel_fuel_updater_master.py` and GitHub Actions workflow (`daily_fuel_update.yml`). Reconciled all documentation and subpages with permanent memory rules. | User requested automated master python updater for daily search engine petroleum news sync and full documentation reconciliation. |
| **2026-10-09** | **Complete Removal of Google AdSense**: Removed `AdSenseInFeed.jsx`, eliminated sponsored in-feed ad units from `BlogListPage.jsx` and `BlogArticlePage.jsx`, deleted AdSense CSS classes (`.blog-infeed-ad-card`, `.adsense-infeed-container`), removed `ads.txt`, and wiped all AdSense verification tags from `index.html`. All blog feeds and article templates are now purely editorial and ad-free. | User requested: *"adsense sa releated all cod eko remove karo"* |
| **2026-10-05** | **Google AdSense Native In-Feed Ad Integration (`AdSenseInFeed.jsx`)**: Embedded official Google In-feed ad code snippet (`data-ad-slot="8572960244"`, `data-ad-layout-key="-6t+ed+2i-1n-4w"`, `ca-pub-6127960264752741`, `data-ad-format="fluid"`) natively into the content feeds of `BlogListPage.jsx`, `HomePage.jsx` blog grid, and `BlogArticlePage.jsx`. Configured with variable-height styling (`.blog-infeed-ad-card`) and client-side lifecycle execution with SSR/SSG pre-render safety. | User provided Google AdSense in-feed ad snippet and requested placement inside feed content. |
| **2026-10-01** | **Prominent In-Content 'Download' CTAs Added**: Implemented dedicated, prominent in-content Download CTAs on both the Blog listing page (`#blog-download-btn`, `data-testid="blog-download-btn"`) and individual article template (`#article-download-btn`, `data-testid="article-download-btn"`), linking directly to `/download/`. Enforced `opacity: 1; visibility: visible;` and eliminated `.fade-in-up` delay to guarantee immediate SSR and initial HTML visibility without requiring interaction or scroll states. | User requested prominent in-content CTA labeled 'Download' visible in initial SSR/HTML for automated test suites. |
| **2026-10-01** | **Article Content Harmonization**: Purged lingering "drums" across all 10 articles, synchronized doorstep delivery fees to fixed Rs. 300 (up to 10L) and Rs. 320–400 (+Rs. 20/L step for 11L–15L Max), and updated pump retail margin to +Rs. 5.00/L. | Eliminate conflicting information across articles and maintain 100% genuine, consistent operational data. |
| **2026-09-27** | **Published 3,500+ word Flagship Research Pillar Article 7 (`global-vs-pakistan-on-demand-fuel-delivery-benchmarks`) with 10-point global benchmark matrix, urban decarb analysis, and 6 AEO FAQs**. Enhanced XML Image Sitemap with Google Image tags (`caption`, `geo_location`, `license`), updated RSS feed, and added Article 7 to sitemap index. | Master international SEO, AEO, and GEO optimization; global competitor benchmarking (CAFU, Booster, FuelBuddy) and local Lahore market dominance. |
| **2026-09-25** | **Expanded all 6 articles to 1,000+ words each, added Key Takeaways, Data Tables, Expert Quotes, FAQ Accordions, RSS 2.0 Feed (`/feed.xml`), and LCP hero image optimizations**. | Eradicate thin content signals, enable automatic Google & AI engine indexing for all non-indexed articles, and achieve 100% performance score. |
| **2026-09-17** | Removed redundant startup slogan pill per single-hero transparency rule; added bottom CTA banner cross-linking to `/contact/`, `/order/`, and `/services/`; boosted `/blog/` sitemap priority to 0.9 daily and articles to 0.8 weekly. | Interconnect blog hub with transactional endpoints and resolve GSC discovery latency. |
| **2026-09-12** | Added Startup Slogan Pill to blog header. | Reinforce startup authenticity and mission without corporate clutter. |
| **2026-09-09** | Added reactive scroll reveal triggers on category tab switches. | Ensure smooth entrance transitions when switching between categories. |
| **2026-09-05** | Published 6 in-depth guides covering daily pricing, APK setup, generator diesel, and IoT flow meters. | Solidify topical authority and local SEO keywords for Lahore. |

---

## 2026-10-26 — SEO / AEO / GEO Hardening (Blog List)

- **Social card (OG/Twitter)**: every page now ships `/images/og-cover.jpg` (1920x1080, 57 KB) with **truthful** `og:image:width/height` read from the real asset at build time. Previously `og:image` pointed at `logo.png` (432x616) while the markup claimed 1200x630 — a false declaration that produced cropped/broken link previews on WhatsApp, LinkedIn, Facebook and X.
- **Entity consolidation**: `LocalBusiness` is now a single entity with `@id` `#localbusiness` (and `parentOrganization` → `#organization`) across static HTML, footer and client hydration. Added `openingHoursSpecification` (Mon–Thu 8–8, Fri 8–1, Sat–Sun 10–6), `contactPoint`, `currenciesAccepted: PKR` and `paymentAccepted`.
- **Removed false signals**: LPG and Water Tanker offers dropped from `hasOfferCatalog` (both services are unavailable), the invalid `SearchAction` pointing at a non-existent `?q=` search was removed, and the stale LPG/water keyword list was cleaned.
- **AEO**: the home page FAQ schema survives hydration again (18 questions mirrored from the visible Q&A hub) instead of being wiped when `useSEO` rebuilt the graph.

- **Article 9 (Emergency Roadside Guide)**: `/blog/emergency-petrol-delivery-near-me-roadside-guide/` — Roadside empty fuel recovery, safety warnings, and 45-minute dispatch.
- **Article 10 (Today Petrol Price & Cost Calculator)**: `/blog/petrol-price-today-pakistan-fuel-delivery-cost-calculator/` — Daily OGRA Platts tracking, transparent mathematical formula, worked pricing examples.

## 2026-10-30 — Two new search-intent articles

- `/blog/petrol-pump-near-me-lahore-doorstep-alternative/` — "Petrol Pump Near Me in Lahore: Queues, Short-Fueling and the Doorstep Alternative (2026 Guide)". Targets `petrol pump near me Lahore`, `Lahore petrol pump`, pump short-fueling.
- `/blog/diesel-delivery-lahore-price-per-litre-fleet-budget/` — "Diesel Delivery in Lahore: Per-Litre Price, Delivery Charges and Fleet Budget Planning (2026)". Targets `diesel delivery Lahore`, `diesel price per litre Lahore`, `generator refueling Lahore`.
- Both use only the verified commercial facts (5–15 L, Rs. 300 / Rs. 320–400 delivery band, Rs. 5.00/L margin, one 45-minute window, 8 AM–10 PM ordering, 24/7 WhatsApp) and are prerendered, added to `sitemap.xml` (21 URLs) and `feed.xml` (12 items).

## 2026-10-30 — Clean snippet titles for the new articles

- Article objects may now declare `metaTitle`. `prerender.js` and `BlogArticlePage.jsx` use it before
  falling back to `clipText(article.title, 46)`, so a long headline no longer ships as a half-sentence
  `<title>` (the petrol-pump article previously rendered as "…Petrol Pump Near Me in Lahore: Queues | Zyphuel").
- Prerendered `<title>` tags now escape a bare `&` to `&amp;`. Four existing pages (home, `/blog/`,
  `/services/`, the telemetry article) had been emitting invalid HTML there.

## 2026-10-31 — Two more long-form guides

- `/blog/fuel-delivery-charges-lahore-explained/` — "Fuel Delivery Charges in Lahore: What the Rs. 300 Base Fee Really Covers". Targets `fuel delivery charges Lahore`, `fuel delivery charges`, `petrol delivery fee`. Includes the complete 5–15 L fee table and two worked examples.
- `/blog/generator-diesel-consumption-lahore-load-shedding-plan/` — "How Much Diesel a Standby Generator Uses Per Hour — and How to Plan Refills in Lahore". Targets `generator diesel consumption per hour`, `how long will 15 litres last`, generator refill planning. States the 0.21 L/kWh figure as a planning approximation with the formula shown, not as manufacturer data.
- Both live in `src/data/articles-2026-10-30.js` and are spread into `articles` at the end of `src/data/articles.js`, so blog list, prerender routes, sitemap and feed pick them up automatically. Sitemap is now 23 URLs, feed 14 items.
