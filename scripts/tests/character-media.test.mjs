import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, rm, copyFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'

test('character retrieval refuses held scenes, unknown identities and changed source bytes', async () => {
  const root = await mkdtemp(join(tmpdir(), 'character-media-'))
  try {
    await mkdir(join(root, 'scripts'))
    await mkdir(join(root, 'public/media'), { recursive: true })
    await mkdir(join(root, 'public/images/guides/mini-me'), { recursive: true })
    await copyFile(new URL('../resolve-character-media.mjs', import.meta.url), join(root, 'scripts/resolve-character-media.mjs'))
    const bytes = '<svg xmlns="http://www.w3.org/2000/svg"/>'
    const asset = { key: 'example', url: '/images/guides/mini-me/example.svg', bytes: Buffer.byteLength(bytes), sha256: createHash('sha256').update(bytes).digest('hex'), identity_reference: false, reuse_status: 'existing-public-example' }
    const file = join(root, 'public/images/guides/mini-me/example.svg')
    const manifest = join(root, 'public/media/characters.json')
    await writeFile(file, bytes)
    await writeFile(manifest, JSON.stringify({ assets: [asset] }))
    const run = (key) => spawnSync(process.execPath, [join(root, 'scripts/resolve-character-media.mjs'), key], { encoding: 'utf8' })
    assert.equal(run('example').status, 0)
    assert.equal(run('unregistered-identity').status, 1)
    asset.reuse_status = 'needs-scene-review'
    await writeFile(manifest, JSON.stringify({ assets: [asset] }))
    assert.match(run('example').stderr, /Scene review required/)
    assert.equal(run('--check').status, 0)
    await writeFile(file, bytes + 'changed')
    assert.match(run('--check').stderr, /Asset changed/)
    await writeFile(file, bytes)
    asset.drive_url = 'https://drive.google.com/private-source'
    await writeFile(manifest, JSON.stringify({ assets: [asset] }))
    assert.match(run('--check').stderr, /Private locator/)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
