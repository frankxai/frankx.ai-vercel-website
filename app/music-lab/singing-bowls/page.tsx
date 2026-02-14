'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Solfeggio Frequencies ──────────────────────────────────────────
//
// Nine sacred frequencies from the ancient Solfeggio scale. Each tone
// is associated with specific healing and meditative properties.
// The extended set adds 174 Hz, 285 Hz, and 963 Hz to the original six.
//
// The singing bowl "wobble" comes from acoustic beating: two nearly
// identical frequencies interfere, creating slow amplitude modulation.
// A real bowl's slight asymmetry produces two modes at ±0.5–1.5 Hz.
// We synthesize this with paired detuned oscillators per harmonic.

interface BowlDef {
  freq: number
  name: string
  desc: string
  color: string
  glow: string
  key: string
  beatRate: number // Hz — speed of the amplitude wobble
}

const BOWLS: BowlDef[] = [
  { freq: 174, name: '174 Hz', desc: 'Foundation',  color: '#DC2626', glow: 'rgba(220,38,38,0.35)',  key: '1', beatRate: 0.50 },
  { freq: 285, name: '285 Hz', desc: 'Energy',      color: '#EA580C', glow: 'rgba(234,88,12,0.35)',  key: '2', beatRate: 0.55 },
  { freq: 396, name: '396 Hz', desc: 'Liberation',   color: '#F59E0B', glow: 'rgba(245,158,11,0.35)', key: '3', beatRate: 0.60 },
  { freq: 417, name: '417 Hz', desc: 'Change',       color: '#84CC16', glow: 'rgba(132,204,22,0.35)', key: 'q', beatRate: 0.65 },
  { freq: 528, name: '528 Hz', desc: 'Love',         color: '#10B981', glow: 'rgba(16,185,129,0.35)', key: 'w', beatRate: 0.70 },
  { freq: 639, name: '639 Hz', desc: 'Connection',   color: '#06B6D4', glow: 'rgba(6,182,212,0.35)',  key: 'e', beatRate: 0.80 },
  { freq: 741, name: '741 Hz', desc: 'Expression',   color: '#3B82F6', glow: 'rgba(59,130,246,0.35)', key: 'a', beatRate: 0.90 },
  { freq: 852, name: '852 Hz', desc: 'Intuition',    color: '#6366F1', glow: 'rgba(99,102,241,0.35)', key: 's', beatRate: 1.00 },
  { freq: 963, name: '963 Hz', desc: 'Oneness',      color: '#A855F7', glow: 'rgba(168,85,247,0.35)', key: 'd', beatRate: 1.10 },
]

// ─── Singing Bowl Sound Engine ──────────────────────────────────────
//
// Each bowl is synthesized with 3 beating harmonic pairs:
//
//   Pair 1 (fundamental): freq ± beatRate/2
//     → amplitude wobbles at beatRate Hz
//   Pair 2 (2nd harmonic): freq×2 ± beatRate×1.6/2
//     → faster wobble adds shimmer
//   Pair 3 (3rd harmonic): freq×3 ± beatRate×2.3/2
//     → metallic texture, fastest wobble
//
// Decay: fundamental ~12s, 2nd harmonic ~8s, 3rd harmonic ~5s.
// Strike transient: short metallic "ting" from filtered noise.
//
// The result is a rich, slowly evolving tone that shimmers and
// breathes — exactly like striking a real Tibetan singing bowl.

class SingingBowlEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null

  async init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume()
      return
    }

    this.ctx = new AudioContext({ sampleRate: 44100 })

    // Very gentle compression (singing bowls are naturally even)
    const comp = this.ctx.createDynamicsCompressor()
    comp.threshold.value = -12
    comp.knee.value = 20
    comp.ratio.value = 3
    comp.attack.value = 0.01
    comp.release.value = 0.2
    comp.connect(this.ctx.destination)

    // Long, ethereal reverb — wide and shimmering
    const reverb = this.ctx.createConvolver()
    reverb.buffer = this.buildReverbIR()

    const dry = this.ctx.createGain(); dry.gain.value = 0.45
    const wet = this.ctx.createGain(); wet.gain.value = 0.55

    this.master = this.ctx.createGain()
    this.master.gain.value = 0.65
    this.master.connect(dry)
    this.master.connect(reverb)
    reverb.connect(wet)
    dry.connect(comp)
    wet.connect(comp)
  }

  private buildReverbIR(): AudioBuffer {
    const ctx = this.ctx!
    const rate = ctx.sampleRate
    const len = rate * 5 // 5-second reverb tail
    const buf = ctx.createBuffer(2, len, rate)
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch)
      for (let i = 0; i < len; i++) {
        const t = i / rate
        // Smooth, wide reverb with subtle modulation
        const body = Math.exp(-1.4 * t) * (Math.random() * 2 - 1)
        const shimmer = Math.exp(-2.5 * t) * Math.sin(t * 800 + ch * 0.5) * 0.02
        d[i] = (body + shimmer) * 0.06
      }
    }
    return buf
  }

  play(freq: number, beatRate: number) {
    if (!this.ctx || !this.master) return
    const ctx = this.ctx
    const now = ctx.currentTime

    const halfBeat1 = beatRate / 2
    const halfBeat2 = (beatRate * 1.6) / 2
    const halfBeat3 = (beatRate * 2.3) / 2

    // ── Fundamental pair (beating) ──
    const osc1a = ctx.createOscillator(); osc1a.type = 'sine'
    osc1a.frequency.value = freq - halfBeat1
    const osc1b = ctx.createOscillator(); osc1b.type = 'sine'
    osc1b.frequency.value = freq + halfBeat1

    const g1 = ctx.createGain()
    g1.gain.setValueAtTime(0, now)
    g1.gain.linearRampToValueAtTime(0.25, now + 0.006)
    g1.gain.setTargetAtTime(0.001, now + 0.05, 4.0)

    // ── 2nd harmonic pair (faster shimmer) ──
    const osc2a = ctx.createOscillator(); osc2a.type = 'sine'
    osc2a.frequency.value = freq * 2 - halfBeat2
    const osc2b = ctx.createOscillator(); osc2b.type = 'sine'
    osc2b.frequency.value = freq * 2 + halfBeat2

    const g2 = ctx.createGain()
    g2.gain.setValueAtTime(0, now)
    g2.gain.linearRampToValueAtTime(0.09, now + 0.004)
    g2.gain.setTargetAtTime(0.001, now + 0.03, 2.5)

    // ── 3rd harmonic pair (metallic texture) ──
    const osc3a = ctx.createOscillator(); osc3a.type = 'sine'
    osc3a.frequency.value = freq * 3 - halfBeat3
    const osc3b = ctx.createOscillator(); osc3b.type = 'sine'
    osc3b.frequency.value = freq * 3 + halfBeat3

    const g3 = ctx.createGain()
    g3.gain.setValueAtTime(0, now)
    g3.gain.linearRampToValueAtTime(0.04, now + 0.003)
    g3.gain.setTargetAtTime(0.001, now + 0.02, 1.5)

    // ── 5th partial (faint metallic ring, no beating) ──
    const osc5 = ctx.createOscillator(); osc5.type = 'sine'
    osc5.frequency.value = freq * 5.02
    const g5 = ctx.createGain()
    g5.gain.setValueAtTime(0, now)
    g5.gain.linearRampToValueAtTime(0.012, now + 0.002)
    g5.gain.setTargetAtTime(0.001, now + 0.01, 1.0)

    // ── Metallic strike transient ──
    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.025, ctx.sampleRate)
    const nd = noiseBuf.getChannelData(0)
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1
    const nSrc = ctx.createBufferSource()
    nSrc.buffer = noiseBuf

    const nBp = ctx.createBiquadFilter()
    nBp.type = 'bandpass'
    nBp.frequency.value = freq * 3.5
    nBp.Q.value = 6

    const nEnv = ctx.createGain()
    nEnv.gain.setValueAtTime(0.12, now)
    nEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.012)

    // Connect all to master
    osc1a.connect(g1); osc1b.connect(g1); g1.connect(this.master!)
    osc2a.connect(g2); osc2b.connect(g2); g2.connect(this.master!)
    osc3a.connect(g3); osc3b.connect(g3); g3.connect(this.master!)
    osc5.connect(g5); g5.connect(this.master!)
    nSrc.connect(nBp); nBp.connect(nEnv); nEnv.connect(this.master!)

    const stopTime = now + 15
    osc1a.start(now); osc1a.stop(stopTime)
    osc1b.start(now); osc1b.stop(stopTime)
    osc2a.start(now); osc2a.stop(now + 10)
    osc2b.start(now); osc2b.stop(now + 10)
    osc3a.start(now); osc3a.stop(now + 7)
    osc3b.start(now); osc3b.stop(now + 7)
    osc5.start(now);  osc5.stop(now + 4)
    nSrc.start(now);  nSrc.stop(now + 0.03)
  }

  stopAll() {
    if (!this.ctx || !this.master) return
    const now = this.ctx.currentTime
    this.master.gain.setValueAtTime(this.master.gain.value, now)
    this.master.gain.linearRampToValueAtTime(0, now + 0.4)
    setTimeout(() => { if (this.master) this.master.gain.value = 0.65 }, 500)
  }

  destroy() {
    if (this.ctx) { try { this.ctx.close() } catch { /* ok */ } }
    this.ctx = null
  }
}

// ─── Bowl Ripple Animation ──────────────────────────────────────────

function BowlRipple({ color, active }: { color: string; active: boolean }) {
  if (!active) return null
  return (
    <span className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="absolute inset-0 rounded-full animate-[bowlRipple_1.2s_ease-out_forwards]"
          style={{
            border: `1px solid ${color}`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────

export default function SingingBowlsPage() {
  const engineRef = useRef<SingingBowlEngine | null>(null)
  const [activeBowls, setActiveBowls] = useState<Set<number>>(new Set())

  const getEngine = useCallback(async () => {
    if (!engineRef.current) engineRef.current = new SingingBowlEngine()
    await engineRef.current.init()
    return engineRef.current
  }, [])

  useEffect(() => () => { engineRef.current?.destroy() }, [])

  const strikeBowl = useCallback(async (index: number) => {
    const eng = await getEngine()
    eng.play(BOWLS[index].freq, BOWLS[index].beatRate)
    setActiveBowls(prev => new Set(prev).add(index))
    setTimeout(() => {
      setActiveBowls(prev => { const n = new Set(prev); n.delete(index); return n })
    }, 1200)
  }, [getEngine])

  const clearAll = useCallback(async () => {
    const eng = await getEngine()
    eng.stopAll()
    setActiveBowls(new Set())
  }, [getEngine])

  // Keyboard mapping (3×3 grid: 123 / QWE / ASD)
  useEffect(() => {
    const keyMap: Record<string, number> = {}
    BOWLS.forEach((bowl, i) => { keyMap[bowl.key] = i })

    function down(e: KeyboardEvent) {
      if (e.repeat || e.metaKey || e.ctrlKey) return
      const k = e.key.toLowerCase()
      if (k in keyMap) { e.preventDefault(); strikeBowl(keyMap[k]) }
      if (k === 'escape') { e.preventDefault(); engineRef.current?.stopAll(); setActiveBowls(new Set()) }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [strikeBowl])

  return (
    <div className="bg-[#080610] min-h-[100dvh] flex flex-col overflow-hidden select-none">
      {/* Ambient — deep, meditative */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-[700px] h-[700px] bg-indigo-500/[0.015] rounded-full blur-[300px] top-1/3 left-1/3" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/[0.012] rounded-full blur-[200px] bottom-1/4 right-1/4" />
        <div className="absolute w-[400px] h-[400px] bg-emerald-500/[0.008] rounded-full blur-[180px] top-1/4 right-1/3" />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-4 md:pt-6 pb-2 px-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/20 mb-1">FrankX Music Lab</p>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
          Singing Bowls
        </h1>
        <p className="text-white/25 text-xs mt-1">
          9 Solfeggio Frequencies · Strike to resonate
        </p>
      </header>

      {/* Bowl grid — 3×3 */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-3 gap-3 md:gap-5 w-full max-w-[480px]">
          {BOWLS.map((bowl, i) => {
            const active = activeBowls.has(i)
            const pulseDuration = (1 / bowl.beatRate).toFixed(2)

            return (
              <button
                key={bowl.freq}
                onPointerDown={e => { e.preventDefault(); strikeBowl(i) }}
                className="relative aspect-square rounded-full outline-none transition-all duration-300"
                aria-label={`${bowl.name} - ${bowl.desc}`}
                style={{
                  background: active
                    ? `radial-gradient(circle at 45% 40%, ${bowl.color}40, ${bowl.color}18 50%, transparent 75%)`
                    : 'radial-gradient(circle at 45% 40%, rgba(255,255,255,0.04), rgba(255,255,255,0.015) 50%, transparent 75%)',
                  boxShadow: active
                    ? `0 0 40px ${bowl.glow}, 0 0 80px ${bowl.glow.replace('0.35', '0.12')}, inset 0 0 20px ${bowl.glow.replace('0.35', '0.08')}`
                    : 'inset 0 2px 6px rgba(255,255,255,0.02), inset 0 -1px 3px rgba(0,0,0,0.3)',
                }}
              >
                {/* Concentric bowl rings */}
                {[30, 50, 70, 88].map(r => (
                  <span
                    key={r}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      inset: `${(100 - r) / 2}%`,
                      border: `1px solid ${active ? bowl.color + '20' : 'rgba(255,255,255,0.03)'}`,
                      transition: 'border-color 0.3s',
                    }}
                  />
                ))}

                {/* Center highlight dot */}
                <span
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: '8%',
                    height: '8%',
                    left: '46%',
                    top: '46%',
                    background: active ? bowl.color + '60' : 'rgba(255,255,255,0.06)',
                    transition: 'background 0.3s',
                  }}
                />

                {/* Pulsing glow synced to beating frequency */}
                {active && (
                  <span
                    className="absolute inset-[5%] rounded-full pointer-events-none animate-[bowlPulse_ease-in-out_infinite]"
                    style={{
                      background: `radial-gradient(circle, ${bowl.color}15, transparent 70%)`,
                      animationDuration: `${pulseDuration}s`,
                    }}
                  />
                )}

                {/* Ripple animation on strike */}
                <BowlRipple color={bowl.color + '30'} active={active} />

                {/* Labels */}
                <span className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-50'}`}>
                  <span className="text-sm md:text-base font-semibold text-white/80">
                    {bowl.freq}
                  </span>
                  <span className="text-[8px] md:text-[9px] tracking-wider uppercase mt-0.5" style={{ color: active ? bowl.color : 'rgba(255,255,255,0.25)' }}>
                    {bowl.desc}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-3 md:pb-5 space-y-1.5">
        <button
          onClick={clearAll}
          className="text-white/12 text-[10px] tracking-wider uppercase hover:text-white/25 transition-colors"
        >
          Clear All (Esc)
        </button>
        <div>
          <p className="text-white/8 text-[9px] tracking-wide hidden md:block mb-1.5">
            1 2 3 · Q W E · A S D
          </p>
          <Link href="/music-lab" className="inline-block text-purple-300/18 text-[11px] hover:text-purple-300/35 transition-colors">
            Music Lab
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes bowlRipple {
          0% { transform: scale(0.3); opacity: 0.8; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes bowlPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
