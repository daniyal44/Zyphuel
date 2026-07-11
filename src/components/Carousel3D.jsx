import { useState, useEffect } from 'react'

const DATA_3D = [
  'https://i.postimg.cc/x1vN9qbh/wall.png',
  'https://i.postimg.cc/vTT5BMdL/tablet.png',
  'https://i.postimg.cc/ZRCqvqCz/cup.png',
  'https://i.postimg.cc/wBRPt89x/pen.png',
  'https://i.postimg.cc/W3HPB6NB/card.png',
  'https://i.postimg.cc/T3tGj68w/fuel.png',
  'https://i.postimg.cc/PJQ0tWTC/helmet.png',
  'https://i.postimg.cc/TYpkHfqp/collab.png',
  'https://i.postimg.cc/g0pRh3Wz/tank.png',
  'https://i.postimg.cc/pXNDvw6y/Shirt.png',
  'https://i.postimg.cc/wMYdxxJx/Gallen.png',
  'https://i.postimg.cc/J0sR0YYN/Cap.png'
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
        <div className="fade-in-up" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="section-title" style={{ color: '#ffffff' }}>Slideshow</h2>
          <p className="section-subtitle" style={{ color: '#94a3b8' }}>
            Zyphuel is Pakistan’s #1 fuel agency and the premier fuel supplier in the country, dedicated to providing top-quality energy solutions and reliable service nationwide.
          </p>
        </div>

        <div className="fade-in-up carousel-3d-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', position: 'relative' }}>
          {/* Scoped styles for the 3D carousel */}
          <style dangerouslySetInnerHTML={{ __html: `
            .scene-container {
              display: grid;
              width: 100%;
              height: 320px;
              perspective: 65em;
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
              background-color: rgba(255, 255, 255, 0.03);
              backdrop-filter: blur(4px);
              -webkit-backdrop-filter: blur(4px);
              border-radius: 1.5em;
              backface-visibility: hidden;
              border: 1px solid rgba(255, 255, 255, 0.08);
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
              filter: brightness(0.6) drop-shadow(0 8px 16px rgba(0,0,0,0.4));
            }
            .card-3d.active-focus {
              background-color: rgba(255, 255, 255, 0.08);
              border-color: rgba(14, 165, 233, 0.5);
              transform: scale(1.05);
            }
            .card-3d.active-focus .carousel-img {
              filter: brightness(1.1) drop-shadow(0 0 20px rgba(14, 165, 233, 0.6)) drop-shadow(0 8px 16px rgba(0,0,0,0.5));
            }
            .carousel-controls {
              display: flex;
              gap: 20px;
              margin-top: 30px;
              z-index: 10;
            }
            .carousel-control-btn {
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(255, 255, 255, 0.15);
              color: #ffffff;
              width: 48px;
              height: 48px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .carousel-control-btn:hover {
              background: var(--accent-color, #0ea5e9);
              border-color: var(--accent-color, #0ea5e9);
              transform: scale(1.1);
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
              {DATA_3D.map((imgCode, i) => {
                const angle = 360 / DATA_3D.length;
                const radius = Math.round((220 / 2) / Math.tan(Math.PI / DATA_3D.length));
                
                // Highlight the card that is currently facing forward
                // Normalized angle index: rotationAngle could be positive or negative, so:
                const normalizedAngle = ((rotationAngle % 360) + 360) % 360;
                const targetCardIndex = Math.round((360 - normalizedAngle) / angle) % DATA_3D.length;
                const isActive = i === targetCardIndex;

                return (
                  <div
                    key={i}
                    className={`card-3d ${isActive ? 'active-focus' : ''}`}
                    style={{ 
                      transform: `rotateY(${i * angle}deg) translateZ(${radius + 20}px)` 
                    }}
                  >
                    <img
                      className="carousel-img"
                      src={imgCode}
                      alt={`3D Slide ${i}`}
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
