#!/usr/bin/env node
/**
 * scripts/deploy-papa-crosslinks.mjs
 *
 * Follow-up to deploy-papa-hub.mjs. Adds:
 *   - Papa tile to app/familie/page.tsx
 *   - /papa/ link to app/opa-und-oma/page.tsx footer
 *
 * Pulled separately because these are existing production-only files. We
 * fetch them via gh api Contents-API, edit in memory, push back.
 *
 * Trees-API single-commit pattern. Disk-friendly. Atomic.
 */

import { execSync } from 'node:child_process';

const REPO = 'frankxai/frankx.ai-vercel-website';
const BRANCH = 'main';

function gh(args, body) {
  const opts = { encoding: 'utf8', stdio: ['pipe', 'pipe', 'inherit'] };
  if (body) opts.input = JSON.stringify(body);
  return execSync(args.map((a) => (a.includes(' ') ? `"${a}"` : a)).join(' '), opts);
}

function ghJSON(args, body) {
  return JSON.parse(gh(args, body));
}

// ---- helpers --------------------------------------------------------------

function fetchFile(path) {
  const data = ghJSON([`gh`, `api`, `repos/${REPO}/contents/${path}?ref=${BRANCH}`]);
  // Normalize CRLF → LF so JS template literal markers match. We restore
  // CRLF on the wire? Actually GitHub stores whatever we PUT, and Next.js
  // doesn't care about line endings. Keep LF — cleaner.
  const content = Buffer.from(data.content, 'base64').toString('utf8').replace(/\r\n/g, '\n');
  return { content, sha: data.sha };
}

// ---- 1. fetch existing files ---------------------------------------------

console.log('[crosslinks] Fetching production files…');
const familie = fetchFile('app/familie/page.tsx');
const opaOma = fetchFile('app/opa-und-oma/page.tsx');

// ---- 2. edit /familie/ — add Papa tile -----------------------------------

console.log('[crosslinks] Patching app/familie/page.tsx…');
const papaTile = `  {
    title: 'Papa',
    description: 'Witali Riemer (1969-2018). Ein lebendiges Sohn-Archiv für Papa, mit Erbe für alle die ohne Vaterstimme aufwuchsen.',
    href: '/papa',
    icon: Heart,
    color: 'from-cyan-500/20 to-cyan-600/5',
    borderColor: 'border-cyan-500/20 hover:border-cyan-500/40',
    iconColor: 'text-cyan-400',
  },
`;

// Insert Papa tile right after the Opa & Oma tile (before Interview-Kit), so
// the two person-archives sit side by side in the Familie Hub.
const insertMarker = `    iconColor: 'text-rose-400',\n  },\n  {\n    title: 'Interview-Kit',`;
let familieEdited;
if (familie.content.includes(insertMarker)) {
  familieEdited = familie.content.replace(
    insertMarker,
    `    iconColor: 'text-rose-400',\n  },\n${papaTile}  {\n    title: 'Interview-Kit',`
  );
  console.log('  ✓ Papa tile inserted after Opa & Oma (before Interview-Kit)');
} else {
  console.error(
    '  ✗ Insert marker not found in app/familie/page.tsx — file has drifted'
  );
  console.error('     Add the tile manually or update this script.');
  process.exit(2);
}

// ---- 3. edit /opa-und-oma/ — add /papa/ to footer link row --------------

console.log('[crosslinks] Patching app/opa-und-oma/page.tsx…');
// The footer has a row of links: /familie, /familie/stammbaum, /. Add /papa
// at the front so it reads: Papa · Familie · Stammbaum · frankx.ai
// Marker uses the file's actual indentation (12 spaces before <Link).
const opaMarker = `            <Link
              href="/familie"
              className="text-xs text-white/20 transition-colors hover:text-white/40"
            >
              Familie Hub
            </Link>`;
const opaInsert = `            <Link
              href="/papa"
              className="text-xs text-white/20 transition-colors hover:text-white/40"
            >
              Papa
            </Link>
            <span className="text-white/10">&middot;</span>
            <Link
              href="/familie"
              className="text-xs text-white/20 transition-colors hover:text-white/40"
            >
              Familie Hub
            </Link>`;
let opaEdited;
if (opaOma.content.includes(opaMarker)) {
  opaEdited = opaOma.content.replace(opaMarker, opaInsert);
  console.log('  ✓ /papa link added to footer row');
} else {
  console.error(
    '  ✗ Footer marker not found in app/opa-und-oma/page.tsx — file has drifted'
  );
  process.exit(2);
}

// ---- 4. atomic Trees-API commit ------------------------------------------

console.log('[crosslinks] Creating blobs…');
const familieBlob = ghJSON(
  [`gh`, `api`, `-X`, `POST`, `repos/${REPO}/git/blobs`, `--input`, `-`],
  { content: familieEdited, encoding: 'utf-8' }
);
const opaBlob = ghJSON(
  [`gh`, `api`, `-X`, `POST`, `repos/${REPO}/git/blobs`, `--input`, `-`],
  { content: opaEdited, encoding: 'utf-8' }
);

console.log('[crosslinks] Fetching current main HEAD…');
const ref = ghJSON([`gh`, `api`, `repos/${REPO}/git/ref/heads/${BRANCH}`]);
const parentSha = ref.object.sha;
const parentCommit = ghJSON([`gh`, `api`, `repos/${REPO}/git/commits/${parentSha}`]);
const baseTree = parentCommit.tree.sha;

console.log('[crosslinks] Creating tree…');
const newTree = ghJSON(
  [`gh`, `api`, `-X`, `POST`, `repos/${REPO}/git/trees`, `--input`, `-`],
  {
    base_tree: baseTree,
    tree: [
      {
        path: 'app/familie/page.tsx',
        sha: familieBlob.sha,
        mode: '100644',
        type: 'blob',
      },
      {
        path: 'app/opa-und-oma/page.tsx',
        sha: opaBlob.sha,
        mode: '100644',
        type: 'blob',
      },
    ],
  }
);

console.log('[crosslinks] Creating commit…');
const newCommit = ghJSON(
  [`gh`, `api`, `-X`, `POST`, `repos/${REPO}/git/commits`, `--input`, `-`],
  {
    message: `feat(papa): cross-link /papa/ from /familie/ and /opa-und-oma/

Adds the Papa tile to the Familie Hub (cyan, paternal-Riemer side) and the
/papa link to the Opa & Oma footer link row. Completes the cross-link
integration begun in 3ef1da9c.

Per spec: docs/superpowers/specs/2026-05-05-papa-hub-design.md §12.

Note: /papa/ is deliberately NOT added to global navigation per Starlight
Board verdict 2026-05-05 — discoverable via /familie/ tile only at v1.
`,
    tree: newTree.sha,
    parents: [parentSha],
  }
);

console.log('[crosslinks] Updating main ref…');
const updated = ghJSON(
  [`gh`, `api`, `-X`, `PATCH`, `repos/${REPO}/git/refs/heads/${BRANCH}`, `--input`, `-`],
  { sha: newCommit.sha, force: false }
);

console.log(`\n[crosslinks] ✓ Cross-links shipped. Main now at: ${updated.object.sha}`);
