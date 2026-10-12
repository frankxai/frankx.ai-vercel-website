import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { withSacredDepth } from '../../data/sacred-guide-view.ts';

const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
const text = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const depth = read('../../data/sacred-depth.json');
const guides = read('../../data/library-reading-guides.json');
const ledger = text('../../research/sacred-texts/ledgers/translation-quote-audit.jsonl').trim().split(/\n/u).map(line => JSON.parse(line));
const primary = guides.filter(guide => guide.kind === 'Primary text').map(guide => guide.slug);
const shelfPrimary = [...primary, 'tao-te-ching'];
const words = text => text.trim().split(/\s+/u).length;
const banned = /\b(unlock|transformative|transform your|journey|profound|timeless|delve|dive into|harness|elevate|seamless|ancient wisdom|game-changer|it's worth noting)\b/iu;

test('every primary sacred-text guide has exactly one depth entry', () => {
  const slugs = depth.map(entry => entry.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.deepEqual([...slugs].sort(), [...shelfPrimary].sort());
});

test('quoted wording is traceable to a named translation it may legally appear from', () => {
  for (const entry of depth) {
    const { translation, quotes } = entry;
    assert.ok(translation.translator && translation.title && translation.rightsNote.length > 40, entry.slug);
    assert.equal(new URL(translation.sourceUrl).protocol, 'https:');
    if (translation.rightsBasis === 'public-domain') {
      assert.match(translation.rightsNote, /public domain/i, `${entry.slug}: rights note must state the public-domain evidence`);
      for (const quote of quotes) {
        const row = ledger.find(item => item.slug === entry.slug && item.text === quote.text);
        assert.ok(row, `${entry.slug}: quotation missing from the rights ledger`);
        assert.equal(row.rights_basis, 'public-domain', `${entry.slug}: ledger basis`);
      }
      assert.ok(quotes.length >= 3 && quotes.length <= 7, `${entry.slug}: ${quotes.length} quotes`);
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

test('depth corpus stays off the shared review and the guide page labels its map', () => {
  const guidesSrc = text('../../data/spiritual-reading-guides.ts');
  assert.equal(guidesSrc.includes("from './sacred-depth'"), false);
  assert.equal(guidesSrc.includes('sacred-depth.json'), false);
  assert.match(guidesSrc, /sacred-depth-slugs/);

  const pageSrc = text('../../app/library/[slug]/page.tsx');
  assert.match(pageSrc, /Editorial reading map/);
  assert.match(pageSrc, /withSacredDepth/);
  assert.doesNotMatch(pageSrc, /How the text is built/);
  assert.doesNotMatch(pageSrc, /text’s own divisions/);

  const panelSrc = text('../../components/library/SacredDepthPanel.tsx');
  assert.match(panelSrc, /Experiential/);
  assert.match(panelSrc, /Symbolic/);
  assert.match(panelSrc, /Emerging/);
  assert.match(panelSrc, /No wording from this translation is reproduced/);
  assert.match(panelSrc, /Rights ledger: recorded as a public-domain translation/);
  assert.doesNotMatch(panelSrc, /Public-domain translation/);

  const quotePage = text('../../app/library/[slug]/q/[n]/page.tsx');
  assert.match(quotePage, /whitespace-pre-line/);
  assert.match(quotePage, /quote\.source\?\.label/);

  const metaSrc = text('../../app/library/[slug]/review-meta.tsx');
  assert.match(metaSrc, /SACRED_DEPTH_REVISED/);
  assert.equal(metaSrc.includes('sacred-depth.json'), false);

  const rssSrc = text('../../app/library/rss.xml/route.ts');
  assert.match(rssSrc, /SACRED_DEPTH_REVISED/);
  assert.equal(rssSrc.includes('sacred-depth.json'), false);

  const listed = [...text('../../data/sacred-depth-slugs.ts').matchAll(/'([a-z0-9-]+)'/gu)].map(match => match[1]);
  assert.deepEqual([...listed].sort(), depth.map(entry => entry.slug).sort());
});

test('the guide overlay keeps a field note and credits a sourced passage', () => {
  const gita = depth.find(entry => entry.slug === 'bhagavad-gita');
  const taoDepth = depth.find(entry => entry.slug === 'tao-te-ching');
  const overlaid = withSacredDepth({
    slug: 'bhagavad-gita',
    title: 'The Bhagavad Gita',
    author: 'Hindu scripture',
    coverImage: '',
    rating: 0,
    reviewDate: '2026-09-07',
    categories: [],
    readingTime: '10 min',
    keyInsights: [],
    bestFor: [],
    faq: [{ q: 'Where does a first reading of The Bhagavad Gita start?', a: 'filler' }],
  }, gita);
  assert.match(overlaid.quotes?.[0].source?.label ?? '', /Arnold, 1885/);
  assert.match(overlaid.quotes?.[0].text ?? '', /\n/);
  assert.equal(overlaid.faq?.[0].q, gita.faq[0].q);
  assert.ok((overlaid.chapters?.length ?? 0) >= 5);

  const tao = withSacredDepth({
    slug: 'tao-te-ching',
    title: 'Tao Te Ching',
    author: 'Lao Tzu',
    coverImage: '',
    rating: 5,
    reviewDate: '2026-07-12',
    categories: [],
    readingTime: '6 min',
    keyInsights: [],
    bestFor: [],
    quotes: [{ text: 'In yielding is completion. In bent is straight. In hollow is full.' }],
    faq: [{ q: 'Which translation is referenced here?', a: 'The photographed copy is David Hinton’s translation.' }],
  }, taoDepth);
  assert.equal(tao.quotes?.length, 1);
  assert.match(tao.quotes?.[0].text ?? '', /In yielding is completion/);
  assert.equal(tao.quotes?.[0].source, undefined);
  assert.equal(tao.faq?.[0].q, 'Which translation is referenced here?');
  assert.ok((tao.chapters?.length ?? 0) >= 5);
  assert.equal(taoDepth.quotes.length, 0);
});
