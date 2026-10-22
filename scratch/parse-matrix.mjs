// Merge every lighthouse/perf-*.json into one matrix: scores + core metrics.
import { readFileSync, writeFileSync } from 'node:fs'

const PAGES = ['home', 'about', 'services', 'order', 'contact', 'blog', 'download', 'privacy', 'terms']
const DEVICES = ['mobile', 'tablet', 'desktop']
const rows = []
const missing = []

for (const dev of DEVICES) {
  for (const page of PAGES) {
    const file = `lighthouse/perf-${dev}-${page}.json`
    try {
      const lh = JSON.parse(readFileSync(file, 'utf8'))
      const a = lh.audits
      const cat = (k) => Math.round((lh.categories[k]?.score || 0) * 100)
      rows.push({
        device: dev,
        page,
        perf: cat('performance'),
        a11y: cat('accessibility'),
        bp: cat('best-practices'),
        seo: cat('seo'),
        fcp: Math.round(a['first-contentful-paint'].numericValue),
        lcp: Math.round(a['largest-contentful-paint'].numericValue),
        cls: +(a['cumulative-layout-shift'].numericValue || 0).toFixed(3),
        tbt: Math.round(a['total-blocking-time'].numericValue),
        si: Math.round(a['speed-index'].numericValue),
        tti: Math.round(a['interactive'].numericValue),
        kb: Math.round((a['total-byte-weight'].numericValue || 0) / 1024),
      })
    } catch (e) {
      missing.push(`${dev}/${page}`)
    }
  }
}

// Markdown matrix grouped by page: mobile / tablet / desktop columns.
const byPage = {}
for (const r of rows) (byPage[r.page] ||= {})[r.device] = r

let md = '# Zyphuel Performance Matrix (Lighthouse 13.5, production build)\n\n'
md += 'Metrics: FCP / LCP (ms), TBT (ms), CLS, Speed Index (ms), weight (KB).\n\n'
md += '| Page | Device | Perf | A11y | BP | SEO | FCP | LCP | CLS | TBT | SI | KB |\n'
md += '| :--- | :--- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |\n'
for (const page of PAGES) {
  for (const dev of DEVICES) {
    const r = byPage[page]?.[dev]
    if (!r) { md += `| ${page} | ${dev} | MISSING | - | - | - | - | - | - | - | - | - |\n`; continue }
    md += `| ${page} | ${dev} | ${r.perf} | ${r.a11y} | ${r.bp} | ${r.seo} | ${r.fcp} | ${r.lcp} | ${r.cls} | ${r.tbt} | ${r.si} | ${r.kb} |\n`
  }
}

// Averages per device.
md += '\n## Averages by device\n\n| Device | Perf | A11y | BP | SEO | LCP | CLS | TBT |\n'
md += '| :--- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |\n'
for (const dev of DEVICES) {
  const rs = rows.filter((r) => r.device === dev)
  if (!rs.length) continue
  const avg = (k) => Math.round(rs.reduce((s, r) => s + r[k], 0) / rs.length)
  const avgCls = (rs.reduce((s, r) => s + r.cls, 0) / rs.length).toFixed(3)
  md += `| ${dev} | ${avg('perf')} | ${avg('a11y')} | ${avg('bp')} | ${avg('seo')} | ${avg('lcp')} | ${avgCls} | ${avg('tbt')} |\n`
}

writeFileSync('perf-matrix.md', md)
writeFileSync('perf-matrix.json', JSON.stringify(rows, null, 2))
console.log(md)
if (missing.length) console.log('MISSING:', missing.join(', '))
