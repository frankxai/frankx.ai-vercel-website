import Link from 'next/link'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Homepage Variations — FrankX Design Lab',
  description:
    '10 uniquely designed homepage variations showcasing different design philosophies — from terminal aesthetics to editorial layouts to AI-native interfaces.',
  path: '/home',
})

const variations = [
  {
    id: 'v1',
    name: 'Cinematic Scroll',
    description: 'Full-viewport scenes, parallax imagery, scroll-driven storytelling',
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-400',
  },
  {
    id: 'v2',
    name: 'Bento Dashboard',
    description: 'Apple/Linear-style bento grid, everything visible at once',
    color: 'from-cyan-500/20 to-cyan-500/5',
    border: 'border-cyan-500/30',
    accent: 'text-cyan-400',
  },
  {
    id: 'v3',
    name: 'Terminal Hacker',
    description: 'Monospace terminal UI, typing animations, matrix rain, green-on-black',
    color: 'from-green-500/20 to-green-500/5',
    border: 'border-green-500/30',
    accent: 'text-green-400',
  },
  {
    id: 'v4',
    name: 'Magazine Editorial',
    description: 'Serif typography, pull quotes, warm tones, print magazine aesthetic',
    color: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/30',
    accent: 'text-amber-400',
  },
  {
    id: 'v5',
    name: 'Immersive Gallery',
    description: 'Photo-forward masonry grid, lightbox previews, images dominate',
    color: 'from-rose-500/20 to-rose-500/5',
    border: 'border-rose-500/30',
    accent: 'text-rose-400',
  },
  {
    id: 'v6',
    name: 'Narrative Journey',
    description: 'Vertical timeline storytelling, chapters from architect to builder',
    color: 'from-violet-500/20 to-violet-500/5',
    border: 'border-violet-500/30',
    accent: 'text-violet-400',
  },
  {
    id: 'v7',
    name: 'Arcanean Mythological',
    description: 'Fantasy-cosmic aesthetic, amber/gold palette, Eldrian guardians',
    color: 'from-orange-500/20 to-orange-500/5',
    border: 'border-orange-500/30',
    accent: 'text-orange-400',
  },
  {
    id: 'v8',
    name: 'Split-Screen Duality',
    description: 'Architect vs Creator, blue vs emerald, two columns in tension',
    color: 'from-blue-500/20 to-blue-500/5',
    border: 'border-blue-500/30',
    accent: 'text-blue-400',
  },
  {
    id: 'v9',
    name: 'Audio-Visual Immersive',
    description: 'Music-first, waveform visualizations, audio-reactive elements',
    color: 'from-purple-500/20 to-purple-500/5',
    border: 'border-purple-500/30',
    accent: 'text-purple-400',
  },
  {
    id: 'v10',
    name: 'Brutalist Minimalist',
    description: 'Anti-design: no gradients, no blur, raw content, maximum speed',
    color: 'from-white/10 to-white/5',
    border: 'border-white/20',
    accent: 'text-white',
  },
]

export default function HomeVariationsGallery() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-emerald-400 uppercase">
            Design Lab
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            10 Homepage Variations
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Same content, 10 different design philosophies. Each variation explores a
            distinct aesthetic while using the same core design system.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {variations.map((v, i) => (
            <Link
              key={v.id}
              href={`/home/${v.id}`}
              className={`group relative overflow-hidden rounded-2xl border ${v.border} bg-gradient-to-br ${v.color} p-6 transition-all duration-300 hover:scale-[1.02] hover:border-opacity-60`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`text-xs font-medium ${v.accent}`}>{v.id.toUpperCase()}</span>
              </div>
              <h2 className="mb-2 text-xl font-bold">{v.name}</h2>
              <p className="text-sm text-slate-400">{v.description}</p>
              <div className="mt-4 text-xs text-slate-500 transition-colors group-hover:text-white">
                View variation &rarr;
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="text-sm text-slate-500 transition-colors hover:text-white"
          >
            &larr; Back to production homepage
          </Link>
        </div>
      </div>
    </main>
  )
}
