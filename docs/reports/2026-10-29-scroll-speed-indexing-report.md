# Zyphuel — Scroll Animation, Production Speed & Indexing Report

**Report date:** 2026-10-29  
**Scope:** Five scroll-canvas heroes, remote page response, reported unindexed URLs, and Home operating-hours wording  
**Environment:** Local checkout inspection plus direct `fetch` samples and browser session against `https://zyphuel.netlify.app/`  
**Status:** Source changes are local until committed/pushed and deployed. No Google indexing or rank change is claimed.

## Executive summary

- Found and fixed a frame-display race in all **five** canvas animations: the RAF easing loop could settle while the target image was still loading, and no later repaint was scheduled. One shared loader now deduplicates preload/lookahead requests and repaints the current target on image load.
- The Home 3D carousel had `loading="lazy"` tags, but all 39 image `src`s were still assigned while its section was far below the fold. The component now waits until its section is near view and assigns image URLs only for visible carousel cards. Also removed two Home copy remnants (“Express Local Response”, “Priority gated-community”) that contradicted the permanent single 45-minute delivery window.
- The Home schedule showed daily online order intake and support-desk weekday/weekend hours in one list without dividing labels. These are two different schedules, not contradictory hours. The card now labels each separately and retains 24/7 only for WhatsApp emergency help.
- Live page requests all returned HTTP 200, but had variable uncached TTFB from 131 ms to 1,392 ms. This makes production feel slower than localhost can reproduce; the measurement includes network/CDN/edge time and is not a Lighthouse score.
- The supplied `D:\Games\httpszyphuel.netlify.app-Coverage-2026-10-28` and `...Performance-on-Search-2026-10-28` directories are not accessible from this workspace. The checked-in report summarizing those exports is available and is cited below. Current live HTML and sitemap were independently checked.
- Search engines decide whether to crawl/index and how to rank. An HTTP 200, canonical URL, sitemap entry, or code change cannot guarantee indexing, citywide visibility, or top position for every keyword.

## 1. Scroll animation root cause and source fixes

Each of the five hero/feature canvas components used an on-demand RAF loop that stops when its interpolation reaches the target. The renderer falls back to a nearby already-loaded frame when the requested image is not ready. Before this fix, the requested image's `onload` had no repaint callback, so the canvas could remain on a stale fallback until another scroll event. Also, some paths built separate image loaders for progressive preload and scroll lookahead, risking duplicate requests for the same frame.

The following components now use the same `requestFrame` callback for preload and lookahead and repaint the current target only once that exact target image is complete:

- `src/components/ScrollAnimationSection.jsx` (Home hero)
- `src/components/AppHeroScrollAnimation.jsx` (Download hero)
- `src/components/AppSection3ScrollAnimation.jsx` (Download feature stage)
- `src/components/ServicesScrollAnimationSection.jsx` (Services hero)
- `src/components/ServicesSection3ScrollAnimation.jsx` (Services feature stage)

This is a source-level root-cause fix. A fresh production build and browser scroll verification are still required before calling it verified in a deployed environment.

## 2. Why production feels slower than localhost

### Direct production HTTP sample

Three no-cache `fetch` requests were made per canonical route. `TTFB` here is elapsed time to response headers; total is elapsed time through the response body. This is not a Lighthouse run, and Node fetch timings are not directly comparable to browser paint or field Core Web Vitals.

| Route | Status (all 3) | TTFB range | Total response range | HTML size |
|---|---:|---:|---:|---:|
| `/` | 200 | **139–1,392 ms** | 617–1,820 ms | 137,044 bytes |
| `/services/` | 200 | **148–525 ms** | 402–976 ms | 106,196 bytes |
| `/download/` | 200 | **131–339 ms** | 732–1,557 ms | 98,973 bytes |
| `/order/` | 200 | **244–632 ms** | 966–1,454 ms | 123,502 bytes |

Observed response headers included `Cache-Control: public,max-age=0,must-revalidate` and `Server: Netlify`. The variation points to network/edge revalidation and response-path variability as one contributor; it does not prove Netlify is the only cause.

### Browser observation

The live browser task's `/` navigation timed out twice. In a separate open page session (initially at `/order/`), five hidden Home carousel image files were transferred while the page was observed; their transfer sizes total approximately **2,460,340 bytes (~2.35 MiB)**. The carousel component has 39 items overall. This was the clearest client-side avoidable image transfer seen in the session; the carousel component now postpones image URLs until the carousel is near view, loading only the visible cards first.

A prior stored Lighthouse 13.6 simulated-mobile audit (2026-10-29) reported Home and Services at **46/100** each (LCP 9.7 s and 8.4 s), with analytics-consent text as the LCP element. Those prior scores are context only; this turn did not produce a fresh Lighthouse run, so no post-change score or speedup is claimed.

## 3. Is the operating schedule suspicious?

The times have separate purposes and therefore do not need to match:

| Service | Schedule |
|---|---|
| Online doorstep order intake | Daily, **8:00 AM–10:00 PM PKT** |
| Customer-support desk and office verification | Monday–Thursday **8:00 AM–8:00 PM** |
| Customer-support desk and office verification | Friday **8:00 AM–1:00 PM** |
| Customer-support desk and office verification | Saturday–Sunday **10:00 AM–6:00 PM** |
| WhatsApp emergency assistance | **24/7** |

The confusing part was presentation: the first row said “Doorstep Orders” and was followed by weekdays/weekends with no heading to indicate those lines described the Customer Support Desk. The Home card and its page documentation now explicitly split the order window from desk/office hours. The 24/7 statement is for WhatsApp emergency assistance, not online order intake or a promise of 24/7 doorstep dispatch.

## 4. Indexing checks — current live technical facts

Independent live checks on 2026-10-29:

| URL | HTTP | Canonical | Robots | H1 present |
|---|---:|---|---|---|
| `/services/` | 200 | Self-referencing `/services/` | `index, follow` | Yes |
| `/download/` | 200 | Self-referencing `/download/` | `index, follow` | Yes |
| `/order/` | 200 | Self-referencing `/order/` | `index, follow` | Yes |

The live sitemap returned **200**, contained **19** `<loc>` entries, and included each of the three URLs. `robots.txt` returned **200** and points to `https://zyphuel.netlify.app/sitemap.xml`; no disallow rule blocks these three routes.

These checks establish technical crawlability at the time sampled, **not** that Google indexed the URLs. The checked-in [2026-10-28 Search Console report](./2026-10-28-search-console-indexing-report.md), which summarizes the owner's export, records 14 indexed and 3 not indexed pages. Its Performance export was filtered to question-form queries only and recorded 1 click / 17 impressions; it is not the site's total search performance.

The GSC status must be rechecked in the owner's account. Use URL Inspection on each canonical URL, run **Test Live URL**, confirm the Google-selected canonical, then request indexing. If the report reason remains “Discovered – currently not indexed”, wait for recrawl and compare again; do not repeatedly resubmit. Bing Webmaster Tools and IndexNow are separate. The checked-in report describes IndexNow returning a Bing 403 pending site verification.

## 5. Files changed for this report

- Five source components: async frame redraw and shared deduplicated request helper.
- `src/components/Carousel3D.jsx`: defer offscreen carousel image sources until the carousel is near view; load only currently visible cards.
- `src/pages/HomePage.jsx`: make the order and office/support schedules unambiguous; remove obsolete urgent/priority/express delivery copy.
- `docs/pages/home.md`, `docs/pages/services.md`, `docs/pages/download.md`: document the implementation and schedule.
- `docs/reports/README.md`, `docs/README.md`: index this report.
- `docs/reports/charts/production-ttfb-2026-10-29.svg`: 2D TTFB range chart. X-axis is page route; Y-axis is response-header TTFB in milliseconds, on a 0–1,750 ms scale.

## 6. Limitations and owner actions

1. The two user-provided report directories are outside the accessible workspace; this report does not invent additional data from them.
2. No fresh Lighthouse measurement could be run in this task environment: Lighthouse/Chrome CLI packages and a local browser binary were not installed in the workspace. The browser's live root navigation also timed out. Current measurements are direct HTTP requests and an observed browser resource sample, not Lighthouse or field CrUX.
3. The source changes have not been published to Netlify from this task. Re-test scroll on a built/deployed copy after deployment.
4. A user with Search Console access must perform URL Inspection / Request Indexing and confirm the later status. No agent or GitHub push can guarantee the crawl, index, or rank.
5. This build's `npm run build` runs `scripts/indexnow.js`: Yandex accepted the 19-URL submission (HTTP 200), while Bing and the shared IndexNow endpoint returned HTTP 403 (`UserForbiddedToAccessSite`), matching the earlier checked-in report. Verify the property in Bing Webmaster Tools; the build does not submit indexing requests to Google.
6. Production TTFB varied significantly. Compare the same URLs from the target audience's devices/networks and inspect Netlify/CDN edge analytics before attributing all latency to the app.

## 2D graph

![Two-dimensional plot of production TTFB ranges](./charts/production-ttfb-2026-10-29.svg)
