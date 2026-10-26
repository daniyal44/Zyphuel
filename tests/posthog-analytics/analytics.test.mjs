/**
 * Offline verification for the PostHog order-journey integration.
 *
 * These tests drive the REAL exported handlers from src/analytics/posthog.js — the same
 * functions the order page calls — with an in-memory transport instead of the network.
 * No SDK is loaded, no request is made, and the synthetic project token is injected through
 * the child process environment by posthog-analytics.verify.mjs.
 */
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

import {
  ANALYTICS_CONSENT_KEY,
  ANALYTICS_EVENTS,
  captureFuelVolumeSelected,
  captureOrderPageViewed,
  captureOrderRequestSubmitted,
  captureRefuelTargetSelected,
  configureAnalytics,
  denyAnalyticsConsent,
  grantAnalyticsConsent,
  initAnalytics,
  resetAnalyticsIdentity,
  resolveAnalyticsConfig,
  sanitizeAnalyticsProperties,
  scrubAnalyticsEvent,
} from '../../src/analytics/posthog.js'

/* ── assertion budget (a suite that asserts nothing must not pass) ─────────────── */
let assertionCount = 0
const expect = (value, message) => {
  assertionCount += 1
  assert.ok(value, message)
}
expect.equal = (actual, wanted, message) => {
  assertionCount += 1
  assert.equal(actual, wanted, message)
}
expect.deepEqual = (actual, wanted, message) => {
  assertionCount += 1
  assert.deepStrictEqual(actual, wanted, message)
}

/* ── network guard: any attempt during this suite is a failure ─────────────────── */
let networkAttempts = 0
globalThis.fetch = () => {
  networkAttempts += 1
  throw new Error('offline verification: network access denied')
}

/* ── fixtures ─────────────────────────────────────────────────────────────────── */
const SYNTHETIC_ENV = {
  VITE_POSTHOG_PROJECT_TOKEN: 'synthetic-offline-project-token',
  VITE_POSTHOG_HOST: 'https://us.i.posthog.com',
}

function createMemoryStorage(seed) {
  const data = new Map(Object.entries(seed || {}))
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
    snapshot: () => Object.fromEntries(data),
  }
}

function createMemorySdk() {
  const events = []
  const calls = { optIn: 0, optOut: 0, reset: 0 }
  return {
    events,
    calls,
    capture(event, properties) {
      events.push({ event, properties })
    },
    opt_in_capturing() {
      calls.optIn += 1
    },
    opt_out_capturing() {
      calls.optOut += 1
    },
    reset() {
      calls.reset += 1
    },
  }
}

/** Build the real runtime with an in-memory transport; remembers the client config. */
function setup({ env = SYNTHETIC_ENV, decision = null, sdk = createMemorySdk() } = {}) {
  const storage = createMemoryStorage(decision ? { [ANALYTICS_CONSENT_KEY]: decision } : {})
  const seen = { token: null, config: null, calls: 0 }
  configureAnalytics({
    env,
    storage,
    createClient: async (token, config) => {
      seen.calls += 1
      seen.token = token
      seen.config = config
      return sdk
    },
  })
  return { sdk, storage, seen }
}

const read = (relativePath) => fs.readFileSync(new URL(`../../${relativePath}`, import.meta.url), 'utf8')
const readJson = (relativePath) => JSON.parse(read(relativePath))

/* ── 1. configuration ─────────────────────────────────────────────────────────── */
test('configuration: a missing token, secret key or unknown host keeps capture off', async () => {
  const empty = setup({ env: {} })
  expect.equal(empty.seen.calls, 0)
  const inert = await initAnalytics()
  expect.equal(inert.enabled, false)
  expect.equal(inert.reason, 'missing-project-token')
  expect.equal(empty.seen.calls, 0, 'the SDK must not load without a token')
  expect.equal(captureOrderPageViewed({ entry_source: 'direct' }), false)

  const noHost = resolveAnalyticsConfig({ VITE_POSTHOG_PROJECT_TOKEN: 'synthetic-token' })
  expect.equal(noHost.enabled, false)
  expect.equal(noHost.reason, 'missing-or-unknown-host')

  const unknownHost = resolveAnalyticsConfig({
    VITE_POSTHOG_PROJECT_TOKEN: 'synthetic-token',
    VITE_POSTHOG_HOST: 'https://posthog.example.internal',
  })
  expect.equal(unknownHost.enabled, false)
  expect.equal(unknownHost.reason, 'missing-or-unknown-host')

  const secretKey = resolveAnalyticsConfig({
    VITE_POSTHOG_PROJECT_TOKEN: 'phx_' + 'syntheticSecretKeyValue',
    VITE_POSTHOG_HOST: 'https://eu.i.posthog.com',
  })
  expect.equal(secretKey.enabled, false)
  expect.equal(secretKey.reason, 'secret-key-rejected')

  const eu = resolveAnalyticsConfig({
    VITE_POSTHOG_PROJECT_TOKEN: 'synthetic-token',
    VITE_POSTHOG_HOST: 'https://eu.i.posthog.com/',
  })
  expect.equal(eu.enabled, true)
  expect.equal(eu.host, 'https://eu.i.posthog.com')
})

test('configuration: the client boots opted out with the locked privacy defaults', async () => {
  const { seen } = setup()
  const result = await initAnalytics()
  expect.equal(result.enabled, true)
  expect.equal(seen.calls, 1, 'exactly one client is created')
  expect.equal(seen.token, 'synthetic-offline-project-token')
  expect.equal(seen.config.api_host, 'https://us.i.posthog.com')
  expect.equal(seen.config.opt_out_capturing_by_default, true)
  expect.equal(seen.config.autocapture, false)
  expect.equal(seen.config.capture_pageview, false)
  expect.equal(seen.config.capture_pageleave, false)
  expect.equal(seen.config.capture_dead_clicks, false)
  expect.equal(seen.config.disable_session_recording, true)
  expect.equal(seen.config.disable_surveys, true)
  expect.equal(seen.config.advanced_disable_flags, true)
  expect.equal(seen.config.person_profiles, 'never')
  expect.equal(typeof seen.config.before_send, 'function')
})

/* ── 2. consent ───────────────────────────────────────────────────────────────── */
test('consent: no stored decision captures nothing and opts the client out', async () => {
  const { sdk, seen } = setup()
  await initAnalytics()
  expect.equal(sdk.calls.optOut, 1)
  expect.equal(sdk.calls.optIn, 0)
  expect.equal(captureOrderPageViewed({ entry_source: 'direct' }), false)
  expect.equal(captureRefuelTargetSelected({ refuel_target: 'car', fuel_grade: 'petrol' }), false)
  expect.equal(sdk.events.length, 0)
  expect.equal(seen.calls, 1)
})

test('consent: a denied decision captures nothing and drops the identity', async () => {
  const { sdk, storage } = setup({ decision: 'denied' })
  await initAnalytics()
  expect.equal(sdk.calls.optOut, 1)
  expect.equal(sdk.calls.optIn, 0)
  expect.equal(captureFuelVolumeSelected({ fuel_grade: 'petrol', volume_litres: 10, selection_source: 'preset' }), false)
  expect.equal(sdk.events.length, 0)

  denyAnalyticsConsent()
  expect.equal(sdk.calls.reset, 1, 'denying consent resets the anonymous identity')
  expect.equal(storage.snapshot()[ANALYTICS_CONSENT_KEY], 'denied')
})

test('consent: a granted decision opts in and stores the choice', async () => {
  const { sdk, storage } = setup()
  await initAnalytics()
  grantAnalyticsConsent()
  expect.equal(sdk.calls.optIn, 1)
  expect.equal(storage.snapshot()[ANALYTICS_CONSENT_KEY], 'granted')
  expect.equal(captureOrderPageViewed({ entry_source: 'direct' }), true)
  expect.equal(sdk.events.length, 1)
})

/* ── 3. the four real actions ─────────────────────────────────────────────────── */
test('events: every real order-journey action emits once with allowlisted properties', async () => {
  const { sdk } = setup({ decision: 'granted' })
  await initAnalytics()

  expect.equal(captureOrderPageViewed({ entry_source: 'fuel_deeplink' }), true)
  expect.equal(captureRefuelTargetSelected({ refuel_target: 'generator', fuel_grade: 'diesel' }), true)
  expect.equal(captureFuelVolumeSelected({ fuel_grade: 'diesel', volume_litres: 12, selection_source: 'stepper' }), true)
  expect.equal(
    captureOrderRequestSubmitted({
      fuel_grade: 'diesel',
      refuel_target: 'generator',
      volume_litres: 12,
      delivery_fee_pkr: 340,
      total_pkr: 7440.5,
      payment_option: 'advance_digital',
    }),
    true
  )

  expect.equal(sdk.events.length, 4)
  expect.deepEqual(
    sdk.events.map((entry) => entry.event),
    [
      ANALYTICS_EVENTS.ORDER_PAGE_VIEWED,
      ANALYTICS_EVENTS.REFUEL_TARGET_SELECTED,
      ANALYTICS_EVENTS.FUEL_VOLUME_SELECTED,
      ANALYTICS_EVENTS.ORDER_REQUEST_SUBMITTED,
    ]
  )
  expect.deepEqual(sdk.events[0].properties, { entry_source: 'fuel_deeplink' })
  expect.deepEqual(sdk.events[1].properties, { refuel_target: 'generator', fuel_grade: 'diesel' })
  expect.deepEqual(sdk.events[2].properties, {
    fuel_grade: 'diesel',
    volume_litres: 12,
    selection_source: 'stepper',
  })
  expect.deepEqual(sdk.events[3].properties, {
    fuel_grade: 'diesel',
    refuel_target: 'generator',
    volume_litres: 12,
    delivery_fee_pkr: 340,
    total_pkr: 7440.5,
    payment_option: 'advance_digital',
  })
})

test('events: unknown event names and out-of-range values are refused', async () => {
  const { sdk } = setup({ decision: 'granted' })
  await initAnalytics()

  expect.equal(sdk.events.length, 0)
  const sanitized = sanitizeAnalyticsProperties(ANALYTICS_EVENTS.FUEL_VOLUME_SELECTED, {
    fuel_grade: 'petrol',
    volume_litres: 42,
    selection_source: 'preset',
  })
  expect.deepEqual(sanitized, { fuel_grade: 'petrol', selection_source: 'preset' })
  expect.deepEqual(sanitizeAnalyticsProperties('not_an_event', { entry_source: 'direct' }), {})
})

/* ── 4. privacy ───────────────────────────────────────────────────────────────── */
test('privacy: email, phone, card, password and token sentinels never reach the payload', async () => {
  const { sdk } = setup({ decision: 'granted' })
  await initAnalytics()

  captureOrderRequestSubmitted({
    fuel_grade: 'petrol',
    refuel_target: 'car',
    volume_litres: 7,
    delivery_fee_pkr: 300,
    total_pkr: 2000,
    payment_option: 'cash_on_delivery',
    email: 'sentinel-email@example.invalid',
    phone: '+92-300-0000000',
    address: 'sentinel-address, Lahore',
    card: '4111111111111111',
    password: 'sentinel-password',
    token: 'sentinel-token-value',
    notes: 'sentinel-notes',
  })

  expect.equal(sdk.events.length, 1)
  const payload = JSON.stringify(sdk.events[0].properties)
  for (const sentinel of ['sentinel-email', 'sentinel-address', '4111111111111111', 'sentinel-password', 'sentinel-token', 'sentinel-notes', '300-0000000']) {
    expect.equal(payload.includes(sentinel), false, `payload must not contain ${sentinel}`)
  }
  expect.deepEqual(Object.keys(sdk.events[0].properties).sort(), [
    'delivery_fee_pkr',
    'fuel_grade',
    'payment_option',
    'refuel_target',
    'total_pkr',
    'volume_litres',
  ])
})

test('privacy: before_send scrubs URL query, referrer and person metadata', () => {
  const scrubbed = scrubAnalyticsEvent({
    event: ANALYTICS_EVENTS.ORDER_PAGE_VIEWED,
    properties: {
      $current_url: 'https://zyphuel.netlify.app/order/?verify=ZYP-123456&email=sentinel-email@example.invalid',
      $session_entry_url: 'https://zyphuel.netlify.app/order/?phone=+923000000000',
      $referrer: 'https://mail.example.invalid/inbox?token=sentinel-token-value',
      $referring_domain: 'mail.example.invalid',
      $set: { email: 'sentinel-email@example.invalid' },
      $set_once: { phone: '+923000000000' },
      $ip: '203.0.113.9',
      $geoip_city_name: 'Lahore',
      entry_source: 'direct',
      email: 'sentinel-email@example.invalid',
    },
  })

  expect(scrubbed !== null)
  expect.equal(scrubbed.properties.$current_url, '/order/')
  expect.equal(scrubbed.properties.$session_entry_url, '/order/')
  expect.equal('$referrer' in scrubbed.properties, false)
  expect.equal('$referring_domain' in scrubbed.properties, false)
  expect.equal('$set' in scrubbed.properties, false)
  expect.equal('$set_once' in scrubbed.properties, false)
  expect.equal('$ip' in scrubbed.properties, false)
  expect.equal('$geoip_city_name' in scrubbed.properties, false)
  expect.equal(scrubbed.properties.entry_source, 'direct')
  expect.equal('email' in scrubbed.properties, false)

  const serialized = JSON.stringify(scrubbed)
  expect.equal(serialized.includes('sentinel'), false)
  expect.equal(serialized.includes('ZYP-123456'), false)
  expect.equal(scrubbed.event, ANALYTICS_EVENTS.ORDER_PAGE_VIEWED)
})

/* ── 5. failures stay harmless ───────────────────────────────────────────────── */
test('failures: transport errors never break the ordering journey', async () => {
  const throwing = createMemorySdk()
  throwing.capture = () => {
    throw new Error('transport offline')
  }
  setup({ decision: 'granted', sdk: throwing })
  await initAnalytics()
  expect.equal(captureOrderPageViewed({ entry_source: 'direct' }), false, 'a throwing transport reports false instead of throwing')

  const rejecting = createMemorySdk()
  rejecting.capture = () => Promise.reject(new Error('queue unavailable'))
  setup({ decision: 'granted', sdk: rejecting })
  await initAnalytics()
  expect.equal(captureOrderPageViewed({ entry_source: 'direct' }), true)
  await new Promise((resolve) => setTimeout(resolve, 25))

  const broken = setup({
    decision: 'granted',
    sdk: createMemorySdk(),
  })
  configureAnalytics({
    env: SYNTHETIC_ENV,
    storage: createMemoryStorage({ [ANALYTICS_CONSENT_KEY]: 'granted' }),
    createClient: async () => {
      throw new Error('sdk blocked by browser')
    },
  })
  const initResult = await initAnalytics()
  expect.equal(initResult.enabled, false)
  expect.equal(captureRefuelTargetSelected({ refuel_target: 'bike', fuel_grade: 'petrol' }), false)
  expect.equal(broken.sdk.events.length, 0)
})

test('identity: visitors stay anonymous and reset() clears the client identity', async () => {
  const { sdk } = setup({ decision: 'granted' })
  await initAnalytics()
  captureOrderPageViewed({ entry_source: 'direct' })

  expect.equal(sdk.events.length, 1)
  const keys = Object.keys(sdk.events[0].properties)
  expect.equal(keys.includes('distinct_id'), false, 'no identity is added by the integration')
  expect.equal(keys.includes('$set'), false)
  expect.equal(typeof sdk.identify, 'undefined', 'no identify() call path exists')

  resetAnalyticsIdentity()
  expect.equal(sdk.calls.reset, 1)
})

/* ── 6. wiring, manifest, lock, secrets ──────────────────────────────────────── */
test('wiring: the order page calls every instrumented handler', () => {
  const orderPage = read('src/pages/OrderPage.jsx')
  expect.equal(orderPage.includes("from '../analytics/posthog'"), true)
  for (const handler of [
    'captureOrderPageViewed(',
    'captureRefuelTargetSelected(',
    'captureFuelVolumeSelected(',
    'captureOrderRequestSubmitted(',
  ]) {
    expect.equal(orderPage.includes(handler), true, `${handler} must be wired into the real page`)
    expect.equal(handler.includes('(') && orderPage.split(handler).length - 1 >= 1, true)
  }
  const consentBar = read('src/components/AnalyticsConsent.jsx')
  expect.equal(consentBar.includes('grantAnalyticsConsent('), true)
  expect.equal(consentBar.includes('denyAnalyticsConsent('), true)
  expect.equal(read('src/main.jsx').includes('initAnalytics()'), true)
})

test('manifest and lock: the root importer pins posthog-js 1.438.13', () => {
  const manifest = readJson('package.json')
  expect.equal(manifest.dependencies['posthog-js'], '1.438.13')
  expect.equal(manifest.packageManager === undefined || String(manifest.packageManager).startsWith('npm'), true)

  const lock = readJson('package-lock.json')
  expect.equal(lock.lockfileVersion, 3)
  expect.equal(lock.packages[''].dependencies['posthog-js'], '1.438.13')
  expect.equal(lock.packages['node_modules/posthog-js'].version, '1.438.13')

  for (const otherLock of ['yarn.lock', 'pnpm-lock.yaml', 'bun.lockb']) {
    expect.equal(fs.existsSync(new URL(`../../${otherLock}`, import.meta.url)), false)
  }
})

test('secrets: no real PostHog token in changed sources, examples or this note', () => {
  const envExample = read('.env.example')
  expect.equal(/^VITE_POSTHOG_PROJECT_TOKEN=$/m.test(envExample), true, 'example declares an empty project token')
  expect.equal(envExample.includes('VITE_POSTHOG_HOST='), true)
  expect.equal(/^VITE_POSTHOG_HOST=$/m.test(envExample), true, 'example declares an empty ingestion host')

  const gitignore = read('.gitignore')
  expect.equal(/^\.env$/m.test(gitignore), true, 'local env files are ignored by git')

  const tokenPattern = /(phc|phx)_[A-Za-z0-9]{16,}/
  for (const file of [
    'src/analytics/posthog.js',
    'src/components/AnalyticsConsent.jsx',
    'src/pages/OrderPage.jsx',
    'src/main.jsx',
    'src/App.jsx',
    '.env.example',
    'posthog-analytics.md',
    'tests/posthog-analytics/analytics.test.mjs',
  ]) {
    const source = read(file)
    expect.equal(tokenPattern.test(source), false, `${file} must not contain a PostHog key literal`)
  }
  expect.equal(/pk_[A-Za-z0-9]{10,}|4111\s?1111\s?1111\s?1111/.test(read('src/analytics/posthog.js')), false)
})

/* ── 7. budget ───────────────────────────────────────────────────────────────── */
test('budget: the suite asserted enough to be meaningful', (t) => {
  expect.equal(networkAttempts, 0, 'no network access was attempted')
  expect(assertionCount >= 60, `expected at least 60 assertions, counted ${assertionCount}`)
  t.diagnostic(`assertions ${assertionCount}`)
})
