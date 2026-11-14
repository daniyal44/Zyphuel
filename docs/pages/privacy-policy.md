# Page Documentation: Privacy Policy Page

## Overview & Identity
- **Page Name**: Privacy Policy
- **Route**: `/privacy/`
- **Component File**: `src/pages/PrivacyPolicyPage.jsx`
- **Primary Purpose**: Outlines Zyphuel's data privacy commitments, personal data collection practices (GPS coordinates, contact details, payment information), telemetry handling, compliance with Pakistani laws and global privacy principles, and user data rights.

---

## SEO & Structured Data
- **Page Title**: `Privacy Policy | Zyphuel Fuel Delivery`
- **Meta Description**: `How Zyphuel collects, uses, and protects your personal data when you order fuel delivery in Lahore through our website and Android app.`
- **Schema Type**: `WebPage`

---

## Policy Sections & Architecture
1. **Introduction**: Principles of data minimization and purpose limitation.
2. **Information We Collect**:
   - Order Information: Name, phone number, physical address in Lahore.
   - Geolocation Data: Precise GPS location during live dispatch.
   - Telemetry Data: Meter serials, fuel liters dispensed, transaction timestamps.
   - Device Data: Device model, OS version (Android APK).
3. **How We Use Information**:
   - Routing micro-refuelers to the exact delivery pin.
   - Calculating digital invoices and meter calibration proofs.
   - Broadcasting 2-hour price rate alerts.
4. **Data Security & Storage**:
   - TLS 1.3 encryption in transit, AES-256 at rest.
   - Biometric data (Fingerprint/Face Unlock) stays strictly on-device in Android KeyStore.
5. **Sharing & Third-Party Disclosure**:
   - No sale or unauthorized monetization of user data.
   - Minimal sharing with logistics dispatch riders for order fulfillment.
6. **User Rights**:
   - Right to access, rectify, or request deletion of personal account records.
7. **Cookies & Tracking**:
   - Strictly necessary cookies for theme, session state, and order carts.
8. **Contact & Legal Support**:
   - Official Contact Desk: Link to `/contact/` (Direct phone/WhatsApp access consolidated strictly to the Contact page).
   - Email: `m.daniyalkhan490@gmail.com`
   - Hub Address: Lahore, Pakistan
   - Operating Schedule: Desk Support: Mon–Thu 8am–8pm, Fri 8am–1pm, Sat–Sun 10am–6pm | Online Doorstep Orders: 8:00 AM – 10:00 PM Daily | WhatsApp Helpline: 24/7.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-10-23** | **Heading order fix**: legal sidebar titles demoted from `h3` to `h2` (`.legal-sidebar-title` selector + `PrivacyPolicyPage.jsx`) so no levels are skipped. | Lighthouse Accessibility audit — `/privacy/` Accessibility / Best Practices / SEO **100/100**. |
| **2026-10-01** | **Schedule Specification**: Updated Section 8 contact disclosure to delineate corporate desk hours, online doorstep order window (8:00 AM – 10:00 PM Daily), and 24/7 WhatsApp emergency assistance. | Maintain unified operational transparency across privacy policies. |
| **2026-09-27** | Removed direct phone number display; routed to official Contact Page. | User requested: *"contact page ka elova mera phone number kise be or page per show nai hona chaye"*. Replaced raw phone number text with direct link to official Contact Page (`/contact/`) to consolidate personal telephone numbers exclusively to the designated contact gateway. |
| **2026-09-13** | Updated Contact disclosure with standardized Working Hours schedule. | Ensure complete consistency across all legal disclosures and homepage. |
| **2026-09-04** | Added explicit Android Biometric KeyStore local authentication privacy clause. | Clarify that biometric data never leaves user devices. |
| **2026-08-25** | Published comprehensive privacy policy for web and mobile launch. | Legal compliance for digital commerce in Pakistan. |

---

## 2026-10-26 — SEO / AEO / GEO Hardening (Privacy Policy)

- **Social card (OG/Twitter)**: every page now ships `/images/og-cover.jpg` (1920x1080, 57 KB) with **truthful** `og:image:width/height` read from the real asset at build time. Previously `og:image` pointed at `logo.png` (432x616) while the markup claimed 1200x630 — a false declaration that produced cropped/broken link previews on WhatsApp, LinkedIn, Facebook and X.
- **Entity consolidation**: `LocalBusiness` is now a single entity with `@id` `#localbusiness` (and `parentOrganization` → `#organization`) across static HTML, footer and client hydration. Added `openingHoursSpecification` (Mon–Thu 8–8, Fri 8–1, Sat–Sun 10–6), `contactPoint`, `currenciesAccepted: PKR` and `paymentAccepted`.
- **Removed false signals**: LPG and Water Tanker offers dropped from `hasOfferCatalog` (both services are unavailable), the invalid `SearchAction` pointing at a non-existent `?q=` search was removed, and the stale LPG/water keyword list was cleaned.
- **AEO**: the home page FAQ schema survives hydration again (18 questions mirrored from the visible Q&A hub) instead of being wiped when `useSEO` rebuilt the graph.

---

## 2026-11-15 — Social preview card (Privacy Policy)

- **New card**: `/images/og-social-card.jpg` — 1200×630 (1.91:1), 83 KB JPEG, rendered from a branded layout: Zyphuel flame logo on a white plate, `LAHORE · PAKISTAN`, headline “Doorstep Petrol & Diesel Delivery in Lahore in 45 Mins”, pills `Within 45 Mins` / `0.01L Calibrated Meters` / `Cash on Delivery`, footer `zyphuel.netlify.app` and `+92 3230-112464`.
- **Why a new filename**: The previous card (`/images/og-cover.jpg`, 1920×1080, unbranded nozzle photo) was technically valid but had no logo or name, and Facebook/WhatsApp had cached it — shares kept showing a generic or blank preview. Shipping the card under a **new filename** invalidates that cached preview without changing the markup contract.
- **Tags for /privacy/**: `image_src`, `og:image`, `og:image:url`, `og:image:secure_url`, `og:image:type` (`image/jpeg`), `og:image:width` (`1200`), `og:image:height` (`630`), `og:image:alt`, `twitter:image`, `twitter:image:src` and `twitter:image:alt` all resolve to the new card. Verified in the built `dist/privacy/index.html`.
- **Content unchanged**: legal text, canonicals and schema are identical; only the preview card reference moved.
- **Unchanged**: page copy, pricing (5–15 L, Rs. 300–400 ladder, +Rs. 5.00/L markup), the single 45-minute window, 10:00 PM order cutoff and the schema graph.
