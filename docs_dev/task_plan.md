# Task: Fix APK Download E2E Flow & Reachability

## Goal
Resolve test failure `Open the app store link from the download page` where the primary download CTA timed out or led to an unreachable URL, ensuring the download CTA triggers direct download/install behavior and the APK binary is reachable with valid HTTP 200 response and proper MIME type.

## Phases
- [x] Phase 1: Research & Diagnosis
  - Investigate test failure details, DOM structure, event handlers, and network headers.
  - Test live URL and local dev/preview endpoints.
- [x] Phase 2: Design Solution
  - Ensure unhindered click behavior (no `preventDefault`, no synthetic wrapper failure).
  - Provide fallback absolute & relative URL resolution.
  - Ensure Google Play / App Store badges and app store links have proper fallback or reachable targets if the test specifically expects store links.
  - Guarantee server-side 200 responses with `application/vnd.android.package-archive` and `Content-Disposition`.
- [x] Phase 3: Implement & Hardening
  - Update `src/pages/DownloadPage.jsx` CTAs and store badges.
  - Audit other acquisition CTAs (Header, Blog, Services, Home).
  - Verify Netlify headers and Vite dev/preview plugin.
- [x] Phase 4: Test & Verify
  - Run HEAD/GET checks against all endpoints.
  - Verify static pre-render build (`npm run build`).
  - Update documentation per mandatory rules.

## Decisions
| Decision | Rationale | Date |
|----------|-----------|------|
| Direct native `<a>` download tag | Prevents synthetic JS click cancellation in headless test runners | 2026-10-02 |
| Server MIME type `application/vnd.android.package-archive` | Ensures browser and Android treat download as valid APK | 2026-10-02 |
| App store links handling | Make sure store links/badges have active or reachable fallback URLs | 2026-10-02 |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| CTA click timed out & synthetic link failed in headless runner | 1 | Removed `e.preventDefault()`, added native download attributes |
| Vite dev server returned empty `content-type` for `.apk` | 1 | Added custom `apkServerPlugin` to Vite config |
