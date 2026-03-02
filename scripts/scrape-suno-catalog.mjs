#!/usr/bin/env node
/**
 * Suno Catalog Scraper
 *
 * Scrapes all tracks from a Suno profile, indexes metadata,
 * and optionally downloads MP3s + uploads to Vercel Blob.
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
 *   --limit N      Limit to N tracks (for testing)
 *   --profile URL  Override profile URL (default: https://suno.com/@frankxmusic)
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

// ── CLI Arg Parsing ─────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2)
  const flags = {
    indexOnly: args.includes('--index-only'),
    download: args.includes('--download'),
    upload: args.includes('--upload'),
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

  if (!flags.indexOnly && !flags.download) {
    console.log(`
Suno Catalog Scraper

USAGE:
  node scripts/scrape-suno-catalog.mjs --index-only
  node scripts/scrape-suno-catalog.mjs --download
  node scripts/scrape-suno-catalog.mjs --download --upload

FLAGS:
  --index-only   Scrape metadata only
  --download     Download MP3s to ./tmp/suno-mp3/
  --upload       Upload to Vercel Blob (requires BLOB_READ_WRITE_TOKEN)
  --limit N      Limit to N tracks
  --profile URL  Custom profile URL
`)
    process.exit(0)
  }

  return flags
}

// ── Slug Generator (from import-suno-tracks.mjs) ───────────────────────────

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50)
}

// ── Suno Profile Scraper (API Interception) ──────────────────────────────────

async function scrapeSunoProfile(profileUrl, limit = 0) {
  let puppeteer
  try {
    puppeteer = await import('puppeteer')
  } catch {
    console.error('puppeteer not installed. Run: npm install -D puppeteer')
    process.exit(1)
  }

  console.log(`\nLaunching browser to scrape: ${profileUrl}\n`)

  const browser = await puppeteer.default.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  )

  // Intercept API responses to capture track data
  const apiTracks = new Map()

  page.on('response', async (response) => {
    const url = response.url()
    if (!url.includes('studio-api.prod.suno.com')) return
    if (response.status() !== 200) return

    try {
      const json = await response.json()

      // Handle single clip responses (/api/clip/{id})
      if (json.id && json.title) {
        extractTrackFromApi(json, apiTracks)
      }

      // Handle array responses (profile listing endpoints)
      if (Array.isArray(json)) {
        for (const item of json) {
          if (item.id && item.title) extractTrackFromApi(item, apiTracks)
        }
      }

      // Handle paginated responses with clips/songs array
      for (const key of ['clips', 'songs', 'playlist_clips', 'data', 'results']) {
        if (Array.isArray(json[key])) {
          for (const item of json[key]) {
            if (item.id && item.title) extractTrackFromApi(item, apiTracks)
            // Some endpoints nest clip data one level deeper
            if (item.clip && item.clip.id) extractTrackFromApi(item.clip, apiTracks)
          }
        }
      }
    } catch {
      // Not JSON or parsing failed — skip
    }
  })

  // Load the profile page
  await page.goto(profileUrl, { waitUntil: 'networkidle2', timeout: 60000 })
  console.log(`  Initial load: ${apiTracks.size} tracks captured from API`)

  // Wait for song cards to render
  await page.waitForSelector('a[href*="/song/"]', { timeout: 15000 }).catch(() => {
    console.log('  Warning: No song links found on initial load')
  })

  // Also extract sunoIds from DOM links as fallback
  const domIds = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/song/"]'))
    return [...new Set(links.map(l => {
      const m = l.href.match(/\/song\/([a-f0-9-]{36})/)
      return m ? m[1] : null
    }).filter(Boolean))]
  })
  console.log(`  DOM links: ${domIds.length} unique song IDs`)

  // Try clicking "See More" on the Songs section to load full song list
  const seeMoreClicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('a, button'))
    for (const btn of buttons) {
      const text = btn.textContent?.trim().toLowerCase() || ''
      const href = btn.getAttribute('href') || ''
      if ((text.includes('see more') || text.includes('see all')) &&
          (href.includes('songs') || href.includes('tracks') ||
           btn.closest('[class*="song"], [class*="Song"], [class*="track"]'))) {
        btn.click()
        return true
      }
    }
    // Fallback: click any "See More" that's near songs section
    for (const btn of buttons) {
      if (btn.textContent?.trim().toLowerCase() === 'see more') {
        btn.click()
        return true
      }
    }
    return false
  })

  if (seeMoreClicked) {
    console.log('  Clicked "See More" — waiting for more songs...')
    await new Promise(r => setTimeout(r, 3000))
    await page.waitForNetworkIdle({ timeout: 10000 }).catch(() => {})
    console.log(`  After See More: ${apiTracks.size} tracks from API`)
  }

  // Scroll to load more songs (infinite scroll)
  let previousCount = apiTracks.size
  let staleScrolls = 0
  const maxStaleScrolls = 5

  for (let attempt = 0; attempt < 100; attempt++) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await new Promise(r => setTimeout(r, 2000))

    const currentCount = apiTracks.size
    if (currentCount === previousCount) {
      staleScrolls++
      if (staleScrolls >= maxStaleScrolls) {
        console.log(`  No new tracks after ${maxStaleScrolls} scrolls — done`)
        break
      }
    } else {
      staleScrolls = 0
      previousCount = currentCount
    }

    if (attempt % 5 === 0) {
      console.log(`  Scroll ${attempt}: ${currentCount} tracks captured`)
    }

    if (limit > 0 && currentCount >= limit) break
  }

  // Merge DOM-discovered IDs that API didn't capture
  for (const id of domIds) {
    if (!apiTracks.has(id)) {
      apiTracks.set(id, { sunoId: id, title: '', coverUrl: null, genre: [], plays: 0 })
    }
  }

  await browser.close()

  const tracks = [...apiTracks.values()]
  console.log(`\n  Total unique tracks: ${tracks.length}`)

  if (limit > 0) return tracks.slice(0, limit)
  return tracks
}

function extractTrackFromApi(data, map) {
  if (!data.id || map.has(data.id)) return

  // Parse genre from tags or metadata
  const genre = []
  if (data.tags) {
    genre.push(...(typeof data.tags === 'string' ? data.tags.split(',').map(t => t.trim()) : data.tags))
  }
  if (data.metadata?.tags) {
    genre.push(...data.metadata.tags.split(',').map(t => t.trim()))
  }

  // Parse duration from audio_duration or duration fields
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

// ── Build Track Entry (from import-suno-tracks.mjs pattern) ─────────────────

function createTrackEntry(scraped) {
  const id = scraped.title
    ? generateSlug(scraped.title)
    : `suno-${scraped.sunoId.slice(0, 8)}`

  const entry = {
    id,
    type: 'music',
    title: scraped.title || `Track ${scraped.sunoId.slice(0, 8)}`,
    brand: 'frankx',
    status: 'published',
    tags: scraped.genre || [],
    platform: 'suno',
    sunoId: scraped.sunoId,
    sunoUrl: `https://suno.com/song/${scraped.sunoId}`,
    genre: scraped.genre || [],
    plays: scraped.plays || 0,
    section: 'songs',
  }

  if (scraped.coverUrl) entry.coverUrl = scraped.coverUrl
  if (scraped.likes) entry.likes = scraped.likes
  if (scraped.duration) entry.duration = scraped.duration

  return entry
}

// ── Save to Inventory (from import-suno-tracks.mjs) ─────────────────────────

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
      // Update existing track with any new data
      const existing = inventory.tracks.find((t) => t.sunoId === track.sunoId)
      if (existing) {
        if (track.coverUrl && !existing.coverUrl) {
          existing.coverUrl = track.coverUrl
          updated++
        }
        if (track.plays && (!existing.plays || track.plays > existing.plays)) {
          existing.plays = track.plays
          updated++
        }
        if (track.audioUrl && !existing.audioUrl) {
          existing.audioUrl = track.audioUrl
          updated++
        }
      }
      continue
    }

    if (track.sunoUrl && existingUrls.has(track.sunoUrl)) {
      continue
    }

    inventory.tracks.push(track)
    existingIds.add(track.sunoId)
    added++
  }

  inventory._count = inventory.tracks.length
  inventory._lastUpdated = new Date().toISOString().split('T')[0]

  fs.writeFileSync(MUSIC_FILE, JSON.stringify(inventory, null, 2))

  console.log(`\n  Added ${added} new tracks`)
  console.log(`  Updated ${updated} existing tracks`)
  console.log(`  Total tracks in inventory: ${inventory.tracks.length}`)
  console.log(`  Saved to: ${MUSIC_FILE}\n`)
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
    if (!track.sunoId) {
      skipped++
      continue
    }

    const mp3Path = path.join(DOWNLOAD_DIR, `${track.sunoId}.mp3`)
    if (fs.existsSync(mp3Path)) {
      skipped++
      continue
    }

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

      if (downloaded % 10 === 0) {
        console.log(`  Downloaded ${downloaded} MP3s...`)
      }

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

  // Load current inventory to update audioUrl
  const inventory = JSON.parse(fs.readFileSync(MUSIC_FILE, 'utf-8'))

  for (const track of tracks) {
    if (!track.sunoId) continue

    const mp3Path = path.join(DOWNLOAD_DIR, `${track.sunoId}.mp3`)
    if (!fs.existsSync(mp3Path)) continue

    // Skip if already has audioUrl
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

      // Update audioUrl in inventory
      if (inventoryTrack) {
        inventoryTrack.audioUrl = blob.url
      }

      uploaded++
      if (uploaded % 10 === 0) {
        console.log(`  Uploaded ${uploaded} to Blob...`)
      }
    } catch (err) {
      console.log(`  Upload failed for ${track.sunoId}: ${err.message}`)
    }
  }

  // Save updated inventory with audioUrls
  fs.writeFileSync(MUSIC_FILE, JSON.stringify(inventory, null, 2))

  console.log(`\n  Uploaded ${uploaded} MP3s to Vercel Blob`)
  console.log(`  Updated audioUrl fields in music.json\n`)
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const flags = parseArgs()

  console.log('\n=== Suno Catalog Scraper ===')
  console.log(`Mode: ${flags.indexOnly ? 'Index only' : flags.upload ? 'Download + Upload' : 'Download'}`)
  if (flags.limit) console.log(`Limit: ${flags.limit} tracks`)
  console.log()

  // Step 1: Scrape profile
  console.log('Step 1: Scraping Suno profile...')
  const scrapedTracks = await scrapeSunoProfile(flags.profile, flags.limit)
  console.log(`  Found ${scrapedTracks.length} tracks on profile`)

  // Step 2: Build track entries
  console.log('\nStep 2: Building track entries...')
  const trackEntries = scrapedTracks.map(createTrackEntry)

  // Step 3: Save to inventory (dedup handled inside)
  console.log('Step 3: Saving to inventory...')
  saveToInventory(trackEntries)

  // Step 4: Download MP3s (if requested)
  if (flags.download) {
    console.log('Step 4: Downloading MP3s...')
    await downloadMp3s(trackEntries)
  }

  // Step 5: Upload to Blob (if requested)
  if (flags.upload) {
    console.log('Step 5: Uploading to Vercel Blob...')
    await uploadToBlob(trackEntries)
  }

  console.log('=== Done ===\n')
}

main().catch(console.error)
