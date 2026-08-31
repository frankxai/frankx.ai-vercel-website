'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Copy, Check, Download, Users, ArrowUpRight, Sparkles, Key } from 'lucide-react'
import type { DeliveryPackage } from './types'

interface DeliverySuccessViewProps {
  delivery: DeliveryPackage
  customerEmail?: string
}

export const DeliverySuccessView: React.FC<DeliverySuccessViewProps> = ({
  delivery,
  customerEmail,
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (delivery.accessKey) {
      navigator.clipboard.writeText(delivery.accessKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[480px] p-6 text-white relative">
      <div className="w-full space-y-6 z-10">
        {/* Celebration Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 mb-2 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Access Granted & Provisioned
          </h2>
          <p className="text-xs text-white/60 max-w-xs mx-auto">
            Your tailored agentic package <strong className="text-violet-300">"{delivery.productName}"</strong> is live.
            {customerEmail && (
              <span className="block mt-1 text-white/40">Confirmation sent to {customerEmail}</span>
            )}
          </p>
        </div>

        {/* License & Key Card */}
        <div className="w-full bg-black/60 border border-white/[0.08] rounded-2xl p-4 backdrop-blur-xl shadow-2xl space-y-3">
          <div className="flex items-center justify-between text-xs text-white/50 font-mono">
            <span className="flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-violet-400" />
              Sovereign Access Key
            </span>
            <span className="text-[10px] text-emerald-400 uppercase font-bold">Active</span>
          </div>

          <div className="flex items-center justify-between bg-white/[0.04] border border-white/[0.06] rounded-xl px-3.5 py-2.5">
            <span className="font-mono text-sm tracking-wider text-violet-200 truncate pr-2">
              {delivery.accessKey || 'FX-ACOS-8942-UNLOCKED'}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-colors shrink-0"
              title="Copy Key"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {delivery.downloadUrl && (
            <a
              href={delivery.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white text-black hover:bg-white/90 flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <Download className="w-4 h-4" />
              <span>Download Blueprint & Assets</span>
            </a>
          )}

          {delivery.communityInviteUrl && (
            <a
              href={delivery.communityInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 text-violet-200 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Users className="w-4 h-4 text-violet-400" />
              <span>Join Inner Circle Swarm Community</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-white/40" />
            </a>
          )}
        </div>

        {/* Immediate Next Steps */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Recommended First Steps</span>
          </div>
          <ul className="text-xs text-white/70 space-y-1.5 pl-1">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
              <span>Inspect your personalized 3-step action roadmap in your email.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
              <span>Connect your MCP server credentials or import skill configs.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
