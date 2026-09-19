# Zyphuel Error Handling & Resilience Patterns

> Standardized patterns for catching, handling, and recovering from errors across the Zyphuel web application.

## 1. Principles
- **Never Strand the Customer**: If live fuel rate APIs fail, immediately fall back to verified default rates (`src/data/fuelPrices.js`) and continue checkout smoothly.
- **Fail Safe with User Feedback**: Always notify the user through non-blocking, accessible toast notifications (`ToastContext.jsx`).
- **No Raw Stack Traces**: Catch asynchronous failures gracefully and display human-readable guidance.

## 2. API Failover Strategy (Fuel Prices)
```
[ Step 1: Direct Fetch ] 
  Fetch: https://fuel.trackmate.page/api/prices
       │
       ├── SUCCESS: Parse & Calculate (+Rs. 2.50 Pump Markup) -> Update State
       └── FAILURE: Log warning, try Step 2
               │
[ Step 2: CORS Proxy Fallback ]
  Fetch: https://api.allorigins.win/get?url=...
       │
       ├── SUCCESS: Parse wrapper JSON -> Calculate -> Update State
       └── FAILURE: Log error, proceed to Step 3
               │
[ Step 3: Default Certified Baseline ]
  Use: FUEL_PRICES from src/data/fuelPrices.js
  Result: Checkout continues without interruption
```

## 3. Form Validation Errors & Handling
| Field | Condition | Handled By | User Feedback |
|---|---|---|---|
| **Fuel Quantity** | `< 5L` or `> 15L` | Clamped on blur / change | Auto-clamped with helper warning badge |
| **Commodity Selection**| All deselected | Block submission | Toast: `"At least one item category must be selected."` |
| **Delivery Address** | Empty / `< 5` chars | Highlight input red | Error state: `"Please enter your full delivery address in Lahore."` |
| **Customer Name** | Empty / `< 2` chars | Highlight input red | Error state: `"Please enter your full name."` |
| **Phone Number** | Invalid PK format | Highlight input red | Error state: `"Please enter a valid Pakistani mobile number."` |

## 4. Toast Notification Protocol
`ToastContext.jsx` provides:
- `showToast(message, type)`:
  - `'success'`: Green checkmark, order saved or copy action verified.
  - `'error'`: Amber/Red warning, validation failure.
  - `'welcome'`: Light blue badge, returning user welcome.
  - `'info'`: Information alert regarding operating hours or rate updates.
