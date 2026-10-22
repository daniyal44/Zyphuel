// Lighthouse performance matrix: every public page × 3 device classes.
// Saves per-run JSON into lighthouse/ (repo convention) and writes a compact
// summary to scratch/perf-summary.json.
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'

const BASE = process.env.BASE || 'http://localhost:5184'
const OUT_DIR = 'lighthouse'
mkdirSync(OUT_DIR, { recursive: true })
mkdirSync('scratch', { recursive: true })

const PAGES = [
  ['home', '/'],
  ['about', '/about/'],
  ['services', '/services/'],
  ['order', '/order/'],
  ['contact', '/contact/'],
  ['blog', '/blog/'],
  ['download', '/download/'],
  ['privacy', '/privacy/'],
  ['terms', '/terms/'],
]

const DEVICES = {
  mobile: [], // Lighthouse default IS mobile (Moto G Power, slow-4G + 4x CPU); no preset needed
  tablet: [
    '--form-factor=mobile',
    '--screenEmulation.mobile=true',
    '--screenEmulation.width=834',
    '--screenEmulation.height=1112',
    '--screenEmulation.deviceScaleFactor=2',
  ], // iPad-class screen, same mobile throttling model
  desktop: ['--preset=desktop'], // 1350x940, no network/CPU throttling
}

// Optional device filter: `node perf-matrix.mjs mobile` runs just one class,
// so each batch stays under the 10-minute background cap.
const onlyDevice = process.argv[2]
const deviceList = onlyDevice ? [onlyDevice] : Object.keys(DEVICES)
if (onlyDevice && !DEVICES[onlyDevice]) {
  console.error(`Unknown device "${onlyDevice}". Use: ${Object.keys(DEVICES).join(', ')}`)
  process.exit(1)
}

const results = []

for (const device of deviceList) {
  const extraFlags = DEVICES[device]
  for (const [name, path] of PAGES) {
    const file = `${OUT_DIR}/perf-${device}-${name}.json`
    const url = BASE + path
    process.stdout.write(`[run] ${device.padEnd(7)} ${name.padEnd(9)} ... `)
    const started = Date.now()
    let lh = null
    try {
      execFileSync(
        'npx',
        [
          'lighthouse',
          url,
          ...extraFlags,
          '--output=json',
          '--output-path=' + file,
          '--only-categories=performance,accessibility,best-practices,seo',
          '--quiet',
        ],
        { stdio: 'pipe', timeout: 180000, shell: true }
      )
    } catch (err) {
      // On Windows, Chrome temp-dir cleanup can EPERM *after* the report is
      // written. If the JSON exists, the audit still succeeded — fall through.
      if (!existsSync(file)) {
        console.log('FAILED:', String(err.message).slice(0, 100))
        results.push({ device, page: name, url, error: true })
        continue
      }
    }
    try {
      lh = JSON.parse(readFileSync(file, 'utf8'))
      const a = lh.audits
      results.push({
        device,
        page: name,
        url,
        scores: Object.fromEntries(
          Object.entries(lh.categories).map(([k, v]) => [k, Math.round((v.score || 0) * 100)])
        ),
        fcp: a['first-contentful-paint'].numericValue,
        lcp: a['largest-contentful-paint'].numericValue,
        cls: a['cumulative-layout-shift'].numericValue,
        tbt: a['total-blocking-time'].numericValue,
        si: a['speed-index'].numericValue,
        tti: a['interactive'].numericValue,
        byteWeight: a['total-byte-weight'].numericValue,
        ms: Date.now() - started,
      })
      console.log('ok')
    } catch (err) {
      console.log('FAILED:', String(err.message).slice(0, 120))
      results.push({ device, page: name, url, error: true })
    }
  }
}

const summaryFile = 'scratch/perf-summary.json'
writeFileSync(summaryFile, JSON.stringify(results, null, 2))
console.log(`\nDone: ${results.filter((r) => !r.error).length}/${results.length} runs OK -> ${summaryFile}`)
