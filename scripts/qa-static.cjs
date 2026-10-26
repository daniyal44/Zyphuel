const fs = require('fs');
const path = require('path');

const SKIP = /^(assets|frames|video|APK|images|plugins|api|ezgif)$/;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP.test(entry.name)) continue;
      out.push(...walk(full));
    } else if (entry.name.endsWith('.html') && !entry.name.startsWith('google')) {
      out.push(full);
    }
  }
  return out;
}

const files = walk('dist').sort();
const results = [];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative('dist', file).split(path.sep).join('/');
  const route = ('/' + rel).replace(/index\.html$/, '').replace(/404\.html$/, '404');
  const is404 = /404\.html$/.test(file);
  const issues = [];
  const body = html.slice(html.indexOf('<div id="root">'));

  const h1Count = (body.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) issues.push('h1 count = ' + h1Count);

  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  if (!title) issues.push('missing title');
  if (title.length > 65) issues.push('title ' + title.length + ' chars (>65)');

  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  if (!desc) issues.push('missing description');
  else if (desc.length > 165) issues.push('description ' + desc.length + ' chars (>165)');

  if (!is404 && !/rel="canonical"/.test(html)) issues.push('missing canonical');

  const ids = (html.match(/\sid="([^"]+)"/g) || []).map((m) => m.slice(5, -1));
  const dupIds = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  if (dupIds.length) issues.push('duplicate ids: ' + dupIds.join(','));

  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  blocks.forEach((match, i) => {
    try { JSON.parse(match[1]); } catch (e) { issues.push('invalid JSON-LD #' + i); }
  });
  if (!blocks.length && !is404) issues.push('no JSON-LD');

  const imgs = html.match(/<img\b[^>]*>/g) || [];
  const noAlt = imgs.filter((tag) => !/\balt=/.test(tag));
  if (noAlt.length) issues.push(noAlt.length + ' <img> without alt');

  const refs = [...html.matchAll(/(?:src|href)="(\/(?!\/)[^"#?]+)"/g)].map((m) => m[1]);
  const missing = [...new Set(refs)].filter((ref) => {
    if (ref.startsWith('/assets/')) return false;
    if (!/\.(jpg|jpeg|png|svg|webp|gif|ico|txt|xml|json|apk|pdf)$/i.test(ref)) return false;
    return !fs.existsSync(path.join('dist', ref));
  });
  if (missing.length) issues.push('missing assets: ' + missing.slice(0, 3).join(', '));

  if (/urgent/i.test(body)) issues.push('contains "urgent"');

  const internalLinks = [...body.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
  const brokenLinks = [...new Set(internalLinks)].filter((link) => {
    const clean = link.split('?')[0];
    if (clean.startsWith('/APK/') || clean.startsWith('/api/') || clean.startsWith('/plugins/')) return false;
    const target = path.join('dist', clean);
    return !(fs.existsSync(target) || fs.existsSync(path.join(target, 'index.html')));
  });
  if (brokenLinks.length) issues.push('broken internal links: ' + brokenLinks.slice(0, 4).join(', '));

  results.push({ route, issues, title: title.length, desc: desc.length, h1: h1Count, imgs: imgs.length, internalLinks: new Set(internalLinks).size });
}

let total = 0;
for (const r of results) {
  total += r.issues.length;
  const label = r.route === '/404' ? '/404' : r.route;
  console.log(label.padEnd(50), r.issues.length ? 'FAIL  ' + r.issues.join(' | ') : 'PASS');
}

console.log('\npages audited: ' + results.length);
console.log('total issues:  ' + total);
fs.writeFileSync('scratch/qa-static.json', JSON.stringify(results, null, 2));
