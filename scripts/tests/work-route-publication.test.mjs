import assert from 'node:assert/strict'
import test from 'node:test'
import {
  findPublicEngagement,
  listPublicEngagements,
} from '../../content/work/index.ts'

const engagements = [
  { slug: 'live-fixture', status: 'live' },
  { slug: 'past-fixture', status: 'past' },
  { slug: 'draft-fixture', status: 'draft' },
  { slug: 'private-fixture', status: 'private' },
]

test('work route params contain only explicitly public fixtures', () => {
  assert.deepEqual(
    listPublicEngagements(engagements).map(({ slug }) => ({ slug })),
    [{ slug: 'live-fixture' }, { slug: 'past-fixture' }],
  )
})

test('public work metadata cannot disclose draft or private fixtures', () => {
  const publicSlugs = listPublicEngagements(engagements).map(({ slug }) => slug)

  assert.equal(publicSlugs.includes('draft-fixture'), false)
  assert.equal(publicSlugs.includes('private-fixture'), false)
})

test('valid live and past work slugs resolve', () => {
  assert.equal(
    findPublicEngagement(engagements, 'live-fixture')?.slug,
    'live-fixture',
  )
  assert.equal(
    findPublicEngagement(engagements, 'past-fixture')?.slug,
    'past-fixture',
  )
})

test('draft, private, missing, and invalid work slugs fail closed', () => {
  for (const slug of [
    'draft-fixture',
    'private-fixture',
    'missing-fixture',
    '../draft-fixture',
  ]) {
    assert.equal(findPublicEngagement(engagements, slug), undefined, slug)
  }
})
