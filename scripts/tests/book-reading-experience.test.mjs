import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

function load(path) {
  const module = { exports: {} };
  const source = ts.transpileModule(readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  new Function('module', 'exports', source)(module, module.exports);
  return module.exports;
}
const { booksRegistry, getPublishedBooks, getBookBySlug } = load('app/books/lib/books-registry.ts');
const { filterBooks } = load('app/books/lib/book-collections.ts');
const { parseReadingPreferences, defaultReadingPreferences } = load('app/books/lib/reading-preferences.ts');

test('each book has one identity and every available chapter resolves to a manuscript', () => {
  assert.equal(new Set(booksRegistry.map(book => book.slug)).size, booksRegistry.length);
  assert.equal(getBookBySlug('warriors-of-the-golden-age'), undefined);
  for (const book of getPublishedBooks()) {
    for (const chapter of book.chapters.filter(chapter => chapter.published)) {
      assert.ok(existsSync(new URL(`../../${book.contentDir}/${chapter.slug}.md`, import.meta.url)), `${book.slug}/${chapter.slug}`);
    }
  }
});

test('catalog search intersects words and subject, handles case and resets to the catalog', () => {
  const books = getPublishedBooks();
  assert.equal(filterBooks(books, '  WORDLESS   practice ', 'Attention & practice')[0]?.slug, 'the-wordless-laws-book-two');
  assert.equal(filterBooks(books, 'wordless', 'Arcanea fiction').length, 0);
  assert.ok(filterBooks(books, 'guardians', 'Arcanea fiction').length > 0);
  assert.equal(filterBooks(books, '', 'All books').length, books.length);
  assert.equal(filterBooks(books, 'no-such-book-qzj', 'All books').length, 0);
});

test('reading preferences tolerate blocked/missing/malformed data and reject arbitrary CSS values', () => {
  for (const raw of [null, '', '{broken', 'null', '12', '"serif"']) assert.deepEqual(parseReadingPreferences(raw), defaultReadingPreferences);
  assert.deepEqual(parseReadingPreferences('{"size":"999rem","tone":"url(evil)","face":"comic","width":"999vw"}'), defaultReadingPreferences);
  assert.deepEqual(parseReadingPreferences('{"size":"larger","tone":"warm","face":"serif","width":"wide"}'), { size: 'larger', tone: 'warm', face: 'serif', width: 'wide' });
});
