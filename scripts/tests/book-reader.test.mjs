import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import ts from 'typescript'
import * as marked from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import * as jsxRuntime from 'react/jsx-runtime'

const root = new URL('../../', import.meta.url)
const source = path => readFileSync(new URL(path, root), 'utf8')
function load(path, imports = {}) {
  const module = { exports: {} }
  const { outputText } = ts.transpileModule(source(path), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } })
  new Function('require', 'module', 'exports', outputText)(id => {
    assert.ok(Object.hasOwn(imports, id), `Unexpected import: ${id}`)
    return imports[id]
  }, module, module.exports)
  return module.exports
}
// Only the framework boundary is stubbed. Real parser/sanitizer behavior is
// exercised here; production build and browser checks verify the RSC boundary.
const { renderChapter } = load('app/books/lib/render-chapter.ts', {
  'server-only': {}, marked, 'isomorphic-dompurify': { default: DOMPurify },
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
