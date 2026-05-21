#!/usr/bin/env node
/**
 * Ship the /bio page to frankx.ai-vercel-website main via gh api Trees.
 * Same pattern as ship-golden-age-via-gh-api.mjs.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const REPO = 'frankxai/frankx.ai-vercel-website';
const REPO_ROOT = 'C:/Users/frank/frankx';

const FILES = [
  ['app/bio/page.tsx', 'app/bio/page.tsx', 'utf-8'],
  ['app/bio/layout.tsx', 'app/bio/layout.tsx', 'utf-8'],
  ['app/bio/CopyableBio.tsx', 'app/bio/CopyableBio.tsx', 'utf-8'],
  ['public/images/bio/dawn-studio.jpg', 'public/images/bio/dawn-studio.jpg', 'base64'],
  ['public/images/bio/dawn-studio.prompt.md', 'public/images/bio/dawn-studio.prompt.md', 'utf-8'],
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
  console.log(`✓ ${repoPath} (${(content.length / 1024).toFixed(0)}kb → ${blob.sha.slice(0,8)})`);
  blobs.push({ path: repoPath, mode: '100644', type: 'blob', sha: blob.sha });
}

const tree = gh('POST', `/repos/${REPO}/git/trees`, { base_tree: mainCommit.tree.sha, tree: blobs });
const commit = gh('POST', `/repos/${REPO}/git/commits`, {
  message: `feat(bio): ship /bio press-kit page

- Press-kit / media bio page distinct from /about (which keeps the long-form
  personal narrative). Three bio lengths copy-able to clipboard, six speaker
  topics, six selected-work cards, quick-fact reference, story link to /about,
  direct contact CTA.
- Hero atmosphere image: cinematic dawn-studio still rendered via Nano Banana
  Pro (gemini-3-pro-image-preview), 4K, 16:9, dual-spectrum lighting (warm
  tungsten + cold tech cyan + pre-dawn cobalt). Honors design.md tokens and
  taste.md "cinema, not stock" rule.
- Tech-spectrum (emerald) throughout. Single primary CTA per viewport. Eyebrow
  + headline + deck pattern reused. No AI-slop phrases. No mixed spectrums.
- Schema.org Person JSON-LD for AEO.

Live URL: https://frankx.ai/bio

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`,
  tree: tree.sha, parents: [mainSha],
});
const updated = gh('PATCH', `/repos/${REPO}/git/refs/heads/main`, { sha: commit.sha, force: false });
console.log(`\n✅ main → ${updated.object.sha.slice(0, 8)}`);
