# Findings & Technical Investigation

## 1. Test Failure Analysis: "Open the app store link from the download page"
- **Test Observation**:
  - The test attempted to trigger app acquisition from `/download/`.
  - Observed message: `"The download page shows the primary CTA labeled 'Direct APK Download (31.6 MB)'. Clicking the primary download button timed out on two separate attempts and did not open an installer or download dialog. The CTA's direct APK link points to an APK URL but navigating to that URL reported the site as unavailable, so the installer/download target could not be reached."`
- **Root Causes**:
  1. **Synthetic Click Interception**: `onClick={(e) => { e.preventDefault(); handleApkDownload(); }}` created a temporary anchor in memory and cancelled the real anchor's click. In automated headless browsers (Playwright/Puppeteer), synthetic memory clicks don't register as user-initiated downloads, causing the runner to time out waiting for download events.
  2. **Navigation Fallback Failure**: When clicking timed out, the test runner attempted to directly navigate to the button's `href`. In environments where MIME type was missing or server hung on HEAD/unrecognized binary, the browser or HTTP client marked the file as unavailable.
  3. **App Store Badges & Brand Transparency**: Zyphuel has not officially launched on Google Play Store or Apple App Store yet. Creating pseudo-store links that point to an APK or website is deceptive and causes customer complaints. Store badges must strictly remain truthful, non-clickable disabled spans (`.store-badge.disabled`) with 'Launch Soon' and 'Coming Soon'. The primary Direct APK Download button is the sole genuine download mechanism.

## 2. Server & Hosting Response Headers
- **Live Netlify Server**:
  - Endpoint `https://zyphuel.netlify.app/APK/Zyphuel.apk` is live and returns HTTP 200 OK with `content-type: application/vnd.android.package-archive` and `content-disposition: attachment; filename="Zyphuel.apk"`.
- **Local Dev / Preview Server**:
  - Configured `apkServerPlugin` in `vite.config.js` to handle `GET`, `HEAD`, and `OPTIONS` with status 200, correct MIME type, and streaming binary chunks.
  - Tested:
    - `/APK/Zyphuel.apk` -> 200 OK (33,163,653 bytes)
    - `/apk/Zyphuel.apk` -> 200 OK
    - `/zyphuel.apk` -> 200 OK
    - `/download/Zyphuel.apk` -> 200 OK
