import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Music, Package, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Interface index | FrankX',
  description: 'A visual index of selected FrankX learning, music, and resource destinations.',
}

const features = [
  {
    name: 'Music learning',
    description: 'Study theory, instruments, production, orchestration, and sound evidence.',
    Icon: Music,
    href: '/music/learn',
    cta: 'Browse music lessons',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/25 via-pink-500/15 to-cyan-500/25 blur-3xl" />
    ),
  },
  {
    name: 'Music lab',
    description: 'Play browser instruments and follow guided notes.',
    Icon: Zap,
    href: '/music-lab',
    cta: 'Explore music lab',
    className: 'col-span-3 lg:col-span-1',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/25 via-sky-500/15 to-violet-500/25 blur-3xl" />
    ),
  },
  {
    name: 'Prompt library',
    description: 'Search attributed prompt patterns from the public corpus.',
    Icon: BookOpen,
    href: '/prompt-library',
    cta: 'Browse prompt patterns',
    className: 'col-span-3 lg:col-span-1',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-cyan-500/30 blur-3xl" />
    ),
  },
  {
    name: 'Product catalog',
    description: 'Review current product pages and their listed availability.',
    Icon: Package,
    href: '/products',
    cta: 'Browse product pages',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-red-500/30 blur-3xl" />
    ),
  },
]

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Hero Section with SplitTextReveal */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-neutral-950 to-cyan-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-violet-500/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="mb-8 text-5xl font-bold md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent">
              Explore the FrankX studio
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Explore selected music, learning, prompt, and product destinations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-indigo-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              Browse products
            </Link>
            <Link
              href="/resources"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-black/80 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              Browse resources
            </Link>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Linked destinations
            </h2>
            <p className="text-xl text-slate-400">
              Each card opens a page you can inspect now.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.Icon
              return (
                <Link
                  key={feature.name}
                  href={feature.href}
                  className={`${feature.className} group relative min-h-64 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950`}
                >
                  {feature.background}
                  <div className="relative flex h-full flex-col items-start">
                    <Icon className="h-10 w-10 text-white" aria-hidden="true" />
                    <h3 className="mt-8 text-2xl font-semibold text-white">{feature.name}</h3>
                    <p className="mt-3 max-w-lg text-slate-300">{feature.description}</p>
                    <span className="mt-auto pt-8 text-sm font-semibold text-cyan-300 group-hover:text-cyan-200">
                      {feature.cta}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 bg-clip-text text-transparent">
            Find a useful starting point
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Browse guides, tools, and learning paths from the resource index.
          </p>
          <Link
            href="/resources"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-indigo-500 px-12 py-5 text-xl font-semibold text-white transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          >
            Browse resources
          </Link>
        </div>
      </section>
    </main>
  )
}
