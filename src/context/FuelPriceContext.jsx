import { createContext, useContext, useState, useEffect } from 'react';
import { FUEL_PRICES, FUEL_BASE_PRICES, PUMP_RATE_MARKUP } from '../data/fuelPrices.js';

const FuelPriceContext = createContext();

const DEFAULT_PRICES = FUEL_PRICES;
const DEFAULT_BASE_PRICES = FUEL_BASE_PRICES;

// ---------------------------------------------------------------------------
// Price source URLs — tried in order. The self-hosted JSON is deployed with
// the site itself (no CORS issues, no third-party dependency). Trackmate is
// kept as a secondary source in case it comes back online.
// ---------------------------------------------------------------------------
const SELF_HOSTED_URL = '/fuelPricesLive.json';
const TRACKMATE_URL = 'https://fuel.trackmate.page/api/prices';
const ALLORIGINS_PROXY = (url) =>
  `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

export function FuelPriceProvider({ children }) {
  const [prices, setPrices] = useState(DEFAULT_PRICES);
  const [basePrices, setBasePrices] = useState(DEFAULT_BASE_PRICES);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [priceSource, setPriceSource] = useState('fallback');

  // Restore from sessionStorage on mount (SSR-safe)
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem('zyphuel_live_prices');
      if (cached) {
        const parsed = JSON.parse(cached);
        const isValid = Date.now() - (parsed.timestamp || 0) < 15 * 60 * 1000;
        if (isValid) {
          if (parsed.prices) setPrices({ ...DEFAULT_PRICES, ...parsed.prices });
          if (parsed.basePrices) setBasePrices({ ...DEFAULT_BASE_PRICES, ...parsed.basePrices });
          if (parsed.isLive !== undefined) setIsLive(Boolean(parsed.isLive));
          if (parsed.effectiveDate) setEffectiveDate(parsed.effectiveDate);
          if (parsed.priceSource) setPriceSource(parsed.priceSource);
        }
      }
    } catch (e) { /* sessionStorage unavailable during SSR */ }
  }, []);

  useEffect(() => {
    let isMounted = true;

    // ----- helpers -----
    function applyBasePrices(base, source, date) {
      if (!isMounted) return;

      const pumpUpdated = {
        petrol: +(base.petrol + PUMP_RATE_MARKUP).toFixed(2),
        diesel: +(base.diesel + PUMP_RATE_MARKUP).toFixed(2),
        highOctane: +(base.highOctane + PUMP_RATE_MARKUP).toFixed(2),
        lpg: base.lpg ?? 450.00,
        water: base.water ?? DEFAULT_BASE_PRICES.water,
      };

      setBasePrices(base);
      setPrices(pumpUpdated);
      setIsLive(true);
      setPriceSource(source);
      if (date) setEffectiveDate(date);
      setLastUpdated(new Date().toISOString());

      try {
        sessionStorage.setItem('zyphuel_live_prices', JSON.stringify({
          prices: pumpUpdated,
          basePrices: base,
          pumpMarkup: PUMP_RATE_MARKUP,
          isLive: true,
          effectiveDate: date,
          priceSource: source,
          timestamp: Date.now(),
        }));
      } catch (e) { /* quota / SSR */ }
    }

    // ----- Source 1: Self-hosted fuelPricesLive.json -----
    async function trySelfHosted() {
      try {
        const res = await fetch(SELF_HOSTED_URL, {
          cache: 'no-cache',
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) return false;
        const data = await res.json();
        if (!data?.prices) return false;

        // Validate that prices are sane numbers (> 50, < 1000 PKR/L)
        const p = data.prices;
        if (typeof p.petrol !== 'number' || p.petrol < 50 || p.petrol > 1000) return false;

        const base = {
          petrol: p.petrol,
          diesel: p.diesel ?? DEFAULT_BASE_PRICES.diesel,
          highOctane: p.highOctane ?? DEFAULT_BASE_PRICES.highOctane,
          lpg: p.lpg ?? 450.00,
          water: DEFAULT_BASE_PRICES.water,
        };

        applyBasePrices(base, 'self-hosted', data.lastUpdated || null);
        return true;
      } catch (e) {
        console.warn('[FuelPrice] Self-hosted JSON fetch failed:', e.message);
        return false;
      }
    }

    // ----- Source 2: Trackmate API (direct) -----
    async function tryTrackmate() {
      try {
        const res = await fetch(TRACKMATE_URL, {
          headers: { Accept: 'application/json' },
          cache: 'no-cache',
        });
        if (!res.ok) return false;
        const data = await res.json();
        if (!data?.prices || !Array.isArray(data.prices)) return false;
        return parseTrackmatePayload(data.prices);
      } catch (e) {
        console.warn('[FuelPrice] Trackmate direct fetch failed:', e.message);
        return false;
      }
    }

    // ----- Source 3: Trackmate via AllOrigins CORS proxy -----
    async function tryTrackmateProxy() {
      try {
        const res = await fetch(ALLORIGINS_PROXY(TRACKMATE_URL));
        if (!res.ok) return false;
        const wrapper = await res.json();
        const data = JSON.parse(wrapper.contents);
        if (!data?.prices || !Array.isArray(data.prices)) return false;
        return parseTrackmatePayload(data.prices);
      } catch (e) {
        console.warn('[FuelPrice] AllOrigins proxy fetch failed:', e.message);
        return false;
      }
    }

    function parseTrackmatePayload(priceList) {
      const petrolItem = priceList.find(p => p.product === 'petrol' && (p.source === 'pso' || !p.source))
        || priceList.find(p => p.product === 'petrol');
      const dieselItem = priceList.find(p => p.product === 'hsd' && (p.source === 'pso' || !p.source))
        || priceList.find(p => p.product === 'hsd');
      const octaneItem = priceList.find(p => p.product === 'octane_plus' && p.city?.toLowerCase() === 'lahore')
        || priceList.find(p => p.product === 'octane_plus');

      if (!petrolItem || isNaN(Number(petrolItem.price_pkr))) return false;

      const dateItem = priceList.find(p => p.effective_date);
      const base = {
        petrol: Number(petrolItem.price_pkr),
        diesel: dieselItem ? Number(dieselItem.price_pkr) : DEFAULT_BASE_PRICES.diesel,
        highOctane: octaneItem ? Number(octaneItem.price_pkr) : DEFAULT_BASE_PRICES.highOctane,
        lpg: 450.00,
        water: DEFAULT_BASE_PRICES.water,
      };

      applyBasePrices(base, 'trackmate', dateItem?.effective_date || null);
      return true;
    }

    // ----- Waterfall: try each source in order -----
    async function loadPrices() {
      const ok =
        (await trySelfHosted()) ||
        (await tryTrackmate()) ||
        (await tryTrackmateProxy());

      if (!ok && isMounted) {
        // All live sources failed — stick with hardcoded defaults from fuelPrices.js
        console.info('[FuelPrice] All live sources failed. Using hardcoded fallback prices.');
        setPriceSource('fallback');
      }

      if (isMounted) setLoading(false);
    }

    loadPrices();
    return () => { isMounted = false; };
  }, []);

  return (
    <FuelPriceContext.Provider
      value={{
        prices,
        basePrices,
        pumpMarkup: PUMP_RATE_MARKUP,
        loading,
        isLive,
        effectiveDate,
        lastUpdated,
        priceSource,
      }}
    >
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
