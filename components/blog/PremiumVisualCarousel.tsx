'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

interface VisualItem {
  slug: string
  title: string
  image: string
  category: string
  hasVideo?: boolean
}

const visuals: VisualItem[] = [
  { slug: 'agent-family-architecture', title: 'Agent Family Architecture vs Swarms', image: '/images/blog/editorial/headers/agent-family-architecture-hero.webp', category: 'AI Architecture' },
  { slug: 'multi-agent-orchestration-patterns-2026', title: 'Multi-Agent Orchestration Patterns', image: '/images/blog/multi-agent-orchestration-v2.png', category: 'Production AI', hasVideo: true },
  { slug: 'acos-enterprise-deployment-guide', title: 'ACOS for Enterprise', image: '/images/blog/acos-enterprise-deployment-guide-hero-v8.jpg', category: 'ACOS' },
  { slug: 'aeo-playbook-get-cited-by-ai-2026', title: 'AEO Playbook 2026', image: '/images/blog/editorial/headers/aeo-playbook-get-cited-by-ai-2026-hero.webp', category: 'Intelligence', hasVideo: true },
  { slug: 'agentic-ai-roadmap-2026', title: 'Agentic AI Roadmap 2026', image: '/images/blog/agentic-ai-roadmap-2026-hero-v2.png', category: 'Strategy' },
  { slug: 'prompt-engineering-mastery-workshop', title: 'Prompt Engineering Mastery', image: '/images/blog/editorial/headers/prompt-engineering-mastery-workshop-hero.webp', category: 'Prompts' },
  { slug: 'gemma-3-analysis-2026', title: 'Gemma 3 Analysis 2026', image: '/images/blog/gemma-3-analysis-2026-hero-v8.jpg', category: 'Model Intelligence' },
  { slug: 'llama-4-analysis-2026', title: 'Llama 4 Analysis 2026', image: '/images/blog/llama-4-analysis-2026-hero-premium.png', category: 'Model Intelligence' },
  { slug: 'mistral-large-3-analysis-2026', title: 'Mistral Large 3 Analysis 2026', image: '/images/blog/editorial/headers/mistral-large-3-analysis-2026-hero.webp', category: 'Model Intelligence' },
]

export default function PremiumVisualCarousel() {
  const [current, setCurrent] = useState(0)
  const x = useMotionValue(0)

  const cardWidth = 420
  const gap = 24

  const goTo = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, visuals.length - 1))
    setCurrent(newIndex)
    x.set(-newIndex * (cardWidth + gap))
  }

  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  return (
    <div className="relative my-12 overflow-hidden">
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">Featured Articles</h3>
        </div>
        <div className="flex gap-2">
          <button onClick={prev} className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition" aria-label="Previous">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next} className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition" aria-label="Next">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <motion.div
          drag="x"
          dragConstraints={{ left: -((visuals.length - 1) * (cardWidth + gap)), right: 0 }}
          dragElastic={0.05}
          style={{ x }}
          onDragEnd={(_, info) => {
            const threshold = 80
            if (info.offset.x < -threshold) next()
            if (info.offset.x > threshold) prev()
          }}
          className="flex gap-6 cursor-grab active:cursor-grabbing select-none"
        >
          {visuals.map((item, idx) => (
            <Link
              key={idx}
              href={`/blog/${item.slug}`}
              className="group relative block flex-shrink-0 w-[420px] rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/70 to-transparent" />
                
                {item.hasVideo && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 text-xs text-emerald-400 border border-emerald-500/30">
                    <Play className="w-3 h-3" /> Motion
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-widest text-emerald-400/80 mb-1.5">{item.category}</div>
                <div className="font-semibold text-lg leading-tight tracking-tight text-white group-hover:text-emerald-300 transition">
                  {item.title}
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {visuals.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`h-1 rounded-full transition-all ${idx === current ? 'bg-emerald-400 w-8' : 'bg-white/20 w-2 hover:bg-white/40'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="text-center mt-3 text-[10px] text-white/30 tracking-widest">Drag to browse</div>
    </div>
  )
}
