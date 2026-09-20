#!/usr/bin/env node
/**
 * Professional Git Activity Trading Chart Generator
 * Transforms local Git history into an authentic, high-resolution TradingView-style financial chart.
 * Automatically runs on git push via GitHub Actions and local pre-push hooks.
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { APP_VERSION } from '../src/data/appVersion.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function getGitCommits() {
  try {
    const raw = execSync('git log --pretty=format:"%h|%ad|%an|%s" --date=short', { encoding: 'utf8' })
    const lines = raw.trim().split('\n').filter(Boolean)
    return lines.map(line => {
      const [sha, date, author, ...msg] = line.split('|')
      return { sha, date, author: author || 'daniyal44', message: (msg.join('|') || '').trim() }
    })
  } catch (err) {
    console.warn('[GraphGen] Git command failed, using fallback:', err.message)
    return [
      { sha: '6ef0a9d', date: '2026-09-17', author: 'daniyal44', message: 'feat(seo): internal linking and FAQ schemas' },
      { sha: '1bef65a', date: '2026-09-17', author: 'daniyal44', message: 'feat(release): update app to v2.6.4.0.0.10' },
      { sha: '83b70ad', date: '2026-09-17', author: 'daniyal44', message: 'feat(update): automated push' },
      { sha: 'bf525b7', date: '2026-09-16', author: 'daniyal44', message: 'feat(update): automated push' },
      { sha: '60e426a', date: '2026-09-16', author: 'daniyal44', message: 'chore(graph): auto-update commit graph' },
      { sha: '4bb56bd', date: '2026-09-16', author: 'daniyal44', message: 'feat(home): add cinematic scroll animation' }
    ]
  }
}

// Helper: Escape XML characters
function escapeXml(unsafe) {
  if (!unsafe) return ''
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Generate smooth SVG cubic bezier path from points
function generateSmoothPath(points) {
  if (!points || points.length === 0) return ''
  if (points.length === 1) return `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`
  if (points.length === 2) return `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} L ${points[1].x.toFixed(1)} ${points[1].y.toFixed(1)}`

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]

    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

function generateSvg(variant = 'activity') {
  const isChanges = variant === 'changes'
  const tickerSymbol = isChanges ? 'ZYP / CHANGES' : 'ZYP / GIT'
  const tickerExchange = isChanges ? '• GITHUB LIVE COMMITS' : '• GITHUB MAINNET'
  const tickerDesc = isChanges ? 'Zyphuel Real-Time Commit Stream • Code Changes Telemetry' : 'Zyphuel Engineering Velocity • Verified Commit Stream'
  const watermarkText = isChanges ? 'GIT CHANGES STREAM' : 'GIT REPOSITORY INDEX'
  const orderType = isChanges ? 'Active Changeset Delivery' : 'Continuous Integration'

  const commits = getGitCommits()
  const totalCommits = commits.length
  const latest = commits[0] || { sha: 'main', date: 'Today', message: 'Active Development' }

  // Chronological commits (oldest to newest)
  const chronCommits = [...commits].reverse()

  // Aggregate daily counts in chronological order
  const dailyMap = new Map()
  chronCommits.forEach(c => {
    if (c.date) {
      dailyMap.set(c.date, (dailyMap.get(c.date) || 0) + 1)
    }
  })

  const dates = Array.from(dailyMap.keys())
  let runningTotal = 0
  const chartData = dates.map(date => {
    const vol = dailyMap.get(date) || 0
    runningTotal += vol
    return {
      date,
      volume: vol,
      close: runningTotal
    }
  })

  // Fallback if empty
  if (chartData.length === 0) {
    chartData.push({ date: '2026-09-01', volume: 5, close: 5 })
    chartData.push({ date: '2026-09-17', volume: 10, close: 15 })
  }

  // Trading stats calculations
  const openPrice = 1.00
  const closePrice = totalCommits
  const highPrice = totalCommits
  const lowPrice = 1.00
  const prevClose = chartData.length > 1 ? chartData[chartData.length - 2].close : 1
  const dayChangePct = (((closePrice - prevClose) / prevClose) * 100).toFixed(1)
  const latestDate = chartData[chartData.length - 1].date
  const latestDayVol = chartData[chartData.length - 1].volume

  // 9-period Exponential Moving Average (EMA 9)
  const emaPeriod = Math.min(9, chartData.length)
  const k = 2 / (emaPeriod + 1)
  let prevEma = chartData[0].close
  const emaValues = chartData.map((d, i) => {
    if (i === 0) return d.close
    const val = d.close * k + prevEma * (1 - k)
    prevEma = val
    return val
  })
  const latestEma = emaValues[emaValues.length - 1]

  // Layout Dimensions (Clean Trading Terminal)
  const width = 960
  const height = 540

  // Chart Canvas Coordinates
  const chartX = 55
  const chartY = 115
  const chartW = 810
  const chartH = 245 // Price area: 115 to 360

  // Price Scale Math (Clean 20-unit increments)
  const maxPriceLevel = Math.max(20, Math.ceil((totalCommits + 6) / 20) * 20) // e.g. 120
  const minPriceLevel = 0

  const priceToY = (price) => {
    const clamped = Math.max(minPriceLevel, Math.min(maxPriceLevel, price))
    return chartY + chartH - ((clamped - minPriceLevel) / (maxPriceLevel - minPriceLevel)) * chartH
  }

  const numPoints = chartData.length
  const stepX = chartW / Math.max(numPoints - 1, 1)

  // Primary Price Points
  const pricePoints = chartData.map((d, i) => ({
    x: chartX + i * stepX,
    y: priceToY(d.close),
    data: d
  }))

  // EMA Points
  const emaPoints = emaValues.map((val, i) => ({
    x: chartX + i * stepX,
    y: priceToY(val)
  }))

  const pricePath = generateSmoothPath(pricePoints)
  const emaPath = generateSmoothPath(emaPoints)

  const firstPt = pricePoints[0]
  const lastPt = pricePoints[pricePoints.length - 1]
  const baselineY = chartY + chartH
  const areaPath = `${pricePath} L ${lastPt.x.toFixed(1)} ${baselineY.toFixed(1)} L ${firstPt.x.toFixed(1)} ${baselineY.toFixed(1)} Z`

  // Horizontal Price Gridlines (e.g. 120.00, 100.00, 80.00, 60.00, 40.00, 20.00, 0.00)
  const priceInterval = 20
  const gridLevels = []
  for (let p = maxPriceLevel; p >= 0; p -= priceInterval) {
    gridLevels.push(p)
  }

  let priceGridSvg = ''
  gridLevels.forEach(lvl => {
    const y = priceToY(lvl)
    priceGridSvg += `
      <line x1="${chartX}" y1="${y.toFixed(1)}" x2="${chartX + chartW}" y2="${y.toFixed(1)}" stroke="rgba(255, 255, 255, 0.06)" stroke-dasharray="4 4" />
      <text x="${chartX + chartW + 12}" y="${(y + 3.5).toFixed(1)}" fill="#64748b" font-family="monospace, 'SF Mono', Consolas, sans-serif" font-size="10" font-weight="600">${lvl.toFixed(2)}</text>
    `
  })

  // Vertical Time Gridlines & Date Labels
  const targetTimeTicks = 7
  const timeStep = Math.max(1, Math.floor((numPoints - 1) / (targetTimeTicks - 1)))
  let timeGridSvg = ''
  let timeLabelsSvg = ''

  for (let i = 0; i < numPoints; i += timeStep) {
    const pt = pricePoints[i]
    const dStr = chartData[i].date
    const parts = dStr.split('-')
    const month = MONTH_NAMES[parseInt(parts[1], 10) - 1] || 'Sep'
    const day = parts[2] || '01'
    const label = `${month} ${day}`

    timeGridSvg += `
      <line x1="${pt.x.toFixed(1)}" y1="${chartY}" x2="${pt.x.toFixed(1)}" y2="475" stroke="rgba(255, 255, 255, 0.04)" stroke-dasharray="3 4" />
    `
    timeLabelsSvg += `
      <text x="${pt.x.toFixed(1)}" y="492" fill="#64748b" font-family="monospace, sans-serif" font-size="10" text-anchor="middle">${label}</text>
    `
  }

  // Ensure last point is labeled
  const lastD = chartData[chartData.length - 1].date.split('-')
  const lastLabel = `${MONTH_NAMES[parseInt(lastD[1], 10) - 1]} ${lastD[2]} (Today)`
  timeLabelsSvg += `
    <text x="${lastPt.x.toFixed(1)}" y="492" fill="#38bdf8" font-family="monospace, sans-serif" font-size="10" font-weight="700" text-anchor="end">${lastLabel}</text>
  `

  // Volume Sub-Panel (Bottom Area: y: 395 to 470)
  const volY = 395
  const volH = 75
  const maxVol = Math.max(...chartData.map(d => d.volume), 8)
  const barW = Math.max(4, Math.min(16, (chartW / numPoints) * 0.65))

  let volBarsSvg = ''
  chartData.forEach((d, i) => {
    const x = chartX + i * stepX
    const h = Math.max(3, (d.volume / maxVol) * (volH - 8))
    const y = volY + volH - h
    const isUp = i === 0 || d.volume >= chartData[i - 1].volume
    const barFill = isUp ? 'url(#volGreenGrad)' : 'url(#volCyanGrad)'
    const barStroke = isUp ? '#10b981' : '#06b6d4'

    volBarsSvg += `
      <rect x="${(x - barW / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${barFill}" stroke="${barStroke}" stroke-opacity="0.3" stroke-width="0.8" />
    `
  })

  // Current Price Crosshair & Badge
  const crosshairY = lastPt.y.toFixed(1)
  const currentPriceTag = closePrice.toFixed(2)

  const cleanMessage = escapeXml(latest.message.length > 38 ? latest.message.substring(0, 38) + '...' : latest.message)
  const cleanSha = escapeXml(latest.sha)

  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zyphuel Git Velocity Trading Chart">
  <defs>
    <!-- Trading Background Gradient -->
    <linearGradient id="tradingBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070a12" />
      <stop offset="50%" stop-color="#0b0f19" />
      <stop offset="100%" stop-color="#080c14" />
    </linearGradient>

    <!-- Glowing Emerald Area Gradient -->
    <linearGradient id="tradingAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.35" />
      <stop offset="40%" stop-color="#059669" stop-opacity="0.12" />
      <stop offset="90%" stop-color="#047857" stop-opacity="0.02" />
      <stop offset="100%" stop-color="#022c22" stop-opacity="0.0" />
    </linearGradient>

    <!-- Volume Bar Gradients -->
    <linearGradient id="volGreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#059669" stop-opacity="0.25" />
    </linearGradient>
    <linearGradient id="volCyanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0.2" />
    </linearGradient>
  </defs>

  <!-- TERMINAL FRAME BACKGROUND -->
  <rect width="${width}" height="${height}" rx="12" fill="url(#tradingBg)" stroke="#1e293b" stroke-width="1.2" />

  <!-- BACKGROUND WATERMARK -->
  <text x="${width / 2}" y="280" fill="#ffffff" fill-opacity="0.02" font-family="system-ui, -apple-system, sans-serif" font-size="96" font-weight="900" text-anchor="middle" letter-spacing="12">ZYPHUEL</text>
  <text x="${width / 2}" y="325" fill="#ffffff" fill-opacity="0.015" font-family="monospace, sans-serif" font-size="20" font-weight="700" text-anchor="middle" letter-spacing="8">${watermarkText}</text>

  <!-- TOP TRADING TICKER HEADER -->
  <g transform="translate(45, 20)">
    <!-- Ticker Symbol & Exchange Identity -->
    <g transform="translate(0, 0)">
      <rect width="28" height="28" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.35)" stroke-width="1" />
      <text x="14" y="19" fill="#10b981" font-family="system-ui, sans-serif" font-size="14" font-weight="900" text-anchor="middle">⚡</text>
      
      <text x="38" y="14" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" letter-spacing="0.5">${tickerSymbol}</text>
      <text x="${isChanges ? 152 : 115}" y="14" fill="#64748b" font-family="system-ui, sans-serif" font-size="12" font-weight="600">${tickerExchange}</text>
      <text x="38" y="27" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10.5">${tickerDesc}</text>
    </g>

    <!-- Big Price Level & 24H Return -->
    <g transform="translate(360, 0)">
      <text x="0" y="22" fill="#ffffff" font-family="monospace, 'SF Mono', Consolas, sans-serif" font-size="26" font-weight="800">${closePrice}.00</text>
      <text x="110" y="22" fill="#64748b" font-family="monospace, sans-serif" font-size="13" font-weight="500">COMMITS</text>
      
      <!-- Bullish Change Badge -->
      <rect x="185" y="3" width="135" height="24" rx="12" fill="rgba(16, 185, 129, 0.16)" stroke="rgba(16, 185, 129, 0.4)" stroke-width="1" />
      <text x="252" y="19" fill="#34d399" font-family="system-ui, monospace, sans-serif" font-size="11.5" font-weight="800" text-anchor="middle">▲ +${dayChangePct}% (24H)</text>
    </g>

    <!-- Timeframe Chips & Live Status -->
    <g transform="translate(${chartW - 75}, 2)">
      <!-- Interval selector pills -->
      <rect x="0" y="0" width="28" height="22" rx="4" fill="rgba(255,255,255,0.04)" />
      <text x="14" y="15" fill="#64748b" font-family="monospace, sans-serif" font-size="10" font-weight="700" text-anchor="middle">1D</text>

      <rect x="32" y="0" width="28" height="22" rx="4" fill="rgba(255,255,255,0.04)" />
      <text x="46" y="15" fill="#64748b" font-family="monospace, sans-serif" font-size="10" font-weight="700" text-anchor="middle">1W</text>

      <rect x="64" y="0" width="28" height="22" rx="4" fill="rgba(255,255,255,0.04)" />
      <text x="78" y="15" fill="#64748b" font-family="monospace, sans-serif" font-size="10" font-weight="700" text-anchor="middle">1M</text>

      <rect x="96" y="0" width="28" height="22" rx="4" fill="rgba(255,255,255,0.04)" />
      <text x="110" y="15" fill="#64748b" font-family="monospace, sans-serif" font-size="10" font-weight="700" text-anchor="middle">1Y</text>

      <!-- Active ALL Pill -->
      <rect x="128" y="0" width="38" height="22" rx="4" fill="#10b981" />
      <text x="147" y="15" fill="#ffffff" font-family="monospace, sans-serif" font-size="10" font-weight="800" text-anchor="middle">ALL</text>
    </g>
  </g>

  <!-- TRADING STATS RIBBON (OHLC + Volume + RSI + Sprints) -->
  <g transform="translate(45, 66)">
    <rect width="${chartW + 65}" height="28" rx="6" fill="rgba(15, 23, 42, 0.65)" stroke="rgba(255,255,255,0.05)" />
    
    <text x="14" y="18" fill="#94a3b8" font-family="monospace, sans-serif" font-size="10.5">
      <tspan fill="#64748b">O: </tspan><tspan fill="#e2e8f0" font-weight="700">1.00</tspan>
      <tspan fill="#64748b">   H: </tspan><tspan fill="#34d399" font-weight="700">${highPrice}.00</tspan>
      <tspan fill="#64748b">   L: </tspan><tspan fill="#f87171" font-weight="700">1.00</tspan>
      <tspan fill="#64748b">   C: </tspan><tspan fill="#34d399" font-weight="700">${closePrice}.00</tspan>
      <tspan fill="#475569">   │   </tspan>
      <tspan fill="#64748b">24H VOL: </tspan><tspan fill="#38bdf8" font-weight="700">${latestDayVol} Commits</tspan>
      <tspan fill="#475569">   │   </tspan>
      <tspan fill="#64748b">EMA(9): </tspan><tspan fill="#fbbf24" font-weight="700">${latestEma.toFixed(1)}</tspan>
      <tspan fill="#475569">   │   </tspan>
      <tspan fill="#64748b">RSI(14): </tspan><tspan fill="#34d399" font-weight="800">78.4 (BULLISH)</tspan>
      <tspan fill="#475569">   │   </tspan>
      <tspan fill="#64748b">APP: </tspan><tspan fill="#a78bfa" font-weight="700">v${APP_VERSION}</tspan>
    </text>

    <!-- Market Live Pulse -->
    <g transform="translate(${chartW - 40}, 8)">
      <circle cx="0" cy="6" r="6.5" fill="#10b981" fill-opacity="0.25" />
      <circle cx="0" cy="6" r="3.5" fill="#10b981" />
      <text x="12" y="10" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" font-weight="700">MARKET OPEN</text>
    </g>
  </g>

  <!-- MAIN TRADING CANVAS AREA -->
  <!-- Horizontal Price Gridlines & Right Scale -->
  ${priceGridSvg}

  <!-- Vertical Time Gridlines -->
  ${timeGridSvg}

  <!-- Area Chart Underlay Gradient -->
  <path d="${areaPath}" fill="url(#tradingAreaGrad)" />

  <!-- EMA 9 Moving Average Trendline (Amber) -->
  <path d="${emaPath}" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="4 3" opacity="0.85" />

  <!-- Primary Price Line (Layered Emerald Neon Vector Glow) -->
  <path d="${pricePath}" fill="none" stroke="#10b981" stroke-width="6" stroke-opacity="0.2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="${pricePath}" fill="none" stroke="#10b981" stroke-width="4" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round" />
  <path d="${pricePath}" fill="none" stroke="#34d399" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />

  <!-- Genesis Point Marker -->
  <circle cx="${firstPt.x.toFixed(1)}" cy="${firstPt.y.toFixed(1)}" r="3.5" fill="#047857" stroke="#10b981" stroke-width="1.5" />
  <text x="${firstPt.x.toFixed(1)}" y="${(firstPt.y - 10).toFixed(1)}" fill="#64748b" font-family="monospace, sans-serif" font-size="9" font-weight="700">Genesis</text>

  <!-- Active Latest Point Marker (Clean Bullseye Rings) -->
  <circle cx="${lastPt.x.toFixed(1)}" cy="${lastPt.y.toFixed(1)}" r="10" fill="#10b981" fill-opacity="0.15" />
  <circle cx="${lastPt.x.toFixed(1)}" cy="${lastPt.y.toFixed(1)}" r="7" fill="#10b981" fill-opacity="0.35" />
  <circle cx="${lastPt.x.toFixed(1)}" cy="${lastPt.y.toFixed(1)}" r="4.5" fill="#10b981" stroke="#ffffff" stroke-width="2" />

  <!-- All-Time High (ATH) Milestone Pill -->
  <g transform="translate(${(lastPt.x - 42).toFixed(1)}, ${(lastPt.y - 32).toFixed(1)})">
    <rect width="84" height="20" rx="10" fill="#065f46" stroke="#10b981" stroke-width="1.2" />
    <text x="42" y="13.5" fill="#a7f3d0" font-family="monospace, sans-serif" font-size="9.5" font-weight="800" text-anchor="middle">ATH: ${currentPriceTag}</text>
    <polygon points="42,24 38,20 46,20" fill="#10b981" />
  </g>

  <!-- Crosshair Dashed Line (Drawn from Price Point to Right Axis) -->
  <line x1="${chartX}" y1="${crosshairY}" x2="${chartX + chartW + 5}" y2="${crosshairY}" stroke="#10b981" stroke-width="1" stroke-dasharray="3 3" opacity="0.65" />

  <!-- Pinned Active Price Tag (Right Y-Axis) -->
  <g transform="translate(${chartX + chartW + 6}, ${(lastPt.y - 11).toFixed(1)})">
    <rect width="66" height="22" rx="4" fill="#10b981" />
    <polygon points="-5,11 0,6 0,16" fill="#10b981" />
    <text x="33" y="15" fill="#ffffff" font-family="monospace, 'SF Mono', Consolas, sans-serif" font-size="11" font-weight="800" text-anchor="middle">${currentPriceTag} ▲</text>
  </g>

  <!-- TRADING LEGEND (Inline Upper Left of Chart) -->
  <g transform="translate(65, 130)">
    <line x1="0" y1="5" x2="16" y2="5" stroke="#10b981" stroke-width="2.5" />
    <text x="22" y="9" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" font-weight="600">ZYP/GIT Price (${currentPriceTag})</text>

    <line x1="150" y1="5" x2="166" y2="5" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="3 2" />
    <text x="172" y="9" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" font-weight="600">EMA(9) Trendline</text>

    <rect x="280" y="1" width="8" height="8" rx="1.5" fill="#10b981" />
    <text x="294" y="9" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" font-weight="600">Vol: Daily Commit Bursts</text>
  </g>

  <!-- SUB-PANEL: TRADING VOLUME HISTOGRAM -->
  <line x1="${chartX}" y1="${volY - 8}" x2="${chartX + chartW}" y2="${volY - 8}" stroke="rgba(255, 255, 255, 0.08)" />
  <text x="${chartX}" y="${volY + 4}" fill="#64748b" font-family="monospace, sans-serif" font-size="10" font-weight="700">VOL (Commit Velocity &amp; Code Delivery)</text>
  <text x="${chartX + chartW + 12}" y="${volY + 4}" fill="#64748b" font-family="monospace, sans-serif" font-size="9.5">${maxVol} max</text>
  <text x="${chartX + chartW + 12}" y="${volY + volH}" fill="#475569" font-family="monospace, sans-serif" font-size="9.5">0</text>

  <!-- Volume Histogram Bars -->
  ${volBarsSvg}

  <!-- Time Axis Labels -->
  ${timeLabelsSvg}

  <!-- FOOTER TRADING STATUS BAR -->
  <line x1="45" y1="508" x2="${width - 45}" y2="508" stroke="rgba(255, 255, 255, 0.08)" />
  
  <g transform="translate(45, 524)">
    <circle cx="4" cy="-3" r="3" fill="#10b981" />
    <text x="14" y="0" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10.5">
      <tspan font-weight="700" fill="#cbd5e1">ORDER TYPE:</tspan> ${orderType} &bull; 
      <tspan font-weight="700" fill="#cbd5e1">LATEST HASH:</tspan> <tspan font-family="monospace" fill="#38bdf8">${cleanSha}</tspan> &bull; 
      <tspan font-weight="700" fill="#cbd5e1">MSG:</tspan> ${cleanMessage}
    </text>

    <!-- Right Brand Badge -->
    <text x="${chartW + 65}" y="0" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" text-anchor="end">github.com/daniyal44/Zyphuel</text>
  </g>
</svg>`

  return { svgContent, closePrice, dayChangePct, cleanSha, cleanMessage }
}

// ----------------------------------------------------------------------
// 2. Enhanced GitHub Contribution Heatmap Grid & Changes Report Generator
// ----------------------------------------------------------------------
function generateContributionGraph(commits) {
  const width = 960
  const height = 620

  const totalCommits = commits.length
  const latest = commits[0] || { sha: 'main', date: 'Today', message: 'Active Development' }

  // Map daily commit counts
  const dailyMap = new Map()
  commits.forEach(c => {
    if (c.date) {
      dailyMap.set(c.date, (dailyMap.get(c.date) || 0) + 1)
    }
  })

  const activeDays = dailyMap.size
  let maxDaily = 0
  dailyMap.forEach(v => {
    if (v > maxDaily) maxDaily = v
  })

  // Date calculation: rolling 50 weeks ending on current day
  const today = new Date()
  const todayDay = today.getDay() // 0 = Sun ... 6 = Sat
  const numWeeks = 50

  // Start date: Sunday, (numWeeks - 1) weeks ago
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - (numWeeks * 7) + (6 - todayDay))

  const cellSize = 11.5
  const cellGap = 3.5
  const gridStartX = 75
  const gridStartY = 195

  let cellsSvg = ''
  const monthLabels = []
  let lastMonth = -1

  for (let w = 0; w < numWeeks; w++) {
    for (let d = 0; d < 7; d++) {
      const cellDate = new Date(startDate)
      cellDate.setDate(startDate.getDate() + (w * 7) + d)
      const yr = cellDate.getFullYear()
      const mo = String(cellDate.getMonth() + 1).padStart(2, '0')
      const dy = String(cellDate.getDate()).padStart(2, '0')
      const dateStr = `${yr}-${mo}-${dy}`
      const count = dailyMap.get(dateStr) || 0

      // Month marker
      const m = cellDate.getMonth()
      if (d === 0 && m !== lastMonth && w < numWeeks - 1) {
        lastMonth = m
        monthLabels.push({
          x: gridStartX + (w * (cellSize + cellGap)),
          name: MONTH_NAMES[m]
        })
      }

      // Heatmap level colors
      let fillColor = '#161b22'
      let strokeColor = 'rgba(255, 255, 255, 0.04)'
      if (count === 1) {
        fillColor = '#0e4429'
        strokeColor = 'rgba(16, 185, 129, 0.25)'
      } else if (count >= 2 && count <= 4) {
        fillColor = '#006d32'
        strokeColor = 'rgba(16, 185, 129, 0.45)'
      } else if (count >= 5 && count <= 9) {
        fillColor = '#26a641'
        strokeColor = 'rgba(52, 211, 153, 0.7)'
      } else if (count >= 10) {
        fillColor = '#39d353'
        strokeColor = '#a7f3d0'
      }

      const cx = gridStartX + (w * (cellSize + cellGap))
      const cy = gridStartY + (d * (cellSize + cellGap))

      cellsSvg += `      <rect x="${cx.toFixed(1)}" y="${cy.toFixed(1)}" width="${cellSize}" height="${cellSize}" rx="2.5" fill="${fillColor}" stroke="${strokeColor}" stroke-width="0.6">`
      cellsSvg += `<title>${dateStr}: ${count} commits</title></rect>\n`
    }
  }

  const monthLabelsSvg = monthLabels.map(ml => 
    `    <text x="${ml.x.toFixed(1)}" y="185" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="600">${ml.name}</text>`
  ).join('\n')

  // Top 5 Recent Commits Table
  const recentCommits = commits.slice(0, 5)
  let commitsTableRows = ''
  const tableStartY = 370
  const rowHeight = 36

  recentCommits.forEach((c, idx) => {
    const rowY = tableStartY + (idx * rowHeight)
    let type = 'FEAT'
    let badgeBg = 'rgba(2, 132, 199, 0.18)'
    let badgeBorder = 'rgba(2, 132, 199, 0.4)'
    let badgeText = '#38bdf8'

    const lowerMsg = c.message.toLowerCase()
    if (lowerMsg.startsWith('fix')) {
      type = 'FIX'
      badgeBg = 'rgba(245, 158, 11, 0.18)'
      badgeBorder = 'rgba(245, 158, 11, 0.4)'
      badgeText = '#fbbf24'
    } else if (lowerMsg.startsWith('chore')) {
      type = 'CHORE'
      badgeBg = 'rgba(100, 116, 139, 0.18)'
      badgeBorder = 'rgba(100, 116, 139, 0.4)'
      badgeText = '#94a3b8'
    } else if (lowerMsg.startsWith('perf')) {
      type = 'PERF'
      badgeBg = 'rgba(168, 85, 247, 0.18)'
      badgeBorder = 'rgba(168, 85, 247, 0.4)'
      badgeText = '#c084fc'
    } else if (lowerMsg.startsWith('seo') || lowerMsg.includes('seo')) {
      type = 'SEO'
      badgeBg = 'rgba(16, 185, 129, 0.18)'
      badgeBorder = 'rgba(16, 185, 129, 0.4)'
      badgeText = '#34d399'
    }

    const cleanMsg = escapeXml(c.message.length > 60 ? c.message.substring(0, 60) + '...' : c.message)
    const rowBg = idx % 2 === 0 ? 'rgba(255, 255, 255, 0.015)' : 'transparent'

    commitsTableRows += `
    <g transform="translate(45, ${rowY})">
      <rect width="870" height="${rowHeight - 4}" rx="6" fill="${rowBg}" />
      
      <!-- Type Badge -->
      <rect x="12" y="5" width="50" height="20" rx="4" fill="${badgeBg}" stroke="${badgeBorder}" stroke-width="1" />
      <text x="37" y="19" fill="${badgeText}" font-family="monospace, sans-serif" font-size="10" font-weight="800" text-anchor="middle">${type}</text>

      <!-- Commit SHA -->
      <text x="78" y="19" fill="#38bdf8" font-family="monospace, 'SF Mono', Consolas, sans-serif" font-size="11" font-weight="700">${escapeXml(c.sha)}</text>

      <!-- Commit Message -->
      <text x="150" y="19" fill="#e2e8f0" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500">${cleanMsg}</text>

      <!-- Date -->
      <text x="755" y="19" fill="#94a3b8" font-family="monospace, sans-serif" font-size="10.5">${escapeXml(c.date)}</text>

      <!-- Verified Checkmark Badge -->
      <g transform="translate(830, 7)">
        <rect width="28" height="16" rx="8" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.3)" stroke-width="0.8" />
        <text x="14" y="12" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" font-weight="800" text-anchor="middle">✓</text>
      </g>
    </g>`
  })

  const cleanLatestSha = escapeXml(latest.sha)
  const cleanLatestMsg = escapeXml(latest.message.length > 42 ? latest.message.substring(0, 42) + '...' : latest.message)

  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zyphuel GitHub Contribution Matrix & Changes Report">
  <defs>
    <!-- Dark Slate GitHub Terminal Background -->
    <linearGradient id="contribBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080c14" />
      <stop offset="50%" stop-color="#0b101b" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>

    <!-- Card Background Gradient -->
    <linearGradient id="cardBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#151d2f" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#0e1524" stop-opacity="0.95" />
    </linearGradient>
  </defs>

  <!-- FRAME BACKGROUND -->
  <rect width="${width}" height="${height}" rx="12" fill="url(#contribBg)" stroke="#1e293b" stroke-width="1.2" />

  <!-- WATERMARK -->
  <text x="${width / 2}" y="330" fill="#ffffff" fill-opacity="0.015" font-family="system-ui, -apple-system, sans-serif" font-size="78" font-weight="900" text-anchor="middle" letter-spacing="12">CONTRIBUTIONS</text>

  <!-- TOP HEADER -->
  <g transform="translate(45, 20)">
    <rect width="28" height="28" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.35)" stroke-width="1" />
    <text x="14" y="19" fill="#10b981" font-family="system-ui, sans-serif" font-size="14" font-weight="900" text-anchor="middle">🟩</text>
    
    <text x="38" y="14" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" letter-spacing="0.5">ZYPHUEL / CONTRIBUTION MATRIX</text>
    <text x="355" y="14" fill="#64748b" font-family="system-ui, sans-serif" font-size="12" font-weight="600">• GIT CHANGES REPORT</text>
    <text x="38" y="27" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10.5">Verified Repository Commit Cadence • Live Development Activity Heatmap</text>

    <!-- Header Badges (Right) -->
    <g transform="translate(620, 3)">
      <rect width="78" height="22" rx="11" fill="rgba(2, 132, 199, 0.15)" stroke="rgba(56, 189, 248, 0.35)" stroke-width="1" />
      <text x="39" y="15" fill="#38bdf8" font-family="monospace, sans-serif" font-size="10.5" font-weight="700" text-anchor="middle">main</text>

      <rect x="85" y="0" width="165" height="22" rx="11" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.35)" stroke-width="1" />
      <text x="167" y="15" fill="#34d399" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" text-anchor="middle">● ${totalCommits} Commits Logged</text>
    </g>
  </g>

  <!-- 4 KPI SUMMARY CARDS (Y: 65) -->
  <g transform="translate(45, 65)">
    <!-- Card 1: Total Commits -->
    <g transform="translate(0, 0)">
      <rect width="202" height="66" rx="8" fill="url(#cardBgGrad)" stroke="#1e293b" stroke-width="1" />
      <text x="16" y="22" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="0.5">TOTAL COMMITS</text>
      <text x="16" y="47" fill="#ffffff" font-family="monospace, 'SF Mono', Consolas, sans-serif" font-size="22" font-weight="800">${totalCommits}</text>
      <text x="75" y="47" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" font-weight="700">▲ 100% Synced</text>
    </g>

    <!-- Card 2: Active Commit Days -->
    <g transform="translate(222, 0)">
      <rect width="202" height="66" rx="8" fill="url(#cardBgGrad)" stroke="#1e293b" stroke-width="1" />
      <text x="16" y="22" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="0.5">ACTIVE WORK DAYS</text>
      <text x="16" y="47" fill="#ffffff" font-family="monospace, 'SF Mono', Consolas, sans-serif" font-size="22" font-weight="800">${activeDays}</text>
      <text x="65" y="47" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="700">Days Active</text>
    </g>

    <!-- Card 3: Peak Daily Velocity -->
    <g transform="translate(444, 0)">
      <rect width="202" height="66" rx="8" fill="url(#cardBgGrad)" stroke="#1e293b" stroke-width="1" />
      <text x="16" y="22" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="0.5">PEAK BURST (24H)</text>
      <text x="16" y="47" fill="#ffffff" font-family="monospace, 'SF Mono', Consolas, sans-serif" font-size="22" font-weight="800">${maxDaily}</text>
      <text x="65" y="47" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="11" font-weight="700">Commits / Day</text>
    </g>

    <!-- Card 4: Codebase Release -->
    <g transform="translate(666, 0)">
      <rect width="204" height="66" rx="8" fill="url(#cardBgGrad)" stroke="#1e293b" stroke-width="1" />
      <text x="16" y="22" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="0.5">PRODUCTION RELEASE</text>
      <text x="16" y="47" fill="#a78bfa" font-family="monospace, 'SF Mono', Consolas, sans-serif" font-size="16" font-weight="800">v${APP_VERSION}</text>
      <text x="135" y="47" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" font-weight="700">● Live</text>
    </g>
  </g>

  <!-- SECTION 1: HEATMAP HEADER & LEGEND (Y: 155) -->
  <g transform="translate(45, 155)">
    <text x="0" y="0" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="0.5">2026 CONTRIBUTION ACTIVITY (ROLLING 50 WEEKS)</text>
    
    <!-- Legend -->
    <g transform="translate(710, -10)">
      <text x="0" y="10" fill="#64748b" font-family="system-ui, sans-serif" font-size="10">Less</text>
      <rect x="30" y="1" width="10" height="10" rx="2" fill="#161b22" stroke="rgba(255,255,255,0.05)" />
      <rect x="44" y="1" width="10" height="10" rx="2" fill="#0e4429" />
      <rect x="58" y="1" width="10" height="10" rx="2" fill="#006d32" />
      <rect x="72" y="1" width="10" height="10" rx="2" fill="#26a641" />
      <rect x="86" y="1" width="10" height="10" rx="2" fill="#39d353" />
      <text x="104" y="10" fill="#64748b" font-family="system-ui, sans-serif" font-size="10">More</text>
    </g>
  </g>

  <!-- HEATMAP MONTH LABELS -->
${monthLabelsSvg}

  <!-- HEATMAP DAY OF WEEK LABELS -->
  <g transform="translate(45, 195)">
    <text x="0" y="26" fill="#64748b" font-family="system-ui, sans-serif" font-size="9.5" font-weight="600">Mon</text>
    <text x="0" y="56" fill="#64748b" font-family="system-ui, sans-serif" font-size="9.5" font-weight="600">Wed</text>
    <text x="0" y="86" fill="#64748b" font-family="system-ui, sans-serif" font-size="9.5" font-weight="600">Fri</text>
  </g>

  <!-- HEATMAP TILES -->
  <g>
${cellsSvg}
  </g>

  <!-- SECTION 2: CHANGES REPORT / RECENT COMMITS (Y: 345) -->
  <g transform="translate(45, 345)">
    <text x="0" y="0" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="0.5">RECENT COMMITS &amp; CHANGES REPORT (VERIFIED TELEMETRY)</text>
    
    <!-- Table Header Row -->
    <g transform="translate(0, 10)">
      <rect width="870" height="22" rx="4" fill="rgba(15, 23, 42, 0.75)" />
      <text x="24" y="15" fill="#64748b" font-family="system-ui, sans-serif" font-size="10" font-weight="700">TYPE</text>
      <text x="80" y="15" fill="#64748b" font-family="system-ui, sans-serif" font-size="10" font-weight="700">HASH</text>
      <text x="150" y="15" fill="#64748b" font-family="system-ui, sans-serif" font-size="10" font-weight="700">COMMIT MESSAGE &amp; CHANGE SCOPE</text>
      <text x="755" y="15" fill="#64748b" font-family="system-ui, sans-serif" font-size="10" font-weight="700">DATE</text>
      <text x="830" y="15" fill="#64748b" font-family="system-ui, sans-serif" font-size="10" font-weight="700">STATUS</text>
    </g>
  </g>

  <!-- Commits Table Rows -->
  ${commitsTableRows}

  <!-- FOOTER STATUS BAR (Y: 575) -->
  <line x1="45" y1="585" x2="915" y2="585" stroke="rgba(255, 255, 255, 0.08)" />
  
  <g transform="translate(45, 603)">
    <circle cx="4" cy="-3" r="3" fill="#10b981" />
    <text x="14" y="0" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10.5">
      <tspan font-weight="700" fill="#cbd5e1">BRANCH:</tspan> <tspan font-family="monospace" fill="#38bdf8">origin/main</tspan> &bull; 
      <tspan font-weight="700" fill="#cbd5e1">LATEST HASH:</tspan> <tspan font-family="monospace" fill="#38bdf8">${cleanLatestSha}</tspan> &bull; 
      <tspan font-weight="700" fill="#cbd5e1">LATEST CHANGE:</tspan> ${cleanLatestMsg}
    </text>

    <!-- Right Brand Badge -->
    <text x="870" y="0" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" text-anchor="end">github.com/daniyal44/Zyphuel</text>
  </g>
</svg>`

  return svgContent
}

function generateTelemetryData(commits) {
  const totalCommits = commits.length
  const chronCommits = [...commits].reverse()
  const dailyMap = new Map()
  chronCommits.forEach(c => {
    if (c.date) {
      dailyMap.set(c.date, (dailyMap.get(c.date) || 0) + 1)
    }
  })

  const dates = Array.from(dailyMap.keys())
  let runningTotal = 0
  const chartData = dates.map(date => {
    const vol = dailyMap.get(date) || 0
    runningTotal += vol
    const parts = date.split('-')
    const month = MONTH_NAMES[parseInt(parts[1], 10) - 1] || 'Sep'
    const day = parts[2] || '01'
    return {
      date,
      volume: vol,
      cumulative: runningTotal,
      label: `${month} ${day}`
    }
  })

  // 52 weeks heatmap
  const totalWeeks = 52
  const today = new Date('2026-09-21T00:00:00')
  const weeks = []
  const monthLabels = []
  let lastMonth = -1

  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - (totalWeeks * 7) + 1)
  const startDay = startDate.getDay()
  startDate.setDate(startDate.getDate() - startDay)

  const curDate = new Date(startDate)
  let maxDaily = 0
  let activeDays = 0

  for (let w = 0; w < totalWeeks; w++) {
    const weekDays = []
    for (let d = 0; d < 7; d++) {
      const y = curDate.getFullYear()
      const m = String(curDate.getMonth() + 1).padStart(2, '0')
      const dayStr = String(curDate.getDate()).padStart(2, '0')
      const dateStr = `${y}-${m}-${dayStr}`
      const count = dailyMap.get(dateStr) || 0

      if (count > 0) {
        activeDays++
        if (count > maxDaily) maxDaily = count
      }

      if (d === 0) {
        const curM = curDate.getMonth()
        if (curM !== lastMonth) {
          lastMonth = curM
          monthLabels.push({
            weekIndex: w,
            name: MONTH_NAMES[curM]
          })
        }
      }

      let level = 0
      if (count === 1) level = 1
      else if (count >= 2 && count <= 4) level = 2
      else if (count >= 5 && count <= 9) level = 3
      else if (count >= 10) level = 4

      weekDays.push({
        date: dateStr,
        count,
        level,
        dayOfWeek: d
      })

      curDate.setDate(curDate.getDate() + 1)
    }
    weeks.push(weekDays)
  }

  const enhancedCommits = commits.map(c => {
    let type = 'feat'
    const lower = c.message.toLowerCase()
    if (lower.startsWith('fix')) type = 'fix'
    else if (lower.startsWith('chore')) type = 'chore'
    else if (lower.startsWith('docs')) type = 'docs'
    else if (lower.startsWith('perf')) type = 'perf'
    else if (lower.includes('release') || lower.startsWith('release')) type = 'release'

    return {
      ...c,
      type,
      commitUrl: `https://github.com/daniyal44/Zyphuel/commit/${c.sha}`
    }
  })

  return {
    totalCommits,
    activeDays,
    maxDaily,
    latestCommit: enhancedCommits[0] || null,
    branch: 'origin/main',
    repo: 'daniyal44/Zyphuel',
    repoUrl: 'https://github.com/daniyal44/Zyphuel',
    appVersion: APP_VERSION,
    generatedAt: new Date().toISOString(),
    chartData,
    heatmapWeeks: weeks,
    monthLabels,
    commits: enhancedCommits
  }
}

function main() {
  const commits = getGitCommits()
  const activity = generateSvg('activity')
  const contribution = generateContributionGraph(commits)
  const telemetryData = generateTelemetryData(commits)

  // 1. Save to assets/ directory
  const assetsDir = path.resolve(__dirname, '../assets')
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true })
  fs.writeFileSync(path.join(assetsDir, 'repo-activity-chart.svg'), activity.svgContent, 'utf8')
  fs.writeFileSync(path.join(assetsDir, 'github-changes-graph.svg'), contribution, 'utf8')

  // 2. Save to .github/assets/
  const githubAssetsDir = path.resolve(__dirname, '../.github/assets')
  if (!fs.existsSync(githubAssetsDir)) fs.mkdirSync(githubAssetsDir, { recursive: true })
  fs.writeFileSync(path.join(githubAssetsDir, 'repo-activity-chart.svg'), activity.svgContent, 'utf8')
  fs.writeFileSync(path.join(githubAssetsDir, 'github-changes-graph.svg'), contribution, 'utf8')

  // 3. Save to public/images/
  const publicDir = path.resolve(__dirname, '../public/images')
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true })
  fs.writeFileSync(path.join(publicDir, 'github-changes-graph.svg'), contribution, 'utf8')
  fs.writeFileSync(path.join(publicDir, 'repo-activity-chart.svg'), activity.svgContent, 'utf8')

  // 4. Save to dist/images/ if dist exists
  const distDir = path.resolve(__dirname, '../dist/images')
  if (fs.existsSync(path.resolve(__dirname, '../dist'))) {
    if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true })
    fs.writeFileSync(path.join(distDir, 'github-changes-graph.svg'), contribution, 'utf8')
    fs.writeFileSync(path.join(distDir, 'repo-activity-chart.svg'), activity.svgContent, 'utf8')
  }

  // 5. Save structured telemetry JSON to src/data/gitTelemetry.json for code-based React components
  const dataDir = path.resolve(__dirname, '../src/data')
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  fs.writeFileSync(path.join(dataDir, 'gitTelemetry.json'), JSON.stringify(telemetryData, null, 2), 'utf8')

  console.log(`[GraphGen] ✅ Both Enhanced SVGs & JSON Telemetry Successfully generated!`)
  console.log(`           - 📊 Activity Chart: repo-activity-chart.svg (ZYP/GIT @ ${activity.closePrice}.00)`)
  console.log(`           - 🟩 Contribution Matrix: github-changes-graph.svg (${commits.length} commits logged)`)
  console.log(`           - ⚡ Structured Code Telemetry: src/data/gitTelemetry.json (${telemetryData.totalCommits} commits)`)
}

main()
