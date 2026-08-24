import assert from 'node:assert/strict'
import test from 'node:test'

import { collectText, slugifyHeading } from '../../lib/heading-id.ts'

test('slugifyHeading produces stable jump targets', () => {
  assert.equal(
    slugifyHeading('Which AI agents are actually worth evaluating in August 2026?'),
    'which-ai-agents-are-actually-worth-evaluating-in-august-2026',
  )
  assert.equal(slugifyHeading('FAQ'), 'faq')
  assert.equal(slugifyHeading('  ChatGPT Work  '), 'chatgpt-work')
})

test('collectText walks nested children without requiring a renderer', () => {
  assert.equal(collectText('Plain'), 'Plain')
  assert.equal(collectText(['How ', 'much', '?']), 'How much?')
  assert.equal(
    collectText({ props: { children: ['Is Mira ', { props: { children: 'better' } }, '?'] } }),
    'Is Mira better?',
  )
})
