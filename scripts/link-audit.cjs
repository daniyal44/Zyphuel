#!/usr/bin/env node
/**
 * Internal-link audit for the prerendered build in dist/.
 *
 * Reports, per page:
 *   - HTML size
 *   - total internal <a href> count and unique count
 *   - inbound internal links from other pages (the signal Google uses for
 *     "Discovered – currently not indexed")
 * and site-wide:
 *   - internal links that do NOT use the trailing-slash form. Each one is a
 *     redirect hop, which is what Search Console reports as "Page with redirect".
 *
 * Usage: node scripts/link-audit.cjs [distDir]
 */
const fs = require('fs');
const path = require('path');

const DIST = process.argv[2] || 'dist';
const TARGETS = [
  '/', '/services/', '/order/', '/download/', '/about/',
  '/contact/', '/blog/', '/privacy/', '/terms/',
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

// Only real pages: skip Netlify/Google verification files.
const files = walk(DIST).filter((f) => {
  const base = path.basename(f, '.html');
  return !/^google[0-9a-f]+$/.test(base) && !/^[0-9a-f]{32}$/.test(base);
});

const toRoute = (file) => {
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  return '/' + rel.replace(/index\.html$/, '');
};

const isAsset = (p) => /\.[a-z0-9]{2,5}$/i.test(p);

const rows = [];
const inbound = Object.fromEntries(TARGETS.map((t) => [t, 0]));
const noSlash = new Set();
const dangling = new Set();

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const route = toRoute(file);
  const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
  const internal = hrefs.filter((h) => !h.startsWith('//'));

  for (const t of TARGETS) {
    if (t !== route && internal.some((h) => h === t)) inbound[t] += 1;
  }

  for (const raw of internal) {
    const clean = raw.split(/[?#]/)[0];
    if (clean === '/' || isAsset(clean)) continue;
    if (clean.endsWith('/')) continue;
    noSlash.add(clean);
  }

  rows.push({ route, bytes: Buffer.byteLength(html), links: internal.length, unique: new Set(internal).size });
}

// Dangling: internal page links whose target file does not exist in dist.
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/href="(\/[^"?#]*)"/g)) {
    const clean = m[1].split(/[?#]/)[0];
    if (clean.startsWith('//') || isAsset(clean)) continue;
    const candidate = path.join(DIST, clean);
    const asDir = path.join(DIST, clean, 'index.html');
    const asFile = path.join(DIST, clean.replace(/\/$/, '.html'));
    if (!fs.existsSync(candidate) && !fs.existsSync(asDir) && !fs.existsSync(asFile)) dangling.add(clean);
  }
}

rows.sort((a, b) => (a.route < b.route ? -1 : 1));

console.log('page'.padEnd(58) + 'HTML_KB'.padStart(9) + 'links'.padStart(7) + 'uniq'.padStart(6));
for (const r of rows) {
  console.log(r.route.padEnd(58) + (r.bytes / 1024).toFixed(0).padStart(9) + String(r.links).padStart(7) + String(r.unique).padStart(6));
}

console.log('\nInbound internal links per key page (from other pages):');
for (const t of TARGETS) console.log('  ' + t.padEnd(18) + String(inbound[t]).padStart(4) + (inbound[t] < 5 ? '   <-- weak' : ''));

console.log('\nInternal links without trailing slash (each is a redirect hop):');
console.log(noSlash.size ? [...noSlash].sort().map((s) => '  ' + s).join('\n') : '  none');

console.log('\nDangling internal links (target missing from build):');
console.log(dangling.size ? [...dangling].sort().map((s) => '  ' + s).join('\n') : '  none');

const weak = TARGETS.filter((t) => inbound[t] < 5 && t !== '/');
process.exitCode = noSlash.size || dangling.size || weak.length ? 1 : 0;
