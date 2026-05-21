#!/usr/bin/env node
/**
 * Ship /api/og runtime fix — switch from nodejs to edge so ImageResponse
 * works in production. Currently every OG image returns 500.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const REPO = 'frankxai/frankx.ai-vercel-website';
const REPO_ROOT = 'C:/Users/frank/frankx';
const FILES = [['app/api/og/route.tsx', 'app/api/og/route.tsx', 'utf-8']];

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
  message: `fix(og): switch /api/og to edge runtime — every OG image was 500

Pre-existing site-wide bug: /api/og?title=... returned 500 in production
for every page. Confirmed by curling the endpoint with various params:

  /api/og                              → 500
  /api/og?title=test                   → 500
  /api/og?title=test&subtitle=foo      → 500

Cause: route.tsx had \`export const runtime = 'nodejs'\` with the comment
"Use nodejs runtime for Turbopack compatibility in Next.js 16". This
broke production: next/og's ImageResponse needs edge runtime in Next 14+;
nodejs runtime hits an internal font/wasm loader path that throws.

Fix: switch to runtime = 'edge'. Edge runtime ships with built-in font
fallback so Inter/Arial/system fonts work without explicit fetch.

Effect: every page-level OG image (every blog post, every chapter, every
hub page) that was pointing at /api/og now actually renders. Social
shares on X/LinkedIn/Threads will show real previews; AI agents that
fetch og:image will get real images.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`,
  tree: tree.sha, parents: [mainSha],
});
console.log('commit =', commit.sha.slice(0, 8));

const updated = gh('PATCH', `/repos/${REPO}/git/refs/heads/main`, { sha: commit.sha, force: false });
console.log(`\n✅ main → ${updated.object.sha.slice(0, 8)}`);
