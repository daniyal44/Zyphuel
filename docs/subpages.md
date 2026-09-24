# Zyphuel Subpages & Article Routing Directory (`subpages.md`)

This document details the architecture, routing mechanism, content structure, and technical specifications for all 6 dedicated subpages (blog articles) in the Zyphuel web application from inception ("start") to the present ("now").

---

## 1. Subpage Routing Architecture

All subpages in the Zyphuel platform are dynamically resolved via React Router DOM through the wildcard pattern:
```jsx
<Route path="/blog/:slug/" element={<BlogPostPage />} />
```
- **Controller Component**: `src/pages/BlogPostPage.jsx`
- **Data Source**: `src/data/articles.js`
- **Static Site Generation (SSG)**: `prerender.js` renders dedicated static HTML pages in `dist/blog/<slug>/index.html` for each article during build time.
- **Dynamic SEO**: `useSEO` custom hook dynamically updates `<title>`, `<meta name="description">`, OpenGraph cards, Twitter cards, and Schema.org `Article` / `BlogPosting` structured JSON-LD graphs.

---

## 2. Master Subpages & Articles Catalog

| ID | Slug | Subpage Title | Category | Author | Published Date | SSG Static Output |
|---|---|---|---|---|---|---|
| 1 | `future-of-fuel-delivery-lahore` | Pakistan’s Shift to Daily Fuel Pricing: OGRA Reform & App Alerts | Zyphuel Energy | Zyphuel Energy Analysis Team | Sept 5, 2026 | `dist/blog/future-of-fuel-delivery-lahore/index.html` |
| 2 | `download-zyphuel-apk-guide` | How to Download & Install Zyphuel APK: Biometrics, GPS & Rate Sync | Zyphuel App & Guides | Zyphuel App Engineering | Sept 23, 2026 | `dist/blog/download-zyphuel-apk-guide/index.html` |
| 3 | `generator-refueling-services-lahore` | Industrial Generator Refueling & Euro-V Diesel Logistics in Lahore | Generator & Utilities | Zyphuel Commercial Ops | Sept 4, 2026 | `dist/blog/generator-refueling-services-lahore/index.html` |
| 4 | `generator-diesel-lpg-delivery-lahore` | Commercial Generator Diesel & Sealed LPG Refills: Safety Standards | Generator & Utilities | Zyphuel Utilities Team | Sept 3, 2026 | `dist/blog/generator-diesel-lpg-delivery-lahore/index.html` |
| 5 | `iot-telemetry-fuel-delivery` | Combating Pump Short-Fueling: Calibrated Meters & Cloud Telemetry | Zyphuel Energy | Zyphuel Telemetry Engineering | Sept 1, 2026 | `dist/blog/iot-telemetry-fuel-delivery/index.html` |
| 6 | `zyphuel-calibrated-telemetry-fleet` | Mobile Energy Logistics in Lahore: CEO Muhammad Daniyal on Scaling | Zyphuel Energy | Muhammad Daniyal (CEO) | Aug 28, 2026 | `dist/blog/zyphuel-calibrated-telemetry-fleet/index.html` |

---

## 3. In-Depth Subpage Specifications

### 3.1 Subpage 1: Pakistan’s Shift to Daily Fuel Pricing
- **Route**: `/blog/future-of-fuel-delivery-lahore/`
- **Key Focus**: In-depth analysis of Pakistan's historic transition from fortnightly price announcements to daily ex-depot rate adjustments based on 7-day rolling international Platts benchmarks.
- **Key Takeaway**: Explains how the Zyphuel 2-hour rate alert daemon notifies users of impending price revisions, allowing motorists to lock in current rates before midnight adjustments take effect.
- **Recent Update (Phase 8)**: Updated delivery SLA to "Delivered: Within 45 Mins", flat Rs. 280 fee, COD for 5L–10L, and instant on-spot digital wallets (JazzCash, Easypaisa, NayaPay, Raast).

### 3.2 Subpage 2: How to Download & Install Zyphuel APK
- **Route**: `/blog/download-zyphuel-apk-guide/`
- **Key Focus**: Complete technical installation manual for the official Android APK (`v2.6.4.0.0.16`, `31.6 MB`).
- **Key Takeaway**: Step-by-step guidance on bypassing Play Store delays, enabling "Install from Unknown Sources", granting GPS permissions, and using biometric fingerprint checkout.
- **Recent Update (Phase 8)**: Added references to rapid 45-minute delivery and flexible payment methods (COD 5L–10L + QR mobile wallets).

### 3.3 Subpage 3: Industrial Generator Refueling
- **Route**: `/blog/generator-refueling-services-lahore/`
- **Key Focus**: Preventing power blackout downtime for surgical hospitals, IT tech parks, and commercial banks during urban load-shedding cycles.
- **Key Takeaway**: Highlights Zyphuel’s 50-meter high-reach delivery hoses capable of refueling rooftop generator sets and underground day-tanks with pure Euro-V low-sulfur diesel.

### 3.4 Subpage 4: Commercial Generator Diesel & Sealed LPG Safety Standards
- **Route**: `/blog/generator-diesel-lpg-delivery-lahore/`
- **Key Focus**: Consumer safety guide contrasting calibrated delivery against hazardous loose jerrycan carrying.
- **Key Takeaway**: Explains hydrostatic pressure checks for LPG cylinders, on-site digital tare scales, and soap-bubble valve testing.
- **Recent Update (Phase 8)**: Synchronized with "Delivered: Within 45 Mins", flat Rs. 280 fee, and COD (5L–10L) + digital wallets.

### 3.5 Subpage 5: Combating Pump Short-Fueling
- **Route**: `/blog/iot-telemetry-fuel-delivery/`
- **Key Focus**: Engineering breakdown of mechanical meter wear and intentional nozzle tampering at retail petrol stations.
- **Key Takeaway**: Explains how Zyphuel’s positive-displacement flow meters with 0.01L optical pulse encoders and Bluetooth telemetry guarantee 100% volumetric accuracy and tamper-evident digital receipts.

### 3.6 Subpage 6: Mobile Energy Logistics & Founder Interview
- **Route**: `/blog/zyphuel-calibrated-telemetry-fleet/`
- **Key Focus**: Founder & CEO Muhammad Daniyal shares the vision and engineering journey of building Lahore’s first tech-enabled mobile fuel delivery network.
- **Key Takeaway**: Explores cloud route dispatch, double-walled mobile micro-tanker engineering, and future horizons for on-demand clean energy.
- **Recent Update (Phase 8)**: Refined operational parameters with "Delivered: Within 45 Mins", flat Rs. 280 fee, COD (5L–10L), and instant digital wallets.
