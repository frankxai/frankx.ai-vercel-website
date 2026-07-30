'use client'

/**
 * Static layout primitives for partnership surfaces.
 *
 * The public-workbench release keeps text still. These exports preserve the
 * existing component API while ensuring headings, body copy, cards, and calls
 * to action are immediately readable rather than animated into view.
 */

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { Variants } from 'framer-motion'

// Kept as inert compatibility exports for older partnership components that
// still pass a `variants` object to a Framer element.
export const fadeUp: Variants = { hidden: {}, visible: {} }
export const fadeIn: Variants = { hidden: {}, visible: {} }
export const stagger: Variants = { hidden: {}, visible: {} }
export const staggerFast: Variants = { hidden: {}, visible: {} }

type MotionSectionProps = ComponentPropsWithoutRef<'section'> & {
  children: ReactNode
  variant?: 'default' | 'fast'
}

export function MotionSection({
  children,
  className,
  variant: _variant = 'default',
  ...rest
}: MotionSectionProps) {
  return (
    <section className={className} {...rest}>
      {children}
    </section>
  )
}

type MotionItemProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
}

export function MotionItem({ children, className, ...rest }: MotionItemProps) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}

type MotionHeroProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
}

export function MotionHero({ children, className, ...rest }: MotionHeroProps) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}

type MotionHeroItemProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
  delay?: number
}

export function MotionHeroItem({
  children,
  className,
  delay: _delay,
  ...rest
}: MotionHeroItemProps) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}
