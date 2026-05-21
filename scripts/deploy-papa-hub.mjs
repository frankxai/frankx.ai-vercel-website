#!/usr/bin/env node
/**
 * scripts/deploy-papa-hub.mjs
 *
 * Atomic deploy of the /papa/ hub from this dev repo to
 * frankxai/frankx.ai-vercel-website main via gh api Trees-API.
 *
 * Why Trees-API: disk is at 99% — cloning prod for sync is risky. Trees-API
 * lets us PUT one atomic commit to remote main without ever touching local
 * clone. Proven pattern from project_atlas_globe (PR #28, Apr 2026).
 *
 * Usage:  node scripts/deploy-papa-hub.mjs
 *
 * Files included:
 *   - app/papa/** (all .tsx)
 *   - components/papa/*.tsx
 *   - data/papa.ts
 *   - app/sitemap.ts (only the diff-relevant portions; we PUT the whole file)
 *   - public/images/papa/*.spec.md (so Frank can run nb-generate.mjs in prod
 *     dir later if he wants)
 *
 * Files NOT included (deliberate, to avoid polluting prod):
 *   - .frankx/family/* (private dev-only)
 *   - lib/family-tree-data.ts (changes for /papa/ are backwards-compatible —
 *     prod keeps its existing version; dev edits are non-blocking)
 *   - docs/superpowers/specs/* (private)
 *   - .claude/skills/* (private)
 */

import { readFileSync, readdirSync, statSync, writeFileSync, unlinkSync, mkdtempSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, relative } from 'node:path';
import { tmpdir } from 'node:os';

const TMP = mkdtempSync(join(tmpdir(), 'papa-deploy-'));

const REPO = 'frankxai/frankx.ai-vercel-website';
const BRANCH = 'main';
const ROOT = process.cwd();
const COMMIT_MESSAGE = `feat(papa): /papa/ hub — ein Sohn-Archiv für Witali Riemer (1969-2018)

A son's archive for Witali Riemer, born 8 Sept 1969 in Pavlovka Kazakhstan,
died 9 July 2018 in Seesen Germany. Wolgadeutsche heritage. The hub honors
the man as fact (public-indexed) and translates his inheritance into a draft
manifesto for those who never had a father's voice (noindex until family
witness clears).

URL architecture:
- /papa/                         (DE primary, public-indexed)
- /papa/leben/                   (his life, public-indexed)
- /papa/erbe/                    (manifesto + 10 principles + 6 stages +
                                  discipline + backbone + responsibility +
                                  work/money/dignity + for-the-fatherless +
                                  inheritance chain — single anchor-nav page,
                                  noindex draft)
- /papa/erinnerungen/            (family archive, noindex)
- /papa/mitmachen/               (share a memory, noindex)
- /papa/en/                      (English entry, public)
- /papa/en/life/                 (English mirror of /leben, public)
- /papa/en/inheritance/          (English mirror of /erbe, noindex draft)
- /papa/ru/                      (Russian heritage acknowledgment, public)

Spec: docs/superpowers/specs/2026-05-05-papa-hub-design.md (kept private)
Pressure-tested via Starlight Board with verdict REVISE → applied.

Built overnight by Claude Opus 4.7 (1M ctx) per Frank's autonomy grant.
Family witness gate must clear before draft sections lift to indexed.
`;

// ---- helpers --------------------------------------------------------------

let _tmpCounter = 0;
function gh(args, body) {
  // maxBuffer: 64MB — image blobs base64 to ~4× their size; the 2.9MB hero
  // exceeds Node's default 1MB execSync buffer otherwise.
  const opts = {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'inherit'],
    maxBuffer: 64 * 1024 * 1024,
  };
  let cmd;
  let bodyFile;
  if (body) {
    // Write body to a temp file and pass --input <file>. Direct stdin via `-`
    // breaks gh CLI / GitHub for bodies >1-2MB (they reject with an HTML
    // "invalid request" page).
    bodyFile = join(TMP, `body-${++_tmpCounter}.json`);
    writeFileSync(bodyFile, JSON.stringify(body));
    // Replace the trailing `-` arg with the file path.
    const replaced = args.slice();
    const dashIdx = replaced.lastIndexOf('-');
    if (dashIdx >= 0) replaced[dashIdx] = bodyFile;
    else replaced.push('--input', bodyFile);
    cmd = ['gh', 'api', ...replaced];
  } else {
    cmd = ['gh', 'api', ...args];
  }
  try {
    return execSync(cmd.map((a) => (a.includes(' ') ? `"${a}"` : a)).join(' '), opts);
  } finally {
    if (bodyFile) {
      try { unlinkSync(bodyFile); } catch {}
    }
  }
}

function ghJSON(args, body) {
  return JSON.parse(gh(args, body));
}

function walkFiles(dir, base = dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...walkFiles(full, base));
    } else if (st.isFile()) {
      out.push(relative(ROOT, full).replace(/\\/g, '/'));
    }
  }
  return out;
}

// ---- collect files to deploy ---------------------------------------------

const files = [
  ...walkFiles(join(ROOT, 'app', 'papa')),
  ...walkFiles(join(ROOT, 'components', 'papa')),
  'data/papa.ts',
  'app/sitemap.ts',
  ...walkFiles(join(ROOT, 'public', 'images', 'papa')),
];

console.log(`[papa-deploy] Files to ship: ${files.length}`);
for (const f of files) console.log(`  - ${f}`);

// ---- 1. get current main HEAD ---------------------------------------------

console.log('[papa-deploy] Fetching current main HEAD…');
const ref = ghJSON([`repos/${REPO}/git/ref/heads/${BRANCH}`]);
const parentSha = ref.object.sha;
console.log(`[papa-deploy] Current main HEAD: ${parentSha}`);

const parentCommit = ghJSON([`repos/${REPO}/git/commits/${parentSha}`]);
const baseTree = parentCommit.tree.sha;
console.log(`[papa-deploy] Base tree: ${baseTree}`);

// ---- 2. create blobs for each file ---------------------------------------

console.log('[papa-deploy] Creating blobs…');
const blobs = [];
for (const path of files) {
  const content = readFileSync(join(ROOT, path));
  const isText =
    /\.(tsx?|jsx?|md|mdx|json|ya?ml|css|html?|svg|txt)$/i.test(path);
  const body = isText
    ? { content: content.toString('utf8'), encoding: 'utf-8' }
    : { content: content.toString('base64'), encoding: 'base64' };
  const blob = ghJSON(
    [`-X`, `POST`, `repos/${REPO}/git/blobs`, `--input`, `-`],
    body
  );
  blobs.push({ path, sha: blob.sha, mode: '100644', type: 'blob' });
  process.stdout.write('.');
}
console.log(`\n[papa-deploy] ${blobs.length} blobs created.`);

// ---- 3. create new tree on top of base -----------------------------------

console.log('[papa-deploy] Creating tree…');
const newTree = ghJSON(
  [`-X`, `POST`, `repos/${REPO}/git/trees`, `--input`, `-`],
  { base_tree: baseTree, tree: blobs }
);
console.log(`[papa-deploy] New tree: ${newTree.sha}`);

// ---- 4. create commit pointing to new tree -------------------------------

console.log('[papa-deploy] Creating commit…');
const newCommit = ghJSON(
  [`-X`, `POST`, `repos/${REPO}/git/commits`, `--input`, `-`],
  {
    message: COMMIT_MESSAGE,
    tree: newTree.sha,
    parents: [parentSha],
  }
);
console.log(`[papa-deploy] New commit: ${newCommit.sha}`);

// ---- 5. update main ref --------------------------------------------------

console.log('[papa-deploy] Updating main ref…');
const updated = ghJSON(
  [`-X`, `PATCH`, `repos/${REPO}/git/refs/heads/${BRANCH}`, `--input`, `-`],
  { sha: newCommit.sha, force: false }
);
console.log(`[papa-deploy] Main now at: ${updated.object.sha}`);

console.log('\n[papa-deploy] ✓ Deployed.');
console.log(`[papa-deploy] Verify on Vercel build: https://vercel.com/starlight-intelligence/frankx-ai-vercel-website`);
console.log(`[papa-deploy] Live URL once built: https://frankx.ai/papa/`);
