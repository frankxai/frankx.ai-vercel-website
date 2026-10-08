import assert from 'node:assert/strict'
import { once } from 'node:events'
import { existsSync, readFileSync } from 'node:fs'
import net from 'node:net'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import ts from 'typescript'
import { fromHtml } from 'hast-util-from-html'
import { toString as textOf } from 'hast-util-to-string'

import { startNextServer, stopManagedProcess } from './helpers/managed-next-process.mjs'

// #919 shipped server-rendered chapters that passed CI but returned 500 in production for
// every chapter not prerendered at build time: the sanitizer pulled jsdom, whose
// html-encoding-sniffer require()s the ESM-only @exodus/bytes (ERR_REQUIRE_ESM on Vercel).
// This runs against the production build (after `next build`) and checks the request-time path.
const rootDirectory = fileURLToPath(new URL('../..', import.meta.url))
const fromRoot = path => new URL(path, new URL('../../', import.meta.url))
const registryModule = { exports: {} }
new Function('module', 'exports', ts.transpileModule(readFileSync(fromRoot('app/books/lib/books-registry.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText)(registryModule, registryModule.exports)
const { getBookBySlug } = registryModule.exports

function chapterFixture(bookSlug, chapterSlug, { first = false, anchor } = {}) {
  const book = getBookBySlug(bookSlug)
  const published = book?.chapters.filter(chapter => chapter.published) ?? []
  const chapter = published.find(candidate => candidate.slug === chapterSlug)
  assert.ok(chapter, `${bookSlug}/${chapterSlug} must be a published chapter`)
  assert.equal(published[0] === chapter, first, `${bookSlug}/${chapterSlug}: ${first ? 'expected the prebuilt first chapter' : 'must not be the prebuilt first chapter'}`)
  return { book, chapter, first, anchor, path: `/books/${book.slug}/${chapter.slug}` }
}

const fixtures = [
  chapterFixture('golden-age-of-intelligence', 'chapter-05-states-not-stages'),
  chapterFixture('the-wordless-laws', 'the-knowing-that-sleeps', { anchor: 'the-pattern' }),
  chapterFixture('spartan-mindset', 'chapter-03-one-more-rep'),
  chapterFixture('fable', '12-the-teachers-test'),
  chapterFixture('golden-age-of-intelligence', 'chapter-01-the-two-intelligences-awakening', { first: true }),
]
const jsdomChain = /(?:^|\/)(?:jsdom|isomorphic-dompurify|html-encoding-sniffer|@exodus[+/]bytes)(?:@|\/|$)/

async function getAvailablePort() {
  const server = net.createServer()
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const { port } = server.address()
  await new Promise((resolve, reject) => server.close(error => (error ? reject(error) : resolve())))
  return port
}

async function waitForReady(url, child, output) {
  for (let attempt = 0; attempt < 300; attempt += 1) {
    if (child.spawnError) throw child.spawnError
    if (child.exitCode !== null) throw new Error(`next start exited before readiness:\n${output()}`)
    try {
      if ((await fetch(url)).ok) return
    } catch {
      // The managed server may not have opened its listener yet.
    }
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  throw new Error(`next start did not become ready:\n${output()}`)
}

function walk(node, visit) {
  for (const child of node.children ?? []) {
    if (child.type !== 'element') continue
    visit(child)
    walk(child, visit)
  }
}
function find(node, test) {
  const found = []
  walk(node, element => { if (test(element)) found.push(element) })
  return found
}
const hasClass = (element, name) => (element.properties.className ?? []).includes(name)

test('the build serves chapters at request time instead of prerendering them all', () => {
  assert.ok(existsSync(fromRoot('.next/BUILD_ID')), 'Run `pnpm run build` before this test')
  const { routes } = JSON.parse(readFileSync(fromRoot('.next/prerender-manifest.json'), 'utf8'))
  for (const fixture of fixtures) {
    assert.equal(Object.hasOwn(routes, fixture.path), fixture.first, `${fixture.path}: prerendered=${Object.hasOwn(routes, fixture.path)}`)
  }
})

test('the chapter route function trace ships no jsdom-backed sanitizer', () => {
  const tracePath = '.next/server/app/books/[bookSlug]/[chapterSlug]/page.js.nft.json'
  assert.ok(existsSync(fromRoot(tracePath)), `${tracePath} is the file list deployed with the chapter function`)
  const { files } = JSON.parse(readFileSync(fromRoot(tracePath), 'utf8'))
  assert.ok(files.length > 0, 'The chapter function trace lists its files')
  const offenders = files.map(file => file.replaceAll('\\', '/')).filter(file => jsdomChain.test(file))
  assert.deepEqual(offenders, [], 'jsdom and its ESM-only dependency chain must not be loaded by the chapter route')
})

test('request-time chapters return 200 with sanitized server-rendered content', { timeout: 120_000 }, async t => {
  const port = await getAvailablePort()
  const outputChunks = []
  const child = startNextServer({ cwd: rootDirectory, port })
  child.stdout.on('data', chunk => outputChunks.push(chunk.toString()))
  child.stderr.on('data', chunk => outputChunks.push(chunk.toString()))
  const output = () => outputChunks.join('')
  const origin = `http://127.0.0.1:${port}`

  try {
    await waitForReady(`${origin}/books`, child, output)
    for (const fixture of fixtures) {
      await t.test(`${fixture.path}${fixture.first ? ' (prebuilt)' : ' (request time)'}`, async () => {
        const response = await fetch(`${origin}${fixture.path}`, { redirect: 'manual' })
        const html = await response.text()
        assert.equal(response.status, 200, `${fixture.path} returned ${response.status}\n${output().slice(-4000)}`)
        const tree = fromHtml(html)
        const [content] = find(tree, element => hasClass(element, 'book-reader-content'))
        assert.ok(content, 'The chapter body is in the initial server HTML')
        assert.ok(textOf(content).trim().length > 500, 'The chapter body has real text')
        const titles = find(tree, element => element.tagName === 'h1').map(element => textOf(element).trim())
        assert.ok(titles.includes(fixture.chapter.title), `The page heading is the chapter title; saw ${JSON.stringify(titles)}`)
        assert.doesNotMatch(html, /This page couldn(?:'|&#x27;|&#39;)t load|A server error occurred/, 'Not the error page')
        assert.deepEqual(find(content, element => ['script', 'iframe', 'object', 'embed', 'style'].includes(element.tagName)).map(element => element.tagName), [])
        for (const element of find(content, () => true)) {
          for (const [name, value] of Object.entries(element.properties)) {
            assert.ok(!/^on/i.test(name), `${element.tagName} keeps ${name}`)
            if (name === 'href' || name === 'src') assert.doesNotMatch(String(value).trim(), /^(?:javascript|vbscript|data):/i)
          }
        }
        if (fixture.anchor) assert.equal(find(content, element => element.properties.id === fixture.anchor).length, 1, `#${fixture.anchor} contents target`)
      })
    }
    assert.doesNotMatch(output(), /ERR_REQUIRE_ESM|Failed to load external module/, 'The server logged a module load failure')
  } finally {
    await stopManagedProcess(child)
  }
})
