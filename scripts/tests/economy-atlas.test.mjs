import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { defaultScenario, calculateScenario, validScenario, parseSelection, serializeSelection, restoreSelection, sourceFreshness } from '../../lib/research/economy.ts';
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
test('Stale and future-dated sources never receive a current freshness label', () => {
  assert.equal(sourceFreshness('2026-10-01', 30, new Date('2026-10-02')), 'current');
  assert.equal(sourceFreshness('2026-10-01', 30, new Date('2026-12-02')), 'stale');
  assert.equal(sourceFreshness('2026-10-04', 30, new Date('2026-10-02')), 'unknown');
});
