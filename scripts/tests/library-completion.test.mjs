import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import { applyLibraryCompletion, libraryCompletionQuoteTexts } from '../../data/library-completion.ts';

const read = (file) => fs.readFileSync(file, 'utf8');

function norm(value) {
  return value.replace(/\*/g, '').replace(/[’']/g, "'");
}

test('Frank quotes are copied from his chapter files', () => {
  const corpus = norm([
    ...fs.readdirSync('content/books/the-wordless-laws'),
    ...fs.readdirSync('content/books/the-book-of-secrets').map((name) => path.join('the-book-of-secrets', name)),
  ].map((name) => {
    const full = name.startsWith('the-book-of-secrets')
      ? path.join('content/books', name)
      : path.join('content/books/the-wordless-laws', name);
    return read(full);
  }).join('\n'));

  assert.ok(libraryCompletionQuoteTexts.length >= 12);
  for (const text of libraryCompletionQuoteTexts) {
    assert.equal(corpus.includes(norm(text)), true, text);
  }
});

test('completion fills a reading guide without inventing an excerpt', () => {
  const guides = JSON.parse(read('data/library-reading-guides.json'));
  const bySlug = new Map(guides.map((entry) => [entry.slug, {
    slug: entry.slug,
    title: entry.title,
    author: entry.author,
  }]));
  for (const entry of guides) {
    for (const slug of entry.relatedSlugs || []) {
      if (!bySlug.has(slug)) bySlug.set(slug, { slug, title: slug, author: 'Shelf' });
    }
  }

  for (const entry of guides) {
    const done = applyLibraryCompletion({
      slug: entry.slug,
      title: entry.title,
      author: entry.author,
      coverImage: '',
      rating: 0,
      reviewDate: '2026-09-07',
      categories: entry.categories,
      readingTime: '4 min',
      keyInsights: entry.keyInsights,
      bestFor: ['Readers choosing an edition'],
      guide: {
        ...entry,
        kind: entry.kind,
        claimBasis: 'Symbolic',
      },
    }, bySlug);

    assert.equal(done.quotes, undefined, entry.slug);
    assert.equal(done.chapters, undefined, entry.slug);
    assert.equal(done.faq.length, 3, entry.slug);
    assert.match(done.relatedBook, /^[a-z0-9-]+$/, entry.slug);
    assert.ok(done.continueReading.length > 0, entry.slug);
    assert.match(done.videos[0].url, /^https:\/\/www\.youtube\.com\/results\?search_query=/);
    assert.equal(done.videos[0].url.includes('watch?v='), false);
  }
});

test('owned books gain source chapters and existing excerpts stay put', () => {
  const frank = applyLibraryCompletion({
    slug: 'the-wordless-laws',
    title: 'The Wordless Laws',
    author: 'Frank',
    coverImage: '',
    rating: 5,
    reviewDate: '2026-07-05',
    categories: ['Wisdom'],
    readingTime: '6 min',
    keyInsights: ['One decision changes the rest.'],
    bestFor: ['Readers of the book'],
  }, new Map());

  assert.equal(frank.quotes.length, 6);
  assert.equal(frank.chapters.length, 14);
  assert.equal(frank.chaptersBasis, 'Symbolic');
  assert.equal(frank.chapters[0].title, 'An Invitation');
  assert.match(frank.videos[0].url, /results\?search_query=/);

  const kept = applyLibraryCompletion({
    slug: 'meditations',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    coverImage: '',
    rating: 5,
    reviewDate: '2026-06-14',
    categories: ['Philosophy'],
    readingTime: '8 min',
    keyInsights: ['A duty.'],
    bestFor: ['Readers'],
    quotes: [{ text: 'Existing excerpt', chapter: 'Book 2' }],
    videos: [{ title: 'A talk', creator: 'TED', url: 'https://www.youtube.com/watch?v=abc', description: 'Checked recording.' }],
  }, new Map());

  assert.equal(kept.quotes[0].text, 'Existing excerpt');
  assert.equal(kept.videos[0].url, 'https://www.youtube.com/watch?v=abc');
});

test('the public catalog and the video label use the completion', () => {
  const reviews = read('data/library-reviews.ts');
  const tail = read('app/library/[slug]/review-tail.tsx');
  const page = read('app/library/[slug]/page.tsx');
  const vault = read('app/library/quotes/page.tsx');

  assert.match(reviews, /applyLibraryCompletion/);
  assert.match(tail, /YouTube search/);
  assert.match(tail, /Read on this shelf/);
  assert.equal(tail.includes('opens one recording'), false);
  assert.match(page, /chaptersBasis === 'Symbolic'/);
  assert.equal(vault.includes('every deep-dived book'), false);
});
