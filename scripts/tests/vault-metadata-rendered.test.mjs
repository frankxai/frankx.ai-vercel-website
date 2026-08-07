import assert from 'node:assert/strict'
import { once } from 'node:events'
import { fileURLToPath } from 'node:url'
import net from 'node:net'
import test from 'node:test'

import {
  startNextServer,
  stopManagedProcess,
} from './helpers/managed-next-process.mjs'

const rootDirectory = fileURLToPath(new URL('../..', import.meta.url))
const expectedTitle = 'Visual Vault | AI Asset Library | FrankX'
const expectedDescription =
  'Browse the FrankX visual asset library: AI-generated blog heroes, mascot concepts, ecosystem infographics, and architecture diagrams.'
const expectedCanonical = 'https://www.frankx.ai/vault'
const expectedImage = 'https://www.frankx.ai/images/ecosystem/01-frankx-ecosystem-overview.png'

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
    if (child.spawnError) {
      throw new Error(`next start failed to spawn: ${child.spawnError.message}`)
    }

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

function isolateHead(html) {
  const match = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)
  assert.ok(match, 'rendered Vault document must include a head')
  return match[1]
}

function metadataValues(head, selector) {
  return [...head.matchAll(selector)].map((match) => match[1])
}

test('Vault renders only its route-owned production metadata', { timeout: 30_000 }, async () => {
  const port = await getAvailablePort()
  const outputChunks = []
  const child = startNextServer({ cwd: rootDirectory, port })
  const output = () => outputChunks.join('')

  child.stdout.on('data', (chunk) => outputChunks.push(chunk.toString()))
  child.stderr.on('data', (chunk) => outputChunks.push(chunk.toString()))

  try {
    const response = await waitForReady(`http://127.0.0.1:${port}/vault`, child, output)
    const head = isolateHead(await response.text())

    assert.deepEqual(metadataValues(head, /<title>([^<]+)<\/title>/gi), [expectedTitle])
    assert.deepEqual(
      metadataValues(head, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"[^>]*>/gi),
      [expectedCanonical],
    )

    const expectedMetadata = {
      description: expectedDescription,
      'og:title': expectedTitle,
      'og:description': expectedDescription,
      'og:url': expectedCanonical,
      'og:site_name': 'FrankX',
      'og:type': 'website',
      'og:image': expectedImage,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': 'FrankX Visual Vault',
      'twitter:card': 'summary_large_image',
      'twitter:title': expectedTitle,
      'twitter:description': expectedDescription,
      'twitter:image': expectedImage,
    }

    for (const [property, expectedValue] of Object.entries(expectedMetadata)) {
      assert.deepEqual(
        metadataValues(
          head,
          new RegExp(`<meta[^>]+(?:property|name)="${property}"[^>]+content="([^"]+)"[^>]*>`, 'gi'),
        ),
        [expectedValue],
        `${property} must be singular and route-owned`,
      )
    }

    assert.match(
      head,
      /<meta[^>]+name="twitter:creator"[^>]+content="@frankxeth"[^>]*>/i,
      'Twitter creator must use the configured FrankX identity',
    )
    assert.doesNotMatch(head, /Arcanea(?:Vault)?|FrankX \| AI Architect|hero-homepage\.png/i)
  } finally {
    await stopManagedProcess(child)
  }
})
