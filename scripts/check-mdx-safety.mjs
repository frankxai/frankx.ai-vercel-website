#!/usr/bin/env node
/**
 * MDX build-safety guard.
 *
 * Catches the class of content bug that silently broke production for days:
 * a `<` immediately followed by a digit or `$` in MDX prose/tables (e.g.
 * `Recommended (<$60)`), which the MDX compiler parses as the start of a JSX
 * tag and then fails to prerender ("Unexpected character ... in name").
 *
 * This runs in `prebuild`, so it fails in ~1s with a precise file:line BEFORE
 * the expensive `next build` prerender, instead of a cryptic error 1,300 pages in.
 *
 * Precision over recall: we only flag the proven-breaking pattern `<[0-9$]`
 * OUTSIDE fenced code blocks (``` / ~~~), inline code spans (`...`), and
 * frontmatter. Code samples that legitimately contain `<500 lines` or `< 2.5s`
 * are not flagged.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

// Only scan content directories that are COMPILED TO PAGES (MDX/JSX prerender).
// Internal docs (content/strategy, content/newsletters, …) are never compiled,
// so a `<` there can't break the build and must not fail CI.
// Render roots confirmed via lib/blog.ts, lib/guides.ts, app/sitemap.ts.
const RENDERED_DIRS = ['content/blog', 'content/guides'];

const files = [];
const walk = (dir) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.(mdx|md)$/.test(e)) files.push(p);
  }
};
for (const rel of RENDERED_DIRS) {
  const abs = join(ROOT, rel);
  if (existsSync(abs)) walk(abs);
}

const DANGER = /<[0-9$]/; // `<` directly followed by a digit or `$` — breaks MDX/JSX parsing
const violations = [];

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');
  let inFence = false;
  let inFrontmatter = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // YAML frontmatter (leading --- ... ---)
    if (i === 0 && line.trim() === '---') { inFrontmatter = true; continue; }
    if (inFrontmatter) { if (line.trim() === '---') inFrontmatter = false; continue; }

    // Fenced code blocks
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;

    // Strip inline code spans so `<$60` inside `...` is ignored
    const stripped = line.replace(/`[^`]*`/g, '');

    if (DANGER.test(stripped)) {
      const col = stripped.search(DANGER) + 1;
      violations.push({ file: file.replace(ROOT + '/', ''), line: i + 1, col, text: line.trim().slice(0, 120) });
    }
  }
}

if (violations.length > 0) {
  console.error('\nMDX build-safety check FAILED — these will break `next build` prerender:\n');
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}:${v.col}`);
    console.error(`    ${v.text}`);
    console.error(`    -> "<" directly followed by a digit/$ is parsed as a JSX tag. Reword (e.g. "(<$60)" -> "(under $60)") or wrap in \`backticks\`.\n`);
  }
  console.error(`${violations.length} issue(s) found across ${files.length} content file(s). Fix before build.\n`);
  process.exit(1);
}

console.log(`MDX build-safety check passed (${files.length} content files, no unsafe '<' in prose/tables).`);
