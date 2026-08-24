export const FUEL_RATES = {
  petrol: 316.15,
  diesel: 354.35,
  highOctane: 448.00,
  lpg: 241.43,
  water: 100.00,
};

export const servicesB2C = [
  {
    icon: 'fa-gas-pump',
    title: 'On-Demand Doorstep Petrol & High-Octane',
    tag: 'B2C Consumer Refueling',
    desc: 'Pure, terminal-sourced Super Petrol (92 Octane) and High-Octane (97 Octane) delivered directly into your parked car or motorbike at home, office, or roadside in Lahore.',
    specs: [
      '1 to 10 Litres: Cash on Delivery (COD) supported',
      '10 to 200 Litres: Priority scheduled dispatch',
      'Electronic calibrated flow-meter digital receipt',
      'Zero petrol pump waiting time or nozzle short-fueling'
    ],
    fuelTypeKey: 'petrol'
  },
  {
    icon: 'fa-charging-station',
    title: 'Home & Commercial Generator Diesel Refueling',
    tag: 'Standby Generator Power',
    desc: 'Eliminate power outage downtime during unexpected grid load-shedding. Direct Euro-V diesel replenishment for residential estates, plazas, clinics, and backup generator tanks.',
    specs: [
      'Euro-V Low-Emission Diesel for engine longevity',
      'Direct tank filling with anti-spill safety nozzles',
      'Pre-scheduled replenishment before power cuts',
      'Transparent volumetric digital metering'
    ],
    fuelTypeKey: 'diesel'
  },
  {
    icon: 'fa-truck-medical',
    title: '24/7 Emergency Roadside Fuel Dispatch',
    tag: 'Emergency Response',
    desc: 'Stranded on the highway, Ring Road, or Lahore urban traffic with an empty fuel tank? Share your live GPS pin to receive emergency fuel within 45 minutes.',
    specs: [
      '45-minute rapid response time in covered areas',
      'Safety emergency cone perimeter setup',
      'Compact mobile refueler with certified fire suppression',
      'Cash on Delivery & online instant payment'
    ],
    fuelTypeKey: 'petrol'
  },
  {
    icon: 'fa-fire-burner',
    title: 'Doorstep LPG Gas Cylinder Refills & Swap',
    tag: 'Home & Commercial Gas',
    desc: 'Safety-certified and weight-verified sealed LPG gas cylinders delivered to your kitchen, restaurant, or outdoor catering setup with mandatory leak checks.',
    specs: [
      '5 kg, 11.8 kg, and 45.4 kg commercial cylinder sizes',
      '100% tare weight verified with digital scale at doorstep',
      'Pre-tested brass safety valve and rubber ring seals',
      'Old cylinder exchange or new connection installation'
    ],
    fuelTypeKey: 'lpg'
  },
  {
    icon: 'fa-droplet',
    title: 'Bulk Potable Water Tanker Refills',
    tag: 'Utility Supply',
    desc: 'High-purity domestic and commercial water tanker delivery across Lahore societies facing water supply interruptions or construction requirements.',
    specs: [
      'Flat Rs. 100 per gallon refill pricing model',
      'Chlorine-tested & TDS-verified clean water',
      'High-pressure pump hose for rooftop overhead tanks',
      'Same-day express dispatch across Lahore'
    ],
    fuelTypeKey: 'water'
  }
];

export const servicesB2B = [
  {
    icon: 'fa-truck-fast',
    title: 'Corporate Fleet Fuel Management',
    tag: 'B2B Commercial Logistics',
    desc: 'Centralize fuel operations for corporate fleets, courier vans, ride-sharing hubs, and distribution trucks. Night-time and shift-downtime refueling at your depot yard.',
    specs: [
      'Smart RFID fuel tags & driver verification',
      'Real-time cloud telemetry and consumption analytics',
      'Consolidated 15-day or 30-day corporate billing lines',
      'Eliminate driver petty cash theft and fake paper receipts'
    ],
    fuelTypeKey: 'diesel'
  },
  {
    icon: 'fa-screwdriver-wrench',
    title: 'Construction & Industrial Equipment Refueling',
    tag: 'Heavy Machinery',
    desc: 'On-site industrial diesel delivery directly into excavators, cranes, bulldozers, rollers, and paving machines on infrastructure projects without machinery downtime.',
    specs: [
      'All-terrain micro-bowser trucks with 100ft high-reach hoses',
      'HAZMAT-certified operators in flame-retardant gear',
      'High-throughput 60L/min dispensing pumps',
      'Daily site logs with timestamped volumetric proofs'
    ],
    fuelTypeKey: 'diesel'
  },
  {
    icon: 'fa-building-shield',
    title: 'Enterprise Standby Generator Supply Contracts',
    tag: 'Critical Infrastructure',
    desc: 'Guaranteed 24/7 diesel supply contracts for hospitals, data centers, telecom towers, banks, and production factories with priority emergency SLA guarantees.',
    specs: [
      '500 Litres to 10,000+ Litres single-order capacity',
      'OGRA laboratory certified density & purity certificates',
      'Dedicated standby dispatch bowsers on call 24/7',
      'Preventative fuel polishing and water separation checks'
    ],
    fuelTypeKey: 'diesel'
  }
];

export const whatWeProvide = [
  {
    icon: 'fa-certificate',
    title: '100% OGRA & Euro-V Certified Fuel',
    desc: 'Every liter of Petrol, High-Octane 97, and Diesel is directly pulled from primary oil marketing terminals with verified density, zero water content, and Euro-V emission compliance.'
  },
  {
    icon: 'fa-scale-balanced',
    title: 'Calibrated Electronic Flow Meters',
    desc: 'Dispensed through international-standard digital flow-meters with digital pulse encoders that guarantee exact volumetric measurement down to 0.01 Liter.'
  },
  {
    icon: 'fa-satellite-dish',
    title: 'Live GPS Fleet Tracking & 2-Hr Price Updates',
    desc: 'Real-time telemetry tracking of your assigned refueling truck with accurate ETA countdown and automated 2-hour market rate alerts directly on your phone.'
  },
  {
    icon: 'fa-shield-halved',
    title: 'Strict HAZMAT & NFPA 30A Safety Standards',
    desc: 'Double-walled steel bowsers, grounding anti-static earthing cables, automatic dry-break disconnect nozzles, and multi-class fire suppression units on all trucks.'
  },
  {
    icon: 'fa-file-invoice-dollar',
    title: 'Flexible Payment: COD & Corporate Invoicing',
    desc: 'Cash on Delivery (COD) for small household orders up to 10L/10kg, paired with 30-day corporate credit accounts and digital invoice reporting for enterprise fleets.'
  },
  {
    icon: 'fa-clock',
    title: '24/7 Lahore Citywide Service Coverage',
    desc: 'Uninterrupted round-the-clock delivery across DHA Phase 1-9, Gulberg, Johar Town, Model Town, Bahria Town, Cantt, Green Town, and industrial estates.'
  }
];

export const whatWeDoNotProvide = [
  {
    icon: 'fa-ban',
    title: 'NO Adulterated or Uncertified Fuel',
    desc: 'We strictly reject unbranded open-market fuel blending. We never supply fuel that does not meet national OGRA and Euro-V refining standards.'
  },
  {
    icon: 'fa-triangle-exclamation',
    title: 'NO Unsafe Manual Jerrycan Decanting',
    desc: 'We do not transport open hazardous cans or pour fuel through open funnels. All fuel is transferred via sealed, vapor-recovery electronic nozzles.'
  },
  {
    icon: 'fa-eye-slash',
    title: 'NO Uncalibrated / Estimated Billing',
    desc: 'We never guess or approximate volumes. Every customer receives an automated meter-generated receipt matching the exact flow counter.'
  },
  {
    icon: 'fa-user-xmark',
    title: 'NO Uncertified Third-Party Couriers',
    desc: 'We never outsource fuel handling to untrained bike couriers. Every refueler is a dedicated company vehicle operated by trained safety personnel.'
  },
  {
    icon: 'fa-money-bill-transfer',
    title: 'NO Hidden Surcharges on Official Rates',
    desc: 'We charge exact government OGRA notified pump prices for fuel, maintaining complete pricing transparency without inflated hidden premiums.'
  }
];

export const operationalPipeline = [
  {
    stage: '01',
    role: 'Customer',
    roleIcon: 'fa-user-check',
    title: 'Order Placement & Fuel Specification',
    desc: 'The customer selects their fuel grade (Euro-V Petrol, Diesel, Octane 97, LPG, or Water), enters quantity, pins exact coordinates on the map, and chooses delivery speed (Express 45-Min or Scheduled Slot).'
  },
  {
    stage: '02',
    role: 'Primary Depot',
    roleIcon: 'fa-warehouse',
    title: 'Depot & Rate Verification',
    desc: 'The central system matches the order against current 2026 OGRA fuel rates, checks batch quality certificates at the primary supply terminal, and logs the volumetric allocation.'
  },
  {
    stage: '03',
    role: 'Dispatch System',
    roleIcon: 'fa-route',
    title: 'Smart Dispatch & Route Optimization',
    desc: 'Our cloud dispatcher assigns the nearest mobile micro-bowser in Lahore (Gulberg, DHA, Johar Town, or Industrial Hub) to minimize transit time and carbon footprint.'
  },
  {
    stage: '04',
    role: 'Bowser Rider',
    roleIcon: 'fa-truck-droplet',
    title: 'Rider Transit with Live GPS Telemetry',
    desc: 'A certified HAZMAT driver departs in a double-walled safety bowser. The customer tracks the truck’s live movement and arrival countdown on their screen.'
  },
  {
    stage: '05',
    role: 'Safety Refueling',
    roleIcon: 'fa-shield-heart',
    title: 'Anti-Static Grounding & Meter Dispensing',
    desc: 'Upon arrival, the operator connects an earthing grounding cable to prevent static discharge, inserts the dry-break nozzle into the fuel tank, and pumps the exact volume.'
  },
  {
    stage: '06',
    role: 'Settlement',
    roleIcon: 'fa-receipt',
    title: 'Calibrated Receipt & Payment Processing',
    desc: 'A digital flow-meter receipt with exact liters and price is printed and sent via SMS/App. Payment is completed via Cash on Delivery (COD) or corporate fleet account.'
  }
];

export const steps = [
  {
    number: '1',
    icon: 'fa-map-pin',
    title: 'Pin Delivery Location',
    desc: 'Choose your fuel type, specify volume in liters, and pin your vehicle or generator location on our map.'
  },
  {
    number: '2',
    icon: 'fa-clock-rotate-left',
    title: 'Select Delivery Speed',
    desc: 'Choose instant 45-minute express dispatch or schedule refueling during convenient vehicle downtime.'
  },
  {
    number: '3',
    icon: 'fa-truck-arrow-right',
    title: 'Track Live Bowser',
    desc: 'Track your certified mobile bowser truck live via GPS telemetry from the nearest regional Lahore hub.'
  },
  {
    number: '4',
    icon: 'fa-receipt',
    title: 'Grounded Flow Metering',
    desc: 'Receive calibrated Euro-V fuel with printed volumetric receipt and pay via Cash on Delivery or fleet account.'
  }
];

export const serviceArticles = [
  {
    id: 'art-telemetry',
    badge: 'Fuel Engineering & Quality Assurance',
    badgeIcon: 'fa-microchip',
    title: 'The Science of On-Demand Refueling: How Calibrated Telemetry Bowsers Prevent Adulteration & Short-Fueling',
    readTime: '6 min read',
    summary: 'Explore how Zyphuel’s double-walled micro-tankers, positive-displacement flow meters, and terminal-sourced Euro-V fuels protect modern engine injectors and guarantee 100% volumetric honesty.',
    paragraphs: [
      'In traditional retail fuel distribution, motorists and fleet managers frequently face two persistent issues: adulterated fuel mixed with low-density solvents and mechanical pump meter tampering leading to short-fueling. These discrepancies cost businesses millions of rupees annually in unnecessary engine maintenance and inflated fuel bills.',
      'Zyphuel solves this through an end-to-end closed-loop telemetry system. All fuel is loaded directly from certified primary oil marketing terminals into sealed, vapor-recovered compartments. Before dispensing, our electronic flow meters run self-calibration checks against density tables, ensuring that every drop delivered into your vehicle or generator matches official OGRA standards.',
      'By bringing calibrated fueling directly to vehicle parking spaces and generator bays, clients completely eliminate detour fuel waste, driver queue idling, and fuel shrinkage.'
    ]
  },
  {
    id: 'art-generator',
    badge: 'Enterprise Business Continuity',
    badgeIcon: 'fa-bolt',
    title: 'Emergency Generator Diesel Refueling in Lahore: Eliminating Corporate Downtime During Load-Shedding',
    readTime: '5 min read',
    summary: 'How hospitals, IT data centers, banks, and factories in Lahore maintain 100% uptime with automated standby generator diesel delivery contracts.',
    paragraphs: [
      'During unexpected power grid interruptions and load-shedding cycles across Punjab, standby diesel generators serve as the primary lifeline for commercial plazas, production facilities, and healthcare institutions. However, manually transporting heavy diesel drums in open vehicles violates HAZMAT safety rules and creates severe fire hazards.',
      'Zyphuel’s commercial generator diesel service provides specialized bowsers fitted with 100-foot high-pressure hoses capable of reaching rooftop generator sets, underground tanks, and acoustic enclosures. With automated recurring delivery schedules, facility managers never have to scramble for emergency fuel during sudden blackouts.',
      'Our low-emission Euro-V diesel ensures clean combustion, preventing particulate filter clogging and maximizing alternator efficiency.'
    ]
  },
  {
    id: 'art-fleet-roi',
    badge: 'B2B Fleet Optimization',
    badgeIcon: 'fa-chart-line',
    title: 'Corporate Fleet Refueling ROI: Why Lahore Logistics Companies Are Abandoning Traditional Petrol Pumps',
    readTime: '5 min read',
    summary: 'A financial breakdown of how overnight yard refueling reduces operational overhead, eliminates fuel fraud, and saves over 180 driver-hours per month.',
    paragraphs: [
      'When commercial distribution vans, courier fleets, or corporate cars visit retail petrol stations daily, each vehicle wastes an average of 25 to 40 minutes in transit, traffic congestion, and pump queues. Multiplied across a fleet of 20 vehicles, this translates to over 200 lost operational hours every month.',
      'Zyphuel’s Fleet Fuel Management service refuels entire vehicle pools during non-operating night shifts or shift changes directly inside your secure parking yard. Each vehicle is identified via RFID smart tags, and the exact volume pumped is immediately uploaded to your enterprise portal.',
      'With transparent monthly statement reconciliation and zero paper slip leakage, corporate fleets achieve up to 14% net savings in overall fuel expenditures.'
    ]
  }
];
