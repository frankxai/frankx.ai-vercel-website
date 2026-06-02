'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { useState, type ReactNode, type MouseEvent } from 'react'

import { cn } from '@/lib/utils'

// FRANKX DESIGN SYSTEM COMPLIANT — Liquid Obsidian Glass v99
// Per design.md + taste.md + premium-visual ACOS skill: information-dense glass, dual-spectrum, void foundation, restraint excellence.
// Replaces slate with void/space/elevated ladder. Adds optional 3D tilt + specular for world-class premium feel.

/** Legacy variant names accepted for backward compat across callers (premium/luxury/etc.). Mapped to spectrum+depth at render time. */
type LegacyVariant = 'default' | 'premium' | 'luxury' | 'subtle' | 'strong' | 'crystal' | 'tech' | 'soul' | 'bridge' | string

interface GlassmorphicCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  className?: string
  /** Spectrum loyalty per design.md — never mix tech/soul in same surface */
  spectrum?: 'tech' | 'soul' | 'bridge' | 'neutral'
  /** Depth variant using 4-step background ladder (void/space/elevated/subtle) */
  depth?: 'surface' | 'raised' | 'floating' | 'modal'
  /** Glass intensity — stronger blur = more premium material */
  intensity?: 'subtle' | 'medium' | 'strong' | 'ultra'
  /** Optional 3D tilt on mouse (honors reduced-motion) */
  tilt3d?: boolean
  /** Show prismatic specular highlight (like liquid glass in Arcanea) */
  specular?: boolean
  hover?: boolean
  /** Semantic border/glow per design tokens */
  accent?: 'default' | 'tech' | 'soul' | 'bridge'
  /** Backward-compat variant prop accepted by older callers (e.g. variant="premium"|"luxury"). Maps to the spectrum+intensity system. Prefer spectrum/depth/intensity directly. */
  variant?: LegacyVariant
  /** Backward-compat border prop — accepts Tailwind class OR legacy keyword ("glow", "subtle"). */
  border?: string
  /** Backward-compat gradient prop — accepts legacy keyword ("aurora", "nebula", "void"). Maps to spectrum accent. */
  gradient?: 'aurora' | 'nebula' | 'void' | string
  /** Backward-compat color/tone prop (unused — kept for type-acceptance). */
  color?: string
  tone?: string
}

function mapLegacyBorder(border: string | undefined): string {
  if (!border) return ''
  // Keyword → Tailwind class mapping
  if (border === 'glow') return 'border-bridge-purple/30 shadow-[0_0_24px_rgba(171,71,199,0.18)]'
  if (border === 'subtle') return 'border-white/[0.06]'
  return border // assume Tailwind class
}

function mapLegacyGradient(gradient: string | undefined): { extraClass: string; accent?: GlassmorphicCardProps['accent'] } {
  if (!gradient) return { extraClass: '' }
  if (gradient === 'aurora') return { extraClass: 'bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-cyan-500/10', accent: 'bridge' }
  if (gradient === 'nebula') return { extraClass: 'bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-rose-500/10', accent: 'bridge' }
  if (gradient === 'void') return { extraClass: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950', accent: 'default' }
  return { extraClass: gradient } // assume Tailwind class
}

function mapLegacyVariant(variant: LegacyVariant | undefined): {
  spectrum?: GlassmorphicCardProps['spectrum']
  intensity?: GlassmorphicCardProps['intensity']
  accent?: GlassmorphicCardProps['accent']
} {
  switch (variant) {
    case 'premium': return { intensity: 'strong', accent: 'default' }
    case 'luxury':  return { intensity: 'ultra', accent: 'bridge' }
    case 'crystal': return { intensity: 'ultra', accent: 'default' }
    case 'tech':    return { spectrum: 'tech', accent: 'tech' }
    case 'soul':    return { spectrum: 'soul', accent: 'soul' }
    case 'bridge':  return { spectrum: 'bridge', accent: 'bridge' }
    case 'subtle':  return { intensity: 'subtle' }
    case 'strong':  return { intensity: 'strong' }
    default:        return {}
  }
}

const depthClass = {
  surface: 'bg-space/60',   // primary cards
  raised: 'bg-elevated/70', // hover/elevated
  floating: 'bg-space/80',  // navs, overlays
  modal: 'bg-elevated/90',  // modals
}

const intensityClass = {
  subtle: 'backdrop-blur-md',
  medium: 'backdrop-blur-xl',
  strong: 'backdrop-blur-2xl',
  ultra: 'backdrop-blur-3xl',
}

const accentBorder = {
  default: 'border-white/10',
  tech: 'border-tech-primary/30',
  soul: 'border-soul-primary/30',
  bridge: 'border-brand-purple/30',
}

const accentGlow = {
  default: 'shadow-[0_12px_40px_rgba(0,0,0,0.4)]',
  tech: 'shadow-[0_12px_40px_rgba(16,185,129,0.15),0_0_0_1px_rgba(16,185,129,0.1)]',
  soul: 'shadow-[0_12px_40px_rgba(245,158,11,0.15),0_0_0_1px_rgba(245,158,11,0.1)]',
  bridge: 'shadow-[0_12px_40px_rgba(171,71,199,0.2),0_0_0_1px_rgba(171,71,199,0.15)]',
}

const noiseTexture = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"

export default function GlassmorphicCard({
  children,
  className,
  spectrum,
  depth = 'surface',
  intensity,
  tilt3d = false,
  specular = false,
  hover = false,
  accent,
  variant,
  border,
  gradient,
  color: _color,
  tone: _tone,
  ...props
}: GlassmorphicCardProps) {
  // Apply legacy variant → modern token mapping; explicit props win
  const legacy = mapLegacyVariant(variant)
  const gradientMap = mapLegacyGradient(gradient)
  const borderClass = mapLegacyBorder(border)
  const effSpectrum: NonNullable<GlassmorphicCardProps['spectrum']> = spectrum ?? legacy.spectrum ?? 'neutral'
  const effIntensity: NonNullable<GlassmorphicCardProps['intensity']> = intensity ?? legacy.intensity ?? 'medium'
  const effAccent: NonNullable<GlassmorphicCardProps['accent']> = accent ?? legacy.accent ?? gradientMap.accent ?? 'default'
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const shouldReduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!tilt3d || shouldReduce) return
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6 // subtle 3deg max
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6
    setTilt({ x, y })
  }
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  const spectrumAccent = effSpectrum === 'tech' ? 'tech' : effSpectrum === 'soul' ? 'soul' : effSpectrum === 'bridge' ? 'bridge' : effAccent

  return (
    <motion.div
      role="region"
      aria-label="Premium glass surface"
      className={cn(
        'group relative overflow-hidden rounded-2xl border text-ink',
        depthClass[depth],
        intensityClass[effIntensity],
        accentBorder[spectrumAccent as keyof typeof accentBorder],
        accentGlow[spectrumAccent as keyof typeof accentGlow],
        'transition-[box-shadow,transform] duration-500 ease-out will-change-transform',
        gradientMap.extraClass, // legacy gradient overlay
        borderClass, // legacy border keyword OR Tailwind class
        className
      )}
      style={
        tilt3d && !shouldReduce
          ? { transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }
          : undefined
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={hover && !tilt3d ? { y: -2, scale: 1.005 } : undefined}
      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      {...props}
    >
      {/* Base glass material per premium-visual: void foundation, subtle noise, information-carrying surface */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04)_0%,transparent_50%)]" aria-hidden />

      {/* Optional prismatic specular (Arcanea liquid glass DNA + FrankX restraint) */}
      {specular && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(600px circle at var(--x,50%) var(--y,30%), rgba(255,255,255,0.12), transparent 40%)',
          }}
          aria-hidden
        />
      )}

      {/* Subtle spectrum glow rim for depth (never decorative) */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-2xl',
          spectrum === 'tech' && 'shadow-[inset_0_0_0_1px_rgba(16,185,129,0.15)]',
          spectrum === 'soul' && 'shadow-[inset_0_0_0_1px_rgba(245,158,11,0.15)]',
          spectrum === 'bridge' && 'shadow-[inset_0_0_0_1px_rgba(171,71,199,0.2)]'
        )}
        aria-hidden
      />

      {/* Fine noise texture for material tactility (restraint level per taste) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-soft-light"
        style={{ backgroundImage: `url(${noiseTexture})` }}
        aria-hidden
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
