'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'

interface FunnelProgressHeaderProps {
  totalSteps: number
  currentStepIndex: number
  onReset?: () => void
  brandBadge?: string
}

export const FunnelProgressHeader: React.FC<FunnelProgressHeaderProps> = ({
  totalSteps,
  currentStepIndex,
  onReset,
  brandBadge = 'FRANKX ARCHITECTURE ENGINE',
}) => {
  return (
    <div className="w-full pt-4 pb-3 px-4 flex flex-col gap-3 bg-black/40 backdrop-blur-xl border-b border-white/[0.06] sticky top-0 z-50">
      {/* Top Segmented Story Progress Bars */}
      <div className="grid grid-flow-col auto-cols-fr gap-1.5 w-full">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const isCompleted = idx < currentStepIndex
          const isCurrent = idx === currentStepIndex

          return (
            <div
              key={idx}
              className="h-1.5 rounded-full bg-white/[0.12] overflow-hidden relative"
            >
              {isCompleted && (
                <div className="w-full h-full bg-gradient-to-r from-violet-500 to-indigo-400" />
              )}
              {isCurrent && (
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Meta Row: Brand Indicator & Controls */}
      <div className="flex items-center justify-between text-xs text-white/70">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span className="font-mono uppercase tracking-wider text-[10px] text-violet-300 font-semibold">
            {brandBadge}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-white/50">
            {currentStepIndex + 1} / {totalSteps}
          </span>
          {onReset && (
            <button
              onClick={onReset}
              className="p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Restart Funnel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
