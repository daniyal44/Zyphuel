// Quick categorical check: a11y / best-practices / SEO on every page (no perf).
import { execFileSync } from 'node:child_process'
import { readFileSync, mkdirSync, existsSync } from 'node:fs'
const BASE = process.env.BASE || 'http://localhost:5184'
const PAGES = [['home','/'],['about','/about/'],['services','/services/'],['order','/order/'],['contact','/contact/'],['blog','/blog/'],['download','/download/'],['privacy','/privacy/'],['terms','/terms/']]
mkdirSync('cat', { recursive: true })
let worst = { accessibility: 100, 'best-practices': 100, seo: 100 }
for (const [name, path] of PAGES) {
  const file = `cat/${name}.json`
  try {
    execFileSync('npx', ['lighthouse', BASE + path, '--preset=desktop', '--output=json', '--output-path=' + file,
      '--only-categories=accessibility,best-practices,seo', '--quiet'], { stdio: 'pipe', timeout: 120000, shell: true })
  } catch (e) { if (!existsSync(file)) { console.log(name, 'FAILED'); continue } }
  const lh = JSON.parse(readFileSync(file, 'utf8'))
  const s = (k) => Math.round((lh.categories[k].score || 0) * 100)
  const a = s('accessibility'), b = s('best-practices'), o = s('seo')
  worst.accessibility = Math.min(worst.accessibility, a)
  worst['best-practices'] = Math.min(worst['best-practices'], b)
  worst.seo = Math.min(worst.seo, o)
  // list failing audits
  const fails = []
  for (const cat of ['accessibility','best-practices','seo'])
    for (const ref of lh.categories[cat].auditRefs) {
      const au = lh.audits[ref.id]
      if (au && au.score !== null && au.score < 1) fails.push(`${ref.id}(${au.score})`)
    }
  console.log(`${name.padEnd(9)} a11y=${a} bp=${b} seo=${o}${fails.length ? '  FAIL: ' + fails.join(', ') : ''}`)
}
console.log('\nWORST:', JSON.stringify(worst))
