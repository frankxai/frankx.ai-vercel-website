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

  assert.match(registry, /const book = booksRegistry\.find\(\(b\) => b\.slug === slug\)/);
  assert.match(
    registry,
    /return book\?\.status === 'draft' \? undefined : book/,
    'the default book accessor must fail closed before a route can render draft data',
  );
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
  const [layout, landing, chapter, glossary] = await Promise.all([
    read('app/books/[bookSlug]/layout.tsx'),
    read('app/books/[bookSlug]/page.tsx'),
    read('app/books/[bookSlug]/[chapterSlug]/page.tsx'),
    read('app/books/[bookSlug]/glossary/page.tsx'),
  ]);

  assert.match(layout, /params: Promise<\{ bookSlug: string \}>/);
  assert.match(layout, /book\.status === 'draft'/);
  assert.equal((landing.match(/getBookBySlug\(bookSlug\)/g) ?? []).length, 2);
  assert.ok(
    landing.indexOf('if (!book) notFound()') < landing.indexOf('getThemeClasses(book.theme.id)'),
    'the landing page must reject the parent before rendering its data',
  );
  assert.match(chapter, /export default async function ChapterPage/);
  assert.equal((chapter.match(/getBookBySlug\(bookSlug\)/g) ?? []).length, 2);
  assert.ok(
    chapter.indexOf('if (!book) notFound()') < chapter.indexOf("readFileSync(filePath, 'utf-8')"),
    'the chapter page must reject the parent before reading manuscript content',
  );
    assert.match(glossary, /params: Promise<\{\s*bookSlug: string;\s*\}>/);
  assert.match(glossary, /export default async function GlossaryPage/);
  assert.match(glossary, /const \{ bookSlug \} = await params/);
  assert.match(glossary, /export async function generateStaticParams/);
  assert.equal((glossary.match(/getBookBySlug\(bookSlug\)/g) ?? []).length, 2);
  assert.doesNotMatch(
    glossary,
    /params\.bookSlug/,
    'Next 16 passes params as a Promise — glossary must unwrap it before lookup',
  );
  assert.ok(
    glossary.indexOf('if (!book || !glossary)') < glossary.indexOf('getTermsByCategory(glossary)'),
    'the glossary page must reject the parent before rendering glossary data',
  );
});

test('published book glossaries resolve from bundled JSON, not runtime fs', async () => {
  const [loader, spartan, hoffnung] = await Promise.all([
    read('lib/glossary.ts'),
    read('data/glossaries/spartan-mindset.json'),
    read('data/glossaries/hoffnung.json'),
  ]);

  assert.doesNotMatch(loader, /from ['"]fs['"]/, 'glossary loader must not depend on runtime filesystem');
  assert.match(loader, /data\/glossaries\/spartan-mindset\.json/);
  assert.match(loader, /data\/glossaries\/hoffnung\.json/);

  const spartanData = JSON.parse(spartan);
  const hoffnungData = JSON.parse(hoffnung);
  assert.ok(Array.isArray(spartanData.terms) && spartanData.terms.length > 0);
  assert.ok(Array.isArray(hoffnungData.terms) && hoffnungData.terms.length > 0);
  assert.equal(spartanData.bookSlug, 'spartan-mindset');
  assert.equal(hoffnungData.book || hoffnungData.bookSlug, 'hoffnung');
});
