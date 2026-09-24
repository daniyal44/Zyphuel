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
- **Word Count**: 1,150+ words (Authoritative Pillar Guide)
- **Key Focus**: In-depth analysis of Pakistan's historic transition from fortnightly price announcements to daily ex-depot rate adjustments based on 7-day rolling international Platts benchmarks.
- **Architectural Enhancements (Phase 9)**: Key Takeaways box (AEO/GEO executive summary), OGRA Pricing Framework Evolution Table, CIF Platts import parity formula breakdown, expert quote by CEO Muhammad Daniyal, and 5 Schema.org `FAQPage` items.
- **Recent Update (Phase 8 & 9)**: Delivered: Within 45 Mins, flat Rs. 280 fee, COD for 5L–10L, and instant on-spot digital wallets (JazzCash, Easypaisa, NayaPay, Raast).

### 3.2 Subpage 2: How to Download & Install Zyphuel APK
- **Route**: `/blog/download-zyphuel-apk-guide/`
- **Word Count**: 1,050+ words (Authoritative Pillar Guide)
- **Key Focus**: Complete technical installation manual for the official Android APK (`v2.6.4.0.0.16`, `31.6 MB`).
- **Architectural Enhancements (Phase 9)**: Key Takeaways box, Android OS Compatibility & Performance Matrix Table (Android 8.0 to Android 15), SHA-256 verification instructions, mobile engineering quote, and 5 Schema.org FAQs.
- **Recent Update (Phase 8 & 9)**: Rapid 45-minute delivery, COD (5L–10L) + QR mobile wallets, and explicit image dimensions for 100% performance.

### 3.3 Subpage 3: Industrial Generator Refueling
- **Route**: `/blog/generator-refueling-services-lahore/`
- **Word Count**: 1,100+ words (Authoritative Pillar Guide)
- **Key Focus**: Preventing power blackout downtime for surgical hospitals, IT tech parks, and commercial banks during urban load-shedding cycles.
- **Architectural Enhancements (Phase 9)**: Key Takeaways box, Standby Generator Diesel Consumption Benchmarks Table by kVA rating (10kVA to 250kVA), 50m high-reach delivery hose specs, commercial ops quote, and 5 Schema.org FAQs.

### 3.4 Subpage 4: Commercial Generator Diesel & Sealed LPG Safety Standards
- **Route**: `/blog/generator-diesel-lpg-delivery-lahore/`
- **Word Count**: 1,050+ words (Authoritative Pillar Guide)
- **Key Focus**: Consumer safety guide contrasting calibrated delivery against hazardous loose jerrycan carrying.
- **Architectural Enhancements (Phase 9)**: Key Takeaways box, Multi-Utility Product Specifications & Safety Standards Table, 4-point on-site inspection protocol, utilities team quote, and 5 Schema.org FAQs.
- **Recent Update (Phase 8 & 9)**: Synchronized with "Delivered: Within 45 Mins", flat Rs. 280 fee, and COD (5L–10L) + digital wallets.

### 3.5 Subpage 5: Combating Pump Short-Fueling
- **Route**: `/blog/iot-telemetry-fuel-delivery/`
- **Word Count**: 1,150+ words (Authoritative Pillar Guide)
- **Key Focus**: Engineering breakdown of mechanical meter wear and intentional nozzle tampering at retail petrol stations.
- **Architectural Enhancements (Phase 9)**: Key Takeaways box, Traditional Petrol Pump Dispenser vs Zyphuel Calibrated IoT Bowser Comparison Table, Automatic Temperature Compensation (ATC at 15°C) analysis, telemetry lead quote, and 5 Schema.org FAQs.

### 3.6 Subpage 6: Mobile Energy Logistics & Founder Interview
- **Route**: `/blog/zyphuel-calibrated-telemetry-fleet/`
- **Word Count**: 1,150+ words (Authoritative Pillar Guide)
- **Key Focus**: Founder & CEO Muhammad Daniyal shares the vision and engineering journey of building Lahore’s first tech-enabled mobile fuel delivery network.
- **Architectural Enhancements (Phase 9)**: Key Takeaways box, Traditional Brick-and-Mortar Petrol Stations vs Zyphuel Mobile Fleet Comparison Table, ASTM A36 double-walled tank specs, direct executive perspective, and 5 Schema.org FAQs.
- **Recent Update (Phase 8 & 9)**: Refined operational parameters with "Delivered: Within 45 Mins", flat Rs. 280 fee, COD (5L–10L), and instant digital wallets.
