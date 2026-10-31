/**
 * Zyphuel — repository change-velocity graph.
 *
 * Produces a committed, dependency-free 2D chart from the real git history:
 *   x-axis  ISO week
 *   y-left  commits merged that week (bars)
 *   y-right files touched that week (line)
 *
 * Both SVG and PNG are written to docs/reports/charts/, so the graph renders on
 * GitHub, in the editor and in clients that refuse SVG. Nothing here is
 * hand-typed: every number comes from `git log --shortstat`.
 *
 * Usage: node scripts/make-activity-graph.mjs [--weeks 12]
 */

import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const chartsDir = path.resolve(root, 'docs/reports/charts')

const weeksArg = process.argv.indexOf('--weeks')
const WINDOW = weeksArg > -1 ? Math.max(4, Number(process.argv[weeksArg + 1]) || 12) : 12

function git(args) {
  const out = spawnSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  if (out.status !== 0) {
    console.error(out.stderr)
    process.exit(out.status || 1)
  }
  return out.stdout
}

const log = git(['log', '--date=short', '--pretty=format:%ad', '--shortstat'])
const headSha = git(['rev-parse', '--short', 'HEAD']).trim()

function isoWeek(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  const day = (date.getUTCDay() + 6) % 7 // Monday = 0
  date.setUTCDate(date.getUTCDate() - day + 3) // Thursday of this week
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4))
  const fday = (firstThursday.getUTCDay() + 6) % 7
  firstThursday.setUTCDate(firstThursday.getUTCDate() - fday + 3)
  const week = 1 + Math.round((date - firstThursday) / (7 * 24 * 3600 * 1000))
  return { key: `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`, week, year: date.getUTCFullYear() }
}

const buckets = new Map()
let current = null

for (const rawLine of log.split('\n')) {
  const line = rawLine.trim()
  if (!line) continue
  if (/^\d{4}-\d{2}-\d{2}$/.test(line)) {
    const { key, week } = isoWeek(line)
    current = key
    if (!buckets.has(key)) buckets.set(key, { key, week, commits: 0, files: 0, insertions: 0, deletions: 0 })
    buckets.get(key).commits += 1
    continue
  }
  const stat = line.match(
    /(\d+) files? changed(?:, (\d+) insertions?\(\+\))?(?:, (\d+) deletions?\(-\))?/
  )
  if (stat && current) {
    const bucket = buckets.get(current)
    bucket.files += Number(stat[1])
    bucket.insertions += Number(stat[2] || 0)
    bucket.deletions += Number(stat[3] || 0)
  }
}

function mondayOfIsoWeek(year, week) {
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const jan4Day = (jan4.getUTCDay() + 6) % 7
  const monday = new Date(jan4)
  monday.setUTCDate(jan4.getUTCDate() - jan4Day + (week - 1) * 7)
  return monday
}

const allWeeks = [...buckets.values()].sort((a, b) => a.key.localeCompare(b.key))
if (!allWeeks.length) {
  console.error('No git history found')
  process.exit(1)
}

// Fill weeks with no commits so the x-axis is a continuous time scale instead
// of evenly spacing uneven gaps.
function withEmptyWeeks(weeks) {
  if (!weeks.length) return weeks
  const [firstYear, firstWeek] = weeks[0].key.split('-W').map(Number)
  const [lastYear, lastWeek] = weeks.at(-1).key.split('-W').map(Number)
  const cursor = mondayOfIsoWeek(firstYear, firstWeek)
  const end = mondayOfIsoWeek(lastYear, lastWeek)
  const known = new Map(weeks.map((w) => [w.key, w]))
  const filled = []
  while (cursor <= end) {
    const { key, week } = isoWeek(cursor.toISOString().slice(0, 10))
    filled.push(known.get(key) || { key, week, commits: 0, files: 0, insertions: 0, deletions: 0 })
    cursor.setUTCDate(cursor.getUTCDate() + 7)
  }
  return filled
}

const continuous = withEmptyWeeks(allWeeks)
const series = continuous.slice(-WINDOW)
const totals = allWeeks.reduce(
  (acc, w) => ({
    commits: acc.commits + w.commits,
    files: acc.files + w.files,
    insertions: acc.insertions + w.insertions,
    deletions: acc.deletions + w.deletions,
  }),
  { commits: 0, files: 0, insertions: 0, deletions: 0 }
)

function niceMax(value) {
  if (value <= 5) return 5
  const magnitude = 10 ** Math.floor(Math.log10(value / 5))
  const step = magnitude >= 1 ? magnitude : 1
  return Math.ceil((value * 1.05) / step) * step
}

const commitsMax = niceMax(Math.max(...series.map((w) => w.commits)))
const filesMax = niceMax(Math.max(...series.map((w) => w.files)))

const W = 960
const H = 470
const M = { top: 92, right: 74, bottom: 72, left: 66 }
const plotW = W - M.left - M.right
const plotH = H - M.top - M.bottom

const x = (i) => M.left + (plotW / series.length) * (i + 0.5)
const yCommits = (v) => M.top + plotH - (v / commitsMax) * plotH
const yFiles = (v) => M.top + plotH - (v / filesMax) * plotH

const barW = Math.min(46, (plotW / series.length) * 0.56)
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const fmt = (n) => n.toLocaleString('en-US')

const yTicks = 5
const grid = []
for (let t = 0; t <= yTicks; t++) {
  const value = (commitsMax / yTicks) * t
  const y = yCommits(value)
  grid.push(`<line x1="${M.left}" y1="${y.toFixed(1)}" x2="${(M.left + plotW).toFixed(1)}" y2="${y.toFixed(1)}" stroke="#e7ecf3" stroke-width="1"/>`)
  grid.push(`<text x="${M.left - 12}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="#64748b">${Math.round(value)}</text>`)
  grid.push(`<text x="${(M.left + plotW + 12).toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="start" font-size="12" fill="#0f766e">${fmt(Math.round((filesMax / yTicks) * t))}</text>`)
}

const barRects = series
  .map((w, i) => {
    const y = yCommits(w.commits)
    const height = Math.max(1, M.top + plotH - y)
    return `<rect x="${(x(i) - barW / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${height.toFixed(1)}" rx="4" fill="url(#barGrad)"/>`
  })
  .join('')

const barLabels = series
  .map((w, i) => {
    const y = yCommits(w.commits)
    return `<text x="${x(i).toFixed(1)}" y="${(y - 8).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="#0f172a" paint-order="stroke" stroke="#ffffff" stroke-width="3" stroke-linejoin="round">${w.commits}</text>`
  })
  .join('')

const linePoints = series.map((w, i) => `${x(i).toFixed(1)},${yFiles(w.files).toFixed(1)}`).join(' ')
const dots = series
  .map((w, i) => `<circle cx="${x(i).toFixed(1)}" cy="${yFiles(w.files).toFixed(1)}" r="4" fill="#ffffff" stroke="#0f766e" stroke-width="2.5"/>`)
  .join('')

const labels = series
  .map((w, i) => `<text x="${x(i).toFixed(1)}" y="${(M.top + plotH + 24).toFixed(1)}" text-anchor="middle" font-size="11.5" fill="#334155">${w.key.split('-')[1]}</text>`)
  .map((s) => s)
  .join('')

const years = series
  .map((w, i) => `<text x="${x(i).toFixed(1)}" y="${(M.top + plotH + 42).toFixed(1)}" text-anchor="middle" font-size="10" fill="#94a3b8">${w.key.split('-')[0]}</text>`)
  .join('')

const generated = new Date().toISOString().slice(0, 10)

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Zyphuel repository change velocity: commits and files changed per ISO week">
  <title>Zyphuel repository change velocity</title>
  <defs>
    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
    <style>
      text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    </style>
  </defs>
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <text x="${M.left}" y="34" font-size="19" font-weight="800" fill="#0f172a">Zyphuel — Repository Change Velocity</text>
  <text x="${M.left}" y="56" font-size="12.5" fill="#64748b">Last ${series.length} ISO weeks of real git history · x-axis = week · y-left = commits · y-right = files changed</text>
  <rect x="${W - 300}" y="26" width="14" height="10" rx="2" fill="url(#barGrad)"/>
  <text x="${W - 280}" y="35" font-size="11.5" fill="#334155">commits / week</text>
  <line x1="${W - 176}" y1="31" x2="${W - 152}" y2="31" stroke="#0f766e" stroke-width="2.5"/>
  <circle cx="${W - 164}" cy="31" r="4" fill="#ffffff" stroke="#0f766e" stroke-width="2"/>
  <text x="${W - 144}" y="35" font-size="11.5" fill="#334155">files / week</text>

  ${grid.join('\n  ')}

  <line x1="${M.left}" y1="${M.top}" x2="${M.left}" y2="${M.top + plotH}" stroke="#94a3b8" stroke-width="1.2"/>
  <line x1="${M.left}" y1="${M.top + plotH}" x2="${M.left + plotW}" y2="${M.top + plotH}" stroke="#94a3b8" stroke-width="1.2"/>
  <line x1="${M.left + plotW}" y1="${M.top}" x2="${M.left + plotW}" y2="${M.top + plotH}" stroke="#5eead4" stroke-width="1.2"/>

  <text x="${M.left - 12}" y="${M.top - 14}" text-anchor="end" font-size="11.5" font-weight="700" fill="#0369a1">commits</text>
  <text x="${M.left + plotW + 12}" y="${M.top - 14}" font-size="11.5" font-weight="700" fill="#0f766e">files</text>

  ${barRects}

  <polyline points="${linePoints}" fill="none" stroke="#0f766e" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
  ${dots}
  ${barLabels}
  ${labels}
  ${years}

  <text x="${M.left}" y="${H - 16}" font-size="10.5" fill="#94a3b8">Generated ${generated} from git log through ${headSha} · ${fmt(totals.commits)} commits · ${fmt(totals.files)} file changes across ${allWeeks.length} active weeks</text>
</svg>
`

const cleanSvg = svg

fs.mkdirSync(chartsDir, { recursive: true })
const svgPath = path.join(chartsDir, 'development-activity.svg')
const pngPath = path.join(chartsDir, 'development-activity.png')
fs.writeFileSync(svgPath, cleanSvg, 'utf8')
await sharp(Buffer.from(cleanSvg), { density: 200 }).png().toFile(pngPath)

console.log(`Wrote ${path.relative(root, svgPath)} and ${path.relative(root, pngPath)}`)
console.log(`Window: ${series[0].key} → ${series.at(-1).key} (${series.length} weeks) through ${headSha}`)
console.log(`Totals: ${totals.commits} commits, ${totals.files} files, +${totals.insertions}/-${totals.deletions}`)
for (const w of series) {
  console.log(`  ${w.key}  commits=${String(w.commits).padStart(3)}  files=${String(w.files).padStart(5)}`)
}
console.log(`Active weeks with commits: ${allWeeks.length} · continuous axis weeks rendered: ${series.length}`)
