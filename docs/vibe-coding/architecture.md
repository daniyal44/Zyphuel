# Zyphuel Architecture

> Solution-level design for the Zyphuel web application and on-demand doorstep refueling platform.

## 1. Overview
- **Product:** Zyphuel — On-Demand Doorstep Fuel & Utility Delivery platform serving Lahore, Pakistan.
- **Core Value:** Transparent, certified refueling with 0.01L calibrated digital flow meters, live OGRA pricing + retail petrol pump rate calculation, and rapid 15–45 min dispatch.
- **Scale Target (v1):** 5,000+ monthly residential and commercial generator delivery dispatches across Lahore (DHA, Gulberg, Johar Town, Model Town, Green Town, Bahria Town, and citywide).

## 2. Tech Stack
| Layer | Choice | Why |
|---|---|---|
| **Front-end** | React 18 + Vite 5 + Custom CSS Tokens | Blazing fast client hydration, zero heavy framework overhead, CSS custom property theming (`var(--brand-primary)`). |
| **Animation Engine** | GSAP 3.12 + Canvas 2D / Three.js | High-framerate truck dispatch animations and interactive 3D bowser model view. |
| **Routing** | React Router v6 (Data Router / Browser) | Fast SPA client navigation with clean URLs. |
| **SSG Pre-rendering** | Node.js custom script (`prerender.js`) | Pre-renders 16 static HTML routes at build time for optimal SEO and instant initial page load. |
| **Pricing API** | Trackmate Fuel API + AllOrigins CORS Fallback | Real-time scraper fetching verified OGRA notified prices for petrol, diesel, octane, and LPG. |
| **Dispatch Bridge** | Pre-formatted WhatsApp Direct API (`wa.me`) | Direct zero-friction dispatch link to official fleet dispatch `+92 3230-112464`. |
| **Hosting** | Netlify / Static CDN Edge | Instant global distribution, automated continuous deployments from Git. |

## 3. System Diagram (Data Flow)
```
[ User Browser / Device ]
        │  1. Select Fuel Type, Quantity, Address & Speed
        ▼
[ React State / OrderPage ] <── 2. Live Prices ── [ FuelPriceContext ]
        │                                                   │
        │                                                   ├── Direct fetch: Trackmate API
        │                                                   └── Fallback: AllOrigins CORS Proxy
        │
        ├── 3. Calculate: Total = (Qty * (Base + Rs.2.50)) + Delivery Fee
        ├── 4. Animate: GSAP Refuel Bowser Canvas
        ├── 5. Persist: LocalStorage Active Order & Countdown
        ▼
[ WhatsApp Fleet Dispatch (+92 3230-112464) ] ──> [ Physical Delivery Bowser Dispatched ]
```

## 4. Key Client-Side Contracts & APIs
| Endpoint / Resource | Source / Method | Purpose | Cache Policy |
|---|---|---|---|
| `https://fuel.trackmate.page/api/prices` | GET (External API) | Live Pakistan fuel rates | 15-minute SessionStorage TTL |
| `https://api.allorigins.win/get?url=...` | GET (CORS Proxy) | Fallback if direct API encounters CORS | 15-minute SessionStorage TTL |
| `https://wa.me/923230112464?text=...` | GET (WhatsApp URL) | Encodes full invoice payload for fleet dispatch | On-demand on order submission |
| `sessionStorage: zyphuel_live_prices` | Client Web Storage | Caches base and effective pump rates | 15 minutes |
| `localStorage: zyphuel_active_order` | Client Web Storage | Active order tracking, status & cooldown | Cleared upon order completion |

## 5. Non-Negotiables & Business Rules
1. **Minimum & Maximum Fuel Volume**: Strictly **5 Litres minimum** up to **15 Litres maximum** per doorstep delivery order (sub-5L clamped to 5L, capped at 15L max).
2. **Retail Petrol Pump Rate Markup**: Flat **+Rs. 2.50 / Litre** added to OGRA base price for Petrol, Diesel, and High-Octane.
3. **Simple Delivery Fee**: Flat **Rs. 280.00** nominal delivery fee for doorstep fuel orders.
4. **Urgent Delivery Fee**: Controlled, reasonable priority fee of **+Rs. 100.00** flat (Total Rs. 380.00).
5. **Operating Hours**:
   - Monday – Thursday: 8:00 AM – 8:00 PM
   - Friday: 8:00 AM – 1:00 PM
   - Saturday – Sunday: 10:00 AM – 6:00 PM
   - Fuel Delivery (24/7): Always Active round-the-clock
6. **Transparency Identity**: Persistent honest statement on Home hero; never repeated on subpages.
