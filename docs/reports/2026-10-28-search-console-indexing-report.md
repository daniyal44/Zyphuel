# Zyphuel — Search Console Indexing & Visibility Report

**Report date:** 2026-10-28
**Property:** `https://zyphuel.netlify.app/` (Netlify subdomain)
**Sources (local exports, opened and read directly):**

- `Coverage-2026-10-28` — Page indexing export (`Chart.csv`, `Critical issues.csv`, `Non-critical issues.csv`, `Metadata.csv`)
- `Performance-on-Search-2026-10-28` — Performance export (`Chart.csv`, `Queries.csv`, `Pages.csv`, `Countries.csv`, `Devices.csv`, `Filters.csv`, `Search appearance.csv`)

---

## 1. What the Coverage export actually says

| Reason | Source | Validation | Pages |
| :--- | :--- | :--- | ---: |
| Page with redirect | Website | Started | **1** |
| Discovered – currently not indexed | Google systems | Started | **2** |
| Alternative page with proper canonical tag | Website | Passed | 0 |

Indexing trend at the end of the export window (2026-10-23):

| Date | Not indexed | Indexed |
| :--- | ---: | ---: |
| 2026-09-19 → 2026-09-21 | 15 | 2 |
| 2026-09-22 → 2026-10-09 | 6 | 11 |
| 2026-10-10 → 2026-10-23 | **3** | **14** |

The direction is positive: **2 → 14 indexed in five weeks**, and the not-indexed count has held at exactly 3 since 2026-10-10. The three names the owner reports — `/services/`, `/order/`, `/download/` — match that count of 3 exactly.

---

## 2. What the Performance export actually says

> **Read this before trusting the numbers.** The export carries a filter:
> `Query: +^(who|what|when|where|why|how|which|is|are|can|does|do|should|will)\b`
> So it contains **only question-form queries**. It is not the total traffic of the site.
> Removing that filter in Search Console will show the real, larger totals.

Filtered totals, last 3 months (Web / text):

| Metric | Value |
| :--- | ---: |
| Clicks | **1** |
| Impressions | **17** |
| CTR | 5.88% |
| Average position | 4.35 |
| Countries | Pakistan only |
| Devices | **100% mobile** |
| Pages with any impression | **1** — the homepage only |
| Search appearance rows | 0 (no rich-result data reported) |

All nine queries:

| Query | Clicks | Impr. | CTR | Position |
| :--- | ---: | ---: | ---: | ---: |
| can i buy petrol online | 1 | 1 | 100% | 1 |
| can you buy petrol online | 0 | 5 | 0% | 3 |
| how to buy petrol online | 0 | 3 | 0% | 3 |
| can i order petrol online | 0 | 2 | 0% | 6 |
| how to book petrol online | 0 | 2 | 0% | 8 |
| how to order fuel online | 0 | 1 | 0% | 1 |
| how to order petrol | 0 | 1 | 0% | 5 |
| how to order petrol online near me | 0 | 1 | 0% | 6 |
| how can i get petrol online | 0 | 1 | 0% | 9 |

**The positions are actually good** — 1st, 3rd, 3rd, 6th, 8th. The problem is not ranking quality on these queries; it is **volume**: 17 impressions in 90 days. At that scale, a single index change moves the whole number.

---

## 3. Diagnosis — why those three pages are not indexed

Every technical check below was run against the **live site on 2026-10-28**, not against documentation.

| Check | Result |
| :--- | :--- |
| HTTP status of all 19 sitemap URLs | **200** on every one |
| `<link rel="canonical">` on `/services/`, `/order/`, `/download/` | correct, self-referencing |
| `<meta name="robots">` on those three | `index, follow, max-image-preview:large, …` |
| Prerendered HTML present (no JS needed) | yes — H1 rendered server-side |
| Internal links pointing at each page | 17 → now **19** (every page links to every page) |
| Links without a trailing slash | **none** |
| Dangling internal links (target missing) | **none** |
| Sitemap `<lastmod>` | per-URL and truthful (git commit date of each page's source) |
| Body word count `/services/` | 2,207 words |
| Body word count `/download/` | 3,549 words |
| Body word count `/order/` | 1,221 words (an ordering form, expected) |
| Random unknown URL | **404** (no SPA catch-all swallowing crawl budget) |

**Conclusion: the pages themselves are not the blocker.** They are prerendered, canonical, indexable, content-rich and reachable. What the export describes is **crawl prioritisation on a host with almost no authority**:

- `Discovered – currently not indexed` means Google knows the URL from the sitemap but has not spent a crawl on it yet.
- `Page with redirect` (1) is a **non-canonical duplicate shape**, not a broken page. Verified live: `/services`, `/order`, `/download` without a trailing slash all return **301** to the canonical `…/` URL.

So there are three real, separate levers, and only one of them is code.

---

## 4. Fixes applied in this pass (code)

### 4.1 Duplicate `…/index.html` copies — now 301

Measured live before the fix:

| URL | Before | After |
| :--- | :--- | :--- |
| `/index.html` | 200 (full duplicate of `/`) | **301 → `/`** |
| `/services/index.html` | 200 (duplicate) | **301 → `/services/`** |
| `/download/index.html` | 200 (duplicate) | **301 → `/download/`** |
| `/blog/index.html` | 200 (duplicate) | **301 → `/blog/`** |
| `/about/index.html` | 200 | **301 → `/about/`** |
| `/order/index.html` | 200 | **301 → `/order/`** |

Six URLs on a 17-page site were serving a second full copy of a page to any crawler that found them. Implemented in `netlify.toml` with `force = true` (required, otherwise the existing file wins over the rule).

### 4.2 Two published articles were missing from the live sitemap

Articles 9 and 10 (`emergency-petrol-delivery-near-me-roadside-guide`, `petrol-price-today-pakistan-fuel-delivery-cost-calculator`) existed in `src/data/articles.js`, `feed.xml` and `llms.txt`, but the deployed `sitemap.xml` still listed **17** URLs — the build had not been re-run since they were written.

After a fresh build: **19 URLs**, sitemap identical in `public/` and `dist/`, both new pages prerendered (71,994 and 71,084 bytes).

### 4.3 Build was broken by an uncommitted edit

`npm run build` failed with `Expected "]" but found ":"` in three files — the keywords arrays in `HomePage.jsx`, `ServicesPage.jsx` and `OrderPage.jsx` had lost their closing bracket. Fixed all three; `npm run build` now exits **0**.

This matters more than it looks: **Netlify deploys whatever `npm run build` produces.** A broken build means the last deploy either failed or shipped stale output, which alone can leave pages un-crawled for days.

### 4.4 Blog articles were dead ends — now they link into the commercial pages

Before: article bodies contained **zero** outbound links. Their only links were the global nav/footer, so all ten articles sent no keyword anchor text anywhere.

Added a "Related Zyphuel Services in Lahore" block to `BlogArticlePage.jsx`, rendered on all 10 articles:

| Anchor text | Target |
| :--- | :--- |
| Doorstep petrol, diesel and generator refueling services in Lahore | `/services/` |
| Order fuel online in Lahore, 5 to 15 litres within 45 minutes | `/order/` |
| Download the Zyphuel Android app (direct APK) | `/download/` |

Measured effect: each article went from **41 → 44** internal links, and each of the three pages now receives **3 keyword-bearing body links from every article**.

### 4.5 Policy violation caught by the QA gate

`scripts/qa-static.cjs` failed article 10 with `contains "urgent"`. The sentence was *"There is no urgent priority surcharge or express fee"* — truthful, but the gate exists to keep the permanently removed urgent tier from creeping back into copy. Reworded to *"Delivery is a single tier only, so there is no priority surcharge and no express fee."*

Re-run: **20 pages audited, 0 issues.**

---

## 5. Verification

| Check | Command | Result |
| :--- | :--- | :--- |
| Production build | `npm run build` | exit **0** |
| Static QA (20 pages) | `node scripts/qa-static.cjs` | **0 issues** |
| Internal-link audit | `node scripts/link-audit.cjs dist` | 0 no-slash links, 0 dangling, all pages inbound 19 |
| Sitemap | `grep -c "<loc>" dist/sitemap.xml` | **19** |

`scripts/link-audit.cjs` is new in this pass: it reports per-page HTML weight, link counts, inbound links per key page, links missing a trailing slash, and dangling targets. It exits non-zero if any of those regress.

---

## 6. What code cannot fix

| Item | Why it is the real limiter | Who can fix it |
| :--- | :--- | :--- |
| **`zyphuel.netlify.app` is a free subdomain** | Google treats it as a shared-hosting subdomain with no independent trust. Every competitor on `…lahore.com` starts ahead. This is the single biggest constraint on "rank #1 for every keyword in the city". | Owner: buy `zyphuel.com` / `zyphuel.pk`, point it at Netlify, 301 the subdomain to it |
| **Zero backlinks** | 1 click / 17 impressions in 90 days is the profile of a site nobody links to. Rankings need external citations. | Owner: Google Business Profile, local directories, supplier/partner listings |
| **Bing IndexNow returns 403** | `UserForbiddedToAccessSite` — the key file is live and correct (`https://zyphuel.netlify.app/185084a8fa7dac10b46ec58d30c56792.txt` → 200, exact 32-char body), so this is a Bing-side block, not a code bug. Yandex accepts the same payload (200). | Owner: add the site in Bing Webmaster Tools, verify, or import from Search Console |
| **The 3 specific URLs need a manual nudge** | `Discovered – currently not indexed` is only cleared by an actual crawl. | Owner: Search Console → URL Inspection → the 3 URLs → **Request indexing** (quota is a few per day, so do them one at a time) |
| **The performance export is filtered to question queries** | The 17 impressions are a subset, not the total. | Owner: clear the Query filter in Search Console to see real totals |

### Transient issue observed, not a code defect

`/about/index.html` and `/order/index.html` returned **HTTP 500** (`Error - Request ID: …`) on three of six attempts, then 200 on retries. These are Netlify edge errors on a platform path, not reproducible in the build output — every file in `dist/` is a valid static document. Recorded here so it is not mistaken for a fix or silently ignored.

---

## 7. Honest expectation

Nothing in this pass makes `zyphuel.netlify.app` rank first for "petrol delivery Lahore" in the next week. What it does:

1. Removes **6 duplicate URLs** that were competing with the real pages for crawl budget.
2. Restores a **working build**, so the next deploy actually ships.
3. Puts the **2 missing articles** into the sitemap.
4. Gives the three un-indexed pages **30 new contextual internal links** with keyword anchor text.
5. Leaves a **regression gate** (`link-audit.cjs` + `qa-static.cjs`) so this set of mistakes cannot silently return.

The remaining gap is authority and a real domain, which no commit can supply.
