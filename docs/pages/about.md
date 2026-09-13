# Page Documentation: About Us Page

## Overview & Identity
- **Page Name**: About Us
- **Route**: `/about/`
- **Component File**: `src/pages/AboutPage.jsx`
- **Primary Purpose**: Presents Zyphuel's corporate and operational background, leadership team, mission, technological advantages (such as calibrated flow meters and safety protocols), and the company's trajectory as an agile Pakistani energy tech startup based in Lahore.

---

## SEO & Structured Data
- **Page Title**: `About Zyphuel | Mobile Fuel Delivery in Lahore`
- **Meta Description**: `Learn about Zyphuel, a Lahore-focused mobile fuel delivery platform built to make fuel ordering, delivery and tracking simpler.`
- **Schema Type**: `AboutPage` with embedded `Organization` and `Person` (Muhammad Daniyal - Founder & CEO).

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
     4. **Zyphuel QR Code**: Mobile Application v2.0.4.
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

---

## Operational Parameters & Rules
- **Headquarters**: 75-Main Boulevard, Gulberg III, Lahore.
- **Service Focus**: On-demand mobile refueling for B2C vehicles and B2B generators / fleets.
- **Asset Versioning**: Integrated with `APP_VERSION` from `src/data/appVersion.js`.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-09-12** | Integrated 3D Interactive Card Carousel with 6 leadership and equipment cards. | Modernize visual presentation of team, QR code, and calibrated bowser fleet. |
| **2026-09-08** | Updated executive roles and verified Schema.org Organization metadata. | Strengthen local business trust signals and SEO indexing. |
| **2026-09-05** | Linked dynamic app version references to `APP_VERSION` data constant. | Ensure version numbers stay synchronous across web and mobile downloads. |
