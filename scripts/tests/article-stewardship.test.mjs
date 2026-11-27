import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import matter from 'gray-matter'

const ROOT = process.cwd()
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8')

const TARGET_SLUGS = [
  'best-ai-tools-for-creators-2026',
  'agentic-seo-publishing-masterplan',
]

test('upgraded articles carry stewardship metadata, short SERP metadata, native hero manifest entries, and referral disclosures', () => {
  const heroManifest = new Set(JSON.parse(read('data/blog-hero-manifest.json')))

  for (const slug of TARGET_SLUGS) {
    const raw = read(`content/blog/${slug}.mdx`)
    const { data, content } = matter(raw)

    assert.ok(data.title && data.title.length <= 60, `${slug}: title must be <= 60 chars (got ${data.title?.length})`)
    assert.ok(
      data.description && data.description.length <= 155,
      `${slug}: description must be <= 155 chars (got ${data.description?.length})`,
    )
    assert.equal(data.lastUpdated, '2026-11-25', `${slug}: lastUpdated must be 2026-11-25`)
    assert.ok(data.thumbnailHook && data.thumbnailHook.length >= 10, `${slug}: thumbnailHook missing`)
    assert.ok(data.image?.startsWith('/images/blog/native-premium/headers/'), `${slug}: expected native-premium hero`)
    assert.equal(heroManifest.has(data.image), true, `${slug}: ${data.image} missing from blog-hero-manifest.json`)

    assert.ok(data.stewardship && typeof data.stewardship === 'object', `${slug}: stewardship object required`)
    assert.equal(data.stewardship.humanLead, 'Frank Riemer')
    assert.ok(Array.isArray(data.stewardship.roles) && data.stewardship.roles.length >= 3)
    assert.ok(Array.isArray(data.stewardship.models) && data.stewardship.models.length >= 1)
    assert.ok(Array.isArray(data.stewardship.skills) && data.stewardship.skills.length >= 2)
    assert.equal(data.stewardship.verifiedAt, '2026-11-25')

    const firstHopIdx = content.search(/\]\(\/go\/[a-z0-9-]+\)/i)
    assert.notEqual(firstHopIdx, -1, `${slug}: expected active /go/ link`)
    const beforeHop = content.slice(0, firstHopIdx).toLowerCase()
    assert.ok(
      beforeHop.includes('commission') || beforeHop.includes('referral'),
      `${slug}: referral disclosure must appear before first /go/ link`,
    )
  }
})

test('ArticleStewardship, HeroImage, and blog page wiring obey editorial rules', () => {
  const stewardshipSource = read('components/blog/ArticleStewardship.tsx')
  const heroSource = read('components/ui/HeroImage.tsx')
  const blogLib = read('lib/blog.ts')
  const blogPage = read('app/blog/[slug]/page.tsx')

  assert.match(blogLib, /export interface BlogStewardship/)
  assert.match(blogLib, /thumbnailHook\?: string/)
  assert.match(blogLib, /stewardship\?: BlogStewardship/)
  assert.match(heroSource, /thumbnailHook\?: string/)
  assert.match(blogPage, /<ArticleStewardship/)
  assert.match(blogPage, /thumbnailHook=\{post\.thumbnailHook\}/)

  const bannedPhrases = /\b(sovereign|presentationware|unlock|reimagine|transform)\b/i
  assert.doesNotMatch(stewardshipSource, bannedPhrases)
})

test('content-refresh-audit supports --now and prioritizes lastUpdated freshness', () => {
  const output = execFileSync(
    'node',
    ['scripts/content-refresh-audit.mjs', '--all', '--now', '2026-11-25'],
    { cwd: ROOT, encoding: 'utf8' },
  )

  for (const slug of TARGET_SLUGS) {
    const row = output.split(/\r?\n/).find((line) => line.includes(`\`${slug}\``))
    assert.ok(row, `expected row for ${slug}`)
    assert.match(row, /\|\s*0\.0mo\s*\|/, `${slug} should register 0.0mo age when lastUpdated=2026-11-25`)
  }
})
