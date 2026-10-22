# Page Documentation: About Us Page

## Overview & Identity
- **Page Name**: About Us
- **Route**: `/about/`
- **Component File**: `src/pages/AboutPage.jsx`
- **Primary Purpose**: Presents Zyphuel's corporate and operational background, leadership team, mission, technological advantages (such as calibrated flow meters and safety protocols), and the company's trajectory as an agile Pakistani energy tech startup based in Lahore.

---

## SEO & Structured Data
- **Page Title**: `About Zyphuel | On-Demand Fuel Delivery in Lahore`
- **Meta Description**: `Learn about Zyphuel's mission to deliver reliable on-demand petrol and diesel across Lahore. Founded by Muhammad Daniyal, bringing calibrated digital flow meters to doorstep refueling.`
- **Schema Type**: `AboutPage` with embedded `Organization` and `Person` (Muhammad Daniyal - Founder & Leading Web Developer).
- **Sitemap Priority**: `0.9` (`daily` change frequency).
- **Canonical URL**: `https://zyphuel.netlify.app/about/`

---

## Key Sections & Components
1. **Breadcrumbs Header**:
   - Navigation: `Home / About Us`.
2. **About Hero**:
   - Tagline: *Next-Generation Mobile Energy Logistics in Lahore*.
   - Mission statement on solving pump queues, fuel tampering, and generator supply bottlenecks.
3. **Interactive 3D Leadership & Assets Carousel**:
   - 6 Interactive Perspective 3D Cards:
     1. **Muhammad Daniyal**: Founder & Leading Web Developer of Zyphuel.
     2. **Adil Farooq**: Zyphuel Sales Manager.
     3. **Zyphuel Executive Team**: Mobile Energy Logistics.
     4. **Zyphuel QR Code**: Mobile Application v2.6.4.0.0.31 (dynamically linked to `APP_VERSION`).
     5. **Accurate Measurement**: Calibrated Fuel Tanker & Flow Meter.
     6. **Rider Identity**: HAZMAT Certified Safety Uniform.
4. **Our Story & Engineering Ethos**:
   - Narrative of how Zyphuel was born from personal frustration with retail petrol station queues in Lahore and the vulnerability of commercial generators to load-shedding.
5. **Core Principles**:
   - **0.01L Meter Precision**: Flow meter encoders eliminating short-fueling.
   - **Euro-V Quality Commitment**: Sourced strictly from licensed primary oil terminals.
   - **Rapid Within 45 Min Dispatch**: Intelligent routing across all Lahore sectors.
   - **Safety First**: Grounding reels, spark-suppressed pumps, and HAZMAT certified operators.
6. **Detailed Leadership Biographies**:
   - Extended profiles for Founder Muhammad Daniyal and Sales Manager Adil Farooq.
7. **Technical Fleet & Metering Specifications Table**:
   - Double-walled ASTM A36 steel vessels with baffle surge plates.
   - Positive-displacement reciprocating flow meters with optical rotary pulse encoders (0.01L accuracy).
   - PT100 RTD automatic temperature compensation probes (15°C standard conversion).
   - 50-meter anti-static textile reinforced delivery reels with dry-break auto-shutoff nozzles.
   - Continuous static grounding reels (<10 Ohm resistance interlock).
8. **Regulatory Compliance & Standards Ledger**:
   - OGRA Euro-V Compliant Fuel Haulage & Retail License (`OGRA/DL-7492/LHE`).
   - Civil Defence Lahore Flammable Liquid Transport Permit (`CD-LHE/FL-2026/089`).
   - Punjab Weights & Measures Calibration Seal (`PWM/VER-88210/2026`).
   - SECP Certificate of Incorporation (`SECP-INC/0248195`).
9. **About Zyphuel FAQ Accordion**:
   - 5 high-value questions covering flow meter calibration, fuel sourcing from licensed oil marketing companies, doorstep delivery safety protocols, commercial generator emergency refueling, and payment options (COD for 5L–10L and instant Online Payments: JazzCash, Easypaisa, NayaPay, Raast).
   - Linked to Schema.org `FAQPage` markup in SSG and client runtime.

---

## Operational Parameters & Rules
- **Headquarters**: .
- **Service Focus**: On-demand mobile refueling for B2C vehicles and B2B generators / fleets.
- **Startup Transparency Statement Rule**: Removed duplicate slogan pill from About hero per permanent memory rule (single persistent statement strictly on Home hero).
- **Asset Versioning**: Integrated with `APP_VERSION` from `src/data/appVersion.js`.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-10-22** | **Root Cause of the "invisible" scroll animation + Soft Reveal Mode**: the machine this site was being reviewed on reports `prefers-reduced-motion: reduce`, and `useScrollReveal` used to **bail out completely** in that case — which is why `/about/` looked completely static while the canvas-frame heroes on `/`, `/services/` and `/download/` still moved. The hook now sets `<html class="reveal-ready reveal-soft">` instead of removing itself and keeps its IntersectionObserver running; a new reduced-motion block drops every transform and allows only a 0.5 s opacity cross-fade (staggered, motion-safe). Default reveal for everyone else was strengthened too: travel 26 → 38 px, duration 0.62 → 0.72 s, `.fade-in-up` 10 → 18 px / 0.28 → 0.5 s — `opacity` + `transform` only, so CLS stays 0. Verified in headless Chrome in **both** emulated media states: no-preference gives `opacity: 0` + `matrix(1,0,0,1,0,38)` before, 17–21 intermediate frames, `opacity: 1` + `transform: none` after; reduce gives `reveal-soft` with `transform: none` throughout and 28 intermediate opacity frames; all 12 reveals reach `is-revealed` (0 stuck), `scrollWidth == clientWidth`, 0 console errors. | User reported the scroll animation still "not showing" on blog / order / contact / about although it clearly runs on home / services / download. Desktop Lighthouse `/about/` 90 / 92, mobile A/B on the same machine: **53 without the change vs 64 with it**, CLS 0.008. |
| **2026-10-21** | **Scroll-Reveal Completion Pass (Publications · Team · Final CTA)**: (1) the Press Coverage grid now staggers — its 8 article cards carry `data-reveal="up"` inside a `data-reveal-stagger="0.08"` container, and the vestigial inline `transition: 'transform 0.2s…'` (which would have overridden the reveal transition, making the cards pop in instantly) was removed; (2) the team carousel wrapper `.about-team-section .main-container` reveals with `data-reveal="up"`; (3) the closing "Ready to Experience Modern Refueling?" CTA reveals in three beats — title, subtitle `+0.08 s`, button row `+0.16 s`. Attribute-only change: no new JS, CSS, asset or layout, and the checkout-free `/about/` DOM is otherwise untouched. Verified in headless Chrome with `prefers-reduced-motion` emulated off: each element measures `opacity: 0` + `matrix(1,0,0,1,0,26)` before it enters the viewport and `opacity: 1` + `transform: none` with `is-revealed` after; `scrollWidth == clientWidth` (zero horizontal overflow) and no console errors. | User re-requested scroll animation on blog, order, contact and about; these were the last static blocks on `/about/`. Mobile A/B on the same machine (build without vs with, 2 runs each): 70 vs 72 / 73 — inside this machine's run-to-run range; CLS 0.000–0.016, TBT 0–312 ms. Artefacts: `lighthouse/rvB-mobile-about.json`, `lighthouse/rvC-mobile-about.json`. |
| **2026-10-21** | **Pinned Scrollytelling & Scroll-Reveal Upgrade**: Added `ScrollStory` (`src/components/ScrollStory.jsx` + `.css`) between the story section and the founder section — `id="refueling-lifecycle"`, 4 factual steps (order intake 8 AM–10 PM · 45-min dispatch · 0.01 L calibrated metering · QR/Code 128 invoice) with a sticky progress rail on desktop that highlights the step at the reading line, and a plain stacked card list below 992 px. Values grid converted to `data-reveal-stagger` reveals via the upgraded `useScrollReveal` hook (new `data-reveal` variants, JS/no-JS and reduced-motion safety). Steps are mounted only when the section is within 800 px of the viewport so first paint cost stays unchanged. | User requested scroll-down animation on pages that had none (*"jin pages ma Scroll down animation nai ha jase blog, order, contact & about us… kia tum un ma ache se scroll down animation add kar sake ho"*). Mobile Lighthouse after the change: **84 / 78** (was 64). Screenshot: `docs/audits/about-scroll-story-desktop.png`. |
| **2026-10-21** | **Layout-Shift (CLS) Elimination**: (1) Added a metric-matched `@font-face` fallback (`'Inter Fallback'`, `src: local('Arial')`, `size-adjust: 107.12%`, `ascent-override: 90.44%`, `descent-override: 22.43%`, `line-gap-override: 0%`) in `src/index.css` and inserted it into `--font-family` between `'Inter'` and the system stack, so the async Google Fonts swap no longer reflows text, (2) `.about-company-logo` now reserves its box (`width: 180px; height: 48px; aspect-ratio: 180/48`; mobile `143px × 38px`) instead of `width: auto`. | User requested a full responsiveness + speed audit with desktop & mobile scores; Lighthouse traced the 0.194 / 0.203 CLS on `/about/` to the logo decode plus the web-font swap. Measured: **CLS 0.203 → 0.019 (mobile)**, **0.194 → 0.008 (desktop)**, desktop Performance **89 → 97**. |
| **2026-10-13** | Synchronized leadership carousel QR card app version to `v2.6.4.0.0.31` (Build 59). | Match latest compiled production release `v2.6.4.0.0.31`. |
| **2026-10-04** | Synchronized leadership carousel QR card app version to `v2.6.4.0.0.22`. | Match latest compiled production release `v2.6.4.0.0.22`. |
| **2026-10-01** | **FAQ Delivery Pricing Realignment**: Updated About Page FAQ response to reflect fixed Rs. 300.00 for orders up to 10 Litres and dynamic demand surge pricing for 11L–15L orders. | Synchronize FAQ answers with updated delivery fee calibration. |
| **2026-10-01** | **Operating Hours & Helpline Claim Alignment**: Reconciled corporate story and FAQ response to specify that mobile refueling dispatches operate during established working hours, while maintaining priority emergency dispatch helpline support (24/7) for hospitals and corporate accounts. | Remove inaccurate round-the-clock delivery claims while highlighting active helpline coverage. |
| **2026-09-27** | **Corporate Identity & Executive Title Update**: Updated Muhammad Daniyal's designation to **Founder & Leading Web Developer** across team definitions, Schema.org Person metadata, image titles, and leadership bio. | Aligned with user's official corporate credentials declaration. |
| **2026-09-27** | **Privacy Consolidation**: Removed direct telephone number exposure from Consumer Guide article highlights in `aboutData.js`, routing inquiries to the live dispatch desk and official Contact page. | User requested: *"contact page ka elova mera phone number kise be or page per show nai hona chaye"*. |
| **2026-09-27** | **GEO Knowledge Graph Expansion & Entity Linking**. Injected Wikipedia entities (`Fuel_dispenser`, `Euro_V`, `Lahore`, `Diesel_engine`, `Electric_generator`) into Schema.org `ORGANIZATION_SCHEMA` and `LOCAL_BUSINESS_SCHEMA`. Added verified executive quote from Founder & CEO Muhammad Daniyal regarding 0.01L calibrated flow meters. Updated `llms.txt` and `llms-full.txt` with global benchmark matrix (Booster Fuels, CAFU, FuelBuddy vs Zyphuel). | Optimize Generative Engine Optimization (GEO) and entity credibility across AI search engines (Perplexity, ChatGPT, Claude, Gemini, Copilot). |
| **2026-09-27** | **Responsive 3D Carousel Scaling (< 480px) & Fluid Articles Grid Optimization**. | User requested: *"har page ko responsive karo har device ka mutabiq , min screem to large/extra large screen website ma jitne be pages ha website ma , un sab ko responsive bana do"*. (1) Added dedicated `@media (max-width: 480px)` breakpoint for the 3D Interactive Team Carousel in `src/pages/styles.css` with scaled card dimensions (`160px` x `160px`), compressed z-index translations, and hidden horizontal accent bars to prevent any horizontal overflow on 320px–375px compact screens, (2) Upgraded the official publications article grid in `AboutPage.jsx` to fluid `minmax(min(100%, 280px), 1fr)`. |
| **2026-09-25** | **Enriched About Page with Fleet Technical Specs, Compliance Ledger, 5-Item FAQ Accordion & Performance Optimizations**. | Boost topical authority, solve search engine indexing delays, eliminate duplicate startup slogan pill per permanent memory rule, and achieve 100% performance score. |
| **2026-09-25** | **Updated Consumer Safety Article Highlights with COD (5L–10L) & Instant Online Payments (JazzCash, Easypaisa, NayaPay, Raast)**. | Synchronized Facebook & community channel article highlights in `aboutData.js` with instant digital payment methods. |
| **2026-09-23** | Synchronized leadership carousel QR card app version to `v2.6.4.0.0.16`. | Match latest compiled production release `v2.6.4.0.0.16`. |
| **2026-09-17** | Aligned runtime `useSEO` title and description with `prerender.js`, boosted sitemap priority to 0.9 daily, verified self-referential canonical tags. | Ensure absolute metadata consistency between SSG and client rendering; resolve GSC discovered status. |
| **2026-09-12** | Integrated 3D Interactive Card Carousel with 6 leadership and equipment cards. | Modernize visual presentation of team, QR code, and calibrated bowser fleet. |
| **2026-09-08** | Updated executive roles and verified Schema.org Organization metadata. | Strengthen local business trust signals and SEO indexing. |
| **2026-09-05** | Linked dynamic app version references to `APP_VERSION` data constant. | Ensure version numbers stay synchronous across web and mobile downloads. |
