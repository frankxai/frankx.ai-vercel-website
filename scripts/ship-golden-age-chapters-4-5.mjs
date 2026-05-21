#!/usr/bin/env node
/**
 * Ship Chapters 4 and 5 of The Golden Age of Intelligence to production main.
 * Same gh api Trees pattern as ship-golden-age-via-gh-api.mjs.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const REPO = 'frankxai/frankx.ai-vercel-website';
const REPO_ROOT = 'C:/Users/frank/frankx';

const FILES = [
  ['content/books/golden-age-of-intelligence/chapter-04-stimulus-and-response.md', 'content/books/golden-age-of-intelligence/chapter-04-stimulus-and-response.md', 'utf-8'],
  ['content/books/golden-age-of-intelligence/chapter-05-states-not-stages.md', 'content/books/golden-age-of-intelligence/chapter-05-states-not-stages.md', 'utf-8'],
  ['app/books/lib/books-registry.ts', 'app/books/lib/books-registry.ts', 'utf-8'],
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
  console.log(`✓ ${repoPath}`);
  blobs.push({ path: repoPath, mode: '100644', type: 'blob', sha: blob.sha });
}

const tree = gh('POST', `/repos/${REPO}/git/trees`, { base_tree: mainCommit.tree.sha, tree: blobs });
const commit = gh('POST', `/repos/${REPO}/git/commits`, {
  message: `feat(books): publish Golden Age of Intelligence — Chapters 4 & 5

- Chapter 4: The Space Between Stimulus and Response (2.8k words)
  Frankl's gap, the prefrontal regulatory window, the algorithmic-age
  collapse of the gap, four interventions to expand it.

- Chapter 5: States, Not Stages (2.8k words)
  Gamma / theta / alpha / integrated. Flow as a physical configuration.
  Music as state technology — the 12,000-track corpus context.

Both at the same poetic register as the rewritten Chapter 1: weaves
verified quotes from the FrankX library with neuroscience and frontier
AI, no AI-slop, no guru voice. Chapters 6-12 still scaffolded as
published:false in the registry.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`,
  tree: tree.sha, parents: [mainSha],
});
const updated = gh('PATCH', `/repos/${REPO}/git/refs/heads/main`, { sha: commit.sha, force: false });
console.log(`\n✅ main → ${updated.object.sha.slice(0, 8)}`);
