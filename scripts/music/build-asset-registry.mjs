#!/usr/bin/env node
/**
 * Build/refresh a canonical music asset registry from data/music-index.json.
 *
 * Source of truth strategy:
 * - data/music-index.json: machine-generated track + URL inventory
 * - data/music-asset-registry.json: manual + operational metadata
 *
 * Usage:
 *   node scripts/music/build-asset-registry.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const MUSIC_INDEX_PATH = join(ROOT, 'data', 'music-index.json')
const REGISTRY_PATH = join(ROOT, 'data', 'music-asset-registry.json')

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf-8'))
}

function toManualMap(registry) {
  const map = new Map()
  for (const item of registry?.tracks || []) {
    map.set(item.sunoId, item)
  }
  return map
}

function inferCoverOrigin(coverUrl) {
  if (!coverUrl) return 'unknown'
  if (coverUrl.includes('cdn1.suno.ai/image_')) return 'suno-generated'
  return 'uploaded-or-custom'
}

function buildEntry(track, previous) {
  return {
    sunoId: track.sunoId,
    inventoryId: track._inventoryId || null,
    title: track.title || null,
    status: track.status || 'published',
    section: track.section || null,
    genre: track.genre || [],
    tags: track.tags || [],
    metrics: {
      plays: track.plays || 0,
      likes: track.likes || 0,
    },
    origins: {
      cover: previous?.origins?.cover || inferCoverOrigin(track.coverUrl),
      animation: previous?.origins?.animation || (track.videoUrl ? 'unknown' : 'none'),
      audioMaster: previous?.origins?.audioMaster || 'suno-export',
    },
    assetRefs: {
      sunoUrl: track.sunoUrl || null,
      embedUrl: track.embedUrl || null,
      audioUrl: track.audioUrl || null,
      videoUrl: track.videoUrl || null,
      coverUrl: track.coverUrl || null,
      googleDriveFolder: previous?.assetRefs?.googleDriveFolder || null,
      notionPageId: previous?.assetRefs?.notionPageId || null,
    },
    usage: previous?.usage || [],
    notes: previous?.notes || '',
    updatedAt: new Date().toISOString(),
  }
}

function main() {
  if (!existsSync(MUSIC_INDEX_PATH)) {
    console.error(`Missing source file: ${MUSIC_INDEX_PATH}`)
    process.exit(1)
  }

  const musicIndex = readJson(MUSIC_INDEX_PATH)
  const previousRegistry = existsSync(REGISTRY_PATH) ? readJson(REGISTRY_PATH) : { tracks: [] }
  const previousMap = toManualMap(previousRegistry)

  const tracks = (musicIndex.tracks || []).map((track) => buildEntry(track, previousMap.get(track.sunoId)))

  const output = {
    _description: 'FrankX music asset registry (sync + usage source of truth)',
    _lastUpdated: new Date().toISOString(),
    _source: {
      musicIndex: 'data/music-index.json',
      inventory: 'data/inventories/frankx/music.json',
    },
    _stats: {
      totalTracks: tracks.length,
      withVideo: tracks.filter((t) => !!t.assetRefs.videoUrl).length,
      withDriveLinked: tracks.filter((t) => !!t.assetRefs.googleDriveFolder).length,
      withNotionLinked: tracks.filter((t) => !!t.assetRefs.notionPageId).length,
    },
    tracks,
  }

  writeFileSync(REGISTRY_PATH, JSON.stringify(output, null, 2))

  console.log(`Wrote ${REGISTRY_PATH}`)
  console.log(`Tracks: ${output._stats.totalTracks}`)
  console.log(`With video: ${output._stats.withVideo}`)
}

main()
