import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { mkdir, mkdtemp, readFile, rename, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

import {
  escapeWorkflowCommandData,
  escapeWorkflowCommandProperty,
} from '../media-guard.mjs'

const MIB = 1024 * 1024
const repositoryRoot = fileURLToPath(new URL('../../', import.meta.url))
const mediaGuard = fileURLToPath(new URL('../media-guard.mjs', import.meta.url))

function git(cwd, ...args) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim()
}

async function writeFixture(root, relativePath, content) {
  const destination = path.join(root, relativePath)
  await mkdir(path.dirname(destination), { recursive: true })
  await writeFile(destination, content)
}

async function createRepository(initialFiles = {}) {
  const root = await mkdtemp(path.join(tmpdir(), 'frankx-media-guard-'))
  git(root, 'init', '--initial-branch=main')
  git(root, 'config', 'user.email', 'media-guard@example.test')
  git(root, 'config', 'user.name', 'Media Guard Test')

  await writeFixture(root, 'README.md', '# fixture\n')
  for (const [relativePath, content] of Object.entries(initialFiles)) {
    await writeFixture(root, relativePath, content)
  }
  git(root, 'add', '--all')
  git(root, 'commit', '-m', 'base')

  return { root, base: git(root, 'rev-parse', 'HEAD') }
}

function commitAll(root, message) {
  git(root, 'add', '--all')
  git(root, 'commit', '-m', message)
}

function runGuard({ root, base }) {
  return spawnSync(process.execPath, [mediaGuard, '--base', base], {
    cwd: root,
    encoding: 'utf8',
  })
}

async function withRepository(initialFiles, run) {
  const repository = await createRepository(initialFiles)
  try {
    await run(repository)
  } finally {
    await rm(repository.root, { recursive: true, force: true })
  }
}

test('allows an asset at its exact ceiling and rejects one byte over', async () => {
  await withRepository({}, async (repository) => {
    await writeFixture(repository.root, 'public/hero.webp', Buffer.alloc(MIB))
    commitAll(repository.root, 'add boundary asset')

    let result = runGuard(repository)
    assert.equal(result.status, 0, result.stderr)

    await writeFixture(repository.root, 'public/hero.webp', Buffer.alloc(MIB + 1))
    commitAll(repository.root, 'oversize boundary asset')

    result = runGuard(repository)
    assert.equal(result.status, 1, result.stdout)
    assert.match(result.stderr, /\.webp exceeds the 1\.00 MiB Git limit/)
  })
})

test('applies explicit ceilings to every supported web-media family', async () => {
  await withRepository({}, async (repository) => {
    const fixtures = [
      ['public/vector.svg', 256 * 1024 + 1],
      ['public/favicon.ico', 256 * 1024 + 1],
      ['public/audio.m4a', 2 * MIB + 1],
      ['public/audio.ogg', 2 * MIB + 1],
      ['public/video.webm', 2 * MIB + 1],
    ]

    for (const [relativePath, size] of fixtures) {
      await writeFixture(repository.root, relativePath, Buffer.alloc(size))
    }
    commitAll(repository.root, 'add oversized web media')

    const result = runGuard(repository)
    assert.equal(result.status, 1, result.stdout)
    for (const [relativePath] of fixtures) {
      assert.match(result.stderr, new RegExp(relativePath.replace('.', '\\.')))
    }
  })
})

test('rejects compound and compressed archive formats', async () => {
  await withRepository({}, async (repository) => {
    await writeFixture(repository.root, 'public/source.tar.gz', 'archive')
    await writeFixture(repository.root, 'public/source.tgz', 'archive')
    await writeFixture(repository.root, 'public/source.bz2', 'archive')
    await writeFixture(repository.root, 'public/source.xz', 'archive')
    commitAll(repository.root, 'add compressed archives')

    const result = runGuard(repository)
    assert.equal(result.status, 1, result.stdout)
    for (const extension of ['.gz', '.tgz', '.bz2', '.xz']) {
      assert.match(result.stderr, new RegExp(`\\${extension} source/archive files`))
    }
  })
})

test('treats a renamed destination as a newly introduced source file', async () => {
  await withRepository({ 'public/original.bin': 'source' }, async (repository) => {
    await rename(
      path.join(repository.root, 'public/original.bin'),
      path.join(repository.root, 'public/renamed.wav'),
    )
    commitAll(repository.root, 'rename source media')

    const result = runGuard(repository)
    assert.equal(result.status, 1, result.stdout)
    assert.match(result.stderr, /public\/renamed\.wav/)
  })
})

test('escapes workflow-command properties and command data', async () => {
  assert.equal(
    escapeWorkflowCommandProperty('asset%,\r\n:name'),
    'asset%25%2C%0D%0A%3Aname',
  )
  assert.equal(escapeWorkflowCommandData('reason%\r\nnext'), 'reason%25%0D%0Anext')

  await withRepository({}, async (repository) => {
    const relativePath = 'public/attack%,.wav'
    await writeFixture(repository.root, relativePath, 'audio')
    commitAll(repository.root, 'add adversarial filename')

    const result = runGuard(repository)
    assert.equal(result.status, 1, result.stdout)
    assert.match(result.stderr, /file=public\/attack%25%2C\.wav::/)
    assert.match(result.stderr, /- "public\/attack%,\.wav"/)
  })
})

test('fails closed for a media-like extension without a size policy', async () => {
  await withRepository({}, async (repository) => {
    await writeFixture(repository.root, 'public/next-format.jxl', 'image')
    commitAll(repository.root, 'add unclassified media')

    const result = runGuard(repository)
    assert.equal(result.status, 1, result.stdout)
    assert.match(result.stderr, /\.jxl has no approved Git media policy/)
  })
})

test('workflow and merge gates enforce the hardened media contract', async () => {
  const [workflow, packageSource, mergeGate] = await Promise.all([
    readFile(path.join(repositoryRoot, '.github/workflows/media-guard.yml'), 'utf8'),
    readFile(path.join(repositoryRoot, 'package.json'), 'utf8'),
    readFile(path.join(repositoryRoot, '.github/workflows/merge-gate.yml'), 'utf8'),
  ])
  const packageJson = JSON.parse(packageSource)

  assert.match(
    workflow,
    /actions\/checkout@fbc6f3992d24b796d5a048ff273f7fcc4a7b6c09/,
  )
  assert.match(workflow, /persist-credentials: false/)
  assert.match(
    workflow,
    /actions\/setup-node@a0853c24544627f65ddf259abe73b1d18a591444/,
  )
  assert.match(workflow, /node-version: ['"]22['"]/)
  assert.match(workflow, /package-manager-cache: false/)
  assert.equal(
    packageJson.scripts['test:media-guard'],
    'node --test scripts/tests/media-guard.test.mjs',
  )
  assert.match(packageJson.scripts['merge:gate'], /npm run test:media-guard/)
  assert.match(packageJson.scripts['merge:gate:ci'], /npm run test:media-guard/)
  assert.match(mergeGate, /pnpm run test:media-guard/)
})
