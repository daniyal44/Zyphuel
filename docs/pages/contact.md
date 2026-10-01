# Page Documentation: Contact Us Page

## Overview & Identity
- **Page Name**: Contact Us / Customer Support
- **Route**: `/contact/`
- **Component File**: `src/pages/ContactPage.jsx`
- **Primary Purpose**: Direct communication hub allowing customers, commercial fleet managers, and industrial generator operators to reach Zyphuel via phone, WhatsApp, email, or an interactive multi-field contact form.

---

## SEO & Structured Data
- **Page Title**: `Contact Zyphuel | Fuel Delivery Support in Lahore`
- **Meta Description**: `Reach Zyphuel for fuel orders, generator diesel, and commercial fleet accounts in Lahore. Call, WhatsApp, or send an enquiry — support available 24/7 in English and Urdu.`
- **Schema Type**: `ContactPage` / `LocalBusiness` / `FAQPage`
  - Telephone: `+92 3230-112464`
  - Email: `m.daniyalkhan490@gmail.com`
  - Address: `75-Main Boulevard, Gulberg III, Lahore`
  - Available Languages: `English`, `Urdu`
  - FAQ Entities: 4 key questions covering urgent dispatch, office & delivery hours, Gulberg location, and bulk commercial credit accounts.
- **Sitemap Priority**: `0.9` (`daily` change frequency).
- **Self-referential Canonical**: `https://zyphuel.netlify.app/contact/`

---

## Operational Contact Coordinates

| Channel | Details / Link | Availability |
| :--- | :--- | :--- |
| **Contact number** | `+92 3230-112464` | 24/7 Priority Support & WhatsApp Live Dispatch |
| **WhatsApp Direct** | `https://wa.me/923230112464` | Immediate Dispatch Coordination |
| **Complaint Email** | `m.daniyalkhan490@gmail.com` | Complaints, Corporate Inquiries & Support |
| **Headquarters** | Lahore, Pakistan | Central Operations Command |

---

## Operating Schedule & Working Hours

| Department | Schedule | Status |
| :--- | :--- | :--- |
| **Monday – Thursday** | 8:00 AM – 8:00 PM | Office & Administration Open |
| **Friday** | 8:00 AM – 1:00 PM | Friday Working Hours |
| **Saturday – Sunday** | 10:00 AM – 6:00 PM | Weekend Office Desk Open |
| **Helpline & Emergency Support** | **24/7 Availability** | **Active on WhatsApp (`+92 3230-112464`)** |

---

## Lahore Sector Dispatch Hubs & SLA Matrix
Comprehensive sector coverage table indicating micro-depot locations, dispatch SLAs, supported fuels, and payment options:
| Sector / Zone | Micro-Depot Location | Delivery SLA | Available Fuels | Payment Modes |
| :--- | :--- | :--- | :--- | :--- |
| **DHA Lahore (Phases 1–9)** | Phase 5 Commercial Sector Hub | Delivered: Within 45 Mins | Euro-V Petrol, Hi-Cetane Diesel | Cash on Delivery (5L–10L), JazzCash, Easypaisa, NayaPay, Raast |
| **Gulberg (I, II, III)** | Central Hub (75-Main Boulevard) | Delivered: Within 30 Mins | Euro-V Petrol, Diesel, HOBC 97 | Cash on Delivery (5L–10L), Mobile Wallets, Bank Transfer |
| **Johar Town & Faisal Town** | Sector G-3 Micro-Dispatch Base | Delivered: Within 45 Mins | Euro-V Petrol, Diesel | COD (5L–10L), JazzCash, Easypaisa, Raast |
| **Model Town & Garden Town** | Model Town Link Road Point | Delivered: Within 40 Mins | Euro-V Petrol, Hi-Cetane Diesel | COD (5L–10L), Online Payments, Raast |
| **Bahria Town & Canal Road** | Talwar Chowk Quick Dispatch | Delivered: Within 45 Mins | Euro-V Petrol, Generator Diesel | COD (5L–10L), Mobile Wallets, Online Bank |

---

## Commercial Fleet & Industrial Escalation Desk
Dedicated operational contact points for institutional stakeholders:
- **Executive Management Desk**: Corporate accounts, bulk facility fuel procurement, and compliance (`m.daniyalkhan490@gmail.com`).
- **Bulk Depot Dispatch & Metering**: Industrial tanker orders and flow meter calibration certificates.
- **Corporate Compliance & Invoicing**: SECP, OGRA, and STRN compliant tax invoices.

---

## Frequently Asked Questions (FAQ) Section
Added interactive 4-item accordion addressing core user intent and eliminating thin content signals for search engines:
1. *How do I contact Zyphuel for urgent fuel dispatch in Lahore?* (WhatsApp +92 3230-112464 or web/app dispatch Delivered: Within 45 Mins).
2. *What are Zyphuel's customer support and delivery operating hours?* (Doorstep refueling fleet and office support operate during official working hours: Monday–Thursday 8am–8pm, Friday 8am–1pm, Saturday–Sunday 10am–6pm, with 24/7 dedicated WhatsApp support at +92 3230-112464).
3. *Where is Zyphuel's corporate office located in Lahore?* (75-Main Boulevard, Gulberg III, Lahore).
4. *Can corporate clients setup bulk commercial credit accounts?* (Yes, monthly consolidated invoicing and telemetry).

---

## Contact Form Architecture
- **Fields**:
  - Full Name (required)
  - Email Address (required, email regex validated)
  - Phone Number (required, PK phone format)
  - Subject Dropdown:
    - *Bulk / Enterprise Client Query*
    - *Standby Generator Fuel Contract*
    - *LPG Commercial Supply*
    - *General Feedback / Support*
  - Preferred Contact Method (WhatsApp / Phone Call / Email)
  - Message Details (required)
- **Validation & Feedback**:
  - Client-side field validation with contextual error tooltips.
  - Toast notification confirmation upon submission via `ToastContext`.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-10-01** | **Bottom Banner Delivery Pricing Alignment**: Updated bottom CTA banner to reflect `Rs. 300 fixed ≤10L` delivery fee. | Synchronize Contact Page bottom banner with updated delivery fee calibration. |
| **2026-10-01** | **Working Hours & Delivery Operations Alignment**: (1) Reconciled Contact FAQ answer #2 to clarify doorstep fleet operates during official working hours (Mon–Thu 8am–8pm, Fri 8am–1pm, Sat–Sun 10am–6pm), (2) Updated schedule table status to highlight 24/7 WhatsApp emergency helpline coverage. | Ensure 100% truth-in-advertising and operational alignment across all contact touchpoints. |
| **2026-09-27** | **Corporate Identity & Contact Standardization**: Updated Contact number (`+92 3230-112464`), Complaint Email (`m.daniyalkhan490@gmail.com`), Headquarters (`Lahore, Pakistan`), and Executive Management desk to Founder & Leading Web Developer Muhammad Daniyal. | User's new corporate identity & regulatory credentials declaration. |
| **2026-09-27** | Removed Sales & Fleet Operations (Adil Farooq) and 24/7 Urgent Dispatch Hotline cards from Commercial Fleet & Industrial Escalation Desk. | Clean up redundant contact cards per user request. |
| **2026-09-25** | **Added Lahore Sector Dispatch Hubs & SLA Matrix, Commercial Escalation Desk, and Synchronized SLA to "Delivered: Within 45 Mins"**. | Provide high-value local logistics data, eradicate thin content signals, boost local Lahore search queries, and resolve indexing latency. |
| **2026-09-17** | Added interactive FAQ accordion, added `FAQPage` schema in `useSEO` & `prerender.js`, boosted sitemap priority to 0.9 daily, added in-body referring links from Home, Order, Privacy, Terms, and Blog subpages. | Resolve Google Search Console "Discovered – currently not indexed" & "Referring page: None detected". |
| **2026-09-13** | Standardized Working Hours table to match Home and Legal disclosures. | Consistent operating hours across all contact channels. |
| **2026-09-08** | Enhanced WhatsApp dispatch priority routing in contact form. | Accelerate customer response speed for urgent fuel orders. |
| **2026-09-01** | Implemented interactive validation and Toast feedback alerts. | Improve UX and prevent empty/malformed enquiry submissions. |
