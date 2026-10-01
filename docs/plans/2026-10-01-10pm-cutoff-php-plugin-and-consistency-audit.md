# 10:00 PM Order Cutoff, PHP Plugin & Site-Wide Information Consistency Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement a strict 10:00 PM (Asia/Karachi PKT) order cutoff that removes the "Complete Order" button under all circumstances, deploy a standalone and WordPress-compatible PHP plugin (`plugins/zyphuel-order-guard/zyphuel-order-guard.php`), and conduct a 100% genuine information audit harmonizing all claims across pages, articles, and documentation while protecting core SEO ranking keywords.

**Architecture:**
- **Server/Backend Guard**: A production-grade PHP plugin and REST endpoint that inspects server time in `Asia/Karachi`, blocks order intake between 22:00 and 08:00 PKT, and injects protective CSS/JS to eliminate the order button.
- **Frontend Reactive Guard**: `src/utils/officeHours.js` and `src/pages/OrderPage.jsx` evaluate the live Asia/Karachi time. During the 10:00 PM – 8:00 AM window, the `.truck-button` (Complete Order) DOM element is strictly not rendered, replaced by an informative Night Closure Card with a direct link to the 24/7 WhatsApp helpline (+92 3230-112464).
- **Comprehensive Harmonization Audit**: Cross-references every page, article, and component to eliminate lingering discrepancies (such as "zero markup" vs "+Rs. 5.00/L pump margin markup", "dynamic demand surge" vs scaled Rs. 300–400 delivery fee, remaining "drums" in articles, and ambiguous operating hours).

**Tech Stack:** React 19, Vite, PHP 7.4/8.x (WordPress Plugin & Standalone REST API), JavaScript (ES Modules), CSS3.

---

## Cross-Page Information Consistency Audit & Harmonization Report

| Topic / Requirement | Previous Conflicting Claim(s) Found | 100% Genuine Harmonized Truth | Affected Files | Resolution Status |
| :--- | :--- | :--- | :--- | :--- |
| **Order Intake Hours & Night Cutoff** | Some pages claimed "24/7 continuous order intake", others showed office hours (8am–8pm) causing confusion. | **Online Doorstep Orders**: Accepted **8:00 AM – 10:00 PM (PKT)** daily.<br>**Night Cutoff (10:00 PM – 8:00 AM PKT)**: Order intake closed; "Complete Order" button strictly hidden.<br>**Corporate Support Desk**: Mon–Thu 8am–8pm, Fri 8am–1pm, Sat–Sun 10am–6pm.<br>**WhatsApp Helpline**: 24/7 on-demand. | `OrderPage.jsx`, `officeHours.js`, `ContactPage.jsx`, `HomePage.jsx`, `companyInfo.js`, `docs/memory.md` | Defined in Plan; ready to execute |
| **Fuel Pricing & Markup** | `HomePage.jsx` claimed "Zero Price Markup Guarantee" and "zero markup", while `OrderPage.jsx` and `fuelPrices.js` calculate `+Rs. 5.00/L` pump margin markup. | **Official OGRA Ex-Depot Rate + Standard Forecourt Retail Margin (+Rs. 5.00/L)** across Petrol, Diesel, and High-Octane. Identical to retail petrol pump pricing, with zero hidden broker surcharges. | `HomePage.jsx`, `fuelPrices.js`, `articles.js`, `OrderPage.jsx` | Harmonized across all pages |
| **Delivery Charges** | `articles.js` repeated "dynamic demand surge pricing for 11L to 15L orders" 10 times; `ContactPage.jsx` had `&le;10L` legacy code. | **5L–10L**: Fixed nominal fee of **Rs. 300.00**.<br>**11L–15L Max**: Scaled strictly between **Rs. 300.00 and Rs. 400.00** with a linear **+Rs. 20/L** step (11L=320, 12L=340, 13L=360, 14L=380, 15L=400). Legacy labels purged. | `articles.js`, `ContactPage.jsx`, `TermsOfUsePage.jsx`, `docs/memory.md` | Harmonized across all pages |
| **Refueling Targets** | `articles.js` lines 199 & 644 listed "safe storage drum" or "Drums" as an orderable target asset. | Strictly **4 approved application targets**: (1) Car/Sedan/SUV, (2) Motorbike/Scooter, (3) Standby Generator, (4) Commercial Machinery. All references to drums/jerrycans as orderable targets are eliminated. | `articles.js`, `OrderPage.jsx`, `servicesData.js` | Drums purged from order targets |
| **Volume Limits** | Consistent, but needs uniform phrasing across all articles. | Strictly **5 Litres minimum** up to **15 Litres maximum** per doorstep delivery order (sub-5L clamped to 5L, capped at 15L max; presets `[5, 7, 10, 12, 15]`). Orders >15L require B2B commercial inquiries. | `articles.js`, `OrderPage.jsx`, `docs/memory.md` | 100% Genuine and Consistent |
| **Delivery Arrival Time** | Occasional "within 45 mins" without window context. | **Simple Dispatch**: 20–45 Minutes.<br>**Urgent Dispatch**: 10–20 Minutes (+Rs. 100 flat surcharge). | `HomePage.jsx`, `OrderPage.jsx`, `articles.js`, `ContactPage.jsx` | 100% Genuine and Consistent |
| **Payment Methods** | Occasional broken character `(10L)` in articles. | **Cash on Delivery (COD)**: Available for orders 5L–10L.<br>**Online Payments / Advance**: Mandatory for 11L–15L; on-the-spot QR cards (JazzCash, Easypaisa, NayaPay, Raast) available for all volumes. | `articles.js`, `OrderPage.jsx`, `TermsOfUsePage.jsx` | Fixed characters and aligned |
| **SEO Ranking Keywords** | Must NOT be diluted or broken during changes. | Preserved with 100% density: *doorstep fuel delivery Lahore, diesel delivery for generators, calibrated flow meter 0.01L, Euro-V fuel Lahore, emergency petrol delivery, 24/7 fuel helpline*. | All pages, meta tags, articles | Protected and reinforced |

---

## Detailed Task Breakdown

### Task 1: Create PHP Plugin (`plugins/zyphuel-order-guard/zyphuel-order-guard.php`)
**Files:**
- Create: `plugins/zyphuel-order-guard/zyphuel-order-guard.php`
- Create: `public/api/order-guard.php` (Direct standalone JSON endpoint)

**Step 1: Write the standalone PHP Guard Logic**
The plugin must support both WordPress environments (hooks, REST API `/wp-json/zyphuel/v1/order-guard-status`) and standalone PHP webservers/APIs.
- Timezone: `Asia/Karachi`
- Cutoff window: 22:00 to 08:00 PKT (10:00 PM to 8:00 AM)
- Returns JSON payload:
```json
{
  "status": "success",
  "can_order": false,
  "cutoff_active": true,
  "current_time_pkt": "10:15 PM PKT",
  "reopen_time_pkt": "8:00 AM PKT",
  "message": "Doorstep orders closed for the night (10:00 PM - 8:00 AM PKT). Reopening at 8:00 AM.",
  "whatsapp": "+92 3230-112464"
}
```
- Injects CSS: `#truck-submit-btn, .truck-button, button[type="submit"].order-submit { display: none !important; pointer-events: none !important; }`
- Intercepts POST requests to reject night orders with `403 Forbidden`.

**Step 2: Verify PHP Syntax and Output**
Validate structure against PHP 7.4/8.x standards with clean comments and error handling.

---

### Task 2: Update `src/utils/officeHours.js` for 10:00 PM Order Intake Cutoff
**Files:**
- Modify: `src/utils/officeHours.js`

**Step 1: Implement Order Intake Window & Night Cutoff Invariants**
- Add:
  - `isNightCutoffActive(date)`: returns `true` if `hour >= 22 || hour < 8` in Asia/Karachi.
  - `isOrderIntakeActive(date)`: returns `hour >= 8 && hour < 22`.
  - Export structured object:
    - `isNightCutoffActive`: boolean
    - `canCompleteOrder`: boolean (`!isNightCutoffActive`)
    - `orderIntakeHours`: `'8:00 AM – 10:00 PM (PKT)'`
    - `nightCutoffMessage`: `'Orders close at 10:00 PM PKT and reopen at 8:00 AM PKT.'`
    - `nextOrderReopen`: `'Today at 8:00 AM PKT'` or `'Tomorrow at 8:00 AM PKT'`

**Step 2: Test with simulated times**
- Verify at 9:59 PM PKT -> `isNightCutoffActive = false`, `canCompleteOrder = true`
- Verify at 10:00 PM PKT -> `isNightCutoffActive = true`, `canCompleteOrder = false`
- Verify at 3:00 AM PKT -> `isNightCutoffActive = true`, `canCompleteOrder = false`
- Verify at 8:00 AM PKT -> `isNightCutoffActive = false`, `canCompleteOrder = true`

---

### Task 3: Enforce Strict 10:00 PM Complete Order Button Removal in `src/pages/OrderPage.jsx`
**Files:**
- Modify: `src/pages/OrderPage.jsx`

**Step 1: Hide the Truck Button and Complete Order Container**
In `src/pages/OrderPage.jsx`:
- When `officeStatus.isNightCutoffActive` is `true`:
  - The entire `.button-wrapper` containing `<button className="truck-button">` is **NOT rendered**.
  - Render in its place a dedicated, high-impact **Night Order Cutoff Card**:
    - **Header**: `🌙 Night Orders Closed (10:00 PM – 8:00 AM PKT) / رات کے آرڈرز بند ہیں`
    - **Notice**: Doorstep fuel delivery order intake closes every night at 10:00 PM and resumes tomorrow morning at 8:00 AM.
    - **Reopening Indicator**: `Reopens at: Tomorrow at 8:00 AM PKT` with live clock.
    - **WhatsApp Hotline Button**: Direct one-tap WhatsApp contact link to `+92 3230-112464` for emergency B2B generator support and inquiries.
- In `handleTruckClick` and form `onSubmit`:
  - Add hard guard: if `officeStatus.isNightCutoffActive`, prevent default, trigger a notification, and abort immediately.

---

### Task 4: Harmonize All Cross-Page Claims & Remove Contradictions
**Files:**
- Modify: `src/pages/HomePage.jsx` (Harmonize "+Rs. 5.00/L retail margin over OGRA" instead of "zero markup")
- Modify: `src/pages/ContactPage.jsx` (Remove legacy `&le;10L` phrasing; align 10:00 PM order cutoff)
- Modify: `src/data/articles.js` (Replace 10 instances of "dynamic demand surge pricing" with exact scaled Rs. 300–400 phrasing; purge lingering drum order targets; fix broken unicode)
- Modify: `src/data/companyInfo.js` (Clarify 8:00 AM – 10:00 PM doorstep intake vs 24/7 WhatsApp helpline)
- Modify: `src/pages/TermsOfUsePage.jsx` & `src/pages/PrivacyPolicyPage.jsx` (Document 10:00 PM cutoff and exact delivery fee scaling)

---

### Task 5: Permanent Memory & Documentation Synchronisation
**Files:**
- Modify: `AGENTS.md` & `GEMINI.md` (Update core business logic with 10:00 PM hard order intake cutoff)
- Modify: `docs/memory.md` (Add Section 1.6 & Section 2.1 updates for 10:00 PM cutoff)
- Modify: `docs/informtion.md` & `docs/information.md`
- Modify: `docs/changes.md` & `docs/task.md`
- Modify: `docs/pages/order.md`

---

### Task 6: Build Verification & Regression Testing
**Step 1: Execute production build**
- Run `npm.cmd run build` to ensure 0 lint errors, 0 compilation warnings, and valid bundle generation.
**Step 2: Inspect running dev server**
- Verify live rendering on `http://localhost:5173/order/`.
