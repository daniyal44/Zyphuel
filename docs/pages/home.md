# Page Documentation: Home Page

## Overview & Identity
- **Page Name**: Home
- **Route**: `/`
- **Component File**: `src/pages/HomePage.jsx`
- **Primary Purpose**: Main landing portal for Zyphuel. Welcomes users, establishes brand credibility, highlights Euro-V certified fuel delivery, live dispatch GPS, Lahore coverage zones, 3D bowser model, real-time live fuel prices ticker, recent fuel articles, and office/delivery hours.

---

## SEO & Structured Data
- **Page Title**: `Doorstep Fuel Delivery in Lahore | Fast Petrol & Diesel | Zyphuel`
- **Meta Description**: `Order certified Euro-V petrol, diesel, and generator fuel delivered directly to your doorstep in Lahore within 15-45 minutes. Calibrated digital flow meters, OGRA rates, and live GPS tracking.`
- **Schema Type**: `LocalBusiness` / `OfferCatalog` / `PostalAddress`
  - Address: 75-Main Boulevard, Gulberg III, Lahore, Punjab 54000, PK
  - Coordinates: Latitude `31.507534`, Longitude `74.334949`
  - Founder: Muhammad Daniyal (Founder & CEO)
  - Helpline / Phone: `+92 3230-112464`

---

0. **Cinematic 3D Scroll Refueling Hero Section (Top Hero)**:
   - Component: `src/components/ScrollAnimationSection.jsx` + `src/components/ScrollAnimationSection.css`.
   - **Full-Bleed Edge-to-Edge Canvas — Zero Text Overlays**:
     - The 3D frames fill 100% of the viewport using cover-mode aspect scaling (`Math.max(cw/iw, ch/ih)`).
     - No boxed cards, no story stages, no greeting badges, no phase badges — pure cinematic visual experience only.
     - Subtle ambient vignette overlays (top gradient, bottom gradient, radial) provide depth.
   - **300 High-Definition Frames**: Full sequence from `/ezgif-2f1a39c97e5b173b-jpg/` in 3D motion.
   - **Lerp-Based Smooth Animation**: Frame interpolation uses lerp (linear interpolation at 0.08 speed factor) via a continuous `requestAnimationFrame` loop. Scroll sets target frame; animation smoothly eases toward it. No instant jumps.
   - **Extended Runway for Slow Scroll**: `600vh` desktop / `480vh` tablet / `400vh` mobile — frames advance gradually and cinematically.
   - **Minimal HUD Only**: Thin glowing progress bar at bottom + subtle "Scroll to explore" hint pill. "Continue to Doorstep Fuel Delivery" link appears near frame 290+.
   - **Strictly No Frame Numbers or Text Overlays**: Zero story cards, zero stage descriptions, zero greeting banners, zero phase badges.
   - **Seamless Transition**: When scrolling past the 300-frame runway, the next `#home` section naturally appears.

1. **Main Home Hero Section (`#home`)**:
   - Headline: `Doorstep Fuel Delivery in Lahore`.
   - Live Telemetry Badges: `24/7 Delivery`, `15–30 Min Dispatch`, `0.01L Calibrated`.
   - **Startup Transparency Box**: Appears strictly **once per calendar day** per user (`localStorage` date check `zyphuel_transparency_last_date`), equipped with an instant dismiss button (`×`).
   - CTA Buttons: Order Fuel Now (`/order/`), Learn More About Zyphuel (`/about/`).
   - **Preserved Original Animated Vector Graphic**: Equipped with `src/components/HeroGraphic.jsx` (animated Lahore skyline, road, and moving Zyphuel fuel bowser truck SVG) preserved directly opposite the hero text.

2. **Live Fuel Rates Ticker**:
   - Left-to-Right smooth infinite CSS marquee showing live prices for Super Petrol Euro-5, Hi-Cetane Euro-5 Diesel, High-Octane 97, and LPG Cylinder Gas.

3. **3D Interactive Bowser Showcase**:
   - Three.js / Canvas interactive 3D model refueler bowser (`src/components/Carousel3D.jsx`).

4. **Service Value Pillars**:
   - 0.01L Positive-Displacement Digital Flow Meter Calibration.
   - Rapid 15–45 Minute Lahore Dispatch.
   - Certified Euro-V Low-Sulfur Quality.
   - 24/7 Generator & Emergency Support.

5. **Lahore Coverage Sectors**:
   - DHA Lahore (Phases 1–9), Gulberg (I–III), Johar Town & Faisal Town, Bahria Town Lahore, Model Town & Garden Town, Cantt & Cavalary Ground, Industrial Zones (Sundar & Kot Lakhpat).

6. **Office & Delivery Schedule Card**:
   - Prominently placed box displaying operational schedule:
     - **Monday – Thursday**: 8:00 AM – 8:00 PM
     - **Friday**: 8:00 AM – 1:00 PM
     - **Saturday – Sunday**: 10:00 AM – 6:00 PM
     - **Delivery (24/7)**: Always Active (Green active glowing indicator)

7. **Featured Blog / Guides Section**:
   - Categorized article cards with instant modal preview and deep links to `/blog/`.

---

## Operational Parameters & Rules
- **Delivery Service**: 24 hours / 7 days a week always active across Lahore.
- **Office Operating Schedule**: Mon–Thu 8am–8pm, Fri 8am–1pm, Sat–Sun 10am–6pm.
- **Service Hub Location**: Gulberg III, Lahore.
- **Transparency Policy**: Displayed strictly once per calendar day on Home hero; never duplicated on child pages; auto-persisted via `localStorage` with manual dismiss.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-09-16** | 100% Exact Match to Reference zz.html Architecture. | User provided: `"D:\Games\New folder\zz.html"` reference and demanded: *"reference ka lia ma ne tume ek file de ha us ko open karo or dekho kia current home page ka hero section is sa match ho raha ha ka nai, aghar nai ho raha to match karo"*. Inspected `zz.html` and matched its exact architecture: (1) Canvas native 1:1 image rendering (`canvas.width = img.naturalWidth`, `canvas.height = img.naturalHeight`, `ctx.drawImage(img, 0, 0)`) without subpixel coordinate math or artificial zooming, (2) Centered responsive CSS layout (`top: 50%; left: 50%; transform: translate(-50%, -50%); max-width: 100%; max-height: 100%`) on pure `#000` black background, (3) Direct RAF-throttled scroll-to-frame calculation (`Math.floor(fraction * 300)`), (4) Native pulsing scroll hint (`↓ Scroll to animate ↓`) that fades away on first scroll, (5) Consistent 2500vh runway on both mobile and laptop. Zero blue lines, zero clutter. SSG build passed (exit 0). |
| **2026-09-16** | Zero-Artifact Pixel Smoothing & Elimination of Blue Line Artifact. | User demanded: *"usme blue line ki show ho rahi hai. Yeh frame ke pixels ki problem hai, yeh mujhe sahi karke dena zara... Itna hi lamba mobile mein bhi hona chahiye, aur itna hi lamba laptop mein bhi hona chahiye. Responsiveness isme har device ke mutabiq add honi chahiye"*. Completely removed progress bar and progress fill track (eliminated the blue line artifact entirely). Upgraded canvas rendering with `ctx.imageSmoothingEnabled = true`, `ctx.imageSmoothingQuality = 'high'`, and integer rounding (`Math.round`) for `dw, dh, dx, dy` to eliminate subpixel blurring, pixel tearing, and boundary seams. Kept 600vh runway uniform on mobile and laptop. Sitemaps and robots.txt updated and verified with green SSG build. |
| **2026-09-16** | Mobile Responsiveness Fix + robots.txt & sitemap.xml Update. | User reported: *"mobile ma responsiveness nai ha, robots.txt or site map be update karna, is section mein jo tumne image di hai na, uske mutabiq bana dena achhe se... responsiveness isme har device ke mutabiq add honi chahiye"*. Fixed canvas not filling viewport on mobile (was tiny box in center). Changed sticky stage to `100vw × 100dvh` (was `var(--nav-height)` based — collapsed on mobile). Added `window.innerWidth/Height` fallback in `updateCanvasDimensions` for pre-layout mobile browsers. Added orientation change handler. Set **same 600vh runway on ALL devices** (mobile, tablet, desktop — user explicitly requested equal length). Updated robots.txt: added `Disallow: /ezgif-2f1a39c97e5b173b-jpg/`, added Gemini + Google-InspectionTool crawlers. Updated sitemap.xml: added `image:image` namespace with OG image. |
| **2026-09-16** | Smooth Lerp Animation + Removed All Text Overlays + Extended 600vh Runway. | User demanded: *"Scroll animation smooth honi chahiye... Aahista aahista scroll honi chahiye... فالتو ٹیکسٹ ریموو کر دو... ScrollAnimationSection کے مطابق ہی چینج کرنے ہیں"*. Removed all 4 story cards, greeting badge, phase badge — section is now pure visual 3D cinematic with zero text overlays. Added lerp-based smooth frame interpolation (0.08 speed factor) via continuous RAF loop instead of instant frame jumps. Extended runway from 350vh→600vh (desktop), 300vh→480vh (tablet), 260vh→400vh (mobile) for slow gradual scroll. Kept full-bleed cover canvas, thin progress bar, and minimal scroll hint. |
| **2026-09-16** | Full-Bleed Section Expansion & 4-Stage Cinematic Scrollytelling Overhaul. | User demanded: *"Ye frames pure section mein pure dikhne chahiye. Jitna bada section hai na, usme pure dikhne chahiye frames, na ke ek box mein... Jab tak scrolling chal rahi hai, tab tak wo section expand hota jayega. Jaise hi frames end ho jayenge, to naya section automatically show hona shuru ho jayega... Scroll animation isme achi se dalo... koi kaam ki cheez bhi nahi tumne isme rakhi hui sahi"*. Removed boxed card container and borders entirely. Expanded canvas to full-bleed edge-to-edge cover mode (`Math.max(cw/iw, ch/ih)`) across the entire section. Implemented 4 dynamic high-value scrollytelling stages (Euro-V Purity, 0.01L Calibrated Flow, Vapor-Sealed Safety Containment, Lahore Logistics Ready with CTAs). Set seamless natural scroll continuation directly into `#home` as soon as frames complete. Strictly zero frame numbers. Preserved original `HeroGraphic` vector truck animation on `#home`. |
| **2026-09-16** | Expansive 520vh 3D Website Scroll Runway & Frame Numbers Omission. | User requested: *"Pure Euro-V Fuel Dispensing in 3D Motion... pora sa ek lamba sa section bana do matlab scroll karte hove per frame show hona chaye yar like 3D wesbite, frames number show nai hona chaye bulkil be is saection ma, Ai bun sa ache sa bana do is ko"*. Expanded runway to 520vh (desktop), 420vh (tablet), and 380vh (mobile) providing ~13px per frame for buttery-smooth 3D website scrubbing. Completely deleted numeric frame counter (`001 / 300`) and replaced it with dynamic sequence phase status pills (`Precision Nozzle Docking` -> `0.01L Calibrated Flow` -> `Sealed Euro-V Dispense Complete`). Preserved original vector skyline/truck SVG (`HeroGraphic.jsx`) on `#home`. |
| **2026-09-16** | Added Dedicated Cinematic 3D Scroll Hero Section above `#home` with "Hello Everyone" greeting & Preserved original `HeroGraphic` vector animation on `#home`. | User requested: *"new section add karna jis ma use karne ho home page ma cueernt section ke uper ek nia hero section ma ya add karna... gaha per lika 'hello everyone'... home page ma 'Doorstep Fuel Delivery in Lahore' is bulkul samne, old truck vector animation ko vase he rahne dena us ko mat charna"*. Created top cinematic hero (`ScrollAnimationSection.jsx`) featuring greeting banner and 300 frames, and restored animated vector skyline/truck SVG (`HeroGraphic.jsx`) inside `#home`. |
| **2026-09-16** | Overhauled 3D scroll animation canvas engine for cross-device responsiveness (Mobile & Desktop). | Solved mobile and desktop preview distortion and aspect-ratio squishing. Replaced CSS intrinsic sizing with JavaScript 2D context DPR-aware aspect-ratio scaling (`Math.min(cw/iw, ch/ih)`), non-blocking batch preloading (12 frames/batch), color-matched `#0a1112` backdrop, and optimized runway pacing (`450vh` desktop / `350vh` mobile). Clean, card-free, clutter-free fuel canister experience. |
| **2026-09-16** | Restored pure, clutter-free 3D scroll animation for Home page hero on mobile and desktop. | User feedback: *"sara kuch kharab kar dia ha tumne marzi wali bat ha , "D:\Games\New folder-web\zyphuel-react\ezgif-2f1a39c97e5b173b-jpg" home page me hero section ko ache sa theek karo zara"*. Removed all unwanted story cards, pills, descriptions, and overlay buttons. Fixed canvas scaling and centering on mobile and desktop preview using deep backdrop, added 1:1 RAF-throttled smooth scrubbing, instant Frame 1 render, subtle scroll hint, and seamless transition to Hero. |
| **2026-09-16** | Reduced scroll animation speed for slower, cinematic scrubbing. | User feedback: *"scroll animation bhot fast ho rahi ha , slow hone chaye thori se"*. Expanded runway to 1050vh (desktop) and 850vh (mobile), tuned RAF easing factor from 0.14 to 0.08 for slow-motion feel. |
| **2026-09-16** | Removed top tech bar and vertical navigation dots overlay. | User requested: *"Zyphuel 3D Refueling Sequence, 001 / 300, Skip Intro, Purity, Containment, Calibration, Delivery ya show nai hone chaye... isko remove karne sa scroll animation per koi farak na pare"*. Kept scroll animation, 650vh track, lerp easing, and preloader 100% intact. |
| **2026-09-16** | Upgraded Scroll Animation into full Apple-style Cinematic Scrollytelling build-up. | User requested proper pacing and presentation (*"proper build up do... ache se represent karo"*). Expanded track to 650vh with 60fps RAF lerp easing, 4 glassmorphic narrative stages (Purity, Containment, Calibration, Delivery), interactive milestone dots, and seamless gradient exit. |
| **2026-09-15** | Configured Startup Transparency box to appear strictly once per day. | User requested: *"Startup Transparency... one time in a day show hona chaye bar bar nai"*. Added date-based `localStorage` check (`zyphuel_transparency_last_date`) and dismiss button (`×`). |
| **2026-09-13** | Added dedicated Office Hours & 24/7 Delivery schedule box. | User requested explicit office timings (Mon–Thu 8am–8pm, Fri 8am–1pm, Sat–Sun 10am–6pm, Delivery 24/7 Always Active) on Home page. |
| **2026-09-13** | Maintained single Startup Transparency box exclusively on Home hero. | User instructed to keep startup transparency notice visible once without repeating across subsequent screens. |
| **2026-09-13** | Left-to-Right price ticker animation added and synced. | User requested dynamic left-to-right marquee movement for fuel rates. |
| **2026-09-10** | Integrated 3D bowser showcase and enhanced mobile responsive grid. | Elevate visual experience and brand credibility. |
