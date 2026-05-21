#!/usr/bin/env node
/**
 * Ship JsonLd component fix — replace next/script with plain <script> tag
 * so that JSON-LD structured data appears in initial server HTML for
 * crawlers (Google/Bing) and AI agents (Perplexity, ChatGPT browse, Claude
 * search). next/script with strategy=afterInteractive injects client-side
 * only — invisible to anyone who reads static HTML.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const REPO = 'frankxai/frankx.ai-vercel-website';
const REPO_ROOT = 'C:/Users/frank/frankx';
const FILES = [['components/seo/JsonLd.tsx', 'components/seo/JsonLd.tsx', 'utf-8']];

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
  message: `fix(seo): emit JSON-LD in initial server HTML, not after hydration

Pre-existing site-wide AEO/SEO bug: every page using <JsonLd /> was
rendering the structured data via next/script with strategy=afterInteractive,
which injects inline scripts client-side after hydration — invisible to
crawlers (Google/Bing) and AI agents (Perplexity, ChatGPT browse, Claude
search) that read static HTML and never run JS.

Verified by curling /books/golden-age-of-intelligence/chapter-06-the-imagination-engine:
the page emitted only the global <Organization> schema (from Layout) but
the chapter's <Article> schema was missing entirely, even though the
component was rendered in the JSX tree.

Fix follows the official Next.js recommendation for structured data:
use a plain <script type="application/ld+json"> tag (not next/script).
Same pattern works in Server Components and renders in initial HTML.

Affects: every page that emits JsonLd — books, articles, FAQ pages,
HowTo pages, course pages, BookHub, BookChapter, Library hub, Library
detail, etc. Roughly 14 schema types across ~50+ routes.

Effect on AEO: AI search agents will now find the chapter Article schema
with author=Frank Riemer, isPartOf=Book, position, wordCount, timeRequired.
This is the difference between "Golden Age of Intelligence by Frank
Riemer" being citable in AI responses or not.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`,
  tree: tree.sha, parents: [mainSha],
});
console.log('commit =', commit.sha.slice(0, 8));

const updated = gh('PATCH', `/repos/${REPO}/git/refs/heads/main`, { sha: commit.sha, force: false });
console.log(`\n✅ main → ${updated.object.sha.slice(0, 8)}`);
