// Owned canon (frankxai/starlight-estate#81), rendered against a production
// build (`pnpm run build` first): /llms.txt and /llms-full.txt are served and
// list real entries, and blog pages carry a canonical tag and licence metadata.
import assert from 'node:assert/strict'
import { once } from 'node:events'
import net from 'node:net'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { startNextServer, stopManagedProcess } from './helpers/managed-next-process.mjs'

const rootDirectory = fileURLToPath(new URL('../..', import.meta.url))
const SITE = 'https://www.frankx.ai'
const LICENSE_URL = `${SITE}/licensing`
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

async function getAvailablePort() {
  const server = net.createServer()
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const { port } = server.address()
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
  return port
}

async function waitForReady(url, child, output) {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    if (child.spawnError) throw new Error(`next start failed to spawn: ${child.spawnError.message}`)
    if (child.exitCode !== null) {
      throw new Error(`next start exited before readiness (code ${child.exitCode}):\n${output()}`)
    }
    try {
      const response = await fetch(url)
      if (response.ok) return response
    } catch {
      // The listener may not be ready yet.
    }
    await delay(100)
  }
  throw new Error(`next start did not become ready:\n${output()}`)
}

// llms.txt list entries: "- [Title](https://www.frankx.ai/path): description"
const entryLinks = (text, prefix) =>
  [...text.matchAll(/^- \[[^\]]+\]\((https:\/\/www\.frankx\.ai[^)\s]*)\)/gm)]
    .map((match) => match[1])
    .filter((url) => !prefix || url.startsWith(`${SITE}${prefix}`))

function head(html) {
  const match = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)
  assert.ok(match, 'document must include a head')
  return match[1]
}

const canonicals = (html) =>
  [...head(html).matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"[^>]*>/gi)].map((m) => m[1])

test('llms.txt is served, lists real entries, and blog pages carry canonical + licence', { timeout: 120_000 }, async () => {
  const port = await getAvailablePort()
  const base = `http://127.0.0.1:${port}`
  const chunks = []
  const child = startNextServer({ cwd: rootDirectory, port })
  const output = () => chunks.join('')
  child.stdout.on('data', (chunk) => chunks.push(chunk.toString()))
  child.stderr.on('data', (chunk) => chunks.push(chunk.toString()))

  try {
    const llmsResponse = await waitForReady(`${base}/llms.txt`, child, output)
    assert.match(llmsResponse.headers.get('content-type') ?? '', /^text\/plain/)
    const llms = await llmsResponse.text()
    assert.match(llms, /^# FrankX$/m)
    assert.ok(entryLinks(llms).length > 0, 'llms.txt lists at least one entry')
    assert.ok(entryLinks(llms, '/blog/').length > 0, 'llms.txt lists blog posts')
    assert.ok(entryLinks(llms, '/products/').length > 0, 'llms.txt lists products')
    assert.ok(entryLinks(llms, '/resources').length > 0, 'llms.txt lists resources')
    assert.match(llms, /^## Licence$/m)
    assert.ok(llms.includes(LICENSE_URL))

    const fullResponse = await fetch(`${base}/llms-full.txt`)
    assert.equal(fullResponse.status, 200)
    const full = await fullResponse.text()
    const fullBooks = [...full.matchAll(/^https:\/\/www\.frankx\.ai\/books\/([a-z0-9-]+)$/gm)].map((m) => m[1])
    assert.ok(fullBooks.length > 0, 'llms-full.txt lists books')
    assert.ok(!fullBooks.some((slug) => slug.startsWith('arcanea-')), 'no Arcanea titles in FrankX llms-full.txt')
    assert.match(full, /^https:\/\/www\.frankx\.ai\/products\/[a-z0-9-]+$/m, 'llms-full.txt lists products')

    // Every book, product and resource link added for #81 resolves directly
    // (200, no redirect), so the map never sends an agent to a 404 or a hop.
    const fullProducts = [...full.matchAll(/^https:\/\/www\.frankx\.ai(\/[^\s]*)$/gm)]
      .map((m) => m[1])
      .filter((path) => path.startsWith('/books/') || path.startsWith('/products/') || path === '/acos' || path === '/soulbook')
    const listed = new Set([
      ...fullProducts,
      ...entryLinks(llms, '/products').map((url) => url.slice(SITE.length)),
      ...entryLinks(llms, '/resources').map((url) => url.slice(SITE.length)),
    ])
    const broken = []
    for (const path of listed) {
      const { status } = await fetch(`${base}${path}`, { redirect: 'manual' })
      if (status !== 200) broken.push(`${path} -> ${status}`)
    }
    assert.deepEqual(broken, [], 'listed books, products and resources resolve with 200')

    const blogUrls = [
      ...entryLinks(llms, '/blog/').slice(0, 3),
      `${SITE}/blog/intelligence-revolution-2025`,
      `${SITE}/blog/soul-frequency-framework`,
    ]
    for (const url of blogUrls) {
      const path = url.slice(SITE.length)
      const response = await fetch(`${base}${path}`)
      assert.equal(response.status, 200, `${path} renders`)
      const html = await response.text()
      const found = canonicals(html)
      assert.equal(found.length, 1, `${path} has exactly one canonical (got ${found.join(', ')})`)
      assert.ok(found[0].startsWith(`${SITE}/`), `${path} canonical is on ${SITE}`)
      assert.match(html, new RegExp(`<link[^>]+rel="license"[^>]+href="${LICENSE_URL}"`), `${path} has rel=license`)
      assert.ok(html.includes(`"license":"${LICENSE_URL}"`), `${path} Article JSON-LD carries license`)
    }
  } finally {
    await stopManagedProcess(child)
  }
})
