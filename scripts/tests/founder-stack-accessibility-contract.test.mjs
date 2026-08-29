import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import {
  founderLayers,
  founderStackQuestions,
  scoreFounderStack,
} from '../../lib/founder-stack.ts'

const readRepoFile = (path) =>
  readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

function answersFor(layerValues) {
  return Object.fromEntries(
    founderStackQuestions.map((question) => [
      question.id,
      layerValues[question.layer],
    ]),
  )
}

test('all-equal answers return no clear constraint instead of defaulting to State', () => {
  const result = scoreFounderStack(
    answersFor({ state: 3, signal: 3, systems: 3, scale: 3, stewardship: 3 }),
  )

  assert.equal(result.constraint, null)
  assert.deepEqual(
    result.tiedConstraints.map((layer) => layer.key),
    founderLayers.map((layer) => layer.key),
  )
})

test('all-perfect answers return no clear constraint', () => {
  const result = scoreFounderStack(
    answersFor({ state: 5, signal: 5, systems: 5, scale: 5, stewardship: 5 }),
  )

  assert.equal(result.overall, 100)
  assert.equal(result.phase, 'Compound')
  assert.equal(result.constraint, null)
  assert.equal(result.tiedConstraints.length, founderLayers.length)
})

test('a mixed tie reports every lowest layer without selecting State', () => {
  const result = scoreFounderStack(
    answersFor({ state: 2, signal: 2, systems: 3, scale: 4, stewardship: 5 }),
  )

  assert.equal(result.constraint, null)
  assert.deepEqual(
    result.tiedConstraints.map((layer) => layer.key),
    ['state', 'signal'],
  )
})

test('a unique lowest layer remains a clear constraint', () => {
  const result = scoreFounderStack(
    answersFor({ state: 4, signal: 4, systems: 2, scale: 4, stewardship: 4 }),
  )

  assert.equal(result.constraint?.key, 'systems')
  assert.deepEqual(
    result.tiedConstraints.map((layer) => layer.key),
    ['systems'],
  )
})

test('nested founder routes keep semantic main landmarks without duplicating the global id', async () => {
  for (const path of [
    'components/home/FounderHome.tsx',
    'app/founder-stack/page.tsx',
    'app/start/page.tsx',
    'app/founders-circle/apply/page.tsx',
    'app/inner-circle/page.tsx',
    'app/inner-circle/vault-preview/page.tsx',
    'app/products/(index)/page.tsx',
  ]) {
    const source = await readRepoFile(path)
    assert.match(source, /<main\b/, `${path} must keep its semantic main landmark`)
    assert.doesNotMatch(
      source,
      /<main\b[^>]*\bid=["']main["']/,
      `${path} must leave id=main to app/layout.tsx`,
    )
  }
})

test('assessment transitions announce and focus the new question or result', async () => {
  const source = await readRepoFile(
    'components/founder-stack/FounderStackAssessment.tsx',
  )

  assert.match(source, /questionHeadingRef\.current\?\.focus\(\)/)
  assert.match(source, /resultHeadingRef\.current\?\.focus\(\)/)
  assert.match(source, /aria-live="polite" aria-atomic="true"/)
  assert.match(source, /ref=\{questionHeadingRef\}[\s\S]*tabIndex=\{-1\}/)
  assert.match(source, /ref=\{resultHeadingRef\}[\s\S]*tabIndex=\{-1\}/)
})
