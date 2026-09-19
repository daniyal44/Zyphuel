# Zyphuel Client Storage & Data Contracts

> Single source of truth for all client-side data schemas, caching policies, and storage contracts in the Zyphuel web application.

## 1. Storage Overview
As a high-performance Jamstack frontend with zero unauthenticated server requirements, Zyphuel utilizes structured browser storage (`localStorage` and `sessionStorage`) combined with verified external API responses.

## 2. Storage Schemas

### `sessionStorage: 'zyphuel_live_prices'`
Caches real-time fuel and utility prices to prevent layout flash during page switches and avoid hitting rate limits.
| Field | Type | Description |
|---|---|---|
| `prices` | `Object` | Effective retail petrol pump prices: `{ petrol, diesel, highOctane, lpg, water }` |
| `basePrices` | `Object` | Raw unadjusted OGRA ex-depot baseline prices |
| `pumpMarkup` | `Number` | Fixed markup amount (`2.50`) applied to petrol, diesel, and high-octane |
| `isLive` | `Boolean` | Flag indicating whether rates were freshly scraped |
| `effectiveDate`| `String \| null`| Official OGRA notification date string (e.g. `'19-September-2026'`) |
| `lastUpdated` | `String` | ISO timestamp of scraped record |
| `timestamp` | `Number` | `Date.now()` epoch in milliseconds (valid for 15 minutes) |

---

### `localStorage: 'zyphuel_active_order'`
Maintains real-time order tracking status, active dispatch countdown, and anti-spam cooldown across browser tabs.
| Field | Type | Description |
|---|---|---|
| `orderId` | `String` | Unique 6-character uppercase alphanumeric ID (e.g. `'ZY-8A4F2'`) |
| `placedAt` | `Number` | Timestamp in ms when the order was submitted |
| `customerName`| `String` | User's full name |
| `phone` | `String` | Primary Pakistani mobile contact number |
| `address` | `String` | Street delivery address within Lahore |
| `selectedFuelType`| `String` | Fuel key: `'petrol' \| 'diesel' \| 'highOctane'` |
| `fuelQty` | `Number` | Volume ordered in Litres (5 to 15L) |
| `fuelRate` | `Number` | Effective retail pump rate at time of order |
| `deliverySpeed`| `String` | `'simple'` (20–45 min) or `'urgent'` (10–20 min) |
| `deliveryFee` | `Number` | Calibrated delivery fee (Rs. 280, Rs. 100, Rs. 380, or Rs. 0) |
| `total` | `Number` | Final bill in PKR |
| `status` | `String` | Lifecycle: `'confirmed' \| 'dispatched' \| 'delivered'` |

---

### `localStorage: 'zyphuel_last_order'`
Pre-fills checkout form on return visits to minimize customer effort.
| Field | Type | Description |
|---|---|---|
| `name` | `String` | Stored customer name |
| `phone` | `String` | Stored mobile number |
| `email` | `String` | Stored optional email address |
| `address` | `String` | Last used delivery address |
| `selectedFuelType` | `String` | Last chosen fuel commodity |
| `fuelQty` | `Number` | Last chosen fuel quantity |
| `deliverySpeed` | `String` | Last chosen delivery speed |

## 3. External API Contracts

### Trackmate Fuel Price API
- **Endpoint**: `https://fuel.trackmate.page/api/prices`
- **Output Shape**:
```json
{
  "count": 26,
  "prices": [
    {
      "source": "pso",
      "product": "petrol",
      "price_pkr": 389.14,
      "unit": "litre",
      "city": null,
      "effective_date": "19-September-2026",
      "scraped_at": "2026-09-19T16:00:22.939Z"
    }
  ]
}
```
- **Zyphuel Mutation**:
  - `petrol`: `389.14 + 2.50 = 391.64`
  - `diesel`: `424.04 + 2.50 = 426.54`
  - `highOctane`: `400.00 + 2.50 = 402.50`
