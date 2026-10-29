import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import puppeteer from 'puppeteer'
import { startNextServer, stopManagedProcess } from '../tests/helpers/managed-next-process.mjs'

assert.equal(process.env.GITHUB_ACTIONS, 'true', 'Browser execution belongs to the disposable hosted CI runner.')
const external = process.env.GLASS_QA_ORIGIN
const origin = external || 'http://127.0.0.1:4330'
if (external) {
  const url = new URL(external)
  assert.equal(url.protocol, 'https:')
  assert.ok(['www.frankx.ai', 'frankx.ai'].includes(url.hostname))
  assert.equal(url.pathname, '/')
  assert.equal(url.search, '')
  assert.equal(url.username + url.password + url.port, '')
}
const route = '/design-lab/arcanea/liquid-glass'
const output = resolve(process.env.RUNNER_TEMP, external ? 'glass-input-production' : 'glass-input-journey')
await mkdir(output, { recursive: true })
const revision = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
const manifest = {
  author: 'Codex', at: new Date().toISOString(), revision,
  reviewedHead: process.env.REVIEWED_HEAD_SHA || revision,
  environment: external ? 'Public production route; deployment-source binding verified separately' : 'Hosted CI production build; not public production',
  origin, route, checks: [], captures: [],
}
let server
let browser
const logs = []
const pause = ms => new Promise(done => setTimeout(done, ms))
try {
  if (!external) {
    server = startNextServer({ cwd: process.cwd(), port: 4330 })
    server.stdout.on('data', data => logs.push(data.toString()))
    server.stderr.on('data', data => logs.push(data.toString()))
  }
  const deadline = Date.now() + (external ? 240_000 : 60_000)
  for (;;) {
    try {
      const response = await fetch(origin + route, { signal: AbortSignal.timeout(5_000), cache: 'no-store' })
      const html = await response.text()
      if (response.ok && (!external || /aria-invalid="true"/.test(html) && html.includes('-message'))) break
    } catch { /* Wait only within this owned server/deployment budget. */ }
    assert.ok(Date.now() < deadline, 'Glass route did not serve the repaired markup in time')
    assert.ok(!server || server.exitCode === null, 'Owned server exited')
    await pause(1_000)
  }
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  for (const width of [1440, 390]) {
    for (const motion of ['no-preference', 'reduce']) {
      const context = await browser.createBrowserContext()
      try {
        const page = await context.newPage()
        await page.setViewport({ width, height: 1000, deviceScaleFactor: 1, isMobile: width === 390, hasTouch: width === 390 })
        await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: motion }])
        const errors = []
        page.on('pageerror', error => errors.push(error.message))
        const response = await page.goto(origin + route, { waitUntil: 'networkidle2', timeout: 60_000 })
        assert.equal(response.status(), 200)
        await page.waitForSelector('.glass-input-wrapper input')
        const fields = await page.$$eval('.glass-input-wrapper input', inputs => inputs.map(input => ({
          id: input.id, label: input.labels?.[0]?.textContent?.trim(),
          height: input.getBoundingClientRect().height,
          described: input.getAttribute('aria-describedby')?.split(/\s+/).map(id => document.getElementById(id)?.textContent?.trim()) || [],
          invalid: input.getAttribute('aria-invalid'),
        })))
        assert.equal(fields.length, 3)
        assert.equal(new Set(fields.map(field => field.id)).size, fields.length)
        assert.ok(fields.every(field => field.id && field.label && field.height >= 44))
        assert.ok(fields[1].described.some(text => text?.includes('never share')))
        assert.equal(fields[2].invalid, 'true')
        assert.ok(fields[2].described.some(text => text?.includes('8 characters')))
        const labels = await page.$$('.glass-input-wrapper label')
        await labels[0].evaluate(label => label.scrollIntoView({ block: 'center' }))
        if (width === 390) await labels[0].tap()
        else await labels[0].click()
        assert.equal(await page.$eval('.glass-input-wrapper input', input => document.activeElement === input), true)
        await page.keyboard.type('glass-reader-fixture')
        assert.equal(await page.$eval('.glass-input-wrapper input', input => input.value), 'glass-reader-fixture')
        await page.keyboard.press('Tab')
        assert.equal(await page.$$eval('.glass-input-wrapper input', inputs => document.activeElement === inputs[1]), true)
        const focus = await page.$$eval('.glass-input-wrapper input', inputs => {
          inputs[2].focus()
          inputs[1].focus()
          inputs[1].blur()
          inputs[1].focus()
          const style = getComputedStyle(inputs[1])
          return {
            active: document.activeElement === inputs[1], outlineWidth: style.outlineWidth,
            outlineStyle: style.outlineStyle, transitionDuration: style.transitionDuration,
            infinite: inputs[1].closest('.glass-input-wrapper').getAnimations({ subtree: true })
              .some(animation => animation.effect?.getTiming().iterations === Infinity),
          }
        })
        assert.equal(focus.active, true)
        assert.equal(focus.outlineStyle, 'solid')
        assert.equal(focus.outlineWidth, '2px')
        assert.equal(focus.infinite, false)
        if (motion === 'reduce') assert.ok(focus.transitionDuration.split(',').every(value => parseFloat(value) === 0))
        assert.deepEqual(errors, [], 'No page exceptions during input use')
        const section = await page.$('.glass-input-wrapper')
        const filename = `glass-${width}-${motion}.png`
        await section.evaluate(element => element.parentElement.scrollIntoView({ block: 'center' }))
        const group = await section.evaluateHandle(element => element.parentElement)
        await group.asElement().screenshot({ path: resolve(output, filename) })
        manifest.captures.push({ file: filename, width, motion, sha256: createHash('sha256').update(await readFile(resolve(output, filename))).digest('hex') })
        manifest.checks.push({ width, motion, labelsAndMessages: 'pass', touchHeight: 'pass', labelFocus: 'pass', controlledTyping: 'pass', keyboardTab: 'pass', interruptedFocus: focus, pageErrors: errors })
        if (width === 1440 && motion === 'reduce') {
          const session = await page.createCDPSession()
          await session.send('Emulation.setEmulatedMedia', { features: [{ name: 'forced-colors', value: 'active' }] })
          await page.$eval('.glass-input-wrapper input', input => input.focus())
          const outline = await page.$eval('.glass-input-wrapper input', input => ({ width: getComputedStyle(input).outlineWidth, style: getComputedStyle(input).outlineStyle }))
          assert.deepEqual(outline, { width: '2px', style: 'solid' })
          manifest.checks.push({ forcedColors: 'native focus outline visible in computed style' })
          await session.detach()
        }
      } finally { await context.close() }
    }
  }
  manifest.result = 'pass'
} catch (error) {
  manifest.result = 'fail'
  manifest.error = error.stack
  throw error
} finally {
  await writeFile(resolve(output, 'manifest.json'), JSON.stringify(manifest, null, 2))
  await writeFile(resolve(output, 'server.log'), logs.join(''))
  try { await browser?.close() } finally { if (server) await stopManagedProcess(server) }
}
