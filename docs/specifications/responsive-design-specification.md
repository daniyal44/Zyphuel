# Responsive Design Specification

## Overview

Zyphuel website implements comprehensive multi-tier responsive design across 6 device tiers, ensuring optimal experience from ultra-compact mobile devices to ultrawide 4K monitors.

## Device Tiers

### 1. Ultra-Compact / Small Mobile (320px–380px)
- **Devices**: iPhone SE, Galaxy Z Fold (compact mode)
- **Key Adjustments**:
  - `.header-badges` unhid and compacted for "Lahore City" menu toggle visibility
  - OrderPage stepper optimized (118px)
  - Buttons, inputs, and badges scaled for small touch targets
  - Navigation menu remains accessible on all screens

### 2. Standard Mobile (381px–480px)
- **Devices**: iPhone 8/9/10, most Android smartphones
- **Key Adjustments**:
  - LahorePlacesMenu auto-scaling with `max-width: calc(100vw - 16px)`
  - Zero viewport overflow enforced
  - Responsive pump search callouts
  - Single-column wrapping for forms and inputs
  - All touch targets minimum 44px high

### 3. Phablet & Tablet (481px–768px)
- **Devices**: iPad, iPad Mini, Galaxy Tab, Surface
- **Key Adjustments**:
  - Responsive 3D Carousel (`Carousel3D.jsx`)
  - Dynamic card sizing: 140px (smallest) → 220px (largest)
  - Perspective scaling: 680px–1200px range
  - Card grid adjusts from 1-column to 2-3 column layout
  - Touch targets remain adequate for finger navigation

### 4. Desktop (1024px–1440px)
- **Devices**: Laptop, desktop monitor, iMac
- **Key Adjustments**:
  - Balanced max container widths
  - Comfortable padding (typically 16px–24px)
  - Full-width layouts where appropriate
  - Hover states enabled (vs. tap on mobile)
  - Sidebar navigation visible

### 5. Ultrawide & 4K (1441px–2560px+)
- **Devices**: Ultra-wide monitors, 4K displays, 5K iMac
- **Key Adjustments**:
  - `@media (min-width: 2560px)` with `--container-max: 1680px` boundary
  - Scalable headings: 4.2rem maximum
  - Bounded paragraph line lengths: 800px maximum
  - Prevents excessive horizontal whitespace
  - Layout remains structured, not stretched

## Core Responsive Patterns

### CSS Media Queries
- Mobile-first approach: base styles for small screens, enhancements for larger
- Single breakpoints at: 380px, 480px, 768px, 1024px, 2560px
- CSS custom properties for easy theming

### Viewport Meta Tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- Ensures proper scaling on mobile browsers
- Prevents zoomed-out view on initial load

### Horizontal Overflow Prevention
- `.slideshow-section { overflow-x: clip }` on container elements
- All routes verified at 390px: 0 horizontal overflow
- Carousel3D cards constrained within scene container
- `max-width: 100%` on images and iframes

### Touch Targets
- Minimum 44px × 44px for all tappable elements
- Extra spacing around small touch targets
- No element clustering on compact screens

### Image & Canvas Responsiveness
- `.reference-canvas`: `width: 100%; height: 100%; min-width: 100%; min-height: 100%; object-fit: cover`
- `will-change: transform` for animated elements
- `image-rendering: high-quality` for crisp rendering
- Integer pixel alignment (no `.5px` transforms)

## Page-Specific Responsive Notes

### HomePage.jsx
- Hero 3D canvas: responsive depths (420vh desktop, 350vh tablet, 280vh mobile)
- Full-bleed cover canvas edge-to-edge across all devices
- LahorePlacesMenu toggle: always visible on mobile, hidden on desktop
- Fuel rate marquee: scales font size proportionically
- CTA buttons: touch-friendly size on mobile, spacious on desktop

### ServicesPage.jsx
- Scroll animation frames: throttled on mobile (idle step 15→45)
- FAQ accordion: functional on all screen sizes
- B2B/B2C toggle: visible on desktop, condensed on mobile
- Comparison table: single-column on mobile, multi-column on desktop

### DownloadPage.jsx
- Android/iOS version cards: stack vertically on mobile, side-by-side on desktop
- APK download button: full width on mobile, padded on desktop
- Version specifications: readable text sizes on all tiers
- File size displays: responsive scaling

### BlogListPage.jsx & BlogArticlePage.jsx
- Article grid: 1-column on mobile, 2-3 columns on tablet, 4+ on desktop
- "Download Mobile App" references: dynamic version numbers always readable
- Featured images: responsive with `object-fit: cover`

### AboutPage.jsx
- QR code display: scalable, readable on all devices
- Version display: `v2.6.4.0.0.41` always legible
- Feature icons: touch-friendly on mobile, hover on desktop

### OrderPage.jsx
- Stepper: 118px height on mobile, standard on desktop
- Fuel grade selectors: large tap targets on mobile
- Volume presets: chip-style on mobile, button-row on desktop
- COD/qr payment options: single-column stack on mobile

### ContactPage.jsx
- Office hours: responsive table layout
- Map integration: responsive iframe, never overflows
- Contact form: single-column on mobile, two-column on tablet+
- Social links: vertical stack on mobile, horizontal on desktop

### PrivacyPolicyPage.jsx & TermsOfUsePage.jsx
- Long-form content: readable line length (max 800px)
- Tablets: two-column layout possible
- Mobile: single-column, properly scaled text

### NotFoundPage.jsx
- Simple layout: fully responsive at all widths
- No complex components, inherently responsive

## Testing Requirements

### Device Breakpoints to Test
- 320px (iPhone SE)
- 375px (iPhone 15/Standard mobile)
- 414px (iPhone 15 Plus/Large mobile)
- 480px (phablet/tablet small)
- 768px (iPad/mini)
- 1024px (laptop/desktop)
- 1440px (large desktop)
- 2560px (4K/ultrawide)

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest on macOS/iOS)
- Edge (latest)

### Accessibility Standards
- WCAG AA contrast ratios maintained at all breakpoints
- Keyboard navigation functional at all widths
- Screen reader compatible (ARIA labels preserved)
- Focus visible states on all interactive elements

## Maintenance

### Adding New Breakpoints
1. Identify the target device width
2. Add media query in `src/index.css` or component-specific CSS
3. Apply targeted adjustments only where needed
4. Test at the new width and adjacent widths

### Updating Existing Breakpoints
1. Locate the media query in the CSS files
2. Adjust the width range as needed
3. Ensure no regression at adjacent breakpoints
4. Test all affected pages

### Responding to New Devices
1. Test at the new device's width
2. Identify any overflow, scaling, or layout issues
3. Apply minimal targeted fixes
4. Document in the changelog

## Changelog Highlights

| Date | Change | rationale |
|------|--------|-----------|
| 2026-10-05 | Comprehensive multi-tier responsiveness (small to ex-large) | User requested: "all pages ko har device ka mutabiq responsive banayo" |
| 2026-10-05 | Lahore Places Menu toggle optimization | User requested: open/close toggle with pure names list, no forms |
| 2026-10-05 | Footer description truthfulness | User requested: accurate 45-min delivery info, not 24/7 claim |
| 2026-10-07 | Hero scroll smoothing & Core Web Vitals | User requested: "home page ke sabe uper wali hero section ke scroll smooth karo" |
| 2026-10-21 | Mobile overflow fix + Lighthouse audit | User requested: "resaponsivesss ko be fix kro" |
| 2026-09-25 | Full-bleed edge-to-edge canvas sizing | User reported: "side black box bana hova ha hero section fill nai ha" |
| 2026-09-16 | Mobile responsiveness fix + robots.txt update | User reported: "mobile ma responsiveness nai ha" |
| 2026-09-16 | Blue line artifact elimination | User demanded: "scroll karte hove pixel na phate ek be frame ka" |