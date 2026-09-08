import React from 'react';

export default function ServicesGraphic() {
  return (
    <div className="services-graphic-wrapper" style={{ position: 'relative', width: '100%', maxWidth: '540px', margin: '0 auto' }}>
      <svg
        className="isometric-3d-svg"
        viewBox="0 0 500 450"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="3D Isometric illustration of Zyphuel fuel terminal with calibrated digital flow meters, storage tanks, and refueling bowsers"
      >
        <defs>
          <linearGradient id="baseGrid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Cylinder Shading Gradients */}
          <linearGradient id="cylFront1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="40%" stopColor="#06b6d4" />
            <stop offset="70%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="cylTop1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ecfeff" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>

          <linearGradient id="cylFront2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="40%" stopColor="#8b5cf6" />
            <stop offset="70%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="cylTop2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5f3ff" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>

          {/* Metallic Truck Shading */}
          <linearGradient id="truckMetal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="pulseGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* Calibrated Flow Meter Gradient */}
          <linearGradient id="meterGlass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .isometric-3d-svg animate,
            .isometric-3d-svg animateTransform {
              animation-play-state: paused !important;
            }
          }
        `}</style>

        {/* Isometric Base Grid (3D Rhombus Platform) */}
        <polygon points="250,60 470,180 250,300 30,180" fill="url(#baseGrid)" opacity="0.95" />

        {/* Grid Guidelines for Tech aesthetics */}
        <polyline points="250,60 140,120 250,180 360,120 250,60" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.7" />
        <polyline points="30,180 140,240 250,180 140,120" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
        <polyline points="470,180 360,240 250,180 360,120" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
        <polyline points="250,300 140,240 250,180 360,240" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6" />

        {/* Radar Pulse circles centered around Refueling Dock */}
        <ellipse cx="200" cy="210" rx="70" ry="38" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.8">
          <animate attributeName="rx" values="40;95;40" dur="4s" repeatCount="indefinite" />
          <animate attributeName="ry" values="22;52;22" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="4s" repeatCount="indefinite" />
        </ellipse>

        {/* 3D Vertical Cylinder - STORAGE TANK 1 (Petrol) */}
        <ellipse cx="360" cy="180" rx="35" ry="17" fill="#0f172a" opacity="0.22" />
        <path d="M 325,120 A 35,17 0 0,0 395,120 L 395,180 A 35,17 0 0,1 325,180 Z" fill="url(#cylFront1)" />
        <ellipse cx="360" cy="120" rx="35" ry="17" fill="url(#cylTop1)" stroke="#22d3ee" strokeWidth="0.5" />
        <text x="360" y="152" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#ffffff" textAnchor="middle" opacity="0.9">PETROL</text>
        <text x="360" y="164" fontFamily="sans-serif" fontSize="7" fontWeight="600" fill="#ecfeff" textAnchor="middle" opacity="0.8">Euro-V 92/97</text>

        {/* 3D Vertical Cylinder - STORAGE TANK 2 (Diesel) */}
        <ellipse cx="410" cy="210" rx="30" ry="15" fill="#0f172a" opacity="0.22" />
        <path d="M 380,150 A 30,15 0 0,0 440,150 L 440,210 A 30,15 0 0,1 380,210 Z" fill="url(#cylFront2)" />
        <ellipse cx="410" cy="150" rx="30" ry="15" fill="url(#cylTop2)" stroke="#a78bfa" strokeWidth="0.5" />
        <text x="410" y="182" fontFamily="sans-serif" fontSize="8" fontWeight="800" fill="#ffffff" textAnchor="middle" opacity="0.9">DIESEL</text>
        <text x="410" y="193" fontFamily="sans-serif" fontSize="6.5" fontWeight="600" fill="#f5f3ff" textAnchor="middle" opacity="0.8">HSD Low Sulfur</text>

        {/* Refueling pipelines (Connecting reservoirs to loading zone) */}
        <path d="M 360,180 L 280,225 L 200,210" fill="none" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M 410,210 L 330,250 L 230,225" fill="none" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
        
        {/* Glowing active flow laser inside the pipe */}
        <path d="M 360,180 L 280,225 L 200,210" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="12,8">
          <animate attributeName="stroke-dashoffset" values="0;-100" dur="2.5s" repeatCount="indefinite" />
        </path>
        <path d="M 410,210 L 330,250 L 230,225" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="10,10">
          <animate attributeName="stroke-dashoffset" values="0;-100" dur="3s" repeatCount="indefinite" />
        </path>

        {/* 3D Isometric Fuel Tanker Truck (Parked/Loading) */}
        <g transform="translate(100, 175)">
          {/* Vehicle Ground Shadow */}
          <ellipse cx="80" cy="70" rx="65" ry="32" fill="#0f172a" opacity="0.25" />

          {/* Cabin Body */}
          <polygon points="120,40 142,28 165,40 142,52" fill="url(#truckMetal)" />
          <polygon points="120,40 142,52 142,75 120,63" fill="#64748b" />
          <polygon points="142,52 165,40 165,63 142,75" fill="#1e293b" />
          <polygon points="145,50 161,42 161,54 145,62" fill="#38bdf8" fillOpacity="0.8" />
          <rect x="150" y="65" width="8" height="5" rx="1.5" fill="#fef08a" transform="rotate(27, 150, 65)">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
          </rect>

          {/* Cylindrical Mobile Fuel Tanker */}
          <ellipse cx="60" cy="30" rx="20" ry="24" fill="#0ea5e9" />
          <polygon points="60,6 115,32 115,80 60,54" fill="url(#cylFront1)" />
          <ellipse cx="115" cy="56" rx="20" ry="24" fill="url(#cylTop1)" stroke="#22d3ee" strokeWidth="0.5" />
          <text x="85" y="44" fontFamily="sans-serif" fontWeight="900" fontSize="8" fill="#ffffff" transform="rotate(27, 85, 44)" letterSpacing="0.5">ZYPHUEL</text>

          {/* Safety rails along truck */}
          <line x1="60" y1="12" x2="115" y2="38" stroke="#f8fafc" strokeWidth="2" />
          <line x1="60" y1="50" x2="115" y2="76" stroke="#f8fafc" strokeWidth="2" />

          {/* Heavy Wheels */}
          {[65, 90, 135].map((cx, index) => (
            <g key={cx}>
              <ellipse cx={cx} cy={56 + index * 5} rx="9" ry="14" fill="#0f172a" />
              <ellipse cx={cx} cy={56 + index * 5} rx="4" ry="7" fill="#cbd5e1" />
            </g>
          ))}
        </g>

        {/* NEW: 3D Calibrated Digital Flow Meter Terminal Widget */}
        <g transform="translate(190, 275)">
          {/* Base Stand */}
          <polygon points="30,20 50,10 70,20 50,30" fill="#334155" />
          <rect x="47" y="25" width="6" height="25" fill="#475569" />
          
          {/* Digital Meter Head Box */}
          <polygon points="20,0 60,-20 90,-5 50,15" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
          
          {/* Glowing Green LCD Screen */}
          <polygon points="26,-2 58,-18 84,-5 52,10" fill="url(#meterGlass)" stroke="#10b981" strokeWidth="1" />
          <text x="54" y="0" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#34d399" textAnchor="middle">
            0048.5 L
            <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
          </text>
          <text x="54" y="8" fontFamily="sans-serif" fontSize="5" fontWeight="bold" fill="#38bdf8" textAnchor="middle">
            CALIBRATED ±0.01%
          </text>
        </g>

        {/* Floating Telemetry HUD - Agency Tank Capacity */}
        <g transform="translate(30, 75)">
          <rect width="170" height="68" rx="12" fill="#ffffff" fillOpacity="0.95" stroke="#0ea5e9" strokeWidth="1.5" filter="drop-shadow(0 4px 12px rgba(15,23,42,0.1))" />
          <circle cx="20" cy="22" r="5" fill="url(#pulseGreen)">
            <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <text x="32" y="26" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#0f172a" letterSpacing="0.5">DEPOT CAPACITY</text>
          <text x="18" y="43" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="#334155">Petrol: 98% (84.2KL)</text>
          <text x="18" y="57" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="#334155">Diesel: 94% (112.5KL)</text>
          <path d="M 170,32 L 325,120" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4,4" fill="none" opacity="0.6" />
        </g>

        {/* Floating Telemetry HUD - Mobile Dispatching Status */}
        <g transform="translate(300, 240)">
          <rect width="165" height="68" rx="12" fill="#ffffff" fillOpacity="0.95" stroke="#7c3aed" strokeWidth="1.5" filter="drop-shadow(0 4px 12px rgba(15,23,42,0.1))" />
          <path d="M 18,25 a 4 4 0 1 1-8 0 c 0-3 4-6 4-6 s 4 3 4 6 z" fill="#7c3aed" />
          <text x="30" y="26" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#0f172a" letterSpacing="0.5">DISPATCH AGENCY</text>
          <text x="16" y="43" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="#334155">Active Bowsers: 14</text>
          <text x="16" y="57" fontFamily="sans-serif" fontSize="10.5" fontWeight="700" fill="#7c3aed">Telemetry: GPS Locked</text>
          <path d="M 0,32 L -85,-10" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4,4" fill="none" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}
