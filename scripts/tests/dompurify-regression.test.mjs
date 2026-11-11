import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import DOMPurify from 'isomorphic-dompurify'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const installed = JSON.parse(
  readFileSync(path.join(root, 'node_modules/isomorphic-dompurify/package.json'), 'utf8'),
).version

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

const DANGEROUS = /<script|onerror\s*=|onload\s*=|javascript:|<iframe|<svg/i

function isStricterOrEqual(v2, v4) {
  if (v4 === v2) return true
  // v4 may drop more tags/attributes, but must not add markup v2 did not have
  if (v2.includes(v4) || v4.length <= v2.length && v2.replace(/<[^>]+>/g, '') === v4.replace(/<[^>]+>/g, '')) {
    return !DANGEROUS.test(v4) || (DANGEROUS.test(v2) && v4.length <= v2.length)
  }
  // text content preserved, no new dangerous tokens, no new tags
  const text2 = v2.replace(/<[^>]+>/g, '')
  const text4 = v4.replace(/<[^>]+>/g, '')
  if (text4 === text2 && !DANGEROUS.test(v4)) {
    const tags4 = v4.match(/<\/?([a-z0-9]+)/gi) || []
    const tags2 = v2.match(/<\/?([a-z0-9]+)/gi) || []
    return tags4.every((t) => tags2.includes(t))
  }
  return false
}

test('isomorphic-dompurify is the v4 line under test', () => {
  assert.match(installed, /^4\./, `expected 4.x, got ${installed}`)
})

for (const [cname, cfg] of Object.entries(CONFIGS)) {
  for (const [pname, html] of Object.entries(PAYLOADS)) {
    test(`v4 is identical or stricter than v2 for ${cname}/${pname}`, () => {
      const v2 = V2.results[cname][pname]
      const v4 = DOMPurify.sanitize(html, cfg)
      if (['script', 'img_onerror', 'svg_script', 'svg_onload', 'iframe', 'js_href'].includes(pname)) {
        assert.equal(DANGEROUS.test(v4), false, `v4 leaked dangerous markup: ${v4}`)
      }
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
  assert.match(md, /Hello/)
  assert.match(md, /world/)
  assert.match(md, /<strong>/)
  const html = DOMPurify.sanitize(PAYLOADS.normal_html, CONFIGS.chapter)
  assert.match(html, /Safe/)
  assert.match(html, /href="https:\/\/frankx.ai"/)
})
