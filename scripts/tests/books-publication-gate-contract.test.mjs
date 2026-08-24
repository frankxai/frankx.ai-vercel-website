import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8');

test('draft parent book routes fail closed at the shared dynamic segment', async () => {
  const [layout, landing, registry, packageJsonSource] = await Promise.all([
    read('app/books/[bookSlug]/layout.tsx'),
    read('app/books/[bookSlug]/page.tsx'),
    read('app/books/lib/books-registry.ts'),
    read('package.json'),
  ]);
  const packageJson = JSON.parse(packageJsonSource);

  assert.match(layout, /import \{ notFound \} from 'next\/navigation'/);
  assert.match(layout, /const book = getBookBySlug\(bookSlug\)/);
  assert.match(layout, /if \(!book \|\| book\.status === 'draft'\) notFound\(\)/);
  assert.match(layout, /return children/);
  assert.match(landing, /export default async function BookLandingPage/);

  assert.match(
    registry,
    /Warriors of the Golden Age — Book One \(draft, Gate V3 pending\)/,
    'the human V3 publication gate must remain explicit',
  );
  assert.match(
    registry,
    /slug: 'warriors-of-the-golden-age'[\s\S]{0,1600}status: 'draft'/,
    'the gated manuscript must remain draft until a human promotes it',
  );
  assert.match(
    registry,
    /slug: 'the-wordless-laws'[\s\S]{0,1600}status: 'published'/,
    'the published control book must remain available',
  );
  assert.doesNotMatch(
    layout,
    /status !== 'published'/,
    'the route gate must reject drafts only, preserving current in-progress visibility',
  );
  assert.match(
    packageJson.scripts['test:build-integrity'],
    /books-publication-gate-contract\.test\.mjs/,
    'the publication contract must run in the existing build-integrity gate',
  );
});

test('chapter and glossary routes inherit the same draft parent gate', async () => {
  const [layout, chapter, glossary] = await Promise.all([
    read('app/books/[bookSlug]/layout.tsx'),
    read('app/books/[bookSlug]/[chapterSlug]/page.tsx'),
    read('app/books/[bookSlug]/glossary/page.tsx'),
  ]);

  assert.match(layout, /params: Promise<\{ bookSlug: string \}>/);
  assert.match(layout, /book\.status === 'draft'/);
  assert.match(chapter, /export default async function ChapterPage/);
  assert.match(glossary, /export default function GlossaryPage/);
});
