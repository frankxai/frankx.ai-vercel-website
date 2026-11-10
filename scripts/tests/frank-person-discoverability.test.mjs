import assert from 'node:assert/strict'
import test from 'node:test'
import { buildFrankPerson } from '../../lib/frank-person.ts'
import { checkDiscoveryHtml, parseJsonLd, canonicalOrigin } from '../check-frankx-discoverability.mjs'

const person = buildFrankPerson(canonicalOrigin)
const html = (pathname, records) => `<link rel="canonical" href="${canonicalOrigin}${pathname}"/>` +
  records.map((record) => `<script type="application/ld+json">${JSON.stringify(record)}</script>`).join('')

test('the October 30 bio inconsistency fails the rendered identity check', () => {
  const oldPerson = { ...person, '@id': undefined, url: `${canonicalOrigin}/bio`,
    birthPlace: { '@type': 'Place', name: 'Volga German diaspora' } }
  assert.throws(() => checkDiscoveryHtml(html('/bio', [person, oldPerson]), '/bio'))
})

test('same-ID records with conflicting titles fail instead of silently merging', () => {
  assert.throws(() => checkDiscoveryHtml(html('/media-kit', [person,
    { ...person, jobTitle: 'AI Architect & Founder' }]), '/media-kit'))
})

test('the profile can repeat one consistent person in a site graph and mainEntity', () => {
  const result = checkDiscoveryHtml(html('/frank-riemer', [
    { '@graph': [person] }, { '@type': 'ProfilePage', mainEntity: person },
  ]), '/frank-riemer')
  assert.equal(result.personRecords, 2)
  assert.equal(result.personId, person['@id'])
})

test('distinct bio and media-kit reader jobs retain their own canonical URLs', () => {
  for (const pathname of ['/bio', '/media-kit']) {
    assert.equal(checkDiscoveryHtml(html(pathname, [person]), pathname).canonical, `${canonicalOrigin}${pathname}`)
    assert.throws(() => checkDiscoveryHtml(html('/frank-riemer', [person]), pathname))
  }
})

test('only actual JSON-LD script blocks count as entity evidence', () => {
  assert.deepEqual(parseJsonLd('<p>Frank Riemer</p><script>console.log("Person")</script>'), [])
  assert.throws(() => checkDiscoveryHtml(html('/bio', []), '/bio'))
})

test('noindex is rejected regardless of robots meta attribute order', () => {
  for (const tag of ['<meta name="robots" content="noindex,follow">',
    '<meta content="noindex,follow" name="robots">', '<meta content="none" name="googlebot">']) {
    assert.throws(() => checkDiscoveryHtml(html('/bio', [person]) + tag, '/bio'))
  }
})
