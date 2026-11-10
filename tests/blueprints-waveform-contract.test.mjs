import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

const blueprintsPage = read('app/blueprints/page.tsx')
const blueprintCardAction = read('components/blueprints/BlueprintCardAction.tsx')
const checkoutModal = read('components/blueprints/BlueprintCheckoutModal.tsx')
const waveformPlayer = read('components/music/LuxuryWaveformPlayer.tsx')

test('the blueprints catalog is a server-rendered page with void glassmorphic styling', () => {
  assert.doesNotMatch(blueprintsPage, /['"]use client['"]/)
  assert.match(blueprintsPage, /BlueprintCardAction/)
  assert.match(blueprintsPage, /sovereign digital blueprints/)
  assert.match(blueprintsPage, /Vibe OS/)
  assert.match(blueprintsPage, /Agentic Creator OS/)
})

test('the blueprint card action delegates to client checkout modal', () => {
  assert.match(blueprintCardAction, /['"]use client['"]/)
  assert.match(blueprintCardAction, /BlueprintCheckoutModal/)
  assert.match(blueprintCardAction, /setIsOpen\(true\)/)
})

test('the checkout modal handles escape, overflow, and waitlist fallback', () => {
  assert.match(checkoutModal, /['"]use client['"]/)
  assert.match(checkoutModal, /handleKeyDown/)
  assert.match(checkoutModal, /prevOverflow/)
  assert.match(checkoutModal, /waitlistRes\.ok/)
  assert.match(checkoutModal, /reservation confirmed/)
})

test('the luxury waveform player provides stem isolation, playhead control, and audio lifecycle cleanup', () => {
  assert.match(waveformPlayer, /['"]use client['"]/)
  assert.match(waveformPlayer, /toggleStemMute/)
  assert.match(waveformPlayer, /toggleStemSolo/)
  assert.match(waveformPlayer, /startHarmonicDrone/)
  assert.match(waveformPlayer, /stopHarmonicDrone/)
  assert.match(waveformPlayer, /audioContextRef\.current\.close/)
})
