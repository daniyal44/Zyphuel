# Zyphuel Phases & Milestones

> Product roadmap broken down into independently shippable, fully testable phases.

## Phase 1 — Core / MVP Shell
**Goal:** Establish the foundational React + Vite responsive web application.
- [x] Initial design system with petroleum dark blue (`#0284c7`), amber fuel gold (`#f59e0b`), and clean white/dark mode styles.
- [x] Responsive layout with `Navbar`, `Footer`, and `ThemeToggle`.
- [x] Multi-commodity order page supporting Petrol, Diesel, High-Octane, LPG Gas, and Potable Water.
- [x] Direct WhatsApp dispatch automation link.

## Phase 2 — Reactive Fuel Engine & Live Rates
**Goal:** Centralize real-time pricing synchronization across the entire platform.
- [x] Implement `FuelPriceContext.jsx` and `fuelPrices.js`.
- [x] Direct API integration with Trackmate live scraping pipeline.
- [x] Fallback proxy integration via AllOrigins CORS wrapper.
- [x] SessionStorage 15-minute caching mechanism to eliminate layout shift and unnecessary network traffic.

## Phase 3 — Hardware Simulation & GSAP Dispatch Animation
**Goal:** Deliver visceral consumer confidence through physical telemetry simulation.
- [x] 0.01L digital positive-displacement flow meter simulation.
- [x] GSAP-driven truck dispatch animation transforming order submission into an animated bowser en-route.
- [x] Active order persistence and countdown tracker in `localStorage`.

## Phase 4 — Production SEO & SSG Pre-Rendering
**Goal:** Achieve premier visibility across Pakistani search queries.
- [x] Node.js static site generation pre-rendering 16 dedicated static HTML routes.
- [x] Automated dynamic XML sitemap generation (`sitemap.xml`) and `robots.txt`.
- [x] Schema.org `LocalBusiness`, `Service`, `OfferCatalog`, and `SoftwareApplication` JSON-LD schemas.

## Phase 5 — 3D Bowser Model & Official Android APK v2.0.4
**Goal:** Build authentic brand trust and dedicated mobile app presence.
- [x] Three.js interactive 3D model showcase of Zyphuel micro-bowser.
- [x] Perspective 3D cards highlighting leadership (Founder Muhammad Daniyal, Sales Manager Adil Farooq).
- [x] Dedicated Android APK download page (`/download/`) with direct link to `zyphuel-v2.0.4.apk` (12.4 MB).

## Phase 6 — Operational Office Hours & Delivery Fee Calibration
**Goal:** Transparent business operations and realistic delivery unit economics.
- [x] Office operating hours schedule card added to Home, Contact, Privacy, and Terms pages.
- [x] Simple delivery fee calibrated to flat Rs. 280 for doorstep orders due to nationwide fuel price hikes.
- [x] Urgent delivery priority fee calibrated to a controlled, reasonable +Rs. 100 (Total Rs. 380).
- [x] Dedicated markdown documentation registry in `docs/pages/`.

## Phase 7 — Retail Petrol Pump Rate Markup (+Rs. 2.50/L)
**Goal:** Synchronize doorstep fuel rates with actual petrol pump retail stations in Lahore.
- [x] Formula established: `Retail Petrol Pump Rate = Base OGRA Price + Rs. 2.50 / Litre`.
- [x] Applied uniformly to Petrol, Diesel, and High-Octane.
- [x] Invariant across price increases, decreases, or steady states ("jab bhi price kam ho ya zada ho ya same rahe").
- [x] OrderPage ticker, live indicator banner, fuel cards, summary breakdown, digital invoice, and WhatsApp payloads updated.
- [x] Master logs created: `changes.md`, `remove.md`, `delete.md`.

## Phase 8 — Delivery Pricing Calibration & 15L Max Limit Integration
**Goal:** Unified flat delivery pricing, 5L–15L strict capacity constraints, and complete purge of obsolete 50L bulk references.
- [x] Simple delivery fee set to flat Rs. 280.00 across all doorstep orders.
- [x] Urgent delivery surcharge maintained at flat +Rs. 100.00 (Total Rs. 380.00).
- [x] Strict 5L Minimum to 15L Maximum capacity enforced and communicated across Order Page, Terms, and Knowledge Articles.
- [x] Purged all '50L' / '50 Litres' bulk references and '• Min' tag from volume quick select chips.

## Phase 9 — Performance, SEO, Dynamic Sitemaps & Fixed 45-Min SLA Window
**Goal:** Comprehensive Core Web Vitals optimization, Schema.org business rule alignment, multi-route Google Image sitemaps, and universal doorstep delivery time standardization.
- [x] Removed unused Anime.js and global GSAP CDN scripts from `<head>` on all 17 routes, reducing index.html size and initial network overhead.
- [x] Dynamically injected GSAP on-demand in `OrderPage.jsx` for the truck submit animation without blocking initial route render.
- [x] Removed unused `birdsData` manual chunk configuration from `vite.config.js`.
- [x] Standardized doorstep delivery duration to fixed strictly **within 45 minutes** for both Simple Standard and Urgent Priority across OrderPage, countdown timers, tracker states, WhatsApp dispatch template, printable invoice, PDF vector export, and meta tags.
- [x] Corrected Schema.org JSON-LD structured data in `index.html` and `prerender.js` to strictly enforce the 5–15L volume limit, flat Rs. 280 fee, and within 45 minutes SLA.
- [x] Enriched dynamic `sitemap.xml` generation in `prerender.js` with `<image:image>` metadata for all 16 canonical public routes and accurate per-article `<lastmod>` publication timestamps.
- [x] Full SSG build and GSC inspection passing with exit code 0.
