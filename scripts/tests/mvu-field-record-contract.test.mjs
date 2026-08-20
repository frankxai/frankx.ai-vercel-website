import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { enumerateRoutes } from '../../lib/route-enumeration.mjs'

const root = process.cwd()
const read = (path) => readFileSync(join(root, path), 'utf8')

const hub = read('app/mvu/page.tsx')
const entryRoute = read('app/mvu/[slug]/page.tsx')
const corpusLibrary = read('lib/mvu.ts')
const legacyRedirects = read('next.config.mjs')
const insightDecay = read('content/mvu/2026-07-22-insight-decay.md')
const expertAuthority = read('components/expert-authority/ExpertAuthorityExperience.tsx')
const sabrina = read('app/mvu/sabrina/page.tsx')
const ogImage = read('app/mvu/opengraph-image.tsx')
const workshops = read('app/workshops/page.tsx')
const routeIndex = JSON.parse(read('data/route-index.json'))

test('MVU hub states the editorial truth and derives its corpus counts', () => {
  const files = readdirSync(join(root, 'content/mvu')).filter((name) => /\.mdx?$/.test(name))
  const contents = files.map((name) => read(`content/mvu/${name}`))
  const publicCount = contents.filter((source) => /^published: true$/m.test(source)).length
  const heldCount = contents.filter((source) => /^published: false$/m.test(source)).length

  assert.equal(files.length, 28)
  assert.equal(publicCount, 14)
  assert.equal(heldCount, 14)
  // Source-led layer system uses getMvuEntrySummaries with MvuLayer types
  assert.match(corpusLibrary, /export type MvuLayer/)
  assert.match(hub, /getMvuEntrySummaries\(\)/)
  assert.match(hub, /type MvuLayer/)
  assert.match(hub, /One week changed more than I expected\./)
  assert.doesNotMatch(hub, /This is the whole record/)
  assert.doesNotMatch(hub, /not a speaker|No stage, no session, no booth/)
})

test('MVU continuation stays contextual instead of dropping into generic contact', () => {
  // Source-led design includes unhooking practice guide and contextual CTAs
  assert.match(hub, /href="\/mvu\/unhooking-the-mind"/)
  assert.match(hub, /href="\/connect\?ref=mvu"/)
  assert.doesNotMatch(hub, /\/connect\?ref=mvu-porto/)
  assert.match(entryRoute, /href="\/mvu#what-followed"/)
  assert.doesNotMatch(entryRoute, /\/connect\?ref=mvu-porto/)
})

test('completed Tallinn proposal routes retire into the canonical field record', () => {
  assert.match(legacyRedirects, /source: '\/experiences\/tallinn-2026'/)
  assert.match(legacyRedirects, /source: '\/experiences\/tallinn-2026\/:path\*'/)
  assert.match(legacyRedirects, /source: '\/experiences\/mvu-tallinn-2026'/)
  assert.match(legacyRedirects, /source: '\/experiences\/mindvalley-university-tallinn-2026'/)
  assert.match(legacyRedirects, /destination: '\/mvu'/)

  const retiredRoots = [
    '/experiences/tallinn-2026',
    '/experiences/mvu-tallinn-2026',
    '/experiences/mindvalley-university-tallinn-2026',
  ]
  const enumeratedHrefs = enumerateRoutes().map((route) => route.href)
  const indexedHrefs = routeIndex.routes.map((route) => route.href)

  for (const rootPath of retiredRoots) {
    const isRetiredFamily = (href) => href === rootPath || href.startsWith(`${rootPath}/`)
    assert.equal(enumeratedHrefs.some(isRetiredFamily), false, `${rootPath} must not be enumerated`)
    assert.equal(indexedHrefs.some(isRetiredFamily), false, `${rootPath} must not be indexed`)
  }

  assert.doesNotMatch(workshops, /\/experiences\/tallinn-2026|Tallinn Session Amplifier|Amplify your session/)
  assert.match(workshops, /href="#bring-your-room"/)
  assert.match(workshops, /href="\/contact\?intent=workshop"/)
})

test('known stale or unsupported MVU claims do not return', () => {
  assert.doesNotMatch(insightDecay, /half-life|seventy-two|72 hours/i)
  assert.doesNotMatch(expertAuthority, /MVU Tallinn field release/)
  assert.doesNotMatch(expertAuthority, /€15,000|€100,000|custom intelligence graph/i)
  assert.doesNotMatch(sabrina, /Continue this in Tallinn/)
})

test('MVU has route-specific social packaging and static public routes', () => {
  // Source-led design uses updated title and revalidation strategy
  assert.match(ogImage, /MVU Tallinn Field Atlas|What stayed after Tallinn/)
  assert.doesNotMatch(hub, /frankx-public-workspace-og/)
  assert.match(hub, /export const revalidate = 3600/)
  assert.match(entryRoute, /export const dynamic = 'force-static'/)
  assert.match(entryRoute, /export const dynamicParams = false/)
})
