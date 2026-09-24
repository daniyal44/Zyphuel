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
- [x] Modernize Payment Options card with Cash on Delivery (COD for 5L–10L) and instant on-spot digital wallets (JazzCash, Easypaisa, NayaPay, Raast / Bank).
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
- [x] Synchronize all blog articles and data files with COD (5L–10L) and instant digital wallet payment methods.

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
