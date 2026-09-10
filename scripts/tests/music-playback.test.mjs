import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { homepageFeaturedRelease } from '../../data/homepage-featured-release.ts'
import { safeMediaUrl, spotifyAlbumEmbed, suggestTracks, routeMusicSuggestion, buildPlaybackCatalog, ownedPlaybackUrl, verifiedPlaybackUrl } from '../../lib/music-playback.ts'

test('Spotify accepts canonical album URLs only and media rejects active schemes or credentials', () => {
  const id = 'A'.repeat(22)
  assert.equal(spotifyAlbumEmbed(`https://open.spotify.com/album/${id}?si=ignored`), `https://open.spotify.com/embed/album/${id}?theme=0`)
  for (const url of [`https://open.spotify.com.evil.example/album/${id}`, `https://open.spotify.com/track/${id}`, `https://user@open.spotify.com/album/${id}`, 'javascript:alert(1)']) assert.equal(spotifyAlbumEmbed(url), undefined)
  assert.equal(safeMediaUrl('https://example.com/audio.mp3'), 'https://example.com/audio.mp3')
  assert.equal(safeMediaUrl('javascript:alert(1)'), undefined)
  assert.equal(safeMediaUrl('https://user:password@example.com/audio.mp3'), undefined)
})
test('recommendations abstain on unknown moods and focus requests exclude untagged vocal tracks', () => {
  const tracks = [
    { id: 'one', title: 'Focus anthem', sunoId: '', genre: ['vocal pop'], mood: [] },
    { id: 'two', title: 'Piano', sunoId: '', genre: ['instrumental'], mood: [] },
  ]
  const copy = structuredClone(tracks)
  assert.deepEqual(suggestTracks(tracks, 'music for reading').map(t => t.id), ['two'])
  assert.deepEqual(suggestTracks(tracks, 'polyrhythmic industrial'), [])
  assert.deepEqual(tracks, copy)
  assert.equal(routeMusicSuggestion('/library/some-book'), 'focus')
  assert.equal(routeMusicSuggestion('/starlight-intelligence-system'), 'starlight')
  assert.equal(routeMusicSuggestion('/design-lab/arcanea/gates'), 'arcanea')
  assert.equal(routeMusicSuggestion('/design-lab/arcanea-other'), undefined)
  assert.equal(routeMusicSuggestion('/products/something'), undefined)
})

test('reading suggestions exclude mixed vocal arrangements while exact title requests remain available', () => {
  const tracks = [
    { id: 'choir', title: 'Golden Frequency Choir', sunoId: '', genre: ['male vocals in verses', 'wordless choirs', 'solo piano'], mood: [] },
    { id: 'piano', title: 'Evening piano', sunoId: '', genre: ['instrumental', 'no vocals'], mood: [] },
    { id: 'unknown', title: 'Instrumental feelings', sunoId: '', genre: [], mood: [] },
  ]
  assert.deepEqual(suggestTracks(tracks, 'music for reading').map(track => track.id), ['piano'])
  assert.equal(suggestTracks(tracks, 'Golden Frequency Choir')[0]?.id, 'choir')
})

const sourceId = '9ff8a563-4ebf-4481-85c1-9f445cfce9e1'
const sourceUrl = `https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com/music/${sourceId}/${sourceId}.mp3`
const registered = { sunoId: sourceId, inventoryId: 'archived-song', title: 'Archived song', status: 'published', genre: ['piano'], assetRefs: { audioUrl: sourceUrl } }
const verified = { sunoId: sourceId, audioUrl: sourceUrl, sha256: 'a'.repeat(64), bytes: 1024, durationSeconds: 65, codec: 'mp3', rangeVerified: true, decodeVerified: true, verifiedAt: '2026-09-09T21:00:00Z' }

test('inline playback accepts only a verified owned media path', () => {
  assert.equal(ownedPlaybackUrl(sourceUrl), sourceUrl)
  assert.equal(ownedPlaybackUrl(`https://cdn1.suno.ai/${sourceId}.mp3`), undefined)
  assert.equal(ownedPlaybackUrl(homepageFeaturedRelease.audioUrl), undefined)
})

test('archive playback requires matching identity, published registry state and decoder/range evidence', () => {
  assert.equal(verifiedPlaybackUrl(registered, verified), sourceUrl)
  assert.equal(verifiedPlaybackUrl(registered), undefined)
  assert.equal(verifiedPlaybackUrl({ ...registered, status: 'draft' }, verified), undefined)
  for (const patch of [{ sunoId: 'other' }, { decodeVerified: false }, { rangeVerified: false }, { sha256: '' }, { durationSeconds: Infinity }, { bytes: 0 }, { verifiedAt: 'unknown' }]) {
    assert.equal(verifiedPlaybackUrl(registered, { ...verified, ...patch }), undefined)
  }
  const remote = `https://cdn1.suno.ai/${sourceId}.mp3`
  assert.equal(verifiedPlaybackUrl({ ...registered, assetRefs: { audioUrl: remote } }, { ...verified, audioUrl: remote }), undefined)
})

test('catalog keeps unverified public tracks external and includes verified archived tracks without leaking receipts', () => {
  const externalId = 'e7d082d3-8ecd-4fdb-a8fa-582026554153'
  const entries = [{ id: 'star-show-us', title: 'Star Show Us', sunoId: externalId, status: 'published', genre: [] }]
  const result = buildPlaybackCatalog(entries, [registered], [verified])
  assert.equal(result[0].streamUrl, sourceUrl)
  assert.equal(result[0].duration, '1:05')
  assert.equal(result[1].sunoId, externalId)
  assert.equal(result[1].streamUrl, undefined)
  assert.equal('sha256' in result[0], false)
  assert.equal(entries.length, 1)
  assert.equal(buildPlaybackCatalog([], [registered], []).length, 0)
})

test('checked-in catalog exposes every verified export and keeps missing screenshot tracks external', () => {
  const readData = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'))
  const inventory = readData('../../data/inventories/frankx/music.json')
  const archive = readData('../../data/music-asset-registry.json')
  const proof = readData('../../data/music-playback-sources.json')
  const catalog = buildPlaybackCatalog([...inventory.tracks, { ...homepageFeaturedRelease, status: 'published' }], archive.tracks, proof.tracks)
  const playable = catalog.filter(track => track.streamUrl)
  assert.ok(playable.length > 0)
  assert.equal(playable.length, proof.tracks.length)
  assert.ok(catalog.slice(0, 6).every(track => track.streamUrl))
  assert.ok(playable.every(track => typeof track.id === 'string' && track.id.length > 0))
  assert.equal(suggestTracks(catalog, 'Open the Arc')[0]?.sunoId, '7d1195a9-13da-492c-9665-e9d640e0be0a')
  assert.equal(suggestTracks(catalog, 'Star Show Us')[0]?.sunoId, homepageFeaturedRelease.sunoId)
  assert.ok(!suggestTracks(catalog, 'music for reading').some(track => track.id === 'golden-frequency-choir'))
  for (const rendition of proof.tracks) {
    assert.equal(playable.find(track => track.sunoId === rendition.sunoId)?.streamUrl, rendition.audioUrl)
  }
  for (const id of ['e7d082d3-8ecd-4fdb-a8fa-582026554153', '7d1195a9-13da-492c-9665-e9d640e0be0a']) {
    const track = catalog.find(candidate => candidate.sunoId === id)
    assert.ok(track, 'the reported track remains discoverable')
    if (!proof.tracks.some(rendition => rendition.sunoId === id)) assert.equal(track.streamUrl, undefined)
  }
})
