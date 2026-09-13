# Page Documentation: Home Page

## Overview & Identity
- **Page Name**: Home
- **Route**: `/`
- **Component File**: `src/pages/HomePage.jsx`
- **Primary Purpose**: Main landing portal for Zyphuel. Welcomes users, establishes brand credibility, highlights Euro-V certified fuel delivery, live dispatch GPS, Lahore coverage zones, 3D bowser model, real-time live fuel prices ticker, recent fuel articles, and office/delivery hours.

---

## SEO & Structured Data
- **Page Title**: `Doorstep Fuel Delivery in Lahore | Fast Petrol & Diesel | Zyphuel`
- **Meta Description**: `Order certified Euro-V petrol, diesel, and generator fuel delivered directly to your doorstep in Lahore within 15-45 minutes. Calibrated digital flow meters, OGRA rates, and live GPS tracking.`
- **Schema Type**: `LocalBusiness` / `OfferCatalog` / `PostalAddress`
  - Address: 75-Main Boulevard, Gulberg III, Lahore, Punjab 54000, PK
  - Coordinates: Latitude `31.507534`, Longitude `74.334949`
  - Founder: Muhammad Daniyal (Founder & CEO)
  - Helpline / Phone: `+92 3230-112464`

---

## Key Sections & Components
1. **Hero Section**:
   - Headline: Certified Euro-V Fuel & Energy Logistics Delivered Directly to Your Doorstep in Lahore.
   - Live Telemetry Badges: `98% Calibrated Flow Meter`, `Active Dispatch GPS`, `Lahore Hub #01 (0.01L Meter Calibrated)`.
   - **Startup Transparency Box**: Dedicated badge stating: *"Startup Transparency: Zyphuel is currently an early-stage startup operating in Lahore, not a large corporation. All orders receive personalized care and dedicated direct dispatch."*
   - CTA Buttons: Order Fuel Now (`/order/`), Download APK (`/download/`), Contact Helpline.
   - Interactive Hero Graphic (`src/components/HeroGraphic.jsx`).

2. **Live Fuel Rates Ticker**:
   - Left-to-Right smooth infinite CSS marquee showing live prices for Super Petrol Euro-5, Hi-Cetane Euro-5 Diesel, High-Octane 97, and LPG Cylinder Gas.

3. **3D Interactive Bowser Showcase**:
   - Three.js / Canvas interactive 3D model refueler bowser (`src/components/Carousel3D.jsx`).

4. **Service Value Pillars**:
   - 0.01L Positive-Displacement Digital Flow Meter Calibration.
   - Rapid 15–45 Minute Lahore Dispatch.
   - Certified Euro-V Low-Sulfur Quality.
   - 24/7 Generator & Emergency Support.

5. **Lahore Coverage Sectors**:
   - DHA Lahore (Phases 1–9), Gulberg (I–III), Johar Town & Faisal Town, Bahria Town Lahore, Model Town & Garden Town, Cantt & Cavalary Ground, Industrial Zones (Sundar & Kot Lakhpat).

6. **Office & Delivery Schedule Card**:
   - Prominently placed box displaying operational schedule:
     - **Monday – Thursday**: 8:00 AM – 8:00 PM
     - **Friday**: 8:00 AM – 1:00 PM
     - **Saturday – Sunday**: 10:00 AM – 6:00 PM
     - **Delivery (24/7)**: Always Active (Green active glowing indicator)

7. **Featured Blog / Guides Section**:
   - Categorized article cards with instant modal preview and deep links to `/blog/`.

---

## Operational Parameters & Rules
- **Delivery Service**: 24 hours / 7 days a week always active across Lahore.
- **Office Operating Schedule**: Mon–Thu 8am–8pm, Fri 8am–1pm, Sat–Sun 10am–6pm.
- **Service Hub Location**: Gulberg III, Lahore.
- **Transparency Policy**: Single persistent startup declaration in Hero; redundant copies on child pages avoided.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-09-13** | Added dedicated Office Hours & 24/7 Delivery schedule box. | User requested explicit office timings (Mon–Thu 8am–8pm, Fri 8am–1pm, Sat–Sun 10am–6pm, Delivery 24/7 Always Active) on Home page. |
| **2026-09-13** | Maintained single Startup Transparency box exclusively on Home hero. | User instructed to keep startup transparency notice visible once without repeating across subsequent screens. |
| **2026-09-13** | Left-to-Right price ticker animation added and synced. | User requested dynamic left-to-right marquee movement for fuel rates. |
| **2026-09-10** | Integrated 3D bowser showcase and enhanced mobile responsive grid. | Elevate visual experience and brand credibility. |
