/**
 * Zyphuel Order Guard Plugin (ES Module)
 *
 * Strict 10:00 PM – 8:00 AM PKT Order Cutoff Controller.
 *
 * Scope: the guard only has work to do where an order button can exist. Running its
 * 5 s interval on every route, and shipping the browser plugin to pages without a
 * submit button, cost measurable main-thread time (Lighthouse audit 2026-10-28).
 * Everything here now starts on /order/ and stops again when the route changes.
 */
export const ORDER_GUARD_CONFIG = {
  timezone: 'Asia/Karachi',
  cutoffStartHour: 22, // 10:00 PM
  cutoffEndHour: 8,    // 8:00 AM
  whatsappHelpline: '+92 3230-112464'
};

const GUARD_SCRIPT_ID = 'zyphuel-order-guard-script';
const GUARD_SCRIPT_SRC = '/plugins/zyphuel-order-guard/zyphuel-order-guard.js';

export function getKarachiHour() {
  try {
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: ORDER_GUARD_CONFIG.timezone,
      hour: 'numeric',
      hour12: false
    });
    return parseInt(dtf.format(new Date()), 10);
  } catch (e) {
    const now = new Date();
    return (now.getUTCHours() + 5) % 24;
  }
}

export function isNightCutoffActive() {
  const hour = getKarachiHour();
  return hour >= ORDER_GUARD_CONFIG.cutoffStartHour || hour < ORDER_GUARD_CONFIG.cutoffEndHour;
}

export function isOrderRoute() {
  if (typeof window === 'undefined') return false;
  return /^\/order(\/|$)/.test(window.location.pathname || '');
}

/**
 * Load the standalone browser plugin on demand. It is no longer referenced from
 * index.html, so a first visit to /order/ injects it here.
 */
function ensureGuardScript() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(GUARD_SCRIPT_ID)) return;

  const script = document.createElement('script');
  script.id = GUARD_SCRIPT_ID;
  script.src = GUARD_SCRIPT_SRC;
  script.defer = true;
  document.head.appendChild(script);
}

export function initOrderGuardPlugin() {
  if (typeof window === 'undefined') return () => {};

  const enforce = () => {
    const cutoff = isNightCutoffActive();
    if (cutoff) {
      document.body?.classList.add('zyphuel-night-cutoff-active');
      const submitBtns = document.querySelectorAll('#truck-submit-btn, .truck-button, .sandbox-truck-button');
      submitBtns.forEach((btn) => {
        btn.style.setProperty('display', 'none', 'important');
        btn.style.setProperty('visibility', 'hidden', 'important');
        btn.style.setProperty('pointer-events', 'none', 'important');
      });
    } else {
      document.body?.classList.remove('zyphuel-night-cutoff-active');
    }
  };

  let timer = null;

  const start = () => {
    ensureGuardScript();
    enforce();
    if (!timer) timer = setInterval(enforce, 5000);
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    document.body?.classList.remove('zyphuel-night-cutoff-active');
  };

  const sync = () => {
    if (isOrderRoute()) start();
    else stop();
  };

  sync();

  // Keep the guard attached across client-side navigation.
  ['pushState', 'replaceState'].forEach((method) => {
    const original = window.history && window.history[method];
    if (typeof original !== 'function') return;
    window.history[method] = function patchedHistoryMethod() {
      const result = original.apply(this, arguments);
      try { sync(); } catch (e) { /* never break navigation */ }
      return result;
    };
  });

  const onPopState = () => {
    try { sync(); } catch (e) { /* never break navigation */ }
  };
  window.addEventListener('popstate', onPopState);

  return () => {
    stop();
    window.removeEventListener('popstate', onPopState);
  };
}
