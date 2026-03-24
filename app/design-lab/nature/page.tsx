'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Download,
  Leaf,
  Sparkles,
  TreePine,
  Waves,
  Gem,
  FlowerIcon,
  Mountain,
  Eye,
  Palette,
  Zap,
  CircleDot,
} from 'lucide-react'

// ── Image Data ──────────────────────────────────────────────────────────
const natureImages = [
  {
    src: '/images/design-lab/nature-01-digital-garden-hero.png',
    title: 'Digital Garden',
    subtitle: 'Neural tree with circuit roots and glassmorphic code panels',
    category: 'Hero',
    icon: TreePine,
    principle: 'Organic Architecture',
    description:
      'A bioluminescent neural network growing as a living tree. Translucent glass branches carry data particles like sap. Circuit board roots anchor the system in structured logic. The trunk holds glassmorphic code panels — where nature meets computation.',
  },
  {
    src: '/images/design-lab/nature-02-neural-roots.png',
    title: 'Neural Roots',
    subtitle: 'Data flowing through crystalline root systems underground',
    category: 'Foundation',
    icon: CircleDot,
    principle: 'Deep Infrastructure',
    description:
      'Cross-section view of glowing neural pathways inside translucent roots. Purple bioluminescent veins carry data packets through the earth. Above ground, a single elegant stem emerges — simplicity from complexity.',
  },
  {
    src: '/images/design-lab/nature-03-code-vines.png',
    title: 'Code Vines',
    subtitle: 'Luminous code growing organically on midnight walls',
    category: 'Growth',
    icon: Leaf,
    principle: 'Organic Growth',
    description:
      'Lines of code curl and branch like ivy, each bearing glassmorphic flower buds that preview UI components. Dewdrops on the vines are tiny data orbs. Code that grows rather than being written.',
  },
  {
    src: '/images/design-lab/nature-04-data-streams.png',
    title: 'Data Streams',
    subtitle: 'Liquid crystal rivers flowing through midnight forest',
    category: 'Flow',
    icon: Waves,
    principle: 'Natural Flow',
    description:
      'Holographic data streams flow like a luminous river between obsidian rocks with embedded circuits. Bioluminescent moss emits soft emerald light. Data that flows like water — finding the path of least resistance.',
  },
  {
    src: '/images/design-lab/nature-05-forest-architecture.png',
    title: 'Forest Architecture',
    subtitle: 'Ancient cathedral trees forming neural network canopy',
    category: 'Structure',
    icon: Mountain,
    principle: 'Cathedral Scale',
    description:
      'Towering trees with circuit traces under translucent bark. Branches interweave at synapse nodes glowing purple and cyan. The forest floor has a subtle hex grid. A glassmorphic terminal floats in the clearing — the interface within the architecture.',
  },
  {
    src: '/images/design-lab/nature-06-seeds-of-intelligence.png',
    title: 'Seeds of Intelligence',
    subtitle: 'Crystalline pods containing miniature circuit boards',
    category: 'Origin',
    icon: Sparkles,
    principle: 'Emergent Beginnings',
    description:
      'Tiny seed pods on dark soil, each containing a glowing circuit board visible through translucent organic shell. Some have cracked open, revealing fiber optic sprouts. Every great system starts as a seed.',
  },
  {
    src: '/images/design-lab/nature-07-intelligence-bloom.png',
    title: 'Intelligence Bloom',
    subtitle: 'Flower with glassmorphic UI petals and fiber optic stem',
    category: 'Expression',
    icon: FlowerIcon,
    principle: 'Full Expression',
    description:
      'An extraordinary flower where each petal is a translucent UI component — dashboard, code editor, waveform. The center radiates purple-to-cyan intelligence light. Pollen particles carry data symbols. Technology in full bloom.',
  },
  {
    src: '/images/design-lab/nature-08-ecosystem-map.png',
    title: 'Ecosystem Map',
    subtitle: 'Aerial view of living digital biomes connected by neural paths',
    category: 'System',
    icon: Eye,
    principle: 'Ecosystem Thinking',
    description:
      'Bird\'s eye view of an island with distinct tech biomes — crystalline AI peak, bioluminescent content forest, liquid data delta, golden music coast. Neural pathways connect everything. The whole is greater than its parts.',
  },
  {
    src: '/images/design-lab/nature-09-crystal-garden.png',
    title: 'Crystal Garden',
    subtitle: 'Amethyst crystals with circuit patterns and holographic UIs',
    category: 'Material',
    icon: Gem,
    principle: 'Crystalline Clarity',
    description:
      'Amethyst and tourmaline crystals with gold circuit etchings growing from volcanic rock. The largest crystal contains a holographic dashboard. Bioluminescent mushrooms glow between formations. Structure emerging from pressure and time.',
  },
  {
    src: '/images/design-lab/nature-10-constellation-garden.png',
    title: 'Constellation Garden',
    subtitle: 'Night garden with data constellation patterns in the sky',
    category: 'Connection',
    icon: Sparkles,
    principle: 'Connected Universe',
    description:
      'Bioluminescent flowers with circuit-pattern veins reach toward a sky of data constellations. Light threads connect flower tips to star points, mirroring network topology. Golden data fireflies bridge earth and sky.',
  },
]

// ── Design Principles ───────────────────────────────────────────────────
const designPrinciples = [
  {
    title: 'Organic Architecture',
    description: 'Structures grow rather than being built. Branches instead of boxes. Roots instead of foundations. Every layout feels like it emerged naturally from the content.',
    color: 'emerald',
  },
  {
    title: 'Bioluminescent Hierarchy',
    description: 'Light guides attention. Important elements glow brighter — purple for intelligence, cyan for technology, emerald for growth, gold for creation. No harsh borders needed.',
    color: 'purple',
  },
  {
    title: 'Glassmorphic Ecology',
    description: 'Interfaces are transparent organisms in the environment, not opaque barriers. You see through them into the system beneath. Maximum opacity 0.08.',
    color: 'cyan',
  },
  {
    title: 'Neural Connectivity',
    description: 'Everything connects. Lines between elements suggest neural pathways. Hover states reveal hidden connections. The site breathes as one living system.',
    color: 'amber',
  },
  {
    title: 'Crystalline Data',
    description: 'Data is precious — displayed like mineral specimens. Tables are crystal formations. Charts are living organisms. Numbers glow with significance.',
    color: 'rose',
  },
]

// ── Diagram Comparison ──────────────────────────────────────────────────
const diagramApproaches = [
  { name: 'ASCII Art', bundle: '0 KB', cost: '$0', quality: 2, mobile: 'Breaks', a11y: 'None', verdict: 'Current — needs replacing' },
  { name: 'Mermaid.js', bundle: '~800KB', cost: '$0', quality: 5, mobile: 'OK', a11y: 'SVG title', verdict: 'Too heavy, looks generic' },
  { name: 'D2 (build-time)', bundle: '0 KB', cost: '$0', quality: 7, mobile: 'Good', a11y: 'SVG', verdict: 'Good for docs, not premium' },
  { name: 'React Flow', bundle: '~80KB', cost: 'Free / Pro $129/mo', quality: 8, mobile: 'Good', a11y: 'ARIA', verdict: 'Great for interactive diagrams' },
  { name: 'AI Images', bundle: '0 KB', cost: '~$0.01/img', quality: 9, mobile: 'Perfect', a11y: 'Alt text', verdict: 'Best for hero visuals' },
  { name: 'Custom SVG React', bundle: '0 KB', cost: 'Dev time', quality: 9, mobile: 'Perfect', a11y: 'Full ARIA', verdict: 'Best for reusable diagrams' },
]

// ── Color tokens ────────────────────────────────────────────────────────
const accentMap: Record<string, string> = {
  emerald: 'from-emerald-500/20 to-emerald-500/0 text-emerald-400 border-emerald-500/20',
  purple: 'from-purple-500/20 to-purple-500/0 text-purple-400 border-purple-500/20',
  cyan: 'from-cyan-500/20 to-cyan-500/0 text-cyan-400 border-cyan-500/20',
  amber: 'from-amber-500/20 to-amber-500/0 text-amber-400 border-amber-500/20',
  rose: 'from-rose-500/20 to-rose-500/0 text-rose-400 border-rose-500/20',
}

// ── Animation Variants ──────────────────────────────────────────────────
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

export default function NatureDesignLabPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-20 pt-32 md:px-8">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-emerald-500/8 blur-[128px]" />
          <div className="absolute right-1/4 top-1/4 h-80 w-80 rounded-full bg-purple-500/6 blur-[128px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative mx-auto max-w-5xl text-center"
        >
          <motion.div variants={fadeIn} className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
            <Leaf className="h-4 w-4" />
            Design Lab — Nature × Technology
          </motion.div>

          <motion.h1 variants={fadeIn} className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            The Digital Garden
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Design System
            </span>
          </motion.h1>

          <motion.p variants={fadeIn} className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/60">
            Where organic intelligence meets premium technology. A design philosophy
            that makes interfaces feel alive — rooted in nature, powered by code,
            illuminated by data.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#gallery"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-semibold text-black transition-opacity hover:opacity-90"
            >
              Explore 10 Concepts <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#principles"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3 font-medium text-white/80 backdrop-blur-sm transition-colors hover:bg-white/[0.06]"
            >
              <Palette className="h-4 w-4" /> Design Guidelines
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Hero Image ─────────────────────────────────────────── */}
      <section className="px-6 pb-20 md:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10"
        >
          <Image
            src="/images/design-lab/nature-01-digital-garden-hero.png"
            alt="Digital Garden — Bioluminescent neural tree with circuit board roots and glassmorphic code panels on dark navy background"
            width={1376}
            height={768}
            className="h-auto w-full"
            priority
          />
        </motion.div>
      </section>

      {/* ── Vision Statement ───────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-white/[0.02] px-6 py-20 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xl leading-relaxed text-white/70 md:text-2xl md:leading-relaxed">
            &ldquo;The best interfaces don&rsquo;t feel like software.
            They feel like <span className="text-emerald-400">gardens</span> —
            spaces where ideas <span className="text-cyan-400">grow</span>,
            connections form <span className="text-purple-400">naturally</span>,
            and every path leads somewhere meaningful.&rdquo;
          </p>
          <p className="mt-6 text-sm font-medium text-white/40">
            The FrankX Nature × Technology Design Philosophy
          </p>
        </div>
      </section>

      {/* ── Gallery ────────────────────────────────────────────── */}
      <section id="gallery" className="scroll-mt-20 px-6 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="mb-12 text-center"
          >
            <motion.h2 variants={fadeIn} className="mb-3 text-3xl font-bold text-white md:text-4xl">
              10 Concept Explorations
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-white/50">
              AI-generated with Gemini 3 Pro via Nano Banana MCP. Each explores a different nature-tech fusion.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-2"
          >
            {natureImages.map((img, i) => {
              const Icon = img.icon
              return (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                  onClick={() => setSelectedImage(i)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.description}
                      width={1376}
                      height={768}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
                        {img.category}
                      </span>
                    </div>
                    <div className="absolute right-4 top-4 rounded-full bg-black/40 p-2 text-white/60 backdrop-blur-sm">
                      <span className="text-xs font-mono">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-emerald-400" />
                      <h3 className="text-lg font-semibold text-white">{img.title}</h3>
                    </div>
                    <p className="mb-3 text-sm text-white/50">{img.subtitle}</p>
                    <p className="text-sm leading-relaxed text-white/60">{img.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400/60">
                      <Zap className="h-3 w-3" />
                      <span>Principle: {img.principle}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ───────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[90vh] max-w-6xl overflow-hidden rounded-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={natureImages[selectedImage].src}
                alt={natureImages[selectedImage].description}
                width={1376}
                height={768}
                className="h-auto w-full"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-bold text-white">{natureImages[selectedImage].title}</h3>
                <p className="mt-1 text-sm text-white/60">{natureImages[selectedImage].description}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white/60 backdrop-blur-sm transition-colors hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(Math.max(0, selectedImage - 1)) }}
                  className="rounded-full bg-black/50 p-2 text-white/60 backdrop-blur-sm transition-colors hover:text-white disabled:opacity-30"
                  disabled={selectedImage === 0}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(Math.min(natureImages.length - 1, selectedImage + 1)) }}
                  className="rounded-full bg-black/50 p-2 text-white/60 backdrop-blur-sm transition-colors hover:text-white disabled:opacity-30"
                  disabled={selectedImage === natureImages.length - 1}
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Design Principles ──────────────────────────────────── */}
      <section id="principles" className="scroll-mt-20 border-t border-white/[0.06] bg-white/[0.02] px-6 py-20 md:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12 text-center"
          >
            <motion.h2 variants={fadeIn} className="mb-3 text-3xl font-bold text-white md:text-4xl">
              Nature × Tech Design Principles
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-white/50">
              Five principles for interfaces that feel alive.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {designPrinciples.map((principle, i) => {
              const colors = accentMap[principle.color]
              return (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className={`rounded-2xl border ${colors.split(' ').slice(-1)[0]} bg-gradient-to-b ${colors.split(' ').slice(0, 2).join(' ')} p-6`}
                >
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-white/30">
                    Principle {i + 1}
                  </div>
                  <h3 className={`mb-3 text-lg font-bold ${colors.split(' ')[2]}`}>
                    {principle.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {principle.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Diagram Alternatives ───────────────────────────────── */}
      <section id="diagrams" className="scroll-mt-20 px-6 py-20 md:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12"
          >
            <motion.h2 variants={fadeIn} className="mb-3 text-3xl font-bold text-white md:text-4xl">
              Replacing ASCII Art: Cost & ROI
            </motion.h2>
            <motion.p variants={fadeIn} className="max-w-2xl text-lg text-white/50">
              22 blog posts contain 1,516 lines of ASCII diagrams rendered as code blocks.
              Here&rsquo;s what premium alternatives actually cost at scale.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="overflow-x-auto rounded-2xl border border-white/[0.08]"
          >
            <table className="min-w-full text-sm">
              <thead className="border-b border-white/[0.08] bg-white/[0.03]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/60">Approach</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/60">Bundle</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/60">Cost</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white/60">Quality</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/60">Mobile</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/60 hidden md:table-cell">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {diagramApproaches.map((approach, i) => (
                  <tr key={i} className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium text-white/90">{approach.name}</td>
                    <td className="px-4 py-3 text-white/60 font-mono text-xs">{approach.bundle}</td>
                    <td className="px-4 py-3 text-white/60">{approach.cost}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: 10 }).map((_, j) => (
                          <div
                            key={j}
                            className={`h-1.5 w-1.5 rounded-full ${
                              j < approach.quality
                                ? approach.quality >= 8
                                  ? 'bg-emerald-400'
                                  : approach.quality >= 5
                                  ? 'bg-amber-400'
                                  : 'bg-rose-400'
                                : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/60">{approach.mobile}</td>
                    <td className="px-4 py-3 text-white/40 text-xs hidden md:table-cell">{approach.verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { tier: 'Tier 1: Hero Visuals', desc: 'AI-generated images via Nano Banana. Unique, premium, $0.01 each.', color: 'emerald' },
              { tier: 'Tier 2: Technical Diagrams', desc: 'Custom React SVG components. Reusable templates, brand-styled, $0.', color: 'cyan' },
              { tier: 'Tier 3: Quick Docs', desc: 'Mermaid with dark theme. Internal only, never production-facing.', color: 'purple' },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
              >
                <div className={`mb-2 text-xs font-semibold uppercase tracking-wider text-${item.color}-400`}>
                  {item.tier}
                </div>
                <p className="text-sm text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CSS Specs ──────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-white/[0.02] px-6 py-20 md:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8 text-3xl font-bold text-white md:text-4xl"
          >
            Nature-Tech CSS Tokens
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-white/[0.08]">
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
              <pre className="overflow-x-auto bg-[#0d1117] p-5 text-sm leading-relaxed text-white/80 font-mono">
{`/* Nature-Tech Color Extensions */
--nature-root: #1a0f2e;     /* Deep soil */
--nature-bark: #2a1f3e;     /* Tree bark */
--nature-moss: #0d3320;     /* Forest floor */
--nature-canopy: #0a2e1f;   /* Canopy shade */
--nature-stream: #0c2d4a;   /* Water depth */

/* Bioluminescent Accents */
--glow-synapse: #AB47C7;    /* Neural nodes */
--glow-data: #43BFE3;       /* Data flow */
--glow-growth: #10B981;     /* Organic growth */
--glow-creation: #F59E0B;   /* Creative energy */

/* Ambient Animations */
--pulse-slow: 8s ease-in-out infinite;
--drift-gentle: 12s linear infinite;
--glow-breathe: 4s ease-in-out infinite;`}
              </pre>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/[0.08]">
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <pre className="overflow-x-auto bg-[#0d1117] p-5 text-sm leading-relaxed text-white/80 font-mono">
{`/* Nature Background Patterns */
.nature-hex-grid {
  background-image:
    linear-gradient(30deg,
      rgba(16,185,129,0.03) 12%,
      transparent 12.5%);
  background-size: 60px 104px;
}

/* Bioluminescent Glow */
.glow-node {
  box-shadow:
    0 0 20px rgba(171,71,199,0.15),
    0 0 60px rgba(171,71,199,0.05);
  animation: var(--glow-breathe);
}

/* Neural Connection Line */
.neural-path {
  stroke: url(#gradient-neural);
  stroke-width: 1;
  opacity: 0.3;
  animation: var(--pulse-slow);
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="px-6 py-20 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to grow your digital garden?
          </h2>
          <p className="mb-8 text-lg text-white/50">
            These concepts are explorations. The best ones will be adapted into
            production pages on FrankX.AI — homepage, hubs, and blog visualizations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/design-lab/nature/variants"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-semibold text-black transition-opacity hover:opacity-90"
            >
              View Hub Variants <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/design-lab"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3 font-medium text-white/80 transition-colors hover:bg-white/[0.06]"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Design Lab
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
