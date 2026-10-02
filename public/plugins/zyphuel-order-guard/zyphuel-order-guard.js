/**
 * Zyphuel Order Guard Plugin (v2.0.0 - Browser & SPA Edition)
 * 
 * Strict 10:00 PM (22:00) to 8:00 AM (08:00) PKT Order Intake Cutoff Enforcement.
 * This plugin runs directly in the browser across all pages, continuously monitoring
 * Asia/Karachi time. During cutoff hours, it unconditionally suppresses and removes
 * any order submission triggers (.truck-button, #truck-submit-btn).
 * 
 * Author: Zyphuel Engineering
 * Timezone: Asia/Karachi (PKT)
 */
(function () {
  'use strict';

  var PLUGIN_NAME = 'Zyphuel Order Guard Plugin';
  var VERSION = '2.0.0';
  var TIMEZONE = 'Asia/Karachi';
  var CUTOFF_START_HOUR = 22; // 10:00 PM PKT
  var CUTOFF_END_HOUR = 8;    // 8:00 AM PKT
  var WHATSAPP_HELPLINE = '+92 3230-112464';

  function getKarachiHour() {
    try {
      var dtf = new Intl.DateTimeFormat('en-US', {
        timeZone: TIMEZONE,
        hour: 'numeric',
        hour12: false
      });
      return parseInt(dtf.format(new Date()), 10);
    } catch (e) {
      // Fallback: calculate UTC + 5 hours
      var now = new Date();
      var utcHours = now.getUTCHours();
      return (utcHours + 5) % 24;
    }
  }

  function getKarachiTimeFormatted() {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: TIMEZONE,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(new Date());
    } catch (e) {
      return new Date().toLocaleTimeString();
    }
  }

  function isNightCutoffActive() {
    var hour = getKarachiHour();
    return (hour >= CUTOFF_START_HOUR || hour < CUTOFF_END_HOUR);
  }

  var styleInjected = false;
  function injectGuardStyles() {
    if (styleInjected) return;
    var existing = document.getElementById('zyphuel-order-guard-strict-style');
    if (existing) {
      styleInjected = true;
      return;
    }

    var style = document.createElement('style');
    style.id = 'zyphuel-order-guard-strict-style';
    style.textContent = [
      '/* [Zyphuel Order Guard Plugin] Night Cutoff Enforcement */',
      'body.zyphuel-night-cutoff-active #truck-submit-btn,',
      'body.zyphuel-night-cutoff-active .truck-button,',
      'body.zyphuel-night-cutoff-active .sandbox-truck-button,',
      'body.zyphuel-night-cutoff-active [data-testid="truck-submit-btn"],',
      'body.zyphuel-night-cutoff-active .qa-sandbox-checkout-path {',
      '  display: none !important;',
      '  visibility: hidden !important;',
      '  pointer-events: none !important;',
      '  opacity: 0 !important;',
      '  height: 0 !important;',
      '  width: 0 !important;',
      '  margin: 0 !important;',
      '  padding: 0 !important;',
      '  border: none !important;',
      '}'
    ].join('\n');

    (document.head || document.documentElement).appendChild(style);
    styleInjected = true;
  }

  function removeGuardStyles() {
    var style = document.getElementById('zyphuel-order-guard-strict-style');
    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }
    styleInjected = false;
  }

  function enforceCutoff() {
    var isCutoff = isNightCutoffActive();
    var body = document.body;

    if (isCutoff) {
      injectGuardStyles();
      if (body && !body.classList.contains('zyphuel-night-cutoff-active')) {
        body.classList.add('zyphuel-night-cutoff-active');
      }

      // Hard suppression: Physically remove any submit button on /order
      var btns = document.querySelectorAll('#truck-submit-btn, .truck-button, .sandbox-truck-button, [data-testid="truck-submit-btn"]');
      for (var i = 0; i < btns.length; i++) {
        var btn = btns[i];
        if (btn.parentNode) {
          // Replace or hide with explicit inline styles
          btn.style.setProperty('display', 'none', 'important');
          btn.style.setProperty('visibility', 'hidden', 'important');
          btn.style.setProperty('pointer-events', 'none', 'important');
        }
      }

      var sandboxCards = document.querySelectorAll('.qa-sandbox-checkout-path, #qa-sandbox-checkout-path');
      for (var j = 0; j < sandboxCards.length; j++) {
        sandboxCards[j].style.setProperty('display', 'none', 'important');
      }
    } else {
      if (body && body.classList.contains('zyphuel-night-cutoff-active')) {
        body.classList.remove('zyphuel-night-cutoff-active');
      }
      removeGuardStyles();
    }
  }

  // Intercept any programmatic form submissions on order forms during cutoff
  function setupSubmissionInterceptor() {
    document.addEventListener('submit', function (e) {
      if (isNightCutoffActive()) {
        var form = e.target;
        if (form && (form.classList.contains('order-form') || form.closest('.order-form-container'))) {
          e.preventDefault();
          e.stopImmediatePropagation();
          alert('Online doorstep fuel orders close strictly at 10:00 PM PKT. Orders reopen tomorrow at 8:00 AM PKT.\n\nFor emergency generator refueling, please contact our 24/7 WhatsApp helpline: ' + WHATSAPP_HELPLINE);
          return false;
        }
      }
    }, true);
  }

  // Initialize MutationObserver to catch dynamically rendered buttons by React
  function observeDOM() {
    if (typeof MutationObserver !== 'undefined') {
      var observer = new MutationObserver(function () {
        if (isNightCutoffActive()) {
          enforceCutoff();
        }
      });
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
  }

  function init() {
    enforceCutoff();
    setupSubmissionInterceptor();
    observeDOM();

    // Check every 5 seconds to smoothly transition at 10:00 PM and 8:00 AM
    setInterval(enforceCutoff, 5000);

    var currentPKT = getKarachiTimeFormatted();
    var status = isNightCutoffActive() ? 'LOCKED (10:00 PM – 8:00 AM Night Cutoff Active)' : 'OPEN (Accepting Orders)';
    console.log(
      '%c[' + PLUGIN_NAME + ' v' + VERSION + ']%c Current PKT Time: ' + currentPKT + ' | Status: ' + status,
      'background: #ea580c; color: #fff; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
      'color: #38bdf8; font-weight: 600;'
    );
  }

  // Expose global controller
  window.ZyphuelOrderGuard = {
    name: PLUGIN_NAME,
    version: VERSION,
    timezone: TIMEZONE,
    isNightCutoffActive: isNightCutoffActive,
    getKarachiHour: getKarachiHour,
    getKarachiTimeFormatted: getKarachiTimeFormatted,
    enforce: enforceCutoff,
    helpline: WHATSAPP_HELPLINE
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
