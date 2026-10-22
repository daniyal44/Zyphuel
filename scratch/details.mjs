// Dump exact failing elements for score=0 audits across categories.
import { readFileSync } from 'node:fs'

const targets = {
  accessibility: ['color-contrast', 'label-content-name-mismatch', 'heading-order', 'landmark-one-main', 'aria-prohibited-attr', 'link-in-text-block', 'button-name', 'meta-viewport'],
  'best-practices': ['image-aspect-ratio'],
  seo: ['link-text'],
}

// Pull from a few representative runs; merge unique offenders.
const runs = [
  ['mobile', 'home'], ['mobile', 'about'], ['mobile', 'services'], ['mobile', 'order'],
  ['mobile', 'contact'], ['mobile', 'blog'], ['mobile', 'download'], ['mobile', 'privacy'], ['mobile', 'terms'],
  ['desktop', 'home'], ['desktop', 'blog'], ['desktop', 'download'],
]

const seen = {}
for (const [dev, page] of runs) {
  let lh
  try { lh = JSON.parse(readFileSync(`lighthouse/perf-${dev}-${page}.json`, 'utf8')) } catch { continue }
  for (const [cat, ids] of Object.entries(targets)) {
    for (const id of ids) {
      const audit = lh.audits[id]
      if (!audit || audit.score === null || audit.score >= 1) continue
      const key = `${cat} :: ${id}`
      if (!seen[key]) seen[key] = { title: audit.title, offenders: new Map() }
      const items = audit.details?.items || []
      for (const it of items) {
        const sub = it.subItems?.items || [it]
        for (const s of sub) {
          const node = s.node || s
          const sel = node.selector || JSON.stringify(s).slice(0, 80)
          const ex = node.explanation || node.snippet || ''
          const k = `${sel}`
          if (!seen[key].offenders.has(k)) seen[key].offenders.set(k, { ex, page: `${page}/${dev}` })
        }
      }
    }
  }
}

for (const [key, v] of Object.entries(seen)) {
  console.log(`\n########## ${key} — ${v.title}`)
  let n = 0
  for (const [sel, o] of v.offenders) {
    if (n++ >= 12) { console.log(`  ... +${v.offenders.size - 12} more`); break }
    console.log(`  • ${sel}`)
    if (o.ex) console.log(`      ${String(o.ex).slice(0, 160)}`)
  }
}
