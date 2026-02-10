'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Package,
  FileText,
  FlaskConical,
  Users,
  Terminal,
  X,
  ExternalLink,
  Sparkles,
  Leaf,
  Eye,
} from 'lucide-react'

// ── Variant Data ──────────────────────────────────────────────────────

const hubVariants = [
  {
    src: '/images/design-lab/variant-homepage-nature.png',
    title: 'Homepage',
    subtitle: 'Neural tree hero with "Build What Matters" emerging from bioluminescent canopy',
    icon: Home,
    currentUrl: '/',
    color: 'emerald',
    designNotes: [
      'Central neural tree replaces abstract gradient hero',
      'Stats bar as glowing seed pods — organic data visualization',
      'Content cards with river-polished stone aesthetic',
      'Aurora gradient retained but shifted to emerald-cyan organic spectrum',
      'Navigation bar with glassmorphic forest canopy blur',
    ],
    natureElements: ['Neural tree', 'Firefly particles', 'Aurora borealis', 'Seed pod stats'],
    implementationNotes:
      'Replace AuroraBackground with ForestCanopy component. Stats bar uses CSS custom properties for bioluminescent glow. Hero image is a blend of generated art + React canvas overlay for floating particles.',
  },
  {
    src: '/images/design-lab/variant-products-nature.png',
    title: 'Products Hub',
    subtitle: 'Crystal garden with glassmorphic gem cards connected by mycelium networks',
    icon: Package,
    currentUrl: '/products',
    color: 'cyan',
    designNotes: [
      'Product cards as translucent crystal gems — each refracts its brand color',
      'Mycelium network lines show ecosystem relationships between products',
      'Geothermal emerald glow from below suggests deep infrastructure',
      'Leaf-circuit hybrid icon for section header',
      'Hover state: crystal facets rotate, mycelium lines pulse brighter',
    ],
    natureElements: ['Crystal gems', 'Mycelium network', 'Geothermal glow', 'Moss accents'],
    implementationNotes:
      'SVG-based mycelium connections with animated dash-offset. Crystal cards use CSS 3D transforms for faceted appearance. Ambient glow via box-shadow with emerald color at 8% opacity.',
  },
  {
    src: '/images/design-lab/variant-blog-nature.png',
    title: 'Blog Hub',
    subtitle: 'Midnight forest library with floating leaf-cards and vine timeline sidebar',
    icon: FileText,
    currentUrl: '/blog',
    color: 'violet',
    designNotes: [
      'Blog cards float like illuminated leaves in a forest clearing',
      'Featured article as large central canopy element',
      'Growing vine timeline on sidebar shows chronological posts',
      'Category badges glow with bioluminescent colors per topic',
      'Background has subtle forest depth layers (parallax-ready)',
    ],
    natureElements: ['Floating leaves', 'Vine timeline', 'Forest clearing', 'Bioluminescent badges'],
    implementationNotes:
      'Masonry grid with staggered entrance animations. Vine sidebar uses SVG path with growing animation on scroll. Category colors map to nature palette: AI Architecture = emerald, Music = gold, Creator Tools = cyan.',
  },
  {
    src: '/images/design-lab/variant-labs-nature.png',
    title: 'Labs',
    subtitle: 'Greenhouse laboratory hybrid with terrarium experiment cards and holographic metrics',
    icon: FlaskConical,
    currentUrl: '/labs',
    color: 'teal',
    designNotes: [
      'Glass panel terrariums contain each experiment as a specimen',
      'Central holographic tree displays aggregate lab metrics',
      'Navigation tabs styled as crystal formation layers',
      'Bioluminescent borders pulse with data activity',
      'Aurora visible through greenhouse glass ceiling',
    ],
    natureElements: ['Terrariums', 'Holographic tree', 'Crystal tabs', 'Glass panels'],
    implementationNotes:
      'Existing GlowCard pattern adapts well — add inner glass reflection overlay. Holographic tree is a small Lottie or CSS-only animation. Crystal tabs use layered gradients with slight 3D rotation.',
  },
  {
    src: '/images/design-lab/variant-inner-circle-nature.png',
    title: 'Inner Circle',
    subtitle: 'Sacred grove archway with crystal tier system and membership portal',
    icon: Users,
    currentUrl: '/inner-circle',
    color: 'amber',
    designNotes: [
      'Two neural trees form glowing archway — gateway to exclusive content',
      'Membership tiers as crystals of increasing size and luminosity',
      'Glassmorphic portal card centered in the archway',
      'Email signup with emerald glow CTA at center-bottom',
      'Gold accent highlights suggest premium exclusivity',
    ],
    natureElements: ['Sacred grove', 'Crystal tiers', 'Archway portal', 'Gold accents'],
    implementationNotes:
      'Hero image as full-width background with glassmorphic card overlay. Crystal tier cards use CSS gradients matching blue/amber/emerald. Email form integrates existing EmailSignup component with nature-themed styling.',
  },
  {
    src: '/images/design-lab/variant-acos-nature.png',
    title: 'ACOS Hub',
    subtitle: 'Neural forest canopy from above — agent clusters as trees connected by mycelium',
    icon: Terminal,
    currentUrl: '/acos',
    color: 'emerald',
    designNotes: [
      'Aerial view of forest canopy — each tree cluster is an agent type',
      'Mycelium pathways show agent communication channels',
      'Terminal overlay with /acos command and emerald cursor',
      'Stats float as constellation data points in the aurora sky',
      'Deep forest depth creates sense of vast infrastructure beneath',
    ],
    natureElements: ['Forest canopy', 'Mycelium paths', 'Aurora sky', 'Constellation stats'],
    implementationNotes:
      'Background is the AI image. Agent labels positioned absolutely over tree clusters with CSS. Terminal overlay is a glassmorphic strip at bottom. Stats use the same floating particle system as homepage variant.',
  },
]

// ── Color mapping ──

const colorMap: Record<string, { border: string; text: string; bg: string; glow: string }> = {
  emerald: {
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    glow: 'shadow-emerald-500/20',
  },
  cyan: {
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    glow: 'shadow-cyan-500/20',
  },
  violet: {
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    glow: 'shadow-violet-500/20',
  },
  teal: {
    border: 'border-teal-500/30',
    text: 'text-teal-400',
    bg: 'bg-teal-500/10',
    glow: 'shadow-teal-500/20',
  },
  amber: {
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    glow: 'shadow-amber-500/20',
  },
}

// ── Page Component ──

export default function NatureVariantsPage() {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null)

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-0 left-1/4 w-[60%] h-[50%]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[50%] h-[40%]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.03) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/design-lab" className="hover:text-white/60 transition-colors">
                Design Lab
              </Link>
              <span>/</span>
              <Link
                href="/design-lab/nature"
                className="hover:text-white/60 transition-colors"
              >
                Nature
              </Link>
              <span>/</span>
              <span className="text-white/70">Variants</span>
            </div>

            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                Hub Redesign Concepts
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Nature-Tech{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Hub Variants
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/55 mb-6 leading-relaxed max-w-3xl">
              Redesign concepts for the homepage and 5 key hub pages, all following the Nature
              &times; Technology design philosophy. Each variant reimagines a production page
              through the lens of organic intelligence — bioluminescent networks, crystal gardens,
              and forest architectures.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white/50">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  <span className="font-semibold text-white/70">6</span> hub variants
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white/50">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Gemini 3 Pro Image</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white/50">
                <Leaf className="w-3.5 h-3.5 text-violet-400" />
                <span>Nature &times; Tech philosophy</span>
              </div>
            </div>
          </div>
        </section>

        {/* Variant Cards */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {hubVariants.map((variant, index) => {
                const colors = colorMap[variant.color] || colorMap.emerald
                const Icon = variant.icon

                return (
                  <motion.article
                    key={variant.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="group"
                  >
                    {/* Variant Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-2.5 rounded-xl ${colors.bg}`}>
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl md:text-3xl font-bold text-white">
                            {variant.title}
                          </h2>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
                          >
                            Variant #{index + 1}
                          </span>
                        </div>
                        <p className="text-sm text-white/40 mt-1">{variant.subtitle}</p>
                      </div>
                    </div>

                    {/* Image + Details Grid */}
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Large Image (2 cols) */}
                      <div className="lg:col-span-2">
                        <button
                          onClick={() => setSelectedVariant(index)}
                          className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] group/img cursor-pointer"
                        >
                          <Image
                            src={variant.src}
                            alt={`${variant.title} nature-tech design variant`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/img:scale-[1.02]"
                            sizes="(max-width: 1024px) 100vw, 66vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-xs text-white/70 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                            <Eye className="w-3.5 h-3.5" />
                            View full size
                          </div>
                        </button>
                      </div>

                      {/* Details Panel (1 col) */}
                      <div className="space-y-4">
                        {/* Live prototype link (homepage only) */}
                        {index === 0 && (
                          <Link
                            href="/design-lab/nature/variants/homepage"
                            className={`block rounded-xl border ${colors.border} p-4 transition-all hover:bg-white/[0.03]`}
                            style={{ background: `${colorMap[variant.color]?.bg ? '' : ''}rgba(16,185,129,0.04)` }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                                  Live Prototype
                                </p>
                                <p className="text-sm text-white/70 font-medium">
                                  View working implementation
                                </p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-emerald-400" />
                            </div>
                          </Link>
                        )}

                        {/* Current page link */}
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-2">
                            Current Production Page
                          </p>
                          <Link
                            href={variant.currentUrl}
                            className={`inline-flex items-center gap-2 text-sm ${colors.text} hover:underline`}
                          >
                            frankx.ai{variant.currentUrl}
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>

                        {/* Design Notes */}
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-3">
                            Design Notes
                          </p>
                          <ul className="space-y-2">
                            {variant.designNotes.map((note, i) => (
                              <li key={i} className="flex gap-2 text-xs text-white/50">
                                <span className={`mt-0.5 w-1 h-1 rounded-full shrink-0 ${colors.text.replace('text-', 'bg-')}`} />
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Nature Elements */}
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-3">
                            Nature Elements
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {variant.natureElements.map((el) => (
                              <span
                                key={el}
                                className={`text-[10px] px-2 py-1 rounded-md ${colors.bg} ${colors.text} font-medium`}
                              >
                                {el}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Implementation */}
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-2">
                            Implementation Path
                          </p>
                          <p className="text-xs text-white/40 leading-relaxed">
                            {variant.implementationNotes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="py-16 md:py-24 border-t border-white/[0.04]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Implementation Strategy
            </h2>

            <div className="space-y-6">
              {/* Phase 1 */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10">
                    Phase 1
                  </span>
                  <h3 className="text-lg font-bold text-white">Foundation</h3>
                </div>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex gap-2">
                    <span className="text-emerald-400">1.</span>
                    Create shared NatureBackground component (aurora + particles + grain)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-400">2.</span>
                    Define nature-tech CSS custom properties in globals.css
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-400">3.</span>
                    Build ForestCard component (glass + bioluminescent border + hover glow)
                  </li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-500/10">
                    Phase 2
                  </span>
                  <h3 className="text-lg font-bold text-white">Hub Pages</h3>
                </div>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex gap-2">
                    <span className="text-cyan-400">4.</span>
                    Implement Homepage nature variant as A/B test candidate
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-400">5.</span>
                    Apply nature-tech treatment to Products and ACOS hubs
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-400">6.</span>
                    Redesign Blog hub with vine timeline and leaf-card layout
                  </li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-violet-400 px-2 py-0.5 rounded-full bg-violet-500/10">
                    Phase 3
                  </span>
                  <h3 className="text-lg font-bold text-white">Polish & Ship</h3>
                </div>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex gap-2">
                    <span className="text-violet-400">7.</span>
                    Labs and Inner Circle get nature treatment
                  </li>
                  <li className="flex gap-2">
                    <span className="text-violet-400">8.</span>
                    Cross-page particle and aurora consistency pass
                  </li>
                  <li className="flex gap-2">
                    <span className="text-violet-400">9.</span>
                    Performance audit — ensure nature elements add &lt;50KB to bundles
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <p className="text-white/40 text-sm mb-6">
                These concepts are design direction — not final implementations. Each can be
                selectively applied or combined based on user testing and performance metrics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/design-lab/nature"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-6 py-3 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Nature Concept Gallery
                </Link>
                <Link
                  href="/design-lab"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-6 py-3 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
                >
                  All Experiments
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedVariant !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setSelectedVariant(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedVariant(null)}
                className="absolute -top-12 right-0 p-2 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Nav arrows */}
              {selectedVariant > 0 && (
                <button
                  onClick={() => setSelectedVariant(selectedVariant - 1)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 p-3 bg-white/10 rounded-full text-white/60 hover:text-white hover:bg-white/20 transition-all z-10"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              {selectedVariant < hubVariants.length - 1 && (
                <button
                  onClick={() => setSelectedVariant(selectedVariant + 1)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 p-3 bg-white/10 rounded-full text-white/60 hover:text-white hover:bg-white/20 transition-all z-10"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

              {/* Image */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.08]">
                <Image
                  src={hubVariants[selectedVariant].src}
                  alt={hubVariants[selectedVariant].title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-white">
                  {hubVariants[selectedVariant].title}
                </h3>
                <p className="text-sm text-white/40 mt-1">
                  {hubVariants[selectedVariant].subtitle}
                </p>
                <p className="text-xs text-white/25 mt-2">
                  {selectedVariant + 1} / {hubVariants.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
