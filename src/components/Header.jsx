import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const LogoFallbackSVG = () => (
  <svg
    className="logo-icon-fallback"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ display: 'inline-block', height: '38px', width: 'auto', verticalAlign: 'middle', marginRight: '8px' }}
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="#0ea5e9" />
    <path d="M12 7c-2 0-3 1.5-3 3s1 2.5 3 2.5 3-1 3-2.5-1-3-3-3z" fill="#ffffff" opacity="0.9" />
  </svg>
)

const navLinks = [
  { to: '/', label: 'Home', exact: true, title: 'Zyphuel Home Page' },
  { to: '/services', label: 'Services', title: 'Zyphuel Services & Fuel Rates' },
  { to: '/about', label: 'About Us', title: 'About Zyphuel & Leadership Team' },
  { to: '/blog', label: 'Blog', title: 'Zyphuel Energy & Technology Blog' },
  { to: '/contact', label: 'Contact', title: 'Contact Support & Helpline' },
]

export default function Header({ onOpenInterestModal }) {
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close nav on route change
  useEffect(() => {
    setNavOpen(false)
  }, [location.pathname])

  const isActive = (to, exact) => {
    if (exact || to === '/') return location.pathname === to
    return location.pathname.startsWith(to)
  }

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} id="header" itemScope itemType="https://schema.org/WPHeader">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo" title="Zyphuel – Pakistan’s #1 Fuel Supplier & Mobile Application for Fuel Suppliers" aria-label="Zyphuel Home">
          {!logoError ? (
            <img
              src="/images/Zyphuel-logo.png"
              alt="Zyphuel - On-Demand 24/7 Mobile Fuel & Petrol Delivery Lahore"
              title="Zyphuel - Pakistan Number 1 Fuel Supplier & Mobile Application for Fuel Suppliers"
              className="logo-icon"
              width="142"
              height="38"
              fetchpriority="high"
              decoding="async"
              onError={() => setLogoError(true)}
              itemProp="logo"
            />
          ) : (
            <LogoFallbackSVG />
          )}
        </Link>

        {/* Status Pills */}
        <div className="header-badges">
          <span className="badge-pill badge-active" title="Active Delivery Areas in Lahore, Pakistan">
            <i className="fa-solid fa-circle-check"></i> Lahore City
          </span>
          <Link
            to="/download"
            className="badge-pill badge-zyphuel"
            title="Download Zyphuel Mobile Application for Fuel Suppliers (Android APK)"
            aria-label="Download Zyphuel Mobile Application for Fuel Suppliers"
            style={{ cursor: 'pointer' }}
          >
            <i className="fa-solid fa-file-arrow-down"></i> Download App
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger${navOpen ? ' active' : ''}`}
          id="hamburger-btn"
          aria-label="Toggle navigation menu"
          onClick={() => setNavOpen(v => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Nav Menu */}
        <nav className={`nav-menu${navOpen ? ' open' : ''}`} id="nav-menu" aria-label="Main Navigation">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              title={link.title}
              className={`nav-link${isActive(link.to, link.exact) ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/order"
            title="Order Petrol & Diesel Refueling Now"
            className="btn btn-secondary btn-sm"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            Order Fuel
          </Link>
        </nav>
      </div>
    </header>
  )
}
