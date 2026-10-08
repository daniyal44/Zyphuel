# Page Documentation: Download App Page

## Overview & Identity
- **Page Name**: Download App / APK Portal
- **Route**: `/download/`
- **Component File**: `src/pages/DownloadPage.jsx`
- **Primary Purpose**: Official distribution portal for the Zyphuel Android APK, providing secure direct-download links, QR code scanning, technical specifications, installation guides, version changelogs, and architecture overviews.

---

## Technical Specifications & Constants
- **Current Version**: `v2.6.4.0.0.22 (Build 50)` (dynamically imported from `src/data/appVersion.js`)
- **File Size**: `31.6 MB`
- **Minimum OS Requirement**: Android 7.0 (Nougat) and above (API level 24+)
- **Target OS Requirement**: Android 15/16 Ready (API level 36)
- **Architecture**: Native Android with Jetpack Compose & Material 3 UI
- **Direct APK Endpoint**: `/APK/Zyphuel.apk`
- **Security Check**: SHA-256 signed (`10a23c3d027a7dcc0970d0e00dfc1481b26b89e9a0e87eac25c21fc8e6e174f3`), zero malware/adware, direct release build.

---

## SEO & Structured Data
- **Page Title**: `Download Zyphuel APK v2.6.4.0.0.22 | Lahore On-Demand Fuel App`
- **Meta Description**: `Download official Zyphuel Android APK (v2.6.4.0.0.22, 31.6 MB). Order certified Euro-V petrol & diesel in Lahore with live GPS tracking, 2-hour rate alerts, and biometric security.`
- **Schema Type**: `SoftwareApplication` / `MobileApplication`
  - Operating System: `Android 7.0+`
  - Application Category: `UtilitiesApplication` / `BusinessApplication`

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
| **2026-10-09** | **Removal of Cryptographic Integrity & SHA-256 Checksum Panel**: Removed the dark SHA-256 checksum card and command-line verification box from `src/pages/DownloadPage.jsx` per user request, simplifying and streamlining the app download experience. | User requested: *"Cryptographic Integrity & SHA-256 Checksum... remove ait"* |
| **2026-10-04** | **Release of Android APK v2.6.4.0.0.22 (Build 50)**: Synchronized app version to `v2.6.4.0.0.22` (Build 50, Target SDK 36, Android 15/16 Ready), updated SHA-256 integrity hash to `10a23c3d027a7dcc0970d0e00dfc1481b26b89e9a0e87eac25c21fc8e6e174f3`, and dynamic hash binding in `src/pages/DownloadPage.jsx`. | User request: update app version and sync across the entire platform. |
| **2026-10-02** | **Removal of High Market Demand Badge**: Removed the "High Market Demand: Over 15,000+ Active Users in Lahore • 45-Min Express Dispatch" alert pill from the download hero header in `src/pages/DownloadPage.jsx` per user directive. | User request: remove the 15,000+ active users high market demand callout. |
| **2026-10-02** | **Direct APK Enforcement & Store Badge Reversion (100% Genuine Transparency)**: (1) Reverted Google Play and Apple App Store badges back to genuine, non-clickable disabled badges (`.store-badge.disabled`) labeled "Launch Soon" and "Coming Soon", eliminating misleading store redirect links to uphold brand integrity and eliminate customer confusion, (2) Retained unhindered Direct APK Download CTA (`#direct-apk-download-btn`, `.btn-download-main`) pointing directly to `/APK/Zyphuel.apk` with `download="Zyphuel.apk"`, (3) Removed `fade-in-up` class on `download-hero-content` to guarantee immediate above-the-fold visibility, (4) Enforced proper server MIME type (`application/vnd.android.package-archive`) and 200 route rewrites on Netlify and local Vite server. | User directive: Zyphuel is not launched on Google Play Store or Apple App Store yet; strictly eliminate fake/misleading store links and keep badges transparently disabled with "Launch Soon" / "Coming Soon". |
| **2026-10-01** | **Delivery Fee Alignment in App Feature Matrix**: Updated comparison table row to `Fixed Rs. 300 Fee (≤10L)` matching calibrated doorstep delivery charges. | Synchronize app feature comparison table with updated delivery charges. |
| **2026-10-01** | **Operational Hours Alignment & Claim Reconciliation**: (1) Updated hero description to remove `24/7` OGRA price-lock alert claim, (2) Updated roadside rescue card title from `24/7 Emergency Refueling` to `Emergency Refueling`, (3) Aligned app changelog in `src/data/appVersion.js` with structured dynamic demand dispatch fee (+Rs. 20/L above 10L) for 11L–15L Max capacity orders. | Standardize copy with official operational hours and accurate changelog parameters. |
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
