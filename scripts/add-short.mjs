#!/usr/bin/env node
/**
 * add-short.mjs — One-command Short ingestion
 *
 * Usage:
 *   node scripts/add-short.mjs "https://youtube.com/shorts/ABC123" --category "Mindset & Growth" --commentary "Your take here"
 *   node scripts/add-short.mjs ABC123                                # just the ID works too
 *   node scripts/add-short.mjs "https://youtube.com/shorts/ABC123"   # auto-detects category from tags
 *
 * What it does:
 *  1. Extracts YouTube ID from URL
 *  2. Verifies via oembed (title, author, thumbnail)
 *  3. Checks for duplicates in vault
 *  4. Fetches auto-captions transcript (if available)
 *  5. Saves transcript to data/video-transcripts/{id}.txt + .srt
 *  6. Appends to data/video-vault-100.json with format: "short"
 *  7. Prints summary + next steps
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { execSync } from 'node:child_process'

const VAULT_PATH = path.resolve('data/video-vault-100.json')
const TRANSCRIPT_DIR = path.resolve('data/video-transcripts')

// --- Arg parsing ---
const args = process.argv.slice(2)
if (args.length === 0 || args[0] === '--help') {
  console.log(`
Usage: node scripts/add-short.mjs <url-or-id> [options]

Options:
  --category <name>     Category (default: auto from oembed)
  --commentary <text>   Frank's take (prompted if omitted)
  --tags <t1,t2,t3>     Comma-separated tags
  --no-transcript       Skip transcript fetch
  --dry-run             Show what would be added without writing

Categories: AI Foundations, AI Engineering, AI Agents, Strategy & Business,
            Creator Economy, Creative AI & Music, Mindset & Growth, AI Culture
`)
  process.exit(0)
}

const input = args[0]
const flags = {}
for (let i = 1; i < args.length; i += 2) {
  if (args[i] === '--no-transcript') { flags.noTranscript = true; i--; continue }
  if (args[i] === '--dry-run') { flags.dryRun = true; i--; continue }
  flags[args[i].replace('--', '')] = args[i + 1]
}

// --- Extract YouTube ID ---
const YT_ID_RE = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
function extractId(input) {
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input
  const m = input.match(YT_ID_RE)
  return m ? m[1] : null
}

// --- Fetch helpers ---
async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'en' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

// --- Oembed verification ---
async function verifyShort(id) {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/shorts/${id}&format=json`
  try {
    const data = await fetchJson(url)
    return {
      title: data.title,
      author: data.author_name,
      thumbnail: data.thumbnail_url,
    }
  } catch (e) {
    // Try regular video URL
    try {
      const data = await fetchJson(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
      )
      return { title: data.title, author: data.author_name, thumbnail: data.thumbnail_url }
    } catch {
      return null
    }
  }
}

// --- Transcript via Python (youtube-transcript-api) ---
async function fetchTranscript(id) {
  try {
    const result = execSync(
      `python3 -c "
from youtube_transcript_api import YouTubeTranscriptApi
import json
api = YouTubeTranscriptApi()
t = api.fetch('${id}')
out = [{'start': s.start, 'duration': s.duration, 'text': s.text} for s in t]
print(json.dumps(out))
"`,
      { encoding: 'utf8', timeout: 30000 }
    )
    return JSON.parse(result.trim())
  } catch {
    return null
  }
}

function segmentsToSrt(segments) {
  return segments
    .map((s, i) => {
      const fmt = (sec) => {
        const h = Math.floor(sec / 3600)
        const m = Math.floor((sec % 3600) / 60)
        const ss = Math.floor(sec % 60)
        const ms = Math.round((sec % 1) * 1000)
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')},${String(ms).padStart(3, '0')}`
      }
      return `${i + 1}\n${fmt(s.start)} --> ${fmt(s.start + s.duration)}\n${s.text}\n`
    })
    .join('\n')
}

function segmentsToText(segments) {
  return segments.map((s) => s.text).join(' ')
}

// --- Main ---
async function main() {
  const id = extractId(input)
  if (!id) {
    console.error('Could not extract YouTube ID from:', input)
    process.exit(1)
  }

  console.log(`\n🔍 Verifying Short: ${id}`)
  const meta = await verifyShort(id)
  if (!meta) {
    console.error('❌ Short not found or not embeddable:', id)
    process.exit(1)
  }
  console.log(`✅ "${meta.title}" by ${meta.author}`)

  // Check duplicate
  const vault = JSON.parse(await fs.readFile(VAULT_PATH, 'utf8'))
  if (vault.some((v) => v.id === id)) {
    console.log('⚠️  Already in vault — skipping.')
    process.exit(0)
  }

  // Fetch transcript
  let transcript = null
  if (!flags.noTranscript) {
    console.log('📝 Fetching transcript...')
    transcript = await fetchTranscript(id)
    if (transcript) {
      await fs.mkdir(TRANSCRIPT_DIR, { recursive: true })
      const txt = segmentsToText(transcript)
      const srt = segmentsToSrt(transcript)
      await fs.writeFile(path.join(TRANSCRIPT_DIR, `${id}.txt`), txt)
      await fs.writeFile(path.join(TRANSCRIPT_DIR, `${id}.srt`), srt)
      const words = txt.split(/\s+/).length
      const dur = transcript[transcript.length - 1].start + transcript[transcript.length - 1].duration
      console.log(`✅ Transcript: ${transcript.length} segments, ${words} words, ${dur.toFixed(1)}s`)
    } else {
      console.log('⚠️  No auto-captions available')
    }
  }

  // Build vault entry
  const category = flags.category || 'Uncategorized'
  const commentary = flags.commentary || ''
  const tags = flags.tags ? flags.tags.split(',').map((t) => t.trim()) : []
  tags.push('short')

  const entry = {
    id,
    title: meta.title,
    channel: meta.author,
    author: meta.author,
    url: `https://www.youtube.com/shorts/${id}`,
    duration: '0:45',
    topic: category,
    category,
    embeddable: true,
    format: 'short',
    uploadDate: new Date().toISOString().split('T')[0],
    tags: [...new Set(tags)],
    commentary,
  }

  if (flags.dryRun) {
    console.log('\n🔎 DRY RUN — would add:')
    console.log(JSON.stringify(entry, null, 2))
    return
  }

  vault.push(entry)
  await fs.writeFile(VAULT_PATH, JSON.stringify(vault, null, 2) + '\n')

  console.log(`\n✅ Added to vault: "${meta.title}"`)
  console.log(`   Category: ${category}`)
  console.log(`   Transcript: ${transcript ? 'saved' : 'none'}`)
  console.log(`   Commentary: ${commentary || '⚠️  EMPTY — add before publishing'}`)
  console.log(`\n📋 Next steps:`)
  console.log(`   1. ${commentary ? '✅' : '❌'} Add commentary if missing`)
  console.log(`   2. Commit: git add data/ && git commit -m "feat(watch): add Short ${id}"`)
  console.log(`   3. Sync to prod: cp data/video-vault-100.json ~/frankx-prod-sync/data/`)
  if (transcript) {
    console.log(`   4. Sync transcript: cp data/video-transcripts/${id}.* ~/frankx-prod-sync/data/video-transcripts/`)
  }
  console.log(`   5. Push prod: cd ~/frankx-prod-sync && git add . && git commit -m "feat: add Short" && git push`)
}

main().catch((e) => {
  console.error('Failed:', e.message)
  process.exit(1)
})
