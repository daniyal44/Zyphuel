# Indexing diagnosis, page depth and hours verification — 31 October 2026

**Scope:** why `/services/`, `/download/` and `/order/` stay out of Google's index; what was changed on those three URLs; verification that the corrected working-hours schedule is the one actually being served; and making every report chart render on GitHub.

**Repository:** `github.com/daniyal44/Zyphuel` (branch `main`)
**Live site checked:** `https://zyphuel.netlify.app`

---

## 1. The three pages are not blocked — they were thin on unique value

Every technical box was already ticked before this round. Verified on the live site with a Googlebot user agent:

| Check | `/services/` | `/download/` | `/order/` |
| :--- | :--- | :--- | :--- |
| HTTP status | 200 | 200 | 200 |
| `<title>` present, unique | yes | yes | yes |
| Self-referencing canonical | yes | yes | yes |
| `robots` meta | `index, follow` | `index, follow` | `index, follow` |
| `X-Robots-Tag` header | `index, follow` | `index, follow` | `index, follow` |
| In `sitemap.xml` | yes | yes | yes |
| Prerendered HTML (no JS needed) | yes | yes | yes |
| Exactly one `<h1>` | yes | yes | yes |
| Valid JSON-LD | yes | yes | yes |

So there was no tag, canonical, robots or sitemap fault to fix. What those three URLs *did* share is that most of their visible value sat behind canvas animation, and the written copy leaned on the same header, footer and boilerplate blocks used everywhere else.

![Index coverage audit: unique on-page words vs index status](./charts/index-audit-2026-10-30.png)

The chart above is the honest result of measuring the prerendered HTML of all nine URLs. Word count alone does not explain the pattern: `/contact/` is indexed with 684 words while `/order/` is not indexed with 1,262. That is the signature of Google's demand-and-authority judgement rather than a rendering defect — which is why the response in this round is depth, internal linking and freshness, not another meta-tag change.

---

## 2. What changed on the three URLs

### 2.1 Titles and descriptions

| Page | New `<title>` | New description |
| :--- | :--- | :--- |
| `/services/` | Doorstep Petrol & Diesel Delivery in Lahore \| Zyphuel | Euro-V petrol, High-Octane 97 and diesel delivered to your car, bike or generator in Lahore: 5–15 L, Rs. 300–400 fee, 45 minutes, metered invoice. |
| `/download/` | Download Zyphuel APK \| Doorstep Fuel App for Android | Official Zyphuel Android APK v2.6.4.0.0.33 (35.3 MB, Android 7.0 (Nougat)+): live tracking, 45-minute dispatch and fuel price alerts. |
| `/order/` | Order Petrol or Diesel Online in Lahore \| 45-Min Delivery | Order 5–15 L of Euro-V petrol, High-Octane 97 or diesel to your door in Lahore. Rs. 300–400 fee, 45-minute dispatch, COD or online, metered invoice. |

The client-side `useSEO` titles were updated to the same strings, so the title does not change after hydration.

### 2.2 A real content block per page, rendered without JavaScript

New component `src/components/PageDeepDive.jsx` and data file `src/data/pageDeepDives.js`. Each page now carries prose, tables and Q&A that exist nowhere else on the site:

- **`/services/`** — fuel grades and their applications, the full 5–15 L delivery fee table, the Lahore coverage list, where doorstep ends and corporate supply begins, and an explicit list of what Zyphuel does *not* offer (no express tier, no jerrycan or drum filling, no consumer order above 15 L).
- **`/download/`** — verified build table (version name, version code, size in bytes, minimum Android, target SDK, package name, release date), a five-step install sequence, what the app contains, and troubleshooting for Play Protect and managed devices.
- **`/order/`** — the six-step order flow, the fee table again in ordering context, payment options by volume, the 10:00 PM cut-off explanation, and what the QR/barcoded invoice contains.

Because the component has no state or effects, `renderToString` in `prerender.js` writes all of it into `dist/<page>/index.html`. A crawler that never executes JavaScript still sees the full page.

![Doorstep delivery fee by order volume](./charts/delivery-fee-band-2026-10-30.png)

### 2.3 FAQ schema now equals the visible FAQ, exactly

This was a real compliance defect, not a cosmetic one. Each page's `FAQPage` node is generated from the same array that renders the visible Q&A, so a question can never appear in structured data without appearing on the page.

Measured after the rebuild:

| Page | Schema questions | Questions not visible on the page |
| :--- | :--- | :--- |
| `/services/` | 13 | **0** |
| `/download/` | 11 | **0** |
| `/order/` | 10 | **0** |

### 2.4 Freshness and structure nodes

A `WebPage` node with `@id`, `url`, `name`, `description`, `inLanguage: en-PK` and `dateModified: 2026-10-31T00:00:00+05:00` was added to all three `@graph` payloads. The sitemap `lastmod` for each route resolves from the last commit date of the files that actually produce the page, and `pageDeepDives.js` plus `PageDeepDive.jsx` were added to those source lists so the dates track real edits rather than build time.

---

## 3. Two factual inconsistencies removed

1. **Android minimum version.** `/download/`'s `SoftwareApplication` schema claimed `Android 8.0 and above` while the APK itself declares `minSdk 24 (Android 7.0)`. The schema now derives from `MIN_ANDROID` in `src/data/appVersion.js`, so it reads `Android 7.0 (Nougat)+ (target SDK 36, Android 15/16 ready)`.
2. **iOS availability.** The visible download FAQ said the iOS app was "in closed beta testing and scheduled to launch on the Apple App Store soon". Nothing in the verified release data supports a beta programme, so the answer now states plainly that the iOS version is in active development and is not on the App Store yet, and points iPhone users to the website order page.

---

## 4. Working hours: verification, not another claim

The schedule served to crawlers was checked directly against the live site with a Googlebot user agent:

| String | Occurrences on the live home page |
| :--- | :--- |
| `8:00 AM – 10:00 PM` | 4 |
| `10:00 AM – 6:00 PM` | 2 |
| `Monday – Thursday` | 1 |
| `Friday – Sunday` | 1 |
| `8:00 AM – 8:00 PM` | **0** |
| `8:00 AM – 1:00 PM` | **0** |

The current schedule, in code and in every page:

| Schedule | Days | Hours (PKT) |
| :--- | :--- | :--- |
| Online doorstep order intake | Every day | 8:00 AM – 10:00 PM |
| Support desk and office verification | Monday – Thursday | 8:00 AM – 10:00 PM |
| Support desk and office verification | Friday – Sunday | 10:00 AM – 6:00 PM |

Friday, Saturday and Sunday share one block, so Friday and Saturday keep identical hours. There is no Friday half-day and no 8:00 PM or 1:00 PM row anywhere in the repository.

---

## 5. Two new articles

| URL | Targets |
| :--- | :--- |
| `/blog/fuel-delivery-charges-lahore-explained/` | "fuel delivery charges Lahore", "fuel delivery charges", "petrol delivery fee" |
| `/blog/generator-diesel-consumption-lahore-load-shedding-plan/` | "generator diesel consumption per hour", "how long will 15 litres last", "generator fuel planning" |

Both are prerendered, present in `sitemap.xml` (now 23 URLs) and in `feed.xml` (now 14 items), and use only verified commercial facts: 5–15 L, Rs. 300 up to 10 L, Rs. 320–400 for 11–15 L, Rs. 5.00/L margin, one 45-minute window, 8 AM–10 PM intake, 24/7 WhatsApp helpline. The generator article states the consumption figures as planning approximations with the formula shown, rather than presenting them as manufacturer data.

---

## 6. Charts now render everywhere

Every chart in `docs/reports/charts/` exists in two formats: the original SVG and a PNG twin rasterised at 1920 px by `node scripts/charts-to-png.mjs`. GitHub renders the SVG; any client that refuses SVG still shows the PNG.

Both new charts are two-dimensional with labelled axes:

- `delivery-fee-band-2026-10-30` — x: order volume in litres (5–15, 1 L step), y: delivery fee in PKR (280–420).
- `index-audit-2026-10-30` — x: page URL, y: unique on-page words in the prerendered HTML, series split by index status.

---

## 7. What still has to happen outside the repository

A code change cannot make Google index a URL. The remaining action is in Search Console:

1. Open **Indexing → Pages → Not indexed** and confirm the reason is *Crawled – currently not indexed* or *Discovered – currently not indexed*.
2. Use **URL Inspection** on each of `/services/`, `/download/`, `/order/`, then **Request indexing** (a small daily quota applies).
3. Resubmit `sitemap.xml` so the new `lastmod` dates are read.
4. Expect days to weeks for a low-authority `netlify.app` subdomain; the honest expectation is not hours.

The detailed step-by-step playbook, including Bing Webmaster Tools and IndexNow, is in [`docs/seo/2026-10-28-search-console-bing-indexing-playbook.md`](../seo/2026-10-28-search-console-bing-indexing-playbook.md).

---

## 8. Verification performed in this round

| Check | Result |
| :--- | :--- |
| `npm run build` (client + SSR) | exit 0, built in 17.85 s and 4.43 s |
| `node prerender.js` | saved `/services/` 124,949 B, `/download/` 111,829 B, `/order/` 139,630 B |
| New content present in prerendered HTML | 3/3 pages |
| Exactly one `<h1>` per page | 3/3 |
| JSON-LD parses | 3/3 blocks, 8–10 nodes each |
| Schema questions visible on page | 34/34 |
| New article pages generated | 2/2 (61,299 B and 59,754 B) |
| Sitemap URL count | 23 |
| Feed item count | 14 |
| Live hours strings | new schedule present, legacy strings absent |

**Not verified in this round:** a fresh Lighthouse score. Lighthouse is not installed in this workspace, so the last measured mobile figures (Home 46, Services 46) remain the most recent numbers and this round makes no new performance claim.
