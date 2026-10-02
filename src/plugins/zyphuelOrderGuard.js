/**
 * Zyphuel Order Guard Plugin (ES Module)
 * 
 * Strict 10:00 PM – 8:00 AM PKT Order Cutoff Controller.
 */
export const ORDER_GUARD_CONFIG = {
  timezone: 'Asia/Karachi',
  cutoffStartHour: 22, // 10:00 PM
  cutoffEndHour: 8,    // 8:00 AM
  whatsappHelpline: '+92 3230-112464'
};

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

export function initOrderGuardPlugin() {
  if (typeof window === 'undefined') return;

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

  // Run on mount and every 5 seconds
  enforce();
  const timer = setInterval(enforce, 5000);
  return () => clearInterval(timer);
}
