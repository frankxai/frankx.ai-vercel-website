import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8')
}

test('a disagreeing music header is not rendered', () => {
  const inventory = JSON.parse(read('data/inventories/frankx/music.json'))
  assert.equal(Array.isArray(inventory.tracks), true)
  const listed = inventory.tracks.length
  const header = inventory._count
  assert.equal(typeof header, 'number')
  if (header === listed) return

  const music = read('lib/music.ts')
  assert.equal(
    music.includes('totalTracks: musicInventory._count'),
    false,
    'getMusicStats still publishes the disagreeing header',
  )
  assert.match(
    music,
    /_count === listed|musicInventory\._count === tracks\.length/,
    'getMusicStats must compare the header with the track list before publishing a total',
  )

  const admin = read('app/admin/music/MusicDashboardClient.tsx')
  assert.equal(admin.includes('Total on Suno'), false)
  assert.equal(admin.includes('total on Suno'), false)
  assert.equal(admin.includes('stats.totalTracks'), false)

  const vision = read('lib/vision-context.ts')
  assert.equal(vision.includes('musicPublishedCount: Number(musicData._count)'), false)
  assert.match(vision, /Number\(musicData\._count\) === musicTracks\.length/)

  const canvas = read('components/vision/VisionBoardCanvas.tsx')
  assert.equal(canvas.includes('musicPublishedCount'), false)
  assert.equal(canvas.includes('musicEstimatedCount'), false)

  for (const rel of ['app/music/page.tsx', 'components/music/MusicShell.tsx', 'app/music-os/page.tsx']) {
    assert.equal(read(rel).includes('totalTracks'), false, rel)
  }

  const artistPage = read('app/artists/[slug]/page.tsx')
  assert.match(artistPage, /client\.isOwner\)[\s\S]{0,80}notFound\(\)/)
})
