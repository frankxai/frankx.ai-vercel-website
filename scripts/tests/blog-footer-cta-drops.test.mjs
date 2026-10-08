import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const cta = readFileSync(new URL('../../components/blog/BlogFooterCTA.tsx', import.meta.url), 'utf8')

test('blog footer CTA no longer promotes the Inner Circle as a live community', () => {
  assert.ok(!cta.includes("href: '/inner-circle'"))
  assert.ok(!cta.includes('Weekly office hours, shared resources, direct access'))
  assert.ok(!cta.includes('Join the builder community'))
})

test('blog footer CTA no longer links the coming-soon architecture templates', () => {
  assert.ok(!cta.includes("href: '/ai-architecture/templates'"))
  assert.ok(!cta.includes('Download AI architecture templates'))
})

test('blog footer CTA keeps the start card and a grid without empty columns', () => {
  assert.ok(cta.includes("href: '/start'"))
  assert.ok(!cta.includes('md:grid-cols-3'))
})
