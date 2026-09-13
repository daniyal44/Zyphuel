# Zyphuel Web Application — Technical Architecture Document

This document provides a comprehensive technical breakdown of the architecture, subsystems, data flow, deployment pipelines, and design patterns implemented across the Zyphuel web application.

---

## 1. System Architecture Diagram

```mermaid
graph TB
    subgraph ClientLayer ["Client Presentation Layer (React 18 + Vite 5)"]
        UI[Responsive Modern UI Components]
        Router[React Router DOM v6 Client Navigation]
        SEO[useSEO Hook & JSON-LD Structured Data]
        ThreeJS[Three.js 3D Bowser Model Showcase]
        GSAP[GSAP Dispatch Button & Truck Animations]
        Theme[ThemeContext & Dark/Light System Tokens]
    end

    subgraph StateLayer ["State & Business Logic Layer"]
        FPC[FuelPriceContext & localStorage Cache]
        Cart[Order Configuration & Volumetric Stepper]
        Rules[Core Pricing & Delivery Economics Engine]
        Validation[Form Validator & Toast Notifications]
    end

    subgraph SSGLayer ["Build & Pre-rendering Pipeline (SSG)"]
        ViteClient[Vite Client Bundle (dist/assets)]
        ViteSSR[Vite SSR Bundle (dist-ssr/entry-server.js)]
        Prerender[prerender.js Static HTML Generator]
        StaticHTML[16 Static HTML Pre-rendered Pages]
        SitemapGen[sitemap.xml / robots.txt / llms.txt Sync]
    end

    subgraph ExternalLayer ["External Services & Dispatch Handlers"]
        WhatsApp[WhatsApp Dispatch URL Generator (+92 3230-112464)]
        APK[Direct Android APK v2.0.4 Distribution (/apk/)]
        IndexNow[IndexNow Search Engine Push]
        Netlify[Netlify Edge CDN Deployment]
    end

    UI --> Router
    Router --> Cart
    Cart --> FPC
    Cart --> Rules
    Rules --> Validation
    Validation --> GSAP
    GSAP --> WhatsApp

    ViteClient --> Prerender
    ViteSSR --> Prerender
    Prerender --> StaticHTML
    StaticHTML --> Netlify
```

---

## 2. Technology Stack & Dependencies

| Category | Technology | Purpose / Role |
| :--- | :--- | :--- |
| **Framework** | React 18.3 | Core UI library with component composition and modern hooks |
| **Build Tool & Bundler** | Vite 5.4 | Ultra-fast HMR and production bundle optimization |
| **Routing** | `react-router-dom` v6 | Declarative client-side routing with historical fallback |
| **Pre-rendering (SSG)** | Custom Node.js + `react-dom/server` | Build-time Static Site Generation for 16 distinct routes |
| **3D Graphics** | Three.js | WebGL interactive 3D model rendering (`Carousel3D.jsx`) |
| **Animations** | GSAP 3.x + CSS Keyframes | Timeline-based interactive truck dispatch animation and infinite tickers |
| **Styling** | Vanilla CSS with Custom Properties | Zero runtime overhead CSS variables (`:root`) with full dark/light theme support |
| **Icons** | FontAwesome 6.5 | Scalable vector glyphs across all interactive elements |
| **Hosting & CDN** | Netlify | Global edge delivery, automated SSL, and redirect rules |

---

## 3. Directory Structure

```
zyphuel-react/
├── .agents/              # Specialized AI agents and skill definitions
├── .claude/              # Claude agent commands and workflows
├── .github/assets/       # Repository activity charts and SVG assets
├── docs/                 # Comprehensive documentation registry
│   ├── README.md         # Master documentation index
│   ├── pages/            # 10 primary page documentation files (.md)
│   └── pages/subpages/   # 6 technical blog article subpage files (.md)
├── public/               # Static public assets, APKs, images, sitemap.xml
│   ├── apk/              # Official Android APK release binaries
│   ├── images/           # High-resolution team and equipment graphics
│   └── 3D/               # WebGL 3D model geometry and textures
├── scripts/              # Build utilities (indexnow.js, graph generators)
├── src/
│   ├── components/       # Reusable UI modules (Navbar, Footer, HeroGraphic, etc.)
│   ├── context/          # React Context providers (FuelPriceContext, ToastContext)
│   ├── data/             # Static reference data (articles, appVersion, servicesData)
│   ├── hooks/            # Custom hooks (useSEO, useScrollReveal)
│   ├── pages/            # Primary route views (HomePage, OrderPage, AboutPage, etc.)
│   ├── App.jsx           # Root application shell and route definitions
│   ├── entry-client.jsx  # Client-side hydration entry point
│   ├── entry-server.jsx  # SSR pre-render entry point
│   ├── index.css         # Global design tokens, resets, and utility classes
│   └── main.jsx          # Development Vite entry point
├── AGENTS.md             # Multi-agent coordination protocols and permanent rules
├── architect.md          # Technical architecture reference (this document)
├── changes.md            # Complete historical master changelog
├── GEMINI.md             # AI memory configuration and persistent business parameters
├── package.json          # Project scripts and dependency declarations
├── phases.md             # Development lifecycle phases breakdown
├── prerender.js          # Build-time SSG pre-rendering pipeline script
└── vite.config.js        # Vite build, SSR, and plugin configurations
```

---

## 4. Core Subsystems & Data Flow

### 4.1 Real-Time Fuel Pricing Engine
- Located in `src/context/FuelPriceContext.jsx`.
- Stores ex-depot commodity benchmarks:
  - Premier Euro-5 Petrol (`Rs. 345.87`)
  - Hi-Cetane Euro-5 Diesel (`Rs. 378.05`)
  - High-Octane 97 (`Rs. 365.00`)
  - LPG Gas (`Rs. 258.65`)
  - Clean Water (`Rs. 100.00`)
- Synchronized across state subscribers via React Context and cached in browser `localStorage` for instant hydration.

### 4.2 Checkout & Volumetric Calculation Engine
- Located in `src/pages/OrderPage.jsx`.
- **Minimum Volume Constraint**: Enforces a strict **5 Litres / kg / gal** threshold. Sub-5 inputs are automatically clamped to 5.
- **Delivery Fee Logic**:
  $$\text{Delivery Fee} = \text{Standard Fee} + \text{Urgent Surcharge}$$
  - Where $\text{Standard Fee} = \text{Rs. 250.00}$ if fuel volume $< 50\text{L}$, or $\text{Rs. 0.00}$ if fuel volume $\ge 50\text{L}$.
  - Where $\text{Urgent Surcharge} = \text{Rs. 100.00}$ if dispatch speed is selected as `urgent`, else $\text{Rs. 0.00}$.
- **Payment Mode Guard**:
  - Small orders ($\le 10\text{L}$ fuel, $\le 10\text{kg}$ gas, $\le 20\text{gal}$ water) are eligible for **Cash on Delivery (COD)**.
  - Larger orders automatically switch to Advance Payment due to security and volumetric transport regulations.

### 4.3 Static Site Generation (SSG) & SEO Pipeline
- Located in `prerender.js` and `src/entry-server.jsx`.
- During `npm run build`, Vite produces both client and SSR bundles.
- `prerender.js` boots each of the 16 application routes through `renderToString()`, injects the resulting HTML into `dist/index.html` template, inserts route-specific meta tags, OpenGraph previews, and JSON-LD schemas, and writes static HTML files into `dist/`.
- Dynamically generates `public/sitemap.xml`, `robots.txt`, and `llms.txt`.

### 4.4 WhatsApp Dispatch Automation
- Located in `src/pages/OrderPage.jsx`.
- Upon order placement, GSAP animation triggers a modal tracker and compiles a URL-encoded string linking directly to `https://wa.me/923230112464`.
- Transmits customer name, phone, full Lahore delivery address, fuel grade, quantity, dispatch speed, delivery fee, and grand total.

---

## 5. Documentation & Agent Memory Architecture

To maintain complete codebase integrity across collaborative human developers and autonomous AI agents:
1. **Master Directory Index**: Maintained in `docs/README.md`.
2. **Dedicated Page Docs**: Every page has a dedicated `.md` file in `docs/pages/`.
3. **Dedicated Subpage Docs**: Every technical blog article has a dedicated `.md` file in `docs/pages/subpages/`.
4. **Mandatory AI Protocols**: Enforced in both `AGENTS.md` and `GEMINI.md`. Whenever ANY change is made to any page, component, or parameter, the agent is required by instruction to update the corresponding documentation file immediately.

---

## 6. Security & Performance Policies
- **Biometrics on Mobile**: Biometric credentials remain strictly in Android KeyStore hardware; no private key is transmitted over network.
- **Client Sanitization**: All contact forms, email fields, and phone numbers are validated against strict regex patterns prior to submission.
- **Zero-Dependency Styling**: CSS custom properties eliminate runtime CSS-in-JS compilation costs and ensure fast 60fps rendering across mobile browsers.
