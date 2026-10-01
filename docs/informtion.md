# Zyphuel Master Corporate & Operational Intelligence Reference (`informtion.md`)

This document serves as the authoritative single source of truth for all corporate credentials, physical assets, technical specifications, regulatory licensing, pricing formulas, and operating parameters of Zyphuel from inception ("start") to the present ("now").

---

## 1. Corporate Identity & Legal Credentials

| Parameter | Official Record | Regulatory Authority |
|---|---|---|
| **Company Name** | Zyphuel | Government of Pakistan |
| **SECP Incorporation Number** | `0248195` | Securities and Exchange Commission of Pakistan |
| **OGRA Petroleum License** | `OGRA/DL-7492/LHE` | Oil and Gas Regulatory Authority  |
| **Civil Defence Flammable Transport Permit** | `CD-LHE/FL-2026/089` | Civil Defence Department, Lahore |
| **Weights & Measures Calibration Seal** | `PWM/VER-88210/2026` | Punjab Directorate of Weights & Measures |
| **National Tax Number (NTN / STRN)** | `9482710-3` | Federal Board of Revenue (FBR) |
| **Corporate Status** | Licensed On-Demand Mobile Fuel Distributor | Government of Pakistan |
| **Founding Date** | August 2026 | Lahore, Punjab |
| **Founder & Leading Web Developer** | Muhammad Daniyal | Founder & Leading Web Developer |
| **Head of Commercial Operations** | Adil Farooq | Sales & B2B Contracts |

---

## 2. Physical Location & Operating Schedules

### 2.1 Corporate Headquarters & Central Depot Hub
- **Physical Address**: Lahore, Pakistan.
- **Facility Classification**: Regional Dispatch Hub #01 (Central Fuel Depot & Maintenance Yard).
- **Coordinates & Verification**: `31.5204° N, 74.3587° E`.

### 2.2 Operating Schedules & Strict 10:00 PM Order Cutoff
- **Online Doorstep Fuel Intake Window**: Active daily from **8:00 AM to 10:00 PM (PKT)** across Lahore.
- **Strict Night Cutoff (10:00 PM – 8:00 AM PKT)**: The "Complete Order" button is strictly hidden from the DOM; night alert card renders with an 8:00 AM reopening countdown and 24/7 WhatsApp emergency hotline. Submissions blocked by `plugins/zyphuel-order-guard/zyphuel-order-guard.php`.
- **Physical Corporate Office & Administrative Hours**:
  - Monday – Thursday: 8:00 AM – 8:00 PM
  - Friday: 8:00 AM – 1:00 PM (Break for Friday Prayers)
  - Saturday – Sunday: 10:00 AM – 6:00 PM
- **Automated Dispatch & Support**: Dedicated WhatsApp customer helpline available 24/7 at `+92 3230-112464`.

---

## 3. Communication Channels & Official Support

- **Contact number**: `+92 3230-112464`
- **Official WhatsApp Dispatch API**: `+92 3230-112464`
- **Complaint Email**: `m.daniyalkhan490@gmail.com`
- **Official Website**: `https://zyphuel.netlify.app`
- **Official Mobile Application**: Zyphuel Android APK (`v2.6.4.0.0.16`)

---

## 4. Fleet Engineering & Safety Hardware Specifications

| Hardware Component | Specification | Safety Certification |
|---|---|---|
| **Mobile Micro-Bowsers** | Double-walled stainless steel compartments with anti-slosh baffles | NFPA 30A / ADR Flammable Liquid Transport |
| **Dispensing Flow Meters** | Positive-displacement flow meters with 0.01L optical pulse encoders | National Weights & Measures Certified |
| **Temperature Compensation** | Automatic Temperature Compensation (ATC) calibrated to 15°C reference standard | International Petroleum Measurement Standards |
| **Delivery Hoses** | 50-meter heavy-duty high-pressure antistatic delivery reels | EN 1360 / Rooftop & Basement Generator Reach |
| **Dispensing Nozzles** | Heavy-duty automatic dry-break shutoff nozzles with vapor recovery | Zero Spillage / Anti-Drip Seal |
| **Static Grounding** | Dual-point grounding clamps with interlock reel | Eliminates electrostatic discharge during pumping |
| **Fire Protection** | Multi-class ABC dry chemical extinguishers & automatic thermal deluge | HAZMAT Compliant Mobile Fire Suppression |

---

## 5. Supported Fuel Commodities & Quality Standards

1. **Super Euro-V Petrol (92 Octane)**:
   - Sourced directly from primary licensed oil marketing company (OMC) terminals.
   - 92 Minimum Research Octane Number (RON).
   - Low gum content, high detergent additive package, zero water contamination.
2. **Hi-Cetane Euro-V Diesel**:
   - Ultra-low sulfur diesel (<10 ppm sulfur content).
   - Minimum 51 Cetane rating for maximum thermal efficiency and cold-start reliability.
   - Compliant with Euro-V emission standards; prevents particulate filter clogging in backup generators.
3. **High-Octane 97 (HOBC)**:
   - 97 RON premium fuel engineered for high-compression turbocharged engines and luxury sports vehicles.

---

## 6. Business Pricing Rules & Invariants

- **Minimum Order Quantity**: **5 Litres** (hard threshold; lower inputs clamp to 5L).
- **Maximum Order Capacity**: **15 Litres** (hard ceiling for agile doorstep dispatches).
- **Preset Volume Chips**: `[5L, 7L, 10L, 12L, 15L Max]`.
- **Refueling Targets**: Strictly 4 application targets (Car/SUV, Motorbike, Generator, Machinery). Jerrycan/Drum removed.
- **Doorstep Delivery Charges**: Fixed **Rs. 300.00** nominal fee for orders up to **10 Litres** (5L–10L). For high-capacity orders between **11 Litres and 15 Litres Max**, fees are strictly scaled between **Rs. 300.00 and Rs. 400.00** with a linear +Rs. 20/L step (11L = Rs. 320, 12L = Rs. 340, 13L = Rs. 360, 14L = Rs. 380, 15L = Rs. 400). Legacy labels `(Order <10)` / `Fixed Rate (≤10L)` purged.
- **Urgent Delivery Surcharge**: Controlled, reasonable priority fee of **+Rs. 100.00** flat.
- **Delivery Windows**:
  - Simple Dispatch: 20–45 Mins
  - Urgent Dispatch: 10–20 Mins
- **Retail Petrol Pump Rate Formula**: `Official Base Ex-Depot Rate + Rs. 5.00 / Litre` (`PUMP_RATE_MARKUP = 5.00`).
- **Payment Methods**:
  - Cash on Delivery (COD) for 5L–10L orders.
  - Instant on-spot Online Payments (JazzCash, Easypaisa, NayaPay, Raast QR scan) upon delivery.
  - Advance bank transfer for orders >10L (11L–15L Max).
  - Corporate 15-day / 30-day credit accounts for B2B fleets.
