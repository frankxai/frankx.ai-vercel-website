#!/usr/bin/env node
/**
 * Suno Track Enricher — Fetches metadata for unnamed/incomplete tracks
 *
 * Visits individual song pages to extract: title, genre tags, cover art, plays, likes, duration
 * Updates existing entries in music.json inventory
 *
 * USAGE:
 *   node scripts/enrich-suno-tracks.mjs              # Enrich unnamed tracks
 *   node scripts/enrich-suno-tracks.mjs --all         # Re-enrich ALL tracks with sunoId
 *   node scripts/enrich-suno-tracks.mjs --id UUID     # Enrich specific track
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const MUSIC_FILE = path.join(ROOT, 'data', 'inventories', 'frankx', 'music.json')

// ── Genre Cleaning (shared with scraper) ───────────────────────────────────

const KNOWN_GENRES = new Set([
  'ambient', 'arena rock', 'bass', 'bassline', 'blues', 'bollywood', 'celtic',
  'chillwave', 'choral', 'cinematic', 'classical', 'country', 'dance', 'dark ambient',
  'deep house', 'disco', 'dnb', 'downtempo', 'drill', 'drum and bass', 'dub',
  'dubstep', 'edm', 'electro', 'electronic', 'emo', 'epic', 'experimental',
  'folk', 'funk', 'future bass', 'garage', 'gospel', 'grunge', 'hardcore',
  'hardstyle', 'healing', 'heavy metal', 'hip hop', 'hip-hop', 'house',
  'hyperpop', 'indie', 'industrial', 'j-pop', 'jazz', 'jungle', 'k-pop',
  'latin', 'lo-fi', 'lofi', 'meditation', 'metal', 'metalcore', 'minimal',
  'neoclassical', 'new age', 'orchestral', 'phonk', 'pop', 'pop rock', 'pop punk',
  'post-punk', 'progressive', 'psychedelic', 'punk', 'r&b', 'rnb', 'rap', 'reggae',
  'reggaeton', 'rock', 'shoegaze', 'singer-songwriter', 'ska', 'soul',
  'soundtrack', 'symphonic', 'synthpop', 'synthwave', 'tech house', 'techno', 'trance',
  'trap', 'trip-hop', 'tropical', 'uk garage', 'vaporwave', 'vocal',
  'world', 'worship',
])

function cleanGenreTags(rawGenres) {
  if (!rawGenres || rawGenres.length === 0) return []
  const cleaned = new Set()
  for (const raw of rawGenres) {
    const lower = raw.toLowerCase().trim()
    if (!lower) continue
    if (KNOWN_GENRES.has(lower)) { cleaned.add(lower); continue }
    // Short + looks like a real genre (not a description phrase)
    if (lower.length <= 20 && !lower.includes(' ') && !lower.includes('-')) {
      cleaned.add(lower); continue
    }
    // Extract known genres from longer strings
    for (const genre of KNOWN_GENRES) {
      if (lower.includes(genre)) cleaned.add(genre)
    }
  }
  return [...cleaned].map(g =>
    g.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
  )
}

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50)
}

// ── Puppeteer Song Page Scraper ────────────────────────────────────────────

async function fetchTrackMetadata(browser, sunoId) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  )

  let apiData = null

  // Intercept API responses for this song
  page.on('response', async (response) => {
    const url = response.url()
    if (response.status() !== 200) return
    try {
      const json = await response.json()
      // Direct clip object
      if (json.id === sunoId) {
        apiData = json
        return
      }
      // Nested in arrays
      for (const key of ['clips', 'songs', 'data', 'results']) {
        if (Array.isArray(json[key])) {
          const found = json[key].find(c => c.id === sunoId)
          if (found) { apiData = found; return }
        }
      }
    } catch {}
  })

  try {
    await page.goto(`https://suno.com/song/${sunoId}`, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    })

    // Wait a moment for API data to arrive
    await new Promise(r => setTimeout(r, 2000))

    // Also extract from DOM as fallback
    const domData = await page.evaluate(() => {
      // Title from og:title or h1
      const ogTitle = document.querySelector('meta[property="og:title"]')?.content
      const h1 = document.querySelector('h1')?.textContent?.trim()

      // Description might have genre info
      const ogDesc = document.querySelector('meta[property="og:description"]')?.content

      // Image from og:image
      const ogImage = document.querySelector('meta[property="og:image"]')?.content

      // Try to find tags/genre from the page
      const tagEls = document.querySelectorAll('[class*="tag"], [class*="genre"], [class*="chip"]')
      const tags = Array.from(tagEls).map(el => el.textContent?.trim()).filter(Boolean)

      // Look for play count, likes etc.
      const body = document.body.innerText
      const playsMatch = body.match(/([\d,.]+)\s*plays?/i)
      const likesMatch = body.match(/([\d,.]+)\s*likes?/i)

      return {
        title: ogTitle || h1 || null,
        description: ogDesc || null,
        image: ogImage || null,
        tags,
        plays: playsMatch ? parseInt(playsMatch[1].replace(/[,\.]/g, '')) : null,
        likes: likesMatch ? parseInt(likesMatch[1].replace(/[,\.]/g, '')) : null,
      }
    })

    await page.close()

    // Merge API + DOM data (API preferred)
    const result = { sunoId }

    if (apiData) {
      result.title = apiData.title || domData.title || ''
      result.coverUrl = apiData.image_url || apiData.image_large_url || domData.image || null
      result.plays = apiData.play_count || domData.plays || 0
      result.likes = apiData.upvote_count || domData.likes || 0

      const rawGenre = []
      if (apiData.tags) rawGenre.push(...(typeof apiData.tags === 'string' ? apiData.tags.split(',').map(t => t.trim()) : apiData.tags))
      if (apiData.metadata?.tags) rawGenre.push(...apiData.metadata.tags.split(',').map(t => t.trim()))
      result.genre = cleanGenreTags(rawGenre)

      const dur = apiData.audio_duration || apiData.duration
      if (dur) {
        const mins = Math.floor(dur / 60)
        const secs = Math.floor(dur % 60)
        result.duration = `${mins}:${secs.toString().padStart(2, '0')}`
      }
    } else {
      // DOM-only fallback
      result.title = domData.title || ''
      result.coverUrl = domData.image || null
      result.plays = domData.plays || 0
      result.likes = domData.likes || 0
      result.genre = cleanGenreTags(domData.tags)
    }

    return result
  } catch (err) {
    await page.close()
    return { sunoId, title: '', error: err.message }
  }
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  const enrichAll = args.includes('--all')
  const specificId = args.includes('--id') ? args[args.indexOf('--id') + 1] : null

  const inventory = JSON.parse(fs.readFileSync(MUSIC_FILE, 'utf-8'))

  // Select tracks to enrich
  let targets
  if (specificId) {
    targets = inventory.tracks.filter(t => t.sunoId === specificId)
    if (targets.length === 0) {
      console.log(`No track found with sunoId: ${specificId}`)
      process.exit(1)
    }
  } else if (enrichAll) {
    targets = inventory.tracks.filter(t => t.sunoId)
  } else {
    // Default: unnamed tracks + tracks with empty genre
    targets = inventory.tracks.filter(t =>
      t.sunoId && (t.title.startsWith('Track ') || !t.genre || t.genre.length === 0)
    )
  }

  console.log(`\n=== Suno Track Enricher ===`)
  console.log(`Targets: ${targets.length} tracks to enrich`)
  console.log()

  if (targets.length === 0) {
    console.log('Nothing to enrich!')
    return
  }

  let puppeteer
  try {
    puppeteer = await import('puppeteer')
  } catch {
    console.error('puppeteer not installed. Run: npm install -D puppeteer')
    process.exit(1)
  }

  const browser = await puppeteer.default.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  let enriched = 0
  let failed = 0

  for (let i = 0; i < targets.length; i++) {
    const track = targets[i]
    console.log(`  [${i + 1}/${targets.length}] ${track.sunoId.slice(0, 8)}... (${track.title})`)

    const metadata = await fetchTrackMetadata(browser, track.sunoId)

    if (metadata.error) {
      console.log(`    FAILED: ${metadata.error}`)
      failed++
      continue
    }

    // Update the track in inventory
    const inventoryTrack = inventory.tracks.find(t => t.sunoId === track.sunoId)
    if (!inventoryTrack) continue

    let changed = false

    // Fix unnamed
    if (metadata.title && (inventoryTrack.title.startsWith('Track ') || !inventoryTrack.title)) {
      inventoryTrack.title = metadata.title
      inventoryTrack.id = generateSlug(metadata.title)
      changed = true
    }

    // Fill cover
    if (metadata.coverUrl && !inventoryTrack.coverUrl) {
      inventoryTrack.coverUrl = metadata.coverUrl
      changed = true
    }

    // Update genre
    if (metadata.genre?.length > 0 && (!inventoryTrack.genre?.length || inventoryTrack.genre.length === 0)) {
      inventoryTrack.genre = metadata.genre
      inventoryTrack.tags = metadata.genre
      changed = true
    }

    // Update plays/likes if higher
    if (metadata.plays > (inventoryTrack.plays || 0)) {
      inventoryTrack.plays = metadata.plays
      changed = true
    }
    if (metadata.likes > (inventoryTrack.likes || 0)) {
      inventoryTrack.likes = metadata.likes
      changed = true
    }

    // Fill duration
    if (metadata.duration && !inventoryTrack.duration) {
      inventoryTrack.duration = metadata.duration
      changed = true
    }

    if (changed) {
      enriched++
      console.log(`    → "${metadata.title}" | genre: ${JSON.stringify(metadata.genre)} | cover: ${metadata.coverUrl ? 'yes' : 'no'}`)
    } else {
      console.log(`    → No changes needed`)
    }

    // Rate limit between requests
    await new Promise(r => setTimeout(r, 1000))
  }

  await browser.close()

  // Save
  inventory._lastUpdated = new Date().toISOString().split('T')[0]
  fs.writeFileSync(MUSIC_FILE, JSON.stringify(inventory, null, 2))

  console.log(`\n  Enriched: ${enriched}`)
  console.log(`  Failed: ${failed}`)
  console.log(`  Total tracks: ${inventory.tracks.length}`)
  console.log(`  Saved to: ${MUSIC_FILE}\n`)
}

main().catch(console.error)
