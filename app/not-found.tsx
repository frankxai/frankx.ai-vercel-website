'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Home, Search, BookOpen, Music } from 'lucide-react'
import FrankOmega from '@/components/FrankOmega'

const quickLinks = [
  { href: '/', icon: Home, title: 'Home', desc: 'Back to base', color: 'cyan' },
  { href: '/blog', icon: BookOpen, title: 'Blog', desc: 'Latest writing', color: 'violet' },
  { href: '/music-lab', icon: Music, title: 'Music Lab', desc: 'Listen to tracks', color: 'amber' },
  { href: '/search', icon: Search, title: 'Search', desc: 'Find anything', color: 'emerald' },
] as const

const colorMap: Record<string, string> = {
  cyan: 'bg-cyan-500/15 text-cyan-300 group-hover:bg-cyan-500/25',
  violet: 'bg-violet-500/15 text-violet-300 group-hover:bg-violet-500/25',
  amber: 'bg-amber-500/15 text-amber-300 group-hover:bg-amber-500/25',
  emerald: 'bg-emerald-500/15 text-emerald-300 group-hover:bg-emerald-500/25',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg mx-auto text-center">
        {/* 404 number — giant watermark */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[8rem] sm:text-[10rem] font-bold leading-none tracking-tight text-white/[0.04] select-none mb-2"
        >
          404
        </motion.p>

        {/* FRANK-Omega character — overlaps the 404 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="-mt-24 mb-8 relative z-10"
        >
          <FrankOmega
            variant="chibi"
            size="lg"
            animate
            float
            glow
            speech="This page doesn't exist yet. But I can help you find what you need."
          />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white/90 mb-3 tracking-tight">
            Page not found
          </h1>
          <p className="text-sm text-white/30 mb-10 max-w-sm mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Try one of these instead.
          </p>
        </motion.div>

        {/* Quick links grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-2 gap-2 mb-10"
        >
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${colorMap[link.color]}`}>
                <link.icon className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  {link.title}
                </p>
                <p className="text-[11px] text-white/25">{link.desc}</p>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Start CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
        >
          <Link
            href="/start"
            className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/70 transition-colors font-mono border-b border-white/[0.08] hover:border-white/20 pb-0.5"
          >
            Or start from the beginning <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Footer mark */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-[10px] font-mono text-white/10"
        >
          frankx.ai // FRANK-&#937;
        </motion.p>
      </div>
    </div>
  )
}
