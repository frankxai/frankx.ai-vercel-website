import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { test } from 'node:test'
import puppeteer from 'puppeteer'

// Start the storefront locally first. Set GLASS_PREVIEW_BASE_URL to check a
// preview deployment. Screenshots are written only when an output path is given.
const origin = process.env.GLASS_PREVIEW_BASE_URL ?? 'http://localhost:3000'
const screenshotDir = process.env.GLASS_PREVIEW_SCREENSHOTS

test('Glass Essential is an isolated review edition on Aurora', async () => {
  const browser = await puppeteer.launch({ headless: true })
  try {
    for (const [name, width, height] of [['desktop', 1440, 960], ['mobile', 390, 844]]) {
      const page = await browser.newPage()
      await page.setViewport({ width, height })
      const response = await page.goto(new URL('/products/aurora-ui-kit#glass-essential', origin).href)
      assert.equal(response.status(), 200)
      const panel = await page.waitForSelector('#glass-essential')
      assert.equal(await panel.$('iframe'), null)
      await (await panel.$('button')).click()
      await panel.waitForSelector('iframe')
      const text = await panel.evaluate(node => node.innerText)
      assert.match(text, /\$19 catalog price/)
      assert.match(text, /proposed Glass price is €79/)
      assert.match(text, /Purchase is closed/)
      assert.equal(await panel.$('a[href*="checkout"]'), null)
      const iframe = await panel.$('iframe')
      assert.equal(await iframe.evaluate(el => el.getAttribute('sandbox')), 'allow-scripts')
      await iframe.scrollIntoView()
      const frame = await iframe.contentFrame()
      await frame.waitForSelector('.sl-button')
      const frameRequests = []
      page.on('request', request => {
        if (request.frame() === frame) frameRequests.push(request.resourceType())
      })
      const policy = await frame.$eval('meta[http-equiv="Content-Security-Policy"]', el => el.content)
      assert.match(policy, /default-src 'none'/)
      assert.match(policy, /script-src 'sha256-[^']+'/)
      assert.match(policy, /style-src 'sha256-[^']+'/)
      assert.doesNotMatch(policy, /unsafe-inline|unsafe-eval/)
      await frame.locator('input').fill('Research & design')
      await frame.click('.sl-button')
      assert.match(await frame.$eval('[role="status"]', el => el.textContent), /Research & design is ready/)
      await frame.select('select', name === 'desktop' ? 'ember' : 'daylight')
      assert.equal(await frame.$eval('html', el => el.dataset.theme), name === 'desktop' ? 'ember' : 'daylight')
      await frame.click('.sl-toggle')
      assert.equal(await frame.$eval('.sl-toggle', el => el.getAttribute('aria-pressed')), 'false')
      assert.equal(await frame.$('.sl-surface--glass'), null)
      assert.equal(await frame.$eval('body', el => el.scrollWidth <= el.clientWidth), true)
      assert.equal(await page.$eval('body', el => el.scrollWidth <= el.clientWidth), true)
      assert.deepEqual(frameRequests, [])
      if (screenshotDir) {
        await mkdir(screenshotDir, { recursive: true })
        await panel.screenshot({ type: 'webp', quality: 88, path: resolve(screenshotDir, name + '.webp') })
      }
      if (name === 'desktop') {
        await page.setRequestInterception(true)
        page.on('request', request => {
          if (new URL(request.url()).pathname === '/api/products/aurora-ui-kit/essential/manifest') {
            void request.respond({ status: 404, contentType: 'application/json', body: '{}' })
          } else {
            void request.continue()
          }
        })
        await page.reload({ waitUntil: 'domcontentloaded' })
        await (await page.waitForSelector('#glass-essential button')).click()
        await page.waitForFunction(() => document.querySelector('#glass-essential [role="status"]')?.textContent.includes('unavailable'))
        assert.equal(await page.$('#glass-essential iframe'), null)
        const closed = await page.$eval('#glass-essential', el => el.innerText)
        assert.doesNotMatch(closed, /€79|UNLICENSED|80,099/)
      }
      await page.close()
    }
  } finally {
    await browser.close()
  }
})
