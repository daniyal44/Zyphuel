// Extract heading-order violations: which elements, which heading levels.
import { readFileSync } from 'node:fs'
const PAGES = ['home', 'about', 'services', 'order', 'contact', 'blog', 'download', 'privacy', 'terms']
const DEVICES = ['mobile']
const seen = new Map()
for (const dev of DEVICES) for (const page of PAGES) {
  let lh
  try { lh = JSON.parse(readFileSync(`lighthouse/perf-${dev}-${page}.json`, 'utf8')) } catch { continue }
  for (const id of ['heading-order']) {
    const audit = lh.audits[id]
    if (!audit || audit.score === null || audit.score >= 1) continue
    for (const it of (audit.details?.items || [])) {
      const n = it.node
      if (!n) continue
      const sel = n.selector
      if (!seen.has(sel)) seen.set(sel, { exp: (n.explanation||''), snippet: (n.snippet||''), pages: new Set() })
      seen.get(sel).pages.add(page)
    }
  }
}
console.log(`heading-order unique offenders: ${seen.size}`)
for (const [sel, v] of seen) console.log(`\n  ${sel} (${[...v.pages].join(',')})\n    ${v.exp.slice(0,140)}\n    ${v.snippet.slice(0,140)}`)
