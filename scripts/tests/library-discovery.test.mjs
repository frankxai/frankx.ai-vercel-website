import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createLibrarySearch, filterLibrary, normalizeLibraryQuery } from '../../lib/library-search.ts';

const guides = JSON.parse(readFileSync(new URL('../../data/library-reading-guides.json', import.meta.url), 'utf8'));
const books = guides.map(book => ({ ...book, description: book.summary, reviewDate: '2026-09-07', readingTime: '2 min' }));
const index = createLibrarySearch(books);
const search = (query, category = '', slugs, sort = 'recent') => filterLibrary(books, query, category, slugs, sort, index);

test('search finds exact titles, common misspellings, author variants, and transliterations', () => {
  assert.equal(search('autobiography of a yogi')[0].slug, 'autobiography-of-a-yogi');
  assert.equal(search('untethred soul')[0].slug, 'the-untethered-soul');
  for (const slug of ['the-untethered-soul', 'the-surrender-experiment', 'living-untethered', 'wisdom-untethered']) {
    assert.ok(search('Michael Singer').some(book => book.slug === slug), slug);
  }
  assert.equal(search('Pema Chodron')[0].slug, 'when-things-fall-apart');
  assert.equal(search('Vigyan Bhairav')[0].slug, 'vijnana-bhairava-tantra');
  assert.equal(search('Koran')[0].slug, 'quran');
  assert.equal(normalizeLibraryQuery('  Chödrön’s  '), 'chodrons');
});

test('query, category, and collection restrictions intersect; clear state returns everything', () => {
  assert.ok(search('tantra').some(book => book.slug === 'tantra-illuminated'));
  assert.ok(search('tantra', 'Sacred Texts').every(book => book.kind === 'Primary text'));
  assert.deepEqual(search('Singer', 'Judaism'), []);
  assert.deepEqual(search('zzzzzzzzzzzzzzzz'), []);
  assert.equal(search('   ').length, books.length);
  assert.deepEqual(search('', '', ['bible']).map(book => book.slug), ['bible']);
  const alphabetical = search('', '', undefined, 'title').map(book => book.title);
  assert.deepEqual(alphabetical, [...alphabetical].sort((a, b) => a.localeCompare(b)));
});

test('multiword searches require every word, including an author surname', () => {
  const catalogue = [...books, { ...books[0], slug: 'our-band-could-be-your-life', title: 'Our Band Could Be Your Life', author: 'Michael Azerrad', aliases: [], categories: ['Music'], description: 'Thirteen American underground bands and the once invisible infrastructure they built.' }];
  const results = filterLibrary(catalogue, 'Michael Singer', '');
  assert.equal(results.length, 4);
  assert.ok(results.every(book => book.author === 'Michael A. Singer'));
  assert.deepEqual(filterLibrary(catalogue, 'bible', '').map(book => book.slug).sort(), ['bible', 'tanakh']);
  assert.equal(search('Yogananda autobiography')[0].slug, 'autobiography-of-a-yogi');
});

test('reading guides have distinct identities, source references, and no invented ratings or quotations', () => {
  const slugs = guides.map(book => book.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  const legacy = readFileSync(new URL('../../data/book-reviews.ts', import.meta.url), 'utf8');
  for (const book of guides) {
    assert.match(book.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(book.rating, undefined);
    assert.equal(book.quotes, undefined);
    assert.equal(book.readingPath.length, 3);
    assert.ok(book.editionNote.length > 50);
    assert.ok(book.context.length > 50);
    for (const source of book.sources) assert.equal(new URL(source.url).protocol, 'https:');
    for (const slug of book.relatedSlugs) assert.ok(slugs.includes(slug) || legacy.includes(`slug: '${slug}'`), `${book.slug} links to ${slug}`);
  }
});
