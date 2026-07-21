import { createContext, useContext, useState, useEffect } from 'react';

const FuelPriceContext = createContext();

const DEFAULT_PRICES = {
  petrol: 315.80,
  diesel: 360.06,
  highOctane: 448.00,
  lpg: 241.43,
  water: 100.00,
};

export function FuelPriceProvider({ children }) {
  const [prices, setPrices] = useState(DEFAULT_PRICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPrices() {
      // Step 1: Try Direct Fetch
      try {
        const response = await fetch('https://fuel.trackmate.page/api/prices');
        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data.prices) && isMounted) {
            updatePricesFromData(data.prices);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Direct fetch failed, trying CORS proxy fallback...', err);
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
      const petrolItem = priceList.find(p => p.product === 'petrol');
      const dieselItem = priceList.find(p => p.product === 'hsd');
      const lpgItem = priceList.find(p => p.product === 'lpg');
      
      // Look for octane_plus (prefer Lahore, otherwise first available)
      const octaneItem = priceList.find(p => p.product === 'octane_plus' && p.city === 'Lahore') || 
                          priceList.find(p => p.product === 'octane_plus');

      const updated = { ...DEFAULT_PRICES };
      
      if (petrolItem) updated.petrol = Number(petrolItem.price_pkr);
      if (dieselItem) updated.diesel = Number(dieselItem.price_pkr);
      if (lpgItem) updated.lpg = Number(lpgItem.price_pkr);
      if (octaneItem) updated.highOctane = Number(octaneItem.price_pkr);

      setPrices(updated);
    }

    loadPrices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <FuelPriceContext.Provider value={{ prices, loading }}>
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
