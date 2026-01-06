'use client'

import type { ComponentType } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Bot,
  ExternalLink,
  GraduationCap,
  Heart,
  Layers,
  Music,
  Sparkles,
  Star,
  Wand2,
} from 'lucide-react'

function ResourcesBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />

      <motion.div
        className="absolute -right-52 top-32 h-[640px] w-[640px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.35, 0.25],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-64 top-24 h-[560px] w-[560px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
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

const productItems = [
  {
    name: 'Vibe OS',
    description: 'AI music creation system with prompts, workflows, and production tips.',
    href: '/products/vibe-os',
    icon: Music,
  },
  {
    name: 'Creative AI Toolkit',
    description: 'Prompts, templates, and rituals for creators shipping consistently.',
    href: '/products/creative-ai-toolkit',
    icon: Sparkles,
  },
  {
    name: 'Generative Creator OS',
    description: 'A multi-modal studio for music, visuals, and writing.',
    href: '/products/generative-creator-os',
    icon: Layers,
  },
  {
    name: 'Agentic Creator OS',
    description: 'Build autonomous agents and developer-grade workflows.',
    href: '/products/agentic-creator-os',
    icon: Bot,
  },
]

const arcaneaItems = [
  {
    name: 'Arcanea',
    description: 'The 100-year future mythology and worldbuilding academy.',
    href: '/magic',
    icon: Wand2,
  },
  {
    name: 'Arcanea Academy',
    description: 'Guided learning paths for AI worldbuilders.',
    href: '/magic',
    icon: GraduationCap,
  },
  {
    name: 'The Luminors',
    description: 'AI companions for creation and evolution.',
    href: 'https://arcanea.app',
    icon: Star,
    external: true,
  },
  {
    name: 'Arcanea Platform',
    description: 'The full Arcanea experience.',
    href: 'https://arcanea.app',
    icon: Heart,
    external: true,
  },
]

const learningItems = [
  {
    name: 'Guides',
    description: 'In-depth tutorials and frameworks.',
    href: '/guides',
    icon: BookOpen,
  },
  {
    name: 'Blog',
    description: 'Essays, experiments, and launch notes.',
    href: '/blog',
    icon: BookOpen,
  },
  {
    name: 'Music Lab',
    description: 'Learn to create AI music with Suno.',
    href: '/music-lab',
    icon: Music,
  },
  {
    name: 'Students',
    description: 'Learning paths and community.',
    href: '/students',
    icon: GraduationCap,
  },
]

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
    icon: ComponentType<{ className?: string }>
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
          {items.map((item) => {
            const Icon = item.icon
            const isExternal = item.external
            const LinkComponent = isExternal ? 'a' : Link
            const linkProps = isExternal
              ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
              : { href: item.href }

            return (
              <LinkComponent
                key={item.name}
                {...linkProps}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 flex items-center gap-2 text-base font-semibold text-white">
                  {item.name}
                  {isExternal && <ExternalLink className="h-4 w-4 text-white/40" />}
                </div>
                <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </LinkComponent>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function ResourcesPage() {
  return (
    <>
      <ResourcesBackground />
      <main id="main" className="relative min-h-screen pb-16">
        <section className="pt-28 pb-12">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400/70">
                Resource Hub
              </p>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-white">
                Everything you need to build with AI
              </h1>
              <p className="mt-5 text-lg text-slate-400">
                Products, Arcanea worldbuilding, and learning paths in one place.
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
            </motion.div>
          </div>
        </section>

        <ResourceGrid title="Products" subtitle="Systems" items={productItems} />
        <ResourceGrid title="Arcanea" subtitle="Worldbuilding" items={arcaneaItems} />
        <ResourceGrid title="Learning" subtitle="Guides" items={learningItems} />
      </main>
    </>
  )
}
