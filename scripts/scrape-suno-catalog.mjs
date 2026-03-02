#!/usr/bin/env node
/**
 * Suno Catalog Scraper v2.0 — Multi-Source Edition
 *
 * Scrapes ALL tracks from Suno profile using multiple discovery sources:
 *   1. Profile overview page (API interception + DOM scraping)
 *   2. Songs sub-tab (/songs)
 *   3. Each playlist page (9 known playlists)
 *
 * USAGE:
 *   node scripts/scrape-suno-catalog.mjs --index-only
 *   node scripts/scrape-suno-catalog.mjs --download
 *   node scripts/scrape-suno-catalog.mjs --download --upload
 *
 * FLAGS:
 *   --index-only   Scrape metadata only, no MP3 downloads
 *   --download     Download MP3s to ./tmp/suno-mp3/
 *   --upload       Upload downloaded MP3s to Vercel Blob (requires BLOB_READ_WRITE_TOKEN)
 *   --notify       Post results to n8n webhook (Slack notification)
 *   --clean        Also clean genres on existing tracks in inventory
 *   --limit N      Limit to N tracks (for testing)
 *   --profile URL  Override profile URL (default: https://suno.com/@frankx)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const MUSIC_FILE = path.join(ROOT, 'data', 'inventories', 'frankx', 'music.json')
const DOWNLOAD_DIR = path.join(ROOT, 'tmp', 'suno-mp3')

const DEFAULT_PROFILE = 'https://suno.com/@frankx'
const SUNO_CDN = 'https://cdn1.suno.ai'

// Known playlists from the profile (hardcoded for reliability)
const KNOWN_PLAYLISTS = [
  { name: 'Golden Frequencies', url: 'https://suno.com/playlist/77e7f75f-24b4-4c8f-b02c-10eff76a7052' },
  { name: 'Meditation', url: 'https://suno.com/playlist/0bc7abe1-b2c7-41c9-98a2-c0fbf59dca1f' },
  { name: 'German Poets', url: 'https://suno.com/playlist/2d655032-9006-45ce-9267-9d59def06ce7' },
  { name: 'Way of Water', url: 'https://suno.com/playlist/2044d23d-3253-4a46-940b-7c10d9dc81ed' },
  { name: 'vibe', url: 'https://suno.com/playlist/1532430a-1550-45ac-b298-dbde8f0e9e17' },
  { name: 'Peace For Your Soul', url: 'https://suno.com/playlist/26136df0-7e47-460d-a0fe-be24ab69475d' },
  { name: 'Instrumental Magic', url: 'https://suno.com/playlist/3b265675-b95e-48ec-a2ed-140f6962c54d' },
  { name: 'Arcanean Choir', url: 'https://suno.com/playlist/898c6c67-1b25-495f-82ce-53d9139d9a25' },
  { name: 'Orchestral Beauty', url: 'https://suno.com/playlist/0625352a-74c5-478a-933e-1204549efd36' },
]

// ── CLI Arg Parsing ─────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2)
  const flags = {
    indexOnly: args.includes('--index-only'),
    download: args.includes('--download'),
    upload: args.includes('--upload'),
    notify: args.includes('--notify'),
    clean: args.includes('--clean'),
    limit: 0,
    profile: DEFAULT_PROFILE,
  }

  const limitIdx = args.indexOf('--limit')
  if (limitIdx !== -1 && args[limitIdx + 1]) {
    flags.limit = parseInt(args[limitIdx + 1], 10)
  }

  const profileIdx = args.indexOf('--profile')
  if (profileIdx !== -1 && args[profileIdx + 1]) {
    flags.profile = args[profileIdx + 1]
  }

  if (!flags.indexOnly && !flags.download && !flags.clean) {
    console.log(`
Suno Catalog Scraper v2.0

USAGE:
  node scripts/scrape-suno-catalog.mjs --index-only
  node scripts/scrape-suno-catalog.mjs --download
  node scripts/scrape-suno-catalog.mjs --download --upload
  node scripts/scrape-suno-catalog.mjs --clean

FLAGS:
  --index-only   Scrape metadata only (profile + playlists + songs tab)
  --download     Download MP3s to ./tmp/suno-mp3/
  --upload       Upload to Vercel Blob (requires BLOB_READ_WRITE_TOKEN)
  --notify       Post results to n8n webhook (Slack notification)
  --clean        Clean genre data on ALL existing tracks in inventory
  --limit N      Limit to N tracks
  --profile URL  Custom profile URL
`)
    process.exit(0)
  }

  return flags
}

// ── Slug Generator ──────────────────────────────────────────────────────────

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50)
}

// ── Genre Cleaning ──────────────────────────────────────────────────────────

const KNOWN_GENRES = new Set([
  'ambient', 'arena rock', 'bass', 'bassline', 'blues', 'bollywood', 'celtic',
  'chillwave', 'cinematic', 'classical', 'country', 'dance', 'dark ambient',
  'deep house', 'disco', 'dnb', 'downtempo', 'drill', 'drum and bass', 'dub',
  'dubstep', 'edm', 'electro', 'electronic', 'emo', 'epic', 'experimental',
  'folk', 'funk', 'future bass', 'garage', 'gospel', 'grunge', 'hardcore',
  'hardstyle', 'healing', 'heavy metal', 'hip hop', 'hip-hop', 'house',
  'hyperpop', 'indie', 'industrial', 'j-pop', 'jazz', 'jungle', 'k-pop',
  'latin', 'lo-fi', 'lofi', 'meditation', 'metal', 'metalcore', 'minimal',
  'neoclassical', 'new age', 'orchestral', 'phonk', 'pop', 'post-punk',
  'progressive', 'psychedelic', 'punk', 'r&b', 'rnb', 'rap', 'reggae',
  'reggaeton', 'rock', 'shoegaze', 'singer-songwriter', 'ska', 'soul',
  'soundtrack', 'synthpop', 'synthwave', 'tech house', 'techno', 'trance',
  'trap', 'trip-hop', 'tropical', 'uk garage', 'vaporwave', 'vocal',
  'world', 'worship',
])

function cleanGenreTags(rawGenres) {
  if (!rawGenres || rawGenres.length === 0) return []

  const cleaned = new Set()

  for (const raw of rawGenres) {
    const lower = raw.toLowerCase().trim()
    if (!lower) continue

    // Known genre — add directly
    if (KNOWN_GENRES.has(lower)) {
      cleaned.add(lower)
      continue
    }

    // Short enough to be a real genre tag (not a raw Suno prompt)
    if (lower.length <= 25 && !lower.includes('bpm') && !lower.includes('at ') && !lower.includes('high-')) {
      cleaned.add(lower)
      continue
    }

    // Long string = raw Suno prompt. Extract known genres from it.
    for (const genre of KNOWN_GENRES) {
      if (lower.includes(genre)) {
        cleaned.add(genre)
      }
    }
  }

  // Capitalize for display
  return [...cleaned].map(g =>
    g.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
  )
}

// ── Browser Helpers ─────────────────────────────────────────────────────────

async function launchBrowser() {
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
  return browser
}

function setupApiInterceptor(page, apiTracks) {
  page.on('response', async (response) => {
    const url = response.url()
    if (!url.includes('studio-api.prod.suno.com') && !url.includes('suno.com/api')) return
    if (response.status() !== 200) return

    try {
      const json = await response.json()

      // Single clip
      if (json.id && json.title) extractTrackFromApi(json, apiTracks)

      // Array of clips
      if (Array.isArray(json)) {
        for (const item of json) {
          if (item.id && item.title) extractTrackFromApi(item, apiTracks)
        }
      }

      // Paginated with various keys
      for (const key of ['clips', 'songs', 'playlist_clips', 'data', 'results', 'items', 'tracks']) {
        if (Array.isArray(json[key])) {
          for (const item of json[key]) {
            if (item.id && item.title) extractTrackFromApi(item, apiTracks)
            if (item.clip && item.clip.id) extractTrackFromApi(item.clip, apiTracks)
          }
        }
      }
    } catch {
      // Not JSON or parsing failed
    }
  })
}

function extractDomSongIds(page) {
  return page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/song/"]'))
    return [...new Set(links.map(l => {
      const m = l.href.match(/\/song\/([a-f0-9-]{36})/)
      return m ? m[1] : null
    }).filter(Boolean))]
  })
}

async function scrollUntilDone(page, apiTracks, limit = 0, maxStale = 8) {
  let prev = apiTracks.size
  let stale = 0

  for (let i = 0; i < 200; i++) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await new Promise(r => setTimeout(r, 1500))

    const now = apiTracks.size
    if (now === prev) {
      stale++
      if (stale >= maxStale) {
        console.log(`    No new tracks after ${maxStale} scrolls — done`)
        break
      }
    } else {
      stale = 0
      prev = now
    }

    if (i > 0 && i % 10 === 0) console.log(`    Scroll ${i}: ${now} tracks`)
    if (limit > 0 && now >= limit) break
  }
}

// ── Multi-Source Scraper ────────────────────────────────────────────────────

async function scrapeSunoProfile(profileUrl, limit = 0) {
  const browser = await launchBrowser()
  const apiTracks = new Map()

  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  )
  setupApiInterceptor(page, apiTracks)

  // ── Source 1: Profile overview ──
  console.log(`\n  Source 1: Profile overview (${profileUrl})`)
  await page.goto(profileUrl, { waitUntil: 'networkidle2', timeout: 60000 })
  await page.waitForSelector('a[href*="/song/"]', { timeout: 15000 }).catch(() => {})
  const overviewDomIds = await extractDomSongIds(page)
  console.log(`    API: ${apiTracks.size} tracks | DOM: ${overviewDomIds.length} IDs`)

  // Click all "See More" buttons
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('a, button'))
    for (const btn of buttons) {
      if (btn.textContent?.trim().toLowerCase().includes('see more')) btn.click()
    }
  })
  await new Promise(r => setTimeout(r, 3000))

  // ── Source 2: Songs tab ──
  const songsUrl = profileUrl.replace(/\/?$/, '') + '/songs'
  console.log(`\n  Source 2: Songs tab (${songsUrl})`)
  try {
    await page.goto(songsUrl, { waitUntil: 'networkidle2', timeout: 60000 })
    await page.waitForSelector('a[href*="/song/"]', { timeout: 15000 }).catch(() => {})
    console.log(`    After load: ${apiTracks.size} tracks from API`)
    await scrollUntilDone(page, apiTracks, limit, 10)

    const songsDomIds = await extractDomSongIds(page)
    for (const id of songsDomIds) {
      if (!apiTracks.has(id)) {
        apiTracks.set(id, { sunoId: id, title: '', coverUrl: null, genre: [], plays: 0 })
      }
    }
    console.log(`    Songs tab total: API=${apiTracks.size} | DOM=${songsDomIds.length}`)
  } catch (err) {
    console.log(`    Songs tab failed: ${err.message}`)
  }

  // ── Source 3: Each playlist ──
  console.log(`\n  Source 3: Scraping ${KNOWN_PLAYLISTS.length} playlists`)
  for (const pl of KNOWN_PLAYLISTS) {
    try {
      const before = apiTracks.size
      await page.goto(pl.url, { waitUntil: 'networkidle2', timeout: 30000 })
      await page.waitForSelector('a[href*="/song/"]', { timeout: 10000 }).catch(() => {})
      await scrollUntilDone(page, apiTracks, 0, 5)

      const plDomIds = await extractDomSongIds(page)
      for (const id of plDomIds) {
        if (!apiTracks.has(id)) {
          apiTracks.set(id, { sunoId: id, title: '', coverUrl: null, genre: [], plays: 0 })
        }
      }
      const gained = apiTracks.size - before
      console.log(`    ${pl.name}: +${gained} new (total: ${apiTracks.size})`)
    } catch (err) {
      console.log(`    ${pl.name}: failed (${err.message})`)
    }
  }

  // ── Merge overview DOM IDs ──
  for (const id of overviewDomIds) {
    if (!apiTracks.has(id)) {
      apiTracks.set(id, { sunoId: id, title: '', coverUrl: null, genre: [], plays: 0 })
    }
  }

  await browser.close()

  const tracks = [...apiTracks.values()]
  console.log(`\n  TOTAL unique tracks discovered: ${tracks.length}`)

  if (limit > 0) return tracks.slice(0, limit)
  return tracks
}

function extractTrackFromApi(data, map) {
  if (!data.id || map.has(data.id)) return

  const genre = []
  if (data.tags) {
    genre.push(...(typeof data.tags === 'string' ? data.tags.split(',').map(t => t.trim()) : data.tags))
  }
  if (data.metadata?.tags) {
    genre.push(...data.metadata.tags.split(',').map(t => t.trim()))
  }

  let duration = null
  const dur = data.audio_duration || data.duration
  if (dur) {
    const mins = Math.floor(dur / 60)
    const secs = Math.floor(dur % 60)
    duration = `${mins}:${secs.toString().padStart(2, '0')}`
  }

  map.set(data.id, {
    sunoId: data.id,
    title: data.title || '',
    coverUrl: data.image_url || data.image_large_url || null,
    genre: [...new Set(genre.filter(Boolean))],
    plays: data.play_count || 0,
    likes: data.upvote_count || 0,
    duration,
  })
}

// ── Build Track Entry ───────────────────────────────────────────────────────

function createTrackEntry(scraped) {
  const id = scraped.title
    ? generateSlug(scraped.title)
    : `suno-${scraped.sunoId.slice(0, 8)}`

  const cleanedGenre = cleanGenreTags(scraped.genre)

  const entry = {
    id,
    type: 'music',
    title: scraped.title || `Track ${scraped.sunoId.slice(0, 8)}`,
    brand: 'frankx',
    status: 'published',
    tags: cleanedGenre,
    platform: 'suno',
    sunoId: scraped.sunoId,
    sunoUrl: `https://suno.com/song/${scraped.sunoId}`,
    genre: cleanedGenre,
    plays: scraped.plays || 0,
    section: 'songs',
  }

  if (scraped.coverUrl) entry.coverUrl = scraped.coverUrl
  if (scraped.likes) entry.likes = scraped.likes
  if (scraped.duration) entry.duration = scraped.duration

  return entry
}

// ── Save to Inventory ───────────────────────────────────────────────────────

function saveToInventory(newTracks) {
  let inventory = { tracks: [], _playlists: [], _profileStats: {} }
  if (fs.existsSync(MUSIC_FILE)) {
    inventory = JSON.parse(fs.readFileSync(MUSIC_FILE, 'utf-8'))
  }

  const existingIds = new Set(inventory.tracks.map((t) => t.sunoId).filter(Boolean))
  const existingUrls = new Set(inventory.tracks.map((t) => t.sunoUrl).filter(Boolean))

  let added = 0
  let updated = 0

  for (const track of newTracks) {
    if (track.sunoId && existingIds.has(track.sunoId)) {
      const existing = inventory.tracks.find((t) => t.sunoId === track.sunoId)
      if (existing) {
        let changed = false
        // Fill missing cover art
        if (track.coverUrl && !existing.coverUrl) { existing.coverUrl = track.coverUrl; changed = true }
        // Update play count if higher
        if (track.plays && (!existing.plays || track.plays > existing.plays)) { existing.plays = track.plays; changed = true }
        // Fill missing audioUrl
        if (track.audioUrl && !existing.audioUrl) { existing.audioUrl = track.audioUrl; changed = true }
        // Fix unnamed tracks
        if (existing.title.startsWith('Track ') && track.title && !track.title.startsWith('Track ')) {
          existing.title = track.title; existing.id = generateSlug(track.title); changed = true
        }
        // Clean up genres (replace raw prompts with clean tags)
        if (track.genre?.length > 0 && (!existing.genre?.length || existing.genre.some(g => g.length > 30))) {
          existing.genre = track.genre; existing.tags = track.genre; changed = true
        }
        // Fill missing likes/duration
        if (track.likes && (!existing.likes || track.likes > existing.likes)) { existing.likes = track.likes; changed = true }
        if (track.duration && !existing.duration) { existing.duration = track.duration; changed = true }
        if (changed) updated++
      }
      continue
    }

    if (track.sunoUrl && existingUrls.has(track.sunoUrl)) continue

    inventory.tracks.push(track)
    existingIds.add(track.sunoId)
    added++
  }

  inventory._count = inventory.tracks.length
  inventory._lastUpdated = new Date().toISOString().split('T')[0]

  fs.writeFileSync(MUSIC_FILE, JSON.stringify(inventory, null, 2))

  const total = inventory.tracks.length
  console.log(`\n  Added ${added} new tracks`)
  console.log(`  Updated ${updated} existing tracks`)
  console.log(`  Total tracks in inventory: ${total}`)
  console.log(`  Saved to: ${MUSIC_FILE}\n`)

  return { added, updated, total }
}

// ── Clean Existing Genres ───────────────────────────────────────────────────

function cleanExistingGenres() {
  if (!fs.existsSync(MUSIC_FILE)) return

  const inventory = JSON.parse(fs.readFileSync(MUSIC_FILE, 'utf-8'))
  let cleaned = 0

  for (const track of inventory.tracks) {
    const original = JSON.stringify(track.genre)
    const cleanedGenre = cleanGenreTags(track.genre || [])

    if (JSON.stringify(cleanedGenre) !== original) {
      track.genre = cleanedGenre
      track.tags = cleanedGenre
      cleaned++
    }
  }

  fs.writeFileSync(MUSIC_FILE, JSON.stringify(inventory, null, 2))
  console.log(`  Cleaned genres on ${cleaned} tracks`)
}

// ── Download MP3s ───────────────────────────────────────────────────────────

async function downloadMp3s(tracks) {
  if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true })
  }

  let downloaded = 0
  let skipped = 0
  let failed = 0

  for (const track of tracks) {
    if (!track.sunoId) { skipped++; continue }

    const mp3Path = path.join(DOWNLOAD_DIR, `${track.sunoId}.mp3`)
    if (fs.existsSync(mp3Path)) { skipped++; continue }

    const cdnUrl = `${SUNO_CDN}/${track.sunoId}.mp3`

    try {
      const response = await fetch(cdnUrl)
      if (!response.ok) {
        console.log(`  Failed (${response.status}): ${track.title || track.sunoId}`)
        failed++
        continue
      }

      const buffer = Buffer.from(await response.arrayBuffer())
      fs.writeFileSync(mp3Path, buffer)
      downloaded++

      if (downloaded % 10 === 0) console.log(`  Downloaded ${downloaded} MP3s...`)

      // Rate limit: 200ms between requests
      await new Promise((r) => setTimeout(r, 200))
    } catch (err) {
      console.log(`  Error downloading ${track.sunoId}: ${err.message}`)
      failed++
    }
  }

  console.log(`\n  Downloaded: ${downloaded}`)
  console.log(`  Skipped (already exists): ${skipped}`)
  console.log(`  Failed: ${failed}`)
  console.log(`  Location: ${DOWNLOAD_DIR}\n`)
}

// ── Upload to Vercel Blob ───────────────────────────────────────────────────

async function uploadToBlob(tracks) {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    console.error('BLOB_READ_WRITE_TOKEN not set. Skipping upload.')
    return
  }

  let uploaded = 0
  const inventory = JSON.parse(fs.readFileSync(MUSIC_FILE, 'utf-8'))

  for (const track of tracks) {
    if (!track.sunoId) continue

    const mp3Path = path.join(DOWNLOAD_DIR, `${track.sunoId}.mp3`)
    if (!fs.existsSync(mp3Path)) continue

    const inventoryTrack = inventory.tracks.find((t) => t.sunoId === track.sunoId)
    if (inventoryTrack?.audioUrl) continue

    const blobPath = `music/${track.sunoId}/${track.sunoId}.mp3`

    try {
      const { put } = await import('@vercel/blob')
      const blob = await put(blobPath, fs.readFileSync(mp3Path), {
        access: 'public',
        addRandomSuffix: false,
        token,
      })

      if (inventoryTrack) inventoryTrack.audioUrl = blob.url

      uploaded++
      if (uploaded % 10 === 0) console.log(`  Uploaded ${uploaded} to Blob...`)
    } catch (err) {
      console.log(`  Upload failed for ${track.sunoId}: ${err.message}`)
    }
  }

  fs.writeFileSync(MUSIC_FILE, JSON.stringify(inventory, null, 2))
  console.log(`\n  Uploaded ${uploaded} MP3s to Vercel Blob`)
  console.log(`  Updated audioUrl fields in music.json\n`)
}

// ── Notify n8n Webhook ──────────────────────────────────────────────────────

const N8N_WEBHOOK_URL = 'https://primary-production-ff336.up.railway.app/webhook/music-sync'

async function notifyWebhook(results) {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...results, source: 'scraper', timestamp: new Date().toISOString() }),
    })
    if (response.ok) {
      console.log('  Notified n8n webhook (Slack)')
    } else {
      console.log(`  Webhook notification failed (${response.status})`)
    }
  } catch (err) {
    console.log(`  Webhook notification error: ${err.message}`)
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const flags = parseArgs()

  console.log('\n=== Suno Catalog Scraper v2.0 ===')
  console.log(`Mode: ${flags.clean ? 'Clean genres' : flags.indexOnly ? 'Index only' : flags.upload ? 'Download + Upload' : 'Download'}`)
  if (flags.limit) console.log(`Limit: ${flags.limit} tracks`)
  console.log()

  // Clean-only mode
  if (flags.clean) {
    console.log('Cleaning genre data on existing tracks...')
    cleanExistingGenres()
    if (!flags.indexOnly && !flags.download) {
      console.log('=== Done ===\n')
      return
    }
  }

  // Step 1: Scrape profile (multi-source)
  if (flags.indexOnly || flags.download) {
    console.log('Step 1: Scraping Suno profile (multi-source)...')
    const scrapedTracks = await scrapeSunoProfile(flags.profile, flags.limit)
    console.log(`  Found ${scrapedTracks.length} tracks across all sources`)

    // Step 2: Build track entries
    console.log('\nStep 2: Building track entries...')
    const trackEntries = scrapedTracks.map(createTrackEntry)

    // Step 3: Save to inventory
    console.log('Step 3: Saving to inventory...')
    const results = saveToInventory(trackEntries)

    // Step 4: Download MP3s
    if (flags.download) {
      console.log('Step 4: Downloading MP3s...')
      await downloadMp3s(trackEntries)
    }

    // Step 5: Upload to Blob
    if (flags.upload) {
      console.log('Step 5: Uploading to Vercel Blob...')
      await uploadToBlob(trackEntries)
    }

    // Step 6: Notify n8n
    if (flags.notify) {
      console.log('Step 6: Notifying n8n webhook...')
      await notifyWebhook(results)
    }
  }

  console.log('=== Done ===\n')
}

main().catch(console.error)
