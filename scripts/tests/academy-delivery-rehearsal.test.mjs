import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { rehearseAcademyDelivery } from '../commerce/rehearse-academy-delivery.mjs'

// A ZIP with one original text worksheet. No customer, teacher or licensed course data.
const bytes = Buffer.from('UEsDBBQAAAAAAAAAIQBGa1ryRgAAAEYAAAAKAAAAZXhhbXBsZS5tZCMgU3ludGhldGljIGJ1eWVyIHdvcmtzaGVldApXaGF0IGV2aWRlbmNlIHdvdWxkIGNoYW5nZSB5b3VyIGRlY2lzaW9uPwpQSwECFAMUAAAAAAAAACEARmta8kYAAABGAAAACgAAAAAAAAAAAAAAgAEAAAAAZXhhbXBsZS5tZFBLBQYAAAAAAQABADgAAABuAAAAAAA=', 'base64')
const sha256 = createHash('sha256').update(bytes).digest('hex')
async function paths(t) {
  const dir = await mkdtemp(join(tmpdir(), 'education-artifact-test-'))
  t.after(() => rm(dir, { recursive: true, force: true }))
  const archive = join(dir, 'input.zip')
  const output = join(dir, 'retrieved.zip')
  await writeFile(archive, bytes)
  return { archive, sha256, sourceSha: 'a'.repeat(40), output }
}
test('returns exact ZIP after restart and paid replay, rejects wrong owner, corruption and refunded reread', async t => {
  const io = await paths(t)
  assert.deepEqual(await rehearseAcademyDelivery(io), {
    environment: 'offline-fixture', productId: 'win-the-ai-client', sourceSha: io.sourceSha, sha256, bytes: bytes.length, checkoutStatus: 201,
    grant: 'applied', replay: 'duplicate', refund: 'applied', afterRefundStatus: 410, providerTransactions: 0,
  })
  assert.deepEqual(await readFile(io.output), bytes)
})
test('a changed archive cannot fulfill the pinned edition', async t => {
  const io = await paths(t)
  await assert.rejects(rehearseAcademyDelivery({ ...io, sha256: 'a'.repeat(64) }), /differ/)
  await assert.rejects(readFile(io.output), { code: 'ENOENT' })
})
test('a previous delivery is preserved on a repeated invocation', async t => {
  const io = await paths(t)
  await writeFile(io.output, 'previous purchase')
  await assert.rejects(rehearseAcademyDelivery(io), { code: 'EEXIST' })
  assert.equal(await readFile(io.output, 'utf8'), 'previous purchase')
})
