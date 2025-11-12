'use client'

import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'

import { resourceCollections } from '@/lib/hub'

const fadeUpStagger = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 }
}

// Premium magnetic hover card with 3D tilt
function MagneticResourceCard({ collection, index }: { collection: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUpStagger}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.45, 0.27, 0.9] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-950 p-8 backdrop-blur-xl flex flex-col overflow-hidden shadow-2xl hover:shadow-cyan-500/10 transition-shadow duration-500"
    >
      {/* Premium glassmorphism with noise texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay pointer-events-none" />

      {/* Gradient shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(6, 182, 212, 0.08), transparent 40%)"
        }}
      />

      {/* Sparkle icon badge */}
      <motion.div
        animate={isHovered ? { scale: 1.1, rotate: 12 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="inline-flex items-center gap-2 w-fit mb-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
      >
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">Free Resources</span>
      </motion.div>

      <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-br from-white via-white to-white/80 bg-clip-text text-transparent">
        {collection.title}
      </h3>

      <p className="text-base text-slate-300 leading-relaxed mb-4">
        {collection.description}
      </p>

      <div className="mb-6 pb-6 border-b border-white/10">
        <p className="text-xs uppercase tracking-widest text-cyan-400/80 font-semibold mb-2">Who This Is For</p>
        <p className="text-sm text-slate-400 leading-relaxed">{collection.focus}</p>
      </div>

      <ul className="mt-auto space-y-3">
        {collection.items.map((item: any, itemIndex: number) => (
          <motion.li
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
          >
            <Link
              href={item.href}
              className="group/item relative flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:border-cyan-500/40 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10 transition-all duration-300 overflow-hidden"
            >
              {/* Shine effect on item hover */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover/item:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <p className="font-semibold text-white group-hover/item:text-cyan-300 transition-colors">
                  {item.label}
                </p>
                <p className="text-xs text-slate-400 group-hover/item:text-cyan-400/80 transition-colors">
                  {item.type}
                </p>
              </div>

              <motion.div
                animate={isHovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover/item:text-cyan-400 transition-colors" aria-hidden="true" />
              </motion.div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function Resources() {
  return (
    <section id="resources" className="relative bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 py-32 px-6 overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto text-white">
        <motion.div
          className="max-w-3xl mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.21, 0.45, 0.27, 0.9] }}
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300">Everything I've Built, Completely Free</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-white via-white to-slate-300 bg-clip-text text-transparent leading-tight">
            My Creative Lab Resources
          </h2>

          <p className="text-xl text-slate-300 leading-relaxed">
            Every workflow, prompt, and technique I've discovered. No paywalls, no BS—just the good stuff I actually use.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {resourceCollections.map((collection, index) => (
            <MagneticResourceCard key={collection.id} collection={collection} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
