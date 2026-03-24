'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Pad Definitions ────────────────────────────────────────────────

interface PadDef {
  id: number
  name: string
  shortName: string
  color: string
  glow: string
  text: string
  ring: string
  key: string
}

const PADS: PadDef[] = [
  // Row 1
  { id: 0,  name: 'Kick',      shortName: 'KICK',   color: 'from-red-500/20 to-red-700/10',      glow: 'rgba(239,68,68,0.45)',    text: 'text-red-300',    ring: 'ring-red-500/40',    key: 'Q' },
  { id: 1,  name: 'Snare',     shortName: 'SNARE',  color: 'from-blue-500/20 to-blue-700/10',    glow: 'rgba(59,130,246,0.45)',   text: 'text-blue-300',   ring: 'ring-blue-500/40',   key: 'W' },
  { id: 2,  name: 'Closed HH', shortName: 'CL HH',  color: 'from-cyan-500/20 to-cyan-700/10',    glow: 'rgba(34,211,238,0.45)',   text: 'text-cyan-300',   ring: 'ring-cyan-500/40',   key: 'E' },
  { id: 3,  name: 'Open HH',   shortName: 'OP HH',  color: 'from-teal-500/20 to-teal-700/10',    glow: 'rgba(20,184,166,0.45)',   text: 'text-teal-300',   ring: 'ring-teal-500/40',   key: 'R' },
  // Row 2
  { id: 4,  name: 'Clap',      shortName: 'CLAP',   color: 'from-violet-500/20 to-violet-700/10', glow: 'rgba(139,92,246,0.45)',   text: 'text-violet-300', ring: 'ring-violet-500/40', key: 'A' },
  { id: 5,  name: 'Rim',       shortName: 'RIM',    color: 'from-pink-500/20 to-pink-700/10',    glow: 'rgba(236,72,153,0.45)',   text: 'text-pink-300',   ring: 'ring-pink-500/40',   key: 'S' },
  { id: 6,  name: 'Low Tom',   shortName: 'LO TOM', color: 'from-orange-500/20 to-orange-700/10', glow: 'rgba(249,115,22,0.45)',   text: 'text-orange-300', ring: 'ring-orange-500/40', key: 'D' },
  { id: 7,  name: 'Mid Tom',   shortName: 'MD TOM', color: 'from-amber-500/20 to-amber-700/10',  glow: 'rgba(245,158,11,0.45)',   text: 'text-amber-300',  ring: 'ring-amber-500/40',  key: 'F' },
  // Row 3
  { id: 8,  name: 'High Tom',  shortName: 'HI TOM', color: 'from-yellow-500/20 to-yellow-700/10', glow: 'rgba(234,179,8,0.45)',    text: 'text-yellow-300', ring: 'ring-yellow-500/40', key: 'Z' },
  { id: 9,  name: 'Crash',     shortName: 'CRASH',  color: 'from-emerald-500/20 to-emerald-700/10', glow: 'rgba(16,185,129,0.45)', text: 'text-emerald-300', ring: 'ring-emerald-500/40', key: 'X' },
  { id: 10, name: 'Ride',      shortName: 'RIDE',   color: 'from-sky-500/20 to-sky-700/10',      glow: 'rgba(14,165,233,0.45)',   text: 'text-sky-300',    ring: 'ring-sky-500/40',    key: 'C' },
  { id: 11, name: 'Cowbell',   shortName: 'CBELL',  color: 'from-lime-500/20 to-lime-700/10',    glow: 'rgba(132,204,22,0.45)',   text: 'text-lime-300',   ring: 'ring-lime-500/40',   key: 'V' },
  // Row 4
  { id: 12, name: 'Shaker',    shortName: 'SHAKE',  color: 'from-fuchsia-500/20 to-fuchsia-700/10', glow: 'rgba(217,70,239,0.45)', text: 'text-fuchsia-300', ring: 'ring-fuchsia-500/40', key: 'B' },
  { id: 13, name: 'Conga',     shortName: 'CONGA',  color: 'from-rose-500/20 to-rose-700/10',    glow: 'rgba(244,63,94,0.45)',    text: 'text-rose-300',   ring: 'ring-rose-500/40',   key: 'N' },
  { id: 14, name: 'Bongo',     shortName: 'BONGO',  color: 'from-indigo-500/20 to-indigo-700/10', glow: 'rgba(99,102,241,0.45)',   text: 'text-indigo-300', ring: 'ring-indigo-500/40', key: 'M' },
  { id: 15, name: 'Tamb',      shortName: 'TAMB',   color: 'from-purple-500/20 to-purple-700/10', glow: 'rgba(168,85,247,0.45)',   text: 'text-purple-300', ring: 'ring-purple-500/40', key: ',' },
]

// Sequencer only shows these 4 core drums
const SEQ_PADS = [0, 1, 2, 4] // Kick, Snare, Closed HH, Clap
const STEPS = 16

// ─── Preset Patterns ────────────────────────────────────────────────

type Pattern = Record<number, boolean[]>

function emptyPattern(): Pattern {
  const p: Pattern = {}
  for (const id of SEQ_PADS) p[id] = Array(STEPS).fill(false)
  return p
}

const PRESETS: { name: string; bpm: number; pattern: Pattern }[] = [
  {
    name: 'Rock',
    bpm: 120,
    pattern: {
      0: [true,false,false,false, true,false,false,false, true,false,false,false, true,false,false,false],
      1: [false,false,false,false, true,false,false,false, false,false,false,false, true,false,false,false],
      2: [true,false,true,false, true,false,true,false, true,false,true,false, true,false,true,false],
      4: [false,false,false,false, false,false,false,false, false,false,false,false, false,false,false,false],
    },
  },
  {
    name: 'Hip Hop',
    bpm: 90,
    pattern: {
      0: [true,false,false,false, false,false,false,true, false,false,true,false, false,false,false,false],
      1: [false,false,false,false, true,false,false,false, false,false,false,false, true,false,false,false],
      2: [true,false,true,false, true,false,true,false, true,false,true,false, true,false,true,false],
      4: [false,false,false,false, true,false,false,false, false,false,false,false, true,false,false,false],
    },
  },
  {
    name: 'House',
    bpm: 128,
    pattern: {
      0: [true,false,false,false, true,false,false,false, true,false,false,false, true,false,false,false],
      1: [false,false,false,false, false,false,false,false, false,false,false,false, false,false,false,false],
      2: [false,false,true,false, false,false,true,false, false,false,true,false, false,false,true,false],
      4: [false,false,false,false, true,false,false,false, false,false,false,false, true,false,false,false],
    },
  },
  {
    name: 'Reggaeton',
    bpm: 95,
    pattern: {
      0: [true,false,false,true, false,false,true,false, false,true,false,false, true,false,false,false],
      1: [false,false,false,false, true,false,false,false, false,false,false,false, true,false,false,false],
      2: [true,false,true,false, true,false,true,false, true,false,true,false, true,false,true,false],
      4: [false,false,false,false, true,false,false,true, false,false,false,false, true,false,false,true],
    },
  },
]

// ─── Drum Sound Engine ──────────────────────────────────────────────
//
// All sounds synthesized with Web Audio API — zero audio files.
// Each sound uses oscillators, noise, and filter envelopes.

class DrumEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private compressor: DynamicsCompressorNode | null = null
  private noiseBuffer: AudioBuffer | null = null

  async init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume()
      return
    }

    this.ctx = new AudioContext({ sampleRate: 44100 })

    // Compressor
    this.compressor = this.ctx.createDynamicsCompressor()
    this.compressor.threshold.value = -10
    this.compressor.knee.value = 6
    this.compressor.ratio.value = 6
    this.compressor.attack.value = 0.002
    this.compressor.release.value = 0.12
    this.compressor.connect(this.ctx.destination)

    // Master gain
    this.master = this.ctx.createGain()
    this.master.gain.value = 0.8
    this.master.connect(this.compressor)

    // Pre-generate noise buffer
    const len = this.ctx.sampleRate * 2
    this.noiseBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate)
    const data = this.noiseBuffer.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
  }

  private noise(): AudioBufferSourceNode {
    const src = this.ctx!.createBufferSource()
    src.buffer = this.noiseBuffer!
    return src
  }

  trigger(padId: number, vel = 0.8) {
    if (!this.ctx || !this.master) return
    switch (padId) {
      case 0:  this.kick(vel); break
      case 1:  this.snare(vel); break
      case 2:  this.closedHH(vel); break
      case 3:  this.openHH(vel); break
      case 4:  this.clap(vel); break
      case 5:  this.rim(vel); break
      case 6:  this.tom(vel, 100); break   // Low Tom
      case 7:  this.tom(vel, 180); break   // Mid Tom
      case 8:  this.tom(vel, 280); break   // High Tom
      case 9:  this.crash(vel); break
      case 10: this.ride(vel); break
      case 11: this.cowbell(vel); break
      case 12: this.shaker(vel); break
      case 13: this.conga(vel); break
      case 14: this.bongo(vel); break
      case 15: this.tambourine(vel); break
    }
  }

  // ── Core Drums ──

  private kick(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    // Body: sine with pitch envelope 150Hz → 50Hz
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(150, now)
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.04)

    // Click: higher sine for attack
    const click = ctx.createOscillator()
    click.type = 'sine'
    click.frequency.setValueAtTime(1200, now)
    click.frequency.exponentialRampToValueAtTime(200, now + 0.01)

    const clickEnv = ctx.createGain()
    clickEnv.gain.setValueAtTime(vel * 0.4, now)
    clickEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.015)

    const bodyEnv = ctx.createGain()
    bodyEnv.gain.setValueAtTime(0, now)
    bodyEnv.gain.linearRampToValueAtTime(vel, now + 0.003)
    bodyEnv.gain.setTargetAtTime(0.001, now + 0.06, 0.12)

    osc.connect(bodyEnv); bodyEnv.connect(this.master!)
    click.connect(clickEnv); clickEnv.connect(this.master!)

    osc.start(now); osc.stop(now + 0.6)
    click.start(now); click.stop(now + 0.03)
  }

  private snare(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    // Tone body
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(200, now)
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.03)

    const toneEnv = ctx.createGain()
    toneEnv.gain.setValueAtTime(vel * 0.7, now)
    toneEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

    // Noise snares
    const nSrc = this.noise()
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'; hp.frequency.value = 2000; hp.Q.value = 0.5

    const noiseEnv = ctx.createGain()
    noiseEnv.gain.setValueAtTime(0, now)
    noiseEnv.gain.linearRampToValueAtTime(vel * 0.6, now + 0.001)
    noiseEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

    osc.connect(toneEnv); toneEnv.connect(this.master!)
    nSrc.connect(hp); hp.connect(noiseEnv); noiseEnv.connect(this.master!)

    osc.start(now); osc.stop(now + 0.2)
    nSrc.start(now); nSrc.stop(now + 0.2)
  }

  private closedHH(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    const nSrc = this.noise()
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'; hp.frequency.value = 7000; hp.Q.value = 1

    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'; bp.frequency.value = 10000; bp.Q.value = 1.5

    const env = ctx.createGain()
    env.gain.setValueAtTime(vel * 0.4, now)
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

    nSrc.connect(hp); hp.connect(bp); bp.connect(env); env.connect(this.master!)
    nSrc.start(now); nSrc.stop(now + 0.08)
  }

  private openHH(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    const nSrc = this.noise()
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'; hp.frequency.value = 6000; hp.Q.value = 0.8

    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'; bp.frequency.value = 9000; bp.Q.value = 1

    const env = ctx.createGain()
    env.gain.setValueAtTime(vel * 0.4, now)
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

    nSrc.connect(hp); hp.connect(bp); bp.connect(env); env.connect(this.master!)
    nSrc.start(now); nSrc.stop(now + 0.4)
  }

  private clap(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    // Multiple noise bursts for clap texture
    for (let i = 0; i < 3; i++) {
      const nSrc = this.noise()
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'; bp.frequency.value = 2500; bp.Q.value = 0.8

      const env = ctx.createGain()
      const offset = i * 0.008
      env.gain.setValueAtTime(0, now + offset)
      env.gain.linearRampToValueAtTime(vel * 0.5, now + offset + 0.001)
      env.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.02)

      nSrc.connect(bp); bp.connect(env); env.connect(this.master!)
      nSrc.start(now + offset); nSrc.stop(now + offset + 0.04)
    }

    // Tail
    const tail = this.noise()
    const tailBp = ctx.createBiquadFilter()
    tailBp.type = 'bandpass'; tailBp.frequency.value = 2500; tailBp.Q.value = 0.6

    const tailEnv = ctx.createGain()
    tailEnv.gain.setValueAtTime(0, now + 0.024)
    tailEnv.gain.linearRampToValueAtTime(vel * 0.4, now + 0.026)
    tailEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.18)

    tail.connect(tailBp); tailBp.connect(tailEnv); tailEnv.connect(this.master!)
    tail.start(now + 0.024); tail.stop(now + 0.25)
  }

  private rim(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    // Two high-pitched sine oscillators for metallic ring
    const o1 = ctx.createOscillator()
    o1.type = 'sine'; o1.frequency.value = 1700
    const o2 = ctx.createOscillator()
    o2.type = 'sine'; o2.frequency.value = 3400

    const env = ctx.createGain()
    env.gain.setValueAtTime(vel * 0.5, now)
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

    const mix = ctx.createGain(); mix.gain.value = 0.5

    o1.connect(env); o2.connect(mix); mix.connect(env); env.connect(this.master!)
    o1.start(now); o1.stop(now + 0.06)
    o2.start(now); o2.stop(now + 0.06)
  }

  private tom(vel: number, baseFreq: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(baseFreq * 1.5, now)
    osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.04)

    const env = ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(vel * 0.8, now + 0.002)
    env.gain.setTargetAtTime(0.001, now + 0.04, 0.1)

    osc.connect(env); env.connect(this.master!)
    osc.start(now); osc.stop(now + 0.5)
  }

  private crash(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    const nSrc = this.noise()
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'; hp.frequency.value = 4000; hp.Q.value = 0.3

    const bp = ctx.createBiquadFilter()
    bp.type = 'peaking'; bp.frequency.value = 8000; bp.Q.value = 1; bp.gain.value = 6

    const env = ctx.createGain()
    env.gain.setValueAtTime(vel * 0.5, now)
    env.gain.setTargetAtTime(0.001, now + 0.1, 0.5)

    nSrc.connect(hp); hp.connect(bp); bp.connect(env); env.connect(this.master!)
    nSrc.start(now); nSrc.stop(now + 2)
  }

  private ride(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    // Metallic tone
    const o1 = ctx.createOscillator()
    o1.type = 'square'; o1.frequency.value = 5200
    const o2 = ctx.createOscillator()
    o2.type = 'square'; o2.frequency.value = 5800

    const toneEnv = ctx.createGain()
    toneEnv.gain.setValueAtTime(vel * 0.12, now)
    toneEnv.gain.setTargetAtTime(0.001, now + 0.05, 0.3)

    // Noise wash
    const nSrc = this.noise()
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'; hp.frequency.value = 8000

    const noiseEnv = ctx.createGain()
    noiseEnv.gain.setValueAtTime(vel * 0.15, now)
    noiseEnv.gain.setTargetAtTime(0.001, now + 0.1, 0.25)

    o1.connect(toneEnv); o2.connect(toneEnv); toneEnv.connect(this.master!)
    nSrc.connect(hp); hp.connect(noiseEnv); noiseEnv.connect(this.master!)

    o1.start(now); o1.stop(now + 1)
    o2.start(now); o2.stop(now + 1)
    nSrc.start(now); nSrc.stop(now + 1)
  }

  private cowbell(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    const o1 = ctx.createOscillator()
    o1.type = 'square'; o1.frequency.value = 587
    const o2 = ctx.createOscillator()
    o2.type = 'square'; o2.frequency.value = 845

    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'; bp.frequency.value = 700; bp.Q.value = 3

    const env = ctx.createGain()
    env.gain.setValueAtTime(vel * 0.45, now)
    env.gain.exponentialRampToValueAtTime(vel * 0.15, now + 0.02)
    env.gain.setTargetAtTime(0.001, now + 0.02, 0.08)

    const mix = ctx.createGain(); mix.gain.value = 0.5
    o1.connect(mix); o2.connect(mix)
    mix.connect(bp); bp.connect(env); env.connect(this.master!)

    o1.start(now); o1.stop(now + 0.4)
    o2.start(now); o2.stop(now + 0.4)
  }

  private shaker(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    const nSrc = this.noise()
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'; hp.frequency.value = 6000; hp.Q.value = 0.5
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'; bp.frequency.value = 9000; bp.Q.value = 1.5

    const env = ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(vel * 0.35, now + 0.002)
    env.gain.linearRampToValueAtTime(vel * 0.1, now + 0.03)
    env.gain.linearRampToValueAtTime(vel * 0.3, now + 0.05)
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

    nSrc.connect(hp); hp.connect(bp); bp.connect(env); env.connect(this.master!)
    nSrc.start(now); nSrc.stop(now + 0.15)
  }

  private conga(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(300, now)
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.03)

    const env = ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(vel * 0.7, now + 0.001)
    env.gain.setTargetAtTime(0.001, now + 0.03, 0.08)

    // Slap noise
    const nSrc = this.noise()
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'; bp.frequency.value = 600; bp.Q.value = 2
    const nEnv = ctx.createGain()
    nEnv.gain.setValueAtTime(vel * 0.25, now)
    nEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.015)

    osc.connect(env); env.connect(this.master!)
    nSrc.connect(bp); bp.connect(nEnv); nEnv.connect(this.master!)

    osc.start(now); osc.stop(now + 0.4)
    nSrc.start(now); nSrc.stop(now + 0.03)
  }

  private bongo(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(450, now)
    osc.frequency.exponentialRampToValueAtTime(250, now + 0.025)

    const env = ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(vel * 0.65, now + 0.001)
    env.gain.setTargetAtTime(0.001, now + 0.02, 0.05)

    const nSrc = this.noise()
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = 2
    const nEnv = ctx.createGain()
    nEnv.gain.setValueAtTime(vel * 0.2, now)
    nEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.02)

    osc.connect(env); env.connect(this.master!)
    nSrc.connect(bp); bp.connect(nEnv); nEnv.connect(this.master!)

    osc.start(now); osc.stop(now + 0.3)
    nSrc.start(now); nSrc.stop(now + 0.04)
  }

  private tambourine(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    // Jingles: multiple short noise bursts
    for (let i = 0; i < 4; i++) {
      const nSrc = this.noise()
      const hp = ctx.createBiquadFilter()
      hp.type = 'highpass'; hp.frequency.value = 7000 + i * 500; hp.Q.value = 1.2

      const env = ctx.createGain()
      const offset = i * 0.004
      env.gain.setValueAtTime(vel * 0.2, now + offset)
      env.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08)

      nSrc.connect(hp); hp.connect(env); env.connect(this.master!)
      nSrc.start(now + offset); nSrc.stop(now + offset + 0.1)
    }

    // Body tap
    const osc = ctx.createOscillator()
    osc.type = 'sine'; osc.frequency.value = 340
    const tapEnv = ctx.createGain()
    tapEnv.gain.setValueAtTime(vel * 0.15, now)
    tapEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.02)
    osc.connect(tapEnv); tapEnv.connect(this.master!)
    osc.start(now); osc.stop(now + 0.04)
  }

  destroy() {
    if (this.ctx) { try { this.ctx.close() } catch { /* ok */ } }
    this.ctx = null
  }
}

// ─── Page ───────────────────────────────────────────────────────────

export default function DrumMachinePage() {
  const engineRef = useRef<DrumEngine | null>(null)
  const [activePads, setActivePads] = useState<Set<number>>(new Set())
  const [playing, setPlaying] = useState(false)
  const [bpm, setBpm] = useState(120)
  const [currentStep, setCurrentStep] = useState(-1)
  const [pattern, setPattern] = useState<Pattern>(emptyPattern)
  const [activePreset, setActivePreset] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const stepRef = useRef(-1)
  const patternRef = useRef(pattern)
  patternRef.current = pattern

  const getEngine = useCallback(async () => {
    if (!engineRef.current) {
      engineRef.current = new DrumEngine()
    }
    await engineRef.current.init()
    return engineRef.current
  }, [])

  useEffect(() => () => { engineRef.current?.destroy() }, [])

  const triggerPad = useCallback(async (id: number) => {
    const eng = await getEngine()
    eng.trigger(id, 0.8)
    setActivePads(prev => new Set(prev).add(id))
    setTimeout(() => {
      setActivePads(prev => { const n = new Set(prev); n.delete(id); return n })
    }, 120)
  }, [getEngine])

  // Keyboard mapping
  useEffect(() => {
    const keyMap: Record<string, number> = {}
    for (const pad of PADS) keyMap[pad.key.toLowerCase()] = pad.id

    function down(e: KeyboardEvent) {
      if (e.repeat || e.metaKey || e.ctrlKey) return
      const k = e.key.toLowerCase()
      if (k in keyMap) { e.preventDefault(); triggerPad(keyMap[k]) }
      if (k === ' ') { e.preventDefault() } // space handled in onKeyUp for toggle
    }
    function up(e: KeyboardEvent) {
      if (e.key === ' ') { e.preventDefault(); togglePlay() }
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerPad])

  // Sequencer playback
  const stopSequencer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    stepRef.current = -1
    setCurrentStep(-1)
    setPlaying(false)
  }, [])

  const startSequencer = useCallback(async () => {
    const eng = await getEngine()
    setPlaying(true)
    stepRef.current = -1

    const stepMs = (60 / bpm / 4) * 1000 // 16th note
    timerRef.current = setInterval(() => {
      stepRef.current = (stepRef.current + 1) % STEPS
      const step = stepRef.current
      setCurrentStep(step)

      const p = patternRef.current
      for (const padId of SEQ_PADS) {
        if (p[padId]?.[step]) {
          eng.trigger(padId, 0.8)
          setActivePads(prev => new Set(prev).add(padId))
          setTimeout(() => {
            setActivePads(prev => { const n = new Set(prev); n.delete(padId); return n })
          }, 80)
        }
      }
    }, stepMs)
  }, [bpm, getEngine])

  // Restart sequencer when BPM changes while playing
  useEffect(() => {
    if (playing) {
      stopSequencer()
      startSequencer()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpm])

  // Clean up on unmount
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  const togglePlay = useCallback(() => {
    if (playing) stopSequencer()
    else startSequencer()
  }, [playing, startSequencer, stopSequencer])

  const toggleCell = (padId: number, step: number) => {
    setPattern(prev => {
      const row = [...(prev[padId] || Array(STEPS).fill(false))]
      row[step] = !row[step]
      return { ...prev, [padId]: row }
    })
    setActivePreset(null)
  }

  const loadPreset = (idx: number) => {
    const preset = PRESETS[idx]
    setPattern({ ...preset.pattern })
    setBpm(preset.bpm)
    setActivePreset(idx)
  }

  const clearPattern = () => {
    setPattern(emptyPattern())
    setActivePreset(null)
  }

  const seqPadNames = ['KICK', 'SNARE', 'HH', 'CLAP']
  const seqPadColors = ['text-red-400', 'text-blue-400', 'text-cyan-400', 'text-violet-400']
  const seqCellActive = ['bg-red-500/50', 'bg-blue-500/50', 'bg-cyan-500/50', 'bg-violet-500/50']

  return (
    <div className="bg-[#060810] min-h-[100dvh] flex flex-col overflow-x-hidden select-none">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-[600px] h-[600px] bg-red-500/[0.015] rounded-full blur-[200px] top-0 right-0" />
        <div className="absolute w-[400px] h-[400px] bg-violet-500/[0.02] rounded-full blur-[150px] bottom-0 left-0" />
        <div className="absolute w-[300px] h-[300px] bg-cyan-500/[0.015] rounded-full blur-[128px] top-1/3 left-1/2" />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-5 md:pt-7 pb-2 px-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/20 mb-1">FrankX Music Lab</p>
        <h1 className="text-2xl md:text-3xl font-bold text-white/80 tracking-tight">Drum Machine</h1>
        <p className="text-white/20 text-[10px] tracking-[0.2em] uppercase mt-1">
          16 Pads &middot; Step Sequencer &middot; Web Audio
        </p>
      </header>

      {/* Pad Grid */}
      <div className="relative z-10 flex justify-center px-3 md:px-8 py-2">
        <div className="w-full max-w-[560px] aspect-square grid grid-cols-4 gap-2 md:gap-3">
          {PADS.map(pad => {
            const active = activePads.has(pad.id)
            return (
              <button
                key={pad.id}
                onPointerDown={e => { e.preventDefault(); triggerPad(pad.id) }}
                className={`relative rounded-xl border outline-none transition-all duration-75 ${
                  active
                    ? `bg-gradient-to-br ${pad.color} border-white/15 scale-[0.96] ${pad.ring} ring-2`
                    : `bg-gradient-to-br ${pad.color} border-white/[0.06] hover:border-white/10 active:scale-[0.96]`
                }`}
                style={{
                  boxShadow: active
                    ? `0 0 30px ${pad.glow}, 0 0 60px ${pad.glow.replace('0.45', '0.15')}, inset 0 1px 0 rgba(255,255,255,0.06)`
                    : 'inset 0 1px 0 rgba(255,255,255,0.03), 0 2px 8px rgba(0,0,0,0.3)',
                  touchAction: 'none',
                }}
              >
                {active && (
                  <span
                    className="absolute inset-0 rounded-xl pointer-events-none animate-[padPulse_0.25s_ease-out]"
                    style={{ background: `radial-gradient(circle, ${pad.glow.replace('0.45', '0.2')}, transparent 70%)` }}
                  />
                )}
                <span className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className={`text-[11px] md:text-sm font-semibold tracking-wide ${pad.text} ${active ? 'opacity-90' : 'opacity-50'}`}>
                    {pad.shortName}
                  </span>
                  <span className="text-white/15 text-[8px] md:text-[9px] font-mono mt-0.5 hidden md:block">
                    {pad.key}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Sequencer */}
      <div className="relative z-10 px-3 md:px-8 py-3 max-w-[700px] mx-auto w-full">
        {/* Controls */}
        <div className="flex items-center justify-between mb-3 gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${
                playing
                  ? 'bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30'
                  : 'bg-emerald-500/15 border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/25'
              }`}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="2" width="4" height="10" rx="1" /><rect x="8" y="2" width="4" height="10" rx="1" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 1.5v11l9.5-5.5z" /></svg>
              )}
            </button>
            <button
              onClick={clearPattern}
              className="h-9 px-3 rounded-lg border border-white/[0.06] text-white/30 text-[10px] tracking-wider uppercase hover:text-white/50 hover:border-white/10 transition-all"
            >
              Clear
            </button>
          </div>

          {/* BPM */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBpm(b => Math.max(60, b - 5))}
              className="w-7 h-7 rounded-md border border-white/[0.06] text-white/30 flex items-center justify-center hover:text-white/50 hover:border-white/10 transition-all text-sm"
            >
              -
            </button>
            <span className="text-white/40 text-xs font-mono w-14 text-center">{bpm} BPM</span>
            <button
              onClick={() => setBpm(b => Math.min(180, b + 5))}
              className="w-7 h-7 rounded-md border border-white/[0.06] text-white/30 flex items-center justify-center hover:text-white/50 hover:border-white/10 transition-all text-sm"
            >
              +
            </button>
          </div>
        </div>

        {/* Presets */}
        <div className="flex gap-1.5 mb-3">
          {PRESETS.map((preset, i) => (
            <button
              key={preset.name}
              onClick={() => loadPreset(i)}
              className={`h-7 px-3 rounded-md text-[10px] tracking-wider uppercase border transition-all ${
                activePreset === i
                  ? 'bg-white/10 border-white/15 text-white/60'
                  : 'border-white/[0.06] text-white/20 hover:text-white/40 hover:border-white/10'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Step Grid */}
        <div className="space-y-1">
          {SEQ_PADS.map((padId, rowIdx) => (
            <div key={padId} className="flex items-center gap-1.5">
              <span className={`w-10 text-[9px] font-mono tracking-wider ${seqPadColors[rowIdx]} opacity-50 shrink-0 text-right pr-1`}>
                {seqPadNames[rowIdx]}
              </span>
              <div className="flex gap-[3px] flex-1">
                {Array.from({ length: STEPS }, (_, step) => {
                  const on = pattern[padId]?.[step] ?? false
                  const isCurrent = step === currentStep && playing
                  const isBeat = step % 4 === 0
                  return (
                    <button
                      key={step}
                      onClick={() => toggleCell(padId, step)}
                      className={`flex-1 h-6 md:h-7 rounded-[4px] border transition-all duration-75 ${
                        on
                          ? `${seqCellActive[rowIdx]} border-white/15`
                          : isBeat
                            ? 'bg-white/[0.04] border-white/[0.06]'
                            : 'bg-white/[0.02] border-white/[0.04]'
                      } ${isCurrent ? 'ring-1 ring-white/30 brightness-150' : ''}`}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Step markers */}
        <div className="flex mt-1 ml-[46px] gap-[3px]">
          {Array.from({ length: STEPS }, (_, i) => (
            <span key={i} className={`flex-1 text-center text-[7px] font-mono ${
              i % 4 === 0 ? 'text-white/15' : 'text-transparent'
            }`}>
              {i % 4 === 0 ? i / 4 + 1 : ''}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-4 md:pb-6 mt-auto space-y-1.5">
        <p className="text-white/8 text-[9px] tracking-wide hidden md:block">
          Q W E R &middot; A S D F &middot; Z X C V &middot; B N M , &nbsp;&nbsp; SPACE = play/stop
        </p>
        <div className="flex items-center justify-center gap-3 text-[11px]">
          <Link href="/music-lab" className="text-cyan-300/18 hover:text-cyan-300/35 transition-colors">
            Music Lab
          </Link>
          <span className="text-white/8">&middot;</span>
          <Link href="/music-lab/piano" className="text-cyan-300/18 hover:text-cyan-300/35 transition-colors">
            Piano
          </Link>
          <span className="text-white/8">&middot;</span>
          <Link href="/music" className="text-cyan-300/18 hover:text-cyan-300/35 transition-colors">
            Music
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes padPulse {
          0% { opacity: 1; transform: scale(0.95); }
          100% { opacity: 0; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
