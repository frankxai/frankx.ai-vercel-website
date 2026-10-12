import assert from 'node:assert/strict'

const SHOT_03 = `Reference: the approved studio character and room.
Start: medium close view, seated character looking at the closed notebook.
Action: the character takes a breath and looks toward the piano.
Camera: one slow forward push, eye level, no orbit or cut.
End: hold the expression briefly so the editor has a clean exit.
Continuity: same clothing, hair, window light and notebook position.
Avoid: additional people, changing props, text overlays, scene transitions.`

// The issued hop is the partner record through the 2026-11-24 recheck.
// After that date the route falls back and this check has to move with a fresh record.
const ISSUED_QUERY = 'fpr=frank-255866'

export async function runHiggsfieldReader({ browser, origin, manifest }) {
  const context = await browser.createBrowserContext()
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  page.setDefaultTimeout(20_000)
  try {
    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 })
    const response = await page.goto(`${origin}/guides/higgsfield-ai-video-guide`, { waitUntil: 'domcontentloaded' })
    assert.equal(response.status(), 200, 'Higgsfield guide')
    await page.waitForFunction(() => [...document.querySelectorAll('h2')].some(heading => heading.textContent.includes('The three shots and the stop rule')))
    await page.waitForFunction(() => [...document.querySelectorAll('button')].some(button => button.textContent.includes('Click to load YouTube')))

    const reader = await page.evaluate(() => {
      const heading = [...document.querySelectorAll('h2')].find(item => item.textContent.includes('The three shots and the stop rule'))
      const next = [...document.querySelectorAll('h2')].find(item => item.textContent.includes('Choose your starting point'))
      const briefLinks = [...document.querySelectorAll('a[href="/downloads/higgsfield-shot-brief.md"]')]
      const between = briefLinks.filter(link =>
        heading
        && next
        && (heading.compareDocumentPosition(link) & Node.DOCUMENT_POSITION_FOLLOWING)
        && (link.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING)
      )
      const aside = document.querySelector('aside[aria-label="Higgsfield"]')
      const note = [...(aside?.querySelectorAll('p') || [])].find(item => item.textContent.startsWith('Affiliate link:'))
      const hop = aside?.querySelector('a[href="/go/higgsfield"]')
      const images = [...document.images].map(image => decodeURIComponent(image.currentSrc || image.src))
      const prefetch = [...document.querySelectorAll('link[rel="prefetch"], link[rel="preload"]')]
        .some(link => (link.getAttribute('href') || '').includes('/go/higgsfield'))
      return {
        between: between.length,
        briefTotal: briefLinks.length,
        body: document.body.innerText,
        html: document.documentElement.innerHTML,
        note: note?.textContent.trim() || '',
        noteBeforeLink: !!(note && hop && (note.compareDocumentPosition(hop) & Node.DOCUMENT_POSITION_FOLLOWING)),
        hopRel: hop?.getAttribute('rel') || '',
        diagram: images.some(src => src.includes('higgsfield-three-shot-stop-rule')),
        prefetch,
        iframe: document.querySelectorAll('iframe[src*="youtube.com"]').length,
      }
    })

    assert.ok(reader.between >= 1, 'Shot brief sits with the stop rule, before the job table')
    assert.ok(reader.briefTotal >= 2, 'The worksheet stays linked at the end of the guide as well')
    assert.equal(reader.body.includes('never burned'), false, 'The guide no longer promises credits are never burned')
    assert.equal(reader.body.includes('remains locked'), false, 'Likeness is an acceptance check, not a lock')
    assert.equal(reader.html.includes('fpr='), false, 'The rendered guide does not contain the issued referral')
    assert.equal(reader.html.includes('/go/higgsfield'), true, 'The call to action uses the hop')
    assert.equal(reader.prefetch, false, 'The hop is not prefetched')
    assert.equal(reader.noteBeforeLink, true, 'Disclosure comes before the referral')
    assert.match(reader.note, /^Affiliate link:/)
    assert.match(reader.hopRel, /\bsponsored\b/)
    assert.equal(reader.diagram, true, 'Stop-rule diagram is on the page')
    assert.equal(reader.iframe, 0, 'YouTube stays unloaded until the reader asks')
    assert.equal(reader.html.includes('tW40b122Rbs'), true)
    assert.equal(reader.html.includes('autoplay=1'), false)

    const play = await page.evaluate(() => {
      const button = [...document.querySelectorAll('button')].find(item => item.textContent.includes('Click to load YouTube'))
      button.scrollIntoView({ block: 'center', behavior: 'instant' })
      button.click()
      return true
    })
    assert.equal(play, true)
    await page.waitForSelector('iframe[src*="tW40b122Rbs"]')
    const embed = await page.$eval('iframe[src*="tW40b122Rbs"]', frame => frame.src)
    const embedUrl = new URL(embed)
    assert.equal(embedUrl.hostname, 'www.youtube.com')
    assert.equal(embedUrl.pathname, '/embed/tW40b122Rbs')
    assert.equal(embedUrl.searchParams.get('autoplay'), null)
    assert.equal(embedUrl.searchParams.get('rel'), '0')

    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1, isMobile: true, hasTouch: true })
    const briefBox = await page.$eval('a[href="/downloads/higgsfield-shot-brief.md"]', link => {
      const bounds = link.getBoundingClientRect()
      return { left: bounds.left, right: bounds.right, width: window.innerWidth, text: link.textContent.trim() }
    })
    assert.equal(briefBox.text, 'shot brief')
    assert.ok(briefBox.left >= 0 && briefBox.right <= briefBox.width + 1, `Brief link fits a phone width: ${JSON.stringify(briefBox)}`)
    assert.deepEqual(errors, [], `Guide client errors: ${errors.join(' | ')}`)

    for (const path of [
      '/downloads/higgsfield-shot-brief.md',
      '/downloads/higgsfield-shot-ledger.csv',
      '/images/editorial/higgsfield-three-shot-stop-rule.svg',
    ]) {
      const asset = await fetch(origin + path, { signal: AbortSignal.timeout(10_000) })
      assert.equal(asset.status, 200, path)
      const text = await asset.text()
      assert.equal(text.includes('fpr='), false, path)
      if (path.endsWith('.md')) assert.equal(text.includes(SHOT_03), true, 'Brief keeps shot 03')
      if (path.endsWith('.csv')) {
        const rows = text.trim().split(/\n/).slice(1)
        assert.deepEqual(rows, ['S01,1,,v1,,,,pending,no,,', 'S02,1,,v1,,,,pending,no,,', 'S03,1,,v1,,,,pending,no,,'])
      }
      if (path.endsWith('.svg')) {
        assert.equal(text.includes('remains locked'), false)
        assert.match(text, /<title[^>]*>Three shots\. One stop rule\.<\/title>/)
      }
    }

    const hop = await fetch(`${origin}/go/higgsfield`, {
      redirect: 'manual',
      headers: { DNT: '1', 'Sec-GPC': '1' },
      signal: AbortSignal.timeout(10_000),
    })
    assert.equal(hop.status, 302, 'Higgsfield hop')
    const location = hop.headers.get('location')
    const destination = new URL(location)
    assert.equal(destination.hostname, 'higgsfield.ai')
    assert.equal(destination.search, `?${ISSUED_QUERY}`)
    assert.deepEqual([...destination.searchParams.keys()], ['fpr'])
    assert.match(hop.headers.get('cache-control') || '', /no-store/)
    assert.equal(hop.headers.get('cache-control').includes('public'), false)

    manifest.checks.push({
      scope: 'higgsfield-reader',
      result: 'passed',
      guide: '/guides/higgsfield-ai-video-guide',
      hop: location,
      disclosureBeforeReferral: true,
      youtubeLoadedOnClick: true,
      phoneBriefLink: briefBox,
    })
  } finally {
    await context.close()
  }
}
