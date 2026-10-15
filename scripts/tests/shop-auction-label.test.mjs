import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import ts from 'typescript'

const repoFile = (path) => new URL(`../../${path}`, import.meta.url)

function loadAuctions() {
  const { outputText } = ts.transpileModule(readFileSync(repoFile('lib/auctions.ts'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  })
  const module = { exports: {} }
  new Function('module', 'exports', outputText)(module, module.exports)
  return module.exports
}

const { auctionShopLabel } = loadAuctions()
const drops = JSON.parse(readFileSync(repoFile('data/auctions.json'), 'utf8'))
const shopSource = readFileSync(repoFile('app/shop/page.tsx'), 'utf8')

test('the shop never labels closed drops live', () => {
  const afterEveryWindow = Math.max(...drops.map((drop) => Date.parse(drop.endTime))) + 1
  const label = auctionShopLabel(drops, afterEveryWindow)
  assert.equal(label.badge, 'All drops closed')
  assert.equal(label.title, 'Auctions')
  assert.equal(label.priceRange, '')
})

test('an open window is labelled live, priced from its real starting bid', () => {
  const open = [{ status: 'active', startingBid: 67, startTime: '2026-01-01T00:00:00Z', endTime: '2026-01-31T00:00:00Z' }]
  const label = auctionShopLabel(open, Date.parse('2026-01-15T00:00:00Z'))
  assert.deepEqual(label, { title: 'Live auctions', badge: 'Live', priceRange: 'Bids from $67' })
})

test('the shop page derives the auction label instead of hardcoding it', () => {
  assert.match(shopSource, /auctionShopLabel\(auctions, nowTs\)/)
  assert.match(shopSource, /useState<number \| null>\(null\)/, 'the first render must not read the clock')
  assert.doesNotMatch(shopSource, /'Live Auctions'|badge: 'Live'/)
})

test('a drop with status upcoming is labelled upcoming, as /auctions lists it open', () => {
  const upcoming = [{ status: 'upcoming', startingBid: 67, startTime: '2026-02-01T00:00:00Z', endTime: '2026-02-28T00:00:00Z' }]
  const label = auctionShopLabel(upcoming, Date.parse('2026-01-15T00:00:00Z'))
  assert.deepEqual(label, { title: 'Auctions', badge: 'Upcoming', priceRange: '' })
})

test('an active drop before its start time is neither upcoming nor closed on the shop', () => {
  const scheduled = [{ status: 'active', startingBid: 67, startTime: '2026-02-01T00:00:00Z', endTime: '2026-02-28T00:00:00Z' }]
  const label = auctionShopLabel(scheduled, Date.parse('2026-01-15T00:00:00Z'))
  assert.deepEqual(label, { title: 'Auctions', badge: 'See drop schedule', priceRange: '' })
})

test('the prerendered auction badge claims neither live nor closed', () => {
  assert.doesNotMatch(shopSource, /badge: 'All drops closed'/)
})
