import { readFileSync } from 'node:fs'
import path from 'node:path'

// Canonical production catalog. Discovery inventory and raw Suno scrape data
// may propose rows, but they do not own release state or approvals.
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
  gatedDate: string
  releasedDate: string
  archivedDate: string
  isrc: string
  coverPath: string
  cover1x1Path: string
  cover16x9Path: string
  cover9x16Path: string
  videoShortPath: string
  videoSquarePath: string
  videoFullPath: string
  canvasPath: string
  lyricVideoPath: string
  aiDisclosure: string
  notes: string
  audioPath: string
  beatgridPath: string
  ledgerId: string
  workId: string
  takeId: string
  masterId: string
  primaryArtist: string
  canonicalSlug: string
  revision: number | null
  masterAudioPath: string
  streamingAudioUrl: string
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
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += c
      }
    } else {
      if (c === '"') inQuotes = true
      else if (c === ',') {
        row.push(field)
        field = ''
      } else if (c === '\n') {
        row.push(field)
        rows.push(row)
        row = []
        field = ''
      } else if (c === '\r') {
        // skip
      } else {
        field += c
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

let cache: CatalogSong[] | null = null

export function loadCatalog(): CatalogSong[] {
  if (cache) return cache
  const rows = parseCsv(readFileSync(CATALOG_PATH, 'utf8'))
  const [header, ...body] = rows
  const col = (name: string) => header.indexOf(name)
  const c = {
    id: col('song_id'),
    title: col('title'),
    persona: col('persona'),
    label: col('label'),
    status: col('status'),
    engine: col('engine'),
    url: col('suno_url'),
    prompt: col('suno_prompt'),
    bpm: col('bpm'),
    key: col('key'),
    dur: col('duration_seconds'),
    struct: col('structure_tags'),
    created: col('created_date'),
    gated: col('gated_date'),
    released: col('released_date'),
    archived: col('archived_date'),
    isrc: col('isrc'),
    cover: col('cover_path'),
    cover1x1: col('cover_1x1_path'),
    cover16x9: col('cover_16x9_path'),
    cover9x16: col('cover_9x16_path'),
    vShort: col('video_short_path'),
    vSquare: col('video_square_path'),
    vFull: col('video_full_path'),
    canvas: col('canvas_path'),
    lyric: col('lyric_video_path'),
    ai: col('ai_disclosure_metadata'),
    notes: col('notes'),
    audio: col('audio_path'),
    beatgrid: col('beatgrid_path'),
    ledgerId: col('ledger_id'),
    workId: col('work_id'),
    takeId: col('take_id'),
    masterId: col('master_id'),
    primaryArtist: col('primary_artist'),
    canonicalSlug: col('canonical_slug'),
    revision: col('revision'),
    masterAudio: col('master_audio_path'),
    streamingAudio: col('streaming_audio_url'),
  }
  cache = body
    .filter((r) => r[c.id] && !r[c.id].startsWith('EXAMPLE_'))
    .map((r) => ({
      songId: r[c.id],
      title: r[c.title],
      persona: r[c.persona],
      label: r[c.label],
      status: r[c.status],
      engine: r[c.engine],
      sunoUrl: r[c.url],
      sunoPrompt: r[c.prompt],
      bpm: num(r[c.bpm]),
      key: r[c.key],
      durationSeconds: num(r[c.dur]),
      structureTags: r[c.struct],
      createdDate: r[c.created],
      gatedDate: r[c.gated],
      releasedDate: r[c.released],
      archivedDate: r[c.archived],
      isrc: r[c.isrc],
      coverPath: r[c.cover],
      cover1x1Path: r[c.cover1x1],
      cover16x9Path: r[c.cover16x9],
      cover9x16Path: r[c.cover9x16],
      videoShortPath: r[c.vShort],
      videoSquarePath: r[c.vSquare],
      videoFullPath: r[c.vFull],
      canvasPath: r[c.canvas],
      lyricVideoPath: r[c.lyric],
      aiDisclosure: r[c.ai],
      notes: r[c.notes],
      audioPath: r[c.audio] || '',
      beatgridPath: r[c.beatgrid] || '',
      ledgerId: r[c.ledgerId] || '',
      workId: r[c.workId] || '',
      takeId: r[c.takeId] || '',
      masterId: r[c.masterId] || '',
      primaryArtist: r[c.primaryArtist] || '',
      canonicalSlug: r[c.canonicalSlug] || '',
      revision: num(r[c.revision]),
      masterAudioPath: r[c.masterAudio] || '',
      streamingAudioUrl: r[c.streamingAudio] || '',
    }))
  return cache
}

export function getSong(songId: string): CatalogSong | undefined {
  return loadCatalog().find((song) => song.songId === songId)
}

// Songs released but with no video yet — the production backlog.
export function songsNeedingVideo(): CatalogSong[] {
  return loadCatalog().filter((song) => song.status === 'released' && !song.videoFullPath)
}

function num(value: string | undefined): number | null {
  if (!value) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

