import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  chapterSanitizeConfig,
  promptSanitizeConfig,
  sanitizeChapterHtml,
  sanitizePromptHtml,
  renderSanitizedChapterMarkdown,
  renderSanitizedPromptMarkdown,
} from '../../lib/sanitize/markdown.ts'
import { WORKSHOP_PROMPTS } from '../../lib/workshop-prompts.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const require = createRequire(import.meta.url)
const installed = JSON.parse(
  readFileSync(path.join(root, 'node_modules/isomorphic-dompurify/package.json'), 'utf8'),
).version

// jsdom is a transitive dependency of isomorphic-dompurify, not a root dep,
// and is not public-hoisted. Resolve it from the sanitizer package so the
// detector always uses a real DOM. Fail closed if that is not possible.
const requireFromPurifier = createRequire(require.resolve('isomorphic-dompurify'))
const { JSDOM } = requireFromPurifier('jsdom')
if (typeof JSDOM !== 'function') {
  throw new Error(
    'jsdom must resolve through isomorphic-dompurify so entity-encoded javascript: hrefs can be decoded; refusing to run a weaker detector',
  )
}

// Named policies live in lib/sanitize/markdown.ts and are used by
// ChapterReader, PremiumReader (chapter), and PromptCard (prompt).
const CONFIGS = {
  prompt: promptSanitizeConfig,
  chapter: chapterSanitizeConfig,
}

const SANITIZE = {
  prompt: sanitizePromptHtml,
  chapter: sanitizeChapterHtml,
}

const PAYLOADS = {
  script: '<script>alert(1)</script>',
  img_onerror: '<img src=x onerror=alert(1)>',
  js_href: '<a href="javascript:alert(1)">click</a>',
  svg_script: '<svg><script>alert(1)</script></svg>',
  svg_onload: '<svg onload=alert(1)></svg>',
  iframe: '<iframe src="https://evil.example"></iframe>',
  normal_markdown_html: '<p>Hello <strong>world</strong></p><ul><li>one</li></ul>',
  normal_html: '<p>Safe <em>text</em> and a <a href="https://frankx.ai" rel="noopener">link</a>.</p>',
}

// Fixtures captured against isomorphic-dompurify 2.36.0 (main) with the same configs.
const V2 = {
  version: '2.36.0',
  results: {
    prompt: {
      script: '',
      img_onerror: '',
      js_href: 'click',
      svg_script: '',
      svg_onload: '',
      iframe: '',
      normal_markdown_html: '<p>Hello <strong>world</strong></p><ul><li>one</li></ul>',
      normal_html: '<p>Safe <em>text</em> and a link.</p>',
    },
    chapter: {
      script: '',
      img_onerror: '',
      js_href: '<a>click</a>',
      svg_script: '',
      svg_onload: '',
      iframe: '',
      normal_markdown_html: '<p>Hello <strong>world</strong></p><ul><li>one</li></ul>',
      normal_html: '<p>Safe <em>text</em> and a <a href="https://frankx.ai" rel="noopener">link</a>.</p>',
    },
  },
}

const ENCODED_JS_HREFS = {
  decimal: '<a href="&#106;avascript:alert(1)">link</a>',
  hex: '<a href="&#x6A;avascript:alert(1)">link</a>',
}

function listUnsafeHandlers(html) {
  const findings = []
  const source = String(html ?? '')
  const dom = new JSDOM(`<!doctype html><body><div id="root">${source}</div></body>`)
  const rootEl = dom.window.document.getElementById('root')
  if (!rootEl) {
    throw new Error('jsdom failed to provide a document root; refusing to skip handler detection')
  }
  for (const el of rootEl.querySelectorAll('*')) {
    for (const attr of [...el.attributes]) {
      if (/^on/i.test(attr.name)) {
        findings.push(`${el.tagName.toLowerCase()}[${attr.name}]`)
      }
      if (/javascript\s*:/i.test(attr.value)) {
        findings.push(`${el.tagName.toLowerCase()}[${attr.name}]=javascript:`)
      }
    }
  }
  return findings
}

function assertNoUnsafeHandlers(html, label) {
  const findings = listUnsafeHandlers(html)
  assert.equal(
    findings.length,
    0,
    `${label} leaked event-handler attributes or javascript: URLs: ${findings.join(', ')} in ${JSON.stringify(html)}`,
  )
}

function isStricterOrEqual(v2, v4) {
  // A result that still contains on* handlers or javascript: URLs is never "stricter".
  if (listUnsafeHandlers(v4).length > 0) return false
  if (v4 === v2) return true
  // v4 may drop more tags/attributes, but must not add markup v2 did not have
  if (v2.includes(v4) || (v4.length <= v2.length && v2.replace(/<[^>]+>/g, '') === v4.replace(/<[^>]+>/g, ''))) {
    return true
  }
  const text2 = v2.replace(/<[^>]+>/g, '')
  const text4 = v4.replace(/<[^>]+>/g, '')
  if (text4 === text2) {
    const tags4 = v4.match(/<\/?([a-z0-9]+)/gi) || []
    const tags2 = v2.match(/<\/?([a-z0-9]+)/gi) || []
    return tags4.every((t) => tags2.includes(t))
  }
  return false
}

function parseMarkdownLikeChapter(content) {
  // Production path: ChapterReader / PremiumReader call renderSanitizedChapterMarkdown
  // after TOC heading-id injection (tested separately against pre-extract snapshots).
  const html = renderSanitizedChapterMarkdown(content)
  assert.equal(
    typeof html,
    'string',
    `renderSanitizedChapterMarkdown must return a string, got ${typeof html}`,
  )
  return html
}

function parseMarkdownLikePrompt(body) {
  // Production path: PromptCard calls renderSanitizedPromptMarkdown.
  const html = renderSanitizedPromptMarkdown(body)
  assert.equal(typeof html, 'string')
  return html
}

test('isomorphic-dompurify is the v4 line under test', () => {
  assert.match(installed, /^4\./, `expected 4.x, got ${installed}`)
})

test('jsdom is resolved through isomorphic-dompurify', () => {
  assert.equal(typeof JSDOM, 'function')
})

test('onclick-for-shorter-markup is not accepted as stricter', () => {
  const v2 = '<a href="https://frankx.ai" rel="noopener">link</a>'
  const v4 = '<a onclick="alert(1)">link</a>'
  assert.equal(isStricterOrEqual(v2, v4), false)
  assert.ok(listUnsafeHandlers(v4).length > 0)
})

test('detector flags entity-encoded javascript: hrefs', () => {
  const original = '<a href="https://frankx.ai" rel="noopener">link</a>'
  for (const [name, html] of Object.entries(ENCODED_JS_HREFS)) {
    assert.ok(
      listUnsafeHandlers(html).length > 0,
      `${name} encoded javascript: href must be visible to the DOM detector: ${html}`,
    )
    assert.equal(
      isStricterOrEqual(original, html),
      false,
      `${name} encoded javascript: href must not be accepted as stricter than a safe link`,
    )
  }
})

for (const cname of Object.keys(CONFIGS)) {
  for (const [pname, html] of Object.entries(PAYLOADS)) {
    test(`v4 is identical or stricter than v2 for ${cname}/${pname}`, () => {
      const v2 = V2.results[cname][pname]
      const v4 = SANITIZE[cname](html)
      assertNoUnsafeHandlers(v4, `${cname}/${pname}`)
      assert.equal(
        isStricterOrEqual(v2, v4),
        true,
        `${cname}/${pname}: v4 ${JSON.stringify(v4)} is not identical or stricter than v2 ${JSON.stringify(v2)}`,
      )
    })
  }
}

for (const cname of Object.keys(CONFIGS)) {
  for (const [name, html] of Object.entries(ENCODED_JS_HREFS)) {
    test(`sanitizer drops entity-encoded javascript: href (${cname}/${name})`, () => {
      const cleaned = SANITIZE[cname](html)
      assertNoUnsafeHandlers(cleaned, `${cname}/${name} direct`)
    })
  }
}

test('safe markdown and HTML still survive the chapter allowlist', () => {
  const md = sanitizeChapterHtml(PAYLOADS.normal_markdown_html)
  assertNoUnsafeHandlers(md, 'safe markdown html')
  assert.match(md, /Hello/)
  assert.match(md, /world/)
  assert.match(md, /<strong>/)
  const html = sanitizeChapterHtml(PAYLOADS.normal_html)
  assertNoUnsafeHandlers(html, 'safe html')
  assert.match(html, /Safe/)
  assert.match(html, /href="https:\/\/frankx.ai"/)
})

const CHAPTER_MARKDOWN_CASES = {
  safe_heading_list_link: `## A Heading

Hello **world** and a [safe link](https://frankx.ai).

- one
- two
`,
  raw_html_onclick: 'Hello <a onclick="alert(1)" href="https://frankx.ai">click</a>',
  raw_html_onerror: 'Hello <img src=x onerror=alert(1)>',
  markdown_javascript_link: 'See [click](javascript:alert(1)) now',
  markdown_javascript_uppercase: 'See [click](JAVASCRIPT:alert(1)) now',
  encoded_javascript_href: 'See [click](javascript&#58;alert(1)) now',
  entity_javascript_href: 'See [click](&#106;avascript:alert(1)) now',
  raw_html_entity_decimal_href: 'Hello <a href="&#106;avascript:alert(1)">link</a>',
  raw_html_entity_hex_href: 'Hello <a href="&#x6A;avascript:alert(1)">link</a>',
  malformed_svg: 'Hi <svg onload=alert(1)><script>alert(1)</script></svg>',
  malformed_mathml: 'Hi <math><mi xlink:href="javascript:alert(1)">x</mi></math>',
  single_newline_in_paragraph: 'alpha\nbeta',
  trailing_double_space: 'alpha  \nbeta',
  list: '- one\n- two',
}

for (const [name, markdown] of Object.entries(CHAPTER_MARKDOWN_CASES)) {
  test(`chapter marked+sanitize path: ${name}`, () => {
    const html = parseMarkdownLikeChapter(markdown)
    assertNoUnsafeHandlers(html, `chapter e2e ${name}`)
    if (name === 'safe_heading_list_link') {
      assert.match(html, /A Heading/)
      assert.match(html, /Hello/)
      assert.match(html, /<strong>/)
      assert.match(html, /href="https:\/\/frankx.ai"/)
      assert.match(html, /<li>/)
    }
  })
}

const PROMPT_MARKDOWN_CASES = {
  safe_list: `Paste this:

- **bold** item
- more text
`,
  raw_html_onclick: 'Hello <a onclick="alert(1)" href="https://evil.example">click</a>',
  markdown_javascript_link: 'See [click](javascript:alert(1)) please',
  raw_html_entity_decimal_href: 'Hello <a href="&#106;avascript:alert(1)">link</a>',
  raw_html_entity_hex_href: 'Hello <a href="&#x6A;avascript:alert(1)">link</a>',
  single_newline_in_paragraph: 'alpha\nbeta',
  trailing_double_space: 'alpha  \nbeta',
  list: '- one\n- two',
}

for (const [name, markdown] of Object.entries(PROMPT_MARKDOWN_CASES)) {
  test(`prompt marked+sanitize path: ${name}`, () => {
    const html = parseMarkdownLikePrompt(markdown)
    assertNoUnsafeHandlers(html, `prompt e2e ${name}`)
    if (name === 'safe_list') {
      assert.match(html, /bold/)
      assert.match(html, /<strong>/)
      assert.match(html, /<li>/)
    }
    if (name === 'raw_html_onclick' || name === 'markdown_javascript_link') {
      assert.equal(/href/i.test(html), false, 'prompt policy must strip hrefs')
    }
  })
}


// ChapterReader heading-id injection (h1–h3). Kept in the component, not extracted.
function injectChapterHeadingIds(content) {
  return injectHeadingIds(content, /^(#{1,3})\s+(.+)$/gm)
}

// PremiumReader heading-id injection (h2–h3 only; h1 is left without an id span).
function injectPremiumHeadingIds(content) {
  return injectHeadingIds(content, /^(#{2,3})\s+(.+)$/gm)
}

function injectHeadingIds(content, headingRegex) {
  const toc = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    if (
      text.toLowerCase().includes('chapter') ||
      text.toLowerCase().includes('source') ||
      text.toLowerCase().includes('quotable') ||
      text.toLowerCase().includes('end chapter')
    ) {
      continue
    }
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    toc.push({ id, text, level })
  }
  let processedContent = content
  toc.forEach((item) => {
    const escapedText = item.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const headingPattern = new RegExp(`^#{${item.level}}\\s+${escapedText}$`, 'm')
    processedContent = processedContent.replace(
      headingPattern,
      `${'#'.repeat(item.level)} <span id="${item.id}">${item.text}</span>`,
    )
  })
  return processedContent
}

const TOC_MARKDOWN_CASES = {
  'h1-and-h2': `# Opening Title

## A Section

Some text.
`,
}

const SNAPSHOT = JSON.parse(
  readFileSync(path.join(root, 'scripts/tests/fixtures/sanitize-markdown-snapshots.json'), 'utf8'),
)


function renderSnapshotCase(id) {
  const slash = id.indexOf('/')
  const group = id.slice(0, slash)
  const key = id.slice(slash + 1)
  if (group === 'payload-chapter') return sanitizeChapterHtml(PAYLOADS[key])
  if (group === 'payload-prompt') return sanitizePromptHtml(PAYLOADS[key])
  if (group === 'encoded-js-chapter') return sanitizeChapterHtml(ENCODED_JS_HREFS[key])
  if (group === 'encoded-js-prompt') return sanitizePromptHtml(ENCODED_JS_HREFS[key])
  if (group === 'chapter-md') return renderSanitizedChapterMarkdown(CHAPTER_MARKDOWN_CASES[key])
  if (group === 'prompt-md') return renderSanitizedPromptMarkdown(PROMPT_MARKDOWN_CASES[key])
  if (group === 'chapter-toc') {
    return renderSanitizedChapterMarkdown(injectChapterHeadingIds(TOC_MARKDOWN_CASES[key]))
  }
  if (group === 'premium-toc') {
    return renderSanitizedChapterMarkdown(injectPremiumHeadingIds(TOC_MARKDOWN_CASES[key]))
  }
  if (group === 'real-chapter') {
    const md = readFileSync(path.join(root, 'content/golden-age-book', key), 'utf8')
    return renderSanitizedChapterMarkdown(injectChapterHeadingIds(md))
  }
  if (group === 'real-chapter-premium') {
    const md = readFileSync(path.join(root, 'content/golden-age-book', key), 'utf8')
    return renderSanitizedChapterMarkdown(injectPremiumHeadingIds(md))
  }
  if (group === 'real-prompt') {
    const prompt = WORKSHOP_PROMPTS.find((p) => p.id === key)
    if (!prompt) throw new Error(`missing workshop prompt ${key}`)
    return renderSanitizedPromptMarkdown(prompt.body)
  }
  throw new Error(`unknown snapshot id ${id}`)
}

test('shared sanitize module matches fixtures captured from main inline paths', () => {
  assert.equal(SNAPSHOT.capturedAt, 'pre-extract')
  assert.equal(SNAPSHOT.sourceSha, '3b9352ea83d96766dac5da657ba14180684bc3dc')
  assert.equal(SNAPSHOT.capturedBy, 'scripts/tests/capture-sanitize-snapshots.mjs')
  assert.ok(Array.isArray(SNAPSHOT.cases) && SNAPSHOT.cases.length > 0)

  const seen = new Set()
  for (const entry of SNAPSHOT.cases) {
    assert.equal(seen.has(entry.id), false, `duplicate snapshot id ${entry.id}`)
    seen.add(entry.id)
    const actual = renderSnapshotCase(entry.id)
    assert.equal(
      actual,
      entry.html,
      `${entry.id} does not match the fixture captured from main's inline paths`,
    )
  }

  for (const name of Object.keys(PAYLOADS)) {
    assert.ok(seen.has(`payload-chapter/${name}`), `missing snapshot for payload-chapter/${name}`)
    assert.ok(seen.has(`payload-prompt/${name}`), `missing snapshot for payload-prompt/${name}`)
  }
  for (const name of Object.keys(ENCODED_JS_HREFS)) {
    assert.ok(seen.has(`encoded-js-chapter/${name}`), `missing snapshot for encoded-js-chapter/${name}`)
    assert.ok(seen.has(`encoded-js-prompt/${name}`), `missing snapshot for encoded-js-prompt/${name}`)
  }
  for (const name of Object.keys(CHAPTER_MARKDOWN_CASES)) {
    assert.ok(seen.has(`chapter-md/${name}`), `missing snapshot for chapter-md/${name}`)
  }
  for (const name of Object.keys(PROMPT_MARKDOWN_CASES)) {
    assert.ok(seen.has(`prompt-md/${name}`), `missing snapshot for prompt-md/${name}`)
  }
  for (const name of Object.keys(TOC_MARKDOWN_CASES)) {
    assert.ok(seen.has(`chapter-toc/${name}`), `missing snapshot for chapter-toc/${name}`)
    assert.ok(seen.has(`premium-toc/${name}`), `missing snapshot for premium-toc/${name}`)
  }
  for (const file of [
    'chapter-01-when-creation-calls.md',
    'chapter-02-the-orchestration-age.md',
    'chapter-03-the-first-gesture.md',
  ]) {
    assert.ok(seen.has(`real-chapter/${file}`), `missing snapshot for real-chapter/${file}`)
    assert.ok(seen.has(`real-chapter-premium/${file}`), `missing snapshot for real-chapter-premium/${file}`)
  }
  for (const id of ['ai-initial-assessment', 'socratic-ikigai', 'dream-doubt-validator']) {
    assert.ok(seen.has(`real-prompt/${id}`), `missing snapshot for real-prompt/${id}`)
  }
})

// Expected HTML taken from main (3b9352ea) inline paths, in isolation
// (each policy's own setOptions immediately before parse).
test('soft linebreaks match main isolated-path output for chapter and prompt', () => {
  assert.equal(
    renderSanitizedChapterMarkdown('alpha\nbeta'),
    '<p>alpha<br>beta</p>\n',
  )
  assert.equal(
    renderSanitizedPromptMarkdown('alpha\nbeta'),
    '<p>alpha\nbeta</p>\n',
  )
  assert.equal(
    renderSanitizedChapterMarkdown('alpha  \nbeta'),
    '<p>alpha<br>beta</p>\n',
  )
  assert.equal(
    renderSanitizedPromptMarkdown('alpha  \nbeta'),
    '<p>alpha<br>beta</p>\n',
  )
  const listHtml = '<ul>\n<li>one</li>\n<li>two</li>\n</ul>\n'
  assert.equal(renderSanitizedChapterMarkdown('- one\n- two'), listHtml)
  assert.equal(renderSanitizedPromptMarkdown('- one\n- two'), listHtml)
})

test('scoped parsers do not leak breaks options across chapter and prompt renders', () => {
  // chapter then prompt
  assert.equal(renderSanitizedChapterMarkdown('alpha\nbeta'), '<p>alpha<br>beta</p>\n')
  assert.equal(renderSanitizedPromptMarkdown('alpha\nbeta'), '<p>alpha\nbeta</p>\n')
  // prompt then chapter then prompt again
  assert.equal(renderSanitizedPromptMarkdown('alpha\nbeta'), '<p>alpha\nbeta</p>\n')
  assert.equal(renderSanitizedChapterMarkdown('alpha\nbeta'), '<p>alpha<br>beta</p>\n')
  assert.equal(renderSanitizedPromptMarkdown('alpha\nbeta'), '<p>alpha\nbeta</p>\n')
})

test('PremiumReader TOC injection skips h1 ids that ChapterReader inserts', () => {
  const md = TOC_MARKDOWN_CASES['h1-and-h2']
  const chapter = renderSanitizedChapterMarkdown(injectChapterHeadingIds(md))
  const premium = renderSanitizedChapterMarkdown(injectPremiumHeadingIds(md))
  assert.equal(
    chapter,
    '<h1><span id="opening-title">Opening Title</span></h1>\n<h2><span id="a-section">A Section</span></h2>\n<p>Some text.</p>\n',
  )
  assert.equal(
    premium,
    '<h1>Opening Title</h1>\n<h2><span id="a-section">A Section</span></h2>\n<p>Some text.</p>\n',
  )
})
