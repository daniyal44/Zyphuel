#!/usr/bin/env node
/**
 * Generates the report charts as standalone SVG files.
 *
 * Mermaid blocks in the reports were invisible for readers, so every chart is
 * committed as a real image instead. SVGs are written with presentation
 * attributes only (no <style> block, no external fonts) so they render the same
 * in GitHub, in the editor and in a plain browser.
 *
 * Usage: node scripts/make-report-charts.cjs
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = 'docs/reports/charts';
const FONT = 'Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif';

const C = {
  ink: '#0f172a', muted: '#475569', faint: '#94a3b8', line: '#cbd5e1',
  grid: '#eef2f7', bg: '#ffffff', panel: '#f8fafc',
  blue: '#0284c7', sky: '#38bdf8', deep: '#075985',
  green: '#059669', amber: '#d97706', red: '#dc2626', violet: '#7c3aed',
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const txt = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${o.size || 12}" fill="${o.fill || C.ink}"` +
  ` text-anchor="${o.anchor || 'start'}" font-weight="${o.weight || 'normal'}"` +
  (o.rotate ? ` transform="rotate(${o.rotate} ${x} ${y})"` : '') +
  (o.opacity ? ` opacity="${o.opacity}"` : '') + `>${esc(s)}</text>`;
const rect = (x, y, w, h, fill, rx = 0, extra = '') =>
  `<rect x="${+x.toFixed(2)}" y="${+y.toFixed(2)}" width="${+w.toFixed(2)}" height="${+h.toFixed(2)}" fill="${fill}" rx="${rx}"${extra}/>`;
const line = (x1, y1, x2, y2, stroke, w = 1, dash = '') =>
  `<line x1="${+x1.toFixed(2)}" y1="${+y1.toFixed(2)}" x2="${+x2.toFixed(2)}" y2="${+y2.toFixed(2)}" stroke="${stroke}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const dot = (cx, cy, r, fill, stroke = '', sw = 0) =>
  `<circle cx="${+cx.toFixed(2)}" cy="${+cy.toFixed(2)}" r="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ''}/>`;

function wrap(text, max) {
  const words = String(text).split(/\s+/);
  const out = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max) { if (cur) out.push(cur.trim()); cur = w; }
    else cur = (cur + ' ' + w).trim();
  }
  if (cur) out.push(cur.trim());
  return out;
}

function write(file, w, h, body) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">\n` +
    rect(0, 0, w, h, C.bg) + '\n' + body + '\n</svg>\n';
  fs.writeFileSync(path.join(OUT_DIR, file), svg);
  return `${file} (${(Buffer.byteLength(svg) / 1024).toFixed(1)} kB)`;
}

/* ---------------------------------------------------------------- bar chart */

function barChart({
  file, title, subtitle, categories, values, yMax, color = C.blue,
  unit = '', decimals = 0, limit = null, limitLabel = '', rotateLabels = false,
}) {
  const W = 960, H = 520;
  const L = 74, R = 32, T = 74, B = rotateLabels ? 118 : 78;
  const x0 = L, y0 = T, x1 = W - R, y1 = H - B;
  const plotW = x1 - x0, plotH = y1 - y0;
  const yOf = (v) => y1 - (v / yMax) * plotH;
  const slot = plotW / categories.length;
  const barW = Math.min(66, slot * 0.58);

  let s = '';
  s += txt(24, 34, title, { size: 19, weight: 'bold' });
  if (subtitle) s += txt(24, 55, subtitle, { size: 12.5, fill: C.muted });

  // gridlines + y axis labels
  const ticks = 5;
  for (let i = 0; i <= ticks; i++) {
    const v = (yMax / ticks) * i;
    const y = yOf(v);
    s += line(x0, y, x1, y, i === 0 ? C.line : C.grid, 1);
    s += txt(x0 - 12, y + 4, `${v}${unit ? ' ' + unit : ''}`, { size: 11.5, fill: C.faint, anchor: 'end' });
  }
  // axes
  s += line(x0, y0, x0, y1, C.line, 1.4);
  s += line(x0, y1, x1, y1, C.line, 1.4);

  // limit reference line
  if (limit !== null && limit <= yMax) {
    const y = yOf(limit);
    s += line(x0, y, x1, y, C.red, 1.6, '7 5');
    s += txt(x1 - 4, y - 8, limitLabel || `limit ${limit}`, { size: 11.5, fill: C.red, anchor: 'end', weight: 'bold' });
  }

  categories.forEach((cat, i) => {
    const cx = x0 + slot * i + slot / 2;
    const v = values[i];
    const h = Math.max(1, (v / yMax) * plotH);
    const over = limit !== null && v > limit;
    s += rect(cx - barW / 2, y1 - h, barW, h, over ? C.red : color, 3);
    s += txt(cx, y1 - h - 8, v.toFixed(decimals), { size: 12, weight: 'bold', anchor: 'middle', fill: over ? C.red : C.ink });
    s += txt(cx, y1 + 20, cat, {
      size: 12, fill: C.muted, anchor: rotateLabels ? 'end' : 'middle',
      rotate: rotateLabels ? -35 : 0,
    });
  });

  return write(file, W, H, s);
}

/* ------------------------------------------------------- grouped bar chart */

function groupedBarChart({ file, title, subtitle, categories, series, yMax, unit = '', note = '' }) {
  const W = 960, H = 558;
  const L = 74, R = 32, T = 120, B = 86;
  const x0 = L, y0 = T, x1 = W - R, y1 = H - B;
  const plotW = x1 - x0, plotH = y1 - y0;
  const yOf = (v) => y1 - (v / yMax) * plotH;
  const slot = plotW / categories.length;
  const barW = Math.min(30, (slot * 0.62) / series.length);

  let s = '';
  s += txt(24, 34, title, { size: 19, weight: 'bold' });
  if (subtitle) s += txt(24, 55, subtitle, { size: 12.5, fill: C.muted });

  // legend
  let lx = x0;
  series.forEach((ser) => {
    s += rect(lx, 68, 14, 14, ser.color, 3);
    s += txt(lx + 20, 80, ser.name, { size: 12, fill: C.muted });
    lx += 26 + ser.name.length * 7.4;
  });

  for (let i = 0; i <= 5; i++) {
    const v = (yMax / 5) * i;
    const y = yOf(v);
    s += line(x0, y, x1, y, i === 0 ? C.line : C.grid, 1);
    s += txt(x0 - 12, y + 4, `${v}${unit ? ' ' + unit : ''}`, { size: 11.5, fill: C.faint, anchor: 'end' });
  }
  s += line(x0, y0, x0, y1, C.line, 1.4);
  s += line(x0, y1, x1, y1, C.line, 1.4);

  categories.forEach((cat, i) => {
    const cx = x0 + slot * i + slot / 2;
    const groupW = barW * series.length;
    series.forEach((ser, k) => {
      const v = ser.values[i];
      const h = Math.max(1, (v / yMax) * plotH);
      const bx = cx - groupW / 2 + k * barW;
      s += rect(bx, y1 - h, barW - 2, h, ser.color, 3);
      if (series.length <= 2 || categories.length <= 6) {
        s += txt(bx + (barW - 2) / 2, y1 - h - 6, `${v}`, { size: 10.5, weight: 'bold', anchor: 'middle', fill: C.muted });
      }
    });
    s += txt(cx, y1 + 20, cat, { size: 11.5, fill: C.muted, anchor: 'middle' });
  });

  if (note) s += txt(24, H - 12, note, { size: 11.5, fill: C.faint });

  return write(file, W, H, s);
}

/* --------------------------------------------------------------- pie chart */

function pieChart({ file, title, subtitle, segments, donut = false }) {
  const W = 900, H = 470;
  const cx = 260, cy = 258, r = 148;
  const total = segments.reduce((a, s) => a + s.value, 0);

  let s = '';
  s += txt(24, 34, title, { size: 19, weight: 'bold' });
  if (subtitle) s += txt(24, 55, subtitle, { size: 12.5, fill: C.muted });

  let angle = -Math.PI / 2;
  const mid = [];
  segments.forEach((seg) => {
    const frac = seg.value / total;
    const a2 = angle + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const p = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    const [sx, sy] = p(angle), [ex, ey] = p(a2);
    s += `<path d="M ${cx} ${cy} L ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${ex.toFixed(2)} ${ey.toFixed(2)} Z" fill="${seg.color}" stroke="#ffffff" stroke-width="2"/>`;
    const am = (angle + a2) / 2;
    const [lx, ly] = [cx + r * 0.66 * Math.cos(am), cy + r * 0.66 * Math.sin(am)];
    if (frac > 0.06) s += txt(lx, ly + 5, `${Math.round(frac * 100)}%`, { size: 15, weight: 'bold', fill: '#ffffff', anchor: 'middle' });
    mid.push({ seg, frac });
    angle = a2;
  });
  if (donut) s += dot(cx, cy, r * 0.52, C.bg);

  let ly = 122;
  segments.forEach((seg) => {
    s += rect(500, ly - 12, 16, 16, seg.color, 3);
    s += txt(526, ly + 1, seg.label, { size: 13, fill: C.ink, weight: 'bold' });
    s += txt(526, ly + 17, `${seg.value} of ${total}  (${Math.round((seg.value / total) * 100)}%)`, { size: 11.5, fill: C.muted });
    ly += 46;
  });

  return write(file, W, H, s);
}

/* --------------------------------------------------- horizontal bar chart */

/**
 * Horizontal bars: category names on the left, value axis along the bottom.
 * Used wherever there are too many or too long labels for vertical bars.
 */
function hBarChart({
  file, title, subtitle, categories, values, colors = null, barColor = C.blue,
  xMax, xTicks, xTickLabel = null, xUnit = '', decimals = 0,
  limit = null, limitLabel = '', valueLabels = null, legend = null, note = '',
}) {
  const W = 1000;
  const labelW = 340, x0 = labelW + 16, x1 = W - 96;
  const top = legend ? 122 : 92;
  const rowH = 27, gap = 7;
  const H = top + categories.length * (rowH + gap) + 62;
  const plotW = x1 - x0;
  const xOf = (v) => x0 + (v / xMax) * plotW;

  let s = '';
  s += txt(24, 34, title, { size: 19, weight: 'bold' });
  if (subtitle) s += txt(24, 55, subtitle, { size: 12.5, fill: C.muted });

  if (legend) {
    let lx = 24;
    legend.forEach((item) => {
      s += rect(lx, 74, 13, 13, item.color, 3);
      s += txt(lx + 19, 85, item.name, { size: 11.5, fill: C.muted });
      lx += 27 + item.name.length * 6.9;
    });
  }

  // vertical gridlines + x axis labels
  const ticks = xTicks || Array.from({ length: 6 }, (_, i) => (xMax / 5) * i);
  ticks.forEach((t) => {
    const x = xOf(t);
    s += line(x, top - 12, x, top + categories.length * (rowH + gap) - gap, C.grid, 1);
    s += txt(x, H - 26, xTickLabel ? xTickLabel(t) : `${t}`, { size: 11, fill: C.faint, anchor: 'middle' });
  });
  s += line(x0, top - 12, x0, top + categories.length * (rowH + gap) - gap, C.line, 1.4);
  if (xUnit) s += txt(x1, H - 8, xUnit, { size: 11, fill: C.faint, anchor: 'end' });

  if (limit !== null && limit <= xMax) {
    const x = xOf(limit);
    s += line(x, top - 12, x, top + categories.length * (rowH + gap) - gap, C.red, 1.6, '6 5');
    s += txt(x + 5, top - 18, limitLabel || `limit ${limit}`, { size: 11.5, fill: C.red, weight: 'bold' });
  }

  categories.forEach((cat, i) => {
    const y = top + i * (rowH + gap);
    const v = values[i];
    const over = limit !== null && v > limit;
    const color = over ? C.red : (colors ? colors[i] : barColor);
    s += rect(0, y, labelW, rowH, i % 2 ? C.panel : C.bg);
    s += txt(labelW - 12, y + rowH / 2 + 4, cat.length > 46 ? cat.slice(0, 45) + '\u2026' : cat, {
      size: 11.5, fill: C.muted, anchor: 'end',
    });
    const w = Math.max(2, (v / xMax) * plotW);
    s += rect(x0, y + 4, w, rowH - 8, color, 3);
    const vlabel = valueLabels ? valueLabels[i] : v.toFixed(decimals);
    s += txt(x0 + w + 7, y + rowH / 2 + 4, vlabel, { size: 11, weight: 'bold', fill: over ? C.red : C.ink });
  });

  if (note) s += txt(24, H - 8, note, { size: 11.5, fill: C.faint });

  return write(file, W, H, s);
}

/* ------------------------------------------------------------- flow chart */

function flowChart({ file, title, subtitle, steps, sideBox = null }) {
  const boxW = 520, boxH = 74, gap = 26, x = 40;
  const H = 96 + steps.length * (boxH + gap) + 20;
  const W = sideBox ? 980 : 640;

  let s = '';
  s += txt(24, 34, title, { size: 19, weight: 'bold' });
  if (subtitle) s += txt(24, 55, subtitle, { size: 12.5, fill: C.muted });

  steps.forEach((step, i) => {
    const y = 92 + i * (boxH + gap);
    s += rect(x, y, boxW, boxH, step.fill || C.panel, 8, ` stroke="${step.stroke || C.line}" stroke-width="1.4"`);
    s += rect(x, y, 6, boxH, step.accent || C.blue, 8);
    s += txt(x + 22, y + 27, step.title, { size: 13.5, weight: 'bold' });
    wrap(step.body || '', 74).slice(0, 2).forEach((ln, k) => {
      s += txt(x + 22, y + 47 + k * 15, ln, { size: 11.5, fill: C.muted });
    });
    if (i < steps.length - 1) {
      const ax = x + boxW / 2;
      s += `<path d="M ${ax - 6} ${y + boxH + 4} L ${ax} ${y + boxH + gap - 6} L ${ax + 6} ${y + boxH + 4} Z" fill="${C.line}"/>`;
      s += line(ax, y + boxH, ax, y + boxH + gap - 8, C.line, 1.6);
    }
  });

  if (sideBox) {
    const y = 92;
    const sx = 620, sw = 320;
    s += rect(sx, y, sw, boxH + 8, C.bg, 8, ` stroke="${C.blue}" stroke-width="1.6" stroke-dasharray="6 4"`);
    s += txt(sx + 16, y + 26, sideBox.title, { size: 13, weight: 'bold', fill: C.deep });
    wrap(sideBox.body, 42).slice(0, 4).forEach((ln, k) => {
      s += txt(sx + 16, y + 46 + k * 15, ln, { size: 11.5, fill: C.muted });
    });
    const my = y + (boxH + 8) / 2;
    s += line(560, my, sx - 2, my, C.blue, 1.4, '5 4');
  }

  return write(file, W, H, s);
}

/* ------------------------------------------------------------------ charts */

const made = [];

// 1. QA scores
made.push(barChart({
  file: 'qa-scores.svg',
  title: 'Zyphuel QA score by area — 2026-10-26',
  subtitle: 'Weighted overall 81 / 100. Trust is weighted double because it is the only category that can cause a manual penalty.',
  categories: ['Security', 'SEO tech', 'AEO', 'GEO', 'Build', 'Mobile', 'Perf', 'A11y', 'Trust'],
  values: [98, 95, 92, 90, 87, 82, 78, 75, 55],
  yMax: 100, unit: '', color: C.blue,
}));

// 2. Lighthouse desktop vs mobile
made.push(groupedBarChart({
  file: 'lighthouse.svg',
  title: 'Lighthouse Performance — 2026-10-21 build',
  subtitle: 'Desktop (best run) vs mobile (single run), all 9 pages, measured on the shipped build.',
  categories: ['Home', 'Order', 'About', 'Services', 'Contact', 'Download', 'Blog', 'Privacy', 'Terms'],
  series: [
    { name: 'Desktop', color: C.blue, values: [99, 98, 97, 93, 96, 88, 95, 97, 93] },
    { name: 'Mobile', color: C.sky, values: [66, 61, 64, 56, 86, 34, 77, 73, 87] },
  ],
  yMax: 100, unit: '',
  note: 'Source: docs/audits/2026-10-21-audit.md — mobile is dragged down by multi-megabyte frame-sequence images, not by JavaScript.',
}));

// 3. JavaScript before / after
made.push(groupedBarChart({
  file: 'performance.svg',
  title: 'First-load JavaScript, kB gzip — before vs after',
  subtitle: 'Route-level code splitting plus CSS trimming. Lower is better.',
  categories: ['Entry JS', 'Home route', 'Order route'],
  series: [
    { name: 'Before', color: C.faint, values: [113.9, 166.9, 166.9] },
    { name: 'After', color: C.green, values: [28.5, 81.6, 105.7] },
  ],
  yMax: 180, unit: '',
  note: 'Global CSS fell from 150.4 kB to 93.5 kB on top of this.',
}));

// 4. Change mix
made.push(pieChart({
  file: 'change-mix.svg',
  title: 'Change mix — 2026-10-26 round',
  subtitle: '60 files changed across 9 commits, +1,812 / -658 lines.',
  segments: [
    { label: 'src/ — components and pages', value: 24, color: C.blue },
    { label: 'docs/ — reports, plans, page docs', value: 20, color: C.sky },
    { label: 'public/ — sitemap, robots, llms, og image', value: 7, color: C.green },
    { label: 'root config — package, netlify, README, AGENTS', value: 7, color: C.amber },
    { label: 'scripts/ — qa-static, fuel updater', value: 2, color: C.violet },
  ],
}));

// 5. Open items by owner
made.push(pieChart({
  file: 'open-items.svg',
  title: 'Open items by owner',
  subtitle: 'Eight items are still open. Four need account access or a business decision; four are pure code work.',
  segments: [
    { label: 'Owner — account access or a business decision', value: 4, color: C.amber },
    { label: 'Agent — code and content work only', value: 4, color: C.blue },
  ],
}));

// 6. Commit timeline — time along the x axis, one row per commit
const clock = (min) => {
  const total = 18 * 60 + 30 + min;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};
const commits = [
  { min: 14, label: '6dfe8ed  Android v2.6.4.0.0.33 sync + 85 kB gzip cut', color: C.blue },
  { min: 19, label: 'f5a2b05  Download page doc correction', color: C.blue },
  { min: 94, label: 'd0a3b16  Truthful OG card + one business entity', color: C.sky },
  { min: 101, label: 'd8e1c03  Price / app keyword clusters', color: C.sky },
  { min: 102, label: '500bcf7  Trust audit + keyword map documented', color: C.sky },
  { min: 103, label: 'b815052  Sitemap lastmod refresh', color: C.sky },
  { min: 123, label: 'ee3405a  FAQ panels clipped (overlap bug)', color: C.red },
  { min: 143, label: 'a23f80c  45-minute window + responsive stepper', color: C.red },
  { min: 160, label: '18db378  Meta lengths normalised (23 fixes)', color: C.amber },
  { min: 164, label: 'f71a319  Consolidated change report', color: C.amber },
];
made.push(hBarChart({
  file: 'timeline.svg',
  title: 'Zyphuel website work — 2026-10-26',
  subtitle: 'Ten commits in one session. The x axis is the minutes elapsed since 18:30 PKT; each bar ends when that commit landed.',
  categories: commits.map((c) => c.label),
  values: commits.map((c) => c.min),
  colors: commits.map((c) => c.color),
  valueLabels: commits.map((c) => clock(c.min)),
  xMax: 180,
  xTicks: [0, 30, 60, 90, 120, 150, 180],
  xTickLabel: (t) => clock(t),
  xUnit: 'minutes since 18:30 PKT',
  legend: [
    { name: 'Release', color: C.blue },
    { name: 'SEO and GEO', color: C.sky },
    { name: 'Bug fix', color: C.red },
    { name: 'Reporting', color: C.amber },
  ],
}));

// 7. Documentation map
made.push(flowChart({
  file: 'report-map.svg',
  title: 'How the documentation fits together',
  subtitle: 'Plan sets intent, audit measures, QA verifies, report consolidates, changes.md keeps the order.',
  steps: [
    { title: 'docs/plans/ — intent', body: 'SEO master plan, keyword map, backlink plan, 10 PM cutoff audit', accent: C.violet },
    { title: 'docs/audits/ — measurement', body: '2026-10-21 competitor gap, Lighthouse for 9 pages, responsiveness bugs', accent: C.amber },
    { title: 'docs/qa/ — verification', body: '2026-10-26 full QA of 17 routes, scored 81 / 100 across 9 categories', accent: C.green },
    { title: 'docs/reports/ — consolidation', body: 'Complete change report (9 commits) and this whole-website report', accent: C.blue },
    { title: 'docs/changes.md — order', body: 'Chronological phase log, Phase 1 to 23', accent: C.faint },
  ],
  sideBox: {
    title: 'docs/pages/ + subpages/',
    body: 'Per-page documentation: 9 top-level pages and 7 article subpages, each with its own changelog. Referenced by the phase log.',
  },
}));

// 8. QA pipeline
made.push(flowChart({
  file: 'qa-pipeline.svg',
  title: 'QA pipeline actually executed',
  subtitle: 'Every stage below ran against the production build, not against source.',
  steps: [
    { title: '1. Vite client + SSR build', body: 'Two bundles, route-level lazy chunks, prerendered HTML for 17 routes', accent: C.blue },
    { title: '2. Static audit of every page', body: 'H1, title and description length, canonical, duplicate ids, JSON-LD parse, img alt, links', accent: C.violet },
    { title: '3. Browser session', body: 'Real Chromium at 414 px and desktop width, mobile emulation for the stepper', accent: C.green },
    { title: '4. Overflow and console probes', body: 'document scrollWidth vs viewport, inner scroll containers, hydration errors', accent: C.amber },
    { title: '5. Score and report', body: 'Per-page PASS or FAIL table plus the scored report committed to main', accent: C.red },
  ],
}));

// ---- data-driven charts from the build
let stats = null;
const statsPath = 'scratch/report-stats.json';
if (fs.existsSync(statsPath)) {
  stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));
  // real indexable routes only: drop 404 and the Google verification stub
  const top = stats.pages.filter((p) => p.titleLen > 0 && p.route !== '/404/');
  const label = (r) => (r === '/' ? 'Home' : r.replace(/^\/|\/$/g, '').replace('/blog/', 'blog: ').slice(0, 26));

  const rows = [...top].sort((a, b) => b.kb - a.kb);

  made.push(hBarChart({
    file: 'page-weight.svg',
    title: 'Prerendered HTML weight per page',
    subtitle: 'Kilobytes of static HTML delivered before any asset, heaviest first. The red line is a 14 kB working budget.',
    categories: rows.map((p) => p.route),
    values: rows.map((p) => p.kb),
    xMax: 130, xUnit: 'kilobytes of HTML', decimals: 1,
    barColor: C.sky, limit: 14, limitLabel: '14 kB budget',
  }));

  made.push(hBarChart({
    file: 'page-words.svg',
    title: 'Indexable word count per page',
    subtitle: 'Visible text in the prerendered HTML. Guides and articles carry the long tail; utility pages stay lean.',
    categories: rows.map((p) => p.route),
    values: rows.map((p) => p.words),
    xMax: Math.ceil(Math.max(...rows.map((p) => p.words)) / 500) * 500,
    xUnit: 'words of visible text', barColor: C.green,
  }));

  made.push(hBarChart({
    file: 'meta-titles.svg',
    title: 'Title tag length vs the 60-character SERP limit',
    subtitle: 'Any bar past the red line is truncated in Google. All 16 indexable pages are now inside the limit.',
    categories: rows.map((p) => p.route),
    values: rows.map((p) => p.titleLen),
    xMax: 80, xUnit: 'characters', barColor: C.blue,
    limit: 60, limitLabel: '60-char limit',
  }));

  made.push(hBarChart({
    file: 'meta-descriptions.svg',
    title: 'Meta description length vs the 160-character limit',
    subtitle: 'Descriptions longer than the limit are cut off mid-sentence in the search result.',
    categories: rows.map((p) => p.route),
    values: rows.map((p) => p.descLen),
    xMax: 200, xUnit: 'characters', barColor: C.violet,
    limit: 160, limitLabel: '160-char limit',
  }));
}

console.log(made.join('\n'));
console.log(`\n${made.length} charts written to ${OUT_DIR}/`);
