#!/usr/bin/env node
/**
 * Backfill heroes for any blog post whose `image:` points at a missing file.
 * Picks an on-brand theme from slug keywords, renders via the hero-art engine,
 * and optimizes to palette PNG. Frontmatter already references the path; we
 * just create the file there.
 */
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import matter from 'gray-matter'
import { buildSvg } from './generate-hero-art.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const BLOG = join(ROOT, 'content', 'blog')
const PUB = join(ROOT, 'public')

function themeFor(slug) {
  const s = slug.toLowerCase()
  if (/(suno|udio|music|elevenlabs|audio|voice)/.test(s)) return 'soul'
  if (/(video|heygen|synthesia|argil|capcut|descript|clip|youtube|shorts|tiktok|higgsfield|photography|headshot|logo|canva|gamma|presentation|image)/.test(s)) return 'arcanea'
  if (/(coding|claude-code|cursor|windsurf|llm|ollama|lm-studio|\bjan\b|agent|n8n|\bmcp\b|model|frontier|local)/.test(s)) return 'tech'
  return 'intelligence'
}

const targets = []
for (const f of readdirSync(BLOG).filter((x) => x.endsWith('.mdx'))) {
  const { data } = matter(readFileSync(join(BLOG, f), 'utf8'))
  if (data.image && !existsSync(join(PUB, data.image))) {
    targets.push({ slug: f.replace(/\.mdx$/, ''), image: data.image })
  }
}
console.log(`Backfilling ${targets.length} missing heroes...`)

let n = 0
for (const t of targets) {
  const theme = themeFor(t.slug)
  const out = join(PUB, t.image)
  const svg = buildSvg(t.slug, theme)
  const buf = await sharp(Buffer.from(svg), { density: 144 })
    .resize({ width: 1456, withoutEnlargement: true })
    .png({ quality: 82, effort: 9, palette: true, colours: 256, dither: 1 })
    .toBuffer()
  writeFileSync(out, buf)
  n++
  console.log(`  ${t.slug} [${theme}] -> ${t.image} (${(buf.length / 1024) | 0}KB)`)
}
console.log(`Done. ${n} heroes created.`)
