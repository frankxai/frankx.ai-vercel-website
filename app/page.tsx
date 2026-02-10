'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 overflow-x-hidden">
      {/* Cinematic Background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(120,50,255,0.15),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none" />

      {/* Navigation (Simplified for Manifesto feel) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-sm">
        <div className="text-xl font-bold tracking-tighter">FrankX</div>
        <div className="flex gap-6 text-sm font-medium text-neutral-400">
          <Link href="/agents" className="hover:text-white transition">Agents</Link>
          <Link href="/about" className="hover:text-white transition">Story</Link>
          <Link href="/design-lab" className="hover:text-white transition">Lab</Link>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20">

        {/* H E R O */}
        <section className="px-6 flex flex-col items-center text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-purple-300 font-mono">
              The Agentic Creator OS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-7xl md:text-9xl font-bold tracking-tighter leading-none bg-gradient-to-b from-white via-white to-neutral-500 bg-clip-text text-transparent max-w-5xl mx-auto"
          >
            Create with <br />
            <span className="text-purple-500">Soul & System.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            Transform from overwhelmed creator to AI-empowered artist.
            Leverage a team of specialized agents to amplify your voice, not replace it.
          </motion.p>
        </section>

        {/* C A R D S */}
        <section className="px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-[2rem] bg-neutral-900/50 border border-white/5 backdrop-blur-md"
          >
            <div className="text-4xl mb-6">🤖</div>
            <h3 className="text-2xl font-bold mb-2">Agent Team</h3>
            <p className="text-neutral-400 leading-relaxed">
              Deploy Claude, Codex, and Antigravity to build software, write content, and design worlds.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-[2rem] bg-gradient-to-br from-purple-900/20 to-neutral-900/50 border border-purple-500/20 backdrop-blur-md"
          >
            <div className="text-4xl mb-6">⚡</div>
            <h3 className="text-2xl font-bold mb-2">Design Lab</h3>
            <p className="text-neutral-400 leading-relaxed">
              Access high-fidelity UI experiments and biomimetic design systems rooted in nature.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-[2rem] bg-neutral-900/50 border border-white/5 backdrop-blur-md"
          >
            <div className="text-4xl mb-6">🔮</div>
            <h3 className="text-2xl font-bold mb-2">Soulbook</h3>
            <p className="text-neutral-400 leading-relaxed">
              A life design system that aligns your creative output with your deepest purpose.
            </p>
          </motion.div>
        </section>

      </main>
    </div>
  );
}
