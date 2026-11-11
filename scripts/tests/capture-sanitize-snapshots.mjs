/**
 * Capture marked -> DOMPurify output from the pre-extract inline paths.
 *
 * Replay on the pinned base (must use that commit's inline ChapterReader,
 * PremiumReader, and PromptCard logic, not lib/sanitize):
 *
 *   git worktree add --detach .worktrees/sanitize-snapshot-base \
 *     3b9352ea83d96766dac5da657ba14180684bc3dc
 *   # copy this script into that worktree (it is not on the base commit)
 *   pnpm install --frozen-lockfile
 *   node --experimental-strip-types scripts/tests/capture-sanitize-snapshots.mjs
 *
 * This script must not import lib/sanitize. It mirrors the old call-site
 * options in isolation: chapter setOptions({gfm:true,breaks:true}) immediately
 * before parse, prompt setOptions({gfm:true,breaks:false}) immediately before
 * parse. That is each component's own configured options, not the leaked
 * global singleton state after a chapter render.
 */
import { createRequire } from 'node:module'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { marked } from 'marked'
import { WORKSHOP_PROMPTS } from '../../lib/workshop-prompts.ts'

const require = createRequire(import.meta.url)
const DOMPurify = require('isomorphic-dompurify')

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '../..')

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

const ENCODED_JS_HREFS = {
  decimal: '<a href="&#106;avascript:alert(1)">link</a>',
  hex: '<a href="&#x6A;avascript:alert(1)">link</a>',
}

const SOFT_BREAK_CASES = {
  single_newline_in_paragraph: 'alpha\nbeta',
  trailing_double_space: 'alpha  \nbeta',
  list: '- one\n- two',
}

const TOC_MARKDOWN_CASES = {
  'h1-and-h2': `# Opening Title

## A Section

Some text.
`,
}

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
  ...SOFT_BREAK_CASES,
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
  ...SOFT_BREAK_CASES,
}

function sha256(s) {
  return createHash('sha256').update(s, 'utf8').digest('hex')
}

function parseMarkdownLikeChapter(content) {
  marked.setOptions({
    gfm: true,
    breaks: true,
  })
  const rawHtml = marked.parse(content)
  return DOMPurify.sanitize(rawHtml, CONFIGS.chapter)
}

function parseMarkdownLikePrompt(body) {
  marked.setOptions({ gfm: true, breaks: false })
  const html = marked.parse(body, { async: false })
  return DOMPurify.sanitize(html, CONFIGS.prompt)
}

function headingId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function shouldSkipHeading(text) {
  const lower = text.toLowerCase()
  return (
    lower.includes('chapter') ||
    lower.includes('source') ||
    lower.includes('quotable') ||
    lower.includes('end chapter')
  )
}

function injectHeadingIds(content, headingRegex) {
  const toc = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    if (shouldSkipHeading(text)) continue
    toc.push({ id: headingId(text), text, level })
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

// ChapterReader uses /^(#{1,3})/; PremiumReader uses /^(#{2,3})/.
function injectChapterHeadingIds(content) {
  return injectHeadingIds(content, /^(#{1,3})\s+(.+)$/gm)
}

function injectPremiumHeadingIds(content) {
  return injectHeadingIds(content, /^(#{2,3})\s+(.+)$/gm)
}

const cases = []

function pushCase(entry) {
  cases.push({
    ...entry,
    sha256: sha256(entry.html),
  })
}

for (const [pname, html] of Object.entries(PAYLOADS)) {
  pushCase({ id: `payload-chapter/${pname}`, policy: 'chapter', html: DOMPurify.sanitize(html, CONFIGS.chapter) })
  pushCase({ id: `payload-prompt/${pname}`, policy: 'prompt', html: DOMPurify.sanitize(html, CONFIGS.prompt) })
}

for (const [name, html] of Object.entries(ENCODED_JS_HREFS)) {
  pushCase({ id: `encoded-js-chapter/${name}`, policy: 'chapter', html: DOMPurify.sanitize(html, CONFIGS.chapter) })
  pushCase({ id: `encoded-js-prompt/${name}`, policy: 'prompt', html: DOMPurify.sanitize(html, CONFIGS.prompt) })
}

for (const [name, markdown] of Object.entries(CHAPTER_MARKDOWN_CASES)) {
  pushCase({ id: `chapter-md/${name}`, policy: 'chapter', html: parseMarkdownLikeChapter(markdown) })
}

for (const [name, markdown] of Object.entries(PROMPT_MARKDOWN_CASES)) {
  pushCase({ id: `prompt-md/${name}`, policy: 'prompt', html: parseMarkdownLikePrompt(markdown) })
}

for (const [name, markdown] of Object.entries(TOC_MARKDOWN_CASES)) {
  pushCase({
    id: `chapter-toc/${name}`,
    policy: 'chapter',
    html: parseMarkdownLikeChapter(injectChapterHeadingIds(markdown)),
  })
  pushCase({
    id: `premium-toc/${name}`,
    policy: 'chapter',
    html: parseMarkdownLikeChapter(injectPremiumHeadingIds(markdown)),
  })
}

const chapterFiles = [
  'chapter-01-when-creation-calls.md',
  'chapter-02-the-orchestration-age.md',
  'chapter-03-the-first-gesture.md',
]
for (const file of chapterFiles) {
  const md = readFileSync(join(root, 'content/golden-age-book', file), 'utf8')
  pushCase({
    id: `real-chapter/${file}`,
    policy: 'chapter',
    sourceBytes: Buffer.byteLength(md, 'utf8'),
    html: parseMarkdownLikeChapter(injectChapterHeadingIds(md)),
  })
  pushCase({
    id: `real-chapter-premium/${file}`,
    policy: 'chapter',
    sourceBytes: Buffer.byteLength(md, 'utf8'),
    html: parseMarkdownLikeChapter(injectPremiumHeadingIds(md)),
  })
}

const promptIds = ['ai-initial-assessment', 'socratic-ikigai', 'dream-doubt-validator']
for (const id of promptIds) {
  const prompt = WORKSHOP_PROMPTS.find((p) => p.id === id)
  if (!prompt) throw new Error(`missing workshop prompt ${id}`)
  pushCase({
    id: `real-prompt/${id}`,
    policy: 'prompt',
    sourceBytes: Buffer.byteLength(prompt.body, 'utf8'),
    html: parseMarkdownLikePrompt(prompt.body),
  })
}

const ids = cases.map((c) => c.id)
const dup = ids.filter((id, i) => ids.indexOf(id) !== i)
if (dup.length) throw new Error(`duplicate snapshot ids: ${dup.join(', ')}`)

const outDir = join(root, 'scripts/tests/fixtures')
mkdirSync(outDir, { recursive: true })
const outPath = join(outDir, 'sanitize-markdown-snapshots.json')
const payload = {
  capturedAt: 'pre-extract',
  sourceSha: '3b9352ea83d96766dac5da657ba14180684bc3dc',
  capturedBy: 'scripts/tests/capture-sanitize-snapshots.mjs',
  note: 'Captured from the inline marked + isomorphic-dompurify paths in ChapterReader, PremiumReader, and PromptCard on the pinned base, using each component\'s own configured options in isolation (not the leaked global marked state after a chapter render). Includes every existing regression case, soft-break cases, ChapterReader (h1-h3) and PremiumReader (h2-h3) TOC injection, three real golden-age chapters, and three live WORKSHOP_PROMPTS bodies.',
  cases,
}
const serialized = JSON.stringify(payload, null, 2) + '\n'
writeFileSync(outPath, serialized, 'utf8')
const fixtureSha = sha256(serialized)
console.log(`wrote ${outPath}`)
console.log(`fixtureSha256=${fixtureSha}`)
console.log(`cases=${cases.length}`)
for (const c of cases) {
  console.log(`${c.id} bytes=${Buffer.byteLength(c.html, 'utf8')} sha256=${c.sha256}`)
}