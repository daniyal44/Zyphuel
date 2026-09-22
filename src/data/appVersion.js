// Centralized Zyphuel Mobile App Version Configuration
// Update this file on every application release to dynamically sync versions across the platform.

export const APP_VERSION = '2.6.4.0.0.16';
export const BUILD_NUMBER = '44';
export const RELEASE_DATE = 'September 23, 2026';
export const APP_SIZE = '31.6 MB';
export const MIN_ANDROID = '7.0 (Nougat)+';
export const TARGET_SDK = '36 (Android 15/16 Ready)';

export const CHANGELOG = [
  {
    version: '2.6.4.0.0.16',
    build: '44',
    date: 'September 23, 2026',
    title: 'Startup Crash Fix, Zero Data Leak Safeguards, Real-Time Rider GPS & 15L Capacity Cap (Build 44)',
    features: [
      'Compiled production release v2.6.4.0.0.16 (Build 44) with Android Gradle Plugin 9.1.1 and Target SDK 36 (Android 15/16 Ready)',
      'Startup Crash Resolution: Eliminated launch-time NullPointerException on security/biometric state initialization for instant crash-free opening',
      'Zero Data Leak & Anti-Breach Safeguards: Enforced automated credential, token, and API key redaction in logging and anti-breach telemetry',
      'Live Rider GPS Tracking & Smooth Interpolation: Real-time driver coordinates published to Firestore with smooth map marker motion and camera lock prevention',
      'Doorstep Delivery Pricing Alignment: 5L (Rs. 280), 10L (Rs. 300), and 15L Max capacity cap (Rs. 350) with Cash on Delivery (COD) method integration'
    ]
  },
  {
    version: '2.6.4.0.0.10',
    date: 'September 17, 2026',
    title: 'Core Telemetry Engine Upgrade, Live Flow-Meter Optimization & Multi-Sector Dispatch Sync',
    features: [
      'Compiled production release v2.6.4.0.0.10 with high-stability background daemon and enhanced APK security',
      'Optimized low-latency Rider Foreground GPS location service and real-time micro-refueler bowser radar tracking across all Lahore sectors',
      'Synchronized calibrated 0.01L digital flow-meter proofing with 2-hour automated OGRA daily fuel market rate push alerts',
      'Streamlined biometric one-tap checkout authorization (Fingerprint & Face Unlock) for lightning-fast order dispatch'
    ]
  },
  {
    version: '2.6.4.0.0.08',
    date: 'September 14, 2026',
    title: 'Precision Geolocation Telemetry, Dynamic Metering & Real-Time Dispatch Engine',
    features: [
      'Compiled production release v2.6.4.0.0.08 with enhanced runtime performance and security',
      'Refined real-time GPS location auto-pinning and low-latency micro-refueler bowser radar tracking across all Lahore sectors',
      'Synchronized digital metering validation with 2-hour automated OGRA market fuel rate push notifications',
      'Optimized biometric checkout authorization (Fingerprint & Face Unlock) and instant dispatch synchronization'
    ]
  },
  {
    version: '2.6.2',
    date: 'September 9, 2026',
    title: 'Real-Time Invoice Email Engine, High-Contrast Typography & Git Activity Graph',
    features: [
      'Instant HTML tax invoice email engine dispatched immediately to customer inboxes upon checkout',
      'High-contrast pure black typography across Drawer and Profile Settings for WCAG AAA legibility',
      '10-Category marketplace catalog for fuel, water, and automotive accessories with rapid quantity counters',
      '13-step interactive spotlight tour guide with animated onboarding walkthrough',
      'Automated repository engineering velocity chart and GitHub Actions telemetry pipeline'
    ]
  },
  {
    version: '2.3.0.1',
    date: 'September 5, 2026',
    title: 'Daily Fuel Pricing Engine, Biometric Security & Calibrated Telemetry',
    features: [
      'Synchronized with Pakistan OGRA Daily Fuel Pricing Mechanism with automated 2-hour market rate alerts',
      'Added biometric authentication (Fingerprint & Face Unlock) for secure, instantaneous checkout',
      'Engineered Rider Foreground GPS location service with low-latency live dispatch tracking across Lahore',
      'Multi-fuel live rate tracking (Super Euro-V Petrol, High-Octane 97, Euro-V Diesel, LPG Gas) with calibrated digital metering',
      'Upgraded Jetpack Compose Material 3 UI architecture with auto-pinning for Gulberg, DHA, Johar Town, Bahria Town & all Lahore sectors',
      'Encrypted local data storage (DataStore & Room) for offline order staging and zero-latency cloud sync'
    ]
  },
  {
    version: '1.5.0',
    date: 'August 18, 2026',
    title: 'Enhanced Core Telemetry Engine, Expanded Fleet Coverage & High-Speed GPS',
    features: [
      'Engineered high-accuracy GPS real-time auto-detection for all major Lahore sectors (Gulberg, DHA Phase 1-9, Johar Town, Model Town, Green Town, Bahria Town)',
      'Upgraded 2-hour automated market fuel price alert notification service with instant lock-screen push updates',
      'Integrated calibrated flow-meter digital receipt proofing with zero-latency cloud telemetry sync',
      'Optimized network payload, battery efficiency, and enhanced multi-fuel ordering for Petrol, Euro-V Diesel, High-Octane 97, and LPG Gas',
      'Performance update: Increased package features and updated release bundle size to 31.0 MB'
    ]
  },
  {
    version: '1.4.0',
    date: 'July 30, 2026',
    title: 'Live GPS Auto-Detection & 2-Hour Fuel Rate Push Alerts',
    features: [
      'Automatic GPS location detection & address pinning for Lahore',
      'Live fuel rate dashboard for Petrol (Rs 335.06/L), Diesel (Rs 390.62/L), HOBC 97 Octane (Rs 350/L), & LPG Gas',
      'Automated 2-hour market fuel rate push notification system & alert manager',
      'One-tap "Order Now" rapid refueler dispatch launcher'
    ]
  },
  {
    version: '1.2.0',
    date: 'July 2026',
    title: 'Smart Fleet GPS & Instant Digital Receipts',
    features: [
      'Enhanced real-time micro-refueler truck GPS tracking with live dispatch telemetry',
      'Instant digital invoice & flow-meter calibration proofing',
      'Optimized OTP login and 24/7 priority customer support'
    ]
  },
  {
    version: '1.1.0',
    date: 'May 2026',
    title: 'Automated Scheduled Orders & Fleet Management',
    features: [
      'Multi-vehicle corporate fleet fuel quota allocation',
      'Automated weekly generator refueling scheduler'
    ]
  }
];
