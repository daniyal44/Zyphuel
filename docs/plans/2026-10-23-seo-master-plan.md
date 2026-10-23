# SEO Master Plan — Zyphuel (2026-10-23)

One consolidated plan covering: why the overall Lighthouse score is not 100, the
`/order/` + `/download/` indexing problem, the competitor gap, the trending-question
("What is Zyphuel?") strategy, keyword coverage, and a 4-week execution roadmap.

---

## 1. Overall Lighthouse score — why not 100?

| | Desktop | Mobile |
|---|---|---|
| Accessibility / Best Practices / SEO | **100 / 100 / 100** | **100 / 100 / 100** |
| Performance | 91 (87–94) | 65 (49–89) |
| **Overall (avg of 4)** | **98** | **91** |

The entire gap is **Performance**, and it is a deliberate trade-off:

- The signature **scroll-animation frames** (2560×1440 retina JPGs, ~57–86 KB each) weigh
  ~2.8 MB on Home/Services/Download/Order. Lighthouse's simulated slow-4G + 4× CPU turns
  that into LCP 7–8.5 s on mobile → perf 49–65 on animation pages.
- Resizing/compressing the frames was evaluated and **rejected**: the hero canvas covers
  the full viewport at retina scale, so smaller frames make the animation visibly blurry.
  Quality is kept over a synthetic score.
- Text/light pages already score 86–94 mobile (contact 89, privacy 86) — proving the
  framework, CSS, fonts and JS are not the bottleneck.

**Verdict:** 100 overall mobile requires deleting or heavily compressing the animation
the owner explicitly wants. Categorical 100 everywhere + desktop 98 is the honest optimum
unless that trade-off is accepted.

---

## 2. `/order/` and `/download/` indexing — root cause & fix

### Verified healthy (not the cause)
`robots.txt` allows all; sitemap lists both URLs with `lastmod` = build date and
`priority 0.9`; both pages emit `index, follow` meta robots + `X-Robots-Tag` header +
HTTP `Link` canonical + self-referencing `<link rel="canonical">`; hreflang
(x-default/en/en-PK) present; both are prerendered (order 7.4 K, download 24.8 K visible
chars). No `noindex` anywhere except `/404.html`.

### Real causes (Google-side quality/crawl decisions)
1. **Near-duplicate keyword intent** across `/services/`, `/order/`, `/download/` —
   overlapping FAQ items (COD, calibration, coverage) made pages look redundant, so
   Google indexed the strongest (services) and queued the others ("Discovered – currently
   not indexed").
2. **Schema/content mismatch** on the transactional pages: `/download/` shipped **no
   FAQPage schema at all** despite having 7 visible FAQs; Home shipped a 10-question
   FAQPage schema with **no visible FAQ content** on the page.
3. Low site authority + fresh domain: crawl demand is the long-term constraint (backlinks, §5).

### Fixed today
- **Home**: new visible "What Is Zyphuel? — Straight Answers" Q&A hub (14 questions,
  accordion) + matching 14-question FAQPage schema (`prerender.js`, `index.html`).
- **Download**: FAQPage schema generated from the 7 visible FAQs (`DownloadPage.jsx` useSEO
  schema + `prerender.js` route graph); H1 de-sensationalised
  ("Download Pakistan's #1 Fuel Delivery App" → "Download the Zyphuel Fuel Delivery App
  for Android" — unverifiable "#1" claim violated the truthfulness rule).
- **Order**: FAQ made distinct from services — added Q5 (delivery time: 45 min / 10–20 min
  urgent) and Q6 (generator & machinery targets) in both visible FAQ and schema.
- **Differentiation of intent**: services = informational service catalog; order =
   transactional booking portal (title/H1/FAQs now reflect distinct intents).

### Manual steps only the owner can do (Google Search Console)
1. GSC → URL Inspection → `https://zyphuel.netlify.app/order/` → **Request Indexing**.
2. Same for `/download/`.
3. Submit the sitemap (already configured) and watch Coverage: "Discovered" should move
   to "Indexed" within 1–3 crawl cycles after the content changes go live.
4. Bing: IndexNow fires on every build but returns 403 "UserForbiddedToAccessSite" —
   fix once by logging into Bing Webmaster Tools → "Import from Google Search Console".

---

## 3. Competitor gap analysis (who ranks and why)

Ranking surfaces for "fuel delivery Lahore" and adjacent queries:

| Domain | Type | What they do better |
|---|---|---|
| apexenergy.com.pk | Lahore fuel supply company | Strong commercial-intent coverage (HSD, generator rental); exact-match "fuel delivery Lahore" framing |
| fueldelivery.pk | Lahore B2B fuel delivery | Clear service hierarchy (About/Why Us/Prices/Services/Order); explicit 24/7 + address |
| fuelstation.com.pk | Lahore on-demand fuel company | Simple company page, Johar Town address (thin but locally anchored) |
| ezfuels.com | Karachi on-demand + smart storage | Generator narrative, news/press page |
| myfuelpump.com | (comparison service page) | Residential + commercial framing, step-by-step "how to order" |
| Fuelogic (Play listing) | B2B fuel app | Separate app-store search footprint |

**Gaps versus Zyphuel (now addressed or scheduled):**

1. **Third-party proof** — competitors have addresses, press, app-store listings. Zyphuel
   has none. → Off-page plan ([backlink plan](./2026-10-23-offpage-backlink-plan.md)):
   GBP (service-area), Bing/Apple, socials, YellowPage.pk, Rehbar.pk, PRLog.
2. **Per-use-case landing depth** — competitors split petrol/diesel/generator/fleet into
   distinct sections. Zyphuel's services page covers this; keep enriching rather than
   creating thin near-duplicate neighbourhood pages.
3. **Trust signals on-page** — branded support email (currently a personal Gmail in
   contact/legal disclosures) reads weaker than competitors; legal entity name display
   would help. *(Owner decision — changes public contact data.)*
4. **App footprint** — Fuelogic owns a Play listing; Zyphuel is APK-direct (honest "Launch
   Soon" badges). The `/download/` page + blog APK guide now carry proper schema to
   compensate.

---

## 4. Trending questions & keyword map (implemented)

### Trending question hub (AEO/GEO)
Answered verbatim on Home (visible + schema + `llms.txt` for AI crawlers):

1. **What is Zyphuel?** — on-demand doorstep fuel delivery in Lahore, 45-min dispatch,
   5–15 L, cash/online.
2. **What does Zyphuel do for its customers?** — calibrated micro-refueler dispatch,
   0.01L metering, QR/barcode invoice.
3. **Is Zyphuel safe to use?** — OGRA-notified Euro-V fuel, sealed metered bowsers,
   trained staff, verifiable invoice, 24/7 WhatsApp helpline.
4. **Does Zyphuel have a mobile application?** — Android APK v2.6.4; iOS in development;
   store listings launching soon.

Plus 10 operational questions (areas, minimum quantity, charges, ordering, metering,
fleets/generators, vs petrol pumps, fuel agency, run-out-on-road, sector delivery times).
`llms.txt` gained a "Canonical Answers to Trending Questions" section so AI assistants
(GPTBot/ClaudeBot/Gemini/Perplexity — all already allowed in robots.txt) cite the same
facts.

### Keyword clusters → target page (current state)

| Cluster | Target page | Status |
|---|---|---|
| petrol/fuel/diesel delivery Lahore, doorstep, near me, COD | `/` (title/meta/keywords) | ✅ covered |
| what is Zyphuel, is Zyphuel safe, Zyphuel app/APK | `/` keywords + new Q&A hub | ✅ added today |
| emergency fuel delivery Lahore, 24/7 WhatsApp | `/contact/` keywords (+24/7 helpline is genuine) | ✅ added today |
| generator diesel delivery, commercial/fleet, high-octane 97 | `/services/` | ✅ existing |
| order fuel online, booking, generator order, delivery time | `/order/` (2 new FAQs) | ✅ added today |
| fuel delivery app Pakistan, APK, rate alerts | `/download/` | ✅ existing + schema |
| on-demand fuel delivery Pakistan, what is Zyphuel | `/about/` keywords | ✅ added today |
| petrol/diesel price today Pakistan (news intent) | blog articles + 2-hour fuel-rate data pipeline | 🟡 ongoing content play |

Verification step (owner): Google Keyword Planner with Pakistan/Lahore targeting to
confirm relative volumes; then double down on whichever cluster impressions grow in GSC
Performance after 2–4 weeks.

---

## 5. 4-week roadmap

**Week 1 — Indexing push**
- Deploy this build. GSC: Request Indexing for `/order/` and `/download/`; re-submit
  sitemap. Fix Bing 403 via Webmaster Tools import (one click).
- Create Google Business Profile (service-area, address hidden) — biggest local lever.

**Week 2 — Off-page Tier 1–2**
- Bing Places, Apple Business, LinkedIn/Facebook/Instagram/YouTube/X — use the NAP block
  and boilerplates from the [backlink plan](./2026-10-23-offpage-backlink-plan.md).

**Week 3 — Off-page Tier 3 + PR**
- Brownbook, Hotfrog, YellowPage.pk, Rehbar.pk, Crunchbase, F6S.
- First genuine press release (PRLog) on a real milestone; Qwoted monitoring.

**Week 4 — Measure & iterate**
- GSC Performance: compare impressions/clicks per cluster; inspect coverage movement for
  `/order/` + `/download/`.
- Lighthouse re-run (expect categorical 100 to hold; mobile perf only moves if the frame
  trade-off is accepted — see §1).
- Blog: one article per emerging query cluster (e.g., "petrol price in Pakistan today"
  commentary tied to the fuel-rate data already on site).

---

## 6. Files touched today (this plan's implementation)

| File | Change |
|---|---|
| `src/pages/HomePage.jsx` | Visible 14-question AEO Q&A hub + brand/emergency keywords |
| `index.html` | Home FAQPage schema: 4 brand Qs + 4 previously schema-only Qs synced (now 14) |
| `prerender.js` | Home FAQPage 14 Qs; **new** `/download/` FAQPage (7 Qs); `/order/` FAQPage +2 Qs |
| `src/pages/DownloadPage.jsx` | FAQPage schema from visible FAQs; truthful H1; `faqs` hoisted above `useSEO` |
| `src/pages/OrderPage.jsx` | FAQ Q5 (delivery time) + Q6 (generator/machinery) in schema and visible accordion |
| `src/pages/ContactPage.jsx`, `AboutPage.jsx` | Keyword top-ups (emergency/24-7, what-is-Zyphuel clusters) |
| `public/robots.txt` | Last Updated → 2026-10-23 |
| `public/llms.txt` | New "Canonical Answers to Trending Questions" section (GEO/AEO) |
| `public/sitemap.xml` | Auto-regenerated by build (all 16 URLs, lastmod 2026-10-23) |
