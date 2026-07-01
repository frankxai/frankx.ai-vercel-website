import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Disc3,
  Layers3,
  Orbit,
  Radio,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
  Zap,
} from 'lucide-react'

export interface FrankxHomepageConcept {
  slug: string
  name: string
  label: string
  score: number
  summary: string
  hero: string
  motion: string
  sound: string
  why: string[]
  risks: string[]
  palette: string[]
}

export const frankxHomepageConcepts: FrankxHomepageConcept[] = [
  {
    slug: 'frankx-homepage-command-room',
    name: 'Command Room',
    label: 'Production direction',
    score: 96,
    summary:
      'Executive-grade homepage with a live command core, Vibe OS soundtrack, proof rails, and one precise scroll set-piece.',
    hero:
      'FrankX opens as a working AI command layer: one 3D object, clear offer language, and proof in the first viewport.',
    motion:
      'Framer handles entrance timing. GSAP ScrollTrigger choreographs signal to agent route to artifact to publishing loop.',
    sound:
      'Suno embed appears as the mission soundtrack with direct MP3 fallback. Audio remains user-initiated.',
    why: [
      'Best fit for the main homepage because it balances authority, systems, music, and commerce.',
      'Replaces generic AI imagery with code-native 3D and first-party interface objects.',
      'Strongest route for mobile because the scene and embed can stack without losing hierarchy.',
    ],
    risks: [
      'Needs careful canvas QA so the 3D object never renders blank.',
      'The Suno iframe is third-party, so fallback and layout containment are required.',
    ],
    palette: ['#0a0a0b', '#10b981', '#43bfe3', '#f59e0b', '#ffffff'],
  },
  {
    slug: 'frankx-homepage-signal-cortex',
    name: 'Signal Cortex',
    label: 'Research direction',
    score: 93,
    summary:
      'A more diagnostic homepage built around signal maps, route finding, and intelligence layers unfolding through scroll.',
    hero:
      'The first viewport behaves like a signal scanner: evidence nodes, route vectors, and a calmer science-lab interface.',
    motion:
      'Scroll reveals route lines and evidence nodes. Micro-motion stays subtle, precise, and reduced-motion aware.',
    sound:
      'The track becomes a lower-frequency pulse in the experience, paired with notes on prompt texture and listening loops.',
    why: [
      'Best for a future intelligence or research landing page.',
      'Turns FrankX into a stronger diagnostic/strategy surface.',
      'Useful if the homepage shifts toward audits, advisory, or technical buyer education.',
    ],
    risks: [
      'Can become too abstract if not grounded by human proof and concrete offers.',
      'Requires more bespoke visual objects to avoid looking like a generic network diagram.',
    ],
    palette: ['#050708', '#9ff7df', '#43bfe3', '#d4a855', '#f5f5f5'],
  },
  {
    slug: 'frankx-homepage-sonic-os',
    name: 'Sonic OS',
    label: 'Music-first direction',
    score: 92,
    summary:
      'A music-led homepage where Vibe OS becomes the first narrative object and AI systems unfold from the track.',
    hero:
      'Suno player, waveform console, and production stats lead the page before agent systems enter as the engine underneath.',
    motion:
      'Waveform bars, section cuts, and artifact cards move like a studio console rather than a corporate SaaS page.',
    sound:
      'The Vibe OS embed is the hero artifact. Direct audio fallback and mute-first posture remain mandatory.',
    why: [
      'Best if FrankX should feel more like a creator studio than a systems consultancy.',
      'Most emotionally memorable direction for music audiences.',
      'Creates a stronger bridge from Suno output into productized creator systems.',
    ],
    risks: [
      'May undersell the AI architecture and enterprise credibility if used alone.',
      'Needs more music-specific visual assets before it can become the main production path.',
    ],
    palette: ['#09090b', '#43bfe3', '#ab47c7', '#f59e0b', '#10b981'],
  },
]

export function getFrankxHomepageConcept(slug: string) {
  const concept = frankxHomepageConcepts.find((item) => item.slug === slug)
  if (!concept) {
    throw new Error(`Unknown FrankX homepage concept: ${slug}`)
  }
  return concept
}

const iconRail = [
  TerminalSquare,
  Workflow,
  Radio,
  Boxes,
  Orbit,
  Layers3,
  Disc3,
  Zap,
]

export function FrankxHomepageConceptPage({ concept }: { concept: FrankxHomepageConcept }) {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:76px_76px] opacity-45" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-2 rounded-[8px] border border-white/12 bg-white/[0.035] px-3 text-sm font-medium text-white/72 transition hover:border-cyan-300/35 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Homepage
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold text-emerald-200">{concept.label}</p>
              <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
                {concept.name}
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-white/68">
                {concept.summary}
              </p>
            </div>

            <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-white/45">L99 design score</p>
                  <p className="mt-2 font-mono text-5xl font-semibold text-white">{concept.score}</p>
                </div>
                <ShieldCheck className="h-10 w-10 text-emerald-200" aria-hidden />
              </div>
              <div className="mt-8 grid grid-cols-5 gap-2">
                {concept.palette.map((color) => (
                  <div
                    key={color}
                    className="h-12 rounded-[8px] border border-white/10"
                    style={{ backgroundColor: color }}
                    aria-label={`Palette color ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {[
              ['Hero system', concept.hero],
              ['Motion system', concept.motion],
              ['Sound system', concept.sound],
            ].map(([title, body]) => (
              <div key={title} className="rounded-[8px] border border-white/10 bg-black/28 p-6">
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                <p className="mt-4 text-sm leading-6 text-white/58">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-[8px] border border-white/10 bg-white/[0.025] p-3">
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
              {iconRail.map((Icon, index) => (
                <div
                  key={`${concept.slug}-${index}`}
                  className="flex aspect-square items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.035]"
                >
                  <Icon className="h-5 w-5 text-cyan-200" aria-hidden />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[8px] border border-emerald-300/18 bg-emerald-300/[0.045] p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                <CheckCircle2 className="h-5 w-5 text-emerald-200" aria-hidden />
                Why it works
              </h2>
              <div className="mt-5 space-y-4">
                {concept.why.map((item) => (
                  <p key={item} className="text-sm leading-6 text-white/64">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-[8px] border border-amber-300/18 bg-amber-300/[0.045] p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                <Sparkles className="h-5 w-5 text-amber-200" aria-hidden />
                Open risks
              </h2>
              <div className="mt-5 space-y-4">
                {concept.risks.map((item) => (
                  <p key={item} className="text-sm leading-6 text-white/64">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-100"
            >
              View production homepage
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/design-lab"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-white/14 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/35"
            >
              Design lab index
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
