# Page Documentation: Order Fuel Page

## Overview & Identity
- **Page Name**: Order Fuel / Dispatch Checkout
- **Route**: `/order/`
- **Component File**: `src/pages/OrderPage.jsx`
- **Primary Purpose**: Interactive multi-step order portal enabling customers in Lahore to select certified fuel grades, configure quantities, choose delivery speeds, specify delivery location, review order pricing in real-time, and trigger live dispatch with automated WhatsApp synchronization.

---

## SEO & Structured Data
- **Page Title**: `Order Fuel Online in Lahore | Doorstep Petrol & Diesel Delivery | Zyphuel`
- **Meta Description**: `Order Euro-V petrol, high-speed diesel, and LPG gas delivered to your home, office, or generator in Lahore. 15-45 min delivery, calibrated digital flow meters, live tracking.`
- **Schema Type**: `OrderAction` / `Service` / `LocalBusiness`

---

## Pricing, Products & Minimum Quantities

| Fuel / Utility Grade | Unit Rate | Unit | Order Range | Increment Step | Volume Presets (Chips) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Premier Euro-5 Super Petrol** | Rs. 345.87 | Litre | **5L – 15 Litres** | +1 L | 5, 7, 10, 12, 15 |
| **Hi-Cetane Euro-5 Diesel** | Rs. 378.05 | Litre | **5L – 15 Litres** | +1 L | 5, 7, 10, 12, 15 |
| **High-Octane (Euro-5 / HOBC 97)**| Rs. 365.00 | Litre | **5L – 15 Litres** | +1 L | 5, 7, 10, 12, 15 |
| **LPG Commercial / Domestic Gas** | Rs. 258.65 | Kilogram | **5 kg – 200 kg** | +1 kg | 5, 10, 20, 50, 100, 200 |
| **Bulk Potable Clean Water** | Rs. 100.00 | Gallon | **5 gal – 500 gal** | +1 gal | 5, 10, 20, 50, 100, 250, 500 |

> **Enforced Rule**: Absolute minimum fuel volume is **5 Litres** and maximum fuel checkout volume is strictly **15 Litres**. Sub-5 unit inputs are automatically clamped to 5; inputs exceeding 15 are clamped to 15.

---

## Delivery Charges & Speed Options

### 1. Simple / Standard Dispatch (20–45 Mins)
- **Orders < 50 Litres**: **Rs. 250.00** nominal delivery fee.
- **Orders ≥ 50 Litres**: **Free Delivery (Rs. 0.00)**.

### 2. Urgent / Priority Dispatch (10–20 Mins)
- **Urgent Priority Surcharge**: **+Rs. 100.00 flat surcharge** (kept deliberately reasonable) applied to both sub-50L and 50L+ orders.
- **Orders < 50 Litres**: Rs. 250 base + Rs. 100 urgent = **Rs. 350.00**.
- **Orders ≥ 50 Litres**: Rs. 0 base + Rs. 100 urgent = **Rs. 100.00**.


---

## Form Flow & Checkout Architecture
1. **Live Marquee Price Ticker**:
   - Left-to-Right infinite continuous animation (`tickerSlideLTR`) featuring live rates with pause-on-hover.
2. **Item Selection (Step 1)**:
   - Visual radio tiles for Petrol, Diesel, High-Octane, and LPG Gas.
3. **Quantity Configuration (Step 2)**:
   - Stepper buttons (`-` and `+`) with live manual input, minimum 5L threshold, maximum 15L checkout cap, and quick volume chips `[5L, 7L, 10L, 12L, 15L]`.
4. **Delivery Location & Speed (Step 3)**:
   - Clean single input: `Complete Delivery Address in Lahore *`.
   - Toggle buttons: Simple Delivery (20–45 mins) vs. Urgent Delivery (10–20 mins, +Rs. 100).
5. **Contact & Payment (Step 4)**:
   - Customer Full Name and Active Contact Number.
   - Payment method toggle: Cash on Delivery (COD) / Direct Bank Transfer.
6. **Order Summary**:
   - Displays Selected Fuel, Litres, Fuel Subtotal, Dispatch Speed (+Rs. 100 indicator when urgent), Delivery Fee, and Grand Total.
7. **3D Refueling Lifecycle Tracker (`RefuelingLifecycleTracker.jsx`)**:
   - **Phase 1 (Awaiting Order)**: Enhanced with a complete 3D vector animation suite:
     - 3D Hexagonal Cyber Docking Pad with glowing circuit traces under Bowser 01.
     - Expanding dual-frequency concentric sonar/radar waves radiating across the ground platform.
     - Autonomous 3D Telemetry LiDAR Drone hovering with sweeping inspection laser cone and spinning rotor discs.
     - Floating 3D Holographic "Awaiting Order" HUD with orbiting elliptical rings and live oscillating sinusoidal radio frequency waveform.
     - Live Standby Telemetry Status Strip with animated audio/radio equalizer waveform bars.
   - **Phase 2 (Depot Filling)**: Real-time volumetric nozzle dispensing simulation.
   - **Phase 3 (In Transit)**: Active neon laser energy highway corridor tracking.
   - **Phase 4 (Delivered)**: Connected hose flow with 100% volumetric calibration seal badge.
8. **Automated WhatsApp Dispatch Synchronization**:
   - Automated redirection to official WhatsApp Dispatch (`+92 3230-112464`) with preformatted, encoded order parameters.
9. **Instant Digital Invoice & Receipt Generation**:
   - **Automated Generation**: Instantly compiles a tamper-proof digital order invoice (`invoiceData`) upon order confirmation with unique sequential invoice ID (`ZYP-INV-...`), formatted local timestamp, customer profile, dispatch address, and payment terms.
   - **Itemized Breakdown & Certification**: Formats fuel grade, volume, unit rate, fuel subtotal, delivery fee (with free delivery threshold status), urgent surcharge indicator, grand total in PKR, and an official **OGRA & 0.01L Digital Flow-Meter Calibration Compliance Stamp**.
   - **On-Screen Modal Viewer**: Accessible anytime via the **"View & Download Invoice (رسید دیکھیں / ڈاؤنلوڈ کریں)"** button directly inside the active Refueling Lifecycle Tracker modal.
   - **Dual Export Options**:
     - **Print / Save as PDF**: Leverages browser `window.print()` coupled with dedicated `@media print` CSS rules to generate high-resolution, vector-crisp PDF documents stripped of navigation elements.
     - **Standalone HTML Download**: Creates an offline `.html` digital receipt file via standard Blob and object URL download (`handleDownloadInvoiceHTML()`).
10. **Realistic Dispatch Lifecycle & Anti-Spam Order Cooldown Guard**:
    - **Elimination of Instant 8-Second Auto-Delivery**: Fixed the unrealistic simulation where orders automatically jumped through Confirmed -> Dispatched -> Delivered in 8 seconds. Orders now enter Depot Loading (~10s preparation), transition to **"En Route / In Transit"** with live second-by-second ETA countdown, and remain in active transit until arrival.
    - **Active Order Persistence (`localStorage`)**: Saves active dispatch under `zyphuel_active_order` across browser refreshes and page visits.
    - **Active Dispatch Banner on Checkout**: Renders a live telemetry card above the order form displaying order ID, fuel volume, destination address, live ETA countdown, and quick links to live tracking and digital invoice.
    - **Anti-Spam Cooldown Guard & Duplicate Confirmation**: Prevents rapid back-to-back duplicate orders ("order pe order place karte rehna"). If an order was placed within 15 minutes, presents a safety confirmation modal asking the customer to track their existing tanker or explicitly confirm an additional bowser.
    - **Manual QA Arrival Trigger**: Added a dedicated `Simulate Arrival (ٹیسٹ: آمد)` button in the tracker modal for testing the final calibrated delivery stage.

11. **Satisfying Bioluminescent Vector Telemetry Overhaul in `RefuelingLifecycleTracker`**:
    - **Elimination of Visual Clutter & Text Collisions**: Removed awkward polygon drone, rigid yellow scan cone, and 10+ scattered redundant SVG `<text>` elements (`DEPOT HUB-01`, `STANDBY BAY • HUB-01`, `AWAITING ORDER • READY`, `GPS TARGET`, `1. DEPOT DISPATCH`, `2. SMART ENERGY CORRIDOR`, `3. SITE CALIBRATION`).
    - **Bioluminescent Launch & Docking Pad**: Added soft radial floor glow (`#00f2fe` into emerald `#10b981`) beneath Bowser 01 with three staggered expanding concentric ultrasonic ripple waves.
    - **360° Rotating Cyber Compass & Sweeping Radar Beam**: High-precision rotating geometric ring with cardinal indicator notches and smooth 360° sweeping volumetric radar scan beam.
    - **Suspension Breathing Physics on Bowser 01**: Smooth vertical sinusoidal breathing animation (`translateY(-3.5px)`) applied to Bowser's chassis with synchronized ground shadow expansion/contraction, bringing mechanical life to the vehicle.
    - **Drifting Bioluminescent Micro-Orbs**: 5 organic nano particles floating gracefully upward from the docking pad into the atmosphere.
    - **Minimalist Live HUD Beacon**: Crisp overhead status chip (`🟢 FLEET READY`) with pulsing cyan/emerald laser beacon dot.

---

## Developer Tooling & Git Automation
- **`github_push.bat`**: Root-level Windows batch automation script enabling one-click and interactive staging, committing (with custom or auto timestamped messages), and pushing directly to GitHub (`origin/main`).

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-09-17** | Added contextual internal linking to `/contact/` and `/services/#b2b` within the on-page FAQ section and added dedicated commercial inquiry CTA banner; boosted sitemap priority to 0.9 daily. | Eliminate orphan signals, reinforce Googlebot crawl paths, and resolve GSC discovery status. |
| **2026-09-16** | Integrated Live OGRA Market Fuel Prices from `https://fuel.trackmate.page/api/prices` into Order checkout & context. | User requested: *"https://fuel.trackmate.page/api/prices is ko use Karo order page ma live prices update ma"*. Fixed `FuelPriceContext.jsx` parsing bug where static fallback values previously overrode fetched rates. Implemented direct fetch + CORS proxy fallback, 15-minute `sessionStorage` caching (respecting 30 req/min rate limits), live sync indicator badge in Order section header (`● Live Market Rates Active: Petrol Rs. 384.34/L • Diesel Rs. 415.83/L • High-Octane Rs. 400.00/L`), and real-time computation in cost summaries and computerized invoices. |
| **2026-09-15** | Overhauled Refueling Lifecycle Tracker with Hypnotic Bioluminescent Vector Animation Suite & Zero Clutter. | User requested: *"ek achi se vector animation use karo jo dekhne ma satisfaction de users ko , abi wali bulkul be achi nai ha sara maza kharab kar dia ha order ka"*. Removed the clumsy polygon drone, yellow scan cone, and noisy text labels. Introduced smooth concentric ripple waves, 360° radar sweep, suspension breathing physics, drifting micro-orbs, and clean minimalist HUD. |
| **2026-09-15** | Implemented Realistic Dispatch Lifecycle, Active Order Persistence, and 15-Min Anti-Spam Cooldown Guard. | User requested: *"is ko be theek karo foran order execute or dispatch or delivery ma karo, time gap be lo ya bus order pe order he place karte rahna ha"*. Fixed the 8-second auto-delivery bug, added live countdown ETA in transit, persisted active order banner on checkout, added cooldown duplicate prevention modal, and provided manual arrival simulation trigger. |
| **2026-09-15** | Added Instant Digital Invoice Generation with On-Screen Viewer, PDF Print, and HTML Receipt Download. | User requested: *"order karne ka bad ek invoice generate hone chaye take user us dekh sake or invoice ko download kar sake"*. Created printable invoice modal, OGRA compliance seal, itemized tax/pricing breakdown, PDF export via browser print dialog, and standalone HTML download. |
| **2026-09-15** | Created root `github_push.bat` script for direct GitHub push automation. | User requested: *"is ma github_push.bat file banayo gis sa ma direct push kar sako code ko"*. Enables one-click staging, commit prompt with auto-fallback, and push to origin branch. |
| **2026-09-15** | Added high-tech 3D Vector Animation Suite for **Awaiting Order** state in `RefuelingLifecycleTracker`. | User requested: *"Refueling Lifecycle Tracker Awaiting Order ya gaja per 3d vector animation add karna"*. Added 3D cyber docking pad, dual concentric sonar radar rings, autonomous 3D LiDAR drone with sweeping laser beam, rotating holographic HUD, live sine waveform vector, and standby telemetry strip. |
| **2026-09-14** | Clamped fuel checkout strictly to **Min: 5L and Max: 15L** with volume chips `[5L, 7L, 10L, 12L, 15L]`. | User requested: *"minimum 5L max 15L is ko fix karo"*. Clamped stepper, range slider, state initializer, and presets to max 15L limit. |
| **2026-09-13** | Set Simple Delivery charge to **Rs. 250** (<50L) with controlled Urgent surcharge (+Rs. 100). | User confirmed: *"simple delivery charges 250 ya save in ur memory, urgent delivery ma kudh he dekhlena za na ho"*. Total for urgent is Rs. 350 (<50L) and Rs. 100 (50L+). |
| **2026-09-13** | Reduced Urgent delivery fee surcharge from Rs. 250 to **Rs. 100**. | User requested: *"urgent delivery ma 250 rs bhot zada ha thora kam kaor delivery price ko"*. Surcharge updated to Rs. 100, making sub-50L urgent total Rs. 250 and 50L+ urgent total Rs. 100. |
| **2026-09-13** | Differentiated Simple vs Urgent delivery pricing in live calculation and UI summary. | User requested: *"dono sa price ma farak parna chaye delivery ma ahar kise ko urgent chaye"*. |
| **2026-09-13** | Removed Quick Lahore Sector Auto-Fill chips, "Powered by Google Maps" caption, and optional address instructions textarea. | User requested: *"Quick Lahore Sector Auto-Fill... is ko be remove karo"*. Simplified checkout to single clean address field. |
| **2026-09-13** | Removed breadcrumb navigation `[Home] / Order Fuel`. | User requested: *"Order Fuel is ko remove karo"*. |
| **2026-09-13** | Added Left-to-Right moving animation (`tickerSlideLTR`) to price ticker. | User requested: *"is wale section ma animation add karo left to right moving"*. Cloned track into 4 copies with smooth infinite marquee. |
| **2026-09-13** | Removed redundant Startup Transparency box from Order page. | User requested: *"Startup Transparency... ya be ek diikna chaye bar bar nai"*. Retained exclusively on Home page hero. |
| **2026-09-13** | Upgraded minimum fuel volume from 1L to **5 Litres**. | User requested: *"Min: 5 L, Quick Select: 5 L, 10 L..."*. Clamped stepper and inputs to minimum 5. |
| **2026-09-13** | Automated instant WhatsApp order dispatch forwarding to `+92 3230-112464`. | Ensures immediate dispatcher coordination upon order completion. |
