import { useState, useEffect } from 'react'
import { useSEO } from '../hooks/useSEO'
import { useScrollReveal } from '../hooks/useScrollReveal'
import BrandAIIndex from '../components/BrandAIIndex'
import './styles.css'

export default function DownloadPage() {
  const [activeFaq, setActiveFaq] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      img: '/images/app_order_screen.jpg',
      title: '1. Order Refueling',
      desc: 'Select fuel type (Petrol, Octane, Diesel), specify amount, and drag pin to coordinates.'
    },
    {
      img: '/images/app_tracking_screen.jpg',
      title: '2. Live Delivery GPS',
      desc: 'Track our micro-refueler truck approaching in real-time with continuous ETA.'
    },
    {
      img: '/images/app_receipt_screen.jpg',
      title: '3. Digital Invoice Proof',
      desc: 'View digitally calibrated flow-meter receipts and transaction logs immediately.'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [slides.length])
  
  useSEO({
    title: 'Download App | Zyphuel – Pakistan’s #1 Fuel Supplier & Agency in Lahore',
    description: 'Download the official Zyphuel Mobile App for Android. Experience Pakistan\'s first 24/7 on-demand mobile fuel delivery service. Order petrol, diesel, and high-octane directly to your doorstep in Lahore.',
    keywords: [
      'Zyphuel App', 'Download Zyphuel APK', 'Zyphuel Android App', 'mobile fuel delivery app',
      'petrol delivery app Lahore', 'fuel tracker app', 'diesel delivery Lahore app', 'Muhammad Daniyal CEO',
      'Pakistan on-demand fuel app', 'smart energy logistics app'
    ],
    image: 'https://zyphuel.netlify.app/images/logo.png',
    url: 'https://zyphuel.netlify.app/download',
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Zyphuel Mobile Application",
      "operatingSystem": "Android 8.0 and above",
      "applicationCategory": "BusinessApplication, UtilitiesApplication",
      "downloadUrl": "https://zyphuel.netlify.app/APK/Zyphuel.apk",
      "fileSize": "22.8MB",
      "softwareVersion": "1.0.4",
      "author": {
        "@type": "LocalBusiness",
        "name": "Zyphuel",
        "url": "https://zyphuel.netlify.app",
        "hasMap": "https://share.google/Nb4XGKYq5aU0nzLr3",
        "founder": {
          "@type": "Person",
          "name": "Muhammad Daniyal",
          "jobTitle": "Founder & CEO",
          "sameAs": "https://github.com/daniyal44"
        }
      },
      "description": "The official mobile application for Zyphuel, Pakistan's #1 mobile fuel delivery brand, agency, and supplier, offering 24/7 terminal-grade petrol and diesel delivery directly to vehicles and generators in Lahore."
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

  // Live prices matching services page rates
  const mockPrices = {
    petrol: 316.15,
    diesel: 354.35,
    highOctane: 448.00
  }

  const faqs = [
    {
      question: 'Is the Zyphuel APK safe to download and install?',
      answer: 'Yes, absolutely. The Zyphuel Android Application package is safe, verified, and free from any malware. It is compiled and digitally signed by our engineering team. We recommend downloading the APK directly from our official portal to ensure you get the genuine, unaltered app.'
    },
    {
      question: 'Why is the app distributed via direct APK instead of Google Play?',
      answer: 'We distribute the APK directly to enable rapid deployment of logistics-focused features, map APIs, and real-time fleet synchronization updates directly to our consumers without delays. A Google Play release is currently in the indexing phase and will be live shortly.'
    },
    {
      question: 'When will the iOS App Store version be available?',
      answer: 'Our iOS version is currently in closed beta testing. We expect to launch it on the Apple App Store in the next quarter. In the meantime, iPhone users can enjoy a seamless ordering experience by accessing our fully responsive web platform on their mobile browsers.'
    },
    {
      question: 'Does the application require special system permissions?',
      answer: 'The Zyphuel app requires basic Location permissions (to accurately route fuel trucks to your vehicle/generator coordinates) and Notification permissions (to update you on order status and delivery milestones). We do not access contacts, storage, or personal files.'
    }
  ]

  return (
    <div ref={pageRef} className="download-page-wrapper">
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        
        {/* Hero Section */}
        <section className="download-hero">
          <div className="container">
            <div className="download-hero-grid">
              
              {/* Left Column: Details & Actions */}
              <div className="download-hero-content fade-in-up">
                <div className="hero-subtitle-badge">
                  <i className="fa-solid fa-mobile-screen"></i>
                  <span>Smart Mobile Refueling</span>
                </div>
                <h1 className="hero-title">
                  Refuel Smarter With the <span>Zyphuel App</span>
                </h1>
                <p className="hero-description">
                  Take full control of your fuel logistics. Our international-standard mobile application allows you to schedule fuel deliveries, track smart refuelers in real-time, view invoice history, and manage multi-vehicle corporate fleets 24/7 across Lahore.
                </p>

                {/* Primary Actions */}
                <div className="download-actions">
                  <button onClick={handleApkDownload} className="btn btn-primary btn-download-main">
                    <i className="fa-brands fa-android"></i>
                    <div className="btn-download-text">
                      <span className="small-label">Download for Android</span>
                      <span className="large-label">Direct APK Download</span>
                    </div>
                  </button>

                  <div className="badge-store-group">
                    <span className="store-badge play-store disabled" title="Google Play Store - Coming Soon">
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

                {/* QR Code Segment */}
                <div className="qr-scanner-box">
                  <div className="qr-svg-container">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="qr-svg">
                      {/* Quiet Zone & Border */}
                      <rect width="100" height="100" fill="white" rx="8" />
                      
                      {/* Top-Left Finder Pattern */}
                      <rect x="10" y="10" width="30" height="30" fill="var(--text-primary)" />
                      <rect x="15" y="15" width="20" height="20" fill="white" />
                      <rect x="20" y="20" width="10" height="10" fill="var(--accent-color)" />
                      
                      {/* Top-Right Finder Pattern */}
                      <rect x="60" y="10" width="30" height="30" fill="var(--text-primary)" />
                      <rect x="65" y="15" width="20" height="20" fill="white" />
                      <rect x="70" y="20" width="10" height="10" fill="var(--accent-color)" />
                      
                      {/* Bottom-Left Finder Pattern */}
                      <rect x="10" y="60" width="30" height="30" fill="var(--text-primary)" />
                      <rect x="15" y="65" width="20" height="20" fill="white" />
                      <rect x="20" y="70" width="10" height="10" fill="var(--accent-color)" />
                      
                      {/* Bottom-Right Alignment Pattern & Random code bits */}
                      <rect x="75" y="75" width="10" height="10" fill="var(--text-primary)" />
                      
                      {/* Timing patterns and bits */}
                      <rect x="45" y="10" width="5" height="5" fill="var(--text-primary)" />
                      <rect x="50" y="15" width="5" height="5" fill="var(--accent-color)" />
                      <rect x="45" y="25" width="5" height="5" fill="var(--text-primary)" />
                      
                      <rect x="10" y="45" width="5" height="5" fill="var(--accent-color)" />
                      <rect x="20" y="45" width="5" height="5" fill="var(--text-primary)" />
                      <rect x="30" y="45" width="5" height="5" fill="var(--text-primary)" />
                      
                      <rect x="45" y="45" width="10" height="10" fill="var(--text-primary)" />
                      <rect x="50" y="55" width="5" height="5" fill="var(--accent-color)" />
                      
                      <rect x="60" y="45" width="5" height="5" fill="var(--text-primary)" />
                      <rect x="70" y="45" width="5" height="5" fill="var(--accent-color)" />
                      <rect x="80" y="45" width="5" height="5" fill="var(--text-primary)" />
                      
                      <rect x="45" y="65" width="5" height="5" fill="var(--accent-color)" />
                      <rect x="50" y="75" width="5" height="5" fill="var(--text-primary)" />
                      <rect x="45" y="85" width="5" height="5" fill="var(--text-primary)" />
                      
                      <rect x="65" y="60" width="5" height="5" fill="var(--text-primary)" />
                      <rect x="85" y="60" width="5" height="5" fill="var(--accent-color)" />
                      <rect x="75" y="65" width="5" height="5" fill="var(--text-primary)" />
                      <rect x="85" y="70" width="5" height="5" fill="var(--text-primary)" />
                      
                      <rect x="60" y="80" width="10" height="5" fill="var(--accent-color)" />
                      <rect x="65" y="85" width="5" height="5" fill="var(--text-primary)" />
                      <rect x="85" y="85" width="5" height="5" fill="var(--text-primary)" />
                    </svg>
                  </div>
                  <div className="qr-info">
                    <h4>Scan to Download</h4>
                    <p>Point your smartphone camera at the QR code to download the installation file directly onto your mobile device.</p>
                  </div>
                </div>

                <div className="app-meta-tags">
                  <span><strong>Version:</strong> 1.0.4</span>
                  <span className="separator">•</span>
                  <span><strong>Size:</strong> 22.8 MB</span>
                  <span className="separator">•</span>
                  <span><strong>Min Android:</strong> 8.0 (Oreo)+</span>
                </div>
              </div>

              {/* Right Column: Premium CSS Mobile Mockup */}
              <div className="download-hero-visual fade-in-up">
                <div className="phone-mockup-container">
                  <div className="phone-mockup-device">
                    <div className="phone-speaker"></div>
                    <div className="phone-camera-notch"></div>
                    <div className="phone-button power"></div>
                    <div className="phone-button volume-up"></div>
                    <div className="phone-button volume-down"></div>
                    
                    {/* Screen Container */}
                    <div className="phone-mockup-screen">
                      
                      {/* App Navbar */}
                      <div className="app-header">
                        <div className="app-logo">
                          <img src="/images/Zyphuel-logo.png" alt="Zyphuel" className="app-logo-img" />
                        </div>
                        <div className="app-loc-pill">
                          <i className="fa-solid fa-location-dot"></i>
                          <span>Gulberg III, Lahore</span>
                        </div>
                        <div className="app-avatar">
                          <i className="fa-solid fa-circle-user"></i>
                        </div>
                      </div>

                      {/* Screen Slider Showcase */}
                      <div className="phone-slider-container">
                        <div className="phone-slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                          {slides.map((slide, idx) => (
                            <div key={idx} className="phone-slide">
                              <img src={slide.img} alt={slide.title} className="phone-slide-img" />
                            </div>
                          ))}
                        </div>

                        {/* Floating overlay caption at bottom of slide */}
                        <div className="phone-slider-caption">
                          <h4>{slides[currentSlide].title}</h4>
                          <p>{slides[currentSlide].desc}</p>
                        </div>

                        {/* Slide Dots */}
                        <div className="phone-slider-dots">
                          {slides.map((_, idx) => (
                            <span
                              key={idx}
                              className={`phone-slider-dot ${currentSlide === idx ? 'active' : ''}`}
                              onClick={() => setCurrentSlide(idx)}
                            ></span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                  {/* Visual Background Glows */}
                  <div className="glow-circle primary"></div>
                  <div className="glow-circle secondary"></div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="app-features section-padding">
          <div className="container">
            <div className="section-header fade-in-up">
              <h2 className="section-title">Why Use the Zyphuel Mobile App?</h2>
              <p className="section-subtitle">Engineered on international benchmarks to provide the most reliable refueling experience.</p>
            </div>

            <div className="app-features-grid">
              
              <div className="feature-app-card fade-in-up">
                <div className="icon-wrapper tracking">
                  <i className="fa-solid fa-map-location-dot"></i>
                </div>
                <h3>Real-Time GPS Tracking</h3>
                <p>Track the exact coordinate route of our smart refueler from the dispatch station straight to your parked vehicle or generator. Dynamic estimated arrival times updated per second.</p>
              </div>

              <div className="feature-app-card fade-in-up" style={{ transitionDelay: '0.1s' }}>
                <div className="icon-wrapper schedule">
                  <i className="fa-solid fa-calendar-check"></i>
                </div>
                <h3>Automated Scheduled Orders</h3>
                <p>Never run out of backup power. Set automated weekly or monthly refueling schedules for home generators, construction plants, or delivery fleets with custom alerts.</p>
              </div>

              <div className="feature-app-card fade-in-up" style={{ transitionDelay: '0.2s' }}>
                <div className="icon-wrapper payment">
                  <i className="fa-solid fa-receipt"></i>
                </div>
                <h3>Digital Fleet Invoicing</h3>
                <p>Assign fuel quotas, trace consumption dashboards, and receive instant digital receipts featuring terminal-grade volumetric delivery proofs for transparency.</p>
              </div>

              <div className="feature-app-card fade-in-up" style={{ transitionDelay: '0.3s' }}>
                <div className="icon-wrapper telemetry">
                  <i className="fa-solid fa-gauge-high"></i>
                </div>
                <h3>Volumetric Security</h3>
                <p>Our smart delivery trucks are equipped with digitally calibrated flow meters that ensure you receive 100% genuine, precise quantities of fuel without evaporation or leakage.</p>
              </div>

            </div>
          </div>
        </section>

        {/* Installation Steps Section */}
        <section className="installation-steps section-padding">
          <div className="container">
            <div className="section-header fade-in-up">
              <h2 className="section-title">How to Install</h2>
              <p className="section-subtitle">Follow these quick, easy steps to get Zyphuel set up on your Android device.</p>
            </div>

            <div className="steps-timeline">
              
              <div className="step-timeline-item fade-in-up">
                <div className="step-num">01</div>
                <div className="step-content">
                  <h4>Download the Installation File</h4>
                  <p>Click the <strong>Direct APK Download</strong> button above or scan our QR Code. Save the `.apk` file to your mobile storage folder.</p>
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
                  <h4>Verify & Start Ordering</h4>
                  <p>Launch the Zyphuel App, input your cell phone number to receive an OTP verification code, and start ordering premium fuel on-demand!</p>
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
