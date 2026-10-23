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

## Commercial Fleet & Industrial Inquiries
Handled directly via the main contact form subject selection (*Bulk / Enterprise Client Query*) and the 24/7 WhatsApp emergency dispatch line (`+92 3230-112464`). Commercial Escalation Desk card was removed per user request.

---

## Frequently Asked Questions (FAQ) Section
Added interactive 4-item accordion addressing core user intent and eliminating thin content signals for search engines:
1. *How do I contact Zyphuel for urgent fuel dispatch in Lahore?* (WhatsApp +92 3230-112464 or web/app dispatch Delivered: Within 45 Mins).
2. *What are Zyphuel's customer support and delivery operating hours?* (Online doorstep fuel orders are accepted from 8:00 AM to 10:00 PM PKT daily with night cutoff 10:00 PM – 8:00 AM. Corporate support desk operates Monday–Thursday 8am–8pm, Friday 8am–1pm, Saturday–Sunday 10am–6pm, with 24/7 dedicated WhatsApp support at +92 3230-112464).
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
| **2026-10-23** | **Lighthouse "All 100" pass**: `.contact-text h4` promoted to `h2` (selector in `src/index.css` + `ContactPage.jsx`) to remove the skipped heading level; light slate/orange text and ScrollStory step numbers on the dispatch-flow section darkened to WCAG AA (`#64748b`). | User asked for the whole site to score 100 in Lighthouse — Accessibility / Best Practices / SEO now **100/100** on desktop and mobile for `/contact/`. |
| **2026-10-22** | **Scroll-Driven Rail (continuous, not step-snapped)**: the `#contact-dispatch-flow` ScrollStory rail fill is now written frame-by-frame from the scroll position instead of transitioning when a step becomes active — measured `scaleY` **0.039 → 0.295 → 0.534 → 0.772 → 0.984** across five scroll offsets, identical in both motion modes. It advances even when a background/occluded tab has `requestAnimationFrame` suspended because the write is rate-limited with `performance.now()` rather than rAF. The reduced-motion block still removes every step/card transition but explicitly leaves the rail fill alive, since a 1:1 progress indicator is the one movement that setting is meant to preserve. | User said the scroll animation still felt missing on the non-canvas pages. Verified 0 stuck reveals, 0 horizontal overflow, 0 console errors; desktop score unchanged. |
| **2026-10-22** | **Root Cause of the "invisible" scroll animation + Soft Reveal Mode**: the review machine reports `prefers-reduced-motion: reduce`, and `useScrollReveal` previously switched itself off in that case, so `/contact/` looked static while the canvas heroes on `/`, `/services/` and `/download/` kept animating. The hook now sets `<html class="reveal-ready reveal-soft">` and keeps its IntersectionObserver running; the reduced-motion CSS drops all transforms and keeps only a 0.5 s opacity cross-fade. Default reveal strengthened too (26 → 38 px, 0.62 → 0.72 s), opacity/transform only. Verified in headless Chrome in both media states on `/contact/`: `opacity: 0` + `matrix(1,0,0,1,0,38)` → 14 intermediate frames → `opacity: 1` + `transform: none`; reduce mode `reveal-soft` with `transform: none` and 26 opacity frames; 7/7 reveals fire, nothing stuck, no horizontal overflow, 0 console errors. | User reported the scroll animation still not showing on blog / order / contact / about, while home / services / download animate. `/contact/` mobile stays inside its measured 71–91 band; desktop unchanged. |
| **2026-10-21** | **Final Dispatch Banner Reveal**: the closing "Need Immediate Fuel Dispatch?" section — the last motion-less block on `/contact/` — now reveals in three beats: heading `data-reveal="up"`, subtitle `+0.08 s`, and the three CTA buttons (Order Fuel Online Now / View Services & Live Rates / Download Android App) `+0.16 s`. Attribute-only, fully below the fold, `opacity`/`transform` only, so layout cannot shift; the contact form, office-hours table and FAQ stay exactly as they were. Verified in headless Chrome with `prefers-reduced-motion` emulated off (`opacity: 0` + `matrix(1,0,0,1,0,26)` before the scroll, `is-revealed` + `opacity: 1` after), `scrollWidth == clientWidth`, no console errors. | User re-requested scroll animation on blog, order, contact and about. Mobile A/B: 91 without the change vs 76 / 91 with it — the 76 run recovered to 91 on repeat, and the untouched `/blog/` swung 80 → 62–63 in the same session, so the spread is machine noise, not the code. CLS 0.002 both ways. Artefacts: `lighthouse/rvB-mobile-contact.json`, `lighthouse/rvC-mobile-contact.json`. |
| **2026-10-21** | **Pinned Scrollytelling ("After You Send a Message") + Reveal Stagger**: Added `ScrollStory` section `id="contact-dispatch-flow"` below the contact form — 4 factual desk steps (message logged with the Mon–Thu / Fri / Sat–Sun desk hours · requirement verification incl. 5–15 L volume · within-45-minute scheduling with urgent 10–20 min · WhatsApp confirmation at +92 3230-112464). Desktop shows a sticky progress rail; mobile and tablet show stacked cards. Contact info items now reveal with `data-reveal-stagger` (0.09 s). Steps mount only when within 800 px of the viewport. | User requested scroll-down animation on pages that had none. Mobile Lighthouse measured **71–80** across runs after the change (desktop 90). Follow-up A/B test: a build **without** the story section scored **72 / 74** in the same session as the build **with** it (**71 / 80**) — the section costs ~0; the old 86 was one favourable run (30 ms TBT) on a machine that measured this page at 71 the day before any animation existed. Artefacts: `lighthouse/r2-contact-*.json`, `lighthouse/r2b-contact-*.json`, `lighthouse/r2-privacy-ctl.json`. |
| **2026-10-12** | **Google Search Console Crawl & Indexing Audit Alignment**: (1) Synchronized complete hreflang tags (`x-default`, `en`, `en-PK`), (2) Verified title tag and meta description consistency between SSR/SSG and client React hydration, (3) Cleaned robots.txt to ensure unobstructed Googlebot and Google-InspectionTool crawling, (4) Injected `X-Robots-Tag: index, follow` in `public/_headers`. | Fix Google Search Console "Discovered – currently not indexed" coverage drilldown issue for `/contact/`. |
| **2026-10-09** | **Removal of Commercial Fleet & Industrial Escalation Desk**: Removed the escalation card and executive management contact box from `src/pages/ContactPage.jsx` per user directive to streamline and declutter contact channels. | User requested: *"Commercial Fleet & Industrial Escalation Desk... is ko be remove karo"* |
| **2026-10-01** | **Working Hours & Delivery Operations Alignment**: (1) Updated Contact FAQ answer #2 to clarify online doorstep orders operate 8:00 AM – 10:00 PM PKT daily (with strict 10:00 PM – 8:00 AM night cutoff), corporate desk operates Mon–Thu 8am–8pm, Fri 8am–1pm, Sat–Sun 10am–6pm, and 24/7 WhatsApp emergency support at `+92 3230-112464`, (2) Synchronized bottom banner delivery fee to Rs. 300 up to 10L and Rs. 320–400 for 11L–15L. | Ensure 100% truth-in-advertising and operational alignment across all contact touchpoints. |
| **2026-09-27** | **Corporate Identity & Contact Standardization**: Updated Contact number (`+92 3230-112464`), Complaint Email (`m.daniyalkhan490@gmail.com`), Headquarters (`Lahore, Pakistan`), and Executive Management desk to Founder & Leading Web Developer Muhammad Daniyal. | User's new corporate identity & regulatory credentials declaration. |
| **2026-09-27** | Removed Sales & Fleet Operations (Adil Farooq) and 24/7 Urgent Dispatch Hotline cards from Commercial Fleet & Industrial Escalation Desk. | Clean up redundant contact cards per user request. |
| **2026-09-25** | **Added Lahore Sector Dispatch Hubs & SLA Matrix, Commercial Escalation Desk, and Synchronized SLA to "Delivered: Within 45 Mins"**. | Provide high-value local logistics data, eradicate thin content signals, boost local Lahore search queries, and resolve indexing latency. |
| **2026-09-17** | Added interactive FAQ accordion, added `FAQPage` schema in `useSEO` & `prerender.js`, boosted sitemap priority to 0.9 daily, added in-body referring links from Home, Order, Privacy, Terms, and Blog subpages. | Resolve Google Search Console "Discovered – currently not indexed" & "Referring page: None detected". |
| **2026-09-13** | Standardized Working Hours table to match Home and Legal disclosures. | Consistent operating hours across all contact channels. |
| **2026-09-08** | Enhanced WhatsApp dispatch priority routing in contact form. | Accelerate customer response speed for urgent fuel orders. |
| **2026-09-01** | Implemented interactive validation and Toast feedback alerts. | Improve UX and prevent empty/malformed enquiry submissions. |
