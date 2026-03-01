#!/usr/bin/env node
/**
 * FrankX Book PDF Generator
 *
 * Converts MDX book chapters into beautifully designed PDFs using Puppeteer.
 * Each book gets a branded cover page, table of contents, and styled chapters.
 *
 * Usage:
 *   node scripts/generate-book-pdfs.mjs                    # All books
 *   node scripts/generate-book-pdfs.mjs spartan-mindset    # Single book
 */

import puppeteer from 'puppeteer'
import { marked } from 'marked'
import { readFileSync, readdirSync, mkdirSync, existsSync } from 'fs'
import { join, resolve } from 'path'

// ─── Book Registry ──────────────────────────────────────────────

const BOOKS = [
  {
    slug: 'love-and-poetry',
    title: 'Love & Poetry',
    subtitle: 'Verses That Move the Soul',
    author: 'Frank',
    color: '#F43F5E',
    accent: '#EAB308',
    contentDir: 'content/books/love-and-poetry',
    description: 'A curated collection of love poetry — Rumi, Rilke, Goethe, Gibran — woven with original verse.',
    year: '2026',
  },
  {
    slug: 'spartan-mindset',
    title: 'Spartan Mindset',
    subtitle: 'The Discipline of One More',
    author: 'Frank',
    color: '#EF4444',
    accent: '#78716C',
    contentDir: 'content/books/spartan-mindset',
    description: 'Discipline, training, and the philosophy of pushing past limits.',
    year: '2026',
  },
  {
    slug: 'self-development',
    title: 'The Art of Self-Development',
    subtitle: 'Seven Pillars of a Complete Life',
    author: 'Frank',
    color: '#10B981',
    accent: '#06B6D4',
    contentDir: 'content/books/self-development',
    description: 'A systematic approach to building every dimension of your life.',
    year: '2026',
  },
  {
    slug: 'imagination',
    title: 'Imagination',
    subtitle: 'Unlocking the Power of the Mind',
    author: 'Frank',
    color: '#8B5CF6',
    accent: '#06B6D4',
    contentDir: 'content/books/imagination',
    description: 'Your imagination is the most powerful technology you possess.',
    year: '2026',
  },
  {
    slug: 'manifestation',
    title: 'Manifestation',
    subtitle: 'The Architecture of Reality',
    author: 'Frank',
    color: '#EAB308',
    accent: '#A855F7',
    contentDir: 'content/books/manifestation',
    description: 'The grounded, psychological approach to turning thought into reality.',
    year: '2026',
  },
  {
    slug: 'golden-age',
    title: 'The Golden Age of Creators',
    subtitle: 'The Democratization of Creative Capability',
    author: 'Frank',
    color: '#F59E0B',
    accent: '#6366F1',
    contentDir: 'content/golden-age-book',
    description: 'How the creator economy crossed $250 billion and the barriers to creative expression evaporated.',
    year: '2026',
  },
  {
    slug: 'hoffnung',
    title: 'Hoffnung',
    subtitle: 'The Poetry of Hope — A Companion for the Journey',
    author: 'Frank',
    color: '#38BDF8',
    accent: '#F59E0B',
    contentDir: 'content/books/hoffnung',
    description: 'Poetry, music, meditation, and guided exercises for anyone walking through grief, loss, or uncertainty.',
    year: '2026',
  },
]

// ─── CSS Template ───────────────────────────────────────────────

function getCSS(book) {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');

    :root {
      --color-primary: ${book.color};
      --color-accent: ${book.accent};
      --color-bg: #0A0A0F;
      --color-surface: #111118;
      --color-text: #E4E4E7;
      --color-text-muted: #A1A1AA;
      --color-border: #27272A;
    }

    @page {
      size: A4;
      margin: 2.5cm 2cm 3cm 2cm;
    }

    @page :first { margin: 0; }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 11pt;
      line-height: 1.75;
      color: var(--color-text);
      background: var(--color-bg);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* ─── Cover Page ─────────────────────────────── */

    .cover {
      width: 210mm;
      height: 297mm;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: linear-gradient(180deg, ${book.color}08 0%, var(--color-bg) 40%, var(--color-bg) 60%, ${book.accent}06 100%);
      position: relative;
      page-break-after: always;
      padding: 4cm 3cm;
    }

    .cover::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, ${book.color}, ${book.accent});
    }

    .cover-ornament {
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, transparent, ${book.color}, transparent);
      margin: 0 auto 2em;
    }

    .cover h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 36pt;
      font-weight: 700;
      color: #FAFAFA;
      letter-spacing: -0.02em;
      line-height: 1.15;
      margin-bottom: 0.3em;
    }

    .cover .subtitle {
      font-family: 'Inter', sans-serif;
      font-size: 13pt;
      font-weight: 300;
      color: ${book.color};
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 2em;
    }

    .cover .author {
      font-family: 'Inter', sans-serif;
      font-size: 11pt;
      font-weight: 400;
      color: var(--color-text-muted);
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }

    .cover .year {
      font-family: 'Inter', sans-serif;
      font-size: 9pt;
      color: #52525B;
      margin-top: 3em;
    }

    .cover .brand {
      position: absolute;
      bottom: 3cm;
      font-family: 'Inter', sans-serif;
      font-size: 9pt;
      font-weight: 500;
      color: #52525B;
      letter-spacing: 0.2em;
    }

    /* ─── Table of Contents ──────────────────────── */

    .toc {
      page-break-after: always;
      padding-top: 2em;
    }

    .toc h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 20pt;
      font-weight: 600;
      color: #FAFAFA;
      margin-bottom: 1.5em;
      padding-bottom: 0.5em;
      border-bottom: 1px solid var(--color-border);
    }

    .toc-item {
      display: flex;
      align-items: baseline;
      padding: 0.6em 0;
      border-bottom: 1px dotted #27272A40;
    }

    .toc-item .chapter-num {
      font-family: 'Inter', sans-serif;
      font-size: 9pt;
      font-weight: 600;
      color: ${book.color};
      min-width: 2em;
    }

    .toc-item .chapter-title {
      font-family: 'Inter', sans-serif;
      font-size: 11pt;
      font-weight: 500;
      color: var(--color-text);
      flex: 1;
      margin-left: 0.5em;
    }

    /* ─── Chapter Content ────────────────────────── */

    .chapter { page-break-before: always; }

    .chapter-header {
      margin-bottom: 2em;
      padding-bottom: 1.5em;
      border-bottom: 1px solid var(--color-border);
    }

    .chapter-header .chapter-label {
      font-family: 'Inter', sans-serif;
      font-size: 9pt;
      font-weight: 600;
      color: ${book.color};
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 0.5em;
    }

    .chapter-header h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 24pt;
      font-weight: 700;
      color: #FAFAFA;
      line-height: 1.2;
    }

    h1 { font-family: 'Playfair Display', serif; font-size: 22pt; font-weight: 700; color: #FAFAFA; margin: 1.5em 0 0.5em; }
    h2 { font-family: 'Playfair Display', serif; font-size: 16pt; font-weight: 600; color: #FAFAFA; margin: 1.3em 0 0.4em; }
    h3 { font-family: 'Inter', sans-serif; font-size: 12pt; font-weight: 600; color: #D4D4D8; margin: 1.2em 0 0.3em; }

    p { margin-bottom: 0.8em; text-align: justify; hyphens: auto; }
    strong { color: #FAFAFA; font-weight: 600; }
    em { font-style: italic; color: #D4D4D8; }

    blockquote {
      margin: 1.5em 0;
      padding: 1em 1.5em;
      border-left: 3px solid ${book.color};
      background: ${book.color}08;
      border-radius: 0 4px 4px 0;
      font-style: italic;
      color: #D4D4D8;
    }

    blockquote p { margin-bottom: 0.3em; }

    ul, ol { margin: 0.8em 0 0.8em 1.5em; }
    li { margin-bottom: 0.3em; }

    hr {
      border: none;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--color-border), transparent);
      margin: 2em 0;
    }

    code {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 0.9em;
      background: #18181B;
      padding: 0.15em 0.4em;
      border-radius: 3px;
      color: ${book.color};
    }

    /* ─── Back Page ──────────────────────────────── */

    .back-page {
      page-break-before: always;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 60vh;
      padding: 4em 2em;
    }

    .back-page .description {
      font-size: 12pt;
      font-style: italic;
      color: var(--color-text-muted);
      max-width: 400px;
      line-height: 1.8;
      margin-bottom: 2em;
    }

    .back-page .cta {
      font-size: 10pt;
      font-weight: 500;
      color: ${book.color};
      letter-spacing: 0.1em;
    }

    .back-page .url {
      font-size: 9pt;
      color: #52525B;
      margin-top: 0.5em;
    }
  `
}

// ─── HTML Builder ───────────────────────────────────────────────

function buildBookHTML(book, chapters) {
  const css = getCSS(book)

  const cover = `
    <div class="cover">
      <div class="cover-ornament"></div>
      <h1>${book.title}</h1>
      <div class="subtitle">${book.subtitle}</div>
      <div class="author">By ${book.author}</div>
      <div class="year">${book.year}</div>
      <div class="brand">frankx.ai</div>
    </div>`

  const tocItems = chapters
    .map((ch, i) => `
    <div class="toc-item">
      <span class="chapter-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="chapter-title">${ch.title}</span>
    </div>`)
    .join('')

  const toc = `
    <div class="toc">
      <h2>Contents</h2>
      ${tocItems}
    </div>`

  const chapterHTML = chapters
    .map((ch, i) => {
      const html = marked.parse(ch.content)
      return `
      <div class="chapter">
        <div class="chapter-header">
          <div class="chapter-label">Chapter ${String(i + 1).padStart(2, '0')}</div>
          <h2>${ch.title}</h2>
        </div>
        ${html}
      </div>`
    })
    .join('')

  const backPage = `
    <div class="back-page">
      <div class="cover-ornament" style="margin-bottom: 2em;"></div>
      <div class="description">${book.description}</div>
      <div class="cta">Read more at frankx.ai/books</div>
      <div class="url">frankx.ai</div>
    </div>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${book.title} — ${book.author}</title>
  <style>${css}</style>
</head>
<body>
  ${cover}
  ${toc}
  ${chapterHTML}
  ${backPage}
</body>
</html>`
}

// ─── Chapter Parser ─────────────────────────────────────────────

function parseChapters(contentDir) {
  const dir = resolve(contentDir)
  if (!existsSync(dir)) {
    console.error(`  Directory not found: ${dir}`)
    return []
  }

  const files = readdirSync(dir)
    .filter((f) => f.startsWith('chapter-') && f.endsWith('.md'))
    .sort()

  return files.map((file) => {
    const raw = readFileSync(join(dir, file), 'utf-8')
    const titleMatch = raw.match(/^#\s+(.+)$/m)
    const title = titleMatch
      ? titleMatch[1]
      : file.replace(/chapter-\d+-/, '').replace('.md', '').replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase())

    const content = raw.replace(/^#\s+.+$/m, '').trim()
    return { file, title, content }
  })
}

// ─── PDF Generator ──────────────────────────────────────────────

async function generatePDF(book) {
  console.log(`\n  Generating: ${book.title}`)

  const chapters = parseChapters(book.contentDir)
  if (chapters.length === 0) {
    console.log(`  SKIP: No chapters found in ${book.contentDir}`)
    return null
  }

  console.log(`  Chapters: ${chapters.length}`)
  const totalWords = chapters.reduce((sum, ch) => sum + ch.content.split(/\s+/).length, 0)
  console.log(`  Words: ${totalWords.toLocaleString()}`)

  const html = buildBookHTML(book, chapters)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 })
  await page.evaluateHandle('document.fonts.ready')

  const outputDir = resolve('public/books')
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true })

  const outputPath = join(outputDir, `${book.slug}.pdf`)

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    margin: { top: '2.5cm', bottom: '3cm', left: '2cm', right: '2cm' },
    preferCSSPageSize: true,
  })

  await browser.close()

  const size = (readFileSync(outputPath).length / 1024 / 1024).toFixed(1)
  console.log(`  Output: ${outputPath} (${size} MB)`)

  return { path: outputPath, size, chapters: chapters.length, words: totalWords }
}

// ─── Main ───────────────────────────────────────────────────────

async function main() {
  const targetSlug = process.argv[2]

  console.log('=== FrankX Book PDF Generator ===')
  console.log('Design: Dark premium, Playfair Display + Inter, A4')

  const booksToGenerate = targetSlug
    ? BOOKS.filter((b) => b.slug === targetSlug)
    : BOOKS

  if (booksToGenerate.length === 0) {
    console.error(`Book not found: ${targetSlug}`)
    console.log(`Available: ${BOOKS.map((b) => b.slug).join(', ')}`)
    process.exit(1)
  }

  const results = []

  for (const book of booksToGenerate) {
    try {
      const result = await generatePDF(book)
      if (result) results.push({ ...book, ...result })
    } catch (err) {
      console.error(`  FAILED: ${book.slug} — ${err.message}`)
    }
  }

  console.log('\n=== Results ===')
  for (const r of results) {
    console.log(`  ${r.title.padEnd(35)} | ${r.chapters} ch | ${r.words.toLocaleString().padStart(6)} words | ${r.size} MB`)
  }
  console.log(`\nGenerated: ${results.length}/${booksToGenerate.length} books`)
  console.log('Output: public/books/*.pdf')
}

main().catch(console.error)
