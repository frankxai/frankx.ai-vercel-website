'use client'

import { type Department, type TeamMember } from '@/lib/team-members'
import { IconRenderer } from '@/lib/icon-map'
import { motion } from 'framer-motion'
import { TeamMemberCard } from './TeamMemberCard'

interface DepartmentSectionProps {
  department: Department
  members: TeamMember[]
  index: number
}

export function DepartmentSection({ department, members, index }: DepartmentSectionProps) {

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1 }}
      id={department.id}
      className="scroll-mt-24"
    >
      {/* Department Header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-950/60 backdrop-blur-xl p-8 mb-8">
        {/* Background gradient orb */}
        <div
          className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${department.gradient} opacity-10 blur-3xl rounded-full`}
        />
        <div
          className={`absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr ${department.gradient} opacity-5 blur-3xl rounded-full`}
        />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start gap-5">
            {/* Department Icon */}
            <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${department.gradient} p-0.5`}>
              <div className="w-full h-full rounded-2xl bg-slate-900/90 backdrop-blur-sm flex items-center justify-center">
                <IconRenderer name={department.icon} className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Department Info */}
            <div className="flex-1">
              <h2 className={`text-3xl font-bold bg-gradient-to-r ${department.gradient} bg-clip-text text-transparent mb-2`}>
                {department.name}
              </h2>
              <p className="text-white/70 text-sm mb-3 leading-relaxed max-w-2xl">
                {department.description}
              </p>
              <p className="text-white/50 text-xs italic leading-relaxed max-w-2xl">
                Mission: {department.mission}
              </p>
            </div>
          </div>

          {/* Member count badge */}
          <div className="flex items-center gap-3">
            <div className={`px-5 py-3 rounded-2xl bg-gradient-to-r ${department.gradient} bg-opacity-10 border border-white/20 backdrop-blur-sm`}>
              <div className="text-center">
                <div className={`text-2xl font-bold bg-gradient-to-r ${department.gradient} bg-clip-text text-transparent`}>
                  {members.length}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">
                  {members.length === 1 ? 'Agent' : 'Agents'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member, memberIndex) => (
          <TeamMemberCard key={member.id} member={member} index={memberIndex} />
        ))}
      </div>
    </motion.section>
  )
}
