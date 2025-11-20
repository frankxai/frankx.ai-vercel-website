'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const showcasePages = [
  {
    id: 'liquid-hero',
    title: 'Liquid Hero',
    description: 'Fluid animations and gradient morphing',
    style: 'Liquid Design',
    gradient: 'from-purple-500 via-pink-500 to-red-500',
    href: '/showcase/liquid-hero',
  },
  {
    id: 'glassmorphic-pricing',
    title: 'Glassmorphic Pricing',
    description: 'Frosted glass cards with backdrop blur',
    style: 'Glassmorphism',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    href: '/showcase/glassmorphic-pricing',
  },
  {
    id: 'neumorphic-product',
    title: 'Neumorphic Product',
    description: 'Soft UI with elevated shadows',
    style: 'Neumorphism',
    gradient: 'from-slate-400 via-slate-500 to-slate-600',
    href: '/showcase/neumorphic-product',
  },
  {
    id: 'brutalist-portfolio',
    title: 'Brutalist Portfolio',
    description: 'Bold typography and raw aesthetics',
    style: 'Brutalism',
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
    href: '/showcase/brutalist-portfolio',
  },
  {
    id: 'gradient-mesh',
    title: 'Gradient Mesh Features',
    description: 'Complex mesh gradients and blur effects',
    style: 'Gradient Mesh',
    gradient: 'from-pink-500 via-purple-500 to-indigo-500',
    href: '/showcase/gradient-mesh',
  },
  {
    id: 'interactive-demo',
    title: 'Interactive Demo',
    description: 'Micro-interactions and hover effects',
    style: 'Interactive',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    href: '/showcase/interactive-demo',
  },
  {
    id: 'parallax-case-study',
    title: 'Parallax Case Study',
    description: 'Scroll-triggered animations',
    style: 'Parallax',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    href: '/showcase/parallax-case-study',
  },
  {
    id: 'liquid-cards-team',
    title: 'Liquid Cards Team',
    description: 'Morphing team cards with hover effects',
    style: 'Liquid Cards',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    href: '/showcase/liquid-cards-team',
  },
  {
    id: 'animated-waitlist',
    title: 'Animated Waitlist',
    description: 'Motion-driven signup experience',
    style: 'Motion Design',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    href: '/showcase/animated-waitlist',
  },
  {
    id: 'holographic-launch',
    title: 'Holographic Launch',
    description: 'Iridescent and holographic effects',
    style: 'Holographic',
    gradient: 'from-cyan-300 via-purple-300 to-pink-300',
    href: '/showcase/holographic-launch',
  },
]

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-cyan-900/20" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,255,0.1),transparent_50%)]" />

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          className="container mx-auto px-6 py-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link
            href="/"
            className="text-slate-400 hover:text-cyan-400 mb-8 inline-block transition-colors"
          >
            ← Back to Home
          </Link>

          <motion.h1
            className="text-7xl md:text-9xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-purple-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Design<br/>Showcase
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            10 different styles of high-end web design. Each page demonstrates
            a unique aesthetic and interaction pattern.
          </motion.p>
        </motion.header>

        {/* Grid */}
        <div className="container mx-auto px-6 pb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcasePages.map((page, index) => (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Link href={page.href}>
                  <motion.div
                    className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${page.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mono text-white/60 mb-2 uppercase tracking-wider">
                          {page.style}
                        </div>
                        <h3 className="text-3xl font-bold mb-3 text-white">
                          {page.title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {page.description}
                        </p>
                      </div>

                      <motion.div
                        className="flex items-center gap-2 text-white font-medium"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        <span>Explore</span>
                        <span className="text-xl">→</span>
                      </motion.div>
                    </div>

                    {/* Shine effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
