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
| **Helpline Phone** | `+92 3230-112464` | 24/7 Priority Support |
| **WhatsApp Direct** | `https://wa.me/923230112464` | Immediate Dispatch Coordination |
| **Email Support** | `m.daniyalkhan490@gmail.com` | Enterprise & Corporate Accounts |
| **Physical Hub** | 75-Main Boulevard, Gulberg III, Lahore | Operations & Fleet Terminal |

---

## Operating Schedule & Office Hours

| Department | Schedule | Status |
| :--- | :--- | :--- |
| **Monday – Thursday** | 8:00 AM – 8:00 PM | Office & Administration Open |
| **Friday** | 8:00 AM – 1:00 PM | Friday Office Hours |
| **Saturday – Sunday** | 10:00 AM – 6:00 PM | Weekend Office Desk Open |
| **Fleet Dispatch & Delivery** | **24/7 / 365 Days** | **Always Active** |

---

## Frequently Asked Questions (FAQ) Section
Added interactive 4-item accordion addressing core user intent and eliminating thin content signals for search engines:
1. *How do I contact Zyphuel for urgent fuel dispatch in Lahore?* (WhatsApp +92 3230-112464 or web/app dispatch in 15–30 mins).
2. *What are Zyphuel's customer support and delivery operating hours?* (Fleet 24/7/365; office Monday–Thursday 8am–8pm, Friday 8am–1pm, weekends 10am–6pm).
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
| **2026-09-17** | Added interactive FAQ accordion, added `FAQPage` schema in `useSEO` & `prerender.js`, boosted sitemap priority to 0.9 daily, added in-body referring links from Home, Order, Privacy, Terms, and Blog subpages. | Resolve Google Search Console "Discovered – currently not indexed" & "Referring page: None detected". |
| **2026-09-13** | Standardized office hours table to match Home and Legal disclosures. | Consistent operating hours across all contact channels. |
| **2026-09-08** | Enhanced WhatsApp dispatch priority routing in contact form. | Accelerate customer response speed for urgent fuel orders. |
| **2026-09-01** | Implemented interactive validation and Toast feedback alerts. | Improve UX and prevent empty/malformed enquiry submissions. |
