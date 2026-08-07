import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import test from 'node:test'

const repoUrl = new URL('../../', import.meta.url)
const repoFile = (path) => new URL(path, repoUrl)

const magnets = JSON.parse(await readFile(repoFile('data/lead-magnets.json'), 'utf8'))
const published = magnets.filter((m) => m.status === 'published')

// A hand-rolled stub PDF from the incident that prompted this test was 715 bytes.
// Anything near that size is a placeholder, not a deliverable.
const MIN_PDF_BYTES = 20_000
// A 1x1 transparent PNG is 70 bytes.
const MIN_COVER_BYTES = 2_000

test('every lead magnet declares a known status', () => {
  for (const m of magnets) {
    assert.ok(['published', 'pending'].includes(m.status), `${m.id} has invalid status "${m.status}"`)
    if (m.status === 'pending') {
      assert.ok(m.blocker, `pending magnet ${m.id} must state a blocker`)
      assert.equal(m.pdfUrl, undefined, `pending magnet ${m.id} must not advertise a pdfUrl`)
    }
  }
})

test('published lead magnets ship a real PDF', async () => {
  for (const m of published) {
    assert.ok(m.pdfUrl, `${m.id} is published but has no pdfUrl`)
    const file = repoFile(`public${m.pdfUrl}`)
    assert.ok(existsSync(file), `${m.id}: missing ${m.pdfUrl}`)
    const { size } = await stat(file)
    assert.ok(size >= MIN_PDF_BYTES, `${m.id}: ${m.pdfUrl} is ${size} bytes — looks like a placeholder stub`)
  }
})

test('published lead magnets ship a real cover image', async () => {
  for (const m of published) {
    const file = repoFile(`public${m.coverImage}`)
    assert.ok(existsSync(file), `${m.id}: missing ${m.coverImage}`)
    const { size } = await stat(file)
    assert.ok(size >= MIN_COVER_BYTES, `${m.id}: ${m.coverImage} is ${size} bytes — looks like a 1x1 placeholder`)
  }
})

test('every lead magnet points at source content that exists', () => {
  for (const m of magnets) {
    assert.ok(m.source, `${m.id} has no source`)
    assert.ok(existsSync(repoFile(m.source)), `${m.id}: source ${m.source} does not exist`)
  }
})

test('lead magnets carry no invented engagement metrics', () => {
  const raw = JSON.stringify(magnets)
  for (const key of ['downloadsCount', 'rating', 'reviews', 'students', 'pageCount']) {
    assert.doesNotMatch(raw, new RegExp(`"${key}"`), `lead-magnets.json must not claim "${key}" without a source`)
  }
})

test('lead magnets do not link unverified external workspaces', () => {
  const raw = JSON.stringify(magnets)
  assert.doesNotMatch(raw, /notion\.site/, 'Notion workspace URLs must be verified before being linked')
})

test('proxy.ts is the only edge entrypoint', () => {
  // Next 16 fails the build outright when both exist; catch it before the build does.
  assert.ok(existsSync(repoFile('proxy.ts')), 'proxy.ts must exist')
  assert.ok(
    !existsSync(repoFile('middleware.ts')),
    'middleware.ts must not exist alongside proxy.ts — Next 16 refuses to build with both'
  )
})
