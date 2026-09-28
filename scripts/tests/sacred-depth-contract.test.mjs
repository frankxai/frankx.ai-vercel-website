import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
const depth = read('../../data/sacred-depth.json');
const guides = read('../../data/library-reading-guides.json');
const primary = guides.filter(guide => guide.kind === 'Primary text').map(guide => guide.slug);
const words = text => text.trim().split(/\s+/u).length;
const banned = /\b(unlock|transformative|transform your|journey|profound|timeless|delve|dive into|harness|elevate|seamless|ancient wisdom|game-changer|it's worth noting)\b/iu;

test('every primary sacred-text guide has exactly one depth entry', () => {
  const slugs = depth.map(entry => entry.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.deepEqual([...slugs].sort(), [...primary].sort());
});

test('quoted wording is traceable to a named translation it may legally appear from', () => {
  for (const entry of depth) {
    const { translation, quotes } = entry;
    assert.ok(translation.translator && translation.title && translation.rightsNote.length > 40, entry.slug);
    assert.equal(new URL(translation.sourceUrl).protocol, 'https:');
    if (translation.rightsBasis === 'public-domain') {
      assert.ok(translation.year < 1931, `${entry.slug}: public-domain basis requires a translation published before 1931`);
      assert.ok(quotes.length >= 4 && quotes.length <= 7, `${entry.slug}: ${quotes.length} quotes`);
    } else if (translation.rightsBasis === 'quotation') {
      assert.ok(quotes.length <= 4, `${entry.slug}: quotation basis allows at most four excerpts`);
      for (const quote of quotes) assert.ok(words(quote.text) <= 45, `${entry.slug}: excerpt too long`);
    } else {
      assert.equal(translation.rightsBasis, 'locator-only');
      assert.equal(quotes.length, 0, `${entry.slug}: locator-only entries reproduce no wording`);
    }
    for (const quote of quotes) {
      assert.equal(new URL(quote.sourceUrl).protocol, 'https:');
      assert.ok(quote.locator.length > 2 && quote.why.length > 30, `${entry.slug}: ${quote.text.slice(0, 30)}`);
      assert.ok(quote.text.length > 20 && !/\[\d+\]|\\\./u.test(quote.text), `${entry.slug}: footnote artifact in quote`);
    }
  }
});

test('section maps, FAQ, practice, and facts are complete original editorial prose', () => {
  const allQuotes = depth.flatMap(entry => entry.quotes.map(quote => quote.text));
  assert.equal(new Set(allQuotes).size, allQuotes.length, 'duplicate quotation across texts');
  for (const entry of depth) {
    assert.ok(entry.sections.length >= 5 && entry.sections.length <= 9, `${entry.slug}: ${entry.sections.length} sections`);
    entry.sections.forEach((section, index) => {
      assert.equal(section.number, index + 1);
      assert.ok(section.keyIdea && section.summary.length > 80, `${entry.slug} section ${index + 1}`);
    });
    assert.ok(entry.faq.length >= 3, entry.slug);
    for (const { q, a } of entry.faq) assert.ok(q.endsWith('?') && a.length > 60, `${entry.slug}: ${q}`);
    assert.ok(entry.practice.title && entry.practice.duration && entry.practice.instruction.length > 100, entry.slug);
    for (const key of ['origin', 'language', 'form', 'firstRead']) assert.ok(entry.facts[key], `${entry.slug}: facts.${key}`);
    const prose = [...entry.sections.flatMap(s => [s.title, s.keyIdea, s.summary]), ...entry.faq.flatMap(f => [f.q, f.a]), entry.practice.instruction, ...entry.quotes.map(q => q.why)].join(' ');
    assert.doesNotMatch(prose, banned, entry.slug);
  }
});
