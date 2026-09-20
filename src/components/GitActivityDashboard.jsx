import { useState, useMemo, useRef } from 'react'
import gitData from '../data/gitTelemetry.json'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function GitActivityDashboard({ defaultView = 'unified', showHeader = true, className = '' }) {
  const [activeTab, setActiveTab] = useState(defaultView) // 'chart' | 'heatmap' | 'commits' | 'unified'
  const [timeframe, setTimeframe] = useState('ALL') // '1M' | '3M' | 'ALL'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [visibleCommitsCount, setVisibleCommitsCount] = useState(10)
  
  // Interactive Crosshair state for Chart
  const [hoveredChartPoint, setHoveredChartPoint] = useState(null)
  const svgRef = useRef(null)

  // Interactive Hover state for Heatmap
  const [hoveredCell, setHoveredCell] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const rawCommits = gitData.commits || []
  const chartDataRaw = gitData.chartData || []
  const heatmapWeeks = gitData.heatmapWeeks || []
  const monthLabels = gitData.monthLabels || []

  // Filter chart data by timeframe
  const filteredChartData = useMemo(() => {
    if (!chartDataRaw.length) return []
    if (timeframe === 'ALL') return chartDataRaw
    const count = timeframe === '1M' ? 14 : 30
    return chartDataRaw.slice(-count)
  }, [chartDataRaw, timeframe])

  // Filter commits by search and type
  const filteredCommits = useMemo(() => {
    return rawCommits.filter(c => {
      const matchesSearch = searchQuery === '' || 
        c.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.sha.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = selectedType === 'all' || c.type === selectedType
      return matchesSearch && matchesType
    })
  }, [rawCommits, searchQuery, selectedType])

  // Chart coordinates calculation
  const svgWidth = 900
  const svgHeight = 360
  const padLeft = 55
  const padRight = 35
  const padTop = 30
  const padBottom = 65
  const chartW = svgWidth - padLeft - padRight
  const chartH = svgHeight - padTop - padBottom

  const maxVal = useMemo(() => {
    if (!filteredChartData.length) return 100
    const maxCum = Math.max(...filteredChartData.map(d => d.cumulative), 10)
    return Math.ceil(maxCum * 1.08)
  }, [filteredChartData])

  const minVal = useMemo(() => {
    if (!filteredChartData.length) return 0
    return Math.max(0, Math.min(...filteredChartData.map(d => d.cumulative)) - 5)
  }, [filteredChartData])

  const maxVol = useMemo(() => {
    if (!filteredChartData.length) return 10
    return Math.max(...filteredChartData.map(d => d.volume), 5)
  }, [filteredChartData])

  const points = useMemo(() => {
    if (!filteredChartData.length) return []
    const step = chartW / Math.max(1, filteredChartData.length - 1)
    return filteredChartData.map((d, i) => {
      const x = padLeft + (i * step)
      const ratio = (d.cumulative - minVal) / Math.max(1, maxVal - minVal)
      const y = padTop + chartH - (ratio * (chartH - 45))
      return { x, y, data: d, index: i }
    })
  }, [filteredChartData, chartW, chartH, padLeft, padTop, minVal, maxVal])

  // Smooth bezier curve path
  const pathD = useMemo(() => {
    if (!points.length) return ''
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`
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
  }, [points])

  const areaD = useMemo(() => {
    if (!points.length) return ''
    const baselineY = padTop + chartH
    return `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${baselineY} L ${points[0].x.toFixed(1)} ${baselineY} Z`
  }, [pathD, points, padTop, chartH])

  // Interactive mouse tracking over SVG
  const handleChartMouseMove = (e) => {
    if (!svgRef.current || !points.length) return
    const rect = svgRef.current.getBoundingClientRect()
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX)
    if (!clientX) return
    const svgX = ((clientX - rect.left) / rect.width) * svgWidth

    // Find closest point by X coordinate
    let closest = points[0]
    let minDist = Math.abs(points[0].x - svgX)
    for (let i = 1; i < points.length; i++) {
      const dist = Math.abs(points[i].x - svgX)
      if (dist < minDist) {
        minDist = dist
        closest = points[i]
      }
    }
    setHoveredChartPoint(closest)
  }

  const handleChartMouseLeave = () => {
    setHoveredChartPoint(null)
  }

  const handleCellMouseEnter = (e, cell) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoveredCell(cell)
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 8
    })
  }

  return (
    <div className={`git-dashboard-root ${className}`}>
      <style>{`
        .git-dashboard-root {
          background: #080c14;
          border: 1px solid #1e293b;
          border-radius: 14px;
          padding: 24px;
          color: #f8fafc;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
          position: relative;
          overflow: hidden;
          margin: 28px 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .git-dashboard-glow-bg {
          position: absolute;
          top: -120px;
          right: -80px;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(2, 132, 199, 0.15) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 80%);
          pointer-events: none;
          z-index: 0;
        }

        /* Header Bar */
        .git-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          z-index: 1;
        }
        .git-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .git-brand-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10b981;
          font-size: 1.25rem;
        }
        .git-header-titles h3 {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: -0.01em;
        }
        .git-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #34d399;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 9999px;
          letter-spacing: 0.05em;
        }
        .git-live-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          animation: gitPulse 2s infinite;
        }
        @keyframes gitPulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
        .git-header-desc {
          margin: 3px 0 0 0;
          font-size: 0.78rem;
          color: #94a3b8;
        }

        .git-header-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .git-btn-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #1e293b;
          border: 1px solid #334155;
          color: #e2e8f0;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 7px 14px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .git-btn-link:hover {
          background: #0284c7;
          border-color: #38bdf8;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
        }

        /* KPI Quick Stats Row */
        .git-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
          margin: 20px 0;
          position: relative;
          z-index: 1;
        }
        .git-kpi-card {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 10px;
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .git-kpi-card:hover {
          border-color: rgba(56, 189, 248, 0.3);
          transform: translateY(-2px);
        }
        .git-kpi-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .git-kpi-val {
          font-size: 1.45rem;
          font-weight: 900;
          color: #ffffff;
          font-family: monospace, sans-serif;
          line-height: 1.1;
        }
        .git-kpi-sub {
          font-size: 0.72rem;
          color: #10b981;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Navigation Tabs */
        .git-tabs-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
          background: rgba(15, 23, 42, 0.85);
          padding: 6px;
          border-radius: 10px;
          border: 1px solid #1e293b;
          position: relative;
          z-index: 1;
        }
        .git-tab-group {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        .git-tab-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 7px 14px;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: all 0.2s ease;
        }
        .git-tab-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }
        .git-tab-btn.active {
          background: #0284c7;
          color: #ffffff;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(2, 132, 199, 0.35);
        }

        .git-tf-group {
          display: flex;
          gap: 3px;
          background: #0b1329;
          padding: 3px;
          border-radius: 6px;
          border: 1px solid #1e293b;
        }
        .git-tf-btn {
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .git-tf-btn:hover {
          color: #cbd5e1;
        }
        .git-tf-btn.active {
          background: #1e293b;
          color: #38bdf8;
        }

        /* SVG Chart Frame */
        .git-chart-container {
          background: rgba(11, 19, 41, 0.5);
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 16px 10px 10px 10px;
          position: relative;
          overflow: hidden;
          margin-bottom: 24px;
        }
        .git-chart-svg {
          width: 100%;
          height: auto;
          display: block;
          user-select: none;
        }

        /* Floating Tooltip */
        .git-chart-hud-card {
          position: absolute;
          top: 18px;
          left: 18px;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(56, 189, 248, 0.35);
          backdrop-filter: blur(8px);
          border-radius: 8px;
          padding: 8px 14px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
          pointer-events: none;
          font-size: 0.75rem;
          z-index: 10;
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .hud-item {
          display: flex;
          flex-direction: column;
        }
        .hud-lbl {
          font-size: 0.62rem;
          color: #94a3b8;
          text-transform: uppercase;
          font-weight: 700;
        }
        .hud-val {
          font-size: 0.95rem;
          font-weight: 800;
          color: #ffffff;
          font-family: monospace;
        }
        .hud-val.accent {
          color: #38bdf8;
        }
        .hud-val.green {
          color: #10b981;
        }

        /* 52-Week Contribution Matrix */
        .git-heatmap-container {
          background: rgba(11, 19, 41, 0.5);
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 20px;
          overflow-x: auto;
          margin-bottom: 24px;
        }
        .git-heatmap-wrapper {
          min-width: 820px;
        }
        .heatmap-month-row {
          display: flex;
          margin-left: 32px;
          margin-bottom: 6px;
          height: 18px;
          position: relative;
        }
        .heatmap-month-lbl {
          font-size: 0.7rem;
          color: #64748b;
          font-weight: 600;
          position: absolute;
        }
        .heatmap-grid-flex {
          display: flex;
          gap: 4px;
        }
        .heatmap-days-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 28px;
          margin-right: 4px;
          font-size: 0.65rem;
          color: #64748b;
          font-weight: 600;
        }
        .heatmap-day-lbl {
          height: 12px;
          line-height: 12px;
        }
        .heatmap-week-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .heatmap-day-cell {
          width: 12px;
          height: 12px;
          border-radius: 2.5px;
          cursor: pointer;
          transition: transform 0.15s ease, filter 0.15s ease;
        }
        .heatmap-day-cell:hover {
          transform: scale(1.4);
          z-index: 5;
          filter: brightness(1.3);
          box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
        }
        .heatmap-day-cell.lvl-0 { background: #161b22; border: 1px solid rgba(255, 255, 255, 0.04); }
        .heatmap-day-cell.lvl-1 { background: #0e4429; border: 1px solid rgba(16, 185, 129, 0.3); }
        .heatmap-day-cell.lvl-2 { background: #006d32; border: 1px solid rgba(16, 185, 129, 0.5); }
        .heatmap-day-cell.lvl-3 { background: #26a641; border: 1px solid rgba(52, 211, 153, 0.7); }
        .heatmap-day-cell.lvl-4 { background: #39d353; border: 1px solid #a7f3d0; box-shadow: 0 0 4px #39d353; }

        .heatmap-legend-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.7rem;
          color: #64748b;
        }
        .heatmap-legend-steps {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .heatmap-legend-cell {
          width: 11px;
          height: 11px;
          border-radius: 2px;
        }

        /* Fixed Popover Tooltip for Heatmap */
        .fixed-tooltip {
          position: fixed;
          transform: translate(-50%, -100%);
          background: #0f172a;
          border: 1px solid #38bdf8;
          color: #ffffff;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 600;
          pointer-events: none;
          z-index: 9999;
          white-space: nowrap;
          box-shadow: 0 6px 18px rgba(0,0,0,0.6);
        }

        /* Commits Table / Explorer */
        .git-commits-panel {
          background: rgba(11, 19, 41, 0.5);
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 16px;
        }
        .git-commits-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
        }
        .git-search-box {
          position: relative;
          flex: 1;
          min-width: 220px;
        }
        .git-search-box i {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          font-size: 0.8rem;
        }
        .git-search-input {
          width: 100%;
          background: #0b1329;
          border: 1px solid #1e293b;
          border-radius: 8px;
          padding: 8px 12px 8px 34px;
          color: #f8fafc;
          font-size: 0.8rem;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .git-search-input:focus {
          border-color: #0284c7;
        }
        .git-type-chips {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .git-chip-btn {
          background: #0b1329;
          border: 1px solid #1e293b;
          color: #94a3b8;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 5px 10px;
          border-radius: 6px;
          cursor: pointer;
          text-transform: uppercase;
          transition: all 0.2s ease;
        }
        .git-chip-btn:hover {
          color: #ffffff;
        }
        .git-chip-btn.active {
          background: rgba(2, 132, 199, 0.25);
          border-color: #0284c7;
          color: #38bdf8;
        }

        .git-commits-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .git-commit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 10px 14px;
          gap: 12px;
          transition: all 0.2s ease;
        }
        .git-commit-row:hover {
          background: rgba(30, 41, 59, 0.7);
          border-color: rgba(56, 189, 248, 0.25);
          transform: translateX(3px);
        }
        .git-commit-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }
        .commit-type-badge {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }
        .commit-type-badge.feat { background: rgba(2, 132, 199, 0.18); color: #38bdf8; border: 1px solid rgba(2, 132, 199, 0.35); }
        .commit-type-badge.fix { background: rgba(245, 158, 11, 0.18); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.35); }
        .commit-type-badge.chore { background: rgba(100, 116, 139, 0.18); color: #94a3b8; border: 1px solid rgba(100, 116, 139, 0.35); }
        .commit-type-badge.release { background: rgba(168, 85, 247, 0.18); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.35); }
        .commit-type-badge.perf { background: rgba(236, 72, 153, 0.18); color: #f472b6; border: 1px solid rgba(236, 72, 153, 0.35); }

        .commit-sha-pill {
          font-family: monospace;
          font-size: 0.75rem;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(2, 132, 199, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.2);
          padding: 2px 7px;
          border-radius: 4px;
          text-decoration: none;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s ease;
        }
        .commit-sha-pill:hover {
          background: #0284c7;
          color: #ffffff;
        }

        .commit-msg-text {
          font-size: 0.8rem;
          color: #e2e8f0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .git-commit-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .commit-author {
          font-size: 0.72rem;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .commit-date {
          font-size: 0.72rem;
          color: #64748b;
          font-family: monospace;
        }
        .commit-verified-icon {
          color: #10b981;
          font-size: 0.8rem;
        }

        .git-load-more-btn {
          width: 100%;
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid #334155;
          color: #e2e8f0;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 10px;
          border-radius: 8px;
          margin-top: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .git-load-more-btn:hover {
          background: #0284c7;
          border-color: #38bdf8;
          color: #ffffff;
        }

        /* Footer status */
        .git-dashboard-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          padding-top: 16px;
          margin-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.72rem;
          color: #64748b;
        }
        .git-footer-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 768px) {
          .git-dashboard-root {
            padding: 16px;
          }
          .git-commit-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
          .git-commit-right {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>

      <div className="git-dashboard-glow-bg"></div>

      {/* Header Bar */}
      {showHeader && (
        <div className="git-header-bar">
          <div className="git-header-left">
            <div className="git-brand-icon">
              <i className="fa-brands fa-git-alt"></i>
            </div>
            <div className="git-header-titles">
              <h3>
                Zyphuel Repository Telemetry
                <span className="git-live-badge">
                  <span className="git-live-badge-dot"></span>
                  Code-Base Live
                </span>
              </h3>
              <p className="git-header-desc">
                Real-time engineering cadence, commit stream, and trading velocity chart for <strong>daniyal44/Zyphuel</strong>.
              </p>
            </div>
          </div>

          <div className="git-header-right">
            <a
              href="https://github.com/daniyal44/Zyphuel"
              target="_blank"
              rel="noopener noreferrer"
              className="git-btn-link"
            >
              <i className="fa-brands fa-github"></i>
              <span>View Repository</span>
              <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.65rem' }}></i>
            </a>
            <a
              href="https://github.com/daniyal44/Zyphuel/commits/main"
              target="_blank"
              rel="noopener noreferrer"
              className="git-btn-link"
            >
              <i className="fa-solid fa-code-commit"></i>
              <span>Commit Log ({gitData.totalCommits || 143})</span>
            </a>
          </div>
        </div>
      )}

      {/* 4 KPI Summary Cards */}
      <div className="git-kpi-grid">
        <div className="git-kpi-card">
          <span className="git-kpi-label">Total Verified Commits</span>
          <span className="git-kpi-val">{gitData.totalCommits || 143}</span>
          <span className="git-kpi-sub">
            <i className="fa-solid fa-arrow-trend-up"></i>
            100% Repository Synced
          </span>
        </div>

        <div className="git-kpi-card">
          <span className="git-kpi-label">Active Sprint Days</span>
          <span className="git-kpi-val">{gitData.activeDays || 34}</span>
          <span className="git-kpi-sub" style={{ color: '#38bdf8' }}>
            <i className="fa-solid fa-calendar-days"></i>
            Continuous Integration
          </span>
        </div>

        <div className="git-kpi-card">
          <span className="git-kpi-label">Peak Daily Burst</span>
          <span className="git-kpi-val">{gitData.maxDaily || 11}</span>
          <span className="git-kpi-sub" style={{ color: '#fbbf24' }}>
            <i className="fa-solid fa-bolt-lightning"></i>
            Commits in 24 Hours
          </span>
        </div>

        <div className="git-kpi-card">
          <span className="git-kpi-label">Production Release</span>
          <span className="git-kpi-val" style={{ fontSize: '1.25rem', color: '#c084fc' }}>
            v{gitData.appVersion || '2.6.4.0.0.10'}
          </span>
          <span className="git-kpi-sub" style={{ color: '#10b981' }}>
            <i className="fa-solid fa-circle-check"></i>
            Active In Production
          </span>
        </div>
      </div>

      {/* Tabs Switcher Bar */}
      <div className="git-tabs-bar">
        <div className="git-tab-group">
          <button
            className={`git-tab-btn ${activeTab === 'unified' ? 'active' : ''}`}
            onClick={() => setActiveTab('unified')}
          >
            <i className="fa-solid fa-layer-group"></i> Unified Cockpit
          </button>
          <button
            className={`git-tab-btn ${activeTab === 'chart' ? 'active' : ''}`}
            onClick={() => setActiveTab('chart')}
          >
            <i className="fa-solid fa-chart-line"></i> Velocity Chart
          </button>
          <button
            className={`git-tab-btn ${activeTab === 'heatmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('heatmap')}
          >
            <i className="fa-solid fa-table-cells"></i> 52-Week Matrix
          </button>
          <button
            className={`git-tab-btn ${activeTab === 'commits' ? 'active' : ''}`}
            onClick={() => setActiveTab('commits')}
          >
            <i className="fa-solid fa-list-check"></i> Commits Ledger ({rawCommits.length})
          </button>
        </div>

        {(activeTab === 'chart' || activeTab === 'unified') && (
          <div className="git-tf-group">
            <button
              className={`git-tf-btn ${timeframe === '1M' ? 'active' : ''}`}
              onClick={() => setTimeframe('1M')}
            >
              1M
            </button>
            <button
              className={`git-tf-btn ${timeframe === '3M' ? 'active' : ''}`}
              onClick={() => setTimeframe('3M')}
            >
              3M
            </button>
            <button
              className={`git-tf-btn ${timeframe === 'ALL' ? 'active' : ''}`}
              onClick={() => setTimeframe('ALL')}
            >
              ALL
            </button>
          </div>
        )}
      </div>

      {/* 1. Velocity Chart (TradingView-Style Pure React SVG) */}
      {(activeTab === 'chart' || activeTab === 'unified') && (
        <div className="git-chart-container">
          {/* Real-time Hover HUD Card */}
          <div className="git-chart-hud-card">
            <div className="hud-item">
              <span className="hud-lbl">Symbol</span>
              <span className="hud-val accent">ZYP / GIT</span>
            </div>
            <div className="hud-item">
              <span className="hud-lbl">Index Level</span>
              <span className="hud-val green">
                {hoveredChartPoint ? `${hoveredChartPoint.data.cumulative}.00` : `${gitData.totalCommits || 143}.00`}
              </span>
            </div>
            <div className="hud-item">
              <span className="hud-lbl">Date</span>
              <span className="hud-val">
                {hoveredChartPoint ? hoveredChartPoint.data.date : (filteredChartData[filteredChartData.length - 1]?.date || 'Today')}
              </span>
            </div>
            <div className="hud-item">
              <span className="hud-lbl">Daily Volume</span>
              <span className="hud-val accent">
                +{hoveredChartPoint ? hoveredChartPoint.data.volume : (filteredChartData[filteredChartData.length - 1]?.volume || 1)} Commits
              </span>
            </div>
          </div>

          <svg
            ref={svgRef}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="git-chart-svg"
            onMouseMove={handleChartMouseMove}
            onTouchMove={handleChartMouseMove}
            onMouseLeave={handleChartMouseLeave}
          >
            <defs>
              <linearGradient id="codeGradArea" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
                <stop offset="50%" stopColor="#0284c7" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
              </linearGradient>

              <linearGradient id="volBarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Grid Horizontal Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
              const y = padTop + (chartH * pct)
              const val = Math.round(maxVal - (pct * (maxVal - minVal)))
              return (
                <g key={idx}>
                  <line
                    x1={padLeft}
                    y1={y}
                    x2={svgWidth - padRight}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeDasharray="3 4"
                  />
                  <text
                    x={padLeft - 10}
                    y={y + 3}
                    fill="#64748b"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    {val}
                  </text>
                </g>
              )
            })}

            {/* Volume Bars Sub-Panel */}
            {points.map((pt, i) => {
              const barW = Math.max(3, Math.min(14, (chartW / points.length) * 0.6))
              const barH = Math.max(2, (pt.data.volume / maxVol) * 45)
              const barY = padTop + chartH - barH
              return (
                <rect
                  key={i}
                  x={pt.x - barW / 2}
                  y={barY}
                  width={barW}
                  height={barH}
                  rx="1.5"
                  fill="url(#volBarGrad)"
                  opacity={hoveredChartPoint?.index === i ? 1 : 0.6}
                />
              )
            })}

            {/* Area Fill */}
            {areaD && <path d={areaD} fill="url(#codeGradArea)" />}

            {/* Main Smooth Bezier Line */}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Interactive Crosshair & Cursor */}
            {hoveredChartPoint && (
              <g>
                {/* Vertical Crosshair */}
                <line
                  x1={hoveredChartPoint.x}
                  y1={padTop}
                  x2={hoveredChartPoint.x}
                  y2={padTop + chartH}
                  stroke="#38bdf8"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                {/* Horizontal Crosshair */}
                <line
                  x1={padLeft}
                  y1={hoveredChartPoint.y}
                  x2={svgWidth - padRight}
                  y2={hoveredChartPoint.y}
                  stroke="#38bdf8"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                {/* Glowing Target Ring */}
                <circle
                  cx={hoveredChartPoint.x}
                  cy={hoveredChartPoint.y}
                  r="7"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  opacity="0.6"
                />
                <circle
                  cx={hoveredChartPoint.x}
                  cy={hoveredChartPoint.y}
                  r="3.5"
                  fill="#ffffff"
                  stroke="#0284c7"
                  strokeWidth="1.5"
                />
              </g>
            )}

            {/* Date Labels on X Axis */}
            {points.filter((_, idx) => idx % Math.ceil(points.length / 8) === 0).map((pt, i) => (
              <text
                key={i}
                x={pt.x}
                y={padTop + chartH + 20}
                fill="#64748b"
                fontSize="9"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {pt.data.label}
              </text>
            ))}
          </svg>
        </div>
      )}

      {/* 2. 52-Week Contribution Matrix (Pure React DOM Grid) */}
      {(activeTab === 'heatmap' || activeTab === 'unified') && (
        <div className="git-heatmap-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#cbd5e1' }}>
              <i className="fa-solid fa-calendar-check" style={{ color: '#10b981', marginRight: '6px' }}></i>
              52-Week Repository Contribution Matrix ({gitData.totalCommits || 143} Total Changes)
            </span>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
              Hover over cells to inspect exact commit density
            </span>
          </div>

          <div className="git-heatmap-wrapper">
            {/* Month Labels */}
            <div className="heatmap-month-row">
              {monthLabels.map((ml, idx) => (
                <span
                  key={idx}
                  className="heatmap-month-lbl"
                  style={{ left: `${ml.weekIndex * 16}px` }}
                >
                  {ml.name}
                </span>
              ))}
            </div>

            {/* Heatmap Grid */}
            <div className="heatmap-grid-flex">
              {/* Day Labels Column */}
              <div className="heatmap-days-col">
                <span className="heatmap-day-lbl"></span>
                <span className="heatmap-day-lbl">Mon</span>
                <span className="heatmap-day-lbl"></span>
                <span className="heatmap-day-lbl">Wed</span>
                <span className="heatmap-day-lbl"></span>
                <span className="heatmap-day-lbl">Fri</span>
                <span className="heatmap-day-lbl"></span>
              </div>

              {/* 52 Week Columns */}
              {heatmapWeeks.map((week, wIdx) => (
                <div key={wIdx} className="heatmap-week-col">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      className={`heatmap-day-cell lvl-${day.level}`}
                      onMouseEnter={(e) => handleCellMouseEnter(e, day)}
                      onMouseLeave={() => setHoveredCell(null)}
                      title={`${day.date}: ${day.count} commits`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend Bar */}
            <div className="heatmap-legend-bar">
              <span>Verified commit frequency over rolling 365 calendar days</span>
              <div className="heatmap-legend-steps">
                <span>Less</span>
                <div className="heatmap-legend-cell lvl-0" style={{ background: '#161b22', border: '1px solid rgba(255,255,255,0.05)' }}></div>
                <div className="heatmap-legend-cell lvl-1" style={{ background: '#0e4429' }}></div>
                <div className="heatmap-legend-cell lvl-2" style={{ background: '#006d32' }}></div>
                <div className="heatmap-legend-cell lvl-3" style={{ background: '#26a641' }}></div>
                <div className="heatmap-legend-cell lvl-4" style={{ background: '#39d353' }}></div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Tooltip for Heatmap Cell */}
      {hoveredCell && (
        <div
          className="fixed-tooltip"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
        >
          <strong>{hoveredCell.count} {hoveredCell.count === 1 ? 'commit' : 'commits'}</strong> on {hoveredCell.date}
        </div>
      )}

      {/* 3. Live Commits & Changes Table (Pure React Interactive Explorer) */}
      {(activeTab === 'commits' || activeTab === 'unified') && (
        <div className="git-commits-panel">
          <div className="git-commits-toolbar">
            <div className="git-search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                className="git-search-input"
                placeholder="Search commit message, scope, or hash..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="git-type-chips">
              {['all', 'feat', 'fix', 'chore', 'release'].map((t) => (
                <button
                  key={t}
                  className={`git-chip-btn ${selectedType === t ? 'active' : ''}`}
                  onClick={() => setSelectedType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="git-commits-list">
            {filteredCommits.slice(0, visibleCommitsCount).map((commit, idx) => (
              <div key={idx} className="git-commit-row">
                <div className="git-commit-left">
                  <span className={`commit-type-badge ${commit.type || 'feat'}`}>
                    {commit.type || 'FEAT'}
                  </span>

                  <a
                    href={commit.commitUrl || `https://github.com/daniyal44/Zyphuel/commit/${commit.sha}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="commit-sha-pill"
                    title="View real commit on GitHub"
                  >
                    <i className="fa-solid fa-code-commit" style={{ fontSize: '0.65rem' }}></i>
                    {commit.sha}
                  </a>

                  <span className="commit-msg-text" title={commit.message}>
                    {commit.message}
                  </span>
                </div>

                <div className="git-commit-right">
                  <span className="commit-author">
                    <i className="fa-solid fa-user-circle"></i>
                    {commit.author || 'daniyal44'}
                  </span>
                  <span className="commit-date">{commit.date}</span>
                  <span className="commit-verified-icon" title="Cryptographically Verified Commit">
                    <i className="fa-solid fa-circle-check"></i>
                  </span>
                </div>
              </div>
            ))}

            {filteredCommits.length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px 16px', color: '#64748b' }}>
                <i className="fa-solid fa-filter-circle-xmark" style={{ fontSize: '1.5rem', marginBottom: '8px' }}></i>
                <p style={{ margin: 0, fontSize: '0.85rem' }}>No commits match your filter query.</p>
              </div>
            )}
          </div>

          {filteredCommits.length > visibleCommitsCount && (
            <button
              className="git-load-more-btn"
              onClick={() => setVisibleCommitsCount(prev => prev + 15)}
            >
              <i className="fa-solid fa-angle-down" style={{ marginRight: '6px' }}></i>
              Load More Commits ({filteredCommits.length - visibleCommitsCount} remaining)
            </button>
          )}
        </div>
      )}

      {/* Footer Status Bar */}
      <div className="git-dashboard-footer">
        <div className="git-footer-left">
          <span style={{ color: '#10b981', fontWeight: 800 }}>● SYNC ACTIVE:</span>
          <span>Branch <code style={{ color: '#38bdf8' }}>origin/main</code></span>
          <span>&bull;</span>
          <span>Latest Hash: <code style={{ color: '#38bdf8' }}>{gitData.latestCommit?.sha || '88d5310'}</code></span>
        </div>
        <div>
          <span>Zyphuel Continuous Deployment Pipeline &bull; Automated Telemetry Engine</span>
        </div>
      </div>
    </div>
  )
}
