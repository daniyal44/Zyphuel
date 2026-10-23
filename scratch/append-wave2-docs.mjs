// Appends Wave 2 SEO changelog rows to page docs + changes.md (EOL-safe).
import fs from 'fs'

const rows = {
  'docs/pages/home.md': '| **2026-10-23 (Wave 2)** | **Trending-PAA Q&A expansion + price-intent keywords**: AEO hub grew 14 → 18 questions — 4 observed Google PAA queries added (Which app delivers petrol in Lahore? / Can I have petrol delivered to my home? / What is doorstep diesel delivery? / Can diesel be delivered at home?) mirrored in the FAQPage schema (`prerender.js` + `index.html`, every item `@type: Question`) and in `llms.txt` canonical answers. Keyword array + static meta keywords gained Wave-2 terms (`petrol price in Pakistan today`, `diesel price in Pakistan today`, `which app delivers petrol`, `doorstep diesel delivery`, `best delivery app in Pakistan` etc.). | User: jo keywords search engine par trend ho rahe hain wo site par lagao — master plan banakar action lo. |',
  'docs/pages/order.md': '| **2026-10-23 (Wave 2)** | **Transactional keyword top-ups** in `useSEO` + prerendered meta: `order petrol online near me`, `buy petrol online Lahore`, `fuel home delivery near me`, `doorstep fuel delivery cost`, `can I buy petrol online in Pakistan`, `24/7 fuel delivery Lahore`. | User: har field mein trending keywords se rank karo. |',
  'docs/pages/download.md': '| **2026-10-23 (Wave 2)** | **App-intent keyword top-ups** in `useSEO` + prerendered meta: `which app delivers petrol`, `best fuel delivery app Pakistan`, `petrol delivery app download`, `fuel delivery app with GPS tracking`. | User: har field mein trending keywords se rank karo. |',
  'docs/pages/services.md': '| **2026-10-23 (Wave 2)** | **Service/price keyword top-ups** in `useSEO` + prerendered meta: `diesel delivery companies`, `load shedding generator fuel Lahore`, `standby generator diesel delivery`, `fuel supplier Lahore`. | User: har field mein trending keywords se rank karo. |',
  'docs/pages/contact.md': '| **2026-10-23 (Wave 2)** | **Support keyword top-ups** in `useSEO` + prerendered meta: `Zyphuel WhatsApp number`, `petrol delivery contact number Lahore`, `fuel delivery customer care`. | User: har field mein trending keywords se rank karo. |',
  'docs/pages/about.md': '| **2026-10-23 (Wave 2)** | **Company keyword top-ups** in `useSEO` + prerendered meta: `fuel delivery startup Pakistan`, `doorstep fuel delivery company`, `Zyphuel fuel company Lahore`. | User: har field mein trending keywords se rank karo. |',
  'docs/pages/blog.md': '| **2026-10-23 (Wave 2)** | **Price/news keyword expansion + meta description update**: added `petrol price in Pakistan today`, `diesel price today Pakistan`, `OGRA fuel price update`, `fuel price news Pakistan`, `load shedding generator fuel`, `high octane petrol price Pakistan`; description now leads with petrol & diesel prices in Pakistan. | User: daily-pricing news cluster capture. |'
}

let changes = ''
for (const [file, row] of Object.entries(rows)) {
  const raw = fs.readFileSync(file, 'utf8')
  const eol = raw.includes('\r\n') ? '\r\n' : '\n'
  const lines = raw.split(/\r?\n/)
  // Tables are newest-first: insert before the FIRST 2026-10-2x row (top of table).
  let idx = -1
  for (let i = 0; i < lines.length; i++) {
    if (/^\| \*\*2026-10-2\d/.test(lines[i])) { idx = i; break }
  }
  if (idx === -1) { console.log('SKIP (no changelog row): ' + file); continue }
  lines.splice(idx, 0, row)
  fs.writeFileSync(file, lines.join(eol))
  console.log('ROW → ' + file)
}

const section = `

### 31. Wave 2 — trending keyword sweep (fresh SERP research → implementation)

- **Fresh research (Oct 2026 SERP snapshot)**: 4 observed Google PAA questions were unanswered on-site — "Which app delivers petrol?", "Can I have petrol delivered?", "What is doorstep diesel delivery?", "Can diesel be delivered at home?" — plus the **daily fuel-pricing cluster** ("petrol price in Pakistan today", "diesel price in Pakistan today", "OGRA/PSO petrol price today") identified as the biggest untapped volume (Pakistan moved to daily pricing in July 2026).
- **Home**: Q&A hub 14 → 18 questions (visible accordion + FAQPage schema in \`prerender.js\` and \`index.html\`) + 9 Wave-2 keywords incl. price-intent terms.
- **Schema defect caught during verification**: the 4 new schema objects initially shipped without \`"@type": "Question"\` (JSON parsed fine but items were semantically incomplete — count showed 14, not 18). Fixed in both files; dist now reports **18 Question items**.
- **Stale prerendered meta keywords found**: \`prerender.js\` keeps its own per-route keyword strings, separate from the JSX \`useSEO\` arrays — all 7 routes (home/about/services/download/order/contact/blog) resynced with the current page arrays, and the static \`index.html\` meta keywords resynced as well.
- **Keyword top-ups** (useSEO + prerender meta): Order +6, Download +4, Services +4, Contact +3, About +3, Blog +6 — full map in [master plan §6.3](./plans/2026-10-23-seo-master-plan.md).
- \`llms.txt\`: canonical answers extended with the 4 new PAA questions (AI crawlers cite identical facts).
- **Verification**: build exit 0; all JSON-LD parse; FAQPage = 18 Question items; Wave-2 terms present in every page's prerendered meta keywords; \`node --check prerender.js\` OK; Home Lighthouse Accessibility/Best-Practices/SEO = **100/100/100**.
- Deliberately **not** answered: "Is doorstep fuel delivery legal in Pakistan?" — research found no verifiable legal answer; truthfulness rule forbids unqualified compliance claims.
`

const cfile = 'docs/changes.md'
const craw = fs.readFileSync(cfile, 'utf8')
const ceol = craw.includes('\r\n') ? '\r\n' : '\n'
fs.writeFileSync(cfile, craw.replace(/\s*$/, '') + section.replace(/\n/g, ceol) + ceol)
console.log('SECTION → docs/changes.md')
