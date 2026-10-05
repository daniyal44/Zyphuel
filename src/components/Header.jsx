import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LahorePlacesMenu from './LahorePlacesMenu'

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
  { to: '/services/', label: 'Services', title: 'Zyphuel Services & Fuel Rates' },
  { to: '/download/', label: 'Download App', title: 'Download Zyphuel Mobile App (Android APK)' },
  { to: '/about/', label: 'About Us', title: 'About Zyphuel & Leadership Team' },
  { to: '/blog/', label: 'Blog', title: 'Zyphuel Energy & Technology Blog' },
  { to: '/contact/', label: 'Contact', title: 'Contact Support & Helpline' },
]

export default function Header({ onOpenInterestModal }) {
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [townsMenuOpen, setTownsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close nav and towns menu on route change
  useEffect(() => {
    setNavOpen(false)
    setTownsMenuOpen(false)
  }, [location.pathname])

  // Expose toggler globally for footer and cross-component triggers
  useEffect(() => {
    window.__openLahoreTownsModal = () => setTownsMenuOpen(true)
    window.__toggleLahorePlacesMenu = () => setTownsMenuOpen(prev => !prev)
    return () => {
      delete window.__openLahoreTownsModal
      delete window.__toggleLahorePlacesMenu
    }
  }, [])

  const isActive = (to, exact) => {
    const normLoc = location.pathname.endsWith('/') ? location.pathname : location.pathname + '/'
    const normTo = to.endsWith('/') ? to : to + '/'
    if (exact || normTo === '/') return normLoc === normTo
    return normLoc.startsWith(normTo)
  }

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`} id="header" itemScope itemType="https://schema.org/WPHeader">
        <div className="container">
          {/* Logo */}
          <Link to="/" className="logo" title="Zyphuel – Doorstep Fuel Delivery in Lahore" aria-label="Zyphuel Home">
            {!logoError ? (
              <img
                src="/images/Zyphuel-logo.png"
                alt="Zyphuel - On-Demand Mobile Fuel & Petrol Delivery Lahore"
                title="Zyphuel - Mobile Fuel Delivery in Lahore"
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

          {/* Status Pills — Clickable to toggle Lahore Active Towns Menu */}
          <div className="header-badges" style={{ position: 'relative' }}>
            <button
              type="button"
              className={`badge-pill badge-active badge-interactive${townsMenuOpen ? ' active' : ''}`}
              title="Click to toggle Lahore active towns menu"
              aria-label="Toggle Lahore places menu"
              aria-expanded={townsMenuOpen}
              onClick={() => setTownsMenuOpen(prev => !prev)}
            >
              <i className="fa-solid fa-circle-check"></i>
              <span>Lahore City</span>
              <i className={`fa-solid fa-chevron-${townsMenuOpen ? 'up' : 'down'} badge-chevron`} aria-hidden="true"></i>
            </button>

            {/* Lahore Places Dropdown Menu (Pure List, Zero Forms) */}
            <LahorePlacesMenu
              isOpen={townsMenuOpen}
              onClose={() => setTownsMenuOpen(false)}
            />
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger${navOpen ? ' active' : ''}`}
            id="hamburger-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={navOpen}
            aria-controls="nav-menu"
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
              to="/order/"
              title="Order Petrol & Diesel Refueling Now"
              className="btn btn-secondary btn-sm"
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            >
              Order Fuel
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}
