#!/usr/bin/env node
// Pulls the full public Suno profile (clips, playlists, personas, stats) into
// data/music/suno-catalog.json. The profile API is public — no auth needed.
// Usage: node scripts/music/scrape-suno-profile.mjs [handle] [--out <path>]

import fs from 'node:fs'
import path from 'node:path'

const API = 'https://studio-api.prod.suno.com/api'
const HEADERS = { 'User-Agent': 'Mozilla/5.0 (frankx-music-sync)', Accept: 'application/json' }

const args = process.argv.slice(2)
const handle = args.find((a) => !a.startsWith('--')) || 'frankx'
const outIdx = args.indexOf('--out')
const outPath = outIdx >= 0 ? args[outIdx + 1] : path.join('data', 'music', 'suno-catalog.json')

async function getJson(url, attempt = 1) {
  const r = await fetch(url, { headers: HEADERS })
  if (r.status === 429 || r.status >= 500) {
    if (attempt >= 5) throw new Error(`${r.status} after ${attempt} attempts: ${url}`)
    await new Promise((res) => setTimeout(res, attempt * 1500))
    return getJson(url, attempt + 1)
  }
  if (!r.ok) throw new Error(`${r.status}: ${url}`)
  return r.json()
}

function trimClip(c) {
  return {
    id: c.id,
    title: c.title,
    createdAt: c.created_at,
    plays: c.play_count ?? 0,
    likes: c.upvote_count ?? 0,
    comments: c.comment_count ?? 0,
    pinned: !!c.is_pinned,
    public: !!c.is_public,
    model: c.model_name || c.major_model_version || null,
    styleTags: c.metadata?.tags || null,
    duration: c.metadata?.duration || null,
    lyrics: c.metadata?.prompt || null,
    audioUrl: c.audio_url || null,
    videoUrl: c.video_url || null,
    imageUrl: c.image_large_url || c.image_url || null,
    sunoUrl: `https://suno.com/song/${c.id}`,
  }
}

const tracks = []
let profile = null
for (let page = 1; page <= 60; page++) {
  const j = await getJson(
    `${API}/profiles/${handle}?page=${page}&clips_sort_by=created_at&playlists_sort_by=upvote_count`,
  )
  if (page === 1) profile = j
  if (!j.clips?.length) break
  tracks.push(...j.clips.map(trimClip))
  process.stdout.write(`\rclips ${tracks.length}/${j.num_total_clips}`)
  if (tracks.length >= j.num_total_clips) break
  await new Promise((res) => setTimeout(res, 200))
}
console.log()

const playlists = []
for (const p of profile.playlists || []) {
  const trackIds = []
  for (let page = 1; page <= 20; page++) {
    const j = await getJson(`${API}/playlist/${p.id}?page=${page}`)
    if (!j.playlist_clips?.length) break
    trackIds.push(...j.playlist_clips.map((pc) => pc.clip?.id ?? pc.clip_id ?? pc.id))
    if (trackIds.length >= (j.num_total_results ?? 0)) break
    await new Promise((res) => setTimeout(res, 200))
  }
  playlists.push({
    id: p.id,
    name: p.name,
    description: p.description || null,
    imageUrl: p.image_url || null,
    plays: p.play_count ?? 0,
    likes: p.upvote_count ?? 0,
    trackIds,
    playlistUrl: `https://suno.com/playlist/${p.id}`,
  })
  process.stdout.write(`\rplaylists ${playlists.length}/${profile.playlists.length}`)
}
console.log()

const catalog = {
  _source: 'suno-profile-api (public, unauthenticated)',
  _script: 'scripts/music/scrape-suno-profile.mjs',
  scrapedAt: new Date().toISOString(),
  handle,
  profileUrl: `https://suno.com/@${handle}`,
  stats: {
    totalClips: profile.num_total_clips,
    totalPlays: profile.stats?.play_count__sum ?? null,
    totalLikes: profile.stats?.upvote_count__sum ?? null,
    followers: profile.stats?.followers_count ?? null,
    following: profile.stats?.following_count ?? null,
  },
  personas: (profile.personas || []).map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description || null,
    imageUrl: p.image_s3_id || null,
    rootClipId: p.root_clip_id || null,
  })),
  playlists,
  tracks,
}

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(catalog, null, 2))
console.log(
  `wrote ${outPath}: ${tracks.length} tracks, ${playlists.length} playlists, ${catalog.personas.length} personas`,
)
