import { useState, useEffect } from 'react'
import { useSEO } from '../hooks/useSEO'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { APP_VERSION, RELEASE_DATE, APP_SIZE, MIN_ANDROID, CHANGELOG } from '../data/appVersion'
import './styles.css'

const appArticles = [
  {
    id: 'app-article-1',
    badge: 'Mobile App Architecture',
    badgeIcon: 'fa-solid fa-microchip',
    title: `Zyphuel Mobile App v${APP_VERSION}: Next-Gen Doorstep Fuel Logistics & Cloud Telemetry in Pakistan`,
    readTime: '5 min read',
    date: RELEASE_DATE,
    author: 'Muhammad Daniyal (Founder & CEO)',
    authorIcon: 'fa-solid fa-user-gear',
    tags: ['ZyphuelApp', 'MuhammadDaniyal', 'DoorstepPetrol', 'LahoreFuelApp'],
    summary: `Explore how the official Zyphuel Android APK (v${APP_VERSION}, ${APP_SIZE}) transforms urban energy delivery in Lahore with instant GPS auto-detection, zero-latency cloud telemetry, and 100% verified Euro-V fuel standards.`,
    paragraphs: [
      `The Zyphuel Mobile Application (v${APP_VERSION}) is built for on-demand fuel delivery in Lahore. Engineered by Founder & CEO Muhammad Daniyal, the app connects individual car owners, commercial fleets, and industrial generator operators directly to a fleet of micro-refueler bowsers.`,
      'Unlike traditional petrol stations where motorists endure lengthy queues and manual meter discrepancies, the Zyphuel Android app leverages automated GPS address pinning covering DHA Phase 1-9, Gulberg, Johar Town, Model Town, Green Town, Bahria Town, and citywide Lahore. With a single tap, users request certified Super Euro-V Petrol, Euro-V Diesel, or High-Octane 97 delivered directly into their vehicle fuel tank.',
      'Every transaction is monitored via cloud-connected electronic flow meters that stream exact liters and pricing in real time to the smartphone screen, guaranteeing 100% volumetric transparency with zero short-fueling.'
    ]
  },
  {
    id: 'app-article-2',
    badge: 'Real-Time Price Telemetry',
    badgeIcon: 'fa-solid fa-bell',
    title: '2-Hour Automated Fuel Rate Push Notifications: Why Fleet Managers Rely on Zyphuel',
    readTime: '4 min read',
    date: RELEASE_DATE,
    author: 'Zyphuel Telemetry Engineering',
    authorIcon: 'fa-solid fa-satellite-dish',
    tags: ['FuelPriceAlerts', 'OGRAPakistan', 'FleetRefueling', 'SmartAlerts'],
    summary: 'How Zyphuel\'s built-in 2-hour push notification engine delivers official OGRA price updates and live market rate tracking directly to Android lock screens.',
    paragraphs: [
      `Fuel price fluctuations in Pakistan demand instant awareness for both enterprise fleet managers and daily commuters. The Zyphuel Android APK v${APP_VERSION} features a dedicated background notification daemon that broadcasts verified OGRA fuel rate updates every 2 hours directly to users' notification shades.`,
      'Users track real-time prices for Euro-V Petrol, Euro-V Diesel, HOBC 97 Octane, and sealed LPG Gas Cylinders. When market rate revisions occur, Zyphuel users receive priority price lock options, allowing them to order fuel at current rates before depot adjustments take effect.',
      'Combined with real-time dispatch alerts and live micro-refueler tracking, the app eliminates guesswork and streamlines fuel budgeting for businesses across Punjab.'
    ]
  },
  {
    id: 'app-article-3',
    badge: 'Enterprise B2B Solutions',
    badgeIcon: 'fa-solid fa-truck-droplet',
    title: 'Commercial Generator Refueling & Sealed LPG Gas Cylinder Refills in Lahore',
    readTime: '4 min read',
    date: RELEASE_DATE,
    author: 'Adil Farooq (Fleet Operations Lead)',
    authorIcon: 'fa-solid fa-shield-halved',
    tags: ['GeneratorDiesel', 'LPGGasCylinder', 'B2BRefueling', 'BusinessContinuity'],
    summary: 'Eliminate power outage downtime in factories, hospitals, and corporate plazas with scheduled generator diesel refills and safety-tested LPG cylinder deliveries.',
    paragraphs: [
      'Unscheduled load-shedding and power interruptions across Lahore pose major operational risks to corporate offices, IT parks, and healthcare facilities. Transporting heavy diesel containers or gas cylinders manually is hazardous and violates occupational safety regulations.',
      'The Zyphuel Mobile App introduces scheduled enterprise replenishment. Businesses can set recurring delivery dates for commercial standby generators and commercial LPG kitchen manifolds. HAZMAT-certified operators arrive with specialized dispensing nozzles, grounding wires, and automatic fire suppression equipment.',
      'With transparent Cash on Delivery (COD) for smaller utility orders and centralized monthly corporate billing for fleet clients, Zyphuel provides an all-in-one energy logistics platform right in your pocket.'
    ]
  }
]

export default function DownloadPage() {
  const [activeFaq, setActiveFaq] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Slides mapped directly from actual app screenshots: 1.jpeg, 2.jpeg, 3.jpeg, 4.jpeg
  const slides = [
    {
      img: '/images/1.jpeg',
      title: "Lahore's Premium Delivery Network",
      subtitle: 'Official Zyphuel mobile app initialization with automated push notification channel binding.'
    },
    {
      img: '/images/2.jpeg',
      title: 'User Live Location & Live Fuel Rates',
      subtitle: 'GPS auto-detection (Green Town, Lahore) with live rates for Petrol, Diesel, HOBC 97 Octane, & LPG.'
    },
    {
      img: '/images/3.jpeg',
      title: '2-Hour Fuel Rate Push Notifications',
      subtitle: 'Automated 2-hour market fuel price alert notifications and real-time delivery milestone updates.'
    },
    {
      img: '/images/4.jpeg',
      title: 'Calibrated Dispensing & Digital Proof',
      subtitle: 'Zero short-fueling digital invoice breakdown with live telemetry sensor confirmation.'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  useSEO({
    title: `Download the Zyphuel Android App v${APP_VERSION} | Fuel Delivery in Lahore`,
    description: `Download the official Zyphuel Android app v${APP_VERSION} (${APP_SIZE}) to order petrol, diesel and generator fuel in Lahore. GPS address detection, live fuel rates, and delivery tracking.`,
    keywords: [
      'Zyphuel app', `Zyphuel App v${APP_VERSION}`, 'download Zyphuel APK', 'Zyphuel Android app',
      'fuel delivery app Lahore', 'petrol delivery app Lahore', 'diesel delivery app Lahore',
      'mobile fuel delivery app Pakistan', 'fuel rate alerts app'
    ],
    image: 'https://zyphuel.netlify.app/images/1.jpeg',
    imageAlt: 'Zyphuel Android app screen showing live fuel rates and delivery tracking',
    url: 'https://zyphuel.netlify.app/download',
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "Zyphuel Mobile Application",
          "operatingSystem": "Android 8.0 and above",
          "applicationCategory": "BusinessApplication, UtilitiesApplication",
          "downloadUrl": "https://zyphuel.netlify.app/APK/Zyphuel.apk",
          "fileSize": APP_SIZE,
          "softwareVersion": APP_VERSION,
          "screenshot": [
            {
              "@type": "ImageObject",
              "url": "https://zyphuel.netlify.app/images/1.jpeg",
              "caption": "Lahore's Premium Delivery Network Splash Screen"
            },
            {
              "@type": "ImageObject",
              "url": "https://zyphuel.netlify.app/images/2.jpeg",
              "caption": "Zyphuel User Live Location & Live Rates Dashboard"
            },
            {
              "@type": "ImageObject",
              "url": "https://zyphuel.netlify.app/images/3.jpeg",
              "caption": "Zyphuel 2-Hour Fuel Rate Notification System"
            }
          ],
          "author": {
            "@type": "Organization",
            "name": "Zyphuel",
            "url": "https://zyphuel.netlify.app",
            "logo": "https://zyphuel.netlify.app/images/logo.png"
          },
          "description": `The official Zyphuel Android app v${APP_VERSION} for on-demand petrol and diesel delivery in Lahore, featuring GPS address detection, live multi-fuel rates, and 2-hourly market price notifications.`
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zyphuel.netlify.app/" },
            { "@type": "ListItem", "position": 2, "name": "Download Mobile Application", "item": "https://zyphuel.netlify.app/download" }
          ]
        },
        {
          "@type": "Article",
          "@id": "https://zyphuel.netlify.app/download#app-article-1",
          "headline": `Zyphuel Mobile App v${APP_VERSION}: Next-Gen Doorstep Fuel Logistics & Cloud Telemetry in Pakistan`,
          "description": `Explore how the official Zyphuel Android APK (v${APP_VERSION}, ${APP_SIZE}) transforms urban energy delivery in Lahore with instant GPS auto-detection and zero-latency cloud telemetry.`,
          "image": "https://zyphuel.netlify.app/images/1.jpeg",
          "datePublished": "2026-09-05T00:00:00+05:00",
          "dateModified": "2026-09-06T00:00:00+05:00",
          "author": {
            "@type": "Person",
            "name": "Muhammad Daniyal"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Zyphuel"
          }
        },
        {
          "@type": "Article",
          "@id": "https://zyphuel.netlify.app/download#app-article-2",
          "headline": "2-Hour Automated Fuel Rate Push Notifications: Why Fleet Managers Rely on Zyphuel",
          "description": "How Zyphuel's built-in 2-hour push notification engine delivers official OGRA price updates and live market rate tracking directly to Android lock screens.",
          "image": "https://zyphuel.netlify.app/images/3.jpeg",
          "datePublished": "2026-09-05T00:00:00+05:00",
          "dateModified": "2026-09-06T00:00:00+05:00",
          "author": {
            "@type": "Organization",
            "name": "Zyphuel Telemetry Engineering"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Zyphuel"
          }
        },
        {
          "@type": "Article",
          "@id": "https://zyphuel.netlify.app/download#app-article-3",
          "headline": "Commercial Generator Refueling & Sealed LPG Gas Cylinder Refills in Lahore",
          "description": "Eliminate power outage downtime in factories, hospitals, and corporate plazas with scheduled generator diesel refills and safety-tested LPG cylinder deliveries.",
          "image": "https://zyphuel.netlify.app/images/2.jpeg",
          "datePublished": "2026-09-05T00:00:00+05:00",
          "dateModified": "2026-09-06T00:00:00+05:00",
          "author": {
            "@type": "Person",
            "name": "Adil Farooq"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Zyphuel"
          }
        }
      ]
    }
  })

  const pageRef = useScrollReveal()

  const handleApkDownload = () => {
    const link = document.createElement('a')
    link.href = '/APK/Zyphuel.apk'
    link.setAttribute('download', 'Zyphuel.apk')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const faqs = [
    {
      question: `Is the Zyphuel APK v${APP_VERSION} safe to download and install?`,
      answer: `Yes, absolutely. The Zyphuel Android Application package (v${APP_VERSION}, ${APP_SIZE}) is safe, verified, and free from any malware. It is compiled and digitally signed by our engineering team. We recommend downloading the APK directly from our official portal to ensure you get the genuine, unaltered app.`
    },
    {
      question: 'How do the 2-hour market fuel price notifications work?',
      answer: 'Following OGRA’s implementation of the daily fuel pricing mechanism based on international Platts benchmarks, the app monitors official price updates and sends automated lock-screen notifications every 2 hours. This enables drivers and fleet managers to lock current rates before depot price adjustments take effect.'
    },
    {
      question: 'How does Zyphuel ensure 100% volumetric accuracy and prevent short-fueling?',
      answer: 'Every micro-refueler bowser is equipped with positive-displacement electronic flow meters calibrated to 0.01L precision with automated temperature compensation (15°C standard). The meter streams the live dispensing volume directly to your smartphone screen via an encrypted Bluetooth/cloud bridge, followed by an immutable digital receipt.'
    },
    {
      question: 'Which areas of Lahore are covered by the mobile app?',
      answer: 'The Zyphuel app features automated GPS coordinate detection covering all major Lahore zones including DHA Phase 1–9, Gulberg, Johar Town, Model Town, Green Town, Bahria Town, Faisal Town, Cantt, and surrounding industrial corridors with average 45-minute dispatch.'
    },
    {
      question: 'Can I pay with Cash on Delivery (COD) for household fuel orders?',
      answer: 'Yes! Smaller household orders from 1 to 10 Litres can be settled directly via Cash on Delivery (COD). For larger vehicle fills, commercial generator refueling, or corporate fleet accounts, we accept instant bank transfer, debit/credit cards, and structured 15/30-day corporate billing.'
    },
    {
      question: 'Why is the app distributed via direct APK instead of Google Play?',
      answer: 'We distribute the APK directly to enable rapid deployment of logistics-focused features, real-time GPS auto-detection updates, and driver foreground telemetry sync directly to our consumers without store delays. The official Google Play Store release is launching soon.'
    },
    {
      question: 'When will the iOS App Store version be available?',
      answer: 'Our iOS version is currently in closed beta testing and scheduled to launch on the Apple App Store soon. In the meantime, iPhone users can enjoy a seamless ordering experience by accessing our fully responsive web platform at https://zyphuel.netlify.app/order.'
    }
  ]

  return (
    <div ref={pageRef} className="download-page-wrapper">
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        
        {/* Modern Glassmorphic Download Hero */}
        <section className="download-hero">
          <div className="container">
            <div className="download-hero-grid">
              
              {/* Left Column: Headline, Highlights & Actions */}
              <div className="download-hero-content fade-in-up">
                <div className="hero-subtitle-badge">
                  <i className="fa-solid fa-mobile-screen"></i>
                  <span>Smart Mobile Refueling • v{APP_VERSION} (Latest Release)</span>
                </div>
                
                <h1 className="hero-title">
                  Refuel Smarter With the <span>Zyphuel Mobile App</span>
                </h1>
                
                <p className="hero-description">
                  Order fuel from your phone in minutes. GPS auto-detection (Gulberg, DHA, Green Town, Johar Town & citywide Lahore), real-time rates for Super Euro-V Petrol, Euro-V Diesel, HOBC 97 High-Octane & LPG Gas, plus automated 2-hour market price notifications 24/7.
                </p>

                {/* Primary Download CTAs */}
                <div className="download-actions">
                  <a
                    href="/APK/Zyphuel.apk"
                    download="Zyphuel.apk"
                    onClick={(e) => {
                      e.preventDefault();
                      handleApkDownload();
                    }}
                    className="btn btn-primary btn-download-main"
                    title="Download Zyphuel Android APK File Directly"
                    aria-label="Direct APK Download for Zyphuel Mobile Application for Fuel Suppliers"
                  >
                    <i className="fa-brands fa-android"></i>
                    <div className="btn-download-text">
                      <span className="small-label">Download for Android • v{APP_VERSION}</span>
                      <span className="large-label">Direct APK Download ({APP_SIZE})</span>
                    </div>
                  </a>

                  <div className="badge-store-group">
                    <span className="store-badge play-store disabled" title="Google Play Store - Launch Soon">
                      <i className="fa-brands fa-google-play"></i>
                      <div className="store-badge-text">
                        <span className="small-label">Launch Soon</span>
                        <span className="large-label">Google Play</span>
                      </div>
                    </span>
                    <span className="store-badge app-store disabled" title="Apple App Store - Coming Soon">
                      <i className="fa-brands fa-apple"></i>
                      <div className="store-badge-text">
                        <span className="small-label">Coming Soon</span>
                        <span className="large-label">App Store</span>
                      </div>
                    </span>
                  </div>
                </div>

                {/* QR Code Scanner Card */}
                <div className="qr-scanner-box">
                  <div className="qr-svg-container">
                    <img
                      src="/images/Qr-code.png"
                      alt="Scan QR Code to Download Zyphuel Mobile Application for Fuel Suppliers"
                      title="Zyphuel Mobile App Download QR Code"
                      className="qr-code-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="qr-info">
                    <h4>Scan QR to Install v{APP_VERSION}</h4>
                    <p>Scan with your smartphone camera to download the Android APK installer directly to your mobile device.</p>
                  </div>
                </div>

                {/* Metadata Pills */}
                <div className="app-meta-tags">
                  <span className="version-meta-highlight">
                    <i className="fa-solid fa-code-branch"></i> <strong>Version:</strong> v{APP_VERSION} <span className="version-tag-badge">Latest</span>
                  </span>
                  <span className="separator">•</span>
                  <span><strong>Size:</strong> {APP_SIZE}</span>
                  <span className="separator">•</span>
                  <span><strong>Updated:</strong> {RELEASE_DATE}</span>
                  <span className="separator">•</span>
                  <span><strong>Min Android:</strong> {MIN_ANDROID}</span>
                </div>
              </div>

              {/* Right Column: 3D Phone Mockup Display */}
              <div className="download-hero-visual fade-in-up">
                <div className="phone-mockup-container" itemScope itemType="https://schema.org/MobileApplication">
                  
                  {/* Slide Label Badge mapped from screenshot headlines */}
                  <div className="mockup-active-badge">
                    <span className="badge-num">{currentSlide + 1} / {slides.length}</span>
                    <span className="badge-text">{slides[currentSlide].title}</span>
                  </div>

                  <div className="phone-mockup-device">
                    <div className="phone-speaker"></div>
                    <div className="phone-camera-notch"></div>
                    <div className="phone-button power"></div>
                    <div className="phone-button volume-up"></div>
                    <div className="phone-button volume-down"></div>
                    
                    {/* Screen Frame Container */}
                    <div className="phone-mockup-screen">
                      
                      {/* Screen Slider Showcase */}
                      <div className="phone-slider-container">
                        {slides.map((slide, idx) => (
                          <div key={idx} className={`phone-slide ${currentSlide === idx ? 'active' : ''}`}>
                            <img
                              src={slide.img}
                              alt={`Zyphuel Mobile Application for Fuel Suppliers - ${slide.title}`}
                              title={`Zyphuel App Feature - ${slide.title}`}
                              className="phone-slide-img"
                              loading="eager"
                              itemProp="screenshot"
                            />
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Slide Dots below phone frame */}
                  <div className="phone-slider-dots-outside">
                    {slides.map((_, idx) => (
                      <span
                        key={idx}
                        className={`phone-slider-dot ${currentSlide === idx ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Show slide ${idx + 1}`}
                      ></span>
                    ))}
                  </div>

                  {/* Ambient Background Glow Effects */}
                  <div className="glow-circle primary"></div>
                  <div className="glow-circle secondary"></div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Key Benefits Metrics Banner */}
        <section className="download-benefits-banner">
          <div className="container">
            <div className="benefits-metrics-grid fade-in-up">
              <div className="benefit-metric-card">
                <div className="metric-icon"><i className="fa-solid fa-clock-rotate-left"></i></div>
                <div className="metric-value">45+ Mins</div>
                <div className="metric-label">Saved Per Refueling Trip</div>
              </div>
              <div className="benefit-metric-card">
                <div className="metric-icon"><i className="fa-solid fa-gauge-high"></i></div>
                <div className="metric-value">99.99%</div>
                <div className="metric-label">Calibrated Volumetric Accuracy</div>
              </div>
              <div className="benefit-metric-card">
                <div className="metric-icon"><i className="fa-solid fa-shield-halved"></i></div>
                <div className="metric-value">0% Fraud</div>
                <div className="metric-label">Zero Short-Fueling Guarantee</div>
              </div>
              <div className="benefit-metric-card">
                <div className="metric-icon"><i className="fa-solid fa-bell"></i></div>
                <div className="metric-value">2-Hour</div>
                <div className="metric-label">OGRA Market Price Push Alerts</div>
              </div>
              <div className="benefit-metric-card">
                <div className="metric-icon"><i className="fa-solid fa-map-location-dot"></i></div>
                <div className="metric-value">100%</div>
                <div className="metric-label">Lahore Citywide Sector Coverage</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="how-it-works-section section-padding">
          <div className="container">
            <div className="section-header fade-in-up">
              <div className="version-header-badge">
                <i className="fa-solid fa-route"></i> Streamlined Workflow
              </div>
              <h2 className="section-title">How the Zyphuel App Works</h2>
              <p className="section-subtitle">Order certified Euro-V fuel directly to your parked vehicle or standby generator in 4 simple steps.</p>
            </div>

            <div className="how-steps-grid">
              <div className="how-step-card fade-in-up">
                <div className="how-step-header">
                  <div className="how-step-badge">01</div>
                  <div className="how-step-icon"><i className="fa-solid fa-gas-pump"></i></div>
                </div>
                <h3>Choose Fuel &amp; Quantity</h3>
                <p>Select your required fuel: Super Euro-V Petrol, High-Octane 97, Euro-V Diesel, or LPG Gas Cylinders. Choose any volume from 1 Litre up to full tank capacity.</p>
                <div className="how-step-meta">
                  <i className="fa-solid fa-circle-check"></i> COD available for 1 to 10L
                </div>
              </div>

              <div className="how-step-card fade-in-up" style={{ transitionDelay: '0.1s' }}>
                <div className="how-step-header">
                  <div className="how-step-badge">02</div>
                  <div className="how-step-icon"><i className="fa-solid fa-location-crosshairs"></i></div>
                </div>
                <h3>Auto-Pin Your GPS Location</h3>
                <p>The app automatically detects your exact GPS coordinates in Lahore (Gulberg, DHA 1–9, Johar Town, Bahria Town, Green Town, etc.) or allows custom pin adjustments.</p>
                <div className="how-step-meta">
                  <i className="fa-solid fa-circle-check"></i> Instant sector resolution
                </div>
              </div>

              <div className="how-step-card fade-in-up" style={{ transitionDelay: '0.2s' }}>
                <div className="how-step-header">
                  <div className="how-step-badge">03</div>
                  <div className="how-step-icon"><i className="fa-solid fa-satellite-dish"></i></div>
                </div>
                <h3>Live Micro-Refueler Tracking</h3>
                <p>Watch your assigned micro-tanker bowser approach on the interactive map with real-time GPS telemetry, driver contact details, and precise live ETA updates.</p>
                <div className="how-step-meta">
                  <i className="fa-solid fa-circle-check"></i> Average 45-min arrival time
                </div>
              </div>

              <div className="how-step-card fade-in-up" style={{ transitionDelay: '0.3s' }}>
                <div className="how-step-header">
                  <div className="how-step-badge">04</div>
                  <div className="how-step-icon"><i className="fa-solid fa-receipt"></i></div>
                </div>
                <h3>Calibrated Metering &amp; Receipt</h3>
                <p>HAZMAT-certified operators refuel your tank using calibrated digital flow meters. Watch exact litres stream live on your phone and receive a verified digital invoice.</p>
                <div className="how-step-meta">
                  <i className="fa-solid fa-circle-check"></i> 100% volumetric transparency
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="why-choose-section section-padding">
          <div className="container">
            <div className="section-header fade-in-up">
              <div className="version-header-badge">
                <i className="fa-solid fa-award"></i> The Zyphuel Advantage
              </div>
              <h2 className="section-title">Why Choose the Zyphuel Mobile App?</h2>
              <p className="section-subtitle">Say goodbye to petrol station congestion, meter manipulation, and dangerous open jerry-can transportation.</p>
            </div>

            <div className="why-choose-grid">
              <div className="why-card fade-in-up">
                <div className="why-card-icon"><i className="fa-solid fa-calculator"></i></div>
                <h3>Zero Short-Fueling Guarantee</h3>
                <p>Conventional retail pumps in Pakistan frequently suffer from mechanical meter wear or tampering. Zyphuel uses positive-displacement flow meters with 0.01L digital precision.</p>
                <ul className="why-card-feature-list">
                  <li><i className="fa-solid fa-check"></i> 0.01-Litre optical pulse encoders</li>
                  <li><i className="fa-solid fa-check"></i> Live Bluetooth meter sync to your phone</li>
                  <li><i className="fa-solid fa-check"></i> Cryptographically signed digital receipts</li>
                </ul>
              </div>

              <div className="why-card fade-in-up" style={{ transitionDelay: '0.1s' }}>
                <div className="why-card-icon"><i className="fa-solid fa-droplet"></i></div>
                <h3>100% Pure Euro-V Terminal Fuel</h3>
                <p>Direct from certified petroleum storage terminals into our double-walled bowsers. Zero middle-man dilution, zero water contamination, and certified fuel density testing.</p>
                <ul className="why-card-feature-list">
                  <li><i className="fa-solid fa-check"></i> Super Euro-V Petrol (92 Octane)</li>
                  <li><i className="fa-solid fa-check"></i> High-Octane 97 (HOBC) for luxury vehicles</li>
                  <li><i className="fa-solid fa-check"></i> Low-Sulfur Hi-Cetane Euro-V Diesel</li>
                </ul>
              </div>

              <div className="why-card fade-in-up" style={{ transitionDelay: '0.2s' }}>
                <div className="why-card-icon"><i className="fa-solid fa-bell"></i></div>
                <h3>2-Hour Market Price Lock Alerts</h3>
                <p>Stay ahead of Pakistan's new OGRA daily fuel pricing system. Our background notification daemon tracks international Platts benchmark shifts every 2 hours.</p>
                <ul className="why-card-feature-list">
                  <li><i className="fa-solid fa-check"></i> Automated lock-screen rate push notifications</li>
                  <li><i className="fa-solid fa-check"></i> Priority rate-lock before pump price hikes</li>
                  <li><i className="fa-solid fa-check"></i> Official ex-depot transparency</li>
                </ul>
              </div>

              <div className="why-card fade-in-up" style={{ transitionDelay: '0.3s' }}>
                <div className="why-card-icon"><i className="fa-solid fa-hourglass-half"></i></div>
                <h3>Save 45+ Minutes Per Fueling Trip</h3>
                <p>Eliminate unnecessary round trips to petrol pumps, standing in gridlocked queues during peak hours, and navigating congested Lahore city traffic.</p>
                <ul className="why-card-feature-list">
                  <li><i className="fa-solid fa-check"></i> Refuel parked at your residence while you sleep</li>
                  <li><i className="fa-solid fa-check"></i> Refuel at corporate office parking lots</li>
                  <li><i className="fa-solid fa-check"></i> Zero engine idling fuel waste in lines</li>
                </ul>
              </div>

              <div className="why-card fade-in-up" style={{ transitionDelay: '0.4s' }}>
                <div className="why-card-icon"><i className="fa-solid fa-shield-virus"></i></div>
                <h3>NFPA 30A &amp; HAZMAT Safety Standards</h3>
                <p>Transporting loose fuel in unapproved plastic bottles or cans is hazardous and illegal. Our purpose-built micro-tankers operate under international safety protocols.</p>
                <ul className="why-card-feature-list">
                  <li><i className="fa-solid fa-check"></i> Static grounding cables &amp; anti-spark nozzles</li>
                  <li><i className="fa-solid fa-check"></i> Automatic emergency vapor shut-off valves</li>
                  <li><i className="fa-solid fa-check"></i> HAZMAT-certified and trained operators</li>
                </ul>
              </div>

              <div className="why-card fade-in-up" style={{ transitionDelay: '0.5s' }}>
                <div className="why-card-icon"><i className="fa-solid fa-wallet"></i></div>
                <h3>Flexible Payment &amp; B2B Fleet Invoicing</h3>
                <p>From individual household COD deliveries to multi-vehicle corporate accounts, Zyphuel provides frictionless financial management.</p>
                <ul className="why-card-feature-list">
                  <li><i className="fa-solid fa-check"></i> Cash on Delivery (COD) for 1–10 Litres</li>
                  <li><i className="fa-solid fa-check"></i> Biometric 1-tap checkout (Fingerprint/Face)</li>
                  <li><i className="fa-solid fa-check"></i> 15/30-day consolidated corporate credit lines</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Can Help Section */}
        <section id="how-it-helps" className="how-it-helps-section section-padding">
          <div className="container">
            <div className="section-header fade-in-up">
              <div className="version-header-badge">
                <i className="fa-solid fa-hand-holding-heart"></i> Tailored Solutions
              </div>
              <h2 className="section-title">How the Zyphuel App Helps You</h2>
              <p className="section-subtitle">Dedicated on-demand fueling solutions designed for everyday drivers, generator owners, and enterprise fleets.</p>
            </div>

            <div className="help-use-cases-grid">
              <div className="help-use-case-card fade-in-up">
                <span className="help-card-tag">Personal Mobility</span>
                <h3>Daily Drivers &amp; Commuters</h3>
                <p>Never worry about an empty fuel needle on your morning commute. Schedule a doorstep refuel at night and start your day with a full tank without visiting a crowded petrol pump.</p>
                <ul className="help-card-perks">
                  <li><i className="fa-solid fa-check"></i> Refuel parked at your porch or carport</li>
                  <li><i className="fa-solid fa-check"></i> Biometric fingerprint order confirmation</li>
                  <li><i className="fa-solid fa-check"></i> Cash on Delivery supported for small top-ups</li>
                </ul>
              </div>

              <div className="help-use-case-card fade-in-up" style={{ transitionDelay: '0.1s' }}>
                <span className="help-card-tag">Power Continuity</span>
                <h3>Standby Generator Owners</h3>
                <p>Avoid emergency blackouts during unexpected Lahore load-shedding. Our micro-tankers pump clean Euro-V diesel directly into rooftop or basement generator tanks using 100ft high-reach hoses.</p>
                <ul className="help-card-perks">
                  <li><i className="fa-solid fa-check"></i> Essential for clinics, software houses &amp; homes</li>
                  <li><i className="fa-solid fa-check"></i> Scheduled weekly/monthly automated replenishment</li>
                  <li><i className="fa-solid fa-check"></i> Eliminates dangerous loose jerry-can carrying</li>
                </ul>
              </div>

              <div className="help-use-case-card fade-in-up" style={{ transitionDelay: '0.2s' }}>
                <span className="help-card-tag">Roadside Rescue</span>
                <h3>24/7 Emergency Refueling</h3>
                <p>Stranded on Lahore Ring Road, Canal Bank Road, or downtown traffic with an empty fuel tank? Share your live location via the app for express 45-minute emergency roadside dispatch.</p>
                <ul className="help-card-perks">
                  <li><i className="fa-solid fa-check"></i> Rapid 45-minute response in covered areas</li>
                  <li><i className="fa-solid fa-check"></i> Safety perimeter cones &amp; fire protection</li>
                  <li><i className="fa-solid fa-check"></i> 24/7 emergency dispatch helpline support</li>
                </ul>
              </div>

              <div className="help-use-case-card fade-in-up" style={{ transitionDelay: '0.3s' }}>
                <span className="help-card-tag">Commercial Fleets</span>
                <h3>Fleet Yards &amp; Logistics Hubs</h3>
                <p>Consolidate refueling for delivery vans, courier trucks, and corporate transport during off-hours. Eliminate driver petty cash theft, mileage fraud, and fake manual receipts.</p>
                <ul className="help-card-perks">
                  <li><i className="fa-solid fa-check"></i> Shift-downtime yard refueling</li>
                  <li><i className="fa-solid fa-check"></i> Digital consumption telemetry &amp; RFID tracking</li>
                  <li><i className="fa-solid fa-check"></i> Consolidated monthly billing statements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Version Release Notes & Changelog Section */}
        <section className="app-changelog-section section-padding">
          <div className="container">
            <div className="section-header fade-in-up">
              <div className="version-header-badge">
                <i className="fa-solid fa-code-branch"></i> Release History
              </div>
              <h2 className="section-title">What's New in Version {APP_VERSION}</h2>
              <p className="section-subtitle">Key enhancements, stability updates, and feature upgrades introduced in our latest release ({RELEASE_DATE}).</p>
            </div>

            <div className="changelog-grid fade-in-up">
              {CHANGELOG.map((release, idx) => (
                <div key={idx} className={`changelog-card ${idx === 0 ? 'featured' : ''}`}>
                  <div className="changelog-card-header">
                    <div className="changelog-version-tag">
                      <i className="fa-solid fa-tag"></i> Version {release.version}
                    </div>
                    <span className="changelog-date">{release.date}</span>
                    {idx === 0 && <span className="changelog-badge-latest">Current Release</span>}
                  </div>
                  <h3 className="changelog-title">{release.title}</h3>
                  <ul className="changelog-features-list">
                    {release.features.map((feat, fIdx) => (
                      <li key={fIdx}>
                        <i className="fa-solid fa-circle-check"></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Installation Steps Section */}
        <section className="installation-steps section-padding">
          <div className="container">
            <div className="section-header fade-in-up">
              <h2 className="section-title">How to Install</h2>
              <p className="section-subtitle">Follow these quick, easy steps to get Zyphuel v{APP_VERSION} set up on your Android device.</p>
            </div>

            <div className="steps-timeline">
              <div className="step-timeline-item fade-in-up">
                <div className="step-num">01</div>
                <div className="step-content">
                  <h4>Download the Installation File</h4>
                  <p>Click the <strong>Direct APK Download</strong> button above or scan our QR Code. Save the `Zyphuel.apk` (v{APP_VERSION}) file ({APP_SIZE}) to your mobile storage folder.</p>
                </div>
              </div>

              <div className="step-timeline-item fade-in-up" style={{ transitionDelay: '0.1s' }}>
                <div className="step-num">02</div>
                <div className="step-content">
                  <h4>Enable Unknown Sources</h4>
                  <p>Open your phone settings, go to <strong>Security / Privacy</strong>, and toggle on <strong>"Install from Unknown Sources"</strong> for your web browser or file manager (if prompted).</p>
                </div>
              </div>

              <div className="step-timeline-item fade-in-up" style={{ transitionDelay: '0.2s' }}>
                <div className="step-num">03</div>
                <div className="step-content">
                  <h4>Run the Installer</h4>
                  <p>Open your file explorer, locate the downloaded `Zyphuel.apk`, click it, and press <strong>"Install"</strong>. The system will finalize the installation in seconds.</p>
                </div>
              </div>

              <div className="step-timeline-item fade-in-up" style={{ transitionDelay: '0.3s' }}>
                <div className="step-num">04</div>
                <div className="step-content">
                  <h4>Verify &amp; Start Ordering</h4>
                  <p>Launch the Zyphuel App, allow location &amp; notification permissions, and start ordering premium fuel on-demand!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* App Technical Specifications Section */}
        <section id="tech-specs" className="app-specs-section section-padding">
          <div className="container">
            <div className="section-header fade-in-up">
              <div className="version-header-badge" style={{ background: 'rgba(14, 165, 233, 0.2)', color: '#38bdf8' }}>
                <i className="fa-solid fa-server"></i> Technical Architecture
              </div>
              <h2 className="section-title">Application Technical Specifications</h2>
              <p className="section-subtitle">Native Android architecture engineered for low-latency IoT flow-meter synchronization and background price alerts.</p>
            </div>

            <div className="specs-grid-layout fade-in-up">
              <div className="spec-item-box">
                <div className="spec-item-icon"><i className="fa-solid fa-code-branch"></i></div>
                <div className="spec-item-content">
                  <h4>Application Version</h4>
                  <div className="spec-value">v{APP_VERSION} (Production)</div>
                  <div className="spec-subtext">Updated {RELEASE_DATE}</div>
                </div>
              </div>

              <div className="spec-item-box">
                <div className="spec-item-icon"><i className="fa-solid fa-box-archive"></i></div>
                <div className="spec-item-content">
                  <h4>Package File Size</h4>
                  <div className="spec-value">{APP_SIZE} (Universal APK)</div>
                  <div className="spec-subtext">Optimized ProGuard release build</div>
                </div>
              </div>

              <div className="spec-item-box">
                <div className="spec-item-icon"><i className="fa-brands fa-android"></i></div>
                <div className="spec-item-content">
                  <h4>Minimum OS Requirement</h4>
                  <div className="spec-value">{MIN_ANDROID}</div>
                  <div className="spec-subtext">Targeting Android 14 (API 34)</div>
                </div>
              </div>

              <div className="spec-item-box">
                <div className="spec-item-icon"><i className="fa-solid fa-microchip"></i></div>
                <div className="spec-item-content">
                  <h4>Supported Architectures</h4>
                  <div className="spec-value">arm64-v8a, armeabi-v7a, x86_64</div>
                  <div className="spec-subtext">Universal multi-ABI support</div>
                </div>
              </div>

              <div className="spec-item-box">
                <div className="spec-item-icon"><i className="fa-solid fa-fingerprint"></i></div>
                <div className="spec-item-content">
                  <h4>Security &amp; Biometrics</h4>
                  <div className="spec-value">BiometricPrompt API (v2)</div>
                  <div className="spec-subtext">Encrypted Room &amp; DataStore storage</div>
                </div>
              </div>

              <div className="spec-item-box">
                <div className="spec-item-icon"><i className="fa-solid fa-satellite"></i></div>
                <div className="spec-item-content">
                  <h4>Telemetry &amp; Notifications</h4>
                  <div className="spec-value">FCM + Foreground GPS Daemon</div>
                  <div className="spec-subtext">2-Hour rolling OGRA price sync</div>
                </div>
              </div>

              <div className="spec-item-box">
                <div className="spec-item-icon"><i className="fa-solid fa-shield-halved"></i></div>
                <div className="spec-item-content">
                  <h4>Digital Signature &amp; Integrity</h4>
                  <div className="spec-value">APK Signature Scheme v3</div>
                  <div className="spec-subtext">Digitally signed &amp; verified clean</div>
                </div>
              </div>

              <div className="spec-item-box">
                <div className="spec-item-icon"><i className="fa-solid fa-user-gear"></i></div>
                <div className="spec-item-content">
                  <h4>Developer &amp; Publisher</h4>
                  <div className="spec-value">Zyphuel Technologies</div>
                  <div className="spec-subtext">Founder: Muhammad Daniyal (ItxMDK)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            App Insights & Guides (3 SEO Articles with Left-to-Right Animations)
           ========================================================================= */}
        <section className="app-articles-section">
          <div className="container">
            <div className="section-header fade-in-up">
              <div className="version-header-badge">
                <i className="fa-solid fa-newspaper"></i> Official App Guides &amp; Insights
              </div>
              <h2 className="section-title">In-Depth Guides: Mastering the Zyphuel Mobile App</h2>
              <p className="section-subtitle">
                Guides on on-demand fueling telemetry, 2-hour market price alerts, and enterprise fleet management.
              </p>
            </div>

            <div className="app-articles-grid">
              {appArticles.map((article, idx) => (
                <article key={article.id} className="app-article-card" itemScope itemType="https://schema.org/Article">
                  <div>
                    <div className="app-article-header">
                      <span className="app-article-badge">
                        <i className={article.badgeIcon}></i> {article.badge}
                      </span>
                      <div className="app-article-meta">
                        <span><i className="fa-regular fa-clock"></i> {article.readTime}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                    </div>

                    <h3 className="app-article-title" itemProp="headline">
                      {article.title}
                    </h3>

                    <div className="app-article-body" itemProp="articleBody">
                      <p style={{ fontWeight: '600', color: '#1e293b', marginBottom: '14px' }}>
                        {article.summary}
                      </p>
                      {article.paragraphs.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="app-article-author">
                      <i className={article.authorIcon}></i>
                      <span>By <strong itemProp="author">{article.author}</strong></span>
                    </div>

                    <div className="app-article-tags">
                      {article.tags.map((tag) => (
                        <span key={tag} className="app-article-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="download-faqs section-padding">
          <div className="container">
            <div className="section-header fade-in-up">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Got questions about downloading or using the Zyphuel App? We've got answers.</p>
            </div>

            <div className="faq-accordion-container fade-in-up">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index
                return (
                  <div key={index} className={`faq-accordion-item ${isOpen ? 'active' : ''}`}>
                    <button className="faq-trigger" onClick={() => toggleFaq(index)}>
                      <span className="faq-question-text">{faq.question}</span>
                      <span className="faq-chevron">
                        <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                      </span>
                    </button>
                    <div className="faq-answer-panel" style={{ maxHeight: isOpen ? '250px' : '0' }}>
                      <div className="faq-answer-content">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Brand/AI Index search footer directory */}

      </main>
    </div>
  )
}
