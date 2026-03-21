#!/usr/bin/env node

/**
 * FrankX Book Publishing Pipeline
 *
 * Converts book chapters from markdown → epub/PDF for Kindle and print.
 *
 * Usage:
 *   node scripts/publish-book.mjs <book-slug> [--format epub|pdf|both] [--output <dir>]
 *
 * Examples:
 *   node scripts/publish-book.mjs spartan-mindset --format epub
 *   node scripts/publish-book.mjs golden-age --format both --output ./dist/books
 *   node scripts/publish-book.mjs --list  (show all available books)
 *
 * Requirements:
 *   npm install archiver (for epub zip)
 *   Optional: pandoc installed for PDF generation
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

// ── Book Registry (mirrors app/books/lib/books-registry.ts) ─────────────

const BOOKS_DIR = path.join(ROOT, 'content/books')
const OUTPUT_DIR = path.join(ROOT, 'dist/books')

const BOOK_META = {
  'spartan-mindset': {
    title: 'Spartan Mindset',
    subtitle: 'The Discipline of One More',
    author: 'Frank Riemer',
    series: 'FrankX Warrior Series',
    language: 'en',
    contentDir: 'spartan-mindset',
    cover: 'public/images/books/spartan-mindset-cover-v2.png',
  },
  'love-and-poetry': {
    title: 'Love & Poetry',
    subtitle: 'Verses That Move the Soul',
    author: 'Frank Riemer',
    series: 'FrankX Poetry Series',
    language: 'en',
    contentDir: 'love-and-poetry',
    cover: 'public/images/books/love-and-poetry-cover-v2.png',
  },
  'hope': {
    title: 'Hope',
    subtitle: 'A Light in the Dark',
    author: 'Frank Riemer',
    series: 'FrankX Poetry Series',
    language: 'en',
    contentDir: 'hoffnung',
    cover: 'public/images/books/hope-cover-v2.png',
  },
  'hoffnung': {
    title: 'Hoffnung',
    subtitle: 'Ein Licht in der Dunkelheit',
    author: 'Frank Riemer',
    series: 'FrankX Poesie-Reihe',
    language: 'de',
    contentDir: 'hoffnung-de',
    cover: 'public/images/books/hoffnung-cover-v2.png',
  },
  'self-development': {
    title: 'The Art of Self-Development',
    subtitle: 'Seven Pillars of a Complete Life',
    author: 'Frank Riemer',
    series: 'FrankX Consciousness Series',
    language: 'en',
    contentDir: 'self-development',
    cover: 'public/images/books/self-development-cover-v2.png',
  },
  'imagination': {
    title: 'Imagination',
    subtitle: 'Unlocking the Power of the Mind',
    author: 'Frank Riemer',
    series: 'FrankX Consciousness Series',
    language: 'en',
    contentDir: 'imagination',
    cover: 'public/images/books/imagination-cover-v2.png',
  },
  'manifestation': {
    title: 'Manifestation',
    subtitle: 'The Architecture of Reality',
    author: 'Frank Riemer',
    series: 'FrankX Consciousness Series',
    language: 'en',
    contentDir: 'manifestation',
    cover: 'public/images/books/manifestation-cover-v2.png',
  },
}

// ── Helpers ──────────────────────────────────────────────────────────────

function getChapterFiles(contentDir) {
  const dir = path.join(BOOKS_DIR, contentDir)
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .filter(f => f.startsWith('chapter-'))
    .sort()
}

function markdownToHtml(md) {
  // Simple markdown → HTML conversion for epub
  let html = md
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr/>')
    // Block quotes
    .replace(/^> (.*$)/gm, '<blockquote><p>$1</p></blockquote>')
    // Paragraphs (lines not already wrapped)
    .split('\n\n')
    .map(block => {
      block = block.trim()
      if (!block) return ''
      if (block.startsWith('<')) return block
      return `<p>${block.replace(/\n/g, '<br/>')}</p>`
    })
    .join('\n')

  return html
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

// ── EPUB Generation ─────────────────────────────────────────────────────

function generateEpubStructure(bookSlug) {
  const meta = BOOK_META[bookSlug]
  if (!meta) throw new Error(`Unknown book: ${bookSlug}`)

  const chapters = getChapterFiles(meta.contentDir)
  if (chapters.length === 0) throw new Error(`No chapters found in content/books/${meta.contentDir}/`)

  const uuid = generateUUID()
  const date = new Date().toISOString().split('T')[0]
  const outputDir = path.join(OUTPUT_DIR, bookSlug, 'epub')

  // Create directory structure
  fs.mkdirSync(path.join(outputDir, 'META-INF'), { recursive: true })
  fs.mkdirSync(path.join(outputDir, 'OEBPS'), { recursive: true })

  // 1. mimetype (must be first, uncompressed)
  fs.writeFileSync(path.join(outputDir, 'mimetype'), 'application/epub+zip')

  // 2. container.xml
  fs.writeFileSync(path.join(outputDir, 'META-INF/container.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`)

  // 3. Convert chapters to XHTML
  const chapterData = chapters.map((file, i) => {
    const md = fs.readFileSync(path.join(BOOKS_DIR, meta.contentDir, file), 'utf-8')
    const html = markdownToHtml(md)
    const id = `chapter-${String(i + 1).padStart(2, '0')}`
    const filename = `${id}.xhtml`

    // Extract title from first h1
    const titleMatch = md.match(/^# (.+)$/m)
    const title = titleMatch ? titleMatch[1] : `Chapter ${i + 1}`

    const xhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${meta.language}" lang="${meta.language}">
<head>
  <meta charset="UTF-8"/>
  <title>${title}</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
${html}
</body>
</html>`

    fs.writeFileSync(path.join(outputDir, 'OEBPS', filename), xhtml)
    return { id, filename, title }
  })

  // 4. CSS
  fs.writeFileSync(path.join(outputDir, 'OEBPS/style.css'), `
body { font-family: Georgia, 'Times New Roman', serif; line-height: 1.8; margin: 2em; color: #1a1a1a; }
h1 { font-size: 2em; margin-bottom: 0.5em; text-align: center; }
h2 { font-size: 1.4em; margin-top: 2em; margin-bottom: 0.5em; }
h3 { font-size: 1.2em; margin-top: 1.5em; }
p { margin: 0.8em 0; text-indent: 1em; }
blockquote { margin: 1.5em 2em; font-style: italic; border-left: 3px solid #ccc; padding-left: 1em; }
hr { border: none; border-top: 1px solid #ddd; margin: 2em 0; }
strong { font-weight: bold; }
em { font-style: italic; }
.title-page { text-align: center; padding-top: 30%; }
.title-page h1 { font-size: 2.5em; }
.title-page .subtitle { font-size: 1.2em; color: #666; margin-top: 0.5em; }
.title-page .author { font-size: 1.1em; margin-top: 2em; }
.title-page .series { font-size: 0.9em; color: #888; margin-top: 0.5em; }
`)

  // 5. Title page
  const titleXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${meta.language}" lang="${meta.language}">
<head><meta charset="UTF-8"/><title>${meta.title}</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
<div class="title-page">
  <h1>${meta.title}</h1>
  <p class="subtitle">${meta.subtitle}</p>
  <p class="author">${meta.author}</p>
  <p class="series">${meta.series}</p>
</div>
</body>
</html>`
  fs.writeFileSync(path.join(outputDir, 'OEBPS/title.xhtml'), titleXhtml)

  // 6. Table of contents (NCX)
  const ncx = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head><meta name="dtb:uid" content="${uuid}"/></head>
  <docTitle><text>${meta.title}</text></docTitle>
  <navMap>
    <navPoint id="title" playOrder="1"><navLabel><text>Title Page</text></navLabel><content src="title.xhtml"/></navPoint>
${chapterData.map((ch, i) => `    <navPoint id="${ch.id}" playOrder="${i + 2}"><navLabel><text>${ch.title}</text></navLabel><content src="${ch.filename}"/></navPoint>`).join('\n')}
  </navMap>
</ncx>`
  fs.writeFileSync(path.join(outputDir, 'OEBPS/toc.ncx'), ncx)

  // 7. Content OPF (package document)
  const opf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="bookid" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="bookid">${uuid}</dc:identifier>
    <dc:title>${meta.title}: ${meta.subtitle}</dc:title>
    <dc:creator>${meta.author}</dc:creator>
    <dc:language>${meta.language}</dc:language>
    <dc:date>${date}</dc:date>
    <dc:publisher>FrankX Publishing</dc:publisher>
    <meta property="belongs-to-collection">${meta.series}</meta>
  </metadata>
  <manifest>
    <item id="style" href="style.css" media-type="text/css"/>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    <item id="title" href="title.xhtml" media-type="application/xhtml+xml"/>
${chapterData.map(ch => `    <item id="${ch.id}" href="${ch.filename}" media-type="application/xhtml+xml"/>`).join('\n')}
  </manifest>
  <spine toc="ncx">
    <itemref idref="title"/>
${chapterData.map(ch => `    <itemref idref="${ch.id}"/>`).join('\n')}
  </spine>
</package>`
  fs.writeFileSync(path.join(outputDir, 'OEBPS/content.opf'), opf)

  return { outputDir, chapterCount: chapterData.length, meta }
}

// ── CLI ──────────────────────────────────────────────────────────────────

const args = process.argv.slice(2)

if (args.includes('--list')) {
  console.log('\nAvailable books:')
  console.log('================')
  for (const [slug, meta] of Object.entries(BOOK_META)) {
    const chapters = getChapterFiles(meta.contentDir)
    console.log(`  ${slug.padEnd(20)} ${meta.title} (${chapters.length} chapters)`)
  }
  console.log('\nUsage: node scripts/publish-book.mjs <slug> [--format epub|pdf|both]')
  process.exit(0)
}

const bookSlug = args[0]
if (!bookSlug) {
  console.error('Error: provide a book slug. Use --list to see available books.')
  process.exit(1)
}

if (!BOOK_META[bookSlug]) {
  console.error(`Error: unknown book "${bookSlug}". Use --list to see available books.`)
  process.exit(1)
}

const format = args.includes('--format') ? args[args.indexOf('--format') + 1] : 'epub'

console.log(`\n📚 FrankX Book Publisher`)
console.log(`========================`)
console.log(`Book: ${BOOK_META[bookSlug].title}`)
console.log(`Format: ${format}`)
console.log()

try {
  if (format === 'epub' || format === 'both') {
    const result = generateEpubStructure(bookSlug)
    console.log(`✅ EPUB structure generated:`)
    console.log(`   ${result.chapterCount} chapters`)
    console.log(`   Output: ${result.outputDir}`)
    console.log(`\n   To create .epub file:`)
    console.log(`   cd ${result.outputDir} && zip -X0 ../../../${bookSlug}.epub mimetype && zip -X9Dr ../../../${bookSlug}.epub META-INF OEBPS`)
    console.log()
  }

  if (format === 'pdf' || format === 'both') {
    console.log(`📄 PDF generation requires pandoc:`)
    console.log(`   pandoc content/books/${BOOK_META[bookSlug].contentDir}/chapter-*.md -o dist/books/${bookSlug}.pdf --pdf-engine=xelatex`)
    console.log()
  }

  console.log(`✨ Done!`)
} catch (err) {
  console.error(`❌ Error: ${err.message}`)
  process.exit(1)
}
