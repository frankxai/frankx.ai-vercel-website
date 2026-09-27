import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import ts from 'typescript'

const repoFile = (path) => new URL(`../../${path}`, import.meta.url)

function loadModule(path, imports, fetch) {
  const source = readFileSync(repoFile(path), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
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

function loadDownloadRoute(fetch, path = 'app/api/download/route.ts') {
  const registry = JSON.parse(readFileSync(repoFile('data/products.json'), 'utf8'))
  const imports = {
    'next/server': {
      NextResponse: {
        json: (body, init) => Response.json(body, init),
        redirect: (url) => Response.redirect(url, 307),
      },
    },
    '@/data/products.json': { __esModule: true, default: registry },
    '@/lib/download-access': loadModule('lib/download-access.ts', {}, fetch),
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
  const gated = await GET(new Request('https://frankx.ai/api/download/file?key=products/soulbook/soulbook-7-pillars-framework.pdf'))
  const guide = await GET(new Request('https://frankx.ai/api/download/file?key=products/vibe-os/Vibe-OS-Guide.pdf'))
  assert.equal(paid.status, 404)
  assert.equal(arbitrary.status, 404)
  assert.equal(gated.status, 404)
  assert.equal(guide.status, 307)
  assert.match(guide.headers.get('location'), /Vibe-OS-Guide\.pdf$/)
})

test('existing free guide and gated book delivery remain available without audience enrollment', async () => {
  const { GET, POST } = loadDownloadRoute(() => assert.fail('download must not call Resend'))
  const guide = await GET(new Request('https://frankx.ai/api/download?product=vibe-os'))
  assert.equal(guide.status, 307)
  assert.match(guide.headers.get('location'), /Vibe-OS-Guide\.pdf$/)

  const book = await POST(postRequest('love-and-poetry'))
  assert.equal(book.status, 200)
  const result = await book.json()
  assert.equal(result.success, true)
  assert.equal(result.message, 'Your download is ready.')
  assert.doesNotMatch(JSON.stringify(result), /reader@example\.invalid/)
})
