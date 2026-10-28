# Search Console & Bing Webmaster Operations Playbook — The 3 Un-Indexed URLs

**Date:** 2026-10-28
**Scope:** `/services/`, `/download/`, `/order/`
**Owner-only actions:** every step below requires signing in to the owner's Google / Microsoft account. No agent or script can perform them.

---

## 0. Pre-flight: what is already proven (verified 2026-10-28)

Do not repeat these checks. They are done and the results are recorded here so every later step starts from a known-good baseline.

| Check | Result | Evidence |
|---|---|---|
| `/services/` reachable | **HTTP 200**, 3,949 words | live `curl` |
| `/download/` reachable | **HTTP 200**, 4,932 words | live `curl` |
| `/order/` reachable | **HTTP 200**, 5,700 words | live `curl` |
| `<meta name="robots">` | `index, follow` on all three | prerendered HTML |
| Canonical | self-referencing on all three | prerendered HTML |
| Hreflang | `en`, `en-PK`, `x-default` present | prerendered HTML |
| JSON-LD | valid, 0 parse errors, 0 schema-only FAQ drift | `scripts/gsc_indexing.js` |
| Sitemap | **19 URLs**, all 200, all with `<lastmod>` | live `/sitemap.xml` |
| `robots.txt` | `Sitemap:` line present, nothing blocked | live `/robots.txt` |
| Duplicate `.html` URLs | all **301** to clean URLs | live `curl` |
| Google verification | **2 × `google-site-verification` meta** already in `<head>` | `index.html` lines 9–10 |
| Bing verification | **`msvalidate.01` meta already in `<head>`** | `index.html` line 21 |
| Yandex verification | `yandex-verification` meta present | `index.html` line 22 |
| IndexNow key file | **200**, `text/plain`, content exactly `185084a8fa7dac10b46ec58d30c56792` | live `curl` |
| IndexNow → Yandex | **200 Success** | `node scripts/indexnow.js` |
| IndexNow → Bing | **403 `UserForbiddedToAccessSite`** | same run |

**Conclusion of pre-flight:** the pages are not broken, not blocked, not canonicalised elsewhere, and not noindexed. The blocker is search-engine-side ownership/crawl state, which is why the steps below are account actions, not code changes.

---

## 1. Google Search Console — 7 steps

Property: `https://zyphuel.netlify.app/`
Sign in at <https://search.google.com/search-console>.

### Step 1 — Confirm you are in the right property (1 minute)

- Top-left **property selector** dropdown → confirm `https://zyphuel.netlify.app/` is selected.
- If a second property `sc-domain:zyphuel.netlify.app` exists, ignore it. A **Domain** property requires a DNS TXT record on `netlify.app`, which you do not control — it can never verify. Use only the **URL-prefix** property.

**Expected:** the property shows data (it already does — that is where your Coverage export came from).

### Step 2 — Re-read the Pages report for the exact reason (3 minutes)

- Left nav → **Indexing → Pages**.
- Scroll to the table and click the row **"Not indexed"**, then find the three URLs.
- Read the **"Reason"** column for each. This single value decides everything that follows:

| Reason shown | What it means | What to do |
|---|---|---|
| **Crawled – currently not indexed** | Google fetched the page and chose not to list it. Content/authority decision. | Steps 4 + 5. Nothing else helps. |
| **Discovered – currently not indexed** | Google knows the URL but has not fetched it yet. Crawl-budget queue. | Step 3 + 5. |
| **Page with redirect** | Should no longer appear — the `.html` 301s are live. | If present, it is stale data. Check back in 5 days. |
| **Duplicate, Google chose different canonical** | Should not appear — canonicals are self-referencing. | Screenshot it and report; do not guess. |
| **Excluded by ‘noindex’** | Would be a real bug. | Would need a code fix — report immediately. |

**Expected:** either of the first two. Both are resolved by the steps below, not by editing code.

### Step 3 — Re-submit the sitemap (2 minutes)

- Left nav → **Indexing → Sitemaps**.
- If `sitemap.xml` is already listed: click it, then **⋯ → Remove sitemap**.
- Click **Add a new sitemap**, type exactly `sitemap.xml` (relative, not the full URL), click **Submit**.

**Expected within 24 hours:** Status **Success**, "Discovered URLs" = **19**.
If it shows fewer than 19, the deploy has rolled back — report it.

### Step 4 — URL Inspection: run the Live Test on each page (2 minutes each)

- Click the search box at the very top of Search Console.
- Paste `https://zyphuel.netlify.app/services/` → Enter.
- Wait for the result, then open the **Live Test** tab → **View tested page**.

Check and note these four values:

| What to look for | Expected |
|---|---|
| HTTP response | **200** |
| Page availability | "URL is available to Google" |
| Screenshot | the real page rendered, not a blank or error |
| Page resources → "Couldn't load" | **0 blocking resources** (CSS/JS that Google cannot fetch) |

Repeat for `https://zyphuel.netlify.app/download/` and `https://zyphuel.netlify.app/order/`.

**Why this step matters:** the Live Test fetches the page fresh, right now. If the screenshot is correct and 0 resources fail, the page is definitively indexable and the only remaining variable is Google's scheduling.

### Step 5 — Request indexing: one URL per day, three days (1 minute each)

In the same URL Inspection panel, after the Live Test:

- Click **Request indexing**.
- Wait for "Indexing requested".

Do **one page per day**, in this order — `/services/` first, then `/order/`, then `/download/`.

**Why one per day:** the request quota is a small daily allowance (Google does not publish the exact number; in practice it is around ten per day per property). Three requests in one minute is fine on quota but bunches them into one crawl slot; spreading them costs nothing and gives each page its own slot.

**Expected:** the confirmation appears immediately. This is a *request*, not a guarantee. Typical outcome is a crawl within 3–14 days.

### Step 6 — Verify the result (check on day 3, day 7, day 14)

For each URL, re-run URL Inspection and read the top line:

| Top line | Meaning |
|---|---|
| "URL is on Google" | **Done** — indexed. The Reason row disappears from the Pages report. |
| "URL is not on Google" + "Discovered/Crawled – currently not indexed" | Still queued. Normal up to 14 days. Do **not** re-request daily. |
| "URL is not on Google" + "Page with redirect" / "noindex" | A real defect appeared. Report it. |

### Step 7 — Leave these alone

- **Indexing → Removals:** never use it. It *removes* URLs from Google and is the opposite of what you want.
- **Canonical / robots / noindex markup:** unchanged since 2026-10-28. Do not edit.
- **Repeated daily "Request indexing":** Google's own documentation states it does not speed up recrawls beyond the first request. Repeated clicks only consume quota.

---

## 2. Bing Webmaster Tools — 6 steps

Sign in at <https://www.bing.com/webmasters> with a **Microsoft account** (Outlook / Hotmail / Live). A Google account will not sign in here.

### Step 1 — Add and verify the site (3 minutes) — this is the fix for the IndexNow 403

- **Add site** → enter `https://zyphuel.netlify.app/` → **Add**.
- Verification method: choose **Meta tag**.
- **Do not generate a new tag.** The correct `msvalidate.01` tag is already deployed in `index.html` line 21 and is live on every page. Paste that existing token if the form asks, then click **Verify**.

**Expected:** "Verified" immediately, because Bing reads the tag from the live site.

**Why this step is non-negotiable:** the IndexNow submission currently returns
`403 UserForbiddedToAccessSite — "User is unauthorized to access the site. Please verify the site using the key and try again"`.
Everything on our side is already correct — the key file returns **200**, `Content-Type: text/plain`, and its content matches the key character for character, and **Yandex accepted the identical request with 200**. That isolates the failure to Bing's ownership record for the host: Bing will only accept IndexNow submissions for a host registered to a verified account. Verifying the site is what creates that record.

Shortcut: Bing also offers **"Import from Google Search Console"** on the Add-site screen. That verifies the site and imports your sitemaps in one click. Use it if the meta-tag route shows any error.

### Step 2 — Submit the sitemap (1 minute)

- Left nav → **Sitemaps** → **Submit sitemap**.
- Enter `https://zyphuel.netlify.app/sitemap.xml` → **Submit**.

**Expected:** Status **Success**, 19 URLs discovered (Bing may take a few hours to process).

### Step 3 — Submit the three URLs directly (2 minutes) — Bing's fast path

- Left nav → **URL Submission**.
- Paste all three, one per line:

```
https://zyphuel.netlify.app/services/
https://zyphuel.netlify.app/download/
https://zyphuel.netlify.app/order/
```

- Click **Submit**.

**Expected:** "3 URLs submitted". Bing's daily allowance is large (up to 10,000 URLs for verified sites), and unlike Google, direct submission usually results in a crawl within **24–48 hours**.

### Step 4 — Retry IndexNow (1 minute, after Step 1 is confirmed)

Once the site shows **Verified** in Bing Webmaster Tools, run:

```bash
node scripts/indexnow.js
```

or simply:

```bash
npm run build
```

`npm run build` runs the submission automatically as its last step.

**Expected:** `Microsoft Bing -> Success! (Status 200)` and `IndexNow Shared Hub -> Success! (Status 200)`.
If the 403 persists after verification, wait 24 hours and retry once — the ownership record needs to propagate. If it still fails, it is a Bing-side account issue to raise in Microsoft Q&A, not a code issue.

### Step 5 — Check the result (day 2, day 7)

- Left nav → **Site Explorer**, or paste a URL into the top search box → **URL Inspection**.

| Status shown | Meaning |
|---|---|
| **Indexed** | Done. |
| **Discovered but not crawled** | Queued; re-submit that one URL in Step 3. |
| **Excluded** | Open the details; the reason is shown there. |

### Step 6 — Do not point a second tool at the same host

Do not add the site twice with different URL spellings (`http://`, `www.`, no trailing slash). One verified property per host.

---

## 3. Expected timeline

| Day | Google | Bing |
|---|---|---|
| 0 | Sitemap re-submitted, requests filed | Site verified, sitemap + 3 URLs submitted, IndexNow retried |
| 1–2 | Sitemap shows **19 discovered** | **Crawl usually happens in 24–48 h** |
| 3 | First re-check in URL Inspection | `/services/` typically indexed |
| 7 | 1–3 pages usually move to "URL is on Google" | all three typically indexed |
| 14 | If still "Crawled – currently not indexed", it is an authority issue — not a technical one | — |
| 30–90 | Builds only with links + real branded searches | — |

---

## 4. If nothing moves by day 14 — decision tree

Work top to bottom; stop at the first branch that applies.

1. **Live Test screenshot blank or resources failing** → a rendering/asset defect. Code fix needed. Report with the screenshot.
2. **Reason = "Page with redirect" or "noindex"** → a regression shipped. Compare against the 2026-10-28 live-verification table in Section 0.
3. **Reason = "Discovered – currently not indexed" (unchanged 14 days)** → Google is not spending crawl budget on a site it does not yet trust. No technical fix exists. The only levers are the ones in Section 5.
4. **Reason = "Crawled – currently not indexed" (unchanged 14 days)** → Google fetched and judged the page not worth listing yet. Levers: more inbound internal links from pages that *are* indexed, real external links, branded search volume, and time.

---

## 5. What no code change can fix

These are the actual reasons a 90-day-old site shows 1 click and 17 impressions, and they are all outside the repository:

1. **Zero backlinks.** Nothing links to the site, so there is no reason for Google to crawl it often or rank it.
2. **A free `netlify.app` subdomain.** Free-subdomain sites are treated as low-trust by default. A real domain (`zyphuel.com` / `zyphuel.pk`) is the single highest-impact change available.
3. **No Google Business Profile.** For "petrol delivery in Lahore"-type local intent, the map pack takes most of the clicks, and a verified Business Profile is the entry ticket.
4. **No brand search volume.** Nobody searches "Zyphuel" yet, so there is no signal telling Google this entity matters.
5. **Crawl priority on 19 new URLs.** New sites get a small crawl allowance; 19 URLs plus 10 long articles exceeds what a 90-day-old site is given per week.

**Honest expectation:** completing every step in this playbook makes the pages indexable and *likely* indexed within 2–14 days. It does not put the site "top for every keyword in the city" — no on-page action can. That requires the five items above over months.

---

## 6. Summary of exactly what to click

Google Search Console → property `https://zyphuel.netlify.app/`
1. Indexing → Pages → read the Reason for the 3 URLs
2. Indexing → Sitemaps → remove + re-add `sitemap.xml`
3. URL Inspection → `/services/` → Live Test → check 200 + screenshot + 0 failed resources
4. Request indexing → `/services/`
5. Repeat 3–4 for `/order/` (day 2) and `/download/` (day 3)

Bing Webmaster Tools → `https://www.bing.com/webmasters`
1. Add site `https://zyphuel.netlify.app/` → verify with the existing `msvalidate.01` meta tag
2. Sitemaps → submit `https://zyphuel.netlify.app/sitemap.xml`
3. URL Submission → paste the 3 URLs → Submit
4. `node scripts/indexnow.js` → expect 200 from Bing
5. Site Explorer → confirm **Indexed** on day 2 and day 7
