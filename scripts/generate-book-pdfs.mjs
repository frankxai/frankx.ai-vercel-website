import { launch } from 'puppeteer'
import { put } from '@vercel/blob'
import { readFileSync, existsSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { marked } from 'marked'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

// Book configurations matching books-registry.ts
const BOOKS = [
  {
    slug: 'love-and-poetry',
    title: 'Love & Poetry',
    subtitle: 'Verses That Move the Soul',
    author: 'Frank',
    contentDir: 'content/books/love-and-poetry',
    theme: {
      primary: '#f43f5e',
      accent: '#f59e0b',
      bgDark: '#0a0a0f',
      bgPage: '#faf7f5',
      textColor: '#1a1a2e',
      headingFont: "'Playfair Display', Georgia, serif",
      bodyFont: "'Playfair Display', Georgia, serif",
    },
    chapters: [
      'chapter-01-rumi-speaks',
      'chapter-02-dichter-der-liebe',
      'chapter-03-nha-tho-tinh-yeu',
      'chapter-04-wisdom-of-the-ages',
      'chapter-05-a-poem-for-you',
    ],
  },
  {
    slug: 'spartan-mindset',
    title: 'Spartan Mindset',
    subtitle: 'The Discipline of One More',
    author: 'Frank',
    contentDir: 'content/books/spartan-mindset',
    theme: {
      primary: '#dc2626',
      accent: '#a8a29e',
      bgDark: '#030712',
      bgPage: '#f5f5f4',
      textColor: '#1c1917',
      headingFont: "'Inter', 'Helvetica Neue', sans-serif",
      bodyFont: "'Inter', 'Helvetica Neue', sans-serif",
    },
    chapters: [
      'chapter-01-the-spartan-code',
      'chapter-02-iron-discipline',
      'chapter-03-one-more-rep',
      'chapter-04-the-forge',
      'chapter-05-mind-over-matter',
    ],
  },
  {
    slug: 'golden-age',
    title: 'The Golden Age of Creators',
    subtitle: 'The Democratization of Creative Capability and Distribution',
    author: 'Frank',
    contentDir: 'content/golden-age-book',
    theme: {
      primary: '#f59e0b',
      accent: '#6366f1',
      bgDark: '#0F172A',
      bgPage: '#fefce8',
      textColor: '#1e1b4b',
      headingFont: "'Playfair Display', Georgia, serif",
      bodyFont: "'Inter', 'Helvetica Neue', sans-serif",
    },
    chapters: [
      'chapter-01-when-creation-calls',
      'chapter-02-the-orchestration-age',
      'chapter-03-the-first-gesture',
    ],
  },
  {
    slug: 'self-development',
    title: 'The Art of Self-Development',
    subtitle: 'Seven Pillars of a Complete Life',
    author: 'Frank',
    contentDir: 'content/books/self-development',
    theme: {
      primary: '#10b981',
      accent: '#06b6d4',
      bgDark: '#030f0a',
      bgPage: '#f0fdf4',
      textColor: '#022c22',
      headingFont: "'Inter', 'Helvetica Neue', sans-serif",
      bodyFont: "'Inter', 'Helvetica Neue', sans-serif",
    },
    chapters: [
      'chapter-01-energy',
      'chapter-02-mind',
      'chapter-03-soul',
      'chapter-04-craft',
      'chapter-05-capital',
      'chapter-06-circle',
      'chapter-07-legacy',
    ],
  },
  {
    slug: 'imagination',
    title: 'Imagination',
    subtitle: 'Unlocking the Power of the Mind',
    author: 'Frank',
    contentDir: 'content/books/imagination',
    theme: {
      primary: '#8b5cf6',
      accent: '#06b6d4',
      bgDark: '#0a0a12',
      bgPage: '#faf5ff',
      textColor: '#2e1065',
      headingFont: "'Playfair Display', Georgia, serif",
      bodyFont: "'Inter', 'Helvetica Neue', sans-serif",
    },
    chapters: [
      'chapter-01-the-inner-theater',
      'chapter-02-creative-visualization',
      'chapter-03-mental-models',
      'chapter-04-the-architects-eye',
      'chapter-05-beyond-the-visible',
    ],
  },
  {
    slug: 'manifestation',
    title: 'Manifestation',
    subtitle: 'The Architecture of Reality',
    author: 'Frank',
    contentDir: 'content/books/manifestation',
    theme: {
      primary: '#f59e0b',
      accent: '#a855f7',
      bgDark: '#0f0a05',
      bgPage: '#fffbeb',
      textColor: '#451a03',
      headingFont: "'Playfair Display', Georgia, serif",
      bodyFont: "'Inter', 'Helvetica Neue', sans-serif",
    },
    chapters: [
      'chapter-01-the-architecture-of-reality',
      'chapter-02-thought-as-blueprint',
      'chapter-03-the-frequency-principle',
      'chapter-04-aligned-action',
      'chapter-05-the-evidence-journal',
    ],
  },
]

function buildBookHTML(book) {
  const { title, subtitle, author, contentDir, theme, chapters } = book

  // Read and convert all chapters
  const chapterContents = chapters.map((chapterSlug) => {
    const mdPath = join(projectRoot, contentDir, `${chapterSlug}.md`)
    if (!existsSync(mdPath)) {
      console.warn(`  Warning: ${mdPath} not found, skipping`)
      return ''
    }
    const md = readFileSync(mdPath, 'utf-8')
    return marked.parse(md)
  }).filter(Boolean)

  if (chapterContents.length === 0) {
    throw new Error(`No chapters found for ${title}`)
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - ${author}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: 6in 9in;
      margin: 0.75in 0.625in;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: ${theme.bodyFont};
      font-size: 11pt;
      line-height: 1.7;
      color: ${theme.textColor};
      background: ${theme.bgPage};
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* Title page */
    .title-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      text-align: center;
      padding: 2in 0.5in;
      background: ${theme.bgDark};
      color: white;
      page-break-after: always;
    }

    .title-page h1 {
      font-family: ${theme.headingFont};
      font-size: 36pt;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 0.3em;
      color: white;
    }

    .title-page .subtitle {
      font-family: ${theme.bodyFont};
      font-size: 14pt;
      font-weight: 400;
      opacity: 0.8;
      margin-bottom: 2em;
      font-style: italic;
    }

    .title-page .accent-line {
      width: 60px;
      height: 3px;
      background: ${theme.primary};
      margin: 0 auto 2em;
    }

    .title-page .author-name {
      font-family: ${theme.headingFont};
      font-size: 16pt;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${theme.primary};
    }

    /* Copyright page */
    .copyright-page {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      min-height: 100vh;
      padding: 1in 0;
      font-size: 9pt;
      line-height: 1.8;
      opacity: 0.6;
      page-break-after: always;
    }

    /* Table of Contents */
    .toc-page {
      page-break-after: always;
      padding-top: 1.5in;
    }

    .toc-page h2 {
      font-family: ${theme.headingFont};
      font-size: 18pt;
      font-weight: 700;
      margin-bottom: 1.5em;
      color: ${theme.primary};
      text-align: center;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .toc-entry {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 0.5em 0;
      border-bottom: 1px solid rgba(0,0,0,0.08);
      font-size: 11pt;
    }

    .toc-entry .chapter-num {
      font-weight: 600;
      color: ${theme.primary};
      min-width: 2em;
    }

    .toc-entry .chapter-title {
      flex: 1;
      font-family: ${theme.headingFont};
    }

    /* Chapter content */
    .chapter {
      page-break-before: always;
      padding-top: 1.5in;
    }

    .chapter:first-of-type {
      page-break-before: auto;
    }

    .chapter h1 {
      font-family: ${theme.headingFont};
      font-size: 24pt;
      font-weight: 700;
      margin-bottom: 0.5em;
      color: ${theme.textColor};
      letter-spacing: -0.01em;
    }

    .chapter-number {
      font-family: ${theme.headingFont};
      font-size: 11pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: ${theme.primary};
      margin-bottom: 0.5em;
      display: block;
    }

    .chapter h2 {
      font-family: ${theme.headingFont};
      font-size: 16pt;
      font-weight: 600;
      margin: 1.5em 0 0.8em;
      color: ${theme.textColor};
    }

    .chapter h3 {
      font-family: ${theme.headingFont};
      font-size: 13pt;
      font-weight: 600;
      margin: 1.2em 0 0.6em;
      color: ${theme.textColor};
    }

    .chapter p {
      margin-bottom: 0.8em;
      text-align: justify;
      hyphens: auto;
    }

    .chapter blockquote {
      margin: 1.5em 0;
      padding: 0.8em 1.2em;
      border-left: 3px solid ${theme.primary};
      background: rgba(0,0,0,0.03);
      font-style: italic;
      font-family: ${theme.headingFont};
    }

    .chapter blockquote p {
      text-align: left;
    }

    .chapter ul, .chapter ol {
      margin: 0.8em 0;
      padding-left: 1.5em;
    }

    .chapter li {
      margin-bottom: 0.4em;
    }

    .chapter strong {
      font-weight: 600;
    }

    .chapter em {
      font-style: italic;
    }

    .chapter hr {
      border: none;
      border-top: 1px solid rgba(0,0,0,0.1);
      margin: 2em 0;
    }

    .chapter code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9em;
      background: rgba(0,0,0,0.06);
      padding: 0.15em 0.3em;
      border-radius: 3px;
    }

    /* Footer */
    @page {
      @bottom-center {
        content: counter(page);
        font-family: ${theme.bodyFont};
        font-size: 9pt;
        color: rgba(0,0,0,0.4);
      }
    }
  </style>
</head>
<body>

  <!-- Title Page -->
  <div class="title-page">
    <h1>${title}</h1>
    <div class="subtitle">${subtitle}</div>
    <div class="accent-line"></div>
    <div class="author-name">${author}</div>
  </div>

  <!-- Copyright Page -->
  <div class="copyright-page">
    <p>${title}: ${subtitle}</p>
    <p>Copyright &copy; 2026 ${author}</p>
    <p>All rights reserved.</p>
    <br>
    <p>Published by FrankX Publishing</p>
    <p>frankx.ai/books/${book.slug}</p>
    <br>
    <p>No part of this publication may be reproduced, stored in a retrieval system, or transmitted in any form without the prior written permission of the author.</p>
    <br>
    <p>First Edition, 2026</p>
  </div>

  <!-- Table of Contents -->
  <div class="toc-page">
    <h2>Contents</h2>
    ${chapters.map((slug, i) => {
      const title = slug.replace(/chapter-\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      return `<div class="toc-entry">
        <span class="chapter-num">${i + 1}</span>
        <span class="chapter-title">${title}</span>
      </div>`
    }).join('\n    ')}
  </div>

  <!-- Chapters -->
  ${chapterContents.map((html, i) => `
  <div class="chapter">
    <span class="chapter-number">Chapter ${i + 1}</span>
    ${html}
  </div>
  `).join('\n')}

</body>
</html>`
}

async function generateBookPDF(book) {
  console.log(`\nGenerating PDF for: ${book.title}`)
  console.log('-'.repeat(50))

  const html = buildBookHTML(book)
  const outputDir = join(projectRoot, 'public/pdfs/books')
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true })

  const outputPath = join(outputDir, `${book.slug}.pdf`)

  let browser
  try {
    browser = await launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
    })

    const page = await browser.newPage()
    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    })

    // Wait for web fonts
    await page.evaluateHandle('document.fonts.ready')
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const pdfBuffer = await page.pdf({
      path: outputPath,
      width: '6in',
      height: '9in',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })

    console.log(`  PDF generated: ${outputPath} (${(pdfBuffer.length / 1024).toFixed(0)} KB)`)
    return { path: outputPath, buffer: pdfBuffer }
  } finally {
    if (browser) await browser.close()
  }
}

async function uploadToVercelBlob(pdfBuffer, blobKey) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.log('  Skipping Blob upload (no BLOB_READ_WRITE_TOKEN)')
    return null
  }

  console.log(`  Uploading to Vercel Blob: books/${blobKey}...`)
  const blob = await put(`books/${blobKey}`, pdfBuffer, {
    access: 'public',
    contentType: 'application/pdf',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })
  console.log(`  Uploaded: ${blob.url}`)
  return blob
}

async function main() {
  console.log('FrankX Book PDF Generator')
  console.log('='.repeat(50))

  // Parse CLI args
  const bookArg = process.argv.find((a) => a.startsWith('--book='))
  const targetSlug = bookArg ? bookArg.split('=')[1] : null
  const skipUpload = process.argv.includes('--no-upload')

  const booksToGenerate = targetSlug
    ? BOOKS.filter((b) => b.slug === targetSlug)
    : BOOKS

  if (booksToGenerate.length === 0) {
    console.error(`Book not found: ${targetSlug}`)
    console.log(`Available: ${BOOKS.map((b) => b.slug).join(', ')}`)
    process.exit(1)
  }

  console.log(`Generating ${booksToGenerate.length} book(s)...\n`)

  const results = []

  for (const book of booksToGenerate) {
    try {
      const { path, buffer } = await generateBookPDF(book)
      let blobUrl = null

      if (!skipUpload) {
        const blob = await uploadToVercelBlob(buffer, `${book.slug}.pdf`)
        blobUrl = blob?.url
      }

      results.push({ title: book.title, path, blobUrl, success: true })
    } catch (error) {
      console.error(`  Failed: ${error.message}`)
      results.push({ title: book.title, success: false, error: error.message })
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('SUMMARY')
  console.log('='.repeat(50))

  const ok = results.filter((r) => r.success)
  const fail = results.filter((r) => !r.success)

  console.log(`\nGenerated: ${ok.length}/${results.length}`)
  ok.forEach((r) => {
    console.log(`  ${r.title}`)
    console.log(`    Local: ${r.path}`)
    if (r.blobUrl) console.log(`    Blob:  ${r.blobUrl}`)
  })

  if (fail.length > 0) {
    console.log(`\nFailed: ${fail.length}/${results.length}`)
    fail.forEach((r) => console.log(`  ${r.title}: ${r.error}`))
  }

  console.log('\nDone.')
}

main().catch((error) => {
  console.error('Fatal:', error)
  process.exit(1)
})
