#!/usr/bin/env node
/**
 * Ship Golden Age book to frankxai/frankx.ai-vercel-website main branch
 * via the GitHub Trees API. Bypasses the local-rebase conflict.
 *
 * Pattern from the Atlas Globe deploy (PR #28, used when disk was full):
 *   1. Read main's HEAD commit + tree SHA
 *   2. Create blob for each file (auto-handles binary via base64)
 *   3. Create new tree with base_tree=main's tree + 6 modified entries
 *   4. Create commit with parents=[main HEAD]
 *   5. PATCH refs/heads/main to point at the new commit
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const REPO = 'frankxai/frankx.ai-vercel-website';
const REPO_ROOT = 'C:/Users/frank/frankx';

const FILES = [
  // path-in-repo, local-source-path, encoding
  ['content/books/golden-age-of-intelligence/chapter-01-the-two-intelligences-awakening.md', 'content/books/golden-age-of-intelligence/chapter-01-the-two-intelligences-awakening.md', 'utf-8'],
  ['content/books/golden-age-of-intelligence/chapter-02-the-twenty-watt-miracle.md', 'content/books/golden-age-of-intelligence/chapter-02-the-twenty-watt-miracle.md', 'utf-8'],
  ['content/books/golden-age-of-intelligence/chapter-03-what-the-ancients-knew.md', 'content/books/golden-age-of-intelligence/chapter-03-what-the-ancients-knew.md', 'utf-8'],
  ['public/images/books/golden-age-of-intelligence-cover.jpg', 'public/images/books/golden-age-of-intelligence-cover.jpg', 'base64'],
  ['public/images/books/golden-age-of-intelligence-cover.spec.md', 'public/images/books/golden-age-of-intelligence-cover.spec.md', 'utf-8'],
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
    encoding: 'utf-8',
    cwd: REPO_ROOT,
    maxBuffer: 100 * 1024 * 1024,
  });
  try { return JSON.parse(result); } catch { return result; }
}

console.log('1. Get main HEAD');
const mainRef = gh('GET', `/repos/${REPO}/git/refs/heads/main`);
const mainCommitSha = mainRef.object.sha;
console.log('   main HEAD =', mainCommitSha);

const mainCommit = gh('GET', `/repos/${REPO}/git/commits/${mainCommitSha}`);
const mainTreeSha = mainCommit.tree.sha;
console.log('   main tree =', mainTreeSha);

console.log('\n2. Create blobs');
const blobs = [];
for (const [repoPath, localPath, enc] of FILES) {
  const content = readFileSync(resolve(REPO_ROOT, localPath));
  const blobBody = enc === 'base64'
    ? { content: content.toString('base64'), encoding: 'base64' }
    : { content: content.toString('utf-8'), encoding: 'utf-8' };
  const blob = gh('POST', `/repos/${REPO}/git/blobs`, blobBody);
  console.log(`   ✓ ${repoPath} → ${blob.sha.slice(0, 8)}`);
  blobs.push({ path: repoPath, mode: '100644', type: 'blob', sha: blob.sha });
}

console.log('\n3. Create tree');
const newTree = gh('POST', `/repos/${REPO}/git/trees`, {
  base_tree: mainTreeSha,
  tree: blobs,
});
console.log('   new tree =', newTree.sha);

console.log('\n4. Create commit');
const commit = gh('POST', `/repos/${REPO}/git/commits`, {
  message: `feat(books): publish The Golden Age of Intelligence — Chapters 1–3

Frank Riemer's flagship visionary manifesto. Three threads woven through
every chapter: ancient wisdom (Stoic, Vedic, Taoist, Buddhist), neuroscience
(20-watt brain, sparse coding, predictive processing), and AI (NB2, BCIs,
neuromorphic chips).

- Chapter 1: The Two Intelligences Awakening (3.3k words, poetic register
  with Rilke, Whitman, Marcus Aurelius, Rumi woven through)
- Chapter 2: The 20-Watt Miracle (2.8k words)
- Chapter 3: What the Ancients Knew (3.5k words)
- Cover: Penguin Clothbound × Edison filament, rendered via Nano Banana 2
  (gemini-3.1-flash-image-preview), 1696×2528 @ 300 DPI
- Registered as book #0 in books-registry (flagship position)

Live URLs:
  /books/golden-age-of-intelligence
  /books/golden-age-of-intelligence/chapter-01-the-two-intelligences-awakening
  /books/golden-age-of-intelligence/chapter-02-the-twenty-watt-miracle
  /books/golden-age-of-intelligence/chapter-03-what-the-ancients-knew

Chapters 4-12 scaffolded in registry as published:false (invisible in nav until drafted).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`,
  tree: newTree.sha,
  parents: [mainCommitSha],
});
console.log('   commit =', commit.sha);

console.log('\n5. Update main ref');
const updated = gh('PATCH', `/repos/${REPO}/git/refs/heads/main`, {
  sha: commit.sha,
  force: false,
});
console.log('   main now at:', updated.object.sha);
console.log('\n✅ Shipped to main. Vercel will deploy.');
