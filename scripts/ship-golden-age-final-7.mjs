#!/usr/bin/env node
/**
 * Ship Golden Age Chapters 6–12 + registry update + /bio nav addition
 * to frankxai/frankx.ai-vercel-website main via the GitHub Trees API.
 *
 * Pattern: same as ship-golden-age-via-gh-api.mjs (proven from PR #28).
 *   1. Read main HEAD + tree SHA
 *   2. Create blobs for each file
 *   3. Create new tree off base_tree=main
 *   4. Create commit with parents=[main HEAD]
 *   5. PATCH refs/heads/main → new commit
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const REPO = 'frankxai/frankx.ai-vercel-website';
const REPO_ROOT = 'C:/Users/frank/frankx';

const FILES = [
  // 7 new chapters
  ['content/books/golden-age-of-intelligence/chapter-06-the-imagination-engine.md',
    'content/books/golden-age-of-intelligence/chapter-06-the-imagination-engine.md', 'utf-8'],
  ['content/books/golden-age-of-intelligence/chapter-07-memory-sleep-replay.md',
    'content/books/golden-age-of-intelligence/chapter-07-memory-sleep-replay.md', 'utf-8'],
  ['content/books/golden-age-of-intelligence/chapter-08-ai-as-mirror.md',
    'content/books/golden-age-of-intelligence/chapter-08-ai-as-mirror.md', 'utf-8'],
  ['content/books/golden-age-of-intelligence/chapter-09-personal-center-of-excellence.md',
    'content/books/golden-age-of-intelligence/chapter-09-personal-center-of-excellence.md', 'utf-8'],
  ['content/books/golden-age-of-intelligence/chapter-10-creators-renaissance.md',
    'content/books/golden-age-of-intelligence/chapter-10-creators-renaissance.md', 'utf-8'],
  ['content/books/golden-age-of-intelligence/chapter-11-governance-of-the-self.md',
    'content/books/golden-age-of-intelligence/chapter-11-governance-of-the-self.md', 'utf-8'],
  ['content/books/golden-age-of-intelligence/chapter-12-transmission.md',
    'content/books/golden-age-of-intelligence/chapter-12-transmission.md', 'utf-8'],

  // registry update — marks chapters 6-12 published with epigraphs
  ['app/books/lib/books-registry.ts',
    'app/books/lib/books-registry.ts', 'utf-8'],

  // /bio nav addition
  ['components/NavigationMega.tsx',
    'components/NavigationMega.tsx', 'utf-8'],
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
console.log('   main HEAD =', mainCommitSha.slice(0, 8));

const mainCommit = gh('GET', `/repos/${REPO}/git/commits/${mainCommitSha}`);
const mainTreeSha = mainCommit.tree.sha;

console.log('\n2. Create blobs');
const blobs = [];
for (const [repoPath, localPath, enc] of FILES) {
  const content = readFileSync(resolve(REPO_ROOT, localPath));
  const blob = gh('POST', `/repos/${REPO}/git/blobs`,
    enc === 'base64'
      ? { content: content.toString('base64'), encoding: 'base64' }
      : { content: content.toString('utf-8'), encoding: 'utf-8' }
  );
  console.log(`   ✓ ${repoPath} (${(content.length / 1024).toFixed(0)}kb → ${blob.sha.slice(0, 8)})`);
  blobs.push({ path: repoPath, mode: '100644', type: 'blob', sha: blob.sha });
}

console.log('\n3. Create tree');
const newTree = gh('POST', `/repos/${REPO}/git/trees`, {
  base_tree: mainTreeSha,
  tree: blobs,
});
console.log('   new tree =', newTree.sha.slice(0, 8));

console.log('\n4. Create commit');
const commit = gh('POST', `/repos/${REPO}/git/commits`, {
  message: `feat(books): publish The Golden Age of Intelligence — Chapters 6–12 (book complete)

The flagship visionary manifesto is now complete. Twelve chapters,
~38,600 words, every chapter interweaving ancient wisdom (Stoic, Vedic,
Taoist, Sufi, Hassidic, Confucian), neuroscience (predictive processing,
hippocampal replay, mental rehearsal literature), and AI architecture
(mirror frame, agentic systems, personal CoE). Voice continuity locked
across all twelve chapters: poetic epigraphs, scene openers, sectioned
prose, footnotes, transmissive closes.

Chapter 6 — The Imagination Engine (Blake + Patanjali; 2,856 words).
  Imagination and perception share neural circuits. Mental rehearsal
  literature: Suinn, Driskell-Copper-Moran meta-analysis, Yue-Cole 35%-
  from-imagination strength gain. Generative AI as the first external
  instrument operating at the speed of inner imagination.

Chapter 7 — Memory, Sleep, and the Replay Brain (Heraclitus + Talmud;
  2,945 words). Wilson-McNaughton hippocampal replay. SWS/REM duality.
  Greek incubation, Aboriginal Tjukurrpa, Sufi dream practice, Tibetan
  dream yoga. Experience replay (Mnih 2015) as borrowed architecture.

Chapter 8 — AI as Mirror, Not Master (Heraclitus + Kotzker Rebbe;
  3,238 words). Refusal of replacement narrative. Model returns what
  you bring. Disciplines of the prompter as soul work. Agentic mirror
  scaling. Sufi/Zen mirror traditions.

Chapter 9 — The Personal Center of Excellence (Da Xue + Tabula
  Smaragdina; 3,823 words). Six-pillar enterprise CoE translated to
  one human life: Strategy / Governance / Talent / Technology / Data /
  Ethics. Quarterly Sunday-morning review. The defining narrative.

Chapter 10 — The Creator's Renaissance (Neruda + Rumi; 3,385 words).
  12,000 songs in three years. The atelier returns with cheaper
  apprentices. Taste, specificity, persistence, voice, curation as the
  newly scarce inputs. Music as the leading edge.

Chapter 11 — Governance of the Self (Bhagavad Gita + Pascal; 3,763
  words). Time / attention / energy / identity as four governed
  resources. Stoic interiority for the AI era. Voice contamination as
  the slow risk. Personal policies, refusal lists, fasting weeks.

Chapter 12 — Transmission (Rilke "Go to the limits of your longing"
  + Marcus Aurelius closing line; 3,422 words). Every Golden Age is a
  transmission event. Direct address to the reader. The benediction.
  Closes with Marcus Aurelius's final words.

Registry: chapters 6-12 marked published:true with epigraph metadata.
Nav: /bio added to NavigationMega top-level + Connect group.

Live URLs:
  /books/golden-age-of-intelligence  (hub now lists all 12 chapters)
  /books/golden-age-of-intelligence/chapter-06-the-imagination-engine
  /books/golden-age-of-intelligence/chapter-07-memory-sleep-replay
  /books/golden-age-of-intelligence/chapter-08-ai-as-mirror
  /books/golden-age-of-intelligence/chapter-09-personal-center-of-excellence
  /books/golden-age-of-intelligence/chapter-10-creators-renaissance
  /books/golden-age-of-intelligence/chapter-11-governance-of-the-self
  /books/golden-age-of-intelligence/chapter-12-transmission

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`,
  tree: newTree.sha,
  parents: [mainCommitSha],
});
console.log('   commit =', commit.sha.slice(0, 8));

console.log('\n5. Update main ref');
const updated = gh('PATCH', `/repos/${REPO}/git/refs/heads/main`, {
  sha: commit.sha,
  force: false,
});
console.log(`\n✅ main → ${updated.object.sha.slice(0, 8)}`);
console.log('Vercel will deploy. Check https://www.frankx.ai/books/golden-age-of-intelligence in 2-3 min.');
