import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()

test('learning discovery and Academy pattern routes exist', () => {
  const requiredPages = [
    'app/learn/page.tsx',
    'app/courses/page.tsx',
    'app/ai-architect-academy/page.tsx',
    'app/ai-architect-academy/patterns/page.tsx',
  ]

  for (const page of requiredPages) {
    assert.equal(fs.existsSync(path.join(root, page)), true, `${page} must exist`)
  }
})

test('legacy Academy paths resolve to the canonical Academy route', () => {
  const redirects = JSON.parse(
    fs.readFileSync(path.join(root, 'data/redirect-aliases.json'), 'utf8'),
  )

  for (const alias of [
    '/academy',
    '/aiarchitectacademy',
    '/ar-architect-academy',
    '/architect-academy',
  ]) {
    assert.equal(
      redirects.aliases[alias],
      '/ai-architect-academy',
      `${alias} must resolve to /ai-architect-academy`,
    )
  }
})

test('retired signal entry resolves to the maintained architecture field guide', () => {
  const redirects = JSON.parse(
    fs.readFileSync(path.join(root, 'data/redirect-aliases.json'), 'utf8'),
  )

  assert.equal(redirects.aliases['/signal'], '/ai-architecture')
  assert.equal(
    fs.existsSync(path.join(root, 'app/ai-architecture/page.tsx')),
    true,
    'the /signal destination must remain a real page',
  )
})

test('course recommendations never fabricate an affiliate destination', () => {
  const catalog = fs.readFileSync(path.join(root, 'data/learning-catalog.ts'), 'utf8')

  assert.match(catalog, /affiliateUrl\?: string/)
  assert.doesNotMatch(catalog, /affiliateUrl:\s*['"]/)
  assert.match(catalog, /relationship: 'editorial'/)
})
