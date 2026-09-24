# Zyphuel Web Application — Unified Documentation Hub (`docs/`)

This directory serves as the centralized, comprehensive documentation suite for the Zyphuel web application. It includes dedicated operational references, architecture breakdowns, master changelogs, and individual page/subpage specifications from project inception ("start") to the present ("now").

---

## Mandatory Maintenance Rule for AI Agents & Developers

> Whenever ANY page, subpage, component, pricing rule, delivery SLA, or data file is modified or created, you **MUST ALWAYS** immediately update:
> 1. The corresponding page documentation file in `docs/pages/` or `docs/pages/subpages/`.
> 2. The centralized master files (`docs/changes.md`, `docs/memory.md`, `docs/task.md`).
> 3. The master table of contents in `docs/README.md`.

---

## 1. Master Documentation Suite (13 Core Files)

All 13 core documentation files are consolidated directly in this directory (`docs/`):

| # | Document | File Path | Scope & Description |
|---|---|---|---|
| 1 | **Master Changelog** | [`docs/changes.md`](./changes.md) | Chronological log of all phases, sprints, and feature refactors (Phase 1 to Phase 8). |
| 2 | **Deletion & Cleanup Log** | [`docs/delete.md`](./delete.md) | Permanent deletions, purged UI banners, removed formula tags, and dead code cleanup. |
| 3 | **Removed & Deprecated Features** | [`docs/remove.md`](./remove.md) | Superseded pricing models, deprecated APIs, outdated fees, and legacy business logic. |
| 4 | **Core System Memory & Invariants** | [`docs/memory.md`](./memory.md) | Permanent business invariants: 5L–15L limits, flat Rs. 280 fee, 45-min SLA, payment policies. |
| 5 | **Codebase Architecture & Structure**| [`docs/structure.md`](./structure.md) | Complete directory tree, component hierarchy, state flow, and SSG build pipeline. |
| 6 | **Product Vision & Origin Story** | [`docs/idea.md`](./idea.md) | Problem statement, solution design, value pillars, founder story, and product roadmap. |
| 7 | **Master Task Registry** | [`docs/task.md`](./task.md) | Completed engineering milestones, active tasks, and upcoming backlog. |
| 8 | **Primary Pages Breakdown** | [`docs/pages.md`](./pages.md) | Comprehensive functional and technical catalog of all 11 primary pages. |
| 9 | **Subpages & Articles Scope** | [`docs/subpages.md`](./subpages.md) | Routing architecture, schema markup, and technical specifications for all 6 subpages. |
| 10 | **Corporate & Operational Intel** | [`docs/informtion.md`](./informtion.md) | Regulatory credentials (OGRA, SECP, NTN), fleet hardware, fuel specs, and hours. |
| 11 | **Editorial Knowledge Index** | [`docs/articles.md`](./articles.md) | Master editorial registry, SEO target keywords, search intents, and article sync logs. |
| 12 | **Executive Retrospective** | [`docs/conclusion.md`](./conclusion.md) | Executive synthesis, engineering achievements, business validation, and future horizons. |
| 13 | **Development Build Phases** | [`docs/phases.md`](./phases.md) | Phase 1 to Phase 8 milestone deep-dives, timelines, objectives, and deliverables. |

*(Note: [`docs/information.md`](./information.md) is provided as an exact alias for [`docs/informtion.md`](./informtion.md)).*

---

## 2. Primary Page Documentation Directory (`docs/pages/`)

| Page Name | Route | Source Component | Documentation File |
| :--- | :--- | :--- | :--- |
| **Home** | `/` | `src/pages/HomePage.jsx` | [`docs/pages/home.md`](./pages/home.md) |
| **Order Fuel** | `/order/` | `src/pages/OrderPage.jsx` | [`docs/pages/order.md`](./pages/order.md) |
| **About Us** | `/about/` | `src/pages/AboutPage.jsx` | [`docs/pages/about.md`](./pages/about.md) |
| **Services** | `/services/` | `src/pages/ServicesPage.jsx` | [`docs/pages/services.md`](./pages/services.md) |
| **Download App** | `/download/` | `src/pages/DownloadPage.jsx` | [`docs/pages/download.md`](./pages/download.md) |
| **Contact Us** | `/contact/` | `src/pages/ContactPage.jsx` | [`docs/pages/contact.md`](./pages/contact.md) |
| **Blog Listing** | `/blog/` | `src/pages/BlogListPage.jsx` | [`docs/pages/blog.md`](./pages/blog.md) |
| **Privacy Policy** | `/privacy/` | `src/pages/PrivacyPolicyPage.jsx` | [`docs/pages/privacy-policy.md`](./pages/privacy-policy.md) |
| **Terms of Use** | `/terms/` | `src/pages/TermsOfUsePage.jsx` | [`docs/pages/terms-of-use.md`](./pages/terms-of-use.md) |
| **HTML Sitemap** | `/sitemap/` | `src/pages/HtmlSitemapPage.jsx` | [`docs/pages/sitemap.md`](./pages/sitemap.md) |
| **404 Not Found** | `/404.html` | `src/pages/NotFoundPage.jsx` | [`docs/pages/not-found.md`](./pages/not-found.md) |

---

## 3. Subpages & Blog Articles Directory (`docs/pages/subpages/`)

| Subpage Title | Route | Source Data / Component | Documentation File |
| :--- | :--- | :--- | :--- |
| **Pakistan Shift to Daily Fuel Pricing** | `/blog/future-of-fuel-delivery-lahore/` | `src/data/articles.js` (ID: 1) | [`docs/pages/subpages/future-of-fuel-delivery-lahore.md`](./pages/subpages/future-of-fuel-delivery-lahore.md) |
| **Download & Install Zyphuel APK Guide** | `/blog/download-zyphuel-apk-guide/` | `src/data/articles.js` (ID: 2) | [`docs/pages/subpages/download-zyphuel-apk-guide.md`](./pages/subpages/download-zyphuel-apk-guide.md) |
| **Industrial Generator Refueling** | `/blog/generator-refueling-services-lahore/` | `src/data/articles.js` (ID: 3) | [`docs/pages/subpages/generator-refueling-services-lahore.md`](./pages/subpages/generator-refueling-services-lahore.md) |
| **Generator Diesel & LPG Cylinder Delivery** | `/blog/generator-diesel-lpg-delivery-lahore/` | `src/data/articles.js` (ID: 4) | [`docs/pages/subpages/generator-diesel-lpg-delivery-lahore.md`](./pages/subpages/generator-diesel-lpg-delivery-lahore.md) |
| **IoT Telemetry & Smart Fuel Calibration** | `/blog/iot-telemetry-fuel-delivery/` | `src/data/articles.js` (ID: 5) | [`docs/pages/subpages/iot-telemetry-fuel-delivery.md`](./pages/subpages/iot-telemetry-fuel-delivery.md) |
| **Calibrated Telemetry Bowser Fleet** | `/blog/zyphuel-calibrated-telemetry-fleet/` | `src/data/articles.js` (ID: 6) | [`docs/pages/subpages/zyphuel-calibrated-telemetry-fleet.md`](./pages/subpages/zyphuel-calibrated-telemetry-fleet.md) |

---

## 4. Core System Architecture & Vibe-Coding Context Directory (`docs/vibe-coding/`)

| Document | Purpose | File Link |
| :--- | :--- | :--- |
| **Vibe Coding Guide** | Context files guide & golden rules | [`docs/vibe-coding/README.md`](./vibe-coding/README.md) |
| **Architecture** | High-level solution design, tech stack & data flow | [`docs/vibe-coding/architecture.md`](./vibe-coding/architecture.md) |
| **Phases** | Product milestones and build phases (Phase 1–7) | [`docs/vibe-coding/phases.md`](./vibe-coding/phases.md) |
| **Database & Storage**| Client schemas, SessionStorage & LocalStorage contracts | [`docs/vibe-coding/database.md`](./vibe-coding/database.md) |
| **Prompts** | AI system prompts and WhatsApp dispatch templates | [`docs/vibe-coding/prompts.md`](./vibe-coding/prompts.md) |
| **Security** | Input sanitization, CORS proxies, rate limits & anti-spam | [`docs/vibe-coding/security.md`](./vibe-coding/security.md) |
| **Error Handling** | Failover strategy, toast bus & validation error states | [`docs/vibe-coding/error-handling.md`](./vibe-coding/error-handling.md) |
| **Generator Prompt** | Meta-prompt for feature expansions | [`docs/vibe-coding/generator-prompt.md`](./vibe-coding/generator-prompt.md) |

---

## 5. Real-Time Development & Chat Session Logs (`docs/chat/`)

| Session Date | Scope & Key Focus | File Link |
| :--- | :--- | :--- |
| **2026-09-19** | Retail Pump Markup (+Rs. 2.50), UI De-cluttering, Vibe-Coding Context Files & Robots.txt Protocol | [`docs/chat/chat-history-2026-09-19.md`](./chat/chat-history-2026-09-19.md) |
