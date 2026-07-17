#!/usr/bin/env node
// Regenerates data/inventories/frankx/music.json (the site's curated track
// inventory) from data/music/suno-catalog.json (full profile scrape).
// Old inventory ids are preserved by sunoId so albums.json trackIds stay valid.
// Usage: node scripts/music/build-music-inventory.mjs

import fs from 'node:fs'

const catalog = JSON.parse(fs.readFileSync('data/music/suno-catalog.json', 'utf8'))
const oldInventory = JSON.parse(fs.readFileSync('data/inventories/frankx/music.json', 'utf8'))
const albums = JSON.parse(fs.readFileSync('data/albums.json', 'utf8'))

const oldIdBySunoId = new Map(oldInventory.tracks.map((t) => [t.sunoId, t.id]))
const albumSunoIds = new Set(
  albums.albums
    .flatMap((a) => a.trackIds)
    .map((id) => oldInventory.tracks.find((t) => t.id === id)?.sunoId)
    .filter(Boolean),
)

const playlistNameByTrackId = new Map()
for (const p of catalog.playlists) {
  for (const id of p.trackIds) {
    if (!playlistNameByTrackId.has(id)) playlistNameByTrackId.set(id, p.name)
  }
}

const byPlays = [...catalog.tracks].sort((a, b) => b.plays - a.plays)
const byLikes = [...catalog.tracks].sort((a, b) => b.likes - a.likes)
const byDate = [...catalog.tracks].sort(
  (a, b) => new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0),
)

const selected = new Map()
const add = (t) => selected.set(t.id, t)
byPlays.slice(0, 120).forEach(add)
byLikes.slice(0, 60).forEach(add)
byDate.slice(0, 40).forEach(add)
catalog.tracks.filter((t) => t.pinned).forEach(add)
catalog.tracks.filter((t) => playlistNameByTrackId.has(t.id)).forEach(add)
catalog.tracks.filter((t) => albumSunoIds.has(t.id)).forEach(add)

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60) || 'track'

const usedIds = new Set()
const trackId = (t) => {
  const preserved = oldIdBySunoId.get(t.id)
  if (preserved && !usedIds.has(preserved)) return preserved
  let slug = slugify(t.title)
  if (usedIds.has(slug)) slug = `${slug}-${t.id.slice(0, 8)}`
  return slug
}

const formatDuration = (secs) => {
  if (!secs) return undefined
  const m = Math.floor(secs / 60)
  const s = Math.round(secs % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

const parseGenres = (styleTags) =>
  styleTags
    ? styleTags
        .split(',')
        .map((g) => g.trim().toLowerCase())
        .filter(Boolean)
        .slice(0, 4)
    : []

const top8 = new Set(byPlays.slice(0, 8).map((t) => t.id))

const tracks = [...selected.values()]
  .sort((a, b) => b.plays - a.plays)
  .map((t) => {
    const id = trackId(t)
    usedIds.add(id)
    const genre = parseGenres(t.styleTags)
    const playlist = playlistNameByTrackId.get(t.id)
    const section = t.pinned || top8.has(t.id) ? 'featured' : undefined
    return {
      id,
      type: 'music',
      title: t.title,
      brand: 'frankx',
      status: 'published',
      tags: [...(section ? ['featured'] : []), ...genre.map((g) => g.replace(/\s+/g, '-'))],
      platform: 'suno',
      sunoId: t.id,
      sunoUrl: t.sunoUrl,
      ...(formatDuration(t.duration) ? { duration: formatDuration(t.duration) } : {}),
      genre,
      plays: t.plays,
      likes: t.likes,
      ...(section ? { section } : {}),
      ...(playlist ? { playlist } : {}),
      ...(t.imageUrl ? { imageUrl: t.imageUrl } : {}),
      ...(t.createdAt ? { createdAt: t.createdAt } : {}),
    }
  })

const inventory = {
  _description:
    'FrankX curated Suno track inventory — generated from data/music/suno-catalog.json by scripts/music/build-music-inventory.mjs. Do not hand-edit tracks; rerun the builder.',
  _sunoProfileUrl: catalog.profileUrl,
  _profileStats: {
    followers: catalog.stats.followers,
    following: catalog.stats.following,
    totalPlays: catalog.stats.totalPlays,
    totalLikes: catalog.stats.totalLikes,
    bio: oldInventory._profileStats.bio,
    styles: oldInventory._profileStats.styles,
  },
  _lastUpdated: catalog.scrapedAt.slice(0, 10),
  _count: catalog.stats.totalClips,
  _indexedCount: tracks.length,
  _playlists: catalog.playlists.map((p) => ({
    name: p.name,
    songs: p.trackIds.length,
    url: p.playlistUrl,
    imageUrl: p.imageUrl,
    plays: p.plays,
  })),
  _personas: catalog.personas.map((p) => p.name),
  tracks,
}

fs.writeFileSync('data/inventories/frankx/music.json', JSON.stringify(inventory, null, 2) + '\n')
console.log(
  `inventory: ${tracks.length} tracks indexed of ${catalog.stats.totalClips} published, ` +
    `${inventory._playlists.length} playlists, ${inventory._personas.length} personas`,
)

const missing = albums.albums.flatMap((a) =>
  a.trackIds.filter((id) => !tracks.some((t) => t.id === id)).map((id) => `${a.id}:${id}`),
)
if (missing.length) console.warn('album trackIds not in inventory:', missing.join(', '))
