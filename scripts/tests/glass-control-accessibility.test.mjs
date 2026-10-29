import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Candidate-only checks: this patch is deliberately not applied to production.
const root = new URL('../../', import.meta.url);
const baseline = readFileSync(new URL('components/liquid-glass/GlassInput.tsx', root), 'utf8').replaceAll('\r\n', '\n');
const patch = readFileSync(new URL('docs/evidence/glass-controls-Codex-2026-10-29-v1.patch', root), 'utf8');

function applyInMemory(source, diff) {
  const original = source.split('\n');
  const output = [];
  let cursor = 0;
  for (const line of diff.split('\n')) {
    const hunk = /^@@ -(\d+)(?:,\d+)? \+\d+(?:,\d+)? @@/.exec(line);
    if (hunk) {
      const start = Number(hunk[1]) - 1;
      assert.ok(start >= cursor, 'hunks must stay ordered');
      output.push(...original.slice(cursor, start));
      cursor = start;
    } else if (line.startsWith('--- ') || line.startsWith('+++ ') || !line) {
      continue;
    } else if (line[0] === ' ' || line[0] === '-') {
      assert.equal(original[cursor], line.slice(1), 'patch context must match exact baseline');
      if (line[0] === ' ') output.push(original[cursor]);
      cursor++;
    } else if (line[0] === '+') {
      output.push(line.slice(1));
    } else {
      assert.fail(`Unsupported patch line: ${line}`);
    }
  }
  output.push(...original.slice(cursor));
  return output.join('\n');
}

export const candidate = applyInMemory(baseline, patch);

test('candidate patch matches the current baseline and changes only GlassInput', () => {
  assert.equal((patch.match(/^--- a\//gm) || []).length, 1);
  assert.match(patch, /^--- a\/components\/liquid-glass\/GlassInput.tsx/m);
  assert.notEqual(candidate, baseline);
  assert.equal(readFileSync(fileURLToPath(new URL('components/liquid-glass/GlassInput.tsx', root)), 'utf8').replaceAll('\r\n', '\n'), baseline);
});

test('candidate connects visible label to supplied or stable generated ID', () => {
  assert.doesNotMatch(baseline, /htmlFor=/);
  assert.match(candidate, /const generatedId = useId\(\)/);
  assert.match(candidate, /const inputId = id \?\? generatedId/);
  assert.match(candidate, /<label htmlFor=\{inputId\}/);
  assert.match(candidate, /id=\{inputId\}/);
});

test('candidate preserves caller descriptions and exposes the active validation message', () => {
  assert.match(candidate, /\[ariaDescribedBy, messageId\]\.filter\(Boolean\)/);
  assert.match(candidate, /aria-describedby=\{describedBy\}/);
  assert.match(candidate, /aria-invalid=\{error \|\| ariaInvalid\}/);
  assert.match(candidate, /id=\{messageId\}/);
  assert.match(candidate, /errorMessage \|\| helperText/);
  const input = candidate.slice(candidate.indexOf('<input'), candidate.indexOf('        />', candidate.indexOf('<input')));
  assert.ok(input.indexOf('{...props}') < input.indexOf('aria-describedby='));
});

test('candidate preserves caller event handlers and style without competing JS focus state', () => {
  for (const handler of ['onFocus', 'onBlur', 'onChange']) {
    assert.ok(candidate.includes(`${handler}={${handler}}`));
  }
  assert.match(candidate, /style=\{\{\s*\.\.\.style,/);
  assert.doesNotMatch(candidate, /setIsFocused|setHasValue|handleChange|from 'framer-motion'/);
});

test('candidate keeps a native focus outline, touch height and forced-color fallback', () => {
  assert.match(candidate, /min-h-11/);
  assert.match(candidate, /outline: 2px solid var\(--element-primary\)/);
  assert.match(candidate, /@media \(forced-colors: active\)/);
  assert.match(candidate, /outline-color: Highlight/);
  assert.doesNotMatch(candidate, /outline: none/);
});

test('candidate avoids looping or moving focus effects and disables transitions under reduced motion', () => {
  assert.doesNotMatch(candidate, /repeat: Infinity|rotate: 360|transition-all|<motion\./);
  assert.match(candidate, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(candidate, /transition: none/);
  assert.match(candidate, /transition: border-color 160ms ease-out, background-color 160ms ease-out/);
});
