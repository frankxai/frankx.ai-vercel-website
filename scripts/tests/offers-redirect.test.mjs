import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import nextConfig from '../../next.config.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

test('next.config.mjs permanently redirects /offers to /products (HTTP 308)', async () => {
  const redirects = await nextConfig.redirects()
  const matches = redirects.filter((entry) => entry.source === '/offers')

  assert.equal(matches.length, 1, 'expected exactly one /offers redirect entry')
  assert.deepEqual(matches[0], {
    source: '/offers',
    destination: '/products',
    permanent: true,
  })
  assert.equal(
    existsSync(path.join(ROOT, 'app', 'products', 'page.tsx')),
    true,
    'expected destination route app/products/page.tsx to exist',
  )
})
