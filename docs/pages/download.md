# Page Documentation: Download App Page

## Overview & Identity
- **Page Name**: Download App / APK Portal
- **Route**: `/download/`
- **Component File**: `src/pages/DownloadPage.jsx`
- **Primary Purpose**: Official distribution portal for the Zyphuel Android APK, providing secure direct-download links, QR code scanning, technical specifications, installation guides, version changelogs, and architecture overviews.

---

## Technical Specifications & Constants
- **Current Version**: `v2.6.4.0.0.10` (dynamically imported from `src/data/appVersion.js`)
- **File Size**: `31.6 MB`
- **Minimum OS Requirement**: Android 7.0 (Nougat) and above (API level 24+)
- **Architecture**: Native Android with Jetpack Compose & Material 3 UI
- **Direct APK Endpoint**: `/APK/Zyphuel.apk`
- **Security Check**: SHA-256 signed, zero malware/adware, direct release build.

---

## SEO & Structured Data
- **Page Title**: `Download Zyphuel APK v2.6.4.0.0.10 | Lahore On-Demand Fuel App`
- **Meta Description**: `Download official Zyphuel Android APK (v2.6.4.0.0.10, 31.6 MB). Order certified Euro-V petrol & diesel in Lahore with live GPS tracking, 2-hour rate alerts, and biometric security.`
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
6. **Code-Based Engineering & Git Activity Dashboard (`GitActivityDashboard.jsx`)**:
   - 100% native React code-based telemetry dashboard replacing static `.svg` images.
   - **Interactive Velocity Chart**: SVG-based financial-style trading chart with live cursor tracking, crosshairs, and volume histogram.
   - **52-Week Contribution Matrix**: 364-cell interactive DOM heatmap with hover tooltips displaying date and commit volume.
   - **Searchable Commits Ledger**: Real-time keyword filter, type chips (`feat`, `fix`, `chore`, `release`), author tags, and direct clickable links to GitHub commits.
   - **Unified Cockpit Layout**: 4 KPI cards (Total Commits, Active Days, Peak Daily Burst, Release Version) and multi-timeframe toggles (`1M`, `3M`, `ALL`).

---

## Installation Guide (3 Simple Steps)
1. **Download APK**: Tap the direct download button or scan the QR code.
2. **Enable Unknown Sources**: In Android Settings > Security, temporarily permit installs from your browser/file manager.
3. **Install & Launch**: Open the downloaded APK, review permissions (Location, Notifications), and sign in.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-09-21** | Built and integrated 100% code-based Git Activity & Changes Dashboard (`GitActivityDashboard.jsx`); generated structured telemetry (`src/data/gitTelemetry.json`); eliminated static `.svg` image popups; integrated interactive TradingView velocity chart, 52-week contribution matrix, and searchable commit ledger. | User requested: *"repo changes chart,graphs,activities and changes why these not not showing and when user click on its show on .svg image , that's not looks real it current show as image , kindly fix this"*, *"graph chnages chart code base hona chaye na ka image base ok"*. Replaced static `.svg` image links with fully interactive React component with live crosshairs, hover tooltips, timeframe filters, and direct links to GitHub commits. |
| **2026-09-17** | Synchronized app version to `v2.6.4.0.0.10` (`31.6 MB`, Android 7.0+) across website metadata, documentation, and download endpoints. | User request: align website app version with latest compiled APK release `v2.6.4.0.0.10`. |
| **2026-09-14** | Synchronized app version to `v2.6.4.0.0.08` (`31.6 MB`, Android 7.0+) across website metadata, documentation, and download endpoints. | User request: align website app version with latest compiled APK release `v2.6.4.0.0.08`. |
| **2026-09-12** | Centralized version variables (`APP_VERSION`, `APP_SIZE`, `RELEASE_DATE`) from `src/data/appVersion.js`. | Prevent version drift across downloads, articles, and SEO tags. |
| **2026-09-06** | Added high-contrast QR code display with instant smartphone scanning. | Simplify cross-device download workflow from desktop to mobile. |
| **2026-08-30** | Updated step-by-step Android installation security walkthrough. | Address common Android security prompt questions for non-Play Store APKs. |
