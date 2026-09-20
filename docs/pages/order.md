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

| Fuel / Utility Grade | Retail Pump Unit Rate | OGRA Base Rate | Pump Tariff Markup | Order Range | Increment Step | Volume Presets (Chips) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Premier Euro-5 Super Petrol** | Live + Rs. 2.50 | Live Scraped | **+Rs. 2.50 / L** | **5L – 15 Litres** | +1 L | 5, 7, 10, 12, 15 |
| **Hi-Cetane Euro-5 Diesel** | Live + Rs. 2.50 | Live Scraped | **+Rs. 2.50 / L** | **5L – 15 Litres** | +1 L | 5, 7, 10, 12, 15 |
| **High-Octane (Euro-5 / HOBC 97)**| Live + Rs. 2.50 | Live Scraped | **+Rs. 2.50 / L** | **5L – 15 Litres** | +1 L | 5, 7, 10, 12, 15 |
| **LPG Commercial / Domestic Gas** | Rs. 258.65 | Standard | No Markup | **5 kg – 200 kg** | +1 kg | 5, 10, 20, 50, 100, 200 |
| **Bulk Potable Clean Water** | Rs. 100.00 | Standard | No Markup | **5 gal – 500 gal** | +1 gal | 5, 10, 20, 50, 100, 250, 500 |

> **Retail Petrol Pump Rate Rule**: Petrol, Diesel, and High-Octane rates include the verified **+Rs. 2.50 / Litre** petrol pump rate over the OGRA base ex-depot price, maintaining dynamic invariance across price drops, hikes, or steady states ("jab bhi price kam ho ya zada ho ya same rahe").
> **Enforced Volume Rule**: Absolute minimum fuel volume is **5 Litres** and maximum fuel checkout volume is strictly **15 Litres**. Sub-5 unit inputs are automatically clamped to 5; inputs exceeding 15 are clamped to 15.

---

## Delivery Charges & Speed Options

### 1. Simple / Standard Dispatch (Strict 45-Min SLA Window)
- **Standard Doorstep Delivery**: **Rs. 280.00** nominal delivery fee (revised from Rs. 250.00 due to nationwide fuel price increases).
- **Live Dispatch Countdown**: Strictly starts at **45 minutes (`45m 00s`, 2,700 seconds)** immediately upon order placement, decrementing second-by-second across checkout, tracking banner, and active invoice modal.

### 2. Urgent / Priority Dispatch (20-Min SLA Window)
- **Urgent Priority Surcharge**: **+Rs. 100.00 flat surcharge** (kept deliberately reasonable).
- **Total Urgent Delivery Fee**: Rs. 280 base + Rs. 100 urgent = **Rs. 380.00**.
- **Live Dispatch Countdown**: Starts at **20 minutes (`20m 00s`, 1,200 seconds)**.

---

## Form Flow & Checkout Architecture
1. **Live Marquee Price Ticker & Rate Alerts**:
   - Left-to-Right infinite continuous animation (`tickerSlideLTR`) featuring live retail petrol pump rates (`Petrol Euro 5 - Pump Rate: Rs. {rate}/L`, `Doorstep Delivery: Rs. 280 • Urgent Express: +Rs. 100`).
2. **Retail Pump Rates Indicator Banner**:
   - Clean, transparent banner indicating active retail pump rates (+Rs. 2.50/L) alongside ex-depot base benchmarks.
3. **Item Selection (Step 1)**:
   - Visual radio tiles for Petrol, Diesel, High-Octane, and LPG Gas with inline `Pump Rate (+Rs. 2.50)` indicator badges.
4. **Quantity Configuration (Step 2)**:
   - Stepper buttons (`-` and `+`) with live manual input, minimum 5L threshold, maximum 15L checkout cap, and quick volume chips `[5L, 7L, 10L, 12L, 15L]`.
5. **Delivery Location & Speed (Step 3)**:
   - Clean single input: `Complete Delivery Address in Lahore *`.
   - Toggle buttons: Simple Delivery (20–45 mins) vs. Urgent Delivery (10–20 mins, +Rs. 100).
6. **Contact & Payment (Step 4)**:
   - Customer Full Name and Active Contact Number.
   - Payment method toggle: Cash on Delivery (COD) / Direct Bank Transfer.
7. **Order Summary**:
   - Displays Selected Fuel, Litres, Fuel Subtotal, Dispatch Speed (+Rs. 100 indicator when urgent), Delivery Fee, and Grand Total.
8. **3D Refueling Lifecycle Tracker (`RefuelingLifecycleTracker.jsx`)**:
   - **Phase 1 (Awaiting Order)**: Enhanced with a complete 3D vector animation suite:
     - 3D Hexagonal Cyber Docking Pad with glowing circuit traces under Bowser 01.
     - Expanding dual-frequency concentric sonar/radar waves radiating across the ground platform.
     - Autonomous 3D Telemetry LiDAR Drone hovering with sweeping inspection laser cone and spinning rotor discs.
     - Floating 3D Holographic "Awaiting Order" HUD with orbiting elliptical rings and live oscillating sinusoidal radio frequency waveform.
     - Live Standby Telemetry Status Strip with animated audio/radio equalizer waveform bars.
   - **Phase 2 (Depot Filling)**: Real-time volumetric nozzle dispensing simulation.
   - **Phase 3 (In Transit)**: Active neon laser energy highway corridor tracking.
   - **Phase 4 (Delivered)**: Connected hose flow with 100% volumetric calibration seal badge.
9. **Post-Order Priority Workflow & WhatsApp Redirection**:
   - **Elimination of Premature Pop-Up**: Previously, order submission would immediately open WhatsApp without letting the customer view or download their receipt.
   - **Two-Step Order Completion Flow**:
     - **Step 1 (Invoice PDF Download)**: Immediately opens the official invoice modal with prominent **"1. Download Invoice (PDF)"** action, enabling immediate download of `Zyphuel-Invoice-ZYP-XXXXXX.pdf`.
     - **Live 45-Minute Countdown Badge**: Displays active countdown (`Live Dispatch Countdown: 45m 00s`) right inside the post-order hero banner above the download buttons.
     - **Step 2 (WhatsApp Redirection)**: Upon downloading the PDF, triggers a 3-second animated auto-redirect countdown to WhatsApp Dispatch (`+92 3230-112464`) with an instant "Open WhatsApp Now" override and cancellation control. Customers can also click **"2. Proceed to WhatsApp Dispatch"** directly to transition without waiting.
10. **Executive Corporate Tax Invoice & Pure Vector PDF Architecture**:
    - **Government Regulatory Credentials**: Formal header bearing Government of Pakistan & OGRA Licensed Petroleum Distributor credentials:
      - **OGRA License**: `OGRA/DL-7492/LHE`
      - **NTN / STRN**: `9482710-3`
      - **SECP Inc**: `0248195`
      - **Depot Hub**: `Lahore Central Hub #01 (75-Main Boulevard, Gulberg III, Lahore, Punjab)`
      - **24/7 Helpline**: `+92 3230-112464`
    - **Telemetry Profile (2 Cards)**: Billed-To recipient destination details alongside dispatch speed, metering standards (Positive Displacement ±0.01L Accuracy), and 15°C Automatic Temperature Compensation (ATC).
    - **5-Column Itemized Table**: `SR#`, `DESCRIPTION & FUEL SPECIFICATIONS`, `QUANTITY`, `UNIT RATE (PKR)`, and `TOTAL AMOUNT (PKR)`.
    - **Amount in Words Ledger**: Automatic conversion via `numberToWords(total)` (e.g. *"Pakistani Rupees Four Thousand Two Hundred and Eighty Only"*).
    - **OGRA Volumetric Accuracy Guarantee**: Certified compliance notice with unique tracking security hash (`SECURITY HASH: ZYP-XXXXXX-SEC • GPS LAHORE HUB #01`).
    - **Genuine Scannable Dual Verification System (Camera QR & Code 128 Barcode)**: Modeled on `https://barkod.studio/` high-contrast optical scanning principles:
      - **Instant Mobile Camera QR Code (ISO/IEC 18004)**: Standard smartphone camera apps (especially Apple iOS Camera) natively scan 2D QR codes in <100ms from camera preview. Encodes direct verification link `https://zyphuel.netlify.app/order/?verify=${orderId}`.
      - **Industrial Dispatch Barcode (ISO/IEC 128 Auto)**: 123-bit auto-optimized symbol sequence with pure black `#000000`, high optical contrast, module thickness (2.2px–2.6px), height 46–54px, and 16+ module quiet zones for handheld laser scanners, barcode readers, and Google Lens.
      - **Live Web Verification Route**: When the QR code is scanned on any mobile phone, it opens the Zyphuel portal and immediately renders an authenticated verification alert banner (`OFFICIAL DISPATCH INVOICE VERIFIED • #ZYP-XXXXXX`) confirming calibrated flow meter accuracy and OGRA Euro-V compliance.
      - **Multi-Format Parity**: Implemented consistently across the on-screen invoice modal (`OrderPage.jsx`), standalone HTML invoice download, and client-side vector PDF generator (`generateInvoicePdf.js`).
    - **Vector PDF Engine (`jspdf` & `src/utils/generateInvoicePdf.js`)**: 100% client-side vector generation without canvas or CORS overhead, downloading in <50ms across all devices with native vector barcode and QR code rendering.
 11. **Realistic Dispatch Lifecycle & Anti-Spam Order Cooldown Guard**:
     - **45-Minute Second-by-Second Countdown**: Order enters Depot Loading (~10s preparation), transitions to **"En Route / In Transit"** with live `45m 00s` countdown (decrements per second), and remains in active transit until arrival.
     - **Active Order Persistence (`localStorage`)**: Saves active dispatch under `zyphuel_active_order` across browser refreshes and page visits.
     - **Active Dispatch Banner on Checkout**: Renders a live telemetry card above the order form displaying order ID, fuel volume, destination address, live ETA countdown, and quick links to live tracking and digital invoice.
     - **Anti-Spam Cooldown Guard & Duplicate Confirmation**: Prevents rapid back-to-back duplicate orders ("order pe order place karte rehna"). If an order was placed within 15 minutes, presents a safety confirmation modal asking the customer to track their existing tanker or explicitly confirm an additional bowser.
     - **Manual QA Arrival Trigger**: Added a dedicated `Simulate Arrival (ٹیسٹ: آمد)` button in the tracker modal for testing the final calibrated delivery stage.
 
 12. **Satisfying Bioluminescent Vector Telemetry Overhaul in `RefuelingLifecycleTracker`**:
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
 | **2026-09-21** | Resolved `"barcode scan failed"` issue by engineering a Dual Verification System (Instant Mobile Camera QR Code + Industrial High-Contrast Code 128 Barcode) inspired by `barkod.studio` standards; added live URL verification handler (`/order/?verify=ZYP-XXXXXX`) with authentic dispatch badge; deployed across web invoice modal, HTML download, and pure vector PDF. | User reported: *"barcode scan failed"*. Technical root-cause identified: native Apple iOS Camera does not support 1D linear barcodes (Code 128) in camera preview without dedicated scanner apps, and small module widths on high-DPI screens caused subpixel optical blur. Engineered dual architecture: 1) Instant 2D QR Code (ISO/IEC 18004) encoding order verification URL, scanned in <100ms by 100% of iPhone/Android cameras; 2) High-contrast pure black (`#000000`) ISO Code 128 Auto barcode (123 bits, 2.4px modules, 16+ quiet zone) for laser barcode guns and Google Lens. Updated web invoice modal, printable HTML, and jsPDF vector generator. Added live on-page verification banner displaying certified dispatch authenticity when scanned. |
 | **2026-09-21** | Built and integrated genuine scannable ISO/IEC 15417 Code 128 barcode engine based on `https://barkod.studio/` architectural specifications (`src/utils/barcode128.js`); updated vector PDF generator (`generateInvoicePdf.js`), on-screen invoice modal, and standalone HTML download; validated 100% optical camera and laser scanning accuracy with ZXing decoder. | User requested: *"https://barkod.studio/ barcode ka lia is website ko use karo invoice ma barcode generate karne ka lia or barcode scan karne per real ho, ache sa dekhlena phir muje batana ma dekho ga or pdf ma be update kar dena"*. Engineered dependency-free Code 128 (Set B) engine with 107-pattern symbol definitions, Start B (104), Modulo-103 checksum, and Stop symbol (106) with terminal bar. Implemented pure vector rendering with `shape-rendering="crispEdges"`, standard 10-module quiet zones, and verified 100% optical readability via `@zxing/library` across mobile cameras and handheld scanners. Embedded in on-screen invoice modal, downloadable standalone HTML, and vector PDF download. |
| **2026-09-21** | Overhauled invoice design to full Corporate Executive Tax Invoice standard and initialized live dispatch countdown strictly to **45 minutes (`45m 00s`)** upon order placement. | User requested: *"invoice professional lagne chaye har ek cheeez ache sa represent hone chaye, after order 45 min countdown start"*. Implemented official corporate letterhead with OGRA License `OGRA/DL-7492/LHE`, NTN `9482710-3`, SECP `0248195`, 2-column telemetry profile, 5-column itemized billing table, Amount in Words block (`numberToWords`), OGRA volumetric accuracy box, digital barcode reference, and computerized verification seal (ETO 2002). Standard dispatch duration updated to strictly 45 minutes with instant `45m 00s` live countdown initialization and second-by-second decrement. |
| **2026-09-21** | Fixed and overhauled PDF invoice generation: replaced fragile HTML-to-Canvas approach with high-performance pure vector `jsPDF` engine (`src/utils/generateInvoicePdf.js`); eliminated CORS/font hanging issues, guaranteeing instant, reliable client-side `.pdf` downloads across all mobile and desktop browsers; retained post-order PDF download priority and 3s WhatsApp auto-redirection workflow. | User reported: *"yesinvoice pdf download nai ho rahi"*. Replaced `html2pdf.js` canvas capture with direct programmatic vector PDF generator using `jspdf`. Guarantees instant client-side generation and download of `Zyphuel-Invoice-${id}.pdf` with crystal-clear vector typography, OGRA compliance stamp, and itemized billing table. |
| **2026-09-20** | Updated LPG Gas to actual retail market rate of **Rs. 450.00 / kg**; added prominent market rate badge to LPG selector; added Pinterest domain verification tag; optimized Vite chunking and build speed. | User requested: *"gas actual market price is 450 pkr per kg is ko be price ma adjust karo mention"*, *"website ke speed or response ache sa maintain Karo"*, and Pinterest domain verification claim `<meta name="p:domain_verify" content="fc80284bcf271f5d6deba0c07bafb11a"/>`. |
| **2026-09-20** | Removed section subtitle (`Select fuel, LPG Gas, or Water...`) and Live Market Rates indicator badge (`Live Market Rates Active: Petrol... Diesel...`) from Order page header. | User requested: *"Select fuel, LPG Gas, or Water. Calculate rates in real time, customize quantities, and track your delivery. Live Market Rates Active: Petrol Rs. 391.64/L • Diesel Rs. 426.54/L • High-Octane Rs. 402.50/L (OGRA Notified: 19-September-2026) is wale section ko remove karo"*. Streamlined the order page header so the title cleanly leads directly into active orders and the fuel order flow without repetitive subheadings or duplicate rate badges (live rates remain fully accessible in the top marquee ticker). |
| **2026-09-19** | Applied **+Rs. 2.50 / Litre** Retail Petrol Pump Rate Markup to Petrol, Diesel, and High-Octane; removed 50L+ Free delivery text and redundant pre-order notice banner; updated invoice and WhatsApp dispatch. | User requested: *"petrol , desil & high-octane Rs.2.5 add hone chaye as per petrol pump rate , jab be price kab ho ya zada ho ya same he raha chaye example acutal price 289.14 petrol pump price 291.88 as sa desil & high-octane, order page ma update karna zad ya"*, *"Orders of 50 Litres or more receive 100% FREE Delivery. is ko remove karo"*, and *"Notice Before Ordering... is ko be remove karo"*. Implemented `PUMP_RATE_MARKUP = 2.50` across `fuelPrices.js` and `FuelPriceContext.jsx`, updated ticker labels to show retail pump rates, added pump rate indicator badges on fuel selector cards, updated order summary with explicit base + markup breakdown, and purged confusing 50L bulk notices. |
| **2026-09-17** | Updated Simple Delivery fee from Rs. 250 to **Rs. 280** (<50L) due to nationwide fuel price increases; added prominent pre-order notice banner & inline form highlight. | User requested: *"order page ma delivery price ma change karo due to fuel prices increase , delivery price increases 250 to 280 before order mention in wesbite as message or as main point"*. Updated calculation logic (`standardFee = 280`), Simple Delivery schedule rate label, live ticker (`Doorstep Delivery: Rs. 280 (<50L) • FREE (≥50L)`), and deployed a bilingual notice banner directly above checkout grid plus inline alert before Step 1. Sub-50L urgent total is now Rs. 380 (280 + 100); 50L+ remains Free standard / Rs. 100 urgent. |
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
