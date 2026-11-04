import assert from 'node:assert/strict'
import { createVerify, generateKeyPairSync } from 'node:crypto'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import {
  buildServiceAccountAssertion, chunk, contentPathToUrl, ctrGaps, filterOwnHost,
  findIndexNowKey, parseSitemap, strikingDistance, toCsv,
} from '../search/search-plane.mjs'

test('parses a urlset with lastmod and escaped ampersands', () => {
  const xml = `<urlset><url><loc>https://www.frankx.ai/a?x=1&amp;y=2</loc><lastmod>2026-11-02</lastmod></url><url><loc>https://www.frankx.ai/b</loc></url></urlset>`
  const { isIndex, entries } = parseSitemap(xml)
  assert.equal(isIndex, false)
  assert.deepEqual(entries, [
    { loc: 'https://www.frankx.ai/a?x=1&y=2', lastmod: '2026-11-02' },
    { loc: 'https://www.frankx.ai/b', lastmod: null },
  ])
})

test('recognises a sitemap index', () => {
  const { isIndex, entries } = parseSitemap('<sitemapindex><sitemap><loc>https://www.frankx.ai/s1.xml</loc></sitemap></sitemapindex>')
  assert.equal(isIndex, true)
  assert.equal(entries[0].loc, 'https://www.frankx.ai/s1.xml')
})

test('maps blog and journal files to public URLs and ignores everything else', () => {
  assert.equal(contentPathToUrl('content/blog/claude-code-skills.mdx'), 'https://www.frankx.ai/blog/claude-code-skills')
  assert.equal(contentPathToUrl('content\\journal\\2026-11-03.md'), 'https://www.frankx.ai/journal/2026-11-03')
  assert.equal(contentPathToUrl('app/llms.txt/route.ts'), null)
  assert.equal(contentPathToUrl('content/blog/nested/x.mdx'), null)
})

test('finds the key only when the file body equals its name', () => {
  const dir = mkdtempSync(join(tmpdir(), 'indexnow-'))
  const key = 'afc74abb2caf2c8cf6ff5aa72294ec12'
  writeFileSync(join(dir, '0123456789abcdef0123456789abcdef.txt'), 'something else')
  assert.equal(findIndexNowKey(dir), null)
  writeFileSync(join(dir, `${key}.txt`), `${key}\n`)
  assert.equal(findIndexNowKey(dir), key)
})

test('keeps only unique URLs on the submitting host', () => {
  const urls = ['https://www.frankx.ai/a', 'https://www.frankx.ai/a', 'https://frankx.ai/b', 'https://evil.example/c', 'not a url']
  assert.deepEqual(filterOwnHost(urls), ['https://www.frankx.ai/a'])
})

test('chunks at the IndexNow batch size', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]])
})

test('signs a service account assertion that verifies with the public key', () => {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 })
  const sa = { client_email: 'reader@p.iam.gserviceaccount.com', private_key: privateKey.export({ type: 'pkcs8', format: 'pem' }) }
  const { assertion, tokenUri } = buildServiceAccountAssertion(sa, 'scope-x', 1000)
  const [h, c, s] = assertion.split('.')
  const claims = JSON.parse(Buffer.from(c, 'base64url').toString())
  assert.equal(tokenUri, 'https://oauth2.googleapis.com/token')
  assert.deepEqual(claims, { iss: sa.client_email, scope: 'scope-x', aud: tokenUri, iat: 1000, exp: 4600 })
  const verifier = createVerify('RSA-SHA256')
  verifier.update(`${h}.${c}`)
  assert.equal(verifier.verify(publicKey, Buffer.from(s, 'base64url')), true)
  assert.throws(() => buildServiceAccountAssertion({ client_email: 'x' }, 's'), /private_key/)
})

test('striking distance keeps positions 4-20 with enough impressions, biggest first', () => {
  const rows = [
    { query: 'a', impressions: 500, position: 2 },
    { query: 'b', impressions: 100, position: 8 },
    { query: 'c', impressions: 900, position: 14 },
    { query: 'd', impressions: 5, position: 9 },
    { query: 'e', impressions: 300, position: 31 },
  ]
  assert.deepEqual(strikingDistance(rows).map((r) => r.query), ['c', 'b'])
})

test('ctr gaps flag page-one rows earning far under their position', () => {
  const rows = [
    { query: 'low', impressions: 400, position: 2, ctr: 0.01 },
    { query: 'fine', impressions: 400, position: 2, ctr: 0.2 },
    { query: 'deep', impressions: 400, position: 15, ctr: 0 },
  ]
  assert.deepEqual(ctrGaps(rows).map((r) => r.query), ['low'])
})

test('csv quotes cells with commas and quotes', () => {
  assert.equal(toCsv([{ q: 'a, "b"', n: 1 }], ['q', 'n']), 'q,n\n"a, ""b""",1\n')
})
