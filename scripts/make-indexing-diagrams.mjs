/**
 * Generates annotated interface diagrams for the Search Console / Bing
 * request-indexing walkthrough.
 *
 * These are DIAGRAMS, not screenshots: they redraw the relevant panel with the
 * exact button labels and put a numbered marker on the control to click. The
 * caption on every image says so explicitly, because a diagram presented as a
 * screenshot would be misleading.
 *
 * Usage: node scripts/make-indexing-diagrams.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../docs/seo/images')
fs.mkdirSync(outDir, { recursive: true })

const FONT = 'Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif'
const W = 1200
const H = 820

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Caption sits ABOVE its panel so nothing can overlap the panel contents. */
const panel = (x, y, w, h, label) => `
<text x="${x}" y="${y - 10}" font-family="${FONT}" font-size="11" font-weight="bold" fill="#64748b" letter-spacing="1.2">${esc(label)}</text>
<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>`

const marker = (x, y, n) => `
<circle cx="${x}" cy="${y}" r="15" fill="#dc2626"/>
<text x="${x}" y="${y + 5}" font-family="${FONT}" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">${n}</text>`

const button = (x, y, w, label, primary = true, h = 40) => `
<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${primary ? '#1a73e8' : '#ffffff'}" stroke="${primary ? '#1a73e8' : '#cbd5e1'}"/>
<text x="${x + w / 2}" y="${y + h / 2 + 5}" font-family="${FONT}" font-size="13" font-weight="bold" fill="${primary ? '#ffffff' : '#1e293b'}" text-anchor="middle">${esc(label)}</text>`

const callout = (x, y, n, line1, line2, w = 418) => `
<rect x="${x}" y="${y}" width="${w}" height="60" rx="9" fill="#fff7ed" stroke="#fdba74"/>
${marker(x + 26, y + 30, n)}
<text x="${x + 52}" y="${y + 26}" font-family="${FONT}" font-size="12" fill="#7c2d12">${esc(line1)}</text>
<text x="${x + 52}" y="${y + 45}" font-family="${FONT}" font-size="12" fill="#7c2d12">${esc(line2)}</text>`

const sidebar = (active, extra = []) => {
  const items = ['Overview', 'URL Inspection', 'Performance', 'Indexing › Pages', 'Sitemaps', 'Settings', ...extra]
  let out = `<rect x="48" y="182" width="212" height="600" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>`
  items.forEach((item, i) => {
    const y = 218 + i * 38
    const isActive = item === active
    if (isActive) out += `<rect x="58" y="${y - 19}" width="192" height="30" rx="7" fill="#e0f2fe"/>`
    out += `<text x="70" y="${y}" font-family="${FONT}" font-size="13" fill="${isActive ? '#0369a1' : '#475569'}" font-weight="${isActive ? 'bold' : 'normal'}">${esc(item)}</text>`
  })
  return out
}

function frame(title, subtitle, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img">
<title>${esc(title)}</title>
<rect width="${W}" height="${H}" fill="#eef2f7"/>
<rect x="24" y="24" width="${W - 48}" height="${H - 48}" rx="12" fill="#ffffff" stroke="#cbd5e1"/>
<rect x="24" y="24" width="${W - 48}" height="44" rx="12" fill="#f1f5f9"/>
<rect x="24" y="56" width="${W - 48}" height="12" fill="#f1f5f9"/>
<circle cx="48" cy="46" r="6" fill="#ef4444"/><circle cx="68" cy="46" r="6" fill="#f59e0b"/><circle cx="88" cy="46" r="6" fill="#22c55e"/>
<rect x="112" y="34" width="${W - 300}" height="24" rx="12" fill="#ffffff" stroke="#cbd5e1"/>
<text x="128" y="51" font-family="${FONT}" font-size="12" fill="#64748b">search.google.com / bing.com/webmasters — diagram, not a screenshot</text>
<text x="${W - 60}" y="51" font-family="${FONT}" font-size="11" font-weight="bold" fill="#f97316" text-anchor="end">DIAGRAM</text>
<text x="48" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="#0f172a">${esc(title)}</text>
<text x="48" y="130" font-family="${FONT}" font-size="13" fill="#475569">${esc(subtitle)}</text>
<rect x="48" y="146" width="${W - 96}" height="1" fill="#e2e8f0"/>
${body}
<text x="${W / 2}" y="${H - 34}" font-family="${FONT}" font-size="11" fill="#94a3b8" text-anchor="middle">Annotated interface diagram drawn for this guide. Button labels are exactly as they appear in the live tools; your screen may differ slightly.</text>
</svg>`
}

// ── Diagram 1 ───────────────────────────────────────────────────────────────
{
  const body = `
${sidebar('URL Inspection')}
${panel(284, 200, 868, 110, 'SEARCH BAR — TOP OF EVERY PAGE')}
<rect x="304" y="224" width="720" height="44" rx="22" fill="#ffffff" stroke="#cbd5e1"/>
<text x="324" y="251" font-family="${FONT}" font-size="13" fill="#0f172a">https://zyphuel.netlify.app/services/</text>
<rect x="988" y="229" width="34" height="34" rx="17" fill="#1a73e8"/>
<text x="1005" y="252" font-family="${FONT}" font-size="15" fill="#ffffff" text-anchor="middle">&#8594;</text>
${marker(296, 246, 1)}

${panel(284, 348, 868, 260, 'URL INSPECTION RESULT')}
<text x="304" y="384" font-family="${FONT}" font-size="16" font-weight="bold" fill="#0f172a">URL is on Google</text>
<text x="304" y="407" font-family="${FONT}" font-size="12" fill="#475569">https://zyphuel.netlify.app/services/ · last crawl today</text>
${button(852, 366, 150, 'View crawled page', false)}
${button(1014, 366, 138, 'Test Live URL')}
${marker(1004, 356, 2)}
<rect x="304" y="432" width="828" height="156" rx="8" fill="#ffffff" stroke="#e2e8f0"/>
<text x="324" y="458" font-family="${FONT}" font-size="11" font-weight="bold" fill="#64748b" letter-spacing="1">LIVE TEST RESULT</text>
<text x="324" y="486" font-family="${FONT}" font-size="13" fill="#0f172a">✓ URL is available to Google</text>
<text x="324" y="512" font-family="${FONT}" font-size="12" fill="#475569">Crawl allowed: yes · Page fetch: successful · Indexing allowed: yes</text>
<text x="324" y="538" font-family="${FONT}" font-size="12" fill="#475569">Detected items: WebPage, Service, FAQPage, BreadcrumbList, Organization</text>
<text x="324" y="568" font-family="${FONT}" font-size="12" fill="#94a3b8">Takes 30–90 seconds. Keep the tab open until it finishes.</text>

${callout(284, 640, 1, 'Paste the full URL with https:// and the trailing slash,', 'then press Enter to run URL Inspection.')}
${callout(734, 640, 2, 'Click "Test Live URL" — it refetches the page live.', 'Wait for "URL is available to Google" before continuing.')}
`
  fs.writeFileSync(path.join(outDir, 'gsc-step1-test-live-url.svg'), frame('Step 1 — URL Inspection: paste the URL and test it live', 'Google Search Console › URL Inspection (left sidebar)', body))
}

// ── Diagram 2 ───────────────────────────────────────────────────────────────
{
  const body = `
${sidebar('URL Inspection')}
${panel(284, 200, 868, 140, 'INSPECTION RESULT')}
<text x="304" y="238" font-family="${FONT}" font-size="16" font-weight="bold" fill="#0f172a">URL is not on Google</text>
<text x="304" y="262" font-family="${FONT}" font-size="12" fill="#475569">https://zyphuel.netlify.app/order/</text>
<text x="304" y="288" font-family="${FONT}" font-size="12" fill="#475569">Page is not indexed: Crawled - currently not indexed</text>
${button(842, 232, 150, 'Test Live URL', false)}
${button(1004, 232, 148, 'Request Indexing')}
${marker(994, 222, 1)}

${panel(284, 368, 868, 210, 'WHAT HAPPENS WHEN YOU CLICK IT')}
<text x="304" y="404" font-family="${FONT}" font-size="13" fill="#0f172a">1. A dialog opens with "Requesting indexing…" and runs for 30–60 seconds.</text>
<text x="304" y="432" font-family="${FONT}" font-size="13" fill="#0f172a">2. It ends with "Indexing requested" and a "Got it" acknowledgement.</text>
<text x="304" y="460" font-family="${FONT}" font-size="13" fill="#0f172a">3. The URL is queued for a fresh crawl, usually within 1–3 days.</text>
<text x="304" y="488" font-family="${FONT}" font-size="13" fill="#0f172a">4. Indexing itself still depends on Google's judgement of the page.</text>
<text x="304" y="524" font-family="${FONT}" font-size="12" fill="#94a3b8">Daily quota is limited (roughly 10–12 submissions per property). Submit only</text>
<text x="304" y="546" font-family="${FONT}" font-size="12" fill="#94a3b8">URLs you actually changed — all three below qualify.</text>

${panel(284, 606, 868, 128, 'REPEAT FOR EACH URL')}
<text x="304" y="640" font-family="${FONT}" font-size="13" fill="#0f172a">https://zyphuel.netlify.app/services/</text>
<text x="304" y="664" font-family="${FONT}" font-size="13" fill="#0f172a">https://zyphuel.netlify.app/download/</text>
<text x="304" y="688" font-family="${FONT}" font-size="13" fill="#0f172a">https://zyphuel.netlify.app/order/</text>
<text x="700" y="640" font-family="${FONT}" font-size="12" fill="#475569">Wait 2–3 minutes between submissions;</text>
<text x="700" y="660" font-family="${FONT}" font-size="12" fill="#475569">rapid clicking can hit the quota throttle.</text>
${marker(1136, 676, 2)}
`
  fs.writeFileSync(path.join(outDir, 'gsc-step2-request-indexing.svg'), frame('Step 2 — Click "Request Indexing" and wait for the confirmation', 'Google Search Console › URL Inspection result panel', body))
}

// ── Diagram 3 ───────────────────────────────────────────────────────────────
{
  const body = `
${sidebar('Indexing › Pages')}
${panel(284, 200, 868, 156, 'INDEXING › PAGES')}
<text x="304" y="236" font-family="${FONT}" font-size="15" font-weight="bold" fill="#0f172a">Page indexing</text>
<text x="304" y="262" font-family="${FONT}" font-size="12" fill="#475569">Why pages aren't indexed</text>
<rect x="304" y="274" width="828" height="62" rx="8" fill="#fef2f2" stroke="#fecaca"/>
<text x="324" y="300" font-family="${FONT}" font-size="13" font-weight="bold" fill="#991b1b">Crawled - currently not indexed</text>
<text x="324" y="322" font-family="${FONT}" font-size="12" fill="#7f1d1d">3 pages · /services/ · /download/ · /order/</text>
${marker(1108, 305, 1)}

${panel(284, 388, 868, 236, 'DRILL-DOWN')}
<text x="304" y="424" font-family="${FONT}" font-size="13" fill="#0f172a">Click the reason row to open the list of affected URLs.</text>
<text x="304" y="450" font-family="${FONT}" font-size="13" fill="#0f172a">Select all three URLs, then use the action button:</text>
${button(304, 470, 190, 'VALIDATE FIX', false)}
${marker(294, 460, 2)}
<text x="524" y="494" font-family="${FONT}" font-size="12" fill="#475569">starts a monitored recrawl for the whole issue</text>
<text x="304" y="534" font-family="${FONT}" font-size="12" fill="#475569">Status moves "Started" → "Passed" or "Failed" over about 1–4 weeks.</text>
<text x="304" y="558" font-family="${FONT}" font-size="12" fill="#475569">Do this only after the new content is live, otherwise Google validates the old version.</text>
<text x="304" y="590" font-family="${FONT}" font-size="12" fill="#94a3b8">While you are here, check that the count in "Indexed" rises by three.</text>

${panel(284, 656, 868, 110, 'SITEMAPS — SAME VISIT, ONE TIME')}
<text x="304" y="690" font-family="${FONT}" font-size="13" fill="#0f172a">Indexing › Sitemaps → enter "sitemap.xml" → Submit</text>
<text x="304" y="716" font-family="${FONT}" font-size="12" fill="#475569">Status should become "Success" with 23 discovered URLs.</text>
${marker(1108, 700, 3)}
`
  fs.writeFileSync(path.join(outDir, 'gsc-step3-validate-fix.svg'), frame('Step 3 — Pages report: group the three URLs and validate the fix', 'Google Search Console › Indexing › Pages', body))
}

// ── Diagram 4 ───────────────────────────────────────────────────────────────
{
  const bingItems = ['URL Submission', 'Dashboard', 'Sitemaps', 'Site Explorer', 'Site Scan', 'IndexNow']
  let nav = `<rect x="48" y="182" width="212" height="600" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>
<text x="70" y="206" font-family="${FONT}" font-size="11" font-weight="bold" fill="#64748b" letter-spacing="0.8">BING WEBMASTER TOOLS</text>`
  bingItems.forEach((item, i) => {
    const y = 242 + i * 38
    const active = item === 'URL Submission'
    if (active) nav += `<rect x="58" y="${y - 19}" width="192" height="30" rx="7" fill="#e0f2fe"/>`
    nav += `<text x="70" y="${y}" font-family="${FONT}" font-size="13" fill="${active ? '#0369a1' : '#475569'}" font-weight="${active ? 'bold' : 'normal'}">${esc(item)}</text>`
  })

  const body = `
${nav}
${panel(284, 200, 868, 180, 'SUBMIT URLS')}
<text x="304" y="234" font-family="${FONT}" font-size="13" fill="#0f172a">Submit up to 10,000 URLs per day for a verified site.</text>
<rect x="304" y="248" width="640" height="110" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
<text x="322" y="274" font-family="${FONT}" font-size="12" fill="#0f172a">https://zyphuel.netlify.app/services/</text>
<text x="322" y="300" font-family="${FONT}" font-size="12" fill="#0f172a">https://zyphuel.netlify.app/download/</text>
<text x="322" y="326" font-family="${FONT}" font-size="12" fill="#0f172a">https://zyphuel.netlify.app/order/</text>
${marker(296, 262, 1)}
${button(968, 300, 120, 'Submit', true, 38)}
${marker(1106, 319, 2)}

${panel(284, 416, 868, 190, 'BEFORE YOU CAN SUBMIT')}
<text x="304" y="452" font-family="${FONT}" font-size="13" fill="#0f172a">1. bing.com/webmasters → Add site → https://zyphuel.netlify.app/</text>
<text x="304" y="480" font-family="${FONT}" font-size="13" fill="#0f172a">2. Verify with "Import from Google Search Console" (one click, fastest).</text>
<text x="304" y="508" font-family="${FONT}" font-size="13" fill="#0f172a">3. Wait for the verification email, then reopen URL Submission.</text>
<text x="304" y="544" font-family="${FONT}" font-size="12" fill="#475569">Without verification IndexNow answers 403 — exactly what the build's IndexNow</text>
<text x="304" y="566" font-family="${FONT}" font-size="12" fill="#475569">step returned for Bing while Yandex accepted the same three URLs.</text>

${panel(284, 642, 868, 124, 'EXPECTED RESULT')}
<text x="304" y="676" font-family="${FONT}" font-size="13" fill="#0f172a">"URLs submitted successfully" with a count of 3.</text>
<text x="304" y="702" font-family="${FONT}" font-size="12" fill="#475569">Bing usually recrawls within 24–72 hours; Index Explorer shows the outcome.</text>
<text x="304" y="728" font-family="${FONT}" font-size="12" fill="#475569">If a URL is rejected, the message names the reason (blocked, redirect, 404).</text>
`
  fs.writeFileSync(path.join(outDir, 'bing-step1-url-submission.svg'), frame('Bing — submit the three URLs after verifying the site', 'Bing Webmaster Tools › URL Submission', body))
}

// ── Rasterise ───────────────────────────────────────────────────────────────
const svgs = fs.readdirSync(outDir).filter((f) => f.endsWith('.svg'))
for (const file of svgs) {
  const svg = fs.readFileSync(path.join(outDir, file))
  await sharp(svg, { density: 160 })
    .resize({ width: 2400 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, file.replace(/\.svg$/, '.png')))
  console.log('wrote', file.replace(/\.svg$/, '.png'))
}
console.log(`Done: ${svgs.length} diagram(s)`)
