# Zyphuel — 90-Day Backlink & Google Business Profile Plan (Lahore)

**Date:** 2026-10-28
**Goal:** grow genuine local visibility for doorstep petrol/diesel delivery in Lahore.
**Constraint:** every step must stay inside the permanent business rules — 5–15 L per order, Rs. 300 (5–10 L) rising +Rs. 20/L to Rs. 400 (15 L), Rs. 5.00/L margin over OGRA, **45 minutes, one delivery tier, no urgent/express tier**, orders 8:00 AM–10:00 PM PKT, 24/7 WhatsApp helpline.

---

## 0. Honest starting position

Facts verified on 2026-10-28, before any of this plan:

| Signal | Current state | What it means |
|---|---|---|
| Domain | `zyphuel.netlify.app` (free subdomain) | Treated as low-trust by default. Every citation built on it is thrown away when a real domain arrives. |
| Referring domains | **0 known** | The single biggest reason 19 good pages sit un-crawled. |
| Google Business Profile | A `share.google/Nb4XGKYq5aU0nzLr3` link is referenced in `companyInfo.js` — **status unverified** | Step 1 is to find out whether it exists, is verified, and is complete. Do not create a duplicate. |
| Google clicks / 90 days | **1 click, 17 impressions** (and that export was filtered to question-type queries) | There is no brand demand yet. |
| Reviews | Unknown, assumed near zero | Reviews are the fastest local lever available. |
| Technical SEO | **Clean** — 200s, index/follow, self-canonical, 23-URL sitemap, 0 schema errors | Nothing on-site is blocking. Everything that follows is off-site. |

**What this plan will not do:** put Zyphuel at #1 for "petrol delivery Lahore" or every neighbourhood keyword. Google's local pack is proximity-weighted, and a service-area business with a hidden address cannot rank across all of Lahore simultaneously. Anyone promising otherwise is selling something.

**What it can realistically do in 90 days:** get all 19 pages indexed, earn **8–12 genuine referring domains**, reach **~25 reviews**, and appear in the local pack for the zones physically closest to the base — while building organic rankings for long-tail area queries ("generator diesel delivery Johar Town", "petrol delivery DHA Phase 5") that do not require proximity.

---

## 1. Sequencing rule: settle the domain FIRST

This is the one decision that changes the order of everything else.

**If a real domain is coming (`zyphuel.com` / `zyphuel.pk`), buy it in week 1, before any citation is built.**

Reason: a citation is a record of `name + phone + website`. Build 15 citations on `zyphuel.netlify.app` and then migrate, and all 15 become stale references pointing at a 301 — the exact inconsistency that citations are supposed to solve (Whitespark ranks "website NAP matches GBP" #15 and citation consistency #28, while raw citation *quantity* sits at #110). Rebuilding them is weeks of wasted work.

| Week 1 decision | Then |
|---|---|
| **Buy the domain now** | Do Phases 0–1 on the new domain. Add `netlify.app` → new domain 301. GBP website field points at the new domain. |
| **Stay on `netlify.app` for now** | Proceed as written, but accept that every citation must be re-pointed later. |

Everything below assumes the domain question is answered first.

---

## 2. Phase 0 — Days 1–3: Google Business Profile foundation

This is the highest-leverage week of the entire plan. A verified, complete GBP can produce calls and direction requests long before any ranking movement.

### 2.1 Establish what already exists (Day 1, 15 minutes)

1. Open the `share.google/Nb4XGKYq5aU0nzLr3` link from `src/data/companyInfo.js`.
2. If a live profile appears → **do not create a new one.** Claim/request ownership via "Own this business?" and verify.
3. If it 404s or shows someone else's listing → create fresh at <https://business.google.com/>.
4. Search Google Maps for "Zyphuel" and for the phone number `+92 3230-112464` to catch duplicates.
5. **Only one profile** for the whole Lahore service area. Multiple profiles for one delivery operation is a suspension trigger.

### 2.2 Set it up as a Service Area Business (SAB)

| Field | Exact value |
|---|---|
| Business name | **Zyphuel** — nothing else. Do **not** write "Zyphuel Fuel Delivery Lahore 24/7". Google lists keyword-stuffed names as a suspension cause. |
| Primary category | **Fuel supplier** (choose the closest that Google's picker actually offers) |
| Additional categories | **Diesel fuel supplier** if diesel is genuinely core. **Do not** choose *Gas station* — it describes a forecourt customers drive into, which Zyphuel does not have. |
| Address | Real operating base entered for verification, then **hidden** ("I deliver goods and services to my customers") |
| Service areas | Up to **20** named areas. Use the 17 already in `companyInfo.serviceAreas`: Gulberg, DHA (Phases 1–9), Johar Town, Model Town, Wapda Town, Cantt, Bahria Town, Faisal Town, Garden Town, Valencia Town, Township, Green Town, Allama Iqbal Town, Samanabad, Shalimar, Mughalpura, Canal Road corridor. No radius allowed. |
| Hours | Doorstep orders **8:00 AM – 10:00 PM daily**. If the profile allows a second set, the desk schedule is Mon–Thu 8–8, Fri 8–1, Sat–Sun 10–6. The 24/7 WhatsApp helpline is **not** opening hours — do not open the profile 24 hours, it will invite orders the guard rejects at 22:00. |
| Phone | `+92 3230-112464` (identical string everywhere — see §2.4) |
| Website | The site's canonical home URL |
| Description | Factual only: doorstep Euro-V petrol, High-Octane 97 and diesel delivery in Lahore; 5–15 litres; metered 0.01 L flow meter with QR/barcoded invoice; within 45 minutes; 8 AM–10 PM. **Never** mention an urgent/express tier — it does not exist. |
| Order link | The `/order/` page (or app download if the profile offers a separate field) |

### 2.3 Video verification (assume it will be required)

Google chooses the method; you cannot request a different one. For an SAB it is usually video, and the rules are strict:

- **One continuous recording, 30+ seconds minimum**, filmed live on the phone through the Business Profile flow. No cuts, no editing, no pre-recorded file.
- Show, in order: **street signage / landmarks near the base** → **the business itself** (branded refueling vehicle, calibration equipment, hose, branded uniform or signage) → **proof you control it** (unlock the vehicle, open the meter housing or equipment cabinet).
- Do not film other people's faces, customer addresses, or documents with personal data.
- Google says review can take up to **5 business days**.

Prep once, before starting: vehicle clean and branded, meter and hose visible, someone available to film in daylight, base signage readable.

### 2.4 NAP — one string, everywhere

NAP = **N**ame, **A**ddress, **P**hone. Whitespark ranks "website NAP matches GBP" as local factor **#15** — higher than almost every other citation factor.

| Element | Canonical value | Rule |
|---|---|---|
| Name | `Zyphuel` | Never `Zyphuel Fuel Delivery`, never `Zyphuel Lahore` |
| Phone display | `+92 3230-112464` | Same characters in every citation |
| Phone digits | `+923230112464` | Never vary by one digit |
| WhatsApp | `wa.me/923230112464` | Already consistent across the codebase |
| Address | Lahore, Punjab 54000, PK | Hidden on GBP (SAB), but identical wherever a citation asks for a city/region |

Note recorded during this audit: the codebase renders the number as `+92 3230-112464` in 155 places, `+923230112464` in tel links (99), and `+92 323 0112464` in 7 places. Digits are identical in all cases, so Google normalises them correctly — but pick **one display string** for citations and never mix. (`+92-300-1234567` appears in the codebase only as a **form placeholder** in `OrderPage.jsx` and `InterestModal.jsx`; it is not published contact data.)

### 2.5 Reviews — what is allowed

Google prohibits, and will act on:

- paying, discounting, or giving free fuel for a review;
- offering anything to change or delete a negative review;
- **review gating** — asking only customers you expect to be happy;
- scripting what the customer should write.

Allowed: ask **every** genuine customer, neutrally, with the review link or a QR code.

---

## 3. Phase 1 — Days 4–21: citations and profiles

Build these in order. Every one uses the exact NAP string from §2.4.

| Priority | Platform | Exact URL | Cost | Why |
|---|---|---|---|---|
| 1 | **Google Business Profile** | <https://business.google.com/> | Free | The local pack itself |
| 2 | **Bing Places** | <https://www.bing.com/forbusiness> | Free | Feeds Bing Search + Maps; also underpins the IndexNow 403 fix |
| 3 | **Apple Business** (was Apple Business Connect) | <https://business.apple.com/en-ww/> | Free | Apple Maps; availability varies by region — claim if the flow allows Lahore |
| 4 | **Facebook Page** | <https://www.facebook.com/pages/create/> | Free | Local trust, WhatsApp contact, updates |
| 5 | **LinkedIn Company Page** | <https://business.linkedin.com/advertise/linkedin-pages> | Free | B2B: generators, fleets, industrial estates |
| 6 | **YellowPage.pk** | <https://yellowpage.pk/services/business-listings> | Free basic | Genuinely Pakistani, indexed. Paid tiers (PKR 4,500–50,000/yr) — **not** required |
| 7 | **Business Listing Pakistan** | <https://businesslisting.pk/> | Free | Pakistan B2B directory, live and indexed |
| 8 | **BusinessList.pk** | <https://www.businesslist.pk/create-business-listing> | Advertises $10 standard / $45 yr / $90 lifetime — **confirm the free option exists before paying** | Lahore oil-and-gas category is populated and indexed |
| 9 | **Waze** | <https://www.waze.com/editor> | Free | Navigation only — add a real location if customers ever navigate to a base |

### Do not use

| Platform | Reason |
|---|---|
| **Facebook Marketplace** | Meta's commerce policy prohibits promoting **flammable/combustible goods**. Listing fuel there risks the whole Page. |
| **PakBizBees** | Could not be verified as a live, indexed directory. Skip rather than waste an hour. |
| **`yellowpagespk.com`** (different site from YellowPage.pk) | Live but low-confidence, repetitive global-directory copy. Free listing at most; never buy ads. |
| **HamariWeb "business listing"** | A website-submission page, not a maintained local listing product. |
| **Crunchbase / Startup.pk** | Company-data and editorial platforms, not Lahore customer directories. Only if there is a genuine story worth publishing. |
| **Any "500 directories for $49" service** | Google names low-quality directory and bookmark links as link spam. This actively harms the site. |
| **LCCI membership as a link purchase** | Membership is paid and legitimately useful for networking — join only if the networking itself justifies the dues. Its directory explicitly restricts reuse. |

---

## 4. Phase 2 — Days 22–45: reviews and profile depth

### 4.1 The review engine (the single best local lever available)

Whitespark's 2026 local-pack factor rankings, for context:

| Factor | Rank | Score |
|---|---:|---:|
| High star rating | #6 | 181 |
| Number of reviews **with text** | #9 | 170 |
| Review recency | #11 | 164 |
| Steady influx (not bursts) | #14 | 154 |
| Keywords in reviews | #36 | 117 |
| Owner responses to most reviews | #122 | 70 |
| Keywords in owner responses | #182 | 28 |

Read that as: **count, text, recency and steadiness matter; keyword-stuffing reviews and keyword-loaded replies do not.**

**The mechanism already exists in the product** — every order produces a QR/barcoded PDF invoice. Put the Google review QR on that invoice, and send one WhatsApp message after delivery with the same link.

| Rule | Detail |
|---|---|
| Target | **~25 reviews in 90 days** — roughly 2 per week once volume allows |
| Decline before asking | Ask at the *second* delivery, not the first. A customer with one successful order has a real experience to describe. |
| Never | Offer fuel, discount, or anything of value |
| Reply | Within **7 days**, every review. BrightLocal found 63% of consumers expect a reply in 2–7 days. Reply for trust, not for keywords. |
| Negative reviews | Reply factually, no arguing, offer the WhatsApp number. Do not ask for removal. |

### 4.2 GBP services and prices — do this, it ranks

Whitespark puts the **presence of predefined GBP services at #22** and **custom service titles at #30** — far above posts or products. Add accurate entries:

| Service name | Price field |
|---|---|
| Doorstep Euro-V Petrol Delivery (5–15 L) | From Rs. 300 delivery fee (5–10 L) |
| Doorstep Euro-V Diesel Delivery (5–15 L) | From Rs. 300 delivery fee (5–10 L) |
| High-Octane 97 Delivery (5–15 L) | From Rs. 300 delivery fee (5–10 L) |
| Standby Generator Refueling (Lahore) | From Rs. 300 delivery fee (5–10 L) |
| Commercial Machinery & Fleet Refueling | From Rs. 300 delivery fee (5–10 L) |

Keep the volume cap and the 45-minute window in the descriptions so the profile never promises something the site refuses.

### 4.3 Photos — 10 minimum, genuine only

Branded refueler with visible plate/branding, the calibrated meter close-up, the hose in use, a QR invoice, the team in uniform, base exterior with signage. No stock photos, no stolen competitor images, no "interior" photos of an address customers cannot visit.

### 4.4 Posts — low priority, but keep it alive

Whitespark ranks Google-post factors in the **#147–#168** range, and Sterling Sky's controlled test found **no measurable local-pack impact**. So: one post every two weeks, with a real operational fact (coverage area, hours, meter accuracy, a new vehicle). Do not build a content calendar around it.

**Policy caution:** Google's restricted-goods post policy limits promoting sales of regulated goods with prices/purchase links. Keep posts informational; do not make them price-and-buy ads.

### 4.5 On-site work that supports all of this

| Task | Why |
|---|---|
| Add the GBP URL to `sameAs` in the LocalBusiness schema | Entity consolidation — links the site to the profile Google already trusts |
| Add an "Order on Google" / review link on `/contact/` | Converts visits into reviews |
| Ensure `/contact/` and `/about/` show the exact NAP string | Website NAP ↔ GBP match is factor #15 |
| Internal links from indexed pages to `/services/`, `/order/`, `/download/` | Internal links *to* the GBP landing page rank #44 in Maps; sitewide internal linking is #6 for local organic |
| **Do not** build templated area doorway pages | Whitespark explicitly warns against thin city pages. 17 real areas are already covered by `/services/`; a page per phase would be 20 thin duplicates |

---

## 5. Phase 3 — Days 46–90: links that actually count

Google's own prominence guidance names reviews *and* links. The gap here is zero referring domains. Realistic, defensible sources — no purchased links:

| # | Tactic | Realistic yield | Notes |
|---|---|---|---|
| 1 | **Local press / startup coverage** — TechJuice, ProPakistani, Startup.pk editorial | 1–3 links | Requires an actual story: calibrated metering, QR invoicing, the fuel-price alert feature. Pitch facts, not adjectives. |
| 2 | **Supplier and partner pages** — fuel terminal/supplier, payment provider, APK distribution partner, any logistics partner | 1–2 | Ask to be listed as an authorised reseller/partner. This is the highest-trust link type available to a fuel business. |
| 3 | **Corporate client mentions** — factories, plazas, hospitals, schools that use generator refueling | 2–4 | "Our fuel supplier" page or a procurement note. Ask after 3 successful months of service. |
| 4 | **LCCI membership** (if dues justify it) | 1 + network | Value is the network and credibility, not the link. |
| 5 | **Industrial estate / trade associations** — Sundar, Quaid-e-Azam estate bodies | 1–2 | Genuine B2B relevance |
| 6 | **Sponsorship of a local event** (university engineering society, community sports) | 1–2 | Real link + real brand exposure in Lahore |
| 7 | **Founder LinkedIn + GitHub** | 2 | Already active (`linkedin.com/in/muhammad-daniyal490`, `github.com/daniyal44`). Publish one technical post per month on the metering/telemetry stack — genuinely linkable. |

**Target: 8–12 referring domains in 90 days.** That is a realistic number for a bootstrapped startup; anyone promising 100 is selling spam.

Never: paid link packages, PBNs, guest posts on unrelated blogs, comment spam, or bulk directory blasts.

---

## 6. Measurement — the weekly 30-minute routine

| What | Where | Weekly check |
|---|---|---|
| GBP calls / direction requests / website clicks | GBP → Performance | Trend, not absolute |
| GBP searches that showed the profile | GBP → Performance → Searches | Which queries find you |
| Impressions + average position | Search Console → Performance (with **no filter**) | The 17-impression export was filtered — always clear filters |
| Which of the 23 URLs are indexed | Search Console → Pages | Must reach 23 |
| Review count and average rating | GBP | Must climb ~2/week |
| Referring domains | Any free backlink checker | Monthly |
| Local rank for 10 keywords × 6 zones | Manual incognito search from each area, or a rank-grid tool | Monthly |

### 30 / 60 / 90 checkpoints

| Checkpoint | Realistic target |
|---|---|
| **Day 30** | GBP verified and complete (categories, 20 service areas, 10 photos, services with prices); Bing Places + Apple + Facebook + LinkedIn live; 4 Pakistan citations live; 8–10 reviews; all 23 URLs indexed |
| **Day 60** | 15–18 reviews; 4–6 referring domains; first local-pack appearance in the base's own zone; organic impressions for area long-tail queries |
| **Day 90** | ~25 reviews; 8–12 referring domains; visible in the pack for 2–3 nearest zones; 5–10 genuine clicks/week instead of 1 per quarter; all 19 pages indexed |

---

## 7. What to expect, honestly

- **Local pack** is proximity-bound. A hidden-address SAB competes hardest in the zones around its real base. Do not expect DHA Phase 8 and Shalimar simultaneously.
- **Organic** is where the 17-area coverage on `/services/` can actually win — area-qualified long-tail queries do not need proximity.
- **Reviews move faster than links.** A verified profile with 20 real reviews will out-earn a month of citation grinding.
- **The domain is the ceiling.** On `netlify.app`, even a perfect 90 days stays capped. On `zyphuel.com`, the same work compounds.
- **Nobody can guarantee #1.** This plan guarantees only that every controllable signal is correct and the site stops looking like an abandoned project.

---

## 8. Sources

- Google: [local ranking (relevance, distance, prominence)](https://support.google.com/business/answer/7091?hl=en), [eligibility & ownership](https://support.google.com/business/answer/13763036?hl=en), [guidelines for representing your business](https://support.google.com/business/answer/3038177?hl=en), [service areas](https://support.google.com/business/answer/9157481?hl=en), [video verification](https://support.google.com/business/answer/14271705?hl=en), [tips for getting reviews](https://support.google.com/business/answer/3474122?hl=en), [prohibited & restricted content](https://support.google.com/business/answer/7400114?hl=en), [posts policy](https://support.google.com/business/answer/7342169?hl=en), [spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Whitespark Local Search Ranking Factors 2026](https://whitespark.ca/local-search-ranking-factors/) · [SAB address study](https://whitespark.ca/blog/should-service-area-businesses-show-or-hide-their-address-for-local-seo/) · [city pages without a physical address](https://whitespark.ca/blog/rank-in-cities-with-no-physical-address/)
- [Sterling Sky: review count test](https://www.sterlingsky.ca/number-of-reviews-impact-ranking/) · [8,186-business review-text study](https://www.sterlingsky.ca/what-gets-you-ranking-for-near-me-2025/) · [Google posts test](https://www.sterlingsky.ca/do-google-posts-impact-ranking/) · [products test](https://www.sterlingsky.ca/gmb-products/)
- [BrightLocal Local Consumer Review Survey 2025](https://www.brightlocal.com/research/local-consumer-review-survey-2025/)
- [Meta commerce policy — hazardous goods](https://www.facebook.com/policies_center/commerce/hazardous_goods_and_materials) · [Facebook Marketplace restrictions](https://www.facebook.com/help/130910837313345)
- [Bing Places for Business](https://www.bing.com/forbusiness) · [Apple Business](https://business.apple.com/en-ww/)
- Directories: [YellowPage.pk](https://yellowpage.pk/services/business-listings) · [Business Listing Pakistan](https://businesslisting.pk/) · [BusinessList.pk](https://www.businesslist.pk/create-business-listing)
