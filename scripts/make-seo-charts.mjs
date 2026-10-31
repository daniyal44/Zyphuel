#!/usr/bin/env node
/**
 * Generates the two-dimensional SVG charts used by the 2026-10-31 SEO report.
 *
 *   docs/reports/charts/coverage-indexing-2026-10-31.svg
 *     x = date, left y = pages (indexed / not indexed), right y = impressions
 *   docs/reports/charts/lighthouse-3-pages-2026-10-31.svg
 *     x = page, y = Lighthouse category score (0-100)
 *
 * Both charts are drawn from committed data, never from hand-typed numbers:
 *   docs/reports/data/gsc-coverage-2026-10-31.csv   (Search Console export)
 *   docs/reports/data/lighthouse-2026-10-31.json    (Lighthouse run, mobile)
 *
 * GitHub does not render Mermaid `xychart-beta`, which is why these are
 * committed SVG files that can be embedded with ![alt](path).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DATA = path.join(ROOT, 'docs/reports/data');
const OUT = path.join(ROOT, 'docs/reports/charts');

const FONT = "font-family=\"'Inter','Segoe UI',system-ui,-apple-system,sans-serif\"";

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ------------------------------------------------------------------ chart 1 */

function readCoverage() {
  const csv = fs.readFileSync(path.join(DATA, 'gsc-coverage-2026-10-31.csv'), 'utf8').trim().split(/\r?\n/);
  const header = csv[0].split(',');
  const rows = [];
  for (const line of csv.slice(1)) {
    const cells = line.split(',');
    const rec = {};
    header.forEach((h, i) => { rec[h.trim()] = (cells[i] ?? '').trim(); });
    rows.push({
      date: rec.Date,
      notIndexed: rec['Not indexed'] === '' ? null : Number(rec['Not indexed']),
      indexed: rec.Indexed === '' ? null : Number(rec.Indexed),
      impressions: rec.Impressions === '' ? null : Number(rec.Impressions),
    });
  }
  return rows;
}

function coverageChart() {
  const rows = readCoverage();
  const W = 980, H = 470;
  const L = 74, R = 74, T = 76, B = 64;
  const iw = W - L - R, ih = H - T - B;

  const maxPages = Math.max(...rows.map(r => Math.max(r.indexed ?? 0, r.notIndexed ?? 0))) + 2;
  const maxImp = Math.max(...rows.map(r => r.impressions ?? 0)) + 10;

  const x = i => L + (rows.length === 1 ? iw / 2 : (i / (rows.length - 1)) * iw);
  const yL = v => T + ih - (v / maxPages) * ih;
  const yR = v => T + ih - (v / maxImp) * ih;

  const path = (key, yFn) => {
    let d = '', pen = false;
    rows.forEach((r, i) => {
      const v = r[key];
      if (v === null || v === undefined) { pen = false; return; }
      d += `${pen ? 'L' : 'M'}${x(i).toFixed(1)},${yFn(v).toFixed(1)} `;
      pen = true;
    });
    return d.trim();
  };

  const ticks = 5;
  let grid = '';
  for (let i = 0; i <= ticks; i++) {
    const v = (maxPages / ticks) * i;
    const y = yL(v);
    grid += `<line x1="${L}" y1="${y.toFixed(1)}" x2="${L + iw}" y2="${y.toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/>`;
    grid += `<text x="${L - 12}" y="${(y + 4).toFixed(1)}" ${FONT} font-size="12" fill="#64748b" text-anchor="end">${v.toFixed(0)}</text>`;
  }
  for (let i = 0; i <= ticks; i++) {
    const v = (maxImp / ticks) * i;
    const y = yR(v);
    grid += `<text x="${L + iw + 12}" y="${(y + 4).toFixed(1)}" ${FONT} font-size="12" fill="#94a3b8" text-anchor="start">${v.toFixed(0)}</text>`;
  }

  // x labels: first, last and roughly every 10th day
  let xLabels = '';
  rows.forEach((r, i) => {
    const day = Number(r.date.slice(8, 10));
    const isFirst = i === 0, isLast = i === rows.length - 1;
    if (isFirst || isLast || day === 1 || day === 15) {
      xLabels += `<text x="${x(i).toFixed(1)}" y="${T + ih + 24}" ${FONT} font-size="11" fill="#64748b" text-anchor="middle">${r.date.slice(5)}</text>`;
    }
  });

  // annotated status shifts
  const marks = [
    { date: '2026-09-22', label: '11 indexed', place: 'below' },
    { date: '2026-10-10', label: '14 indexed', place: 'above' },
  ];
  let annot = '';
  for (const m of marks) {
    const i = rows.findIndex(r => r.date === m.date);
    if (i < 0) continue;
    const px = x(i), py = yL(rows[i].indexed);
    annot += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4.5" fill="#059669" stroke="#fff" stroke-width="2"/>`;
    const ty = m.place === 'below' ? py + 20 : py - 12;
    annot += `<text x="${px.toFixed(1)}" y="${ty.toFixed(1)}" ${FONT} font-size="11" font-weight="600" fill="#047857" text-anchor="middle">${esc(m.label)}</text>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Search Console coverage: indexed vs not indexed pages and impressions over time">
<rect width="${W}" height="${H}" fill="#ffffff"/>
<text x="${L}" y="34" ${FONT} font-size="18" font-weight="700" fill="#0f172a">Zyphuel — Search Console coverage trend</text>
<text x="${L}" y="56" ${FONT} font-size="12.5" fill="#64748b">Indexed vs not-indexed pages (left axis) and daily impressions (right axis), 2 Aug – 23 Oct 2026</text>
${grid}${xLabels}
<line x1="${L}" y1="${T + ih}" x2="${L + iw}" y2="${T + ih}" stroke="#94a3b8" stroke-width="1.2"/>
<line x1="${L}" y1="${T}" x2="${L}" y2="${T + ih}" stroke="#94a3b8" stroke-width="1.2"/>
<line x1="${L + iw}" y1="${T}" x2="${L + iw}" y2="${T + ih}" stroke="#cbd5e1" stroke-width="1.2"/>
<path d="${path('impressions', yR)}" fill="none" stroke="#f59e0b" stroke-width="1.6" stroke-dasharray="4 4" opacity="0.9"/>
<path d="${path('notIndexed', yL)}" fill="none" stroke="#dc2626" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>
<path d="${path('indexed', yL)}" fill="none" stroke="#059669" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>
${annot}
<text x="${L - 56}" y="${T + ih / 2}" ${FONT} font-size="12" fill="#475569" transform="rotate(-90 ${L - 56} ${T + ih / 2})" text-anchor="middle">Pages</text>
<text x="${L + iw + 54}" y="${T + ih / 2}" ${FONT} font-size="12" fill="#94a3b8" transform="rotate(90 ${L + iw + 54} ${T + ih / 2})" text-anchor="middle">Impressions / day</text>
${legend(L, T - 6, [
    ['#059669', 'Indexed pages'],
    ['#dc2626', 'Not indexed pages'],
    ['#f59e0b', 'Impressions (dashed)'],
  ])}
<text x="${L}" y="${H - 16}" ${FONT} font-size="11" fill="#94a3b8">Source: Search Console Coverage export 2026-10-31 (docs/reports/data/gsc-coverage-2026-10-31.csv)</text>
</svg>
`;
}

function legend(x, y, items) {
  let out = '', cx = x;
  for (const [color, label] of items) {
    out += `<rect x="${cx}" y="${y - 8}" width="14" height="4" rx="2" fill="${color}"/>`;
    out += `<text x="${cx + 20}" y="${y - 2}" ${FONT} font-size="12" fill="#475569">${esc(label)}</text>`;
    cx += 34 + label.length * 6.6;
  }
  return out;
}

/* ------------------------------------------------------------------ chart 2 */

function lighthouseChart() {
  const data = JSON.parse(fs.readFileSync(path.join(DATA, 'lighthouse-2026-10-31.json'), 'utf8'));
  const pages = Object.keys(data.pages);
  const series = [
    { key: 'performance', label: 'Performance', color: '#dc2626' },
    { key: 'seo', label: 'SEO', color: '#059669' },
    { key: 'accessibility', label: 'Accessibility', color: '#2563eb' },
    { key: 'bestPractices', label: 'Best practices', color: '#7c3aed' },
  ];

  const W = 900, H = 470;
  const L = 66, R = 30, T = 112, B = 74;
  const iw = W - L - R, ih = H - T - B;

  const groupW = iw / pages.length;
  const barGap = 6;
  const barW = (groupW * 0.62 - barGap * (series.length - 1)) / series.length;

  let grid = '';
  for (let v = 0; v <= 100; v += 20) {
    const y = T + ih - (v / 100) * ih;
    grid += `<line x1="${L}" y1="${y.toFixed(1)}" x2="${L + iw}" y2="${y.toFixed(1)}" stroke="${v === 0 ? '#94a3b8' : '#e2e8f0'}" stroke-width="1"/>`;
    grid += `<text x="${L - 12}" y="${(y + 4).toFixed(1)}" ${FONT} font-size="12" fill="#64748b" text-anchor="end">${v}</text>`;
  }

  let bars = '', labels = '';
  pages.forEach((p, gi) => {
    const gx = L + gi * groupW + groupW * 0.19;
    series.forEach((s, si) => {
      const v = data.pages[p][s.key];
      const h = (v / 100) * ih;
      const bx = gx + si * (barW + barGap);
      const by = T + ih - h;
      bars += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" fill="${s.color}" rx="3"/>`;
      bars += `<text x="${(bx + barW / 2).toFixed(1)}" y="${(by - 6).toFixed(1)}" ${FONT} font-size="10.5" font-weight="700" fill="#334155" text-anchor="middle">${v}</text>`;
    });
    const lcp = (data.pages[p].lcp_ms / 1000).toFixed(1);
    const tbt = (data.pages[p].tbt_ms / 1000).toFixed(1);
    labels += `<text x="${(L + gi * groupW + groupW / 2).toFixed(1)}" y="${T + ih + 24}" ${FONT} font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">/${p}/</text>`;
    labels += `<text x="${(L + gi * groupW + groupW / 2).toFixed(1)}" y="${T + ih + 44}" ${FONT} font-size="11" fill="#64748b" text-anchor="middle">LCP ${lcp}s · TBT ${tbt}s</text>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Lighthouse mobile scores for services, download and order pages">
<rect width="${W}" height="${H}" fill="#ffffff"/>
<text x="${L}" y="34" ${FONT} font-size="18" font-weight="700" fill="#0f172a">Zyphuel — Lighthouse mobile baseline before the 2026-10-31 fixes</text>
<text x="${L}" y="56" ${FONT} font-size="12.5" fill="#64748b">Lighthouse 13.6.0 against the live production URLs, mobile emulation, single run each</text>
${grid}${bars}${labels}
${legend(L, 74, series.map(s => [s.color, s.label]))}
<text x="${L}" y="${H - 14}" ${FONT} font-size="11" fill="#94a3b8">Source: docs/reports/data/lighthouse-2026-10-31.json — scores are 0-100 (higher is better)</text>
</svg>
`;
}

/* ------------------------------------------------------------------- output */

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'coverage-indexing-2026-10-31.svg'), coverageChart(), 'utf8');
fs.writeFileSync(path.join(OUT, 'lighthouse-3-pages-2026-10-31.svg'), lighthouseChart(), 'utf8');
console.log('wrote docs/reports/charts/coverage-indexing-2026-10-31.svg');
console.log('wrote docs/reports/charts/lighthouse-3-pages-2026-10-31.svg');
