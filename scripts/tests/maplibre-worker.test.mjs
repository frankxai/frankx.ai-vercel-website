import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { copyMapLibreWorker } from '../copy-maplibre-worker.mjs'

const require = createRequire(import.meta.url)
const config = JSON.parse(await readFile(new URL('../../lib/maplibre-assets.json', import.meta.url), 'utf8'))

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'frankx-maplibre-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  await mkdir(path.join(root, 'lib'))
  await writeFile(path.join(root, 'lib/maplibre-assets.json'), JSON.stringify(config))
  return root
}

test('copies the installed worker, shared import, and license with version and byte hashes', async (t) => {
  const root = await fixture(t)
  const manifest = await copyMapLibreWorker({ root })
  const packageRoot = path.dirname(require.resolve('maplibre-gl/package.json'))
  assert.equal(manifest.version, config.version)
  assert.equal(manifest.workerUrl, config.workerUrl)
  assert.deepEqual(Object.keys(manifest.files), ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs', 'LICENSE.txt'])
  for (const [name, integrity] of Object.entries(manifest.files)) {
    const source = await readFile(path.join(packageRoot, name === 'LICENSE.txt' ? name : `dist/${name}`))
    const emitted = await readFile(path.join(root, 'public', 'maplibre', config.version, name))
    assert.deepEqual(emitted, source, `${name} matches the installed package`)
    assert.equal(integrity.bytes, source.length)
    assert.equal(integrity.sha256, createHash('sha256').update(emitted).digest('hex'))
  }
  const worker = await readFile(path.join(root, 'public', config.workerUrl), 'utf8')
  assert.match(worker, /["']\.\/maplibre-gl-shared\.mjs["']/)
})

test('rejects a package upgrade until the app worker version is updated', async (t) => {
  const root = await fixture(t)
  const packageFile = path.join(root, 'package.json')
  await writeFile(packageFile, JSON.stringify({ version: '6.5.0' }))
  await assert.rejects(copyMapLibreWorker({ root, packageFile }), /version mismatch/)
  await assert.rejects(readFile(path.join(root, 'public', config.workerUrl)), { code: 'ENOENT' })
})

test('missing shared module fails before publishing a partial worker', async (t) => {
  const root = await fixture(t)
  const packageFile = path.join(root, 'package.json')
  await writeFile(packageFile, JSON.stringify({ version: config.version }))
  await mkdir(path.join(root, 'dist'))
  await writeFile(path.join(root, 'dist/maplibre-gl-worker.mjs'), "import './maplibre-gl-shared.mjs'")
  await writeFile(path.join(root, 'LICENSE.txt'), 'test license')
  await assert.rejects(copyMapLibreWorker({ root, packageFile }), { code: 'ENOENT' })
  await assert.rejects(readFile(path.join(root, 'public', config.workerUrl)), { code: 'ENOENT' })
})
