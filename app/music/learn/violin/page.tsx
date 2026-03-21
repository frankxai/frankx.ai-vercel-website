'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ViolinLearnPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <p className="text-5xl">🎻</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Learn Violin</h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
            Curated violin learning resources — from open strings to advanced repertoire. The best teachers, free sheet music, and inspiring violinists.
          </p>
        </motion.header>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <p className="text-6xl">🚧</p>
          <h2 className="mt-4 text-2xl font-bold text-white">Full guide coming soon</h2>
          <p className="mt-2 text-white/50">
            A comprehensive, curated violin learning path — from Suzuki method to concert pieces, with German and international teachers.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/music/learn/piano" className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80">
            🎹 Learn Piano
          </Link>
          <Link href="/music/learn" className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80">
            ← All Instruments
          </Link>
          <Link href="/music" className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80">
            ← Music
          </Link>
        </div>
      </div>
    </div>
  )
}
