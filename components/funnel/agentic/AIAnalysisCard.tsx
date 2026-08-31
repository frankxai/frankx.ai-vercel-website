'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Cpu, ArrowRight, Zap, Target, CheckCircle2, Terminal } from 'lucide-react'
import type { AIAnalysisResult } from './types'

interface AIAnalysisCardProps {
  analysis: AIAnalysisResult | null
  isLoading: boolean
  onProceedToOffer: () => void
}

export const AIAnalysisCard: React.FC<AIAnalysisCardProps> = ({
  analysis,
  isLoading,
  onProceedToOffer,
}) => {
  const [activeLogIndex, setActiveLogIndex] = useState(0)

  const diagnosticLogs = [
    'Parsing architect identity & goal profile...',
    'Querying Starlight Intelligence Protocol matrix...',
    'Evaluating agentic automation readiness & bottlenecks...',
    'Synthesizing personalized execution blueprint...',
    'Finalizing optimal deployment tier & access path...',
  ]

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setActiveLogIndex((prev) => (prev < diagnosticLogs.length - 1 ? prev + 1 : prev))
      }, 700)
      return () => clearInterval(interval)
    }
  }, [isLoading, diagnosticLogs.length])

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[480px] p-6 text-white relative">
      {/* Background radial ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-black/60 to-black pointer-events-none" />

      {/* Loading state */}
      {isLoading && (
        <div className="w-full flex-1 flex flex-col items-center justify-center gap-6 z-10 py-10">
          <div className="relative flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-2 border-violet-500/20 border-t-violet-400 animate-spin" />
            <div className="absolute w-14 h-14 rounded-full bg-violet-600/10 backdrop-blur-md flex items-center justify-center border border-violet-400/30 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
              <Cpu className="w-7 h-7 text-violet-300 animate-pulse" />
            </div>
          </div>

          <div className="text-center space-y-2 max-w-xs">
            <h3 className="text-lg font-bold font-sans tracking-tight text-white">
              Agentic Intelligence Engine
            </h3>
            <p className="text-xs text-white/50 font-mono">
              Running deep architecture evaluation
            </p>
          </div>

          {/* Terminal log ticker */}
          <div className="w-full max-w-sm bg-black/60 border border-white/[0.08] rounded-xl p-3.5 backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06] text-[10px] text-white/40 font-mono">
              <Terminal className="w-3 h-3 text-violet-400" />
              <span>starlight-agent-matrix: active</span>
            </div>
            <div className="pt-2 text-xs font-mono text-violet-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
              <span>{diagnosticLogs[activeLogIndex]}</span>
            </div>
          </div>
        </div>
      )}

      {/* Finished Analysis State */}
      {!isLoading && analysis && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex-1 flex flex-col justify-between gap-6 z-10"
        >
          <div className="space-y-4">
            {/* Badge & Score Header */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-300 text-xs font-medium font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                <span>ARCHETYPE: {analysis.archetype.toUpperCase()}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-white/40 uppercase font-mono block">Readiness</span>
                <span className="text-sm font-mono font-bold text-emerald-400">
                  {analysis.readinessScore}% Match
                </span>
              </div>
            </div>

            {/* Dynamic Headline & Bottleneck */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-snug">
                {analysis.dynamicHeadline}
              </h2>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-white/70 leading-relaxed">
                <strong className="text-amber-300 font-medium">Core Constraint Identified:</strong>{' '}
                {analysis.coreBottleneck}
              </div>
            </div>

            {/* Personalized Action Roadmap */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-mono tracking-wider uppercase text-white/50 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                <span>Your Autonomous Solution Roadmap</span>
              </div>
              <div className="space-y-2">
                {analysis.actionPlan.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-xs text-white/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Value Metrics Highlight */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-violet-950/30 border border-violet-500/20 text-center">
                <div className="text-[10px] font-mono text-violet-300/70 uppercase">Weekly Time Saved</div>
                <div className="text-base font-bold text-violet-200 mt-0.5">
                  {analysis.valueMetrics.estimatedTimeSavedWeekly}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-center">
                <div className="text-[10px] font-mono text-cyan-300/70 uppercase">Automation Multiplier</div>
                <div className="text-base font-bold text-cyan-200 mt-0.5">
                  {analysis.valueMetrics.estimatedAutomationBoost}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onProceedToOffer}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-[0_0_24px_rgba(139,92,246,0.5)] flex items-center justify-center gap-2 group transition-all"
          >
            <span>Unlock Your Tailored Agent Pack & Blueprint</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
