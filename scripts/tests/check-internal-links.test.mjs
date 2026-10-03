import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const script = path.resolve(here, '../check-internal-links.mjs')

function workspace() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'fx-links-'))
}

function write(dir, rel, content) {
  const full = path.join(dir, rel)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, content)
}

function seed(dir, files) {
  const all = {
    'data/route-index.json': JSON.stringify({ routes: [{ href: '/valid' }], aliases: {} }),
    ...files,
  }
  for (const [rel, content] of Object.entries(all)) write(dir, rel, content)
}

function run(dir, args = []) {
  return spawnSync(process.execPath, [script, ...args], {
    cwd: dir,
    encoding: 'utf8',
  })
}

function findings(dir) {
  const result = run(dir, ['--json'])
  assert.equal(result.error, undefined)
  const out = JSON.parse(result.stdout)
  return { out, result }
}

test('a broken object-literal href is reported and exits non-zero', () => {
  const dir = workspace()
  try {
    seed(dir, {
      'components/nav.tsx': "const link = { href: '/does-not-exist' }",
    })
    const { out } = findings(dir)
    assert.equal(out.scannedFiles, 1)
    assert.deepEqual(out.findings.map((finding) => finding.href), ['/does-not-exist'])
    assert.equal(run(dir).status, 1)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})

test('a valid object-literal href passes', () => {
  const dir = workspace()
  try {
    seed(dir, {
      'components/nav.tsx': "const link = { href: '/valid' }",
    })
    const { out } = findings(dir)
    assert.equal(out.scannedFiles, 1)
    assert.deepEqual(out.findings, [])
    assert.equal(run(dir).status, 0)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})

test('isAppPage accepts a redirect stub that the route index omits', () => {
  const dir = workspace()
  try {
    seed(dir, {
      'components/nav.tsx': "const link = { href: '/consulting' }",
      'app/consulting/page.tsx': "export default function Page() { return null }\n",
    })
    const { out } = findings(dir)
    assert.deepEqual(out.findings, [])
    assert.equal(run(dir).status, 0)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})

test('an extensionless route handler is a real page', () => {
  const dir = workspace()
  try {
    seed(dir, {
      'components/nav.tsx': "const link = { href: '/lab' }",
      'app/lab/route.ts': 'export function GET() { return new Response("ok") }\n',
    })
    const { out } = findings(dir)
    assert.deepEqual(out.findings, [])
    assert.equal(run(dir).status, 0)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})

test('traversal paths stay rejected even when the escaped page exists', () => {
  const dir = workspace()
  const escapeName = `fx-link-escape-${path.basename(dir)}`
  const planted = path.resolve(dir, 'app', '..', '..', escapeName)
  try {
    seed(dir, {
      'components/bad.tsx': [
        "const outside = { href: '/../../etc' }",
        "const nested = { href: '/foo/../../../etc' }",
        `const planted = { href: '/../../${escapeName}' }`,
        `const plantedNested = { href: '/foo/../../../${escapeName}' }`,
      ].join('\n'),
    })
    fs.mkdirSync(planted, { recursive: true })
    fs.writeFileSync(path.join(planted, 'page.tsx'), 'export default function Page() { return null }\n')
    fs.writeFileSync(path.join(planted, 'route.ts'), 'export function GET() { return new Response("no") }\n')

    const { out } = findings(dir)
    assert.deepEqual(
      out.findings.map((finding) => finding.href).sort(),
      ['/../../etc', `/../../${escapeName}`, '/foo/../../../etc', `/foo/../../../${escapeName}`].sort(),
    )
    assert.equal(run(dir).status, 1)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
    fs.rmSync(planted, { recursive: true, force: true })
  }
})

test('quoted keys, space before the colon, multiline values, and suffix keys are not links', () => {
  const dir = workspace()
  try {
    seed(dir, {
      'components/forms.tsx': [
        "const quoted = { 'href': '/missing-quoted' }",
        'const quotedDouble = { "href": "/missing-quoted-double" }',
        "const spaced = { href : '/missing-space' }",
        "const suffix = { myhref: '/missing-suffix' }",
        'const multiline = { href:',
        "  '/missing-multiline' }",
      ].join('\n'),
    })
    const { out } = findings(dir)
    assert.deepEqual(out.findings, [])
    assert.equal(run(dir).status, 0)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})
