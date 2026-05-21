#!/usr/bin/env node
/**
 * scripts/visuals/ship-flagship-via-gh-api.mjs
 *
 * Server-side cherry-pick of the flagship blog into frankx.ai-vercel-website main
 * via the GitHub Git Data API. Built because the local main checkout is blocked
 * on Windows by a tracked file with colons in its path
 * (`public/reading/C:/Users/Frank/.claude/...`).
 *
 * What it does (10 API calls, atomic commit at the end):
 *   1. GET main HEAD ref → mainSha
 *   2. GET main commit → baseTreeSha
 *   3. GET main's lib/research/domains.ts → decode + surgical insert of 5 new domains
 *   4. POST git/blobs × 4 (mdx, jpg, svg, modified domains.ts)
 *   5. POST git/trees with base_tree=baseTreeSha + 4 entries → newTreeSha
 *   6. POST git/commits parents=[mainSha] tree=newTreeSha → newCommitSha
 *   7. POST git/refs heads/ship/no-bad-parts-flagship-2026-05-04 → branch
 *   8. POST pulls base=main head=ship/... → PR
 *
 * Then either Frank merges via gh pr merge --squash, or this script does it
 * with the --auto-merge flag.
 *
 * Usage:
 *   node scripts/visuals/ship-flagship-via-gh-api.mjs            # dry-run, prints plan
 *   node scripts/visuals/ship-flagship-via-gh-api.mjs --execute  # actually runs
 *   node scripts/visuals/ship-flagship-via-gh-api.mjs --execute --auto-merge   # also merge
 */

import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const REPO = 'frankxai/frankx.ai-vercel-website';
const BRANCH = 'ship/no-bad-parts-flagship-2026-05-04';
const COMMIT_MSG = `feat(research): ship "No Bad Parts: Sovereign AI" flagship + 5 research domains

Cheapest-experiment path from the Architecture of Intelligence buildout —
ships only the flagship blog with the minimum dependencies it needs to render
without broken links. Holds the rest of the spine (series page, 8 other blogs,
3 guides) for 48-72h to learn from real audience signal before committing.

Files:
  - content/blog/no-bad-parts-sovereign-ai.mdx (~2000 words, featured)
  - lib/research/domains.ts (+5 domains: self-led-ai-architecture,
    internal-family-systems, predictive-mind, meaning-os, embodied-cognition)
  - public/images/blog/no-bad-parts-sovereign-ai-hero.jpg (NB Pro hero,
    optimized 2.4MB → 90KB via sharp)
  - public/images/diagrams/self-led-agent-family.svg (hand-authored,
    embedded in flagship body)

Source: ChatGPT intake 2026-05-03 (.intake/processed/...)
Plan: docs/superpowers/specs/2026-05-03-research-hub-buildout.md
Board review: 2026-05-04 — REVISE → cheapest-experiment ship

Built via gh API (server-side cherry-pick) because local main checkout blocked
on Windows by tracked files with colons in their paths.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`;

const PR_TITLE = 'ship: "No Bad Parts: Sovereign AI" flagship + 5 research domains';
const PR_BODY = `## Summary

Cheapest-experiment cherry-pick of the flagship blog from the Architecture of Intelligence research buildout (intake 2026-05-03). Ships **only the flagship + minimum dependencies** to validate audience signal before committing the full spine.

## What ships

- \`content/blog/no-bad-parts-sovereign-ai.mdx\` — ~2000-word flagship essay (\`featured: true\`)
- \`lib/research/domains.ts\` — surgical insert of 5 new domains (\`self-led-ai-architecture\`, \`internal-family-systems\`, \`predictive-mind\`, \`meaning-os\`, \`embodied-cognition\`); preserves all existing entries
- \`public/images/blog/no-bad-parts-sovereign-ai-hero.jpg\` — NB Pro hero, optimized 2.4MB → 90KB via sharp
- \`public/images/diagrams/self-led-agent-family.svg\` — hand-authored SVG diagram embedded in flagship body

## What deliberately does NOT ship

Held for 48-72h after this lands to read audience signal before committing:

- Series landing page (\`/research/series/architecture-of-intelligence\`)
- 8 other blog posts (companion + adjacent + debugging + productized + meaning OS + embodied creator + memory as exile + agent family)
- 3 guides
- Library OS book entry (Schwartz, *No Bad Parts*)
- 2 cross-link edits into existing high-traffic posts
- Social launch pack
- Other 12 hero images + 3 SVG diagrams

## Why server-side via gh API

The local \`main\` checkout is blocked on Windows by tracked files with colons in their paths (\`public/reading/C:/Users/Frank/.claude/...\`). Pre-existing \`main\` repo damage, not from this branch. Server-side cherry-pick via the GitHub Git Data API sidesteps the checkout issue cleanly.

## Test plan

- [ ] After merge, verify \`https://frankx.ai/blog/no-bad-parts-sovereign-ai\` renders with hero + embedded SVG
- [ ] Verify \`https://frankx.ai/research/self-led-ai-architecture\` (and 4 sibling domains) render via the existing TechArticle template
- [ ] Verify the flagship's internal links (3 \`/research/...\` links + adjacent posts) all resolve
- [ ] Verify hero image OG-meta picks up correctly when shared

🤖 Generated with [Claude Code](https://claude.com/claude-code)
`;

const NEW_DOMAINS_FILE = 'C:/Users/frank/AppData/Local/Temp/new-5-domains.txt';
const FILES_TO_SHIP = [
  { localPath: 'content/blog/no-bad-parts-sovereign-ai.mdx', remotePath: 'content/blog/no-bad-parts-sovereign-ai.mdx', binary: false },
  { localPath: 'public/images/blog/no-bad-parts-sovereign-ai-hero.jpg', remotePath: 'public/images/blog/no-bad-parts-sovereign-ai-hero.jpg', binary: true },
  { localPath: 'public/images/diagrams/self-led-agent-family.svg', remotePath: 'public/images/diagrams/self-led-agent-family.svg', binary: false },
  // domains.ts handled separately because it needs surgical insert into main's version
];

const dryRun = !process.argv.includes('--execute');
const autoMerge = process.argv.includes('--auto-merge');

function gh(method, path, body) {
  const args = ['gh', 'api', '-X', method, path];
  if (body !== undefined) {
    args.push('--input', '-');
  }
  const cmd = args.join(' ');
  const result = execSync(cmd, {
    input: body !== undefined ? JSON.stringify(body) : undefined,
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
  });
  try { return JSON.parse(result); }
  catch (e) {
    console.error('Non-JSON gh response:', result.slice(0, 500));
    throw e;
  }
}

async function main() {
  console.log(`\n=== Ship flagship via gh API ===`);
  console.log(`Repo:   ${REPO}`);
  console.log(`Branch: ${BRANCH}`);
  console.log(`Mode:   ${dryRun ? 'DRY RUN (use --execute to commit)' : 'EXECUTE'}`);
  console.log(`Files:  ${FILES_TO_SHIP.length + 1} total (3 verbatim + 1 surgical insert)`);

  // Verify all local files exist
  for (const f of FILES_TO_SHIP) {
    try { readFileSync(f.localPath); }
    catch { throw new Error(`local file missing: ${f.localPath}`); }
  }
  const newDomainsBlock = readFileSync(NEW_DOMAINS_FILE, 'utf8').replace(/\r?\n/g, '\n');
  console.log(`new-domains block: ${newDomainsBlock.length} bytes\n`);

  if (dryRun) {
    console.log('Plan (would execute on --execute):');
    console.log('  1. GET main HEAD ref → mainSha');
    console.log('  2. GET main commit → baseTreeSha');
    console.log('  3. GET main\'s lib/research/domains.ts');
    console.log('  4. Surgical insert 5 new domains');
    console.log('  5. POST git/blobs × 4');
    console.log('  6. POST git/trees with 4 entries');
    console.log('  7. POST git/commits parents=[mainSha]');
    console.log('  8. POST git/refs (create branch)');
    console.log('  9. POST pulls (open PR)');
    if (autoMerge) console.log(' 10. PATCH pulls/{n}/merge (auto-merge)');
    console.log('\nRe-run with --execute to ship.');
    return;
  }

  // ─── 1. Get main HEAD ──────────────────────────────────────────────
  console.log('[1/9] GET main HEAD');
  const mainRef = gh('GET', `/repos/${REPO}/git/refs/heads/main`);
  const mainSha = mainRef.object.sha;
  console.log(`     mainSha = ${mainSha}`);

  // ─── 2. Get base tree ──────────────────────────────────────────────
  console.log('[2/9] GET main commit → baseTreeSha');
  const mainCommit = gh('GET', `/repos/${REPO}/git/commits/${mainSha}`);
  const baseTreeSha = mainCommit.tree.sha;
  console.log(`     baseTreeSha = ${baseTreeSha}`);

  // ─── 3. Get main's domains.ts ──────────────────────────────────────
  console.log('[3/9] GET main\'s lib/research/domains.ts');
  const domainsBlob = gh('GET', `/repos/${REPO}/contents/lib/research/domains.ts?ref=main`);
  const mainDomains = Buffer.from(domainsBlob.content, 'base64').toString('utf8');
  console.log(`     mainDomains = ${mainDomains.length} bytes`);

  // ─── 4. Surgical insert ────────────────────────────────────────────
  console.log('[4/9] Surgical insert of 5 new domains');
  // Anchor: the closing pattern before `// Helper functions`
  // Try CRLF first (typical Windows-checked-in), then LF
  const lineEnding = mainDomains.includes('\r\n') ? '\r\n' : '\n';
  const newDomainsAdjusted = newDomainsBlock.replace(/\n/g, lineEnding);

  // Find the "]\n\n// Helper functions" pattern (with the right line ending)
  const anchor = `]${lineEnding}${lineEnding}// Helper functions`;
  const occurrences = mainDomains.split(anchor).length - 1;
  if (occurrences !== 1) {
    throw new Error(`anchor not unique in main's domains.ts: ${occurrences} occurrences (expected 1)`);
  }
  // Find the closing `},` of the LAST entry before `]` so we can insert AFTER it
  const closingIndex = mainDomains.indexOf(anchor);
  const beforeAnchor = mainDomains.slice(0, closingIndex);
  // Insert before the `]` — keep the `},` of the last existing domain, then add a comma context already present
  // The insertion is: replace `]\n\n// Helper` with `<newDomains>]\n\n// Helper`
  const updatedDomains = mainDomains.replace(anchor, newDomainsAdjusted + anchor);
  console.log(`     mainDomains: ${mainDomains.length} → ${updatedDomains.length} bytes (+${updatedDomains.length - mainDomains.length})`);
  console.log(`     line ending: ${lineEnding === '\r\n' ? 'CRLF' : 'LF'}`);

  // ─── 5. Create blobs ───────────────────────────────────────────────
  console.log('[5/9] POST git/blobs × 4');
  const blobs = [];
  for (const f of FILES_TO_SHIP) {
    const buf = readFileSync(f.localPath);
    const content = buf.toString('base64');
    const encoding = 'base64';
    const blob = gh('POST', `/repos/${REPO}/git/blobs`, { content, encoding });
    blobs.push({ remotePath: f.remotePath, sha: blob.sha });
    console.log(`     ${f.remotePath} → ${blob.sha} (${buf.length} bytes)`);
  }
  // The modified domains.ts blob
  const domainsBlobNew = gh('POST', `/repos/${REPO}/git/blobs`, {
    content: Buffer.from(updatedDomains, 'utf8').toString('base64'),
    encoding: 'base64',
  });
  blobs.push({ remotePath: 'lib/research/domains.ts', sha: domainsBlobNew.sha });
  console.log(`     lib/research/domains.ts → ${domainsBlobNew.sha} (${updatedDomains.length} bytes)`);

  // ─── 6. Create tree ────────────────────────────────────────────────
  console.log('[6/9] POST git/trees');
  const tree = gh('POST', `/repos/${REPO}/git/trees`, {
    base_tree: baseTreeSha,
    tree: blobs.map((b) => ({
      path: b.remotePath,
      mode: '100644',
      type: 'blob',
      sha: b.sha,
    })),
  });
  console.log(`     newTreeSha = ${tree.sha}`);

  // ─── 7. Create commit ──────────────────────────────────────────────
  console.log('[7/9] POST git/commits');
  const newCommit = gh('POST', `/repos/${REPO}/git/commits`, {
    message: COMMIT_MSG,
    tree: tree.sha,
    parents: [mainSha],
  });
  console.log(`     newCommitSha = ${newCommit.sha}`);

  // ─── 8. Create branch ──────────────────────────────────────────────
  console.log(`[8/9] POST git/refs (create branch ${BRANCH})`);
  try {
    gh('POST', `/repos/${REPO}/git/refs`, {
      ref: `refs/heads/${BRANCH}`,
      sha: newCommit.sha,
    });
    console.log(`     branch created`);
  } catch (e) {
    // Maybe already exists from a prior run; try to update
    console.log(`     branch may already exist, trying update...`);
    gh('PATCH', `/repos/${REPO}/git/refs/heads/${BRANCH}`, {
      sha: newCommit.sha,
      force: true,
    });
    console.log(`     branch updated`);
  }

  // ─── 9. Open PR ────────────────────────────────────────────────────
  console.log('[9/9] POST pulls');
  let pr;
  try {
    pr = gh('POST', `/repos/${REPO}/pulls`, {
      title: PR_TITLE,
      head: BRANCH,
      base: 'main',
      body: PR_BODY,
    });
    console.log(`     PR #${pr.number}: ${pr.html_url}`);
  } catch (e) {
    console.log(`     PR may already exist for this branch. Checking...`);
    const list = gh('GET', `/repos/${REPO}/pulls?head=frankxai:${BRANCH}&state=open`);
    if (list.length > 0) {
      pr = list[0];
      console.log(`     existing PR #${pr.number}: ${pr.html_url}`);
    } else {
      throw e;
    }
  }

  console.log(`\n✓ Done. PR: ${pr.html_url}`);

  // ─── Optional: auto-merge ──────────────────────────────────────────
  if (autoMerge) {
    console.log('\n[+] Attempting merge (--auto-merge)');
    try {
      const merge = gh('PUT', `/repos/${REPO}/pulls/${pr.number}/merge`, {
        merge_method: 'squash',
        commit_title: PR_TITLE,
      });
      console.log(`     merged: ${merge.sha}`);
      console.log(`     Vercel will deploy from main shortly.`);
    } catch (e) {
      console.log(`     merge failed (likely needs review): ${e.message}`);
    }
  }
}

main().catch((e) => { console.error('\nFAIL:', e.message); process.exit(1); });
