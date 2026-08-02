import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useSEO } from '../hooks/useSEO'
import BrandAIIndex from '../components/BrandAIIndex'

const sections = [
  { id: 'terms-intro', label: '1. Acceptance of Terms' },
  { id: 'use-service', label: '2. Use of Service' },
  { id: 'orders', label: '3. Orders & Delivery' },
  { id: 'payments', label: '4. Pricing & Payments' },
  { id: 'cancellations', label: '5. Cancellations' },
  { id: 'liability', label: '6. Limitation of Liability' },
  { id: 'intellectual', label: '7. Intellectual Property' },
  { id: 'contact-terms', label: '8. Contact & Disputes' },
]

export default function TermsOfUsePage() {
  const pageRef = useScrollReveal()
  const [activeSection, setActiveSection] = useState('terms-intro')

  useSEO({
    title: 'Terms of Use | Zyphuel – Pakistan’s #1 Fuel Supplier & Mobile Application for Fuel Suppliers | ItxMDK',
    description: 'Terms of Use for Zyphuel (zphuel), Pakistan\'s No.1 mobile fuel delivery brand and top mobile application for fuel suppliers. Founded by CEO Muhammad Daniyal (MuhammadDaniel, ItxMDK, itsmdk, itxmtk, itx dk, itxM, itcM) with Poke nexus, Dashacart, Hittop, and Ladoni.',
    keywords: [
      'Zyphuel', 'zphuel', 'ItxMDK', 'itxmdk', 'itxmtk', 'MuhammadDaniel', 'itsmdk', 'itx dk', 'itxM', 'itcM',
      'Poke nexus', 'PokeNexus', 'Muhammad Daniyal', 'Dashacart', 'Dasha Cart', 'Hittop', 'Hit top', 'Scale verse', 'ScaleVerse', 'Ladoni',
      'Pakistan number 1 fuel brand', 'Pakistan number 1 fuel agency', 'Pakistan number 1 fuel suppliers', 'Pakistan number 1 best fuel delivery', 'best services in Pakistan',
      'mobile application for fuel suppliers', 'best mobile application for fuel suppliers', 'terms of use', 'legal contract', 'dispute resolution Lahore'
    ],
    image: 'https://zyphuel.netlify.app/images/logo.png',
    canonicalPath: '/terms-of-use',
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms of Use - Zyphuel",
      "description": "Terms of use and service agreement for Zyphuel fuel delivery and digital logistics platform.",
      "url": "https://zyphuel.netlify.app/terms-of-use",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zyphuel.netlify.app/" },
          { "@type": "ListItem", "position": 2, "name": "Terms of Use", "item": "https://zyphuel.netlify.app/terms-of-use" }
        ]
      }
    }
  })

  useEffect(() => {
    const els = sections.map(s => document.getElementById(s.id)).filter(Boolean)
    const changeActiveLink = () => {
      let index = els.length
      while (--index && window.scrollY + 120 < els[index]?.offsetTop) {}
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
            <h1 className="legal-title fade-in-up">Terms of Use</h1>
            <p className="legal-meta fade-in-up" style={{ transitionDelay: '0.1s' }}>Last Updated: July 1, 2026 &bull; Version 1.4</p>
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
              <section id="terms-intro" className="legal-section">
                <h2><i className="fa-solid fa-file-contract"></i> 1. Acceptance of Terms</h2>
                <p>By accessing or using the Zyphuel website, mobile platform, or any associated delivery services, you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Use. These Terms constitute a binding legal agreement between you ("the User") and Zyphuel Pakistan ("the Company").</p>
                <p>If you do not agree to these Terms, you must discontinue use of our services immediately. Your continued use of our platforms constitutes your acceptance of these Terms and any future updates.</p>
              </section>

              <section id="use-service" className="legal-section">
                <h2><i className="fa-solid fa-clipboard-list"></i> 2. Use of Service</h2>
                <p>Zyphuel grants you a limited, non-exclusive, non-transferable right to use our platform for personal and commercial fuel delivery purposes within Lahore's designated delivery zones. You agree to:</p>
                <ul>
                  <li><strong>Provide Accurate Information:</strong> All delivery addresses, contact details, and fuel quantity requirements must be accurate and complete to ensure safe and efficient service.</li>
                  <li><strong>Authorized Use Only:</strong> You may not resell, duplicate, or commercially exploit the Zyphuel platform without our written consent.</li>
                  <li><strong>Lawful Purpose:</strong> You may not use the service for any illegal, fraudulent, or harmful purpose, including the procurement of fuel for non-registered vehicles or unauthorized purposes.</li>
                  <li><strong>Age Requirement:</strong> You must be at least 18 years old and a registered entity or individual with a verifiable delivery address to place orders.</li>
                </ul>
              </section>

              <section id="orders" className="legal-section">
                <h2><i className="fa-solid fa-truck-fast"></i> 3. Orders & Delivery</h2>
                <p>All fuel orders are subject to availability and delivery feasibility within your requested area. Zyphuel reserves the right to decline any order if your location falls outside the current active delivery radius or if demand exceeds current tanker capacity.</p>
                <ul>
                  <li><strong>ETA Estimates:</strong> Estimated Delivery ETAs are approximate and subject to traffic conditions, weather, safety inspections, and queue priorities.</li>
                  <li><strong>Minimum Order:</strong> The minimum fuel order quantity is 5 litres. Bulk commercial orders must be pre-approved by our logistics team.</li>
                  <li><strong>Delivery Zones:</strong> Active delivery zones are limited to designated Lahore postal codes. Expansion alerts are communicated via our website and badge notifications.</li>
                  <li><strong>Emergency Deliveries:</strong> Emergency priority orders carry an additional flat surcharge of PKR 500 and cannot be guaranteed in terms of delivery timing.</li>
                </ul>
                <div className="legal-highlight-box">
                  <p>All delivery quantities are verified at the point of delivery using tamper-evident, calibrated metering equipment. Receipt documentation is issued post-delivery.</p>
                </div>
              </section>

              <section id="payments" className="legal-section">
                <h2><i className="fa-solid fa-credit-card"></i> 4. Pricing & Payments</h2>
                <p>Fuel prices displayed on our platform are updated in real-time based on market rates as set by OGRA (Oil and Gas Regulatory Authority of Pakistan). Final delivery charges are determined by the live fuel rate at the time of dispatch, plus applicable surcharges.</p>
                <ul>
                  <li><strong>Cash on Delivery:</strong> Our primary payment method is physical cash collected by the tanker operator at the delivery location.</li>
                  <li><strong>Bank Transfer:</strong> Pre-approved enterprise accounts may arrange advance bank transfers for scheduled deliveries.</li>
                  <li><strong>Delivery Fee:</strong> A flat Rs. 250 delivery facilitation fee applies to all orders, irrespective of order size.</li>
                  <li><strong>No Hidden Charges:</strong> All applicable fees are displayed in the Order Summary before confirmation. No additional charges will be applied post-delivery.</li>
                </ul>
              </section>

              <section id="cancellations" className="legal-section">
                <h2><i className="fa-solid fa-ban"></i> 5. Cancellations & Refunds</h2>
                <p>Orders may be cancelled at no charge up to 15 minutes after placement, provided the tanker has not already been dispatched. Once the tanker is dispatched from the fuel hub, cancellation may incur a partial delivery fee.</p>
                <ul>
                  <li><strong>Refund Policy:</strong> In the rare event of a verified delivery failure or fuel quality complaint, Zyphuel will initiate a full re-delivery at no additional cost, subject to investigation.</li>
                  <li><strong>No-Show Cancellations:</strong> If the designated recipient is unavailable at the delivery address at the time of arrival, a cancellation fee of Rs. 200 applies to cover tanker routing costs.</li>
                  <li><strong>Force Majeure:</strong> In cases of floods, curfews, or other force majeure events, orders will be rescheduled at no charge.</li>
                </ul>
              </section>

              <section id="liability" className="legal-section">
                <h2><i className="fa-solid fa-shield-halved"></i> 6. Limitation of Liability</h2>
                <p>To the maximum extent permitted by applicable law in Pakistan, Zyphuel shall not be held liable for:</p>
                <ul>
                  <li>Any indirect, consequential, incidental, or special damages arising from use of our service.</li>
                  <li>Losses arising due to providing inaccurate delivery address details or fuel specifications by the customer.</li>
                  <li>Damages resulting from third-party logistics failures or national fuel supply disruptions beyond our control.</li>
                  <li>Mechanical failures, safety incidents, or accidents arising solely from customer-side equipment failure or storage tank defects.</li>
                </ul>
                <p>Our maximum liability in any event shall be limited to the total value of the fuel order placed in that transaction.</p>
              </section>

              <section id="intellectual" className="legal-section">
                <h2><i className="fa-solid fa-pen-nib"></i> 7. Intellectual Property</h2>
                <p>All content on the Zyphuel website — including but not limited to the brand name, logo, SVG illustrations, design system, copy text, animations, and service descriptions — is the exclusive intellectual property of Zyphuel Pakistan. Unauthorized reproduction, redistribution, or commercial use is strictly prohibited without written consent.</p>
                <p>Our platform design is protected under Pakistani copyright law and applicable international treaties. Infringement may result in legal action.</p>
              </section>

              <section id="contact-terms" className="legal-section">
                <h2><i className="fa-solid fa-handshake"></i> 8. Contact & Dispute Resolution</h2>
                <p>Any disputes arising from the use of our services shall first be attempted to be resolved amicably through our customer support channels. If resolution cannot be achieved within 14 working days, disputes shall be referred to the competent courts of Lahore, Pakistan.</p>
                <p>
                  <strong>Phone / WhatsApp:</strong> +92 3230-112464 <em>(Also accepting WhatsApp calls for enterprise clients)</em><br />
                  <strong>Email:</strong> m.daniyalkhan490@gmail.com <em>(For order modifications or cancellation requests)</em><br />
                  <strong>Location:</strong> 75-Main Boulevard, Gulberg III, Lahore, Pakistan <em>(Walk-in corporate meetings by appointment only)</em><br />
                  <strong>Office Hours:</strong> Monday – Thursday: 8:00 AM – 8:00 PM | Friday: 8:00 AM – 1:00 PM | Saturday – Sunday: 10:00 AM – 6:00 PM<br />
                  <strong>Fuel Delivery (24/7):</strong> Always Active
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
