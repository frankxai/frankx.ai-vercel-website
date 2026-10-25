import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { createJourneyClickHelpers } from './book-journey-click.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const journeySource = readFileSync(resolve(here, 'book-journey.mjs'), 'utf8')

test('pollInPage waits until both scrollY and target top settle across consecutive checks', async () => {
  const frames = [
    { ok: true, scrollY: 420, top: 310, left: 40 },
    { ok: true, scrollY: 180, top: 240, left: 40 },
    { ok: true, scrollY: 180, top: 212, left: 40 },
    { ok: true, scrollY: 180, top: 212, left: 40 },
  ]
  let evaluations = 0
  const page = {
    async evaluate() {
      const next = frames[Math.min(evaluations, frames.length - 1)]
      evaluations++
      return next
    },
  }
  const { pollInPage } = createJourneyClickHelpers({
    page,
    size: { name: 'desktop' },
    defaultIntervalMs: 1,
  })
  const settled = await pollInPage(() => {}, '#target', 'target must settle', 10, 1)
  assert.equal(evaluations, 4)
  assert.deepEqual(settled, { ok: true, scrollY: 180, top: 212, left: 40 })
})

test('clickTarget retries when Puppeteer throws Node is either not clickable or not an Element', async () => {
  const events = []
  let clicks = 0
  const page = {
    async waitForSelector(selector, options) {
      events.push(['waitForSelector', selector, options?.visible])
    },
    async $eval(selector) {
      events.push(['scrollIntoView', selector])
    },
    async evaluate(_fn, selector) {
      return {
        ok: true,
        reachable: true,
        inViewport: true,
        top: 240,
        left: 120,
        scrollY: 0,
        selector,
      }
    },
    async click(selector) {
      clicks++
      events.push(['click', selector, clicks])
      if (clicks === 1) {
        throw new Error('Node is either not clickable or not an Element')
      }
    },
  }
  const { clickTarget } = createJourneyClickHelpers({
    page,
    size: { name: 'desktop' },
    defaultIntervalMs: 1,
  })
  const result = await clickTarget('#main a[href="/books/the-wordless-laws/chapter-1"]')
  assert.equal(clicks, 2)
  assert.equal(result.ok, true)
  assert.deepEqual(
    events.filter(([kind]) => kind === 'click').map(([, , attempt]) => attempt),
    [1, 2],
  )
})

test('clickTarget uses tap on mobile viewports when tapOnMobile is enabled and rethrows unrelated errors', async () => {
  let taps = 0
  const page = {
    async waitForSelector() {},
    async $eval() {},
    async evaluate() {
      return { ok: true, reachable: true, inViewport: true, top: 100, left: 20, scrollY: 0 }
    },
    async tap() {
      taps++
      if (taps === 1) throw new Error('Node is detached from document')
    },
    async click() {
      throw new Error('Unexpected click failure')
    },
  }
  const mobileHelpers = createJourneyClickHelpers({
    page,
    size: { name: 'mobile-reduced' },
    defaultIntervalMs: 1,
  })
  await mobileHelpers.clickTarget('#main a[href="/books"]', { tapOnMobile: true })
  assert.equal(taps, 2)

  const desktopHelpers = createJourneyClickHelpers({
    page,
    size: { name: 'desktop' },
    defaultIntervalMs: 1,
  })
  await assert.rejects(
    desktopHelpers.clickTarget('#main a[href="/books"]'),
    /Unexpected click failure/,
  )
})

test('book-journey.mjs routes all pointer clicks through clickTarget and settles scroll-to-top before following chapter links', () => {
  assert.equal(journeySource.includes('page.click('), false, 'No direct page.click calls remain in book-journey.mjs')
  assert.equal(journeySource.includes('page.tap('), false, 'No direct page.tap calls remain in book-journey.mjs')
  assert.match(journeySource, /await clickTarget\(toTop, \{ scroll: false \}\)/)
  assert.match(journeySource, /await pollInPage\(\(\) => \(\{ ok: scrollY <= 1, scrollY \}\), undefined, 'Scroll-to-top must settle at the top of the page'\)/)
})
