import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { defaultScenario, calculateScenario, validScenario, parseSelection, serializeSelection, restoreSelection, sourceFreshness } from '../../lib/research/economy.ts';
import { economyAtlasAvailable } from '../../lib/research/economy-release.ts';
const atlas = JSON.parse(fs.readFileSync(new URL('../../data/economy-atlas.json', import.meta.url), 'utf8'));
const ids = atlas.opportunities.map(p => p.id), categories = [...new Set(atlas.opportunities.map(p => p.category))];
test('Contribution includes refunds, VAT fee basis and costs, including negative outcomes', () => {
  assert.ok(Math.abs(calculateScenario(defaultScenario).contribution - 591.71) < 0.001);
  assert.ok(calculateScenario({...defaultScenario, refund: 100}).contribution < 0);
  assert.equal(calculateScenario({...defaultScenario, visits: 0}).contribution, -50);
  assert.ok(calculateScenario({...defaultScenario, basis: 'net'}).fees < calculateScenario(defaultScenario).fees);
});
test('Invalid, infinite, empty and oversized numeric assumptions fail closed', () => {
  for (const price of [-1, Infinity, NaN, '', 1e10]) assert.equal(validScenario({...defaultScenario, price}), false);
  assert.throws(() => calculateScenario({...defaultScenario, conversion: 101}));
  assert.deepEqual(parseSelection(new URLSearchParams('price=Infinity'), ids, categories).scenario, defaultScenario);
});
test('Shared state allowlists IDs and contains no search text; local recovery restores edited assumptions', () => {
  const s = parseSelection(new URLSearchParams('product=terminal-pack&compare=terminal-pack,evil,terminal-pack,website-kit&price=39&q=private%20text'), ids, categories);
  assert.equal(s.product, 'terminal-pack'); assert.equal(s.compare.includes('evil'), false);
  const url = serializeSelection(s); assert.equal(url.includes('private'), false);
  assert.equal(parseSelection(new URLSearchParams(url), ids, categories).scenario.price, 39);
  const restored = restoreSelection(JSON.stringify({version: 1, ...s}), ids, categories);
  assert.equal(restored.query, 'private text'); assert.equal(restored.scenario.price, 39);
  assert.equal(restoreSelection('not-json', ids, categories), null);
  assert.equal(restoreSelection(JSON.stringify({version: 1, scenario: {price: 5}}), ids, categories), null);
});
test('Public projection contains no machine paths, registry commits or invented sales', () => {
  const text = JSON.stringify(atlas);
  for (const banned of ['registryCommit', 'sourceIntent', 'C:/Users', 'C:\\\\Users', 'permission-bypass']) assert.equal(text.includes(banned), false);
  for (const p of atlas.opportunities) {assert.equal(p.salesKnown, false); assert.equal(p.demandEvidence, 'unmeasured'); for (const id of p.channelIds) assert.ok(atlas.marketplaces.some(m => m.id === id));}
  for (const m of atlas.metrics) assert.equal(m.aggregateAllowed, false);
  for (const s of atlas.sources) {const u = new URL(s.url); assert.equal(u.protocol, 'https:'); assert.equal(u.username + u.password, ''); assert.ok(['needs review', 'qualified'].includes(s.claimReview));}
});
test('Incompatible saved products are rejected instead of changing the subject of a scenario', () => {
  for (const product of ['removed-product', '', null, undefined]) assert.equal(restoreSelection(JSON.stringify({version: 1, product, scenario: {...defaultScenario, price: 39}}), ids, categories), null);
  assert.equal(restoreSelection(JSON.stringify({version: 1, product: ids[0], scenario: {...defaultScenario, price: 39}}), ids, categories).scenario.price, 39);
});
test('Unreviewed assertions stay outside the public dataset and its snapshot date covers incorporated reviews', () => {
  for (const s of atlas.sources) {
    assert.ok(s.checkedAt <= atlas.asOf);
    if (s.claimReview !== 'qualified') assert.equal(s.note, 'Research lead. Claims, eligibility and commercial terms require review against the primary source before use.');
  }
  for (const m of atlas.metrics) if (typeof m.value === 'number') assert.ok(m.sourceIds.length && m.sourceIds.every(id => atlas.sources.some(s => s.id === id && s.claimReview === 'qualified')));
});
test('Production publication fails closed, including when CI or development flags are supplied', () => {
  assert.equal(economyAtlasAvailable({VERCEL_ENV: 'production'}), false);
  assert.equal(economyAtlasAvailable({VERCEL_ENV: 'production', CI: 'true', ECONOMY_ATLAS_QA: 'true', NODE_ENV: 'development'}), false);
  assert.equal(economyAtlasAvailable({VERCEL_ENV: 'production', ECONOMY_ATLAS_RELEASED: 'false'}), false);
  assert.equal(economyAtlasAvailable({VERCEL_ENV: 'production', ECONOMY_ATLAS_RELEASED: 'true'}), true);
  assert.equal(economyAtlasAvailable({VERCEL_ENV: 'preview'}), true);
  assert.equal(economyAtlasAvailable({NODE_ENV: 'production', ECONOMY_ATLAS_QA: 'true'}), false);
  assert.equal(economyAtlasAvailable({NODE_ENV: 'production', CI: 'true', ECONOMY_ATLAS_QA: 'true'}), true);
  assert.equal(economyAtlasAvailable({NODE_ENV: 'development'}), true);
});
test('Stale and future-dated sources never receive a current freshness label', () => {
  assert.equal(sourceFreshness('2026-10-01', 30, new Date('2026-10-02')), 'current');
  assert.equal(sourceFreshness('2026-10-01', 30, new Date('2026-12-02')), 'stale');
  assert.equal(sourceFreshness('2026-10-04', 30, new Date('2026-10-02')), 'unknown');
  assert.equal(sourceFreshness('2026-10-01', 30, new Date('invalid')), 'unknown');
});
