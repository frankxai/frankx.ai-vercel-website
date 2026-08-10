'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface VisualItem {
  slug: string
  title: string
  image?: string
  category: string
}

export default function PremiumVisualCarousel({ items }: { items: VisualItem[] }) {
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
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/blog/${item.slug}`}
              className="group relative block flex-shrink-0 w-[420px] rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    width={672}
                    height={378}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/70 to-transparent" />
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
        {items.map((item, idx) => (
          <button
            key={item.slug}
            onClick={() => goTo(idx)}
            className={`h-1 rounded-full transition-all ${idx === current ? 'bg-emerald-400 w-8' : 'bg-white/20 w-2 hover:bg-white/40'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="text-center mt-3 text-[10px] text-white/60 tracking-widest">Drag to browse</div>
    </div>
  )
}
