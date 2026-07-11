import React from 'react';

export default function ServicesGraphic() {
  return (
    <svg className="isometric-3d-svg" viewBox="0 0 500 450" xmlns="http://www.w3.org/2000/svg">
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
      </defs>

      {/* Isometric Base Grid (3D Rhombus Platform) */}
      <polygon points="250,60 470,180 250,300 30,180" fill="url(#baseGrid)" opacity="0.9" />

      {/* Grid Guidelines for Tech aesthetics */}
      <polyline points="250,60 140,120 250,180 360,120 250,60" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.6" />
      <polyline points="30,180 140,240 250,180 140,120" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.4" />
      <polyline points="470,180 360,240 250,180 360,120" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.4" />
      <polyline points="250,300 140,240 250,180 360,240" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.5" />

      {/* Radar Pulse circles centered around Refueling Dock */}
      <ellipse cx="200" cy="210" rx="70" ry="38" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.8">
        <animate attributeName="rx" values="40;95;40" dur="4s" repeatCount="indefinite" />
        <animate attributeName="ry" values="22;52;22" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0;0.8" dur="4s" repeatCount="indefinite" />
      </ellipse>

      {/* 3D Vertical Cylinder - STORAGE TANK 1 (Petrol) */}
      {/* Tank Shadow */}
      <ellipse cx="360" cy="180" rx="35" ry="17" fill="#0f172a" opacity="0.18" />
      {/* Tank Column */}
      <path d="M 325,120 A 35,17 0 0,0 395,120 L 395,180 A 35,17 0 0,1 325,180 Z" fill="url(#cylFront1)" />
      {/* Tank Top */}
      <ellipse cx="360" cy="120" rx="35" ry="17" fill="url(#cylTop1)" stroke="#22d3ee" strokeWidth="0.5" />
      <text x="360" y="155" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#ffffff" textAnchor="middle" opacity="0.85">PETROL</text>

      {/* 3D Vertical Cylinder - STORAGE TANK 2 (Diesel) */}
      {/* Tank Shadow */}
      <ellipse cx="410" cy="210" rx="30" ry="15" fill="#0f172a" opacity="0.18" />
      {/* Tank Column */}
      <path d="M 380,150 A 30,15 0 0,0 440,150 L 440,210 A 30,15 0 0,1 380,210 Z" fill="url(#cylFront2)" />
      {/* Tank Top */}
      <ellipse cx="410" cy="150" rx="30" ry="15" fill="url(#cylTop2)" stroke="#a78bfa" strokeWidth="0.5" />
      <text x="410" y="185" fontFamily="sans-serif" fontSize="8" fontWeight="800" fill="#ffffff" textAnchor="middle" opacity="0.85">DIESEL</text>

      {/* Refueling pipelines (Connecting reservoirs to loading zone) */}
      {/* Solid pipeline base */}
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
        <ellipse cx="80" cy="70" rx="65" ry="32" fill="#0f172a" opacity="0.22" />

        {/* Cabin Body */}
        {/* Cabin Top */}
        <polygon points="120,40 142,28 165,40 142,52" fill="url(#truckMetal)" />
        {/* Cabin Front Left */}
        <polygon points="120,40 142,52 142,75 120,63" fill="#64748b" />
        {/* Cabin Front Right */}
        <polygon points="142,52 165,40 165,63 142,75" fill="#1e293b" />
        {/* Cabin Windshield Glass */}
        <polygon points="145,50 161,42 161,54 145,62" fill="#38bdf8" fillOpacity="0.7" />
        {/* Front Bumper & Headlights */}
        <rect x="150" y="65" width="8" height="5" rx="1.5" fill="#fef08a" transform="rotate(27, 150, 65)" />

        {/* Cylindrical Mobile Fuel Tanker */}
        {/* Tank Back Cap */}
        <ellipse cx="60" cy="30" rx="20" ry="24" fill="#0ea5e9" />
        {/* Tank Body Cylinder */}
        <polygon points="60,6 115,32 115,80 60,54" fill="url(#cylFront1)" />
        {/* Tank Top Cap (Facing Front Cabin) */}
        <ellipse cx="115" cy="56" rx="20" ry="24" fill="url(#cylTop1)" stroke="#22d3ee" strokeWidth="0.5" />
        <text x="85" y="44" fontFamily="sans-serif" fontWeight="900" fontSize="8" fill="#ffffff" transform="rotate(27, 85, 44)" letterSpacing="0.5">ZYPHUEL</text>

        {/* Safety rails / pipes along truck */}
        <line x1="60" y1="12" x2="115" y2="38" stroke="#f8fafc" strokeWidth="2" />
        <line x1="60" y1="50" x2="115" y2="76" stroke="#f8fafc" strokeWidth="2" />

        {/* Heavy Wheels */}
        {[65, 90, 135].map((cx, index) => (
          <g key={cx}>
            {/* Inner tires */}
            <ellipse cx={cx} cy={56 + index * 5} rx="9" ry="14" fill="#0f172a" />
            <ellipse cx={cx} cy={56 + index * 5} rx="4" ry="7" fill="#cbd5e1" />
          </g>
        ))}
      </g>

      {/* Floating Telemetry HUD - Agency Tank Capacity */}
      <g transform="translate(30, 80)">
        <rect width="165" height="65" rx="12" fill="#ffffff" fillOpacity="0.94" stroke="#0ea5e9" strokeWidth="1.5" />
        <circle cx="20" cy="22" r="5" fill="url(#pulseGreen)">
          <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x="32" y="26" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#0f172a" letterSpacing="0.5">DEPOT CAPACITY</text>
        <text x="18" y="42" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="#334155">Petrol: 98% (84.2KL)</text>
        <text x="18" y="55" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="#334155">Diesel: 94% (112.5KL)</text>
        {/* Dotted indicator line extending to the storage tanks */}
        <path d="M 165,32 L 325,120" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4,4" fill="none" opacity="0.6" />
      </g>

      {/* Floating Telemetry HUD - Mobile Dispatching Status */}
      <g transform="translate(300, 240)">
        <rect width="160" height="65" rx="12" fill="#ffffff" fillOpacity="0.94" stroke="#7c3aed" strokeWidth="1.5" />
        <path d="M 18,25 a 4 4 0 1 1-8 0 c 0-3 4-6 4-6 s 4 3 4 6 z" fill="#7c3aed" />
        <text x="30" y="26" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#0f172a" letterSpacing="0.5">DISPATCH AGENCY</text>
        <text x="16" y="42" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="#334155">Active Tankers: 14</text>
        <text x="16" y="55" fontFamily="sans-serif" fontSize="10.5" fontWeight="700" fill="#7c3aed">Queue Status: Ready</text>
        {/* Dotted indicator line extending to the parked truck */}
        <path d="M 0,32 L -85,-10" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4,4" fill="none" opacity="0.6" />
      </g>
    </svg>
  );
}
