#!/usr/bin/env node
/**
 * Content-integrity guard.
 *
 * Catches two classes of bug that shipped to production undetected because they
 * render "fine" locally but are structurally wrong — neither the TypeScript
 * compiler nor `next build` flags them:
 *
 *   1. MARKDOWN SYNTAX IN FRONTMATTER `title` / `description`.
 *      Frontmatter strings are rendered as PLAIN TEXT (page <title>, <h1>,
 *      breadcrumbs, card hero). A `[ElevenLabs](https://…)` link in the title
 *      leaks the literal `[…](…)` into every one of those surfaces.
 *      MDX only resolves link syntax inside the BODY, never in frontmatter.
 *
 *   2. HARDCODED IMAGE PATHS THAT DON'T EXIST ON DISK.
 *      Curated components (e.g. PremiumVisualCarousel) hold a literal list of
 *      `/images/…` asset paths. Unlike blog frontmatter `image:` (which has a
 *      runtime fallback in lib/blog.ts → resolveBlogImage), these have NO
 *      fallback — a typo or a renamed/never-generated file is a silent 404 on
 *      every page load.
 *
 * Runs in `prebuild`, so it fails in ~1s with a precise file:line BEFORE the
 * expensive `next build`. Precision over recall: every pattern flagged here is
 * a proven-breaking one, so a green run means these two bugs are absent.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();

// Content compiled to pages — frontmatter here becomes <title>/<h1>/cards.
// Mirrors RENDERED_DIRS in check-mdx-safety.mjs (confirmed via lib/blog.ts,
// lib/guides.ts, app/sitemap.ts).
const CONTENT_DIRS = ['content/blog', 'content/guides'];

// Components that hold hardcoded `/images/…` asset lists with no runtime
// fallback. Add curated galleries/carousels here as they're created.
const ASSET_LITERAL_FILES = ['components/blog/PremiumVisualCarousel.tsx'];

// Markdown link `[text](url)` or image `![alt](url)` syntax. The capture is
// deliberately conservative: a `]` immediately followed by `(` is never valid
// in a plain-text title/description, only in markdown.
const MD_LINK = /!?\[[^\]]*\]\([^)]*\)/;

// `/images/…` (or other public asset) string literals inside component source.
const ASSET_REF = /['"`](\/(?:images|assets|videos)\/[^'"`]+\.(?:webp|jpe?g|png|svg|gif|avif|mp4|webm))['"`]/g;

const IMAGE_EXISTS_IGNORE = /^https?:\/\//; // external URLs are not our concern

const violations = [];

// ---------------------------------------------------------------------------
// Check 1 — frontmatter title/description must be plain text
// ---------------------------------------------------------------------------
const mdxFiles = [];
const walk = (dir) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.(mdx|md)$/.test(e)) mdxFiles.push(p);
  }
};
for (const rel of CONTENT_DIRS) {
  const abs = join(ROOT, rel);
  if (existsSync(abs)) walk(abs);
}

const FM_FIELDS = ['title', 'description'];

for (const file of mdxFiles) {
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');

  // Only inspect the leading YAML frontmatter block.
  if (lines[0]?.trim() !== '---') continue;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '---') break; // end of frontmatter
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (!m) continue;
    const [, key, rawVal] = m;
    if (!FM_FIELDS.includes(key)) continue;
    if (MD_LINK.test(rawVal)) {
      violations.push({
        file: relative(ROOT, file),
        line: i + 1,
        kind: 'frontmatter-markdown',
        detail: `frontmatter "${key}" contains markdown link/image syntax — renders as literal text in <title>/<h1>/cards`,
        text: rawVal.trim().slice(0, 120),
      });
    }
  }
}

// ---------------------------------------------------------------------------
// Check 2 — hardcoded image literals in curated components must exist
// ---------------------------------------------------------------------------
for (const rel of ASSET_LITERAL_FILES) {
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) continue;
  const text = readFileSync(abs, 'utf8');
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const match of line.matchAll(ASSET_REF)) {
      const assetPath = match[1];
      if (IMAGE_EXISTS_IGNORE.test(assetPath)) continue;
      const onDisk = join(ROOT, 'public', assetPath);
      if (!existsSync(onDisk)) {
        violations.push({
          file: rel,
          line: i + 1,
          kind: 'missing-asset',
          detail: `references "${assetPath}" which does not exist in public/ — silent 404 (no runtime fallback)`,
          text: line.trim().slice(0, 120),
        });
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
if (violations.length > 0) {
  console.error('\nContent-integrity check FAILED:\n');
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  [${v.kind}]`);
    console.error(`    ${v.detail}`);
    console.error(`    ${v.text}\n`);
  }
  console.error(
    `${violations.length} issue(s) found across ${mdxFiles.length} content file(s) and ${ASSET_LITERAL_FILES.length} component(s). Fix before build.\n`
  );
  process.exit(1);
}

console.log(
  `Content-integrity check passed (${mdxFiles.length} content files, ${ASSET_LITERAL_FILES.length} asset-literal components, no issues).`
);
