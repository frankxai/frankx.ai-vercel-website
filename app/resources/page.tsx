'use client'

import type { ComponentType } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import Floating3DAsset, { Icon3D } from '@/components/ui/Floating3DAsset'

// ============================================================================
// 3D ICON MAPPING
// ============================================================================

const icon3DMap = {
  music: '/images/3d/music_3d.png',
  sparkles: '/images/3d/sparkles_3d.png',
  layers: '/images/3d/3dicons-file-text-dynamic-premium.png',
  bot: '/images/3d/brain_3d.png',
  book: '/images/3d/3dicons-notebook-dynamic-premium.png',
  wand: '/images/3d/magic_wand_3d.png',
  star: '/images/3d/3dicons-star-dynamic-premium.png',
  heart: '/images/3d/3dicons-heart-dynamic-premium.png',
  graduation: '/images/3d/3dicons-medal-dynamic-premium.png',
  rocket: '/images/3d/3dicons-rocket-dynamic-premium.png',
  gift: '/images/3d/3dicons-gift-dynamic-premium.png',
  bulb: '/images/3d/3dicons-bulb-dynamic-premium.png',
  headphones: '/images/3d/3dicons-headphone-dynamic-color.png',
  play: '/images/3d/3dicons-play-dynamic-premium.png',
}

// ============================================================================
// BACKGROUND
// ============================================================================

function ResourcesBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-void" />

      <motion.div
        className="absolute -right-52 top-32 h-[640px] w-[640px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.1, 1],
                opacity: [0.25, 0.35, 0.25],
              }
        }
        transition={shouldReduceMotion ? undefined : { duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-64 top-24 h-[560px] w-[560px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1.1, 1, 1.1],
                opacity: [0.2, 0.3, 0.2],
              }
        }
        transition={shouldReduceMotion ? undefined : { duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.15, 1],
                opacity: [0.15, 0.25, 0.15],
              }
        }
        transition={shouldReduceMotion ? undefined : { duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

// ============================================================================
// DATA
// ============================================================================

const productItems = [
  {
    name: 'Vibe OS',
    description: 'AI music creation system with prompts, workflows, and production tips.',
    href: '/products/vibe-os',
    icon3D: icon3DMap.music,
  },
  {
    name: 'Creative AI Toolkit',
    description: 'Prompts, templates, and rituals for creators shipping consistently.',
    href: '/products/creative-ai-toolkit',
    icon3D: icon3DMap.sparkles,
  },
  {
    name: 'Generative Creator OS',
    description: 'A multi-modal studio for music, visuals, and writing.',
    href: '/products/generative-creator-os',
    icon3D: icon3DMap.layers,
  },
  {
    name: 'Agentic Creator OS',
    description: 'Build autonomous agents and developer-grade workflows.',
    href: '/products/agentic-creator-os',
    icon3D: icon3DMap.bot,
  },
]

const foundationItems = [
  {
    name: 'Free Playbooks',
    description: 'Downloadable AI playbooks to get started fast.',
    href: '/free-playbook',
    icon3D: icon3DMap.gift,
  },
  {
    name: 'AI Assessment',
    description: 'Find your next step with a quick assessment.',
    href: '/ai-assessment',
    icon3D: icon3DMap.wand,
  },
  {
    name: 'Prompt Library',
    description: 'Curated prompts for creators and operators.',
    href: '/prompt-library',
    icon3D: icon3DMap.book,
  },
  {
    name: 'Templates',
    description: 'Ready-to-use workflows and checklists.',
    href: '/templates',
    icon3D: icon3DMap.layers,
  },
]

const intelligenceItems = [
  {
    name: 'Intelligence Atlas',
    description: 'Flagship research and frameworks.',
    href: '/intelligence-atlas',
    icon3D: icon3DMap.star,
  },
  {
    name: 'Agentic AI Center',
    description: 'Agent systems, playbooks, and updates.',
    href: '/agentic-ai-center',
    icon3D: icon3DMap.bot,
  },
  {
    name: 'Creation Chronicles',
    description: 'Strategic storytelling OS and narratives.',
    href: '/products/creation-chronicles',
    icon3D: icon3DMap.book,
  },
  {
    name: 'Vibe OS Sessions',
    description: 'AI music experiments and studio notes.',
    href: '/music',
    icon3D: icon3DMap.headphones,
  },
]

const arcaneaItems = [
  {
    name: 'Arcanea',
    description: 'The 100-year future mythology and worldbuilding academy.',
    href: '/magic',
    icon3D: icon3DMap.wand,
  },
  {
    name: 'Arcanea Academy',
    description: 'Guided learning paths for AI worldbuilders.',
    href: '/magic',
    icon3D: icon3DMap.graduation,
  },
  {
    name: 'The Luminors',
    description: 'AI companions for creation and evolution.',
    href: 'https://arcanea.app',
    icon3D: icon3DMap.star,
    external: true,
  },
  {
    name: 'Arcanea Platform',
    description: 'The full Arcanea experience.',
    href: 'https://arcanea.app',
    icon3D: icon3DMap.heart,
    external: true,
  },
]

const learningItems = [
  {
    name: 'Agent Collective OS',
    description: 'Operating system for orchestrating multi-agent collaboration.',
    href: '/guides/agent-collective-operating-system',
    icon3D: icon3DMap.bot,
  },
  {
    name: 'Skills Library Playbook',
    description: 'How to activate the FrankX skill stack with precision.',
    href: '/guides/skills-library-playbook',
    icon3D: icon3DMap.sparkles,
  },
  {
    name: 'Guides',
    description: 'In-depth tutorials and frameworks.',
    href: '/guides',
    icon3D: icon3DMap.book,
  },
  {
    name: 'Blog',
    description: 'Essays, experiments, and launch notes.',
    href: '/blog',
    icon3D: icon3DMap.bulb,
  },
  {
    name: 'Music Lab',
    description: 'Learn to create AI music with Suno.',
    href: '/music-lab',
    icon3D: icon3DMap.music,
  },
  {
    name: 'Students',
    description: 'Learning paths and community.',
    href: '/students',
    icon3D: icon3DMap.graduation,
  },
  {
    name: 'Developers',
    description: 'Agentic workflows for builders.',
    href: '/developers',
    icon3D: icon3DMap.rocket,
  },
]

// ============================================================================
// RESOURCE GRID WITH 3D ICONS
// ============================================================================

function ResourceGrid({
  title,
  subtitle,
  items,
}: {
  title: string
  subtitle: string
  items: Array<{
    name: string
    description: string
    href: string
    icon3D: string
    external?: boolean
  }>
}) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400/70">
            {subtitle}
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-white">{title}</h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const isExternal = item.external
            const LinkComponent = isExternal ? 'a' : Link
            const linkProps = isExternal
              ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
              : { href: item.href }

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <LinkComponent
                  {...linkProps}
                  className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-emerald-500/5"
                >
                  {/* 3D Icon */}
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity" />
                    <Icon3D src={item.icon3D} alt={item.name} size="lg" className="relative" />
                  </div>

                  <div className="flex items-center gap-2 text-base font-semibold text-white">
                    {item.name}
                    {isExternal && <ExternalLink className="h-4 w-4 text-white/40" />}
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </LinkComponent>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function ResourcesPage() {
  return (
    <>
      <ResourcesBackground />
      <main id="main" className="relative min-h-screen pb-16">
        {/* Hero Section */}
        <section className="pt-28 pb-12">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]"
            >
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400/70">
                  Resource Hub
                </p>
                <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-white">
                  Everything you need to build with AI
                </h1>
              <p className="mt-5 text-lg text-slate-400">
                Intelligence systems, free resources, and creative worlds in one place.
                Pick your track and start creating.
              </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/magic"
                    className="rounded-full bg-gradient-to-r from-violet-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-violet-500/25"
                  >
                    Enter Arcanea
                  </Link>
                  <Link
                    href="/products"
                    className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Browse Products
                  </Link>
                </div>
              </div>

              {/* Hero Visual with Floating 3D Assets */}
              <div className="relative">
                <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-violet-500/20 blur-3xl opacity-70" />

                {/* Floating 3D decorations */}
                <Floating3DAsset
                  src={icon3DMap.rocket}
                  position="top-right"
                  size="lg"
                  animation="float"
                  delay={0.2}
                  className="z-20"
                />
                <Floating3DAsset
                  src={icon3DMap.sparkles}
                  position="bottom-left"
                  size="md"
                  animation="pulse"
                  delay={0.4}
                  opacity={80}
                />
                <Floating3DAsset
                  src={icon3DMap.star}
                  position="top-left"
                  size="sm"
                  animation="float"
                  delay={0.6}
                  opacity={60}
                />

                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <Image
                    src="/images/blog/blog-hero-aurora.svg"
                    alt="Aurora illustration representing the FrankX resource universe"
                    width={640}
                    height={640}
                    className="h-auto w-full"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <ResourceGrid title="Start Here" subtitle="Free Resources" items={foundationItems} />
        <ResourceGrid title="Products" subtitle="Systems" items={productItems} />
        <ResourceGrid title="Intelligence" subtitle="Research + Hubs" items={intelligenceItems} />
        <ResourceGrid title="Learning" subtitle="Guides" items={learningItems} />
        <ResourceGrid title="Arcanea" subtitle="Worldbuilding" items={arcaneaItems} />
      </main>
    </>
  )
}
