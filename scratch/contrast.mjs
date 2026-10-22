// Full color-contrast failure list with colors + font sizes across all pages.
import { readFileSync } from 'node:fs'
const PAGES = ['home', 'about', 'services', 'order', 'contact', 'blog', 'download', 'privacy', 'terms']
const DEVICES = ['mobile', 'desktop']
const seen = new Map()
for (const dev of DEVICES) for (const page of PAGES) {
  let lh
  try { lh = JSON.parse(readFileSync(`lighthouse/perf-${dev}-${page}.json`, 'utf8')) } catch { continue }
  const audit = lh.audits['color-contrast']
  if (!audit || !audit.details?.items) continue
  for (const it of audit.details.items) {
    for (const s of (it.subItems?.items || [it])) {
      const n = s.node
      if (!n) continue
      const sel = n.selector
      const raw = (n.explanation || it.explanation || JSON.stringify(s)).replace(/\s+/g,' ')
      if (!seen.has(sel)) seen.set(sel, { raw, snippet: (n.snippet||'').slice(0,140), pages: new Set() })
      seen.get(sel).pages.add(`${page}/${dev}`)
    }
  }
}
console.log(`Total unique color-contrast offenders: ${seen.size}\n`)
for (const [sel, v] of seen) {
  console.log(`\n  ${sel}  (${v.pages.size} runs)`)
  console.log(`    ${v.raw.slice(0, 220)}`)
  console.log(`    ${v.snippet}`)
}
