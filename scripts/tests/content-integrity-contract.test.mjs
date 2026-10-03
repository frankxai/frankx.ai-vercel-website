import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { findSharedHeroes, HERO_WARN_BYTES } from '../lib/hero-bytes.mjs'

const script = fileURLToPath(new URL('../check-content-integrity.mjs', import.meta.url))

function writePost(root, slug, image, bytes) {
  mkdirSync(join(root, 'content', 'blog'), { recursive: true })
  mkdirSync(join(root, 'public', 'images'), { recursive: true })
  writeFileSync(join(root, 'public', 'images', `${slug}.png`), bytes)
  writeFileSync(
    join(root, 'content', 'blog', `${slug}.mdx`),
    `---\ntitle: ${slug}\nimage: /images/${slug}.png\n---\nbody\n`,
  )
}

test('fails when two posts share hero bytes and names every post', () => {
  const root = mkdtempSync(join(tmpdir(), 'hero-bytes-'))
  try {
    writePost(root, 'alpha', '/images/alpha.png', 'same-bytes')
    writePost(root, 'beta', '/images/beta.png', 'same-bytes')
    writePost(root, 'gamma', '/images/gamma.png', 'other-bytes')
    const result = spawnSync(process.execPath, [script], { cwd: root, encoding: 'utf8' })
    assert.equal(result.status, 1)
    assert.match(result.stderr, /\[shared-hero-bytes\]/)
    const normalized = result.stderr.replace(/\\/g, '/')
    assert.match(normalized, /content\/blog\/alpha\.mdx/)
    assert.match(normalized, /content\/blog\/beta\.mdx/)
    assert.doesNotMatch(normalized, /content\/blog\/gamma\.mdx/)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('an allowlisted pair is not a violation, and one outsider still fails', () => {
  const root = mkdtempSync(join(tmpdir(), 'hero-bytes-'))
  try {
    writePost(root, 'alpha', '/images/alpha.png', 'same-bytes')
    writePost(root, 'beta', '/images/beta.png', 'same-bytes')
    assert.equal(findSharedHeroes(root, [new Set(['alpha', 'beta'])]).violations.length, 0)
    const open = findSharedHeroes(root, [new Set(['alpha'])])
    assert.equal(open.violations.length, 1)
    assert.match(open.violations[0].detail, /alpha\.mdx/)
    assert.match(open.violations[0].detail, /beta\.mdx/)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('a hero over 2 MB warns and does not fail', () => {
  const root = mkdtempSync(join(tmpdir(), 'hero-bytes-'))
  try {
    writePost(root, 'large', '/images/large.png', Buffer.alloc(HERO_WARN_BYTES + 1))
    const found = findSharedHeroes(root, [])
    assert.equal(found.violations.length, 0)
    assert.equal(found.warnings.length, 1)
    assert.equal(found.warnings[0].kind, 'hero-over-2mb')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('a hero path that leaves public/ is ignored', () => {
  const root = mkdtempSync(join(tmpdir(), 'hero-bytes-'))
  try {
    mkdirSync(join(root, 'content', 'blog'), { recursive: true })
    mkdirSync(join(root, 'public'), { recursive: true })
    writeFileSync(join(root, 'secret.bin'), 'same-bytes')
    for (const slug of ['alpha', 'beta']) {
      writeFileSync(
        join(root, 'content', 'blog', `${slug}.mdx`),
        `---\ntitle: ${slug}\nimage: /../secret.bin\n---\nbody\n`,
      )
    }
    const found = findSharedHeroes(root, [])
    assert.equal(found.violations.length, 0)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('an inline hero comment still resolves to the image path', () => {
  const root = mkdtempSync(join(tmpdir(), 'hero-bytes-'))
  try {
    mkdirSync(join(root, 'content', 'blog'), { recursive: true })
    mkdirSync(join(root, 'public', 'images'), { recursive: true })
    writeFileSync(join(root, 'public', 'images', 'shared.png'), 'same-bytes')
    for (const slug of ['alpha', 'beta']) {
      writeFileSync(
        join(root, 'content', 'blog', `${slug}.mdx`),
        `---\ntitle: ${slug}\nimage: "/images/shared.png" # Hero image path\n---\nbody\n`,
      )
    }
    const result = spawnSync(process.execPath, [script], { cwd: root, encoding: 'utf8' })
    assert.equal(result.status, 1)
    const normalized = result.stderr.replace(/\\/g, '/')
    assert.match(normalized, /content\/blog\/alpha\.mdx/)
    assert.match(normalized, /content\/blog\/beta\.mdx/)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('a missing blog hero is hashed as the runtime fallback', () => {
  const root = mkdtempSync(join(tmpdir(), 'hero-bytes-'))
  try {
    mkdirSync(join(root, 'content', 'blog'), { recursive: true })
    mkdirSync(join(root, 'public', 'images', 'blog', 'generated'), { recursive: true })
    const fallback = 'ai-image-video-generation-playbook-2026-premium-hero.png'
    writeFileSync(join(root, 'public', 'images', 'blog', 'generated', fallback), 'fallback-bytes')
    for (const slug of ['video-desk', 'youtube-desk']) {
      writeFileSync(
        join(root, 'content', 'blog', `${slug}.mdx`),
        `---\ntitle: ${slug}\nimage: /images/blog/${slug}-missing.png\n---\nbody\n`,
      )
    }
    const found = findSharedHeroes(root, [])
    assert.equal(found.violations.length, 1)
    assert.match(found.violations[0].detail, /video-desk\.mdx/)
    assert.match(found.violations[0].detail, /youtube-desk\.mdx/)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('slugs from two baseline groups cannot form a new shared hero', () => {
  const root = mkdtempSync(join(tmpdir(), 'hero-bytes-'))
  try {
    writePost(root, 'alpha', '/images/alpha.png', 'same-bytes')
    writePost(root, 'gamma', '/images/gamma.png', 'same-bytes')
    const groups = [new Set(['alpha', 'beta']), new Set(['gamma', 'delta'])]
    const found = findSharedHeroes(root, groups)
    assert.equal(found.violations.length, 1)
    assert.match(found.violations[0].detail, /alpha\.mdx/)
    assert.match(found.violations[0].detail, /gamma\.mdx/)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('drafts and redirect sources are not blog hero candidates', () => {
  const root = mkdtempSync(join(tmpdir(), 'hero-bytes-'))
  try {
    writePost(root, 'alpha', '/images/alpha.png', 'same-bytes')
    mkdirSync(join(root, 'content', 'blog', '_drafts'), { recursive: true })
    writeFileSync(
      join(root, 'content', 'blog', '_drafts', 'alpha.mdx'),
      '---\ntitle: draft\nimage: /images/alpha.png\n---\nbody\n',
    )
    writeFileSync(
      join(root, 'content', 'blog', 'big-props-to-the-builders-of-this-era.mdx'),
      '---\ntitle: redirect\nimage: /images/alpha.png\n---\nbody\n',
    )
    assert.equal(findSharedHeroes(root, []).violations.length, 0)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('the committed allowlist is groups of unique slugs', () => {
  const file = fileURLToPath(new URL('../hero-byte-allowlist.json', import.meta.url))
  const groups = JSON.parse(readFileSync(file, 'utf8'))
  assert.ok(Array.isArray(groups))
  assert.ok(groups.length > 0)
  const slugs = groups.flat()
  assert.equal(new Set(slugs).size, slugs.length)
  assert.ok(groups.every((group) => Array.isArray(group) && group.length >= 2 && group.every((slug) => typeof slug === 'string' && slug.length > 0)))
  assert.equal(slugs.includes('alpha'), false)
})
