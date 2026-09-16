import { createContext, useContext, useState, useEffect } from 'react';
import { FUEL_PRICES } from '../data/fuelPrices.js';

const FuelPriceContext = createContext();

const DEFAULT_PRICES = FUEL_PRICES;

export function FuelPriceProvider({ children }) {
  // Initialize state with sessionStorage cache if available to prevent flash of fallback values
  const [prices, setPrices] = useState(() => {
    try {
      const cached = sessionStorage.getItem('zyphuel_live_prices');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.prices && Date.now() - (parsed.timestamp || 0) < 15 * 60 * 1000) {
          return { ...DEFAULT_PRICES, ...parsed.prices };
        }
      }
    } catch (e) {}
    return DEFAULT_PRICES;
  });

  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(() => {
    try {
      const cached = sessionStorage.getItem('zyphuel_live_prices');
      if (cached) {
        const parsed = JSON.parse(cached);
        return Boolean(parsed?.isLive && Date.now() - (parsed.timestamp || 0) < 15 * 60 * 1000);
      }
    } catch (e) {}
    return false;
  });
  const [effectiveDate, setEffectiveDate] = useState(() => {
    try {
      const cached = sessionStorage.getItem('zyphuel_live_prices');
      if (cached) {
        const parsed = JSON.parse(cached);
        return parsed?.effectiveDate || null;
      }
    } catch (e) {}
    return null;
  });
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPrices() {
      // Step 1: Try Direct Fetch (API supports CORS: Access-Control-Allow-Origin: *)
      try {
        const response = await fetch('https://fuel.trackmate.page/api/prices', {
          headers: { 'Accept': 'application/json' },
          cache: 'no-cache'
        });
        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data.prices) && isMounted) {
            updatePricesFromData(data.prices);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Direct fetch to trackmate API failed, trying CORS proxy fallback...', err);
      }

      // Step 2: Try CORS Proxy Fallback (AllOrigins)
      try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://fuel.trackmate.page/api/prices')}`;
        const response = await fetch(proxyUrl);
        if (response.ok) {
          const wrapper = await response.json();
          const data = JSON.parse(wrapper.contents);
          if (data && Array.isArray(data.prices) && isMounted) {
            updatePricesFromData(data.prices);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error('AllOrigins CORS proxy fetch failed as well.', err);
      }

      if (isMounted) {
        setLoading(false);
      }
    }

    function updatePricesFromData(priceList) {
      // Find products
      const petrolItem = priceList.find(p => p.product === 'petrol' && (p.source === 'pso' || !p.source)) ||
                         priceList.find(p => p.product === 'petrol');
      const dieselItem = priceList.find(p => p.product === 'hsd' && (p.source === 'pso' || !p.source)) ||
                         priceList.find(p => p.product === 'hsd');
      const lpgItem = priceList.find(p => p.product === 'lpg');
      
      // Look for octane_plus (prefer Lahore, otherwise first available)
      const octaneItem = priceList.find(p => p.product === 'octane_plus' && p.city?.toLowerCase() === 'lahore') || 
                         priceList.find(p => p.product === 'octane_plus');

      // Find effective_date from any item that has it
      const dateItem = priceList.find(p => p.effective_date);
      const foundDate = dateItem ? dateItem.effective_date : null;
      const scrapedAt = petrolItem?.scraped_at || dieselItem?.scraped_at || new Date().toISOString();

      const updated = { ...DEFAULT_PRICES };
      
      // Override default prices with live verified market rates from API
      if (petrolItem && !isNaN(Number(petrolItem.price_pkr))) {
        updated.petrol = Number(petrolItem.price_pkr);
      }
      if (dieselItem && !isNaN(Number(dieselItem.price_pkr))) {
        updated.diesel = Number(dieselItem.price_pkr);
      }
      if (lpgItem && !isNaN(Number(lpgItem.price_pkr))) {
        updated.lpg = Number(lpgItem.price_pkr);
      }
      if (octaneItem && !isNaN(Number(octaneItem.price_pkr))) {
        updated.highOctane = Number(octaneItem.price_pkr);
      }

      setPrices(updated);
      setIsLive(true);
      if (foundDate) setEffectiveDate(foundDate);
      setLastUpdated(scrapedAt);

      // Cache in sessionStorage so navigation across pages is instantaneous and preserves rate limits
      try {
        sessionStorage.setItem('zyphuel_live_prices', JSON.stringify({
          prices: updated,
          isLive: true,
          effectiveDate: foundDate,
          lastUpdated: scrapedAt,
          timestamp: Date.now()
        }));
      } catch (e) {}
    }

    loadPrices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <FuelPriceContext.Provider value={{ prices, loading, isLive, effectiveDate, lastUpdated }}>
      {children}
    </FuelPriceContext.Provider>
  );
}

export function useFuelPrices() {
  const context = useContext(FuelPriceContext);
  if (!context) {
    throw new Error('useFuelPrices must be used within a FuelPriceProvider');
  }
  return context;
}
