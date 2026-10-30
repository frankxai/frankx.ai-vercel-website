import assert from 'node:assert/strict'
import { pathToFileURL } from 'node:url'

export const canonicalOrigin = 'https://www.frankx.ai'
export const discoveryPaths = ['/frank-riemer', '/bio', '/media-kit', '/ai-architecture']

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1]
}

export function parseJsonLd(html) {
  return [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => JSON.parse(match[1]))
}

function objects(value) {
  if (!value || typeof value !== 'object') return []
  return [value, ...Object.values(value).flatMap(objects)]
}

export function checkDiscoveryHtml(html, pathname) {
  const canonical = [...html.matchAll(/<link\b[^>]*>/gi)]
    .filter(([tag]) => attribute(tag, 'rel') === 'canonical')
    .map(([tag]) => attribute(tag, 'href'))
  assert.deepEqual(canonical, [`${canonicalOrigin}${pathname}`], 'keep each page self-canonical')
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    if (/^(robots|googlebot|bingbot)$/i.test(attribute(tag, 'name') || '')) {
      assert.doesNotMatch(attribute(tag, 'content') || '', /\b(noindex|none)\b/i)
    }
  }

  const records = parseJsonLd(html).flatMap(objects)
  const people = records.filter((record) => record['@type'] === 'Person' && record.name === 'Frank Riemer')
  assert.ok(people.length, 'Frank must be described in the initial HTML')
  const fields = ['@id', 'name', 'alternateName', 'jobTitle', 'url', 'image', 'sameAs', 'homeLocation', 'knowsAbout']
  const identity = (person) => Object.fromEntries(fields.map((field) => [field, person[field]]))
  for (const person of people) {
    assert.equal(person['@id'], `${canonicalOrigin}/#frank-riemer`, 'one stable Person identifier')
    assert.equal(person.url, `${canonicalOrigin}/frank-riemer`, 'one preferred person page')
    assert.equal(person.jobTitle, 'AI Architect')
    assert.equal(person.birthPlace, undefined, 'a diaspora is not a verified birthplace')
    assert.ok(person.sameAs?.includes('https://github.com/frankxai'))
    assert.deepEqual(identity(person), identity(people[0]), 'duplicate Person descriptions must agree')
  }

  if (pathname === '/frank-riemer') {
    assert.ok(records.some((record) => record['@type'] === 'ProfilePage' &&
      record.mainEntity?.['@id'] === people[0]['@id']), 'the profile identifies its main person')
  }
  if (pathname === '/ai-architecture') {
    assert.ok(records.some((record) => record['@id'] === `${canonicalOrigin}/ai-architecture#page` &&
      record.author?.['@id'] === people[0]['@id']), 'the topic page identifies its author')
    assert.match(html, /href=["']\/frank-riemer["']/)
    assert.match(html, /href=["']\/media-kit["']/)
  }
  return { pathname, canonical: canonical[0], personId: people[0]['@id'], personRecords: people.length }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const baseUrl = process.env.DISCOVERY_BASE_URL || canonicalOrigin
  const results = []
  for (const pathname of discoveryPaths) {
    const response = await fetch(new URL(pathname, baseUrl), { signal: AbortSignal.timeout(30_000) })
    assert.equal(response.status, 200, `${pathname} must serve successfully`)
    // Preview deployments intentionally carry noindex headers.
    if (new URL(baseUrl).origin === canonicalOrigin) {
      assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /\b(noindex|none)\b/i)
    }
    results.push(checkDiscoveryHtml(await response.text(), pathname))
  }
  console.log(JSON.stringify({ checkedAt: new Date().toISOString(), baseUrl, results }, null, 2))
}
