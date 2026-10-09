import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { hasOpenWeights, resolveModelPricing, tokenCost } from '../../lib/llm-hub/pricing.ts'

const registry = JSON.parse(readFileSync(new URL('../../data/model-registry.json', import.meta.url), 'utf8'))

test('legacy weight availability is not a zero-dollar inference offer', () => {
  const model = registry.models['gpt-oss']
  assert.equal(hasOpenWeights(model), true)
  const price = resolveModelPricing(model)
  assert.equal(price.input, null)
  assert.equal(price.output, null)
  assert.equal(price.source, 'unknown')
  assert.equal(tokenCost(price.input, price.output, 10, 2), null)
})

test('open weights remain open when hosted inference has a price', () => {
  for (const id of ['deepseek-v4', 'deepseek-v4-pro-0813', 'kimi-k2-6', 'mistral-large-3']) {
    const model = registry.models[id]
    assert.equal(hasOpenWeights(model), true, id)
    assert.ok(resolveModelPricing(model).input > 0, id)
  }
})

test('upstream zero is valid and retains the actual observation date', () => {
  const price = resolveModelPricing(registry.models['gpt-oss'], {
    inputPer1m: 0, outputPer1m: 0, source: 'openrouter', fetchedAt: '2026-09-09T12:00:00.000Z',
  })
  assert.equal(price.input, 0)
  assert.equal(price.output, 0)
  assert.equal(price.source, 'openrouter')
  assert.equal(price.observedAt, '2026-09-09T12:00:00.000Z')
  assert.equal(tokenCost(price.input, price.output, 10, 2), 0)
})

test('missing observation dates stay unknown and fine-grained prices survive', () => {
  const price = resolveModelPricing(registry.models['gpt-6-astra'], {
    inputPer1m: 0.004, outputPer1m: 0.008, source: 'openrouter', fetchedAt: null,
  })
  assert.equal(price.input, 0.004)
  assert.equal(price.observedAt, null)
  assert.equal(price.verifiedAt, null)
  assert.equal(tokenCost(price.input, price.output, 10, 2), 0.056)
})

test('estimates reject unknown, negative and non-finite rates or volumes', () => {
  assert.equal(tokenCost(2, 10, 10, 2), 40)
  for (const invalid of [null, NaN, Infinity, -1]) {
    assert.equal(tokenCost(invalid, 10, 10, 2), null)
    assert.equal(tokenCost(2, invalid, 10, 2), null)
  }
  assert.equal(tokenCost(2, 10, -1, 2), null)
  assert.equal(tokenCost(2, 10, 10, Infinity), null)
})

test('an unrun suite does not link a private repository as public evidence', () => {
  const astra = registry.models['gpt-6-astra']
  assert.equal(astra.evaluation.status, 'not_run')
  assert.equal(astra.evaluation.measured_cases, 0)
  assert.equal(astra.evaluation.evidence_url, null)
  assert.ok(astra.sources.every(url => !url.includes('frankxai/llm-evals')))
})


test('image rates cannot become generic text estimates or live price attestations', () => {
  for (const id of ['gpt-image-2-5-flare', 'gpt-image-2-5-sunburst']) {
    const model = registry.models[id]
    const price = resolveModelPricing(model, {
      inputPer1m: 5, outputPer1m: 30, source: 'openrouter', fetchedAt: '2026-09-10T12:00:00.000Z',
    })
    assert.equal(price.input, null)
    assert.equal(price.output, null)
    assert.equal(price.source, 'unknown')
    assert.equal(price.observedAt, null)
    assert.equal(price.sourceUrl, null)
    assert.match(price.scope, /imagePricing/)
    assert.equal(tokenCost(price.input, price.output, 10, 2), null)
    assert.equal(model.image_pricing.image_output, 30)
  }
})

const source = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')

test('every creator-stack model link resolves to a registry entry (no /llm-hub/gemini-omni 404)', () => {
  const ids = [...source('lib/llm-hub/creator-stacks.ts').matchAll(/modelId:\s*'([^']+)'/g)].map((m) => m[1])
  assert.ok(ids.length > 0)
  for (const id of ids) assert.ok(registry.models[id], `creator-stack modelId ${id} has no registry entry`)
  assert.ok(!ids.includes('gemini-omni') || registry.models['gemini-omni'])
})

test('cost-calculator examples are registry models with registry token rates', () => {
  const block = source('components/llm-hub/CostCalculator.tsx').match(/CALCULATOR_IDS = new Set\(\[([\s\S]*?)\]\)/)
  assert.ok(block)
  const ids = [...block[1].matchAll(/'([^']+)'/g)].map((m) => m[1])
  for (const id of ids) {
    const model = registry.models[id]
    assert.ok(model, `calculator id ${id} is not in the registry`)
    assert.notEqual(model.status, 'superseded', id)
    assert.equal(typeof model.pricing?.input_per_1m, 'number', id)
    assert.equal(typeof model.pricing?.output_per_1m, 'number', id)
  }
})

test('research lab tiles name a logo-less lab once and date checks from the registry', () => {
  const watch = source('app/research/research-model-watch.tsx')
  assert.doesNotMatch(watch, /sr-only">\s*\{lab\.name\}/)
  assert.doesNotMatch(watch, /\b\d{1,2} (January|February|March|April|May|June|July|August|September|October|November|December) 20\d\d\b/)
  assert.match(watch, /last_verified/)
})

test('research hub does not render a zero registered-sources count', () => {
  const hub = source('app/research/research-hub-client.tsx')
  assert.match(hub, /\{totalSources > 0 && \(\s*<Link\s+href="\/research\/sources"/)
  assert.match(hub, /totalSources > 0\s*\?\s*\[\{ label: 'Published sources'/)
})

test('no unsourced throughput or fastest-in-class claims for Grok 4.3', () => {
  for (const path of ['lib/llm-hub/comparisons.ts', 'data/model-registry.json']) {
    const text = source(path)
    assert.doesNotMatch(text, /181 tok/, path)
    assert.doesNotMatch(text, /fastest in its class/, path)
    assert.doesNotMatch(text, /fastest throughput in (its )?class/, path)
  }
})

test('a newly linked model page carries no unsourced editorial verdict', () => {
  const editorial = source('lib/llm-hub/editorial.ts')
  assert.doesNotMatch(editorial, /'gemini-omni-flash':/)
  assert.doesNotMatch(source('lib/llm-hub/comparisons.ts'), /Latency-sensitive products/)
})
