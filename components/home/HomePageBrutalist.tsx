'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

/**
 * V8: Brutalist Homepage
 *
 * Raw, intentionally rough aesthetic with harsh contrasts,
 * monospace fonts, visible borders, and anti-design elements
 */

export default function HomePageBrutalist() {
  return (
    <main className="min-h-screen bg-[#FFFEF0] text-black font-mono">
      {/* Hero */}
      <section className="min-h-screen border-b-4 border-black p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-4 border-black p-8 md:p-16 mb-8">
              <h1 className="text-6xl md:text-[12vw] leading-none font-bold uppercase tracking-tight">
                FRANK X
              </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-4 border-black p-6 bg-black text-[#FFFEF0]">
                <span className="text-xs uppercase tracking-widest">ROLE</span>
                <p className="text-2xl mt-2">AI ARCHITECT</p>
              </div>
              <div className="border-4 border-black p-6">
                <span className="text-xs uppercase tracking-widest">LOCATION</span>
                <p className="text-2xl mt-2">AMSTERDAM, NL</p>
              </div>
            </div>

            <p className="text-xl md:text-2xl mt-12 max-w-3xl leading-relaxed">
              I build enterprise AI systems by day and create music, products, and content by night.
              500+ songs. Multiple products. Zero bullshit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Work Grid */}
      <section className="p-6 md:p-12 border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold uppercase mb-12">
            WHAT I MAKE_
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                num: '01',
                title: 'AI SYSTEMS',
                desc: 'Agentic orchestration, Claude Code mastery, enterprise automation',
                href: '/ai-architect',
                highlight: true,
              },
              {
                num: '02',
                title: 'MUSIC',
                desc: '500+ AI songs, Suno mastery, frequency exploration',
                href: '/music-lab',
              },
              {
                num: '03',
                title: 'PRODUCTS',
                desc: 'Operating systems for creators, prompts, workflows',
                href: '/products',
              },
              {
                num: '04',
                title: 'CONTENT',
                desc: 'Technical tutorials, guides, deep-dives',
                href: '/blog',
              },
            ].map((item) => (
              <Link
                key={item.num}
                href={item.href}
                className={`group border-4 border-black p-8 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] ${
                  item.highlight ? 'bg-[#FF3366] text-white' : ''
                }`}
              >
                <span className="text-xs opacity-50">{item.num}</span>
                <h3 className="text-3xl font-bold mt-2 flex items-center gap-2">
                  {item.title}
                  <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className={`mt-4 ${item.highlight ? 'text-white/80' : 'text-black/60'}`}>
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="p-6 md:p-12 border-b-4 border-black bg-black text-[#FFFEF0]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'SONGS', value: '500+' },
              { label: 'BLOG POSTS', value: '100+' },
              { label: 'PRODUCTS', value: '5' },
              { label: 'YEARS AI', value: '7+' },
            ].map((stat) => (
              <div key={stat.label} className="border-2 border-[#FFFEF0]/30 p-6 text-center">
                <p className="text-4xl md:text-5xl font-bold">{stat.value}</p>
                <p className="text-xs uppercase tracking-widest mt-2 opacity-50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="p-6 md:p-12 border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="border-4 border-black p-8 md:p-16">
            <h2 className="text-2xl md:text-4xl font-bold uppercase mb-8">
              THE MANIFESTO_
            </h2>
            <div className="space-y-4 text-lg md:text-xl">
              <p>→ SHIP DAILY</p>
              <p>→ LET THE WORK SPEAK</p>
              <p>→ BUILD IN PUBLIC</p>
              <p>→ NO BULLSHIT</p>
              <p>→ HUMBLE EXCELLENCE</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/newsletter"
              className="group border-4 border-black p-8 bg-[#00FF88] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] transition-all"
            >
              <h3 className="text-3xl font-bold flex items-center gap-2">
                SUBSCRIBE
                <ArrowUpRight className="w-6 h-6" />
              </h3>
              <p className="mt-4 text-black/60">
                Monthly insights. No spam. Unsubscribe anytime.
              </p>
            </Link>
            <Link
              href="/about"
              className="group border-4 border-black p-8 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] transition-all"
            >
              <h3 className="text-3xl font-bold flex items-center gap-2">
                ABOUT ME
                <ArrowUpRight className="w-6 h-6" />
              </h3>
              <p className="mt-4 text-black/60">
                The full story. Background. What drives me.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
