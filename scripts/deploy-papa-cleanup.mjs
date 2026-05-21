#!/usr/bin/env node
/**
 * scripts/deploy-papa-cleanup.mjs
 *
 * One-shot cleanup deploy for /papa/ — removes /papa/erbe/, /papa/en/inheritance/,
 * /papa/ru/, and the 3 visuals tied only to those pages. Pushes the slimmed
 * homepages, footer, sitemap, schema, and data file in one atomic commit on
 * frankxai/frankx.ai-vercel-website main.
 *
 * Trees-API pattern with `sha: null` to delete files within the same atomic
 * commit. Builds on deploy-papa-hub.mjs but adds an explicit deletes list.
 */

import { readFileSync, readdirSync, statSync, writeFileSync, unlinkSync, mkdtempSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, relative } from 'node:path';
import { tmpdir } from 'node:os';

const REPO = 'frankxai/frankx.ai-vercel-website';
const BRANCH = 'main';
const ROOT = process.cwd();
const TMP = mkdtempSync(join(tmpdir(), 'papa-cleanup-'));

const COMMIT_MESSAGE = `chore(papa): cut /erbe/, /en/inheritance/, /ru/ — keep the man, drop the manifesto

The /papa/erbe/ universal manifesto (10 principles, 6 stages, discipline codes,
backbone, responsibility, work/money/dignity, for-the-fatherless, inheritance
chain) was drafted from a midnight brief, not from family stories. The
Starlight Board flagged this exact failure mode 2026-05-05. Cleaner to delete
now and re-add later when family contributes real material than to keep a
noindex draft requiring maintenance.

The /papa/ru/ Russian heritage page was performative — the Wolgadeutsche /
Pavlovka roots already live in /papa/leben/ and /papa/en/life/ where they
belong. A standalone Russian page only makes sense when there's a Russian-
speaking audience asking for it.

Removed:
- app/papa/erbe/page.tsx
- app/papa/en/inheritance/page.tsx
- app/papa/ru/page.tsx
- public/images/papa/papa-six-stages.{jpg,spec.md}
- public/images/papa/papa-ten-standards.{jpg,spec.md}
- public/images/papa/papa-inheritance-chain.{jpg,spec.md}

Updated:
- /papa/ homepage: 3 nav cards (was 4), no "Das Erbe" tile
- /papa/en/ homepage: 2 nav cards (was 3), no "Inheritance" tile
- /papa/leben/ + /papa/en/life/ closing CTAs repointed to /erinnerungen/
- components/papa/PapaShell.tsx: language switcher + footer DE+EN only (no RU)
- components/papa/SchemaScripts.tsx: BookScaffoldJsonLd removed (unused)
- data/papa.ts: slimmed to just the witali biographical record
- app/sitemap.ts: /papa/ru entry removed

Final hub: 6 pages — /papa/, /papa/leben/, /papa/erinnerungen/, /papa/mitmachen/,
/papa/en/, /papa/en/life/. The man, his life, doors for family to contribute.
Two visuals: hero birch + Pavlovka→Seesen migration map.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
`;

// Files to upload (modified or unchanged but included for completeness)
const UPLOAD_PATHS = [
  ...walkFiles(join(ROOT, 'app', 'papa')),
  ...walkFiles(join(ROOT, 'components', 'papa')),
  'data/papa.ts',
  'app/sitemap.ts',
  ...walkFiles(join(ROOT, 'public', 'images', 'papa')),
];

// Files to delete (paths relative to repo root, forward-slash)
const DELETE_PATHS = [
  'app/papa/erbe/page.tsx',
  'app/papa/en/inheritance/page.tsx',
  'app/papa/ru/page.tsx',
  'public/images/papa/papa-six-stages.jpg',
  'public/images/papa/papa-ten-standards.jpg',
  'public/images/papa/papa-inheritance-chain.jpg',
  'public/images/papa/papa-six-stages.spec.md',
  'public/images/papa/papa-ten-standards.spec.md',
  'public/images/papa/papa-inheritance-chain.spec.md',
];

function walkFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walkFiles(full));
    else if (st.isFile()) out.push(relative(ROOT, full).replace(/\\/g, '/'));
  }
  return out;
}

let _tmpCounter = 0;
function sleepSync(ms) {
  // Tiny synchronous sleep — yes, blocking, but acceptable in a one-shot script.
  const end = Date.now() + ms;
  while (Date.now() < end) {}
}
function gh(args, body, { retries = 5 } = {}) {
  const opts = {
    encoding: 'utf8',
    // pipe stderr so retry logic can see error messages (was 'inherit')
    stdio: ['pipe', 'pipe', 'pipe'],
    maxBuffer: 64 * 1024 * 1024,
  };
  let cmd, bodyFile;
  if (body) {
    bodyFile = join(TMP, `body-${++_tmpCounter}.json`);
    writeFileSync(bodyFile, JSON.stringify(body));
    const replaced = args.slice();
    const dashIdx = replaced.lastIndexOf('-');
    if (dashIdx >= 0) replaced[dashIdx] = bodyFile;
    else replaced.push('--input', bodyFile);
    cmd = ['gh', 'api', ...replaced];
  } else {
    cmd = ['gh', 'api', ...args];
  }
  const cmdStr = cmd.map((a) => (a.includes(' ') ? `"${a}"` : a)).join(' ');
  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return execSync(cmdStr, opts);
    } catch (e) {
      lastErr = e;
      const msg = (e.stdout || '').toString() + (e.stderr || '').toString();
      const isRetryable = /HTTP (401|403|429|5\d\d)|Bad credentials|rate limit|terminated|fetch failed|unexpected EOF|EOF|ECONNRESET|ETIMEDOUT|ENOTFOUND|socket hang up|TLS handshake|tls: |connection (reset|refused|timed out)|Client.Timeout/i.test(msg);
      if (!isRetryable || attempt === retries) break;
      const delay = 2000 * attempt; // 2s, 4s, 6s, 8s, 10s
      process.stderr.write(`\n  ! retry ${attempt}/${retries - 1} after ${delay}ms (${msg.slice(0, 80).replace(/\n/g, ' ')})\n  `);
      sleepSync(delay);
    }
  }
  if (bodyFile) try { unlinkSync(bodyFile); } catch {}
  throw lastErr;
}
function ghJSON(args, body) { return JSON.parse(gh(args, body)); }

console.log(`[papa-cleanup] Files to upload: ${UPLOAD_PATHS.length}`);
console.log(`[papa-cleanup] Files to delete: ${DELETE_PATHS.length}`);

console.log('[papa-cleanup] Fetching current main HEAD…');
const ref = ghJSON([`repos/${REPO}/git/ref/heads/${BRANCH}`]);
const parentSha = ref.object.sha;
const parentCommit = ghJSON([`repos/${REPO}/git/commits/${parentSha}`]);
const baseTree = parentCommit.tree.sha;
console.log(`[papa-cleanup] Base: ${parentSha} / tree ${baseTree}`);

console.log('[papa-cleanup] Creating blobs…');
const treeEntries = [];
for (const path of UPLOAD_PATHS) {
  const content = readFileSync(join(ROOT, path));
  const isText = /\.(tsx?|jsx?|md|mdx|json|ya?ml|css|html?|svg|txt)$/i.test(path);
  const body = isText
    ? { content: content.toString('utf8'), encoding: 'utf-8' }
    : { content: content.toString('base64'), encoding: 'base64' };
  const blob = ghJSON([`-X`, `POST`, `repos/${REPO}/git/blobs`, `--input`, `-`], body);
  treeEntries.push({ path, sha: blob.sha, mode: '100644', type: 'blob' });
  process.stdout.write('.');
  sleepSync(400); // be kind to the rate limiter / unstable network
}
console.log(`\n[papa-cleanup] ${treeEntries.length} blobs created.`);

// Add delete entries — sha: null tells GitHub to remove the file
for (const path of DELETE_PATHS) {
  treeEntries.push({ path, sha: null, mode: '100644', type: 'blob' });
}
console.log(`[papa-cleanup] +${DELETE_PATHS.length} delete entries (sha: null).`);

console.log('[papa-cleanup] Creating tree…');
const newTree = ghJSON(
  [`-X`, `POST`, `repos/${REPO}/git/trees`, `--input`, `-`],
  { base_tree: baseTree, tree: treeEntries }
);
console.log(`[papa-cleanup] New tree: ${newTree.sha}`);

console.log('[papa-cleanup] Creating commit…');
const newCommit = ghJSON(
  [`-X`, `POST`, `repos/${REPO}/git/commits`, `--input`, `-`],
  { message: COMMIT_MESSAGE, tree: newTree.sha, parents: [parentSha] }
);
console.log(`[papa-cleanup] New commit: ${newCommit.sha}`);

console.log('[papa-cleanup] Updating main ref…');
const updated = ghJSON(
  [`-X`, `PATCH`, `repos/${REPO}/git/refs/heads/${BRANCH}`, `--input`, `-`],
  { sha: newCommit.sha, force: false }
);
console.log(`[papa-cleanup] Main now at: ${updated.object.sha}`);
console.log(`\n[papa-cleanup] ✓ Cleanup deployed.`);
