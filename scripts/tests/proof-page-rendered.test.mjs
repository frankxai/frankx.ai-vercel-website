// Smoke test against the production build: run after `pnpm run build`.
import assert from 'node:assert/strict'
import { once } from 'node:events'
import fs from 'node:fs'
import net from 'node:net'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { startNextServer, stopManagedProcess } from './helpers/managed-next-process.mjs'

const rootDirectory = fileURLToPath(new URL('../..', import.meta.url))
const seed = JSON.parse(fs.readFileSync(new URL('../../data/proof/claims.json', import.meta.url), 'utf8'))

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
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (child.spawnError) throw new Error(`next start failed to spawn: ${child.spawnError.message}`)
    if (child.exitCode !== null) throw new Error(`next start exited early (code ${child.exitCode}):\n${output()}`)
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

const decode = (html) =>
  html.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

test('/proof renders the ledger, stays noindex and stays out of the sitemap', { timeout: 30_000 }, async () => {
  const port = await getAvailablePort()
  const outputChunks = []
  const child = startNextServer({ cwd: rootDirectory, port })
  const output = () => outputChunks.join('')
  child.stdout.on('data', (chunk) => outputChunks.push(chunk.toString()))
  child.stderr.on('data', (chunk) => outputChunks.push(chunk.toString()))

  try {
    const response = await waitForReady(`http://127.0.0.1:${port}/proof`, child, output)
    const html = decode(await response.text())

    assert.match(html, /<meta[^>]+name="robots"[^>]+content="noindex, nofollow"/i)
    assert.match(html, /<h1[^>]*>Proof<\/h1>/)
    for (const heading of ['Claims', 'What this does not claim', 'Method']) {
      assert.ok(html.includes(`>${heading}</h2>`), `missing section heading: ${heading}`)
    }
    for (const claim of seed.claims) {
      assert.ok(html.includes(claim.text), `claim text must render verbatim: ${claim.id}`)
      assert.ok(html.includes(claim.method), `method must render verbatim: ${claim.id}`)
      assert.ok(html.includes(claim.source), `source must render verbatim: ${claim.id}`)
    }
    for (const line of seed.does_not_claim) assert.ok(html.includes(line), `missing does_not_claim line: ${line}`)
    assert.ok(html.includes('Codex CLI, one machine'))
    assert.ok(html.includes(`dateTime="${seed.generated_at}"`))
    assert.equal((html.match(/<summary/g) ?? []).length, seed.claims.length)

    const sitemap = await (await fetch(`http://127.0.0.1:${port}/sitemap.xml`)).text()
    assert.doesNotMatch(sitemap, /frankx\.ai\/proof</)
    const llms = await (await fetch(`http://127.0.0.1:${port}/llms.txt`)).text()
    assert.doesNotMatch(llms, /\/proof\b/)
    const routeIndex = JSON.parse(fs.readFileSync(new URL('../../data/route-index.json', import.meta.url), 'utf8'))
    assert.ok(!routeIndex.routes.some((route) => route.href === '/proof'), '/proof must stay out of search and 404 suggestions')
  } finally {
    await stopManagedProcess(child)
  }
})
