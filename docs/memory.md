# Zyphuel Core System Invariants & Permanent Business Memory (`memory.md`)

This document defines the immutable business rules, operational constants, and architectural invariants that govern the Zyphuel platform. Every AI assistant, developer, and maintainer must preserve these invariants across all future iterations.

---

## 1. Core Business Logic & Pricing Rules (Permanent Memory)

### 1.1 Minimum & Maximum Doorstep Fuel Volume
- **Hard Bounds**: Strictly **5 Litres minimum** up to **15 Litres maximum** per single mobile doorstep delivery order.
- **Clamping Logic**: All volume input fields clamp inputs below 5L to 5L, and inputs above 15L to 15L.
- **Increment Step**: Exactly `+1 Litre` per stepper click.
- **Volume Presets (Chips)**: `[5, 7, 10, 12, 15]` with explicit `15L Max` capacity indicator.
- **Bulk Refueling Separation**: Commercial orders exceeding 15 Litres (up to 10,000+ Litres) are serviced exclusively through scheduled commercial B2B bowser contracts.

### 1.2 Simple Flat Delivery Charges
- **Nominal Fee**: Flat **Rs. 280.00** across all doorstep fuel orders in Lahore.
- **Universal Uniformity**: Applies uniformly regardless of volume within the 5L–15L range.
- **Zero Hidden Surcharges**: Fuel is charged at exact retail petrol pump rates without unannounced surcharges.

### 1.3 Delivery Arrival SLA
- **Official Delivery Window**: Fixed strictly to **"Delivered: Within 45 Mins"** on doorstep across all covered sectors of Lahore.
- **Live Countdown**: Initialized to `45m 00s` upon order placement and decrements second-by-second in active state persistence.

### 1.4 Payment Modes & Digital Wallet Integration
- **Cash on Delivery (COD)**: Available for domestic doorstep fuel orders between **5 Litres and 10 Litres**. Customers are requested to keep exact change ready upon bowser arrival.
- **Instant Digital Wallets (No Cash on Hand Alternative)**: If the customer does not have physical cash ready, bowser pilots carry active QR codes for on-spot digital mobile wallet transfers:
  - **JazzCash**
  - **Easypaisa**
  - **NayaPay**
  - **Raast / Online Bank Transfer**
- **Advance Payment Policy**: Orders exceeding 10 Litres (**11L to 15L Max**) require advance digital payment confirmation prior to bowser dispatch for safety and high-volume compliance.
- **Corporate Fleet Invoicing**: B2B accounts are provided direct bank transfer, 15-day, and 30-day consolidated corporate credit lines.

### 1.5 Retail Petrol Pump Tariff Markup
- **Formula**: `Retail Petrol Pump Rate = Base OGRA Ex-Depot Rate + Rs. 2.50 / Litre`.
- **Application**: Applied dynamically across Super Euro-V Petrol, Hi-Cetane Euro-V Diesel, and High-Octane 97.
- **UI Invariant**: Internal markup formulas are calculated in the background; customer-facing cards display clean, professional final pump rates.

---

## 2. Operational Invariants & Operating Hours

### 2.1 Service Availability
- **Doorstep Fuel Delivery (24/7)**: Operating 24 hours a day, 7 days a week, 365 days a year across Lahore (including public holidays and extreme weather).
- **Physical Office & Customer Support**:
  - Monday – Thursday: 8:00 AM – 8:00 PM
  - Friday: 8:00 AM – 1:00 PM
  - Saturday – Sunday: 10:00 AM – 6:00 PM

### 2.2 Coverage Area (Lahore Metropolitan)
- DHA Lahore (Phase 1 through Phase 9 Prism)
- Gulberg (I, II, III, Main Boulevard)
- Johar Town (Phase 1 & Phase 2)
- Model Town & Garden Town
- Bahria Town Lahore
- Lahore Cantt & Askari Housing Schemes
- Industrial Zones: Sundar Industrial Estate & Quaid-e-Azam Industrial Estate

### 2.3 Single Persistent Startup Transparency Statement
- The startup disclosure statement (*"Not a corporate giant — just an agile startup..."*) is permanently anchored exclusively on the `HomePage.jsx` hero section. It must **never** be duplicated on child pages (`OrderPage`, `ServicesPage`, `AboutPage`).

### 2.4 Automated Dispatch & WhatsApp Synchronization
- Direct pre-filled WhatsApp dispatch URL wired to `+92 3230-112464` containing Order ID, Customer Name, Phone, Delivery Address, Fuel Grade, Target Asset, Volume, Rate, and Grand Total.

---

## 3. Legal & Regulatory Credentials

- **OGRA Distribution License**: `OGRA/DL-7492/LHE`
- **National Tax Number (NTN / STRN)**: `9482710-3`
- **SECP Corporate Incorporation**: `0248195`
- **Depot Hub**: Lahore Central Hub #01 (75-Main Boulevard, Gulberg III, Lahore, Punjab 54000)
- **Official Helpline**: `+92 3230-112464`

---

## 4. Mandatory AI Agent Documentation Rule

Whenever any page, component, pricing, logic, UI element, or data file is modified or created, you **MUST ALWAYS** immediately update the corresponding markdown file in `docs/pages/<page>.md` or `docs/pages/subpages/<subpage>.md` with the exact modifications, updated parameters, and changelog.
