// Perf detail extraction: LCP element/resource, render-blocking, fonts,
// unused JS/CSS, image delivery, byte weight per representative run.
import { readFileSync } from 'node:fs'

const runs = [
  ['mobile', 'home'], ['mobile', 'services'], ['mobile', 'order'], ['mobile', 'download'],
  ['mobile', 'terms'], ['mobile', 'blog'],
]

function dump(label, audit, max = 8, fmt) {
  if (!audit) return
  const items = audit.details?.items || []
  console.log(`\n  --- ${label} (score=${audit.score}) ---`)
  if (!items.length) { console.log('    (no items)'); return }
  items.slice(0, max).forEach((it, i) => console.log('    ' + (fmt ? fmt(it, i) : JSON.stringify(it).slice(0, 180))))
}

for (const [dev, page] of runs) {
  let lh
  try { lh = JSON.parse(readFileSync(`lighthouse/perf-${dev}-${page}.json`, 'utf8')) } catch { continue }
  const a = lh.audits
  console.log(`\n============ ${page}/${dev} — perf ${Math.round(lh.categories.performance.score*100)} ============`)
  console.log(`  FCP=${Math.round(a['first-contentful-paint'].numericValue)} LCP=${Math.round(a['largest-contentful-paint'].numericValue)} TBT=${Math.round(a['total-blocking-time'].numericValue)} SI=${Math.round(a['speed-index'].numericValue)} CLS=${(a['cumulative-layout-shift'].numericValue||0).toFixed(3)} bytes=${Math.round((a['total-byte-weight'].numericValue||0)/1024)}KB`)

  dump('LCP element', a['largest-contentful-paint-element'], 3,
    (it) => (it.items?.[0]?.node?.selector) || JSON.stringify(it).slice(0, 150))
  dump('LCP request discovery (preload candidates)', a['lcp-discovery-insight'], 4,
    (it) => `${it.wastedMs||''} ${it.node?.selector||''} ${it.url||it.source||''}`.trim())
  dump('Render-blocking', a['render-blocking-insight'], 5,
    (it) => `${it.url || it.wastedMs || JSON.stringify(it).slice(0,120)}`)
  dump('Font display', a['font-display-insight'], 5,
    (it) => `${it.url || JSON.stringify(it).slice(0,140)}`)
  dump('Image delivery', a['image-delivery-insight'], 6,
    (it) => `${it.url||''} saved=${it.wastedBytes||it.overallSavingsBytes||''} ${it.displayStats||''}`.trim())
  dump('Total byte weight', a['total-byte-weight'], 6,
    (it) => `${(Math.round((it.totalBytes||0)/1024))}KB ${it.url||''}`)
  dump('Unused JS', a['unused-javascript'], 6,
    (it) => `${Math.round((it.wastedBytes||0)/1024)}KB of ${Math.round((it.totalBytes||0)/1024)}KB — ${it.url||''}`)
  dump('Unused CSS', a['unused-css-rules'], 5,
    (it) => `${Math.round((it.wastedBytes||0)/1024)}KB — ${it.url||''}`)
  dump('Unsized images', a['unsized-images'], 4, (it) => it.node?.selector || JSON.stringify(it).slice(0,120))
  dump('Cache policy', a['cache-insight'], 4, (it) => `${it.url||''} TTL=${it.cacheLifetimeMs||''}`)
}
