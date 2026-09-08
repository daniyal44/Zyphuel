#!/usr/bin/env node
/**
 * Generates an automated, high-resolution SVG graph of Git commits,
 * monthly changes, and yearly development velocity for display in GitHub README.
 * Runs automatically during build or via GitHub Actions on every push.
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function getGitCommits() {
  try {
    const raw = execSync('git log --pretty=format:"%h|%ad|%s" --date=short', { encoding: 'utf8' })
    const lines = raw.trim().split('\n').filter(Boolean)
    return lines.map(line => {
      const [sha, date, ...msg] = line.split('|')
      return { sha, date, message: msg.join('|') }
    })
  } catch (err) {
    console.warn('[GraphGen] Git not found or failed, using fallback:', err.message)
    return [
      { sha: '4f4c521', date: '2026-09-08', message: 'feat: add IndexNow protocol' },
      { sha: '3cfae3a', date: '2026-09-08', message: 'fix(seo): overhaul technical seo' },
      { sha: '95c2192', date: '2026-09-07', message: 'feat(ui): add 3D refueling lifecycle tracker' },
      { sha: 'b3f953c', date: '2026-09-07', message: 'fix(seo): standardize trailing slashes' }
    ]
  }
}

function generateSvg() {
  const commits = getGitCommits()
  const total = commits.length
  const latest = commits[0] || { sha: 'latest', date: 'Today', message: 'Development update' }

  // Aggregate monthly
  const monthMap = {}
  commits.forEach(c => {
    if (c.date && c.date.length >= 7) {
      const key = c.date.substring(0, 7) // 'YYYY-MM'
      monthMap[key] = (monthMap[key] || 0) + 1
    }
  })

  // Aggregate yearly
  const yearMap = {}
  commits.forEach(c => {
    if (c.date && c.date.length >= 4) {
      const key = c.date.substring(0, 4) // 'YYYY'
      yearMap[key] = (yearMap[key] || 0) + 1
    }
  })

  const sortedMonths = Object.keys(monthMap).sort()
  const maxMonthCount = Math.max(...Object.values(monthMap), 1)

  const sortedYears = Object.keys(yearMap).sort()

  const width = 840
  const height = 440

  let monthlyBarsSvg = ''
  const barStartY = 160
  const barHeight = 22
  const barGap = 16

  sortedMonths.forEach((mKey, idx) => {
    const count = monthMap[mKey]
    const [yr, mo] = mKey.split('-')
    const label = `${MONTH_NAMES[parseInt(mo, 10) - 1]} '${yr.slice(-2)}`
    const barWidth = Math.max(30, Math.round((count / maxMonthCount) * 440))
    const y = barStartY + idx * (barHeight + barGap)

    monthlyBarsSvg += `
      <!-- Month: ${label} -->
      <text x="35" y="${y + 16}" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600">${label}</text>
      <rect x="115" y="${y}" width="460" height="${barHeight}" rx="6" fill="rgba(255,255,255,0.04)" />
      <rect x="115" y="${y}" width="${barWidth}" height="${barHeight}" rx="6" fill="url(#barGrad)">
        <animate attributeName="width" from="0" to="${barWidth}" dur="0.8s" fill="freeze" />
      </rect>
      <text x="${115 + barWidth - 10}" y="${y + 15}" fill="#ffffff" font-family="monospace" font-size="11" font-weight="bold" text-anchor="end">${count}</text>
      <text x="590" y="${y + 16}" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12">${count} commits</text>
    `
  })

  let yearlyCardsSvg = ''
  sortedYears.forEach((yr, idx) => {
    const count = yearMap[yr]
    const cardX = 660
    const cardY = 160 + idx * 100

    yearlyCardsSvg += `
      <g transform="translate(${cardX}, ${cardY})">
        <rect width="145" height="85" rx="10" fill="rgba(15,23,42,0.85)" stroke="rgba(14,165,233,0.3)" stroke-width="1.2" />
        <text x="16" y="24" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="600" letter-spacing="0.5">YEAR ${yr}</text>
        <text x="16" y="58" fill="#38bdf8" font-family="sans-serif" font-size="28" font-weight="900">${count}</text>
        <text x="16" y="74" fill="#64748b" font-family="sans-serif" font-size="10">Code revisions</text>
      </g>
    `
  })

  const svgContent = `<svg width="${width}" height="${height}" viewBox="0 0 ${width}" ${height} fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090e1a" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0" />
      <stop offset="50%" stop-color="#38bdf8" stop-opacity="1" />
      <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
    </linearGradient>
  </defs>

  <!-- Background Card -->
  <rect width="${width}" height="${height}" rx="16" fill="url(#bgGrad)" stroke="rgba(14,165,233,0.3)" stroke-width="1.5" />
  <line x1="40" y1="2" x2="800" y2="2" stroke="url(#lineGlow)" stroke-width="2" />

  <!-- Header -->
  <g transform="translate(35, 30)">
    <!-- GitHub Octocat Icon Circle -->
    <rect width="36" height="36" rx="8" fill="rgba(14,165,233,0.15)" stroke="rgba(14,165,233,0.4)" stroke-width="1" />
    <path d="M18 10 C13.58 10 10 13.58 10 18 C10 21.54 12.29 24.53 15.47 25.59 C15.87 25.66 16.02 25.42 16.02 25.21 C16.02 25.02 16.01 24.39 16.01 23.63 C13.79 24.11 13.32 22.68 13.32 22.68 C12.95 21.76 12.43 21.51 12.43 21.51 C11.71 21.01 12.49 21.02 12.49 21.02 C13.28 21.08 13.7 21.84 13.7 21.84 C14.41 23.05 15.56 22.7 16.01 22.5 C16.08 21.99 16.29 21.63 16.51 21.43 C14.73 21.23 12.87 20.54 12.87 17.48 C12.87 16.61 13.18 15.9 13.69 15.34 C13.61 15.14 13.33 14.33 13.77 13.23 C13.77 13.23 14.44 13.01 15.97 14.05 C16.61 13.87 17.29 13.78 17.97 13.78 C18.65 13.78 19.33 13.87 19.97 14.05 C21.5 13.01 22.17 13.23 22.17 13.23 C22.61 14.33 22.33 15.14 22.25 15.34 C22.77 15.9 23.07 16.61 23.07 17.48 C23.07 20.55 21.2 21.23 19.42 21.43 C19.7 21.68 19.96 22.16 19.96 22.9 C19.96 23.95 19.95 24.8 19.95 25.21 C19.95 25.42 20.1 25.67 20.5 25.59 C23.68 24.53 25.97 21.54 25.97 18 C25.97 13.58 22.39 10 18 10 Z" fill="#38bdf8" />

    <text x="48" y="16" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700">Zyphuel — Git Development &amp; Architecture Changes</text>
    <text x="48" y="32" fill="#94a3b8" font-family="sans-serif" font-size="12">Repository: daniyal44/Zyphuel • Auto-Generated on Every Push</text>

    <!-- Pulse Live Badge -->
    <rect x="630" y="2" width="135" height="26" rx="13" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.35)" stroke-width="1" />
    <circle cx="645" cy="15" r="4" fill="#10b981" />
    <text x="656" y="19" fill="#34d399" font-family="sans-serif" font-size="11" font-weight="700">Live Auto-Sync</text>
  </g>

  <!-- Metric Quick Tiles -->
  <g transform="translate(35, 82)">
    <!-- Total Changes -->
    <rect width="180" height="52" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="14" y="20" fill="#94a3b8" font-family="sans-serif" font-size="10" font-weight="600" text-transform="uppercase">TOTAL CHANGES</text>
    <text x="14" y="42" fill="#38bdf8" font-family="sans-serif" font-size="20" font-weight="800">${total} Commits</text>

    <!-- Velocity -->
    <rect x="195" width="180" height="52" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="209" y="20" fill="#94a3b8" font-family="sans-serif" font-size="10" font-weight="600" text-transform="uppercase">DEVELOPMENT STATUS</text>
    <text x="209" y="42" fill="#10b981" font-family="sans-serif" font-size="18" font-weight="800">Continuous Active</text>

    <!-- Latest Commit -->
    <rect x="390" width="380" height="52" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="404" y="20" fill="#94a3b8" font-family="sans-serif" font-size="10" font-weight="600" text-transform="uppercase">LATEST COMMIT (${latest.sha})</text>
    <text x="404" y="41" fill="#e2e8f0" font-family="sans-serif" font-size="11.5" font-weight="500">${latest.message.substring(0, 48)}${latest.message.length > 48 ? '...' : ''}</text>
  </g>

  <!-- Section Title: Monthly Velocity -->
  <text x="35" y="152" fill="#94a3b8" font-family="sans-serif" font-size="12" font-weight="700" letter-spacing="0.5">MONTHLY CHANGES VELOCITY</text>
  <text x="660" y="152" fill="#94a3b8" font-family="sans-serif" font-size="12" font-weight="700" letter-spacing="0.5">YEARLY TOTAL</text>

  <!-- Monthly Bars -->
  ${monthlyBarsSvg}

  <!-- Yearly Comparison Cards -->
  ${yearlyCardsSvg}

  <!-- Footer -->
  <line x1="35" y1="${height - 40}" x2="${width - 35}" y2="${height - 40}" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
  <text x="35" y="${height - 18}" fill="#64748b" font-family="sans-serif" font-size="11">Branch: main • Generated: ${new Date().toISOString().substring(0, 10)}</text>
  <text x="${width - 35}" y="${height - 18}" fill="#38bdf8" font-family="sans-serif" font-size="11" text-anchor="end" font-weight="600">github.com/daniyal44/Zyphuel</text>
</svg>
`

  const outDir = path.resolve(__dirname, '../public/images')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
  
  const outFile = path.join(outDir, 'github-changes-graph.svg')
  fs.writeFileSync(outFile, svgContent, 'utf8')
  console.log(`[GraphGen] ✅ SVG Graph successfully generated at: ${outFile} (${total} commits tracked)`)
}

generateSvg()
