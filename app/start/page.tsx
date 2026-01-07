'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, BookOpen, Rocket, Users } from 'lucide-react'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'

export default function StartHere() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-100 via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 sm:text-7xl">
              Start Your Creator Journey
            </h1>
            <p className="text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Three paths to transform how you create with AI
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassmorphicCard variant="luxury" border="glow" hover className="h-full p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-100 mb-4">Launch Artist</h2>
                <p className="text-base text-slate-300 mb-6 leading-relaxed">
                  Ship consistent creative work—music, writing, video—with AI-powered workflows.
                </p>
                <ul className="space-y-3 mb-8 text-base text-slate-200">
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-purple-400" />
                    Start: <Link href="/products/vibe-os" className="text-purple-300 hover:text-purple-200 ml-1">Vibe OS</Link>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-purple-400" />
                    Learn: <Link href="/blog" className="text-purple-300 hover:text-purple-200 ml-1">Creative AI Essays</Link>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-purple-400" />
                    Join: <Link href="/realm" className="text-purple-300 hover:text-purple-200 ml-1">Creator Realm</Link>
                  </li>
                </ul>
                <PremiumButton href="/products/vibe-os" className="w-full">
                  Explore Vibe OS
                </PremiumButton>
              </GlassmorphicCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassmorphicCard variant="luxury" border="glow" hover className="h-full p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500">
                  <Rocket className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-100 mb-4">Creator Architect</h2>
                <p className="text-base text-slate-300 mb-6 leading-relaxed">
                  Build systems that multiply your output while protecting your creative voice.
                </p>
                <ul className="space-y-3 mb-8 text-base text-slate-200">
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
                    Start: <Link href="/products/creative-ai-toolkit" className="text-blue-300 hover:text-blue-200 ml-1">Creative AI Toolkit</Link>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
                    Learn: <Link href="/courses" className="text-blue-300 hover:text-blue-200 ml-1">AI Courses</Link>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
                    Build: <Link href="/products" className="text-blue-300 hover:text-blue-200 ml-1">Creator Studio OS</Link>
                  </li>
                </ul>
                <PremiumButton href="/products/creative-ai-toolkit" className="w-full">
                  Get the Toolkit
                </PremiumButton>
              </GlassmorphicCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassmorphicCard variant="luxury" border="glow" hover className="h-full p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-100 mb-4">Student Creator</h2>
                <p className="text-base text-slate-300 mb-6 leading-relaxed">
                  Build your AI Center of Excellence and launch your creator career while studying.
                </p>
                <ul className="space-y-3 mb-8 text-base text-slate-200">
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-emerald-400" />
                    Start: <Link href="/students/workshop" className="text-emerald-300 hover:text-emerald-200 ml-1">Ikigai Workshop</Link>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-emerald-400" />
                    Build: <Link href="/students/coe-builder" className="text-emerald-300 hover:text-emerald-200 ml-1">AI CoE Builder</Link>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-emerald-400" />
                    Explore: <Link href="/students/roles" className="text-emerald-300 hover:text-emerald-200 ml-1">Creator Roles</Link>
                  </li>
                </ul>
                <PremiumButton href="/students" className="w-full">
                  Visit Student Hub
                </PremiumButton>
              </GlassmorphicCard>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-slate-100 mb-6">Not sure where to start?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Explore our resources, read the latest essays, or join the community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-xl border-2 border-slate-700 bg-slate-900/50 px-8 py-4 text-lg font-semibold text-slate-200 transition-all hover:border-purple-500/50 hover:bg-slate-800/50"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Read Latest Essays
              </Link>
              <Link
                href="/realm"
                className="inline-flex items-center justify-center rounded-xl border-2 border-slate-700 bg-slate-900/50 px-8 py-4 text-lg font-semibold text-slate-200 transition-all hover:border-blue-500/50 hover:bg-slate-800/50"
              >
                <Users className="mr-2 h-5 w-5" />
                Join Creator Realm
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

