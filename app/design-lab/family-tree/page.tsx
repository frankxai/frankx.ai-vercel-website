import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  TreePine,
  Layers,
  Workflow,
  CircleDot,
  Clock,
  Sparkles,
  Atom,
  GitBranch,
  ScrollText,
  Film,
  Cpu,
  PieChart,
  Paintbrush,
  FileCode,
  Zap,
  Shuffle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Family Tree Design Lab | FrankX',
  description:
    '15 premium family tree visualizations exploring every approach — from pure CSS to WebGPU, D3 physics to GSAP cinema.',
  robots: { index: false, follow: false },
}

const variants = [
  {
    version: 'v1',
    title: 'Glassmorphic Tree',
    description:
      'Frosted glass cards with SVG connections, animated gradient borders. Zero dependencies beyond Tailwind.',
    icon: Layers,
    color: 'amber',
    tech: ['CSS Grid', 'SVG Paths', 'Tailwind'],
  },
  {
    version: 'v2',
    title: 'Interactive Flow',
    description:
      'Draggable node graph with React Flow. Zoom, pan, minimap. Custom glassmorphic nodes with animated edges.',
    icon: Workflow,
    color: 'cyan',
    tech: ['React Flow', 'Custom Nodes', 'Minimap'],
  },
  {
    version: 'v3',
    title: 'Radial Orbit',
    description:
      'Frank at center with family radiating outward in concentric rings. Pure SVG with smooth hover animations.',
    icon: CircleDot,
    color: 'violet',
    tech: ['SVG', 'Radial Layout', 'Framer Motion'],
  },
  {
    version: 'v4',
    title: 'Timeline',
    description:
      'Generational timeline flowing top to bottom. Each generation is a chapter. Storytelling meets data viz.',
    icon: Clock,
    color: 'emerald',
    tech: ['CSS Grid', 'Timeline', 'Framer Motion'],
  },
  {
    version: 'v5',
    title: '3D Constellation',
    description:
      'Family as glowing stars in 3D space. Orbiting camera, connection beams, interactive hover labels.',
    icon: Sparkles,
    color: 'rose',
    tech: ['Three.js', 'React Three Fiber', 'WebGL'],
  },
  {
    version: 'v6',
    title: 'Force-Directed Graph',
    description:
      'D3 physics simulation — nodes attract and repel based on relationship closeness. Drag to rearrange.',
    icon: Atom,
    color: 'amber',
    tech: ['D3.js', 'd3-force', 'SVG'],
  },
  {
    version: 'v7',
    title: 'Pedigree Chart',
    description:
      'Classic ancestry format — Frank at bottom, branching upward through parents to grandparents.',
    icon: GitBranch,
    color: 'cyan',
    tech: ['CSS Grid', 'SVG Connectors', 'Framer Motion'],
  },
  {
    version: 'v8',
    title: 'Scroll-Driven',
    description:
      'Pure CSS scroll-driven animations. Zero JavaScript animation code. GPU-composited, main-thread-free.',
    icon: ScrollText,
    color: 'violet',
    tech: ['CSS scroll()', 'view()', '0kb JS'],
  },
  {
    version: 'v9',
    title: 'Cinematic Scroll',
    description:
      'GSAP ScrollTrigger for film-quality scroll experience — parallax layers, pinned sections, morphing.',
    icon: Film,
    color: 'emerald',
    tech: ['GSAP', 'ScrollTrigger', 'SVG Draw'],
  },
  {
    version: 'v10',
    title: 'GPU-Enhanced 3D',
    description:
      'Upgraded Three.js with orbital rings, enhanced particles, and WebGPU-ready architecture.',
    icon: Cpu,
    color: 'rose',
    tech: ['Three.js', 'R3F', 'WebGPU-ready'],
  },
  {
    version: 'v11',
    title: 'Sunburst',
    description:
      'Nivo concentric rings — Frank at center, parents first ring, grandparents outer ring. Declarative React.',
    icon: PieChart,
    color: 'amber',
    tech: ['Nivo', 'Sunburst', 'SSR-ready'],
  },
  {
    version: 'v12',
    title: 'Canvas 2D',
    description:
      'Hand-painted HTML Canvas with bezier curves, hover effects, retina support. Export as PNG.',
    icon: Paintbrush,
    color: 'cyan',
    tech: ['Canvas 2D', 'Bezier Curves', 'PNG Export'],
  },
  {
    version: 'v13',
    title: 'Mermaid',
    description:
      'Auto-generated from family data — Mermaid syntax drives the visualization. Toggle layouts.',
    icon: FileCode,
    color: 'violet',
    tech: ['Mermaid.js', 'Auto-gen', 'Markdown'],
  },
  {
    version: 'v14',
    title: 'Web Animations API',
    description:
      'Zero-dependency native browser animations. Uses element.animate() with spring-like CSS linear() easing.',
    icon: Zap,
    color: 'emerald',
    tech: ['Web Animations API', 'linear()', '0kb'],
  },
  {
    version: 'v15',
    title: 'Morphing Layouts',
    description:
      'Three layout modes (tree, radial, grid) with smooth SVG morphing transitions between them.',
    icon: Shuffle,
    color: 'rose',
    tech: ['Anime.js', 'SVG Morph', 'Multi-layout'],
  },
]

const colorMap: Record<
  string,
  { border: string; text: string; bg: string; badge: string }
> = {
  amber: {
    border: 'border-amber-500/20 hover:border-amber-500/40',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    badge: 'bg-amber-500/15 text-amber-300',
  },
  cyan: {
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    badge: 'bg-cyan-500/15 text-cyan-300',
  },
  violet: {
    border: 'border-violet-500/20 hover:border-violet-500/40',
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    badge: 'bg-violet-500/15 text-violet-300',
  },
  emerald: {
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    badge: 'bg-emerald-500/15 text-emerald-300',
  },
  rose: {
    border: 'border-rose-500/20 hover:border-rose-500/40',
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    badge: 'bg-rose-500/15 text-rose-300',
  },
}

function VariantCard({ v }: { v: (typeof variants)[number] }) {
  const colors = colorMap[v.color]
  return (
    <Link
      href={`/design-lab/family-tree/${v.version}`}
      className={`group relative flex flex-col rounded-2xl border ${colors.border} bg-gradient-to-br from-white/[0.03] to-transparent p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors.bg}`}
        >
          <v.icon className={`h-5 w-5 ${colors.text}`} />
        </div>
        <span className="font-mono text-[10px] font-bold uppercase text-white/20">
          {v.version}
        </span>
      </div>
      <h3 className="mb-1.5 text-sm font-semibold text-white">{v.title}</h3>
      <p className="mb-3 flex-1 text-xs leading-relaxed text-white/35">
        {v.description}
      </p>
      <div className="mb-3 flex flex-wrap gap-1">
        {v.tech.map((t) => (
          <span
            key={t}
            className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${colors.badge}`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-white/25 transition-colors group-hover:text-white/60">
        View{' '}
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
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

        <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-28">
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
            15 approaches to the same family data — from pure CSS to WebGPU, D3
            physics to GSAP cinema, Mermaid auto-generation to Anime.js
            morphing. Same source, different perspectives.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/40">
              8 family members
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/40">
              10 relationships
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/40">
              3 generations
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/40">
              15 visualizations
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/20">
          Batch 1 — Foundations
        </h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {variants.slice(0, 5).map((v) => (
            <VariantCard key={v.version} v={v} />
          ))}
        </div>

        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/20">
          Batch 2 — Advanced Techniques
        </h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {variants.slice(5, 10).map((v) => (
            <VariantCard key={v.version} v={v} />
          ))}
        </div>

        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/20">
          Batch 3 — Experimental
        </h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {variants.slice(10).map((v) => (
            <VariantCard key={v.version} v={v} />
          ))}
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center">
          <p className="text-sm text-white/30">
            All 15 variants read from the same data source:{' '}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-white/50">
              lib/family-tree-data.ts
            </code>{' '}
            which mirrors{' '}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-white/50">
              .frankx/family/*.md
            </code>
          </p>
        </div>
      </section>
    </main>
  )
}
