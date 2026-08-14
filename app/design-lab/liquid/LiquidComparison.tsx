'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail } from 'lucide-react'
import { createLiquidField } from '@/lib/liquid/core/field.js'
import { enhanceForm } from '@/lib/liquid/core/form.js'
import { magnetizeAll } from '@/lib/liquid/core/magnetic.js'
import { createBubbleDrift } from '@/lib/liquid/core/scroll.js'

type Side = 'current' | 'liquid'

/** Frames-per-second readout so the cost of the field is visible, not asserted. */
function useFrameRate(active: boolean) {
  const [fps, setFps] = useState<number | null>(null)

  useEffect(() => {
    if (!active) return
    let raf = 0
    let frames = 0
    let mark = performance.now()

    const loop = (now: number) => {
      frames += 1
      if (now - mark >= 1000) {
        setFps(Math.round((frames * 1000) / (now - mark)))
        frames = 0
        mark = now
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [active])

  return fps
}

function CurrentForm() {
  return (
    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Your name (optional)"
          aria-label="Your name (optional)"
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 transition-colors focus:border-cyan-500/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
        />
        <input
          type="email"
          placeholder="Enter your email"
          aria-label="Enter your email"
          required
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 transition-colors focus:border-cyan-500/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
        >
          <Mail className="h-5 w-5" />
          Get Early Access
        </button>
      </div>
    </form>
  )
}

function LiquidFormPreview() {
  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!ref.current) return
    // wrap: false — the shell spans are in the JSX; React owns this DOM.
    const handle = enhanceForm(ref.current, { wrap: false })
    return () => handle.destroy()
  }, [])

  return (
    <form ref={ref} className="space-y-3" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-3">
        <span className="liquid-field-shell">
          <input type="text" placeholder="Your name (optional)" aria-label="Your name (optional)" />
        </span>
        <span className="liquid-field-shell">
          <input type="email" placeholder="Enter your email" aria-label="Enter your email" required />
        </span>
        <button
          type="submit"
          className="liquid-button liquid-button--solid inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
        >
          <Mail className="h-5 w-5" />
          Get Early Access
        </button>
      </div>
    </form>
  )
}

export default function LiquidComparison() {
  const heroRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const [side, setSide] = useState<Side>('liquid')
  const [tier, setTier] = useState<string>('…')
  const fps = useFrameRate(side === 'liquid')

  useEffect(() => {
    if (side !== 'liquid' || !heroRef.current) {
      setTier('off')
      return
    }
    const handle = createLiquidField(heroRef.current, {
      tints: ['#ab47c7', '#43bfe3', '#10b981'],
      intensity: 0.55,
    })
    setTier(handle.tier)
    return () => handle.destroy()
  }, [side])

  useEffect(() => {
    if (side !== 'liquid' || !pageRef.current) return
    const magnets = magnetizeAll(pageRef.current)
    const drift = createBubbleDrift(pageRef.current)
    return () => {
      magnets.destroy()
      drift.destroy()
    }
  }, [side])

  return (
    <div ref={pageRef} className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Control bar — the whole point of this route is switching between the two. */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0b]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-3 text-sm">
          <span className="font-medium">Liquid surface kit</span>
          <div className="flex rounded-lg border border-white/15 p-0.5" role="group" aria-label="Treatment">
            {(['current', 'liquid'] as Side[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSide(option)}
                aria-pressed={side === option}
                className={`rounded-md px-3 py-1.5 capitalize transition-colors ${
                  side === option ? 'bg-white text-slate-950' : 'text-white/65 hover:text-white'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <span className="ml-auto font-mono text-xs text-white/50">
            tier: {tier} · {fps ? `${fps} fps` : 'fps —'}
          </span>
        </div>
      </div>

      {/* Hero: ambient field vs the site's current static gradient. */}
      <header
        ref={heroRef}
        className={`relative grid min-h-[70vh] place-items-center px-6 py-24 text-center ${
          side === 'liquid'
            ? 'liquid-field'
            : 'bg-[radial-gradient(60%_50%_at_50%_0%,rgba(171,71,199,0.18),transparent_70%)]'
        }`}
      >
        <div className="max-w-2xl">
          <h1 className="text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl">
            Surfaces that behave like{' '}
            <em className="font-serif italic text-cyan-300">liquid</em>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-white/60">
            Switch between the current treatment and the liquid kit above. Everything below renders
            the same content twice so the difference is the surface, not the copy.
          </p>
          <button
            type="button"
            data-liquid-magnetic
            className="liquid-button liquid-button--solid mt-9 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
          >
            Move your cursor here
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-24 px-6 py-24">
        <section>
          <h2 className="text-2xl font-light tracking-tight">Newsletter capture</h2>
          <p className="mt-2 max-w-xl text-sm text-white/55">
            The real component is untouched in production. This renders both treatments of the same
            markup so the focus bubble, validity hue, and submit ripple can be judged directly.
            Submission is disabled here.
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-white/40">Current</p>
              <CurrentForm />
            </div>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-white/40">Liquid</p>
              {side === 'liquid' ? <LiquidFormPreview /> : <CurrentForm />}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-light tracking-tight">Surfaces</h2>
          <p className="mt-2 max-w-xl text-sm text-white/55">
            Left is the card style used across the site today. Right adds the glass treatment: a
            blurred, saturated pull from what sits behind, and one hairline that catches light at the
            top edge.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-medium">Current card</h3>
              <p className="mt-1 text-sm text-white/55">Flat translucent fill, single border.</p>
            </div>
            {side === 'liquid' ? (
              <>
                <div className="liquid-glass liquid-glass--interactive p-6">
                  <h3 className="font-medium">Glass</h3>
                  <p className="mt-1 text-sm text-white/55">Backdrop blur with a lit top edge.</p>
                </div>
                <div className="liquid-glass liquid-glass--interactive p-6" data-liquid-magnetic>
                  <h3 className="font-medium">Glass + magnetic</h3>
                  <p className="mt-1 text-sm text-white/55">Leans toward the pointer, then releases.</p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="font-medium">Current card</h3>
                  <p className="mt-1 text-sm text-white/55">Flat translucent fill, single border.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="font-medium">Current card</h3>
                  <p className="mt-1 text-sm text-white/55">Flat translucent fill, single border.</p>
                </div>
              </>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-light tracking-tight">Bubbles</h2>
          <p className="mt-2 max-w-xl text-sm text-white/55">
            Each bubble drifts against the scroll at its own depth. Scroll this section past the
            viewport to judge whether it reads as depth or as noise.
          </p>
          <div className="relative mt-8 h-96">
            {side === 'liquid' ? (
              <>
                <span className="liquid-bubble h-32 w-32" data-liquid-bubble="0.9" style={{ left: '4%', top: '12%' }} />
                <span className="liquid-bubble h-20 w-20" data-liquid-bubble="0.5" style={{ left: '34%', top: '46%' }} />
                <span className="liquid-bubble h-44 w-44" data-liquid-bubble="1.2" style={{ left: '58%', top: '8%' }} />
                <span className="liquid-bubble h-14 w-14" data-liquid-bubble="0.3" style={{ left: '80%', top: '58%' }} />
              </>
            ) : (
              <p className="pt-12 text-sm text-white/35">No equivalent in the current treatment.</p>
            )}
          </div>
        </section>

        <section className="border-t border-white/10 pt-12 text-sm text-white/55">
          <h2 className="text-base font-medium text-white">What this costs</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <span className="text-white/80">Tier</span> — the field resolves to{' '}
              <span className="font-mono">full</span> (WebGL2),{' '}
              <span className="font-mono">lite</span> (CSS gradient stand-in on weak devices or
              Save-Data), or <span className="font-mono">static</span> (reduced motion). Yours reads{' '}
              <span className="font-mono">{tier}</span>.
            </li>
            <li>
              <span className="text-white/80">Budget</span> — sustained frames over 22ms drop the
              field to <span className="font-mono">lite</span> automatically. It also pauses when
              offscreen or when the tab is hidden.
            </li>
            <li>
              <span className="text-white/80">Payload</span> — no new dependency. The shader and
              controllers are plain ESM; the CSS reads existing brand tokens.
            </li>
            <li>
              <span className="text-white/80">Not applied anywhere yet</span> — production
              components are unchanged. This route is the only surface using the kit.
            </li>
          </ul>
        </section>
      </main>
    </div>
  )
}
