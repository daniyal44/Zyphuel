import React, { useState, useEffect, useRef } from 'react';
import './RefuelingLifecycleTracker.css';

export default function RefuelingLifecycleTracker({
  deliveryPhase = 'idle', // 'idle' | 'loading' | 'transit' | 'delivered'
  setDeliveryPhase,
  selectedFuelType = 'petrol',
  fuelQty = 50,
  address = 'Gulberg III, Lahore',
  deliverySpeed = 'simple',
}) {
  const [activeTab, setActiveTab] = useState(deliveryPhase);
  const simTimerRef = useRef(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Sync internal active tab with parent phase if external changes happen
  useEffect(() => {
    setActiveTab(deliveryPhase);
  }, [deliveryPhase]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (simTimerRef.current) clearInterval(simTimerRef.current);
    };
  }, []);

  const handleTabClick = (phaseKey) => {
    if (simTimerRef.current) {
      clearInterval(simTimerRef.current);
      setIsSimulating(false);
    }
    setActiveTab(phaseKey);
    if (setDeliveryPhase) {
      setDeliveryPhase(phaseKey);
    }
  };

  // Interactive Live Preview Simulation
  const handleRunSimulation = () => {
    if (simTimerRef.current) clearInterval(simTimerRef.current);
    setIsSimulating(true);

    const phases = ['idle', 'loading', 'transit', 'delivered'];
    let idx = 0;
    handleTabClick('idle');

    simTimerRef.current = setInterval(() => {
      idx++;
      if (idx < phases.length) {
        handleTabClick(phases[idx]);
      } else {
        clearInterval(simTimerRef.current);
        setIsSimulating(false);
      }
    }, 2800);
  };

  // Phase metadata
  const phaseConfig = {
    idle: {
      label: 'Awaiting Order',
      badgeClass: 'idle',
      icon: 'fa-hourglass-start',
      subtext: 'Bowser on Standby at Hub • Ready for Instant Dispatch',
      truckX: 110,
      truckY: 100,
    },
    loading: {
      label: 'Loading Depot',
      badgeClass: 'loading',
      icon: 'fa-gas-pump',
      subtext: 'Euro-V Refueling & Calibrated Flow-Meter Sealing',
      truckX: 135,
      truckY: 115,
    },
    transit: {
      label: 'In Transit',
      badgeClass: 'transit',
      icon: 'fa-truck-fast',
      subtext: `${deliverySpeed === 'urgent' ? '15 Min Urgent' : '30-45 Min Standard'} Dispatch En Route`,
      truckX: 290,
      truckY: 165,
    },
    delivered: {
      label: 'Completed',
      badgeClass: 'delivered',
      icon: 'fa-circle-check',
      subtext: 'Digital Calibrated Receipt Issued • 100% Volumetric Accuracy',
      truckX: 430,
      truckY: 155,
    },
  };

  const currentConfig = phaseConfig[activeTab] || phaseConfig.idle;

  return (
    <div className="lifecycle-tracker-widget">
      {/* Header */}
      <div className="lifecycle-header">
        <div className="lifecycle-title-group">
          <span className="lifecycle-radar-dot"></span>
          <h3 className="lifecycle-title">Refueling Lifecycle Tracker</h3>
        </div>

        <div className="lifecycle-status-action">
          <span className={`lifecycle-phase-pill ${currentConfig.badgeClass}`}>
            <i className={`fa-solid ${currentConfig.icon}`}></i> {currentConfig.label}
          </span>
        </div>
      </div>

      {/* Interactive Phase Navigation Tabs */}
      <div className="lifecycle-step-tabs">
        <button
          type="button"
          className={`step-tab-btn ${activeTab === 'idle' ? 'active' : ''}`}
          onClick={() => handleTabClick('idle')}
        >
          <i className="fa-solid fa-hourglass-start"></i> 1. Awaiting Order
        </button>
        <button
          type="button"
          className={`step-tab-btn ${activeTab === 'loading' ? 'active' : ''}`}
          onClick={() => handleTabClick('loading')}
        >
          <i className="fa-solid fa-gas-pump"></i> 2. Depot Filling
        </button>
        <button
          type="button"
          className={`step-tab-btn ${activeTab === 'transit' ? 'active' : ''}`}
          onClick={() => handleTabClick('transit')}
        >
          <i className="fa-solid fa-truck-fast"></i> 3. In Transit
        </button>
        <button
          type="button"
          className={`step-tab-btn ${activeTab === 'delivered' ? 'active' : ''}`}
          onClick={() => handleTabClick('delivered')}
        >
          <i className="fa-solid fa-circle-check"></i> 4. Delivered
        </button>
      </div>

      {/* 3D Isometric SVG Stage */}
      <div className="lifecycle-svg-stage">
        <svg
          viewBox="0 0 600 320"
          className="lifecycle-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Cyber Isometric Grid Pattern */}
            <pattern id="isoGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 20 L 40 40 Z" fill="none" stroke="rgba(56, 189, 248, 0.04)" strokeWidth="1" />
              <path d="M 0 0 L 40 20 L 0 40 Z" fill="none" stroke="rgba(56, 189, 248, 0.04)" strokeWidth="1" />
            </pattern>

            {/* Base Platform Shading */}
            <linearGradient id="dockingPad3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            {/* Highway Road Gradient */}
            <linearGradient id="highwayAsphalt" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            {/* Neon Highway Active Laser */}
            <linearGradient id="neonCyanLaser" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>

            {/* 3D Depot Silo Metallic Chrome Gradient */}
            <linearGradient id="siloChrome" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="25%" stopColor="#0ea5e9" />
              <stop offset="55%" stopColor="#7dd3fc" />
              <stop offset="85%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>

            {/* Silo Dome Top */}
            <linearGradient id="siloDome" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            {/* Liquid Fuel Indicator */}
            <linearGradient id="liquidFuel" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="60%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            {/* 3D Truck Tanker Fuselage */}
            <linearGradient id="tankerBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="25%" stopColor="#475569" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="75%" stopColor="#475569" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* 3D Truck Cabin Gradient */}
            <linearGradient id="truckCab" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>

            {/* Xenon Headlight Beam */}
            <linearGradient id="xenonBeam" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#fde047" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>

            {/* Customer Car Paint */}
            <linearGradient id="luxuryCarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="40%" stopColor="#6366f1" />
              <stop offset="80%" stopColor="#4338ca" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="vectorGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Strong Laser Glow */}
            <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur1" />
              <feGaussianBlur stdDeviation="2" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Isometric Grid */}
          <rect x="0" y="0" width="600" height="320" fill="url(#isoGridPattern)" />

          {/* 3D Isometric Platform (Main Foundation Pad) */}
          <g transform="translate(30, 20)">
            {/* Top Surface */}
            <polygon
              points="270,10 520,130 270,250 20,130"
              fill="url(#dockingPad3D)"
              stroke="rgba(56, 189, 248, 0.25)"
              strokeWidth="1.5"
            />
            {/* Left Depth Sidewall */}
            <polygon
              points="20,130 270,250 270,265 20,145"
              fill="#090d16"
              stroke="rgba(56, 189, 248, 0.15)"
              strokeWidth="1"
            />
            {/* Right Depth Sidewall */}
            <polygon
              points="270,250 520,130 520,145 270,265"
              fill="#060910"
              stroke="rgba(56, 189, 248, 0.15)"
              strokeWidth="1"
            />

            {/* 3D Elevated Curved Highway Corridor */}
            {/* Road Base Underlayer */}
            <path
              d="M 90,120 C 180,180 320,200 450,150"
              fill="none"
              stroke="#0f172a"
              strokeWidth="32"
              strokeLinecap="round"
            />
            {/* Road Surface */}
            <path
              d="M 90,120 C 180,180 320,200 450,150"
              fill="none"
              stroke="url(#highwayAsphalt)"
              strokeWidth="26"
              strokeLinecap="round"
            />
            {/* Highway Outer Glowing Rails */}
            <path
              d="M 88,106 C 178,166 318,186 448,136"
              fill="none"
              stroke="rgba(56, 189, 248, 0.4)"
              strokeWidth="1.5"
            />
            <path
              d="M 92,134 C 182,194 322,214 452,164"
              fill="none"
              stroke="rgba(56, 189, 248, 0.4)"
              strokeWidth="1.5"
            />
            {/* Center Dashed Guidance Line */}
            <path
              d="M 90,120 C 180,180 320,200 450,150"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="8,8"
              opacity="0.6"
            />

            {/* Active Telemetry Route Flow Laser */}
            {activeTab !== 'idle' && (
              <path
                d="M 90,120 C 180,180 320,200 450,150"
                fill="none"
                stroke="url(#neonCyanLaser)"
                strokeWidth="4"
                strokeDasharray="16,12"
                filter="url(#laserGlow)"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="100;0"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              </path>
            )}

            {/* ======================================================== */}
            {/* STAGE 1: 3D DEPOT LOGISTICS TERMINAL (LEFT)               */}
            {/* ======================================================== */}
            <g transform="translate(60, 45)">
              {/* Ground Shadow */}
              <ellipse cx="40" cy="85" rx="45" ry="20" fill="#020617" opacity="0.6" />

              {/* Secondary Silo (Back) */}
              <g transform="translate(42, -10)">
                <path d="M 0,25 A 18,9 0 0,0 36,25 L 36,55 A 18,9 0 0,1 0,55 Z" fill="url(#siloChrome)" />
                <ellipse cx="18" cy="25" rx="18" ry="9" fill="url(#siloDome)" stroke="#38bdf8" strokeWidth="0.8" />
              </g>

              {/* Primary Silo (Front) */}
              <g transform="translate(10, 5)">
                {/* Cylinder Trunk */}
                <path d="M 0,30 A 24,12 0 0,0 48,30 L 48,70 A 24,12 0 0,1 0,70 Z" fill="url(#siloChrome)" />
                {/* Dome Cap */}
                <ellipse cx="24" cy="30" rx="24" ry="12" fill="url(#siloDome)" stroke="#7dd3fc" strokeWidth="1" />

                {/* Vertical Inspection Seams & Volumetric Gauge */}
                <line x1="12" y1="36" x2="12" y2="74" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <line x1="36" y1="36" x2="36" y2="74" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />

                {/* Digital Liquid Level Sight-Glass */}
                <rect x="22" y="38" width="6" height="28" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.6" />
                <rect x="23" y="42" width="4" height="23" rx="2" fill="url(#liquidFuel)">
                  <animate attributeName="height" values="23;16;23" dur="5s" repeatCount="indefinite" />
                </rect>

                {/* Rotating 3D Telemetry Radar Scanner Dish on Silo Dome */}
                <g transform="translate(24, 16)">
                  <line x1="0" y1="0" x2="0" y2="-12" stroke="#38bdf8" strokeWidth="2" />
                  <ellipse cx="0" cy="-12" rx="10" ry="4" fill="none" stroke="#38bdf8" strokeWidth="1.5">
                    <animate attributeName="ry" values="4;1;4" dur="2.4s" repeatCount="indefinite" />
                  </ellipse>
                  {/* Radar Beacon Pulse */}
                  <circle cx="0" cy="-14" r="3" fill="#ef4444" filter="url(#vectorGlow)">
                    <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* Piping to Gantry */}
                <path
                  d="M 48,60 L 68,60 L 68,35 L 85,35"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="68" cy="48" r="3" fill="#f59e0b" />
              </g>

              {/* Overhead Gantry Loading Arm */}
              <g transform="translate(75, 40)">
                <rect x="0" y="0" width="3" height="35" fill="#475569" />
                <rect x="0" y="0" width="25" height="4" fill="#64748b" rx="1" />
                <line x1="22" y1="4" x2="22" y2="24" stroke="#0ea5e9" strokeWidth="2.5" strokeDasharray="3,2" />

                {/* In 'loading' phase: Animated Fuel Pour into Bowser */}
                {activeTab === 'loading' && (
                  <g>
                    <line x1="22" y1="20" x2="22" y2="45" stroke="#34d399" strokeWidth="3" filter="url(#vectorGlow)">
                      <animate attributeName="stroke-dashoffset" values="20;0" dur="0.6s" repeatCount="indefinite" />
                    </line>
                    <circle cx="22" cy="45" r="4" fill="#10b981" filter="url(#vectorGlow)">
                      <animate attributeName="r" values="3;6;3" dur="0.8s" repeatCount="indefinite" />
                    </circle>
                  </g>
                )}
              </g>

              {/* Depot Label Badge */}
              <g transform="translate(5, 96)">
                <rect x="0" y="0" width="85" height="18" rx="9" fill="#0f172a" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" />
                <text x="42" y="12" fill="#38bdf8" fontSize="8" fontWeight="800" textAnchor="middle" letterSpacing="0.05em">
                  DEPOT HUB-01
                </text>
              </g>
            </g>

            {/* ======================================================== */}
            {/* STAGE 2: 3D ZYPHUEL SMART BOWSER (TANKER TRUCK)          */}
            {/* ======================================================== */}
            <g
              style={{
                transition: 'transform 2.2s cubic-bezier(0.25, 1, 0.5, 1)',
                transform: `translate(${currentConfig.truckX}px, ${currentConfig.truckY}px)`,
              }}
            >
              {/* Truck Ground Shadow */}
              <ellipse cx="36" cy="46" rx="42" ry="14" fill="#020617" opacity="0.65" />

              {/* Tanker Cylindrical Body (Rear Section) */}
              <g transform="translate(0, 5)">
                {/* Back end ellipse */}
                <ellipse cx="14" cy="24" rx="13" ry="16" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
                {/* Middle fuselage */}
                <polygon points="14,8 55,20 55,52 14,40" fill="url(#tankerBody)" />
                {/* Front end ellipse */}
                <ellipse cx="55" cy="36" rx="13" ry="16" fill="url(#siloChrome)" stroke="#7dd3fc" strokeWidth="1" />

                {/* Chrome bands around tanker */}
                <path d="M 28,12 C 34,16 38,28 38,36" fill="none" stroke="#7dd3fc" strokeWidth="1.2" opacity="0.8" />
                <path d="M 42,16 C 48,20 52,32 52,40" fill="none" stroke="#7dd3fc" strokeWidth="1.2" opacity="0.8" />

                {/* ZYPHUEL High-Tech Livery Text */}
                <text
                  x="30"
                  y="34"
                  fill="#ffffff"
                  fontSize="7.5"
                  fontWeight="900"
                  fontFamily="sans-serif"
                  letterSpacing="0.08em"
                  transform="rotate(16, 30, 34)"
                >
                  ZYPHUEL
                </text>

                {/* HAZMAT Diamond Placard (Flammable Red) */}
                <polygon points="15,22 19,19 23,22 19,25" fill="#ef4444" stroke="#ffffff" strokeWidth="0.5" />
                <text x="19" y="23" fill="#ffffff" fontSize="3" fontWeight="bold" textAnchor="middle">3</text>

                {/* Digital Calibrated Meter LED on Side of Bowser */}
                <rect x="36" y="32" width="14" height="7" rx="1.5" fill="#090d16" stroke="#38bdf8" strokeWidth="0.6" />
                <text x="43" y="37" fill="#10b981" fontSize="4.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  {activeTab === 'delivered' ? `${fuelQty}.0L` : '0.00L'}
                </text>
              </g>

              {/* Truck Driver Cab (Front Section) */}
              <g transform="translate(48, 14)">
                {/* Cab Main 3D Shape */}
                <polygon points="0,12 18,3 32,11 14,20" fill="url(#truckCab)" />
                <polygon points="0,12 14,20 14,35 0,27" fill="#0369a1" />
                <polygon points="14,20 32,11 32,26 14,35" fill="#075985" />

                {/* Windshield Glass Tint */}
                <polygon points="15,18 29,11 29,18 15,25" fill="#38bdf8" fillOpacity="0.8" />
                <polygon points="3,15 12,20 12,27 3,22" fill="#38bdf8" fillOpacity="0.65" />

                {/* Front Chrome Grille */}
                <polygon points="30,22 32,21 32,25 30,26" fill="#cbd5e1" />
                <polygon points="30,24 32,23 32,27 30,28" fill="#94a3b8" />

                {/* Roof Amber Warning Strobe */}
                <circle cx="15" cy="8" r="3" fill="#f59e0b" filter="url(#vectorGlow)">
                  <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
                </circle>

                {/* Dual Xenon Headlight Projection Beams */}
                <polygon points="32,23 75,32 65,55 32,28" fill="url(#xenonBeam)" />
              </g>

              {/* Heavy-Duty Isometric 3D Wheels (6 wheels) */}
              {[
                { cx: 18, cy: 45 },
                { cx: 34, cy: 50 },
                { cx: 65, cy: 42 },
              ].map((w, idx) => (
                <g key={idx}>
                  {/* Outer Tyre */}
                  <ellipse cx={w.cx} cy={w.cy} rx="5.5" ry="8" fill="#020617" stroke="#334155" strokeWidth="0.8" />
                  {/* Alloy Rim */}
                  <ellipse cx={w.cx} cy={w.cy} rx="2.5" ry="4" fill="#94a3b8" />
                  <circle cx={w.cx} cy={w.cy} r="1" fill="#0f172a" />
                </g>
              ))}

              {/* Floating Live Telemetry HUD Tag above Bowser */}
              <g transform="translate(10, -18)">
                <rect
                  x="0"
                  y="0"
                  width="70"
                  height="16"
                  rx="8"
                  fill="#0b1120"
                  stroke={activeTab === 'delivered' ? '#10b981' : '#38bdf8'}
                  strokeWidth="1"
                  filter="url(#vectorGlow)"
                />
                <text
                  x="35"
                  y="11"
                  fill={activeTab === 'delivered' ? '#34d399' : '#e0f2fe'}
                  fontSize="7"
                  fontWeight="bold"
                  textAnchor="middle"
                  letterSpacing="0.04em"
                >
                  {activeTab === 'idle' && 'READY • STANDBY'}
                  {activeTab === 'loading' && 'CALIBRATING...'}
                  {activeTab === 'transit' && 'EN ROUTE • LIVE'}
                  {activeTab === 'delivered' && 'DISPATCH SUCCESS'}
                </text>
              </g>
            </g>

            {/* ======================================================== */}
            {/* STAGE 3: DESTINATION DOCK & CUSTOMER TERMINAL (RIGHT)    */}
            {/* ======================================================== */}
            <g transform="translate(420, 105)">
              {/* Ground Target Radar Rings (Concentric Pulsing Sonar Waves) */}
              <g transform="translate(45, 65)">
                <ellipse cx="0" cy="0" rx="36" ry="16" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.3">
                  <animate attributeName="rx" values="20;50" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="ry" values="9;22" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="0" cy="0" rx="22" ry="10" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.6">
                  <animate attributeName="rx" values="10;36" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                  <animate attributeName="ry" values="4;16" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                </ellipse>
                <circle cx="0" cy="0" r="3" fill="#38bdf8" filter="url(#vectorGlow)" />
              </g>

              {/* Customer 3D Vehicle */}
              <g transform="translate(15, 20)">
                {/* Vehicle Shadow */}
                <ellipse cx="38" cy="45" rx="35" ry="14" fill="#020617" opacity="0.6" />

                {/* Aerodynamic Luxury Sedan 3D Isometric Body */}
                <polygon points="12,22 36,10 65,22 42,34" fill="url(#luxuryCarGrad)" />
                <polygon points="0,32 35,46 72,32 40,18" fill="#4338ca" />
                <polygon points="0,32 35,46 35,53 0,39" fill="#312e81" />
                <polygon points="35,46 72,32 72,39 35,53" fill="#1e1b4b" />

                {/* Tinted Cockpit Glass */}
                <polygon points="20,24 35,17 52,24 38,30" fill="#38bdf8" fillOpacity="0.75" />
                {/* Windshield Reflection Sparkle */}
                <polygon points="24,23 32,19 44,24 36,27" fill="#ffffff" fillOpacity="0.5" />

                {/* Headlights & Taillights */}
                <polygon points="68,32 71,31 71,34 68,35" fill="#fef08a" />
                <polygon points="0,33 2,32 2,35 0,36" fill="#ef4444" />

                {/* Sedan Wheels */}
                {[
                  { cx: 16, cy: 46 },
                  { cx: 56, cy: 43 },
                ].map((cw, i) => (
                  <g key={i}>
                    <ellipse cx={cw.cx} cy={cw.cy} rx="5" ry="7.5" fill="#020617" />
                    <ellipse cx={cw.cx} cy={cw.cy} rx="2" ry="3.5" fill="#cbd5e1" />
                  </g>
                ))}
              </g>

              {/* Floating Holographic GPS Laser Target Beacon */}
              <g transform="translate(60, -10)">
                {/* Vertical Laser Beam Dropping to Ground */}
                <line
                  x1="0"
                  y1="-15"
                  x2="0"
                  y2="75"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="4,3"
                  opacity="0.75"
                >
                  <animate attributeName="stroke-dashoffset" values="0;20" dur="1s" repeatCount="indefinite" />
                </line>
                {/* Overhead Holographic GPS Satellite Badge */}
                <polygon points="0,-25 15,-15 0,-5 -15,-15" fill="#0b1120" stroke="#38bdf8" strokeWidth="1.5" filter="url(#vectorGlow)" />
                <circle cx="0" cy="-15" r="3" fill="#38bdf8" />
                <text x="0" y="-30" fill="#7dd3fc" fontSize="7" fontWeight="bold" textAnchor="middle">
                  GPS TARGET
                </text>
              </g>

              {/* Fueling Hose Connection in 'delivered' Phase */}
              {activeTab === 'delivered' && (
                <g transform="translate(-25, 30)">
                  {/* Flexible Hose Ribbon */}
                  <path
                    d="M -10,32 C 10,12 25,18 45,35"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Animated Flowing Emerald Fuel Droplets */}
                  <path
                    d="M -10,32 C 10,12 25,18 45,35"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                    strokeLinecap="round"
                    filter="url(#laserGlow)"
                  >
                    <animate attributeName="stroke-dashoffset" values="36;0" dur="0.8s" repeatCount="indefinite" />
                  </path>
                </g>
              )}

              {/* 3D COMPLETE VERIFICATION BADGE (DELIVERED STATE) */}
              {activeTab === 'delivered' && (
                <g transform="translate(-40, -35)">
                  <polygon
                    points="0,15 150,0 150,38 0,53"
                    fill="#0f172a"
                    stroke="#10b981"
                    strokeWidth="2"
                    filter="url(#laserGlow)"
                  />
                  {/* Verified Icon */}
                  <circle cx="24" cy="26" r="12" fill="#10b981" />
                  <path
                    d="M 18,26 L 22,30 L 30,21"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Text Details */}
                  <text x="44" y="24" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="sans-serif">
                    100% CALIBRATED
                  </text>
                  <text x="44" y="36" fill="#34d399" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
                    METER RECEIPT ISSUED
                  </text>
                </g>
              )}
            </g>

            {/* Stage Progress Waypoint Markers */}
            <g transform="translate(100, 240)">
              <text x="0" y="0" fill="#64748b" fontSize="8" fontWeight="bold">
                1. DEPOT DISPATCH
              </text>
              <text x="140" y="20" fill="#64748b" fontSize="8" fontWeight="bold">
                2. SMART ENERGY CORRIDOR
              </text>
              <text x="310" y="0" fill="#64748b" fontSize="8" fontWeight="bold">
                3. SITE CALIBRATION
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Telemetry Footer Info Bar */}
      <div className="lifecycle-telemetry-bar">
        <div className="telemetry-item">
          <i className="fa-solid fa-satellite-dish"></i>
          <span>GPS Telemetry: <strong>Active (Lahore Zone)</strong></span>
        </div>

        <div className="telemetry-item">
          <i className="fa-solid fa-gauge-high"></i>
          <span>Accuracy: <strong>Positive Displacement (0.01L)</strong></span>
        </div>

        <div className="telemetry-item">
          <i className="fa-solid fa-clock"></i>
          <span>Status: <strong>{currentConfig.subtext}</strong></span>
        </div>

        <div>
          <button
            type="button"
            className="simulation-trigger-btn"
            onClick={handleRunSimulation}
            disabled={isSimulating}
          >
            <i className={`fa-solid ${isSimulating ? 'fa-spinner fa-spin' : 'fa-play'}`}></i>
            {isSimulating ? 'Simulating 3D Flow...' : '⚡ Test 3D Simulation'}
          </button>
        </div>
      </div>
    </div>
  );
}
