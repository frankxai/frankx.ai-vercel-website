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
const fixture = slug => {
  const book = registryModule.exports.getBookBySlug(slug)
  const chapter = book?.chapters.find(chapter => chapter.published)
  assert.ok(chapter, `${slug}: fixture needs a published chapter`)
  return { book, chapter, path: `/books/${book.slug}/${chapter.slug}` }
}
const poetryFixture = fixture('love-and-poetry')
const sansFixture = fixture('spartan-mindset')
const footnoteFixture = fixture('golden-age-of-intelligence')
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

    async function phase(action) {
      manifest.currentAction = { viewport: size.name, action, at: new Date().toISOString() }
      await saveJson('progress.json', manifest.currentAction)
    }

    async function readability(book, chapter) {
      await page.evaluate(() => document.fonts.ready)
      const type = await page.$eval('.book-reader-content', content => {
        const body = getComputedStyle(content)
        const paragraph = content.querySelector('p')
        const heading = document.querySelector('article h1') || document.querySelector('#main h1')
        return {
          fontFamily: body.fontFamily, headingFamily: getComputedStyle(heading).fontFamily,
          fontSize: parseFloat(body.fontSize), lineHeight: parseFloat(body.lineHeight),
          paragraphMargin: parseFloat(getComputedStyle(paragraph).marginBottom),
          alignment: body.textAlign, h1Count: document.querySelectorAll('#main h1').length,
          contentHeadingCount: content.querySelectorAll('h1').length,
          textLength: content.textContent.trim().length,
        }
      })
      assert.equal(type.h1Count, 1, `${book.slug}/${chapter.slug}: one page heading`)
      assert.equal(type.contentHeadingCount, 0, 'Authored headings cannot duplicate the page title')
      assert.ok(type.textLength > 100, 'The chapter body must be rendered')
      assert.ok(type.fontSize >= 18 && type.lineHeight / type.fontSize >= 1.75, 'Readable body size and leading')
      assert.ok(type.paragraphMargin >= type.fontSize * 1.3, 'Paragraphs need visible separation')
      assert.match(type.fontFamily, book.theme.bodyFont === 'serif' ? /Playfair|Georgia/i : /Inter/i, 'Body font follows the book theme')
      assert.match(type.headingFamily, book.theme.headingFont === 'serif' ? /Playfair|Georgia/i : /Inter/i, 'Heading font follows the book theme')
      if (chapter.type === 'poetry' || chapter.type === 'quotes') assert.equal(type.alignment, 'center', 'Poetry preserves its centered composition')
      manifest.checks.push({ viewport: size.name, path: page.url(), scope: 'Computed reading typography', ...type })
    }

    async function keyboardReach(selector) {
      for (let tabs = 0; tabs < 80; tabs++) {
        await page.keyboard.press('Tab')
        if (await page.$eval(selector, element => document.activeElement === element)) return
      }
      assert.fail(`${selector}: unreachable through the keyboard tab order`)
    }

    async function contentsJump(keyboard = false) {
      const mobile = size.width < 1024
      const contents = `[data-book-toc="${mobile ? 'mobile' : 'desktop'}"]`
      if (mobile) {
        const summary = `${contents} summary`
        if (keyboard) {
          await keyboardReach(summary)
          await page.keyboard.press('Enter')
          await page.keyboard.press('Escape')
          assert.equal(await page.$eval(contents, element => element.open), false, 'Escape closes contents')
          assert.equal(await page.$eval(summary, element => document.activeElement === element), true, 'Escape restores summary focus')
          await page.keyboard.press('Enter')
        } else await page.click(summary)
      }
      const link = `${contents} a`
      const target = await page.$eval(link, element => ({ id: decodeURIComponent(element.hash.slice(1)), height: element.getBoundingClientRect().height }))
      assert.ok(target.height >= 44, 'Contents links need a 44px touch target')
      if (keyboard) {
        await keyboardReach(link)
        const focus = await page.$eval(link, element => ({ style: getComputedStyle(element).outlineStyle, width: parseFloat(getComputedStyle(element).outlineWidth) }))
        assert.notEqual(focus.style, 'none', 'Contents keyboard focus is visible')
        assert.ok(focus.width >= 2, 'Contents focus outline is visible')
        await page.keyboard.press('Enter')
      } else await page.click(link)
      await page.waitForFunction(id => decodeURIComponent(location.hash.slice(1)) === id, {}, target.id)
      await page.waitForFunction(id => {
        const heading = document.getElementById(id)
        const header = document.querySelector('[data-book-reader-header]')
        const top = heading.getBoundingClientRect().top
        return top >= header.getBoundingClientRect().bottom && top <= 200
      }, {}, target.id)
      const sticky = await page.$eval('[data-book-reader-header]', header => ({ actualTop: header.getBoundingClientRect().top, expectedTop: parseFloat(getComputedStyle(header).top) }))
      assert.ok(Math.abs(sticky.actualTop - sticky.expectedTop) <= 1, 'Reader header stays below global navigation after scrolling')
      if (keyboard) assert.equal(await page.evaluate(id => document.activeElement?.id === id, target.id), true, 'Contents activation moves focus to the reading section')
      if (mobile && keyboard) assert.equal(await page.$eval(contents, element => element.open), false, 'Contents closes after choosing a section')
      if (size.reducedMotion) assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto', 'Reduced motion disables smooth page scrolling')
      manifest.checks.push({ viewport: size.name, result: 'passed', scope: keyboard ? 'Keyboard contents navigation' : 'No-JavaScript native contents navigation', target: target.id, sticky })
    }

    async function capture(state, selector = '#main') {
      await page.waitForSelector(selector, { visible: true })
      await page.evaluate(() => document.fonts.ready)
      // Preserve real motion; finish finite header transitions before capture.
      await page.evaluate(async () => {
        const transitions = document.getAnimations().filter(animation => {
          const effect = animation.effect
          return effect?.target instanceof Element && effect.target.closest('header') && effect.getComputedTiming().iterations !== Infinity
        })
        await Promise.all(transitions.map(animation => animation.finished.catch(() => {})))
      })
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
      const status = response?.status()
      // Chromium can expose a conditional 304 on a reload while rendering its
      // cached document. Subsequent DOM/link checks still verify the real page.
      assert.ok(status === 200 || status === 304, `${path}: unexpected document status ${status}`)
      manifest.checks.push({ path, documentStatus: status, scope: 'Browser document navigation; 304 reuses cached content' })
    }
    async function follow(selector, path) {
      // Match the reader content, not hidden desktop/mobile navigation copies.
      selector = `#main ${selector}`
      await page.waitForSelector(selector, { visible: true })
      await page.$eval(selector, element => element.scrollIntoView({ block: 'center', behavior: 'instant' }))
      const target = await page.$eval(selector, element => {
        const bounds = element.getBoundingClientRect()
        const hit = document.elementFromPoint(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)
        return { reachable: hit === element || element.contains(hit), obstructedBy: hit?.closest('a,button,nav,header')?.outerHTML.slice(0, 500) }
      })
      assert.ok(target.reachable, `${selector}: pointer target is obstructed by ${target.obstructedBy}`)
      if (size.name.startsWith('mobile')) await page.tap(selector)
      else await page.click(selector)
      await page.waitForFunction(expected => location.pathname === expected, {}, path)
    }

    try {
      await phase('Read and navigate server HTML with JavaScript disabled')
      await page.setJavaScriptEnabled(false)
      await navigate(firstPath)
      await readability(wordless, firstChapter)
      await follow(`a[href="${secondPath}"]`, secondPath)
      await readability(wordless, secondChapter)
      await contentsJump()
      manifest.checks.push({ viewport: size.name, result: 'passed', noJavaScriptChapterBody: true, noJavaScriptNextChapter: true })
      await page.setJavaScriptEnabled(true)

      await phase('Shelf and reading round trip')
      await navigate('/books')
      await capture('shelf')
      await follow('a[href="/books/the-wordless-laws"]', '/books/the-wordless-laws')
      await page.waitForSelector('h1', { visible: true })
      assert.equal(await page.$('a[href^="/api/download"]'), null, 'An unregistered book must not offer a PDF')
      await capture('wordless-laws')
      await follow(`a[href="${firstPath}"]`, firstPath)
      await page.waitForFunction(title => [...document.querySelectorAll('h1')].some(heading => heading.textContent.trim() === title), {}, firstChapter.title)
      await readability(wordless, firstChapter)
      const readerHeader = await page.$eval('[data-book-reader-header]', header => ({
        bottom: header.getBoundingClientRect().bottom,
        firstContentTop: document.querySelector('article header > div')?.getBoundingClientRect().top,
        returnTargetHeight: header.querySelector('a').getBoundingClientRect().height,
      }))
      assert.ok(readerHeader.returnTargetHeight >= 44, 'Reader return link must have a 44px touch target')
      assert.ok(readerHeader.firstContentTop >= readerHeader.bottom, 'Reader header must not cover the first chapter label')
      await capture('first-chapter', 'article')
      await follow(`a[href="${secondPath}"]`, secondPath)
      await page.waitForFunction(title => [...document.querySelectorAll('h1')].some(heading => heading.textContent.trim() === title), {}, secondChapter.title)
      await capture('next-chapter', 'article')
      await phase('Keyboard contents navigation and sticky header')
      // A fresh document establishes the actual keyboard starting position.
      await navigate(secondPath)
      await readability(wordless, secondChapter)
      await contentsJump(true)
      const dock = await page.$eval('[aria-label="Music player"]', element => ({ width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height }))
      assert.ok(dock.width <= 60 && dock.height <= 60, 'The closed reader music player stays a small corner chip')
      await capture('contents-navigation', 'article')
      const toTop = 'button[aria-label="Scroll to top"]'
      await page.waitForSelector(toTop, { visible: true })
      const clearance = await page.$eval(toTop, element => {
        const target = element.getBoundingClientRect()
        const player = document.querySelector('[aria-label="Music player"]').getBoundingClientRect()
        const hit = document.elementFromPoint(target.x + target.width / 2, target.y + target.height / 2)
        return { clear: target.bottom <= player.top - 8, reachable: hit === element || element.contains(hit), height: target.height }
      })
      assert.ok(clearance.clear && clearance.reachable && clearance.height >= 44, 'Scroll-to-top stays reachable above the music player')
      await page.click(toTop)
      await page.waitForFunction(() => scrollY <= 1)
      manifest.checks.push({ viewport: size.name, result: 'passed', scrollToTopActivation: true, ...clearance })
      await follow(`a[href="${firstPath}"]`, firstPath)
      await page.waitForFunction(title => [...document.querySelectorAll('h1')].some(heading => heading.textContent.trim() === title), {}, firstChapter.title)
      await follow('a[href="/books/the-wordless-laws"]', '/books/the-wordless-laws')
      await follow('a[href="/books"]', '/books')

      await phase('Poetry and sans theme reading')
      for (const [reading, state] of [[poetryFixture, 'poetry-chapter'], [sansFixture, 'sans-chapter']]) {
        await navigate(reading.path)
        await readability(reading.book, reading.chapter)
        await capture(state, '.book-reader-content')
      }

      await phase('Footnote reference and return navigation')
      await navigate(footnoteFixture.path)
      await readability(footnoteFixture.book, footnoteFixture.chapter)
      const noteLink = '.book-reader-content .footnote-ref a'
      const noteId = await page.$eval(noteLink, element => element.hash.slice(1))
      await page.$eval(noteLink, element => element.scrollIntoView({ block: 'center', behavior: 'instant' }))
      await page.click(noteLink)
      await page.waitForFunction(id => location.hash.slice(1) === id, {}, noteId)
      await page.waitForFunction(id => document.getElementById(id).getBoundingClientRect().top >= 0 && document.getElementById(id).getBoundingClientRect().bottom <= innerHeight, {}, noteId)
      const backLink = `.book-reader-content [id="${noteId}"] .footnote-back`
      const referenceId = await page.$eval(backLink, element => element.hash.slice(1))
      await capture('footnotes', backLink)
      await page.click(backLink)
      await page.waitForFunction(id => location.hash.slice(1) === id, {}, referenceId)
      assert.ok(await page.$(`[id="${referenceId}"]`), 'Footnote return target exists')
      await page.waitForFunction(id => {
        const target = document.getElementById(id).getBoundingClientRect()
        const header = document.querySelector('[data-book-reader-header]').getBoundingClientRect()
        return target.top >= header.bottom && target.bottom <= innerHeight
      }, {}, referenceId)
      manifest.checks.push({ viewport: size.name, result: 'passed', footnoteRoundTrip: true })

      await phase('PDF keyboard activation and interruption recovery')
      await navigate('/books/love-and-poetry')
      const download = 'a[href="/api/download?product=love-and-poetry"]'
      await page.waitForSelector(download, { visible: true })
      const target = await page.$eval(download, element => ({ text: element.textContent.trim(), height: element.getBoundingClientRect().height }))
      assert.ok(target.height >= 44, 'PDF link must have a 44px touch target')
      assert.match(target.text, /Download .* PDF/)
      assert.equal(await page.$('#main input[type="email"]'), null, 'Downloading a book must not require email')
      await page.$eval(download, element => element.scrollIntoView({ block: 'center', behavior: 'instant' }))
      // Starting from a fresh navigation, reach the link through the actual tab
      // order. Programmatic focus could conceal tabindex/inert regressions.
      let reached = false
      for (let tabs = 0; tabs < 80 && !reached; tabs++) {
        await page.keyboard.press('Tab')
        reached = await page.$eval(download, element => document.activeElement === element)
      }
      assert.ok(reached, 'PDF link must be reachable through the keyboard tab order')
      // Tab navigation may scroll other links into view. Center the already
      // keyboard-focused target without moving focus or waiting on smooth scroll.
      await page.$eval(download, element => element.scrollIntoView({ block: 'center', behavior: 'instant' }))
      await page.waitForFunction(selector => {
        const element = document.querySelector(selector)
        const bounds = element.getBoundingClientRect()
        const hit = document.elementFromPoint(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)
        return document.activeElement === element && bounds.top >= 64 && bounds.bottom <= innerHeight && (hit === element || element.contains(hit))
      }, {}, download)
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
