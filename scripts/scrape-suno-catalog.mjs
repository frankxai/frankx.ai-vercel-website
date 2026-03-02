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

const DEFAULT_PROFILE = 'https://suno.com/@frankxmusic'
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

// ── Suno Profile Scraper ────────────────────────────────────────────────────

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

  // Set a realistic user agent
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  )

  await page.goto(profileUrl, { waitUntil: 'networkidle2', timeout: 60000 })

  // Wait for song cards to render
  await page.waitForSelector('a[href*="/song/"]', { timeout: 15000 }).catch(() => {
    console.log('Warning: No song links found on initial load, trying to scroll...')
  })

  // Scroll to load all songs (Suno uses infinite scroll)
  let previousHeight = 0
  let scrollAttempts = 0
  const maxScrollAttempts = 50

  while (scrollAttempts < maxScrollAttempts) {
    const currentHeight = await page.evaluate(() => document.body.scrollHeight)
    if (currentHeight === previousHeight) break

    previousHeight = currentHeight
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await new Promise((r) => setTimeout(r, 1500))
    scrollAttempts++

    const songCount = await page.evaluate(() =>
      document.querySelectorAll('a[href*="/song/"]').length
    )
    console.log(`  Scroll ${scrollAttempts}: ${songCount} songs found...`)

    if (limit > 0 && songCount >= limit) break
  }

  // Extract track data from the page
  const tracks = await page.evaluate(() => {
    const songLinks = Array.from(document.querySelectorAll('a[href*="/song/"]'))
    const seen = new Set()

    return songLinks
      .map((link) => {
        const href = link.getAttribute('href') || ''
        const sunoIdMatch = href.match(/\/song\/([a-f0-9-]+)/)
        if (!sunoIdMatch) return null

        const sunoId = sunoIdMatch[1]
        if (seen.has(sunoId)) return null
        seen.add(sunoId)

        // Try to extract metadata from card structure
        const card = link.closest('[class*="card"], [class*="Card"], article, div') || link
        const titleEl =
          card.querySelector('h3, [class*="title"], [class*="Title"]') ||
          card.querySelector('p:first-child')
        const title = titleEl?.textContent?.trim() || ''

        // Try to get cover image
        const img = card.querySelector('img')
        const coverUrl = img?.src || img?.getAttribute('data-src') || null

        // Try to get genre/tags from text
        const allText = card.textContent || ''
        const genrePatterns = [
          'electronic',
          'ambient',
          'hip hop',
          'pop',
          'rock',
          'jazz',
          'classical',
          'r&b',
          'soul',
          'house',
          'techno',
          'folk',
          'country',
          'metal',
          'indie',
          'orchestral',
          'cinematic',
          'lofi',
          'trap',
          'drill',
          'afrobeat',
        ]
        const detectedGenres = genrePatterns.filter((g) =>
          allText.toLowerCase().includes(g)
        )

        // Try to get play count
        const playMatch = allText.match(/(\d+(?:,\d+)*(?:\.\d+)?[KkMm]?)\s*plays?/i)
        let plays = 0
        if (playMatch) {
          let playStr = playMatch[1].replace(/,/g, '')
          if (playStr.match(/[Kk]$/)) plays = parseFloat(playStr) * 1000
          else if (playStr.match(/[Mm]$/)) plays = parseFloat(playStr) * 1000000
          else plays = parseInt(playStr, 10)
        }

        return { sunoId, title, coverUrl, genre: detectedGenres, plays }
      })
      .filter(Boolean)
  })

  await browser.close()

  if (limit > 0) {
    return tracks.slice(0, limit)
  }
  return tracks
}

// ── Build Track Entry (from import-suno-tracks.mjs pattern) ─────────────────

function createTrackEntry(scraped) {
  const id = scraped.title
    ? generateSlug(scraped.title)
    : `suno-${scraped.sunoId.slice(0, 8)}`

  return {
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
    coverUrl: scraped.coverUrl || null,
  }
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
