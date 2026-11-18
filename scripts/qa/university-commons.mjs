import assert from 'node:assert/strict'
import { resolve } from 'node:path'
import paths from '../../content/university/paths.json' with { type: 'json' }
import briefs from '../../content/partnerships/university-challenges.json' with { type: 'json' }

// Runs in the site's existing search journey, against its disposable built app.
export async function verifyCommons(browser, origin, output) {
  const context = await browser.createBrowserContext()
  const page = await context.newPage()
  const marker = 'commons-unpublished-query'
  const leaked = []
  page.on('request', request => {
    if ((request.url() + (request.postData() || '')).includes(marker)) leaked.push(request.url())
  })
  try {
    await page.setViewport({ width: 320, height: 800 })
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
    const routes = ['/university', '/university/resources', ...paths.map(p => '/university/' + p.slug),
      ...briefs.map(b => '/university/challenges/' + b.id)]
    for (const route of routes) {
      const response = await page.goto(origin + route, { waitUntil: 'domcontentloaded' })
      assert.equal(response.status(), 200, route)
      assert.equal(await page.$eval('link[rel=canonical]', el => el.href), 'https://www.frankx.ai' + route)
      assert.equal(await page.$$eval('main h1', items => items.length), 1)
      assert.ok(await page.$eval('main', el => el.scrollWidth <= innerWidth + 1), route + ' reflows')
      if (paths.some(p => route === '/university/' + p.slug)) {
        assert.equal(await page.$$eval('main ol li', items => items.length), 4)
        assert.ok(await page.$('main a[href="/partnerships/universities#join"]'))
      }
    }

    await page.goto(origin + '/university/resources', { waitUntil: 'networkidle2' })
    const count = await page.$$eval('main li', items => items.length)
    assert.ok(count >= 20 && count <= 30)
    await page.type('main input[type=search]', 'rubric')
    await page.select('main select', 'Template')
    await page.waitForFunction(() => document.querySelectorAll('main li').length === 1)
    await page.focus('main input')
    await page.keyboard.press('Tab')
    assert.equal(await page.evaluate(() => document.activeElement.tagName), 'SELECT')
    await page.type('main input', marker)
    await page.waitForFunction(() => document.querySelector('main [aria-live]').textContent === '0 resources')
    await page.click('main button')
    await page.waitForFunction(n => document.querySelectorAll('main li').length === n, {}, count)
    assert.equal(new URL(page.url()).search, '')
    assert.deepEqual(leaked, [])
    await page.goto(origin + '/university', { waitUntil: 'networkidle2' })
    await page.screenshot({ path: resolve(output, 'commons-mobile.png') })
    await page.setViewport({ width: 1440, height: 900 })
    await page.screenshot({ path: resolve(output, 'commons-desktop.png') })

    await page.setJavaScriptEnabled(false)
    await page.goto(origin + '/university/resources', { waitUntil: 'domcontentloaded' })
    assert.equal(await page.$$eval('main li', items => items.length), count)
    assert.ok(await page.$eval('main input', el => el.getClientRects().length === 0))
    const missing = await page.goto(origin + '/university/unknown-role')
    assert.equal(missing.status(), 404)
    return { commonsRoutes: routes.length, resources: count, narrowWidth: 320, noJavaScript: true, keyboardAndFilters: 'pass' }
  } finally {
    await context.close()
  }
}
