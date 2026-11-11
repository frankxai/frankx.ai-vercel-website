import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const require = createRequire(import.meta.url)
const installed = JSON.parse(
  readFileSync(path.join(root, 'node_modules/isomorphic-dompurify/package.json'), 'utf8'),
).version

// These configs are mirrored from the production call sites, which live
// inline in TSX modules (not a shared importable sanitizer module):
//   components/workshops/ikigai/PromptCard.tsx:76-79
//   app/golden-age/components/ChapterReader.tsx:83-86
//   app/golden-age/components/PremiumReader.tsx:291-298 (same allowlists as ChapterReader)
const CONFIGS = {
  prompt: {
    ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'br', 'hr'],
    ALLOWED_ATTR: [],
  },
  chapter: {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote',
      'code', 'pre', 'span', 'hr',
    ],
    ALLOWED_ATTR: ['href', 'id', 'class', 'target', 'rel'],
  },
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

let JSDOM
try {
  ;({ JSDOM } = require('jsdom'))
} catch {
  JSDOM = null
}

function listUnsafeHandlers(html) {
  const findings = []
  const source = String(html ?? '')

  if (JSDOM) {
    const dom = new JSDOM(`<!doctype html><body><div id="root">${source}</div></body>`)
    const rootEl = dom.window.document.getElementById('root')
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
    // Also inspect raw text in case a URL did not land in an attribute
    // but still survived as a javascript: token in the serialized tree.
    if (/javascript\s*:/i.test(rootEl.innerHTML) || /javascript\s*:/i.test(rootEl.textContent || '')) {
      // textContent mentioning the word as documentation is fine; only
      // flag if the token still appears as a URL-like value in HTML.
      if (/javascript\s*:/i.test(rootEl.innerHTML)) {
        // If it is only inside a text node (escaped), innerHTML may still
        // contain the characters. Walk text nodes separately for attributes
        // already handled; flag leftover unescaped protocol in markup.
        const raw = rootEl.innerHTML
        if (/(?:href|src|xlink:href|action|formaction|data)\s*=\s*(['"]?)\s*javascript\s*:/i.test(raw) || /javascript\s*:/i.test(raw) && /<[^>]+javascript\s*:/i.test(raw)) {
          if (!findings.some((f) => f.includes('javascript:'))) {
            findings.push('markup contains javascript: URL')
          }
        }
      }
    }
    return findings
  }

  if (/<\s*[a-z][^>]*\s+on[a-z]+\s*=/i.test(source)) {
    findings.push('on* attribute')
  }
  if (/javascript\s*:/i.test(source)) {
    findings.push('javascript: URL')
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
  // Mirrors app/golden-age/components/ChapterReader.tsx:60-86
  // (PremiumReader.tsx:270-298 uses the same marked options and allowlists).
  // The sanitizer is not extracted to a shared module, so this test mirrors
  // that exact call sequence and config.
  marked.setOptions({
    gfm: true,
    breaks: true,
  })
  const rawHtml = marked.parse(content)
  assert.equal(
    typeof rawHtml,
    'string',
    `ChapterReader calls marked.parse without async:false; expected a string, got ${typeof rawHtml}`,
  )
  return DOMPurify.sanitize(rawHtml, CONFIGS.chapter)
}

function parseMarkdownLikePrompt(body) {
  // Mirrors components/workshops/ikigai/PromptCard.tsx:71-79
  const html = marked.parse(body, { async: false })
  assert.equal(typeof html, 'string')
  return DOMPurify.sanitize(html, CONFIGS.prompt)
}

test('isomorphic-dompurify is the v4 line under test', () => {
  assert.match(installed, /^4\./, `expected 4.x, got ${installed}`)
})

test('onclick-for-shorter-markup is not accepted as stricter', () => {
  const v2 = '<a href="https://frankx.ai" rel="noopener">link</a>'
  const v4 = '<a onclick="alert(1)">link</a>'
  assert.equal(isStricterOrEqual(v2, v4), false)
  assert.ok(listUnsafeHandlers(v4).length > 0)
})

for (const [cname, cfg] of Object.entries(CONFIGS)) {
  for (const [pname, html] of Object.entries(PAYLOADS)) {
    test(`v4 is identical or stricter than v2 for ${cname}/${pname}`, () => {
      const v2 = V2.results[cname][pname]
      const v4 = DOMPurify.sanitize(html, cfg)
      assertNoUnsafeHandlers(v4, `${cname}/${pname}`)
      assert.equal(
        isStricterOrEqual(v2, v4),
        true,
        `${cname}/${pname}: v4 ${JSON.stringify(v4)} is not identical or stricter than v2 ${JSON.stringify(v2)}`,
      )
    })
  }
}

test('safe markdown and HTML still survive the chapter allowlist', () => {
  const md = DOMPurify.sanitize(PAYLOADS.normal_markdown_html, CONFIGS.chapter)
  assertNoUnsafeHandlers(md, 'safe markdown html')
  assert.match(md, /Hello/)
  assert.match(md, /world/)
  assert.match(md, /<strong>/)
  const html = DOMPurify.sanitize(PAYLOADS.normal_html, CONFIGS.chapter)
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
  malformed_svg: 'Hi <svg onload=alert(1)><script>alert(1)</script></svg>',
  malformed_mathml: 'Hi <math><mi xlink:href="javascript:alert(1)">x</mi></math>',
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
