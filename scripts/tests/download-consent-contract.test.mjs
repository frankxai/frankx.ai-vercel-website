import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import ts from 'typescript'

const repoFile = (path) => new URL(`../../${path}`, import.meta.url)

function loadModule(path, imports, fetch) {
  const source = readFileSync(repoFile(path), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  })
  const module = { exports: {} }
  new Function('require', 'module', 'exports', 'fetch', outputText)(
    (id) => {
      assert.ok(Object.hasOwn(imports, id), `unexpected import: ${id}`)
      return imports[id]
    },
    module,
    module.exports,
    fetch,
  )
  return module.exports
}

function loadDownloadRoute(fetch, path = 'app/api/download/route.ts', analytics = {}) {
  const registry = JSON.parse(readFileSync(repoFile('data/products.json'), 'utf8'))
  const imports = {
    'next/server': {
      after: (callback) => analytics.scheduled?.push(callback),
      NextResponse: {
        json: (body, init) => Response.json(body, init),
        redirect: (url) => Response.redirect(url, 307),
      },
    },
    '@/data/products.json': { __esModule: true, default: registry },
    '@/lib/download-access': loadModule('lib/download-access.ts', {}, fetch),
    '@/lib/pdf-analytics': {
      TRACKED_GUIDES: new Set(['soulbook', 'vibe-os', 'love-and-poetry', 'spartan-mindset', 'self-development', 'imagination', 'manifestation', 'golden-age']),
      trackDirectDownloadOnce: analytics.track ?? (async () => true),
    },
    '@/lib/ratelimit': {
      analyticsRatelimit: { limit: async () => ({ success: true }) },
      getClientIdentifier: () => 'test-client',
    },
  }
  return loadModule(path, imports, fetch)
}

function postRequest(productSlug, email = 'reader@example.invalid') {
  return new Request('https://frankx.ai/api/download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productSlug, email }),
  })
}

test('an absent offer never makes an unknown product downloadable', () => {
  const { isPublicDownloadProduct } = loadModule('lib/download-access.ts', {}, () => {})
  assert.equal(isPublicDownloadProduct({ id: 'unreviewed-product' }), false)
  assert.equal(isPublicDownloadProduct({ id: 'vibe-os' }), true)
  assert.equal(isPublicDownloadProduct({ id: 'golden-age-book' }), true)
})

test('book download cards only advertise catalogued public PDFs', () => {
  const { hasBookPdf } = loadModule(
    'app/books/components/BookDownloadGate.tsx',
    { 'react/jsx-runtime': {}, './BookDownloadLink': { __esModule: true, default: () => null } },
    () => {},
  )
  const products = JSON.parse(readFileSync(repoFile('data/products.json'), 'utf8'))
  for (const slug of ['love-and-poetry', 'spartan-mindset', 'self-development', 'imagination', 'manifestation', 'golden-age']) {
    assert.equal(hasBookPdf(slug), true, slug)
    const product = products.find((item) => item.slug === slug)
    assert.equal(product?.delivery?.requiresEmail, false, slug)
    assert.match(product?.delivery?.files?.[0]?.blobKey ?? '', /\.pdf$/, slug)
  }
  for (const slug of ['the-wordless-laws', 'fable', 'unlisted-book']) {
    assert.equal(hasBookPdf(slug), false, slug)
  }
})

test('the book link reuses one attempt token without requiring browser storage', () => {
  const jsx = (type, props) => ({ type, props })
  const { default: BookDownloadLink } = loadModule(
    'app/books/components/BookDownloadLink.tsx',
    { 'react/jsx-runtime': { jsx, jsxs: jsx } },
    () => {},
  )
  const anchor = BookDownloadLink({ bookSlug: 'love-and-poetry', bookTitle: 'Love & Poetry', buttonColor: 'from-rose-600 to-rose-500' })
  const link = { href: 'https://frankx.ai/api/download?product=love-and-poetry', dataset: {} }
  anchor.props.onClick({ currentTarget: link })
  const firstAttempt = new URL(link.href).searchParams.get('attempt')
  assert.match(firstAttempt, /^[0-9a-f-]{36}$/)
  anchor.props.onClick({ currentTarget: link })
  assert.equal(new URL(link.href).searchParams.get('attempt'), firstAttempt)
})

test('only production book redirects with valid attempts schedule anonymous analytics', async () => {
  const scheduled = []
  const events = []
  const { GET } = loadDownloadRoute(
    () => assert.fail('unexpected network request'),
    'app/api/download/route.ts',
    { scheduled, track: async (event, attemptId) => { events.push({ event, attemptId }) } },
  )
  const attempt = '123e4567-e89b-42d3-a456-426614174000'
  const url = `https://frankx.ai/api/download?product=love-and-poetry&attempt=${attempt}`
  const previousEnv = process.env.VERCEL_ENV
  try {
    process.env.VERCEL_ENV = 'preview'
    assert.equal((await GET(new Request(url))).status, 307)
    assert.equal(scheduled.length, 0)

    process.env.VERCEL_ENV = 'production'
    const response = await GET(new Request(url))
    assert.equal(response.status, 307)
    assert.match(response.headers.get('location'), /love-and-poetry\.pdf\?download=1$/)
    assert.equal(scheduled.length, 1)
    await scheduled[0]()
    assert.deepEqual(events, [{ event: { guideSlug: 'love-and-poetry', guideTitle: 'Love & Poetry', downloadMethod: 'direct' }, attemptId: attempt }])

    assert.equal((await GET(new Request(url, { headers: { DNT: '1' } }))).status, 307)
    assert.equal((await GET(new Request(url, { headers: { 'Sec-GPC': '1' } }))).status, 307)
    assert.equal((await GET(new Request(url, { method: 'HEAD' }))).status, 307)
    assert.equal((await GET(new Request('https://frankx.ai/api/download?product=love-and-poetry'))).status, 307)
    assert.equal(scheduled.length, 1)

    const goldenAge = await GET(new Request(`https://frankx.ai/api/download?product=golden-age&attempt=${attempt}`))
    assert.equal(goldenAge.status, 307)
    await scheduled[1]()
    assert.equal(events[1].event.guideTitle, 'The Golden Age of Creators')
  } finally {
    if (previousEnv === undefined) delete process.env.VERCEL_ENV
    else process.env.VERCEL_ENV = previousEnv
  }
})

test('PDF analytics allows the registered free book slugs', () => {
  const { TRACKED_GUIDES } = loadModule('lib/pdf-analytics.ts', {
    '@vercel/kv': { createClient: () => ({}) },
    './redis-env': { redisRestConfig: () => ({}) },
  }, () => {})
  for (const slug of ['love-and-poetry', 'spartan-mindset', 'self-development', 'imagination', 'manifestation', 'golden-age']) {
    assert.equal(TRACKED_GUIDES.has(slug), true, slug)
  }
})

test('direct redirect events deduplicate each short-lived link attempt', async () => {
  const keys = new Set()
  const events = []
  let failTrim = false
  const kv = {
    set: async (key) => keys.has(key) ? null : (keys.add(key), 'OK'),
    rpush: async (_key, event) => { events.push(event) },
    ltrim: async () => { if (failTrim) { failTrim = false; throw new Error('trim failed after append') } },
    del: async () => assert.fail('an uncertain append must keep its claim'),
  }
  const { trackDirectDownloadOnce } = loadModule('lib/pdf-analytics.ts', {
    '@vercel/kv': { createClient: () => kv },
    './redis-env': { redisRestConfig: () => ({}) },
  }, () => {})
  const download = { guideSlug: 'love-and-poetry', guideTitle: 'Love & Poetry', downloadMethod: 'direct' }
  const attempt = '123e4567-e89b-42d3-a456-426614174000'
  assert.equal(await trackDirectDownloadOnce(download, attempt), true)
  assert.equal(await trackDirectDownloadOnce(download, attempt), false)
  assert.equal(events.length, 1)
  assert.equal(events[0].sessionId, 'anonymous')
  assert.equal(events[0].userAgent, 'omitted')
  assert.equal(await trackDirectDownloadOnce(download, '123e4567-e89b-42d3-a456-426614174001'), true)
  assert.equal(events.length, 2)

  failTrim = true
  const uncertainAttempt = '123e4567-e89b-42d3-a456-426614174002'
  await assert.rejects(trackDirectDownloadOnce(download, uncertainAttempt), /trim failed/)
  assert.equal(await trackDirectDownloadOnce(download, uncertainAttempt), false)
  assert.equal(events.length, 3)
})

test('a book with downloads but no reader-view events appears in the PDF summary', async () => {
  const now = new Date().toISOString()
  const kv = {
    lrange: async (key) => key === 'pdf-analytics:downloads'
      ? [{ guideSlug: 'love-and-poetry', guideTitle: 'Love & Poetry', timestamp: now, downloadMethod: 'direct', sessionId: 'anonymous', userAgent: 'omitted' }]
      : [],
  }
  const { getAnalyticsSummary } = loadModule('lib/pdf-analytics.ts', {
    '@vercel/kv': { createClient: () => kv },
    './redis-env': { redisRestConfig: () => ({}) },
  }, () => {})
  const summary = await getAnalyticsSummary(30)
  assert.deepEqual(summary.topGuides.find((guide) => guide.slug === 'love-and-poetry'), {
    slug: 'love-and-poetry', title: 'Love & Poetry', views: 0,
    downloads: 1, leads: 0, conversionRate: 0,
  })
})

test('priced products are not exposed by either public download method', async () => {
  const { GET, POST } = loadDownloadRoute(() => assert.fail('unexpected network request'))
  for (const product of ['suno-prompt-library', 'aurora-ui-kit', 'command-center-template']) {
    const get = await GET(new Request(`https://frankx.ai/api/download?product=${product}`))
    const post = await POST(postRequest(product))
    assert.equal(get.status, 404, `${product} GET`)
    assert.equal(post.status, 404, `${product} POST`)
    assert.equal((await get.json()).error, 'Download unavailable')
    assert.equal((await post.json()).error, 'Download unavailable')
  }
})

test('generic file redirects only resolve registered public downloads', async () => {
  const { GET } = loadDownloadRoute(
    () => assert.fail('unexpected network request'),
    'app/api/download/file/route.ts',
  )
  const paid = await GET(new Request('https://frankx.ai/api/download/file?key=suno-prompt-library-guide.pdf'))
  const arbitrary = await GET(new Request('https://frankx.ai/api/download/file?key=other-file.pdf'))
  const gated = await GET(new Request('https://frankx.ai/api/download/file?key=products/5-suno-prompts/5-suno-prompts.pdf'))
  const soulbook = await GET(new Request('https://frankx.ai/api/download/file?key=products/soulbook/soulbook-7-pillars-framework.pdf'))
  const guide = await GET(new Request('https://frankx.ai/api/download/file?key=products/vibe-os/Vibe-OS-Guide.pdf'))
  assert.equal(paid.status, 404)
  assert.equal(arbitrary.status, 404)
  assert.equal(gated.status, 404)
  assert.equal(soulbook.status, 307)
  assert.equal(guide.status, 307)
  assert.match(guide.headers.get('location'), /Vibe-OS-Guide\.pdf$/)
})

test('every free book PDF downloads without email or audience enrollment', async () => {
  const { GET, POST } = loadDownloadRoute(() => assert.fail('download must not call Resend'))
  const guide = await GET(new Request('https://frankx.ai/api/download?product=vibe-os'))
  assert.equal(guide.status, 307)
  assert.match(guide.headers.get('location'), /Vibe-OS-Guide\.pdf\?download=1$/)

  for (const slug of ['soulbook', 'love-and-poetry', 'spartan-mindset', 'self-development', 'imagination', 'manifestation', 'golden-age']) {
    const response = await GET(new Request(`https://frankx.ai/api/download?product=${slug}`))
    assert.equal(response.status, 307, slug)
    assert.match(response.headers.get('location'), /\.pdf\?download=1$/, slug)
  }

  // Keep the legacy POST contract while existing callers migrate to direct links.
  const book = await POST(postRequest('love-and-poetry'))
  assert.equal(book.status, 200)
  const result = await book.json()
  assert.equal(result.success, true)
  assert.equal(result.message, 'Your download is ready.')
  assert.doesNotMatch(JSON.stringify(result), /reader@example\.invalid/)
})
