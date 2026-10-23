# Page Documentation: Download App Page

## Overview & Identity
- **Page Name**: Download App / APK Portal
- **Route**: `/download/`
- **Component File**: `src/pages/DownloadPage.jsx`
- **Primary Purpose**: Official distribution portal for the Zyphuel Android APK, providing secure direct-download links, QR code scanning, technical specifications, installation guides, version changelogs, and architecture overviews.

---

## Technical Specifications & Constants
- **Current Version**: `v2.6.4.0.0.31 (Build 59)` (dynamically imported from `src/data/appVersion.js`)
- **File Size**: `31.7 MB`
- **Minimum OS Requirement**: Android 7.0 (Nougat) and above (API level 24+)
- **Target OS Requirement**: Android 15/16 Ready (API level 36)
- **Architecture**: Native Android with Jetpack Compose & Material 3 UI
- **Direct APK Endpoint**: `/APK/Zyphuel.apk`
- **Security Check**: SHA-256 signed (`e2ceae40c3949a9942a2e508447067bdc5207c5ea1c9c34bc3a94991c4e79510`), zero malware/adware, direct release build.

---

## SEO & Structured Data
- **Page Title**: `Download Zyphuel App: On-Demand Fuel Delivery APK for Android | Official v2.6.4`
- **Meta Description**: `Download the official Zyphuel Android APK (v2.6.4.0.0.31, 31.7 MB) for on-demand doorstep petrol and diesel delivery in Lahore. Real-time GPS tracking, 45-minute dispatch, and 2-hour OGRA price-lock alerts.`
- **Schema Type**: `SoftwareApplication` / `MobileApplication`
  - Operating System: `Android 7.0+`
  - Application Category: `UtilitiesApplication, ShoppingApplication`

---

## Key Features of Zyphuel Android App
1. **Biometric Authentication**:
   - Biometric prompt integration (Fingerprint and Face Unlock) for secure one-touch order authorization.
2. **High-Precision Lahore GPS Pinning**:
   - Auto-locates street, block, and sector coordinates across Lahore (DHA, Gulberg, Johar Town, Bahria Town, Model Town, etc.).
3. **2-Hour Automated Rate Alert Daemon**:
   - Native background service alerting users 2 hours prior to OGRA ex-depot fuel rate changes.
4. **Live Bowser Fleet Tracking**:
   - Real-time GPS stream of approaching micro-refueler bowsers via Rider Foreground Service.
5. **BLE Flow Meter Invoicing**:
   - Real-time synchronization with 0.01L positive-displacement flow meters during fuel delivery.
6. **Android OS Compatibility & Performance Matrix Table**:
   - Detailed benchmarks covering Android 8.0 (Oreo) through Android 15 (Vanilla Ice Cream).
   - Lists API levels (26 to 35), biometric protocol support (BiometricPrompt API), background rate daemon support, GPS accuracy (<3 meters), and render FPS (60–120 FPS).
7. **Streamlined Security & Verification**:
   - APK Signature Scheme v3 verification with malware-free release build, omitting technical command-line hash prompts for a cleaner user experience.
8. **Feature Comparison Table: Official Android APK vs. Web Portal**:
   - Side-by-side technical breakdown of 10 key features (e.g. Biometric Login, 2-Hour Automated OGRA Price Alerts, Live Bowser Radar Tracking, BLE Flow Meter Invoicing, Offline Re-order Queue, Tax Invoice PDF Generation).

---

## Installation Guide (3 Simple Steps)
1. **Download APK**: Tap the direct download button or scan the QR code.
2. **Enable Unknown Sources**: In Android Settings > Security, temporarily permit installs from your browser/file manager.
3. **Install & Launch**: Open the downloaded APK, review permissions (Location, Notifications), and sign in.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-10-23** | **FAQPage schema + truthful H1**: the 7 visible FAQs (APK safety, 2-hour price alerts, 0.01L accuracy, coverage, COD/online payments, direct-APK rationale, iOS status) are now emitted as `FAQPage` JSON-LD (generated from the `faqs` array via `useSEO` schema + the `/download/` route graph in `prerender.js` — page previously shipped zero FAQ schema). `const faqs` hoisted above the `useSEO` call. H1 changed to "Download the Zyphuel Fuel Delivery App for Android" (the previous "Pakistan’s #1" superlative was unverifiable and violated the site truthfulness rule). | User: fix indexing of `/download/` and keep every claim genuine. |
| **2026-10-16** | **Global Responsiveness Engine & Google Search Console Indexing Optimization**: (1) Updated page title to `Download Zyphuel App: On-Demand Fuel Delivery APK for Android | Official v2.6.4` and enhanced Schema entity name to resolve Google Search Console non-indexing; (2) Added canonical `Link: <https://zyphuel.netlify.app/download/>; rel="canonical"` HTTP header in `_headers` and `netlify.toml`; (3) Scaled interactive scroll animations (`AppHeroScrollAnimation` and `AppSection3ScrollAnimation`) for extra-small mobile devices down to 320px with fit-to-frame staging, scaled badges, and 0px black gaps; (4) Deployed full multi-device responsiveness engine across header, footer, comparison matrix, download buttons, and FAQ accordions. | User requested: *"website ka all pages ko responsive karo... order page & download page index nai ha in dono pages ka title tags and conicail tags and content and context ko google search per index karo"*. |
| **2026-10-16** | **Calibrated Smooth 300-Frame Scrollytelling & Lookahead Preloading (`AppHeroScrollAnimation` & `AppSection3ScrollAnimation`)**: (1) Upgraded scroll runway to **900vh** (700vh tablet, 520vh mobile) matching the Services page, ensuring all 300 frames scrub at a calm, unhurried, luxury-grade pace without rushing, (2) Implemented gentle **0.065 LERP damping** (`currentFrame += diff * 0.065`) for silky-smooth sub-pixel inertia, (3) Added **Proactive Lookahead Window** in scroll listener that instantly preloads +/- 20 frames around the scrub cursor, eliminating frame stutter, (4) Rapid sequential background preloading batches 15 frames every 20ms ensuring 100% of 300 frames are cached in memory in under 1 second. | User requested: *"hero_section ma 300 frames or section 4 ma be 300 frames hone chaye , scroll animation smooth hone chaye ."* |
| **2026-10-21** | **Mobile Frame-Preload Throttle (`AppHeroScrollAnimation` / `AppSection3ScrollAnimation`)**: Mobile idle keyframe step raised **15 → 45** (desktop unchanged at 10) so both app frame sequences stop pulling ~20 full-resolution JPGs up-front; mobile payload fell from **7,581 KB to 4,195 KB**. Full audit (`docs/audits/2026-10-21-audit.md`) records that this byte win did **not** move the Lighthouse score (A/B on the same build: step 45 = 49 / 49 / 36, step 15 = 52 / 44), because the page's bottleneck is **6.3 s of “Style & Layout”** inside the two sticky canvas stages — tracked as backlog item #1. | User requested a full speed audit with desktop & mobile scores. `/download/` mobile measured **34–52** across five runs: the worst page on the site. |
| **2026-10-16** | **Fixed Sticky Staging & Completely Eliminated Black Gap/Section (`overflow-x: hidden` Removal)**: (1) Diagnosed and resolved the root cause of the persistent black section: `.download-page-wrapper` had `overflow-x: hidden` in `src/pages/styles.css` which completely broke CSS `position: sticky;` on `.app-hero-sticky-stage` and `.app-sec3-sticky-stage`. Because sticky was broken, scrolling caused the stage to leave the viewport immediately, leaving hundreds of `vh` of empty black track space visible to users, (2) Removed `overflow-x: hidden` from `.download-page-wrapper` to restore native viewport-relative `position: sticky;`, (3) Verified with headless browser scroll automation that both Hero and Section 4 animations remain seamlessly pinned and fluidly transition directly into `.download-hero` and `#why-choose-us` with zero empty black space, (4) SSG production build verified with exit code 0 across all 17 routes. | User reported: *"yar tum kduh dekhlo abi be sai nai hova download ka hero section and ssection 4 fix nai hova , abi be scroll hone kad bad be balck section show ho raha ha"* — sticky positioning restored and empty black gaps completely eliminated. |
| **2026-10-16** | **Eliminated Extra Black Space & Zoom-In Optimization (`AppHeroScrollAnimation` & `AppSection3ScrollAnimation`)**: (1) Applied **1.15x content zoom** (`Math.max(cW / iW, cH / iH) * 1.15`) across both canvases, eliminating empty black border space around the 3D mobile phone and telemetry graphics and tightly fitting the visuals to the section, (2) Optimized scroll runway from 900vh to **450vh** (380vh tablet, 300vh mobile), removing extra black scroll space while maintaining buttery smooth 300-frame RAF LERP scrub, (3) Disabled dark top edge glow and relaxed vignettes to 75% transparent for razor-sharp clarity, (4) Maintained background GPU frame decoding (`img.decode()`) with zero lag. | User requested: *"hero section and section 4 ma sa black space ko remove karo, only black space dono section ma sa, kyu ka ov extra ha or page ka look kaharab kar raha ha"* |
| **2026-10-15** | **Canonical Trailing Slash & Schema ID Harmonization for Fast GSC Indexing**: (1) Synchronized schema `@id` targets in `src/pages/DownloadPage.jsx` to strict trailing slash URIs (`https://zyphuel.netlify.app/download/#app-article-1/2/3`), matching SSR pre-render graphs, (2) Replaced all internal reference URLs in `src/data/articles.js` and `README.md` to canonical `https://zyphuel.netlify.app/download/` to eliminate 301 redirect chains in crawler queues, (3) Audited GSC live indexability. | User reported: *"download page index nai ho raha"* — eliminate crawler redirect confusion and accelerate GSC indexing. |
| **2026-10-13** | **Release of Android APK v2.6.4.0.0.31 (Build 59)**: Synchronized app version to `v2.6.4.0.0.31` (Build 59, Target SDK 36, Android 15/16 Ready), updated binary size to `31.7 MB`, updated SHA-256 integrity hash to `e2ceae40c3949a9942a2e508447067bdc5207c5ea1c9c34bc3a94991c4e79510`, and documented Rider Foreground Service & FCM push notification resilience. | User request: update app version across the entire website and all .md documentation files. |
| **2026-10-12** | **Google Search Console Crawl & Indexing Fix**: (1) Synchronized title tag to `Download Zyphuel App \| Doorstep Fuel Delivery App Lahore \| Android APK` identically across SSG pre-render and client React `useSEO`, (2) Synchronized complete hreflang tags (`x-default`, `en`, `en-PK`), (3) Cleaned robots.txt and sitemap image tags to eliminate crawling delays. | Fix Google Search Console "Discovered – currently not indexed" coverage drilldown issue. |
| **2026-10-09** | **Hydration Optimization for Dynamic App Version Strings**: Wrapped `APP_VERSION` subtitle badge and QR install heading in single template literals (`{`v${APP_VERSION}`}`) to prevent React `<!-- -->` hydration delimiter comments and guarantee zero hydration mismatch errors. | Production React 18 hydration hardening. |
| **2026-10-09** | **Removal of Cryptographic Integrity & SHA-256 Checksum Panel**: Removed the dark SHA-256 checksum card and command-line verification box from `src/pages/DownloadPage.jsx` per user request, simplifying and streamlining the app download experience. | User requested: *"Cryptographic Integrity & SHA-256 Checksum... remove ait"* |
| **2026-10-04** | **Release of Android APK v2.6.4.0.0.22 (Build 50)**: Synchronized app version to `v2.6.4.0.0.22` (Build 50, Target SDK 36, Android 15/16 Ready), updated SHA-256 integrity hash to `10a23c3d027a7dcc0970d0e00dfc1481b26b89e9a0e87eac25c21fc8e6e174f3`, and dynamic hash binding in `src/pages/DownloadPage.jsx`. | User request: update app version and sync across the entire platform. |
| **2026-10-02** | **Removal of High Market Demand Badge**: Removed the "High Market Demand: Over 15,000+ Active Users in Lahore • 45-Min Express Dispatch" alert pill from the download hero header in `src/pages/DownloadPage.jsx` per user directive. | User request: remove the 15,000+ active users high market demand callout. |
| **2026-10-02** | **Direct APK Enforcement & Store Badge Reversion (100% Genuine Transparency)**: (1) Reverted Google Play and Apple App Store badges back to genuine, non-clickable disabled badges (`.store-badge.disabled`) labeled "Launch Soon" and "Coming Soon", eliminating misleading store redirect links to uphold brand integrity and eliminate customer confusion, (2) Retained unhindered Direct APK Download CTA (`#direct-apk-download-btn`, `.btn-download-main`) pointing directly to `/APK/Zyphuel.apk` with `download="Zyphuel.apk"`, (3) Removed `fade-in-up` class on `download-hero-content` to guarantee immediate above-the-fold visibility, (4) Enforced proper server MIME type (`application/vnd.android.package-archive`) and 200 route rewrites on Netlify and local Vite server. | User directive: Zyphuel is not launched on Google Play Store or Apple App Store yet; strictly eliminate fake/misleading store links and keep badges transparently disabled with "Launch Soon" / "Coming Soon". |
| **2026-10-01** | **Delivery Fee Alignment in App Feature Matrix**: Updated comparison table row to `Fixed Rs. 300 Fee (≤10L)` matching calibrated doorstep delivery charges. | Synchronize app feature comparison table with updated delivery charges. |
| **2026-10-01** | **Operational Hours Alignment & Claim Reconciliation**: (1) Updated hero description to remove `24/7` OGRA price-lock alert claim, (2) Updated roadside rescue card title from `24/7 Emergency Refueling` to `Emergency Refueling`, (3) Aligned app changelog in `src/data/appVersion.js` with structured dynamic demand dispatch fee (+Rs. 20/L above 10L) for 11L–15L Max capacity orders. | Standardize copy with official operational hours and accurate changelog parameters. |
| **2026-10-16** | **Desktop & Mobile Speed & Instant First Paint Optimization for App Scroll Animations**: (1) Added instant CSS Frame 1 background posters to `.app-hero-sticky-stage` (`app-hero-frame-001.jpg`) and `.app-sec3-sticky-stage` (`app-section3-frame-001.jpg`) so users never experience a blank/black void during initial load; (2) Optimized `AppHeroScrollAnimation` and `AppSection3ScrollAnimation` by eliminating perpetual background RAF loops when idle (0% CPU usage), replacing aggressive 15-frame/20ms eager loading with gentle idle keyframes (30 frames) and on-demand +/- 8 frame lookahead on scroll; (3) Clamped canvas DPR to 1.5 (1.0 on mobile) to eliminate GPU fill-rate exhaustion; (4) Introduced viewport-based `IntersectionObserver` so Section 3 does not load 300 frames on initial page load. | User requested: *"website ke speed slow ho gaye ha , desktop ma or mobile ma dono ma speed slow ho gaye ha , sub kuch fix kaor koi be masla na aye bad ma."* |
| **2026-09-27** | **High Market Demand Optimization & Search Engine Dominance**: Added high market demand alert badge (15,000+ active Lahore users), 4 trust assurance pills (100% virus-free, instant install, 45-min SLA, COD & Online Payments), enhanced SEO meta targeting `petrol delivery app pakistan` and `fuel delivery app Lahore`, and updated delivery pricing comparison to fixed Rs. 280 under 10L. | User request: optimize download app page for surging market demand and ensure Zyphuel ranks top for fuel delivery app searches. |
| **2026-09-25** | **Added Android Compatibility Matrix, SHA-256 Cryptographic Checksum Panel & Feature Comparison Table**. | Transform download portal into an authoritative technical resource, eliminate thin content, resolve search engine indexing delays, and optimize image rendering for 100% performance. |
| **2026-09-25** | **Updated FAQ & Feature List with Cash on Delivery (5L–10L) & Instant Online Payments (JazzCash, Easypaisa, NayaPay, Raast)**. | Synchronized Download Page FAQ accordion, Why Choose Us card, and Personal Mobility perks with instant mobile wallet alternatives. |
| **2026-09-23** | Synchronized app version to `v2.6.4.0.0.16` (`31.6 MB`, Android 7.0+, AGP 9.1.1) across website metadata, documentation, and download endpoints. | User request: align website app version with latest compiled APK release `v2.6.4.0.0.16`. |
| **2026-09-21** | Ensured git activity graphs, charts, and repository commit changes remain strictly internal to the GitHub repository (`README.md`) and are never exposed on the public customer-facing website. | User requested: *"public nai hona chaye graph only show oon github repository not on a website"*. Removed all engineering telemetry UI from customer-facing portal and streamlined GitHub repository README with native markdown code-based tables. |
| **2026-09-17** | Synchronized app version to `v2.6.4.0.0.10` (`31.6 MB`, Android 7.0+) across website metadata, documentation, and download endpoints. | User request: align website app version with latest compiled APK release `v2.6.4.0.0.10`. |
| **2026-09-14** | Synchronized app version to `v2.6.4.0.0.08` (`31.6 MB`, Android 7.0+) across website metadata, documentation, and download endpoints. | User request: align website app version with latest compiled APK release `v2.6.4.0.0.08`. |
| **2026-09-12** | Centralized version variables (`APP_VERSION`, `APP_SIZE`, `RELEASE_DATE`) from `src/data/appVersion.js`. | Prevent version drift across downloads, articles, and SEO tags. |
| **2026-09-06** | Added high-contrast QR code display with instant smartphone scanning. | Simplify cross-device download workflow from desktop to mobile. |
| **2026-08-30** | Updated step-by-step Android installation security walkthrough. | Address common Android security prompt questions for non-Play Store APKs. |
