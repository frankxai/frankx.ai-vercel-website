'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface FloatingElementProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Content to float */
  children: React.ReactNode;
  /** Rotation angles (in degrees) */
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  /** Enable continuous floating animation */
  animate?: boolean;
  /** Animation duration (seconds) */
  duration?: number;
  /** Elevation distance (px) */
  floatDistance?: number;
}

/**
 * FloatingElement — 3D perspective container
 *
 * Creates dimensional depth through CSS 3D transforms.
 * Elements feel like they exist in physical space, not flat on screen.
 *
 * Based on: docs/design/LIQUID_GLASS_SYSTEM.md
 *
 * @example
 * ```tsx
 * <FloatingElement rotateX={2} rotateY={-2} animate>
 *   <img src="/hero-image.png" alt="Product" />
 * </FloatingElement>
 * ```
 */
export function FloatingElement({
  children,
  rotateX = 2,
  rotateY = -2,
  rotateZ = 0,
  animate = false,
  duration = 6,
  floatDistance = 10,
  className = '',
  style = {},
  ...props
}: FloatingElementProps) {
  const floatingAnimation = animate ? {
    y: [0, -floatDistance, 0],
    rotateX: [rotateX, rotateX - 1, rotateX],
    rotateY: [rotateY, rotateY + 1, rotateY],
  } : undefined;

  const floatingTransition = animate ? {
    duration,
    repeat: Infinity,
    ease: 'easeInOut',
  } : undefined;

  return (
    <motion.div
      className={`floating-element ${className}`}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      initial={{
        rotateX,
        rotateY,
        rotateZ,
      }}
      animate={floatingAnimation}
      transition={floatingTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default FloatingElement;
