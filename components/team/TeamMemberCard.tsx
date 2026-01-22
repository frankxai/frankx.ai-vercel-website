'use client'

import { type TeamMember } from '@/lib/team-members'
import { IconRenderer } from '@/lib/icon-map'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface TeamMemberCardProps {
  member: TeamMember
  index: number
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const gradientClass = member.gradient

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80 backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all cursor-pointer"
    >
      {/* Gradient glow */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${gradientClass} opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-opacity`} />

      <div className="relative p-6">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${gradientClass} p-0.5 overflow-hidden`}>
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                width={64}
                height={64}
                className="w-full h-full rounded-xl object-cover object-top"
              />
            ) : (
              <div className="w-full h-full rounded-xl bg-slate-900/90 flex items-center justify-center">
                <IconRenderer name={member.icon} className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{member.name}</h3>
            <p className="text-sm text-white/50">{member.role}</p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm text-white/70 mb-4 italic">
          "{member.tagline}"
        </p>

        {/* Skills */}
        <div className="mb-4">
          <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
            Skills
          </div>
          <div className="flex flex-wrap gap-1.5">
            {member.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-white/60"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Outputs */}
        <div>
          <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
            Outputs
          </div>
          <div className="text-sm text-white/50">
            {member.outputs.slice(0, 3).join(' • ')}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
