import { useState, useEffect } from 'react'

const DATA_3D = [
  { url: '/images/carousel/wall.webp', alt: 'Zyphuel Corporate Office Branding Wall' },
  { url: '/images/carousel/tablet.webp', alt: 'Zyphuel Mobile Fuel Delivery Ordering App on Tablet' },
  { url: '/images/carousel/cup.webp', alt: 'Zyphuel Official Brand Mug and Stationary' },
  { url: '/images/carousel/pen.webp', alt: 'Zyphuel Branded Corporate Pen' },
  { url: '/images/carousel/card.webp', alt: 'Zyphuel Corporate Business Card' },
  { url: '/images/carousel/fuel.webp', alt: 'Zyphuel Premium Fuel Pump Dispenser' },
  { url: '/images/carousel/helmet.webp', alt: 'Zyphuel Safe Operations Fuel Delivery Rider Helmet' },
  { url: '/images/carousel/collab.webp', alt: 'Zyphuel Enterprise Partnerships and Collaboration' },
  { url: '/images/carousel/tank.webp', alt: 'Zyphuel Fuel Storage Tank Logistics' },
  { url: '/images/carousel/shirt.webp', alt: 'Zyphuel Branded Delivery Agent Uniform T-Shirt' },
  { url: '/images/carousel/gallen.webp', alt: 'Zyphuel Portable Fuel Jerry Can' },
  { url: '/images/carousel/cap.webp', alt: 'Zyphuel Branded Cap' }
]

export default function Carousel3D() {
  const [rotationAngle, setRotationAngle] = useState(0)

  // Auto-play interval for 3D carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setRotationAngle(prev => prev - (360 / DATA_3D.length))
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="slideshow" className="slideshow-section section-padding" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: '#090d16', padding: '80px 0', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className="fade-in-up" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title" style={{ color: '#ffffff' }}>Our Brand &amp; Fleet</h2>
          <p className="section-subtitle" style={{ color: '#94a3b8' }}>
            Zyphuel is Pakistan’s #1 fuel agency and premier fuel supplier, dedicated to top-quality mobile energy solutions nationwide.
          </p>
        </div>

        <div className="fade-in-up carousel-3d-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '380px', position: 'relative' }}>
          {/* Scoped styles for the 3D carousel */}
          <style dangerouslySetInnerHTML={{ __html: `
            .scene-container {
              display: grid;
              width: 100%;
              height: 320px;
              perspective: 90em;
              place-items: center;
              overflow: visible;
              margin-bottom: 20px;
            }
            .a3d-carousel {
              display: grid;
              transform-style: preserve-3d;
              transition: transform 1.2s cubic-bezier(0.2, 0.85, 0.32, 1.2);
              width: 220px;
              height: 220px;
            }
            .card-3d {
              grid-area: 1 / 1;
              width: 220px;
              height: 220px;
              background-color: rgba(255, 255, 255, 0.04);
              backdrop-filter: blur(6px);
              -webkit-backdrop-filter: blur(6px);
              border-radius: var(--radius-lg, 16px);
              backface-visibility: hidden;
              border: 1px solid rgba(255, 255, 255, 0.1);
              transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 16px;
              box-sizing: border-box;
              overflow: hidden;
            }
            .carousel-img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
              filter: brightness(0.7) drop-shadow(0 6px 12px rgba(0,0,0,0.3));
            }
            .card-3d.active-focus {
              background-color: rgba(255, 255, 255, 0.09);
              border-color: rgba(14, 165, 233, 0.6);
              transform: scale(1.06);
            }
            .card-3d.active-focus .carousel-img {
              filter: brightness(1.1) drop-shadow(0 0 16px rgba(14, 165, 233, 0.5));
            }
            .carousel-controls {
              display: flex;
              gap: 20px;
              margin-top: 20px;
              z-index: 10;
            }
            .carousel-control-btn {
              background: rgba(255, 255, 255, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: #ffffff;
              width: 46px;
              height: 46px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.3s ease;
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
                transform: `rotateY(${rotationAngle}deg)` 
              }}
            >
              {DATA_3D.map((item, i) => {
                const angle = 360 / DATA_3D.length;
                const radius = Math.round((220 / 2) / Math.tan(Math.PI / DATA_3D.length));
                
                const normalizedAngle = ((rotationAngle % 360) + 360) % 360;
                const cardAngle = (i * angle + normalizedAngle) % 360;
                const offsetAngle = cardAngle > 180 ? cardAngle - 360 : cardAngle;
                const isVisible = Math.abs(offsetAngle) <= 75;
                const targetCardIndex = Math.round((360 - normalizedAngle) / angle) % DATA_3D.length;
                const isActive = i === targetCardIndex;

                return (
                  <div
                    key={i}
                    className={`card-3d ${isActive ? 'active-focus' : ''}`}
                    style={{ 
                      transform: `rotateY(${i * angle}deg) translateZ(${radius + 20}px)`,
                      visibility: isVisible ? 'visible' : 'hidden',
                      opacity: isVisible ? (isActive ? 1 : 0.65) : 0
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
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="carousel-controls">
            <button 
              className="carousel-control-btn" 
              onClick={() => setRotationAngle(prev => prev + (360 / DATA_3D.length))}
              aria-label="Previous Slide"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button 
              className="carousel-control-btn" 
              onClick={() => setRotationAngle(prev => prev - (360 / DATA_3D.length))}
              aria-label="Next Slide"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
