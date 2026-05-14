#!/usr/bin/env node
/**
 * Validates cross-link integrity:
 *   1. Every canon listed in entry frontmatter `canonCited[]` must have a
 *      content/canon/{slug}.md file.
 *   2. Every canon listed in `canonCited[]` must be linked from the body at
 *      least once via `](/canon/{slug})` form.
 *
 * Run: node scripts/rails/validate-cross-links.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { glob } from 'glob';

const errors = [];
const cwd = process.cwd();

const canonFiles = await glob('content/canon/*.md', { cwd });
const canonSlugs = new Set(canonFiles.map((f) => path.basename(f, '.md')));

const railFiles = await glob('content/rails/**/*.md', { cwd });
for (const f of railFiles) {
  const raw = fs.readFileSync(path.join(cwd, f), 'utf8');
  const parsed = matter(raw);
  const cited = Array.isArray(parsed.data.canonCited) ? parsed.data.canonCited : [];
  for (const slug of cited) {
    if (!canonSlugs.has(slug)) {
      errors.push(`${f}: cites canon "${slug}" but content/canon/${slug}.md does not exist`);
      continue;
    }
    const linkRe = new RegExp(`\\]\\(/canon/${slug}/?\\)`);
    if (!linkRe.test(parsed.content)) {
      errors.push(`${f}: cites canon "${slug}" in frontmatter but body never links to /canon/${slug}/`);
    }
  }
}

if (errors.length) {
  console.error('Rail cross-link check FAILED:\n' + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log('✓ Rail cross-links validated');
