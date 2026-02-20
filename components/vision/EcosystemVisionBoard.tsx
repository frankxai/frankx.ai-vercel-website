'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const visionImages = [
  {
    src: '/images/ecosystem/01-frankx-ecosystem-overview.png',
    alt: 'FrankX Ecosystem Overview — interconnected systems architecture',
    title: 'Ecosystem Overview',
    href: '/vision',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/ecosystem/02-acos-6-layer-architecture.png',
    alt: 'ACOS 6-Layer Architecture — autonomous coding operating system',
    title: 'ACOS Architecture',
    href: '/products/agentic-creator-os',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/ecosystem/07-arcanea-10-gates.png',
    alt: 'Arcanea 10 Gates — mythology-infused creative development system',
    title: 'Arcanea 10 Gates',
    href: '/arcanea',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/ecosystem/09-agent-specialist-grid.png',
    alt: 'Agent Specialist Grid — multi-agent system with specialized roles',
    title: 'Agent Specialists',
    href: '/products',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/design-lab/nature-01-digital-garden-hero.png',
    alt: 'Digital Garden — bioluminescent forest of code and neural networks',
    title: 'Digital Garden',
    href: '/design-lab/nature',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/design-lab/nature-10-constellation-garden.png',
    alt: 'Constellation Garden — organic intelligence meets dark technology',
    title: 'Constellation Garden',
    href: '/design-lab/nature',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/social/claude-code-command-center.png',
    alt: 'Claude Code Command Center — AI development workspace',
    title: 'Command Center',
    href: '/blog',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/social/great-transition-split.png',
    alt: 'The Great Transition — from the old world to the builder economy',
    title: 'The Great Transition',
    href: '/blog/the-great-transition',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/vision/ecosystem-constellation.png',
    alt: 'Ecosystem Constellation — nodes of creation connected in deep space',
    title: 'Ecosystem Constellation',
    href: '/vision',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/ecosystem/05-value-ladder-progression.png',
    alt: 'Value Ladder Progression — from free to premium product tiers',
    title: 'Value Ladder',
    href: '/shop',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/ecosystem/12-creative-ai-toolkit.png',
    alt: 'Creative AI Toolkit — music production and generative art tools',
    title: 'Creative AI Toolkit',
    href: '/music',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/design-lab/nature-05-forest-architecture.png',
    alt: 'Forest Architecture — organic neural network growing from dark earth',
    title: 'Forest Architecture',
    href: '/design-lab/nature',
    aspect: 'landscape' as const,
  },
]

const INITIAL_SHOW = 6

export default function EcosystemVisionBoard() {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? visionImages : visionImages.slice(0, INITIAL_SHOW)

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/8 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-violet-400/70">
            The Ecosystem in Pictures
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
            100+ premium visuals.{' '}
            <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
              One ecosystem.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/50">
            Every image represents a system, a concept, or a product — all
            interconnected, all hand-crafted.
          </p>
        </motion.div>

        {/* Masonry grid using CSS columns */}
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {displayed.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group mb-5 break-inside-avoid"
            >
              <a
                href={img.href}
                className="relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={i < INITIAL_SHOW ? 'eager' : 'lazy'}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#030712]/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex w-full items-center justify-between p-4">
                      <span className="text-sm font-medium text-white">
                        {img.title}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-white/60" />
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Show more / less */}
        {visionImages.length > INITIAL_SHOW && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white/80"
            >
              {showAll
                ? 'Show less'
                : `Show all ${visionImages.length} images`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
