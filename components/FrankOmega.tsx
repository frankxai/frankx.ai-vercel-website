'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// ── Variant registry ────────────────────────────────────────────────────────

const VARIANTS = {
  'pixar-blue': { file: 'frank-omega-pixar-blue-v1', label: 'FRANK-Ω' },
  hero: { file: 'frank-omega-hero-v1', label: 'FRANK-Ω Hero' },
  chill: { file: 'frank-omega-chill-v1', label: 'FRANK-Ω Chill' },
  portrait: { file: 'frank-omega-portrait-v1', label: 'FRANK-Ω Portrait' },
  'chibi-avatar': { file: 'frank-omega-chibi-avatar-v1', label: 'FRANK-Ω' },
  pointing: { file: 'frank-omega-pointing-v1', label: 'FRANK-Ω Pointing' },
  thinking: { file: 'frank-omega-thinking-v1', label: 'FRANK-Ω Thinking' },
  chibi: { file: 'frank-omega-chibi-v1', label: 'FRANK-Ω Chibi' },
  'pixar-chibi': { file: 'frank-omega-pixar-chibi-v1', label: 'FRANK-Ω Wave' },
  'pixar-v1': { file: 'frank-omega-pixar-v1', label: 'FRANK-Ω Cinematic' },
} as const

export type OmegaVariant = keyof typeof VARIANTS
export type OmegaMood = 'neutral' | 'excited' | 'thinking' | 'welcoming' | 'chill'

const MOOD_MAP: Record<OmegaMood, OmegaVariant> = {
  neutral: 'pixar-blue',
  excited: 'hero',
  thinking: 'thinking',
  welcoming: 'pixar-chibi',
  chill: 'chill',
}

// ── Size presets ────────────────────────────────────────────────────────────

const SIZE_MAP = {
  xs: { w: 32, h: 32, cls: 'w-8 h-8' },
  sm: { w: 48, h: 48, cls: 'w-12 h-12' },
  md: { w: 80, h: 80, cls: 'w-20 h-20' },
  lg: { w: 128, h: 128, cls: 'w-32 h-32' },
  xl: { w: 192, h: 192, cls: 'w-48 h-48' },
  hero: { w: 320, h: 320, cls: 'w-60 h-60 sm:w-80 sm:h-80' },
  ghost: { w: 320, h: 320, cls: 'w-56 h-56 lg:w-80 lg:h-80' },
} as const

export type OmegaSize = keyof typeof SIZE_MAP

// ── Props ───────────────────────────────────────────────────────────────────

interface FrankOmegaProps {
  /** Explicit variant. If mood is set, variant is auto-selected. */
  variant?: OmegaVariant
  /** Auto-selects variant based on mood. */
  mood?: OmegaMood
  /** Size preset. */
  size?: OmegaSize
  /** Electric blue glow effect. */
  glow?: boolean
  /** Ambient overlay mode (low opacity, decorative). */
  ghost?: boolean
  /** Use thumbnail (jpeg) instead of full PNG for performance. */
  thumb?: boolean
  /** Entrance animation. */
  animate?: boolean
  /** Subtle idle floating animation. */
  float?: boolean
  /** Speech bubble text. */
  speech?: string
  /** Make the avatar circular. */
  rounded?: boolean
  className?: string
}

// ── Component ───────────────────────────────────────────────────────────────

export default function FrankOmega({
  variant,
  mood,
  size = 'md',
  glow = false,
  ghost = false,
  thumb = false,
  animate = false,
  float = false,
  speech,
  rounded = false,
  className = '',
}: FrankOmegaProps) {
  const [speechVisible, setSpeechVisible] = useState(!!speech)
  const resolvedVariant = variant ?? (mood ? MOOD_MAP[mood] : 'pixar-blue')
  const meta = VARIANTS[resolvedVariant]
  const dims = SIZE_MAP[ghost ? 'ghost' : size]

  // Use thumbnail for xs/sm or when explicitly requested
  const useThumb = thumb || size === 'xs' || size === 'sm'
  const ext = useThumb ? '_thumb.jpeg' : '.png'
  const src = `/images/mascot/${meta.file}${ext}`

  const glowStyle = glow
    ? { boxShadow: '0 0 40px -8px rgba(0,191,255,0.4)' }
    : undefined

  const ghostClass = ghost
    ? 'opacity-[0.07] pointer-events-none select-none'
    : ''

  const roundedClass = rounded ? 'rounded-full' : ''

  const imageElement = (
    <Image
      src={src}
      alt={meta.label}
      width={dims.w}
      height={dims.h}
      className={`object-contain ${roundedClass} ${ghostClass} ${dims.cls} ${className}`}
      style={glowStyle}
      sizes={dims.w <= 80 ? '80px' : dims.w <= 192 ? '192px' : '320px'}
      priority={size === 'hero'}
    />
  )

  const content = (
    <div className={`relative inline-flex flex-col items-center ${ghost ? 'absolute inset-0 flex items-center justify-center' : ''}`}>
      {animate ? (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {float ? (
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {imageElement}
            </motion.div>
          ) : (
            imageElement
          )}
        </motion.div>
      ) : float ? (
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {imageElement}
        </motion.div>
      ) : (
        imageElement
      )}

      {/* Speech bubble */}
      <AnimatePresence>
        {speech && speechVisible && !ghost && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ delay: 0.4, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 relative max-w-[220px]"
          >
            {/* Bubble arrow */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white/[0.08] border-l border-t border-white/[0.12]" />
            <button
              onClick={() => setSpeechVisible(false)}
              className="block w-full text-left bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] rounded-lg px-4 py-3 cursor-pointer hover:bg-white/[0.12] transition-colors"
            >
              <p className="text-xs text-white/70 leading-relaxed font-mono">
                {speech}
              </p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return content
}

// ── Convenience exports ─────────────────────────────────────────────────────

/** Ghost overlay — absolute positioned, low opacity decorative presence */
export function FrankOmegaGhost({
  variant = 'thinking',
  className = '',
}: {
  variant?: OmegaVariant
  className?: string
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute top-1/2 -translate-y-1/2 -left-8 lg:left-4">
        <FrankOmega variant={variant} ghost size="ghost" />
      </div>
    </div>
  )
}

/** Avatar — small circular thumbnail for inline use */
export function FrankOmegaAvatar({
  variant = 'chibi-avatar',
  size = 'sm',
  glow = true,
  className = '',
}: {
  variant?: OmegaVariant
  size?: 'xs' | 'sm' | 'md'
  glow?: boolean
  className?: string
}) {
  return (
    <FrankOmega
      variant={variant}
      size={size}
      thumb
      rounded
      glow={glow}
      className={`border-2 border-cyan-400/30 ${className}`}
    />
  )
}
