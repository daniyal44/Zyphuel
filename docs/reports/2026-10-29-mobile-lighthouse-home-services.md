# Zyphuel Mobile Lighthouse Report — Home & Services

**Audit date:** 2026-10-29
**Scope:** Home (`/`) and Services (`/services/`) after the canvas hero CSS poster change
**Environment:** Local production build; Lighthouse 13.6; mobile simulated throttling

> This is the current report for these two routes. The result did **not** meet the requested 67-point target. These are local-build Lighthouse lab measurements, not a promise of field performance or a guarantee of search ranking.

## Performance score — 2D chart

![Mobile Lighthouse chart: Home and Services](./charts/lighthouse-mobile-2026-10-29.svg)

The horizontal axis lists the audited pages; the vertical axis shows the Lighthouse Performance score from 0 to 100. The dashed red line marks the 67-point target.

## Measured results

| Route | Performance | FCP | LCP | TBT | CLS | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | **46** | 2.2 s | **9.7 s** | 1,000 ms | 0 | 100 | 100 | 100 |
| `/services/` | **46** | 2.0 s | **8.4 s** | 1,240 ms | 0.001 | 100 | 100 | 100 |

## Findings

- On both pages, Lighthouse identified the analytics-consent notice paragraph (`.analytics-consent > p`) as the LCP element.
- Main-thread work remained high: Home **12.3 s**; Services **9.6 s**. Style & Layout accounted for 4.65 s and 3.79 s respectively.
- Removing the canvas frame-001 CSS backgrounds was not sufficient to reach the target; this report does not claim that the LCP issue or hydration cost is fixed.
- Earlier 97/98 readings used `--throttlingMethod=provided`, which does not apply Lighthouse's simulated mobile CPU/network throttling. They are not comparable to these standard simulated-mobile results.

## Verification recorded for this audit

The production build completed successfully, both local routes returned HTTP 200, and Lighthouse 13.6 mobile simulated audits completed. No claim is made here about the deployed site's current score; these runs audited the local production build.

## Detailed audit notes

See the [full mobile Lighthouse audit](../audits/2026-10-28-mobile-lighthouse-audit.md#16-home-and-services-poster-change-follow-up) for the methodology, LCP diagnosis, prior Download-page experiments, and comparison caveats.
