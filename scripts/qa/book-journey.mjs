import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { execFileSync, spawn } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

// CI owns a disposable browser and production server. Interactive local browser
// work uses the harness browser connection instead of launching a second browser.
const origin = 'http://127.0.0.1:4317'
const output = resolve(process.env.RUNNER_TEMP || '.artifacts', 'book-journey')
// Consume the production registry instead of maintaining a second chapter map.
const { default: ts } = await import('typescript')
const registrySource = await readFile('app/books/lib/books-registry.ts', 'utf8')
const registryModule = { exports: {} }
new Function('module', 'exports', ts.transpileModule(registrySource, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(registryModule, registryModule.exports)
const wordless = registryModule.exports.getBookBySlug('the-wordless-laws')
const [firstChapter, secondChapter] = wordless.chapters.filter(chapter => chapter.published)
assert.ok(firstChapter && secondChapter, 'Reading fixture needs two published chapters')
const firstPath = `/books/${wordless.slug}/${firstChapter.slug}`
const secondPath = `/books/${wordless.slug}/${secondChapter.slug}`
const sizes = [
  { name: 'desktop', width: 1440, height: 1000, reducedMotion: false },
  { name: 'tablet', width: 768, height: 1024, reducedMotion: false },
  { name: 'mobile-reduced', width: 375, height: 812, reducedMotion: true },
]

assert.equal(process.env.GITHUB_ACTIONS, 'true', 'This runner is for GitHub Actions; use the connected browser for local QA.')
const revision = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
const manifest = {
  schema: 'frankx.book-journey-evidence.v1', revision,
  reviewedHead: process.env.REVIEWED_HEAD_SHA || revision,
  runAttempt: process.env.GITHUB_RUN_ATTEMPT,
  environment: 'cloud runner, production build; not the live deployment',
  runUrl: `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
  startedAt: new Date().toISOString(), captures: [], checks: [], failures: [],
}
await mkdir(output, { recursive: true })
const saveJson = (name, value) => writeFile(resolve(output, name), JSON.stringify(value, null, 2) + '\n')
const serverLog = []
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '4317'], {
  env: { ...process.env, VERCEL_ENV: 'preview' }, stdio: ['ignore', 'pipe', 'pipe'],
})
server.stdout.on('data', chunk => serverLog.push(chunk.toString()))
server.stderr.on('data', chunk => serverLog.push(chunk.toString()))
let browser
try {
  const deadline = Date.now() + 60_000
  for (;;) {
    try {
      if ((await fetch(`${origin}/books`, { signal: AbortSignal.timeout(5_000) })).ok) break
    } catch { /* allow the server to finish starting */ }
    assert.ok(Date.now() < deadline && server.exitCode === null, 'Production server did not become ready')
    await new Promise(resolveWait => setTimeout(resolveWait, 500))
  }
  const { default: puppeteer } = await import('puppeteer')
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  manifest.browserVersion = await browser.version()

  for (const size of sizes) {
    const context = await browser.createBrowserContext()
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.setDefaultTimeout(20_000)
    await page.setViewport({ width: size.width, height: size.height, deviceScaleFactor: 1, isMobile: size.name.startsWith('mobile'), hasTouch: size.name.startsWith('mobile') })
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: size.reducedMotion ? 'reduce' : 'no-preference' }])

    async function capture(state, selector = '#main') {
      await page.waitForSelector(selector, { visible: true })
      await page.evaluate(() => document.fonts.ready)
      const layout = await page.evaluate(() => ({
        viewportWidth: innerWidth, documentWidth: document.documentElement.scrollWidth,
        heading: document.querySelector('h1')?.textContent?.trim(),
        reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
      }))
      assert.ok(layout.documentWidth <= layout.viewportWidth + 1, `${state}: horizontal overflow at ${size.name}`)
      assert.equal(layout.reducedMotion, size.reducedMotion, `${state}: reduced-motion preference`)
      const name = `${size.name}-${state}.png`
      const bytes = await page.screenshot({ type: 'png', fullPage: false })
      await writeFile(resolve(output, name), bytes)
      const prompt = `Capture the real rendered FrankX ${state} state at ${page.url()}, viewport ${size.width}x${size.height}, DPR 1, reduced motion ${size.reducedMotion}; screenshot the viewport without restyling. Source ${revision}.`
      const sidecar = {
        $schema: 'https://frankx.ai/schemas/vis-provenance-sidecar.schema.json', schema_version: '1.0.0',
        asset: { relative_path: name, media_type: 'image', sha256: createHash('sha256').update(bytes).digest('hex'), version_id: revision },
        generation: { prompt, provider: 'Puppeteer / Chromium', model: 'browser screenshot; no image model', seed: null, created_at: new Date().toISOString(), settings: { ...size, deviceScaleFactor: 1 }, output_paths: [name] },
        agent: { coding_agent: 'GitHub Actions', repo: process.env.GITHUB_REPOSITORY, session_ref: manifest.runUrl },
      }
      await saveJson(`${name}.vis.provenance.json`, sidecar)
      await writeFile(resolve(output, 'image-generation-ledger.jsonl'), JSON.stringify(sidecar) + '\n', { flag: 'a' })
      await writeFile(resolve(output, 'taste-feedback-ledger.jsonl'), JSON.stringify({ kind: 'verification-capture', asset: name, sourceRevision: revision, preference: null, note: 'Automated capture; no human taste decision recorded.' }) + '\n', { flag: 'a' })
      manifest.captures.push({ state, size: size.name, file: name, url: page.url(), layout })
    }
    async function navigate(path) {
      const response = await page.goto(`${origin}${path}`, { waitUntil: 'networkidle2' })
      assert.equal(response?.status(), 200, path)
    }
    async function follow(selector, path) {
      // Match the reader content, not hidden desktop/mobile navigation copies.
      selector = `#main ${selector}`
      await page.waitForSelector(selector, { visible: true })
      if (size.name.startsWith('mobile')) await page.tap(selector)
      else await page.click(selector)
      await page.waitForFunction(expected => location.pathname === expected, {}, path)
    }

    try {
      await navigate('/books')
      await capture('shelf')
      await follow('a[href="/books/the-wordless-laws"]', '/books/the-wordless-laws')
      await page.waitForSelector('h1', { visible: true })
      assert.equal(await page.$('a[href^="/api/download"]'), null, 'An unregistered book must not offer a PDF')
      await capture('wordless-laws')
      await follow(`a[href="${firstPath}"]`, firstPath)
      await page.waitForFunction(title => [...document.querySelectorAll('h1')].some(heading => heading.textContent.trim() === title), {}, firstChapter.title)
      await capture('first-chapter', 'article')
      await follow(`a[href="${secondPath}"]`, secondPath)
      await page.waitForFunction(title => [...document.querySelectorAll('h1')].some(heading => heading.textContent.trim() === title), {}, secondChapter.title)
      await capture('next-chapter', 'article')
      await follow(`a[href="${firstPath}"]`, firstPath)
      await page.waitForSelector('article', { visible: true })
      await follow('a[href="/books/the-wordless-laws"]', '/books/the-wordless-laws')
      await follow('a[href="/books"]', '/books')

      await navigate('/books/love-and-poetry')
      const download = 'a[href="/api/download?product=love-and-poetry"]'
      await page.waitForSelector(download, { visible: true })
      const target = await page.$eval(download, element => ({ text: element.textContent.trim(), height: element.getBoundingClientRect().height }))
      assert.ok(target.height >= 44, 'PDF link must have a 44px touch target')
      assert.match(target.text, /Download .* PDF/)
      assert.equal(await page.$('#main input[type="email"]'), null, 'Downloading a book must not require email')
      await page.$eval(download, element => element.scrollIntoView({ block: 'center' }))
      // Starting from a fresh navigation, reach the link through the actual tab
      // order. Programmatic focus could conceal tabindex/inert regressions.
      let reached = false
      for (let tabs = 0; tabs < 80 && !reached; tabs++) {
        await page.keyboard.press('Tab')
        reached = await page.$eval(download, element => document.activeElement === element)
      }
      assert.ok(reached, 'PDF link must be reachable through the keyboard tab order')
      const focus = await page.$eval(download, element => ({ outline: getComputedStyle(element).outlineStyle, width: getComputedStyle(element).outlineWidth }))
      assert.notEqual(focus.outline, 'none', 'Keyboard focus must be visible')
      assert.ok(parseFloat(focus.width) >= 2, 'Keyboard focus must have a visible outline')
      await capture('pdf-keyboard-focus', download)
      // Observe the real keyboard activation request. Abort navigation before
      // leaving the page, so a retry/reload can still verify recovery.
      let attempt
      const observe = request => {
        const url = new URL(request.url())
        if (url.pathname === '/api/download') {
          attempt = url.searchParams.get('attempt')
          void request.abort('aborted')
        } else void request.continue()
      }
      page.on('request', observe)
      await page.setRequestInterception(true)
      await page.keyboard.press('Enter')
      const clickedDeadline = Date.now() + 10_000
      while (!attempt && Date.now() < clickedDeadline) await new Promise(resolveWait => setTimeout(resolveWait, 50))
      assert.match(attempt || '', /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, 'Keyboard activation must produce a download attempt')
      page.off('request', observe)
      await page.setRequestInterception(false)
      await navigate('/books/love-and-poetry')
      await page.waitForSelector(download, { visible: true })
      // The direct URL is present in server HTML even when scripts are disabled.
      await page.setJavaScriptEnabled(false)
      await navigate('/books/love-and-poetry')
      await page.waitForSelector(download, { visible: true })
      assert.ok(await page.$(download), 'Direct PDF link must work without JavaScript')
      const plainHref = await page.$eval(download, element => element.href)
      const plainResponse = await fetch(plainHref, { redirect: 'manual', signal: AbortSignal.timeout(10_000) })
      assert.equal(plainResponse.status, 307, 'No-JavaScript link must resolve to a PDF redirect')
      assert.deepEqual(errors, [], `Client exceptions at ${size.name}`)
      manifest.checks.push({ viewport: size.name, result: 'passed', readingNavigation: true, keyboardActivationEmitsAttempt: true, linkAvailableAfterAbort: true, noJavaScriptHrefRedirect: true })
    } finally {
      try { await context.close() } catch (error) {
        manifest.failures.push({ message: `Context cleanup failed: ${error.message}` })
        process.exitCode = 1
      }
    }
  }

  const products = JSON.parse(await readFile('data/products.json', 'utf8'))
  const bookSlugs = new Set(registryModule.exports.booksRegistry.map(book => book.slug))
  const publicBookProducts = products.filter(product => bookSlugs.has(product.slug) && product.delivery?.requiresEmail === false && product.delivery.files?.some(file => file.format === 'pdf'))
  const directSlugs = [...new Set(['soulbook', ...publicBookProducts.map(product => product.slug)])]
  assert.ok(directSlugs.length >= 7, 'All seven reviewed free PDFs must retain direct delivery')
  for (const slug of directSlugs) {
    const response = await fetch(`${origin}/api/download?product=${slug}`, { redirect: 'manual', signal: AbortSignal.timeout(10_000) })
    assert.equal(response.status, 307, slug)
    const destination = new URL(response.headers.get('location'))
    const product = products.find(item => item.slug === slug)
    assert.equal(destination.origin, 'https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com')
    assert.equal(destination.pathname, `/${product.delivery.files[0].blobKey}`)
    assert.equal(destination.search, '?download=1')
    manifest.checks.push({ slug, result: 'passed', redirectStatus: response.status, destination: destination.toString(), scope: 'Built route; live file availability checked separately at release' })
  }
  for (const path of ['/api/download?product=the-wordless-laws', '/api/download?product=suno-prompt-library', '/api/download/file?key=unregistered.pdf', '/books/the-wordless-laws/unregistered-chapter']) {
    const response = await fetch(origin + path, { redirect: 'manual', signal: AbortSignal.timeout(10_000) })
    assert.equal(response.status, 404, path)
    manifest.checks.push({ path, result: 'passed', status: response.status })
  }
} catch (error) {
  manifest.failures.push({ message: error.message, stack: error.stack })
  process.exitCode = 1
} finally {
  try { await browser?.close() } catch (error) {
    manifest.failures.push({ message: `Browser cleanup failed: ${error.message}` })
    process.exitCode = 1
  }
  server.kill('SIGTERM')
  await new Promise(resolveExit => {
    if (server.exitCode !== null) return resolveExit()
    server.once('exit', resolveExit)
    setTimeout(() => { server.kill('SIGKILL'); resolveExit() }, 5_000).unref()
  })
  manifest.finishedAt = new Date().toISOString()
  await saveJson('manifest.json', manifest)
  await writeFile(resolve(output, 'server.log'), serverLog.join(''))
  console.log(JSON.stringify({ output, revision, captures: manifest.captures.length, failures: manifest.failures }, null, 2))
}
