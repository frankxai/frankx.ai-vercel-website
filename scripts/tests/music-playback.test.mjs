import test from 'node:test'
import assert from 'node:assert/strict'
import { safeMediaUrl, spotifyAlbumEmbed, suggestTracks, routeMusicSuggestion } from '../../lib/music-playback.ts'

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
  assert.equal(routeMusicSuggestion('/library/some-book'), 'instrumental focus')
  assert.equal(routeMusicSuggestion('/products/something'), undefined)
})
