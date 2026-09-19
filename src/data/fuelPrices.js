// Retail Petrol Pump Rate Markup: Flat +Rs. 2.50/L as per petrol pump retail rate
export const PUMP_RATE_MARKUP = 2.50;

// Centralized base rates (OGRA ex-depot baseline in Lahore)
export const FUEL_BASE_PRICES = {
  petrol: 384.34,
  diesel: 415.83,
  highOctane: 400.00,
  lpg: 258.65,
  water: 100.00, // Rs. 100.00 per gallon refill
};

// Centralized retail petrol pump prices in Lahore (Base + Rs. 2.50/L for petrol, diesel, high-octane)
export const FUEL_PRICES = {
  petrol: +(FUEL_BASE_PRICES.petrol + PUMP_RATE_MARKUP).toFixed(2),
  diesel: +(FUEL_BASE_PRICES.diesel + PUMP_RATE_MARKUP).toFixed(2),
  highOctane: +(FUEL_BASE_PRICES.highOctane + PUMP_RATE_MARKUP).toFixed(2),
  lpg: FUEL_BASE_PRICES.lpg,
  water: FUEL_BASE_PRICES.water,
};

export const FUEL_DISPLAY = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  highOctane: 'High-Octane',
  lpg: 'LPG Gas',
  water: 'Water Tanker',
};

export const FUEL_ICONS = {
  petrol: 'fa-gas-pump',
  diesel: 'fa-truck-droplet',
  highOctane: 'fa-bolt-lightning',
  lpg: 'fa-fire-burner',
  water: 'fa-droplet',
};
