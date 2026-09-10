import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { once } from 'node:events'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import net from 'node:net'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { startNextServer, stopManagedProcess } from './helpers/managed-next-process.mjs'

const root = fileURLToPath(new URL('../..', import.meta.url))
const require = createRequire(import.meta.url)
const packageRoot = path.dirname(require.resolve('maplibre-gl/package.json'))
const config = JSON.parse(await readFile(path.join(root, 'lib/maplibre-assets.json'), 'utf8'))

async function availablePort() {
  const server = net.createServer()
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const { port } = server.address()
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
  return port
}

test('production server serves a matching executable worker and shared module', { timeout: 60_000 }, async () => {
  const port = await availablePort()
  const child = startNextServer({ cwd: root, port })
  const output = []
  child.stdout.on('data', (chunk) => output.push(chunk.toString()))
  child.stderr.on('data', (chunk) => output.push(chunk.toString()))
  const origin = `http://127.0.0.1:${port}`
  const directory = `/maplibre/${config.version}`

  try {
    let manifest
    for (let attempt = 0; attempt < 100; attempt += 1) {
      if (child.spawnError) throw child.spawnError
      if (child.exitCode !== null) throw new Error(`next start exited: ${output.join('')}`)
      try {
        const response = await fetch(`${origin}${directory}/manifest.json`)
        if (response.ok) { manifest = await response.json(); break }
      } catch {
        // The managed server is still opening its listener.
      }
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    assert.ok(manifest, `versioned worker manifest is reachable: ${output.join('')}`)
    assert.equal(manifest.version, config.version)
    assert.equal(manifest.workerUrl, config.workerUrl)
    assert.deepEqual(Object.keys(manifest.files), ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs', 'LICENSE.txt'])

    for (const [name, integrity] of Object.entries(manifest.files)) {
      const response = await fetch(`${origin}${directory}/${name}`, { redirect: 'error' })
      assert.equal(response.status, 200, `${name} is served directly`)
      if (name.endsWith('.mjs')) assert.match(response.headers.get('content-type'), /(?:text|application)\/javascript/)
      const served = Buffer.from(await response.arrayBuffer())
      const installed = await readFile(path.join(packageRoot, name === 'LICENSE.txt' ? name : `dist/${name}`))
      assert.deepEqual(served, installed, `${name} matches the locked installed package`)
      assert.equal(served.length, integrity.bytes)
      assert.equal(createHash('sha256').update(served).digest('hex'), integrity.sha256)
    }
    const page = await fetch(`${origin}/ecosystems/amsterdam`)
    assert.equal(page.status, 200)
    assert.match(await page.text(), /<section\b[^>]*\bid="full-directory"/,
      'the map fallback links to a real server-rendered directory')
    const unrelated = await fetch(`${origin}/gencreator`)
    assert.equal(unrelated.status, 200)
    const directives = (response) => Object.fromEntries(
      response.headers.get('content-security-policy').split(';').map((part) => {
        const [name, ...values] = part.trim().split(/\s+/)
        return [name, values]
      }),
    )
    const mapPolicy = directives(page)
    const sitePolicy = directives(unrelated)
    assert.deepEqual(mapPolicy['connect-src'], [
      ...sitePolicy['connect-src'],
      'https://a.basemaps.cartocdn.com',
      'https://b.basemaps.cartocdn.com',
      'https://c.basemaps.cartocdn.com',
      'https://d.basemaps.cartocdn.com',
    ])
    assert.ok(sitePolicy['connect-src'].every((source) => !source.includes('cartocdn.com')))
    delete mapPolicy['connect-src']
    delete sitePolicy['connect-src']
    assert.deepEqual(mapPolicy, sitePolicy, 'all remaining CSP directives stay unchanged')
  } finally {
    await stopManagedProcess(child)
  }
})
