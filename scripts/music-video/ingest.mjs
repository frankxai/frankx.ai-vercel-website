#!/usr/bin/env node
// Music Intelligence System — the source on-ramp.
//
// Drop an MP3/WAV/FLAC/M4A → this copies it into content/music/source/,
// reads its duration, runs the Beat This! beat-grid sidecar, and upserts a
// row into data/music/catalog.csv with a real audio_path + beatgrid_path.
//
// Before this script the catalog was Suno-URL-first with no audio input — the
// beat grid (the biggest quality lever) had nowhere to read from and silently
// fell back to BPM bars. This wires the input the rest of the pipeline assumes.
//
//   node scripts/music-video/ingest.mjs <audio>            # one file
//   node scripts/music-video/ingest.mjs                    # drains ~/_inbox/music/
//   node scripts/music-video/ingest.mjs <audio> --persona=frank-riemer --title="Threshold"
//   node scripts/music-video/ingest.mjs <audio> --no-beatgrid   # skip detection
//
// Flags: --persona --label --title --status --no-beatgrid

import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import os from 'node:os'

const ROOT = process.cwd()
const CATALOG = path.join(ROOT, 'data', 'music', 'catalog.csv')
const SOURCE_DIR = path.join(ROOT, 'content', 'music', 'source')
const INBOX = path.join(os.homedir(), '_inbox', 'music')
const AUDIO_EXT = new Set(['.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg', '.opus'])

const args = process.argv.slice(2)
const flags = Object.fromEntries(
  args.filter((a) => a.startsWith('--')).map((a) => {
    const [k, v] = a.slice(2).split('=')
    return [k, v ?? true]
  }),
)
const inputs = args.filter((a) => !a.startsWith('--'))

function die(msg) {
  console.error(`✗ ${msg}`)
  process.exit(1)
}

function resolveTargets() {
  if (inputs.length) return inputs.map((p) => path.resolve(p))
  if (!existsSync(INBOX)) die(`no input given and ${INBOX} does not exist. Pass an audio path or drop files in ~/_inbox/music/`)
  const found = readdirSync(INBOX)
    .filter((f) => AUDIO_EXT.has(path.extname(f).toLowerCase()))
    .map((f) => path.join(INBOX, f))
  if (!found.length) die(`no audio files in ${INBOX}`)
  return found
}

function kebab(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48)
}

function ymd(d) {
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
}

function ffprobe(file) {
  const r = spawnSync('ffprobe', ['-v', 'quiet', '-print_format', 'json', '-show_format', file], { encoding: 'utf8' })
  if (r.status !== 0) die(`ffprobe failed on ${file} — is ffmpeg installed and on PATH?`)
  const fmt = JSON.parse(r.stdout).format ?? {}
  const tags = fmt.tags ?? {}
  const tagBpm = Number(tags.TBPM ?? tags.BPM ?? tags.bpm)
  return {
    duration: fmt.duration ? Math.round(Number(fmt.duration)) : null,
    title: tags.title ?? tags.TITLE ?? null,
    bpm: Number.isFinite(tagBpm) && tagBpm > 0 ? Math.round(tagBpm) : null,
  }
}

// Best-effort beat detection. On ANY failure we warn loudly and let the
// pipeline fall back to bpm-derived bars — but the operator is told, not fooled.
function runBeatgrid(audioDest, gridDest) {
  const r = spawnSync(
    'uv',
    [
      'run',
      '--with', 'beat_this @ git+https://github.com/CPJKU/beat_this',
      '--with', 'torch', '--with', 'torchaudio',
      path.join('scripts', 'music-video', 'beatgrid.py'),
      audioDest, gridDest,
    ],
    { encoding: 'utf8', timeout: 15 * 60 * 1000 },
  )
  if (r.status === 0 && existsSync(gridDest)) {
    try {
      const summary = JSON.parse(r.stdout.trim().split('\n').pop())
      return { ok: true, bpm: summary.bpm ?? null, downbeats: summary.downbeats ?? null }
    } catch {
      return { ok: true, bpm: null, downbeats: null }
    }
  }
  console.warn('  ⚠ BEAT-GRID FALLBACK — Beat This! did not produce a grid.')
  console.warn(`    ${(r.stderr || r.error?.message || 'unknown error').toString().trim().slice(0, 200)}`)
  console.warn('    cuts will use approximate BPM bars, not real downbeats. Re-run without --no-beatgrid once uv + the model are available.')
  return { ok: false, bpm: null, downbeats: null }
}

function csvField(v) {
  const s = v == null ? '' : String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

function upsertRow(record) {
  const text = readFileSync(CATALOG, 'utf8')
  const lines = text.split('\n')
  const header = lines[0].split(',')
  const row = header.map((col) => csvField(record[col] ?? '')).join(',')
  const prefix = `${record.song_id},`
  const idx = lines.findIndex((l, i) => i > 0 && l.startsWith(prefix))
  let action
  if (idx >= 0) {
    lines[idx] = row
    action = 'updated'
  } else {
    // append, tolerating a trailing newline
    let insertAt = lines.length
    while (insertAt > 1 && lines[insertAt - 1].trim() === '') insertAt--
    lines.splice(insertAt, 0, row)
    action = 'added'
  }
  writeFileSync(CATALOG, lines.join('\n'))
  return action
}

function ingestOne(src) {
  if (!existsSync(src)) die(`not found: ${src}`)
  const ext = path.extname(src).toLowerCase()
  if (!AUDIO_EXT.has(ext)) die(`not an audio file: ${src}`)
  console.log(`→ ${path.basename(src)}`)

  const meta = ffprobe(src)
  const persona = (flags.persona || 'frank-riemer').toString()
  const label = (flags.label || persona).toString()
  const title = (flags.title || meta.title || path.basename(src, ext)).toString()
  const songId = `${persona}_${ymd(new Date())}_${kebab(title)}`

  mkdirSync(SOURCE_DIR, { recursive: true })
  const audioDest = path.join(SOURCE_DIR, `${songId}${ext}`)
  copyFileSync(src, audioDest)
  const audioRel = path.relative(ROOT, audioDest).split(path.sep).join('/')

  let beatgridRel = ''
  let bpm = meta.bpm
  if (!flags['no-beatgrid']) {
    const gridDest = path.join(SOURCE_DIR, `${songId}.beatgrid.json`)
    const grid = runBeatgrid(audioDest, gridDest)
    if (grid.ok) {
      beatgridRel = path.relative(ROOT, gridDest).split(path.sep).join('/')
      if (grid.bpm) bpm = grid.bpm
      console.log(`  ✓ beat grid: ${grid.downbeats ?? '?'} downbeats, ${grid.bpm ?? '?'} bpm`)
    }
  }

  const action = upsertRow({
    song_id: songId,
    title,
    persona,
    label,
    status: (flags.status || 'draft').toString(),
    bpm: bpm ?? '',
    duration_seconds: meta.duration ?? '',
    created_date: new Date().toISOString().slice(0, 10),
    ai_disclosure_metadata: 'AI-generated music; ingested via mv-ingest',
    notes: 'ingested via scripts/music-video/ingest.mjs',
    audio_path: audioRel,
    beatgrid_path: beatgridRel,
  })

  console.log(`  ✓ catalog ${action}: ${songId}`)
  console.log(`  ✓ audio:    ${audioRel}`)
  console.log(`    duration ${meta.duration ?? '?'}s · bpm ${bpm ?? '? (will use fallback)'}\n`)
  return songId
}

const targets = resolveTargets()
console.log(`Ingesting ${targets.length} file(s)…\n`)
const ids = targets.map(ingestOne)
console.log(`Done. ${ids.length} song(s) ready to plan:`)
ids.forEach((id) => console.log(`  /music-video ${id} --style=cinematic`))
