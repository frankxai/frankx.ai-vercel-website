import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { execFileSync, spawn } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import puppeteer from 'puppeteer'

assert.equal(process.env.GITHUB_ACTIONS, 'true', 'Use the connected browser for local interactive QA; this disposable runner belongs to CI.')
const origin = 'http://127.0.0.1:4328'
const output = resolve(process.env.RUNNER_TEMP, 'search-journey')
await mkdir(output, { recursive: true })
const revision = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
const manifest = { revision, reviewedHead: process.env.REVIEWED_HEAD_SHA || revision, environment: 'CI production build, not live production', at: new Date().toISOString(), captures: [], checks: [] }
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '4328'], { stdio: ['ignore', 'pipe', 'pipe'] })
const logs = []
server.stdout.on('data', x => logs.push(x.toString()))
server.stderr.on('data', x => logs.push(x.toString()))
let browser
const routes = ['/resources/seo-aeo', '/resources/seo-aeo/workflow', '/resources/seo-aeo/semrush-mcp', '/blog/seo-aeo-optimization-acos', '/blog/aeo-knowledge-graph-2026', '/blog/aeo-playbook-get-cited-by-ai-2026']
const pause = ms => new Promise(done => setTimeout(done, ms))
try {
  const deadline = Date.now() + 60000
  for (;;) {
    try { if ((await fetch(origin + routes[0], { signal: AbortSignal.timeout(5000) })).ok) break } catch { /* bounded server startup */ }
    assert.ok(Date.now() < deadline && server.exitCode === null, 'Search QA server failed to start')
    await pause(500)
  }
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  for (const width of [1440, 390]) {
    const context = await browser.createBrowserContext()
    const page = await context.newPage()
    await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 })
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: width === 390 ? 'reduce' : 'no-preference' }])
    for (const path of routes) {
      await page.setCacheEnabled(false)
      const response = await page.goto(origin + path, { waitUntil: 'networkidle2', timeout: 60000 })
      assert.equal(response.status(), 200, path)
      await page.evaluate(() => document.fonts.ready)
      const state = await page.evaluate(() => ({
        title: document.title,
        canonical: document.querySelector('link[rel=canonical]')?.href,
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        headings: document.querySelectorAll('h1').length,
        heading: document.querySelector('h1')?.textContent,
        fonts: [...document.querySelectorAll('h1, main p, main input')].slice(0, 8).map(x => ({ text: x.textContent?.slice(0, 60), family: getComputedStyle(x).fontFamily, size: getComputedStyle(x).fontSize })),
      }))
      assert.equal(state.canonical, 'https://www.frankx.ai' + path, `${path}: child canonical`)
      assert.equal(state.headings, 1, `${path}: one page heading`)
      assert.ok(state.scrollWidth <= state.width + 1, `${path}: horizontal reflow`)
      if (path.includes('/blog/')) await page.waitForFunction(() => document.body.textContent.includes('Correction, 27 October 2026'))
      const bytes = await page.screenshot({ fullPage: true })
      const name = `${path.slice(1).replaceAll('/', '-')}-${width}.png`
      await writeFile(resolve(output, name), bytes)
      manifest.captures.push({ path, width, height: 1000, reducedMotion: width === 390, file: name, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'), state })
    }

    await page.goto(origin + routes[0], { waitUntil: 'networkidle2' })
    const transmitted = []
    page.on('request', request => { if ((request.url() + (request.postData() || '')).includes('search-fixture-secret-marker')) transmitted.push(request.url()) })
    await page.type('#search-page', 'https://example.test/guide')
    await page.type('#search-market', 'Netherlands, English')
    await page.type('#search-task', 'Complete a synthetic setup exercise')
    await page.type('#search-evidence', 'search-fixture-secret-marker. Synthetic fixture; no real account data.')
    await page.type('#search-scope', 'Draft one page; no external changes')
    await page.focus('#search-page')
    for (const id of ['search-market', 'search-task', 'search-evidence', 'search-scope']) {
      await page.keyboard.press('Tab')
      assert.equal(await page.evaluate(() => document.activeElement.id), id, 'Keyboard field order')
    }
    await page.keyboard.press('Tab')
    assert.equal(await page.evaluate(() => document.activeElement.type), 'submit')
    assert.ok(await page.evaluate(() => parseFloat(getComputedStyle(document.activeElement).outlineWidth) >= 2), 'Visible keyboard focus')
    await page.keyboard.press('Enter')
    await page.waitForSelector('#search-brief-output')
    const brief = await page.$eval('#search-brief-output', element => element.value)
    assert.ok(brief.includes('https://example.test/guide') && brief.includes('search-fixture-secret-marker'))
    assert.ok(brief.includes('Publication: not authorized'))
    const client = await page.createCDPSession()
    const downloadPath = resolve(output, `downloads-${width}`)
    await mkdir(downloadPath, { recursive: true })
    await client.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath })
    async function clickButton(label) {
      for (const button of await page.$$('button')) {
        if ((await button.evaluate(element => element.textContent)).trim() === label) { await button.click(); return }
      }
      throw new Error(`Missing button: ${label}`)
    }
    await clickButton('Download brief')
    let downloaded
    for (let retry = 0; retry < 30; retry++) {
      try { downloaded = await readFile(resolve(downloadPath, 'website-improvement-brief.md'), 'utf8'); break } catch { await pause(100) }
    }
    assert.equal(downloaded, brief, 'Generated file matches reviewed brief')
    await clickButton('Copy brief')
    await page.waitForFunction(() => /copied|selected/.test(document.querySelector('#prepare-brief [role=status]').textContent))
    await page.click('button[type=reset]')
    assert.equal(await page.$('#search-brief-output'), null)
    assert.equal(await page.$eval('#search-page', x => x.value), '')
    assert.equal(transmitted.length, 0, 'Field values stay out of request bodies')
    manifest.checks.push({ width, keyboardOrderAndFocus: 'pass', brief: 'pass', generatedDownload: 'pass', copyOrFallback: 'pass', reset: 'pass', fieldTransmission: 'none observed' })
    await context.close()
  }
  for (const file of ['content-brief.md', 'evidence-record.json', 'measurement-log.csv', 'experiment-protocol.md']) {
    const response = await fetch(`${origin}/downloads/seo-aeo/${file}`)
    assert.equal(response.status, 200)
    const body = await response.text()
    assert.ok(body.length > 100)
    if (file.endsWith('.json')) assert.equal(JSON.parse(body).metrics.estimatedVolume, null)
    manifest.checks.push({ download: file, status: 200 })
  }
  await writeFile(resolve(output, 'manifest.json'), JSON.stringify(manifest, null, 2))
} finally {
  await writeFile(resolve(output, 'server.log'), logs.join(''))
  await browser?.close()
  server.kill('SIGTERM')
}
