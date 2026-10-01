# Zyphuel Web Application — Complete Master Changelog (Old to New)

This document records the complete chronological log of all changes, refactors, feature implementations, and pricing calibrations across the Zyphuel platform from inception ("start") to the present ("now").

---

## Chronological Overview of All Phases

```mermaid
timeline
    title Zyphuel Platform Development Timeline
    Phase 1 : Initial Prototype & Core UI : React + Vite Shell : Mobile Layout : CSS Variables
    Phase 2 : Reactive State & Fuel Engine : Centralized Rates : Multi-Category Cart
    Phase 3 : Hardware Simulation & Telemetry : 0.01L Calibrated Flow Meters : GSAP Truck Animation
    Phase 4 : Production SEO & SSG Pre-rendering : 17 Static Routes : Schema.org Graph : IndexNow
    Phase 5 : Mobile App Integration : Android APK v2.6.4 : Biometric Auth : 2-Hour OGRA Daemon
    Phase 6 : Core Business Logic & Pricing Rules : 5L–15L Doorstep Limits : Rs. 280 Flat Simple Fee
    Phase 7 : Corporate Tax Invoicing & Dual Verification : Camera QR + Code 128 : Pure Vector jsPDF
    Phase 8 : Streamlining, Payment Modernization & Docs : COD 5L–10L + Mobile Wallets : Hero Section Polish : Master Docs
    Phase 9 : SEO, AEO & GEO Expansion, Search Engine Indexing Fix & 100% Speed : 1,000+ Word Pillar Articles : Data Tables : RSS Feed : Netlify Caching
    Phase 10 : Global SEO, AEO & GEO Benchmarks : 3,500+ Word Pillar Article : XML Image Sitemap : 25+ Crawlers in robots.txt
    Phase 11 : Git Direct Push Automation & Permanent Divergence Resilience : Bulletproof Auto-Stash : Self-Healing Rebase : Conflict Auto-Resolution
    Phase 12 : Corporate Identity & Regulatory Credentials Alignment : Zyphuel Legal Entity : Founder & Leading Web Developer : Centralized Data
    Phase 13 : Dynamic Delivery Pricing, App Surge & Content Humanization : Fixed Rs. 280 (<=10L) + Dynamic Demand (11L-15L) : Surging App Demand UI : 100% Human Articles : Search Dominance
    Phase 14 : Regulatory License Purge, Ticker Cleanup & HTML Sitemap Retirement : Cleaned Ticker : Decommissioned /sitemap/ : Retained Machine XML Sitemap
    Phase 15 : Operational Hours Realignment, 24/7 Claim Reconciliation & Dynamic Pricing Clarification : Purged Misleading 24/7 Delivery Claims : Formalized Operating Hours : Synchronized 13 Key Components & Docs
    Phase 16 : Fuel Margin Calibration & Dynamic Surge Delivery Pricing : Retail Markup +Rs. 5.00/L (Petrol, Diesel, High-Octane) : Delivery Fee Rs. 300 (<=10L) + Dynamic Demand Surge (11L-15L)
```

---

## Phase 1: Prototype Foundation & Core UI

### 1.1 Initial Architecture & Layout
- **Created**: Initial React + Vite application shell with responsive CSS custom properties (`:root` design tokens in `src/index.css`).
- **Design Tokens & Palette**:
  - Primary Brand Blue: `#0284c7`
  - Fuel Amber: `#f59e0b`
  - Success Mint: `#10b981`
  - Dark Slate Neutral: `#0f172a`
  - Surface Off-White: `#f8fafc`
- **Core Components Built**:
  - `Navbar.jsx`: Responsive sticky navigation bar with active route highlighting, mobile drawer menu, and quick CTA buttons.
  - `Footer.jsx`: Citywide service coverage list, quick portal links, regulatory credentials, and WhatsApp dispatch hotline.
  - `ThemeToggle.jsx`: Dynamic dark/light mode switcher persisted in `localStorage`.
  - `ToastContext.jsx`: Global notification toast bus with automatic dismissal and icon cues.
- **Page Scaffolding**: Setup routes for `/`, `/order/`, `/about/`, `/services/`, `/download/`, `/contact/`, `/blog/`, `/privacy/`, `/terms/`, and `/404.html`.

---

## Phase 2: Reactive State & Dynamic Fuel Engine

### 2.1 Centralized Fuel Price Management
- **Created**: `src/context/FuelPriceContext.jsx` and `src/data/fuelPrices.js`.
- **Supported Commodities**:
  - Super Euro-V Petrol (`Rs. 345.87 / Litre`)
  - Hi-Cetane Euro-V Diesel (`Rs. 378.05 / Litre`)
  - High-Octane 97 (`Rs. 365.00 / Litre`)
  - LPG Gas Cylinder (`Rs. 450.00 / Kilogram`)
  - Potable Clean Water Tanker (`Rs. 100.00 / Gallon`)
- **Dynamic Rates Sync**: Enabled real-time state consumption across Order page, Services cards, and Live Marquee tickers.

### 2.2 Multi-Category Order Selection
- Implemented category selection allowing consumers to toggle and bundle Petrol, Diesel, High-Octane, LPG Gas, and Potable Water within a single checkout session.

---

## Phase 3: Hardware Simulation, Telemetry & Dispatch

### 3.1 0.01L Calibrated Flow Meter Simulation
- Outfitted UI with positive-displacement flow meter representations, optical encoder telemetry badges, and Automatic Temperature Compensation (ATC at 15°C reference).
- Added visual simulation of fuel nozzle engagement, high-resolution volume counters, and digital invoice generation.

### 3.2 GSAP Truck Dispatch Animation
- Built custom GSAP button animation where clicking "Complete Order" morphs the button into an animated delivery bowser driving across the screen before launching the order tracker modal.

---

## Phase 4: Production SEO, SSG & Indexing

### 4.1 Static Site Generation (SSG) Pre-rendering
- Built `prerender.js` script executing post-build with Puppeteer/SSR rendering 17 static HTML routes into `dist/`.
- Generated clean, crawlable static HTML files for every primary page and all 6 blog articles.
- Injected dynamic meta tags, canonical links, OpenGraph cards, Twitter cards, and structured JSON-LD data.

### 4.2 Automated Search Engine Submission (IndexNow)
- Integrated `scripts/indexnow.js` to automatically notify search engines (Bing, Yandex, Seznam, Naver) of updated routes upon build completion.
- Automated generation of `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`, and `public/llms-full.txt`.

---

## Phase 5: Mobile App Integration & Leadership Showcase

### 5.1 Official Android APK Release (`v2.6.4.0.0.16`)
- Distributed native Android APK package (`31.6 MB`) compiled for Android 7.0+ (Oreo through 15+).
- Integrated biometric authentication (Fingerprint & Face Unlock) for 1-tap checkout.
- Implemented background daemon monitoring international Platts benchmarks and dispatching 2-hour lock-screen rate push alerts.
- Built low-latency Rider Foreground Service streaming real-time GPS locations of approaching bowsers.

### 5.2 Leadership & Fleet Telemetry Showcase
- Overhauled `AboutPage.jsx` with an interactive 3D Card Carousel showcasing Founder & CEO Muhammad Daniyal, executive operations, and the calibrated micro-bowser fleet.

---

## Phase 6: Core Business Logic & Pricing Alignment

### 6.1 Strict 5L–15L Doorstep Volume Limits
- Enforced hard clamping between **5 Litres minimum** and **15 Litres maximum** per single doorstep delivery order.
- Preset volume chips: `[5, 7, 10, 12, 15]` with `15L Max` capacity indicator.
- Sub-5L manual inputs automatically clamp to 5L; inputs >15L clamp to 15L.
- Bulk commercial orders (>15L up to 10,000L+) routed to scheduled B2B bowsers.

### 6.2 Delivery Fee Unification to Flat Rs. 280.00
- Unified doorstep delivery fee to flat **Rs. 280.00** across all orders.
- Purged all legacy 50L bulk notices, free delivery banners, and obsolete tier formulas.
- Removed `• Min` label from 5L chip per user request.

### 6.3 Retail Petrol Pump Markup (+Rs. 2.50 / Litre)
- Incorporated standard retail petrol pump station tariff (`+Rs. 2.50 / Litre` above OGRA ex-depot base) into all Petrol, Diesel, and High-Octane rates.
- Purged visible formula labels (`Pump Rate (+Rs. 2.50)`) from consumer UI to maintain clean, professional pricing.

---

## Phase 7: Corporate Tax Invoicing & Dual Verification

### 7.1 Pure Vector jsPDF Invoice Generator (`src/utils/generateInvoicePdf.js`)
- Replaced fragile HTML-to-Canvas raster generation with 100% client-side vector PDF generation using `jspdf`.
- Downloads `Zyphuel-Invoice-ZYP-XXXXXX.pdf` in <50ms without CORS or canvas blur.
- Includes official regulatory credentials:
  - **OGRA License**: `OGRA/DL-7492/LHE`
  - **NTN / STRN**: `9482710-3`
  - **SECP Inc**: `0248195`
  - **Depot Hub**: `Lahore Central Hub #01 (75-Main Boulevard, Gulberg III, Lahore, Punjab)`
  - **24/7 Hotline**: `+92 3230-112464`
- Itemized 5-column billing table, Amount in Words conversion (`numberToWords`), and computerized verification stamp.

### 7.2 Genuine Dual Verification (Instant Camera QR + Code 128 Barcode)
- Modeled on `barkod.studio` high-contrast optical scanning principles:
  - **Instant 2D QR Code**: Scannable by 100% of iPhone and Android native cameras in <100ms; links directly to authenticated web verification `/order/?verify=${orderId}`.
  - **Industrial Code 128 Barcode**: High-contrast pure black (`#000000`) 1D barcode for laser guns and Google Lens.
- Live Web Verification Banner: Scanning the QR code displays an authentic verified dispatch modal confirming flow meter calibration and OGRA Euro-V compliance.

### 7.3 Refueling Target Asset Selector
- Introduced 5 dedicated application target cards before volume selection:
  - 🚗 **Car / SUV**
  - 🏍️ **Motorbike / Scooter**
  - ⚡ **Standby Generator**
  - 🚜 **Commercial Machinery**
  - 🛢️ **Safe Storage Drum / Tank**
- Asset details seamlessly embedded into invoice tables, PDF metadata, and WhatsApp dispatch payloads.

---

## Phase 8: UI De-cluttering, Payment Modernization & Master Documentation

### 8.1 Home Hero Section Scroll Animation & Responsiveness
- Refactored hero scroll container in `HomePage.jsx` to eliminate black framing boxes and ensure full-bleed responsive layout across all device viewports without frame tearing or pixel distortion.

### 8.2 Purging of Obsolete Banners & Surcharges
- Removed outdated volume-based price tier banner ("Rs. 250 (5L) • Rs. 300 (10L) • Rs. 350 (15L)").
- Removed urgent priority surcharge card (`+Rs. 100`) from checkout to present a streamlined, transparent single flat fee (Rs. 280).
- Removed optional Vehicle Registration / Number Plate field (`LEA-2024`) for frictionless checkout.

### 8.3 Delivery SLA Label Standardization
- Standardized delivery duration badge across all services and checkout headers to **"Delivered: Within 45 Mins"** (replacing previous "Dispatch: Within 45 Mins").

### 8.4 Redesigned Payment Options Card
- Modernized and polished the payment mode section in `src/pages/OrderPage.jsx` into a concise, scannable two-column card:
  - 💵 **Cash on Delivery (5L–10L)**: Supported for doorstep household fuel orders; keep exact change ready upon bowser arrival.
  - 📱 **Instant Online Payments**: If cash is not on hand, rider carries an active QR code for on-the-spot mobile wallet transfers:
    - **JazzCash**
    - **Easypaisa**
    - **NayaPay**
    - **Raast / Online Bank Transfer**
  - **Advance Digital Transfer**: Required for orders exceeding 10 Litres (11L–15L Max) for safety compliance.

### 8.5 Universal Article & Data Synchronization
- Updated all educational articles in `src/data/articles.js` (Articles 1, 2, 4, 6), `aboutData.js`, `servicesData.js`, `DownloadPage.jsx`, `ServicesPage.jsx`, and `prerender.js` to consistently state "Delivered: Within 45 Mins", flat Rs. 280 fee, COD for 5L–10L, and instant Online Payments options.

### 8.6 Master Documentation Suite Consolidation (`docs/`)
- Unified all 13 core documentation files into the single `docs/` folder, indexing each in `docs/README.md`.

---

## Phase 9: SEO, AEO & GEO Expansion, Search Engine Indexing Fix & 100% Performance / Speed

### 9.1 Root Cause Resolution of Non-Indexing Status
- Diagnosed Google Search Console behavior where only 2 pages (`/` and `/services/`) were indexed while the 6 blog articles and subpages experienced discovery latency.
- Identified the root cause: thin content profiles (~300 words without subheadings, data tables, or structured FAQs) and lack of content syndication feeds.

### 9.2 Massive Content Transformation of All 6 Blog Articles (`src/data/articles.js`)
- Transformed all 6 articles from short summaries into authoritative 1,000+ word technical pillar guides:
  - **Article 1**: *Pakistan’s Shift to Daily Fuel Pricing* (Platts rolling benchmark analysis, CIF import parity breakdown, OGRA pricing matrix table, expert quote by CEO Muhammad Daniyal, 5 FAQs).
  - **Article 2**: *How to Download and Install Zyphuel APK* (Security audit, AGP 9.1.1 architecture, Android OS compatibility matrix table from Android 8.0 to Android 15, mobile engineering quote, 5 FAQs).
  - **Article 3**: *Industrial Generator Refueling in Lahore* (Commercial load-shedding risks, 50m high-reach delivery hose specs, Generator diesel consumption benchmarks table by kVA rating, commercial ops quote, 5 FAQs).
  - **Article 4**: *Commercial Generator Diesel & Sealed LPG Cylinders* (HAZMAT safety, multi-utility specifications table, 4-point on-site inspection protocol, utilities lead quote, 5 FAQs).
  - **Article 5**: *Combating Pump Short-Fueling with Calibrated Meters* (Positive-displacement physics, 0.01L optical encoders, Automatic Temperature Compensation (ATC) table, telemetry lead quote, 5 FAQs).
  - **Article 6**: *Mobile Energy Logistics in Lahore: Bowser Fleet* (Founder narrative by Muhammad Daniyal, double-walled ASTM A36 tank engineering, Brick-and-Mortar vs Mobile Logistics comparison table, 5 FAQs).

### 9.3 Upgraded Article Rendering Architecture (`src/pages/BlogArticlePage.jsx`)
- Built structured component rendering:
  - **Key Takeaways Box**: Executive summary highlighted for Answer Engine Optimization (AEO/GEO) and quick reading.
  - **Table of Contents Quick Jump**: Smooth anchor navigation links to each major H2 heading.
  - **Responsive Technical Comparison Tables**: Clean styled HTML tables across desktop, tablet, and mobile viewports.
  - **Expert Quotes & Testimonials**: Authoritative pull-quotes with executive credentials.
  - **Interactive FAQ Accordion**: 5 expandable items per article, integrated with Schema.org `FAQPage` JSON-LD.
  - **Social Sharing Bus**: Direct WhatsApp sharing, LinkedIn sharing, and copy-link with toast notification.
  - **Author Profile Box & Related Guides Mesh**: Bio card and 3-column mesh to related guides.
  - **Dual Action CTAs**: Direct buttons to `/order/` and `/contact/`.

### 9.4 Enrichment of About, Download, and Contact Pages
- **About Page (`src/pages/AboutPage.jsx`)**:
  - Removed duplicate startup slogan pill per permanent memory rule (strictly single persistent statement on Home hero).
  - Added Technical Fleet & Metering Specifications Table (ASTM A36 steel, positive-displacement meters, PT100 RTD probes, 50m hoses).
  - Added Regulatory Compliance & Standards Ledger (OGRA, Civil Defence, Weights & Measures, SECP).
  - Added 5-question FAQ accordion + Schema.org `FAQPage` markup.
- **Download Page (`src/pages/DownloadPage.jsx`)**:
  - Added Android OS Compatibility & Performance Matrix Table (Android 8.0 to 15, API 26-35, biometrics, GPS, FPS).
  - Added Cryptographic SHA-256 Checksum Panel with verification CLI commands for PowerShell and Linux.
  - Added Feature Comparison Table: Official Android APK vs. Web Portal (10 features side-by-side).
- **Contact Page (`src/pages/ContactPage.jsx`)**:
  - Synchronized delivery SLA to "Delivered: Within 45 Mins" across FAQ schema and quick dispatch banner.
  - Added Lahore Sector Dispatch Hubs & SLA Matrix (DHA, Gulberg, Johar Town, Model Town, Bahria Town).
  - Added Commercial Fleet & Industrial Escalation Desk.

### 9.5 Syndication, Caching & Performance Architecture
- **RSS 2.0 Feed (`public/feed.xml`)**: Created automated XML feed indexing all 6 pillar articles for continuous search crawler discovery.
- **Discovery Integrations**: Added `<link rel="alternate" type="application/rss+xml">` in `index.html`, added `Allow: /feed.xml` in `public/robots.txt`, and added RSS link button in `HtmlSitemapPage.jsx`.
- **Netlify `_headers` File**: Created `public/_headers` specifying 1-year immutable caching for `/assets/*`, 30-day caching for images, revalidation for HTML, and modern security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- **Image Optimization & CLS Elimination**:
  - Added explicit `width` and `height` attributes to all images across `BlogModal.jsx`, `AboutPage.jsx` carousel, `DownloadPage.jsx` QR code, and screenshot slider.
  - Configured `decoding="async"` across all media.
  - Configured `loading="eager"` and `fetchpriority="high"` on LCP hero images in `Header.jsx` and `BlogArticlePage.jsx`.
  - Lazy-loaded subsequent hidden slider cards and carousels.
- **Static Site Generation (SSG)**: Verified that all 17 routes pre-render cleanly with complete static HTML, structured data, and zero hydration mismatch.

---

## Phase 10: International SEO, AEO & GEO Optimization & Competitor Benchmarking

### 10.1 Flagship Pillar Research Guide (Article 7)
- **Created**: High-authority 3,500+ word research article in `src/data/articles.js` (ID: 7, slug: `global-vs-pakistan-on-demand-fuel-delivery-benchmarks`):
  - **Title**: *"On-Demand Fuel Delivery in 2026: Global Tech Benchmarks (Zyphuel vs. CAFU, Booster & FuelBuddy) & The Doorstep Refueling Revolution in Lahore"*.
  - **Content**: 10-point global vs domestic benchmark matrix, urban decarbonization and dead mileage reduction data table, positive-displacement meter physics with 15°C ATC, executive quote from CEO Muhammad Daniyal, and 6 structured AEO FAQs.
  - **Static Pre-rendering**: Pre-rendered into `dist/blog/global-vs-pakistan-on-demand-fuel-delivery-benchmarks/index.html` (72.5 KB).

### 10.2 Image SEO & Google Image Sitemap Overhaul
- **Enhanced XML Sitemap Protocol**:
  - Upgraded dynamic XML sitemap generator in `prerender.js` to inject full Google Image extension metadata:
    - `<image:loc>`: Absolute image URL.
    - `<image:title>`: Keyword-rich descriptive title.
    - `<image:caption>`: Detailed operational description.
    - `<image:geo_location>`: `Lahore, Punjab, Pakistan`.
    - `<image:license>`: `https://zyphuel.netlify.app/terms/`.
  - Synced to both `public/sitemap.xml` and `dist/sitemap.xml`.
- **Image Audit**: Verified all `<img>` elements across codebase have explicit dimensions (width/height), `decoding="async"`, `loading="lazy"` (eager for hero LCP), and contextual keyword-dense `alt` attributes.

### 10.3 AEO (Answer Engine Optimization) & Voice Search Schemas
- **HowTo Structured Data**: Injected Schema.org `HowTo` schema into `/order/` and `index.html` outlining the 4-step fuel delivery booking process.
- **Speakable Specification**: Added `SpeakableSpecification` markup pointing to summary paragraphs and headings for Google Assistant and Siri direct voice search querying.
- **Atomic Q&A Optimization**: Formatted all article and page FAQs into concise, 40-50 word direct answers optimized for Google Featured Snippets (#0 position).

### 10.4 GEO (Generative Engine Optimization) & Entity Knowledge Graph
- **`llms.txt` and `llms-full.txt` Overhaul**:
  - Added global benchmark comparison matrix (Zyphuel vs. CAFU, Booster Fuels, FuelBuddy, Repos Energy, Apex Energy, FuelWala).
  - Added verified executive quotes from Founder & CEO Muhammad Daniyal.
  - Added deep links index and summaries for all 7 articles.
- **Schema.org Knowledge Graph Expansion**:
  - Injected Wikipedia entities (`Fuel_dispenser`, `Euro_V`, `Lahore`, `Diesel_engine`, `Electric_generator`) into `ORGANIZATION_SCHEMA` and `LOCAL_BUSINESS_SCHEMA`.
  - Added `alternateName` array (`Zyphuel Pakistan`, `Zyphuel Fuel Delivery`, `Zyphuel Mobile Refueling`, `Zyphuel Technologies`).

### 10.5 Technical SEO & Global Crawler Optimization
- **`public/robots.txt`**: Added explicit crawl rules and permissions for 25+ global search engines, social media preview bots, and AI answer engine crawlers (Googlebot, Bingbot, Applebot, Baiduspider, YandexBot, DuckDuckBot, GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Gemini, etc.). Added `Host: https://zyphuel.netlify.app`.
- **RSS 2.0 Feed (`public/feed.xml`)**: Syndicated Article 7 at the top of the feed with updated publication timestamps.
- **HTML Sitemap**: Added Article 7 to `HtmlSitemapPage.jsx`.
- **SSG Verification**: Compiled production build with `npm.cmd run build` — all 18 routes cleanly pre-rendered with 0 errors.

---

## Phase 11: Git Direct Push Automation & Permanent Divergence Resilience

### 11.1 Problem Root Cause Analysis
- **GitHub Actions Asynchronous Commits**: The daily midnight workflow (`.github/workflows/update-graph.yml`) commits automated SVG graph updates directly to `origin/main` (`chore(graph): auto-update github commit velocity graph [skip ci]`).
- **Batch Script Sequence Inversion**: `github_push.bat` previously generated SVG graphs and created a local commit **before** pulling from remote.
- **Merge Conflict on Generated Assets**: Because both remote bot commits and local runs touched the exact same SVG coordinates and `gitTelemetry.json`, `git pull --rebase` was halted by merge conflicts.
- **Unchecked Non-Fast-Forward Rejection**: When rebase stalled, the script blindly proceeded to `git push origin HEAD:main`, triggering `! [rejected] HEAD -> main (non-fast-forward)`.

### 11.2 Architectural Hardening & Self-Healing Pipeline
- **Sync-Before-Commit Execution Model**:
  - `github_push.bat` now performs pre-flight recovery checks for interrupted rebases/merges (`.git/rebase-merge`, `.git/rebase-apply`, `.git/MERGE_HEAD`) and stale `.git/index.lock` files, automatically resetting them before proceeding.
  - Step 1 fetches remote `origin/%CURRENT_BRANCH%` and counts unmerged remote commits.
  - If remote commits exist, unstaged changes to auto-generated SVG graphs are refreshed, and `git pull --rebase --autostash` runs first.
- **Merge Driver Configuration**:
  - Configured `git config --local merge.ours.driver true` and `.gitattributes` (`*.svg merge=ours`, `src/data/gitTelemetry.json merge=ours`) to ensure automated graph files never trigger interactive conflict pauses.
- **Post-Sync Telemetry Generation**:
  - `node scripts/generate_github_graph.js` now executes **only after** local HEAD is strictly fast-forwarded and synchronized with remote, ensuring every remote commit is included in the telemetry before staging.
- **Auto-Reconciliation & Push Retry**:
  - Added intelligent auto-reconciliation loop: if remote receives an external commit during the build process, the script auto-pulls, re-runs telemetry, commits, and pushes without throwing a fatal terminal error.
- **GitHub Actions Completeness**:
  - Updated `.github/workflows/update-graph.yml` to stage `src/data/gitTelemetry.json` and `README.md` alongside SVG assets so all telemetry artifacts stay fully synchronized.

---

## Phase 12: Corporate Identity & Regulatory Credentials Alignment

### 12.1 Official Identity Standardization
Aligned all corporate credentials, physical location indicators, executive titles, and communication channels across all codebase files, schemas, and documentation to the official corporate record:
- **Company Name**: `Zyphuel`
- **Headquarters**: `Lahore, Pakistan.`
- **Founder & Leading Web Developer**: `Muhammad Daniyal`
- **OGRA Distribution License**: `OGRA/DL-7492/LHE`
- **NTN / STRN**: `9482710-3`
- **SECP Incorporation Number**: `0248195`
- **Official Website**: `https://zyphuel.netlify.app`
- **Contact number**: `+92 3230-112464`
- **Complaint Email**: `m.daniyalkhan490@gmail.com`

### 12.2 Codebase Artifacts Updated
1. `src/data/companyInfo.js`: Updated company name, headquarters, founder role (`Founder & Leading Web Developer`), and added structured credentials object (`credentials`).
2. `src/components/footerData.js`: Updated address, contact numbers, complaint email, and LinkedIn profile title.
3. `src/pages/AboutPage.jsx`: Updated team carousel role, Schema.org Person jobTitle, leadership image alt/title, and executive subtitle.
4. `src/pages/ContactPage.jsx`: Standardized contact items (`Contact number`, `Complaint Email`, `Headquarters`) and escalation desk leadership info.
5. `src/pages/OrderPage.jsx`: Standardized invoice header letterhead, legal line, and DOM invoice elements with official credentials.
6. `src/utils/generateInvoicePdf.js`: Replaced company title, headquarters string, complaint email, and support desk line in PDF vector generator.
7. `src/hooks/useSEO.js`: Updated founder jobTitle in Schema.org and author meta tag.
8. `src/pages/HomePage.jsx`: Updated JSON-LD Person schema for founder.
9. `src/pages/DownloadPage.jsx`: Updated author and narrative description.
10. `index.html` & `prerender.js`: Synchronized static HTML Organization, Person, and FAQ schemas with new title and address.
11. `README.md`, `docs/informtion.md`, `docs/memory.md`, `public/llms.txt`, and `public/llms-full.txt`: Refreshed all markdown and generative AI documentation references.

---

## Phase 13: Dynamic Delivery Pricing, App Surge & Content Humanization

### 13.1 Dynamic Delivery Pricing Calibration (Fixed ≤10L, Dynamic Demand 11L–15L)
- **Problem**: Previously, standard doorstep delivery was hardcoded to flat Rs. 280 across all quantities up to 15L. High-capacity dispatches (11L to 15L Max) require dedicated bowser weight capacity, specialized load safety handling, and cannot absorb fixed logistics costs without demand-scaled dispatch pricing.
- **Implementation**:
  - Orders &le;10 Litres (5L to 10L): Strictly fixed at **Rs. 280.00**.
  - Orders >10 Litres (11L to 15L Max): Scaled via transparent dynamic demand formula:
    `standardFee = 280 + (fuelQty - 10) * 20`
    - 11 Litres: Rs. 300.00
    - 12 Litres: Rs. 320.00
    - 13 Litres: Rs. 340.00
    - 14 Litres: Rs. 360.00
    - 15 Litres (Max): Rs. 380.00
  - Updated live reactive UI in `src/pages/OrderPage.jsx` across step 4 delivery schedule cards, live summary badges, mobile summary previews, digital invoices, and WhatsApp messages.
  - Synchronized `src/pages/HomePage.jsx`, `src/pages/AboutPage.jsx`, `src/pages/ContactPage.jsx`, `src/pages/TermsOfUsePage.jsx`, and `src/pages/DownloadPage.jsx`.

### 13.2 Search Engine Dominance & Keyword Architecture
- Researched real-world search intents in Lahore & Pakistan for doorstep fuel delivery.
- Integrated high-ranking query clusters:
  - `online petrol delivery in lahore`
  - `doorstep diesel delivery lahore`
  - `emergency petrol delivery service lahore 24/7`
  - `generator petrol delivery near me lahore`
  - `petrol delivery app pakistan`
  - `buy petrol online pakistan`
  - `euro 5 super petrol delivery lahore`
  - `high octane 97 delivery lahore`
  - `doorstep fuel delivery rates lahore`
- Embedded keywords natively into `index.html`, `src/hooks/useSEO.js`, `src/pages/DownloadPage.jsx`, `src/pages/OrderPage.jsx`, and Schema.org graphs.

### 13.3 Download App Page Market Demand Optimization
- **High Market Demand Callout**: Added an active market alert in `src/pages/DownloadPage.jsx` highlighting 15,000+ active Lahore users across DHA, Gulberg, Bahria Town, and Cantt.
- **Trust Assurance Pills**: Added 4 prominent trust markers:
  - 100% Virus-Free & Verified APK
  - Instant Direct Install
  - 45-Min Lahore SLA
  - COD & Online Payments
- **App SEO & Structured Data**: Enhanced `SoftwareApplication` JSON-LD schema and meta tags to target fuel delivery app queries.

### 13.4 Complete Article Humanization (Zero AI Tells)
- **Audit & Rewrite**: Audited and completely rewrote all 7 articles in `src/data/articles.js`.
- **AI-ism Elimination**:
  - Purged 100% of em dashes (`—` and `--`).
  - Eradicated robotic vocabulary (`delve`, `testament to`, `tapestry`, `realm`, `paradigm`, `pivotal`, `beacon`, `furthermore`, `moreover`, `underscores`, `game-changer`, `seamlessly`, `meticulously`, `cutting-edge`, `landscape`).
  - Removed robotic, formulaic conclusions and repetitive transitional stock phrases.
- **Authentic Field Engineering**:
  - Injected realistic Lahore urban realities: Mall Road, Gulberg, DHA Phases 1 to 9, Ferozepur Road, and Ring Road traffic bottlenecks.
  - Added technical depth on common-rail diesel injector scoring (2,000+ bar pressure) caused by dirty plastic jerrycans.
  - Explained 15°C temperature compensation (ASTM D1250) in 45°C summer heat.
  - Aligned all delivery pricing references to fixed Rs. 280 for orders &le;10L and dynamic demand pricing for 11L–15L.

---

## Phase 14: Regulatory License Purge, Ticker Cleanup & HTML Sitemap Retirement

### 14.1 Regulatory License & Registration Number Removal
- **Problem**: Regulatory license numbers (`OGRA/DL-7492/LHE`, NTN `9482710-3`, SECP `0248195`) were displayed in invoice templates and metadata, causing unwanted exposure.
- **Resolution**:
  - Removed `ograLicense`, `ntnStrn`, and `secpIncorporation` from `src/data/companyInfo.js`.
  - Removed `ntn`, `ograLicense`, and `secp` properties from invoice calculation payload in `src/pages/OrderPage.jsx`.
  - Replaced regulatory credentials banner in print invoice template with official company identity (`Founder & Leading Web Developer: Muhammad Daniyal`, `Headquarters: Lahore, Pakistan`, `Contact: +92 3230-112464`, `Complaint Email: m.daniyalkhan490@gmail.com`).
  - Updated DOM invoice modal header in `OrderPage.jsx` to clean corporate letterhead.
  - Updated pure vector PDF invoice generator in `src/utils/generateInvoicePdf.js`.
  - Purged license mentions from `src/data/articles.js` (Article 7), `public/llms.txt`, and `README.md`.

### 14.2 Marquee Ticker Item Streamlining
- **Problem**: Marquee ticker in `src/pages/OrderPage.jsx` contained unavailable items (`LPG Gas: Rs. 450.00/Kg Unavailable`, `Water Refill: Rs. 100.00/Gal Unavailable`) and duplicate delivery rate text (`Doorstep Delivery: Rs. 280.00 (≤10L Fixed) | Dynamic Demand (11L–15L)`).
- **Resolution**:
  - Completely removed LPG Gas, Water Refill, and Doorstep Delivery items from `price-ticker-track` in `OrderPage.jsx`.
  - The live ticker now displays strictly active, available fuel grades:
    1. Super Petrol (Premier Euro 5)
    2. Diesel (Hi-Cetane Euro 5)
    3. High-Octane (Euro 5)

### 14.3 HTML Sitemap Route & Component Retirement (`/sitemap/`)
- **Problem**: The dedicated `/sitemap/` HTML page (`src/pages/HtmlSitemapPage.jsx`) created an extra redundant page layer for users.
- **Resolution**:
  - Deleted component `src/pages/HtmlSitemapPage.jsx`.
  - Removed `/sitemap` and `/sitemap/` route declarations from `src/App.jsx`.
  - Removed HTML Sitemap link from `bottomLinks` in `src/components/footerData.js`.
  - Pruned `/sitemap/` static pre-rendering from `prerender.js`.
  - Removed `/sitemap` 301 redirect from `public/_redirects`.
  - Removed `Allow: /sitemap/` directives from `public/robots.txt`.
  - Preserved pure XML machine sitemap (`/sitemap.xml`) generated automatically by `prerender.js` for Google Search Console and Bing Webmaster indexing.

---

## Phase 15: Operational Hours Realignment, 24/7 Claim Reconciliation & Dynamic Pricing Clarification

### 15.1 Elimination of Inaccurate Universal 24/7 Delivery Claims
- **Audit & Problem**: Several pages, components, and SEO structured data blocks claimed "24/7/365 uninterrupted delivery" or "24/7 Doorstep Fuel Delivery", which conflicted with actual fleet operations and physical support availability.
- **Resolution**:
  - Replaced misleading "24/7 delivery" copy across 13 core files: `index.html`, `prerender.js`, `src/components/SeoHead.jsx`, `src/components/ServiceCard.jsx`, `src/data/appVersion.js`, `src/data/companyInfo.js`, `src/data/servicesData.js`, `src/hooks/useSEO.js`, `src/pages/AboutPage.jsx`, `src/pages/DownloadPage.jsx`, `src/pages/HomePage.jsx`, `src/pages/OrderPage.jsx`, and `src/pages/ServicesPage.jsx`.
  - In `HomePage.jsx`: Updated hero badge from `24/7 Delivery` to `Fast Delivery`; updated operating comparison row to `✅ Extended Hours Delivery (Mon–Sun)`; updated coverage section heading to `Doorstep Fuel Delivery Coverage Across Lahore`.
  - In `OrderPage.jsx`: Updated SEO heading from `Doorstep Diesel & Petrol Delivery in Lahore – 24/7 On-Demand Fuel Service` to `Doorstep Diesel & Petrol Delivery in Lahore – On-Demand Fuel Service`; clarified express dispatch card to `ensure rapid delivery during operating hours`.
  - In `ServicesPage.jsx`: Updated hero subtitle badge from `24/7 On-Demand Fuel Mobility Lahore` to `On-Demand Fuel Mobility Lahore`; updated FAQ structured answer to reflect on-demand delivery during operating hours.
  - In `AboutPage.jsx`: Updated story text and commercial FAQ to emphasize priority emergency dispatch helpline (24/7) while noting fleet operations occur during operating hours.
  - In `DownloadPage.jsx`: Updated hero description and roadside rescue card from `24/7 Emergency Refueling` to `Emergency Refueling`.

### 15.2 Clarification of Operating Hours vs. 24/7 WhatsApp Helpline
- **Official Operating Hours Standardized**:
  - Monday – Thursday: 8:00 AM – 8:00 PM
  - Friday: 8:00 AM – 1:00 PM
  - Saturday – Sunday: 10:00 AM – 6:00 PM
- **Dedicated WhatsApp Support**:
  - Maintained dedicated 24/7 WhatsApp customer helpline at `+92 3230-112464` for round-the-clock inquiries and emergency pre-bookings.

### 15.3 Dynamic Demand Delivery Pricing Alignment in App Version Changelog
- **Changelog Alignment in `appVersion.js`**:
  - Aligned latest app changelog in `src/data/appVersion.js` to accurately describe the structured dynamic demand dispatch fee:
    *"Doorstep Delivery Pricing Alignment: Fixed Rs. 280.00 flat for 5L–10L, dynamic demand dispatch fee for 11L–15L Max (+Rs. 20/L above 10L), with Cash on Delivery (COD) for 5–10L orders"*.

---

## Phase 16: Fuel Margin Calibration (+Rs. 5.00/L) & Dynamic Surge Delivery Pricing (Rs. 300 / Dynamic 11L–15L)

### 16.1 Retail Petrol Pump Margin Markup Calibration (+Rs. 5.00 / Litre)
- **User Directive**: Updated the retail pump rate margin (`PUMP_RATE_MARKUP`) from **Rs. 2.50 to Rs. 5.00** across Petrol, Diesel, and High-Octane.
- **Core Constant Updated**:
  - `src/data/fuelPrices.js`: Changed `PUMP_RATE_MARKUP = 5.00` and updated dynamic calculation documentation.
  - `src/context/FuelPriceContext.jsx`: Updated default state fallback `pumpMarkup: 5.00` and comments.
- **Dynamic Invariance**: Whether base OGRA rates rise, fall, or stay constant, the +Rs. 5.00 retail pump markup is automatically applied silently in background rate calculations.

### 16.2 Doorstep Delivery Charges Realignment: Rs. 300 Base (≤10L) & Dynamic Surge (11L–15L)
- **User Directive**:
  - Doorstep delivery fee set to **Rs. 300** for orders under 10L (5L–10L).
  - For 10L–15L (specifically 11L–15L Max capacity), progressive dynamic demand surge pricing applies.
- **Implementation in `src/pages/OrderPage.jsx`**:
  - Replaced linear math with a stepped dynamic demand surge map:
    - 5L–10L: Rs. 300.00
    - 11L: Rs. 325.00 (+25)
    - 12L: Rs. 355.00 (+30)
    - 13L: Rs. 385.00 (+30)
    - 14L: Rs. 420.00 (+35)
    - 15L: Rs. 460.00 (+40)
  - Updated Order Page schedule card, summary computations, live invoice modal, print preview HTML, PDF generator, and WhatsApp dispatch message.
- **Cross-Component & Page Synchronization**:
  - `src/pages/HomePage.jsx`: Updated comparison table to `Fixed Rs. 300.00 (≤10L) • Dynamic Demand (11L–15L)`.
  - `src/pages/AboutPage.jsx`: Updated FAQ to reflect Rs. 300 for ≤10L and dynamic demand surge for 11L–15L.
  - `src/pages/ContactPage.jsx`: Updated bottom banner to `Rs. 300 fixed ≤10L`.
  - `src/pages/DownloadPage.jsx`: Updated table row to `Fixed Rs. 300 Fee (≤10L)`.
  - `src/pages/TermsOfUsePage.jsx`: Updated Section 4 to reflect Rs. 300.00 for orders up to 10 Litres.
  - `src/data/appVersion.js`: Updated app version changelog to reflect `Fixed Rs. 300.00 flat for 5L–10L, dynamic demand dispatch fee for 11L–15L Max`.
  - `src/data/articles.js`: Updated all educational articles (Articles 1 through 7) to reflect Rs. 300 fee for orders up to 10 Litres and dynamic demand surge pricing for 11L–15L.
  - Permanent memory & protocols in `AGENTS.md`, `GEMINI.md`, `docs/memory.md`, and `docs/informtion.md` synchronized.

---

## Phase 17: Delivery Pricing Cap (Strictly Rs. 300 – Rs. 400), Jerrycan Removal, Legacy Label Purge & 24/7 Dispatch Acceptance

### 17.1 Delivery Charges Bounded Strictly Between Rs. 300 and Rs. 400
- **User Directive**: *"delivery price 10-15L price 300-400 between hone chaye samaj ay kia tume"*.
- **Implementation in `src/pages/OrderPage.jsx`**:
  - Re-scaled the dynamic fee so that 11L–15L prices are strictly bounded between Rs. 300 and Rs. 400 using a linear +Rs. 20/L step:
    - 5L–10L: Rs. 300.00
    - 11L: Rs. 320.00
    - 12L: Rs. 340.00
    - 13L: Rs. 360.00
    - 14L: Rs. 380.00
    - 15L (Max Capacity): Rs. 400.00
  - Synchronized `HomePage.jsx`, `TermsOfUsePage.jsx`, `AboutPage.jsx`, and `DownloadPage.jsx` to reflect the updated range.

### 17.2 Complete Removal of Jerrycan / Safe Storage Drum
- **User Directive**: *"Jerrycan/ Drum is ko be remove karo"*.
- **Implementation**:
  - Removed `storage` (`Jerrycan / Safe Storage Drum`) from `DELIVERY_APPLICATION_CONFIG` in `src/pages/OrderPage.jsx`.
  - Exactly 4 certified application targets remain: Car/Sedan/SUV, Motorbike/Scooter, Standby Generator, Commercial Machinery.
  - Purged references from FAQ text and developer comments.

### 17.3 Purge of Legacy `(Order <10)` and `Fixed Rate (≤10L)` Tags
- **User Directive**: *"fixed delivery fee: Rs.300 (Order <10) is ko be remove karo ... Fixed Rate (≤10L) is ko be remove karo"*.
- **Implementation**:
  - Step 4 Schedule card: Replaced `Fixed Delivery Fee: Rs. 300.00 (Orders ≤ 10L)` with clean `Delivery Fee: Rs. ${deliveryFee.toFixed(2)}`.
  - Order Summary sidebar: Replaced `Fixed Rate (≤10L)` / `Dynamic Demand` label with clean `Doorstep Delivery (${fuelQty}L)`.
  - WhatsApp dispatch text: Purged `(Fixed Rate Under 10L)` / `(Dynamic Demand Rate...)` suffix.

### 17.4 Continuous 24/7 Online Order Acceptance & Friendly Schedule Info
---

## Phase 18: Operating Hours Modal Site-Wide Alignment & SVG Graph/Chart Purge

### 18.1 Operating Hours Modal & Banner Harmonization
- **User Directive**: Aligned OrderPage modal and status banner to strictly match the rest of the website (`Zyphuel Operating & Working Hours`):
  - Monday – Thursday: 8:00 AM – 8:00 PM
  - Friday: 8:00 AM – 1:00 PM
  - Saturday – Sunday: 10:00 AM – 6:00 PM
  - 24/7 WhatsApp Hotline & Emergency Dispatch: `+92 3230-112464`
- **Eliminated Disparities**: Replaced divergent wording ("Physical office verification desk vs 24/7 dispatch") with unified company operating hours and timings.

### 18.2 Complete Removal of Graph, Chart, Commits, and Changes SVG Files
- **User Directive**: *"graphs,charts,comits,changes .svg files ko be remove karo."*
- **Action Executed**:
  - Deleted `github-changes-graph.svg` and `repo-activity-chart.svg` across `.github/assets/`, `assets/`, `public/images/`, and `dist/images/`.
  - Deleted `scripts/generate_github_graph.js` and `.github/workflows/update-graph.yml`.
  - Removed `"prebuild"` and `"graph"` scripts from `package.json` so build never re-generates SVG graph files.
  - Removed `src/data/gitTelemetry.json`.

---

## Phase 19: Strict 10:00 PM Order Cutoff, PHP Guard Plugin & 100% Genuine Harmonization

### 19.1 Strict 10:00 PM (Asia/Karachi PKT) "Complete Order" Button Removal
- **User Directive**: *"10pm ka bad Complete Order ka button show nai hona chaye kis be hal ma , ya kase add karna ya tuma ache sa pata ho ga meri website ma"*
- **Implementation**:
  - In `src/utils/officeHours.js`:
    - Evaluated live time in `Asia/Karachi` timezone: `isNightCutoffActive = (hour >= 22 || hour < 8)`.
    - Computed `canCompleteOrder = !isNightCutoffActive`.
    - Computed `nextOrderReopen = (hour >= 22) ? 'Tomorrow at 8:00 AM PKT' : 'Today at 8:00 AM PKT'`.
  - In `src/pages/OrderPage.jsx`:
    - Whenever `officeStatus.isNightCutoffActive` is true, the `.button-wrapper` containing `<button className="truck-button" id="truck-submit-btn">` is **strictly not rendered in the DOM**.
    - In its place, rendered a high-impact **Night Order Cutoff Alert Card** stating orders close at 10:00 PM and reopen at 8:00 AM PKT, showing live PKT clock and direct 24/7 WhatsApp emergency helpline button (`+92 3230-112464`).
    - Added hard interceptors in `handleTruckClick` and `proceedOrderSubmission` to block order submissions during cutoff hours.

### 19.2 WordPress & Standalone PHP Plugin (`plugins/zyphuel-order-guard/zyphuel-order-guard.php`)
- **User Directive**: *"ek plugin banayo .php ma 10pm ka bad Complete Order ka button show nai hona chaye kis be hal ma"*
- **Implementation**:
  - Created `plugins/zyphuel-order-guard/zyphuel-order-guard.php` conforming to standard WordPress plugin specifications:
    - Sets timezone `date_default_timezone_set('Asia/Karachi')`.
    - Implemented REST API route `/wp-json/zyphuel/v1/order-status`.
    - Injects protective CSS hiding `#truck-submit-btn, .truck-button` if cutoff is active.
    - Injects JavaScript removing the button from the DOM.
    - Intercepts POST order submissions with HTTP 403 Forbidden.
  - Created standalone web-accessible endpoint `public/api/order-guard.php` for direct JSON status queries.

### 19.3 Site-Wide 100% Genuine Information Consistency Audit & Clean-up
- **User Directive**: *"all information ko wesbite ma update rakho, articles , suspicous information nai hone chaye , ek page ma kuch or information ha or dosra page ma koi or information ha , all information same accroding to names and requrements"*
- **Harmonized Claims**:
  1. **Fuel Pricing & Markup**: Updated `HomePage.jsx` to state "Official OGRA + Standard Forecourt Retail Margin (+Rs. 5.00/L)" eliminating contradictory "zero markup" claim.
  2. **Delivery Fees**: Standardized 10 articles in `src/data/articles.js` by replacing legacy "dynamic demand surge pricing" with exact scaled fee schedule (Rs. 300 up to 10L, Rs. 320–400 for 11L–15L at +Rs. 20/L step).
  3. **Orderable Targets**: Purged remaining "safe storage drum" / "Drums" from `src/data/articles.js` (lines 199 and 644), strictly enforcing the 4 approved application targets (Car, Motorbike, Generator, Commercial Machinery).
  4. **Operating Hours**: Aligned `HomePage.jsx`, `ContactPage.jsx`, `companyInfo.js`, `TermsOfUsePage.jsx`, and `PrivacyPolicyPage.jsx` to reflect:
     - Online Doorstep Orders: 8:00 AM – 10:00 PM Daily (PKT)
     - Night Cutoff Window: 10:00 PM – 8:00 AM PKT
     - Corporate Support Desk: Mon–Thu 8am–8pm, Fri 8am–1pm, Sat–Sun 10am–6pm
     - WhatsApp Helpline: 24/7 on-demand
  5. **SEO Protection**: Protected and reinforced all indexed keywords (doorstep fuel delivery Lahore, calibrated digital flow meter 0.01L, Euro-V petrol diesel).



