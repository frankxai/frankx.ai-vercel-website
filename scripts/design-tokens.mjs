#!/usr/bin/env node
// Robust cross-platform wrapper for design.md export.
// Bypasses Windows shell-redirect quirks by capturing CLI output and writing
// to disk via fs.writeFileSync.
//
// Usage:
//   node scripts/design-tokens.mjs        # export both tailwind + dtcg
//   node scripts/design-tokens.mjs lint   # validate design.md
//   node scripts/design-tokens.mjs check  # lint + export

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const SPEC = resolve(ROOT, 'design.md');
const OUT_DIR = resolve(ROOT, '.design-tokens');
const CLI = resolve(ROOT, 'node_modules/@google/design.md/dist/index.js');

const COMMAND = process.argv[2] ?? 'export';

function runCli(args) {
  return execFileSync('node', [CLI, ...args], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
}

function lint() {
  const raw = runCli(['lint', SPEC]);
  const data = JSON.parse(raw);
  const errors = data.findings.filter((f) => f.severity === 'error');
  const warnings = data.findings.filter((f) => f.severity === 'warning');

  console.log(`design.md lint: ${errors.length} errors, ${warnings.length} warnings`);
  for (const e of errors) console.error(`  ERROR  ${e.path ?? '<root>'}: ${e.message}`);
  for (const w of warnings) console.warn(`  WARN   ${w.path ?? '<root>'}: ${w.message}`);

  if (errors.length > 0) process.exit(1);
}

function safeWrite(targetPath, contents, label) {
  // Windows occasionally holds locks on files just-written by sibling processes.
  // Retry once via temp-file-then-rename, which the OS treats as a fresh inode.
  try {
    writeFileSync(targetPath, contents);
  } catch (err) {
    if (err.code === 'EBUSY' || err.code === 'EPERM') {
      const tmp = targetPath + '.tmp-' + process.pid;
      writeFileSync(tmp, contents);
      try {
        // unlink + rename to avoid in-place overwrite
        const fs = require('node:fs');
        try { fs.unlinkSync(targetPath); } catch {}
        fs.renameSync(tmp, targetPath);
      } catch {
        console.warn(`  ⚠  ${label}: target locked, wrote to ${tmp}`);
        return tmp;
      }
    } else {
      throw err;
    }
  }
  return targetPath;
}

function exportTokens() {
  mkdirSync(OUT_DIR, { recursive: true });

  const tailwind = runCli(['export', SPEC, '--format', 'tailwind']);
  const twPath = safeWrite(resolve(OUT_DIR, 'tailwind.json'), tailwind, 'tailwind');
  console.log(`✓ exported tailwind tokens → ${twPath.replace(ROOT, '.')} (${tailwind.length} bytes)`);

  const dtcg = runCli(['export', SPEC, '--format', 'dtcg']);
  const dtPath = safeWrite(resolve(OUT_DIR, 'dtcg.json'), dtcg, 'dtcg');
  console.log(`✓ exported DTCG tokens → ${dtPath.replace(ROOT, '.')} (${dtcg.length} bytes)`);
}

switch (COMMAND) {
  case 'lint':
    lint();
    break;
  case 'export':
    exportTokens();
    break;
  case 'check':
    lint();
    exportTokens();
    break;
  default:
    console.error(`Unknown command: ${COMMAND}. Use lint | export | check.`);
    process.exit(1);
}
