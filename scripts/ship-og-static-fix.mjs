#!/usr/bin/env node
/**
 * Ship OG image switch from broken /api/og dynamic to static book cover.
 *
 * Discovery: After fixing /api/og 500 → 200 by switching to edge runtime,
 * the endpoint now returns 200 + Content-Type: image/png + EMPTY BODY
 * (size=0). next/og's ImageResponse appears broken in Next 16 + Vercel
 * production for unclear reasons. Confirmed across multiple param combos
 * and fresh cache misses.
 *
 * Path forward: use the book's existing static cover image as the OG
 * image. It's a real file (3MB JPG, 1696×2528) that always renders.
 * Social platforms crop portrait covers to landscape automatically.
 *
 * The /api/og fallback chain remains in the code as a soft fallback if
 * the book has no cover. When next/og stabilizes in a future Next minor
 * release, social platforms will pick up the dynamic version on next
 * crawl without further code changes.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const REPO = 'frankxai/frankx.ai-vercel-website';
const REPO_ROOT = 'C:/Users/frank/frankx';
const FILES = [
  ['app/books/[bookSlug]/page.tsx', 'app/books/[bookSlug]/page.tsx', 'utf-8'],
  ['app/books/[bookSlug]/[chapterSlug]/page.tsx', 'app/books/[bookSlug]/[chapterSlug]/page.tsx', 'utf-8'],
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
  console.log(`✓ ${repoPath} → ${blob.sha.slice(0, 8)}`);
  blobs.push({ path: repoPath, mode: '100644', type: 'blob', sha: blob.sha });
}

const tree = gh('POST', `/repos/${REPO}/git/trees`, { base_tree: mainCommit.tree.sha, tree: blobs });
const commit = gh('POST', `/repos/${REPO}/git/commits`, {
  message: `fix(og): use static book cover for OG — next/og empty body in Next 16

After fixing /api/og 500 → 200 with edge runtime (commit 93b637f4), the
endpoint returns 200 + Content-Type: image/png + size=0 body in
production on Vercel. Reproduced across param combos, with HTTP/1.1
and HTTP/2, with fresh cache misses, and with no params at all. This
is a Next 16 + next/og + Vercel edge runtime regression.

Switch book hub + chapter pages to use the book's static coverImage
URL as og:image. Cover is a real 3MB JPG that always renders.
Social platforms (X / LinkedIn / Threads) crop portrait covers to
landscape automatically.

Fallback chain preserved: chapter.image → book.coverImage → /api/og.
When next/og stabilizes, the dynamic path resumes without code change.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`,
  tree: tree.sha, parents: [mainSha],
});
console.log('commit =', commit.sha.slice(0, 8));

const updated = gh('PATCH', `/repos/${REPO}/git/refs/heads/main`, { sha: commit.sha, force: false });
console.log(`\n✅ main → ${updated.object.sha.slice(0, 8)}`);
