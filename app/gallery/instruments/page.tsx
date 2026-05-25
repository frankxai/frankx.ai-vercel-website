'use client'

import { MidjourneyGallery, type AIArtwork } from '@/components/embeds'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Sparkles, Music, Cpu } from 'lucide-react'

// ── Bio-Tech Instrument Concepts ────────────────────────────────────────────
const instrumentArtworks: AIArtwork[] = [
  {
    id: 'inst-01',
    src: '/images/gallery/instruments/biotech-grand-piano.png',
    title: 'Bio-Tech Grand Piano',
    prompt: 'Photorealistic cutaway view of a concert grand piano reimagined with biotechnology: transparent glass body revealing titanium skeletal frame, bioluminescent neural network strings that glow cyan when struck, mycelium-threaded soundboard with golden circuit traces, dark navy studio background with subtle volumetric lighting',
    model: 'nano-banana',
    category: 'Piano',
    tags: ['piano', 'glass', 'titanium', 'neural', 'bioluminescent'],
    featured: true,
    parameters: 'Gemini 3 Pro | High Resolution | Pro Tier',
    createdAt: '2026-02-13',
  },
  {
    id: 'inst-02',
    src: '/images/gallery/instruments/biotech-violin-blueprint.png',
    title: 'Bio-Tech Violin Blueprint',
    prompt: 'Technical exploded-view blueprint of a bio-tech violin: carbon-fiber body with transparent amber resin panels, mycelium-grown acoustic chambers visible inside, fiber-optic strings that transmit light as sound, engineered bridge with micro-sensor array, dark background with precise measurement annotations in cyan',
    model: 'nano-banana',
    category: 'Strings',
    tags: ['violin', 'blueprint', 'carbon-fiber', 'mycelium', 'exploded-view'],
    featured: true,
    parameters: 'Gemini 3 Pro | High Resolution | Pro Tier',
    createdAt: '2026-02-13',
  },
  {
    id: 'inst-03',
    src: '/images/gallery/instruments/biotech-synthesis-controller.png',
    title: 'Bio-Tech Synthesis Controller',
    prompt: 'Futuristic music production desk merging organic and technological: obsidian glass panels with living coral-like controller knobs that pulse with audio signal, bio-luminescent fader strips, transparent display showing waveforms rendered as bio-film organisms, dark studio environment with purple and cyan accent lighting',
    model: 'nano-banana',
    category: 'Electronic',
    tags: ['synthesizer', 'controller', 'coral', 'obsidian', 'studio'],
    parameters: 'Gemini 3 Pro | High Resolution | Pro Tier',
    createdAt: '2026-02-13',
  },
  {
    id: 'inst-04',
    src: '/images/gallery/instruments/biotech-soundboard-mycelium.png',
    title: 'Mycelium Soundboard Cross-Section',
    prompt: 'Extreme close-up cross-section of a piano soundboard reimagined: traditional spruce grain replaced with engineered mycelium acoustic channels that branch like river deltas, embedded gold nano-wire pickups at each node, neural pressure sensors along the bridge, macro photography style with shallow depth of field, dark background',
    model: 'nano-banana',
    category: 'Piano',
    tags: ['soundboard', 'mycelium', 'cross-section', 'macro', 'nano-wire'],
    parameters: 'Gemini 3 Pro | High Resolution | Pro Tier',
    createdAt: '2026-02-13',
  },
  {
    id: 'inst-05',
    src: '/images/gallery/instruments/biotech-hex-drum-pads.png',
    title: 'Bio-Tech Hex Drum Array',
    prompt: 'Array of hexagonal drum pads built from bio-tech materials: translucent silicone surfaces over bioluminescent cells that change color with strike intensity (blue→cyan→green→gold), titanium honeycomb housing, visible piezo-neural sensor mesh underneath each pad, arranged in ergonomic cluster, dark performance stage lighting',
    model: 'nano-banana',
    category: 'Percussion',
    tags: ['drums', 'hexagonal', 'bioluminescent', 'titanium', 'performance'],
    parameters: 'Gemini 3 Pro | High Resolution | Pro Tier',
    createdAt: '2026-02-13',
  },
  {
    id: 'inst-06',
    src: '/images/gallery/instruments/biotech-future-lab.png',
    title: 'Future Music Laboratory',
    prompt: 'Wide establishing shot of a future music laboratory: bio-tech grand piano as centerpiece, walls of living acoustic panels that breathe and adjust, holographic sheet music floating above instruments, ceiling of engineered crystal stalactites for natural reverb, floor channels with flowing bioluminescent coolant, a single musician silhouetted working at dawn',
    model: 'nano-banana',
    category: 'Environment',
    tags: ['laboratory', 'studio', 'establishing-shot', 'holographic', 'dawn'],
    featured: true,
    parameters: 'Gemini 3 Pro | High Resolution | Pro Tier',
    createdAt: '2026-02-13',
  },
]

// ── Design Principles ───────────────────────────────────────────────────────
const principles = [
  {
    icon: Cpu,
    title: 'Engineering Precision',
    description: 'Every component is designed with real acoustic engineering principles — soundboard grain patterns, string tension calculations, resonance chamber geometry.',
  },
  {
    icon: Sparkles,
    title: 'Living Intelligence',
    description: 'Mycelium networks, bioluminescent cells, and neural sensors transform passive instruments into responsive, adaptive organisms.',
  },
  {
    icon: Music,
    title: 'Performance Heritage',
    description: 'Bio-tech augments tradition rather than replacing it. A grand piano is still a grand piano — just one that can feel what you play.',
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────
export default function InstrumentsGalleryPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-cyan-500/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[128px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/40 text-sm mb-10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
            <span>/</span>
            <span className="text-white/70">Instruments</span>
          </div>

          {/* Hero content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                <Music className="w-4 h-4" />
                Bio-Tech Design Concepts
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                Instruments{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Reimagined
                </span>
              </h1>

              <p className="text-lg text-white/50 leading-relaxed mb-8 max-w-lg">
                Where engineering precision meets living intelligence.
                Concert grand pianos with neural network strings. Violins with mycelium acoustics.
                Synthesis controllers grown from coral. Every concept pushes beyond what
                instruments could be in 2026 and beyond.
              </p>

              <div className="flex items-center gap-6 text-white/40 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {instrumentArtworks.length} Concepts
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Gemini 3 Pro
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  High Resolution
                </div>
              </div>
            </motion.div>

            {/* Featured image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10"
            >
              <Image
                src="/images/gallery/instruments/biotech-grand-piano.png"
                alt="Bio-Tech Grand Piano — glass body, titanium frame, bioluminescent neural network strings"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white/70 text-sm font-medium">
                Bio-Tech Grand Piano — Glass + Titanium + Neural Networks
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]"
            >
              <p.icon className="w-6 h-6 text-cyan-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">{p.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">All Concepts</h2>
          <p className="text-white/45">Click any image to view full resolution with generation prompt.</p>
        </motion.div>

        <MidjourneyGallery
          artworks={instrumentArtworks}
          layout="masonry"
          columns={2}
          showPrompts={true}
          showFilters={false}
          theme="tech"
        />
      </section>

      {/* Back to Gallery CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white font-medium rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
