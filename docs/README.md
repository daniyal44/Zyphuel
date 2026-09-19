# Zyphuel Web Application — Documentation & Changelog Registry

This directory contains dedicated, up-to-date documentation (`.md`) files for every single page and subpage of the Zyphuel web application.

## Mandatory Maintenance Rule for AI Agents & Developers
> Whenever any page or subpage in `src/pages/`, `src/data/`, or `src/components/` is updated, you **MUST** immediately update the corresponding markdown file in `docs/pages/` with:
> 1. Exact nature of changes made.
> 2. Updated parameters, pricing, conditions, or logic.
> 3. Date, author/model, and user requirements fulfilled.

---

## Page Documentation Directory

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
| **404 Not Found** | `/404.html` | `src/pages/NotFoundPage.jsx` | [`docs/pages/not-found.md`](./pages/not-found.md) |

---

## Subpages & Blog Articles Directory

| Subpage Title | Route | Source Data / Component | Documentation File |
| :--- | :--- | :--- | :--- |
| **Pakistan Shift to Daily Fuel Pricing** | `/blog/future-of-fuel-delivery-lahore/` | `src/data/articles.js` (ID: 1) | [`docs/pages/subpages/future-of-fuel-delivery-lahore.md`](./pages/subpages/future-of-fuel-delivery-lahore.md) |
| **Download & Install Zyphuel APK Guide** | `/blog/download-zyphuel-apk-guide/` | `src/data/articles.js` (ID: 2) | [`docs/pages/subpages/download-zyphuel-apk-guide.md`](./pages/subpages/download-zyphuel-apk-guide.md) |
| **Industrial Generator Refueling** | `/blog/generator-refueling-services-lahore/` | `src/data/articles.js` (ID: 3) | [`docs/pages/subpages/generator-refueling-services-lahore.md`](./pages/subpages/generator-refueling-services-lahore.md) |
| **Generator Diesel & LPG Cylinder Delivery** | `/blog/generator-diesel-lpg-delivery-lahore/` | `src/data/articles.js` (ID: 4) | [`docs/pages/subpages/generator-diesel-lpg-delivery-lahore.md`](./pages/subpages/generator-diesel-lpg-delivery-lahore.md) |
| **IoT Telemetry & Smart Fuel Calibration** | `/blog/iot-telemetry-fuel-delivery/` | `src/data/articles.js` (ID: 5) | [`docs/pages/subpages/iot-telemetry-fuel-delivery.md`](./pages/subpages/iot-telemetry-fuel-delivery.md) |
| **Calibrated Telemetry Bowser Fleet** | `/blog/zyphuel-calibrated-telemetry-fleet/` | `src/data/articles.js` (ID: 6) | [`docs/pages/subpages/zyphuel-calibrated-telemetry-fleet.md`](./pages/subpages/zyphuel-calibrated-telemetry-fleet.md) |

---

## Core System Architecture & Vibe-Coding Context Directory

The 6 context files give AI assistants persistent source-of-truth knowledge for architecture, data modeling, and security:

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

## Master Changelog & Deprecation Registries

| Document | Description | File Link |
| :--- | :--- | :--- |
| **Master Changelog** | Complete chronological log of all phases from prototype to Phase 7 | [`changes.md`](../changes.md) |
| **Removed Features Log** | Deprecated pricing models, old delivery fees & superseded features | [`remove.md`](../remove.md) |
| **Deletion & Cleanup Log** | Purged banners, deleted notices, cleaned dead code & build artifacts | [`delete.md`](../delete.md) |

