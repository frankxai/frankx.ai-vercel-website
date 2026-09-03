#!/usr/bin/env node
/**
 * Fails when dependency overrides are declared somewhere pnpm does not read, or
 * when the lockfile no longer carries every override the workspace declares.
 *
 * Why this exists, measured 2026-09-03 against this repo's own package.json:
 *
 *   pnpm 10.28.0 (the declared packageManager) prints
 *     [WARN] The "pnpm" field in package.json is no longer read by pnpm.
 *   and then applies the overrides anyway. pnpm 11.25.0 does what the warning
 *   says: a from-scratch `pnpm install --lockfile-only` produced a lockfile with
 *   no `overrides:` block at all, reverting @opentelemetry/propagator-jaeger
 *   from 2.11.0 to 2.7.1 and reintroducing postcss 8.5.23 alongside 8.5.26.
 *
 * Nothing went red for that. `--frozen-lockfile` compares the lockfile to the
 * configuration that produced it, so a lockfile with the pins silently removed
 * is self-consistent and CI stays green. The failure is only visible by
 * comparing the two files, which is what this does.
 *
 * Uses node builtins only so it can run before any dependency install.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];

/**
 * Reads a top-level `overrides:` block of `key: value` pairs. Deliberately not a
 * YAML parser: it throws on any line inside the block it does not fully
 * understand rather than skipping it, because an override this script silently
 * failed to see is exactly the outcome it exists to prevent.
 */
function readOverrideBlock(relPath) {
  const lines = readFileSync(join(repoRoot, relPath), 'utf8').split(/\r?\n/);
  const start = lines.findIndex((line) => line === 'overrides:');
  if (start === -1) return null;

  const entries = new Map();
  for (const raw of lines.slice(start + 1)) {
    if (raw.trim() === '' || raw.trimStart().startsWith('#')) continue;
    if (!raw.startsWith('  ')) break;
    const match = /^ {2}(?:'([^']+)'|"([^"]+)"|([^\s:][^:]*?))\s*:\s*(?:'([^']*)'|"([^"]*)"|(\S+))\s*$/.exec(raw);
    if (!match) {
      throw new Error(`${relPath}: cannot parse override line, refusing to guess: ${JSON.stringify(raw)}`);
    }
    const key = match[1] ?? match[2] ?? match[3];
    const value = match[4] ?? match[5] ?? match[6];
    entries.set(key, value);
  }
  return entries;
}

const pkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8'));
if (pkg.pnpm !== undefined) {
  failures.push(
    `package.json declares a "pnpm" field (keys: ${Object.keys(pkg.pnpm).join(', ')}). ` +
      'pnpm 11 ignores it outright, so settings placed there vanish from a regenerated ' +
      'lockfile without an error. Move them to pnpm-workspace.yaml.',
  );
}

const declared = readOverrideBlock('pnpm-workspace.yaml');
if (declared === null || declared.size === 0) {
  failures.push('pnpm-workspace.yaml declares no overrides. The security pins must live there.');
}

const locked = readOverrideBlock('pnpm-lock.yaml');
if (locked === null) {
  failures.push('pnpm-lock.yaml has no overrides: block. Every pin has been dropped from the resolved graph.');
}

if (declared && locked) {
  for (const [key, value] of declared) {
    if (!locked.has(key)) {
      failures.push(`Override "${key}" is declared in pnpm-workspace.yaml but absent from pnpm-lock.yaml. It is not being applied.`);
    } else if (locked.get(key) !== value) {
      failures.push(`Override "${key}" is "${value}" in pnpm-workspace.yaml but "${locked.get(key)}" in pnpm-lock.yaml.`);
    }
  }
  for (const key of locked.keys()) {
    if (!declared.has(key)) {
      failures.push(`Override "${key}" is in pnpm-lock.yaml but no longer declared in pnpm-workspace.yaml. The next regeneration drops it.`);
    }
  }
}

// Named floor. The checks above compare the two files to each other, so deleting
// a pin from both would pass them. These two were added by #645 to keep patched
// undici on the @vercel/blob and jsdom paths; removing either needs to be loud.
const REQUIRED_PINS = {
  '@vercel/blob>undici': '6.28.0',
  'jsdom@28.1.0>undici': '7.29.0',
};
for (const [key, value] of Object.entries(REQUIRED_PINS)) {
  if (declared?.get(key) !== value) {
    failures.push(
      `Security pin from #645 missing or changed: expected ${key} = ${value} in pnpm-workspace.yaml, ` +
        `found ${declared?.get(key) ?? '(absent)'}. If this pin is genuinely obsolete, remove it here too and say why.`,
    );
  }
}

if (failures.length > 0) {
  console.error('pnpm override guard FAILED:\n');
  for (const failure of failures) console.error(`  - ${failure}\n`);
  process.exit(1);
}

console.log(`pnpm override guard passed: ${declared.size} override(s) declared in pnpm-workspace.yaml and all present in pnpm-lock.yaml.`);
