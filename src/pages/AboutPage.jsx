import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import GeometricalBirds from '../components/GeometricalBirds';
import { useSEO } from '../hooks/useSEO';
import { aboutArticles, wikiMetadata } from '../data/aboutData';
import { APP_VERSION } from '../data/appVersion';
import "./styles.css";

const TOTAL_CARDS = 6;

const cardImages = [
  "/images/daniyal.jpeg",
  "/images/adil.png",
  "/images/logo.png",
  "/images/Qr-code.png",
  "/images/fuel.png",
  "/images/Shirt.png"
];

const teamMembers = [
  { name: "Muhammad Daniyal", role: "Founder & CEO of Zyphuel " },
  { name: "Adil Farooq", role: "Zyphuel Sales Manager " },
  { name: "Zyphuel Executive Team", role: "Mobile Energy Logistics" },
  { name: "Zyphuel QR Code", role: `Mobile Application v${APP_VERSION}` },
  { name: "Accurate Measurement", role: "Calibrated Fuel Tanker & Flow Meter" },
  { name: "Rider Identity", role: "HAZMAT Certified Safety Uniform" }
];

export default function AboutPage() {
  useSEO({
    title: 'About Zyphuel | Mobile Fuel Delivery Team in Lahore',
    description: 'How Zyphuel runs doorstep petrol and diesel delivery in Lahore — calibrated micro-tankers, digital flow meters, HAZMAT-trained riders, and the team behind the operation.',
    keywords: [
      'about Zyphuel', 'fuel delivery company Lahore', 'mobile refueling Pakistan',
      'diesel delivery Lahore', 'generator fuel Pakistan', 'calibrated fuel metering',
      'Zyphuel team', 'Muhammad Daniyal Zyphuel'
    ],
    image: 'https://zyphuel.netlify.app/images/daniyal.jpeg',
    url: 'https://zyphuel.netlify.app/about',
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AboutPage",
          "@id": "https://zyphuel.netlify.app/about#aboutpage",
          "url": "https://zyphuel.netlify.app/about",
          "name": "About Zyphuel & the Team",
          "description": "Company profile for Zyphuel, a mobile petrol and diesel delivery operator serving Lahore, Pakistan.",
          "mainEntity": {
            "@type": "Organization",
            "@id": "https://zyphuel.netlify.app/#organization",
            "name": "Zyphuel",
            "alternateName": ["zphuel"],
            "url": "https://zyphuel.netlify.app",
            "logo": "https://zyphuel.netlify.app/images/logo.png",
            "sameAs": [
              "https://www.linkedin.com/company/zyphuel/",
              "https://share.google/Nb4XGKYq5aU0nzLr3",
              "https://www.facebook.com/muhammad.daniyal.522942/"
            ],
            "founder": {
              "@type": "Person",
              "@id": "https://zyphuel.netlify.app/#person-daniyal",
              "name": "Muhammad Daniyal",
              "jobTitle": "Founder & CEO",
              "sameAs": [
                "https://www.linkedin.com/in/muhammad-daniyal490",
                "https://github.com/daniyal44"
              ]
            }
          }
        }
      ]
    }
  });

  const pageRef = useScrollReveal();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedMember, setDisplayedMember] = useState(teamMembers[0]);
  const [infoOpacity, setInfoOpacity] = useState(1);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const isAnimatingRef = useRef(false);
  const currentIndexRef = useRef(0);
  const touchStartY = useRef(0);

  const getCardClass = (cardIndex) => {
    const offset = (cardIndex - currentIndex + TOTAL_CARDS) % TOTAL_CARDS;
    if (offset === 0) return "card center";
    if (offset === 1) return "card down-1";
    if (offset === 2) return "card down-2";
    if (offset === TOTAL_CARDS - 1) return "card up-1";
    if (offset === TOTAL_CARDS - 2) return "card up-2";
    return "card hidden";
  };

  const updateCarousel = useCallback((newIndex) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const index = (newIndex + TOTAL_CARDS) % TOTAL_CARDS;
    currentIndexRef.current = index;
    setCurrentIndex(index);

    setInfoOpacity(0);
    setTimeout(() => {
      setDisplayedMember(teamMembers[index]);
      setInfoOpacity(1);
    }, 300);

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 800);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") updateCarousel(currentIndexRef.current - 1);
      else if (e.key === "ArrowDown") updateCarousel(currentIndexRef.current + 1);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [updateCarousel]);

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollIndicator(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleTouchStart = (e) => {
    touchStartY.current = e.changedTouches[0].screenY;
  };
  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].screenY;
    const diff = touchStartY.current - touchEndY;
    if (Math.abs(diff) > 50) {
      if (diff > 0) updateCarousel(currentIndexRef.current + 1);
      else updateCarousel(currentIndexRef.current - 1);
    }
  };

  return (
    <div ref={pageRef}>
      <main style={{ paddingTop: 'var(--nav-height)' }}>

        {/* Story Section */}
        <section id="about" className="about section-padding">
          <div className="container" style={{ maxWidth: '960px' }}>
            <div className="fade-in-up">
              <div className="about-header-logo-row">
                <img src="/images/Zyphuel-logo.png" alt="Zyphuel Company Logo" className="about-company-logo" />
                <h1 className="section-title">Mobile Fuel Delivery, Built for Lahore</h1>
              </div>

              <div className="story-desktop-copy">
                <p className="about-story" style={{ marginBottom: '16px', fontSize: '1.08rem', lineHeight: '1.7' }}>
                  <strong>Zyphuel</strong> is an on-demand mobile fuel delivery service operating across Lahore. Founded by <strong>Muhammad Daniyal</strong>, it exists to remove three everyday problems: queueing at fuel stations, decanting fuel from unsafe jerrycans, and being short-changed at the pump.
                </p>
                <p className="about-story" style={{ marginBottom: '24px', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                  With calibrated positive-displacement flow meters, double-walled micro-tanker bowsers, and an IoT-powered Android app (v{APP_VERSION}), Zyphuel supplies Euro-V Super Petrol, High-Octane 97, commercial generator Diesel, LPG cylinders, and clean water refills directly to homes, construction sites, and corporate fleet yards 24/7.
                </p>
              </div>

              <div className="story-mobile-copy">
                <p className="about-story" style={{ marginBottom: '14px', fontSize: '0.98rem', lineHeight: '1.6' }}>
                  <strong>Zyphuel</strong> is an on-demand mobile fuel delivery service operating across Lahore. Founded by <strong>Muhammad Daniyal</strong>, it exists to remove three everyday problems: queueing at fuel stations, decanting fuel from unsafe jerrycans, and being short-changed at the pump.
                </p>
                <p className="about-story" style={{ marginBottom: '20px', fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                  With calibrated positive-displacement flow meters, double-walled micro-tanker bowsers, and an IoT-powered Android app (v{APP_VERSION}), Zyphuel supplies Euro-V Super Petrol, High-Octane 97, commercial generator Diesel, LPG cylinders, and clean water refills directly to homes, construction sites, and corporate fleet yards 24/7.
                </p>
              </div>

              <div className="hero-ctas" style={{ marginBottom: '35px', display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    navigate('/order');
                    window.scrollTo(0, 0);
                  }}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className="fa-solid fa-truck-fast"></i> Schedule Your First Delivery
                </button>
                <a
                  href="#articles-section"
                  className="btn btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className="fa-solid fa-newspaper"></i> Read Press &amp; Articles
                </a>
                <a
                  href="#wiki-dossier"
                  style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-accent)', fontWeight: 600, padding: '8px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <i className="fa-brands fa-wikipedia-w"></i> Encyclopedic Dossier
                </a>
              </div>

              <div className="about-values-grid" style={{ marginTop: '40px' }}>
                <div className="value-item">
                  <span className="value-icon"><i className="fa-solid fa-truck-ramp-box"></i></span>
                  <h3 className="value-title">On-Demand Mobility</h3>
                  <p className="value-desc">Certified fleet refuels vehicles and backup generators during downtime with zero delays.</p>
                </div>
                <div className="value-item">
                  <span className="value-icon"><i className="fa-solid fa-scale-balanced"></i></span>
                  <h3 className="value-title">Volumetric Honesty</h3>
                  <p className="value-desc">Calibrated digital flow meters with optical encoders guarantee 100% accurate billing.</p>
                </div>
                <div className="value-item">
                  <span className="value-icon"><i className="fa-solid fa-shield-halved"></i></span>
                  <h3 className="value-title">Safety Compliance</h3>
                  <p className="value-desc">Strict adherence to HAZMAT, NFPA 30A, and national OGRA Euro-V regulations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder & Leadership Section */}
        <section className="about-founder section-padding" style={{ backgroundColor: '#f8fafc', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container">
            <div className="founder-grid fade-in-up">
              <div className="founder-image-col">
                <div className="founder-card-frame" itemScope itemType="https://schema.org/Person">
                  <img
                    src="/images/daniyal.jpeg"
                    alt="Muhammad Daniyal, Founder & CEO of Zyphuel"
                    title="Muhammad Daniyal – Founder & CEO of Zyphuel"
                    className="founder-avatar-img"
                    loading="lazy"
                    itemProp="image"
                  />
                  <div className="founder-badge">Founder &amp; CEO</div>
                </div>
              </div>

              <div className="founder-info-col">
                <div className="hero-subtitle-badge" style={{ backgroundColor: 'rgba(58,134,200,0.12)', borderColor: 'rgba(58,134,200,0.25)', color: '#1a4f7c' }}>
                  <span>Executive Leadership &amp; Tech Architecture</span>
                </div>
                <h2 className="section-title" style={{ marginBottom: '10px' }}>Muhammad Daniyal</h2>
                <h3 className="founder-subtitle" style={{ color: 'var(--brand-petrol)', fontWeight: 600, fontSize: 'var(--fs-md)', marginBottom: '16px' }}>
                  Founder &amp; CEO, Zyphuel
                </h3>
                <p className="founder-bio" style={{ fontSize: '1rem', lineHeight: '1.65', color: 'var(--text-secondary)', marginBottom: '18px' }}>
                  <strong>Muhammad Daniyal</strong>  is an entrepreneur and systems engineer leading Pakistan’s energy logistics modernization. Recognizing the recurring load-shedding challenges faced by commercial enterprises and the fuel supply bottlenecks in urban transport, he engineered Zyphuel’s smart telemetry refueling network.
                </p>
                

                <div className="founder-quote-box" style={{ marginBottom: '24px' }}>
                  <i className="fa-solid fa-quote-left quote-icon"></i>
                  <p className="founder-quote-text">
                    "We are bringing technology and efficiency directly to the fueling nozzle. No lines, no delay, and complete digital transparency with every drop delivered."
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href="https://www.linkedin.com/in/muhammad-daniyal490"
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="btn btn-outline"
                    title="Muhammad Daniyal LinkedIn Profile"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <i className="fa-brands fa-linkedin" style={{ color: '#0077b5' }}></i> CEO LinkedIn Profile
                  </a>
                  <a
                    href="https://www.linkedin.com/company/zyphuel/"
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="btn btn-outline"
                    title="Zyphuel Official LinkedIn Company Page"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <i className="fa-brands fa-linkedin" style={{ color: '#0077b5' }}></i> Company
                  </a>
                  <a
                    href="https://github.com/daniyal44"
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="btn btn-outline"
                    title="Muhammad Daniyal GitHub Open Source Portfolio "
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <i className="fa-brands fa-github"></i> GitHub 
                  </a>
                  <a
                    href="https://www.facebook.com/muhammad.daniyal.522942/"
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="btn btn-outline"
                    title="Muhammad Daniyal & Zyphuel Facebook Page"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <i className="fa-brands fa-facebook" style={{ color: '#1877f2' }}></i> Facebook Profile
                  </a>
                  <a
                    href="https://share.google/Nb4XGKYq5aU0nzLr3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    title="Google Maps Verified Location for Zyphuel Headquarters"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <i className="fa-brands fa-google" style={{ color: '#ea4335' }}></i> Google Maps Hub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Official Articles, Press Releases & Social Media Publications */}
        <section id="articles-section" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
          <div className="container">
            <div className="section-header fade-in-up" style={{ textAlign: 'center', marginBottom: '44px' }}>
              <span className="section-eyebrow" style={{ color: 'var(--brand-petrol)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                Press Coverage &amp; Official Publications
              </span>
              <h2 className="section-title">Official Articles, Research Papers &amp; Social Media Releases</h2>
              <p className="section-subtitle" style={{ maxWidth: '820px', margin: '0 auto' }}>
                Explore in-depth publications, social media feature articles, and technical breakdowns documenting Zyphuel’s energy technology, telemetry infrastructure, and leadership vision.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
              {aboutArticles.map((art) => (
                <article
                  key={art.id}
                  style={{
                    background: '#f8fafc',
                    borderRadius: '14px',
                    padding: '28px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: art.sourceColor, background: '#ffffff', padding: '4px 12px', borderRadius: '20px', border: `1px solid ${art.sourceColor}33`, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <i className={art.sourceIcon}></i> {art.source}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        <i className="fa-regular fa-calendar-days"></i> {art.date} · {art.readTime}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', lineHeight: '1.45' }}>
                      {art.title}
                    </h3>

                    <p style={{ fontSize: '0.86rem', color: 'var(--brand-petrol)', fontWeight: 600, marginBottom: '12px' }}>
                      <i className="fa-solid fa-user-pen"></i> {art.author}
                    </p>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
                      {art.summary}
                    </p>

                    <div style={{ background: '#ffffff', borderRadius: '8px', padding: '12px 14px', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
                      <strong style={{ fontSize: '0.82rem', color: 'var(--text-primary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Key Highlights:
                      </strong>
                      <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        {art.highlights.map((hl, hlIdx) => (
                          <li key={hlIdx} style={{ marginBottom: '4px' }}>
                            {hl}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    {art.external ? (
                      <a
                        href={art.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
                      >
                        Read Full Article on {art.source.split(' ')[0]} <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    ) : (
                      <Link
                        to={art.url}
                        className="btn btn-outline"
                        style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
                      >
                        Explore On-Site Article &amp; Architecture <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Encyclopedic & Knowledge Graph Overview (Wikipedia Reference Dossier) */}
        <section id="wiki-dossier" className="section-padding" style={{ backgroundColor: '#f1f5f9', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <div className="section-header fade-in-up" style={{ textAlign: 'center', marginBottom: '36px' }}>
              <span className="section-eyebrow" style={{ color: 'var(--brand-petrol)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
                Semantic Registry &amp; Verified Citations
              </span>
              <h2 className="section-title">Encyclopedic Dossier &amp; Knowledge Graph Citations</h2>
              <p className="section-subtitle">
                Official entity summary conforming to Wikipedia, Wikidata, and Knowledge Graph structuring standards for Zyphuel and CEO Muhammad Daniyal.
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '14px', padding: '32px', border: '1px solid var(--border-color)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(58,134,200,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'var(--brand-petrol)' }}>
                    <i className="fa-brands fa-wikipedia-w"></i>
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: 800 }}>
                      {wikiMetadata.title} <span style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--text-secondary)' }}>({wikiMetadata.nativeName})</span>
                    </h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{wikiMetadata.type}</span>
                  </div>
                </div>
                <span style={{ fontSize: '0.82rem', background: '#e0f2fe', color: '#0369a1', padding: '6px 14px', borderRadius: '20px', fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check"></i> Verified Entity Record
                </span>
              </div>

              {/* Wiki Data Table */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '28px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <strong style={{ display: 'block', fontSize: '0.82rem', color: 'var(--brand-petrol)', textTransform: 'uppercase', marginBottom: '4px' }}>Industry &amp; Sector</strong>
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>{wikiMetadata.industry}</span>
                </div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <strong style={{ display: 'block', fontSize: '0.82rem', color: 'var(--brand-petrol)', textTransform: 'uppercase', marginBottom: '4px' }}>Headquarters &amp; Hub</strong>
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>{wikiMetadata.headquarters}</span>
                </div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <strong style={{ display: 'block', fontSize: '0.82rem', color: 'var(--brand-petrol)', textTransform: 'uppercase', marginBottom: '4px' }}>Founder &amp; Executive Leadership</strong>
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>{wikiMetadata.founder}</span>
                </div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <strong style={{ display: 'block', fontSize: '0.82rem', color: 'var(--brand-petrol)', textTransform: 'uppercase', marginBottom: '4px' }}>Associated Ventures &amp; Projects</strong>
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>{wikiMetadata.associatedVentures.join(', ')}</span>
                </div>
              </div>

              {/* Verified External Citations & Official Profiles */}
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
                  <i className="fa-solid fa-link text-primary"></i> Official External Citations &amp; Knowledge References:
                </h4>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {wikiMetadata.officialProfiles.map((p) => (
                    <a
                      key={p.platform}
                      href={p.url}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="backlink-item"
                      title={p.platform}
                      style={{ padding: '8px 14px', fontSize: '0.88rem' }}
                    >
                      <i className={p.icon}></i> {p.platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Carousel */}
        <section className="about-team-section">
          <div className="main-container">
            <div className="carousel-section">
              <div className="carousel-container">
                <button
                  className="nav-arrow prev"
                  onClick={() => updateCarousel(currentIndexRef.current - 1)}
                  aria-label="Previous Team Member"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>

                <div
                  className="carousel-track"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {cardImages.map((src, i) => (
                    <div
                      key={i}
                      className={getCardClass(i)}
                      data-index={i}
                      onClick={() => updateCarousel(i)}
                    >
                      <img
                        src={src}
                        alt={`${teamMembers[i]?.name || 'Team Member'} - ${teamMembers[i]?.role || 'Staff'}`}
                      />
                    </div>
                  ))}
                </div>

                <button
                  className="nav-arrow next"
                  onClick={() => updateCarousel(currentIndexRef.current + 1)}
                  aria-label="Next Team Member"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <div className="controls-section">
              <div className="nav-controls">
                <button
                  className="nav-arrow prev"
                  onClick={() => updateCarousel(currentIndexRef.current - 1)}
                  aria-label="Previous Member"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button
                  className="nav-arrow next"
                  onClick={() => updateCarousel(currentIndexRef.current + 1)}
                  aria-label="Next Member"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>

              <div className="member-info" style={{ opacity: infoOpacity }}>
                <h2 className="member-name">{displayedMember.name}</h2>
                <p className="member-role">{displayedMember.role}</p>
              </div>

              <div className="dots">
                {teamMembers.map((_, i) => (
                  <div
                    key={i}
                    className={`dot${i === currentIndex ? " active" : ""}`}
                    data-index={i}
                    onClick={() => updateCarousel(i)}
                  />
                ))}
              </div>
            </div>
          </div>

          {showScrollIndicator && (
            <div className="scroll-indicator">scroll</div>
          )}
        </section>

        {/* Global AI & Search Engine Directory Index */}

      </main>
    </div>
  );
}