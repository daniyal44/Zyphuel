# Zyphuel Comprehensive Development Phases & Build Milestones (`phases.md`)

This document provides a comprehensive chronological record of all product phases, engineering sprints, and architectural milestones in the development of the Zyphuel platform from inception ("start") to the present ("now").

---

## Master Development Phases Roadmap

```mermaid
gantt
    title Zyphuel Platform Engineering Phases
    dateFormat  YYYY-MM-DD
    section Core Build
    Phase 1 : Prototype & Core UI Architecture      :done, p1, 2026-08-01, 2026-08-10
    Phase 2 : Reactive State & Dynamic Fuel Engine  :done, p2, 2026-08-11, 2026-08-20
    Phase 3 : Hardware Simulation & Telemetry       :done, p3, 2026-08-21, 2026-08-30
    section Production
    Phase 4 : Production SEO & SSG Pre-rendering    :done, p4, 2026-09-01, 2026-09-08
    Phase 5 : Mobile App Integration (APK v2.6.4)   :done, p5, 2026-09-09, 2026-09-15
    Phase 6 : Core Business Logic & Pricing Rules   :done, p6, 2026-09-16, 2026-09-20
    Phase 7 : Corporate Tax Invoice & Verification  :done, p7, 2026-09-21, 2026-09-23
    Phase 8 : Streamlining, Payment Modernization   :done, p8, 2026-09-24, 2026-09-25
```

---

## Detailed Phase Breakdown

### Phase 1: Prototype Foundation & Core React Architecture
- **Timeline**: August 1, 2026 – August 10, 2026
- **Primary Objectives**:
  - Migrate conceptual static mockup into a modular React 18 + Vite 5 single-page application.
  - Implement zero-dependency CSS custom properties (`:root` design tokens in `src/index.css`) for consistent dark/light themes.
  - Establish foundational layouts: `Navbar.jsx`, `Footer.jsx`, `ThemeToggle.jsx`, and initial page routing.
- **Key Deliverables**:
  - Working React SPA with responsive layout.
  - Routes for Home, Order, Services, About, Download, Contact, Blog, Privacy, Terms, and 404.
  - Dark and Light mode theme switching persisted via `localStorage`.

---

### Phase 2: Reactive State & Dynamic Fuel Engine
- **Timeline**: August 11, 2026 – August 20, 2026
- **Primary Objectives**:
  - Build centralized commodity pricing management to eliminate hardcoded fuel prices.
  - Create `FuelPriceContext.jsx` and `src/data/fuelPrices.js`.
  - Establish dynamic synchronization across the Order page, Services catalog, and live marquee rate tickers.
- **Key Deliverables**:
  - Real-time price updates for Super Petrol, Euro-V Diesel, High-Octane 97, LPG Gas, and Potable Water.
  - Multi-category cart selection allowing users to configure fuels and quantities in a unified state.

---

### Phase 3: Hardware Simulation, Telemetry & Dispatch
- **Timeline**: August 21, 2026 – August 30, 2026
- **Primary Objectives**:
  - Incorporate realistic representations of positive-displacement electronic flow meters and optical pulse encoders.
  - Simulate Automatic Temperature Compensation (ATC at 15°C reference) to educate users on volumetric accuracy.
  - Introduce interactive GSAP animation where the order submission button morphs into a delivery truck.
- **Key Deliverables**:
  - Live volumetric counter simulation.
  - GSAP bowser dispatch animation.
  - Visual status telemetry badges for order progress.

---

### Phase 4: Production SEO, SSG & Search Indexing
- **Timeline**: September 1, 2026 – September 8, 2026
- **Primary Objectives**:
  - Build headless Puppeteer/SSR pre-rendering pipeline (`prerender.js`) to generate static HTML for all 17 public routes.
  - Implement full Schema.org structured data graphs (`Service`, `LocalBusiness`, `OrderAction`, `Article`, `FAQPage`).
  - Configure automated search engine notification via IndexNow protocol (`scripts/indexnow.js`).
- **Key Deliverables**:
  - 17 static pre-rendered routes in `dist/`.
  - Dynamically generated `sitemap.xml`, `robots.txt`, and AI-friendly `llms.txt`.
  - Near-instantaneous page load speeds (<0.8s First Contentful Paint).

---

### Phase 5: Mobile App Integration & Leadership Showcase
- **Timeline**: September 9, 2026 – September 15, 2026
- **Primary Objectives**:
  - Distribute the official Zyphuel Android APK (`v2.6.4.0.0.16`, `31.6 MB`) compiled for Android 7.0+.
  - Integrate biometric authentication features (Fingerprint and Face Unlock) for 1-tap checkout.
  - Overhaul `AboutPage.jsx` with an interactive 3D Card Carousel showcasing the leadership team and bowser fleet.
- **Key Deliverables**:
  - Direct APK download portal with instant high-contrast QR code for desktop-to-mobile installs.
  - 3D leadership carousel with 6 interactive cards.
  - Documented Android background daemon for 2-hour daily fuel price alerts.

---

### Phase 6: Core Business Logic & Pricing Alignment
- **Timeline**: September 16, 2026 – September 20, 2026
- **Primary Objectives**:
  - Enforce strict doorstep fuel volume limits: **5 Litres minimum** up to **15 Litres maximum** per order.
  - Unify delivery charges to flat **Rs. 280.00** across all Lahore zones.
  - Integrate standard retail petrol pump station tariff (`+Rs. 2.50 / Litre`) on Petrol, Diesel, and High-Octane.
  - Clean up confusing legacy notices (purged all 50L bulk references, `• Min` chip tag, and visible formula labels).
- **Key Deliverables**:
  - Clamped volume stepper (`[5, 7, 10, 12, 15]` chips with `15L Max` capacity indicator).
  - Uniform flat Rs. 280 fee structure.
  - Clean, unpolluted price displays showing final pump rates.

---

### Phase 7: Corporate Tax Invoicing & Dual Verification
- **Timeline**: September 21, 2026 – September 23, 2026
- **Primary Objectives**:
  - Engineer pure vector client-side PDF invoice generator using `jspdf` (`src/utils/generateInvoicePdf.js`).
  - Deploy official corporate tax invoice letterhead with OGRA License `OGRA/DL-7492/LHE`, NTN `9482710-3`, and SECP `0248195`.
  - Engineer Dual Verification System (Instant Mobile Camera QR Code + Industrial Code 128 Barcode) resolving legacy camera scan failures.
  - Add Refueling Target application selector (`Car/SUV`, `Motorbike`, `Generator`, `Machinery`, `Storage Drum`).
- **Key Deliverables**:
  - Instant vector PDF download (`Zyphuel-Invoice-ZYP-XXXXXX.pdf`) in <50ms.
  - Authenticated web verification URL (`/order/?verify=${orderId}`).
  - 2-step completion flow: PDF invoice download followed by 3-second WhatsApp auto-redirection countdown.

---

### Phase 8: Streamlining, Payment Modernization & Master Documentation
- **Timeline**: September 24, 2026 – September 25, 2026 (Present)
- **Primary Objectives**:
  - Overhaul Home hero section scroll video animation for full-bleed responsive layout without black boxes or pixel tearing.
  - Remove obsolete volume-based price adjustment banners and urgent priority surcharge card from checkout.
  - Remove optional vehicle registration plate field (`LEA-2024`) for frictionless checkout.
  - Standardize delivery SLA label to **"Delivered: Within 45 Mins"**.
  - Modernize Payment Options card with Cash on Delivery (COD for 5L–10L) and instant on-spot digital wallets (JazzCash, Easypaisa, NayaPay, Raast / Bank).
  - Synchronize all 6 educational articles and data files across the codebase.
  - Consolidate all 13 core documentation files into the unified `docs/` hub.
- **Key Deliverables**:
  - Completely responsive, pixel-perfect home hero scroll section.
  - Modernized, scannable payment card with branded digital wallet chips.
  - Comprehensive, synchronized 13-document master suite in `docs/`.
