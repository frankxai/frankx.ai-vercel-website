import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { comparePrimaryAction } from './commerce-visual.mjs'
import { chromium } from 'playwright-core'
import { startNextServer, stopManagedProcess } from '../tests/helpers/managed-next-process.mjs'

const origin = 'http://127.0.0.1:4331'
const editions = [
  { slug: 'starter-kit', title: 'System Architect Starter Kit' },
  { slug: 'aurora-ui-kit', title: 'Aurora UI Kit' },
]
const evidence = resolve(process.env.RUNNER_TEMP ?? '.next', 'commerce-journey')
const widths = [390, 1440]
const visual = []
const axePath = fileURLToPath(import.meta.resolve('axe-core/axe.min.js'))

async function inspectClosedEdition(page, { slug, title }, width) {
  const detail = '/products/' + slug
  const checkout = '/checkout/' + slug
  const waitlist = '/waitlist?intent=' + slug
  const response = await page.goto(origin + checkout)
  assert.equal(response?.status(), 200)
  for (const path of [checkout, detail]) {
    await page.getByRole('heading', { name: title, level: 1, exact: true }).waitFor()
    assert.equal(await page.getByRole('link', { name: /^buy now\b/i }).count(), 0,
      slug + ' must remain closed with a configured merchant')
    assert.equal(await page.locator('form[action^="/api/checkout"], a[href*=".lemonsqueezy.com/checkout/"], a[href^="https://buy.stripe.com/"]').count(), 0)
    const join = page.getByRole('link', { name: /join (the )?(launch list|waitlist)/i })
      .and(page.locator('a[href="' + waitlist + '"]'))
    await join.waitFor()
    assert.equal(await join.count(), 1)
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      'Commerce content overflows the viewport')
    await join.focus()
    assert.equal(await join.evaluate(node => node === document.activeElement), true)

    // Scope WCAG results to this edition's primary actions; the shared site
    // chrome and the rest of the product page need their own accessibility QA.
    const violations = await join.evaluate(async link => {
      const result = await window.axe.run(link.parentElement, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      })
      return result.violations.map(({ id, nodes }) => ({ id, elements: nodes.map(node => node.target) }))
    })
    assert.deepEqual(violations, [], 'Accessibility violations on ' + path)
    await page.evaluate(() => document.fonts.ready)
    if (slug === 'aurora-ui-kit') {
      const filename = path.split('/')[1] + '-' + width + '.png'
      const actual = await join.screenshot({
        path: resolve(evidence, 'actual-' + filename),
        animations: 'disabled',
      })
      const golden = resolve('scripts/qa/commerce-baselines', filename)
      visual.push({ path, width, changedFraction: await comparePrimaryAction(golden, actual) })
    }
    await page.screenshot({ path: resolve(evidence, path.slice(1).replace('/', '-') + '-' + width + '.png'), animations: 'disabled' })
    if (path === checkout) {
      await page.keyboard.press('Tab')
      const back = page.getByRole('link', { name: /view product details/i })
      assert.equal(await back.getAttribute('href'), detail)
      assert.equal(await back.evaluate(node => node === document.activeElement), true)
      await Promise.all([page.waitForURL(origin + detail), page.keyboard.press('Enter')])
    }
  }
}

// Exercise a wired merchant with a pre-stage SKU. Credentials below are
// synthetic. The browser permits GET/HEAD against the local build only.
Object.assign(process.env, {
  LEMON_SQUEEZY_API_KEY: 'fixture-no-network',
  LEMON_SQUEEZY_STORE_ID: 'commerce-qa',
  LEMON_SQUEEZY_VARIANT_STARTER_KIT: '1',
})

const server = startNextServer({ cwd: process.cwd(), port: 4331 })
server.stdout.resume()
server.stderr.pipe(process.stderr)
let browser
try {
  const deadline = Date.now() + 60_000
  for (;;) {
    assert.equal(server.exitCode, null, 'Owned Next server exited')
    assert.ok(Date.now() < deadline, 'Checkout route did not start')
    const result = await fetch(origin + '/checkout/starter-kit', { signal: AbortSignal.timeout(3000) }).catch(() => null)
    if (result) {
      assert.equal(result.status, 200, 'Checkout route must render')
      break
    }
    await new Promise(done => setTimeout(done, 300))
  }

  await mkdir(evidence, { recursive: true })
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || await (await import('puppeteer')).executablePath({ headless: 'shell' })
  browser = await chromium.launch({ executablePath })
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      hasTouch: width === 390,
      isMobile: width === 390,
      reducedMotion: 'reduce',
      serviceWorkers: 'block',
    })
    try {
      await context.addInitScript({ path: axePath })
      await context.route('**/*', route => {
        const request = route.request()
        return new URL(request.url()).origin === origin && ['GET', 'HEAD'].includes(request.method())
          ? route.continue()
          : route.abort()
      })
      const page = await context.newPage()
      for (const edition of editions) await inspectClosedEdition(page, edition, width)
    } finally {
      await context.close()
    }
  }
  await writeFile(resolve(evidence, 'result.json'), JSON.stringify({
    editions, widths, visual,
    builtCommit: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
    prHead: process.env.REVIEWED_HEAD_SHA || null,
    browser: browser.version(),
    environment: 'local production build with synthetic merchant configuration',
  }, null, 2))
} finally {
  try { await browser?.close() } finally { await stopManagedProcess(server) }
}
