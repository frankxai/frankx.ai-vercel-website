import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const text = path => readFileSync(new URL(path, import.meta.url), 'utf8');

test('a guide reads as a book column with a location bar', () => {
  const page = text('../../app/library/[slug]/page.tsx');
  const css = text('../../app/globals.css');
  const share = text('../../app/library/[slug]/q/[n]/page.tsx');

  assert.match(page, /reading-progress/);
  assert.match(page, /font-serif text-\[1\.25rem\]/);
  assert.match(page, /whitespace-pre-line/);
  assert.match(page, /Editorial reading map/);
  assert.equal(page.includes('text-5xl leading-none select-none'), false);

  assert.match(css, /animation-timeline: scroll\(root\)/);
  assert.match(css, /prefers-reduced-motion: no-preference/);

  assert.match(share, /font-serif text-\[1\.5rem\]/);
  assert.equal(share.includes('text-7xl'), false);
});
