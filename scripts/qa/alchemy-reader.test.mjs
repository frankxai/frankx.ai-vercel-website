import assert from 'node:assert/strict'
import { resolve } from 'node:path'

export async function runAlchemyReader({ browser, origin, manifest, output }) {
  const context = await browser.createBrowserContext()
  const page = await context.newPage()
  page.setDefaultTimeout(15_000)
  try {
    // Exercise our player lifecycle regardless of YouTube consent, geography or availability.
    await page.setRequestInterception(true)
    page.on('request', request => {
      const url = new URL(request.url())
      if (url.origin === 'https://www.youtube.com' && url.pathname.startsWith('/embed/')) {
        void request.respond({ status: 200, contentType: 'text/html', body: '<title>Player fixture</title>' })
      } else if (url.origin === origin || url.protocol === 'data:') {
        void request.continue()
      } else {
        void request.abort()
      }
    })
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
    const response = await page.goto(origin + '/alchemy', { waitUntil: 'networkidle2' })
    assert.equal(response.status(), 200)
    assert.equal(await page.$$eval('dialog iframe', frames => frames.length), 0)
    await page.screenshot({ path: resolve(output, 'alchemy-desktop.png') })
    const closing = 'button[aria-label="Close video"]'
    for (const [section, title, id, escape] of [
      ['shorts', 'Indigo Oxidation at work!', 'B1ny-1H2Bww', true],
      ['films', 'Egyptian blue on the Parthenon sculptures', 'uwDHi2KNM4s', false],
    ]) {
      const trigger = '#' + section + ' button[aria-label^="Play"]'
      await page.focus(trigger)
      await page.keyboard.press('Enter')
      await page.waitForSelector('dialog[open] iframe', { visible: true })
      const state = await page.$eval('dialog', dialog => ({
        title: document.getElementById(dialog.getAttribute('aria-labelledby')).textContent,
        source: dialog.querySelector('iframe').src,
        focusedControl: document.activeElement.getAttribute('aria-label'),
      }))
      assert.equal(state.title, title)
      assert.equal(new URL(state.source).pathname, '/embed/' + id)
      assert.equal(state.focusedControl, 'Close video')
      if (escape) await page.keyboard.press('Escape')
      else await page.click(closing)
      await page.waitForFunction(() => !document.querySelector('dialog[open], dialog iframe'))
      assert.equal(await page.$eval(trigger, button => button === document.activeElement), true)
    }
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.screenshot({ path: resolve(output, 'alchemy-mobile.png') })
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
    manifest.checks.push({ path: '/alchemy', result: 'passed', scope: 'Film selection, native dialog focus and return, embed cleanup and mobile width' })
  } finally {
    await context.close()
  }
}
