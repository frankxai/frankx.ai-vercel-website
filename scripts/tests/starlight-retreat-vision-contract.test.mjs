import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const root = process.cwd()
const read = (path) => readFileSync(join(root, path), 'utf8')

const route = read('app/retreats/page.tsx')
const page = read('components/retreats/StarlightRetreatVision.tsx')
const pathfinder = read('components/retreats/RetreatPathfinder.tsx')
const evidence = JSON.parse(read('docs/premium-web-os/starlight-retreat-vision-design-loop-evidence.json'))
const heroPath = join(root, 'public/images/retreats/starlight-retreat-hero.webp')

test('the retreat vision stays unlisted and public-safe in the stacked review wave', () => {
  assert.match(route, /path: '\/retreats'/)
  assert.match(route, /noindex: true/)
  assert.match(page, /No venue or date announced/)
  assert.match(page, /No property, date, availability, partnership or price is confirmed/)
  assert.doesNotMatch(page, /book now|reserve your place|limited spots|guaranteed transformation/i)
  assert.doesNotMatch(page, /Ana Cancino|Mindvalley University|Tony Robbins|Singularity University/)
})

test('the ladder distinguishes prepared, conceptual, developing and future formats', () => {
  for (const status of ['Prepared', 'Concept', 'In development', 'Designed method', 'Future']) {
    assert.match(page, new RegExp(status))
  }
  assert.match(page, /20–24 person destination format/)
  assert.match(page, /Purpose to Practice/)
  assert.match(page, /Creation Chambers/)
  assert.match(page, /Arcanea Experiences/)
})

test('the pathfinder creates useful local state without collecting personal data', () => {
  assert.match(pathfinder, /useState/)
  assert.match(pathfinder, /aria-pressed/)
  assert.match(pathfinder, /aria-live="polite"/)
  assert.match(pathfinder, /retreat_path_selected/)
  assert.doesNotMatch(pathfinder, /email|fullName|phone|companyOrProject|fetch\(/i)
})

test('the generated-owned hero exists, is lightweight and is labelled as representative', () => {
  assert.equal(existsSync(heroPath), true)
  assert.ok(statSync(heroPath).size < 500_000)
  assert.match(page, /Representative concept visual — not a confirmed venue/)
  assert.equal(evidence.asset_quality.tier, 'B')
  assert.equal(evidence.asset_quality.source_method, 'generated-media')
  assert.equal(evidence.asset_quality.provenance, 'generated')
})

test('all conversion routes use the prepared proof product instead of a new intake', () => {
  assert.match(page, /href="\/experiences\/tallinn-2026"/)
  assert.match(pathfinder, /href="\/experiences\/tallinn-2026"/)
  assert.doesNotMatch(page, /<form|\/api\//)
  assert.doesNotMatch(pathfinder, /<form|\/api\//)
})
