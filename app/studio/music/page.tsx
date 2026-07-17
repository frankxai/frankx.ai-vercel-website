import Link from 'next/link'
import { ArrowRight, Image as ImageIcon, Film, Layers, Music } from 'lucide-react'
import { makeProducerMetadata } from '@/components/studio/ProducerPlaceholderPage'
import { PreflightCardView } from '@/components/studio/music/PreflightCard'
import {
  loadCatalog,
  songsNeedingVideo,
  styles,
  formats,
  getEngine,
  buildDefaultShotPlan,
  estimateCost,
  buildPreflightCard,
  FULL_RELEASE_FORMATS,
  type StackLayer,
  type EngineId,
  type CatalogSong,
} from '@/lib/music-video'

export const dynamic = 'force-static'
export const metadata = makeProducerMetadata('music-producer')

// ── data assembled at build time (catalog.ts is node:fs, server-only) ──────

const LAYERS: { kind: StackLayer; n: string; name: string; purpose: string; icon: typeof Layers }[] = [
  {
    kind: 'keyframe',
    n: 'L1',
    name: 'Keyframe',
    purpose: 'One locking still per shot — the design decision the whole video inherits. Identity, palette, and composition are settled here before a second of motion is bought.',
    icon: ImageIcon,
  },
  {
    kind: 'motion',
    n: 'L2',
    name: 'Motion',
    purpose: 'Each keyframe becomes 8 seconds of motion. Body shots run cheap; the 2–3 hero shots that carry the video upgrade to the native-audio engine.',
    icon: Film,
  },
  {
    kind: 'assembly',
    n: 'L3',
    name: 'Assembly',
    purpose: 'Beat-synced cuts, burned-in captions, audio-reactive overlays, and the six-format export — all local, deterministic, $0 marginal per render.',
    icon: Layers,
  },
]

// Engines grouped by stack layer, for the layer cards.
const enginesByLayer: Record<StackLayer, { id: EngineId; label: string; vendor: string }[]> = {
  keyframe: [],
  motion: [],
  assembly: [],
}
for (const id of [
  'nano-banana-pro',
  'nano-banana',
  'higgsfield-soul-id',
  'veo-3.1-standard',
  'kling-3.0',
  'seedance-2.0',
  'luma-ray3',
  'runway-gen-4.5',
  'hyperframes',
  'remotion',
  'ffmpeg',
] as EngineId[]) {
  const e = getEngine(id)
  enginesByLayer[e.layer].push({ id: e.id, label: e.label, vendor: e.vendor })
}

const COMMANDS = [
  {
    name: '/music-video',
    body: 'Plan a full release. Reads the song, builds the shot plan, renders the pre-flight card, waits for approval.',
  },
  {
    name: '/mv-render',
    body: 'Execute an approved plan — keyframes, motion, assembly, then all six formats from the one master.',
  },
  {
    name: '/mv-canvas',
    body: 'Spotify Canvas only. A 3–8s seamless loop under 8MB, derived from the master, no text or CTAs.',
  },
  {
    name: '/mv-artwork',
    body: 'Apple Music motion artwork — ProRes 1:1 + 3:4, first frame locked to the static cover.',
  },
  {
    name: '/mv-visualizer',
    body: 'Audio-reactive visualizer loop in HyperFrames. No video-gen spend — waveform/spectrum driven.',
  },
]

// Pick the first released song with a known duration for a real pre-flight card.
function sampleSong(): CatalogSong | undefined {
  const catalog = loadCatalog()
  return (
    catalog.find((s) => s.status === 'released' && (s.durationSeconds ?? 0) > 0) ??
    catalog.find((s) => s.status === 'released')
  )
}

export default function StudioMusicPage() {
  const backlog = songsNeedingVideo()
  const releasedCount = loadCatalog().filter((s) => s.status === 'released').length

  const song = sampleSong()
  let sampleCard = null
  if (song) {
    const plan = buildDefaultShotPlan({
      songId: song.songId,
      songTitle: song.title,
      style: 'cinematic',
      formats: FULL_RELEASE_FORMATS,
      durationSec: song.durationSeconds ?? 200,
      bpm: song.bpm,
      resolution: '1080p',
    })
    sampleCard = buildPreflightCard(plan, estimateCost(plan), {
      audience:
        'Late-night listeners who find the track on Discover Weekly and decide in the first two seconds whether to stay.',
      arc: 'A held, beautiful frame resolves into a single committed camera move that lands on the downbeat — wide establishing, then intimate close on the hook.',
      hook: 'Open on stillness; the first motion is the push-in timed to beat one. No cut before the listener is already in.',
    })
  }

  return (
    <main id="main" className="min-h-screen bg-[#0a0a0b] text-white">
      {/* HERO ----------------------------------------------------------- */}
      <section className="relative px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-8"
          >
            <ArrowRight className="h-4 w-4 rotate-180" aria-hidden />
            Studio
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-md bg-amber-500/10 ring-1 ring-amber-400/30">
              <Music className="h-5 w-5 text-amber-400" aria-hidden />
            </div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-amber-400/70 font-medium">
              Music Intelligence System
            </p>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-6 max-w-4xl">
            Drop a song. Get a cost-gated
            <br />
            <span className="text-amber-400">multi-format music video.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl mb-10">
            A three-layer stack — keyframe, motion, assembly — turns one finished
            track into a 4K master and five platform cuts. Every run is priced and
            approved on a pre-flight card before a second of motion is bought.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#preflight"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors"
            >
              See a pre-flight card
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="#stack"
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition-colors"
            >
              The stack
            </Link>
          </div>
        </div>
      </section>

      {/* THE STACK ------------------------------------------------------ */}
      <section id="stack" className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="text-[11px] tracking-[0.25em] uppercase text-amber-400/70 font-medium mb-3">
              The three-layer stack
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Keyframe → motion → assembly.
            </h2>
            <p className="text-base text-white/60 max-w-2xl">
              Each layer has one job and routes to the engine that wins for it.
              The boundaries are the point — settle the look before you pay for
              motion, and never pay twice for assembly.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {LAYERS.map((layer) => {
              const Icon = layer.icon
              return (
                <article
                  key={layer.kind}
                  className="rounded-xl bg-[#111113] border border-white/5 p-6 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-md bg-amber-500/10 ring-1 ring-amber-400/30">
                      <Icon className="h-4 w-4 text-amber-400" aria-hidden />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      <span className="font-mono text-amber-400/60 text-sm mr-2">
                        {layer.n}
                      </span>
                      {layer.name}
                    </h3>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed mb-5">
                    {layer.purpose}
                  </p>
                  <ul className="space-y-2 border-t border-white/5 pt-4">
                    {enginesByLayer[layer.kind].map((e) => (
                      <li key={e.id} className="flex items-baseline justify-between gap-3">
                        <span className="font-mono text-[12px] text-amber-400/80">
                          {e.id}
                        </span>
                        <span className="text-[11px] text-white/40 shrink-0">
                          {e.vendor}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* STYLE LANES ---------------------------------------------------- */}
      <section className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="text-[11px] tracking-[0.25em] uppercase text-amber-400/70 font-medium mb-3">
              The five style lanes
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Pick a lane and the engines pick themselves.
            </h2>
            <p className="text-base text-white/60 max-w-2xl">
              Each lane is a reasoned routing of keyframe, motion, and assembly
              engines for one look. The lane decides the spend posture before the
              first prompt is written.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {styles.map((s) => (
              <article
                key={s.id}
                className="rounded-xl bg-[#111113] border border-white/5 p-6 hover:border-white/10 transition-colors flex flex-col"
              >
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {s.label}
                  </h3>
                  <span className="font-mono text-[11px] text-amber-400/60">{s.id}</span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed mb-5">
                  {s.description}
                </p>
                <dl className="space-y-1.5 text-xs mt-auto border-t border-white/5 pt-4">
                  <EngineRow label="Keyframe" value={s.keyframeEngine} />
                  <EngineRow label="Motion" value={s.motionEngine ?? '— compositor only'} />
                  <EngineRow label="Hero" value={s.heroEngine ?? '—'} />
                  <EngineRow label="Assembly" value={s.assemblyEngine} />
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATS -------------------------------------------------------- */}
      <section className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.25em] uppercase text-amber-400/70 font-medium mb-3">
              The six formats
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Master once in 16:9 4K. Derive the rest.
            </h2>
            <p className="text-base text-white/60 max-w-2xl">
              The full release ships every platform from a single master. Five of
              the six are reframes or cuts — cheap by design.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-[#111113] text-left text-[11px] uppercase tracking-wide text-white/40">
                  <th className="font-medium px-5 py-3">Format</th>
                  <th className="font-medium px-5 py-3">Aspect</th>
                  <th className="font-medium px-5 py-3">Resolution</th>
                  <th className="font-medium px-5 py-3">Max duration</th>
                  <th className="font-medium px-5 py-3">Platforms</th>
                </tr>
              </thead>
              <tbody>
                {formats.map((f) => (
                  <tr
                    key={f.id}
                    className="border-t border-white/5 bg-[#0a0a0b] hover:bg-[#111113] transition-colors"
                  >
                    <td className="px-5 py-3">
                      <span className="block text-white/85">{f.label}</span>
                      <span className="block font-mono text-[10px] text-amber-400/50">
                        {f.id}
                        {!f.derivedFromMaster && ' · master'}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-white/60 whitespace-nowrap">
                      {f.aspect}
                    </td>
                    <td className="px-5 py-3 font-mono text-white/60 whitespace-nowrap tabular-nums">
                      {f.width}×{f.height}
                    </td>
                    <td className="px-5 py-3 text-white/60 whitespace-nowrap tabular-nums">
                      {f.maxDurationSec === null ? 'unbounded' : `${f.maxDurationSec}s`}
                    </td>
                    <td className="px-5 py-3 text-white/55">{f.platforms.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRE-FLIGHT (centerpiece) -------------------------------------- */}
      <section id="preflight" className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.25em] uppercase text-amber-400/70 font-medium mb-3">
              The pre-flight card
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              What you approve before a run.
            </h2>
            <p className="text-base text-white/60 max-w-2xl">
              No render starts without this. Design brief, shot summary, per-engine
              cost, the total in dollars and credits, and the ROI it has to clear —
              one surface, one decision.
            </p>
          </div>

          {sampleCard ? (
            <PreflightCardView card={sampleCard} />
          ) : (
            <p className="text-sm text-white/50">
              No released song available to render a sample.
            </p>
          )}

          <p className="mt-4 text-xs text-white/40">
            Sample: cinematic lane, full-release format set, 2× selects. Numbers are
            live from the rate card — verdict and totals recompute when the plan changes.
          </p>
        </div>
      </section>

      {/* BACKLOG -------------------------------------------------------- */}
      <section className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.25em] uppercase text-amber-400/70 font-medium mb-3">
              The production backlog
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              {releasedCount} songs released, {backlog.length} awaiting video.
            </h2>
            <p className="text-base text-white/60 max-w-2xl">
              Released tracks with no full video on file. The next run starts here.
            </p>
          </div>

          {backlog.length > 0 ? (
            <ul className="grid gap-3 md:grid-cols-2">
              {backlog.slice(0, 12).map((s) => (
                <li
                  key={s.songId}
                  className="rounded-lg bg-[#111113] border border-white/5 px-5 py-4 flex items-baseline justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-white/85 truncate">{s.title}</p>
                    <p className="font-mono text-[11px] text-amber-400/50 truncate">
                      {s.label}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-white/45 tabular-nums">
                    {s.durationSeconds ? `${formatDuration(s.durationSeconds)}` : '—'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-white/50">Backlog clear — every release has a video.</p>
          )}

          {backlog.length > 12 && (
            <p className="mt-4 text-xs text-white/40">
              + {backlog.length - 12} more in the queue.
            </p>
          )}
        </div>
      </section>

      {/* COMMANDS ------------------------------------------------------- */}
      <section className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.25em] uppercase text-amber-400/70 font-medium mb-3">
              The command reference
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Five commands drive the whole pipeline.
            </h2>
            <p className="text-base text-white/60 max-w-2xl">
              Run from Claude Code. Each plans or renders against the same typed
              substrate — nothing publishes without the pre-flight gate.
            </p>
          </div>

          <ul className="grid gap-4 md:grid-cols-2">
            {COMMANDS.map((c) => (
              <li
                key={c.name}
                className="rounded-lg bg-[#111113] border border-white/5 p-6"
              >
                <p className="font-mono text-base text-amber-400 mb-2">{c.name}</p>
                <p className="text-sm text-white/60 leading-relaxed">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

// ── small presentational helpers ──────────────────────────────────────────

function EngineRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-white/40">{label}</dt>
      <dd className="font-mono text-[11px] text-white/70 text-right">{value}</dd>
    </div>
  )
}

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = Math.round(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}
