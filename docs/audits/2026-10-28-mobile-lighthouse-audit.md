# Mobile Lighthouse Performance Audit — 2026-10-28

**Question asked:** did the scroll-frame optimisation improve the Lighthouse scores?

**Short answer: no.** The frame work fixed a real scrolling defect, but it did **not** improve the mobile performance score, and the audit shows why: the score is dominated by style/layout work and a large JS chunk, not by frame images.

---

## 1. Method

| Item | Value |
|---|---|
| Tool | Lighthouse 12 (`npx lighthouse@12`), performance category only |
| Form factor | Mobile, simulated throttling |
| Screen emulation | 412 × 823, DPR 1.75 |
| Target | Production build (`dist/`) served by a plain static server, not the dev server |
| Browser | System Chrome, headless |
| Runs | One run per configuration (single-run variance on pages this heavy is significant — see §5) |

`/download/` could not be scored: Lighthouse aborted with `LanternError: NO_LCP` (details in §3).

---

## 2. /services/ — measured results

| Configuration | Score | FCP | LCP | TBT | CLS | Speed Index | Transferred | Requests | JPG |
|---|---|---|---|---|---|---|---|---|---|
| **A. Eager preload** (first fix: all 300 frames on idle) | **37** | 7.1 s | 8.3 s | 1,020 ms | 0.003 | 7.1 s | **21,055 KiB** | 321 | 301 (19.5 MB) |
| **B. Balanced preload** (current: keyframes + lookahead window) | **32** | 7.7 s | 10.9 s | 1,490 ms | 0 | 7.7 s | **4,052 KiB** | 62 | 42 (2.5 MB) |
| *Documented baseline 2026-10-21 (different code, different tooling)* | *56* | — | *4.7 s* | — | — | — | *4,387 KiB* | — | — |

Two things are true at once:

- The balanced loader cut transfer by **81%** (21 MB → 4.05 MB) and requests by **81%** (321 → 62). That is a real, measured saving.
- The score did **not** go up. It went from 37 to 32 between two runs of the same page, which is larger than any improvement the frame change could produce, because **frames were never the bottleneck**.

The 2026-10-21 baseline of 56 is **not** a valid comparison point: it was produced on earlier code with a different Lighthouse configuration, so the gap is not attributable to this change.

---

## 3. What actually limits the score

### 3.1 Style & Layout — 6,189 ms of main-thread work

```
Other              8,973 ms
Style & Layout     6,189 ms   <-- dominant
Script Evaluation  1,301 ms
Rendering            795 ms
Parse HTML & CSS     122 ms
```

The LCP element is **text** ("Generator & Machinery Refueling…"), not the canvas. So the page is not waiting on images; it is waiting on layout.

Most likely cause: the scrub loop calls `setScrubProgress(...)` on **every animation frame**, which re-renders the whole section component and rewrites the progress-bar width — a React render plus a style recalculation per frame. Fixing that means writing the width straight to a DOM ref and dropping the state update. This was **not** changed in this pass (it touches the same five components and needs its own verification).

### 3.2 471 KB of PDF/barcode code loads on /services/

```
471 KB  Script  vendor-pdf-barcode-B6gsYoDd.js
159 KB  Script  vendor-react-B2siGpkt.js
147 KB  Font    fa-solid-900.woff2
110 KB  Script  articles-data-CSClZsmi.js
106 KB  Font    fa-brands-400.woff2
```

`unused-javascript` estimates **492 KiB** of savings — almost exactly the jsPDF/barcode vendor chunk. It is only needed on `/order/` when a customer downloads an invoice, yet it is being fetched on the services page. Making that import truly lazy would remove the single largest script from every non-order page.

### 3.3 /download/ has no LCP candidate

Lighthouse cannot score the page: `NO_LCP`. The first viewport is a canvas hero (`AppHeroScrollAnimation`) with no text and no `<img>` — a canvas is not an LCP candidate. That is both a measurement problem and a real UX signal: the first screen has no meaningful content for a slow connection or a search engine.

---

## 4. What the frame change did achieve (measured separately from Lighthouse)

| Metric | Before | After |
|---|---|---|
| Frame payload in the repo | 321.6 MB | **97.5 MB (-70%)** |
| Per-frame weight (services) | 133–394 KB | **~33–69 KB** |
| Frames loaded in first 9 s | **1** | 190 within 7 s (eager) / keyframes immediately (balanced) |
| Largest gap between loaded frames | up to 35 indices | ≤ 10 |
| Leaked preload timer on two section-3 components | yes | fixed |

These are scroll-smoothness and bandwidth improvements. They are real; they are simply not what Lighthouse's performance score measures on these pages.

---

## 5. Honest limitations of this audit

1. **One run per configuration.** On a page with 6 s of layout work, run-to-run variance is several points. The 37 vs 32 difference should be read as "no measurable improvement", not as a 5-point regression.
2. **No controlled before/after on identical code.** I attempted a build of the previous commit in a separate worktree to hold tooling constant; the Windows junction for `node_modules` could not be created, so that comparison was abandoned rather than faked.
3. **Headless Chrome on this machine** is not a real phone. Absolute scores are indicative; relative deltas and the audit *diagnoses* are the useful output.
4. **`/download/` is unscored**, not "passing".

---

## 6. Recommended next steps (in measured-impact order)

| Priority | Change | Expected effect | Evidence |
|---|---|---|---|
| 1 | Remove per-frame `setScrubProgress` state; write the progress width through a ref | Cuts the dominant Style & Layout work, which is 6.2 s of a 17.4 s main thread | `mainthread-work-breakdown` |
| 2 | Make `vendor-pdf-barcode` load only on invoice download | −492 KiB JS on every non-order page | `unused-javascript`, network list |
| 3 | Give the `/download/` first viewport real text (h1/paragraph above the canvas) | Makes the page measurable and gives LCP a candidate | `NO_LCP` |
| 4 | Self-host/subset the two Font Awesome woff2 files (253 KB combined) | Faster FCP | network list |
| 5 | Re-run Lighthouse 3× per page and take the median | Trustworthy numbers before/after | §5.1 |

None of these were applied in this pass: each is a separate behavioural change that needs its own verification.

---

## 7. Reproduce

```bash
npm run build
node -e "/* static server for dist */"   # or any static file server
npx lighthouse@12 http://localhost:5300/services/ \
  --only-categories=performance --form-factor=mobile \
  --screenEmulation.mobile=true --screenEmulation.width=412 --screenEmulation.height=823 \
  --screenEmulation.deviceScaleFactor=1.75 --throttling-method=simulate \
  --output=json --output-path=./lh-services.json \
  --chrome-flags="--headless=new --no-sandbox"
```

---

## 8. Follow-up: per-frame `setScrubProgress` removed, then re-measured

**Change applied** (all five scroll components): the progress bar is now written directly to a ref (`bar.style.width = pct + '%'`) instead of calling `setScrubProgress(...)` inside the animation loop. The `stageInfo` narrative was moved to a 3-state `scrubStage` that only re-renders when the scroll crosses a threshold (35% / 75%), so a re-render happens at most twice per pass instead of on every frame.

**Re-measured** (`/services/`, same tooling and settings as §1, two runs):

| Run | Score | FCP | LCP | TBT | Transfer | Style & Layout |
|---|---|---|---|---|---|---|
| Before the change (§2 row B) | 32 | 7.7 s | 10.9 s | 1,490 ms | 4,052 KiB | 6,189 ms |
| After — run 1 | **33** | 7.2 s | 8.7 s | 1,400 ms | 4,053 KiB | 6,051 ms |
| After — run 2 | **35** | 6.9 s | 10.6 s | 1,160 ms | 4,053 KiB | 5,736 ms |

**Verdict: not a measurable improvement.** 32 → 34 (median of two) sits inside the run-to-run spread of a page this heavy, and Style & Layout is still ~5.7–6.0 s. The change is still correct — it removes ~60 wasted renders per second of scrolling, which is the right thing for a real device — but it was **not** the dominant Lighthouse cost.

### What the trace actually blames

```
bootup: vendor-react      6,335 ms
bootup: (unattributed)    6,170 ms
bootup: zyphuel-order-guard.js  742 ms
DOM size                  757 elements, depth 14
long tasks                14 found
   1,153 ms  (unattributed)
     606 ms  zyphuel-order-guard.js   <-- a single blocking task
     522 ms  vendor-react.js
```

So the remaining cost is **React hydration of a 757-element page** plus the **order-guard plugin**, which despite its name runs on every route and contributes a single **606 ms** blocking task plus 742 ms of bootup. That is the next target, not the progress bar, and not the frames.

---

## 9. Updated next steps

| Priority | Change | Expected effect | Evidence |
|---|---|---|---|
| 1 | Make `zyphuel-order-guard.js` a no-op outside `/order/` (or defer it and skip the countdown work elsewhere) | Removes a 606 ms blocking task and 742 ms bootup from every non-order page | `long-tasks`, `bootup-time` |
| 2 | Lazy-load `vendor-pdf-barcode` only on invoice download | −492 KiB JS per page | `unused-javascript` |
| 3 | Reduce hydration work on content-heavy pages (defer below-the-fold sections) | Cuts the 6.3 s `vendor-react` bootup and the ~6 s of Style & Layout | `bootup-time`, `mainthread-work-breakdown` |
| 4 | Text LCP candidate above the `/download/` canvas | Makes that page measurable at all | `NO_LCP` |
| 5 | Font subsetting (253 KB of Font Awesome woff2) | Faster FCP | network list |

---

## 10. Order-guard scoped to `/order/` — re-measured

**What was wrong:** the guard (and its twin ES-module copy) initialised on every route — a subtree `MutationObserver` plus a 5 s interval, with `Intl.DateTimeFormat` built on every mutation batch. On `/services/` that produced a **606 ms blocking task** and **742 ms bootup** for a submit button that does not exist there.

**What changed:**

1. `public/plugins/zyphuel-order-guard/zyphuel-order-guard.js` — v2.1.0. Enforcement machinery (`enforceCutoff`, mutation observer, 5 s interval, submit interceptor) starts only on `/order/` and stops on route change; SPA navigation is tracked via patched `pushState`/`replaceState` + `popstate`. The hot observer callback now reads a **cached** cutoff boolean instead of formatting a date per mutation. The global `window.ZyphuelOrderGuard` API remains available everywhere.
2. `src/plugins/zyphuelOrderGuard.js` — returns a no-op off-route, injects the browser plugin on demand, and keeps its own 5 s interval only while on `/order/`.
3. `index.html` — the plugin `<script>` is no longer a global tag. A ~200-byte inline check appends it only when `location.pathname` is `/order/`, so other routes never request the file.

**Behaviour verified on the production build:**

| Route | Guard script requested | `ZyphuelOrderGuard` global | Body cutoff class | Submit button |
|---|---|---|---|---|
| `/services/` | **no** | undefined | absent | n/a |
| `/order/` | **yes** (v2.1.0) | present | applied | **absent** (cutoff enforced) |

**Re-measured** (`/services/`, two runs, same settings):

| Run | Score | TBT | Long tasks | Guard long tasks | Style & Layout |
|---|---|---|---|---|---|
| Before this change (§8, median) | 34 | 1,160–1,490 ms | 14 | **1 × 606 ms** | 5,736–6,189 ms |
| After — run 1 | **44** | **500 ms** | 11 | **0** | 3,802 ms |
| After — run 2 | **35** | 1,070 ms | 12 | **0** | 6,264 ms |

**Honest read:** the targeted metric is decisively fixed — the guard contributes **zero** long tasks and is no longer downloaded on non-order pages, and best-case TBT roughly halved (1,490 ms → 500 ms). The score moved from a median of **34 to ~39.5**, but run-to-run spread is still wide (35–44) because Style & Layout fluctuates between 3.8 s and 6.3 s — that is React hydration of a 757-element page, which the guard was never responsible for. Anyone quoting a single run of 44 as the page's score would be overstating it.

**Remaining dominant cost (unchanged):** hydration/layout. Next targets from §9 remain valid: lazy-load `vendor-pdf-barcode` (−492 KiB), reduce hydration on content-heavy pages, add an LCP candidate to `/download/`.

---

## 11. PDF/barcode bundle made lazy — re-measured (first clear score gain)

**Root cause (not what §9 assumed).** The 471 KB `vendor-pdf-barcode` chunk was not being pulled in by a stray component import. `vite.config.js` pinned `jspdf`, `qrcode` and `jsbarcode` into one named chunk via `manualChunks`; Rollup then placed **Vite's own `__vitePreload` helper** inside that chunk, and because the entry chunk uses dynamic imports it statically imported the helper — dragging all 471 KB onto every page and emitting `<link rel="modulepreload">` for it in each prerendered HTML file.

**Fix.** Removed the `manualChunks` branch for those three packages. Rollup now keeps them inside the lazily-imported `generateInvoicePdf` chunk, which only loads when a customer downloads an invoice.

**Verified:**

| Check | Before | After |
|---|---|---|
| `dist/assets/vendor-pdf-barcode-*.js` | 471 KB, preloaded on every page | **does not exist** |
| `modulepreload` links in `/services/` HTML | vendor-react, **vendor-pdf-barcode**, articles-data | vendor-react, articles-data |
| Entry chunk references `jspdf`/`qrcode` | yes | **no** |
| Invoice PDF (click `#download-invoice-pdf-btn`) | worked | **worked** — `generateInvoicePdf-*.js` + `jspdf.es.min-*.js` loaded on demand, output `%PDF-`, 15,596 bytes |
| Page status (`/`, `/services/`, `/download/`, `/order/`, `/blog/`) | 200 | 200 |

**Re-measured** (`/services/`, two runs, same settings):

| Run | Score | TBT | FCP | LCP | Bytes | Unused JS |
|---|---|---|---|---|---|---|
| Before (§10, median) | 39.5 | 500–1,070 ms | 7.6–9.6 s | 10.2–11.0 s | 4,053 KiB | 492 KiB |
| After — run 1 | **42** | 660 ms | 7.0 s | 8.0 s | **3,576 KiB** | **113 KiB** |
| After — run 2 | **51** | **330 ms** | 6.7 s | 8.6 s | **3,576 KiB** | **113 KiB** |

**Honest read:** this is the first change in the whole audit with a clearly measurable gain — median score **39.5 → ~46.5**, TBT best case **330 ms** (from 1,490 ms at the start of the day), transfer **−477 KiB** on every non-order page, and unused JS down from 492 KiB to 113 KiB. Byte weight and the request list are deterministic, so those numbers are not noise; the score still varies run to run and should be quoted as a range.

**Still remaining:** Style & Layout (~4–6 s, React hydration of a 757-element page) and the missing LCP candidate on `/download/`.
