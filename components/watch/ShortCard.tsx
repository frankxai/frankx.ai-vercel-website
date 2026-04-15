'use client'

import Image from 'next/image'
import { Play, Sparkles } from 'lucide-react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import type { EnhancedVideo } from '@/lib/video-types'

interface ShortCardProps {
  short: EnhancedVideo
  onPlay: (short: EnhancedVideo) => void
  index?: number
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Premium 9:16 Short card with:
 *  - Magnetic 3D tilt on cursor movement (desktop)
 *  - Gradient border sweep on hover
 *  - Morphing play icon (scale + glow)
 *  - Staggered grid entry
 *  - Reduced-motion respected via Framer Motion defaults
 */
export function ShortCard({ short, onPlay, index = 0, size = 'md' }: ShortCardProps) {
  const widthClass =
    size === 'sm' ? 'w-40' : size === 'lg' ? 'w-64' : 'w-52'

  // 3D tilt values
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 280, damping: 20, mass: 0.5 }
  const rotateX = useSpring(useTransform(y, [-50, 50], [6, -6]), springConfig)
  const rotateY = useSpring(useTransform(x, [-50, 50], [-6, 6]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const resetTilt = () => {
    x.set(0)
    y.set(0)
  }

  const hasCommentary = Boolean(short.commentary)

  return (
    <motion.button
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        delay: Math.min(index * 0.05, 0.6),
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onClick={() => onPlay(short)}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`group relative ${widthClass} flex-none text-left rounded-2xl overflow-visible cursor-pointer`}
      aria-label={`Play Short: ${short.title}`}
    >
      {/* Gradient border sweep layer */}
      <span
        aria-hidden
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            'conic-gradient(from 0deg at 50% 50%, #f43f5e, #d946ef, #10b981, #06b6d4, #f43f5e)',
          filter: 'blur(6px)',
        }}
      />

      {/* Inner card */}
      <div className="relative aspect-[9/16] bg-black/60 rounded-2xl border border-white/10 overflow-hidden shadow-xl group-hover:shadow-2xl group-hover:shadow-rose-500/10 transition-shadow">
        <Image
          src={`https://img.youtube.com/vi/${short.id}/hqdefault.jpg`}
          alt={short.title}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-[1.08]"
          sizes="(max-width: 768px) 40vw, 208px"
        />

        {/* Shine sweep on hover */}
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)',
            backgroundSize: '250% 100%',
            animation: 'short-card-shine 1.6s ease forwards',
          }}
        />

        {/* Dark gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
          <span className="px-2 py-0.5 rounded-md bg-rose-500/90 text-white text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm shadow-sm">
            Short
          </span>
          <span className="px-1.5 py-0.5 rounded-md bg-black/70 border border-white/10 text-[10px] font-mono text-white/80">
            {short.duration}
          </span>
        </div>

        {/* Commentary indicator */}
        {hasCommentary && (
          <span
            className="absolute top-12 right-2.5 w-6 h-6 rounded-full bg-emerald-500/90 backdrop-blur-sm flex items-center justify-center shadow-md ring-1 ring-emerald-300/40"
            title="Includes Frank's Take"
          >
            <Sparkles className="w-3 h-3 text-white" />
          </span>
        )}

        {/* Morphing play button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.08 }}
        >
          <motion.div
            className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-2xl"
            whileHover={{ scale: 1.12 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            <Play className="w-5 h-5 ml-0.5 fill-black text-black" />
          </motion.div>
        </motion.div>

        {/* Title + author */}
        <div className="absolute bottom-0 inset-x-0 p-3">
          <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug transition-colors group-hover:text-rose-200">
            {short.title}
          </h3>
          <p className="text-[10px] text-white/70 mt-1 font-medium line-clamp-1">
            {short.author}
          </p>
        </div>
      </div>

      {/* Scoped keyframes via style tag — Tailwind-safe */}
      <style jsx>{`
        @keyframes short-card-shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
      `}</style>
    </motion.button>
  )
}
