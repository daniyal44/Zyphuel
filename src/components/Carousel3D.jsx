import { useState, useEffect, useRef } from 'react'

const DATA_3D = [
  { url: '/images/carousel/zyphuel-logo.webp', alt: 'Zyphuel Official Brand Emblem' },
  { url: '/images/carousel/1.webp', alt: 'Zyphuel Mobile App Rate & Telemetry Interface' },
  { url: '/images/carousel/2.webp', alt: 'Zyphuel Live Bowser GPS Location Tracking' },
  { url: '/images/carousel/3.webp', alt: 'Zyphuel Calibrated Digital Flow Meter Verification' },
  { url: '/images/carousel/4.webp', alt: 'Zyphuel Doorstep Refueling Dispatch Confirmation' },
  { url: '/images/carousel/petrol.webp', alt: 'Zyphuel Super Petrol Euro-V Delivery' },
  { url: '/images/carousel/diesel.webp', alt: 'Zyphuel Euro-V High-Speed Diesel Delivery' },
  { url: '/images/carousel/high-octane.webp', alt: 'Zyphuel Premium High-Octane 97 Delivery' },
  { url: '/images/carousel/car.webp', alt: 'Zyphuel Doorstep Refueling for Cars & SUVs' },
  { url: '/images/carousel/motorbike.webp', alt: 'Zyphuel On-Demand Fueling for Motorbikes & Scooters' },
  { url: '/images/carousel/generator.webp', alt: 'Zyphuel Standby Generator Refueling Logistics' },
  { url: '/images/carousel/machinery.webp', alt: 'Zyphuel Commercial & Heavy Machinery Refueling' },
  { url: '/images/carousel/fuel.webp', alt: 'Zyphuel Certified Fuel Dispenser & Calibration' },
  { url: '/images/carousel/delivery.webp', alt: 'Zyphuel 45-Minute Rapid Doorstep Dispatch' },
  { url: '/images/Volume L.jpg', alt: 'Zyphuel 5L to 15L Max Volume Metering' },
  { url: '/images/Target Asset.jpg', alt: 'Zyphuel Refueling Target Asset Identification' },
  { url: '/images/carousel/contact.webp', alt: 'Zyphuel 24/7 Helpline & Dispatch Desk' },
  { url: '/images/carousel/qr-code.webp', alt: 'Zyphuel Dual QR & Barcode Verification' },
  { url: '/images/carousel/jazzcash.webp', alt: 'Zyphuel JazzCash Instant Payment Gateway' },
  { url: '/images/carousel/easypaisa.webp', alt: 'Zyphuel Easypaisa Mobile Wallet Gateway' },
  { url: '/images/carousel/nayapay.webp', alt: 'Zyphuel NayaPay Digital Payment Gateway' },
  { url: '/images/carousel/naypay.webp', alt: 'Zyphuel Instant Mobile Wallet Transfer' },
  { url: '/images/carousel/sadapay.webp', alt: 'Zyphuel SadaPay Instant Payment Gateway' },
  { url: '/images/carousel/bank.webp', alt: 'Zyphuel Instant Bank Transfer & Raast' },
  { url: '/images/carousel/mashreq.webp', alt: 'Zyphuel Mashreq Digital Banking Channel' },
  { url: '/images/carousel/book.webp', alt: 'Zyphuel Corporate Brand Book & Operating Guidelines' },
  { url: '/images/carousel/wall.webp', alt: 'Zyphuel Corporate Office Headquarters Branding Wall' },
  { url: '/images/carousel/tablet.webp', alt: 'Zyphuel Mobile Fuel Ordering on Driver Tablet' },
  { url: '/images/carousel/cup.webp', alt: 'Zyphuel Official Brand Cup and Merchandise' },
  { url: '/images/carousel/pen.webp', alt: 'Zyphuel Executive Corporate Pen' },
  { url: '/images/carousel/card.webp', alt: 'Zyphuel Corporate Business Card' },
  { url: '/images/carousel/fuel.webp', alt: 'Zyphuel Premium Fuel Pump Dispenser Unit' },
  { url: '/images/carousel/helmet.webp', alt: 'Zyphuel Fuel Logistics Rider Safety Helmet' },
  { url: '/images/carousel/collab.webp', alt: 'Zyphuel Enterprise Logistics Partnerships' },
  { url: '/images/carousel/tank.webp', alt: 'Zyphuel Bulk Fuel Storage Tank Logistics' },
  { url: '/images/carousel/shirt.webp', alt: 'Zyphuel Official Delivery Agent Uniform' },
  { url: '/images/carousel/gallen.webp', alt: 'Zyphuel Portable Safe Fuel Canister' },
  { url: '/images/carousel/cap.webp', alt: 'Zyphuel Official Brand Cap' },
  { url: '/images/carousel/logo.webp', alt: 'Zyphuel Official Brand Logo' }
]

export default function Carousel3D() {
  const sectionRef = useRef(null)
  const [rotationAngle, setRotationAngle] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [cardWidth, setCardWidth] = useState(() => {
    if (typeof window === 'undefined') return 220
    if (window.innerWidth <= 380) return 140
    if (window.innerWidth <= 480) return 165
    if (window.innerWidth <= 768) return 190
    return 220
  })

  // Observe visibility so autoplay timer runs ONLY when in viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.05, rootMargin: '100px 0px 100px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w <= 380) setCardWidth(140)
      else if (w <= 480) setCardWidth(165)
      else if (w <= 768) setCardWidth(190)
      else setCardWidth(220)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const count = DATA_3D.length
  const angle = 360 / count
  // Standard 3D cylinder radius calculation
  const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / count))

  // Auto-play interval for 3D carousel - runs ONLY when visible and unpaused
  useEffect(() => {
    if (isPaused || !isVisible) return
    const timer = setInterval(() => {
      setRotationAngle(prev => prev - angle)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused, isVisible, angle])

  const normalizedAngle = ((rotationAngle % 360) + 360) % 360
  const targetCardIndex = Math.round((360 - normalizedAngle) / angle) % count

  return (
    <section
      id="slideshow"
      ref={sectionRef}
      className="slideshow-section section-padding"
      style={{ borderTop: '1px solid var(--border-color)', backgroundColor: '#090d16', padding: '80px 0', overflow: 'hidden' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className="fade-in-up" style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h2 className="section-title" style={{ color: '#ffffff' }}>Our Brand &amp; Fleet</h2>
          <p className="section-subtitle" style={{ color: '#94a3b8' }}>
            Zyphuel is a Lahore-focused mobile fuel delivery service dedicated to dependable doorstep refueling, calibrated metering, and safety.
          </p>
        </div>

        <div className="fade-in-up carousel-3d-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '360px', position: 'relative' }}>
          {/* Scoped styles for the 3D carousel */}
          <style dangerouslySetInnerHTML={{
            __html: `
            .scene-container {
              display: grid;
              width: 100%;
              height: 320px;
              perspective: 1200px;
              place-items: center;
              overflow: visible;
              margin-bottom: 15px;
            }
            @media (max-width: 768px) {
              .scene-container {
                height: 280px;
                perspective: 950px;
              }
            }
            @media (max-width: 480px) {
              .scene-container {
                height: 250px;
                perspective: 800px;
              }
            }
            @media (max-width: 380px) {
              .scene-container {
                height: 210px;
                perspective: 680px;
              }
            }
            .a3d-carousel {
              display: grid;
              transform-style: preserve-3d;
              transition: transform 0.8s cubic-bezier(0.2, 0.85, 0.32, 1.2);
              width: ${cardWidth}px;
              height: ${cardWidth}px;
              will-change: transform;
            }
            .card-3d {
              grid-area: 1 / 1;
              width: ${cardWidth}px;
              height: ${cardWidth}px;
              background-color: rgba(15, 23, 42, 0.85);
              border-radius: var(--radius-lg, 16px);
              backface-visibility: hidden;
              border: 1px solid rgba(255, 255, 255, 0.12);
              transition: border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 12px;
              box-sizing: border-box;
              overflow: hidden;
              cursor: pointer;
            }
            .carousel-img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              filter: brightness(0.85) drop-shadow(0 4px 8px rgba(0,0,0,0.3));
            }
            .card-3d.active-focus {
              background-color: rgba(14, 165, 233, 0.15);
              border-color: rgba(14, 165, 233, 0.8);
              box-shadow: 0 0 20px rgba(14, 165, 233, 0.35);
              backdrop-filter: blur(6px);
              -webkit-backdrop-filter: blur(6px);
            }
            .card-3d.active-focus .carousel-img {
              filter: brightness(1.1) drop-shadow(0 0 14px rgba(14, 165, 233, 0.5));
              transform: scale(1.06);
            }
            .carousel-controls {
              display: flex;
              gap: 16px;
              align-items: center;
              margin-top: 15px;
              z-index: 10;
            }
            .carousel-control-btn {
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: #ffffff;
              width: 44px;
              height: 44px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.25s ease;
              font-size: 0.95rem;
            }
            .carousel-control-btn:hover {
              background: var(--accent-color, #0ea5e9);
              border-color: var(--accent-color, #0ea5e9);
              transform: scale(1.08);
              box-shadow: 0 0 15px rgba(14, 165, 233, 0.4);
            }
          `}} />

          {/* 3D Carousel Scene */}
          <div className="scene-container">
            <div 
              className="a3d-carousel" 
              style={{ 
                transform: `translateZ(-${radius}px) rotateY(${rotationAngle}deg)` 
              }}
            >
              {DATA_3D.map((item, i) => {
                const cardAngle = (i * angle + normalizedAngle) % 360
                const offsetAngle = cardAngle > 180 ? cardAngle - 360 : cardAngle
                const isCardVisible = Math.abs(offsetAngle) <= 38
                const isActive = i === targetCardIndex

                return (
                  <div
                    key={i}
                    className={`card-3d ${isActive ? 'active-focus' : ''}`}
                    onClick={() => setRotationAngle(-i * angle)}
                    title={`Click to view: ${item.alt}`}
                    style={{ 
                      transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                      visibility: isCardVisible ? 'visible' : 'hidden',
                      opacity: isCardVisible ? (isActive ? 1 : Math.max(0.3, 0.75 - Math.abs(offsetAngle) / 50)) : 0
                    }}
                  >
                    <img
                      loading="lazy"
                      decoding="async"
                      className="carousel-img"
                      src={isVisible && isCardVisible ? item.url : undefined}
                      alt={item.alt}
                      width={cardWidth}
                      height={cardWidth}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Active Item Caption Badge */}
          <div style={{ marginTop: '14px', zIndex: 10, textAlign: 'center' }}>
            <div style={{
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '999px',
              padding: '6px 18px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.45)'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#0ea5e9',
                boxShadow: '0 0 8px #0ea5e9'
              }}></span>
              <span style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 700, maxWidth: '420px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {DATA_3D[targetCardIndex]?.alt}
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.74rem', fontWeight: 600, borderLeft: '1px solid rgba(255, 255, 255, 0.2)', paddingLeft: '8px' }}>
                {targetCardIndex + 1} / {count}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="carousel-controls">
            <button 
              className="carousel-control-btn" 
              onClick={() => setRotationAngle(prev => prev + angle)}
              aria-label="Previous Slide"
              title="Previous item"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button 
              className="carousel-control-btn" 
              onClick={() => setRotationAngle(prev => prev - angle)}
              aria-label="Next Slide"
              title="Next item"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
