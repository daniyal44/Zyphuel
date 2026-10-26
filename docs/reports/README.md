# Zyphuel — Reports Hub

**Last updated:** 2026-10-26
**Repository:** `github.com/daniyal44/Zyphuel` (branch `main`)

This is the single entry point for every audit, QA pass and change report on the Zyphuel website. Each report below is committed and pushed; the graphs in this file are rendered from the same numbers the reports themselves contain.

> All Mermaid blocks on this page render natively on GitHub.

---

## 1. How the documentation fits together

```mermaid
flowchart TD
    P["docs/plans/<br/>Intent — what we meant to do<br/>SEO master plan · keyword map · backlink plan · 10 PM cutoff"] --> A
    A["docs/audits/<br/>Measurement — what the numbers were<br/>2026-10-21 competitor gap · Lighthouse · responsiveness"] --> Q
    Q["docs/qa/<br/>Verification — what was tested<br/>2026-10-26 full QA of 17 routes · 81/100"] --> R
    R["docs/reports/<br/>Consolidation — what actually changed<br/>2026-10-26 change report · 9 commits"] --> C
    C["docs/changes.md<br/>Phase log — Phase 17 to 23"]
    PG["docs/pages/ + subpages/<br/>Per-page docs — 9 pages · 7 subpages"] --> C
    R --> PG
```

| Stage | Folder | Question it answers |
| :--- | :--- | :--- |
| Plan | `docs/plans/` | What did we set out to do? |
| Audit | `docs/audits/` | What was measured, and how bad was it? |
| QA | `docs/qa/` | Did it actually work after the change? |
| Report | `docs/reports/` | What changed, by how much, and on whose authority? |
| Log | `docs/changes.md` | In what order did the whole project happen? |

---

## 2. Every report in the repository

| Date | Report | Type | Score / Headline | File |
| :--- | :--- | :--- | :--- | :--- |
| **2026-10-21** | Competitor Gap, Responsiveness & Performance Audit | Audit | Home desktop 86–99, mobile 66; `/download/` mobile **34** | [`docs/audits/2026-10-21-audit.md`](../audits/2026-10-21-audit.md) |
| **2026-10-26** | Full Manual QA & Health Report | QA | **81 / 100** across 9 categories | [`docs/qa/2026-10-26-full-qa-report.md`](../qa/2026-10-26-full-qa-report.md) |
| **2026-10-26** | Complete Website Change Report | Report | 60 files · +1,812 / −658 · 9 commits | [`docs/reports/2026-10-26-website-changes-report.md`](./2026-10-26-website-changes-report.md) |
| **ongoing** | Project phase log (Phase 1 → 23) | Log | 1,300+ lines of chronological history | [`docs/changes.md`](../changes.md) |
| **2026-10-26** | Keyword map & routing plan | Plan | Money + PAA + long-tail + AI prompts | [`docs/plans/2026-10-26-keyword-map.md`](../plans/2026-10-26-keyword-map.md) |

---

## 3. QA score by area — 2026-10-26

```mermaid
xychart-beta
    title "Zyphuel QA score out of 100 (2026-10-26)"
    x-axis ["Security", "AEO", "GEO", "SEO tech", "Build", "Mobile", "Perf", "A11y", "Trust"]
    y-axis "Score" 0 --> 100
    bar [98, 92, 90, 95, 87, 82, 78, 75, 55]
```

| Area | Score | One-line reason |
| :--- | :---: | :--- |
| Security / anti-spam | 98 | 17 pages clean; one fake Baidu token removed |
| AEO | 92 | 18-question FAQ schema survives hydration |
| GEO | 90 | `llms.txt` corrected; 30+ AI crawler rules |
| Technical SEO | 95 | 17/17 pages pass; all meta inside SERP limits |
| Build integrity | 87 | 17/17 routes prerender, 0 errors |
| Mobile | 82 | Order stepper fixed; contact table still scrolls |
| Performance | 78 | 73 MB dead video + 328 MB frames still deployed |
| Accessibility | 75 | All images have `alt`; some small icon buttons |
| **Content trust** | **55** | **Regulatory claims need a licence number** |

**Weighted overall: 81 / 100.**

---

## 4. Where the site stood before the 2026-10-26 fixes

Lighthouse Performance, measured on the 2026-10-21 build (desktop reported as the range across runs; mobile is a single run).

```mermaid
xychart-beta
    title "Lighthouse Performance — 2026-10-21 build"
    x-axis ["Home", "Order", "About", "Services", "Contact", "Download", "Blog", "Privacy", "Terms"]
    y-axis "Score" 0 --> 100
    bar [99, 98, 97, 93, 96, 88, 95, 97, 93]
    line [66, 61, 64, 56, 86, 34, 77, 73, 87]
```

> Bar = desktop (best run) · Line = mobile. The mobile line is the reason this round of work happened: `/download/` scored **34** and `/services/` **56**, both driven by megabytes of frame-sequence images rather than by JavaScript.

| Page | Desktop | Mobile | Mobile blocker |
| :--- | ---: | ---: | :--- |
| `/download/` | 88 | **34** | Two sticky canvas stages — "Style & Layout" 6.3 s, TBT 2,600 ms |
| `/services/` | 93 | **56** | 300-frame hero preloading ~6 MB on cellular |
| `/order/` | 98 | **61** | Frame-sequence hero is the LCP element |
| `/about/` | 97 | 64 | Font-loading CLS (since fixed) |

---

## 5. Change mix — the 2026-10-26 round

60 files changed across 9 commits, **+1,812 / −658** lines.

```mermaid
pie showData
    title "Files changed by area (2026-10-26 round)"
    "src/ — components and pages" : 24
    "docs/ — reports, plans, page docs" : 20
    "public/ — sitemap, robots, llms, og image" : 7
    "root config — package, netlify, README, AGENTS" : 7
    "scripts/ — qa-static, fuel updater" : 2
```

---

## 6. Timeline of the 2026-10-26 session

```mermaid
gantt
    title Zyphuel website work — 2026-10-26 (PKT)
    dateFormat YYYY-MM-DD HH:mm
    axisFormat %H:%M
    section 1 — Release
    6dfe8ed Android v2.6.4.0.0.33 sync and 85 kB gzip cut :done, a1, 2026-10-26 18:44, 3m
    f5a2b05 Download page doc correction                  :done, a2, 2026-10-26 18:49, 3m
    section 2 — SEO and GEO
    d0a3b16 Truthful OG card and one business entity      :done, b1, 2026-10-26 20:04, 3m
    d8e1c03 Price and app keyword clusters                :done, b2, 2026-10-26 20:11, 3m
    500bcf7 Trust audit and keyword map                   :done, b3, 2026-10-26 20:12, 3m
    b815052 Sitemap lastmod refresh                       :done, b4, 2026-10-26 20:13, 3m
    section 3 — Bug fixes
    ee3405a FAQ panels clipped                            :done, c1, 2026-10-26 20:33, 3m
    a23f80c 45 minute window and responsive stepper       :done, c2, 2026-10-26 20:53, 3m
    section 4 — Reporting
    18db378 Meta lengths normalised                       :done, d1, 2026-10-26 21:10, 3m
    f71a319 Consolidated change report                    :done, d2, 2026-10-26 21:14, 3m
```

---

## 7. What is still open, and who can close it

```mermaid
pie showData
    title "Open items by owner"
    "Owner only — account access or a business decision" : 4
    "Agent — code and content, no external access needed" : 4
```

| # | Open item | Owner | Why it is blocked |
| :--- | :--- | :--- | :--- |
| 1 | Request Indexing in Search Console for `/order/`, `/download/`, `/services/` | **Owner** | Needs the owner's Google login |
| 2 | Confirm or soften the OGRA / NFPA / weights-and-measures claims | **Owner** | Only the owner knows whether the licences exist |
| 3 | Decide whether LPG and water stay on the order page | **Owner** | A business decision, not a bug |
| 4 | Register the IndexNow key in Bing Webmaster Tools | **Owner** | Bing returns 403 until the site is verified there |
| 5 | Remove the 73 MB of unused video still deployed | Agent | — |
| 6 | Add `width`/`height` to 55 hotlinked Unsplash images | Agent | — |
| 7 | Fix the contact page coverage table on phone widths | Agent | — |
| 8 | Move to a custom domain | Owner / Agent | Domain purchase and DNS access |

---

## 8. How to regenerate the automated numbers

```bash
npm install
npm run build                 # vite build + SSR build + prerender 17 routes
node scripts/qa-static.cjs    # per-page PASS/FAIL table, writes scratch/qa-static.json
npx vite preview --port 4174  # then inspect in a browser
```

`node scripts/qa-static.cjs` checks, on every prerendered page: H1 count, title and description length, canonical, duplicate ids, JSON-LD validity, `<img alt>`, missing assets, broken internal links, and any leftover "urgent" copy.
