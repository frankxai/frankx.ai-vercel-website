'use client'

import { motion } from 'framer-motion'
import {
  Mail,
  Sparkles,
  Code2,
  Music,
  TrendingUp,
  Flame,
  Crown,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { NewsletterStream } from '@/lib/newsletter'

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Code2,
  Music,
  TrendingUp,
  Flame,
  Crown,
}

export default function StreamCompare({
  streams,
}: {
  streams: NewsletterStream[]
}) {
  return (
    <section className="border-t border-white/5 py-16">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
            Compare streams at a glance
          </h2>
          <p className="text-slate-400">
            Each stream is independent — subscribe to what matters.
          </p>
        </motion.div>

        {/* Comparison grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 pr-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">
                  Stream
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">
                  Cadence
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">
                  Audience
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">
                  Voice
                </th>
              </tr>
            </thead>
            <tbody>
              {streams.map((stream, i) => {
                const Icon = iconMap[stream.icon] || Mail
                return (
                  <motion.tr
                    key={stream.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="py-4 pr-4">
                      <a
                        href={`#${stream.id}`}
                        className="flex items-center gap-3"
                      >
                        <div
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                          style={{ background: stream.bgHex }}
                        >
                          <Icon
                            className="h-4 w-4"
                            style={{ color: stream.accentHex }}
                          />
                        </div>
                        <span className="text-sm font-medium text-white">
                          {stream.name}
                        </span>
                      </a>
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-white/60">
                        {stream.cadence}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-400">
                      {stream.audience}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">
                      {stream.voice}
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
