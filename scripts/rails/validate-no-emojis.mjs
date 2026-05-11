#!/usr/bin/env node
/**
 * Rails are emoji-free per voice rules §3 #7. Body text, frontmatter, headings
 * — all of it. Direct quotations from sources may contain Unicode that
 * resembles emoji ranges (rare, mostly in Sufi citations); those should be
 * paraphrased rather than emojied.
 *
 * Run: node scripts/rails/validate-no-emojis.mjs
 */
import fs from 'node:fs';
import { glob } from 'glob';
import path from 'node:path';

// Pictographic emoji ranges. Excludes most CJK, accents, and quotes.
const EMOJI_REGEX =
  /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2700}-\u{27BF}\u{2600}-\u{26FF}\u{1F1E6}-\u{1F1FF}]/u;

const errors = [];
const files = await glob('content/{rails,canon}/**/*.md', { cwd: process.cwd() });

for (const f of files) {
  const txt = fs.readFileSync(path.join(process.cwd(), f), 'utf8');
  const lines = txt.split('\n');
  lines.forEach((line, i) => {
    if (EMOJI_REGEX.test(line)) {
      errors.push(`${f}:${i + 1}: contains emoji — rails are emoji-free`);
    }
  });
}

if (errors.length) {
  console.error('Rail emoji check FAILED:\n' + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log('✓ No emojis in rails');
