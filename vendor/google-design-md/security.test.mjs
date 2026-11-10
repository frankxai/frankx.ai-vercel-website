import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join, resolve, sep } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const installed = realpathSync(join(root, 'node_modules/@google/design.md'));
const cli = join(installed, 'dist/index.js');
const requireCli = createRequire(join(installed, 'package.json'));
const run = args => spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8', timeout: 10000 });

test('both installed entry points import patched Zod without embedding the old implementation', () => {
  const manifest = JSON.parse(readFileSync(join(installed, 'package.json'), 'utf8'));
  assert.equal(manifest.version, '0.4.0-starlight.1');
  assert.equal(manifest.dependencies.zod, '4.6.7');
  const zod = JSON.parse(readFileSync(requireCli.resolve('zod/package.json'), 'utf8'));
  assert.equal(zod.version, '4.6.7');
  for (const entry of ['dist/index.js', 'dist/linter/index.js']) {
    const code = readFileSync(join(installed, entry), 'utf8');
    assert.match(code, /from ["']zod["']/);
    assert.doesNotMatch(code, /node_modules\/zod|class ZodError|function ZodError/);
  }
});

test('the packaged CLI preserves lint, Tailwind and DTCG output and rejects invalid input', () => {
  const directory = mkdtempSync(join(tmpdir(), 'frankx-design-cli-contract-'));
  const file = join(directory, 'DESIGN.md');
  try {
    writeFileSync(file, `---
name: CLI contract fixture
description: Security rebuild compatibility fixture.
colors:
  primary: "#123456"
typography:
  body:
    fontFamily: sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
rounded:
  regular: 4px
spacing:
  gap: 8px
---
# CLI contract fixture
`);
    const lint = run(['lint', file]);
    assert.equal(lint.status, 0, lint.stderr || lint.stdout);
    assert.equal(JSON.parse(lint.stdout).summary.errors, 0);
    const tailwind = run(['export', file, '--format', 'tailwind']);
    assert.equal(tailwind.status, 0, tailwind.stderr);
    assert.equal(JSON.parse(tailwind.stdout).theme.extend.colors.primary, '#123456');
    const dtcg = run(['export', file, '--format', 'dtcg']);
    assert.equal(dtcg.status, 0, dtcg.stderr);
    assert.equal(JSON.parse(dtcg.stdout).color.primary.$value.hex, '#123456');

    writeFileSync(file, '---\ncolors:\n  primary: not-a-color\n---\n');
    const invalid = run(['lint', file]);
    assert.equal(invalid.status, 1, invalid.stderr || invalid.stdout);
    assert.ok(JSON.parse(invalid.stdout).summary.errors > 0);
    const missing = run(['lint', join(directory, 'missing.md')]);
    assert.equal(missing.status, 2);
    assert.match(missing.stderr, /not found/);
  } finally {
    assert.ok(resolve(directory).startsWith(resolve(tmpdir()) + sep));
    rmSync(directory, { recursive: true, force: true });
  }
});
