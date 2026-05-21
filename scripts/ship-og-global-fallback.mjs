#!/usr/bin/env node
/**
 * Ship global OG fallback fix. siteConfig.ogImage was pointing at the
 * broken /api/og dynamic route. Switch to /hero-homepage.png — a real
 * 1MB+ PNG file that always loads. Every page on the site that doesn't
 * pass an explicit `image` param to createMetadata now has a working
 * OG image.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const REPO = 'frankxai/frankx.ai-vercel-website';
const REPO_ROOT = 'C:/Users/frank/frankx';
const FILES = [['lib/seo.ts', 'lib/seo.ts', 'utf-8']];

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
  message: `fix(og): global OG fallback — switch from broken /api/og to /hero-homepage.png

Companion to f5650405. siteConfig.ogImage was pointing at /api/og dynamic
route which returns 200 + empty body in production (Next 16 + next/og
regression). Switch to /hero-homepage.png — real PNG, always loads.

Effect: every page across the site that doesn't pass an explicit
\`image\` param to createMetadata (homepage, about, blog index, downloads,
research hub, etc.) now has a working OG image instead of an empty
crawler-cached placeholder.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`,
  tree: tree.sha, parents: [mainSha],
});
console.log('commit =', commit.sha.slice(0, 8));

const updated = gh('PATCH', `/repos/${REPO}/git/refs/heads/main`, { sha: commit.sha, force: false });
console.log(`\n✅ main → ${updated.object.sha.slice(0, 8)}`);
