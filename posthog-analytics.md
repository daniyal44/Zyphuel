# PostHog product analytics — order-journey funnel

Integration note for the sponsored `posthog-product-analytics` procedure. Everything below is
implemented in this working copy; nothing is deployed and no event has been transmitted.

## 1. Repository facts (baseline, before any edit)

| Item | Value |
| --- | --- |
| Package manager | `npm` — `packageManager` is not declared in `package.json`; the repo ships `package-lock.json` (`lockfileVersion: 3`) |
| Original lock paths | `package-lock.json` at the repository root (no `yarn.lock`, `pnpm-lock.yaml` or `bun.lockb` anywhere) |
| Owning package | single root package `zyphuel-react` (private), React 18.3.1 + Vite 5.4.2 SPA with a prerender/SSR pass |
| Framework / layout | Vite + React SPA (`src/main.jsx` → `src/App.jsx` → `src/pages/*`), streaming prerender via `src/entry-server.jsx` and `prerender.js`, Netlify deploy (`netlify.toml` runs `npm run build`) |
| Toolchain | Node v24.18.0; npm bundled with it; Vite 5.4.2 from `node_modules` |
| Build command | `npm run build` → `vite build` + `vite build --ssr src/entry-server.jsx --outDir dist-ssr` + `node prerender.js` + `node scripts/indexnow.js` (the last step POSTs the live sitemap to search engines, so it was **not** run here) |
| Typecheck script | **none** — `package.json` has no `typecheck`/`tsc` script and the project is plain JSX |
| Lint script | **none** — no `lint` script and no ESLint config in the repo |
| Test script | **none** — the repo had no test runner; the offline checks added here use the toolchain already present (`node --test`) |

**Baseline checks run before editing** (all clean, no pre-existing failures):

- `node node_modules/vite/bin/vite.js build` → built in 6.84 s, exit 0
- `node node_modules/vite/bin/vite.js build --ssr src/entry-server.jsx --outDir dist-ssr` → exit 0
- `node prerender.js` → "SSG completed successfully for all 17 routes", exit 0

Existing analytics/consent code found before the change: **none**. There is no GA, GTM, PostHog,
Plausible or CMP integration in `src/`, so nothing needed extending and no CMP had to be kept.

## 2. Product question

> Of the visitors who open the doorstep order page, how many actually get an order request
> through to the dispatch hand-off — and which step (fuel grade → refueling target → volume →
> submit) loses the most people?

## 3. Event contract

All four events are captured from the real handlers in `src/pages/OrderPage.jsx`. Captures are
gated by `src/analytics/posthog.js` (no token/host, no consent → nothing is sent).

| Event | Trigger (real file / function) | Allowed properties |
| --- | --- | --- |
| `order_page_viewed` | `src/pages/OrderPage.jsx` — `useEffect` on mount (funnel step 1) | `entry_source` (`direct` \| `fuel_deeplink`) |
| `refuel_target_selected` | `src/pages/OrderPage.jsx` — target card `onClick` → `captureRefuelTargetSelected` (funnel step 2) | `refuel_target` (`car` \| `bike` \| `generator` \| `machinery`), `fuel_grade` |
| `fuel_volume_selected` | `src/pages/OrderPage.jsx` — `syncFuelQty(val, source)` used by the −/+/input/slider/quick-select controls (funnel step 3) | `fuel_grade` (`petrol` \| `diesel` \| `highOctane`), `volume_litres` (integer 5–15), `selection_source` (`preset` \| `stepper` \| `input` \| `slider`) |
| `order_request_submitted` | `src/pages/OrderPage.jsx` — `startTracking()` after validation, night-cutoff guard and the truck-button submit (funnel step 4, success) | `fuel_grade`, `refuel_target`, `volume_litres`, `delivery_fee_pkr` (300–400), `total_pkr`, `payment_option` (`cash_on_delivery` \| `advance_digital`) |

Property allowlisting lives in `ALLOWED_PROPERTIES` in
[`src/analytics/posthog.js`](src/analytics/posthog.js): any key not listed for that event —
name, phone, email, address, plate, notes, card/token fields — is dropped before capture, and
each value is type/range checked.

## 4. Identity

No authentication exists in this app, so visitors stay **anonymous**: no `identify()` call
anywhere, `person_profiles: 'never'`, and PostHog's own device distinct id is the only identity.
`resetAnalyticsIdentity()` / `client.reset()` is wired to the consent opt-out path so declining
throws the current distinct id away; it is ready to be called from a logout if one is ever added.

## 5. Consent

- The client is created with `opt_out_capturing_by_default: true`, so no cookie, session or
  event exists before a choice is made.
- The only decision store is `localStorage['zyphuel_analytics_consent']` (`granted` / `denied`).
  No decision = off (`analyticsConsentDecision()` returns `null`, `capture()` returns false).
- The bar in [`src/components/AnalyticsConsent.jsx`](src/components/AnalyticsConsent.jsx)
  (rendered from `src/App.jsx`) calls `grantAnalyticsConsent()` → `opt_in_capturing()` or
  `denyAnalyticsConsent()` → `opt_out_capturing()` + `reset()`.
- Other privacy defaults: `autocapture: false`, `capture_pageview: false`,
  `capture_pageleave: false`, `capture_dead_clicks: false`, `disable_session_recording: true`,
  `disable_surveys: true`, `advanced_disable_flags: true`,
  `disable_external_dependency_loading: true` (no replay, surveys, error collection or flags).
- `before_send: scrubAnalyticsEvent` removes `$referrer`, `$referring_domain`, `$ip*`, `$set`,
  `$set_once`, `$initial_person_info` and geo fields, and reduces `$current_url`,
  `$session_entry_url` and `$initial_current_url` to their path (query string and origin gone).
  It also re-applies the per-event allowlist to every property in the payload.
- Analytics failures are swallowed: `init()`, `capture()`, `opt_in/out` and `reset()` are all
  wrapped, and a promise-returning `capture` gets a `.catch(() => {})`.

## 6. Installation evidence

| Item | Value |
| --- | --- |
| Importer | root package (the only package in the repo: `zyphuel-react`, `package.json`) — it is the workspace that imports the browser SDK |
| Install command form used | `npm install --save-exact posthog-js@1.438.13` in the repository root (native guard: install scripts disabled) |
| Manifest pin | `package.json` → `"posthog-js": "1.438.13"` (exact, no range) |
| Resolved version | `package-lock.json` → `packages["node_modules/posthog-js"].version = "1.438.13"`, and `packages[""].dependencies["posthog-js"] = "1.438.13"` |
| Lock | original `package-lock.json` kept and updated in place (lockfileVersion 3) — no second lock, no migration, no alternate manager |
| SDK boundary | `src/analytics/posthog.js`, initialized once from `src/main.jsx` via `initAnalytics()` (dynamic `import('posthog-js')`, browser only); one singleton client — no second PostHog instance |
| Server/Python | not used as an analytics route: this is a static SPA with no server capture, so no second SDK was added |

## 7. Configuration (public values only)

Names come from `src/analytics/posthog.js` and `.env.example`:

```
VITE_POSTHOG_PROJECT_TOKEN=      # public project token (never a personal/secret key)
VITE_POSTHOG_HOST=               # https://us.i.posthog.com or https://eu.i.posthog.com
```

- A missing token, a `phx_` (secret) key, or a missing/unknown ingestion host keeps capture off
  (`resolveAnalyticsConfig` returns `enabled: false`); no network request is made.
- Real values belong in an untracked local `.env` (already ignored via `.env` in `.gitignore`);
  `.env.example` carries empty placeholders only.

## 8. Live analysis (to build in PostHog once the project is configured)

- **Insight type**: Funnel (ordered steps, "unique users").
- **Event order**: `order_page_viewed` → `refuel_target_selected` → `fuel_volume_selected` →
  `order_request_submitted`.
- **Denominator**: unique visitors with `order_page_viewed` on `/order/` (consented visitors only,
  because nothing is captured before consent).
- **Timeframe**: last 30 days, with a 7-day conversion window so a visitor can finish the order on
  a later visit. Re-check weekly.
- **Success measure**: funnel conversion from `order_page_viewed` to `order_request_submitted`,
  plus the per-step drop-off (step with the lowest step-to-step conversion is the fix target).
- **Concrete finding to report**: the step conversion percentages, the weakest step, and the
  top `selection_source` / `refuel_target` among visitors who reach `order_request_submitted`.

## 9. Offline verification

`posthog-analytics.verify.mjs` runs `tests/posthog-analytics/analytics.test.mjs` with
`node --test` (shell:false, bounded, no shell), against the real exported handlers with an
in-memory transport, a synthetic project token injected through the child environment and no
network access. It fails when the runner, the tests or the assertions are missing.

What the suite proves (15 tests, 124 assertions, all green):

- missing token / `phx_` secret / missing or unknown host → no client is created and captures
  return `false`;
- no consent decision and a denied decision → zero events; a granted decision opts in and stores
  the choice;
- all four real actions emit exactly once, with only allowlisted, type-checked properties, and
  unknown events or out-of-range values are refused;
- email / phone / address / card / password / token / notes sentinels never reach a payload, and
  `before_send` reduces `$current_url`/`$session_entry_url` to their path while deleting
  `$referrer`, `$referring_domain`, `$set`, `$set_once`, `$ip*` and geo fields;
- a throwing or rejecting transport, and an SDK that fails to load, leave the journey intact
  (`capture` reports `false`, nothing is thrown);
- visitors stay anonymous (no `identify()` path) and `reset()` is available for opt-out/logout;
- `src/pages/OrderPage.jsx` really calls all four handlers, `package.json` and
  `package-lock.json` pin `1.438.13`, no second lock exists, `.env.example` has empty
  `VITE_POSTHOG_PROJECT_TOKEN`/`VITE_POSTHOG_HOST` placeholders, `.env` is git-ignored, and no
  changed file contains a PostHog key literal.

## 10. Checks after the change

| Check | Result |
| --- | --- |
| `node posthog-analytics.verify.mjs` | PASS — 15 tests, 124 assertions, synthetic token only, zero network attempts |
| `node node_modules/vite/bin/vite.js build` | PASS — exit 0, `posthog-js` split into its own lazily imported chunk (`module-*.js`), loaded only when a token/host is configured |
| `node node_modules/vite/bin/vite.js build --ssr src/entry-server.jsx --outDir dist-ssr` | PASS — exit 0 |
| `node prerender.js` | PASS — all 17 routes prerendered; the consent bar is absent from the prerendered HTML (renders only after hydration, so no mismatch) |
| dev server smoke (`vite --port 5199`) | PASS — `src/analytics/posthog.js` and `src/pages/OrderPage.jsx` transform with 200, `/order/` serves 200, no stderr |
| typecheck / lint / test scripts | not defined in `package.json` before or after this change — nothing to run, no failures introduced |
| `npm run build` (also runs `scripts/indexnow.js`) | not run: the extra step submits the live sitemap to search engines, which this offline procedure must not do |

Nothing was deployed, and no real event was sent from this working copy.
