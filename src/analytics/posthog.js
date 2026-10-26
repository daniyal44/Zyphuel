/**
 * Zyphuel product analytics (PostHog) — order-journey funnel only.
 *
 * Design rules this module enforces:
 * - Configuration comes from VITE_POSTHOG_PROJECT_TOKEN / VITE_POSTHOG_HOST. A missing
 *   token, a missing/unknown ingestion host or a secret-looking key keeps the client inert.
 * - Consent is opt-in: the browser client boots with opt_out_capturing_by_default so no
 *   cookie, person profile or event exists until the visitor accepts in the consent bar.
 * - Only the four events below are known, and every event only accepts the properties in
 *   ALLOWED_PROPERTIES. Anything else (email, phone, plate, token, address...) is dropped
 *   before it can leave the browser.
 * - before_send scrubs automatic URL/referrer/person metadata so the payload cannot carry a
 *   query string, a referring site or a person profile.
 * - Every call is defensive: an analytics failure never breaks the ordering journey, and
 *   visitors are always anonymous ($current_url path only, no identify() call anywhere).
 *
 * See posthog-analytics.md for the product question, event contract and live analysis.
 */

export const ANALYTICS_CONSENT_KEY = 'zyphuel_analytics_consent'

export const ANALYTICS_EVENTS = Object.freeze({
  ORDER_PAGE_VIEWED: 'order_page_viewed',
  REFUEL_TARGET_SELECTED: 'refuel_target_selected',
  FUEL_VOLUME_SELECTED: 'fuel_volume_selected',
  ORDER_REQUEST_SUBMITTED: 'order_request_submitted',
})

/** Ingestion hosts we accept from configuration. A self-hosted domain must be added here. */
export const KNOWN_INGESTION_HOSTS = Object.freeze([
  'https://us.i.posthog.com',
  'https://eu.i.posthog.com',
])

const FUEL_GRADES = ['petrol', 'diesel', 'highOctane']
const REFUEL_TARGETS = ['car', 'bike', 'generator', 'machinery']
const SELECTION_SOURCES = ['preset', 'stepper', 'input', 'slider']
const ENTRY_SOURCES = ['direct', 'fuel_deeplink']
const PAYMENT_OPTIONS = ['cash_on_delivery', 'advance_digital']

/** Automatic PostHog properties that must never be sent. */
const SCRUBBED_AUTOMATIC_KEYS = Object.freeze([
  '$referrer',
  '$referring_domain',
  '$initial_person_info',
  '$initial_referrer',
  '$initial_referring_domain',
  '$session_entry_referrer',
  '$set',
  '$set_once',
  '$ip',
  '$ip_address',
  '$geoip_city_name',
  '$geoip_country_code',
  '$geoip_country_name',
  '$geoip_postal_code',
])

/** URL-ish automatic properties that keep their path but lose query string and origin. */
const PATH_ONLY_KEYS = Object.freeze([
  '$current_url',
  '$session_entry_url',
  '$initial_current_url',
])

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function oneOf(values) {
  return (value) => (typeof value === 'string' && values.includes(value) ? value : undefined)
}

function integerBetween(min, max) {
  return (value) => {
    const number = Number(value)
    if (!Number.isFinite(number) || !Number.isInteger(number)) return undefined
    if (number < min || number > max) return undefined
    return number
  }
}

function moneyBetween(min, max) {
  return (value) => {
    const number = Number(value)
    if (!Number.isFinite(number) || number < min || number > max) return undefined
    return Math.round(number * 100) / 100
  }
}

/**
 * The complete property contract. A key that is not listed for an event can never be
 * captured, which is what keeps personal data out of PostHog.
 */
const ALLOWED_PROPERTIES = Object.freeze({
  [ANALYTICS_EVENTS.ORDER_PAGE_VIEWED]: {
    entry_source: oneOf(ENTRY_SOURCES),
  },
  [ANALYTICS_EVENTS.REFUEL_TARGET_SELECTED]: {
    refuel_target: oneOf(REFUEL_TARGETS),
    fuel_grade: oneOf(FUEL_GRADES),
  },
  [ANALYTICS_EVENTS.FUEL_VOLUME_SELECTED]: {
    fuel_grade: oneOf(FUEL_GRADES),
    volume_litres: integerBetween(5, 15),
    selection_source: oneOf(SELECTION_SOURCES),
  },
  [ANALYTICS_EVENTS.ORDER_REQUEST_SUBMITTED]: {
    fuel_grade: oneOf(FUEL_GRADES),
    refuel_target: oneOf(REFUEL_TARGETS),
    volume_litres: integerBetween(5, 15),
    delivery_fee_pkr: moneyBetween(0, 10000),
    total_pkr: moneyBetween(0, 1000000),
    payment_option: oneOf(PAYMENT_OPTIONS),
  },
})

/** Keep only the allowlisted, correctly typed properties of an event. */
export function sanitizeAnalyticsProperties(eventName, properties) {
  const allowlist = Object.prototype.hasOwnProperty.call(ALLOWED_PROPERTIES, eventName)
    ? ALLOWED_PROPERTIES[eventName]
    : null
  const clean = {}
  if (!allowlist) return clean
  const source = isPlainObject(properties) ? properties : {}
  for (const [key, guard] of Object.entries(allowlist)) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) continue
    const value = guard(source[key])
    if (value !== undefined) clean[key] = value
  }
  return clean
}

function pathOnly(value) {
  if (typeof value !== 'string' || value.length === 0) return undefined
  try {
    return new URL(value).pathname
  } catch {
    return value.startsWith('/') && !value.includes('?') && !value.includes('#') ? value : undefined
  }
}

/**
 * before_send hook: drop referrer/person metadata, path-only every URL and keep only the
 * allowlisted application properties. Returning null would discard the event; we keep it
 * with scrubbed properties so the funnel still counts.
 */
export function scrubAnalyticsEvent(event) {
  if (!isPlainObject(event)) return null
  const properties = isPlainObject(event.properties) ? { ...event.properties } : {}

  for (const key of SCRUBBED_AUTOMATIC_KEYS) delete properties[key]

  for (const key of PATH_ONLY_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(properties, key)) continue
    const path = pathOnly(properties[key])
    if (path === undefined) delete properties[key]
    else properties[key] = path
  }

  const allowlist = Object.prototype.hasOwnProperty.call(ALLOWED_PROPERTIES, event.event)
    ? ALLOWED_PROPERTIES[event.event]
    : {}
  for (const key of Object.keys(properties)) {
    if (key.startsWith('$')) continue
    if (!Object.prototype.hasOwnProperty.call(allowlist, key)) delete properties[key]
  }

  const scrubbed = { ...event, properties }
  delete scrubbed.$set
  delete scrubbed.$set_once
  return scrubbed
}

function readEnv() {
  const buildEnv = (typeof import.meta !== 'undefined' && import.meta.env) || {}
  const nodeEnv = typeof process !== 'undefined' && process.env ? process.env : {}
  return { ...nodeEnv, ...buildEnv }
}

function readString(source, key) {
  const value = source[key]
  return typeof value === 'string' ? value.trim() : ''
}

/** Resolve the public token + ingestion host, and decide whether capture can run at all. */
export function resolveAnalyticsConfig(env) {
  const source = isPlainObject(env) ? env : readEnv()
  const token = readString(source, 'VITE_POSTHOG_PROJECT_TOKEN')
  const host = readString(source, 'VITE_POSTHOG_HOST').replace(/\/+$/, '')

  if (!token) return { enabled: false, reason: 'missing-project-token', token: '', host: '' }
  if (token.startsWith('phx_')) return { enabled: false, reason: 'secret-key-rejected', token: '', host: '' }
  if (!host || !KNOWN_INGESTION_HOSTS.includes(host)) {
    return { enabled: false, reason: 'missing-or-unknown-host', token: '', host: '' }
  }
  return { enabled: true, reason: 'configured', token, host }
}

export function readStoredConsent(storage) {
  try {
    const value = storage && storage.getItem(ANALYTICS_CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

function writeStoredConsent(storage, decision) {
  try {
    if (storage) storage.setItem(ANALYTICS_CONSENT_KEY, decision)
  } catch {
    /* storage blocked (private mode / SSR) — consent simply stays for this page view */
  }
}

function defaultStorage() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) return window.localStorage
  } catch {
    /* localStorage can throw when cookies are blocked */
  }
  return null
}

/** The one client configuration this project allows. */
export function buildClientConfig(config) {
  return {
    api_host: config.host,
    // Privacy defaults: no autocapture, no automatic pageviews/leaves/dead clicks, no replay.
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    capture_dead_clicks: false,
    disable_session_recording: true,
    disable_surveys: true,
    disable_external_dependency_loading: true,
    // No feature flags / decide calls for this funnel.
    advanced_disable_flags: true,
    // Visitors stay anonymous: no person profiles are created.
    person_profiles: 'never',
    // Nothing is sent until the consent bar is accepted.
    opt_out_capturing_by_default: true,
    // Scrub URL/referrer/person metadata from every event, including automatic ones.
    before_send: scrubAnalyticsEvent,
  }
}

async function defaultCreateClient(token, clientConfig) {
  const module = await import('posthog-js')
  const posthog = module.default || module
  posthog.init(token, clientConfig)
  return posthog
}

/**
 * Build an analytics runtime. `createClient`, `env` and `storage` are injectable so the
 * offline verification can drive the real handlers with an in-memory transport.
 */
export function createAnalytics(options = {}) {
  const env = 'env' in options ? options.env : readEnv()
  const storage = 'storage' in options ? options.storage : defaultStorage()
  const injectedFactory = typeof options.createClient === 'function'
  const createClient = injectedFactory ? options.createClient : defaultCreateClient
  const config = resolveAnalyticsConfig(env)

  let client = null
  let booting = null
  let consent = readStoredConsent(storage)

  const applyConsent = () => {
    if (!client) return
    try {
      if (consent === 'granted') client.opt_in_capturing()
      else client.opt_out_capturing()
    } catch {
      /* consent plumbing must never break the page */
    }
  }

  return {
    config,
    getConsent() {
      return consent
    },
    isReady() {
      return Boolean(client) && config.enabled
    },
    /** Load the SDK once (browser only) and apply the stored consent decision. */
    async init() {
      if (!config.enabled) return { enabled: false, reason: config.reason }
      if (!injectedFactory && typeof window === 'undefined') {
        return { enabled: false, reason: 'no-browser-environment' }
      }
      if (!booting) {
        booting = (async () => {
          try {
            client = await createClient(config.token, buildClientConfig(config))
            applyConsent()
          } catch {
            client = null
          }
        })()
      }
      await booting
      return { enabled: Boolean(client), reason: client ? 'ready' : 'client-unavailable' }
    },
    /** Capture one allowlisted event. Returns false when it was not sent. */
    capture(eventName, properties) {
      if (!config.enabled || !client) return false
      if (consent !== 'granted') return false
      if (!Object.prototype.hasOwnProperty.call(ALLOWED_PROPERTIES, eventName)) return false
      try {
        const pending = client.capture(eventName, sanitizeAnalyticsProperties(eventName, properties))
        if (pending && typeof pending.catch === 'function') pending.catch(() => {})
        return true
      } catch {
        return false
      }
    },
    grantConsent() {
      consent = 'granted'
      writeStoredConsent(storage, 'granted')
      applyConsent()
      return true
    },
    denyConsent() {
      consent = 'denied'
      writeStoredConsent(storage, 'denied')
      applyConsent()
      this.resetIdentity()
      return true
    },
    /** Anonymous only today: reset() discards the client's distinct id (used on opt-out). */
    resetIdentity() {
      try {
        if (client) client.reset()
      } catch {
        /* ignore */
      }
    },
  }
}

let runtime = null

export function getAnalyticsRuntime() {
  return runtime
}

/** Replace the module runtime (used by the offline verification with an in-memory transport). */
export function configureAnalytics(options) {
  runtime = createAnalytics(options)
  return runtime
}

function ensureRuntime() {
  if (!runtime) runtime = createAnalytics()
  return runtime
}

export async function initAnalytics(options) {
  if (options) configureAnalytics(options)
  return ensureRuntime().init()
}

function emit(eventName, properties) {
  if (!runtime) return false
  return runtime.capture(eventName, properties)
}

/* ---------------------------------------------------------------------------------------
 * The four instrumented actions. These are the exact functions the order page calls.
 * Each one is a no-op unless analytics is configured and consent was granted.
 * ------------------------------------------------------------------------------------ */

export function captureOrderPageViewed(properties) {
  return emit(ANALYTICS_EVENTS.ORDER_PAGE_VIEWED, properties)
}

export function captureRefuelTargetSelected(properties) {
  return emit(ANALYTICS_EVENTS.REFUEL_TARGET_SELECTED, properties)
}

export function captureFuelVolumeSelected(properties) {
  return emit(ANALYTICS_EVENTS.FUEL_VOLUME_SELECTED, properties)
}

export function captureOrderRequestSubmitted(properties) {
  return emit(ANALYTICS_EVENTS.ORDER_REQUEST_SUBMITTED, properties)
}

export function analyticsConsentDecision() {
  return runtime ? runtime.getConsent() : readStoredConsent(defaultStorage())
}

export function grantAnalyticsConsent() {
  return ensureRuntime().grantConsent()
}

export function denyAnalyticsConsent() {
  return ensureRuntime().denyConsent()
}

export function resetAnalyticsIdentity() {
  if (runtime) runtime.resetIdentity()
}
