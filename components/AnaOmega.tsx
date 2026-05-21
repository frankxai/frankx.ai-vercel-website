'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// ── Variant registry ────────────────────────────────────────────────────────
//
// Sister mascot to FRANK-Ω. Renders for /ana, /ana-intelligence-system, /ais.
// Files live in /public/images/mascot/ana-omega-*.{png|jpeg|webp}.
// Some variants may not be rendered yet — we register them ahead so the API
// shape is stable; the component will surface a missing-image error visibly
// during dev rather than silently fall back.

// Each variant tracks its actual file extension and whether it has been
// rendered yet. nb-image lib derives ext from inlineData.mimeType — NB Pro
// returns JPEG, NB2 also typically returns JPEG for photoreal subjects.
// Tracking ext per variant prevents the SIS regression of 2026-04-25
// (where JPEGs were referenced as .png).
//
// `rendered: false` variants are registered ahead so the API shape is stable;
// the component will surface a missing-image error visibly during dev. Render
// these by adding their prompts to specs/mascot/ and running scripts/nb-generate.mjs.
const VARIANTS = {
  hero:           { file: 'ana-omega-hero-v1',         ext: '.jpg', label: 'Ana-Ω Hero',          rendered: true,  hasThumb: true  },
  portrait:       { file: 'ana-omega-portrait-v1',     ext: '.jpg', label: 'Ana-Ω Portrait',      rendered: true,  hasThumb: true  },
  'hero-jaguar':  { file: 'ana-omega-hero-jaguar-v1',  ext: '.jpg', label: 'Ana-Ω with Jaguar',   rendered: false, hasThumb: false },
  thinking:       { file: 'ana-omega-thinking-v1',     ext: '.jpg', label: 'Ana-Ω Thinking',      rendered: false, hasThumb: false },
  chibi:          { file: 'ana-omega-chibi-v1',        ext: '.jpg', label: 'Ana-Ω Chibi',         rendered: false, hasThumb: false },
  'chibi-avatar': { file: 'ana-omega-chibi-avatar-v1', ext: '.jpg', label: 'Ana-Ω',               rendered: false, hasThumb: false },
  chill:          { file: 'ana-omega-chill-v1',        ext: '.jpg', label: 'Ana-Ω Chill',         rendered: false, hasThumb: false },
  pointing:       { file: 'ana-omega-pointing-v1',     ext: '.jpg', label: 'Ana-Ω Pointing',      rendered: false, hasThumb: false },
  'jaguar-only':  { file: 'ana-omega-jaguar-only-v1',  ext: '.jpg', label: 'Venezuelan Jaguar',   rendered: false, hasThumb: false },
} as const

export type AnaOmegaVariant = keyof typeof VARIANTS
export type AnaOmegaMood = 'curious' | 'open' | 'thinking' | 'composed' | 'warm'

const MOOD_MAP: Record<AnaOmegaMood, AnaOmegaVariant> = {
  curious: 'hero',
  open: 'portrait',
  thinking: 'thinking',
  composed: 'chill',
  warm: 'pointing',
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

export type AnaOmegaSize = keyof typeof SIZE_MAP

// ── Props ───────────────────────────────────────────────────────────────────

interface AnaOmegaProps {
  /** Explicit variant. If `mood` is set, variant is auto-selected. */
  variant?: AnaOmegaVariant
  /** Auto-selects variant based on mood. */
  mood?: AnaOmegaMood
  /** Size preset. */
  size?: AnaOmegaSize
  /** Warm-amber glow effect (sister to Frank-Ω electric-blue glow). */
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

export default function AnaOmega({
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
}: AnaOmegaProps) {
  const [speechVisible, setSpeechVisible] = useState(!!speech)
  const resolvedVariant = variant ?? (mood ? MOOD_MAP[mood] : 'hero')
  const meta = VARIANTS[resolvedVariant]
  const dims = SIZE_MAP[ghost ? 'ghost' : size]

  // Use thumbnail for xs/sm or when explicitly requested — but only if the
  // variant actually has a rendered thumbnail. Otherwise fall back to the
  // full-size file (Next/Image will resize it).
  // Thumbnails are always JPEG; full-size uses the recorded mimeType ext.
  const wantThumb = thumb || size === 'xs' || size === 'sm'
  const useThumb = wantThumb && meta.hasThumb
  const ext = useThumb ? '_thumb.jpeg' : meta.ext
  const src = `/images/mascot/${meta.file}${ext}`

  const glowStyle = glow
    ? { boxShadow: '0 0 40px -8px rgba(232,169,81,0.45)' } // warm-amber, sister to Frank's electric-blue
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
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-ana-cream/[0.10] border-l border-t border-ana-amber/[0.20]" />
            <button
              onClick={() => setSpeechVisible(false)}
              className="block w-full text-left bg-ana-cream/[0.08] backdrop-blur-sm border border-ana-amber/[0.20] rounded-lg px-4 py-3 cursor-pointer hover:bg-ana-cream/[0.12] transition-colors"
            >
              <p className="text-xs text-ana-cream/80 leading-relaxed font-mono">
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
export function AnaOmegaGhost({
  variant = 'thinking',
  className = '',
}: {
  variant?: AnaOmegaVariant
  className?: string
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute top-1/2 -translate-y-1/2 -left-8 lg:left-4">
        <AnaOmega variant={variant} ghost size="ghost" />
      </div>
    </div>
  )
}

/** Avatar — small circular thumbnail for inline use */
export function AnaOmegaAvatar({
  variant = 'chibi-avatar',
  size = 'sm',
  glow = true,
  className = '',
}: {
  variant?: AnaOmegaVariant
  size?: 'xs' | 'sm' | 'md'
  glow?: boolean
  className?: string
}) {
  return (
    <AnaOmega
      variant={variant}
      size={size}
      thumb
      rounded
      glow={glow}
      className={`border-2 border-ana-amber/30 ${className}`}
    />
  )
}
