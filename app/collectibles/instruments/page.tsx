'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Music, Shield, Eye } from 'lucide-react'
import CheckoutButton from '@/components/commerce/CheckoutButton'

const prints = [
  {
    id: 'print-piano',
    title: 'Bio-Tech Grand Piano',
    subtitle: 'Glass body. Titanium frame. Neural network strings.',
    image: '/images/gallery/instruments/biotech-grand-piano.png',
    edition: '1 of 10',
    price: 47,
    originalPrice: 97,
    details: 'Photorealistic cutaway of a concert grand piano reimagined with biotechnology. Transparent glass body reveals titanium skeletal frame with bioluminescent neural network strings that glow cyan when struck.',
  },
  {
    id: 'print-violin',
    title: 'Bio-Tech Violin Blueprint',
    subtitle: 'Carbon-fiber body. Mycelium chambers. Fiber-optic strings.',
    image: '/images/gallery/instruments/biotech-violin-blueprint.png',
    edition: '1 of 10',
    price: 47,
    originalPrice: 97,
    details: 'Technical exploded-view blueprint of a bio-tech violin. Carbon-fiber body with transparent amber resin panels and mycelium-grown acoustic chambers. Fiber-optic strings transmit light as sound.',
  },
  {
    id: 'print-controller',
    title: 'Synthesis Controller',
    subtitle: 'Obsidian panels. Coral knobs. Bio-luminescent faders.',
    image: '/images/gallery/instruments/biotech-synthesis-controller.png',
    edition: '1 of 10',
    price: 37,
    originalPrice: 67,
    details: 'A future music production desk merging organic and technological. Obsidian glass panels with living coral-like controller knobs that pulse with audio signal. Bio-luminescent fader strips respond to touch.',
  },
  {
    id: 'print-soundboard',
    title: 'Mycelium Soundboard Cross-Section',
    subtitle: 'Engineered mycelium channels. Gold nano-wire pickups.',
    image: '/images/gallery/instruments/biotech-soundboard-mycelium.png',
    edition: '1 of 10',
    price: 37,
    originalPrice: 67,
    details: 'Extreme close-up cross-section of an engineered mycelium soundboard. Acoustic channels branch like river deltas with embedded gold nano-wire pickups at each node.',
  },
  {
    id: 'print-drums',
    title: 'Hex Drum Array',
    subtitle: 'Translucent silicone. Bioluminescent cells. Titanium honeycomb.',
    image: '/images/gallery/instruments/biotech-hex-drum-pads.png',
    edition: '1 of 10',
    price: 37,
    originalPrice: 67,
    details: 'Hexagonal drum pads built from bio-tech materials. Translucent silicone surfaces over bioluminescent cells that shift color with strike intensity. Titanium honeycomb housing.',
  },
  {
    id: 'print-lab',
    title: 'Future Music Laboratory',
    subtitle: 'The complete vision. Living acoustic panels. Crystal reverb.',
    image: '/images/gallery/instruments/biotech-future-lab.png',
    edition: '1 of 10',
    price: 97,
    originalPrice: 197,
    details: 'Wide establishing shot of a future music laboratory. Bio-tech grand piano as centerpiece, walls of living acoustic panels, holographic sheet music, crystal stalactite ceiling for natural reverb.',
  },
]

export default function InstrumentPrintsPage() {
  const totalPrice = prints.reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-cyan-500/8 rounded-full blur-[150px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <span>/</span>
            <Link href="/collectibles" className="hover:text-white transition-colors">Collectibles</Link>
            <span>/</span>
            <span className="text-white/70">Instrument Prints</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8">
              <Music className="w-4 h-4" />
              Limited Edition
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Bio-Tech{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Instrument Prints
              </span>
            </h1>

            <p className="text-xl text-white/50 max-w-2xl mx-auto mb-6">
              Concert grand pianos with neural network strings. Violins with mycelium acoustics.
              Each design is a numbered edition of 10 — engineering precision meets living intelligence.
            </p>

            <div className="flex items-center justify-center gap-6 text-white/40 text-sm mb-10">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Numbered Editions</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{prints.length} Designs</span>
              </div>
              <div className="flex items-center gap-2">
                <span>10 Per Edition</span>
              </div>
            </div>

            {/* Bundle CTA */}
            <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="text-left">
                <div className="text-sm text-white/40">Complete Collection (6 prints)</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">${Math.round(totalPrice * 0.7)}</span>
                  <span className="text-sm text-white/30 line-through">${totalPrice}</span>
                  <span className="text-xs text-emerald-400 font-medium">Save 30%</span>
                </div>
              </div>
              <CheckoutButton price={Math.round(totalPrice * 0.7)} label="Get Bundle" size="md" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prints Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {prints.map((print, index) => (
            <motion.div
              key={print.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden hover:border-cyan-500/20 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={print.image}
                  alt={print.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/80 via-transparent to-transparent" />

                {/* Edition badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white/70 text-xs font-medium flex items-center gap-1.5">
                  <Shield className="w-3 h-3" />
                  {print.edition}
                </div>

                {/* View in gallery link */}
                <Link
                  href="/gallery/instruments"
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white/50 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3 h-3" />
                  View in Gallery
                </Link>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {print.title}
                </h3>
                <p className="text-sm text-white/40 mb-3">{print.subtitle}</p>
                <p className="text-sm text-white/45 leading-relaxed mb-6 line-clamp-2">
                  {print.details}
                </p>

                {/* Purchase row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">${print.price}</span>
                    {print.originalPrice && (
                      <span className="text-sm text-white/30 line-through">${print.originalPrice}</span>
                    )}
                  </div>
                  <CheckoutButton price={print.price} label="Get Print" size="sm" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Info section */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">About These Prints</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'AI-Generated Originals', description: 'Each design was generated with Gemini 3 Pro Image at maximum resolution and quality tier, using detailed technical prompts rooted in real acoustic engineering.' },
              { title: 'Numbered Editions', description: 'Every print is individually numbered (1 of 10). Once all 10 are sold, that edition is closed permanently. Each buyer receives a certificate of authenticity.' },
              { title: 'Print Quality', description: 'Museum-grade giclée prints on archival Hahnemühle Photo Rag 308gsm paper. Fade-resistant for 100+ years. Ships flat in protective packaging worldwide.' },
            ].map(item => (
              <div key={item.title} className="text-center">
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
