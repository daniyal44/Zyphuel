# Zyphuel — Working Hours Correction, New Content & Verification (30 October 2026)

This report covers three things: the working-hours mistake and its correction across every page and
schema, the new search-intent articles published for Lahore queries, and the measured verification of
the canvas scroll animations. Every number below was measured on this machine against the local
production build; nothing is estimated.

---

## 1. The working-hours problem, honestly explained

The site showed **two different schedules under one heading** and never labelled which row belonged to
which service:

| What the visitor saw | What it actually meant |
| :--- | :--- |
| `Every day 8:00 AM – 10:00 PM` | the **online order intake** window |
| `Monday – Thursday 8:00 AM – 8:00 PM` | the **support desk** window |
| `Friday 8:00 AM – 1:00 PM` | the **support desk** window (half-day) |
| `Saturday – Sunday 10:00 AM – 6:00 PM` | the **support desk** window |

Because the block was titled only *"Working Hours & Timings"*, a reader naturally compared the first
row with the rows under it and concluded the page contradicted itself. It was a presentation and data
problem, not a rendering bug — and the half-day Friday row made it worse.

## 2. The schedule now used everywhere

| Schedule | Days | Hours (PKT) |
| :--- | :--- | :--- |
| Online doorstep order intake | Every day | 8:00 AM – 10:00 PM |
| Customer support desk & office verification | Monday – Thursday | 8:00 AM – 10:00 PM |
| Customer support desk & office verification | Friday – Sunday | 10:00 AM – 6:00 PM |

There is **no Friday half-day** any more. The desk follows the order window Monday to Thursday and a
short weekend schedule Friday to Sunday.

### Files changed for this

| File | Change |
| :--- | :--- |
| `src/utils/officeHours.js` | `OFFICE_HOURS_SCHEDULE` (two rows), `checkOfficeHours()` closes at `22:00` Mon–Thu and opens `10:00–18:00` Fri–Sun, `getNextOpening()` rewritten, error fallback aligned |
| `src/data/companyInfo.js` | single-line hours summary rewritten |
| `src/pages/HomePage.jsx` | hero operating card: three rows collapsed to two, half-day note replaced with a clear label |
| `src/pages/ContactPage.jsx` | hours table, meta line and two FAQ answers |
| `src/pages/OrderPage.jsx` | fallback `todaySchedule` |
| `src/pages/PrivacyPolicyPage.jsx`, `src/pages/TermsOfUsePage.jsx` | legal "Working Hours" line |
| `index.html`, `prerender.js`, `src/hooks/useSEO.js` | `openingHoursSpecification` / `contactPoint.hoursAvailable` → `Mo–Th 08:00–22:00`, `Fr–Su 10:00–18:00` |
| `public/llms.txt`, `public/llms-full.txt` | AI/answer-engine copy |
| `AGENTS.md` | permanent rule so the old values cannot come back |

Verified after `npm run build`: the built HTML contains `8:00 AM – 10:00 PM` and `Friday – Sunday`, and
no `8:00 AM – 8:00 PM`, `8:00 AM – 1:00 PM` or "half-day" string remains anywhere in `src/`, `public/`,
`prerender.js` or `index.html`.

---

## 3. The scroll-animation bug (why it looked like it was not loading)

The 100-frame/`SOURCE_STRIDE = 3` refactor changed the frame lookup function but left two call sites
using the old arithmetic:

| Call site | Was | Now |
| :--- | :--- | :--- |
| lazy frame load | `framePath(index + 1)` | `framePath(index)` |
| first paint | `framePath(1)` | `framePath(0)` |

With `framePath(i) = file(i × 3 + 1)` the buggy expression requested `file(i × 3 + 4)`. Two consequences:
every lazy frame was cached under the wrong slot, and the last step requested frame **301**, which does
not exist. The render loop therefore kept falling back to an image with `naturalWidth === 0`, which is
exactly the "animation loads slowly / freezes" symptom.

![Source frame requested versus scrub position](./charts/frame-index-mapping-2026-10-30.svg)

The x-axis is the scrub position (0–99) and the y-axis is the source frame file number. The dashed red
line leaves the valid range at the last step; the solid blue line never does.

### Frames actually requested after the fix

![Frame requests per canvas hero after the fix](./charts/frame-verify-2026-10-30.svg)

| Page | Canvas stages | Frame requests | Failed requests | Console errors |
| :--- | :--- | :--- | :--- | :--- |
| `/` | 1 | 70 | **0** | 0 |
| `/services/` | 2 | 126 | **0** | 0 |
| `/download/` | 2 | 126 | **0** | 0 |

Section 3 on `/services/` and `/download/` also gets a scroll-proximity fallback, because its loader used
to start only from the first `IntersectionObserver` entry — which never arrives when a page is opened
straight at an anchor or with a restored scroll position.

---

## 4. New pages published from real search intent

Two articles were added to `src/data/articles.js`, prerendered to static HTML and included in
`sitemap.xml` and `feed.xml`:

| Slug | Target queries |
| :--- | :--- |
| `/blog/petrol-pump-near-me-lahore-doorstep-alternative/` | petrol pump near me Lahore, Lahore petrol pump, pump short-fueling, fuel delivery Lahore |
| `/blog/diesel-delivery-lahore-price-per-litre-fleet-budget/` | diesel delivery Lahore, diesel price per litre Lahore, generator refueling Lahore, fleet fuel budget |

Both repeat the same verified commercial facts as the rest of the site: 5 L minimum and 15 L maximum per
order, Rs. 300 delivery up to 10 L, Rs. 320–400 for 11–15 L (+Rs. 20/L), Rs. 5.00/L margin over the OGRA
ex-depot rate, one 45-minute window with no urgent tier, ordering daily 8:00 AM – 10:00 PM, and the 24/7
WhatsApp line. Sitemap URLs went from 19 to **21**.

---

## 5. What still has to happen outside the code

No code change can force Google to index a URL. For `/services/`, `/download/` and `/order/` the
remaining steps are:

1. Search Console → URL Inspection → paste each URL → **Request indexing** (twice per day is plenty).
2. Confirm each URL reports *Crawled — currently not indexed* versus *Discovered — currently not indexed*;
   the first needs internal links and content depth, the second needs crawl priority.
3. Bing Webmaster Tools → verify the property, then IndexNow stops returning `403 UserForbiddedToAccessSite`
   (the build log currently shows that exact error for Bing).
4. Keep the sitemap `lastmod` truthful — it now comes from the last commit date of each page's source
   files, not from the build clock.
