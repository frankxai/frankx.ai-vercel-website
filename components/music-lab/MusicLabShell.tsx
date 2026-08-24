import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Gamepad2,
  Layers,
  Music,
  Music2,
  Play,
  Target,
} from 'lucide-react'

interface LabRoute {
  name: string
  description: string
  href: string
  detail: string
  icon: typeof Music
}

interface LabLane {
  eyebrow: string
  title: string
  description: string
  routes: LabRoute[]
}

const lanes: LabLane[] = [
  {
    eyebrow: 'Play',
    title: 'Choose an instrument',
    description: 'Start with sound. Every instrument works with touch; the main instruments also support a computer keyboard.',
    routes: [
      {
        name: 'Digital Violin',
        description: 'Four strings, first-position fingering, and a continuous bow surface.',
        href: '/music-lab/violin',
        detail: 'New · expressive synth',
        icon: Music2,
      },
      {
        name: 'Grand Piano',
        description: 'A responsive concert piano with velocity, sustain, and stereo samples.',
        href: '/music-lab/piano',
        detail: 'Sampled piano',
        icon: Music,
      },
      {
        name: 'Drum Kit',
        description: 'A direct touch and keyboard kit for timing, groove, and fills.',
        href: '/music-lab/drums',
        detail: 'Touch + keyboard',
        icon: Target,
      },
      {
        name: 'Tropical Pads',
        description: 'Sixteen performance pads for layered loops and melodic ideas.',
        href: '/music-lab/dj-pads',
        detail: '16 pads',
        icon: Layers,
      },
      {
        name: 'Xylophone',
        description: 'A simple pentatonic instrument designed for smaller hands.',
        href: '/music-lab/for-kids/xylophone',
        detail: 'Family friendly',
        icon: Play,
      },
    ],
  },
  {
    eyebrow: 'Guided notes',
    title: 'Build the next phrase',
    description: 'Follow visible note sequences, finger positions, and practical learning guides at your own pace.',
    routes: [
      {
        name: 'Guided Piano',
        description: 'Play highlighted notes through a growing public-domain song library.',
        href: '/music-lab/piano/songs',
        detail: 'Notes + progress',
        icon: BookOpen,
      },
      {
        name: 'Violin Coach',
        description: 'Practice open strings, D major, and familiar first-position phrases.',
        href: '/music-lab/violin?mode=guided',
        detail: 'String + finger tabs',
        icon: Music2,
      },
      {
        name: 'Guided Guitar Tabs',
        description: 'Read six-string tabs one column at a time with reference pitches and tempo control.',
        href: '/music-lab/guitar-tabs',
        detail: 'Tabs + reference audio',
        icon: Music,
      },
    ],
  },
  {
    eyebrow: 'Perform',
    title: 'Turn practice into a take',
    description: 'Test timing or record a short in-browser performance sequence and play it back.',
    routes: [
      {
        name: 'Rhythm Duel',
        description: 'A one- or two-player timing game built around real notes and shared controls.',
        href: '/music-lab/games/rhythm-duel',
        detail: '1–2 players',
        icon: Gamepad2,
      },
      {
        name: 'Violin Performance',
        description: 'Capture note, timing, bow energy, and pressure as a replayable take.',
        href: '/music-lab/violin?mode=perform',
        detail: 'Local event recording',
        icon: Target,
      },
    ],
  },
]

function InstrumentRow({ route }: { route: LabRoute }) {
  const Icon = route.icon

  return (
    <Link
      href={route.href}
      className="group grid min-h-24 grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-stone-300/15 px-1 py-5 transition-colors duration-200 hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f] focus-visible:ring-offset-4 focus-visible:ring-offset-[#11100e] sm:gap-6 sm:px-4"
    >
      <span className="flex size-11 items-center justify-center rounded-full border border-stone-300/20 bg-[#191714] text-[#d9855f]">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span>
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-base font-semibold text-stone-100 sm:text-lg">{route.name}</span>
          <span className="text-xs text-stone-500">{route.detail}</span>
        </span>
        <span className="mt-1 block max-w-2xl text-sm leading-6 text-stone-400">{route.description}</span>
      </span>
      <ArrowRight className="size-4 text-stone-500 transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-[#d9855f]" aria-hidden="true" />
    </Link>
  )
}

function ViolinProof() {
  const strings = [
    { name: 'G', note: 'G3', keys: ['1', '2', '3', '4', '5'] },
    { name: 'D', note: 'D4', keys: ['Q', 'W', 'E', 'R', 'T'] },
    { name: 'A', note: 'A4', keys: ['A', 'S', 'D', 'F', 'G'] },
    { name: 'E', note: 'E5', keys: ['Z', 'X', 'C', 'V', 'B'] },
  ]

  return (
    <div className="rounded-[1.75rem] border border-stone-300/15 bg-[#171512] p-4 shadow-2xl shadow-black/25 sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-stone-300/15 pb-4">
        <div>
          <p className="text-sm font-medium text-[#d9855f]">Digital Violin</p>
          <p className="mt-1 text-xs leading-5 text-stone-500">First position · continuous bow</p>
        </div>
        <span className="rounded-full border border-stone-300/15 px-3 py-1 text-xs text-stone-400">Touch + keys</span>
      </div>

      <div className="mt-5 space-y-4" aria-label="Digital violin string and finger preview">
        {strings.map((string, stringIndex) => (
          <div key={string.name} className="grid grid-cols-[2rem_1fr] items-center gap-3">
            <div>
              <p className="font-mono text-sm font-semibold text-stone-100">{string.name}</p>
              <p className="font-mono text-[10px] text-stone-500">{string.note}</p>
            </div>
            <div className="relative flex items-center justify-between gap-1">
              <span
                className="absolute left-0 right-0 top-1/2 bg-stone-400/50"
                style={{ height: `${Math.max(1, 4 - stringIndex)}px` }}
                aria-hidden="true"
              />
              {string.keys.map((key, index) => (
                <span
                  key={key}
                  className={`relative flex size-8 items-center justify-center rounded-full border font-mono text-[10px] sm:size-9 ${
                    index === 0
                      ? 'border-[#d9855f]/70 bg-[#d9855f] text-[#171512]'
                      : 'border-stone-300/20 bg-[#211e1a] text-stone-400'
                  }`}
                >
                  {key}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-[#d9855f]/35 bg-[#d9855f]/[0.06] p-4">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span>Bow surface</span>
          <span>speed · pressure</span>
        </div>
        <div className="mt-3 h-10 rounded-xl border border-stone-300/15 bg-[linear-gradient(90deg,transparent_0%,rgba(217,133,95,0.18)_50%,transparent_100%)]" />
      </div>
    </div>
  )
}

export function MusicLabShell() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#11100e] text-stone-100">
      <section className="relative border-b border-stone-300/10 px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(217,133,95,0.10),transparent_34%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16">
          <div>
            <p className="text-sm font-medium text-[#d9855f]">FrankX Music Lab</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.045em] text-stone-50 sm:text-6xl lg:text-7xl">
              Play. Practice. Perform.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-stone-400 sm:text-lg sm:leading-8">
              Responsive browser instruments, visible note guidance, and focused performance tools. Start with one note and build a phrase without an account or download.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/music-lab/violin"
                className="mr-14 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#d9855f] px-6 py-3 text-sm font-semibold text-[#16120f] transition-colors duration-200 hover:bg-[#e49773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3b391] focus-visible:ring-offset-4 focus-visible:ring-offset-[#11100e] sm:mr-0"
              >
                Play the violin
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/music-lab/piano/songs"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-stone-300/20 px-6 py-3 text-sm font-semibold text-stone-200 transition-colors duration-200 hover:border-stone-300/40 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f] focus-visible:ring-offset-4 focus-visible:ring-offset-[#11100e]"
              >
                Open guided piano
              </Link>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-stone-300/15 pt-5">
              <div>
                <dt className="text-xs text-stone-500">Interaction</dt>
                <dd className="mt-1 text-sm text-stone-300">Touch + keys</dd>
              </div>
              <div>
                <dt className="text-xs text-stone-500">Guidance</dt>
                <dd className="mt-1 text-sm text-stone-300">Notes + fingers</dd>
              </div>
              <div>
                <dt className="text-xs text-stone-500">Setup</dt>
                <dd className="mt-1 text-sm text-stone-300">No account</dd>
              </div>
            </dl>
          </div>
          <ViolinProof />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        {lanes.map((lane, index) => (
          <section key={lane.eyebrow} className={index === 0 ? '' : 'mt-20'} aria-labelledby={`lane-${index}`}>
            <div className="grid gap-5 pb-6 lg:grid-cols-[0.36fr_0.64fr] lg:gap-12">
              <div>
                <p className="text-sm font-medium text-[#d9855f]">{lane.eyebrow}</p>
                <h2 id={`lane-${index}`} className="mt-2 text-2xl font-semibold tracking-tight text-stone-100 sm:text-3xl">
                  {lane.title}
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-stone-500 sm:text-base">{lane.description}</p>
            </div>
            <div className="border-b border-stone-300/15">
              {lane.routes.map((route) => <InstrumentRow key={`${lane.eyebrow}-${route.name}`} route={route} />)}
            </div>
          </section>
        ))}

        <section className="mt-20 grid gap-8 rounded-[1.75rem] border border-stone-300/15 bg-[#171512] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10" aria-labelledby="composition-heading">
          <div>
            <p className="text-sm font-medium text-[#d9855f]">Compose with AI</p>
            <h2 id="composition-heading" className="mt-2 text-2xl font-semibold tracking-tight text-stone-100 sm:text-3xl">
              Carry the phrase into a full track.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-400 sm:text-base">
              When the musical idea is clear, move into the Vibe OS workflow for prompts, structure, iteration, and release planning.
            </p>
          </div>
          <Link
            href="/products/vibe-os"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-stone-300/20 px-6 py-3 text-sm font-semibold text-stone-200 transition-colors duration-200 hover:border-[#d9855f]/70 hover:text-[#e49773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f] focus-visible:ring-offset-4 focus-visible:ring-offset-[#171512]"
          >
            Explore Vibe OS
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </section>

        <aside className="mt-8 border-l border-[#d9855f]/50 pl-5 text-sm leading-6 text-stone-500">
          The violin synthesizes sound in your browser and records only performance events for replay. It does not use your microphone or upload a recording. Piano samples load from the approved Salamander sample host.
        </aside>
      </div>
    </main>
  )
}
