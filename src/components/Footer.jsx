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
    image: [
      'https://zyphuel.netlify.app/images/logo.png',
      'https://zyphuel.netlify.app/images/Zyphuel-logo.png',
      'https://zyphuel.netlify.app/images/fuel.png'
    ],
    logo: 'https://zyphuel.netlify.app/images/logo.png',
    '@id': 'https://zyphuel.netlify.app/#organization',
    url: 'https://zyphuel.netlify.app',
    telephone: footerData.contact.phone,
    email: footerData.contact.email,
    description: footerData.brand.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '75-Main Boulevard, Gulberg III',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      postalCode: '54000',
      addressCountry: 'PK',
    },
    sameAs: [
      'https://www.linkedin.com/company/zyphuel/?viewAsMember=true',
      'https://www.linkedin.com/in/muhammad-daniyal490',
      'https://share.google/Nb4XGKYq5aU0nzLr3',
      'https://github.com/daniyal44',
      'https://www.facebook.com/muhammad.daniyal.522942/'
    ],
    areaServed: footerData.lahoreTowns.map((town) => ({
      '@type': 'City',
      name: town,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Friday"],
        "opens": "08:00",
        "closes": "13:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "18:00"
      }
    ],
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

  const { brand, contact, socialLinks, quickLinks, fuelGuides, lahoreTowns, bottomLinks, copyright } =
    useMemo(() => footerData, []);

  return (
    <footer className="footer" itemScope itemType="https://schema.org/WPFooter">
      <LocalBusinessSchema />

      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Socials */}
          <div className="footer-brand-col">
            <h3 className="footer-title">About Zyphuel</h3>
            <Link to="/" className="footer-logo" aria-label={`${brand.name} Home`}>
              {!logoError ? (
                <img
                  src={brand.logoPath}
                  alt={brand.logoAlt}
                  title="Zyphuel - Doorstep Fuel Delivery in Lahore"
                  className="logo-icon"
                  width="120"
                  height="32"
                  decoding="async"
                  style={{ height: '32px', width: 'auto', marginTop: '4px' }}
                  onError={() => setLogoError(true)}
                  loading="lazy"
                  itemProp="logo"
                />
              ) : (
                <LogoFallbackSVG />
              )}
            </Link>
            <p className="footer-about-text">{brand.description}</p>
            
            {/* Contact details */}
            <div className="footer-contacts">
              <Link to="/contact/" className="footer-contact-link" title="Call or Message Zyphuel Support Helpline">
                <i className="fa-solid fa-headset"></i>
                <span>24/7 Helpline &amp; Contact Desk</span>
              </Link>
              <a href={`mailto:${contact.email}`} className="footer-contact-link" title="Email Zyphuel Enterprise Support Desk">
                <i className="fa-solid fa-envelope"></i>
                <span>{contact.email}</span>
              </a>
              <div className="footer-contact-link" title="Zyphuel Headquarters Lahore Office">
                <i className="fa-solid fa-location-dot"></i>
                <span>{contact.address}</span>
              </div>
            </div>

            <div className="footer-socials">
              {socialLinks.map(({ platform, url, icon, title }) => (
                <a
                  key={platform}
                  href={url}
                  className="social-btn"
                  aria-label={platform}
                  title={title || platform}
                  target="_blank"
                  rel="me noopener noreferrer"
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} title={`${link.label} - Zyphuel`}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Lahore Towns */}
          <div>
            <h3
              className="footer-title"
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              onClick={() => window.__toggleLahorePlacesMenu && window.__toggleLahorePlacesMenu()}
              title="Click to toggle Lahore active towns menu"
            >
              <span>Lahore Active Towns</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-petrol, #0284c7)' }}>
                View Full List <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginLeft: '4px' }}></i>
              </span>
            </h3>
            <div className={`service-towns-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
              <div className="service-towns-pills">
                {lahoreTowns.map((town) => (
                  <button
                    key={town}
                    type="button"
                    className="service-town-pill"
                    style={{ cursor: 'pointer', background: 'none', font: 'inherit', textAlign: 'inherit' }}
                    onClick={() => window.__toggleLahorePlacesMenu && window.__toggleLahorePlacesMenu()}
                    title={`Click to view ${town} in places menu`}
                  >
                    {town}
                  </button>
                ))}
              </div>
            </div>
            <button 
              className="towns-expand-btn" 
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label="Toggle all Lahore fuel delivery towns"
            >
              <span>{isExpanded ? 'Show Less' : 'Show All Areas'}</span>
              <i className={`fa-solid fa-chevron-down chevron-icon ${isExpanded ? 'rotated' : ''}`}></i>
            </button>
          </div>

          {/* Column 4: Fuel Guides */}
          <div>
            <h3 className="footer-title">Fuel &amp; Energy Guides</h3>
            <ul className="footer-links" style={{ marginBottom: '20px' }}>
              {fuelGuides && fuelGuides.map((guide) => (
                <li key={guide.to}>
                  <Link to={guide.to} title={`${guide.label} - Zyphuel`}>
                    {guide.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>{copyright}</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {bottomLinks.map((link) => (
              <Link key={link.to} to={link.to} title={`${link.label} - Zyphuel`}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}