#!/usr/bin/env node
/**
 * scripts/visuals/ship-via-gh-api.mjs
 *
 * Generalized server-side cherry-pick to frankx.ai-vercel-website main via the
 * GitHub Git Data API. Generalizes the pattern from ship-flagship-via-gh-api.mjs
 * so we don't have to write a new script per ship.
 *
 * Reads a manifest JSON describing files to ship, opens a PR, optionally
 * auto-merges. Built because the local main checkout is blocked on Windows
 * by tracked files with colons in their paths
 * (`public/reading/C:/Users/Frank/.claude/...`).
 *
 * Manifest schema (manifest.json):
 *   {
 *     "branch": "fix/sitemap-and-og-2026-05-04",
 *     "title": "fix(seo): sitemap completeness + OG image fallback",
 *     "body": "## Summary\n...markdown...",
 *     "commitMsg": "fix(seo): sitemap completeness + OG image fallback\n\n...full message...",
 *     "files": [
 *       { "remote": "app/sitemap.ts", "local": "C:/abs/path/to/file.ts", "binary": false },
 *       { "remote": "public/og/foo.jpg", "local": "...", "binary": true },
 *       { "remote": "lib/research/domains.ts", "local": null, "patch": "PATCH_FILE_REL_PATH" }
 *     ],
 *     "autoMerge": true
 *   }
 *
 * The "patch" form is for surgical insert into a file that exists on main —
 * the patch file should be a JSON object: { anchor: "literal string in main",
 * insertion: "string to insert before the anchor", encoding: "utf8" }
 *
 * Usage:
 *   node scripts/visuals/ship-via-gh-api.mjs <manifest.json>             # dry-run
 *   node scripts/visuals/ship-via-gh-api.mjs <manifest.json> --execute   # actually ship
 *   node scripts/visuals/ship-via-gh-api.mjs <manifest.json> --execute --auto-merge
 */

import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const REPO = 'frankxai/frankx.ai-vercel-website';

const manifestArg = process.argv[2];
if (!manifestArg || manifestArg.startsWith('--')) {
  console.error('Usage: node ship-via-gh-api.mjs <manifest.json> [--execute] [--auto-merge]');
  process.exit(1);
}
const dryRun = !process.argv.includes('--execute');
const autoMerge = process.argv.includes('--auto-merge');

const manifest = JSON.parse(readFileSync(manifestArg, 'utf8'));
const { branch: BRANCH, title: PR_TITLE, body: PR_BODY, commitMsg: COMMIT_MSG, files: FILES } = manifest;

if (!BRANCH || !PR_TITLE || !COMMIT_MSG || !Array.isArray(FILES) || FILES.length === 0) {
  console.error('manifest must include: branch, title, commitMsg, files[]');
  process.exit(1);
}

function gh(method, path, body) {
  const args = ['gh', 'api', '-X', method, path];
  if (body !== undefined) args.push('--input', '-');
  const cmd = args.join(' ');
  const result = execSync(cmd, {
    input: body !== undefined ? JSON.stringify(body) : undefined,
    encoding: 'utf8',
    maxBuffer: 100 * 1024 * 1024,
  });
  try { return JSON.parse(result); }
  catch (e) {
    console.error('Non-JSON gh response:', result.slice(0, 500));
    throw e;
  }
}

async function main() {
  console.log(`\n=== Ship via gh API ===`);
  console.log(`Repo:   ${REPO}`);
  console.log(`Branch: ${BRANCH}`);
  console.log(`Mode:   ${dryRun ? 'DRY RUN (use --execute to ship)' : 'EXECUTE'}`);
  console.log(`Files:  ${FILES.length}`);
  for (const f of FILES) {
    if (f.local) console.log(`  + ${f.remote} ← ${f.local} ${f.binary ? '(binary)' : ''}`);
    else if (f.patch) console.log(`  ~ ${f.remote} (surgical patch from ${f.patch})`);
  }

  // Verify all local files exist + load patch specs
  const patchSpecs = {};
  for (const f of FILES) {
    if (f.local) {
      try { readFileSync(f.local); }
      catch { throw new Error(`local file missing: ${f.local}`); }
    }
    if (f.patch) {
      patchSpecs[f.remote] = JSON.parse(readFileSync(f.patch, 'utf8'));
    }
  }

  if (dryRun) {
    console.log('\nPlan (would execute on --execute):');
    console.log('  1. GET main HEAD ref → mainSha');
    console.log('  2. GET main commit → baseTreeSha');
    console.log(`  3. GET main's content for ${Object.keys(patchSpecs).length} patch file(s)`);
    console.log('  4. Build new content (verbatim + surgical inserts)');
    console.log(`  5. POST git/blobs × ${FILES.length}`);
    console.log(`  6. POST git/trees with ${FILES.length} entries`);
    console.log('  7. POST git/commits parents=[mainSha]');
    console.log(`  8. POST git/refs (create branch ${BRANCH})`);
    console.log('  9. POST pulls (open PR)');
    if (autoMerge) console.log(' 10. PUT pulls/{n}/merge (squash)');
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

  // ─── 3. Build content for each file ────────────────────────────────
  console.log(`[3/9] Build content for ${FILES.length} file(s)`);
  const blobs = [];
  for (const f of FILES) {
    let content, encoding;
    if (f.local) {
      const buf = readFileSync(f.local);
      if (f.binary) {
        content = buf.toString('base64');
        encoding = 'base64';
      } else {
        content = buf.toString('utf8');
        encoding = 'utf-8';
      }
    } else if (f.patch) {
      const spec = patchSpecs[f.remote];
      const remoteFile = gh('GET', `/repos/${REPO}/contents/${f.remote}?ref=main`);
      const original = Buffer.from(remoteFile.content, 'base64').toString('utf8');
      const occurrences = original.split(spec.anchor).length - 1;
      if (occurrences !== 1) {
        throw new Error(`patch anchor not unique in ${f.remote}: ${occurrences} occurrences (expected 1)`);
      }
      // Detect line ending and adjust insertion
      const lineEnding = original.includes('\r\n') ? '\r\n' : '\n';
      const insertion = spec.insertion.replace(/\r?\n/g, lineEnding);
      const updated = original.replace(spec.anchor, insertion + spec.anchor);
      content = updated;
      encoding = 'utf-8';
      console.log(`     ${f.remote}: ${original.length} → ${updated.length} bytes (${lineEnding === '\r\n' ? 'CRLF' : 'LF'})`);
    } else {
      throw new Error(`file ${f.remote} has neither local nor patch`);
    }
    blobs.push({ remote: f.remote, content, encoding, isBinary: !!f.binary });
  }

  // ─── 4. POST blobs ─────────────────────────────────────────────────
  console.log(`[4/9] POST git/blobs × ${blobs.length}`);
  const blobShas = [];
  for (const b of blobs) {
    // gh api requires base64 for binary, but utf-8 strings can also be sent base64
    const encoding = b.isBinary ? 'base64' : 'utf-8';
    const content = b.isBinary ? b.content : b.content;
    const blob = gh('POST', `/repos/${REPO}/git/blobs`, { content, encoding });
    blobShas.push({ remote: b.remote, sha: blob.sha });
    console.log(`     ${b.remote} → ${blob.sha}`);
  }

  // ─── 5. POST tree ──────────────────────────────────────────────────
  console.log('[5/9] POST git/trees');
  const tree = gh('POST', `/repos/${REPO}/git/trees`, {
    base_tree: baseTreeSha,
    tree: blobShas.map((b) => ({
      path: b.remote,
      mode: '100644',
      type: 'blob',
      sha: b.sha,
    })),
  });
  console.log(`     newTreeSha = ${tree.sha}`);

  // ─── 6. POST commit ────────────────────────────────────────────────
  console.log('[6/9] POST git/commits');
  const newCommit = gh('POST', `/repos/${REPO}/git/commits`, {
    message: COMMIT_MSG,
    tree: tree.sha,
    parents: [mainSha],
  });
  console.log(`     newCommitSha = ${newCommit.sha}`);

  // ─── 7. POST branch ────────────────────────────────────────────────
  console.log(`[7/9] POST git/refs (create branch ${BRANCH})`);
  try {
    gh('POST', `/repos/${REPO}/git/refs`, {
      ref: `refs/heads/${BRANCH}`,
      sha: newCommit.sha,
    });
    console.log(`     branch created`);
  } catch (e) {
    console.log(`     branch may already exist, trying force-update...`);
    gh('PATCH', `/repos/${REPO}/git/refs/heads/${BRANCH}`, {
      sha: newCommit.sha,
      force: true,
    });
    console.log(`     branch updated (force)`);
  }

  // ─── 8. POST PR ────────────────────────────────────────────────────
  console.log('[8/9] POST pulls');
  let pr;
  try {
    pr = gh('POST', `/repos/${REPO}/pulls`, {
      title: PR_TITLE,
      head: BRANCH,
      base: 'main',
      body: PR_BODY || PR_TITLE,
    });
    console.log(`     PR #${pr.number}: ${pr.html_url}`);
  } catch (e) {
    console.log(`     PR may already exist. Checking...`);
    const list = gh('GET', `/repos/${REPO}/pulls?head=frankxai:${BRANCH}&state=open`);
    if (list.length > 0) {
      pr = list[0];
      console.log(`     existing PR #${pr.number}: ${pr.html_url}`);
    } else {
      throw e;
    }
  }

  console.log(`\n✓ Done. PR: ${pr.html_url}`);

  // ─── 9. Optional: auto-merge ───────────────────────────────────────
  if (autoMerge) {
    console.log('\n[9/9] PUT pulls/{n}/merge (squash)');
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
