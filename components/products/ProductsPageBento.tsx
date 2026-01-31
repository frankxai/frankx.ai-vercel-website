'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Music,
  BookOpen,
  Building2,
  Cpu,
  Zap,
} from 'lucide-react'

/**
 * Products Page V2: Bento Grid Layout
 *
 * Modern bento box grid with varying card sizes,
 * glassmorphism, and visual hierarchy
 */

const products = [
  {
    id: 'vibe-os',
    icon: Music,
    name: 'Vibe OS',
    tagline: 'Suno Music Mastery',
    description: 'The system behind 500+ songs. Prompt packs, emotion mapping, and production checklists.',
    href: '/products/vibe-os',
    gradient: 'from-pink-500 to-violet-500',
    featured: true,
    size: 'large',
  },
  {
    id: 'creative-ai-toolkit',
    icon: Sparkles,
    name: 'Creative AI Toolkit',
    tagline: 'Prompt library + workflow rituals',
    description: '100+ validated prompts across storytelling, marketing, and operations.',
    href: '/products/creative-ai-toolkit',
    gradient: 'from-cyan-500 to-blue-500',
    size: 'medium',
  },
  {
    id: 'agentic-creator-os',
    icon: Building2,
    name: 'Agentic Creator OS',
    tagline: 'Developer AI Mastery',
    description: 'Claude Code and Cursor mastery. Agentic workflow patterns.',
    href: '/products/agentic-creator-os',
    gradient: 'from-emerald-500 to-teal-500',
    size: 'medium',
  },
  {
    id: 'creation-chronicles',
    icon: BookOpen,
    name: 'Creation Chronicles',
    tagline: 'Strategic Storytelling OS',
    description: 'Story frameworks, editorial calendars, and prompt stacks.',
    href: '/products/creation-chronicles',
    gradient: 'from-amber-500 to-orange-500',
    size: 'small',
  },
  {
    id: 'generative-creator-os',
    icon: Cpu,
    name: 'Generative Creator OS',
    tagline: 'Multi-modal AI Studio',
    description: 'Multi-modal templates, prompts, and guardrails.',
    href: '/products/generative-creator-os',
    gradient: 'from-rose-500 to-pink-500',
    size: 'small',
  },
]

export default function ProductsPageBento() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent" />
      </div>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-white/70">Digital Products</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Systems I use.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400">
                Packaged for you.
              </span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              The exact frameworks, prompts, and workflows from real projects. No theory.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, index) => {
              const Icon = product.icon
              const isLarge = product.size === 'large'
              const isMedium = product.size === 'medium'

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${isLarge ? 'md:col-span-2 lg:col-span-2' : ''} ${isMedium ? 'lg:col-span-1' : ''}`}
                >
                  <Link
                    href={product.href}
                    className="group block relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all h-full"
                  >
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                    <div className={`relative p-8 ${isLarge ? 'md:p-12' : ''}`}>
                      {/* Featured badge */}
                      {product.featured && (
                        <div className="absolute top-6 right-6">
                          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                            Most Popular
                          </span>
                        </div>
                      )}

                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} p-0.5 mb-6`}>
                        <div className="w-full h-full rounded-2xl bg-[#0a0a0b] flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <p className="text-xs font-medium uppercase tracking-widest text-white/40 mb-2">
                        {product.tagline}
                      </p>
                      <h2 className={`font-bold text-white mb-3 ${isLarge ? 'text-3xl' : 'text-2xl'}`}>
                        {product.name}
                      </h2>
                      <p className={`text-white/50 leading-relaxed ${isLarge ? 'text-lg max-w-xl' : ''}`}>
                        {product.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 mt-6 text-white/50 group-hover:text-white transition-colors">
                        <span className="text-sm font-medium">Join Waitlist</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-cyan-600/20 to-emerald-600/20" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
            <div className="relative p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Get early access
              </h2>
              <p className="text-white/60 mb-8 max-w-lg mx-auto">
                Join the waitlist for priority access, early-bird pricing, and behind-the-scenes updates.
              </p>
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all"
              >
                Join the Waitlist
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
