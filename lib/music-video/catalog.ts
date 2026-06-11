import { readFileSync } from 'node:fs'
import path from 'node:path'

// The music catalog — migrated from Starlight-Intelligence-System (the source
// of truth). 121 songs across 4 labels. Schema is richer than the legacy
// lib/music.ts inventory and carries the per-format asset paths the video
// pipeline writes back into.

export interface CatalogSong {
  songId: string
  title: string
  persona: string
  label: string
  status: string // draft | gated | released | archived
  engine: string
  sunoUrl: string
  sunoPrompt: string
  bpm: number | null
  key: string
  durationSeconds: number | null
  structureTags: string
  createdDate: string
  releasedDate: string
  isrc: string
  // asset paths (written back by the producer)
  coverPath: string
  videoShortPath: string
  videoFullPath: string
  canvasPath: string
  lyricVideoPath: string
  aiDisclosure: string
  notes: string
  // source inputs (written by scripts/music-video/ingest.mjs)
  audioPath: string
  beatgridPath: string
}

const CATALOG_PATH = path.join(process.cwd(), 'data', 'music', 'catalog.csv')

// RFC-4180-ish parser: handles quoted fields with embedded commas + newlines.
function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ }
        else inQuotes = false
      } else field += c
    } else {
      if (c === '"') inQuotes = true
      else if (c === ',') { row.push(field); field = '' }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
      else if (c === '\r') { /* skip */ }
      else field += c
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row) }
  return rows
}

let cache: CatalogSong[] | null = null

export function loadCatalog(): CatalogSong[] {
  if (cache) return cache
  const rows = parseCsv(readFileSync(CATALOG_PATH, 'utf8'))
  const [header, ...body] = rows
  const col = (name: string) => header.indexOf(name)
  const c = {
    id: col('song_id'), title: col('title'), persona: col('persona'),
    label: col('label'), status: col('status'), engine: col('engine'),
    url: col('suno_url'), prompt: col('suno_prompt'), bpm: col('bpm'),
    key: col('key'), dur: col('duration_seconds'), struct: col('structure_tags'),
    created: col('created_date'), released: col('released_date'), isrc: col('isrc'),
    cover: col('cover_path'), vShort: col('video_short_path'),
    vFull: col('video_full_path'), canvas: col('canvas_path'),
    lyric: col('lyric_video_path'), ai: col('ai_disclosure_metadata'), notes: col('notes'),
    audio: col('audio_path'), beatgrid: col('beatgrid_path'),
  }
  cache = body
    .filter((r) => r[c.id] && !r[c.id].startsWith('EXAMPLE_'))
    .map((r) => ({
      songId: r[c.id], title: r[c.title], persona: r[c.persona],
      label: r[c.label], status: r[c.status], engine: r[c.engine],
      sunoUrl: r[c.url], sunoPrompt: r[c.prompt],
      bpm: num(r[c.bpm]), key: r[c.key], durationSeconds: num(r[c.dur]),
      structureTags: r[c.struct], createdDate: r[c.created],
      releasedDate: r[c.released], isrc: r[c.isrc],
      coverPath: r[c.cover], videoShortPath: r[c.vShort],
      videoFullPath: r[c.vFull], canvasPath: r[c.canvas],
      lyricVideoPath: r[c.lyric], aiDisclosure: r[c.ai], notes: r[c.notes],
      audioPath: r[c.audio] || '', beatgridPath: r[c.beatgrid] || '',
    }))
  return cache
}

export function getSong(songId: string): CatalogSong | undefined {
  return loadCatalog().find((s) => s.songId === songId)
}

// Songs released but with no video yet — the production backlog.
export function songsNeedingVideo(): CatalogSong[] {
  return loadCatalog().filter((s) => s.status === 'released' && !s.videoFullPath)
}

function num(v: string | undefined): number | null {
  if (!v) return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}
