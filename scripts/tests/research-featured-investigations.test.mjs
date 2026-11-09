import test from 'node:test'
import assert from 'node:assert/strict'
import { featuredInvestigations, publishedInvestigations } from '../../lib/research/featured-investigations.ts'

const hrefs = (list) => list.map((item) => item.href)

test('production hides the economic atlas until its release flag is set', () => {
  const published = hrefs(publishedInvestigations({ VERCEL_ENV: 'production' }))
  assert.ok(!published.includes('/research/economy'))
  assert.equal(published.length, featuredInvestigations.length - 1)
})

test('production shows the economic atlas once released', () => {
  const published = hrefs(publishedInvestigations({ VERCEL_ENV: 'production', ECONOMY_ATLAS_RELEASED: 'true' }))
  assert.ok(published.includes('/research/economy'))
})

test('every ungated featured investigation is always published', () => {
  const published = hrefs(publishedInvestigations({ VERCEL_ENV: 'production' }))
  for (const item of featuredInvestigations.filter((entry) => !entry.release)) {
    assert.ok(published.includes(item.href), item.href)
  }
})
