#!/usr/bin/env node
/**
 * Offline verification runner for the PostHog order-journey integration.
 *
 * Runs `tests/posthog-analytics/*.test.mjs` with the Node test runner that ships with the
 * toolchain already used by this project (no new test dependency, no network). The child
 * environment is built from an empty base: only OS launch essentials plus a fixed synthetic
 * PostHog configuration. Local `.env` files, dotenv and framework env autoloading never run,
 * so no real project token can reach the tests, and the tests refuse network access.
 *
 * Usage: node posthog-analytics.verify.mjs
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const TEST_DIR = path.join(ROOT, 'tests', 'posthog-analytics')
const MIN_TESTS = 12
const TIMEOUT_MS = 120000

const fail = (message) => {
  console.error(`\n[verify] FAIL — ${message}`)
  process.exit(1)
}

if (!fs.existsSync(TEST_DIR)) fail('tests/posthog-analytics is missing')
const testFiles = fs
  .readdirSync(TEST_DIR)
  .filter((name) => name.endsWith('.test.mjs'))
  .sort()
if (testFiles.length === 0) fail('no *.test.mjs files found in tests/posthog-analytics')

/* Fail early when the tests were emptied out: no assertions means no proof. */
const sources = testFiles.map((name) => fs.readFileSync(path.join(TEST_DIR, name), 'utf8')).join('\n')
if (!/node:assert\/strict/.test(sources) || !/\bassert\.[a-zA-Z]+\(/.test(sources)) {
  fail('the test files do not import or use node:assert/strict')
}

/* Child env starts {}: OS essentials + fixed synthetic config only. */
const ENV_ALLOWLIST = [
  'PATH',
  'Path',
  'PATHEXT',
  'SystemRoot',
  'SYSTEMROOT',
  'windir',
  'COMSPEC',
  'ComSpec',
  'TEMP',
  'TMP',
  'HOME',
  'USERPROFILE',
  'APPDATA',
  'LOCALAPPDATA',
  'ProgramData',
  'ProgramFiles',
  'NUMBER_OF_PROCESSORS',
  'PROCESSOR_ARCHITECTURE',
  'PROCESSOR_IDENTIFIER',
  'OS',
]

const childEnv = {}
for (const key of ENV_ALLOWLIST) {
  if (process.env[key] !== undefined) childEnv[key] = process.env[key]
}
childEnv.VITE_POSTHOG_PROJECT_TOKEN = 'synthetic-offline-project-token'
childEnv.VITE_POSTHOG_HOST = 'https://us.i.posthog.com'
childEnv.NODE_ENV = 'test'
childEnv.TZ = 'UTC'

console.log('[verify] running the PostHog order-journey handler tests offline …')

const child = spawn(
  process.execPath,
  ['--test', '--test-reporter=tap', ...testFiles.map((name) => path.join('tests', 'posthog-analytics', name))],
  { cwd: ROOT, env: childEnv, shell: false, windowsHide: true }
)

let output = ''
child.stdout.on('data', (chunk) => {
  output += chunk.toString()
})
child.stderr.on('data', (chunk) => {
  output += chunk.toString()
})

const timer = setTimeout(() => {
  child.kill('SIGKILL')
  console.error(output)
  fail(`timed out after ${TIMEOUT_MS} ms`)
}, TIMEOUT_MS)

child.on('error', (error) => {
  clearTimeout(timer)
  fail(`could not start the test runner (${error.code || 'error'}): ${error.message}`)
})

child.on('close', (code) => {
  clearTimeout(timer)
  console.log(output)

  const pass = /# pass (\d+)/.exec(output)
  const failures = /# fail (\d+)/.exec(output)
  const assertions = /# assertions (\d+)/.exec(output)

  if (code !== 0) fail(`the test runner exited with code ${code}`)
  if (failures && Number(failures[1]) > 0) fail(`${failures[1]} test(s) failed`)
  if (!pass) fail('the runner produced no test summary (missing runner or missing tests)')
  if (Number(pass[1]) < MIN_TESTS) fail(`expected at least ${MIN_TESTS} passing tests, got ${pass[1]}`)
  if (assertions && Number(assertions[1]) <= 0) fail('the suite recorded zero assertions')

  console.log(
    `\n[verify] PASS — ${pass[1]} tests green` +
      (assertions ? `, ${assertions[1]} assertions` : '') +
      ', synthetic token only, no network delivery.'
  )
})
