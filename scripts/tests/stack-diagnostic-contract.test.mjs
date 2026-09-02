// Contract test for the knowledge-to-offer graph, the ceiling -> offer router, and the
// portable architecture brief.
//
// Run: node --experimental-strip-types --test scripts/tests/stack-diagnostic-contract.test.mjs
//
// The assertions that matter are the doctrine ones. A graph that merely type-checks can
// still route a visitor to a 1:1 engagement the business does not offer, or to a checkout
// for a product whose gate is failing. Those are the two failures this file exists to stop.

import test from 'node:test'
import assert from 'node:assert/strict'

import {
  NODES,
  METHODS,
  ARTIFACTS,
  PRODUCTS,
  getMethodForDimension,
  getArtifact,
  getProduct,
} from '../../lib/graph/knowledge-offer.ts'
import { DIMENSIONS, CEILINGS, TIERS, scoreScorecard, QUESTIONS } from '../../lib/scorecard/engine.ts'
import { routeOffer } from '../../lib/diagnostic/route-offer.ts'
import { buildBrief } from '../../lib/diagnostic/brief.ts'
import { WAITLIST_INTENT_LABELS } from '../../lib/diagnostic/waitlist-intents.ts'

/** Surfaces that sell Frank's time. TRUTH.md §2 rules these out as a business model. */
const ONE_TO_ONE_ROUTES = ['/workshops/personal-ai-coe', '/coaching', '/call', '/book-a-call', '/consulting']

/** Counts previously published on the site that TRUTH.md §3 contradicts. */
const FABRICATED_NUMBERS = ['12,000', '5,000+', '1,000+', '130+ prompts', '456 followers']

function resultForDimension(dimension) {
  // Answer every question at max points except the target dimension's, which scores zero.
  // That makes the target the lowest-scoring dimension, i.e. the named ceiling.
  const answers = {}
  for (const q of QUESTIONS) {
    if (q.dimension === dimension) continue
    const best = q.options.reduce((a, b) => (b.points > a.points ? b : a))
    answers[q.id] = best.id
  }
  return scoreScorecard(answers)
}

test('every node carries owner, provenance, version, visibility and an evaluation rule', () => {
  for (const node of NODES) {
    assert.ok(node.owner, `${node.id} has no owner`)
    assert.ok(node.provenance?.source, `${node.id} has no provenance source`)
    assert.match(node.provenance.measuredAt, /^\d{4}-\d{2}-\d{2}$/, `${node.id} measuredAt is not an ISO date`)
    assert.match(node.version, /^\d+\.\d+\.\d+$/, `${node.id} version is not semver`)
    assert.ok(['public', 'internal'].includes(node.visibility), `${node.id} visibility invalid`)
    assert.ok(node.evaluation.length > 20, `${node.id} evaluation rule is too thin to check`)
  }
})

test('node ids are unique', () => {
  const ids = NODES.map((n) => n.id)
  assert.equal(new Set(ids).size, ids.length)
})

test('exactly one method closes each scorecard dimension', () => {
  const dimensionIds = DIMENSIONS.map((d) => d.id)
  const closed = METHODS.map((m) => m.closesDimension)
  assert.deepEqual([...closed].sort(), [...dimensionIds].sort())
  assert.equal(new Set(closed).size, closed.length)
})

test('every method edge resolves to a node of the right kind', () => {
  for (const method of METHODS) {
    assert.ok(method.artifacts.length > 0, `${method.id} offers no free next step`)
    for (const id of method.artifacts) assert.ok(getArtifact(id), `${method.id} -> missing artifact ${id}`)
    for (const id of method.products) assert.ok(getProduct(id), `${method.id} -> missing product ${id}`)
  }
})

test('artifact hrefs are site-relative and never a 1:1 engagement', () => {
  for (const artifact of ARTIFACTS) {
    assert.match(artifact.href, /^\/[a-z0-9-/]*$/, `${artifact.id} href is not a clean site path`)
    assert.ok(!ONE_TO_ONE_ROUTES.includes(artifact.href), `${artifact.id} routes to a 1:1 surface`)
  }
})

test('no ceiling routes a visitor to a 1:1 engagement', () => {
  for (const dimension of DIMENSIONS.map((d) => d.id)) {
    const route = routeOffer(resultForDimension(dimension))
    const hrefs = [route.freeNext.href, route.offer?.href].filter(Boolean)
    for (const href of hrefs) {
      assert.ok(
        !ONE_TO_ONE_ROUTES.some((banned) => href.startsWith(banned)),
        `ceiling ${dimension} routes to ${href}`,
      )
    }
  }
})

test('only a gate PASS may route to checkout', () => {
  for (const product of PRODUCTS) {
    const method = METHODS.find((m) => m.products.includes(product.id))
    if (!method) continue
    const route = routeOffer(resultForDimension(method.closesDimension))
    if (!route.offer) continue
    if (product.gate === 'PASS') {
      assert.equal(route.offer.kind, 'checkout')
    } else {
      assert.equal(route.offer.kind, 'waitlist', `${product.id} has gate ${product.gate} but routes to checkout`)
      assert.ok(route.offer.href.startsWith('/waitlist?intent='))
    }
  }
})

test('every routable waitlist intent has a label on the waitlist page', () => {
  for (const dimension of DIMENSIONS.map((d) => d.id)) {
    const route = routeOffer(resultForDimension(dimension))
    if (route.offer?.kind !== 'waitlist') continue
    assert.ok(
      WAITLIST_INTENT_LABELS[route.offer.productId],
      `intent ${route.offer.productId} would land on an unlabelled waitlist`,
    )
  }
})

test('every ceiling produces a complete, resolvable route', () => {
  for (const dimension of Object.keys(CEILINGS)) {
    const route = routeOffer(resultForDimension(dimension))
    assert.ok(route.methodId)
    assert.ok(route.practice.length > 20)
    assert.ok(route.freeNext.href.startsWith('/'))
  }
})

test('the brief is deterministic for a given result and timestamp', () => {
  const result = resultForDimension('distribution')
  const a = buildBrief(result, '2026-09-02')
  const b = buildBrief(result, '2026-09-02')
  assert.equal(a.markdown, b.markdown)
  assert.deepEqual(a.json, b.json)
})

test('the brief restates only the visitor own answers and graph copy', () => {
  for (const dimension of DIMENSIONS.map((d) => d.id)) {
    const result = resultForDimension(dimension)
    const { markdown, json } = buildBrief(result, '2026-09-02')

    assert.ok(markdown.includes(result.tier.label))
    assert.ok(markdown.includes(result.ceiling.name))
    for (const action of result.ceiling.actions) assert.ok(markdown.includes(action))
    assert.equal(json.score.total, result.totalScore)
    assert.equal(json.dimensions.length, DIMENSIONS.length)

    for (const bad of FABRICATED_NUMBERS) {
      assert.ok(!markdown.includes(bad), `brief for ${dimension} carries a fabricated count: ${bad}`)
    }
  }
})

test('a perfect score and an empty score both route somewhere real', () => {
  const empty = scoreScorecard({})
  assert.equal(empty.tier.id, TIERS[0].id)
  assert.ok(routeOffer(empty).freeNext.href.startsWith('/'))

  const perfect = {}
  for (const q of QUESTIONS) {
    perfect[q.id] = q.options.reduce((a, b) => (b.points > a.points ? b : a)).id
  }
  const top = scoreScorecard(perfect)
  assert.equal(top.totalScore, 100)
  assert.ok(routeOffer(top).offer?.href.startsWith('/waitlist?intent='))
})
