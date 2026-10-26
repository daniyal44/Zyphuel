#!/usr/bin/env node
// Throwaway static server so the generated SVG charts can be opened in a browser.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PORT = 4188;
const TYPES = {
  '.svg': 'image/svg+xml', '.html': 'text/html; charset=utf-8',
  '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const target = path.join(ROOT, urlPath);
  if (!target.startsWith(ROOT)) { res.writeHead(403).end('forbidden'); return; }
  fs.readFile(target, (err, buf) => {
    if (err) { res.writeHead(404, { 'content-type': 'text/plain' }).end('not found: ' + urlPath); return; }
    res.writeHead(200, { 'content-type': TYPES[path.extname(target)] || 'application/octet-stream' });
    res.end(buf);
  });
}).listen(PORT, '127.0.0.1', () => console.log('serving ' + ROOT + ' on http://127.0.0.1:' + PORT));
