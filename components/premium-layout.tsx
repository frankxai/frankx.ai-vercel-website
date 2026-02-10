'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, MouseEvent, ReactNode } from 'react'

// ============================================================================
// PREMIUM MOTION PRESETS
// Consistent, refined motion across all components
// ============================================================================

export const premiumTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

export const fadeInUp = {
  initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

// ============================================================================
// SPOTLIGHT CARD
// Cursor-following glow effect for premium cards
// ============================================================================

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function SpotlightCard({
  children,
  className = '',
  glowColor = 'rgba(16, 185, 129, 0.08)',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 })

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`spotlight-card relative ${className}`}
      whileHover={{ y: -4 }}
      transition={premiumTransition}
    >
      {/* Spotlight glow effect */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${springX.get()}px ${springY.get()}px, ${glowColor}, transparent 40%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}

// ============================================================================
// GLOW BADGE
// Premium badge with subtle glow effect
// ============================================================================

interface GlowBadgeProps {
  children: ReactNode
  variant?: 'default' | 'emerald' | 'amber' | 'cyan' | 'violet'
  className?: string
  icon?: ReactNode
}

export function GlowBadge({
  children,
  variant = 'default',
  className = '',
  icon,
}: GlowBadgeProps) {
  const variantClasses = {
    default: 'text-white/70 border-white/10 bg-white/[0.03]',
    emerald: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/[0.08]',
    amber: 'text-amber-400 border-amber-500/20 bg-amber-500/[0.08]',
    cyan: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/[0.08]',
    violet: 'text-violet-400 border-violet-500/20 bg-violet-500/[0.08]',
  }

  return (
    <span
      className={`
        inline-flex items-center gap-2 px-3.5 py-1.5
        text-xs font-medium uppercase tracking-[0.1em]
        rounded-full border backdrop-blur-sm
        transition-all duration-300
        hover:border-opacity-40 hover:bg-opacity-15
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  )
}

// ============================================================================
// PREMIUM SECTION
// Section wrapper with optional aurora glow
// ============================================================================

interface PremiumSectionProps {
  children: ReactNode
  className?: string
  aurora?: boolean
  auroraColor?: 'tech' | 'soul' | 'hybrid'
}

export function PremiumSection({
  children,
  className = '',
  aurora = false,
  auroraColor = 'tech',
}: PremiumSectionProps) {
  const auroraGradients = {
    tech: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)',
    soul: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245, 158, 11, 0.06) 0%, transparent 50%)',
    hybrid:
      'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)',
  }

  return (
    <section className={`relative ${className}`}>
      {aurora && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: auroraGradients[auroraColor] }}
        />
      )}
      <div className="relative">{children}</div>
    </section>
  )
}

// ============================================================================
// GOLD FOIL DIVIDER
// Elegant separator with gold gradient
// ============================================================================

interface GoldFoilDividerProps {
  className?: string
}

export function GoldFoilDivider({ className = '' }: GoldFoilDividerProps) {
  return <div className={`gold-foil-divider w-full ${className}`} />
}

// ============================================================================
// ANIMATED HEADING
// Headline with staggered letter animation
// ============================================================================

interface AnimatedHeadingProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4'
}

export function AnimatedHeading({
  children,
  className = '',
  as: Component = 'h2',
}: AnimatedHeadingProps) {
  return (
    <Component className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {children.split(' ').map((word, i) => (
          <motion.span key={i} variants={staggerItem} className="inline-block mr-[0.25em]">
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  )
}

// ============================================================================
// SCROLL REVEAL
// Wrapper for scroll-triggered animations
// ============================================================================

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// GLASS CARD
// Glassmorphism card with premium styling
// ============================================================================

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative p-6 rounded-2xl
        bg-white/[0.02] backdrop-blur-xl
        border border-white/[0.06]
        ${hover ? 'hover:bg-white/[0.04] hover:border-white/[0.1]' : ''}
        transition-all duration-300
        ${className}
      `}
      whileHover={hover ? { y: -2 } : undefined}
      transition={premiumTransition}
    >
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 rounded-[inherit] opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
