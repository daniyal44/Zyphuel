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

  // Slides mapped directly from actual app screenshots: 1.jpeg, 2.jpeg, 3.jpeg
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
          "datePublished": "2026-09-02T00:00:00+05:00",
          "dateModified": "2026-09-02T00:00:00+05:00",
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
          "datePublished": "2026-09-02T00:00:00+05:00",
          "dateModified": "2026-09-02T00:00:00+05:00",
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
          "datePublished": "2026-09-02T00:00:00+05:00",
          "dateModified": "2026-09-02T00:00:00+05:00",
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
      answer: `Yes, absolutely. The Zyphuel Android Application package (v${APP_VERSION}) is safe, verified, and free from any malware. It is compiled and digitally signed by our engineering team. We recommend downloading the APK directly from our official portal to ensure you get the genuine, unaltered app.`
    },
    {
      question: 'Why is the app distributed via direct APK instead of Google Play?',
      answer: 'We distribute the APK directly to enable rapid deployment of logistics-focused features, GPS auto-detection APIs, and real-time fleet synchronization updates directly to our consumers without delays. The official Google Play Store release is launching soon and will be available shortly.'
    },
    {
      question: 'When will the iOS App Store version be available?',
      answer: 'Our iOS version is currently in closed beta testing. We expect to launch it on the Apple App Store in the next quarter. In the meantime, iPhone users can enjoy a seamless ordering experience by accessing our fully responsive web platform on their mobile browsers.'
    },
    {
      question: 'Does the application require special system permissions?',
      answer: 'The Zyphuel app requires basic Location permissions (to accurately auto-detect your address coordinates in Lahore) and Notification permissions (to deliver 2-hour fuel market rate updates and order status milestones). We do not access contacts, storage, or personal files.'
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

        {/* Feature Highlights Grid synced with screenshot capabilities */}
        <section className="app-features section-padding">
          <div className="container">
            <div className="section-header fade-in-up">
              <h2 className="section-title">Why Use the Zyphuel Mobile App?</h2>
              <p className="section-subtitle">Engineered with real-time GPS auto-detection, multi-fuel live market rate tracking, and 2-hour push notifications for fuel suppliers in Pakistan.</p>
            </div>

            <div className="app-features-grid">
              <div className="feature-app-card fade-in-up">
                <div className="icon-wrapper tracking">
                  <i className="fa-solid fa-location-crosshairs"></i>
                </div>
                <h3>GPS Auto-Detect Location</h3>
                <p>Automatic GPS coordinate detection & location pinning for Gulberg, DHA, Green Town, Lahore and surrounding sectors. Easily edit addresses or trigger auto-detection with one tap.</p>
              </div>

              <div className="feature-app-card fade-in-up" style={{ transitionDelay: '0.1s' }}>
                <div className="icon-wrapper schedule">
                  <i className="fa-solid fa-gas-pump"></i>
                </div>
                <h3>Multi-Fuel Live Rate Dashboard</h3>
                <p>Monitor live market rates in real-time: Petrol (Rs 335.06/L), Diesel (Rs 390.62/L), High-Octane 97 (Rs 350.00/L), and LPG Gas (Rs 241.43/kg) with transparent Euro-V quality specs.</p>
              </div>

              <div className="feature-app-card fade-in-up" style={{ transitionDelay: '0.2s' }}>
                <div className="icon-wrapper payment">
                  <i className="fa-solid fa-bell"></i>
                </div>
                <h3>2-Hour Price Alert Push Notifications</h3>
                <p>Stay informed with automated 2-hour fuel market price update notifications sent straight to your lock screen, alongside live refueler dispatch milestone alerts.</p>
              </div>

              <div className="feature-app-card fade-in-up" style={{ transitionDelay: '0.3s' }}>
                <div className="icon-wrapper telemetry">
                  <i className="fa-solid fa-bolt"></i>
                </div>
                <h3>Instant "Order Now" Dispatch</h3>
                <p>Place on-demand fuel orders instantly with our streamlined one-tap checkout, calibrated flow-meter digital receipts, and 24/7 priority delivery servicing Lahore.</p>
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
