#!/usr/bin/env node
/**
 * Full-catalog cover lab generator (10 craft×designer variants per book)
 *
 * Usage:
 *   node scripts/generate-catalog-cover-lab.mjs --slug the-wordless-laws
 *   node scripts/generate-catalog-cover-lab.mjs --slug fable --only 1,7,10
 *   node scripts/generate-catalog-cover-lab.mjs --frontlist
 *   node scripts/generate-catalog-cover-lab.mjs --all
 *   node scripts/generate-catalog-cover-lab.mjs --slug fable --dry-run
 *   node scripts/generate-catalog-cover-lab.mjs --slug fable --write-lab-md-only
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateImage } from './lib/nb-image.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(__dirname, '..')
const LAB_ROOT = resolve(REPO, 'public/images/books/cover-labs')
const catalog = JSON.parse(readFileSync(resolve(LAB_ROOT, 'catalog.json'), 'utf8'))
const channels = JSON.parse(readFileSync(resolve(LAB_ROOT, '_channels.json'), 'utf8')).channels

function parseArgs(argv) {
  const opts = { only: null, slug: null, frontlist: false, all: false, dryRun: false, writeLabMdOnly: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--slug') opts.slug = argv[++i]
    else if (a === '--only') opts.only = argv[++i].split(',').map((n) => parseInt(n, 10))
    else if (a === '--frontlist') opts.frontlist = true
    else if (a === '--all') opts.all = true
    else if (a === '--dry-run') opts.dryRun = true
    else if (a === '--write-lab-md-only') opts.writeLabMdOnly = true
  }
  return opts
}

function buildPrompt(book, ch) {
  const author = book.author || catalog.authorDefault
  const accents = (book.accents || ['#C9A84C']).join(', ')
  const firewall =
    book.firewall === 'arcanea'
      ? 'ARCANEA MYTH ONLY — do not use FrankX filament OS language or corporate AI chrome.'
      : 'FrankX nonfiction/poetry craft — no Arcanea creatures, no robots, no neural-net spam, no crypto glyphs.'

  return `## CONCEPT
Premium flat ebook/print front cover for a carefully crafted book object. Craftsman material truth + ${ch.school}. Pattern and object are part of the book's story.

## ART DIRECTION
School: ${ch.school}. Energy: ${ch.energy}.
Field pattern (L1): ${ch.pattern}, combined with book DNA pattern: ${book.patternDNA}.
Object mark (L2): ${book.object}.
${firewall}
FLAT graphic design 2:3 portrait — NOT a photograph of a physical hardcover on a table, NOT a 3D product mockup as the master file.

## SCENE
Full-bleed flat cover. Field color near ${book.field}. Accents: ${accents}.
Craftsman-quality texture and structure. One clear object or typographic hero. Quiet premium pattern in the field at low visibility (3-12%).

## COMPOSITION
2:3 (1600x2560 intent). Safe margins 8% from all edges.
Upper zone: exact title typography.
Center: object/pattern focus.
Lower: exact subtitle then author.
Title must dominate thumbnail legibility.

## LIGHTING
Museum/print craft lighting — even field, soft specular on metal/foil only. No neon bloom soup.

## PALETTE
Field ${book.field}; accents ${accents}; deep blacks and controlled golds. Max 3-4 colors.

## TYPOGRAPHY
EXACT STRINGS — do not invent, translate, or replace:
TITLE: ${book.title}
SUBTITLE: ${book.subtitle}
AUTHOR: ${author}
Use elegant Didone or refined prestige type for literary/manifesto; strong grotesque allowed for rebel channel only (channel id ${ch.id}).
Gold foil or high-contrast type. Never put designer names in the author line. Never put art-direction meta sentences as the subtitle.

## MOOD
${ch.energy}. Structured, patterned, inevitable — a real publishing house object.

## STYLE REFERENCES
${ch.school}; Coralie Bickford-Smith material craft; Knopf prestige; Taschen restraint; craftsman bookbinding foil work.

TECHNICAL: flat 2:3 book cover graphic, print-ready, no people faces photoreal, no watermarks, no UI chrome, no 3D book-on-table master.`
}

function writeLabMarkdown(book, prompts) {
  const dir = resolve(LAB_ROOT, book.slug)
  mkdirSync(dir, { recursive: true })
  const lines = [
    `# Cover Lab — ${book.title}`,
    '',
    '| Field | Value |',
    '|------|-------|',
    `| slug | ${book.slug} |`,
    `| subtitle | ${book.subtitle} |`,
    `| author | ${book.author} |`,
    `| imprint | ${book.imprint} |`,
    `| object DNA | ${book.object} |`,
    `| pattern DNA | ${book.patternDNA} |`,
    `| field | ${book.field} |`,
    '',
    '## Type lock',
    '',
    '```',
    `TITLE: ${book.title}`,
    `SUBTITLE: ${book.subtitle}`,
    `AUTHOR: ${book.author}`,
    '```',
    '',
  ]
  for (const p of prompts) {
    lines.push(`## Variant ${String(p.n).padStart(2, '0')} — ${p.id} (${p.school})`, '', '```', p.prompt, '```', '')
  }
  const path = resolve(dir, 'LAB.md')
  writeFileSync(path, lines.join('\n'), 'utf8')
  return path
}

function selectBooks(opts) {
  if (opts.slug) {
    const b = catalog.books.find((x) => x.slug === opts.slug)
    if (!b) throw new Error(`Unknown slug: ${opts.slug}`)
    return [b]
  }
  if (opts.frontlist) return catalog.books.filter((b) => b.frontlist)
  if (opts.all) return catalog.books
  throw new Error('Pass --slug <slug> | --frontlist | --all')
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  const books = selectBooks(opts)
  const only = opts.only || channels.map((c) => c.n)
  const allResults = []

  for (const book of books) {
    const dir = resolve(LAB_ROOT, book.slug)
    mkdirSync(dir, { recursive: true })
    const prompts = channels
      .filter((c) => only.includes(c.n))
      .map((c) => ({ ...c, prompt: buildPrompt(book, c) }))

    const labPath = writeLabMarkdown(
      book,
      channels.map((c) => ({ ...c, prompt: buildPrompt(book, c) })),
    )
    console.error(`✓ LAB.md ${labPath}`)

    if (opts.writeLabMdOnly) {
      allResults.push({ slug: book.slug, labPath, status: 'lab-md-only' })
      continue
    }

    if (opts.dryRun) {
      console.error(`DRY RUN ${book.slug} variants: ${prompts.map((p) => p.id).join(', ')}`)
      allResults.push({ slug: book.slug, dryRun: true, variants: prompts.map((p) => p.id) })
      continue
    }

    // Skip re-gen if golden-age already has dedicated lab and user wants link only
    if (book.existingLab && only.length === 10) {
      console.error(`NOTE: ${book.slug} also has existing lab folder ${book.existingLab}`)
    }

    const bookResults = []
    for (const p of prompts) {
      const outputPath = resolve(dir, `v${String(p.n).padStart(2, '0')}-${p.id}.jpg`)
      console.error(`\n=== ${book.slug} · ${p.n}/10 ${p.id} ===`)
      try {
        const result = await generateImage({
          prompt: p.prompt,
          outputPath,
          model: 'nb2',
          aspectRatio: '2:3',
          imageSize: '2K',
          enforceDesignThinking: true,
          fallback: true,
        })
        bookResults.push({ n: p.n, id: p.id, status: 'ok', path: result.path || outputPath, bytes: result.bytes })
        console.error(`✓ ${outputPath}`)
      } catch (err) {
        bookResults.push({ n: p.n, id: p.id, status: 'error', error: String(err?.message || err) })
        console.error(`✗ ${p.id}:`, err?.message || err)
      }
    }
    const resultsPath = resolve(dir, 'results.json')
    writeFileSync(resultsPath, JSON.stringify({ at: new Date().toISOString(), book: book.slug, results: bookResults }, null, 2))
    allResults.push({ slug: book.slug, resultsPath, results: bookResults })
  }

  const summaryPath = resolve(LAB_ROOT, `_run-${Date.now()}.json`)
  writeFileSync(summaryPath, JSON.stringify({ at: new Date().toISOString(), allResults }, null, 2))
  console.log(JSON.stringify({ summaryPath, books: books.map((b) => b.slug), allResults }, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
