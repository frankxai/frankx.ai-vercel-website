import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, posix } from 'node:path'
import test from 'node:test'
import ts from 'typescript'
import * as marked from 'marked'
import * as hastFromHtml from 'hast-util-from-html'
import * as hastSanitize from 'hast-util-sanitize'
import * as hastToHtml from 'hast-util-to-html'
import * as hastToString from 'hast-util-to-string'
// Test-only DOM for inspecting the rendered HTML with an independent parser.
// The chapter route itself must never load this (see the import-graph test below).
import DOMPurify from 'isomorphic-dompurify'
import * as jsxRuntime from 'react/jsx-runtime'

const root = new URL('../../', import.meta.url)
const source = path => readFileSync(new URL(path, root), 'utf8')
function load(path, imports = {}) {
  const cjs = { exports: {} }
  const { outputText } = ts.transpileModule(source(path), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } })
  new Function('require', 'module', 'exports', outputText)(id => {
    assert.ok(Object.hasOwn(imports, id), `Unexpected import: ${id}`)
    return imports[id]
  }, cjs, cjs.exports)
  return cjs.exports
}
// Only the framework boundary is stubbed. Real parser/sanitizer behavior is
// exercised here; production build and browser checks verify the RSC boundary.
const { renderChapter } = load('app/books/lib/render-chapter.ts', {
  'server-only': {}, marked,
  'hast-util-from-html': hastFromHtml, 'hast-util-sanitize': hastSanitize,
  'hast-util-to-html': hastToHtml, 'hast-util-to-string': hastToString,
})
const dom = html => {
  const fragment = DOMPurify.sanitize('', { RETURN_DOM_FRAGMENT: true })
  const container = fragment.ownerDocument.createElement('div')
  // Inspect the exact result; a second test-only sanitizer could hide failures.
  container.innerHTML = html
  return container
}
const ids = document => [...document.querySelectorAll('[id]')].map(element => element.id)
const assertAnchors = (result, label = '') => {
  const document = dom(result.html)
  const targets = ids(document)
  assert.equal(new Set(targets).size, targets.length, `${label}: duplicate IDs`)
  for (const item of result.tocItems) {
    assert.ok(targets.includes(item.id), `${label}: missing contents target ${item.id}`)
  }
  for (const link of document.querySelectorAll('.footnote-ref a,.footnote-back')) {
    assert.ok(targets.includes(decodeURIComponent(link.getAttribute('href').slice(1))), `${label}: dangling footnote link`)
  }
  return document
}

test('removes only a matching opening title and retains every other authored heading', () => {
  const result = renderChapter('#  The *Invitation*\n\nOpening prose.\n\n# Another title\n\nFinal prose.', 'The Invitation')
  const document = assertAnchors(result)
  assert.equal(document.querySelector('h1'), null)
  assert.deepEqual([...document.querySelectorAll('h2')].map(node => node.textContent), ['Another title'])
  assert.match(document.textContent, /Opening prose\.[\s\S]*Final prose\./)
  const differing = dom(renderChapter('# Authored subtitle\n\nKeep this.', 'Route title').html)
  assert.equal(differing.querySelector('h2').textContent, 'Authored subtitle')
})

test('Unicode and repeated headings get distinct targets; code never enters contents', () => {
  const result = renderChapter('## Résumé\n\n### Résumé\n\n## 東京\n\n```md\n## Not a heading\n[^demo]: Not a note\n```\n\n`[^demo]` and [^unknown].', 'A chapter')
  const document = assertAnchors(result)
  assert.deepEqual(result.tocItems.map(item => item.id), ['résumé', 'résumé-2', '東京'])
  assert.match(document.querySelector('pre').textContent, /## Not a heading\n\[\^demo\]: Not a note/)
  assert.equal(document.querySelector('.footnotes'), null)
  assert.match(document.textContent, /\[\^unknown\]/)
})

test('footnotes preserve reference order, repetitions, unused notes and prose after their heading', () => {
  const result = renderChapter('First[^b], then[^a], then[^b]. `[^a]`\n\n## Footnotes\n\n[^a]: Alpha *note*.\n[^b]: Beta note.\n[^unused]: Retain unused.\n\n## Credits\n\nKeep the final credits.', 'Notes')
  const document = assertAnchors(result)
  assert.deepEqual([...document.querySelectorAll('.footnote-ref a')].map(link => link.id), ['fnref-1', 'fnref-2', 'fnref-1-2'])
  assert.deepEqual([...document.querySelectorAll('.footnote-item')].map(node => node.textContent.trim()), ['Beta note. ↩', 'Alpha note. ↩', 'Retain unused.'])
  assert.equal(document.querySelector('code').textContent, '[^a]')
  assert.equal(document.querySelectorAll('.footnote-back').length, 2)
  assert.match(document.textContent, /Keep the final credits\./)
  assert.equal(document.querySelectorAll('h2').length, 2)
})

test('continued footnotes retain indented prose, while fenced and indented examples stay literal', () => {
  const result = renderChapter('A reference[^note].\n\n[^note]: First line.\n    Four spaces.\n      Six spaces.\n\tA tab.\n\n~~~md\n[^fenced]: Literal fenced note.\n~~~\n\n    [^code]: Literal indented note.', 'Notes')
  const document = assertAnchors(result)
  assert.match(document.querySelector('.footnote-item').textContent, /First line\. Four spaces\. Six spaces\. A tab\./)
  assert.match([...document.querySelectorAll('pre')].map(node => node.textContent).join('\n'), /\[\^fenced\]: Literal fenced note\.[\s\S]*\[\^code\]: Literal indented note\./)
})

test('sanitizes both authored HTML and footnotes after transformations, preserving safe rich content', () => {
  const result = renderChapter('<script>alert(1)</script>\n\n<img src="/safe.png" alt="Keep" onerror="alert(1)">\n\n<a href="javascript:alert(1)" onclick="evil()">Unsafe</a>\n\n<a href="https://example.com" target="_blank">External</a>\n\n<details open><summary>Read more</summary><p>Safe detail</p></details>\n\n| Name | Value |\n| --- | --- |\n| One | Two |\n\nNote[^safe].\n\n[^safe]: <img src="/note.png" onerror="evil()"> <a href="javascript:evil()">Note</a>', 'Safety')
  const document = assertAnchors(result)
  assert.equal(document.querySelector('script,iframe,style'), null)
  for (const element of document.querySelectorAll('*')) {
    for (const attribute of element.attributes) assert.ok(!/^on/i.test(attribute.name), attribute.name)
  }
  assert.equal(document.querySelector('a[href^="javascript:"]'), null)
  assert.equal(document.querySelector('a[target="_blank"]').rel, 'noopener noreferrer')
  assert.equal(document.querySelector('img').getAttribute('alt'), 'Keep')
  assert.ok(document.querySelector('table tbody td'))
  assert.ok(document.querySelector('details[open] summary'))
  assert.equal(document.querySelector('.footnote-ref a').getAttribute('aria-label'), 'Footnote 1')
})

test('explicit duplicate heading IDs cannot make contents navigate to the wrong section', () => {
  const result = renderChapter('<h2 id="shared">First</h2>\n\n<h2 id="shared">Second</h2>\n\n## Shared', 'Headings')
  assertAnchors(result)
  assert.deepEqual(result.tocItems.map(item => item.id), ['shared', 'shared-2', 'shared-3'])
})

test('reserved DOM names still receive safe usable contents anchors', () => {
  const result = renderChapter('## Constructor\n\nKeep this.\n\n## Location\n\nKeep that.', 'Reserved names')
  assertAnchors(result)
  assert.deepEqual(result.tocItems.map(item => item.id), ['constructor-2', 'location-2'])
})

test('chapter requests keep their reference counters isolated', () => {
  const note = 'Reference[^one].\n\n[^one]: Keep this.'
  const first = renderChapter(note, 'One')
  renderChapter('Reference[^two].\n\n[^two]: Another note.', 'Two')
  assert.deepEqual(renderChapter(note, 'One'), first)
})

test('the route only advertises published neighboring chapters and still denies unpublished routes', async () => {
  const registry = load('app/books/lib/books-registry.ts')
  const reader = () => null
  const route = load('app/books/[bookSlug]/[chapterSlug]/page.tsx', {
    'react/jsx-runtime': jsxRuntime, fs: { readFileSync }, path: { join },
    'next/navigation': { notFound() { throw new Error('Not found') } },
    '../../components/BookReader': { default: reader }, '../../lib/books-registry': registry,
    '@/lib/seo': { createMetadata: data => data },
    '@/components/seo/JsonLd': { default: () => null }, '@/components/qualities/RelatedQualities': { default: () => null },
  })
  const page = await route.default({ params: Promise.resolve({ bookSlug: 'wonderproof', chapterSlug: 'chapter-02-the-milkshake-effect' }) })
  const renderedReader = page.props.children.find(child => child?.type === reader)
  assert.equal(renderedReader.props.previousChapter.published, true)
  assert.equal(renderedReader.props.nextChapter, undefined, 'Do not link to the unpublished body-vote chapter')
  await assert.rejects(route.default({ params: Promise.resolve({ bookSlug: 'wonderproof', chapterSlug: 'chapter-03-the-body-vote' }) }), /Not found/)
})

test('footnotes avoid authored anchor collisions without changing the authored targets', () => {
  const result = renderChapter('<h2 id="fn&#45;1">Authored anchor</h2>\n\n<p id="fnref-1">Keep this target.</p>\n\nReference[^note].\n\n[^note]: The actual note.', 'Anchors')
  const document = assertAnchors(result)
  assert.equal(document.querySelector('[id="fn-1"]').textContent, 'Authored anchor')
  assert.equal(document.querySelector('.footnote-item').id, 'book-fn-1')
  assert.equal(document.querySelector('.footnote-ref a').getAttribute('href'), '#book-fn-1')
})

test('every existing published catalog chapter renders safe HTML and complete contents targets', t => {
  const { booksRegistry } = load('app/books/lib/books-registry.ts')
  let checked = 0
  const missing = []
  for (const book of booksRegistry) for (const chapter of book.chapters.filter(chapter => chapter.published)) {
    let markdown
    try { markdown = source(join(book.contentDir, `${chapter.slug}.md`).replaceAll('\\', '/')) }
    catch (error) {
      if (error.code === 'ENOENT') {
        missing.push(`${book.slug}/${chapter.slug}`)
        continue // The route deliberately returns 404 for existing catalog/file gaps.
      }
      throw error
    }
    const result = renderChapter(markdown, chapter.title)
    const document = assertAnchors(result, `${book.slug}/${chapter.slug}`)
    assert.ok(document.textContent.trim().length > 0, `${book.slug}/${chapter.slug}: empty document`)
    assert.equal(document.querySelector('h1'), null, `${book.slug}/${chapter.slug}: duplicate page heading`)
    assert.equal(document.querySelector('script,iframe,object,embed'), null, `${book.slug}/${chapter.slug}: unsafe HTML`)
    checked++
  }
  assert.deepEqual(missing, [], 'Published catalog entries must have readable chapter files')
  assert.equal(checked, booksRegistry.reduce((count, book) => count + book.chapters.filter(chapter => chapter.published).length, 0))
  t.diagnostic(`Rendered ${checked} catalog chapters; existing missing files: ${missing.length} (${missing.join(', ')})`)
})

test('sanitizer strips encoded, nested and non-HTML script vectors without a DOM', () => {
  const result = renderChapter([
    '<SCRIPT>alert(1)</SCRIPT><p style="color:red" onmouseover="evil()">Styled</p>',
    '<a href="jav&#x61;script:alert(1)">Encoded</a> <a href=" javascript:alert(1)">Spaced</a> <a href="data:text/html,<script>alert(1)</script>">Data</a>',
    '<img src="javascript:alert(1)" alt="Bad source"> <img src="JaVaScRiPt:alert(1)" alt="Mixed case"> <a href="java\tscript:alert(1)">Tab</a>',
    '<svg onload="alert(1)"><circle /></svg><iframe src="https://evil.example"></iframe><object data="x"></object><style>body{}</style>',
    '<form action="/x"><input name="cookie"></form><h2 id="cookie">Clobber</h2>',
    '<a href="/books/fable">Relative</a> <a href="#section">Fragment</a> <a href="mailto:hi@example.com">Mail</a>',
  ].join('\n\n'), 'Vectors')
  const document = assertAnchors(result)
  assert.equal(document.querySelector('script,svg,iframe,object,style,form,input'), null)
  for (const element of document.querySelectorAll('*')) {
    for (const attribute of element.attributes) {
      assert.ok(!/^on/i.test(attribute.name), `${element.tagName} keeps ${attribute.name}`)
      assert.notEqual(attribute.name, 'style', `${element.tagName} keeps inline style`)
    }
  }
  for (const element of document.querySelectorAll('[href],[src]')) {
    const value = (element.getAttribute('href') ?? element.getAttribute('src')).trim()
    assert.doesNotMatch(value.replace(/[\s\u0000-\u001f]/g, ''), /^(javascript|data|vbscript):/i, value)
  }
  assert.doesNotMatch(result.html, /alert\(1\)|evil\(\)/)
  assert.deepEqual([...document.querySelectorAll('a[href]')].map(link => link.getAttribute('href')), ['/books/fable', '#section', 'mailto:hi@example.com'])
  assert.equal(document.querySelector('#cookie'), null, 'DOM-clobbering IDs are not shipped')
  assert.equal(document.querySelector('h2[id="clobber"]')?.textContent, 'Clobber', 'The heading still gets a usable contents anchor')
})

test('the chapter route server graph never loads a jsdom-backed sanitizer', () => {
  // isomorphic-dompurify -> jsdom -> html-encoding-sniffer -> @exodus/bytes (ESM-only) failed to
  // load in Vercel functions with ERR_REQUIRE_ESM, so every request-time chapter returned 500.
  // Client components are server-rendered too, so the whole static graph counts.
  const forbidden = /^(isomorphic-dompurify|dompurify|jsdom|html-encoding-sniffer|@exodus\/bytes)(\/|$)/
  const parsed = /\.(m?[jt]sx?)$/
  const entries = ['app/books/[bookSlug]/[chapterSlug]/page.tsx', 'app/books/layout.tsx'].filter(file => existsSync(new URL(file, root)))
  const resolveLocal = (from, specifier) => {
    const base = specifier.startsWith('@/') ? specifier.slice(2) : posix.join(dirname(from).replaceAll('\\', '/'), specifier)
    for (const candidate of [base, `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.mjs`, `${base}/index.ts`, `${base}/index.tsx`, `${base}/index.js`]) {
      try { if (statSync(new URL(candidate, root)).isFile()) return candidate } catch { /* try the next extension */ }
    }
    assert.fail(`${from}: cannot resolve ${specifier}`)
  }
  const seen = new Set()
  const packages = new Map()
  const queue = [...entries]
  while (queue.length) {
    const file = queue.shift()
    if (seen.has(file)) continue
    seen.add(file)
    if (!parsed.test(file)) continue
    const text = source(file)
    for (const match of text.matchAll(/(?:^|[;\s])(?:import|export)\s+(?:type\s+)?(?:[^'";]*?\sfrom\s*)?['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)|require\(\s*['"]([^'"]+)['"]\s*\)/g)) {
      if (/^\s*(?:import|export)\s+type\s/.test(match[0].trimStart())) continue
      const specifier = match[1] ?? match[2] ?? match[3]
      if (specifier.startsWith('.') || specifier.startsWith('@/')) queue.push(resolveLocal(file, specifier))
      else packages.set(specifier, [...(packages.get(specifier) ?? []), file])
    }
  }
  assert.ok(seen.has('app/books/lib/render-chapter.ts') && seen.has('app/books/components/BookReader.tsx'), 'The graph reaches the server reader')
  assert.ok(packages.has('hast-util-sanitize'), 'The server reader sanitizes chapter HTML')
  const offenders = [...packages].filter(([specifier]) => forbidden.test(specifier))
  assert.deepEqual(offenders, [], `jsdom-backed modules in the chapter route: ${JSON.stringify(offenders)}`)
})
