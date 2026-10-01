# Zyphuel Master Task & Engineering Execution Registry (`task.md`)

This document serves as the centralized master tracking ledger for all completed, active, and upcoming engineering tasks across the Zyphuel platform from project start to present.

---

## 1. Completed Tasks (Start to Now)

### 1.1 Architecture & Core Frontend Scaffolding
- [x] Scaffold React 18 + Vite 5 project with fast hot module replacement (HMR).
- [x] Configure pure CSS `:root` design tokens in `src/index.css` for consistent typography, borders, and shadows.
- [x] Create responsive global shell components: `Navbar.jsx`, `Footer.jsx`, `ThemeToggle.jsx`, and `Breadcrumbs.jsx`.
- [x] Setup React Router DOM v6 with route definitions for all primary pages.
- [x] Integrate global notification toast bus (`ToastContext.jsx`).

### 1.2 Fuel Price Engine & Dynamic Rates
- [x] Centralize commodity pricing in `src/data/fuelPrices.js`.
- [x] Build `FuelPriceContext.jsx` to dynamically manage live scraped rates and fallback pricing.
- [x] Implement standard **+Rs. 2.50 / Litre** Retail Petrol Pump Tariff Markup over OGRA ex-depot base rates for Petrol, Diesel, and High-Octane.
- [x] Clean up customer UI by removing internal formula labels (`Pump Rate (+Rs. 2.50)`).

### 1.3 Order Checkout Flow & UX Refinement
- [x] Build 5-step intuitive checkout stepper in `OrderPage.jsx`.
- [x] Enforce hard doorstep fuel limits: **5 Litres minimum** up to **15 Litres maximum** per order (sub-5L clamped to 5L, >15L clamped to 15L).
- [x] Add 5-card Refueling Target selector (`Car/SUV`, `Motorbike`, `Generator`, `Machinery`, `Storage Drum`).
- [x] Remove optional vehicle registration plate field (`LEA-2024`) for frictionless mobile ordering.
- [x] Standardize delivery charges to flat **Rs. 280.00** across all doorstep fuel orders.
- [x] Standardize delivery SLA label to **"Delivered: Within 45 Mins"**.
- [x] Modernize Payment Options card with Cash on Delivery (COD for 5L–10L) and instant on-spot Online Payments (JazzCash, Easypaisa, NayaPay, Raast / Bank).
- [x] Implement anti-spam duplicate order cooldown guard (15-minute confirmation modal).

### 1.4 Invoicing & Verification Architecture
- [x] Engineer pure vector client-side PDF generation using `jspdf` (`src/utils/generateInvoicePdf.js`).
- [x] Build Government & OGRA licensed corporate tax invoice letterhead (License `OGRA/DL-7492/LHE`, NTN `9482710-3`, SECP `0248195`).
- [x] Implement Dual Verification System:
  - Instant 2D Camera QR Code (ISO/IEC 18004) linking to live URL verification `/order/?verify=${orderId}`.
  - Industrial pure black Code 128 Auto barcode for handheld laser scanners.
- [x] Implement 2-step order completion flow: immediate invoice PDF download followed by 3-second animated auto-redirect to WhatsApp dispatch (`+92 3230-112464`).

### 1.5 Performance, SEO & Static Site Generation (SSG)
- [x] Build custom Puppeteer/SSR pre-renderer (`prerender.js`) for all 17 public routes.
- [x] Generate dynamic XML sitemap (`public/sitemap.xml`) with Google Image tags (`fuel.png`).
- [x] Configure search engine crawler policies in `public/robots.txt`.
- [x] Create AI-friendly knowledge files (`public/llms.txt` and `public/llms-full.txt`).
- [x] Integrate IndexNow protocol (`scripts/indexnow.js`) for automated URL submission to search engines.
- [x] Optimize home page hero scroll video container for full-bleed responsive playback without pixel tearing.

### 1.6 Mobile App & Educational Content
- [x] Release Android APK `v2.6.4.0.0.16` (`31.6 MB`) compiled for Android 7.0+.
- [x] Author 6 in-depth educational blog articles covering daily fuel pricing, generator refueling, short-fueling prevention, and mobile energy logistics.
- [x] Synchronize all blog articles and data files with COD (5L–10L) and instant Online Payments payment methods.

### 1.7 SEO, AEO & GEO Expansion, Search Engine Indexing Fix & 100% Speed
- [x] Expand all 6 blog articles in `src/data/articles.js` into 1,000+ word technical pillar guides with Key Takeaways, comparative data tables, expert quotes, and 5 structured FAQs per article.
- [x] Build structured rendering in `src/pages/BlogArticlePage.jsx` (Key Takeaways box, table of contents anchor jump links, comparison tables, FAQ accordions, social sharing, author bio, related guides grid, and Schema.org `Article`, `FAQPage`, and `SpeakableSpecification`).
- [x] Enrich `AboutPage.jsx` with Technical Fleet & Metering Specifications, Regulatory Compliance Ledger, 5-question FAQ accordion, and remove duplicate startup slogan pill per permanent memory rule.
- [x] Enrich `DownloadPage.jsx` with Android OS Compatibility Matrix, Cryptographic SHA-256 Checksum Panel, and Feature Comparison Table (APK vs Web).
- [x] Enrich `ContactPage.jsx` with Lahore Sector Dispatch Hubs & SLA Matrix and Commercial Escalation Desk.
- [x] Launch RSS 2.0 Editorial Feed (`/feed.xml`) and index in `index.html`, `robots.txt`, and `/sitemap/`.
- [x] Create Netlify `_headers` file with 1-year immutable caching for static assets, 30-day image caching, HTML revalidation, and modern security headers.
- [x] Eliminate all image-induced Cumulative Layout Shift (CLS = 0) with explicit `width`, `height`, `loading`, `decoding`, and `fetchpriority` attributes across all components.
- [x] Verify full production build and 17-route Static Site Generation (`npm run build`) with exit code 0.

### 1.8 International SEO, AEO & GEO Optimization, Competitor Benchmarking & Image Sitemap Overhaul
- [x] Research global mobile fueling giants (CAFU, Booster Fuels, FuelBuddy, Repos Energy) and domestic Pakistani suppliers (Apex Energy, FuelWala, EzFuels).
- [x] Author flagship 3,500+ word comparative research pillar guide in `src/data/articles.js` (Article 7: `global-vs-pakistan-on-demand-fuel-delivery-benchmarks`).
- [x] Register Article 7 route in `prerender.js` and generate SSG static page `dist/blog/global-vs-pakistan-on-demand-fuel-delivery-benchmarks/index.html` (72.5 KB).
- [x] Overhaul XML Image Sitemap generator in `prerender.js` to output full Google Image extension metadata (`<image:loc>`, `<image:title>`, `<image:caption>`, `<image:geo_location>`, `<image:license>`).
- [x] Implement Schema.org `HowTo` structured data for fuel delivery ordering on `/order/` and `index.html`.
- [x] Implement `SpeakableSpecification` markup for voice assistant querying (Google Assistant, Siri).
- [x] Expand `public/robots.txt` with explicit crawl rules for 25+ global search engines, social media preview bots, and AI/LLM crawlers.
- [x] Update `public/llms.txt` and `public/llms-full.txt` with global benchmark matrices, founder quotes, and Article 7 index.
- [x] Update `HtmlSitemapPage.jsx` with Article 7.
- [x] Create subpage documentation `docs/pages/subpages/global-vs-pakistan-on-demand-fuel-delivery-benchmarks.md` and synchronize master docs.
- [x] Run full production SSG compilation with `npm.cmd run build` — 18 routes cleanly generated with 0 errors.

### 1.9 Operational Hours Realignment, 24/7 Claim Reconciliation & Dynamic Pricing Clarification
- [x] Reconcile and purge inaccurate '24/7 delivery' marketing claims across 13 core application components and metadata files (`index.html`, `prerender.js`, `SeoHead.jsx`, `ServiceCard.jsx`, `companyInfo.js`, `servicesData.js`, `useSEO.js`, `HomePage.jsx`, `AboutPage.jsx`, `ServicesPage.jsx`, `DownloadPage.jsx`, and `OrderPage.jsx`).
- [x] Standardize documented operational working hours across all public pages: Mon–Thu 8:00 AM – 8:00 PM, Fri 8:00 AM – 1:00 PM, Sat–Sun 10:00 AM – 6:00 PM, with dedicated 24/7 WhatsApp emergency support (`+92 3230-112464`).
### 1.10 Fuel Margin Calibration (+Rs. 5.00/L) & Dynamic Surge Delivery Pricing (Rs. 300 / Dynamic 11L–15L)
- [x] Update retail pump rate margin (`PUMP_RATE_MARKUP`) from **Rs. 2.50 to Rs. 5.00** across Petrol, Diesel, and High-Octane in `src/data/fuelPrices.js` and `src/context/FuelPriceContext.jsx`.
- [x] Update doorstep fuel delivery fee to **Rs. 300.00** flat nominal fee for orders under 10L (5L–10L).
- [x] Implement stepped dynamic demand surge pricing for high-capacity orders (11L–15L: 11L = Rs. 325, 12L = Rs. 355, 13L = Rs. 385, 14L = Rs. 420, 15L = Rs. 460) in `src/pages/OrderPage.jsx`.
- [x] Synchronize Order Page schedule card, summary computations, live invoice modal, print preview HTML, PDF generator, and WhatsApp dispatch message.
- [x] Update delivery fee and pricing references across all public pages (`HomePage.jsx`, `AboutPage.jsx`, `ContactPage.jsx`, `DownloadPage.jsx`, `TermsOfUsePage.jsx`, `appVersion.js`, and all 7 articles in `articles.js`).
### 1.11 Delivery Pricing Cap (Strictly Rs. 300 – Rs. 400), Jerrycan Removal, Legacy Label Purge & 24/7 Dispatch Acceptance
- [x] Bound 11L–15L delivery pricing strictly between **Rs. 300.00 and Rs. 400.00** with linear +Rs. 20/L step (11L = Rs. 320, 12L = Rs. 340, 13L = Rs. 360, 14L = Rs. 380, 15L = Rs. 400) in `src/pages/OrderPage.jsx`.
- [x] Completely remove `Jerrycan / Safe Storage Drum` from Refueling Target selector (retaining 4 targets: Car, Bike, Generator, Machinery).
- [x] Purge legacy `(Orders ≤ 10L)`, `(Order <10)`, and `Fixed Rate (≤10L)` tags across schedule card, sidebar summary, and WhatsApp message.
- [x] Eliminate working hours checkout blocking error dialogs and red closed banners; online doorstep dispatch is active 24/7 on-demand across Lahore with physical office hours designated for desk support and verification.
- [x] Synchronize `HomePage.jsx`, `AboutPage.jsx`, `DownloadPage.jsx`, `TermsOfUsePage.jsx`, `officeHours.js`, `AGENTS.md`, `GEMINI.md`, `docs/memory.md`, `docs/changes.md`, `docs/informtion.md`, and `docs/pages/order.md`.
- [x] Verify production static site generation (SSG) pre-rendering via `npm.cmd run build` across all 17 routes with exit code 0.

### 1.12 Operating Hours Site-Wide Harmonization & SVG File Purge
- [x] Align OrderPage Operating Hours modal and live badge to match exact site-wide schedule and wording from `HomePage.jsx` and `ContactPage.jsx` (`Mon–Thu 8am–8pm, Fri 8am–1pm, Sat–Sun 10am–6pm, 24/7 Helpline`).
- [x] Permanently delete all graph, chart, commit, and change `.svg` files (`github-changes-graph.svg`, `repo-activity-chart.svg`) across all directories.
- [x] Remove `scripts/generate_github_graph.js`, `update-graph.yml` workflow, and `prebuild` hook from `package.json`.
- [x] Remove unused `src/data/gitTelemetry.json`.
- [x] Verify production build (`npm.cmd run build`) pre-renders all 17 SSG routes with zero errors and zero SVG generation.

---

## 2. Active Engineering Tasks

- [x] **Task 2.1**: Consolidate and finalize master documentation suite in `docs/`.
- [x] **Task 2.2**: Run full production build verification (`npm run build`) to ensure all 17 SSG routes prerender with exit code 0.
- [x] **Task 2.3**: Update repository contribution graph and commit ledger.

---

## 3. Backlog & Future Product Roadmap

### 3.1 Real-Time Telemetry & Driver Live-Tracking
- [ ] Replace simulated countdown with live WebSocket driver GPS telemetry stream.
- [ ] Integrate interactive Mapbox / Leaflet live bowser movement map on the customer tracking view.

### 3.2 Enterprise Fleet Portal
- [ ] Multi-vehicle corporate fleet management dashboard with role-based access control (Fleet Manager vs Driver).
- [ ] Automated 15-day and 30-day corporate consolidated billing statements with downloadable CSV/PDF ledgers.

### 3.3 Internationalization & Localization
- [ ] Implement dual-language switcher (English / Urdu) across all public pages and notifications.
- [ ] Add Urdu audio voice prompts for rider arrival and delivery safety verification.
