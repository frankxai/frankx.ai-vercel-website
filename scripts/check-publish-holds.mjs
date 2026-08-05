#!/usr/bin/env node
/**
 * Publish-hold guard.
 *
 * Catches agent-authored editorial machinery that reached PUBLISHED content.
 *
 * Why this exists: on 2026-08-05, 14 MVU dispatches were promoted out of
 * `content/blog/_drafts/` into `content/mvu/`. Every one of them carried a
 * "Not approved for publication" banner, several carried a self-scored
 * promotion rubric ending in "Decision: hold", and one referenced a GitHub PR
 * number. `pnpm run ai-slop:audit:strict` scanned all 2265 files and reported
 * 0 hits, because it looks for AI *tone* ("delve into", "unleash"), not for
 * agent *process artifacts*. Nothing else in the pipeline looked either.
 *
 * The content pipeline writes drafts that grade themselves and then declare
 * whether they are publishable. That signal is machine-readable and free to
 * enforce, so enforce it: if a file says it isn't ready, it must not be live.
 *
 * Scope: only files that are actually published. A draft under `_drafts/`, or
 * any file with `published: false`, is exempt by design — that's the whole
 * point of holding one.
 *
 * Runs in `content:check` (and therefore `prebuild`), failing in ~1s with a
 * precise file:line before the expensive `next build`.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const CONTENT_DIRS = ['content'];

/**
 * Each pattern is one that has actually shipped or nearly shipped. Keep this
 * list precise — a false positive here blocks a release, so only add a pattern
 * when a real artifact of that shape has been observed.
 */
const HOLD_PATTERNS = [
  {
    re: /not approved for publication/i,
    what: 'a "not approved for publication" editorial banner',
  },
  {
    re: /^##\s*Promotion\s+(?:score|scores|gate|assessment)\b/im,
    what: 'a self-scored promotion rubric (internal editorial machinery)',
  },
  {
    re: /^\s*Decision:\s*(?:hold|remain|reassess)\b/im,
    what: 'an unresolved editorial "Decision:" line',
  },
  // Deliberately NOT flagged: bare "PR #123" references. They read as internal
  // leakage in a journal entry, but content/social/2026-07-wk1-repair-in-public
  // cites them on purpose as build-in-public evidence. Ambiguous patterns cause
  // false failures at the release boundary, so this one stays out.
  {
    re: /\bnot a publishable (?:event )?fact\b/i,
    what: 'a self-declared unpublishable fact',
  },
  {
    re: /^\s*\|\s*Total\s*\|\s*\*{0,2}\d+\/30\b/im,
    what: 'a x/30 self-grading score table',
  },
];

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      // A draft is allowed to say it isn't ready — that's what a draft is.
      if (entry === '_drafts') continue;
      walk(full, out);
    } else if (/\.mdx?$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

function isHeld(source) {
  // Frontmatter `published: false` means the loader will not surface it.
  const fm = source.split(/^---\s*$/m)[1];
  return fm ? /^\s*published:\s*false\s*$/m.test(fm) : false;
}

function lineOf(source, index) {
  return source.slice(0, index).split('\n').length;
}

const problems = [];
let scanned = 0;

for (const base of CONTENT_DIRS) {
  for (const file of walk(join(ROOT, base))) {
    const source = readFileSync(file, 'utf8');
    if (isHeld(source)) continue;
    scanned += 1;

    for (const { re, what } of HOLD_PATTERNS) {
      const match = re.exec(source);
      if (match) {
        problems.push({
          file: relative(ROOT, file).replace(/\\/g, '/'),
          line: lineOf(source, match.index),
          what,
          snippet: match[0].trim().slice(0, 90),
        });
      }
    }
  }
}

if (problems.length) {
  console.error(
    `\nPublish-hold check FAILED — ${problems.length} issue(s) in published content:\n`,
  );
  for (const p of problems) {
    console.error(`  ${p.file}:${p.line}`);
    console.error(`    contains ${p.what}`);
    console.error(`    → ${p.snippet}\n`);
  }
  console.error(
    'These are internal editorial artifacts, not reader-facing copy.\n' +
      'Either remove them, or set `published: false` in the frontmatter until the\n' +
      'entry has been edited for publication.\n',
  );
  process.exit(1);
}

console.log(
  `Publish-hold check passed (${scanned} published content files, no editorial holds leaked).`,
);
