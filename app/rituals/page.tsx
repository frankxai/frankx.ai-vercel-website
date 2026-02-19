'use client'

import { useState } from 'react'
import { Play, Coffee, Moon, Zap, ArrowRight } from 'lucide-react'
import { UniversalEmbed } from '@/components/embeds/UniversalEmbed'
import videoLibrary from '@/data/video-library.json'
import { motion, AnimatePresence } from 'framer-motion'

export default function RitualsPage() {
  const [activeRitual, setActiveRitual] = useState<string | null>(null)

  const rituals = [
    {
      id: 'morning',
      title: 'Morning Prime',
      icon: <Coffee className="w-6 h-6" />,
      color: 'from-amber-500/20 to-orange-500/20',
      description: 'Align your state before the world wakes up. 15 minutes of binaural beats and strategic visualization.',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: 'deep-work',
      title: 'Deep Work Protocol',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-500/20 to-cyan-500/20',
      description: 'Enter the flow state. 90 minutes of high-intensity focus with zero interruptions.',
      videoId: 'jfKfPfyJRdk' 
    },
    {
      id: 'shutdown',
      title: 'Evening Shutdown',
      icon: <Moon className="w-6 h-6" />,
      color: 'from-indigo-500/20 to-purple-500/20',
      description: 'Clear the cache. Disconnect from the machine to preserve energy for tomorrow.',
      videoId: 'hY1-J8Wd1ng' 
    }
  ]

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Systemize Your Soul.
        </h1>
        <p className="text-white/60 text-xl max-w-2xl mx-auto mb-12">
          Rituals are the architecture of excellence. Choose your state and let the system guide you.
        </p>
      </section>

      {/* Ritual Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-6">
        {rituals.map((ritual) => (
          <motion.div
            key={ritual.id}
            whileHover={{ y: -5 }}
            className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${ritual.color} p-8 cursor-pointer group`}
            onClick={() => setActiveRitual(ritual.id)}
          >
            <div className="absolute inset-0 bg-[#0a0a0b]/80 group-hover:bg-[#0a0a0b]/60 transition-colors" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white">
                {ritual.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-3">{ritual.title}</h3>
              <p className="text-white/60 leading-relaxed mb-8 flex-grow">
                {ritual.description}
              </p>

              <button className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                Activate Ritual
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Active Ritual Modal/Overlay */}
      <AnimatePresence>
        {activeRitual && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-6"
          >
            <div className="w-full max-w-5xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">
                  {rituals.find(r => r.id === activeRitual)?.title}
                </h2>
                <button 
                  onClick={() => setActiveRitual(null)}
                  className="text-white/50 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                >
                  End Session
                </button>
              </div>

              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <UniversalEmbed 
                  type="youtube" 
                  id={rituals.find(r => r.id === activeRitual)?.videoId || ''}
                  autoplay={true}
                />
              </div>

              <div className="mt-8 text-center">
                <p className="text-white/40 italic">
                  "Excellence is not an act, but a habit."
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
