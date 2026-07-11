import React from 'react';

export default function HeroGraphic() {
  return (
    <svg viewBox="0 0 500 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f0f7ff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="truckBlue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="lahoreSkyline" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e0f0ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="500" height="400" fill="url(#skyGrad)" />

      {/* Digital grid */}
      <g stroke="#e2e8f0" strokeWidth="0.5" opacity="0.6">
        <line x1="50" y1="0" x2="50" y2="350" />
        <line x1="100" y1="0" x2="100" y2="350" />
        <line x1="155" y1="0" x2="155" y2="350" />
        <line x1="205" y1="0" x2="205" y2="350" />
        <line x1="250" y1="0" x2="250" y2="350" />
        <line x1="300" y1="0" x2="300" y2="350" />
        <line x1="350" y1="0" x2="350" y2="350" />
        <line x1="400" y1="0" x2="400" y2="350" />
        <line x1="450" y1="0" x2="450" y2="350" />
        <line x1="0" y1="50" x2="500" y2="50" />
        <line x1="0" y1="100" x2="500" y2="100" />
        <line x1="0" y1="150" x2="500" y2="150" />
        <line x1="0" y1="200" x2="500" y2="200" />
        <line x1="0" y1="250" x2="500" y2="250" />
        <line x1="0" y1="300" x2="500" y2="300" />
      </g>

      {/* Lahore Skyline */}
      <path d="M 0 350 L 0 250 L 30 250 L 30 220 L 50 220 L 50 260 L 90 260 L 90 280
               L 120 280 L 120 210 L 130 180 L 140 210 L 150 210 L 150 280
               L 200 280 L 200 240 L 220 240 L 220 290 L 260 290 L 260 140
               A 20 20 0 0 1 300 140 L 300 290 L 320 290 L 320 270 L 360 270
               L 360 230 L 390 230 L 390 300 L 420 300 L 420 260 L 460 260
               L 460 290 L 500 290 L 500 350 Z"
        fill="url(#lahoreSkyline)" />

      {/* Minar-e-Pakistan detail */}
      <path d="M 270 290 L 273 230 L 275 230 L 276 180 L 278 180 L 279 140
               L 281 140 L 282 110 L 280 110 L 280 100 L 281 100 L 281 90
               L 279 90 L 280 80 L 280 75 L 281 75 L 281 70 L 280 70 L 280 60
               L 283 60 L 283 70 L 282 70 L 282 75 L 283 75 L 283 80 L 281 80
               L 282 90 L 280 90 L 280 100 L 281 100 L 281 110 L 279 110
               L 280 140 L 282 140 L 283 180 L 285 180 L 287 230 L 289 230
               L 292 290 Z"
        fill="#badaf7" opacity="0.8" />

      {/* Road */}
      <rect x="0" y="320" width="500" height="80" fill="url(#roadGrad)" />
      <line x1="0" y1="355" x2="500" y2="355" stroke="#ffffff" strokeWidth="3" strokeDasharray="15, 15">
        <animate attributeName="stroke-dashoffset" values="0; 120" dur="2s" repeatCount="indefinite" />
      </line>

      {/* Fuel tanker truck */}
      <g id="truck-body">
        <animateTransform attributeName="transform" type="translate" values="-20,0; 20,0; -20,0" dur="8s" repeatCount="indefinite" />
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0; 0,-2; 0,0" dur="0.85s" repeatCount="indefinite" />

          {/* Smoke puffs */}
          <circle cx="155" cy="270" r="4" fill="#5b6e82" opacity="0.6">
            <animate attributeName="cx" values="155; 140; 125" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="cy" values="270; 255; 245" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="r" values="4; 8; 12" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6; 0.3; 0" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="155" cy="270" r="3" fill="#cbd5e1" opacity="0.4">
            <animate attributeName="cx" values="155; 142; 130" dur="1.5s" begin="0.75s" repeatCount="indefinite" />
            <animate attributeName="cy" values="270; 260; 250" dur="1.5s" begin="0.75s" repeatCount="indefinite" />
            <animate attributeName="r" values="3; 6; 9" dur="1.5s" begin="0.75s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4; 0.2; 0" dur="1.5s" begin="0.75s" repeatCount="indefinite" />
          </circle>

          {/* Exhaust pipe */}
          <path d="M 160 300 L 160 273 L 155 273" stroke="#475569" strokeWidth="3" fill="none" />

          {/* Cabin */}
          <path d="M 310 320 L 360 320 L 360 290 L 340 265 L 310 265 Z" fill="url(#truckBlue)" />
          <path d="M 342 270 L 356 290 L 338 290 Z" fill="#e2e8f0" />
          <rect x="355" y="312" width="12" height="8" rx="2" fill="#475569" />
          <circle cx="360" cy="305" r="4" fill="#fef08a" />
          <polygon points="360,302 440,285 440,325" fill="#fef08a" opacity="0.25" />

          {/* Tanker */}
          <rect x="170" y="245" width="135" height="75" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          <text x="240" y="292" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="14" fill="#0f172a" textAnchor="middle">ZYPHUEL</text>
          <path d="M 235 255 a 6 6 0 1 1-12 0 c 0-4 6-9 6-9 s 6 5 6 9 z" fill="#0ea5e9" transform="scale(0.8) translate(54, 55)" />

          {/* Safety rails */}
          <line x1="175" y1="250" x2="295" y2="250" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="175" y1="315" x2="295" y2="315" stroke="#cbd5e1" strokeWidth="2" />

          {/* Wheels */}
          {[195, 275, 335].map(cx => (
            <g key={cx} transform={`translate(${cx}, 320)`}>
              <circle cx="0" cy="0" r="16" fill="#334155" />
              <circle cx="0" cy="0" r="6" fill="#cbd5e1" />
              <line x1="-16" y1="0" x2="16" y2="0" stroke="#64748b" strokeWidth="2">
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="0" y1="-16" x2="0" y2="16" stroke="#64748b" strokeWidth="2">
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1s" repeatCount="indefinite" />
              </line>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
