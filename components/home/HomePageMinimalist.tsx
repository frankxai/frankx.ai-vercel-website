'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * V7: Minimalist Homepage
 *
 * Apple-inspired ultra-clean design with maximum whitespace,
 * subtle typography, and single-focus sections
 */

export default function HomePageMinimalist() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero - Maximum simplicity */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8">
            Frank X
          </h1>
          <p className="text-xl md:text-2xl text-black/50 font-light mb-12">
            AI Architect. Creator. Builder.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-lg text-black/70 hover:text-black transition-colors"
          >
            Learn more <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Work Section */}
      <section className="py-32 px-6 border-t border-black/5">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.3em] text-black/40 mb-12"
          >
            What I Build
          </motion.p>

          <div className="space-y-24">
            {[
              {
                title: 'AI Systems',
                description: 'Enterprise-grade agentic orchestration and intelligent automation.',
                href: '/ai-architect',
              },
              {
                title: 'Music',
                description: '500+ AI-generated songs exploring sound, frequency, and emotion.',
                href: '/music-lab',
              },
              {
                title: 'Products',
                description: 'Operating systems for creators. Prompts, workflows, frameworks.',
                href: '/products',
              },
              {
                title: 'Content',
                description: 'Tutorials, guides, and deep-dives on AI tools and creative workflows.',
                href: '/blog',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={item.href} className="group block">
                  <div className="flex items-baseline justify-between border-b border-black/10 pb-8 group-hover:border-black/30 transition-colors">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-light mb-4 group-hover:text-black/70 transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-lg text-black/50 max-w-xl">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-black/30 group-hover:text-black group-hover:translate-x-2 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 px-6 bg-black/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light leading-relaxed text-black/70"
          >
            "Excellence in execution. Let the work speak."
          </motion.blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-8">
              Stay in the loop
            </h2>
            <p className="text-lg text-black/50 mb-12">
              Monthly insights on AI tools, creative workflows, and building in public.
            </p>
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full hover:bg-black/80 transition-colors"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
