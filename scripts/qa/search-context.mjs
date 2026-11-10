import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'

assert.equal(process.env.GITHUB_ACTIONS, 'true', 'Run this disposable browser in GitHub Actions.')
const { default: puppeteer } = await import(process.env.SEARCH_BROWSER_MODULE)
const output = resolve(process.env.RUNNER_TEMP, 'search-context')
await mkdir(output, { recursive: true })
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
const manifest = { capturedAt: new Date().toISOString(), origin: 'https://www.frankx.ai', captures: [] }
try {
  for (const width of [1440, 390]) {
    const context = await browser.createBrowserContext()
    const page = await context.newPage()
    await page.setCacheEnabled(false)
    await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 })
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
    const response = await page.goto('https://www.frankx.ai/resources', { waitUntil: 'networkidle2', timeout: 60000 })
    assert.equal(response.status(), 200)
    await page.evaluate(() => document.fonts.ready)
    const bytes = await page.screenshot({ fullPage: true })
    const file = `resources-${width}.png`
    await writeFile(resolve(output, file), bytes)
    manifest.captures.push({ file, width, height: 1000, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') })
    await context.close()
  }
  await writeFile(resolve(output, 'manifest.json'), JSON.stringify(manifest, null, 2))
} finally { await browser.close() }
