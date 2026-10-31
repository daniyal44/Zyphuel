# Zyphuel — Indexing, SEO/AEO/GEO & Speed Master Plan

**Created:** 2026-10-31
**Scope:** `/services/`, `/download/`, `/order/` (the three URLs still outside Google's index), plus site-wide speed and topical coverage.
**Data sources:** Search Console Coverage export `httpszyphuel.netlify.app-Coverage-2026-10-31`, Lighthouse 13.6.0 mobile runs against the live production URLs (both archived under `docs/reports/data/`).

---

## 1. Where the site actually stands (measured, not assumed)

| Signal | Value | Where it comes from |
| :--- | :--- | :--- |
| Indexed pages | 14 | GSC coverage chart, flat since 2026-10-10 |
| Not-indexed pages | 3 | GSC coverage chart, flat since 2026-10-10 |
| Impressions/day | 9–57 | GSC coverage chart (peaked 57 on 2026-10-22) |
| Coverage issues | `Page with redirect` (1), `Discovered – currently not indexed` (2) | `gsc-critical-issues-2026-10-31.csv` |
| `/services/` mobile Lighthouse | perf **32**, LCP 8.4 s, TBT 1.81 s, TTFB 635 ms | Lighthouse run |
| `/download/` mobile Lighthouse | perf **48**, LCP 3.3 s, TBT 5.93 s, TTFB 808 ms | Lighthouse run |
| `/order/` mobile Lighthouse | perf **36**, LCP 5.7 s, TBT 1.50 s, TTFB 786 ms | Lighthouse run |
| SEO / Accessibility score | **100 / 100 on all three pages** | Lighthouse run |

Two conclusions follow directly from that table:

1. **On-page SEO is not the blocker.** All three pages already return 200 with `index, follow`, a self-referencing canonical, one `<h1>`, 1,950–4,157 words and valid breadcrumb + FAQ schema. Lighthouse scores them 100 for SEO.
2. **The blockers are crawl economics and page cost.** Two pages sit at `Discovered – currently not indexed` (Google found the URL but chose not to spend a crawl on it) while LCP is 8.4 s and TBT 5.9 s, and the site collects under 60 impressions a day. That is the classic profile of a low-authority host that Google deprioritises, not of a technical misconfiguration.

### Root causes we verified directly

| # | Finding | Evidence |
| :--- | :--- | :--- |
| 1 | `/sitemap/` was an **infinite 301 loop** (50 hops, curl error 47) until the 2026-10-31 fix. A crawler that hit it counted it as a redirect problem. | Fixed in `netlify.toml`; live check now `1 hop → 200 application/xml` |
| 2 | **HTML was never edge-cached.** Every request answered `max-age=0, must-revalidate`, so Netlify forwarded to origin each time. | `Cache-Status: "Netlify Edge"; fwd=stale; fwd-status=200` header + 635–808 ms TTFB |
| 3 | **AdSense loaded during head parse**, pulling ~223 KB of third-party JS and 1.5–4 s of main-thread work on first visit. | Lighthouse `unused-javascript` (167 KB + 56 KB) and `bootup-time` |
| 4 | **`/services/` had only two internal links site-wide**, both in the sitewide nav. No in-body link from any indexed page. `/download/` had 4 and `/order/` had 5. | Link census of the prerendered HTML |
| 5 | Long marketing sections were fully styled and laid out before first paint. | Lighthouse `mainthread-work-breakdown`: Style & Layout 5.5–8.3 s |
| 6 | `/order/` still told visitors to "select your delivery speed", contradicting the single 45-minute window and the permanent removal of the urgent tier. | Page copy, fixed 2026-10-31 |
| 7 | Bing IndexNow returns **403 `UserForbiddedToAccessSite`**. The key file is live and correct (`/185084a8…c56792.txt` → 200), so this is site ownership verification, not a code fault. Yandex accepts the same payload (200). | `npm run build` IndexNow output |

Content duplication was tested and **ruled out**: 5-gram overlap between the three pages is 3.0–10.8 %, and 1.9–3.5 % against the home page. There is no thin-content or near-duplicate problem to fix.

---

## 2. What was shipped on 2026-10-31 (Phase 0)

| Change | File | Why |
| :--- | :--- | :--- |
| AdSense deferred to `load` + `requestIdleCallback` (with interaction and 12 s ceilings) | `index.html` | Removes the largest third-party TBT source without removing ads |
| `s-maxage=600, stale-while-revalidate=86400` on HTML, `/services/`, `/download/`, `/order/` | `netlify.toml`, `public/_headers` | Lets the CDN answer instead of forwarding to origin — targets the 635–808 ms TTFB |
| `content-visibility: auto` on below-the-fold sections | `src/index.css` | Skips style/layout for off-screen sections; the 5.5–8.3 s Style & Layout bucket |
| In-body contextual links from the home page to `/services/`, `/order/`, `/download/` | `src/pages/HomePage.jsx` | The one lever that reliably moves `Discovered – currently not indexed` |
| Corrected `/order/` FAQ to describe a single 45-minute window | `src/pages/OrderPage.jsx` | Removes a contradictory (and therefore untrustworthy) claim |

Build, prerender and IndexNow all run in `npm run build`; output was verified in `dist/` before commit.

---

## 3. Phase 1 — the actions only the site owner can perform (this week)

These cannot be done from the codebase, and each one is required:

1. **Search Console → Sitemaps.** Delete any entry for `/sitemap/` (trailing slash). Submit `https://zyphuel.netlify.app/sitemap.xml`. Expect `Success — 23 discovered URLs`.
2. **Search Console → Pages → `Page with redirect` → Validate fix.** The only redirect defect we could find was the `/sitemap/` loop, now fixed.
3. **Search Console → URL Inspection** for `/services/`, `/download/`, `/order/` → **Request Indexing**. This is the "on demand" crawl; it is a request, not a guarantee, and each URL has a daily quota.
4. **Bing Webmaster Tools → Import from Google Search Console.** This is what clears the IndexNow 403. Until the property is verified there, Bing will reject every submission.
5. **Decide on AdSense.** Ads are now deferred, not removed. If revenue from ads is negligible, removing the AdSense script entirely would free another ~220 KB and a few hundred ms of TBT. *No change will be made without your instruction.*

## 4. Phase 2 — content and structure (days 1–14)

- **Deepen `/order/`**, the thinnest page at 1,950 words: add a live pricing table (petrol / High-Octane 97 / diesel, 5–15 L, fee ladder 300→400), a Lahore sector list with ETAs, a payment-and-invoice section and a night-cutoff explainer. Target 2,800–3,200 words without repeating `/services/`.
- **Add one in-body link per blog post** to the most relevant commercial page with descriptive anchor text (the articles already carry a "Related Zyphuel Services" block; in-prose links carry more weight).
- **Keep NAP and hours byte-identical** across Home, Contact, `/services/`, `/download/`, `/order/`, `llms.txt`, `llms-full.txt` and schema. Hours are: orders daily 8:00 AM–10:00 PM PKT; support desk Mon–Thu 8:00 AM–10:00 PM, Fri 10:00 AM–6:00 PM, Sat–Sun 10:00 AM–6:00 PM; WhatsApp 24/7.
- **Answer-first blocks** for the questions Google already surfaces for this niche: *how much does fuel delivery cost*, *can petrol be delivered to a home*, *what is mobile fuel delivery*, *can diesel be delivered for a generator*. Short H2 + 40–60 word answer + supporting detail; each block is a candidate for an AI Overview citation.
- **Publish one new guide every two weeks** targeting a distinct intent cluster (emergency roadside refuel, fleet diesel contracts, generator runtime maths, fuel price history). Ten to fifteen pages of real substance beats fifty thin ones.

## 5. Phase 3 — authority (days 15–90)

Indexing at this scale is decided by authority, not markup. The realistic sequence:

1. **Google Business Profile** for Zyphuel (Lahore, service-area business), verified, with the same phone, hours and service list as the site. Add the four fuel targets as services and post a weekly update.
2. **Local citations** with identical NAP: Pakistan business directories, Lahore Chamber listings, startup directories, OGRA-adjacent industry listings. Ten to fifteen consistent citations before chasing any link.
3. **Earned links**: local news on fuel logistics and load-shedding, university/fleet-manager guest pieces, supplier and partner pages. Ten genuinely relevant links outperform a hundred directory drops.
4. **Internal link equity**: as blog posts gain impressions, link them to the commercial pages in the body, not just in a footer block.

**Not recommended:** bulk directory blasts, paid link networks, doorway pages per sector, or duplicate location pages. They are the fastest way to lose the 14 indexed pages you already have.

## 6. International reach (GEO) — what is realistic

Zyphuel delivers in Lahore only, so the international play is *entity visibility*, not translated pages:

- Keep one canonical language (English) and one currency/locale story. Do **not** add `hreflang` for languages you do not serve.
- Make the `Organization` / `LocalBusiness` graph explicit: legal name, founder, `areaServed` (Lahore + named sectors), `geo` coordinates, `openingHoursSpecification`, `priceRange`, `sameAs` social profiles. Consistent entity data is what AI answer engines quote.
- Keep `llms.txt` / `llms-full.txt` and `feed.xml` current; they are already published and are the machine-readable surface for AI crawlers.
- Publish benchmark content that travels (for example the existing global-vs-Pakistan delivery benchmarks article). International queries will cite the *data*, not the delivery promise.

## 7. How success gets measured

| Week | Check | Pass condition |
| :--- | :--- | :--- |
| +3 days | GSC Pages → validation | `Page with redirect` cleared; at least one of the three URLs moves to "Crawled/Indexed" |
| +7 days | Lighthouse mobile re-run on all three | Performance ≥ 65, TBT < 500 ms, TTFB < 300 ms |
| +14 days | GSC coverage chart | Indexed ≥ 17, not-indexed ≤ 1 |
| +30 days | GSC Performance | Impressions ≥ 150/day, at least 25 distinct queries |
| +90 days | GSC Performance | Non-brand impressions exceed brand impressions |

Anything that does not move by the +14-day check is a content or authority problem, not a technical one — and the plan above is ordered so those are the next levers, not another round of meta-tag edits.
