'use client'

import { type TeamMember } from '@/lib/team-members'
import { getIcon } from '@/lib/icon-map'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useState } from 'react'

interface TeamMemberCardProps {
  member: TeamMember
  index: number
}

const platformColors = {
  Claude: 'from-blue-500 to-cyan-500',
  ChatGPT: 'from-emerald-500 to-green-500',
  Suno: 'from-purple-500 to-pink-500',
  Sora: 'from-blue-500 to-indigo-500',
  Midjourney: 'from-fuchsia-500 to-purple-500',
  Gemini: 'from-sky-500 to-blue-500',
}

const platformBadgeColors = {
  Claude: 'bg-blue-500/20 text-blue-200 border-blue-400/30',
  ChatGPT: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
  Suno: 'bg-purple-500/20 text-purple-200 border-purple-400/30',
  Sora: 'bg-blue-500/20 text-blue-200 border-blue-400/30',
  Midjourney: 'bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-400/30',
  Gemini: 'bg-sky-500/20 text-sky-200 border-sky-400/30',
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const Icon = getIcon(member.icon)

  const gradientClass = member.gradient

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative h-full perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="relative h-full preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT OF CARD */}
        <div
          className="absolute inset-0 backface-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 backdrop-blur-xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Gradient glow effect */}
          <div
            className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${gradientClass} opacity-20 blur-3xl rounded-full`}
          />
          <div
            className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr ${gradientClass} opacity-10 blur-3xl rounded-full`}
          />

          <div className="relative p-6 h-full flex flex-col">
            {/* Platform badge */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${platformBadgeColors[member.platform]}`}
              >
                {member.platform}
              </span>
              <Sparkles className="w-4 h-4 text-white/40" />
            </div>

            {/* Character Icon - Chibi style */}
            <div className="mb-4 flex justify-center">
              <div
                className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${gradientClass} p-0.5 transform group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="w-full h-full rounded-2xl bg-slate-900/90 flex items-center justify-center backdrop-blur-sm">
                  <Icon className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
                {/* Sparkle effect */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse delay-75" />
              </div>
            </div>

            {/* Name & Role */}
            <div className="text-center mb-3">
              <h3 className={`text-xl font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent mb-1`}>
                {member.name}
              </h3>
              <p className="text-sm text-white/60 font-medium">{member.role}</p>
            </div>

            {/* Tagline */}
            <div className="flex-1 flex items-start justify-center">
              <p className="text-sm text-white/80 text-center italic leading-relaxed">
                "{member.tagline}"
              </p>
            </div>

            {/* Hover hint */}
            <div className="mt-4 text-center">
              <span className="text-xs text-white/40 flex items-center justify-center gap-1">
                Hover for details
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div
          className="absolute inset-0 backface-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-slate-950/95 backdrop-blur-xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Gradient glow effect */}
          <div
            className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-b ${gradientClass} opacity-10`}
          />

          <div className="relative p-6 h-full flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="mb-4">
              <h3 className={`text-lg font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent mb-2`}>
                {member.name}
              </h3>
              <p className="text-xs text-white/50 leading-relaxed">{member.personality}</p>
            </div>

            {/* Specialties */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                Specialties
              </h4>
              <ul className="space-y-1.5">
                {member.specialties.slice(0, 4).map((specialty) => (
                  <li key={specialty} className="flex items-start gap-2 text-xs text-white/60">
                    <span className={`mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradientClass} flex-shrink-0`} />
                    <span className="leading-relaxed">{specialty}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outputs */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                Signature Outputs
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {member.outputs.slice(0, 4).map((output) => (
                  <span
                    key={output}
                    className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60"
                  >
                    {output}
                  </span>
                ))}
              </div>
            </div>

            {/* Collaborates with */}
            <div className="mt-auto pt-4 border-t border-white/10">
              <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                Collaborates With
              </h4>
              <p className="text-xs text-white/50">
                {member.collaboratesWith.slice(0, 3).join(' • ')}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Outer glow on hover */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradientClass} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
      />
    </motion.div>
  )
}
