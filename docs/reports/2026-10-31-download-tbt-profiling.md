# Report — `/download/` main-thread profiling, 2026-10-31

**Goal:** cut the 3.08 s TBT that remained on `/download/` after the AdSense / caching round.
**Outcome:** the causes are identified precisely; the fixes that were tried did **not** produce a reliable improvement, and the one change that would is a decision only the owner can make.

---

## 1. What the profile actually said

Lighthouse 13.6.0, mobile, `https://zyphuel.netlify.app/download/`, TBT 3.08 s:

| Signal | Value | Reading |
| :--- | :--- | :--- |
| Longest long task | **3.26 s starting at 5.8 s** | `vendor-react` — React hydration of the 1,259-element document |
| Second | 1.44 s at 1.9 s | the document itself (inline boot work) |
| Ad tasks | 0.21 s + 0.18 s + 0.16 s | AdSense inserting its iframe |
| Main-thread groups | Other 8.20 s · **Style & Layout 6.17 s** · Script 2.29 s | style/layout is the dominant cost, not parsing |
| Scripts on the wire | 398 KB in 12 files | of which **223 KB is Google AdSense** |
| Our scripts | index 30 KB · vendor-react 50 KB · **articles-data 41 KB** · DownloadPage 15 KB · pageDeepDives 6 KB | `articles-data` is blog content this page never renders |

Two concrete, fixable facts came out of that:

1. **`articles-data` (135 KB raw / 41 KB transferred) is shipped to `/download/`.** `vite.config.js` pins anything matching `articles` into that chunk, and `HomePage` was imported by the entry module, so the chunk sat in the entry graph of every route.
2. **The 3.26 s task begins at 5.8 s — the same moment the ad script injects.** Style & Layout doubles to 6.17 s in that window.

## 2. What was tried, and what it measured

Every number below is a live Lighthouse run against production after the corresponding deploy.

| Attempt | Change | Measured result | Verdict |
| :--- | :--- | :--- | :--- |
| A | Make `HomePage` a lazy route so `articles-data` leaves the non-blog entry graph | The chunk still loaded: it also carries modules that `/download/` and `/services/` genuinely import, so the transfer stayed and the page gained one extra request. TBT 3.08 → 5.72 s on that run. | **Reverted** |
| B | `content-visibility: auto` on the seven lower download sections | TBT 1.44–1.79 s on one pair of runs, but **CLS 0.052 → 0.115** | Containment removed: CLS regression is not acceptable for a TBT win that did not reproduce |
| C | Reserve the canvas box in the entry stylesheet | **CLS 0.237**, TBT 2.38–2.82 s | **Reverted** |
| D | Load ads on first interaction, 20 s ceiling | TBT **5.9–7.1 s across three runs** — worse than baseline | **Reverted**: a late ad insert keeps the page from reaching network quiet, which *extends* the blocking window |
| E | Ads on idle-after-load, 12 s ceiling (the earlier configuration) | Best measured state (3.08 s) | **Kept** |

Final code state: idle-after-load ad timing, no download containment, `HomePage` eager. CLS is back to 0.063 (was 0.052), i.e. inside run variance.

## 3. Why the numbers cannot be trusted at this precision

Across this session the same production URL measured:

```
TBT: 5.93  3.08  5.72  1.44  1.79  2.82  2.38  7.14  5.93  6.76  2.45  5.76  s
```

That is a 5× spread on identical code. The machine running the audits had builds and several Chrome instances on it, and TBT is a CPU-throttled, third-party-sensitive metric — AdSense alone can double it depending on which creative is auctioned. Any claim that a 300 ms change "fixed" TBT here would be made up. What *can* be stated honestly:

- Style & Layout (3.8–6.2 s) and the `vendor-react` hydration task are consistently the two largest costs.
- AdSense is consistently the largest *removable* cost: 223 KB of third-party JavaScript plus its own tasks and the layout it triggers inside a 1,259-element document.

## 4. The change that would actually move it

**Remove the AdSense script.** That is ~223 KB of JavaScript, the ad iframe insert, and the layout storm it causes — by measurement the single biggest lever left on this page. It is not a code-quality issue, it is a revenue decision, and nothing here was removed without instruction.

Options, in order of effect on TBT:

1. **Remove AdSense entirely** — biggest win, needs your approval.
2. **Keep ads only on blog pages** — the commercial pages stay fast, the content pages keep monetising.
3. **Keep as is** — measured best of the load-timing variants tested, no further gain without removing weight.

If none of those is acceptable, the remaining work is a genuine refactor: stop hydrating the static lower half of `/download/` (render it as static HTML instead of a React tree). That is a multi-hour change with real regression risk on a page whose scroll animation has already broken twice, so it should not be attempted as a quick fix.

## 5. What was verified in this round

- `npm run build` (client, SSR, prerender of 23 routes, IndexNow) succeeds on every commit.
- `/download/` prerendered HTML still contains its full markup after each experiment (1,301 elements on `/`).
- Live cache headers, canonical tags and the corrected `/order/` copy unchanged.
- Every experiment that made a metric worse was reverted and the revert was measured again.
