import assert from 'node:assert/strict'
import { once } from 'node:events'
import { fileURLToPath } from 'node:url'
import net from 'node:net'
import test from 'node:test'

import { startNextServer, stopManagedProcess } from './helpers/managed-next-process.mjs'

const rootDirectory = fileURLToPath(new URL('../..', import.meta.url))
const origin = 'https://www.frankx.ai'
const expectedImage = `${origin}/images/brand/frankx-public-workspace-og-1200x630.png`
const routes = [
  { path: '/gencreator', schemaId: 'gencreator-structured-data', schemaType: 'CollectionPage',
    title: 'The GenCreator Framework — Principles, Handbook, Blueprints & Soul',
    socialTitle: 'The GenCreator Framework' },
  { path: '/gencreator/principles', schemaId: 'principles-schema', schemaType: 'Article',
    title: 'The 12 GenCreator Principles — Foundation of Generative Creation',
    socialTitle: 'The 12 GenCreator Principles' },
  { path: '/gencreator/handbook', schemaId: 'handbook-schema', schemaType: 'Book',
    title: "The GenCreator's Handbook — 8 Chapters for Creative Mastery",
    socialTitle: "The GenCreator's Handbook" },
  { path: '/gencreator/manifesto', schemaId: 'manifesto-schema', schemaType: 'Article',
    title: 'The GenCreator Manifesto — Human Taste. Machine Scale. Permanent Artifacts.',
    socialTitle: 'The GenCreator Manifesto' },
  { path: '/gencreator/blueprints', schemaId: 'blueprints-schema', schemaType: 'ItemList',
    title: "Creator's Blueprints — 12 Actionable Frameworks for Generative Creators",
    socialTitle: "Creator's Blueprints" },
  { path: '/gencreator/soul', schemaId: 'soul-schema', schemaType: 'WebPage',
    title: 'GenCreator Soul — 7 Dimensions & Your soul.md Operating File',
    socialTitle: 'GenCreator Soul' },
]

function decodeHtml(value) {
  const named = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' }
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (_, entity) => {
    if (entity.startsWith('#')) {
      return String.fromCodePoint(entity[1].toLowerCase() === 'x'
        ? Number.parseInt(entity.slice(2), 16)
        : Number.parseInt(entity.slice(1), 10))
    }
    return named[entity.toLowerCase()]
  })
}

function values(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => decodeHtml(match[1]))
}

async function getAvailablePort() {
  const server = net.createServer()
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const { port } = server.address()
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
  return port
}

async function waitForReady(url, child, output) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (child.spawnError) throw child.spawnError
    if (child.exitCode !== null) throw new Error(`next start exited before readiness:\n${output()}`)
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      // The managed server may not have opened its listener yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  throw new Error(`next start did not become ready:\n${output()}`)
}

test('GenCreator metadata and JSON-LD agree in the initial server response', { timeout: 60_000 }, async (t) => {
  const port = await getAvailablePort()
  const outputChunks = []
  const child = startNextServer({ cwd: rootDirectory, port })
  child.stdout.on('data', (chunk) => outputChunks.push(chunk.toString()))
  child.stderr.on('data', (chunk) => outputChunks.push(chunk.toString()))
  const localOrigin = `http://127.0.0.1:${port}`

  try {
    await waitForReady(`${localOrigin}/gencreator`, child, () => outputChunks.join(''))
    for (const route of routes) {
      await t.test(route.path, async () => {
        const response = await fetch(`${localOrigin}${route.path}`)
        assert.equal(response.status, 200)
        const html = await response.text()
        const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1]
        assert.ok(head, 'initial document includes a head')
        const canonical = `${origin}${route.path}`

        assert.deepEqual(values(head, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"[^>]*>/gi), [canonical])
        assert.deepEqual(values(head, /<title>([^<]+)<\/title>/gi), [`${route.title} | FrankX`])
        for (const [property, expected] of Object.entries({
          'og:url': canonical,
          'og:title': route.socialTitle,
          'og:image': expectedImage,
          'twitter:title': `${route.title} | FrankX`,
          'twitter:image': expectedImage,
        })) {
          assert.deepEqual(values(head, new RegExp(`<meta[^>]+(?:property|name)="${property}"[^>]+content="([^"]+)"[^>]*>`, 'gi')), [expected], property)
        }

        // Only real script elements count; Next's serialized hydration payload does not.
        const blocks = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
          .filter((match) => /\btype="application\/ld\+json"/i.test(match[1]))
        const ownBlocks = blocks.filter((match) => match[1].includes(`id="${route.schemaId}"`))
        assert.equal(ownBlocks.length, 1, 'one route-owned JSON-LD block exists without JavaScript execution')
        const rawSchema = ownBlocks[0][2]
        assert.doesNotMatch(rawSchema, /[<>&\u2028\u2029]/, 'inline JSON-LD is escaped')
        const schema = JSON.parse(rawSchema)
        assert.equal(schema['@type'], route.schemaType)
        assert.equal(schema.url, canonical)
        assert.doesNotMatch(rawSchema, /https:\/\/frankx\.ai(?:\/|\")/, 'schema uses the canonical host')
        if (schema.author) {
          assert.equal(schema.author['@id'], `${origin}/#frank-riemer`)
          const emittedEntities = blocks.flatMap((match) => JSON.parse(match[2])['@graph'] ?? [])
          assert.ok(emittedEntities.some((entity) => entity['@id'] === schema.author['@id']), 'author reference resolves to the emitted person identity')
        }
        if (route.path === '/gencreator') {
          assert.deepEqual(schema.mainEntity.itemListElement.map((item) => item.url).sort(), routes.slice(1).map((item) => `${origin}${item.path}`).sort())
        }
      })
    }
  } finally {
    await stopManagedProcess(child)
  }
})
