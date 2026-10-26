#!/usr/bin/env node
/**
 * Extracts per-page facts from the prerendered build in dist/ for the website report.
 * Usage: node scripts/report-stats.cjs [distDir] [outJson]
 */
const fs = require('fs');
const path = require('path');

const DIST = process.argv[2] || 'dist';
const OUT = process.argv[3] || 'scratch/report-stats.json';

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'assets') continue;
      walk(p, acc);
    } else if (entry.name.endsWith('.html')) {
      acc.push(p);
    }
  }
  return acc;
}

const stripTags = (s) => s.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');

function routeOf(file) {
  let rel = path.relative(DIST, file).split(path.sep).join('/');
  if (rel === 'index.html') return '/';
  rel = rel.replace(/\/index\.html$/, '/').replace(/\.html$/, '/');
  return '/' + rel;
}

const pages = [];
for (const file of walk(DIST)) {
  const html = fs.readFileSync(file, 'utf8');
  const grab = (re) => {
    const m = html.match(re);
    return m ? decode(m[1]).trim() : '';
  };

  const title = grab(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const desc = grab(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = grab(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const robots = grab(/<meta\s+name="robots"\s+content="([^"]*)"/i);
  const ogImage = grab(/<meta\s+property="og:image"\s+content="([^"]*)"/i);

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripTags(m[1]));
  const h2Count = (html.match(/<h2[\s>]/gi) || []).length;

  // JSON-LD
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const schemaTypes = [];
  let schemaValid = true;
  for (const b of blocks) {
    try {
      const parsed = JSON.parse(b);
      const collect = (node) => {
        if (!node || typeof node !== 'object') return;
        if (Array.isArray(node)) return node.forEach(collect);
        if (node['@type']) {
          if (Array.isArray(node['@type'])) schemaTypes.push(...node['@type']);
          else schemaTypes.push(node['@type']);
        }
        Object.values(node).forEach((v) => { if (v && typeof v === 'object') collect(v); });
      };
      collect(parsed);
    } catch {
      schemaValid = false;
    }
  }

  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const imgsWithoutAlt = imgs.filter((t) => !/\balt=/.test(t)).length;

  const internalLinks = [...html.matchAll(/href="(\/[^"#?]*)"/g)].length;
  const externalLinks = [...html.matchAll(/href="(https?:\/\/[^"]+)"/g)]
    .filter((m) => !/zyphuel\.netlify\.app/.test(m[1])).length;

  const words = stripTags(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' '))
    .split(/\s+/).filter(Boolean).length;

  pages.push({
    route: routeOf(file),
    file: path.relative('.', file).split(path.sep).join('/'),
    bytes: Buffer.byteLength(html),
    kb: +(Buffer.byteLength(html) / 1024).toFixed(1),
    title, titleLen: title.length,
    desc, descLen: desc.length,
    canonical, robots, ogImage,
    h1Count: h1s.length, h1: h1s[0] || '', h2Count,
    jsonLdBlocks: blocks.length, schemaTypes: [...new Set(schemaTypes)], schemaValid,
    images: imgs.length, imgsWithoutAlt,
    internalLinks, externalLinks, words,
    inSitemap: false,
  });
}

// sitemap membership
let sitemapUrls = [];
const sitemapPath = path.join(DIST, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  sitemapUrls = [...fs.readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const p of pages) {
    const full = 'https://zyphuel.netlify.app' + (p.route === '/' ? '/' : p.route);
    p.inSitemap = sitemapUrls.some((u) => u.replace(/\/$/, '') === full.replace(/\/$/, ''));
  }
}

pages.sort((a, b) => a.route.localeCompare(b.route));

const totals = {
  pages: pages.length,
  htmlKb: +pages.reduce((s, p) => s + p.kb, 0).toFixed(1),
  avgWords: Math.round(pages.reduce((s, p) => s + p.words, 0) / pages.length),
  totalWords: pages.reduce((s, p) => s + p.words, 0),
  imgs: pages.reduce((s, p) => s + p.images, 0),
  imgsWithoutAlt: pages.reduce((s, p) => s + p.imgsWithoutAlt, 0),
  internalLinks: pages.reduce((s, p) => s + p.internalLinks, 0),
  schemaValid: pages.filter((p) => p.schemaValid).length,
  overTitleLimit: pages.filter((p) => p.titleLen > 60).length,
  overDescLimit: pages.filter((p) => p.descLen > 160).length,
  multiH1: pages.filter((p) => p.h1Count !== 1).length,
  notInSitemap: pages.filter((p) => !p.inSitemap).length,
  sitemapUrls: sitemapUrls.length,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), totals, pages }, null, 2));

const pad = (s, n) => String(s).padEnd(n);
console.log(pad('route', 46) + pad('kb', 8) + pad('words', 8) + pad('title', 7) + pad('desc', 7) + pad('h1', 5) + pad('imgs', 6) + 'schema');
for (const p of pages) {
  console.log(pad(p.route, 46) + pad(p.kb, 8) + pad(p.words, 8) + pad(p.titleLen, 7) + pad(p.descLen, 7) + pad(p.h1Count, 5) + pad(p.images, 6) + p.schemaTypes.join(','));
}
console.log('\ntotals:', JSON.stringify(totals, null, 2));
console.log('\nwrote', OUT);
