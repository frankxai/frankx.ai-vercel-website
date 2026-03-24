'use client'

import Link from 'next/link'
import { ArrowLeft, Heart, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { familyNodes, sideColors } from '@/lib/family-tree-data'
import type { FamilyNode } from '@/lib/family-tree-data'

function GenerationChapter({
  title,
  subtitle,
  generation,
  nodes,
  index,
}: {
  title: string
  subtitle: string
  generation: number
  nodes: FamilyNode[]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="relative"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 flex h-full w-12 flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg font-bold text-white/30">
          {generation === 0 ? 'G0' : generation === 1 ? 'G1' : 'G2'}
        </div>
        {generation < 2 && (
          <div className="mt-2 flex-1 w-px bg-gradient-to-b from-white/10 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="ml-20">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-sm text-white/40">{subtitle}</p>
        </div>

        <div className="space-y-3">
          {/* Group by couples */}
          {generation < 2 ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              {nodes.map((node, i) => {
                const colors = sideColors[node.side]
                return (
                  <div
                    key={node.id}
                    className="flex-1 rounded-xl border p-4 backdrop-blur-sm transition-all hover:scale-[1.02]"
                    style={{
                      borderColor: `${colors.hex}25`,
                      background: `linear-gradient(135deg, ${colors.hex}08, transparent)`,
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-white">{node.name}</p>
                        {node.bornName && (
                          <p className="text-xs text-white/25">{node.bornName}</p>
                        )}
                      </div>
                      <span className="text-[10px] font-medium" style={{ color: colors.hex }}>
                        {node.role}
                      </span>
                    </div>
                    {node.details && (
                      <p className="mt-2 text-xs text-white/35">{node.details[0]}</p>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row">
              {nodes.map((node) => {
                const colors = sideColors[node.side]
                return (
                  <div
                    key={node.id}
                    className={`flex-1 rounded-xl border p-5 backdrop-blur-sm transition-all hover:scale-[1.02] ${node.id === 'frank-riemer' ? 'ring-1 ring-violet-500/20' : ''}`}
                    style={{
                      borderColor: `${colors.hex}30`,
                      background: `linear-gradient(135deg, ${colors.hex}10, transparent)`,
                    }}
                  >
                    <p className="text-lg font-semibold text-white">{node.name}</p>
                    <span className="text-xs font-medium" style={{ color: colors.hex }}>{node.role}</span>
                    {node.location && (
                      <p className="mt-1 text-xs text-white/25">{node.location}</p>
                    )}
                    {node.details && (
                      <div className="mt-2 space-y-1">
                        {node.details.map(d => (
                          <p key={d} className="text-xs text-white/35">{d}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Connector arrow */}
      {generation < 2 && (
        <div className="ml-20 flex items-center gap-2 py-6 text-white/15">
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          <ChevronDown className="h-4 w-4" />
          <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent" />
        </div>
      )}
    </motion.div>
  )
}

export default function FamilyTreeV4() {
  const generations = [
    {
      title: 'The Grandparents',
      subtitle: 'Two families. Gorte and Riemer.',
      generation: 0,
      nodes: familyNodes.filter(n => n.generation === 0),
    },
    {
      title: 'The Parents',
      subtitle: 'Where the two lines join. Dora Gorte meets Witali Riemer.',
      generation: 1,
      nodes: familyNodes.filter(n => n.generation === 1),
    },
    {
      title: 'Current Generation',
      subtitle: 'Frank and Tien. Amsterdam.',
      generation: 2,
      nodes: familyNodes.filter(n => n.generation === 2),
    },
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-0 top-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/3 blur-[128px]" />
        <div className="absolute bottom-1/4 right-0 h-[500px] w-[500px] rounded-full bg-amber-500/3 blur-[128px]" />
      </div>

      {/* Header */}
      <div className="mx-auto max-w-3xl px-6 pb-12 pt-28">
        <Link
          href="/design-lab/family-tree"
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/60"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Variants
        </Link>
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-mono font-bold text-emerald-400">V4</span>
          <h1 className="text-2xl font-bold text-white">Timeline</h1>
        </div>
        <p className="mt-2 text-sm text-white/40">Each generation is a chapter in the family story.</p>
      </div>

      {/* Timeline */}
      <div className="mx-auto max-w-3xl px-6 pb-20">
        {generations.map((gen, i) => (
          <GenerationChapter
            key={gen.generation}
            title={gen.title}
            subtitle={gen.subtitle}
            generation={gen.generation}
            nodes={gen.nodes}
            index={i}
          />
        ))}

        {/* End marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Heart className="mx-auto h-5 w-5 text-rose-400/30" />
          <p className="mt-3 text-xs italic text-white/20">
            The story continues...
          </p>
        </motion.div>
      </div>
    </main>
  )
}
