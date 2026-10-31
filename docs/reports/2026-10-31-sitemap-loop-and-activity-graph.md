# 2026-10-31 — Sitemap redirect loop fixed, activity graph restored

**Scope:** sitemap/indexing diagnosis on the live site, `netlify.toml` redirect repair,
and the return of the repository change-velocity graph.
**Verified against:** `https://zyphuel.netlify.app/` with a Googlebot user agent.
**Commit:** the same commit that adds this file.

---

## 1. What was actually broken

The three URLs Google reports as not indexed — `/services/`, `/download/` and `/order/` —
were re-checked on the live deployment. All three pass every technical gate:

| Check | `/services/` | `/download/` | `/order/` |
| :--- | :--- | :--- | :--- |
| HTTP status | 200 | 200 | 200 |
| `X-Robots-Tag` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | same | same |
| `<meta name="robots">` | `index, follow, …` | same | same |
| Canonical | self-referencing | self-referencing | self-referencing |
| `<h1>` count | 1 | 1 | 1 |
| Visible words in prerendered HTML | 3,287 | 4,216 | 1,982 |
| Structured data | `FAQPage`, `Article`, `BreadcrumbList` | same | `FAQPage`, `DeliveryService`, `BreadcrumbList` |
| `noindex` anywhere in the document | no | no | no |

So the pages themselves are indexable. The **sitemap path**, however, had a real defect:

```
GET https://zyphuel.netlify.app/sitemap/   ->  301  Location: /sitemap/
GET https://zyphuel.netlify.app/sitemap/   ->  301  Location: /sitemap/
... 50 redirects ... curl error 47
```

`netlify.toml` contained:

```toml
[[redirects]]
  from = "/sitemap"
  to = "/sitemap/"
  status = 301
```

There is no `/sitemap/` file, and Netlify's pretty-URL handler answered that path with a
301 back to itself. Any submission of `…/sitemap/` — or any crawler that normalised the
path with a trailing slash — hits an infinite loop and reports a failed fetch. That is the
"site map failed" symptom in Search Console.

### Fix

```toml
[[redirects]]
  from = "/sitemap"
  to = "/sitemap.xml"
  status = 301
  force = true

[[redirects]]
  from = "/sitemap/"
  to = "/sitemap.xml"
  status = 301
  force = true
```

Both spellings now resolve to the real XML document in one hop.

## 2. Sitemap and robots are otherwise valid

| Artifact | Result |
| :--- | :--- |
| `/sitemap.xml` | 200, `application/xml`, 16,086 bytes, parses as a valid `urlset` |
| URL count | 23, no duplicates, all with trailing slashes |
| `<lastmod>` | present on 23/23 URLs, newest `2026-10-31` |
| `/services/`, `/download/`, `/order/` in sitemap | yes |
| `/robots.txt` | `Sitemap: https://zyphuel.netlify.app/sitemap.xml` present |
| robots disallows | only `/404.html`, `/api/`, `/plugins/` — none of the three URLs |
| `/sitemap_index.xml`, `/sitemap-index.xml` | 404 (no document references them) |

## 3. Repository activity graph restored

The graph was removed on 2026-10-01 together with every other chart SVG, following that
day's instruction to purge graph files. It is back, and it is now **generated from real
git history** rather than hand-typed:

| Item | Value |
| :--- | :--- |
| Generator | `scripts/make-activity-graph.mjs` |
| Output | `docs/reports/charts/development-activity.svg` + `.png` |
| x-axis | ISO week |
| Left y-axis | commits merged that week |
| Right y-axis | files touched that week |
| Window | last 12 ISO weeks (default; `--weeks N` to change) |
| Totals through `6c95658` | 321 commits, 12,083 file changes across 16 active weeks |
| Peak day | 14 commits on 2026-10-26 |

The README used to draw this with a Mermaid `xychart-beta` block. GitHub does not render
that diagram type, which is why the chart appeared missing. The README now embeds the
committed SVG (with a PNG link), so it displays on GitHub, in the editor and in a browser
without any renderer.

The stale hand-copied commit table in the README (it still claimed "182 total changes")
was replaced by a link to the live `commits/main` history, because a duplicated table
cannot stay truthful.

## 4. What still needs the owner (not fixable in code)

Search Console evaluates the pages, not the config file. After this deploy:

1. Re-submit the sitemap as `https://zyphuel.netlify.app/sitemap.xml` in GSC → Sitemaps.
2. If a `/sitemap/` entry exists in that list, delete it and re-add the `.xml` path.
3. URL Inspection → Request Indexing for the three URLs (walkthrough:
   [`docs/seo/2026-10-31-request-indexing-walkthrough.md`](../seo/2026-10-31-request-indexing-walkthrough.md)).
4. Bing: verify the site first, otherwise IndexNow keeps returning 403.

## 5. Honest limits

- This environment cannot sign in to Search Console, so "indexed" cannot be asserted from
  here. Everything above is what a crawler receives from the live site.
- A 301 loop explains a failed sitemap fetch; it does not by itself explain every
  "Crawled – currently not indexed" entry. Google's decision also depends on content
  value and site authority, which no redirect change can shortcut.
