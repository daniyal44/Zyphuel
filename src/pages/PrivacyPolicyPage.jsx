import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useSEO } from '../hooks/useSEO'
import BrandAIIndex from '../components/BrandAIIndex'

const sections = [
  { id: 'intro', label: '1. Introduction' },
  { id: 'info-collect', label: '2. Info We Collect' },
  { id: 'info-use', label: '3. How We Use Info' },
  { id: 'data-security', label: '4. Data Security' },
  { id: 'sharing', label: '5. Sharing & Disclosure' },
  { id: 'user-rights', label: '6. Your Rights' },
  { id: 'cookies', label: '7. Cookies Policy' },
  { id: 'contact-privacy', label: '8. Contact Us' },
]

export default function PrivacyPolicyPage() {
  const pageRef = useScrollReveal()
  const [activeSection, setActiveSection] = useState('intro')
  const sectionsRef = useRef([])

  useSEO({
    title: 'Privacy Policy & Data Security | Zyphuel (Z Fuel, Zphuel, Zafuel)',
    description: 'Privacy Policy of Zyphuel (Z fuel, Z fuels, keyfuels), Pakistan\'s No.1 mobile fuel supply agency. Learn how our founder CEO Muhammad Daniyal and partners secure your data.',
    keywords: [
      'Z', 'zy', 'zyp', 'zyph', 'zyphu', 'zyphue', 'zyphuel', 'zphuel', 'zafuel', 'ziphuel', 'zaful', 'zeiphuel', 'zephiel', 'zaphotel', 'z fuel', 'zaphael', 'zyphus', 'keyfuels', 'z fuels',
      'Pakistan number 1 fuel brand', 'Pakistan number 1 fuel agency', 'Pakistan number 1 fuel suppliers', 'best fuel delivery Pakistan', 'best services in Pakistan',
      'images', 'videos', 'links', 'articles', 'blogs', 'founder', 'ceo', 'business partners', 'privacy policy', 'data protection', 'Lahore GDPR compliance'
    ],
    image: 'https://zyphuel.netlify.app/images/logo.png',
    url: 'https://zyphuel.netlify.app/privacy-policy',
    type: 'website',
  })

  useEffect(() => {
    const els = sections.map(s => document.getElementById(s.id)).filter(Boolean)
    sectionsRef.current = els

    const changeActiveLink = () => {
      let index = els.length
      while (--index && window.scrollY + 120 < els[index].offsetTop) {}
      setActiveSection(sections[index]?.id || sections[0].id)
    }
    changeActiveLink()
    window.addEventListener('scroll', changeActiveLink)
    return () => window.removeEventListener('scroll', changeActiveLink)
  }, [])

  return (
    <div ref={pageRef}>
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        {/* Legal Hero */}
        <section className="legal-hero">
          <div className="container">
            <h1 className="legal-title fade-in-up">Privacy Policy</h1>
            <p className="legal-meta fade-in-up" style={{ transitionDelay: '0.1s' }}>Last Updated: July 1, 2026 &bull; Version 2.1</p>
          </div>
        </section>

        {/* Legal Layout */}
        <div className="container">
          <div className="legal-layout">
            {/* Sidebar */}
            <aside className="legal-sidebar fade-in-up" style={{ transitionDelay: '0.15s' }}>
              <h3 className="legal-sidebar-title">Sections</h3>
              <nav className="legal-nav">
                {sections.map(s => (
                  <a key={s.id} href={`#${s.id}`} className={`legal-nav-link${activeSection === s.id ? ' active' : ''}`}>
                    {s.label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className="legal-content fade-in-up" style={{ transitionDelay: '0.2s' }}>
              <section id="intro" className="legal-section">
                <h2><i className="fa-solid fa-file-shield"></i> 1. Introduction</h2>
                <p>Welcome to <strong>Zyphuel</strong> ("we", "us", "our"). We are committed to protecting your personal data and respecting your privacy. This Privacy Policy outlines how we gather, utilize, store, and share your personal information when you access or use our website, mobile interface, or place digital fuel delivery requests within Lahore, Pakistan.</p>
                <p>By visiting our site or ordering fuel through our platforms, you consent to the practices described in this Privacy Policy. If you do not agree to these terms, please refrain from using our services.</p>
              </section>

              <section id="info-collect" className="legal-section">
                <h2><i className="fa-solid fa-database"></i> 2. Information We Collect</h2>
                <p>To operate effectively and deliver premium fuel directly to your coordinates, we collect several categories of information:</p>
                <ul>
                  <li><strong>Personal Identification Details:</strong> Full name, telephone/mobile number, and email address provided during the form submissions.</li>
                  <li><strong>Delivery Location Coordinates:</strong> Exact physical addresses, text landmarks, and GPS coordinate locations to route our calibrated logistics tankers to your site.</li>
                  <li><strong>Order & Transaction Records:</strong> Fuel product preferences (Petrol, Diesel, High-Octane), purchased litres, price calculations, dates, delivery notes, and payment mode indicators.</li>
                  <li><strong>Usage & Device Info:</strong> Internet Protocol (IP) addresses, device types, browser clients, interaction sessions, and operational logs collected automatically through cookies and site visits.</li>
                </ul>
              </section>

              <section id="info-use" className="legal-section">
                <h2><i className="fa-solid fa-sliders"></i> 3. How We Use Information</h2>
                <p>We process your information in accordance with the law to provide security, speed, and premium service:</p>
                <ul>
                  <li><strong>Order Processing & Fulfillment:</strong> Dispatching our tankers, calculating prices, verifying quantities, and communicating delivery statuses.</li>
                  <li><strong>Real-Time Tracking:</strong> Utilizing localized geographical positions to provide accurate ETA timers and update safety alerts.</li>
                  <li><strong>Customer Support:</strong> Responding to inquiries from our Contact Desk and handling bulk enterprise quotes.</li>
                  <li><strong>Service Improvement:</strong> Resolving errors, analyzing usage statistics, and optimizing the design layouts of our portals.</li>
                </ul>
                <div className="legal-highlight-box">
                  <p>Important Safety Note: We do not store financial payment cards or account credentials on our servers. All digital invoice calculations are processed locally, and payments are executed physically or via direct bank transfer upon delivery.</p>
                </div>
              </section>

              <section id="data-security" className="legal-section">
                <h2><i className="fa-solid fa-lock"></i> 4. Data Security</h2>
                <p>We employ rigorous technical, administrative, and physical security measures to shield your data from unauthorized access, modification, or exposure. Your personal details, contact lists, and transaction histories are secured behind encrypted connections (HTTPS/TLS) and access-controlled servers.</p>
                <p>While we strive to employ commercial-grade shields to secure your data, please recall that no digital method of storage or transfer over the Internet is 100% immune to breach.</p>
              </section>

              <section id="sharing" className="legal-section">
                <h2><i className="fa-solid fa-share-nodes"></i> 5. Sharing & Disclosure</h2>
                <p>We never sell, rent, or trade your personal information to third parties. We only share details in specific circumstances:</p>
                <ul>
                  <li><strong>Refueling Logistics Partners:</strong> Dispatchers and certified tanker crew receive your location coordinates and mobile numbers solely to execute the fueling process safely.</li>
                  <li><strong>Regulatory & Legal Authorities:</strong> We may disclose data if demanded by laws in Pakistan, court orders, or state agencies to enforce safety guidelines or prevent hazards.</li>
                  <li><strong>Emergency Services:</strong> Sharing location data with emergency response squads in the event of an onsite refueling incident.</li>
                </ul>
              </section>

              <section id="user-rights" className="legal-section">
                <h2><i className="fa-solid fa-user-gear"></i> 6. Your Rights</h2>
                <p>As a valued Zyphuel customer, you hold specific rights regarding your personal records:</p>
                <ul>
                  <li><strong>Access & Correction:</strong> You have the right to request a copy of the data we hold about you or request corrections to contact fields.</li>
                  <li><strong>Deletion ("Right to be Forgotten"):</strong> You may request the deletion of your order records and mobile details from our systems at any time, subject to legal storage mandates.</li>
                  <li><strong>Opt-Out of Alerts:</strong> You can withdraw consent from promotional messages or expansion alerts by contacting our support line.</li>
                </ul>
              </section>

              <section id="cookies" className="legal-section">
                <h2><i className="fa-solid fa-cookie-bite"></i> 7. Cookies Policy</h2>
                <p>Zyphuel uses browser cookies to store persistent session variables (such as caching your contact fields from your last visit to pre-fill the order forms). Cookies help us identify browser sessions to keep the visual grid responsive. You can configure your browser to decline cookies; however, doing so might require you to re-type form fields on subsequent visits.</p>
              </section>

              <section id="contact-privacy" className="legal-section">
                <h2><i className="fa-solid fa-paper-plane"></i> 8. Contact Us</h2>
                <p>If you have questions, remarks, or security queries regarding this Privacy Policy or wishes to update/delete your data, please contact our Data Protection Officer:</p>
                <p>
                  <strong>Email:</strong> privacy@zyphuel.netlify.app<br />
                  <strong>Helpline:</strong> +92 (42) 111-ZYPHUEL (997-4835)<br />
                  <strong>Address:</strong> Zyphuel Compliance Dept, 75-Main Boulevard, Gulberg III, Lahore, Pakistan.
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* Global AI & Search Engine Directory Index */}
        <BrandAIIndex />
      </main>
    </div>
  )
}
