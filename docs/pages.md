# Zyphuel Primary Pages Directory & Functional Architecture (`pages.md`)

This document provides a comprehensive technical and functional catalog of all 11 primary pages in the Zyphuel web application from inception ("start") to the present ("now").

---

## Master Primary Page Registry

| # | Page Name | Route | Source Component | Key Purpose | SSG Pre-rendered |
|---|---|---|---|---|---|
| 1 | **Home** | `/` | `src/pages/HomePage.jsx` | Landing hero, scroll animation, live rates ticker, quick order CTA | Yes (`dist/index.html`) |
| 2 | **Order Fuel** | `/order/` | `src/pages/OrderPage.jsx` | 5-step checkout, volume stepper (5L–15L), live invoice, WhatsApp link | Yes (`dist/order/index.html`) |
| 3 | **Services** | `/services/` | `src/pages/ServicesPage.jsx` | B2C vs B2B service tabs, Euro-V specs, operational pipeline, FAQs | Yes (`dist/services/index.html`) |
| 4 | **About Us** | `/about/` | `src/pages/AboutPage.jsx` | Company origin story, leadership profiles, 3D carousel, safety standards | Yes (`dist/about/index.html`) |
| 5 | **Download App** | `/download/` | `src/pages/DownloadPage.jsx` | Direct APK download (`v2.6.4`), QR install, technical architecture | Yes (`dist/download/index.html`) |
| 6 | **Contact Us** | `/contact/` | `src/pages/ContactPage.jsx` | Direct inquiry form, office vs delivery hours, Google Maps location | Yes (`dist/contact/index.html`) |
| 7 | **Blog Listing** | `/blog/` | `src/pages/BlogListPage.jsx` | Editorial catalog, category search, read times, featured articles | Yes (`dist/blog/index.html`) |
| 8 | **Privacy Policy** | `/privacy/` | `src/pages/PrivacyPolicyPage.jsx` | Legal privacy terms, GPS data handling, user consent terms | Yes (`dist/privacy/index.html`) |
| 9 | **Terms of Use** | `/terms/` | `src/pages/TermsOfUsePage.jsx` | Commercial conditions, COD rules (≤10L), safety disclaimers | Yes (`dist/terms/index.html`) |
| 10 | **HTML Sitemap** | `/sitemap/` | `src/pages/HtmlSitemapPage.jsx` | Human-readable site index with categorized internal links | Yes (`dist/sitemap/index.html`) |
| 11 | **404 Not Found** | `/404.html` | `src/pages/NotFoundPage.jsx` | Error recovery view with quick navigation back to Home and Order | Yes (`dist/404.html`) |

---

## Detailed Page Breakdown

### 1. Home Page (`/`)
- **Component**: `src/pages/HomePage.jsx`
- **Key Sections**:
  - **Hero Section**: Full-bleed responsive video scroll animation without black framing bars or pixel distortion.
  - **Persistent Transparency Card**: Sole location of the startup transparency statement (*"Not a corporate giant — just an agile startup..."*).
  - **Live Marquee Rate Ticker**: Real-time display of Super Petrol, Diesel, and High-Octane rates including the retail pump markup.
  - **Quick Refuel Selector**: Direct entry into order flow with preset fuel chips.
  - **Value Proposition Grid**: 4 cards highlighting 0.01L digital meters, Euro-V terminal purity, 45-minute delivery, and safety grounding.
  - **Customer Testimonials**: Verified feedback from daily drivers, generator owners, and fleet operators.
- **Evolution**: Refactored in Phase 8 to make the scroll video animation completely responsive across mobile and desktop without pixel tearing.

### 2. Order Fuel Page (`/order/`)
- **Component**: `src/pages/OrderPage.jsx`
- **Key Sections**:
  - **Step 1 (Fuel Grade)**: 3 fuel cards (Super Petrol, Euro-V Diesel, High-Octane 97) with live pump rates.
  - **Step 2 (Refueling Target)**: 5 target application cards (`Car/SUV`, `Motorbike`, `Generator`, `Machinery`, `Storage Drum`).
  - **Step 3 (Volume Stepper)**: Clamped strictly between 5L min and 15L max with presets `[5, 7, 10, 12, 15]`.
  - **Step 4 (Delivery Details & Speed)**: Address input and standard delivery speed card displaying `Delivered: Within 45 Mins` and flat Rs. 280 fee.
  - **Step 5 (Contact & Payment)**: Modernized payment card highlighting Cash on Delivery (5L–10L) and instant on-spot digital wallets (JazzCash, Easypaisa, NayaPay, Raast / Bank).
  - **Post-Order Modal**: Corporate tax invoice presentation with instant vector PDF download and 3s WhatsApp auto-redirect countdown.
  - **Anti-Spam Guard**: 15-minute duplicate order detection modal.
- **Evolution**: Evolved from early prototype to full corporate tax invoice with pure vector jsPDF and Dual Verification (Camera QR + Code 128). Purged obsolete 50L bulk texts, vehicle plate field, and urgent surcharge card.

### 3. Services Page (`/services/`)
- **Component**: `src/pages/ServicesPage.jsx`
- **Key Sections**:
  - **Interactive B2C vs B2B Tabs**: Dedicated views for consumer vehicle refueling vs commercial generator diesel logistics.
  - **Hero Rate Pill**: Live rates and green badge stating `Delivered: Within 45 Mins`.
  - **Service Scope & What We Do NOT Do**: Explicit guarantees against open jerrycans, substandard fuel, and uncalibrated meters.
  - **6-Stage Operational Pipeline**: Step-by-step visual workflow from order placement to grounded dispensing and settlement.
  - **Service FAQs**: Answers clarifying delivery speed, flow meter calibration, and COD + digital wallet options.
  - **Interactive 3D Bookshelf**: Embedded library iframe (`https://bookssection.netlify.app/`).
- **Evolution**: Purged unavailable LPG and water cards to prevent unfulfillable orders; updated SLA badge to "Delivered: Within 45 Mins".

### 4. About Us Page (`/about/`)
- **Component**: `src/pages/AboutPage.jsx`
- **Key Sections**:
  - **Origin Story Narrative**: Muhammad Daniyal's vision of eliminating pump queues and blackout downtime.
  - **Interactive 3D Card Carousel**: 6 cards highlighting executive team, micro-bowser trucks, and direct app QR code.
  - **Executive Profiles**: Detailed biographies for Founder Muhammad Daniyal and Operations Lead Adil Farooq.
  - **Safety & Regulatory Credentials**: OGRA License, NTN, SECP registration, and terminal compliance proofs.
- **Evolution**: Centralized versioning, removed redundant startup disclaimer callouts, updated article highlights.

### 5. Download Mobile App Page (`/download/`)
- **Component**: `src/pages/DownloadPage.jsx`
- **Key Sections**:
  - **Direct APK Download**: Primary download button for `Zyphuel.apk` (`v2.6.4.0.0.16`, `31.6 MB`).
  - **Instant QR Scan**: High-contrast QR code for instant desktop-to-mobile APK download.
  - **Step-by-Step Android Setup**: Clear walkthrough for enabling unknown sources and granting permissions.
  - **Why Choose Mobile App**: Highlights 2-hour rate alert daemon, biometric checkout, and BLE flow meter sync.
  - **Technical Architecture Grid**: Package name, minimum SDK (Android 7.0+), architecture, and SHA-256 integrity proofs.
- **Evolution**: Synchronized with latest production APK build `v2.6.4.0.0.16` and updated FAQ to include COD (5L–10L) & digital wallets.

### 6. Contact Us Page (`/contact/`)
- **Component**: `src/pages/ContactPage.jsx`
- **Key Sections**:
  - **Direct Inquiry Form**: State-controlled contact form with validation and toast alerts.
  - **Hotline & Dispatch Links**: Direct telephone and WhatsApp links to `+92 3230-112464`.
  - **Operating Hours Table**: Clear distinction between physical office hours and 24/7 delivery operations.
  - **Google Maps Embed**: Interactive map displaying headquarters at 75-Main Boulevard, Gulberg III, Lahore.
- **Evolution**: Standardized phone numbers, office hours, and delivery SLAs across all copy.

### 7. Blog Listing Page (`/blog/`)
- **Component**: `src/pages/BlogListPage.jsx`
- **Key Sections**:
  - **Search & Filter Bar**: Real-time article title and summary filtering.
  - **Category Tabs**: Filter by *All*, *Zyphuel Energy*, *Zyphuel App & Guides*, and *Generator & Utilities*.
  - **Article Cards**: Image, category badge, publication date, reading time estimate, and summary snippet.
- **Evolution**: Dynamically powered by `src/data/articles.js`, ensuring instant synchronization when articles are updated.

### 8. Privacy Policy Page (`/privacy/`)
- **Component**: `src/pages/PrivacyPolicyPage.jsx`
- **Key Sections**:
  - Data collection scope (GPS coordinates for dispatch, phone number for order verification).
  - Data retention rules and strict non-sharing commitment with third-party advertisers.
  - User rights under local and international data protection standards.

### 9. Terms of Use Page (`/terms/`)
- **Component**: `src/pages/TermsOfUsePage.jsx`
- **Key Sections**:
  - Fuel order capacity rules (strictly 5L–15L per doorstep dispatch).
  - Cash on Delivery policy (restricted to orders ≤10L; advance payment required for 11L–15L).
  - On-spot digital wallet acceptance terms (JazzCash, Easypaisa, NayaPay, Raast).
  - Delivery SLA disclaimers and safety compliance responsibilities for generator owners.

### 10. HTML Sitemap Page (`/sitemap/`)
- **Component**: `src/pages/HtmlSitemapPage.jsx`
- **Key Sections**:
  - Categorized list of all 17 public URLs across Main Pages, Services, Mobile App, Legal, and Educational Articles.
  - Includes route URLs, descriptions, and dynamic links for both search engines and human visitors.

### 11. 404 Not Found Page (`/404.html`)
- **Component**: `src/pages/NotFoundPage.jsx`
- **Key Sections**:
  - Animated error graphic with clear message explaining the page has moved or does not exist.
  - Quick recovery buttons directing users to Home or Order Fuel.
