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
- **Schema Type**: `AboutPage` with embedded `Organization` and `Person` (Muhammad Daniyal - Founder & CEO).
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
     1. **Muhammad Daniyal**: Founder & CEO of Zyphuel.
     2. **Adil Farooq**: Zyphuel Sales Manager.
     3. **Zyphuel Executive Team**: Mobile Energy Logistics.
     4. **Zyphuel QR Code**: Mobile Application v2.6.4.0.0.16 (dynamically linked to `APP_VERSION`).
     5. **Accurate Measurement**: Calibrated Fuel Tanker & Flow Meter.
     6. **Rider Identity**: HAZMAT Certified Safety Uniform.
4. **Our Story & Engineering Ethos**:
   - Narrative of how Zyphuel was born from personal frustration with retail petrol station queues in Lahore and the vulnerability of commercial generators to load-shedding.
5. **Core Principles**:
   - **0.01L Meter Precision**: Flow meter encoders eliminating short-fueling.
   - **Euro-V Quality Commitment**: Sourced strictly from licensed primary oil terminals.
   - **Rapid 15–45 Min Dispatch**: Intelligent routing across all Lahore sectors.
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
   - 5 high-value questions covering flow meter calibration, fuel sourcing from licensed oil marketing companies, doorstep delivery safety protocols, commercial generator emergency refueling, and payment options (COD for 5L–10L and instant digital wallets: JazzCash, Easypaisa, NayaPay, Raast).
   - Linked to Schema.org `FAQPage` markup in SSG and client runtime.

---

## Operational Parameters & Rules
- **Headquarters**: 75-Main Boulevard, Gulberg III, Lahore.
- **Service Focus**: On-demand mobile refueling for B2C vehicles and B2B generators / fleets.
- **Startup Transparency Statement Rule**: Removed duplicate slogan pill from About hero per permanent memory rule (single persistent statement strictly on Home hero).
- **Asset Versioning**: Integrated with `APP_VERSION` from `src/data/appVersion.js`.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-09-27** | **Privacy Consolidation**: Removed direct telephone number exposure from Consumer Guide article highlights in `aboutData.js`, routing inquiries to the live dispatch desk and official Contact page. | User requested: *"contact page ka elova mera phone number kise be or page per show nai hona chaye"*. |
| **2026-09-27** | **GEO Knowledge Graph Expansion & Entity Linking**. Injected Wikipedia entities (`Fuel_dispenser`, `Euro_V`, `Lahore`, `Diesel_engine`, `Electric_generator`) into Schema.org `ORGANIZATION_SCHEMA` and `LOCAL_BUSINESS_SCHEMA`. Added verified executive quote from Founder & CEO Muhammad Daniyal regarding 0.01L calibrated flow meters. Updated `llms.txt` and `llms-full.txt` with global benchmark matrix (Booster Fuels, CAFU, FuelBuddy vs Zyphuel). | Optimize Generative Engine Optimization (GEO) and entity credibility across AI search engines (Perplexity, ChatGPT, Claude, Gemini, Copilot). |
| **2026-09-27** | **Responsive 3D Carousel Scaling (< 480px) & Fluid Articles Grid Optimization**. | User requested: *"har page ko responsive karo har device ka mutabiq , min screem to large/extra large screen website ma jitne be pages ha website ma , un sab ko responsive bana do"*. (1) Added dedicated `@media (max-width: 480px)` breakpoint for the 3D Interactive Team Carousel in `src/pages/styles.css` with scaled card dimensions (`160px` x `160px`), compressed z-index translations, and hidden horizontal accent bars to prevent any horizontal overflow on 320px–375px compact screens, (2) Upgraded the official publications article grid in `AboutPage.jsx` to fluid `minmax(min(100%, 280px), 1fr)`. |
| **2026-09-25** | **Enriched About Page with Fleet Technical Specs, Compliance Ledger, 5-Item FAQ Accordion & Performance Optimizations**. | Boost topical authority, solve search engine indexing delays, eliminate duplicate startup slogan pill per permanent memory rule, and achieve 100% performance score. |
| **2026-09-25** | **Updated Consumer Safety Article Highlights with COD (5L–10L) & Instant Digital Wallets (JazzCash, Easypaisa, NayaPay, Raast)**. | Synchronized Facebook & community channel article highlights in `aboutData.js` with instant digital payment methods. |
| **2026-09-23** | Synchronized leadership carousel QR card app version to `v2.6.4.0.0.16`. | Match latest compiled production release `v2.6.4.0.0.16`. |
| **2026-09-17** | Aligned runtime `useSEO` title and description with `prerender.js`, boosted sitemap priority to 0.9 daily, verified self-referential canonical tags. | Ensure absolute metadata consistency between SSG and client rendering; resolve GSC discovered status. |
| **2026-09-12** | Integrated 3D Interactive Card Carousel with 6 leadership and equipment cards. | Modernize visual presentation of team, QR code, and calibrated bowser fleet. |
| **2026-09-08** | Updated executive roles and verified Schema.org Organization metadata. | Strengthen local business trust signals and SEO indexing. |
| **2026-09-05** | Linked dynamic app version references to `APP_VERSION` data constant. | Ensure version numbers stay synchronous across web and mobile downloads. |
