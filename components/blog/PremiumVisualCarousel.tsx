'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'

export interface CarouselItem {
  slug: string
  title: string
  image?: string
  category: string
  readingTime?: string
}

interface PremiumVisualCarouselProps {
  items: CarouselItem[]
  eyebrow?: string
  title?: string
  subtitle?: string
}

export default function PremiumVisualCarousel({
  items,
  eyebrow = "Editor's Picks",
  title = 'Start with our best work',
  subtitle = 'Hand-picked deep dives — the pieces worth your time first.',
}: PremiumVisualCarouselProps) {
  const [current, setCurrent] = useState(0)
  const x = useMotionValue(0)

  const cardWidth = 420
  const gap = 24

  const goTo = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, items.length - 1))
    setCurrent(newIndex)
    x.set(-newIndex * (cardWidth + gap))
  }

  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  if (items.length === 0) return null

  return (
    <div className="relative my-12 overflow-hidden">
      <div className="flex items-end justify-between mb-6 px-1">
        <div>
          <div className="text-xs uppercase tracking-[3px] text-emerald-400 font-medium mb-1.5">{eyebrow}</div>
          <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
          <p className="text-white/50 text-sm mt-1">{subtitle}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={prev} className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition disabled:opacity-30" aria-label="Previous" disabled={current === 0}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next} className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition disabled:opacity-30" aria-label="Next" disabled={current === items.length - 1}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <motion.div
          drag="x"
          dragConstraints={{ left: -((items.length - 1) * (cardWidth + gap)), right: 0 }}
          dragElastic={0.05}
          style={{ x }}
          onDragEnd={(_, info) => {
            const threshold = 80
            if (info.offset.x < -threshold) next()
            if (info.offset.x > threshold) prev()
          }}
          className="flex gap-6 cursor-grab active:cursor-grabbing select-none"
        >
          {items.map((item, idx) => (
            <Link
              key={item.slug}
              href={`/blog/${item.slug}`}
              className="group relative block flex-shrink-0 w-[420px] max-w-[85vw] rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl transition-colors hover:border-emerald-500/30"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-white/5">
                {item.image && (
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/70 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center justify-center w-7 h-7 rounded-full bg-black/60 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                  {idx + 1}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-400/80 mb-1.5">
                  <span>{item.category}</span>
                  {item.readingTime && <span className="text-white/30 normal-case tracking-normal">· {item.readingTime}</span>}
                </div>
                <div className="font-semibold text-lg leading-tight tracking-tight text-white group-hover:text-emerald-300 transition flex items-start justify-between gap-2">
                  <span className="line-clamp-2">{item.title}</span>
                  <ArrowUpRight className="w-4 h-4 mt-1 flex-shrink-0 text-white/30 group-hover:text-emerald-400 transition" />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((item, idx) => (
          <button
            key={item.slug}
            onClick={() => goTo(idx)}
            className={`h-1 rounded-full transition-all ${idx === current ? 'bg-emerald-400 w-8' : 'bg-white/20 w-2 hover:bg-white/40'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
