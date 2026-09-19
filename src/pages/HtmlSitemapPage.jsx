import React from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useSEO } from '../hooks/useSEO'
import Breadcrumbs from '../components/Breadcrumbs'

export default function HtmlSitemapPage() {
  const pageRef = useScrollReveal()

  useSEO({
    title: 'HTML Sitemap | All Pages & Fuel Guides Directory | Zyphuel Lahore',
    description: 'Complete HTML sitemap directory of Zyphuel doorstep fuel delivery services, ordering portal, mobile app downloads, legal policies, and Lahore energy guides.',
    keywords: [
      'Zyphuel sitemap', 'fuel delivery pages Lahore', 'Zyphuel site directory',
      'petrol delivery Lahore sitemap', 'generator diesel links Lahore'
    ],
    image: 'https://zyphuel.netlify.app/images/logo.png',
    url: 'https://zyphuel.netlify.app/sitemap/',
    canonicalPath: '/sitemap/',
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://zyphuel.netlify.app/sitemap/#webpage",
          "url": "https://zyphuel.netlify.app/sitemap/",
          "name": "Zyphuel HTML Sitemap & Directory",
          "description": "Comprehensive HTML sitemap directory indexing all public pages, services, legal policies, and blog fuel guides for Zyphuel Lahore."
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zyphuel.netlify.app/" },
            { "@type": "ListItem", "position": 2, "name": "HTML Sitemap", "item": "https://zyphuel.netlify.app/sitemap/" }
          ]
        }
      ]
    }
  })

  const mainPages = [
    {
      title: 'Home (Doorstep Fuel Delivery)',
      path: '/',
      desc: 'On-demand Euro-V petrol, diesel, and high-octane delivery in Lahore with calibrated digital flow meters and 24/7 fast dispatch.',
      badge: 'Core Gateway'
    },
    {
      title: 'Services & Commercial Fuel Rates',
      path: '/services/',
      desc: 'Consumer petrol/diesel delivery, industrial standby generator refueling, certified LPG gas cylinders, and potable water tankers.',
      badge: 'Services Hub'
    },
    {
      title: 'Order Fuel Dispatch Online',
      path: '/order/',
      desc: 'Interactive fuel ordering portal with live OGRA pricing, sector delivery pin selection, volume stepper, and Cash on Delivery.',
      badge: 'Order Portal'
    },
    {
      title: 'About Zyphuel & Leadership',
      path: '/about/',
      desc: 'Company background, Founder & CEO Muhammad Daniyal, 0.01L calibrated metering technology, and Lahore coverage mission.',
      badge: 'Company Profile'
    },
    {
      title: 'Download Android Mobile App (APK)',
      path: '/download/',
      desc: 'Direct download for the official Zyphuel Android APK with live bowser telemetry, GPS auto-pinning, and 2-hour price push alerts.',
      badge: 'Mobile App'
    },
    {
      title: 'Contact Helpline & 24/7 Support Desk',
      path: '/contact/',
      desc: '24/7 urgent fuel hotline, WhatsApp live dispatch (+92 3230-112464), corporate accounts desk, and Gulberg III headquarters.',
      badge: 'Support Desk'
    }
  ]

  const blogGuides = [
    {
      title: 'Zyphuel Energy & Technology Blog Archive',
      path: '/blog/',
      desc: 'Complete collection of industry articles, fuel economy insights, energy logistics analysis, and Lahore urban mobility updates.',
      badge: 'Blog Index'
    },
    {
      title: 'Pakistan’s Shift to Daily Fuel Pricing: OGRA Reform & App Alerts',
      path: '/blog/future-of-fuel-delivery-lahore/',
      desc: 'Detailed analysis of daily international Platts benchmark pricing, 2027 deregulation, and automated app alert protection.',
      badge: 'Energy Policy'
    },
    {
      title: 'How to Download and Install Zyphuel APK v2.6.4: Step-by-Step Guide',
      path: '/blog/download-zyphuel-apk-guide/',
      desc: 'Complete walkthrough for Android APK installation, biometric security, GPS sector detection, and instant fuel orders in Lahore.',
      badge: 'App Guide'
    },
    {
      title: 'Powering Through Load-Shedding: Industrial Generator Refueling in Lahore',
      path: '/blog/generator-refueling-services-lahore/',
      desc: 'Commercial and residential backup generator diesel logistics with 50-meter high-pressure delivery hoses across Lahore.',
      badge: 'Generator Logistics'
    },
    {
      title: 'Commercial Generator Diesel & Sealed LPG Cylinders: 2026 Safety Standards',
      path: '/blog/generator-diesel-lpg-delivery-lahore/',
      desc: 'Comprehensive safety protocols for doorstep Euro-V diesel decanting, certified 11.8kg / 45.4kg LPG cylinders, and water tanks.',
      badge: 'Safety Standards'
    },
    {
      title: 'Combating Pump Short-Fueling: Calibrated Positive-Displacement Flow Meters',
      path: '/blog/iot-telemetry-fuel-delivery/',
      desc: 'Engineering breakdown of 0.01L digital pulse encoders and cloud telemetry eliminating retail fuel station discrepancies.',
      badge: 'IoT & Telemetry'
    },
    {
      title: 'Mobile Energy Logistics in Lahore: Inside Zyphuel’s Delivery Fleet',
      path: '/blog/zyphuel-calibrated-telemetry-fleet/',
      desc: 'Founder & CEO Muhammad Daniyal shares the architectural journey behind Lahore’s first on-demand mobile micro-tanker network.',
      badge: 'Fleet Engineering'
    }
  ]

  const legalPages = [
    {
      title: 'Privacy Policy',
      path: '/privacy/',
      desc: 'How personal identity, location data, phone numbers, and payment details are encrypted and securely stored.',
      badge: 'Legal & Privacy'
    },
    {
      title: 'Terms of Use & Service Agreement',
      path: '/terms/',
      desc: 'Governing terms for order booking, cancellation policies, volumetric measurement guarantees, and service regulations.',
      badge: 'Service Agreement'
    }
  ]

  return (
    <div ref={pageRef} style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Sitemap Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #091a2f 0%, #0f172a 100%)',
        color: '#ffffff',
        padding: '60px 0 50px 0',
        borderBottom: '1px solid rgba(56, 189, 248, 0.2)'
      }}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'HTML Sitemap', path: '/sitemap/' }]} />
          <div style={{ maxWidth: '850px', marginTop: '16px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38bdf8',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '16px'
            }}>
              <i className="fa-solid fa-sitemap"></i> Comprehensive Website Directory
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '14px', color: '#ffffff' }}>
              Zyphuel HTML <span style={{ color: '#38bdf8' }}>Sitemap</span>
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Explore every public page, commercial refueling service, technical fuel guide, and legal policy on Zyphuel. Designed for fast navigation by users and comprehensive discovery by search engines.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '10px 18px', fontSize: '0.9rem' }}
                title="View XML Sitemap for Search Engine Crawlers"
              >
                <i className="fa-solid fa-code"></i> View Raw XML Sitemap
              </a>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ padding: '10px 18px', fontSize: '0.9rem', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.4)' }}
                title="View robots.txt exclusion rules"
              >
                <i className="fa-solid fa-robot"></i> View Robots.txt
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Directory Content */}
      <section className="section-padding" style={{ background: '#f8fafc', padding: '60px 0 80px 0' }}>
        <div className="container">

          {/* Section 1: Core Navigation & Services */}
          <div style={{ marginBottom: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
              <i className="fa-solid fa-layer-group" style={{ fontSize: '1.5rem', color: '#0284c7' }}></i>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                1. Core Navigation &amp; Commercial Services
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {mainPages.map(page => (
                <Link
                  key={page.path}
                  to={page.path}
                  style={{
                    display: 'block',
                    background: '#ffffff',
                    borderRadius: '14px',
                    padding: '24px',
                    border: '1px solid #e2e8f0',
                    textDecoration: 'none',
                    color: 'inherit',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.borderColor = '#38bdf8'
                    e.currentTarget.style.boxShadow = '0 10px 24px -10px rgba(2, 132, 199, 0.2)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = '#e2e8f0'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '9999px' }}>
                      {page.badge}
                    </span>
                    <span style={{ color: '#0284c7', fontSize: '0.85rem', fontWeight: 700 }}>
                      {page.path} <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.75rem', marginLeft: '4px' }}></i>
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                    {page.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                    {page.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Section 2: Energy & Fuel Guides (Subpages) */}
          <div style={{ marginBottom: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
              <i className="fa-solid fa-book-open" style={{ fontSize: '1.5rem', color: '#0284c7' }}></i>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                2. Fuel &amp; Energy Knowledge Guides (Subpages)
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {blogGuides.map(guide => (
                <Link
                  key={guide.path}
                  to={guide.path}
                  style={{
                    display: 'block',
                    background: '#ffffff',
                    borderRadius: '14px',
                    padding: '24px',
                    border: '1px solid #e2e8f0',
                    textDecoration: 'none',
                    color: 'inherit',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.borderColor = '#38bdf8'
                    e.currentTarget.style.boxShadow = '0 10px 24px -10px rgba(2, 132, 199, 0.2)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = '#e2e8f0'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '9999px' }}>
                      {guide.badge}
                    </span>
                    <span style={{ color: '#0284c7', fontSize: '0.85rem', fontWeight: 700 }}>
                      Visit Guide <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.75rem', marginLeft: '4px' }}></i>
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px', lineHeight: 1.4 }}>
                    {guide.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                    {guide.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Section 3: Legal & Regulatory Policies */}
          <div style={{ marginBottom: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
              <i className="fa-solid fa-scale-balanced" style={{ fontSize: '1.5rem', color: '#0284c7' }}></i>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                3. Legal, Privacy &amp; Regulatory Compliance
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {legalPages.map(policy => (
                <Link
                  key={policy.path}
                  to={policy.path}
                  style={{
                    display: 'block',
                    background: '#ffffff',
                    borderRadius: '14px',
                    padding: '24px',
                    border: '1px solid #e2e8f0',
                    textDecoration: 'none',
                    color: 'inherit',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.borderColor = '#38bdf8'
                    e.currentTarget.style.boxShadow = '0 10px 24px -10px rgba(2, 132, 199, 0.2)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = '#e2e8f0'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '9999px' }}>
                      {policy.badge}
                    </span>
                    <span style={{ color: '#0284c7', fontSize: '0.85rem', fontWeight: 700 }}>
                      Read Policy <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.75rem', marginLeft: '4px' }}></i>
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                    {policy.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                    {policy.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Support & Dispatch Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #0b1329 0%, #0f172a 100%)',
            borderRadius: '16px',
            padding: '30px 32px',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            border: '1px solid rgba(56, 189, 248, 0.25)'
          }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                Need Immediate Fuel Delivery Anywhere in Lahore?
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', margin: 0 }}>
                Our 24/7 emergency refueling micro-tankers reach your location within 15–30 minutes.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/order/" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                <i className="fa-solid fa-gas-pump"></i> Order Fuel Now
              </Link>
              <a
                href="https://wa.me/923230112464"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ padding: '10px 20px', fontSize: '0.9rem', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.4)' }}
              >
                <i className="fa-brands fa-whatsapp"></i> Live WhatsApp Dispatch
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
