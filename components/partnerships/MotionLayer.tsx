'use client'

/**
 * MotionLayer — quiet-luxury motion primitives for the partnerships surfaces.
 *
 * Uses `framer-motion` (already in package.json). If you ever migrate to the
 * newer `motion` package, only this file needs to change — every surface
 * imports MotionSection / MotionItem / MotionStack / fadeUp from here.
 *
 * Design contract:
 *  – cubic-bezier(0.16, 1, 0.3, 1) easing only — no bouncy springs.
 *  – 600ms duration, 100ms stagger. Quiet, deliberate, never showy.
 *  – `whileInView` triggers once with -80px margin so a section animates
 *    in just before it lands above the fold.
 *  – Hero pages use a different orchestrated entrance via `MotionHero` +
 *    `MotionHeroItem` with explicit delay sequencing.
 */

import { motion, type Variants } from 'framer-motion'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
}

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

/* -------------------------------------------------------------------------- */
/* Scroll-triggered sections                                                  */
/* -------------------------------------------------------------------------- */

type MotionSectionProps = ComponentPropsWithoutRef<typeof motion.section> & {
  children: ReactNode
  /** Use the tighter 50ms stagger for dense card grids */
  variant?: 'default' | 'fast'
}

export function MotionSection({
  children,
  className,
  variant = 'default',
  ...rest
}: MotionSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variant === 'fast' ? staggerFast : stagger}
      className={className}
      {...rest}
    >
      {children}
    </motion.section>
  )
}

type MotionItemProps = ComponentPropsWithoutRef<typeof motion.div> & {
  children: ReactNode
}

export function MotionItem({ children, className, ...rest }: MotionItemProps) {
  return (
    <motion.div variants={fadeUp} className={className} {...rest}>
      {children}
    </motion.div>
  )
}

/**
 * Stack wrapper for ungrouped reveals inside a section — e.g. the hero
 * eyebrow → headline → deck → CTAs sequence. Each direct child should be a
 * MotionHeroItem.
 */
type MotionHeroProps = ComponentPropsWithoutRef<typeof motion.div> & {
  children: ReactNode
}

export function MotionHero({ children, className, ...rest }: MotionHeroProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/**
 * Item inside a MotionHero. Uses fadeUp but accepts an optional `delay`
 * (in seconds) to override the staggerChildren cadence — useful when the
 * hero needs a deliberate 100ms-per-line rhythm rather than the default 80ms.
 */
type MotionHeroItemProps = ComponentPropsWithoutRef<typeof motion.div> & {
  children: ReactNode
  delay?: number
}

export function MotionHeroItem({
  children,
  className,
  delay,
  ...rest
}: MotionHeroItemProps) {
  const variants: Variants = delay
    ? {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay },
        },
      }
    : fadeUp

  return (
    <motion.div variants={variants} className={className} {...rest}>
      {children}
    </motion.div>
  )
}
