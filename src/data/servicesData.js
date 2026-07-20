export const FUEL_RATES = {
  petrol: 316.15,
  diesel: 354.35,
  highOctane: 448.00,
};

export const servicesB2C = [
  {
    icon: 'fa-gas-pump',
    title: 'On-Demand Petrol & Octane',
    tag: 'B2C Consumer',
    desc: 'Get clean, terminal-sourced Petrol or High-Octane delivered directly to your vehicle\'s fuel tank at home, office, or roadside.',
    specs: ['5-10 Litres: Cash on Delivery (COD)', 'Over 10 Litres: Advance Payment', 'Limited staff: Book prior slot'],
    fuelTypeKey: 'petrol'
  },
  {
    icon: 'fa-charging-station',
    title: 'Backup Generator Diesel',
    tag: 'B2C Consumer',
    desc: 'Ensure continuous electricity during load shedding. We deliver premium diesel directly to your home or estate generator tanks.',
    specs: ['5-10 Litres: Cash on Delivery (COD)', 'Over 10 Litres: Advance Payment', 'Scheduled slots via limited dispatch'],
    fuelTypeKey: 'diesel'
  },
  {
    icon: 'fa-truck-medical',
    title: 'Emergency Roadside Refuel',
    tag: 'B2C Consumer',
    desc: 'Ran out of fuel on the road? Send your coordinates via the app. Our dispatch rider will reach you in under 40 minutes.',
    specs: ['Emergency priority fee applies', '5-10 Litres: COD accepted', 'Over 10 Litres: Advance Pay'],
    fuelTypeKey: 'highOctane'
  }
];

export const servicesB2B = [
  {
    icon: 'fa-truck-fast',
    title: 'Fleet Fuel Management',
    tag: 'B2B Enterprise',
    desc: 'Optimize operational logistics. We refuel your corporate delivery fleets, distribution vans, and rentals overnight at your yards.',
    specs: ['Custom scheduling dashboards', 'Volume telemetry logs', 'Consolidated monthly billing'],
    fuelTypeKey: 'diesel'
  },
  {
    icon: 'fa-screwdriver-wrench',
    title: 'Construction Site Fueling',
    tag: 'B2B Enterprise',
    desc: 'Keep heavy machinery running without transport delays. We deliver industrial-grade diesel directly to excavators and site rollers.',
    specs: ['All-terrain tanker trucks', 'HAZMAT certified operators', 'High-volume pump nozzles'],
    fuelTypeKey: 'diesel'
  },
  {
    icon: 'fa-building-shield',
    title: 'B2B Bulk Tanker Supply',
    tag: 'B2B Enterprise',
    desc: 'Bulk fuel logistics for manufacturing plants, data centers, hospitals, and educational institutes. Scheduled large-volume deliveries.',
    specs: ['500L to 10,000L capacity', 'Lab certified fuel quality', 'Direct terminal dispatch'],
    fuelTypeKey: 'diesel'
  }
];

export const steps = [
  {
    number: '1',
    icon: 'fa-map-pin',
    title: 'Pin Location',
    desc: 'Select your fuel type, input volume, and pin your refueling coordinates on our map.'
  },
  {
    number: '2',
    icon: 'fa-clock-rotate-left',
    title: 'Select Schedule',
    desc: 'Choose express delivery (within 45 mins) or schedule it for a convenient hour.'
  },
  {
    number: '3',
    icon: 'fa-truck-arrow-right',
    title: 'Rider Dispatched',
    desc: 'Our micro-tanker leaves the nearest regional hub equipped with safety gear.'
  },
  {
    number: '4',
    icon: 'fa-receipt',
    title: 'Digital Refuel',
    desc: 'Exact volume is pumped, synced to your app telemetry, and billed digitally.'
  }
];
