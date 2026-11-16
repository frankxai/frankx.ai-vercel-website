import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { isPublicRendition, resolvePublicRendition, validatePackageContent } from '../../lib/founder-identity/contracts.ts'

const hash = 'a'.repeat(64)
const fixture = () => ({ id: 'test-fixture', characterId: 'host.frank', sourceSha256: 'b'.repeat(64), sha256: hash,
  src: `/images/founder-identity/${hash}.webp`, width: 384, height: 384, alt: 'Mini Frank, the illustrated founder likeness',
  identityStatus: 'canonical', rights: 'owned', rightsEvidenceRef: 'test-only-rights', release: { status: 'approved', approvedSha256: hash, decisionRef: 'test-only-decision' },
  brands: ['frankx'], placements: ['signature'] })

test('publication requires exact release, rights, identity, brand and placement', () => {
  assert.equal(isPublicRendition(fixture(), 'frankx', 'signature'), true)
  for (const patch of [
    { identityStatus: 'proposal' }, { identityStatus: 'rejected' }, { rights: 'pending' }, { rightsEvidenceRef: null },
    { release: { status: 'pending', approvedSha256: hash, decisionRef: 'test' } },
    { release: { status: 'approved', approvedSha256: 'c'.repeat(64), decisionRef: 'test' } },
    { release: { status: 'approved', approvedSha256: hash, decisionRef: null } },
    { src: 'https://drive.google.com/private.png' }, { src: '//example.com/private.png' },
    { width: 0 }, { height: NaN }, { alt: '' }, { sourceSha256: 'unknown' },
  ]) assert.equal(isPublicRendition({ ...fixture(), ...patch }, 'frankx', 'signature'), false, JSON.stringify(patch))
  assert.equal(isPublicRendition(fixture(), 'arcanea', 'signature'), false)
  assert.equal(isPublicRendition(fixture(), 'frankx', 'presence'), false)
})

test('missing or ambiguous assets fail closed', () => {
  const manifest = { schemaVersion: 1, characterId: 'host.frank', publicRenditions: [fixture()] }
  assert.equal(resolvePublicRendition(manifest, 'missing', 'frankx', 'signature'), null)
  assert.equal(resolvePublicRendition(manifest, undefined, 'frankx', 'signature'), null)
  assert.equal(resolvePublicRendition({ ...manifest, publicRenditions: [fixture(), fixture()] }, 'test-fixture', 'frankx', 'signature'), null)
})

test('every public release has an existing, byte-verified local rendition', () => {
  const manifest = JSON.parse(readFileSync(new URL('../../data/founder-identity.release.json', import.meta.url)))
  const ids = new Set()
  for (const asset of manifest.publicRenditions) {
    assert.equal(ids.has(asset.id), false, `Duplicate ${asset.id}`)
    ids.add(asset.id)
    assert.ok(asset.brands.length && asset.placements.length)
    for (const brand of asset.brands) for (const placement of asset.placements) assert.ok(isPublicRendition(asset, brand, placement))
    const file = new URL(`../../public${asset.src}`, import.meta.url)
    assert.ok(existsSync(file), `Missing ${asset.id}`)
    assert.equal(createHash('sha256').update(readFileSync(file)).digest('hex'), asset.sha256)
  }
})

test('package guidance refuses missing evidence, limitations and ambiguous pricing', () => {
  const pack = { id: 'example', name: 'Example', audience: null, includes: [], limitations: ['Waitlist only.'],
    availability: 'waitlist', price: null, evidenceRef: 'test-catalogue', detailsHref: '/products/example' }
  assert.deepEqual(validatePackageContent(pack), [])
  for (const patch of [{ evidenceRef: '' }, { limitations: [] }, { detailsHref: '//unsafe.test' }, { price: { display: '€49', cadence: '' } }]) {
    assert.ok(validatePackageContent({ ...pack, ...patch }).length)
  }
})
