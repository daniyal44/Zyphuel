// Extract what's actually lowering scores: failed audits grouped by category,
// plus perf opportunities with estimated savings. Aggregated across runs.
import { readFileSync } from 'node:fs'

const PAGES = ['home', 'about', 'services', 'order', 'contact', 'blog', 'download', 'privacy', 'terms']
const DEVICES = ['mobile', 'tablet', 'desktop']

const failedByAudit = {} // auditId -> { title, category, weight, pages:Set }
const perfOpps = {} // auditId -> { title, savings, pages }

function note(auditId, audit, category, device, page) {
  if (!audit) return
  const score = audit.score
  if (score !== null && score !== undefined && score >= 1) return // passing
  const key = auditId
  if (!failedByAudit[key]) {
    failedByAudit[key] = { title: audit.title, category, weight: audit.weight || 0, pages: new Set(), worstScore: score, devices: new Set() }
  }
  const f = failedByAudit[key]
  f.pages.add(`${page}/${device}`)
  f.devices.add(device)
  if (score !== null && score !== undefined && score < (f.worstScore ?? 1)) f.worstScore = score
}

for (const dev of DEVICES) {
  for (const page of PAGES) {
    let lh
    try { lh = JSON.parse(readFileSync(`lighthouse/perf-${dev}-${page}.json`, 'utf8')) } catch { continue }
    const a = lh.audits
    // Performance opportunities (biggest savings first)
    const perfRef = lh.categories.performance.auditRefs
    for (const ref of perfRef) {
      const audit = a[ref.id]
      if (!audit || audit.score === null || audit.score >= 1) continue
      const savings = audit.details?.overallSavingsMs || audit.details?.overallSavingsBytes || 0
      const k = ref.id
      if (!perfOpps[k]) perfOpps[k] = { title: audit.title, savings, pages: new Set(), ms: 0, bytes: 0 }
      perfOpps[k].pages.add(`${page}/${dev}`)
      perfOpps[k].ms = Math.max(perfOpps[k].ms, audit.details?.overallSavingsMs || 0)
      perfOpps[k].bytes = Math.max(perfOpps[k].bytes, audit.details?.overallSavingsBytes || 0)
      if (savings > perfOpps[k].savings) perfOpps[k].savings = savings
    }
    // Category audits
    for (const catId of ['accessibility', 'best-practices', 'seo']) {
      for (const ref of lh.categories[catId].auditRefs) {
        const audit = a[ref.id]
        if (!audit) continue
        note(ref.id, audit, catId, dev, page)
      }
    }
  }
}

console.log('==================== ACCESSIBILITY / BEST-PRACTICES / SEO failures ====================')
const grouped = { accessibility: [], 'best-practices': [], seo: [] }
for (const [id, f] of Object.entries(failedByAudit)) grouped[f.category]?.push([id, f])
for (const cat of ['accessibility', 'best-practices', 'seo']) {
  console.log(`\n--- ${cat.toUpperCase()} ---`)
  const list = grouped[cat].sort((a, b) => b[1].pages.size - a[1].pages.size)
  if (!list.length) console.log('  (all pass)')
  for (const [id, f] of list) {
    console.log(`  [${id}] score=${f.worstScore} w=${f.weight} affects=${f.pages.size} runs`)
    console.log(`      ${f.title}`)
    console.log(`      e.g. ${[...f.pages].slice(0, 4).join(', ')}`)
  }
}

console.log('\n==================== PERFORMANCE opportunities (by max savings) ====================')
const oppList = Object.entries(perfOpps).sort((a, b) => b[1].savings - a[1].savings)
for (const [id, o] of oppList) {
  console.log(`  [${id}] affects=${o.pages.size} runs | maxMs=${o.ms} | maxBytes=${o.bytes}`)
  console.log(`      ${o.title}`)
}
