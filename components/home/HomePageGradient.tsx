'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Music, Code2, BookOpen, Zap } from 'lucide-react'
import { useRef } from 'react'

/**
 * V9: Gradient Wave Homepage
 *
 * Stripe/Linear inspired design with smooth animated gradients,
 * flowing curves, and sophisticated color transitions
 */

export default function HomePageGradient() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const gradientRotate = useTransform(scrollYProgress, [0, 1], [0, 180])

  return (
    <main ref={containerRef} className="min-h-screen bg-[#0f0f1a] text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.3), transparent),
              radial-gradient(ellipse 60% 40% at 100% 50%, rgba(255, 107, 107, 0.15), transparent),
              radial-gradient(ellipse 50% 30% at 0% 80%, rgba(52, 211, 153, 0.2), transparent)
            `,
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,100 Q250,50 500,100 T1000,100 T1500,100 L1500,200 L0,200 Z"
            fill="url(#wave-gradient)"
            className="opacity-20"
            animate={{
              d: [
                'M0,100 Q250,50 500,100 T1000,100 T1500,100 L1500,200 L0,200 Z',
                'M0,100 Q250,150 500,100 T1000,100 T1500,100 L1500,200 L0,200 Z',
                'M0,100 Q250,50 500,100 T1000,100 T1500,100 L1500,200 L0,200 Z',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-white/70">AI Architect & Creator</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-8">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400">
              Frank X
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
            Building enterprise AI systems by day. Creating music, products, and content by night.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition-all shadow-lg shadow-violet-500/25"
            >
              <span className="font-medium">Explore My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-all"
            >
              <span className="font-medium text-white/80">Subscribe</span>
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* What I Build */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                What I Build
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Code2,
                title: 'AI Systems',
                description: 'Enterprise-grade agentic orchestration, Claude Code mastery, Oracle Cloud integration',
                href: '/ai-architect',
                gradient: 'from-violet-500/20 to-violet-500/5',
                iconColor: 'text-violet-400',
              },
              {
                icon: Music,
                title: 'Music',
                description: '500+ AI-generated songs exploring ambient, electronic, and cinematic soundscapes',
                href: '/music-lab',
                gradient: 'from-pink-500/20 to-pink-500/5',
                iconColor: 'text-pink-400',
              },
              {
                icon: Zap,
                title: 'Products',
                description: 'Operating systems for creators. Vibe OS, Creative AI Toolkit, and more',
                href: '/products',
                gradient: 'from-cyan-500/20 to-cyan-500/5',
                iconColor: 'text-cyan-400',
              },
              {
                icon: BookOpen,
                title: 'Content',
                description: 'Technical tutorials, guides, and deep-dives on AI tools and creative workflows',
                href: '/blog',
                gradient: 'from-emerald-500/20 to-emerald-500/5',
                iconColor: 'text-emerald-400',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`group block p-8 rounded-3xl bg-gradient-to-br ${item.gradient} border border-white/5 hover:border-white/10 transition-all`}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${item.iconColor}`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                    {item.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed mb-6">{item.description}</p>
                  <div className="flex items-center gap-2 text-white/40 group-hover:text-white/70 transition-colors">
                    <span className="text-sm">Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-cyan-600/20 to-emerald-600/20" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
            <div className="relative p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Stay in the loop
              </h2>
              <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
                Monthly insights on AI tools, creative workflows, and building in public.
              </p>
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all"
              >
                Subscribe to Newsletter
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
