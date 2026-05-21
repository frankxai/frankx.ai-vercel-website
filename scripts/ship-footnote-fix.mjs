#!/usr/bin/env node
/**
 * Ship BookReader footnote rendering fix to production.
 * marked v12 has no native footnote support — every chapter on every book
 * was rendering [^1] as literal text. Fix adds inline marked extension that:
 *   - parses [^N]: defs (one or many)
 *   - rewrites [^N] refs to <sup><a href="#fn-N">N</a></sup>
 *   - emits a <section class="footnotes"> at end of body
 *   - keeps existing markdown source unchanged
 * Plus styles for sup-ref, footnote-list, back-ref arrow.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const REPO = 'frankxai/frankx.ai-vercel-website';
const REPO_ROOT = 'C:/Users/frank/frankx';

const FILES = [
  ['app/books/components/BookReader.tsx', 'app/books/components/BookReader.tsx', 'utf-8'],
];

function gh(method, path, body) {
  const args = ['api', '-X', method, path];
  if (body) {
    const tmpFile = resolve(REPO_ROOT, '.gh-api-body.json');
    writeFileSync(tmpFile, JSON.stringify(body));
    args.push('--input', tmpFile);
  }
  const result = execSync(`gh ${args.map((a) => /\s/.test(a) ? `"${a}"` : a).join(' ')}`, {
    encoding: 'utf-8', cwd: REPO_ROOT, maxBuffer: 100 * 1024 * 1024,
  });
  try { return JSON.parse(result); } catch { return result; }
}

const mainRef = gh('GET', `/repos/${REPO}/git/refs/heads/main`);
const mainSha = mainRef.object.sha;
const mainCommit = gh('GET', `/repos/${REPO}/git/commits/${mainSha}`);
console.log('main HEAD =', mainSha.slice(0, 8));

const blobs = [];
for (const [repoPath, localPath, enc] of FILES) {
  const content = readFileSync(resolve(REPO_ROOT, localPath));
  const blob = gh('POST', `/repos/${REPO}/git/blobs`,
    enc === 'base64'
      ? { content: content.toString('base64'), encoding: 'base64' }
      : { content: content.toString('utf-8'), encoding: 'utf-8' }
  );
  console.log(`✓ ${repoPath} (${(content.length / 1024).toFixed(0)}kb → ${blob.sha.slice(0, 8)})`);
  blobs.push({ path: repoPath, mode: '100644', type: 'blob', sha: blob.sha });
}

const tree = gh('POST', `/repos/${REPO}/git/trees`, { base_tree: mainCommit.tree.sha, tree: blobs });
const commit = gh('POST', `/repos/${REPO}/git/commits`, {
  message: `fix(books): render footnotes properly across every chapter

Pre-existing bug discovered after Golden Age Ch6-12 ship: marked v12 has
no native footnote support, so [^1] [^2] etc were rendering as literal
text in the published HTML on every chapter of every book.

This adds an inline transform in BookReader before marked.parse() that:
  - extracts [^N]: definitions from the markdown
  - rewrites inline [^N] refs to numbered <sup class="footnote-ref">
    with anchored back-link
  - strips the original markdown footnote section (heading + defs)
  - re-emits a styled <section class="footnotes"> at chapter end with
    counter-driven numbering and ↩ back-references

Styling added below: subtle muted color, smaller body size, tabular-num
counters on the left side, back-arrow on hover. Footnote refs in body
are sup-rendered with hover background.

Effect: every existing chapter on the site that had broken footnotes
(Golden Age 1-12, others using [^N] syntax) now renders professionally
without re-shipping any chapter content.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`,
  tree: tree.sha, parents: [mainSha],
});
console.log('commit =', commit.sha.slice(0, 8));

const updated = gh('PATCH', `/repos/${REPO}/git/refs/heads/main`, { sha: commit.sha, force: false });
console.log(`\n✅ main → ${updated.object.sha.slice(0, 8)}`);
