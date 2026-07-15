import Link from 'next/link'
import { ArrowRight, BookOpen, Check, Cloud, Cpu, Database, Gauge, MemoryStick, Network } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { HARDWARE_CATEGORIES } from '@/data/hardware-taxonomy'
import { ldJson } from '@/lib/seo/jsonld'

export const metadata = createMetadata({
  title: 'Learn AI Hardware: Workstations, Local Models, Cloud GPUs | FrankX',
  description: 'A practical AI hardware learning path covering compute, memory, local systems, cloud GPUs, data-center accelerators, edge AI, and fleet architecture.',
  path: '/learn/ai-hardware',
})

const modules = [
  { number: '01', title: 'Compute vocabulary', body: 'Separate CPU, GPU, NPU, VRAM, unified memory, bandwidth, precision, power, and context cache.', icon: Cpu, href: '/ai-hardware/local-ai' },
  { number: '02', title: 'Machines you own', body: 'Compare laptops, workstations, mini PCs, unified-memory nodes, and small fleets by operating role.', icon: MemoryStick, href: '/ai-hardware/workstations' },
  { number: '03', title: 'Capacity you rent', body: 'Understand APIs, serverless inference, cloud instances, bare metal, spot capacity, and reservation risk.', icon: Cloud, href: '/ai-hardware/cloud-gpus' },
  { number: '04', title: 'Physical infrastructure', body: 'Place accelerators inside servers, storage, networking, power, cooling, and an operating model.', icon: Database, href: '/ai-hardware/data-center' },
  { number: '05', title: 'Model and media fit', body: 'Estimate what loads, what remains responsive, and when cloud remains the better quality or scale layer.', icon: Gauge, href: '/ai-hardware#compare' },
  { number: '06', title: 'Fleet architecture', body: 'Route complete jobs across specialized nodes before attempting distributed inference or cluster complexity.', icon: Network, href: '/ai-hardware/home-labs' },
]

const learningSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'AI Hardware Decision Fundamentals',
  description: 'A practical learning path for selecting local, cloud, data-center, and edge AI compute.',
  provider: { '@type': 'Organization', name: 'FrankX', url: 'https://frankx.ai' },
  url: 'https://frankx.ai/learn/ai-hardware',
  isAccessibleForFree: true,
}

export default function LearnAIHardwarePage() {
  const localRoutes = HARDWARE_CATEGORIES.filter((category) => category.cluster === 'local')
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(learningSchema) }} />
      <section className="relative overflow-hidden border-b border-white/[0.06] px-5 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_5%,rgba(124,58,237,0.12),transparent_50%),radial-gradient(ellipse_at_16%_18%,rgba(6,182,212,0.08),transparent_45%)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-sm text-violet-300"><BookOpen className="h-4 w-4" />AI hardware learning path</div>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">Understand the system before you buy the machine.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/55 sm:text-xl">Learn the memory, workload, operating, and economic principles that survive the next product launch.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="#curriculum" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">Start the curriculum <ArrowRight className="h-4 w-4" /></Link><Link href="/ai-hardware" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/70">Open the planner</Link></div>
        </div>
      </section>

      <section id="curriculum" className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr]"><div><p className="text-sm text-cyan-300">Six modules</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">From silicon to operating model.</h2></div><p className="max-w-3xl text-base leading-7 text-white/50">The course separates durable concepts from volatile products. Each module ends in a live decision route where the concept becomes an architecture choice.</p></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => { const Icon = module.icon; return <Link key={module.number} href={module.href} className="group bg-[#0d0d0f] p-7 transition-colors hover:bg-white/[0.035]"><div className="flex items-center justify-between"><span className="font-mono text-xs text-white/25">{module.number}</span><Icon className="h-4 w-4 text-cyan-300/60" /></div><h3 className="mt-10 text-lg font-semibold">{module.title}</h3><p className="mt-3 text-sm leading-6 text-white/45">{module.body}</p><span className="mt-8 inline-flex items-center gap-2 text-sm text-white/50 group-hover:text-white">Study this decision <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link> })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.015] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div><p className="text-sm text-emerald-300">Local systems</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">Learn by device role.</h2><p className="mt-5 text-sm leading-6 text-white/45">Every form factor has a different job. The name on the box is less important than its memory topology, sustained power, software, and second-life role.</p></div>
          <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">{localRoutes.map((route) => <Link key={route.slug} href={`/ai-hardware/${route.slug}`} className="group flex items-center justify-between gap-6 py-5"><div><h3 className="text-base font-medium">{route.shortTitle}</h3><p className="mt-1 text-sm text-white/40">{route.summary}</p></div><ArrowRight className="h-4 w-4 shrink-0 text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-white/60" /></Link>)}</div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end"><div><p className="text-sm text-violet-300">Learning outcome</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Produce a defensible compute plan.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/50">You should be able to explain what stays local, what stays elastic, the largest workload each node supports, and the metric that triggers expansion.</p></div><div className="space-y-3">{['Workload envelope', 'Memory and runtime fit', 'Local-cloud boundary', 'Power and operating owner', 'Expansion trigger'].map((item) => <div key={item} className="flex items-center gap-3 text-sm text-white/60"><Check className="h-4 w-4 text-emerald-300/70" />{item}</div>)}</div></div>
        </div>
      </section>
    </main>
  )
}
