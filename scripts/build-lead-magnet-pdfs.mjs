#!/usr/bin/env node
/**
 * Renders every entry in data/lead-magnets.json to a real PDF from its source
 * markdown. Guides are single .mdx files; books are directories of chapters
 * rendered in filename order.
 *
 * Sources below MIN_WORDS are refused rather than rendered — a 500-word PDF
 * offered as a "playbook" is the failure mode this pipeline exists to prevent.
 */
import fs from 'node:fs'
import path from 'node:path'
import { marked } from 'marked'
import puppeteer from 'puppeteer'

const ROOT = process.cwd()
const REGISTRY = path.join(ROOT, 'data/lead-magnets.json')
const OUT_DIR = path.join(ROOT, 'public/downloads/pdfs')
const MIN_WORDS = 800

const onlyId = process.argv.find((a) => a.startsWith('--id='))?.slice(5)
const check = process.argv.includes('--check')

function stripFrontmatter(md) {
  return md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
}

// Agent/tooling files that live alongside chapters but are not book content.
const NOT_CONTENT = /^(CLAUDE|README|AGENTS|INDEX)\.mdx?$/i

function chapterFiles(dir) {
  return fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f) && !NOT_CONTENT.test(f))
}

/**
 * Chapter order has to come from the filenames. Without a numeric prefix,
 * readdir order is alphabetical and arbitrary — which silently ships a book
 * with its chapters shuffled. Refuse instead of guessing the author's order.
 */
function readSource(source) {
  const abs = path.join(ROOT, source)
  if (!fs.statSync(abs).isDirectory()) {
    return stripFrontmatter(fs.readFileSync(abs, 'utf8'))
  }

  const chapters = chapterFiles(abs)
  const unordered = chapters.filter((f) => !/\d/.test(f.split('-').slice(0, 2).join('-')))
  if (unordered.length) {
    const err = new Error(
      `${source} has no numeric chapter prefixes (e.g. ${unordered[0]}), so chapter order cannot be determined`
    )
    err.code = 'UNORDERED'
    throw err
  }

  return chapters
    .sort()
    .map((f) => stripFrontmatter(fs.readFileSync(path.join(abs, f), 'utf8')))
    .join('\n\n<div class="page-break"></div>\n\n')
}

function wordCount(md) {
  return md.split(/\s+/).filter(Boolean).length
}

function documentHtml(magnet, bodyHtml, year, { coverOnly = false } = {}) {
  // The cover screenshot renders standalone, so it needs its own opaque canvas
  // and viewport-height cover; the print path gets those from @page instead.
  const coverOnlyCss = coverOnly
    ? `body { background: #fff; padding: 0 9mm; }
       .cover { height: 100vh; box-sizing: border-box; }
       .cover h1 { font-size: 34pt; }`
    : ''
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @page { margin: 22mm 18mm; }
  body {
    font-family: "Source Serif 4", Charter, Georgia, serif;
    font-size: 11.5pt; line-height: 1.65; color: #16181d; margin: 0;
  }
  .cover {
    height: 232mm; display: flex; flex-direction: column; justify-content: center;
    border-top: 3px solid #16181d; border-bottom: 1px solid #c8ccd4;
  }
  .cover .eyebrow {
    font-family: Inter, system-ui, sans-serif; font-size: 9pt;
    letter-spacing: 0.14em; text-transform: uppercase; color: #6a7180; margin-bottom: 14mm;
  }
  .cover h1 { font-size: 30pt; line-height: 1.15; margin: 0 0 6mm; font-weight: 600; }
  .cover .subtitle { font-size: 13pt; color: #464c58; font-style: italic; margin: 0 0 16mm; }
  .cover .meta {
    font-family: Inter, system-ui, sans-serif; font-size: 9.5pt; color: #6a7180;
    border-top: 1px solid #dfe2e8; padding-top: 5mm;
  }
  .page-break { page-break-after: always; }
  h1, h2, h3 { font-family: Inter, system-ui, sans-serif; font-weight: 600; color: #0f1115; }
  h1 { font-size: 19pt; margin: 12mm 0 4mm; }
  h2 { font-size: 14pt; margin: 9mm 0 3mm; }
  h3 { font-size: 11.5pt; margin: 6mm 0 2mm; }
  p { margin: 0 0 3.6mm; }
  ul, ol { margin: 0 0 4mm; padding-left: 6mm; }
  li { margin-bottom: 1.6mm; }
  code {
    font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 9.5pt;
    background: #f3f4f7; padding: 0.4mm 1.2mm; border-radius: 2px;
  }
  pre {
    background: #f3f4f7; padding: 4mm; border-radius: 3px; overflow-x: auto;
    border-left: 2px solid #c8ccd4;
  }
  pre code { background: none; padding: 0; }
  blockquote {
    margin: 5mm 0; padding-left: 5mm; border-left: 2px solid #c8ccd4;
    color: #464c58; font-style: italic;
  }
  hr { border: none; border-top: 1px solid #e4e7ec; margin: 7mm 0; }
  table { border-collapse: collapse; width: 100%; font-size: 10pt; margin: 0 0 4mm; }
  th, td { border: 1px solid #dfe2e8; padding: 2mm 3mm; text-align: left; }
  th { background: #f6f7f9; font-family: Inter, system-ui, sans-serif; }
  ${coverOnlyCss}
</style></head>
<body>
  <div class="cover">
    <div class="eyebrow">FrankX &middot; ${escapeHtml(magnet.category)}</div>
    <h1>${escapeHtml(magnet.title)}</h1>
    <p class="subtitle">${escapeHtml(magnet.subtitle)}</p>
    <div class="meta">Frank Riemer &middot; frankx.ai &middot; ${year}</div>
  </div>
  <div class="page-break"></div>
  ${bodyHtml}
</body></html>`
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
}

const magnets = JSON.parse(fs.readFileSync(REGISTRY, 'utf8'))
const targets = onlyId ? magnets.filter((m) => m.id === onlyId) : magnets

const skipped = []
const renderable = []
for (const magnet of targets) {
  let md
  try {
    md = readSource(magnet.source)
  } catch (err) {
    if (err.code !== 'UNORDERED') throw err
    skipped.push({ id: magnet.id, reason: err.message })
    continue
  }
  const words = wordCount(md)
  if (words < MIN_WORDS) {
    skipped.push({ id: magnet.id, reason: `${words} words in ${magnet.source} (min ${MIN_WORDS})` })
  } else {
    renderable.push({ magnet, md, words })
  }
}

for (const s of skipped) {
  console.warn(`SKIP ${s.id}: ${s.reason}`)
}

if (check) {
  console.log(`${renderable.length} renderable, ${skipped.length} skipped.`)
  process.exit(skipped.length ? 1 : 0)
}

fs.mkdirSync(OUT_DIR, { recursive: true })
const year = new Date().getFullYear()
const browser = await puppeteer.launch({ headless: true })

try {
  for (const { magnet, md, words } of renderable) {
    const page = await browser.newPage()
    const bodyHtml = marked.parse(md, { gfm: true, breaks: false })
    await page.setContent(documentHtml(magnet, bodyHtml, year), { waitUntil: 'load' })
    const outPath = path.join(ROOT, 'public', magnet.pdfUrl)
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    await page.pdf({
      path: outPath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate:
        '<div style="width:100%;font-family:system-ui,sans-serif;font-size:8pt;color:#8a909c;padding:0 18mm;display:flex;justify-content:space-between;">' +
        '<span>frankx.ai</span><span class="pageNumber"></span></div>',
      margin: { top: '22mm', bottom: '18mm', left: '18mm', right: '18mm' },
    })
    await page.close()
    const kb = Math.round(fs.statSync(outPath).size / 1024)
    console.log(`${String(kb).padStart(5)} KB  ${String(words).padStart(6)} words  ${magnet.pdfUrl}`)

    // The cover art is the PDF's own cover page, so the thumbnail on the landing
    // page is always the actual first page of the file being downloaded.
    const shot = await browser.newPage()
    await shot.setViewport({ width: 900, height: 1200, deviceScaleFactor: 1.4 })
    await shot.setContent(documentHtml(magnet, '', year, { coverOnly: true }), { waitUntil: 'load' })
    const coverPath = path.join(ROOT, 'public', magnet.coverImage)
    fs.mkdirSync(path.dirname(coverPath), { recursive: true })
    await shot.screenshot({ path: coverPath })
    await shot.close()
  }
} finally {
  await browser.close()
}

console.log(`\nRendered ${renderable.length} PDF(s). Skipped ${skipped.length}.`)
