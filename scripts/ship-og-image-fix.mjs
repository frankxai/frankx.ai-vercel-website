#!/usr/bin/env node
/**
 * Ship per-chapter and per-book OG images.
 * Previously every book hub and every chapter shared the generic
 * "FrankX Intelligence Hub" OG card, regardless of content. Now each
 * page renders its own OG image via /api/og?title=...&subtitle=...
 * with the chapter title and book context, so social shares + AI
 * agent crawls show specific imagery.
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
  message: `feat(books): per-chapter + per-book OG images via /api/og

Every book hub and every chapter previously shared the generic
"FrankX Intelligence Hub" OG card. Each page now renders its own card:

  Book hub: title=<book title>, subtitle=<subtitle> · <author>
  Chapter:  title=<chapter title>, subtitle=<book> · Chapter N · <author>

The /api/og route already existed and accepts ?title= and ?subtitle=
params with the FrankX gradient + frankx.ai hairline. Social shares
on X/LinkedIn/Threads now show the actual chapter title; AI agents
that crawl OG images now see specific content per page.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`,
  tree: tree.sha, parents: [mainSha],
});
console.log('commit =', commit.sha.slice(0, 8));

const updated = gh('PATCH', `/repos/${REPO}/git/refs/heads/main`, { sha: commit.sha, force: false });
console.log(`\n✅ main → ${updated.object.sha.slice(0, 8)}`);
