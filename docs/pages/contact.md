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
- **Schema Type**: `ContactPage` / `LocalBusiness`
  - Telephone: `+92 3230-112464`
  - Email: `m.daniyalkhan490@gmail.com`
  - Address: `75-Main Boulevard, Gulberg III, Lahore`
  - Available Languages: `English`, `Urdu`

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
| **2026-09-13** | Standardized office hours table to match Home and Legal disclosures. | Consistent operating hours across all contact channels. |
| **2026-09-08** | Enhanced WhatsApp dispatch priority routing in contact form. | Accelerate customer response speed for urgent fuel orders. |
| **2026-09-01** | Implemented interactive validation and Toast feedback alerts. | Improve UX and prevent empty/malformed enquiry submissions. |
