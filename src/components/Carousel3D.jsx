import { useState, useEffect } from 'react'

const DATA_3D = [
  { url: '/images/Zyphuel-logo.png', alt: 'Zyphuel Official Brand Emblem' },
  { url: '/images/1.jpeg', alt: 'Zyphuel Mobile App Rate & Telemetry Interface' },
  { url: '/images/2.jpeg', alt: 'Zyphuel Live Bowser GPS Location Tracking' },
  { url: '/images/3.jpeg', alt: 'Zyphuel Calibrated Digital Flow Meter Verification' },
  { url: '/images/4.jpeg', alt: 'Zyphuel Doorstep Refueling Dispatch Confirmation' },
  { url: '/images/Petrol.jpg', alt: 'Zyphuel Super Petrol Euro-V Delivery' },
  { url: '/images/Diesel.jpg', alt: 'Zyphuel Euro-V High-Speed Diesel Delivery' },
  { url: '/images/High-Octane.jpg', alt: 'Zyphuel Premium High-Octane 97 Delivery' },
  { url: '/images/Car.jpg', alt: 'Zyphuel Doorstep Refueling for Cars & SUVs' },
  { url: '/images/Motorbike.jpg', alt: 'Zyphuel On-Demand Fueling for Motorbikes & Scooters' },
  { url: '/images/Generator.jpg', alt: 'Zyphuel Standby Generator Refueling Logistics' },
  { url: '/images/Machinery.jpg', alt: 'Zyphuel Commercial & Heavy Machinery Refueling' },
  { url: '/images/fuel.jpg', alt: 'Zyphuel Certified Fuel Dispenser & Calibration' },
  { url: '/images/Delivery.jpg', alt: 'Zyphuel 45-Minute Rapid Doorstep Dispatch' },
  { url: '/images/Volume L.jpg', alt: 'Zyphuel 5L to 15L Max Volume Metering' },
  { url: '/images/Target Asset.jpg', alt: 'Zyphuel Refueling Target Asset Identification' },
  { url: '/images/Contact.jpg', alt: 'Zyphuel 24/7 Helpline & Dispatch Desk' },
  { url: '/images/Qr-code.png', alt: 'Zyphuel Dual QR & Barcode Verification' },
  { url: '/images/JazzCash.png', alt: 'Zyphuel JazzCash Instant Payment Gateway' },
  { url: '/images/Easypaisa.jpg', alt: 'Zyphuel Easypaisa Mobile Wallet Gateway' },
  { url: '/images/NayaPay.png', alt: 'Zyphuel NayaPay Digital Payment Gateway' },
  { url: '/images/Naypay.png', alt: 'Zyphuel Instant Mobile Wallet Transfer' },
  { url: '/images/SadaPay.jpg', alt: 'Zyphuel SadaPay Instant Payment Gateway' },
  { url: '/images/Bank.png', alt: 'Zyphuel Instant Bank Transfer & Raast' },
  { url: '/images/Mashreq.jpg', alt: 'Zyphuel Mashreq Digital Banking Channel' },
  { url: '/images/book.png', alt: 'Zyphuel Corporate Brand Book & Operating Guidelines' },
  { url: '/images/wall.png', alt: 'Zyphuel Corporate Office Headquarters Branding Wall' },
  { url: '/images/tablet.png', alt: 'Zyphuel Mobile Fuel Ordering on Driver Tablet' },
  { url: '/images/cup.png', alt: 'Zyphuel Official Brand Cup and Merchandise' },
  { url: '/images/pen.png', alt: 'Zyphuel Executive Corporate Pen' },
  { url: '/images/card.png', alt: 'Zyphuel Corporate Business Card' },
  { url: '/images/fuel.png', alt: 'Zyphuel Premium Fuel Pump Dispenser Unit' },
  { url: '/images/helmet.png', alt: 'Zyphuel Fuel Logistics Rider Safety Helmet' },
  { url: '/images/collab.png', alt: 'Zyphuel Enterprise Logistics Partnerships' },
  { url: '/images/tank.png', alt: 'Zyphuel Bulk Fuel Storage Tank Logistics' },
  { url: '/images/Shirt.png', alt: 'Zyphuel Official Delivery Agent Uniform' },
  { url: '/images/Gallen.png', alt: 'Zyphuel Portable Safe Fuel Canister' },
  { url: '/images/Cap.png', alt: 'Zyphuel Official Brand Cap' },
  { url: '/images/logo.png', alt: 'Zyphuel Official Brand Logo' }
]

export default function Carousel3D() {
  const [rotationAngle, setRotationAngle] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const count = DATA_3D.length
  const angle = 360 / count
  const cardWidth = 220
  // Standard 3D cylinder radius calculation
  const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / count))

  // Auto-play interval for 3D carousel
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setRotationAngle(prev => prev - angle)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused, angle])

  const normalizedAngle = ((rotationAngle % 360) + 360) % 360
  const targetCardIndex = Math.round((360 - normalizedAngle) / angle) % count

  return (
    <section
      id="slideshow"
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

        <div className="fade-in-up carousel-3d-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', position: 'relative' }}>
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
            .a3d-carousel {
              display: grid;
              transform-style: preserve-3d;
              transition: transform 1s cubic-bezier(0.2, 0.85, 0.32, 1.2);
              width: 220px;
              height: 220px;
            }
            .card-3d {
              grid-area: 1 / 1;
              width: 220px;
              height: 220px;
              background-color: rgba(255, 255, 255, 0.04);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              border-radius: var(--radius-lg, 16px);
              backface-visibility: hidden;
              border: 1px solid rgba(255, 255, 255, 0.12);
              transition: border-color 0.4s ease, background-color 0.4s ease, opacity 0.4s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 16px;
              box-sizing: border-box;
              overflow: hidden;
              cursor: pointer;
            }
            .carousel-img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              filter: brightness(0.8) drop-shadow(0 6px 12px rgba(0,0,0,0.3));
            }
            .card-3d.active-focus {
              background-color: rgba(255, 255, 255, 0.1);
              border-color: rgba(14, 165, 233, 0.7);
              box-shadow: 0 0 25px rgba(14, 165, 233, 0.25);
            }
            .card-3d.active-focus .carousel-img {
              filter: brightness(1.1) drop-shadow(0 0 16px rgba(14, 165, 233, 0.5));
              transform: scale(1.08);
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
              transition: all 0.3s ease;
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
                const isVisible = Math.abs(offsetAngle) <= 38
                const isActive = i === targetCardIndex

                return (
                  <div
                    key={i}
                    className={`card-3d ${isActive ? 'active-focus' : ''}`}
                    onClick={() => setRotationAngle(-i * angle)}
                    title={`Click to view: ${item.alt}`}
                    style={{ 
                      transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                      visibility: isVisible ? 'visible' : 'hidden',
                      opacity: isVisible ? (isActive ? 1 : Math.max(0.3, 0.75 - Math.abs(offsetAngle) / 50)) : 0
                    }}
                  >
                    <img
                      className="carousel-img"
                      src={item.url}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      width="220"
                      height="220"
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
