import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Read the applied component, not a reconstructed patch.
const root = new URL('../../', import.meta.url);
export const candidate = readFileSync(new URL('components/liquid-glass/GlassInput.tsx', root), 'utf8');

test('applied input connects visible label to supplied or stable generated ID', () => {
  assert.match(candidate, /const generatedId = useId\(\)/);
  assert.match(candidate, /const inputId = id \?\? generatedId/);
  assert.match(candidate, /<label htmlFor=\{inputId\}/);
  assert.match(candidate, /id=\{inputId\}/);
});

test('applied input preserves caller descriptions and exposes the active validation message', () => {
  assert.match(candidate, /\[ariaDescribedBy, messageId\]\.filter\(Boolean\)/);
  assert.match(candidate, /aria-describedby=\{describedBy\}/);
  assert.match(candidate, /aria-invalid=\{error \|\| ariaInvalid\}/);
  assert.match(candidate, /id=\{messageId\}/);
  assert.match(candidate, /errorMessage \|\| helperText/);
  const input = candidate.slice(candidate.indexOf('<input'), candidate.indexOf('        />', candidate.indexOf('<input')));
  assert.ok(input.indexOf('{...props}') < input.indexOf('aria-describedby='));
});

test('applied input preserves caller event handlers and style without competing JS focus state', () => {
  for (const handler of ['onFocus', 'onBlur', 'onChange']) {
    assert.ok(candidate.includes(`${handler}={${handler}}`));
  }
  assert.match(candidate, /style=\{\{\s*\.\.\.style,/);
  assert.doesNotMatch(candidate, /setIsFocused|setHasValue|handleChange|from 'framer-motion'/);
});

test('applied input keeps a native focus outline, touch height and forced-color fallback', () => {
  assert.match(candidate, /min-h-11/);
  assert.match(candidate, /outline: 2px solid var\(--element-primary\)/);
  assert.match(candidate, /@media \(forced-colors: active\)/);
  assert.match(candidate, /outline-color: Highlight/);
  assert.doesNotMatch(candidate, /outline: none/);
});

test('applied input avoids looping or moving focus effects and disables transitions under reduced motion', () => {
  assert.doesNotMatch(candidate, /repeat: Infinity|rotate: 360|transition-all|<motion\./);
  assert.match(candidate, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(candidate, /transition: none/);
  assert.match(candidate, /transition: border-color 160ms ease-out, background-color 160ms ease-out/);
});
