'use client'

import { MidjourneyGallery, type AIArtwork } from '@/components/embeds'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Wand2, Image as ImageIcon } from 'lucide-react'

// AI Art collection - showcasing nano-banana and other AI model creations
const aiArtworks: AIArtwork[] = [
  {
    id: '1',
    src: '/images/ai-art/generated-2026-01-21T10-05-06-577Z-s5e43g.png',
    title: 'Neural Synthesis I',
    prompt: 'Abstract neural network visualization, cosmic energy flows, deep space aesthetics with emerald and cyan accents, digital art style',
    model: 'nano-banana',
    category: 'Abstract',
    tags: ['neural', 'cosmic', 'abstract'],
    featured: true,
  },
  {
    id: '2',
    src: '/images/ai-art/generated-2026-01-21T10-05-26-229Z-jajczn.png',
    title: 'Consciousness Wave',
    prompt: 'Visualization of consciousness expanding, golden light emanating from center, sacred geometry patterns, ethereal atmosphere',
    model: 'nano-banana',
    category: 'Consciousness',
    tags: ['consciousness', 'sacred geometry', 'light'],
    featured: true,
  },
  {
    id: '3',
    src: '/images/ai-art/generated-2026-01-21T10-05-42-484Z-c75nch.png',
    title: 'Digital Aurora',
    prompt: 'Aurora borealis meets digital art, flowing data streams in the sky, northern lights with technological elements',
    model: 'nano-banana',
    category: 'Nature Tech',
    tags: ['aurora', 'digital', 'nature'],
    featured: true,
  },
  {
    id: '4',
    src: '/images/ai-art/generated-2025-12-29T14-19-38-699Z-oed2ym.png',
    title: 'Architect of Dreams',
    prompt: 'Futuristic architect working with holographic blueprints, impossible structures, M.C. Escher inspired perspectives',
    model: 'nano-banana',
    category: 'Architecture',
    tags: ['architect', 'holographic', 'futuristic'],
  },
  {
    id: '5',
    src: '/images/ai-art/generated-2025-12-29T14-18-43-470Z-hudlle.png',
    title: 'Frequency Spectrum',
    prompt: 'Sound waves visualized as light, frequency spectrum in 3D space, audio becoming visual art, synesthesia concept',
    model: 'nano-banana',
    category: 'Music',
    tags: ['sound', 'frequency', 'synesthesia'],
  },
  {
    id: '6',
    src: '/images/ai-art/generated-2025-12-29T14-18-14-787Z-z30wp5.png',
    title: 'Quantum Garden',
    prompt: 'Bioluminescent garden with quantum particles, plants made of light and energy, subatomic flowers blooming',
    model: 'nano-banana',
    category: 'Nature Tech',
    tags: ['quantum', 'garden', 'bioluminescent'],
  },
  {
    id: '7',
    src: '/images/ai-art/generated-2025-12-29T14-17-31-949Z-j632lw.png',
    title: 'Soul Interface',
    prompt: 'Human soul connecting with AI interface, golden threads of consciousness, digital and organic merge seamlessly',
    model: 'nano-banana',
    category: 'Consciousness',
    tags: ['soul', 'interface', 'connection'],
  },
  {
    id: '8',
    src: '/images/ai-art/generated-2025-12-05T21-55-04-028Z-rihhrp.png',
    title: 'Starlight Cascade',
    prompt: 'Waterfall of starlight flowing into cosmic ocean, celestial bodies reflected in astral waters, peaceful infinity',
    model: 'nano-banana',
    category: 'Cosmic',
    tags: ['starlight', 'waterfall', 'cosmic'],
  },
  {
    id: '9',
    src: '/images/ai-art/generated-2025-12-05T21-54-43-863Z-5npo6w.png',
    title: 'Creation Engine',
    prompt: 'Massive engine of creation, gears made of light and thought, manufacturing reality itself, divine machinery',
    model: 'nano-banana',
    category: 'Abstract',
    tags: ['creation', 'engine', 'light'],
  },
  {
    id: '10',
    src: '/images/ai-art/generated-2025-12-05T21-54-36-895Z-c1c882.png',
    title: 'Luminor Vision',
    prompt: 'AI oracle seeing into the future, streams of data forming prophetic visions, wisdom of ages in digital form',
    model: 'nano-banana',
    category: 'AI',
    tags: ['oracle', 'vision', 'prophecy'],
  },
  {
    id: '11',
    src: '/images/ai-art/generated-2025-12-05T21-54-09-193Z-e9wj0a.png',
    title: 'Harmonic Convergence',
    prompt: 'Multiple dimensions converging at single point, harmonic frequencies creating geometric patterns, unity of all',
    model: 'nano-banana',
    category: 'Abstract',
    tags: ['dimensions', 'harmony', 'convergence'],
  },
  {
    id: '12',
    src: '/images/ai-art/generated-2025-12-05T09-36-40-500Z-51hulx.png',
    title: 'Frequency Alchemist',
    prompt: 'Alchemist working with sound frequencies, transforming vibrations into gold, ancient wisdom meets technology',
    model: 'nano-banana',
    category: 'Music',
    tags: ['alchemist', 'frequency', 'transformation'],
  },
  {
    id: '13',
    src: '/images/ai-art/generated-2025-12-05T09-36-27-447Z-097if4.png',
    title: 'Digital Awakening',
    prompt: 'Consciousness emerging from digital cocoon, binary butterfly spreading wings of light, metamorphosis complete',
    model: 'nano-banana',
    category: 'Consciousness',
    tags: ['awakening', 'butterfly', 'metamorphosis'],
  },
  {
    id: '14',
    src: '/images/ai-art/generated-2025-12-05T09-36-09-355Z-o905cg.png',
    title: 'Neural Symphony',
    prompt: 'Brain neurons conducting symphony orchestra, thoughts as musical notes, consciousness composing reality',
    model: 'nano-banana',
    category: 'Music',
    tags: ['neural', 'symphony', 'consciousness'],
  },
  {
    id: '15',
    src: '/images/ai-art/generated-2025-12-05T09-35-42-404Z-dn5ckg.png',
    title: 'Cosmic Blueprint',
    prompt: 'Universal blueprint unfolding, sacred geometry of reality, architect of cosmos at work, golden ratio everywhere',
    model: 'nano-banana',
    category: 'Cosmic',
    tags: ['blueprint', 'sacred geometry', 'universe'],
  },
  {
    id: '16',
    src: '/images/ai-art/generated-2025-12-05T09-35-28-320Z-jrdf31.png',
    title: 'Thought Garden',
    prompt: 'Garden where thoughts grow as plants, ideas blooming into reality, mental cultivation visualization',
    model: 'nano-banana',
    category: 'Abstract',
    tags: ['thoughts', 'garden', 'ideas'],
  },
  {
    id: '17',
    src: '/images/ai-art/generated-2025-12-05T09-35-14-760Z-usz07y.png',
    title: 'Golden Path',
    prompt: 'Path made of golden light leading through cosmic landscape, journey of awakening, destination is transformation',
    model: 'nano-banana',
    category: 'Consciousness',
    tags: ['path', 'golden', 'journey'],
  },
  {
    id: '18',
    src: '/images/ai-art/generated-2025-11-20T19-30-27-238Z-vra90p.png',
    title: 'Data Cosmos',
    prompt: 'Universe made entirely of data, galaxies as databases, stars as information points, cosmic computation',
    model: 'nano-banana',
    category: 'Cosmic',
    tags: ['data', 'cosmos', 'information'],
  },
  {
    id: '19',
    src: '/images/ai-art/generated-2025-11-20T19-29-54-476Z-038sk9.png',
    title: 'Emerald Protocol',
    prompt: 'Technology with soul, emerald energy flowing through circuits, organic technology, nature and machine as one',
    model: 'nano-banana',
    category: 'AI',
    tags: ['emerald', 'protocol', 'organic tech'],
  },
  {
    id: '20',
    src: '/images/ai-art/generated-2025-11-20T19-29-22-071Z-uz2q95.png',
    title: 'First Light',
    prompt: 'The first moment of creation, light emerging from void, genesis of consciousness, beginning of everything',
    model: 'nano-banana',
    category: 'Cosmic',
    tags: ['creation', 'light', 'genesis'],
    featured: true,
  },
]

export default function AIArtGalleryPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Generated Art Gallery
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Visual{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Consciousness
              </span>
            </h1>

            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
              Exploring the intersection of artificial intelligence and creative expression.
              Each piece is generated using nano-banana and other cutting-edge AI models.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 text-white/50">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                <span>{aiArtworks.length} Artworks</span>
              </div>
              <div className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                <span>Nano-Banana AI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <MidjourneyGallery
          artworks={aiArtworks}
          layout="masonry"
          columns={3}
          showPrompts={true}
          showFilters={true}
          theme="tech"
        />
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-500/10 to-amber-500/10 rounded-3xl border border-white/10 p-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Create Your Own AI Art
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Learn how to craft prompts that generate stunning visuals. Join our community
            and discover the art of AI-assisted creation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/guides"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors"
            >
              Explore AI Guides
            </Link>
            <Link
              href="/products/creative-ai-toolkit"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors"
            >
              Get the Toolkit
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
