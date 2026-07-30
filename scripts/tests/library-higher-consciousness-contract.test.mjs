import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const read = (path) => fs.readFileSync(path, 'utf8');

test('Handbook to Higher Consciousness ships as a complete source-backed field manual', () => {
  const data = read('data/handbook-to-higher-consciousness.ts');

  assert.match(data, /author: 'Ken Keyes Jr\.'/);
  assert.match(data, /publicationYear: 1975/);
  assert.match(data, /readingTime: '22 min'/);
  assert.match(data, /Transformative analysis only/);
  assert.doesNotMatch(data, /quotes:\s*\[/);

  assert.match(data, /export const coreOperatingModel/);
  assert.match(data, /export const sevenCenters/);
  assert.match(data, /export const twelvePathways/);
  assert.match(data, /export const fiveMethods/);
  assert.match(data, /export const fiveLearningStages/);
  assert.match(data, /export const criticalReading/);
  assert.match(data, /export const handbookSources/);

  assert.equal((data.match(/number: '(?:1|2|3|4|5|6|7)',\n    name:/g) ?? []).length >= 7, true);
  assert.equal((data.match(/kind: 'Research'/g) ?? []).length, 4);
  assert.equal((data.match(/\n    \{\n      q:/g) ?? []).length, 9);
});

test('the dedicated library route renders every decision layer and structured evidence', () => {
  const page = read('app/library/handbook-to-higher-consciousness/page.tsx');
  const og = read('app/library/handbook-to-higher-consciousness/opengraph-image.tsx');

  for (const id of [
    'short-answer',
    'key-insights',
    'complete-system',
    'seven-centers',
    'twelve-pathways',
    'five-methods',
    'learning-stages',
    'application',
    'modern-reading',
    'sources',
    'faq',
  ]) {
    assert.match(page, new RegExp(`id="${id}"`));
  }

  assert.match(page, /'@type': 'Article'/);
  assert.match(page, /'@type': 'Book'/);
  assert.match(page, /'@type': 'FAQPage'/);
  assert.match(page, /citation: handbookSources/);
  assert.match(page, /aria-label=\{`\$\{review\.rating\} out of 5 stars`\}/);
  assert.match(page, /rel="noreferrer noopener"/);
  assert.match(page, /focus-visible:ring-2/);
  assert.match(og, /width: 1200/);
  assert.match(og, /height: 630/);
});

test('the review is discoverable from the library index and canonical route catalog', () => {
  const reviews = read('data/book-reviews.ts');
  const routes = JSON.parse(read('data/route-index.json'));

  assert.match(
    reviews,
    /import \{ handbookToHigherConsciousnessReview \} from '@\/data\/handbook-to-higher-consciousness';/
  );
  assert.match(
    reviews,
    /export const bookReviews: BookReview\[\] = \[\n  handbookToHigherConsciousnessReview,/
  );
  assert.ok(
    routes.routes.some(
      (route) => route.href === '/library/handbook-to-higher-consciousness'
    )
  );
});
