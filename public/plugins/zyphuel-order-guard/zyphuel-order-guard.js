/**
 * Zyphuel Order Guard Plugin (v2.1.0 - Route-Scoped Browser Edition)
 *
 * Strict 10:00 PM (22:00) to 8:00 AM (08:00) PKT Order Intake Cutoff Enforcement.
 *
 * v2.1.0 — route-scoped. The previous version installed a subtree MutationObserver
 * and a 5 s interval on EVERY page and formatted an Intl date on every DOM mutation
 * batch. On a 757-element page that produced a single 606 ms blocking task plus
 * 742 ms of bootup on pages that have no order button at all (Lighthouse audit,
 * 2026-10-28). The enforcement machinery now starts only on /order/ and stops when
 * the route changes, while the public API stays available everywhere.
 *
 * Server-side enforcement (plugins/zyphuel-order-guard/zyphuel-order-guard.php,
 * Vite dev middleware) is unchanged and remains the authoritative guard.
 *
 * Author: Zyphuel Engineering
 * Timezone: Asia/Karachi (PKT)
 */
(function () {
  'use strict';

  var PLUGIN_NAME = 'Zyphuel Order Guard Plugin';
  var VERSION = '2.1.0';
  var TIMEZONE = 'Asia/Karachi';
  var CUTOFF_START_HOUR = 22; // 10:00 PM PKT
  var CUTOFF_END_HOUR = 8;    // 8:00 AM PKT
  var WHATSAPP_HELPLINE = '+92 3230-112464';
  var ORDER_ROUTE = /^\/order(\/|$)/;

  function isOrderRoute() {
    try {
      return ORDER_ROUTE.test(window.location.pathname || '');
    } catch (e) {
      return false;
    }
  }

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

  // Cached cutoff state. The hot paths (MutationObserver callback) read this
  // boolean instead of building an Intl formatter for every mutation batch.
  var cachedCutoff = false;
  function refreshCutoffState() {
    cachedCutoff = isNightCutoffActive();
    return cachedCutoff;
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

  var isEnforcing = false;
  var enforcePending = false;

  function scheduleEnforce() {
    if (enforcePending) return;
    enforcePending = true;
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(function () {
        enforcePending = false;
        enforceCutoff();
      });
    } else {
      setTimeout(function () {
        enforcePending = false;
        enforceCutoff();
      }, 60);
    }
  }

  function enforceCutoff() {
    if (isEnforcing) return;
    isEnforcing = true;
    try {
      var isCutoff = refreshCutoffState();
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
          if (btn.style.display !== 'none') {
            btn.style.setProperty('display', 'none', 'important');
            btn.style.setProperty('visibility', 'hidden', 'important');
            btn.style.setProperty('pointer-events', 'none', 'important');
          }
        }

        var sandboxCards = document.querySelectorAll('.qa-sandbox-checkout-path, #qa-sandbox-checkout-path');
        for (var j = 0; j < sandboxCards.length; j++) {
          if (sandboxCards[j].style.display !== 'none') {
            sandboxCards[j].style.setProperty('display', 'none', 'important');
          }
        }
      } else {
        if (body && body.classList.contains('zyphuel-night-cutoff-active')) {
          body.classList.remove('zyphuel-night-cutoff-active');
        }
        removeGuardStyles();
      }
    } finally {
      isEnforcing = false;
    }
  }

  // Intercept any programmatic form submissions on order forms during cutoff
  var submitHandler = null;
  function setupSubmissionInterceptor() {
    if (submitHandler) return;
    submitHandler = function (e) {
      if (cachedCutoff) {
        var form = e.target;
        if (form && (form.classList.contains('order-form') || form.closest('.order-form-container'))) {
          e.preventDefault();
          e.stopImmediatePropagation();
          alert('Online doorstep fuel orders close strictly at 10:00 PM PKT. Orders reopen tomorrow at 8:00 AM PKT.\n\nFor emergency generator refueling, please contact our 24/7 WhatsApp helpline: ' + WHATSAPP_HELPLINE);
        }
      }
    };
    document.addEventListener('submit', submitHandler, true);
  }

  var observer = null;
  function observeDOM() {
    if (observer || typeof MutationObserver === 'undefined') return;
    observer = new MutationObserver(function () {
      if (!isEnforcing && cachedCutoff) {
        scheduleEnforce();
      }
    });
    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  var intervalId = null;
  var monitoring = false;

  function startMonitoring() {
    if (monitoring) return;
    monitoring = true;

    enforceCutoff();
    setupSubmissionInterceptor();
    observeDOM();

    // Check every 5 seconds to smoothly transition at 10:00 PM and 8:00 AM
    intervalId = setInterval(enforceCutoff, 5000);

    console.log(
      '%c[' + PLUGIN_NAME + ' v' + VERSION + ']%c Current PKT Time: ' + getKarachiTimeFormatted() +
        ' | Status: ' + (cachedCutoff ? 'LOCKED (10:00 PM – 8:00 AM Night Cutoff Active)' : 'OPEN (Accepting Orders)'),
      'background: #ea580c; color: #fff; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
      'color: #38bdf8; font-weight: 600;'
    );
  }

  function stopMonitoring() {
    if (!monitoring) return;
    monitoring = false;

    if (observer) {
      try { observer.disconnect(); } catch (e) { /* already gone */ }
      observer = null;
    }
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    if (submitHandler) {
      document.removeEventListener('submit', submitHandler, true);
      submitHandler = null;
    }
  }

  // Keep the guard attached to the order route only, including SPA navigation.
  function sync() {
    if (isOrderRoute()) {
      if (!monitoring) startMonitoring();
      return;
    }
    if (monitoring) {
      stopMonitoring();
      var body = document.body;
      if (body && body.classList.contains('zyphuel-night-cutoff-active')) {
        body.classList.remove('zyphuel-night-cutoff-active');
      }
      removeGuardStyles();
    }
  }

  function watchRouteChanges() {
    ['pushState', 'replaceState'].forEach(function (method) {
      var original = window.history && window.history[method];
      if (typeof original !== 'function') return;
      window.history[method] = function () {
        var result = original.apply(this, arguments);
        try { sync(); } catch (e) { /* never break navigation */ }
        return result;
      };
    });
    window.addEventListener('popstate', function () {
      try { sync(); } catch (e) { /* never break navigation */ }
    });
  }

  // Expose global controller on every route — the enforcement itself is scoped.
  window.ZyphuelOrderGuard = {
    name: PLUGIN_NAME,
    version: VERSION,
    timezone: TIMEZONE,
    isNightCutoffActive: isNightCutoffActive,
    isOrderRoute: isOrderRoute,
    isMonitoring: function () { return monitoring; },
    getKarachiHour: getKarachiHour,
    getKarachiTimeFormatted: getKarachiTimeFormatted,
    enforce: enforceCutoff,
    sync: sync,
    helpline: WHATSAPP_HELPLINE
  };

  function init() {
    refreshCutoffState();
    sync();
    watchRouteChanges();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
