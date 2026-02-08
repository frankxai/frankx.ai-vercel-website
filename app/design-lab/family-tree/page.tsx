import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, TreePine, Layers, Workflow, CircleDot, Clock, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Family Tree Design Lab | FrankX',
  description: '5 premium family tree visualizations exploring different approaches to displaying the Riemer-Gorte family.',
  robots: { index: false, follow: false },
}

const variants = [
  {
    version: 'v1',
    title: 'Glassmorphic Tree',
    description: 'Enhanced CSS tree with SVG connection paths, frosted glass cards, and animated gradient borders. Zero dependencies beyond Tailwind.',
    icon: Layers,
    color: 'amber',
    tech: ['CSS Grid', 'SVG Paths', 'Tailwind'],
  },
  {
    version: 'v2',
    title: 'Interactive Flow',
    description: 'Draggable node graph with React Flow. Zoom, pan, minimap. Custom glassmorphic node components with animated edges.',
    icon: Workflow,
    color: 'cyan',
    tech: ['React Flow', 'Custom Nodes', 'Minimap'],
  },
  {
    version: 'v3',
    title: 'Radial Orbit',
    description: 'Frank at the center with family radiating outward in concentric rings. Pure SVG with smooth hover animations.',
    icon: CircleDot,
    color: 'violet',
    tech: ['SVG', 'Radial Layout', 'Framer Motion'],
  },
  {
    version: 'v4',
    title: 'Timeline',
    description: 'Generational timeline flowing top to bottom. Each generation is a chapter. Storytelling meets data visualization.',
    icon: Clock,
    color: 'emerald',
    tech: ['CSS Grid', 'Timeline', 'Framer Motion'],
  },
  {
    version: 'v5',
    title: '3D Constellation',
    description: 'Family members as glowing stars in a 3D space. Orbiting camera, connection beams, and interactive hover labels.',
    icon: Sparkles,
    color: 'rose',
    tech: ['Three.js', 'React Three Fiber', 'WebGL'],
  },
]

const colorMap: Record<string, { border: string; text: string; bg: string; badge: string }> = {
  amber: { border: 'border-amber-500/20 hover:border-amber-500/40', text: 'text-amber-400', bg: 'bg-amber-500/10', badge: 'bg-amber-500/15 text-amber-300' },
  cyan: { border: 'border-cyan-500/20 hover:border-cyan-500/40', text: 'text-cyan-400', bg: 'bg-cyan-500/10', badge: 'bg-cyan-500/15 text-cyan-300' },
  violet: { border: 'border-violet-500/20 hover:border-violet-500/40', text: 'text-violet-400', bg: 'bg-violet-500/10', badge: 'bg-violet-500/15 text-violet-300' },
  emerald: { border: 'border-emerald-500/20 hover:border-emerald-500/40', text: 'text-emerald-400', bg: 'bg-emerald-500/10', badge: 'bg-emerald-500/15 text-emerald-300' },
  rose: { border: 'border-rose-500/20 hover:border-rose-500/40', text: 'text-rose-400', bg: 'bg-rose-500/10', badge: 'bg-rose-500/15 text-rose-300' },
}

export default function FamilyTreeLabPage() {
  return (
    <main className="min-h-screen bg-[#030712]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-900/15 via-transparent to-transparent" />
          <div className="absolute left-1/4 top-20 h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute right-1/3 top-40 h-[250px] w-[250px] rounded-full bg-amber-500/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 pb-12 pt-28">
          <Link
            href="/design-lab"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/60"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Design Lab
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <TreePine className="h-8 w-8 text-emerald-400" />
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Family Tree Visualizations
            </h1>
          </div>

          <p className="max-w-2xl text-white/50">
            5 different approaches to visualizing the Riemer-Gorte family tree.
            Same data, different perspectives. From simple CSS to interactive 3D.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {variants.map((v) => {
            const colors = colorMap[v.color]
            return (
              <Link
                key={v.version}
                href={`/design-lab/family-tree/${v.version}`}
                className={`group relative flex flex-col rounded-2xl border ${colors.border} bg-gradient-to-br from-white/[0.03] to-transparent p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg}`}>
                    <v.icon className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <span className="text-xs font-mono font-bold text-white/20 uppercase">{v.version}</span>
                </div>

                <h2 className="mb-2 text-lg font-semibold text-white">{v.title}</h2>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-white/40">{v.description}</p>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {v.tech.map((t) => (
                    <span key={t} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${colors.badge}`}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-sm font-medium text-white/30 transition-colors group-hover:text-white/60">
                  View
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center">
          <p className="text-sm text-white/30">
            All variants read from the same data source:{' '}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-white/50">
              lib/family-tree-data.ts
            </code>
            {' '}which mirrors{' '}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-white/50">
              .frankx/family/*.md
            </code>
          </p>
        </div>
      </section>
    </main>
  )
}
