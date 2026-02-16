'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ELEMENT_MATERIALS, type ElementType } from './types';

export interface LoadingBubbleProps {
  /** Element theme variant */
  element?: ElementType;
  /** Bubble size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Optional label */
  label?: string;
}

/**
 * LoadingBubble — Breathing bubble loader
 *
 * Animated loading indicator with pulsing bubble effect and rotating shimmer.
 * Feels alive, not mechanical.
 *
 * Based on: docs/design/ARCANEA_VISUAL_LANGUAGE.md
 *
 * @example
 * ```tsx
 * <LoadingBubble element="arcane" size="lg" label="Loading..." />
 * ```
 */
export function LoadingBubble({
  element = 'default',
  size = 'md',
  label,
}: LoadingBubbleProps) {
  const material = ELEMENT_MATERIALS[element];

  // Size variants
  const sizeValues = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  };

  const bubbleSize = sizeValues[size];

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        className="loading-bubble relative rounded-full"
        style={{
          width: bubbleSize,
          height: bubbleSize,
          background: `radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.2) 0%,
            color-mix(in srgb, ${material.primary} 15%, transparent) 30%,
            color-mix(in srgb, ${material.secondary} 10%, transparent) 60%,
            rgba(20, 15, 30, 0.8) 100%
          )`,
          boxShadow: `
            inset 0 -${bubbleSize * 0.2}px ${bubbleSize * 0.4}px rgba(0,0,0,0.3),
            0 0 ${bubbleSize * 0.6}px color-mix(in srgb, ${material.emission} 20%, transparent)
          `,
        }}
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            `inset 0 -${bubbleSize * 0.2}px ${bubbleSize * 0.4}px rgba(0,0,0,0.3), 0 0 ${bubbleSize * 0.6}px color-mix(in srgb, ${material.emission} 20%, transparent)`,
            `inset 0 -${bubbleSize * 0.16}px ${bubbleSize * 0.32}px rgba(0,0,0,0.25), 0 0 ${bubbleSize}px color-mix(in srgb, ${material.emission} 30%, transparent)`,
            `inset 0 -${bubbleSize * 0.2}px ${bubbleSize * 0.4}px rgba(0,0,0,0.3), 0 0 ${bubbleSize * 0.6}px color-mix(in srgb, ${material.emission} 20%, transparent)`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Rotating shimmer */}
        <motion.div
          className="absolute inset-[2px] rounded-full"
          style={{
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              color-mix(in srgb, ${material.emission} 30%, transparent) 90deg,
              color-mix(in srgb, ${material.primary} 30%, transparent) 180deg,
              color-mix(in srgb, ${material.secondary} 30%, transparent) 270deg,
              transparent 360deg
            )`,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>

      {label && (
        <motion.p
          className="text-sm text-white/60 font-medium"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {label}
        </motion.p>
      )}
    </div>
  );
}

export default LoadingBubble;
