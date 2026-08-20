import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const source = new URL('../data/changelog-updates.json', import.meta.url)
const data = JSON.parse(await readFile(source, 'utf8'))
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

assert.equal(data.schemaVersion, '1.0', 'Unsupported changelog schemaVersion')
assert.match(data.updatedAt, ISO_DATE, 'updatedAt must use YYYY-MM-DD')
assert.ok(Array.isArray(data.updates) && data.updates.length > 0, 'At least one update is required')

const slugs = new Set()
let previousRelease = '9999-12-31'

for (const [index, update] of data.updates.entries()) {
  const prefix = `updates[${index}]`
  assert.match(update.slug, SLUG, `${prefix}.slug must be URL-safe`)
  assert.ok(!slugs.has(update.slug), `${prefix}.slug must be unique`)
  slugs.add(update.slug)

  for (const field of ['releasedAt', 'publishedAt', 'modifiedAt']) {
    assert.match(update[field], ISO_DATE, `${prefix}.${field} must use YYYY-MM-DD`)
  }
  assert.ok(update.releasedAt <= previousRelease, 'Updates must be sorted newest release first')
  assert.ok(update.releasedAt <= data.updatedAt, `${prefix}.releasedAt cannot be in the future`)
  assert.ok(update.publishedAt <= update.modifiedAt, `${prefix}.modifiedAt cannot predate publication`)
  previousRelease = update.releasedAt

  for (const field of ['title', 'summary', 'category', 'audience']) {
    assert.ok(typeof update[field] === 'string' && update[field].trim(), `${prefix}.${field} is required`)
  }
  assert.ok(Array.isArray(update.highlights) && update.highlights.length >= 2, `${prefix} needs at least two highlights`)
  assert.ok(Array.isArray(update.proof) && update.proof.length > 0, `${prefix} needs public proof`)

  for (const [proofIndex, proof] of update.proof.entries()) {
    assert.ok(proof.label?.trim(), `${prefix}.proof[${proofIndex}].label is required`)
    const url = new URL(proof.url)
    assert.equal(url.protocol, 'https:', `${prefix}.proof[${proofIndex}] must use HTTPS`)
    assert.equal(url.hostname, 'github.com', `${prefix}.proof[${proofIndex}] must point to public GitHub evidence`)
  }
}

console.log(`Changelog contract passed: ${data.updates.length} releases, ${slugs.size} unique slugs.`)
