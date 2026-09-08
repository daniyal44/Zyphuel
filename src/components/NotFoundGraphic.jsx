import React from 'react'

export default function NotFoundGraphic() {
  return (
    <div style={{ maxWidth: '320px', margin: '0 auto 24px auto' }}>
      <svg viewBox="0 0 280 180" style={{ width: '100%', height: 'auto', display: 'block' }} aria-hidden="true">
        <defs>
          <linearGradient id="nfRoad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="nfTruck" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>

        <style>{`
          @keyframes radarSweep {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pingPulse {
            0% { r: 6; opacity: 1; }
            100% { r: 28; opacity: 0; }
          }
          .radar-sweep-arm {
            transform-origin: 140px 65px;
            animation: radarSweep 4s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .radar-sweep-arm {
              animation: none;
            }
          }
        `}</style>

        {/* Radar concentric circles searching for GPS */}
        <circle cx="140" cy="65" r="50" fill="rgba(2, 132, 199, 0.04)" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="140" cy="65" r="32" fill="rgba(2, 132, 199, 0.06)" stroke="#cbd5e1" strokeWidth="1" />
        <circle cx="140" cy="65" r="14" fill="rgba(2, 132, 199, 0.12)" stroke="#0284c7" strokeWidth="1.5" />
        
        {/* Pulsing Radar Ring */}
        <circle cx="140" cy="65" r="8" fill="none" stroke="#0284c7" strokeWidth="1.5">
          <animate attributeName="r" values="6;48" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Radar Sweep Arm */}
        <line x1="140" y1="65" x2="175" y2="35" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" className="radar-sweep-arm" />

        {/* 404 Large Silhouette in background */}
        <text x="140" y="75" fontFamily="monospace" fontSize="42" fontWeight="900" fill="rgba(15, 23, 42, 0.06)" textAnchor="middle">
          404
        </text>

        {/* Road Base */}
        <path d="M 30,150 L 250,150" stroke="url(#nfRoad)" strokeWidth="6" strokeLinecap="round" />
        <line x1="50" y1="150" x2="230" y2="150" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="10 10" />

        {/* Refueling Tanker Vehicle */}
        <g transform="translate(90, 115)">
          {/* Shadow */}
          <ellipse cx="50" cy="36" rx="42" ry="5" fill="#0f172a" opacity="0.15" />
          
          {/* Tank Body */}
          <rect x="10" y="8" width="52" height="24" rx="8" fill="url(#nfTruck)" />
          <text x="36" y="24" fontFamily="sans-serif" fontSize="7" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">
            ZYPHUEL
          </text>
          
          {/* Cabin */}
          <path d="M 62,14 L 78,14 L 84,24 L 84,32 L 62,32 Z" fill="#0f172a" />
          {/* Windshield */}
          <polygon points="65,16 75,16 80,24 65,24" fill="#38bdf8" opacity="0.85" />
          
          {/* Wheels */}
          <circle cx="24" cy="32" r="6" fill="#1e293b" />
          <circle cx="24" cy="32" r="2.5" fill="#cbd5e1" />
          <circle cx="48" cy="32" r="6" fill="#1e293b" />
          <circle cx="48" cy="32" r="2.5" fill="#cbd5e1" />
          <circle cx="74" cy="32" r="6" fill="#1e293b" />
          <circle cx="74" cy="32" r="2.5" fill="#cbd5e1" />

          {/* GPS Lost Pin */}
          <path d="M 88,4 C 88,0 96,0 96,4 C 96,8 92,13 92,13 C 92,13 88,8 88,4 Z" fill="#ef4444" />
          <circle cx="92" cy="4" r="1.5" fill="#ffffff" />
        </g>
      </svg>
    </div>
  )
}
