
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { footerData } from './footerData.js';

/* ---------- Inline SVG fallback ---------- */
const LogoFallbackSVG = () => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      display: 'inline-block',
      height: '32px',
      width: 'auto',
      verticalAlign: 'middle',
      marginRight: '8px',
    }}
    aria-hidden="true"
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="#0ea5e9" />
    <path d="M12 7c-2 0-3 1.5-3 3s1 2.5 3 2.5 3-1 3-2.5-1-3-3-3z" fill="#ffffff" opacity="0.9" />
  </svg>
);

/* ---------- JSON‑LD Structured Data (LocalBusiness) ---------- */
const LocalBusinessSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Zyphuel',
    image: 'https://www.zyphuel.com/images/zyphuel-logo.png', // adjust to actual domain
    '@id': 'https://www.zyphuel.com',
    url: 'https://www.zyphuel.com',
    telephone: footerData.contact.phone,
    description: footerData.brand.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
    areaServed: footerData.lahoreTowns.map((town) => ({
      '@type': 'City',
      name: town,
    })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/* ---------- Footer Component ---------- */
export default function Footer() {
  const [logoError, setLogoError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Memoize data to avoid unnecessary re-renders (though static)
  const { brand, contact, socialLinks, quickLinks, lahoreTowns, expansion, bottomLinks, copyright } =
    useMemo(() => footerData, []);

  return (
    <footer className="footer" itemScope itemType="https://schema.org/WPFooter">
      <LocalBusinessSchema />

      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Socials */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo" aria-label={`${brand.name} Home`}>
              {!logoError ? (
                <img
                  src={brand.logoPath}
                  alt={brand.logoAlt}
                  title="Zyphuel - Fuel on Your Doorstep"
                  className="logo-icon"
                  style={{ height: '32px' }}
                  onError={() => setLogoError(true)}
                />
              ) : (
                <LogoFallbackSVG />
              )}
            </Link>
            <p className="footer-about-text">{brand.description}</p>
            
            {/* Contact details */}
            <div className="footer-contacts">
              <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="footer-contact-link">
                <i className="fa-solid fa-phone"></i>
                <span>{contact.phone}</span>
              </a>
              <a href={`mailto:${contact.email}`} className="footer-contact-link">
                <i className="fa-solid fa-envelope"></i>
                <span>{contact.email}</span>
              </a>
              <div className="footer-contact-link">
                <i className="fa-solid fa-location-dot"></i>
                <span>{contact.address}</span>
              </div>
            </div>

            <div className="footer-socials">
              {socialLinks.map(({ platform, url, icon }) => (
                <a
                  key={platform}
                  href={url}
                  className="social-btn"
                  aria-label={platform}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Lahore Towns */}
          <div>
            <h4 className="footer-title">Lahore Towns</h4>
            <div className={`service-towns-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
              <div className="service-towns-pills">
                {lahoreTowns.map((town) => (
                  <span key={town} className="service-town-pill">
                    {town}
                  </span>
                ))}
              </div>
            </div>
            <button 
              className="towns-expand-btn" 
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? 'Show Less' : 'Show All Areas'}</span>
              <i className={`fa-solid fa-chevron-down chevron-icon ${isExpanded ? 'rotated' : ''}`}></i>
            </button>
          </div>

          {/* Column 4: Expansion Alert (conditionally rendered) */}
          {expansion.showAlert && (
            <div>
              <h4 className="footer-title">Expansion Alert</h4>
              <div className="expansion-card">
                <p className="footer-about-text" style={{ marginBottom: '14px', fontSize: '0.85rem' }}>
                  {expansion.text}
                </p>
                <span className="badge-pill badge-upcoming">
                  {expansion.badge}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>{copyright}</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {bottomLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}