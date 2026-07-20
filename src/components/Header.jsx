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
  { to: '/', label: 'Home', exact: true },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About Us' },
  { to: '/order', label: 'Order Fuel' },
  { to: '/contact', label: 'Contact' },
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
    <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo">
          {!logoError ? (
            <img
              src="/images/Zyphuel-logo.png"
              alt="Zyphuel - On-Demand 24/7 Mobile Fuel & Petrol Delivery Lahore"
              title="Zyphuel - Fuel on Your Doorstep"
              className="logo-icon"
              onError={() => setLogoError(true)}
            />
          ) : (
            <LogoFallbackSVG />
          )}
        </Link>

        {/* Status Pills */}
        <div className="header-badges">
          <span className="badge-pill badge-active" title="Active Delivery Areas">
            <i className="fa-solid fa-circle-check"></i> Lahore City
          </span>
          <Link
            to="/download"
            className="badge-pill badge-zyphuel"
            title="Download Page"
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
        <nav className={`nav-menu${navOpen ? ' open' : ''}`} id="nav-menu">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link${isActive(link.to, link.exact) ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/order"
            className="btn btn-primary btn-sm"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            Order Now
          </Link>
        </nav>
      </div>
    </header>
  )
}
