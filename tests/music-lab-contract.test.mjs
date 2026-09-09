import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

const hubPage = read('app/music-lab/page.tsx')
const hubShell = read('components/music-lab/MusicLabShell.tsx')
const violinPage = read('app/music-lab/violin/page.tsx')
const violinComponent = read('components/music-lab/violin/DigitalViolin.tsx')
const violinEngine = read('lib/music-lab/violin/engine.ts')
const violinLessons = read('data/music-lab/violin-lessons.ts')
const guitarTabs = read('components/music-lab/guitar/GuidedGuitarTabs.tsx')
const concertPiano = read('app/music-lab/piano/page.tsx')
const guidedPiano = read('components/music/InteractivePiano.tsx')
const sitemap = read('app/sitemap.ts')

test('the Music Lab is a server-rendered task hub with every practice lane', () => {
  assert.doesNotMatch(hubPage, /['"]use client['"]/)
  assert.match(hubPage, /MusicLabShell/)
  assert.match(hubPage, /application\/ld\+json/)

  for (const label of ['Play', 'Guided notes', 'Perform']) assert.match(hubShell, new RegExp(label))
  for (const route of [
    '/music-lab/violin',
    '/music-lab/piano',
    '/music-lab/piano/songs',
    '/music-lab/guitar-tabs',
    '/music-lab/drums',
    '/music-lab/games/rhythm-duel',
  ]) {
    assert.match(hubShell, new RegExp(route.replaceAll('/', '\\/')))
  }
  assert.match(hubShell, /No account/)
  assert.match(hubShell, /does not use your microphone or upload a recording/i)
})

test('the violin exposes four strings, first position, bow expression, guidance, and performance replay', () => {
  for (const string of ['G', 'D', 'A', 'E']) {
    assert.match(violinLessons, new RegExp(`positionId: '${string}-[0-4]'`))
  }
  for (const mode of ['play', 'guided', 'perform']) assert.match(violinComponent, new RegExp(`'${mode}'`))
  for (const contract of [
    /setPointerCapture/,
    /event\.pressure/,
    /setExpression/,
    /Start take/,
    /Replay/,
    /aria-keyshortcuts/,
    /visibilitychange/,
  ]) assert.match(violinComponent, contract)

  assert.match(violinEngine, /new AudioContext\(\{ latencyHint: 'interactive' \}\)/)
  assert.match(violinEngine, /createDynamicsCompressor/)
  assert.match(violinEngine, /createConvolver/)
  assert.match(violinEngine, /createPeriodicWave/)
  assert.doesNotMatch(violinEngine, /sampleRate:\s*44100/)
  assert.match(violinPage, /SoftwareApplication/)
})

test('guided guitar renders real six-string tabs with adjustable reference playback', () => {
  for (const string of ["'e'", "'B'", "'G'", "'D'", "'A'", "'E'"]) {
    assert.match(guitarTabs, new RegExp(`id: ${string}`))
  }
  assert.match(guitarTabs, /Play phrase/)
  assert.match(guitarTabs, /Tempo/)
  assert.match(guitarTabs, /fret/)
  assert.match(guitarTabs, /new AudioContext\(\{ latencyHint: 'interactive' \}\)/)
  assert.match(guitarTabs, /No microphone, recording, or upload is used/)
})

test('piano paths keep sampled audio, a fallback voice, and responsive keyboard controls', () => {
  assert.match(concertPiano, /tonejs\.github\.io\/audio\/salamander/)
  assert.match(concertPiano, /playSynth/)
  assert.match(concertPiano, /latencyHint: 'interactive'/)
  assert.match(concertPiano, /overflow-x-auto/)
  assert.match(concertPiano, /min-w-\[720px\]/)
  assert.match(concertPiano, /Guided piano/)

  assert.match(guidedPiano, /GUIDED_PIANO_SAMPLES/)
  assert.match(guidedPiano, /sampleBuffersRef/)
  assert.match(guidedPiano, /oscillator voice remains available/i)
})

test('the sitemap publishes the new instrument and guided routes', () => {
  for (const route of [
    '/music-lab/violin',
    '/music-lab/piano',
    '/music-lab/piano/songs',
    '/music-lab/guitar-tabs',
    '/music-lab/drums',
    '/music-lab/games/rhythm-duel',
  ]) {
    assert.match(sitemap, new RegExp(route.replaceAll('/', '\\/')))
  }
})
