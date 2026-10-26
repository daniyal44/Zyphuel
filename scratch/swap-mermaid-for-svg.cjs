#!/usr/bin/env node
// One-off migration: replace Mermaid fenced blocks in the report docs with
// committed SVG images, in document order.
const fs = require('fs');

const HUB = '../reports/charts/';
const MAP = {
  'docs/reports/README.md': [
    './charts/report-map.svg',
    './charts/qa-scores.svg',
    './charts/lighthouse.svg',
    './charts/change-mix.svg',
    './charts/timeline.svg',
    './charts/open-items.svg',
  ],
  'docs/reports/2026-10-26-website-changes-report.md': [
    './charts/timeline.svg',
    'REMOVE_SECTION_0_1',
    './charts/change-mix.svg',
    './charts/performance.svg',
  ],
  'docs/qa/2026-10-26-full-qa-report.md': [
    HUB + 'qa-pipeline.svg',
    HUB + 'qa-scores.svg',
  ],
  'docs/audits/2026-10-21-audit.md': [
    HUB + 'lighthouse.svg',
  ],
};

for (const [file, images] of Object.entries(MAP)) {
  const parts = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n').split('```mermaid');
  const head = parts[0];
  const blocks = parts.slice(1).map((chunk) => {
    const close = chunk.indexOf('```');
    return { body: chunk.slice(0, close), rest: chunk.slice(close + 3) };
  });

  if (blocks.length !== images.length) {
    console.log(`SKIP ${file}: ${blocks.length} mermaid blocks, ${images.length} images mapped`);
    continue;
  }

  let out = head;
  blocks.forEach((block, i) => {
    let rest = block.rest;
    const target = images[i];
    if (target === 'REMOVE_SECTION_0_1') {
      // drop the block and the now-pointless sub-heading above it
      out = out.replace(/### 0\.1 When each change landed\n+$/, '');
      rest = rest.replace(/^\n+/, '\n\n');
    } else {
      const alt = target.split('/').pop().replace('.svg', '').replace(/-/g, ' ');
      out += `![${alt}](${target})`;
    }
    out += rest;
  });

  fs.writeFileSync(file, out);
  console.log(`OK   ${file}: ${blocks.length} block(s) -> images`);
}
