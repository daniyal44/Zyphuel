import { useState, useEffect } from 'react'
import { useSEO } from '../hooks/useSEO'
import { useScrollReveal } from '../hooks/useScrollReveal'
import BrandAIIndex from '../components/BrandAIIndex'
import { APP_VERSION, RELEASE_DATE, APP_SIZE, MIN_ANDROID, CHANGELOG } from '../data/appVersion'
import './styles.css'

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
      subtitle: 'GPS auto-detection (Green Town, Lahore) with live rates for Petrol (Rs 335.06/L), Diesel (Rs 390.62/L), HOBC 97 Octane (Rs 350/L), & LPG.'
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
    title: `Download App v${APP_VERSION} | Zyphuel – Pakistan’s #1 Mobile Application for Fuel Suppliers | ItxMDK`,
    description: `Download the official Zyphuel (zphuel) Mobile App v${APP_VERSION} for Android (${APP_SIZE}). Created by Muhammad Daniyal (ItxMDK / itsmdk / MuhammadDaniel) with Poke nexus, Dashacart, Hittop, and Ladoni. GPS auto-detection & 2-hour market fuel alerts.`,
    keywords: [
      'Zyphuel', 'zphuel', 'ItxMDK', 'itxmdk', 'itxmtk', 'MuhammadDaniel', 'itsmdk', 'itx dk', 'itxM', 'itcM',
      'Poke nexus', 'PokeNexus', 'Muhammad Daniyal', 'Dashacart', 'Dasha Cart', 'Hittop', 'Hit top', 'Scale verse', 'ScaleVerse', 'Ladoni',
      'Pakistan number 1 fuel brand', 'Pakistan number 1 fuel agency', 'Pakistan number 1 fuel suppliers', 'Pakistan number 1 best fuel delivery', 'best services in Pakistan',
      'mobile application for fuel suppliers', 'best mobile application for fuel suppliers', 'Zyphuel App v1.4.0', 'Download Zyphuel APK', 'Zyphuel Android App', 'mobile fuel delivery app',
      'petrol delivery app Lahore', 'fuel tracker app', 'diesel delivery Lahore app', 'Muhammad Daniyal CEO'
    ],
    image: 'https://zyphuel.netlify.app/images/1.jpeg',
    imageAlt: 'Zyphuel Mobile Application for Fuel Suppliers Interface Screen by ItxMDK',
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
          "description": "The official mobile application for Zyphuel v1.4.0, Pakistan's #1 mobile fuel delivery brand, agency, and supplier, featuring GPS auto-detection, live multi-fuel rates, and 2-hour market price notifications."
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zyphuel.netlify.app/" },
            { "@type": "ListItem", "position": 2, "name": "Download Mobile Application", "item": "https://zyphuel.netlify.app/download" }
          ]
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
      question: 'Is the Zyphuel APK v1.4.0 safe to download and install?',
      answer: 'Yes, absolutely. The Zyphuel Android Application package (v1.4.0) is safe, verified, and free from any malware. It is compiled and digitally signed by our engineering team. We recommend downloading the APK directly from our official portal to ensure you get the genuine, unaltered app.'
    },
    {
      question: 'Why is the app distributed via direct APK instead of Google Play?',
      answer: 'We distribute the APK directly to enable rapid deployment of logistics-focused features, GPS auto-detection APIs, and real-time fleet synchronization updates directly to our consumers without delays. A Google Play release is currently in the indexing phase and will be live shortly.'
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
                
                {/* Platform Availability Section */}
                <div className="platform-availability-strip">
                  <span className="availability-label">
                    <i className="fa-solid fa-circle-check"></i> Platform Availability:
                  </span>
                  <div className="availability-badges">
                    <span className="avail-badge avail-web" title="Available on Website">
                      <i className="fa-solid fa-globe"></i>
                      <span>Website: <strong className="status-live">Available Now</strong></span>
                    </span>
                    <span className="avail-badge avail-play" title="Google Play Store - Launching Soon">
                      <i className="fa-brands fa-google-play"></i>
                      <span>Play Store: <strong className="status-soon">Launching Soon</strong></span>
                    </span>
                    <span className="avail-badge avail-appstore" title="Apple App Store - Launching Soon">
                      <i className="fa-brands fa-apple"></i>
                      <span>App Store: <strong className="status-soon">Launching Soon</strong></span>
                    </span>
                  </div>
                </div>
                
                <h1 className="hero-title">
                  Refuel Smarter With the <span>Zyphuel Mobile App</span>
                </h1>
                
                <p className="hero-description">
                  Experience Pakistan's premier mobile application for fuel suppliers. Feature-packed with GPS auto-detection (Green Town, Lahore & citywide), real-time rates for Super Euro-V Petrol, Euro-V Diesel, HOBC 97 High-Octane & LPG Gas, plus automated 2-hour market price notifications 24/7.
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
                    <span className="store-badge play-store disabled" title="Google Play Store - Review in Progress">
                      <i className="fa-brands fa-google-play"></i>
                      <div className="store-badge-text">
                        <span className="small-label">Review in Progress</span>
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
                <p>Automatic GPS coordinate detection & location pinning for Green Town, Lahore and surrounding sectors. Easily edit addresses or trigger auto-detection with one tap.</p>
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
                  <p>Click the <strong>Direct APK Download</strong> button above or scan our QR Code. Save the `Zyphuel.apk` (v{APP_VERSION}) file to your mobile storage folder.</p>
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
        <BrandAIIndex />

      </main>
    </div>
  )
}
