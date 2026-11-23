# App Version Specification

## Source of Truth

**File**: `src/data/appVersion.js`

This single file is the source of truth for all app version numbers displayed across the Zyphuel website and documentation.

## Version Numbers

| Platform | Version | Build | Size | Last Updated |
|----------|---------|-------|------|--------------|
| **Android** | `2.6.4.0.0.41` | `69` | `31.7 MB` | November 10, 2026 |
| **iOS** | `2.6.4.0.0.38` | `66` | `82.3 KB` | November 10, 2026 |

## Dynamic Import Across Pages

All website pages dynamically import version numbers from `src/data/appVersion.js`:

### Android Version (`APP_VERSION`)
- Import: `import { APP_VERSION } from './data/appVersion.js'`
- Display format: `v${APP_VERSION}` (e.g., `v2.6.4.0.0.102`)
- Pages displaying Android version:
  - `HomePage.jsx` - "Download App v${APP_VERSION} →"
  - `AboutPage.jsx` - "Mobile Application v${APP_VERSION}"
  - `BlogListPage.jsx` - "Download the Official Zyphuel Mobile App (v${APP_VERSION})"
  - `BlogArticlePage.jsx` - "Get Zyphuel Mobile for Android (v${APP_VERSION})"
  - `DownloadPage.jsx` - Full version display throughout
  - `ServicesPage.jsx` - Version references

### iOS Version (`IOS_VERSION`)
- Import: `import { IOS_VERSION } from './data/appVersion.js'`
- Display format: `v${IOS_VERSION}` (e.g., `v2.6.4.0.0.38`)
- Pages displaying iOS version:
  - `DownloadPage.jsx` - iOS download card: "Zyphuel for iPhone & iPad • v${IOS_VERSION} • ${IOS_SIZE} • iOS 17.0+ • App Store listing pending"

## Update Procedure

**To update app versions for a new release:**

1. Edit `src/data/appVersion.js`:
   - Update `APP_VERSION` for new Android version (e.g., `'2.6.4.0.0.42'`)
   - Update `IOS_VERSION` for new iOS version (e.g., `'2.6.4.0.0.39'`)
   - Update `APP_SIZE` if Android binary size changed
   - Update `IOS_SIZE` if iOS binary size changed
   - Update `RELEASE_DATE` if applicable
   - Update build numbers (`BUILD_NUMBER`, `IOS_BUILD_NUMBER`)
   - Add changelog entry under appropriate version

2. Rebuild the website:
   - Run `npm run build`
   - All pages automatically reflect the new versions

3. No other files need manual updates:
   - Version numbers are **never hardcoded** in page components
   - All references use dynamic imports from `appVersion.js`
   - SEO metadata, sitemap, and feed.xml auto-sync

## Version History (Chronological)

| Version | Date | Notes |
|---------|------|-------|
| `2.6.4.0.0.41` | Nov 10, 2026 | Production build 69, APK size 31.7 MB, Android 7.0+ |
| `2.6.4.0.0.40` | — | (placeholder) |
| `2.6.4.0.0.39` | — | (placeholder) |
| `2.6.4.0.0.38` | Oct 24, 2026 | Production build 66, iOS 82.3 KB, Android 7.0+ retained |
| `2.6.4.0.0.31` | Oct 13, 2026 | GPS telemetry, Firebase resilience, Android 16 ready |
| `2.6.4.0.0.22` | Oct 4, 2026 | Sub-meter GPS pinning, performance optimization |
| `2.6.4.0.0.16` | Sep 23, 2026 | Startup crash fix, anti-breach safeguards |
| `2.6.4.0.0.10` | Sep 17, 2026 | Core telemetry engine upgrade, live flow-meter optimization |
| `2.6.4.0.0.08` | Sep 14, 2026 | Precision geolocation telemetry, dynamic metering |
| `2.6.2` | Sep 9, 2026 | Real-time invoice engine, high-contrast typography |
| `2.3.0.1` | Sep 5, 2026 | Daily fuel pricing engine, biometric security |
| `1.5.0` | Aug 18, 2026 | Enhanced core telemetry, expanded fleet coverage |
| `1.4.0` | Jul 30, 2026 | Live GPS auto-detection, 2-hour fuel rate push alerts |
| `1.2.0` | Jul 2026 | Smart fleet GPS, instant digital receipts |
| `1.1.0` | May 2026 | Automated scheduled orders, fleet management |

## Compliance

- ✅ All version numbers dynamically resolved from single source file
- ✅ No hardcoded version strings in page components (except template literals)
- ✅ Auto-sync on rebuild - zero manual updates required across pages
- ✅ Consistent display across all 28 SSG routes and 18 articles
- ✅ SEO metadata, sitemap, and feed.xml all reference dynamic versions