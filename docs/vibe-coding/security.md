# Zyphuel Security & Input Validation Standards

> Security requirements, validation rules, and privacy practices protecting customers and the platform.

## 1. Input Sanitization & Form Validation
- [x] **Pakistani Mobile Number Format**: Validated against regex patterns matching `03XX-XXXXXXX` or `+923XXXXXXXXX`. Whitespace and hyphens stripped prior to dispatch.
- [x] **Fuel Quantity Clamping**: Sub-5L fuel inputs automatically clamped to `5 Litres`. Maximum consumer checkout clamped to `15 Litres`.
- [x] **XSS Prevention**: React automatically escapes JSX expressions. Raw user inputs (`name`, `address`, `notes`) are never evaluated via `dangerouslySetInnerHTML`.
- [x] **WhatsApp URI Encoding**: Full dispatch payload escaped using `encodeURIComponent()` to prevent URI breaking or injection attacks.

## 2. API & Network Security
- [x] **CORS Proxy Resiliency**: Primary fetch connects directly to `https://fuel.trackmate.page/api/prices`. If CORS errors occur in restrictive client environments, the client falls back to `https://api.allorigins.win/get?url=...` with JSON validation.
- [x] **No Secrets on Client**: The application does not store database credentials, private API keys, or administrative tokens in frontend bundles.
- [x] **Content Security Policy (CSP) Compliance**: Scripts and styles are bundled locally without unauthorized third-party executable injections.

## 3. Order Anti-Spam & Rate Limiting
- [x] **Active Order Cooldown**: When an order is placed, `OrderPage.jsx` locks out spam re-submissions for a 15-minute countdown window, showing the active dispatch status modal.
- [x] **Delivery Address Verification**: Minimum 5 characters required for delivery address to prevent accidental blank order dispatches.

## 4. Privacy & Personal Data
- [x] **No Unnecessary Telemetry**: Customer phone numbers and addresses are stored locally in the customer's browser (`localStorage`) and transmitted solely to the dispatch WhatsApp number via direct user action.
- [x] **GDPR / PECA Compliance**: Privacy Policy (`/privacy/`) outlines clear data retention and customer consent mechanisms.
